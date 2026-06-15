# 07 — Design System & Signature Interaction

How the site *feels*. The governing idea (2026): **restraint is the differentiator.** Anyone can
generate motion and purple-gradient "AI slop" now — taste, craft, and performance are the moat.
One signature moment beats effects everywhere.

---

## 1. Visual direction

**Recommended: "Mission control" — dark, technical, luminous data-viz.**
Geospatial (maps/globes/telemetry), agents (live data), and XR (immersive) all read best on a
near-black canvas where data glows. It feels like a serious AI/intelligence company, not a
template.

- **Canvas:** near-black `#0A0A0B` / `#0C0A09` (the modern premium standard, à la Linear/Cursor/Devin).
- **Surfaces:** subtle elevated panels, hairline dividers, fine grid/dot textures.
- **One rationed accent — used like a status light, never as fill.** Recommend a **signal accent**
  (electric lime `#C6F24E`, or signal amber `#FFB020`) — distinctive and **deliberately not the
  blue/purple AI cliché.** Pick one; use it for CTAs, active states, key data.
- **Text:** off-white `#F5F5F4` primary, muted grey secondary. Guarantee 4.5:1 contrast at the
  worst-case pixel over any gradient/canvas (use a scrim/plate behind text on the hero).

> **Alternative: "Editorial light"** — warm ivory (`#FAF9F5`) à la Anthropic/ElevenLabs, one clay
> accent, lots of whitespace. The rising "anti-dark-mode" credibility look. Equally valid — pick
> ONE and commit. Given Monkhub's geospatial/XR/agent mix, dark is the stronger fit; keep light
> as the fallback if the brand leans warmer.

**Banned visuals (the 2026 cliché ledger):** glowing brains, robot heads, blue circuit boards,
floating neural-node graphs, and `bg-indigo-500`/purple gradient + Inter + three-icon-boxes
("AI slop"). Use **real product UI, dashboards, maps, code, and data** as imagery instead.

---

## 2. Typography — the primary identity carrier

- **Display / headlines:** an editorial **serif or strong grotesque** (e.g. a refined display
  serif for warmth + authority, or a precise grotesque if leaning technical). Kinetic, viewport-
  scaled type replaces stock hero images.
- **Body:** a clean neutral sans (Inter at a custom weight, Geist, or similar).
- **Labels / data / eyebrows:** **monospace** as a first-class citizen (Geist Mono / similar).
  "Mono everywhere" reads as technical credibility in 2026 — use it for eyebrows, stats, tags,
  code, and metric callouts. The **serif-display × mono-utility** pairing is the signature.
- Self-host via `next/font` (`display:'swap'`, `adjustFontFallback` to kill CLS).

---

## 3. The signature interactive hero — proves all three pillars in 5 seconds

**An interactive globe that doubles as a live agent surface.**

- **The globe:** start with **Cobe** (~5KB WebGL, GPU dots — best effort-to-impact). Escalate to
  **react-globe.gl / three-globe** if you want real lat/long layers and arcs; **MapLibre GL**
  (free, globe projection) + **deck.gl** only if you need real zoomable big-data maps. The globe
  *is* the geospatial proof — legitimate here because geospatial is a real product (it's a cliché
  only when it's generic "AI = connected world" wallpaper).
- **Layered live agent:** a chat-in-hero input **or** an **ElevenLabs Conversational AI** voice
  widget on top — "Ask our agent about this region." One hero demonstrates geospatial (globe) +
  agents (chat) + voice + immersive feel (WebGL). Interactive demos convert ~7× better than video.
- **Loading playbook (GitHub-style):** instant SVG/poster placeholder (the **LCP element — text +
  poster, never the canvas**) → ~600ms crossfade to canvas on first frame → FPS monitoring with
  quality degradation below ~55 FPS → `destroy()` on unmount.

**Secondary signature (XR section, below fold):** a `<model-viewer>` 3D showcase with a
**"View in AR"** button (drop-in web component; AR launches in the user's room on Android/iOS).
Lazy-loaded behind a poster.

**Guardrails for live demos:** sandbox + rate-limit the public agent/voice demo; **never
auto-listen on the mic** (click-to-start); graceful fallback to text; a sandboxed demo agent
with guardrails so it can't be abused or run up cost.

---

## 4. Motion language

**Tasteful (use):** scroll-driven storytelling with user agency (visible CTAs, scrollable-away);
line-level text reveals (mask + y-translate); clip-path/scale image reveals; subtle pinned
parallax; micro-interactions at 150–250ms; **View Transitions API** for listing→detail morphs
(work grid → case study); a custom cursor *only* if it communicates (small dot + lagging
difference-blend ring, magnetic on primary CTA only).

**Gimmicky (avoid):** scroll-jacking/tunneling that traps the user; 3D-as-decoration with no
story; full-screen scenes that tank LCP; blown-out bloom; spinning logos; particle/sparkle
trails; magnetic-everything; text-scramble-everywhere; full-page parallax on every section.

**Stack:** Lenis (smooth scroll, driven off GSAP's ticker — single RAF loop) + GSAP ScrollTrigger
(now 100% free) **or** Motion/motion.dev for React component-state UI; R3F + drei (or OGL/Cobe for
single shaders). Animate only `transform`/`opacity`.

---

## 5. Accessibility (the wow must not exclude — EU Accessibility Act enforced since 28 Jun 2025; target WCAG 2.2 AA)

- **Author no-motion-first.** Calm version is the default; wow layers on top. Gate everything on
  `prefers-reduced-motion` (~25% of Apple users enable it) via `gsap.matchMedia()`. Pure opacity
  fades are safe to keep; kill parallax/auto-play/large translations.
- **Pause/Stop/Hide (2.2.2):** any auto-playing motion >5s needs a *visible* pause control.
- **Three-flash (2.3.1):** keep flashing <3Hz; test shaders/particles with the PEAT tool.
- **Drag alternative (2.5.7):** drag-to-rotate globe/3D needs button/keyboard controls too.
- **Voice/agent demo:** click-to-start mic, visible **transcript**, captions — never audio-only.
- **Canvas for screen readers:** decorative → `aria-hidden`; meaningful → `role="img"` +
  `aria-label`; interactive → a real focusable DOM control layer mirroring canvas state with
  `:focus-visible`.
- **Contrast over the hero:** guarantee 4.5:1 at the worst-case frame (scrim/text plate); honor
  `prefers-contrast: more`. Working skip link that moves focus, not just scroll.

---

## 6. Performance budget (p75 targets — wow with Lighthouse 95+)

| Metric | Target | How |
|---|---|---|
| **LCP** | **≤ 2.0–2.5s** (Google tightened LCP toward 2.0s) | LCP = server-rendered text/poster, `fetchPriority="high"`. **Never the canvas.** Defer the `three` bundle (~155KB) past load/idle. |
| **INP** | **≤ 200ms** | Render WebGL in a **Web Worker via OffscreenCanvas** (`@pmndrs/react-three-offscreen`); break up long tasks; single RAF loop; ≤~30 active ScrollTriggers. |
| **CLS** | **≤ 0.1** | Reserve canvas box with `aspect-ratio`; `next/font` with fallback metrics. |

**Architecture:** server-first — all content (H1, copy, CTAs, links) in Server Components as
crawlable DOM; canvas is decoration over text. Lazy/defer WebGL: `next/dynamic({ssr:false})`
inside a `'use client'` wrapper → poster → IntersectionObserver → `requestIdleCallback` →
reduced-motion check. **On mobile, swap 3D for a static WebP** — even worker-optimized 3D is
often the wrong call. Tree-shake Three.js (custom export + `three$` alias → ~50–80KB); import
drei components individually. `<noscript>` fallback with the same headline/CTA inside the canvas
wrapper. Honor `Save-Data` / `prefers-reduced-data`.

---

## 7. Reusable components to build

Hero (globe + agent) · Logo wall · Pillar card · Outcome/metric tile · Case-study card ·
Trust band · Two-track engagement cards · Multi-step form · Sticky CTA bar · FAQ accordion
(with schema) · Footer. Build once, theme with CSS variables (so dark↔light is a token swap).
