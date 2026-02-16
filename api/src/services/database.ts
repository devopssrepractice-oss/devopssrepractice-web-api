import { Pool, PoolConfig } from 'pg'

// -----------------------------------------------------------------
// PostgreSQL Database Service
// -----------------------------------------------------------------
// Requires env var: DATABASE_URL or individual PG_* vars
// -----------------------------------------------------------------

const config: PoolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false }
  : {
      host: process.env.PG_HOST || 'localhost',
      port: parseInt(process.env.PG_PORT || '5432', 10),
      database: process.env.PG_DATABASE || 'devopssre',
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'postgres',
    }

let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool(config)
    pool.on('error', (err) => {
      console.error('[DB] Unexpected error on idle client:', err)
    })
  }
  return pool
}

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL || process.env.PG_HOST)
}

/** Run the initial migration to create tables */
export async function runMigrations(): Promise<void> {
  if (!isDbConfigured()) {
    console.log('[DB] No database configured — skipping migrations')
    return
  }

  const db = getPool()

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id            SERIAL PRIMARY KEY,
      email         VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      name          VARCHAR(255) NOT NULL,
      role          VARCHAR(50)  NOT NULL DEFAULT 'user',
      created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
      token      TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
    CREATE INDEX IF NOT EXISTS idx_sessions_user  ON sessions(user_id);

    -- CMS: Blog Posts
    CREATE TABLE IF NOT EXISTS blog_posts (
      id             SERIAL PRIMARY KEY,
      slug           VARCHAR(255) UNIQUE NOT NULL,
      title          VARCHAR(500) NOT NULL,
      excerpt        TEXT NOT NULL DEFAULT '',
      content        JSONB NOT NULL DEFAULT '[]',
      tag            VARCHAR(100) NOT NULL DEFAULT '',
      tag_color      VARCHAR(100) NOT NULL DEFAULT 'bg-blue-100 text-blue-700',
      read_time      VARCHAR(50)  NOT NULL DEFAULT '5 min read',
      cover_image    TEXT,
      published      BOOLEAN NOT NULL DEFAULT false,
      published_date TIMESTAMPTZ,
      author_id      INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    -- Add cover_image if table already exists without it
    DO $$ BEGIN
      ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS idx_blog_posts_slug      ON blog_posts(slug);
    CREATE INDEX IF NOT EXISTS idx_blog_posts_published  ON blog_posts(published, published_date DESC);

    -- CMS: News Items
    CREATE TABLE IF NOT EXISTS news_items (
      id             SERIAL PRIMARY KEY,
      slug           VARCHAR(255) UNIQUE NOT NULL,
      title          VARCHAR(500) NOT NULL,
      description    TEXT NOT NULL DEFAULT '',
      content        JSONB NOT NULL DEFAULT '[]',
      category       VARCHAR(100) NOT NULL DEFAULT '',
      category_color VARCHAR(100) NOT NULL DEFAULT 'bg-primary-100 text-primary-700',
      cover_image    TEXT,
      published      BOOLEAN NOT NULL DEFAULT false,
      published_date TIMESTAMPTZ,
      author_id      INTEGER REFERENCES users(id) ON DELETE SET NULL,
      created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    -- Add new columns if table already exists without them
    DO $$ BEGIN
      ALTER TABLE news_items ADD COLUMN IF NOT EXISTS slug VARCHAR(255);
      ALTER TABLE news_items ADD COLUMN IF NOT EXISTS content JSONB NOT NULL DEFAULT '[]';
      ALTER TABLE news_items ADD COLUMN IF NOT EXISTS cover_image TEXT;
    EXCEPTION WHEN duplicate_column THEN NULL;
    END $$;

    -- Back-fill slug from id for any existing rows missing a slug
    UPDATE news_items SET slug = 'news-' || id WHERE slug IS NULL OR slug = '';

    -- Now add the UNIQUE constraint if it doesn't exist
    DO $$ BEGIN
      ALTER TABLE news_items ADD CONSTRAINT news_items_slug_key UNIQUE (slug);
    EXCEPTION WHEN duplicate_table THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS idx_news_items_published ON news_items(published, published_date DESC);
    CREATE INDEX IF NOT EXISTS idx_news_items_slug ON news_items(slug);
  `)

  console.log('[DB] Migrations complete')
}

/** Graceful shutdown */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
  }
}
