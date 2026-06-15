# Monkhub Admin Panel

A standalone admin panel to manage the website's content — **blog posts,
portfolio / case studies, white papers, and media (image + video uploads)**.

```
admin/
├── admin-backend/    Node.js (Express) API + PostgreSQL
└── admin-frontend/   React (Vite) dashboard
```

> Folder names are hyphenated (`admin-backend`, `admin-frontend`) rather than
> "Admin Back End" / "Admin Front End" because spaces in folder names break
> Node/npm tooling and import paths. Same structure, tooling-safe.

## Stack
- **Backend:** Node.js + Express, **PostgreSQL** (via `pg`), JWT auth (`bcryptjs` +
  `jsonwebtoken`), file uploads via `multer`.
- **Frontend:** React + Vite + React Router (a clean dark dashboard).

## Quick start

**1) Backend**
```bash
cd admin/admin-backend
npm install
cp .env.example .env          # set DATABASE_URL, JWT_SECRET, ADMIN_EMAIL/PASSWORD
createdb monkhub_admin        # create the Postgres database
npm run migrate               # create tables
npm run seed                  # create the admin login
npm run dev                   # API → http://localhost:4000
```

**2) Frontend** (new terminal)
```bash
cd admin/admin-frontend
npm install
cp .env.example .env          # VITE_API_URL=http://localhost:4000
npm run dev                   # dashboard → http://localhost:5173
```

Open http://localhost:5173 and sign in with your `ADMIN_EMAIL` / `ADMIN_PASSWORD`.

> **Port note:** the default API port is `4000`. If it's taken, set `PORT` (e.g. `4100`)
> in `admin-backend/.env` **and** `VITE_API_URL` in `admin-frontend/.env` to match.

## Seed the existing website content

The site's blog, portfolio and white papers can be imported into the admin **through the
API** (idempotent — clears each collection, then re-posts):

```bash
# from the repo root, with the backend running
node admin/import-content.mjs
```

It reads `lib/posts.ts`, `lib/work.ts` and `lib/whitepapers.ts`, logs in, and POSTs everything
(6 posts · 16 projects · 4 white papers). Override targets with `ADMIN_API`, `ADMIN_EMAIL`,
`ADMIN_PASSWORD` env vars. (Services / solutions / industries are not managed in the admin yet —
they live in `lib/*.ts`.)

## Data model (matches the marketing site)
The DB shapes mirror the site's content files so the site can later read from the
API instead of the static `lib/*.ts`:
- `posts` ↔ `lib/posts.ts` (blog) — `body` is `[{ h?, p }]`
- `projects` ↔ `lib/work.ts` (case studies) — `outcomes`, `hero`, `gallery` JSON
- `whitepapers` ↔ `lib/whitepapers.ts`
- `media` — uploaded files, served at `/uploads/...`

## Connecting the site to this admin (next step, not yet wired)
The marketing site currently reads static content from `lib/*.ts`. To make it
live-managed, choose one:
1. **Build-time pull** — a script fetches `/api/posts`, `/api/projects`, etc. and
   writes the `lib/*.ts` files (or JSON) before `next build`. Keeps the site fully
   static + fast (recommended for SEO/PageSpeed).
2. **Runtime fetch (ISR)** — convert the site's data reads to `fetch()` the API
   with `next: { revalidate }`, so content updates without a redeploy.

Either way, point image/video URLs at the backend's `/uploads` (or move uploads
to S3/CDN for production).

## Security notes (before production)
- Change `JWT_SECRET` and the seeded admin password.
- Restrict `CORS_ORIGIN` to the real admin domain.
- Move uploads to object storage (S3/GCS) and validate file types/sizes.
- Put the API behind HTTPS; consider rate-limiting the login route.
