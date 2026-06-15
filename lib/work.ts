export type Accent = "magenta" | "cyan";

// Image or video media. `src` can be a local /public path (e.g. "/work/enetra/hero.jpg")
// or a remote https URL. For video, provide a `poster` for a fast first paint.
export type MediaItem = { type: "image" | "video"; src: string; poster?: string; alt?: string; caption?: string };

export type Project = {
  slug: string;
  name: string;
  client: string;
  category: string; // primary category (used by filters)
  year: string;
  result: string; // one-line headline outcome
  tags: string[];
  accent: Accent;
  challenge: string;
  approach: string[];
  outcomes: { v: string; l: string }[];
  hero?: MediaItem; // optional hero image/video (falls back to a generated visual)
  gallery?: MediaItem[]; // optional "what we built" media (images + videos)
};

/* Example with media:
{
  ...,
  hero: { type: "video", src: "/work/enetra/demo.mp4", poster: "/work/enetra/poster.jpg", alt: "eNetra demo" },
  gallery: [
    { type: "image", src: "/work/enetra/map.jpg", alt: "Detection map", caption: "Per-tree detection" },
    { type: "video", src: "/work/enetra/scan.mp4", poster: "/work/enetra/scan.jpg", caption: "Scanning" },
  ],
}
*/

// Illustrative portfolio — replace metrics/details with real, approved data.
export const projects: Project[] = [
  {
    slug: "enetra",
    name: "eNetra",
    client: "Geospatial Intelligence",
    category: "Geospatial",
    year: "2026",
    result: "Per-tree detection & height from 0.28 m satellite imagery",
    tags: ["Computer Vision", "Remote Sensing", "GeoAI"],
    accent: "cyan",
    challenge: "Counting and measuring trees across large areas from satellite imagery — at scale, without field crews.",
    approach: [
      "Crown detection on Cartosat-3 panchromatic + multispectral imagery",
      "Per-tree height estimation from shadow geometry",
      "Species classification from spectral, texture and shape features",
    ],
    outcomes: [
      { v: "0.28 m", l: "imagery resolution" },
      { v: "per-tree", l: "detection + height" },
    ],
  },
  {
    slug: "garantie",
    name: "Garantie",
    client: "Honda",
    category: "Web",
    year: "2025",
    result: "Automated two-wheeler warranty validation for Honda dealers",
    tags: ["Web", "Workflow", "Automation"],
    accent: "magenta",
    challenge: "Honda's two-wheeler warranty process meant slow, error-prone manual policy validation for dealers.",
    approach: [
      "Automated policy validation and order management",
      "Real-time warranty data access for dealers",
      "Integration with existing dealer systems",
    ],
    outcomes: [
      { v: "faster", l: "dealer processing" },
      { v: "fewer", l: "manual errors" },
    ],
  },
  {
    slug: "airmeet",
    name: "Airmeet",
    client: "Airmeet",
    category: "XR",
    year: "2024",
    result: "A 3D virtual conference hall for immersive events at scale",
    tags: ["XR", "3D", "Real-time"],
    accent: "cyan",
    challenge: "Make virtual events feel immersive and social rather than another video grid.",
    approach: [
      "Navigable 3D conference environment",
      "Real-time presence and interaction",
      "Optimized for scale across devices",
    ],
    outcomes: [
      { v: "immersive", l: "event experience" },
      { v: "at scale", l: "concurrent users" },
    ],
  },
  {
    slug: "zigii",
    name: "Zigii",
    client: "Zigii",
    category: "Mobile",
    year: "2024",
    result: "A neo-bank for Gen Z with gamified financial literacy",
    tags: ["Mobile", "Fintech", "Payments"],
    accent: "magenta",
    challenge: "Teach Gen Z financial literacy while delivering a secure, modern banking experience.",
    approach: [
      "Prepaid card and secure payments",
      "Gamified savings and learning tools",
      "Parental controls and oversight",
    ],
    outcomes: [
      { v: "Gen Z", l: "target audience" },
      { v: "secure", l: "payments + controls" },
    ],
  },
  {
    slug: "consumer-indexing",
    name: "Consumer Indexing",
    client: "AI · Data Platform",
    category: "AI",
    year: "2026",
    result: "Millions of consumer records, instantly queryable by AI",
    tags: ["RAG", "Vector Search", "Data"],
    accent: "cyan",
    challenge: "Make a vast, messy consumer dataset instantly searchable and queryable by AI agents.",
    approach: [
      "Ingestion and structuring at scale",
      "Semantic indexing with vector search",
      "Agent-ready query interface",
    ],
    outcomes: [
      { v: "millions", l: "records indexed" },
      { v: "real-time", l: "semantic search" },
    ],
  },
  {
    slug: "voice-concierge",
    name: "Voice Concierge",
    client: "Voice AI",
    category: "Voice",
    year: "2026",
    result: "A 24/7 voice agent handling support calls end-to-end",
    tags: ["Voice AI", "Telephony", "CRM"],
    accent: "magenta",
    challenge: "Handle inbound support volume around the clock without growing the call-centre team.",
    approach: [
      "Sub-500ms voice agent with natural persona",
      "CRM and telephony integration",
      "Clean human escalation",
    ],
    outcomes: [
      { v: "<500ms", l: "latency" },
      { v: "24/7", l: "coverage" },
    ],
  },
  {
    slug: "super-neuron",
    name: "Super Neuron",
    client: "Super Neuron",
    category: "Game",
    year: "2023",
    result: "A brain-training mobile game with adaptive difficulty",
    tags: ["Game", "Mobile", "Adaptive"],
    accent: "cyan",
    challenge: "Build a habit-forming cognitive game that adapts to each player's skill.",
    approach: [
      "Adaptive difficulty engine",
      "Memory, attention and problem-solving games",
      "Retention-focused habit loop",
    ],
    outcomes: [
      { v: "adaptive", l: "difficulty" },
      { v: "iOS + Android", l: "shipped" },
    ],
  },
  {
    slug: "yeah-buddy",
    name: "Yeah Buddy",
    client: "Ronnie Coleman",
    category: "Mobile",
    year: "2023",
    result: "The official fitness app for 8× Mr. Olympia Ronnie Coleman",
    tags: ["Mobile", "Fitness", "Product"],
    accent: "magenta",
    challenge: "Bring a global fitness icon's training and nutrition to a worldwide fan base.",
    approach: [
      "Workouts, nutrition and mental wellness in one app",
      "Built for a global audience",
      "iOS and Android",
    ],
    outcomes: [
      { v: "8× Mr. O", l: "brand partner" },
      { v: "global", l: "fan base" },
    ],
  },
  {
    slug: "cryptomintr",
    name: "CryptoMintr",
    client: "CryptoMintr",
    category: "Web3",
    year: "2022",
    result: "A Web3 platform simplifying NFT minting and monetization",
    tags: ["Web3", "NFT", "Blockchain"],
    accent: "cyan",
    challenge: "Make NFT minting and management simple for non-technical creators.",
    approach: [
      "Simplified minting and management",
      "User-owned digital assets",
      "Web 3.0 monetization",
    ],
    outcomes: [
      { v: "simple", l: "minting UX" },
      { v: "user-owned", l: "assets" },
    ],
  },
  {
    slug: "apnibus",
    name: "ApniBus",
    client: "ApniBus",
    category: "Mobile",
    year: "2022",
    result: "Bus booking with route comparison and secure payments",
    tags: ["Mobile", "Travel", "Payments"],
    accent: "magenta",
    challenge: "Help travellers compare routes and prices and book buses with confidence.",
    approach: ["Route and price comparison", "Secure online bookings", "Clean, fast mobile UX"],
    outcomes: [
      { v: "compare", l: "routes + prices" },
      { v: "secure", l: "bookings" },
    ],
  },
  {
    slug: "dr-med",
    name: "Dr. Med",
    client: "Dr. Med",
    category: "Mobile",
    year: "2022",
    result: "A clinical drug-dose calculator for healthcare",
    tags: ["Healthcare", "Mobile", "Clinical"],
    accent: "cyan",
    challenge: "Give clinicians a fast, reliable way to calculate drug doses at the point of care.",
    approach: ["Accurate dose calculation", "Fast clinical workflow", "Trusted, validated logic"],
    outcomes: [
      { v: "point-of-care", l: "speed" },
      { v: "reliable", l: "calculations" },
    ],
  },
  {
    slug: "mnee",
    name: "MNEE",
    client: "MNEE",
    category: "Web3",
    year: "2024",
    result: "A stablecoin platform built on a high-throughput chain",
    tags: ["Web3", "Stablecoin", "DeFi"],
    accent: "magenta",
    challenge: "Deliver a fast, secure stablecoin experience with mainstream-grade UX.",
    approach: ["Smart contracts and wallet integration", "High-throughput settlement", "Audit-ready security"],
    outcomes: [
      { v: "stablecoin", l: "platform" },
      { v: "audit-ready", l: "contracts" },
    ],
  },
  {
    slug: "niftomania",
    name: "Niftomania",
    client: "Niftomania",
    category: "Web3",
    year: "2023",
    result: "An NFT marketplace with creator-first mechanics",
    tags: ["Web3", "NFT", "Marketplace"],
    accent: "cyan",
    challenge: "Launch a marketplace that puts creators and collectors first.",
    approach: ["Minting and marketplace mechanics", "Creator royalties", "Smooth collector UX"],
    outcomes: [
      { v: "creator-first", l: "mechanics" },
      { v: "marketplace", l: "live" },
    ],
  },
  {
    slug: "solar-place",
    name: "Solar Place",
    client: "Solar Place",
    category: "XR",
    year: "2024",
    result: "An immersive VR experience for solar products",
    tags: ["XR", "VR", "Product"],
    accent: "magenta",
    challenge: "Let customers experience and understand solar products immersively before buying.",
    approach: ["Photoreal VR product experience", "Interactive configuration", "Cross-device delivery"],
    outcomes: [
      { v: "immersive", l: "product demo" },
      { v: "interactive", l: "configuration" },
    ],
  },
  {
    slug: "found-it",
    name: "Found It!",
    client: "Skillmatics",
    category: "Game",
    year: "2023",
    result: "A multiplayer mobile game with logins and in-app purchases",
    tags: ["Game", "Multiplayer", "Mobile"],
    accent: "cyan",
    challenge: "Build a polished multiplayer game with accounts and monetization for a known brand.",
    approach: ["Multiplayer gameplay", "Accounts and logins", "In-app purchases"],
    outcomes: [
      { v: "multiplayer", l: "gameplay" },
      { v: "Skillmatics", l: "client" },
    ],
  },
  {
    slug: "nello",
    name: "Nello",
    client: "Nello",
    category: "Mobile",
    year: "2022",
    result: "An innovative podcast streaming mobile app",
    tags: ["Mobile", "Media", "Streaming"],
    accent: "magenta",
    challenge: "Deliver a smooth, modern podcast streaming experience on mobile.",
    approach: ["Streaming and offline playback", "Discovery and subscriptions", "Polished mobile UX"],
    outcomes: [
      { v: "streaming", l: "+ offline" },
      { v: "mobile", l: "first" },
    ],
  },
];

export const workCategories = ["All", "AI", "Voice", "Geospatial", "Mobile", "Web3", "XR", "Game"];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
