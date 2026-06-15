# 03 — Homepage (paste-ready copy + direction)

The homepage answers three questions in 5 seconds: **What problem do you solve? What is it?
Who is it for?** Everything below is ready to use. `[BRACKETS]` = fill with real data before
shipping. **Add the H1 that's currently missing.**

Section order (the architecture):
1. Hero · 2. Logo proof bar · 3. The shift (narrative) · 4. Capabilities (5 pillars) ·
5. Flagship spotlight (AI Agents) · 6. Proof / outcomes · 7. Featured work · 8. How we work ·
9. Trust & governance · 10. Two-track engagement · 11. FAQ · 12. Final CTA.

---

## 1. Hero  `<h1>` lives here

**Eyebrow:** AI-FIRST PRODUCT ENGINEERING STUDIO

**H1:** # AI agents, shipped to production.

**Subhead:**
Monkhub builds production-grade AI agents — and the voice, mobile, spatial, and immersive
products they live in. From first prototype to measured outcome, we ship AI that does real work.

**Primary CTA:** `Book a call →`   **Secondary CTA:** `See our work`

**Hero stat strip (REAL numbers only — replace the audit's "0+"):**
`250+ products shipped` · `8+ years` · `[X] AI agents in production` · `[Clutch ★ 4.9]`

> **Design/interaction:** the signature interactive hero (an interactive globe that doubles as
> a live agent surface) lives here — see `07`. The H1, subhead, CTAs, and stats are
> server-rendered text (the LCP element); the WebGL is decoration layered on top, deferred.

---

## 2. Logo proof bar

**Label:** Teams that ship with Monkhub
`[PwC]` `[Airmeet]` `[Honda]` `[Skillmatics]` `[Ronnie Coleman Signature Series]` `[+ real logos]`

> Use **real, named** logos from existing work (the audit confirmed these clients are already
> referenced). Recognizable logos beat "Trusted by 500+ companies."

---

## 3. The shift (the narrative hook)

**H2:** ## Most AI never leaves the lab. We ship it.

The demo always impresses. Production is where AI breaks — on reliability, integration,
guardrails, and cost. Two out of three AI initiatives never get past the pilot.

We engineer for the other side of that gap: agents with **evals and guardrails**, a
**human in the loop** where it matters, **observability** you can audit, and a number on every
outcome. That's the difference between an AI demo and AI that does the job.

`Why this matters →` (links to `/services/ai-agent-development`)

---

## 4. Capabilities — the 5 pillars

**H2:** ## One AI-first studio. Five ways we ship it.

> Card grid. Each card: icon/visual, title, one-line outcome, 3 sub-capabilities, "Explore →".

**Card 1 — AI Agent Development**  *(flagship — visually emphasized)*
Custom agents that act, reliably. RAG, multi-agent orchestration, copilots — with the evals to
prove they work in production.
`Custom agents · Multi-agent systems · Evals & guardrails` → `/services/ai-agent-development`

**Card 2 — Voice AI Agents**
Voice agents that handle every call, 24/7 — natural, sub-500ms, and never a dead end.
`Support deflection · Booking & intake · CRM/telephony integration` → `/services/voice-ai-agents`

**Card 3 — Geospatial Intelligence**
Turn satellite, drone, and location data into decisions. GeoAI engineered for the field.
`Imagery analysis · Change detection · GIS & digital twins` → `/services/geospatial-intelligence`

**Card 4 — Mobile**
AI-native mobile products people keep on their home screen — built around retention and revenue.
`iOS & Android · Cross-platform · On-device ML` → `/services/mobile-app-development`

**Card 5 — XR & Gaming**
Immersive experiences that train, simulate, and engage — measurably.
`Enterprise XR training · AR experiences · Unity & Unreal` → `/services/ar-vr-xr-development`

> A 6th tile — "**Also: Web · Blockchain/Web3 · IoT · E-commerce · UI/UX →** `/services`" —
> keeps the existing 12 services discoverable without crowding the five strategic pillars.

---

## 5. Flagship spotlight — AI Agent Development

**Eyebrow:** OUR FLAGSHIP

**H2:** ## Agents that act — not chatbots that talk.

Most "AI agents" are a prompt and a hope. We build systems that take real actions inside your
stack — retrieve the right context, call the right tools (MCP), make decisions within defined
boundaries, and escalate to a human when they should. Then we prove it works with evals before
it ever touches a customer.

> Three mini-cards:
> - **Build** — Custom agents, multi-agent orchestration, RAG, copilots, MCP integrations.
> - **Prove** — Evals, guardrails, red-teaming, observability. Reliability you can measure.
> - **Ship & run** — Production deployment, LLMOps, monitoring, continuous improvement.

**Interactive proof:** a sandboxed live agent demo — "Ask our demo agent →" (see `07`;
rate-limited, guardrailed). Interactive demos convert ~7× better than video.

`Explore AI Agent Development →`

---

## 6. Proof / outcomes

**H2:** ## We put numbers on it.

> 3–4 outcome tiles, each: big metric + context + named client. REAL data only.

- **[80%] ↓ resolution time** — [voice agent for CLIENT], live in [9] weeks.
- **[X hrs] saved per day** — [agentic workflow for CLIENT].
- **[Xx] faster training** — [enterprise XR program for CLIENT].
- **[X%] ↑ retention** — [AI-native mobile app for CLIENT].

`Read the case studies →`

> If you don't yet have a metric for a tile, **replace the tile with a real client logo +
> one-line outcome** — never ship a placeholder number.

---

## 7. Featured work

**H2:** ## Selected work

> 3 featured case-study cards (server-rendered, real `<a href>` links, real `alt` text).
> Each: project image, client, one-line problem→result, tag. → `/portfolio/[slug]`.
> Example card copy: "**[Garantie]** — Automated Honda two-wheeler warranty validation, cutting
> dealer processing time [X%]."

`See all work →` (`/our-work`)

---

## 8. How we work

**H2:** ## From idea to in-production — without the science project.

> 4-step horizontal flow:
1. **Discover** — We pressure-test the use case, data, and ROI before writing code.
2. **Prototype** — A working proof in weeks, evaluated against real success criteria.
3. **Engineer** — Production build: guardrails, integration, security, observability.
4. **Ship & scale** — Deploy, measure the outcome, and improve in production.

---

## 9. Trust & governance band

**H2:** ## Built to pass procurement.

Enterprise AI lives or dies on trust. Every agent we ship is governed: output validation and
guardrails, human approval gates, immutable audit trails, and data-residency / self-host
options where you need them.

`[SOC 2]` `[ISO 27001]` `[GDPR]` `[HIPAA-ready]` — *show only the ones you genuinely hold or
are pursuing; label honestly (e.g. "SOC 2 in progress").*

> Restraint: stack only **three** trust elements above the fold sitewide; the full band lives
> here and on service pages.

---

## 10. Two-track engagement

**H2:** ## Build with us, your way.

> Two cards side by side (the dual-audience split from `01`):

**Product sprint** — *For startups & product teams*
Senior, AI-first squad. From prototype to shipped in focused sprints. Move fast, keep the IP.
`Start a sprint →`

**Enterprise engagement** — *For larger organizations*
Embedded teams, governance, security, and SLAs. Pilot to production, de-risked.
`Talk to us →`

---

## 11. FAQ  *(with FAQPage schema — see `08`)*

**H2:** ## Questions buyers ask us

- **How do you keep AI agents reliable in production?** Evals, guardrails, human-in-the-loop,
  and observability — we treat reliability as a deliverable, not a hope. [expand]
- **Can you integrate with our existing stack and data?** Yes — via MCP, APIs, and your data
  stores, with privacy and residency controls. [expand]
- **How fast can we see something working?** A working prototype in weeks; we scope time-to-value
  in the first conversation. [expand]
- **Do you handle security and compliance?** [SOC 2 / ISO / GDPR / data residency — answer honestly]. [expand]
- **What does it cost / how do you engage?** Product sprints or embedded enterprise teams — book
  a call and we'll scope it. [expand]

> Mirror these to real pre-sale questions; they double as AI-search answers and Google snippets.

---

## 12. Final CTA

**H2:** ## Let's ship something that works.

Tell us what you're building. You'll talk to an engineer, not a sales rep — and leave with a
clear read on feasibility, timeline, and ROI.

**Primary:** `Book a call →`   **Secondary:** `hello@monkhub.com`

> Below: real address, both phone lines (+1 202-740-9722 / +91 9090080015), WhatsApp, Telegram
> — the genuinely strong contact paths the audit found, kept.

---

## Homepage meta (SEO)

- **Title:** `Monkhub — AI Agents, Voice AI & Geospatial Intelligence | AI-First Studio`
  *(keeps existing keyword coverage — Mobile/AI/Blockchain/AR-VR — while leading AI-first.)*
- **Meta description:** `Monkhub is an AI-first product engineering studio. We build
  production-grade AI agents, voice AI, geospatial intelligence, mobile and XR — 250+ products
  shipped. Book a call.`
- **One `<h1>`:** "AI agents, shipped to production." (the current homepage has none — this fixes it.)
- JSON-LD: Organization + WebSite + (FAQPage from §11). See `08`.
