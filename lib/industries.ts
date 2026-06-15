export type Accent = "magenta" | "cyan";

export type Industry = {
  slug: string;
  name: string;
  accent: Accent;
  blurb: string;
  intro: string;
  points: string[];
  solutions: { label: string; href: string }[];
  outcomes: { v: string; l: string }[];
};

export const industries: Industry[] = [
  {
    slug: "power-sector",
    name: "Power Sector",
    accent: "magenta",
    blurb: "Intelligence and automation for grids, plants and field operations.",
    intro:
      "Power infrastructure is vast, remote and high-stakes. We bring satellite monitoring, immersive training and AI automation to grids, plants and the crews that keep them running — so issues are caught early and teams act on better information.",
    points: [
      "Satellite & drone monitoring of lines, sites and vegetation encroachment",
      "VR training for high-stakes field and safety operations",
      "AI agents for outage triage, maintenance scheduling and operations",
      "Geospatial digital twins of the network",
    ],
    solutions: [
      { label: "Satellite Intelligence", href: "/solutions/satellite-intelligence" },
      { label: "VR Training", href: "/solutions/vr-training" },
      { label: "Ready-to-Use AI Agents", href: "/solutions/ready-to-use-ai-agents" },
    ],
    outcomes: [
      { v: "early", l: "fault detection" },
      { v: "4×", l: "faster training" },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    accent: "cyan",
    blurb: "Sell, manage and showcase property with AI and immersive tech.",
    intro:
      "Property is sold on experience and speed. We help developers and brokers showcase spaces in VR, qualify and convert buyers with AI, and run the whole operation on a modern, AI-native platform.",
    points: [
      "VR property walkthroughs and demos — close pre-sales remotely",
      "White-label broker platform: listings, leads, CRM and AI assist",
      "AI voice agents that qualify buyers and book viewings 24/7",
      "Satellite intelligence for land, site and portfolio analysis",
    ],
    solutions: [
      { label: "VR Real Estate Demo", href: "/solutions/vr-real-estate-demo" },
      { label: "Real Estate Broker Platform", href: "/solutions/real-estate-broker-platform" },
      { label: "AI Voice Agents", href: "/solutions/ai-voice-agents" },
    ],
    outcomes: [
      { v: "remote", l: "viewings" },
      { v: "24/7", l: "buyer assist" },
    ],
  },
  {
    slug: "education",
    name: "Education",
    accent: "magenta",
    blurb: "Adaptive, engaging learning powered by AI and immersion.",
    intro:
      "Learning sticks when it's adaptive and engaging. We build AI tutors grounded in your curriculum, gamified adaptive experiences, and VR simulations for skills that are hard to teach on paper.",
    points: [
      "AI tutors and knowledge assistants grounded in your curriculum",
      "Gamified, adaptive learning experiences (à la Super Neuron)",
      "VR training simulations for hands-on skills",
      "Content and document intelligence for faster course building",
    ],
    solutions: [
      { label: "AI Knowledge Assistant", href: "/solutions/ai-knowledge-assistant" },
      { label: "VR Training", href: "/solutions/vr-training" },
      { label: "Ready-to-Use AI Agents", href: "/solutions/ready-to-use-ai-agents" },
    ],
    outcomes: [
      { v: "adaptive", l: "learning" },
      { v: "higher", l: "engagement" },
    ],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    accent: "cyan",
    blurb: "AI that lifts conversion, support and operations.",
    intro:
      "In e-commerce, margins live in conversion and support efficiency. We deploy AI shopping and support agents, voice automation for orders and returns, and document intelligence to keep operations fast and accurate.",
    points: [
      "AI shopping & support agents that deflect tickets and drive sales",
      "Voice agents for orders, returns and 24/7 customer service",
      "Document & catalog intelligence for fast, accurate operations",
      "Custom storefronts and web apps built to convert",
    ],
    solutions: [
      { label: "Ready-to-Use AI Agents", href: "/solutions/ready-to-use-ai-agents" },
      { label: "AI Voice Agents", href: "/solutions/ai-voice-agents" },
      { label: "Document Intelligence", href: "/solutions/document-intelligence" },
    ],
    outcomes: [
      { v: "higher", l: "conversion" },
      { v: "lower", l: "support cost" },
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
