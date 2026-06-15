# 06 — Company Pages, Trust & the Conversion System

About, Careers, Contact/lead, Privacy — plus the lead-generation system that ties the whole
site together. All URLs kept (per `02`).

---

## A. The conversion system (applies sitewide)

### One primary CTA, everywhere
**`Book a call`** is the single primary action across the entire site. (Research: one focused
CTA lifts conversion up to 371% vs competing CTAs; demo/consultation CTAs out-convert "Get a
Quote" for high-ticket custom work.)

- **Kill "Get a Quote" as a primary CTA** and consolidate the 3 redundant lead pages → `/contact-us` (301s in `02`).
- **Secondary CTA** (subordinate, ghost button) for not-ready buyers: `See our work` / `Download capabilities deck`.
- **Sticky CTA:** persistent header `Book a call` + mobile sticky bottom bar (+12–31% conversion).
- **Outcome-framed CTA wording per service** beats generic "Contact": `Hear a voice agent live`,
  `Request a geospatial feasibility assessment`, `See our agents live`.

### The lead form (`/contact-us`)
- **Multi-step** (multi-step converts ~21% higher on B2B; field count is brutal — 3 fields 23%
  → 7 fields 11%). Split into 2–3 steps.
- **Step 1 (lowest friction):** "What are you building?" (short text) + work email. The
  foot-in-the-door — 76% who start a multi-step form finish it.
- **Step 2 (qualify, don't interrogate):** service interest (dropdown: AI Agents / Voice / Geospatial
  / Mobile / XR / Other), company, timeline, budget band (dropdowns qualify without friction).
- **Step 3:** name + phone (optional) → **embedded calendar** (Cal.com/Calendly routing).
  Embedded calendars lift demo requests 30%+; routing screens before showing availability,
  filtering tire-kickers and sending serious buyers straight to a slot.
- Keep the genuinely strong existing contact paths: both phones (+1 202-740-9722 / +91
  9090080015), WhatsApp, Telegram, email, address.

### The trust stack (above the fold, sitewide — exactly 3 elements)
One security/compliance signal · one third-party rating (Clutch/GoodFirms ★) · one recognizable
client logo. Full compliance band lives lower on the page. (Too many badges up top signals risk.)

### Anti-patterns to delete (all found in the audit)
"0+" / "100% Project Delivered" placeholder stats → real metrics or nothing · redundant quote
pages → one · generic boilerplate → specific outcomes · image-only case studies → text.

---

## B. About (`/about-us` — kept)

Goal: turn a credible-but-generic page into a **trust engine**.

**H1:** # We ship AI that works.
**Lead:** Founded in 2017, Monkhub is an AI-first product engineering studio. We've shipped
250+ products across AI agents, voice, geospatial, mobile, and immersive — for startups and
enterprises on four continents.

**Sections:**
1. **Our story / why we exist** — the "most AI dies in the pilot; we ship it" thesis as company belief.
2. **What we believe** — 3–4 principles (Outcomes over output · Reliability is a feature ·
   Senior-led craft · AI where your users are).
3. **Leadership & team** *(NEW — the audit flagged this gap):* real founders/leaders with photos,
   titles, 1-line bios, LinkedIn. The single highest-impact trust addition for an agency.
4. **By the numbers** — REAL stats (250+ products, 150+ clients, 8+ years) — never "0+".
5. **Recognition** — Clutch / GoodFirms / DesignRush badges + named clients (PwC, Airmeet, Honda…).
6. **Where we are** — Gurugram HQ + global reach; both phone lines.
7. **CTA** — `Book a call`.

**Meta fix:** refresh the description off the dated "Blockchain, Metaverse, NFT" framing →
lead with AI agents / AI-first / product engineering. Fix "100% Project Delivered".

---

## C. Careers (`/careers` — kept; biggest functional gap)

The audit found **zero jobs and no apply path** — it just bounces to LinkedIn/Internshala.

**Fix:**
1. **Real, on-page role listings** (even 3–5) with title, team, location, type, and a real
   **Apply** button → an on-site application form (name, email, role, resume upload, links).
   Keeps hiring-intent traffic on-domain and earns JobPosting schema/SEO.
2. **Culture section** — what it's like, how you work (AI-first, senior-led, ship real things).
3. **Benefits / growth** — concise, concrete.
4. **Keep** LinkedIn/Internshala as *secondary* links, not the only path.
5. **Fix typo** "Checkout" → "Check out."

**H1:** # Build AI that ships — with people who care how it's built.
**Meta:** keep "Careers at Monkhub: Join Our Innovative Tech Team" (ranking) but ensure real
job content renders server-side.

---

## D. Privacy (`/privacy-policy` — kept; compliance risk)

The audit found it **stale since 28 Aug 2021** and naming **no GDPR/CCPA**.

**Fix:**
- Update the effective/last-updated date and review content.
- Add **GDPR** (lawful basis, data-subject rights, erasure, retention period, EU representative
  if applicable) and **CCPA/CPRA** sections — the site takes international + US PII via forms.
- Tailor to actual data flows: contact-form PII, careers resumes, analytics tools, hosting, voice
  demo recordings (if the live voice demo ships — disclose recording/consent).
- Add a clear data-request contact. Keep it readable.

> Have counsel review — this is the one page where "good enough copy" isn't good enough.

---

## E. Contact (`/contact-us` — kept; now the single lead hub)

Already the audit's best-structured lead page. Upgrades:
- Becomes the **only** lead destination (3 redundant pages 301'd in).
- Hosts the **multi-step qualifying form + embedded calendar** (section A).
- One H1 (keep "Contact Us" or sharpen to "Book a call"); resolve the hero-vs-H1 headline
  conflict the audit found.
- Replace the "0+ / 0%" stat block with real proof or remove it.
- Reassurance microcopy: "You'll talk to an engineer, not a sales rep."

**Meta:** keep the strong existing title/description.

---

## F. Measurement (so "more leads" is provable)

Instrument from day one: form starts vs completions (per step — find drop-off), calendar
bookings, CTA clicks (by location), scroll depth on service pages, demo-widget engagement.
Targets for high-ticket B2B: **2–5% on the primary contact/demo path**; track time-to-first-touch.
