"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Official ReactBits Hyperspeed (Three.js). Client-only + idle-mounted so it
// never blocks LCP or crashes SSR. Colors come from the brand CSS variables.
const Hyperspeed = dynamic(() => import("./HyperspeedReal"), { ssr: false });

type EffectOptions = Record<string, unknown>;

export default function HeroBackground() {
  const [opts, setOpts] = useState<EffectOptions | null>(null);

  useEffect(() => {
    // Skip the heavy WebGL scene on reduced-motion and small screens.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    if (reduce || small) return;

    const cs = getComputedStyle(document.documentElement);
    const toHex = (name: string, fb: number) => {
      const v = cs.getPropertyValue(name).trim();
      if (!v) return fb;
      const [r, g, b] = v.split(/\s+/).map(Number);
      return (r << 16) + (g << 8) + b;
    };
    const accent = toHex("--accent-rgb", 0xc16a9a);
    const accentDim = toHex("--accent-dim-rgb", 0xa65a82);
    const accentSoft = toHex("--accent-soft-rgb", 0xd898b4);
    const cyan = toHex("--cyan-rgb", 0x03b3c3);

    const effectOptions: EffectOptions = {
      distortion: "turbulentDistortion",
      fov: 90,
      fovSpeedUp: 130,
      speedUp: 2,
      carLightsFade: 0.5,
      lightPairsPerRoadWay: 30,
      totalSideLightSticks: 12,
      colors: {
        roadColor: 0x050507,
        islandColor: 0x070709,
        background: 0x050507,
        shoulderLines: 0x131316,
        brokenLines: 0x131316,
        leftCars: [accent, accentDim, accentSoft],
        rightCars: [cyan, 0xbdbdbd, 0x8a8a8a],
        sticks: accent,
      },
    };

    const start = () => setOpts(effectOptions);
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
    if (typeof w.requestIdleCallback === "function") w.requestIdleCallback(start);
    else {
      const t = setTimeout(start, 220);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 transition-opacity duration-1000 ${opts ? "opacity-100" : "opacity-0"}`}
    >
      {opts && <Hyperspeed effectOptions={opts as never} />}
    </div>
  );
}
