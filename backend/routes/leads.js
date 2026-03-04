const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

// POST /api/leads
router.post(
  '/',
  [
    body('email').isEmail().normalizeEmail(),
    body('website_url').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ detail: errors.array()[0].msg });
    }

    const { email, website_url } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO leads (email, website_url) VALUES ($1, $2) RETURNING id, email, website_url, created_at`,
        [email, website_url || null]
      );

      const lead = result.rows[0];
      return res.status(201).json({
        id: lead.id,
        email: lead.email,
        website_url: lead.website_url,
        created_at: lead.created_at,
        message: 'Report request submitted successfully',
      });
    } catch (err) {
      console.error('Lead creation error:', err);
      return res.status(500).json({ detail: 'Internal server error' });
    }
  }
);

// GET /api/leads
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY created_at DESC LIMIT 100');
    return res.json(result.rows);
  } catch (err) {
    console.error('List leads error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

module.exports = router;
