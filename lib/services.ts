export type Service = {
  slug: string;
  eyebrow: string;
  h1: string;
  subhead: string;
  metaTitle: string;
  metaDescription: string;
  flag?: boolean;
  group: "AI & Agents" | "Applications" | "Immersive";
  problem: string;
  build: { t: string; d: string }[];
  why: string[];
  tech: string;
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  /* ───────────── AI & Agents ───────────── */
  {
    slug: "ai-agent-development",
    eyebrow: "AI Agent Development",
    h1: "Agents that act — and keep working in production.",
    subhead:
      "We design, build and ship custom AI agents that take real actions in your stack — with the evals, guardrails and observability to keep them reliable. From RAG to multi-agent systems, built to get past the pilot.",
    metaTitle: "AI Agent Development Company — Custom & Multi-Agent Systems",
    metaDescription:
      "Monkhub builds production-grade AI agents — custom agents, multi-agent orchestration, RAG, evals and guardrails. Reliable AI that ships. Get a fixed-price proposal.",
    flag: true,
    group: "AI & Agents",
    problem:
      "Most AI agents demo well and die in production — they hallucinate, can't reach your systems, have no guardrails, and no one can prove they work. Roughly two in three AI initiatives never leave the pilot. The gap isn't the model. It's the engineering around it.",
    build: [
      { t: "Custom AI agents", d: "Goal-driven agents that retrieve context, call tools and take actions within defined boundaries." },
      { t: "Multi-agent orchestration", d: "Coordinated agent systems for complex, multi-step work." },
      { t: "RAG & retrieval", d: "Grounded answers from your data — accurate, current, cited." },
      { t: "Evals & reliability", d: "Evaluation suites, red-teaming and guardrails that prove an agent works before it ships." },
      { t: "MCP & tool integration", d: "Connect agents to your apps, data and APIs via the Model Context Protocol." },
      { t: "Copilots & workflows", d: "In-product assistants and automation that save real hours." },
    ],
    why: [
      "Evals as a first-class deliverable — we prove reliability, we don't promise it.",
      "Agents that ship into real products — your app, voice channel or map, not a sandbox.",
      "Governed by default — human-in-the-loop, audit trails, data controls.",
      "Senior, AI-first engineers — not a junior team learning on your budget.",
    ],
    tech: "LangGraph · LlamaIndex · MCP · OpenAI / Anthropic / open models · pgvector / Pinecone · LangSmith / Langfuse",
    faq: [
      { q: "How do you stop agents from hallucinating?", a: "Retrieval grounding, output validation, guardrails and evals — plus human approval where the stakes are high." },
      { q: "Can agents run on our own infrastructure?", a: "Yes — self-host and data-residency options are available where you need them." },
      { q: "How fast can we see a working prototype?", a: "Weeks, not months. We scope time-to-value in the first conversation." },
    ],
  },
  {
    slug: "voice-ai-agents",
    eyebrow: "Voice AI Agents",
    h1: "Voice agents that handle every call — 24/7.",
    subhead:
      "Natural, sub-500ms voice agents that resolve support calls, book appointments and qualify leads end-to-end — and hand off to a human the moment they should. Scale your call volume, not your headcount.",
    metaTitle: "Voice AI Agent Development — 24/7 Call Automation",
    metaDescription:
      "Monkhub builds natural, sub-500ms voice AI agents that deflect support calls, book appointments and qualify leads 24/7. HIPAA-aware. Get a fixed-price proposal.",
    group: "AI & Agents",
    problem:
      "“Press 1 for…” menus frustrate customers, and hiring more agents doesn't scale. Most voice bots break the moment a real conversation goes off-script — and after-hours calls, and the bookings in them, go unanswered.",
    build: [
      { t: "Support call deflection", d: "Resolve Tier-1 calls end-to-end; escalate cleanly when needed." },
      { t: "Booking & intake", d: "Never miss an after-hours booking; capture details into your CRM/EHR." },
      { t: "AI receptionist", d: "“Never miss a call” answering for every inbound." },
      { t: "Lead qualification", d: "Qualify and route, or run outbound at scale." },
      { t: "Persona & conversation design", d: "The craft that makes an agent sound human, not robotic." },
      { t: "Telephony & CRM integration", d: "Twilio / SIP / Genesys + your CRM/EHR." },
    ],
    why: [
      "Platform-agnostic — Vapi, Retell, ElevenLabs or PolyAI, whichever fits.",
      "Done-for-you and production-hardened, not a self-serve toolkit.",
      "Persona and conversation design as real craft.",
      "A monitoring retainer so it keeps improving after launch.",
    ],
    tech: "Vapi · Retell · ElevenLabs · PolyAI · Twilio / SIP · Genesys · your CRM/EHR",
    faq: [
      { q: "How natural does it sound?", a: "Sub-500ms latency and tuned persona design — built to hold a real conversation and escalate gracefully." },
      { q: "Is it HIPAA-compliant for healthcare?", a: "We build HIPAA-aware intake with EHR integration and the right consent controls." },
    ],
  },
  {
    slug: "geospatial-intelligence",
    eyebrow: "Geospatial Intelligence",
    h1: "Turn satellite, drone and location data into decisions.",
    subhead:
      "We build GeoAI that reads the real world at scale — detecting change, mapping assets, and surfacing what matters across territory you can't walk. Intelligence engineered for the field, not the lab.",
    metaTitle: "Geospatial Intelligence & GeoAI Development",
    metaDescription:
      "Monkhub builds GeoAI from satellite, drone and location data — change detection, imagery analysis, digital twins and route optimization for power, real estate, agritech and logistics.",
    group: "AI & Agents",
    problem:
      "The data — satellite, drone, LiDAR, GPS — is abundant. Turning it into a timely, trustworthy decision is the hard part. Off-the-shelf GIS doesn't understand your assets, and manual analysis can't keep up with the imagery.",
    build: [
      { t: "Imagery analysis", d: "Object detection, segmentation and classification on optical, SAR and hyperspectral data." },
      { t: "Change detection", d: "Spot what changed — encroachment, damage, growth, movement — automatically." },
      { t: "Asset & footprint extraction", d: "Map structures and infrastructure at scale." },
      { t: "GIS integration", d: "ArcGIS, QGIS, FME — GeoAI inside the tools your teams use." },
      { t: "Digital twins", d: "Living models of networks, sites and cities that match the real world." },
      { t: "Route optimization", d: "Smarter fleet, logistics and field operations." },
    ],
    why: [
      "Outcome-first — we sell decisions, not pixels.",
      "Domain-tuned models, not generic computer vision.",
      "A visible compliance posture for sensitive work — data residency, explainable outputs.",
      "Explicit about data source, resolution and freshness.",
    ],
    tech: "PyTorch · ArcGIS / QGIS / FME · GDAL / rasterio · Prithvi-EO / Clay · deck.gl / MapLibre",
    faq: [
      { q: "Which industries do you serve?", a: "Power & utilities, real estate, agritech, logistics, mining and insurance." },
      { q: "Do you handle sensitive data?", a: "Yes — with data residency, explainability and the appropriate compliance posture." },
    ],
  },

  /* ───────────── Applications ───────────── */
  {
    slug: "ai-solutions-development",
    eyebrow: "AI Solutions Development",
    h1: "Custom AI solutions, engineered to ship.",
    subhead:
      "From AI-powered features to full products and MVPs — we design and build custom AI/ML solutions on your data, production-grade and fast. Fixed scope, fixed price, you own the code.",
    metaTitle: "AI Solutions Development — Custom AI/ML Software",
    metaDescription:
      "Monkhub builds custom AI solutions and MVPs — AI/ML features, copilots and full AI products on your data. Production-grade, shipped fast. Get a fixed-price proposal.",
    group: "Applications",
    problem:
      "Off-the-shelf AI rarely fits your problem, and most teams can't get a custom solution past the prototype. You need AI built around your data, your workflow and your reliability bar — not a science project.",
    build: [
      { t: "AI MVPs", d: "A production-grade AI product in weeks — fixed scope, fixed price." },
      { t: "Custom AI/ML models", d: "Models trained and tuned on your data and domain." },
      { t: "AI feature integration", d: "Add AI to your existing product without rebuilding it." },
      { t: "Copilots & assistants", d: "In-product assistants grounded in your data, with citations." },
      { t: "Predictive analytics", d: "Forecasting and classification that drives real decisions." },
      { t: "MLOps & deployment", d: "Ship, monitor and retrain models in production." },
    ],
    why: [
      "Built on your data and domain — not a generic wrapper.",
      "Fixed price you can plan around.",
      "Senior AI engineers, production-grade quality.",
      "You own 100% of the code and IP.",
    ],
    tech: "Python · PyTorch · scikit-learn · OpenAI / Anthropic / open models · vector DBs · your cloud",
    faq: [
      { q: "Can you add AI to our existing app?", a: "Yes — we integrate AI features into your current stack without a rebuild." },
      { q: "How fast can we ship an AI MVP?", a: "Weeks. We send a fixed-price proposal within 48 hours of the first call." },
    ],
  },
  {
    slug: "mobile-app-development",
    eyebrow: "Mobile App Development",
    h1: "AI-native mobile products people keep on their home screen.",
    subhead:
      "iOS, Android and cross-platform apps built around the outcomes that matter — retention, conversion and revenue — with on-device ML and in-app AI where it earns its place.",
    metaTitle: "Mobile App Development — AI-Native iOS & Android Apps",
    metaDescription:
      "Monkhub builds AI-native mobile products — iOS, Android, cross-platform, on-device ML — engineered for retention and revenue. Get a fixed-price proposal.",
    group: "Applications",
    problem:
      "Most apps get built and forgotten. A rejected store submission or a churn cliff has real revenue consequences — mobile is about what happens after launch, not just the build.",
    build: [
      { t: "Native iOS & Android", d: "Swift / Kotlin where performance and platform feel matter." },
      { t: "Cross-platform", d: "Flutter / React Native for speed and a shared codebase." },
      { t: "On-device & in-app AI", d: "Core ML / ML Kit and in-app agents that add real value." },
      { t: "Growth & retention", d: "ASO, analytics and the loops that keep users." },
    ],
    why: [
      "We own outcomes — retention and revenue — not just deliverables.",
      "AI-native where it helps, not as a gimmick.",
      "Senior engineers, production-grade quality.",
      "Fixed price, you own the code.",
    ],
    tech: "Swift · Kotlin · Flutter · React Native · Core ML / ML Kit",
    faq: [
      { q: "Native or cross-platform?", a: "We recommend based on your performance needs and budget — and tell you honestly which fits." },
    ],
  },
  {
    slug: "web3-development",
    eyebrow: "Web 3 Development",
    h1: "Web3 products, engineered to ship and to last.",
    subhead:
      "Smart contracts, dApps, tokens and wallets — built secure, audit-ready and production-grade, with mainstream UX on decentralized rails.",
    metaTitle: "Web3 Development Company — Smart Contracts, dApps & Tokens",
    metaDescription:
      "Monkhub builds production-grade Web3 — smart contracts, dApps, DeFi, NFTs, tokens and wallet integration. Audit-ready and secure. Get a fixed-price proposal.",
    group: "Applications",
    problem:
      "Web3 is unforgiving — a single unaudited contract can drain a treasury, and most teams ship without the security or UX to survive mainnet. You need engineering that treats reliability and audits as table stakes.",
    build: [
      { t: "Smart contracts", d: "Solidity / Rust contracts, gas-optimized and audit-ready." },
      { t: "dApps", d: "End-to-end decentralized apps with clean, mainstream UX." },
      { t: "Tokens & NFTs", d: "ERC-20 / 721 / 1155, minting and marketplace mechanics." },
      { t: "DeFi", d: "Staking, swaps, vaults and on-chain financial primitives." },
      { t: "Wallet & chain integration", d: "WalletConnect, multi-chain, account abstraction." },
      { t: "Security & audits", d: "Testing, fuzzing and audit prep before you touch mainnet." },
    ],
    why: [
      "Security-first — audits and testing are table stakes, not extras.",
      "Mainstream UX on top of decentralized rails.",
      "Multi-chain experience (EVM and beyond).",
      "Fixed price; you own the code and contracts.",
    ],
    tech: "Solidity · Rust · Hardhat / Foundry · ethers.js / viem · The Graph · EVM chains",
    faq: [
      { q: "Do you audit the contracts?", a: "We test, fuzz and prepare for audit, and coordinate third-party audits before mainnet." },
      { q: "Which chains do you build on?", a: "EVM chains (Ethereum, Polygon, Base, Arbitrum) and others based on your needs." },
    ],
  },

  /* ───────────── Immersive (XR & Gaming) ───────────── */
  {
    slug: "xr-development",
    eyebrow: "XR Development",
    h1: "Immersive AR/VR experiences that earn their budget.",
    subhead:
      "Enterprise XR training, AR experiences and immersive product demos on Unity and Unreal — designed around a measurable result, not novelty.",
    metaTitle: "XR Development — AR/VR & Immersive Experiences",
    metaDescription:
      "Monkhub builds XR — enterprise AR/VR training, AR experiences and immersive demos on Unity & Unreal, engineered for measurable outcomes. Get a fixed-price proposal.",
    group: "Immersive",
    problem:
      "Immersive tech is easy to make impressive and hard to make matter. Training that can't be measured, or an experience with no outcome, doesn't earn its budget.",
    build: [
      { t: "Enterprise VR training", d: "Hands-free, measurable training and simulation." },
      { t: "AR experiences", d: "Location-based and product AR, including WebAR." },
      { t: "VR real estate & demos", d: "Walk buyers through spaces before they're built." },
      { t: "Digital twins & simulation", d: "Immersive models of real environments." },
    ],
    why: [
      "Outcome-led — time-to-competency, engagement, behavior change.",
      "Unity and Unreal depth for fidelity and scale.",
      "AI woven in where it adds leverage.",
      "Production-grade, fixed price.",
    ],
    tech: "Unity · Unreal · ARKit / ARCore · WebXR · 8th Wall",
    faq: [
      { q: "Can XR training really be measured?", a: "Yes — we design around metrics like time-to-competency and confidence, not just completion." },
    ],
  },
  {
    slug: "game-development",
    eyebrow: "Game Development",
    h1: "Games built full-cycle — fun that ships.",
    subhead:
      "Mobile, PC and applied games on Unity and Unreal — from concept to live ops, including serious games engineered for measurable outcomes.",
    metaTitle: "Game Development Company — Unity & Unreal",
    metaDescription:
      "Monkhub builds games full-cycle on Unity & Unreal — mobile, PC and serious/applied games engineered for engagement and measurable outcomes.",
    group: "Immersive",
    problem:
      "A game lives or dies on engagement and retention. Building one that ships, performs and keeps players takes more than an engine license.",
    build: [
      { t: "Full-cycle game dev", d: "Concept, art, build and launch on Unity & Unreal." },
      { t: "Co-development", d: "Embed with your studio to add capacity and craft." },
      { t: "Mobile & casual games", d: "Habit-forming games built for retention (à la Super Neuron)." },
      { t: "Serious & applied games", d: "Gamified experiences with measurable outcomes." },
      { t: "Live ops & monetization", d: "Keep players engaged and revenue growing post-launch." },
    ],
    why: [
      "Full-cycle craft on Unity and Unreal.",
      "Engagement engineered for retention and outcomes.",
      "Senior team, production-grade quality.",
      "Fixed price, you own the IP.",
    ],
    tech: "Unity · Unreal · C# · C++ · Playable / live-ops tooling",
    faq: [
      { q: "Do you do co-development?", a: "Yes — we embed with your studio to add capacity and specialist craft." },
    ],
  },
  {
    slug: "3d-art",
    eyebrow: "3D Art",
    h1: "3D art and animation that brings products to life.",
    subhead:
      "3D modelling, animation and visualization for games, XR, product and marketing — crafted, optimized and pipeline-ready.",
    metaTitle: "3D Art, Modelling & Animation Services",
    metaDescription:
      "Monkhub creates 3D art — modelling, animation and visualization for games, XR, product and marketing. Crafted and production-ready. Get a fixed-price proposal.",
    group: "Immersive",
    problem:
      "Great 3D is the difference between an experience that feels premium and one that feels cheap — but it has to be optimized and pipeline-ready, not just pretty.",
    build: [
      { t: "3D modelling", d: "Hard-surface and organic models, game- and XR-ready." },
      { t: "Character & environment art", d: "Believable worlds and characters with personality." },
      { t: "Animation", d: "Rigging and animation for games, XR and video." },
      { t: "Product & architectural viz", d: "Photoreal visualization for marketing and real estate." },
      { t: "Asset optimization", d: "Optimized, pipeline-ready assets that perform." },
    ],
    why: [
      "Crafted, not generic.",
      "Optimized and production/pipeline-ready.",
      "Tuned for your engine and target platform.",
      "Fixed price, clear delivery.",
    ],
    tech: "Blender · Maya · ZBrush · Substance · Unity / Unreal pipelines",
    faq: [
      { q: "Can you match our existing art style?", a: "Yes — we work to your style guide and engine pipeline." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
