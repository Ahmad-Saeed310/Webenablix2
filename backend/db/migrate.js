require('dotenv').config();
const pool = require('./index');

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        plan VARCHAR(50) DEFAULT 'free',
        sites_count INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Audits table
    await client.query(`
      CREATE TABLE IF NOT EXISTS audits (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        url TEXT NOT NULL,
        audit_type VARCHAR(50) DEFAULT 'full',
        accessibility_score INTEGER,
        seo_score INTEGER,
        performance_score INTEGER,
        mobile_score INTEGER,
        security_score INTEGER,
        overall_score INTEGER,
        lawsuit_risk VARCHAR(20),
        wcag_level VARCHAR(20),
        total_issues INTEGER DEFAULT 0,
        critical_issues INTEGER DEFAULT 0,
        warnings INTEGER DEFAULT 0,
        accessibility_issues JSONB DEFAULT '[]',
        seo_issues JSONB DEFAULT '[]',
        core_web_vitals JSONB,
        mobile_friendliness JSONB,
        structured_data JSONB,
        security JSONB,
        top_recommendations JSONB DEFAULT '[]',
        page_title TEXT,
        meta_description TEXT,
        images_without_alt JSONB DEFAULT '[]',
        scan_successful BOOLEAN DEFAULT true,
        scan_duration FLOAT,
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Leads table
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) NOT NULL,
        website_url TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Contacts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'received',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Status checks table
    await client.query(`
      CREATE TABLE IF NOT EXISTS status_checks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        client_name VARCHAR(255) NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Blogs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE,
        title TEXT NOT NULL,
        excerpt TEXT,
        category VARCHAR(100),
        category_color VARCHAR(50) DEFAULT 'blue',
        read_time VARCHAR(50),
        date VARCHAR(100),
        author VARCHAR(255),
        author_role VARCHAR(255),
        image_url TEXT,
        feature_image_url TEXT,
        additional_images JSONB DEFAULT '[]',
        meta_title TEXT,
        meta_description TEXT,
        content TEXT,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    // Backward-compatible blog schema upgrades
    await client.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS slug TEXT`);
    await client.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS feature_image_url TEXT`);
    await client.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS additional_images JSONB DEFAULT '[]'`);
    await client.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_title TEXT`);
    await client.query(`ALTER TABLE blogs ADD COLUMN IF NOT EXISTS meta_description TEXT`);
    await client.query(`CREATE UNIQUE INDEX IF NOT EXISTS blogs_slug_unique_idx ON blogs (slug)`);

    // Keep legacy and new image fields in sync for older code paths
    await client.query(`
      UPDATE blogs
      SET feature_image_url = image_url
      WHERE (feature_image_url IS NULL OR feature_image_url = '')
        AND image_url IS NOT NULL
        AND image_url != ''
    `);

    await client.query(`
      UPDATE blogs
      SET image_url = feature_image_url
      WHERE (image_url IS NULL OR image_url = '')
        AND feature_image_url IS NOT NULL
        AND feature_image_url != ''
    `);

    // Ensure existing rows have a safe unique slug value
    await client.query(`
      UPDATE blogs
      SET slug = id::text
      WHERE slug IS NULL OR slug = ''
    `);

    await client.query('COMMIT');
    console.log('✅ Database tables created successfully');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    client.release();
  }
};

createTables()
  .then(() => {
    console.log('Migration complete.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Migration error:', err);
    process.exit(1);
  });
