# 02 — Information Architecture & URL Map

The new structure, and how it maps onto the existing URLs so **no ranking equity is lost**.

---

## 1. The IA principle: hub-and-spoke topic clusters

- **Hubs:** `/services` (capabilities), `/our-work` (proof), `/industries` (new — who we serve).
- **Spokes:** each service page, each case study, each industry page.
- Every spoke links **back to its hub**, **laterally to related spokes**, and **out to supporting
  case studies**. This builds topical authority (and AI-search citation), and it's how a serious
  buyer navigates: capability → proof → "do you understand my world."

---

## 2. Primary navigation

Keep it to **5 top-level items + 1 CTA**. (Elite tech sites stay lean — Linear, Vercel, Sierra.)

```
[Monkhub logo]   Services ▾   Work   Industries   Company ▾        [ Book a call ]
```

**Services ▾ (mega-menu, grouped):**
```
AI & AGENTS                    APPLICATIONS              IMMERSIVE
• AI Agent Development  ◀flag  • Mobile Development      • XR / AR / VR
• Voice AI Agents             • Web & Product Eng.       • Game Development
• Geospatial Intelligence     • E-commerce               • Metaverse
• AI/ML & Data                • UI/UX Design             • 3D & Animation
• Blockchain / Web3           • IoT & Robotics
```
The mega-menu visually leads with the **AI & Agents** column (it's the flagship). The existing
12 services all live here — re-grouped and re-told, not deleted (see §4 for the URL mapping).

**Company ▾:** About · Careers · Contact · (Blog/Insights — see §5)

**Persistent CTA:** "Book a call" in the header (always visible) + a mobile sticky bottom bar.
This is the single primary conversion action sitewide (research: single focused CTA lifts
conversion up to 371%; sticky CTA +12–31%).

---

## 3. Page inventory (new site)

| Section | Pages |
|---|---|
| **Home** | `/` |
| **Services hub** | `/services` (NEW hub page) |
| **Flagship** | `/services/ai-agent-development` (NEW) |
| **Pillars** | `/services/voice-ai-agents` (NEW), `/services/geospatial-intelligence` (NEW) |
| **Existing services (re-told)** | the 12 current `/services/*` pages — kept, rewritten, re-grouped |
| **Work** | `/our-work` (hub) + each `/portfolio/*` case study |
| **Industries (NEW)** | `/industries` + spokes: `/industries/defense-gov`, `/industries/healthcare`, `/industries/logistics`, `/industries/fintech`, `/industries/retail-ecommerce`, `/industries/agritech` |
| **Company** | `/about-us`, `/careers`, `/contact-us`, `/privacy-policy` |
| **Conversion** | `/contact-us` becomes the single lead destination (see §4) |

> **Industries pages are optional Phase 2** but high-value: geospatial, voice, and XR all sell
> by vertical. Start with the 2–3 verticals where you have real proof.

---

## 4. THE URL MAP (old → new) — the SEO spine

**Rule:** keep the URL whenever the page's intent survives; 301 (server-side, one hop, to a
*relevant* target) everything you change; never blanket-redirect to the homepage. Keep 301s
live ≥ 1 year. Full checklist in `08`.

### Keep same URL, rewrite content (intent survives — ~95% of value, zero risk)

| URL | Action |
|---|---|
| `/` | Keep. New positioning + **add the missing H1**. |
| `/services/mobile-app-development` | Keep. Retell as "AI-native mobile." Preserve title keyword "Mobile App Development." |
| `/services/ai-ml-development` | Keep. Becomes the AI/ML & data page; links up to the new AI Agent flagship. |
| `/services/ar-vr-xr-development` | Keep (strongest existing page). Retell, keep proof. |
| `/services/blockchain-development` | Keep. Fix "decentralized" dangling copy. |
| `/services/game-development` | Keep. Reframe as "serious + entertainment games, measurable." |
| `/services/3d-modelling-animation` | Keep. **Fix truncated hero**, build out to match siblings. |
| `/services/ui-ux` | Keep. **Fix "Industy Experts"**, add card descriptions. |
| `/services/metaverse-development` | Keep. |
| `/services/web3-development` | Keep. **Fix "WEB 3.O"→"Web 3.0" and "ETHERIUM"→"Ethereum".** |
| `/services/web-development` | Keep. **Fix portfolio carousel repeating one NFT entry 4×; remove duplicate Azure.** |
| `/services/iot-robotics-development` | Keep. **Fix truncated hero**; add named offerings. |
| `/services/ecommerce-development` | Keep. **De-duplicate "Why Choose" section; standardize "eCommerce" spelling; fix meta "services builds".** |
| `/about-us` | Keep. Add team/leadership + refresh meta off NFT/Metaverse framing. |
| `/careers` | Keep. **Add real roles + on-site apply flow.** |
| `/privacy-policy` | Keep. **Update date; add GDPR/CCPA.** |
| `/contact-us` | Keep. Becomes the **single** lead destination (multi-step form + calendar). |
| `/our-work` | Keep. **Server-render the project grid** (currently invisible to crawlers). |

### Add new URLs (safe — additive, builds topical authority)

| New URL | Why |
|---|---|
| `/services` | NEW services hub (the cluster pillar page). |
| `/services/ai-agent-development` | NEW flagship. |
| `/services/voice-ai-agents` | NEW pillar. |
| `/services/geospatial-intelligence` | NEW pillar. |
| `/industries`, `/industries/*` | NEW (Phase 2). |

### Consolidate — 301 the redundant lead pages into one

| Old URL | Action |
|---|---|
| `/free-quote` | **301 → `/contact-us`** |
| `/get-free-estimation` | **301 → `/contact-us`** (also had duplicate title bug — gone) |
| `/get-free-consultation` | **301 → `/contact-us`** (also had "Lets connect" typo — gone) |

One strong lead page beats three thin, cannibalizing ones.

### Fix the 5 dead "soft-404" portfolio pages (currently HTTP 200 + "Page Not Found")

For each: if the project is real and you want it shown → **restore as a proper case study** at
its URL. If it's genuinely dead → **301 to the most relevant live case study**, or return a
**real 404/410** so Google drops it. **Do not leave them returning 200.**

| URL | Likely action |
|---|---|
| `/portfolio/Mnee` | Restore (MNEE stablecoin is referenced as real proof on the blockchain page) — fix the **capitalized slug**: serve at `/portfolio/mnee`, 301 `Mnee`→`mnee`. |
| `/portfolio/gamego` | Restore or 410. |
| `/portfolio/solarplace` | Restore (Solar Place is cited on the AR/VR page) or 301 → AR/VR work. |
| `/portfolio/gamodify` | Restore (cited on game page) or 410. |
| `/portfolio/easynft` | Restore or 410. |

### Fix broken / cryptic slugs (301 old → corrected)

| Old slug | New slug | 301 |
|---|---|---|
| `/portfolio/katuku-lsland` (typo: "lsland") | `/portfolio/katuku-island` | old → new |
| `/portfolio/Rcss` (cryptic; page is "Yeah Buddy / Ronnie Coleman") | `/portfolio/yeah-buddy` | old → new |
| `/portfolio/Mnee` (capitalized) | `/portfolio/mnee` | old → new |

> Mixed-case slugs are case-sensitivity hazards. Normalize **all** portfolio slugs to
> lowercase-hyphenated and 301 the old casing.

### Blog

Old `/blog/*` URLs currently **404** but were once indexed. Either **revive as `/insights`**
(recommended — see §5) and 301 the most valuable old posts to relevant new content, or 301 old
blog URLs to the closest live page. Don't let them keep 404-ing and bleeding equity.

---

## 5. Insights / Blog (new, Phase 2)

A `/insights` hub is the topical-authority and AI-search engine for the AI-first positioning:
publish on agent reliability, evals, voice deflection, GeoAI — the exact terms buyers and LLMs
search. It feeds the service cluster with internal links and earns citations from ChatGPT/
Perplexity/Claude (which increasingly drive B2B discovery). Optional at launch, high ROI soon
after.

---

## 6. Footer (sitewide)

A real, crawlable footer with text links (not JS-only) — also fixes the **"Web 3.O" footer
typo** found on every page.

```
Services            Company          Work              Get started
AI Agents           About            Case studies      Book a call
Voice AI            Careers          Industries        Contact
Geospatial          Insights         ── proof ──       hello@monkhub.com
Mobile · XR · Web   Privacy          Clutch ★ GoodFirms +1 202-740-9722
```
Include: Organization schema, real address, both phone lines, social links, and the 3-element
trust stack (security/compliance · third-party rating · client logo).
