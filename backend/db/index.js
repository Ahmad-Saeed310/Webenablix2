const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL ||
  'postgresql://postgres:Supabase%23123@db.rgpfruyoydmamdeuqknq.supabase.co:5432/postgres';

// Use SSL only for remote (Supabase/Render) connections, not local Postgres
const isRemote = connectionString.includes('supabase.co') ||
                 connectionString.includes('render.com') ||
                 connectionString.includes('neon.tech') ||
                 process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString,
  ssl: isRemote ? { rejectUnauthorized: false } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});

module.exports = pool;
