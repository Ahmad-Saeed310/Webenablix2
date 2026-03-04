const express = require('express');
const { body, validationResult, query } = require('express-validator');
const pool = require('../db');
const { performAudit } = require('../services/auditService');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// POST /api/audit - Run a full accessibility audit
router.post(
  '/',
  optionalAuth,
  [
    body('url').notEmpty().trim(),
    body('audit_type').optional().isIn(['full', 'accessibility', 'seo', 'performance', 'mobile', 'security']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ detail: errors.array()[0].msg });
    }

    const { url, audit_type = 'full' } = req.body;
    const userId = req.user?.sub || null;

    try {
      const auditData = await performAudit(url, audit_type);

      // Persist audit to PostgreSQL
      const result = await pool.query(
        `INSERT INTO audits (
          url, audit_type, accessibility_score, seo_score, performance_score,
          mobile_score, security_score, overall_score, lawsuit_risk, wcag_level,
          total_issues, critical_issues, warnings, accessibility_issues, seo_issues,
          core_web_vitals, mobile_friendliness, structured_data, security,
          top_recommendations, page_title, meta_description, images_without_alt,
          scan_successful, scan_duration, user_id
        ) VALUES (
          $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26
        ) RETURNING id, created_at`,
        [
          auditData.url,
          auditData.audit_type,
          auditData.accessibility_score,
          auditData.seo_score,
          auditData.performance_score,
          auditData.mobile_score,
          auditData.security_score,
          auditData.overall_score,
          auditData.lawsuit_risk,
          auditData.wcag_level,
          auditData.total_issues,
          auditData.critical_issues,
          auditData.warnings,
          JSON.stringify(auditData.accessibility_issues),
          JSON.stringify(auditData.seo_issues),
          JSON.stringify(auditData.core_web_vitals),
          JSON.stringify(auditData.mobile_friendliness),
          JSON.stringify(auditData.structured_data),
          JSON.stringify(auditData.security),
          JSON.stringify(auditData.top_recommendations),
          auditData.page_title,
          auditData.meta_description,
          JSON.stringify(auditData.images_without_alt),
          auditData.scan_successful,
          auditData.scan_duration,
          userId,
        ]
      );

      const { id, created_at } = result.rows[0];

      return res.status(201).json({ id, created_at, ...auditData });
    } catch (err) {
      if (err.message === 'Invalid URL format') {
        return res.status(400).json({ detail: 'Invalid URL format' });
      }
      console.error('Audit error:', err);
      return res.status(500).json({ detail: `Scan failed: ${err.message}` });
    }
  }
);

// GET /api/audits - List recent audits
router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const result = await pool.query(
      `SELECT id, url, audit_type, accessibility_score, seo_score, performance_score,
              mobile_score, security_score, overall_score, lawsuit_risk, wcag_level,
              total_issues, critical_issues, warnings, scan_successful, created_at
       FROM audits
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return res.json(result.rows);
  } catch (err) {
    console.error('List audits error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// GET /api/audits/:id - Get single audit
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM audits WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ detail: 'Audit not found' });
    }
    return res.json(result.rows[0]);
  } catch (err) {
    console.error('Get audit error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// GET /api/stats - Get overall statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT COUNT(*) as total_audits, AVG(overall_score)::INTEGER as average_score FROM audits`
    );
    const row = result.rows[0];
    return res.json({
      total_audits: parseInt(row.total_audits) || 0,
      average_score: row.average_score || 0,
    });
  } catch (err) {
    console.error('Stats error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

module.exports = router;
