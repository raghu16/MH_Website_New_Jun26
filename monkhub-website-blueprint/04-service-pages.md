# 04 — Service Pages

The reusable template, full paste-ready copy for the **flagship + 3 new pillars**, and how the
existing 12 service pages are retold onto the same template.

---

## The universal service-page template

Every service page follows this skeleton (kills the audit's "boilerplate with the name swapped"
problem by forcing *specific, differentiated* content in each slot):

1. **Hero** — eyebrow, pain-first H1 (one `<h1>`, real text — fixes empty/missing H1s),
   outcome subhead, primary + secondary CTA, 3 proof chips.
2. **The problem** — name the buyer's pain in their words (2–3 sentences).
3. **What we build** — 5–8 *specific* sub-services, **each with a one-line description** (the
   audit found name-only cards — always add descriptions).
4. **Outcomes / proof** — metric tiles (real) + 1–2 named case studies for *this* service.
5. **How it works** — the delivery approach for this capability.
6. **Why Monkhub** — 3–4 differentiators (service-specific, not generic).
7. **Tech & integrations** — the stack, named.
8. **Trust/governance band** — where relevant (agents, voice, geospatial, enterprise).
9. **Related work + related services** — internal links (hub-and-spoke).
10. **Service-specific FAQ** (FAQPage schema).
11. **CTA.**
12. **Meta:** unique title + description + Service JSON-LD.

**Consistency rules (fix the audit findings):**
- Standardize CTA labels sitewide: **primary `Book a call`**, secondary `See [service] work`.
- Standardize the stat block: **"250+ Products Shipped"** (plural; never "100% Project Delivered").
- Each page's testimonials/case studies must be **relevant to that service** (don't repeat the
  same 3 testimonials on all 12 pages).

---

## FLAGSHIP — `/services/ai-agent-development` (NEW)

**Eyebrow:** AI AGENT DEVELOPMENT

**H1:** # Agents that act — and keep working in production.

**Subhead:** We design, build, and ship custom AI agents that take real actions in your stack —
with the evals, guardrails, and observability to keep them reliable. From RAG to multi-agent
systems, built to get past the pilot.

**CTAs:** `Book a call →` · `See our agents live →` (demo)
**Proof chips:** `[X] agents in production` · `[80%]↓ resolution time` · `SOC 2-ready`

### The problem
Most AI agents demo well and die in production — they hallucinate, can't reach your systems,
have no guardrails, and no one can prove they work. ~67% of AI initiatives never leave the
pilot. The gap isn't the model. It's the engineering around it.

### What we build
- **Custom AI agents** — Goal-driven agents that retrieve context, call tools, and take actions within defined boundaries.
- **Multi-agent orchestration** — Coordinated agent systems (LangGraph-style) for complex, multi-step work.
- **RAG & retrieval engineering** — Grounded answers from your data — accurate, current, cited.
- **Evals & reliability** — Evaluation suites, red-teaming, and guardrails that prove an agent works *before* it ships. *(Our headline differentiator — most firms skip it.)*
- **MCP & tool integrations** — Connect agents to your apps, data, and APIs via the Model Context Protocol.
- **Copilots & agentic workflows** — In-product assistants and automation that save real hours.
- **LLMOps & observability** — Monitoring, tracing, and audit trails for agents in production.
- **AI strategy & feasibility** — A low-risk on-ramp: we pressure-test the use case, data, and ROI first.

### Outcomes
- **[80%] ↓ case-resolution time** — [agentic support system for CLIENT].
- **[X hrs] saved per day** — [workflow automation for CLIENT].
- **[Xx] productivity** — [copilot for CLIENT].
`Read the case study →`

### How it works
Discover & scope ROI → Prototype against real eval criteria → Engineer with guardrails &
integration → Ship, monitor, and improve in production.

### Why Monkhub
1. **Evals as a first-class deliverable** — we prove reliability, we don't promise it.
2. **Agents that ship into real products** — into your app, voice channel, or map, not a sandbox.
3. **Governed by default** — human-in-the-loop, audit trails, data controls.
4. **Senior, AI-first engineers** — not a junior team learning on your budget.

### Trust & governance band
Output validation & guardrails · Human approval gates · Immutable audit logs · Data residency /
self-host options · `[SOC 2]` `[ISO 27001]` `[GDPR]` *(label honestly).*

### Tech
LangGraph · LlamaIndex · MCP · OpenAI / Anthropic / open models · vector DBs (pgvector, Pinecone,
Weaviate) · LangSmith/Langfuse for evals & tracing · your cloud (AWS/Azure/GCP).

### Live demo
A sandboxed, rate-limited demo agent: "**Ask our demo agent a question →**" (see `07`).

### FAQ
- How do you stop agents from hallucinating? · How do agents connect to our systems? · What's an
  eval and why does it matter? · Can agents run on our own infrastructure? · How fast to a
  working prototype?

**Meta — Title:** `AI Agent Development Company — Custom & Multi-Agent Systems | Monkhub`
**Description:** `Monkhub builds production-grade AI agents — custom agents, multi-agent
orchestration, RAG, evals and guardrails. Reliable AI that ships. Book a call.`

---

## PILLAR — `/services/voice-ai-agents` (NEW)

**Eyebrow:** VOICE AI AGENTS

**H1:** # Voice agents that handle every call — 24/7.

**Subhead:** Natural, sub-500ms voice agents that resolve support calls, book appointments, and
qualify leads end-to-end — and hand off to a human the moment they should. Scale your call
volume, not your headcount.

**CTAs:** `Book a call →` · `Hear a voice agent live →` (voice demo widget)
**Proof chips:** `[59%] call deflection` · `<500ms latency` · `[40+] languages`

### The problem
"Press 1 for…" menus frustrate customers, and hiring more agents doesn't scale. Most voice bots
break the moment a real conversation goes off-script. After-hours calls — and the bookings and
revenue in them — go unanswered.

### What we build
- **Support call deflection** — Resolve Tier-1 calls end-to-end; escalate cleanly when needed.
- **Appointment booking & intake** — Never miss an after-hours booking; capture details into your CRM/EHR.
- **AI receptionist** — "Never miss a call" answering for every inbound.
- **Lead qualification & outbound** — Qualify and route, or run outbound campaigns at scale.
- **Healthcare intake** — HIPAA-aware intake with EHR integration.
- **Voice & persona design** — The craft that makes an agent sound human, not robotic. *(Our wedge.)*
- **Telephony & CRM integration** — Twilio/SIP/Genesys + your CRM/EHR.
- **Monitoring & optimization** — Ongoing tuning, adversarial testing, and quality monitoring.

### Outcomes
- **[59%] of Tier-1 calls deflected** — [CLIENT], with CSAT maintained at [X].
- **[$X → $Y] cost per call** — vs human agents.
- **[40%] of bookings captured after-hours** — [CLIENT].

### Why Monkhub
Platform-agnostic (Vapi, Retell, ElevenLabs, or PolyAI — we pick the right one), done-for-you
and production-hardened, with persona/conversation design as real craft and a monitoring retainer
so it keeps improving. We sell the **de-risked outcome**, not minutes of tooling.

### Trust band
HIPAA-aware · SOC 2 · GDPR · call recording/consent controls · human-escalation by design.

### Tech
Vapi · Retell · ElevenLabs · PolyAI · Twilio/SIP · Genesys · your CRM/EHR.

**Meta — Title:** `Voice AI Agent Development — 24/7 Call Automation | Monkhub`
**Description:** `Monkhub builds natural, sub-500ms voice AI agents that deflect support calls,
book appointments and qualify leads 24/7. HIPAA-aware. Book a call.`

---

## PILLAR — `/services/geospatial-intelligence` (NEW)

**Eyebrow:** GEOSPATIAL INTELLIGENCE

**H1:** # Turn satellite, drone, and location data into decisions.

**Subhead:** We build GeoAI that reads the real world at scale — detecting change, mapping
assets, and surfacing what matters across territory you can't walk. Intelligence engineered for
the field, not the lab.

**CTAs:** `Book a call →` · `Request a feasibility assessment →`
**Proof chips:** `[95%] less model-dev time` · `[99.9%] uptime` · `Gov-ready`

### The problem
The data — satellite, drone, LiDAR, GPS — is abundant. Turning it into a timely, trustworthy
decision is the hard part. Off-the-shelf GIS doesn't understand your assets, and manual analysis
can't keep up with the imagery.

### What we build
- **Imagery analysis (satellite / drone / LiDAR)** — Object detection, segmentation, and classification on optical, SAR, and hyperspectral data.
- **Change detection & monitoring** — Spot what changed — encroachment, damage, growth, movement — automatically.
- **Building & asset footprint extraction** — Map structures and infrastructure at scale (key for insurance & utilities).
- **GIS integration** — ArcGIS, QGIS, FME — GeoAI inside the tools your teams use.
- **Digital twins** — Living models of networks, sites, and cities that match the real world.
- **Route optimization & geofencing** — Smarter fleet, logistics, and field operations.
- **Geospatial foundation models** — EO models (Prithvi-EO, Clay) fine-tuned to your domain. *(2026 differentiator few agencies offer.)*
- **Predictive geospatial analytics** — Forecast risk, yield, and demand across territory.

### Industries (each can become an `/industries/*` spoke)
**Defense & gov** (operating picture, tempo) · **Insurance** (underwrite & validate claims from
imagery) · **Agritech** (scout only where problems are) · **Logistics** (routing + geofencing) ·
**Energy/utilities** (network digital twin) · **Mining & ESG** (change detection, traceability).

### Outcomes
- **[95%] less model-development time** — [CLIENT].
- **[X] assets monitored automatically** — [CLIENT].

### Why Monkhub
Outcome-first (we sell decisions, not pixels), domain-tuned models (not generic CV), and a
visible compliance posture for sensitive work: **data residency, US-persons staffing / ITAR-aware
where applicable, explainable outputs.** Be explicit about data source, resolution, and freshness
— this buyer is conservative and checks.

### Tech
PyTorch · ArcGIS/QGIS/FME · GDAL/rasterio · Prithvi-EO/Clay · deck.gl/MapLibre · your cloud.

**Meta — Title:** `Geospatial Intelligence & GeoAI Development | Monkhub`
**Description:** `Monkhub builds GeoAI from satellite, drone and location data — change
detection, imagery analysis, digital twins and route optimization for defense, insurance,
agritech and logistics. Book a call.`

---

## Retelling the existing 12 service pages (same URLs, same template)

Each keeps its URL and core keyword (per `02`), gets retold on the template above, and links
**up** to the relevant new pillar and **across** to related services. Key moves + audit fixes:

| Page (kept URL) | New angle | Must-fix from audit |
|---|---|---|
| `mobile-app-development` | "AI-native mobile" — on-device ML, in-app agents; outcome language (retention, revenue). | Differentiate from boilerplate; add real, mobile-specific case studies. |
| `ai-ml-development` | "AI/ML & data foundations" — the engine room beneath the agent flagship; links up to AI Agents. | **Fix portfolio showing "Testbot" 4×**; add distinct projects. |
| `ar-vr-xr-development` | Keep as strongest page; reframe enterprise XR training (steal PwC stats: 4× faster, 275% more confident, 52% cheaper). | Fix "AR\|VR" pipe + add "XR"; fix "Monkhub ?" stray space. |
| `game-development` | Two lanes: co-dev/full-cycle **and** serious/applied games ("measurable impact"). | Add engine/pipeline depth (Unity & Unreal); fix CTA wording. |
| `3d-modelling-animation` | Tie to XR/gaming/product viz; outcome-led. | **Fix truncated hero**; build out to match siblings; pick one spelling. |
| `ui-ux` | Product design that ships; AI-era UX (designing for agents/copilots). | **Fix "Industy Experts" + "gurdian"**; add card descriptions. |
| `metaverse-development` | Keep differentiated; tie to XR + Web3 pillars. | Fix FAQ grammar "What tools you use". |
| `web3-development` | Keep depth (DeFi/STO/NFT/stablecoin); tie to blockchain. | **Fix "WEB 3.O"→"Web 3.0" and "ETHERIUM"→"Ethereum" (both ×2+).** |
| `web-development` | "Web & product engineering" — the surface AI ships into. | **Fix carousel repeating one NFT entry 4×; remove duplicate Azure; add card descriptions.** |
| `iot-robotics-development` | "AI + the physical world" — link to geospatial/edge ML. | **Fix truncated hero**; add named offerings; differentiate. |
| `ecommerce-development` | AI commerce — agents for search, support, merchandising. | **De-dupe "Why Choose" section; standardize "eCommerce"; fix meta "services builds".** |
| `blockchain-development` | Keep; tie to Web3 + geospatial (provenance/traceability). | Fix dangling "decentralized" in meta. |

**Services hub `/services` (NEW):** the cluster pillar — a clean overview grouping all services
(AI & Agents / Applications / Immersive), leading with the flagship, linking to every spoke.
This is the page the mega-menu and homepage "see all services" point to.
