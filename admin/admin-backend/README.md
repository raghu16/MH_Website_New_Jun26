# Monkhub Admin — Backend (Express + PostgreSQL)

REST API for managing blog posts, portfolio/case studies, white papers, and media uploads.

## Prerequisites
- Node.js 18+
- PostgreSQL 14+ running locally (or a connection string to a hosted DB)

## Setup

```bash
cd admin/admin-backend
npm install
cp .env.example .env          # then edit DATABASE_URL, JWT_SECRET, ADMIN_*

# create the database (once)
createdb monkhub_admin        # or: psql -c "CREATE DATABASE monkhub_admin;"

npm run migrate               # create tables
npm run seed                  # create the admin user from ADMIN_EMAIL/PASSWORD
npm run dev                   # start API on http://localhost:4000
```

## API

Auth: send `Authorization: Bearer <token>` on all write routes.

| Method | Path | Notes |
|---|---|---|
| POST | `/api/auth/login` | `{ email, password }` → `{ token, user }` |
| GET | `/api/auth/me` | current user (protected) |
| GET/POST | `/api/posts` · `/api/posts/:id` (GET/PUT/DELETE) | blog |
| GET/POST | `/api/projects` · `/api/projects/:id` | portfolio / case studies |
| GET/POST | `/api/whitepapers` · `/api/whitepapers/:id` | white papers |
| GET | `/api/media` | list uploads (protected) |
| POST | `/api/media` | multipart `file` → `{ url, ... }` |
| DELETE | `/api/media/:id` | delete upload |
| static | `/uploads/<file>` | serves uploaded media |

GET (read) routes are public so the marketing site can consume them; POST/PUT/DELETE require auth.

## Notes
- Media is stored on local disk under `uploads/`. For production, swap multer's
  disk storage for S3/Cloud storage and store the returned URL.
- `posts.body`, `projects.outcomes/hero/gallery` are JSONB and match the shapes
  used by the marketing site (`lib/posts.ts`, `lib/work.ts`).
