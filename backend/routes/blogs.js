const express = require('express');
const pool = require('../db');

const router = express.Router();

// GET /api/blogs  — public, returns all blogs ordered by featured first, then newest
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM blogs ORDER BY is_featured DESC, created_at DESC`
    );
    return res.json({ blogs: result.rows });
  } catch (err) {
    console.error('Get blogs error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// GET /api/blogs/:id  — public, single blog by id
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM blogs WHERE id = $1`, [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ detail: 'Blog not found' });
    return res.json({ blog: result.rows[0] });
  } catch (err) {
    console.error('Get blog error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

module.exports = router;
