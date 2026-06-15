# 08 — SEO-Safe Migration & Build Plan

The governing verdict from the research: **you can radically change positioning, IA, design, and
copy — and add new pages — without losing rankings, PROVIDED** every old URL maps 1:1 to a 301,
surviving pages keep their title/H1 keyword + content depth, and you fix the soft-404 / empty-H1
/ CSR-crawlability defects at the same time. Be aggressive on design and message; be inviolable
on URLs and signal continuity.

---

## 1. The redirect map (build this first — it's the spine)

Seed a spreadsheet from: the XML sitemap (42 URLs), Search Console's indexed-pages list, server
logs, and analytics — so you catch externally-linked URLs too. Every old URL gets exactly one
disposition:

| Disposition | When | Rule |
|---|---|---|
| **Keep same URL** | Intent survives (most `/services/*`, `/about-us`, `/contact-us`, `/our-work`, `/`) | No redirect. Rewrite content; preserve title/H1 keyword + depth. |
| **301 to new URL** | Slug changes (`katuku-lsland`→`katuku-island`, `Rcss`→`yeah-buddy`, `Mnee`→`mnee`) | Server-side, one hop, relevant target. |
| **301 to consolidated page** | Redundant lead pages → `/contact-us` | `free-quote`, `get-free-estimation`, `get-free-consultation` → `/contact-us`. |
| **Restore content** | Dead soft-404s that are real projects (Mnee, solarplace, gamodify…) | Rebuild as proper case studies. |
| **Real 404 / 410** | Genuinely dead, no equivalent | Return true status — **never HTTP 200 + "Page Not Found".** |
| **New URL** | Net-new pages | `/services`, `/services/ai-agent-development`, `/services/voice-ai-agents`, `/services/geospatial-intelligence`, `/industries/*`. |

**301 rules (non-negotiable):**
- Use **301/308** only — never 302/307/303 for a migration (they don't pass authority).
- Redirect to a **content-relevant** target. Redirecting to the homepage = soft 404 = equity lost.
- **No redirect chains** (A→B→C). Old URL points directly to the final destination. Scan with
  Screaming Frog and collapse chains.
- **Implement in `next.config.js` `redirects()` / middleware** (server-side) — not JS redirects.
- Keep redirects live **≥ 1 year**; longer if still getting Google traffic.

---

## 2. Content parity on surviving pages (the rewrite constraint)

Design/visuals: change freely. The risk line is crossed only when you *strip* the signals a page
ranks for. On every kept/redirected page, **preserve-or-improve** (never silently drop):
- **Title tag** — keep/sharpen; don't lose the ranking keyword.
- **H1** — keep the primary keyword/intent (and *add* one where it's missing — homepage, case studies).
- **Meta description** — keep/improve.
- **Above-the-fold intro copy + body depth** — page must still obviously be "about" its keyword;
  keep it at least as deep (don't trade a 1,200-word study for an image).
- **Internal links** — re-point to new URLs directly (not via the 301).

Expect 1–3 weeks of volatility even on a clean migration; stabilizes in 14–30 days.

---

## 3. Technical SEO for the Next.js rebuild

The current case studies (image-only, CSR, empty H1) are the biggest pre-existing defect — fixing
them is pure upside (AI crawlers like GPTBot/PerplexityBot often **don't execute JS at all**).

- **Render real HTML server-side:** SSG/ISR for case studies + service pages; content (H1, body,
  meta, JSON-LD, nav) present in the server response before JS runs.
- **Every page:** one real `<h1>` with the target keyword; descriptive `alt` on every content
  image; real `<a href>` nav via `<Link>` (not onClick).
- **Sitemap:** dynamic `sitemap.ts` (or `next-sitemap`), canonical indexable URLs only; submit in GSC.
- **Self-referencing canonical** on every page.
- **Per-page Open Graph:** unique `og:title`/`og:url`/`og:image` (audit found all set to the
  generic homepage values).
- **JSON-LD** (native `<script type="application/ld+json">`, sanitize `<`):
  - **Organization** sitewide (logo, both phones, address, socials, sameAs to Clutch/LinkedIn).
  - **Service** on each service page.
  - **BreadcrumbList** on services + case studies.
  - **FAQPage** on home + service pages (highest CTR uplift; drives AI-search citation).
  - **Article/CreativeWork** on case studies; **JobPosting** on careers roles.
  - Validate all in the Rich Results Test; markup must match visible content.
- **Core Web Vitals:** LCP ≤ 2.0–2.5s, INP ≤ 200ms, CLS ≤ 0.1 (see `07` budget). A CWV
  regression is a named cause of post-migration ranking loss — benchmark before/after.

---

## 4. Migration checklist

**Pre-launch (60–70% of success):**
- [ ] 1:1 redirect map finalized — every old URL accounted for (keep / 301 / 404-410).
- [ ] Crawl staging with Screaming Frog: each old URL → correct target, **zero chains**, no stray 404s.
- [ ] Content-parity audit on surviving pages (title/H1/meta/keyword/intro/depth/internal links).
- [ ] Staging is `noindex` + blocked AND that protection is **removed at launch** — verify across
      ALL templates (a stray sitewide `noindex`/`Disallow: /` shipping to prod is the #1 catastrophic failure).
- [ ] New sitemap built; canonicals in place; JSON-LD validated.
- [ ] Benchmark captured: rankings, top organic pages, traffic, CWV, indexed-URL count.

**Launch day:**
- [ ] Deploy server-side redirects.
- [ ] **Remove noindex/password on every template** (verify, don't assume).
- [ ] Submit new sitemap in GSC. (Change of Address only if the domain changes — not needed here.)
- [ ] Re-verify redirects live in prod (Screaming Frog) + hand-check top pages.

**Post-launch monitoring:**
- [ ] Launch day: hourly — crawl errors, redirect integrity, indexing.
- [ ] Week 1: daily GSC Pages/Coverage — watch 404s, "Excluded by noindex", Soft 404, "Crawled–not indexed".
- [ ] 90 days: weekly rankings/traffic/indexed-count vs baseline.
- [ ] Run **Validate Fix** in GSC on resolved Soft 404 / 404 issues (incl. the 5 portfolio pages).
- [ ] Keep 301s ≥ 1 year.

---

## 5. Suggested build phasing

> Sequenced so value lands early and risk stays low. Adjust to team capacity.

**Phase 0 — Foundations & quick wins (no redesign needed):**
Fix the bleeding now — 5 soft-404s, empty H1s, "0+" stats, footer "Web 3.O", "WEB 3.O"/"ETHERIUM"/
"Industy" typos, truncated heros (3D, IoT), duplicate ecommerce section, careers apply path,
privacy update. These are independent of the redesign and recover credibility immediately.

**Phase 1 — Spine:** positioning, design system (`07`), homepage (`03`), nav/footer/IA (`02`),
the conversion system + single lead page (`06`), redirect map + consolidate lead pages.

**Phase 2 — Flagship & pillars:** `/services` hub + `/services/ai-agent-development` +
`/services/voice-ai-agents` + `/services/geospatial-intelligence` (`04`); retell the 12 existing
service pages on the template; signature hero + live demos (`07`).

**Phase 3 — Proof:** rebuild `/our-work` (server-rendered grid) + rewrite case studies to
Problem→Approach→Result (`05`); add 2–3 flagship AI/Voice/Geospatial case studies.

**Phase 4 — Depth:** `/industries/*` pages, `/insights` blog (topical authority + AI-search),
JobPosting-rich careers, schema everywhere.

---

## 6. Definition of done (don't ship until all true)

- [ ] Zero brackets `[LIKE THIS]` and zero "0+" / "100% Project Delivered" on any live page.
- [ ] Every page has exactly one real `<h1>`; every content image has `alt`.
- [ ] Every old URL: keep / 301-relevant / true-404 — verified, no chains, no soft-404s.
- [ ] Surviving pages keep their title/H1 keyword + depth; internal links point to final URLs.
- [ ] One primary CTA (`Book a call`) sitewide; multi-step form + calendar live; sticky CTA.
- [ ] LCP/INP/CLS within budget on mobile; content server-rendered & crawlable.
- [ ] JSON-LD (Organization/Service/FAQ/Breadcrumb/Article) validated; sitemap submitted.
- [ ] No staging `noindex`/robots block shipped to production.
- [ ] Reduced-motion path works; live demos are sandboxed, rate-limited, click-to-start, with transcript.
