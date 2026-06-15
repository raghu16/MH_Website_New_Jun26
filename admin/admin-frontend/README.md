# Monkhub Admin — Frontend (React + Vite)

Dashboard to manage blog posts, portfolio/case studies, and media. Talks to the
admin backend API.

## Setup

```bash
cd admin/admin-frontend
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:4000 (the backend)
npm run dev              # http://localhost:5173
```

Start the **backend first** (see `../admin-backend`), then log in with the admin
credentials you seeded.

## Pages
- **Dashboard** — counts + quick actions
- **Blog** — list / create / edit / delete posts (cover image upload, body sections)
- **Portfolio** — list / create / edit case studies (tags, approach, outcomes, hero + gallery media)
- **Media** — upload images/videos, copy URLs, delete

## Notes
- Auth token is stored in `localStorage`; 401s redirect to login.
- Image/video uploads go through the backend `/api/media` and are served from
  `/uploads`. The returned URL can be pasted anywhere (e.g. as a case-study hero).
