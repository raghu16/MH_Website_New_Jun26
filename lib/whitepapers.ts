export type WhitePaper = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  pages: string;
  accent: "magenta" | "cyan";
  highlights: string[];
};

// Illustrative white papers — replace with real publications + downloadable PDFs.
export const whitepapers: WhitePaper[] = [
  {
    slug: "production-grade-ai-agents",
    title: "The Production-Grade AI Agent Playbook",
    category: "AI Agents",
    summary:
      "A practical framework for taking AI agents from prototype to reliable production — covering evals, guardrails, observability and human-in-the-loop.",
    pages: "18 pages",
    accent: "magenta",
    highlights: [
      "The reliability stack: evals, guardrails, observability",
      "An architecture reference for multi-agent systems",
      "A pre-launch readiness checklist",
    ],
  },
  {
    slug: "voice-ai-roi",
    title: "Voice AI ROI: Benchmarks & a Deployment Blueprint",
    category: "Voice AI",
    summary:
      "What deflection, latency and CSAT to expect from voice agents, and a step-by-step blueprint to deploy one without breaking your support experience.",
    pages: "14 pages",
    accent: "cyan",
    highlights: [
      "Benchmark ranges for deflection, latency and cost-per-call",
      "Telephony and CRM integration patterns",
      "Escalation design that protects CSAT",
    ],
  },
  {
    slug: "geoai-for-enterprise",
    title: "GeoAI for Enterprise: From Imagery to Operational Decisions",
    category: "Geospatial",
    summary:
      "How power, insurance, agritech and logistics teams turn satellite and drone imagery into monitored, decision-ready intelligence — with the compliance posture sensitive sectors require.",
    pages: "20 pages",
    accent: "cyan",
    highlights: [
      "Detection, change-monitoring and digital-twin patterns",
      "Per-vertical use cases and proof requirements",
      "Data residency and explainability considerations",
    ],
  },
  {
    slug: "ai-era-engagement-models",
    title: "Buying Software in the AI Era: Engagement & Pricing Models",
    category: "Business",
    summary:
      "Why time-and-materials is breaking down, and how fixed-price and outcome-based models align speed, quality and cost for AI-accelerated delivery.",
    pages: "12 pages",
    accent: "magenta",
    highlights: [
      "Where hourly billing fails in the AI era",
      "Fixed-price and outcome-based model comparisons",
      "How to de-risk a build with milestones",
    ],
  },
];

export const getWhitePaper = (slug: string) => whitepapers.find((w) => w.slug === slug);
