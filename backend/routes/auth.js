const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const { OAuth2Client } = require('google-auth-library');
const pool = require('../db');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'webenablix-secret-key-change-in-production-2024';
const JWT_EXPIRES_IN = '7d';

// POST /api/auth/register
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').notEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ detail: errors.array()[0].msg });
    }

    const { email, password, name, company } = req.body;

    try {
      // Check if user exists
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ detail: 'Email already registered' });
      }

      const password_hash = await bcrypt.hash(password, 12);

      const result = await pool.query(
        `INSERT INTO users (email, password_hash, name, company)
         VALUES ($1, $2, $3, $4)
         RETURNING id, email, name, company, plan, sites_count, created_at`,
        [email, password_hash, name, company || null]
      );

      const user = result.rows[0];
      const token = jwt.sign(
        { sub: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return res.status(201).json({
        access_token: token,
        token_type: 'bearer',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          company: user.company,
          plan: user.plan,
          sites_count: user.sites_count,
          created_at: user.created_at,
        },
      });
    } catch (err) {
      console.error('Register error:', err);
      return res.status(500).json({ detail: 'Internal server error' });
    }
  }
);

// POST /api/auth/login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ detail: errors.array()[0].msg });
    }

    const { email, password } = req.body;

    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ detail: 'Invalid email or password' });
      }

      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.password_hash);

      if (!valid) {
        return res.status(401).json({ detail: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { sub: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      return res.json({
        access_token: token,
        token_type: 'bearer',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          company: user.company,
          plan: user.plan,
          sites_count: user.sites_count,
          created_at: user.created_at,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ detail: 'Internal server error' });
    }
  }
);

// GET /api/auth/me
router.get('/me', require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, email, name, company, plan, sites_count, created_at FROM users WHERE id = $1',
      [req.user.sub]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ detail: 'User not found' });
    }

    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Get user error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// POST /api/auth/google
router.post('/google', async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ detail: 'Google credential is required' });
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    // Find existing user by google_id or email
    let userResult = await pool.query(
      'SELECT * FROM users WHERE google_id = $1 OR email = $2',
      [googleId, email]
    );

    let user;
    if (userResult.rows.length > 0) {
      user = userResult.rows[0];
      // Update google_id if signing in via email for the first time with Google
      if (!user.google_id) {
        await pool.query('UPDATE users SET google_id = $1 WHERE id = $2', [googleId, user.id]);
        user.google_id = googleId;
      }
    } else {
      // Create new user (no password for Google users)
      const insertResult = await pool.query(
        `INSERT INTO users (email, name, google_id)
         VALUES ($1, $2, $3)
         RETURNING id, email, name, company, plan, sites_count, created_at`,
        [email, name || email.split('@')[0], googleId]
      );
      user = insertResult.rows[0];
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.json({
      access_token: token,
      token_type: 'bearer',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
        plan: user.plan,
        sites_count: user.sites_count,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error('Google auth error:', err);
    return res.status(401).json({ detail: 'Invalid Google credential' });
  }
});

// GET /api/auth/stats - User-specific stats (protected)
router.get('/stats', require('../middleware/auth').authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         COUNT(*)::INTEGER                    AS total_audits,
         COUNT(DISTINCT url)::INTEGER         AS sites_count,
         COALESCE(AVG(overall_score)::INTEGER, 0) AS average_score,
         COALESCE(AVG(accessibility_score)::INTEGER, 0) AS avg_accessibility
       FROM audits
       WHERE user_id = $1`,
      [req.user.sub]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    console.error('User stats error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// PUT /api/auth/profile - Update user profile (protected)
router.put(
  '/profile',
  require('../middleware/auth').authenticateToken,
  [
    body('name').optional().notEmpty().trim(),
    body('company').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ detail: errors.array()[0].msg });
    }

    const { name, company } = req.body;
    const fields = [];
    const values = [];
    let idx = 1;

    if (name !== undefined)    { fields.push(`name = $${idx++}`);    values.push(name); }
    if (company !== undefined) { fields.push(`company = $${idx++}`); values.push(company); }

    if (fields.length === 0) {
      return res.status(400).json({ detail: 'Nothing to update' });
    }

    fields.push(`updated_at = NOW()`);
    values.push(req.user.sub);

    try {
      const result = await pool.query(
        `UPDATE users SET ${fields.join(', ')} WHERE id = $${idx}
         RETURNING id, email, name, company, plan, sites_count, created_at`,
        values
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ detail: 'User not found' });
      }

      return res.json(result.rows[0]);
    } catch (err) {
      console.error('Profile update error:', err);
      return res.status(500).json({ detail: 'Internal server error' });
    }
  }
);

module.exports = router;
