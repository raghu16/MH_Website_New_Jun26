# 05 — Case Studies / Our Work

The single biggest pre-existing SEO + credibility defect: case studies are **image-only,
client-side-rendered, with empty `<h1>`s and `alt=""`** — invisible to Google and AI crawlers,
and unconvincing to buyers. This file fixes both the *format* and the *content*.

---

## The two non-negotiables

1. **Render real, crawlable text server-side** (SSG/ISR). Every case study needs a populated
   `<h1>`, real body copy, and descriptive `alt` text on every image. The story can't live only
   in pictures. (Build details in `08`.)
2. **Use the Problem → Approach → Result structure with hard metrics.** 93% of top firms use
   Challenge–Solution–Impact. A buyer is convinced by *what was broken, what you did, what
   changed* — not a screenshot.

---

## The case-study template (every `/portfolio/*` page)

```
1. HERO
   - Eyebrow: [CLIENT] · [INDUSTRY] · [SERVICE]
   - H1 (real text!): "[Outcome-led title — e.g. 'How Garantie cut Honda warranty
     processing time by X%']"
   - One-line summary + key result stat
   - [hero image with descriptive alt]

2. AT A GLANCE  (scannable bar)
   - Client · Industry · Services used · Timeline · Platforms
   - 1–3 headline metrics (big numbers)

3. THE CHALLENGE  (Problem)
   - Who the client is, what was broken, who felt it, why it mattered. 2–4 short paragraphs.

4. THE APPROACH  (Solution)
   - What we did, which capability mattered, key decisions, the build. Name the tech.
   - Optional: architecture diagram, screenshots (WITH alt text).

5. THE RESULT  (Impact)
   - 2–3 metrics: baseline → post → timeframe. A business-impact sentence.
   - A real testimonial WITH name, title, company, photo.

6. RELATED  — 2–3 related case studies + the relevant service page (internal links).

7. CTA — "Have a similar challenge? Book a call →"

META: unique title, unique description, per-project og:title + og:image (audit found these
were all the generic homepage values — fix), Article/CreativeWork + BreadcrumbList JSON-LD.
```

**Length:** ~800–1,500 words of real text per study (good for buyers, SEO, and AI citation).

---

## Sample rewrite #1 — Garantie (real client: Honda)

> Demonstrates the format on an existing project. Replace bracketed metrics with real numbers.

**Eyebrow:** Honda · Automotive · Web & Workflow Engineering
**H1:** # How Garantie automated Honda two-wheeler warranty management

**At a glance:** Client: Honda (via Garantie) · Industry: Automotive · Services: Web app,
workflow automation · Timeline: [X] weeks · Result: **[X%] faster** dealer processing.

**The challenge:** Honda's two-wheeler warranty process meant dealers waiting on manual policy
validation and order management — slow lookups, error-prone data entry, and no single source of
truth. At dealer scale, those minutes compounded into days of lost productivity.

**The approach:** Monkhub built Garantie — a platform that automates policy validation and order
management, giving dealers instant access to warranty data. [Describe architecture, integrations,
key decisions, tech stack — named.]

**The result:** [X% faster validation] · [X hours saved per dealer per week] · [error rate ↓ X%].
"[Real testimonial.]" — [Name, Title, Honda/Garantie].

**Related:** [Apni Bus] · [Dr. Med] · Service: Web & Product Engineering.

---

## Sample rewrite #2 — Voice/Agent flagship case (template for a new AI case)

**H1:** # How [CLIENT] deflected [59%] of support calls with a voice AI agent
**At a glance:** [CLIENT] · [Industry] · Voice AI Agents · [9] weeks · **[59%] deflection, CSAT held at [X]**
**Challenge:** Call volume outgrew the support team; after-hours calls went unanswered; hiring
didn't scale. **Approach:** A sub-500ms voice agent (built on [platform]) that resolves Tier-1
calls end-to-end, integrated with [CRM], with clean human escalation and continuous tuning.
**Result:** [59% deflection] · [$X → $Y cost/call] · [40% of bookings captured after-hours].

> Build 2–3 of these for the **AI Agent**, **Voice**, and **Geospatial** pillars even if they're
> your most recent / smaller projects — the new positioning needs flagship AI proof, and these
> are the highest-intent pages for the leads you want.

---

## `/our-work` hub (kept URL — fix the crawlability)

The audit found the project grid is **client-rendered and empty to crawlers** (no links in HTML).

- **Server-render the grid** with real `<a href>` links to each case study (anchors, not JS onClick).
- Keep the filter UX (All · AI Agents · Voice · Geospatial · Mobile · XR · Web · Blockchain), but
  filters operate over server-rendered cards.
- Each card: real image + alt, client, one-line problem→result, tags.
- Keep the strong existing H1 "Our Work Portfolio" and meta.
- Add the **new pillar filters** so AI/Voice/Geospatial work is findable.

---

## Portfolio cleanup checklist (from the audit + `02`)

- [ ] **Fix 5 soft-404s** (Mnee, gamego, solarplace, gamodify, easynft): restore as real case
      studies, or 301 to a relevant study, or return a true 404/410. None may stay HTTP 200 + "Page Not Found."
- [ ] **Fix slugs** (301 old→new, lowercase): `katuku-lsland`→`katuku-island`, `Rcss`→`yeah-buddy`, `Mnee`→`mnee`.
- [ ] **Populate every empty `<h1>`** with real text.
- [ ] **Add descriptive `alt`** to every content image.
- [ ] **Per-page `og:title` / `og:url` / `og:image`** (currently all the generic homepage values).
- [ ] **Add real body text** (Problem→Approach→Result) to every study — no more image-only.
- [ ] Fix "Web 3.O" footer typo (sitewide), "is online education platform"→"is an online…" (Testbot).
- [ ] Server-render the `/our-work` grid with crawlable links.
