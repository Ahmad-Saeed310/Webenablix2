require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// ── Middleware ───────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, mobile apps, same-origin proxy)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Allow any localhost port in development
      if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) return callback(null, true);
      callback(null, false);
    },
    credentials: true,
  })
);

// ── Routes ───────────────────────────────────────────────────
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/audit',   require('./routes/audit'));
app.use('/api/audits',  require('./routes/audit'));
app.use('/api/leads',   require('./routes/leads'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/status',  require('./routes/status'));
app.use('/api/preview', require('./routes/preview'));
app.use('/api/admin',   require('./routes/admin'));

// Stats endpoint (shortcut)
app.get('/api/stats', async (req, res) => {
  const pool = require('./db');
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

// Health check
app.get('/api/', (req, res) => {
  res.json({ message: 'Webenablix API v3.0 (Node.js) is running', status: 'ok' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ detail: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ detail: 'Internal server error' });
});

// ── Start ────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '8001');
app.listen(PORT, () => {
  console.log(`🚀 Webenablix API running on port ${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
