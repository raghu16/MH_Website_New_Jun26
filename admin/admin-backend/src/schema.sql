-- Monkhub admin schema (PostgreSQL)

CREATE TABLE IF NOT EXISTS admin_users (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name          TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS posts (
  id            BIGSERIAL PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  category      TEXT,
  excerpt       TEXT,
  body          JSONB DEFAULT '[]',        -- array of { h?, p }
  cover_image   TEXT,
  read_time     TEXT,
  accent        TEXT DEFAULT 'magenta',
  status        TEXT DEFAULT 'draft',      -- draft | published
  published_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Portfolio / case studies
CREATE TABLE IF NOT EXISTS projects (
  id            BIGSERIAL PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  client        TEXT,
  category      TEXT,
  year          TEXT,
  result        TEXT,
  tags          TEXT[] DEFAULT '{}',
  accent        TEXT DEFAULT 'magenta',
  challenge     TEXT,
  approach      TEXT[] DEFAULT '{}',
  outcomes      JSONB DEFAULT '[]',        -- array of { v, l }
  hero          JSONB,                     -- { type, src, poster?, alt? }
  gallery       JSONB DEFAULT '[]',        -- array of media items
  status        TEXT DEFAULT 'draft',
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- White papers
CREATE TABLE IF NOT EXISTS whitepapers (
  id            BIGSERIAL PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  category      TEXT,
  summary       TEXT,
  pages         TEXT,
  file_url      TEXT,                      -- uploaded PDF
  highlights    TEXT[] DEFAULT '{}',
  accent        TEXT DEFAULT 'magenta',
  status        TEXT DEFAULT 'draft',
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- Uploaded media (images, videos, files)
CREATE TABLE IF NOT EXISTS media (
  id          BIGSERIAL PRIMARY KEY,
  filename    TEXT NOT NULL,
  url         TEXT NOT NULL,
  mime        TEXT,
  size        BIGINT,
  created_at  TIMESTAMPTZ DEFAULT now()
);
