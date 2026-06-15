// Extra content that enriches the service & solution detail pages, keyed by slug.
// Kept separate so the core lib/services.ts and lib/solutions.ts stay untouched.

export type Stat = { v: string; l: string };
export type UseCase = { t: string; d: string };
export type Feature = { t: string; d: string };
export type QA = { q: string; a: string };

export type ServiceExtra = { stats: Stat[]; useCases: UseCase[]; caseStudy?: string };
export type SolutionExtra = {
  features: Feature[];
  stats: Stat[];
  useCases: UseCase[];
  integrations: string[];
  faq: QA[];
  includes: string[];
  timeline: string;
  caseStudy?: string;
};

/* ─────────────────────────── SERVICES ─────────────────────────── */
export const serviceExtras: Record<string, ServiceExtra> = {
  "ai-agent-development": {
    stats: [
      { v: "6–10 wks", l: "to production" },
      { v: "80%", l: "↓ resolution time" },
      { v: "100%", l: "code ownership" },
      { v: "24/7", l: "agents in prod" },
    ],
    useCases: [
      { t: "Customer support", d: "Agents that resolve Tier-1 tickets end-to-end and escalate cleanly." },
      { t: "Internal copilots", d: "In-product assistants that automate research, data ops and workflows." },
      { t: "Revenue ops", d: "Lead qualification, enrichment and follow-up that runs around the clock." },
    ],
    caseStudy: "consumer-indexing",
  },
  "voice-ai-agents": {
    stats: [
      { v: "<500ms", l: "latency" },
      { v: "59%", l: "call deflection" },
      { v: "40+", l: "languages" },
      { v: "24/7", l: "coverage" },
    ],
    useCases: [
      { t: "Support deflection", d: "Resolve Tier-1 calls end-to-end; hand off to a human when it matters." },
      { t: "Booking & intake", d: "Capture after-hours bookings straight into your CRM or EHR." },
      { t: "Outbound & qualifying", d: "Qualify, route and run outbound campaigns at scale." },
    ],
    caseStudy: "voice-concierge",
  },
  "geospatial-intelligence": {
    stats: [
      { v: "0.28 m", l: "imagery resolution" },
      { v: "95%", l: "less model-dev time" },
      { v: "per-asset", l: "monitoring" },
      { v: "gov-ready", l: "compliance" },
    ],
    useCases: [
      { t: "Asset & infra monitoring", d: "Detect change, encroachment and damage across the network automatically." },
      { t: "Agritech & land", d: "Spot crop and land issues early; scout only where it's needed." },
      { t: "Insurance & risk", d: "Underwrite and validate claims from imagery at scale." },
    ],
    caseStudy: "enetra",
  },
  "ai-solutions-development": {
    stats: [
      { v: "Weeks", l: "to an AI MVP" },
      { v: "100%", l: "IP ownership" },
      { v: "Fixed", l: "price" },
      { v: "Senior", l: "engineers only" },
    ],
    useCases: [
      { t: "AI MVP", d: "A production-grade AI product in weeks, built to launch and raise on." },
      { t: "AI features", d: "Add AI to an existing product without a rebuild." },
      { t: "Custom models", d: "Models trained and tuned on your data and domain." },
    ],
    caseStudy: "consumer-indexing",
  },
  "mobile-app-development": {
    stats: [
      { v: "iOS + Android", l: "shipped" },
      { v: "↑", l: "retention focus" },
      { v: "on-device", l: "ML" },
      { v: "100%", l: "code ownership" },
    ],
    useCases: [
      { t: "Consumer apps", d: "Habit-forming products built around retention and revenue." },
      { t: "Fintech & payments", d: "Secure, compliant mobile experiences (à la Zigii)." },
      { t: "On-device AI", d: "Core ML / ML Kit features and in-app agents that add real value." },
    ],
    caseStudy: "zigii",
  },
  "web3-development": {
    stats: [
      { v: "audit-ready", l: "contracts" },
      { v: "multi-chain", l: "EVM+" },
      { v: "security", l: "first" },
      { v: "100%", l: "you own it" },
    ],
    useCases: [
      { t: "Tokens & NFTs", d: "ERC-20 / 721 / 1155, minting and marketplace mechanics." },
      { t: "DeFi", d: "Staking, swaps, vaults and on-chain financial primitives." },
      { t: "dApps", d: "End-to-end decentralized apps with mainstream-grade UX." },
    ],
    caseStudy: "cryptomintr",
  },
  "xr-development": {
    stats: [
      { v: "4×", l: "faster training" },
      { v: "275%", l: "more confident" },
      { v: "52%", l: "cheaper at scale" },
      { v: "Unity+Unreal", l: "engines" },
    ],
    useCases: [
      { t: "Enterprise training", d: "Hands-free, measurable VR training for high-stakes work." },
      { t: "Product & retail AR", d: "Try-on, configurators and location-based AR experiences." },
      { t: "Simulation & twins", d: "Immersive digital twins of real environments." },
    ],
    caseStudy: "airmeet",
  },
  "game-development": {
    stats: [
      { v: "full-cycle", l: "development" },
      { v: "Unity+Unreal", l: "engines" },
      { v: "LiveOps", l: "post-launch" },
      { v: "retention", l: "engineered" },
    ],
    useCases: [
      { t: "Mobile & casual", d: "Habit-forming games built for retention (à la Super Neuron)." },
      { t: "Serious / applied", d: "Gamified experiences with measurable outcomes." },
      { t: "Co-development", d: "Embed with your studio to add capacity and craft." },
    ],
    caseStudy: "super-neuron",
  },
  "3d-art": {
    stats: [
      { v: "game-ready", l: "assets" },
      { v: "pipeline", l: "optimized" },
      { v: "Blender+Maya", l: "tooling" },
      { v: "any", l: "art style" },
    ],
    useCases: [
      { t: "Games & XR", d: "Characters, environments and props, optimized for your engine." },
      { t: "Product & arch viz", d: "Photoreal visualization for marketing and real estate." },
      { t: "Animation", d: "Rigging and animation for games, XR and video." },
    ],
    caseStudy: "solar-place",
  },
};

/* ─────────────────────────── SOLUTIONS ─────────────────────────── */
export const solutionExtras: Record<string, SolutionExtra> = {
  "ready-to-use-ai-agents": {
    features: [
      { t: "Pre-built agent library", d: "Support, sales, research and ops agents, ready to configure." },
      { t: "Your data & tools", d: "Connected to your stack via MCP, APIs and webhooks." },
      { t: "Guardrails & evals", d: "Reliability built in, with human-in-the-loop where it matters." },
      { t: "Observability", d: "Audit trails and monitoring from day one." },
    ],
    stats: [{ v: "Days", l: "to deploy" }, { v: "24/7", l: "always on" }, { v: "evals", l: "+ guardrails" }, { v: "100%", l: "you own it" }],
    useCases: [
      { t: "Support automation", d: "Deflect repetitive tickets and free your team for hard cases." },
      { t: "Ops & research", d: "Automate data ops, research and back-office workflows." },
      { t: "Sales assist", d: "Qualify, enrich and follow up with leads automatically." },
    ],
    integrations: ["Slack", "Zendesk", "Salesforce", "HubSpot", "Notion", "MCP / APIs"],
    includes: ["Configured agents", "Integrations setup", "Guardrails & evals", "Observability dashboard", "Optional monitoring retainer"],
    timeline: "Live in days",
    faq: [
      { q: "How is this different from custom AI agents?", a: "Same engineering rigor, but starting from production-hardened building blocks — so you go live in days, not months." },
      { q: "Can it run on our infrastructure?", a: "Yes — self-host and data-residency options are available." },
      { q: "What does it cost?", a: "A fixed deploy fee plus an optional monitoring retainer. We'll scope it on a short call." },
    ],
    caseStudy: "consumer-indexing",
  },
  "ai-voice-agents": {
    features: [
      { t: "Inbound & outbound", d: "Answering, IVR replacement, campaigns and qualification." },
      { t: "Sub-500ms, natural", d: "Tuned persona and turn-taking that holds a real conversation." },
      { t: "Booking & intake", d: "Appointments and details captured into your CRM / EHR." },
      { t: "Clean escalation", d: "Hands off to a human the moment it should." },
    ],
    stats: [{ v: "<500ms", l: "latency" }, { v: "24/7", l: "coverage" }, { v: "59%", l: "deflection" }, { v: "40+", l: "languages" }],
    useCases: [
      { t: "Customer support", d: "Resolve Tier-1 calls 24/7 and never miss an after-hours one." },
      { t: "Healthcare intake", d: "HIPAA-aware intake with EHR integration." },
      { t: "Bookings & reception", d: "Never miss a booking or an inbound call." },
    ],
    integrations: ["Twilio", "SIP", "Genesys", "Salesforce", "HubSpot", "Vapi / Retell"],
    includes: ["Call-flow & persona design", "Telephony + CRM integration", "Adversarial testing", "Launch + monitoring", "Ongoing tuning"],
    timeline: "Live in weeks",
    faq: [
      { q: "Which voice platform do you use?", a: "Platform-agnostic — Vapi, Retell, ElevenLabs or PolyAI, whichever fits your needs." },
      { q: "Is it HIPAA-compliant?", a: "We build HIPAA-aware intake with the right consent and recording controls." },
      { q: "How natural does it sound?", a: "Sub-500ms latency plus tuned persona design — built to hold a real conversation." },
    ],
    caseStudy: "voice-concierge",
  },
  "satellite-intelligence": {
    features: [
      { t: "Detection & classification", d: "Objects, assets and land cover from satellite & drone imagery." },
      { t: "Change monitoring", d: "Automatic alerts on encroachment, damage, growth and movement." },
      { t: "Dashboards & alerts", d: "Per-asset analytics your team can act on." },
      { t: "GIS export", d: "Flows into ArcGIS, QGIS and FME." },
    ],
    stats: [{ v: "0.28 m", l: "resolution" }, { v: "automated", l: "monitoring" }, { v: "per-asset", l: "analytics" }, { v: "GIS", l: "ready" }],
    useCases: [
      { t: "Power & utilities", d: "Monitor lines, sites and vegetation encroachment from space." },
      { t: "Agritech", d: "Track crop, land and yield across large areas." },
      { t: "Insurance & ESG", d: "Validate claims and monitor sites and traceability." },
    ],
    integrations: ["ArcGIS", "QGIS", "FME", "Sentinel / Cartosat", "Drone imagery", "REST API"],
    includes: ["Imagery pipeline", "Detection models", "Monitoring dashboard", "Alerts & exports", "Domain tuning"],
    timeline: "Productized — weeks to onboard",
    faq: [
      { q: "Where does the imagery come from?", a: "Satellite (optical/SAR), drone or your own feeds — we're explicit about source, resolution and freshness." },
      { q: "Do you handle sensitive/gov data?", a: "Yes — with data residency, explainability and the appropriate compliance posture." },
      { q: "Is this custom or off-the-shelf?", a: "Packaged dashboards on top of our eNetra GeoAI engine, configured to your assets." },
    ],
    caseStudy: "enetra",
  },
  "vr-training": {
    features: [
      { t: "Scenario modules", d: "Hands-free, scenario-based training for high-stakes work." },
      { t: "Assessment built in", d: "Competency scoring and analytics, not just completion." },
      { t: "Multiplayer & instructor", d: "Group sessions and instructor modes." },
      { t: "Cross-device", d: "Headset and, where useful, desktop delivery." },
    ],
    stats: [{ v: "4×", l: "faster to competency" }, { v: "275%", l: "more confident" }, { v: "52%", l: "cheaper at scale" }, { v: "measured", l: "outcomes" }],
    useCases: [
      { t: "Field & safety ops", d: "Rehearse dangerous procedures with zero real-world risk." },
      { t: "Manufacturing", d: "Train on equipment and process before the floor." },
      { t: "Power infrastructure", d: "High-stakes infrastructure training, measured." },
    ],
    integrations: ["Unity", "Unreal", "Meta Quest", "LMS / SCORM", "Analytics", "SSO"],
    includes: ["Scenario design", "VR build (Unity/Unreal)", "Assessment & analytics", "Rollout support", "Content updates"],
    timeline: "Measurable in weeks",
    faq: [
      { q: "Can training outcomes really be measured?", a: "Yes — we design around metrics like time-to-competency and confidence, not just completion." },
      { q: "Which headsets do you support?", a: "Meta Quest and other major headsets; we recommend based on your deployment." },
      { q: "Does it integrate with our LMS?", a: "Yes — via SCORM / xAPI and SSO." },
    ],
    caseStudy: "airmeet",
  },
  "vr-real-estate-demo": {
    features: [
      { t: "Photoreal walkthroughs", d: "Navigable VR/AR tours of units and developments." },
      { t: "Pre-construction", d: "Sell off-plan — buyers experience the space before it's built." },
      { t: "Configurators", d: "Furnishing, finish and layout options in real time." },
      { t: "Lead capture", d: "Built into the experience." },
    ],
    stats: [{ v: "remote", l: "viewings" }, { v: "faster", l: "pre-sales" }, { v: "web+VR", l: "+ mobile AR" }, { v: "configurable", l: "units" }],
    useCases: [
      { t: "Off-plan sales", d: "Close pre-construction units with immersive tours." },
      { t: "Premium listings", d: "Differentiate high-value properties with VR/AR." },
      { t: "Remote buyers", d: "Let international buyers experience a space from anywhere." },
    ],
    integrations: ["Unity", "Unreal", "WebXR", "Meta Quest", "iOS / Android AR", "CRM lead capture"],
    includes: ["3D environment build", "Configurators", "Web / headset / mobile delivery", "Lead-capture integration", "Updates"],
    timeline: "Pre-sales ready in weeks",
    faq: [
      { q: "Do buyers need a headset?", a: "No — we deliver web and mobile-AR versions alongside headset experiences." },
      { q: "Can you build from plans only?", a: "Yes — we create photoreal walkthroughs from architectural plans and renders." },
      { q: "Does it capture leads?", a: "Yes — lead capture is built into the experience and flows to your CRM." },
    ],
    caseStudy: "solar-place",
  },
  "real-estate-broker-platform": {
    features: [
      { t: "Listings management", d: "Rich media listings, including VR/AR." },
      { t: "Lead capture & routing", d: "Score and route leads automatically." },
      { t: "Built-in CRM", d: "Pipeline and deal management included." },
      { t: "24/7 AI assistant", d: "Qualifies buyers and books viewings around the clock." },
    ],
    stats: [{ v: "white-label", l: "your brand" }, { v: "24/7", l: "AI buyer assist" }, { v: "multi-agent", l: "support" }, { v: "CRM", l: "built in" }],
    useCases: [
      { t: "Brokerages", d: "Run the whole operation on one modern, AI-native platform." },
      { t: "Marketplaces", d: "Launch a branded property marketplace fast." },
      { t: "Developer sales", d: "Manage and convert inventory with built-in AI." },
    ],
    integrations: ["MLS / portals", "WhatsApp", "Email / SMS", "Payment gateways", "Maps", "Analytics"],
    includes: ["White-label platform", "Listings + CRM", "AI assistant", "Lead routing", "Onboarding & support"],
    timeline: "Launch in weeks",
    faq: [
      { q: "Is it really white-label?", a: "Yes — your brand, your domain, with multi-agent support out of the box." },
      { q: "Does the AI assistant work 24/7?", a: "Yes — it qualifies buyers and books viewings around the clock." },
      { q: "Can it integrate with portals/MLS?", a: "Yes — we connect to the portals and tools you already use." },
    ],
    caseStudy: "apnibus",
  },
  "document-intelligence": {
    features: [
      { t: "Extraction", d: "Pull structured data from contracts, forms, invoices and records." },
      { t: "Classification & routing", d: "Categorize and route documents automatically." },
      { t: "Cited search", d: "Natural-language search with citations back to the source." },
      { t: "Human-in-the-loop", d: "Review queue for edge cases." },
    ],
    stats: [{ v: "at scale", l: "processing" }, { v: "cited", l: "answers" }, { v: "days", l: "to deploy" }, { v: "API", l: "+ dashboard" }],
    useCases: [
      { t: "Legal & contracts", d: "Extract terms and obligations from contracts at scale." },
      { t: "Finance & ops", d: "Process invoices, forms and records automatically." },
      { t: "Compliance", d: "Classify and audit documents with traceability." },
    ],
    integrations: ["S3 / GDrive", "SharePoint", "Salesforce", "Postgres", "REST API", "Webhooks"],
    includes: ["Extraction pipeline", "Classification & routing", "Search + citations", "Review UI", "API access"],
    timeline: "Deploy in days",
    faq: [
      { q: "What document types are supported?", a: "Contracts, forms, invoices, records and more — including scanned PDFs." },
      { q: "Are answers traceable?", a: "Yes — every answer cites its source document and location." },
      { q: "Can a human review edge cases?", a: "Yes — a human-in-the-loop review queue is built in." },
    ],
    caseStudy: "consumer-indexing",
  },
  "ai-knowledge-assistant": {
    features: [
      { t: "Grounded answers", d: "Answers from your docs, wikis, tickets and data — cited, no hallucinations." },
      { t: "Access control", d: "Role-based access and audit logging." },
      { t: "Embeddable", d: "In your app, website, Slack or Teams." },
      { t: "Always current", d: "Updates as your knowledge changes." },
    ],
    stats: [{ v: "grounded", l: "+ cited" }, { v: "secure", l: "access control" }, { v: "weeks", l: "to live" }, { v: "embeddable", l: "anywhere" }],
    useCases: [
      { t: "Internal helpdesk", d: "Stop your team hunting for answers across tools." },
      { t: "Customer self-serve", d: "A grounded assistant on your site or in your product." },
      { t: "Onboarding", d: "Ramp new hires and users faster." },
    ],
    integrations: ["Slack", "Teams", "Notion", "Confluence", "Zendesk", "Web embed"],
    includes: ["Knowledge ingestion", "Grounded assistant", "Access control", "Embeds", "Refresh & tuning"],
    timeline: "Live in weeks",
    faq: [
      { q: "How do you prevent hallucinations?", a: "Answers are retrieval-grounded and cited — it answers from your knowledge, not guesswork." },
      { q: "Is it secure?", a: "Role-based access control and audit logging are built in." },
      { q: "Where can it live?", a: "Embed it in your app, website, Slack or Teams." },
    ],
    caseStudy: "consumer-indexing",
  },
};
