const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../db');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'webenablix-secret-key-change-in-production-2024';

const slugify = (value = '') => {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const ensureUniqueSlug = async (baseSlug, excludeId = null) => {
  const seed = slugify(baseSlug) || `post-${Date.now()}`;
  let candidate = seed;
  let suffix = 1;

  while (true) {
    const params = [candidate];
    let query = 'SELECT id FROM blogs WHERE slug = $1';

    if (excludeId) {
      params.push(excludeId);
      query += ' AND id != $2';
    }

    const exists = await pool.query(query, params);
    if (exists.rows.length === 0) return candidate;

    suffix += 1;
    candidate = `${seed}-${suffix}`;
  }
};

const normalizeAdditionalImages = (value) => {
  if (Array.isArray(value)) {
    return value.map((img) => String(img || '').trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split('\n')
      .map((img) => img.trim())
      .filter(Boolean);
  }

  return [];
};

// Middleware: verify admin token
const requireAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ detail: 'Admin token required' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ detail: 'Forbidden' });
    req.admin = decoded;
    next();
  } catch {
    return res.status(403).json({ detail: 'Invalid or expired admin token' });
  }
};

// GET /api/admin/stats
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const [usersRes, auditsRes, recentRes] = await Promise.all([
      pool.query(`
        SELECT
          COUNT(*)::INTEGER AS total_users,
          COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days')::INTEGER AS new_this_week,
          COUNT(*) FILTER (WHERE plan = 'free')::INTEGER AS free_users,
          COUNT(*) FILTER (WHERE plan != 'free')::INTEGER AS paid_users
        FROM users
      `),
      pool.query(`
        SELECT
          COUNT(*)::INTEGER AS total_audits,
          COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '7 days')::INTEGER AS audits_this_week,
          COALESCE(AVG(overall_score)::INTEGER, 0) AS avg_score,
          COUNT(*) FILTER (WHERE scan_successful = false)::INTEGER AS failed_audits
        FROM audits
      `),
      pool.query(`
        SELECT date_trunc('day', created_at)::DATE AS day, COUNT(*)::INTEGER AS count
        FROM audits
        WHERE created_at > NOW() - INTERVAL '14 days'
        GROUP BY day ORDER BY day ASC
      `),
    ]);
    return res.json({
      users: usersRes.rows[0],
      audits: auditsRes.rows[0],
      daily_audits: recentRes.rows,
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// GET /api/admin/users?page=1&limit=20&search=
router.get('/users', requireAdmin, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  const search = (req.query.search || '').trim();
  const offset = (page - 1) * limit;

  try {
    const whereClause = search
      ? `WHERE (email ILIKE $3 OR name ILIKE $3 OR company ILIKE $3)`
      : '';
    const params = search
      ? [limit, offset, `%${search}%`]
      : [limit, offset];

    const [usersRes, countRes] = await Promise.all([
      pool.query(
        `SELECT id, email, name, company, plan, sites_count, created_at
         FROM users ${whereClause}
         ORDER BY created_at DESC LIMIT $1 OFFSET $2`,
        params
      ),
      pool.query(
        `SELECT COUNT(*)::INTEGER AS total FROM users ${whereClause}`,
        search ? [`%${search}%`] : []
      ),
    ]);

    return res.json({
      users: usersRes.rows,
      total: countRes.rows[0].total,
      page,
      limit,
      pages: Math.ceil(countRes.rows[0].total / limit),
    });
  } catch (err) {
    console.error('Admin users error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// GET /api/admin/audits?page=1&limit=20
router.get('/audits', requireAdmin, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, parseInt(req.query.limit) || 20);
  const offset = (page - 1) * limit;

  try {
    const [auditsRes, countRes] = await Promise.all([
      pool.query(
        `SELECT a.id, a.url, a.overall_score, a.accessibility_score, a.seo_score,
                a.resources_score, a.images_score, a.network_caching_score, a.code_quality_score,
                a.total_issues, a.scan_successful, a.created_at,
                u.email AS user_email, u.name AS user_name
         FROM audits a
         LEFT JOIN users u ON u.id = a.user_id
         ORDER BY a.created_at DESC LIMIT $1 OFFSET $2`,
        [limit, offset]
      ),
      pool.query('SELECT COUNT(*)::INTEGER AS total FROM audits'),
    ]);

    return res.json({
      audits: auditsRes.rows,
      total: countRes.rows[0].total,
      page,
      limit,
      pages: Math.ceil(countRes.rows[0].total / limit),
    });
  } catch (err) {
    console.error('Admin audits error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// DELETE /api/admin/users/:id
router.delete('/users/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    return res.json({ success: true });
  } catch (err) {
    console.error('Admin delete user error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// ── Blog Management ───────────────────────────────────────────

// GET /api/admin/blogs
router.get('/blogs', requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM blogs ORDER BY created_at DESC`
    );
    return res.json({ blogs: result.rows });
  } catch (err) {
    console.error('Admin get blogs error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// POST /api/admin/blogs
router.post('/blogs', requireAdmin, async (req, res) => {
  const {
    title,
    slug,
    excerpt,
    category,
    category_color,
    read_time,
    date,
    author,
    author_role,
    image_url,
    feature_image_url,
    additional_images,
    meta_title,
    meta_description,
    content,
    is_featured,
  } = req.body;
  if (!title) return res.status(400).json({ detail: 'Title is required' });
  try {
    const uniqueSlug = await ensureUniqueSlug(slug || title);
    const normalizedImages = normalizeAdditionalImages(additional_images);
    const featureImage = feature_image_url || image_url || '';
    const metaTitle = meta_title || title || '';
    const metaDescription = meta_description || excerpt || '';

    // If marking as featured, unset existing featured post
    if (is_featured) {
      await pool.query(`UPDATE blogs SET is_featured = false WHERE is_featured = true`);
    }
    const result = await pool.query(
      `INSERT INTO blogs (slug, title, excerpt, category, category_color, read_time, date, author, author_role, image_url, feature_image_url, additional_images, meta_title, meta_description, content, is_featured)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13,$14,$15,$16)
       RETURNING *`,
      [
        uniqueSlug,
        title,
        excerpt || '',
        category || '',
        category_color || 'blue',
        read_time || '',
        date || '',
        author || '',
        author_role || '',
        featureImage,
        featureImage,
        JSON.stringify(normalizedImages),
        metaTitle,
        metaDescription,
        content || '',
        !!is_featured,
      ]
    );
    return res.status(201).json({ blog: result.rows[0] });
  } catch (err) {
    console.error('Admin create blog error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// PUT /api/admin/blogs/:id
router.put('/blogs/:id', requireAdmin, async (req, res) => {
  const {
    title,
    slug,
    excerpt,
    category,
    category_color,
    read_time,
    date,
    author,
    author_role,
    image_url,
    feature_image_url,
    additional_images,
    meta_title,
    meta_description,
    content,
    is_featured,
  } = req.body;
  if (!title) return res.status(400).json({ detail: 'Title is required' });
  try {
    const uniqueSlug = await ensureUniqueSlug(slug || title, req.params.id);
    const normalizedImages = normalizeAdditionalImages(additional_images);
    const featureImage = feature_image_url || image_url || '';
    const metaTitle = meta_title || title || '';
    const metaDescription = meta_description || excerpt || '';

    // If marking as featured, unset existing featured post (except this one)
    if (is_featured) {
      await pool.query(`UPDATE blogs SET is_featured = false WHERE is_featured = true AND id != $1`, [req.params.id]);
    }
    const result = await pool.query(
      `UPDATE blogs SET slug=$1, title=$2, excerpt=$3, category=$4, category_color=$5, read_time=$6, date=$7,
       author=$8, author_role=$9, image_url=$10, feature_image_url=$11, additional_images=$12::jsonb,
       meta_title=$13, meta_description=$14, content=$15, is_featured=$16, updated_at=NOW()
       WHERE id=$17 RETURNING *`,
      [
        uniqueSlug,
        title,
        excerpt || '',
        category || '',
        category_color || 'blue',
        read_time || '',
        date || '',
        author || '',
        author_role || '',
        featureImage,
        featureImage,
        JSON.stringify(normalizedImages),
        metaTitle,
        metaDescription,
        content || '',
        !!is_featured,
        req.params.id,
      ]
    );
    if (result.rows.length === 0) return res.status(404).json({ detail: 'Blog not found' });
    return res.json({ blog: result.rows[0] });
  } catch (err) {
    console.error('Admin update blog error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

// DELETE /api/admin/blogs/:id
router.delete('/blogs/:id', requireAdmin, async (req, res) => {
  try {
    await pool.query('DELETE FROM blogs WHERE id = $1', [req.params.id]);
    return res.json({ success: true });
  } catch (err) {
    console.error('Admin delete blog error:', err);
    return res.status(500).json({ detail: 'Internal server error' });
  }
});

module.exports = router;
