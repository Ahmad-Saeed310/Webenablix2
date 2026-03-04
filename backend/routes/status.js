const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db');

const router = express.Router();

// POST /api/status
router.post(
  '/',
  [body('client_name').notEmpty().trim()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ detail: errors.array()[0].msg });
    }

    const { client_name } = req.body;

    try {
      const result = await pool.query(
        `INSERT INTO status_checks (client_name) VALUES ($1) RETURNING *`,
        [client_name]
      );
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Status check error:', err);
      return res.status(500).json({ detail: 'Internal server error' });
    }
  }
);

// GET /api/status
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM status_checks ORDER BY timestamp DESC LIMIT 100'
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('List status checks error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

module.exports = router;
