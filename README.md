# Monkhub Website

AI-native product engineering studio site. **Next.js 15 (App Router) + TypeScript + Tailwind**,
with a "Mission Control" dark theme (near-black + magenta/cyan accents), a Three.js Hyperspeed
hero, and context-relevant canvas animations throughout.

- **Live:** https://monkhub-website.vercel.app
- **Repo:** https://github.com/raghu16/MH_Website_New_Jun26
- **Hosting:** Vercel (project `monkhub-website`)

> There are **two separate codebases** — this is the **dark theme (V1)**. A complete
> **light theme (V2)** lives in a sibling folder `../monkhub-website-light` (see its own README).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (must pass before deploy)
```

## Repo layout

```
app/                 Next.js routes (App Router)
components/          UI + animation components
lib/                 content + helpers (data lives here, not a CMS yet)
monkhub-website-blueprint/   original strategy & research docs (pre-build)
admin/               standalone admin panel (Express API + React dashboard)
next.config.mjs      redirects, image remotePatterns, framework
vercel.json          framework: nextjs (for CLI deploys)
.vercelignore        excludes admin/ and blueprint/ from the deploy
```

## Pages

| Area | Routes |
|---|---|
| Home | `/` — Hyperspeed hero → logos → selected work (slider) → instant scoping (AI consultant) → AI-speed/expertise → process → 9 services → testimonials → pricing → rescue → trust → FAQ → CTA |
| Services | `/services` (hub) + `/services/[slug]` — 9 services (`lib/services.ts` + `lib/pageExtras.ts`) |
| Solutions | `/solutions` (hub) + `/solutions/[slug]` — 8 ready-to-deploy solutions |
| Industries | `/industries` (hub) + `/industries/[slug]` — Power, Real Estate, Education, E-commerce |
| Work | `/our-work` (filterable showcase + load-more) + `/our-work/[slug]` — 16 case studies (`lib/work.ts`) with image/video support |
| Resources | `/resources`, `/resources/blog[/slug]`, `/resources/white-papers[/slug]` |
| Consultant | `/consultant` — full-page voice/avatar requirement-gathering flow |
| Company | `/about-us`, `/careers`, `/contact-us`, `/privacy-policy` |

All service/solution/industry/work pages are statically generated (SSG) with per-page metadata
and JSON-LD (Organization, Service, Product, FAQPage, CreativeWork, BlogPosting).

## Design & animation system

- **Theme tokens** are CSS variables in `app/globals.css` `:root` (`--accent-rgb`, `--cyan-rgb`, …)
  wired into Tailwind (`tailwind.config.ts`) — change the accent in one place to re-theme.
- **`components/SectionCanvas.tsx`** — one 2D-canvas engine with ~24 context animations
  (agents, voice, satellite, neural, blockchain, city, document, powergrid, …), mapped per page
  via `lib/anim.ts`. Two modes: full hero (in-view, pauses off-screen) and `hover` (cards: static
  at rest, animates on hover → zero idle cost).
- **`components/HeroBackground.tsx` + `HyperspeedReal.jsx`** — the official ReactBits Hyperspeed
  (Three.js), brand-recolored, lazy/idle-mounted, **skipped on mobile + reduced-motion**, so it
  never blocks LCP or runs in the PageSpeed mobile test.
- Reusable: `Reveal` (scroll-reveal), `CountUp`/`StatBand`, `FeatureGrid`, `FeaturedCaseStudy`,
  `TechMarquee`, `FaqAccordion`, `ProcessBand`, `LeadCTA`, `CaseMedia`, `RouteTransition`,
  `AIConsultant` (floating launcher) + `ConsultantExperience` (the `/consultant` flow).
- **Performance posture:** animations are hover-gated / in-view-paused / DPR-capped /
  reduced-motion-safe; heavy WebGL is lazy and mobile-skipped — built to hold a 90%+ Lighthouse score.

## Content management (admin)

`admin/` is a **standalone** full-stack panel (Express + PostgreSQL API + React/Vite dashboard) to
manage blog, portfolio and media uploads — see `admin/README.md`. It runs separately and is **not
deployed with the site**. The website currently reads content from `lib/*.ts` (static); connecting
the site to the admin API is a documented next step (`admin/README.md`).

## Deploy

```bash
vercel --prod --yes   # CLI deploy to production (project already linked via .vercel/)
```
GitHub is the source of truth; `git push` then `vercel --prod`. (Auto-deploy on push can be enabled
in the Vercel dashboard → Project → Settings → Git.)

## Before a real launch (replace placeholders — no fake data)
- Swap placeholder case-study media (`lib/work.ts` `hero`/`gallery`) and client logos for real assets.
- Review every metric/claim in `lib/pageExtras.ts`, `lib/work.ts`, testimonials and stats — they're
  specific but illustrative until verified.
- Wire the contact form + consultant + white-paper capture to your CRM/email (front-end only now).
- Finalize the privacy policy (GDPR/CCPA) with counsel.
- Confirm compliance badges (SOC 2 etc.) are real or labelled "in progress".
- Set real OG images and a custom domain.
```
