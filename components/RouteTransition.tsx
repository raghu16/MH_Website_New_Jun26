"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Lightweight navigation transition — a brief centered loader on every route
 * change so the page change clearly registers. CSS-only animation, mounts for
 * ~460ms then unmounts. Non-blocking (pointer-events: none).
 */
export default function RouteTransition() {
  const pathname = usePathname();
  const [on, setOn] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setOn(true);
    const t = setTimeout(() => setOn(false), 460);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!on) return null;
  return (
    <div className="route-overlay" aria-hidden="true">
      <div className="route-loader">
        <span className="route-ring" />
        <span className="route-mark">✦</span>
      </div>
    </div>
  );
}
