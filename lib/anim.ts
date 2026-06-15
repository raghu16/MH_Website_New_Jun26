// Maps a slug to its context-relevant SectionCanvas variant.
// Every page gets a UNIQUE animation — no variant is reused across two pages.
export const animMap: Record<string, string> = {
  // services
  "ai-agent-development": "agents",
  "voice-ai-agents": "voice",
  "geospatial-intelligence": "satellite",
  "ai-solutions-development": "neural",
  "mobile-app-development": "mobile",
  "web3-development": "blockchain",
  "xr-development": "xr",
  "game-development": "game",
  "3d-art": "wireframe3d",
  // solutions (all distinct from the services above)
  "ready-to-use-ai-agents": "agentgrid",
  "ai-voice-agents": "voicecall",
  "satellite-intelligence": "radar",
  "vr-training": "headset",
  "vr-real-estate-demo": "floorplan",
  "real-estate-broker-platform": "listings",
  "document-intelligence": "document",
  "ai-knowledge-assistant": "knowledge",
  // industries (all distinct again)
  "power-sector": "powergrid",
  "real-estate": "blueprint",
  "education": "learn",
  "e-commerce": "commerce",
};

export const animOf = (slug: string) => animMap[slug] ?? "default";
