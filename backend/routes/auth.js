const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

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

module.exports = router;
