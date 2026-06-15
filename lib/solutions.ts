export type Accent = "magenta" | "cyan";

export type Solution = {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  detail: string;
  tag: string; // deploy speed / status chip
  accent: Accent;
  features: string[];
  outcomes: { v: string; l: string }[];
  bestFor: string;
};

// Productized, ready-to-deploy offerings (distinct from custom Services).
export const solutions: Solution[] = [
  {
    slug: "ready-to-use-ai-agents",
    name: "Ready-to-Use AI Agents",
    category: "AI Agents",
    blurb: "Pre-built agents for support, ops and sales — deploy in days, not months.",
    detail:
      "A library of production-hardened agents (support, research, data ops, sales assist) you can configure to your data and ship in days — with guardrails, evals and human-in-the-loop built in.",
    tag: "Deploy in days",
    accent: "magenta",
    features: [
      "Pre-built agents for support, sales, research and operations",
      "Configured to your data, tools and brand voice",
      "Guardrails, evals and human-in-the-loop built in",
      "Connects to your stack via MCP, APIs and webhooks",
      "Observability and audit trails from day one",
    ],
    outcomes: [
      { v: "Days", l: "to deploy" },
      { v: "24/7", l: "always on" },
    ],
    bestFor: "Teams that want agent automation live fast, without a ground-up build.",
  },
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    category: "Voice AI",
    blurb: "Inbound & outbound voice that books, qualifies and resolves 24/7.",
    detail:
      "Sub-500ms voice agents that answer every call, book appointments, qualify leads and resolve Tier-1 support — with clean human escalation and CRM sync. Live in weeks.",
    tag: "Live in weeks",
    accent: "cyan",
    features: [
      "Inbound answering, outbound campaigns and IVR replacement",
      "Sub-500ms latency with natural, tuned persona design",
      "Appointment booking and lead qualification",
      "Telephony + CRM/EHR integration (Twilio, SIP, Genesys)",
      "Clean human escalation and call analytics",
    ],
    outcomes: [
      { v: "<500ms", l: "latency" },
      { v: "24/7", l: "call coverage" },
    ],
    bestFor: "Businesses drowning in calls or missing after-hours bookings and leads.",
  },
  {
    slug: "satellite-intelligence",
    name: "Satellite Intelligence",
    category: "Geospatial",
    blurb: "Off-the-shelf geospatial analytics — detection, change & monitoring.",
    detail:
      "Turn satellite and drone imagery into decisions: object & change detection, asset mapping, vegetation and site monitoring — packaged dashboards on top of our eNetra GeoAI engine.",
    tag: "Productized",
    accent: "cyan",
    features: [
      "Object, asset and change detection from satellite & drone imagery",
      "Vegetation, encroachment and site-condition monitoring",
      "Per-asset analytics with dashboards and alerts",
      "Built on our eNetra GeoAI engine",
      "Exports to your GIS (ArcGIS, QGIS, FME)",
    ],
    outcomes: [
      { v: "0.28 m", l: "resolution" },
      { v: "automated", l: "monitoring" },
    ],
    bestFor: "Power, utilities, agritech, insurance and real estate teams managing land & assets.",
  },
  {
    slug: "vr-training",
    name: "VR Training",
    category: "Immersive",
    blurb: "Immersive, measurable training for high-stakes, hands-on work.",
    detail:
      "Hands-free VR training modules that cut time-to-competency and measure it — for field operations, safety, manufacturing and power infrastructure. Built on Unity & Unreal.",
    tag: "Measurable",
    accent: "magenta",
    features: [
      "Hands-free, scenario-based VR training modules",
      "Built-in assessment and competency scoring",
      "Safety, field-ops, manufacturing and power use cases",
      "Multiplayer and instructor modes",
      "Analytics dashboard for training outcomes",
    ],
    outcomes: [
      { v: "4×", l: "faster to competency" },
      { v: "measured", l: "outcomes" },
    ],
    bestFor: "Organizations training for high-stakes, hard-to-rehearse, hands-on work.",
  },
  {
    slug: "vr-real-estate-demo",
    name: "VR Real Estate Demo",
    category: "Immersive · Real Estate",
    blurb: "Walk buyers through properties in VR — before they're built.",
    detail:
      "Photoreal, navigable VR/AR property walkthroughs of units and developments, so buyers experience the space remotely and pre-sales close faster.",
    tag: "Pre-sales ready",
    accent: "cyan",
    features: [
      "Photoreal, navigable VR/AR walkthroughs",
      "Pre-construction units and full developments",
      "Furnishing, finish and layout configurators",
      "Web, headset and mobile AR delivery",
      "Lead capture built into the experience",
    ],
    outcomes: [
      { v: "remote", l: "viewings" },
      { v: "faster", l: "pre-sales" },
    ],
    bestFor: "Developers and brokers selling off-plan or premium properties.",
  },
  {
    slug: "real-estate-broker-platform",
    name: "Real Estate Broker Platform",
    category: "Platform · Real Estate",
    blurb: "A white-label platform for brokers — listings, leads, CRM and AI assist.",
    detail:
      "An end-to-end, white-label brokerage platform: listings, lead capture and routing, a built-in CRM, and an AI assistant that qualifies buyers and answers property questions around the clock.",
    tag: "White-label",
    accent: "magenta",
    features: [
      "Listings management with rich media and VR/AR",
      "Lead capture, scoring and automated routing",
      "Built-in CRM and deal pipeline",
      "24/7 AI assistant that qualifies buyers and books viewings",
      "White-label branding and multi-agent support",
    ],
    outcomes: [
      { v: "white-label", l: "your brand" },
      { v: "24/7", l: "AI buyer assist" },
    ],
    bestFor: "Brokerages and property marketplaces that want a modern, AI-native platform.",
  },
  {
    slug: "document-intelligence",
    name: "Document Intelligence",
    category: "AI · Data",
    blurb: "Extract, classify and query documents at scale with AI.",
    detail:
      "Ingest contracts, forms and records; extract structured data, classify, and make everything queryable by an AI agent — with citations back to the source.",
    tag: "Deploy in days",
    accent: "cyan",
    features: [
      "Extraction from contracts, forms, invoices and records",
      "Classification, routing and validation",
      "Natural-language search with source citations",
      "Human-in-the-loop review for edge cases",
      "API and dashboard delivery",
    ],
    outcomes: [
      { v: "at scale", l: "processing" },
      { v: "cited", l: "answers" },
    ],
    bestFor: "Teams buried in paperwork — legal, finance, operations, compliance.",
  },
  {
    slug: "ai-knowledge-assistant",
    name: "AI Knowledge Assistant",
    category: "AI Agents",
    blurb: "A grounded chat assistant over your company knowledge.",
    detail:
      "A retrieval-grounded assistant that answers from your docs, wikis and data — accurate, cited and access-controlled. Embeddable in your app, site or Slack.",
    tag: "Live in weeks",
    accent: "magenta",
    features: [
      "Grounded in your docs, wikis, tickets and data",
      "Accurate, cited answers — no hallucinated facts",
      "Role-based access control and audit logging",
      "Embeds in your app, website, Slack or Teams",
      "Continuously updated as your knowledge changes",
    ],
    outcomes: [
      { v: "grounded", l: "+ cited" },
      { v: "secure", l: "access control" },
    ],
    bestFor: "Companies whose teams or customers waste time hunting for answers.",
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
