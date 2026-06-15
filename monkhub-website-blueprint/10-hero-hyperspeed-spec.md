# 10 — Homepage Hero: ReactBits "Hyperspeed" + the 25%-faster claim

Decision (locked by client): the homepage hero uses **ReactBits → Backgrounds → Hyperspeed**
(https://reactbits.dev/backgrounds/hyperspeed) as the animated background, themed to convey
**"25% faster development."** This file specs how to ship it so it looks premium and stays fast
and crawlable. It supersedes the "interactive globe" hero idea in `07` §3 (the globe moves to the
Geospatial section).

---

## 1. What Hyperspeed is (so we build it right)

- A **Three.js + `postprocessing`** WebGL scene: an infinite first-person "highway" of streaking
  car-light trails with bloom — a literal lightspeed/"going fast" visual. Mouse/touch hold = speed-up.
- **Copy-in component (MIT)**, not an npm runtime dep. Install via shadcn CLI:
  ```bash
  npx shadcn@latest add @react-bits/Hyperspeed-TS-TW   # TS + Tailwind variant
  npm install three @types/three                        # peer deps (postprocessing pulls in too)
  ```
- **Single `effectOptions` prop** merged over defaults. Key fields: `colors` (roadColor,
  background, leftCars, rightCars, sticks…), `distortion` ("turbulentDistortion",
  "mountainDistortion", "xyDistortion", "deepDistortion"…), `speedUp`, `fov`/`fovSpeedUp`,
  `lightPairsPerRoadWay`, `totalSideLightSticks`, `carLightsFade`, `onSpeedUp/onSlowDown`.

Sources: [ReactBits Hyperspeed](https://reactbits.dev/backgrounds/hyperspeed) ·
[ReactBits intro](https://dev.to/davidhaz/introducing-react-bits-a-library-of-beautifully-animated-react-ui-components-kcm).

---

## 2. The taste move — recolor to the brand (do NOT ship the neon default)

The default Hyperspeed is bright arcade neon. On a studio selling **production-grade** work, that
reads "flashy template." Pull it onto the "Mission Control" dark palette from `07` so it reads as
**premium telemetry / speed**, not a video game. Restraint is what keeps it on-brand.

```ts
// effectOptions tuned to Monkhub "Mission Control" — dark, one signal accent, calmer
const heroEffect = {
  distortion: 'turbulentDistortion',
  fov: 90, fovSpeedUp: 130,        // slightly calmer than the 150 default
  speedUp: 2,
  carLightsFade: 0.5,
  lightPairsPerRoadWay: 30,         // fewer streaks = cleaner, less "busy"
  totalSideLightSticks: 12,
  colors: {
    background: 0x0A0A0B,           // brand near-black canvas
    roadColor:  0x0A0A0B,
    islandColor:0x0C0A09,
    shoulderLines: 0x131316,
    brokenLines:   0x131316,
    leftCars:  [0xC6F24E, 0x9FCB3B, 0xE6FFA8],   // signal-lime family (pick ONE accent)
    rightCars: [0xF5F5F4, 0xBDBDBD, 0x8A8A8A],   // cool white/grey — keeps it sober
    sticks:    0xC6F24E,
  },
};
```
Tuning rules: **fewer light pairs, lower FOV-speedup, bloom dialed down**, two-tone (one accent +
neutral) — not a rainbow. The streaks should feel like *velocity*, not a rave.

---

## 3. Hero copy — make it FEEL super fast (no leading number)

No stat first. The Hyperspeed tunnel + the words do the work; the visitor should *feel* velocity
before they read a single metric. Keep the copy short, punchy, kinetic.

**Hero copy (over the Hyperspeed canvas):**
- **Eyebrow:** AI-NATIVE PRODUCT ENGINEERING STUDIO
- **H1 (recommended):** `Ship at hyperspeed.`
  - Strong alternates (all number-free, all speed-feeling):
    `From idea to live — fast.` · `Software, at full speed.` · `Move fast. Built to last.` ·
    `We build at the speed of AI.`
- **Subhead:** `AI runs through our entire delivery process, so your product ships sooner — and
  senior engineers own the architecture, security, and scale, so it lasts. Fixed price. You own
  all the code.`
- **Hero stat strip (proof, NOT a speed number):**
  `250+ products shipped` · `100% code ownership` · `Senior engineers only` · `Clutch ★[4.9]`
- **CTA:** `Get a fixed-price proposal →` · secondary `See what we've shipped`

**How "fast" is conveyed without saying a number:**
- The **Hyperspeed motion** itself = the speed.
- **Kinetic text reveal** — H1 streaks/blurs in fast (motion-blur wipe), matching the tunnel.
- **Verb-first, short H1** ("Ship at hyperspeed") reads as momentum.
- `onSpeedUp`/`onSlowDown`: hold-to-accelerate makes the tunnel surge — let the visitor *play with
  speed*. That interaction sells "fast" better than any stat.

> Keep the speed claim **felt, not quantified, in the hero.** If you later want a hard number, it
> goes **lower on the page as proof** (a process/results section) — never as the first thing — and
> only if you can substantiate it from your own delivery data (same honesty rule as the rest of the
> blueprint: no unbacked numbers).

---

## 4. Performance & SEO guardrails (non-negotiable — Hyperspeed is heavy)

Hyperspeed = full-screen Three.js + bloom. Shipped naively it will tank LCP/INP. Apply the `07`
performance pattern strictly:

- **LCP = server-rendered text + a static poster image, NEVER the canvas.** The H1, subhead, CTA,
  and stats are real DOM (Server Component) and paint instantly over a brand-colored poster
  (a dark gradient or a single still frame of the effect). The WebGL fades in *after*.
- **Lazy-mount the canvas:** `next/dynamic(() => import('./Hyperspeed'), { ssr: false })` inside a
  `'use client'` wrapper → mount only after first paint via `requestIdleCallback` (and only if in
  view). The hero text must not depend on the canvas.
- **Reduced motion:** if `prefers-reduced-motion: reduce`, **don't mount Hyperspeed at all** —
  show the static poster (the moving tunnel is high-motion and can trigger vestibular issues).
- **Mobile:** **serve the static poster, not the canvas** (a full Three.js tunnel is the wrong
  call on phones — battery, heat, jank). Gate on viewport + `Save-Data`.
- **Decorative for a11y:** the canvas wrapper gets `aria-hidden="true"` (it carries no info the
  text doesn't). Guarantee 4.5:1 text contrast over it with a scrim/plate behind the copy.
- **Budget:** keep hero LCP ≤ 2.0–2.5s and INP ≤ 200ms (p75). Tree-shake three; lower
  `lightPairsPerRoadWay`/bloom if INP slips; cap DPR (e.g. `min(devicePixelRatio, 1.5)`).
- **`<noscript>`:** poster + H1 + CTA, so no-JS crawlers/users still get the hero.

```tsx
// shape of the hero (sketch)
<section className="hero" >
  {/* LCP layer: real text + poster, server-rendered */}
  <div className="hero__copy"> <h1>…</h1> <p>…</p> <CTA/> <StatStrip/> </div>
  <img className="hero__poster" src="/hero-poster.webp" alt="" fetchPriority="high" />
  {/* enhancement layer: lazy, client-only, reduced-motion & mobile gated */}
  <HyperspeedLazy aria-hidden="true" effectOptions={heroEffect} />
</section>
```

---

## 5. One honest caveat

Hyperspeed is a literal, high-energy effect. It pulls in the *speed*-led buyer brilliantly, but it
leans slightly against the "restraint = premium / production-grade" thesis from `07`. The recolor
(§2) and the modest, substantiated 25% (§3) are what reconcile them — flashy *motion*, sober
*palette and claim*. If after seeing it live it still feels too arcade for the enterprise/gov
side, the fallback is a calmer ReactBits background (e.g. **Beams**, **Threads**, or **Aurora**)
with the same 25% stat treatment — same message, lower energy. Keep that option open.
```
