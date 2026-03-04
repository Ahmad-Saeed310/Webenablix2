const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

// POST /api/contact
router.post(
  '/',
  [
    body('name').notEmpty().trim(),
    body('email').isEmail().normalizeEmail(),
    body('message').notEmpty().trim(),
    body('company').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ detail: errors.array()[0].msg });
    }

    const { name, email, company, message } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO contacts (name, email, company, message)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, company, message, status, created_at`,
        [name, email, company || null, message]
      );

      const contact = result.rows[0];
      return res.status(201).json(contact);
    } catch (err) {
      console.error('Contact error:', err);
      return res.status(500).json({ detail: 'Internal server error' });
    }
  }
);

module.exports = router;
