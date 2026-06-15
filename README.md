# Monkhub Website — v1

AI-native product engineering studio site. Next.js (App Router) + TypeScript + Tailwind.
Speed-led, production-grade "Mission Control" design, with a brand-recolored Hyperspeed hero.

Built from the strategy in [`monkhub-website-blueprint/`](./monkhub-website-blueprint) —
especially `09-content-strategy.md` (positioning) and `10-hero-hyperspeed-spec.md` (the hero).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## What's here

- **Homepage** (`app/page.tsx`) — Hyperspeed hero → logo bar → "AI speed, human judgment"
  (the 70/30 wedge) → how-we-ship → services → work → how-we-price → Lovable-rescue →
  trust → FAQ (schema) → CTA.
- **Services** — hub (`app/services`) + data-driven detail pages (`app/services/[slug]`,
  data in `lib/services.ts`): AI Agent Dev (flagship), Voice AI, Geospatial, AI MVP, Mobile, XR.
- **Pages** — contact (qualifying form), about, work, industries, careers, privacy.
- **SEO** — per-page metadata, Organization + Service + FAQPage JSON-LD, `sitemap.ts`,
  301 redirects for the 3 retired lead pages (`next.config.mjs`).

## The Hyperspeed hero

`components/Hyperspeed.tsx` is a lightweight, dependency-free, brand-recolored canvas warp effect
(LCP-safe, reduced-motion + mobile aware, press-and-hold to accelerate). It stands in for the
official ReactBits Three.js component so the first version installs and runs with zero extra deps.

**To swap in the official ReactBits Hyperspeed** (heavier, Three.js):
```bash
npx shadcn@latest add @react-bits/Hyperspeed-TS-TW
npm install three @types/three
```
Then render it inside `components/HeroBackground.tsx` (keep the idle-mount + reduced-motion gating)
with the brand `effectOptions` in `monkhub-website-blueprint/10-hero-hyperspeed-spec.md` §2.

## Before launch (fill the brackets — no fake data)

- Replace placeholder client logos / case-study tiles with real images + alt text.
- Wire the contact form to your CRM / Cal.com routing (it's front-end only in v1).
- Confirm any compliance badges (SOC 2 etc.) are real or labeled "in progress".
- Finalize the privacy policy with counsel (GDPR/CCPA).
- Set real `metadataBase` / OG images.
```
