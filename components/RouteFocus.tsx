"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * On client-side (SPA) navigation the browser never moves focus, so keyboard
 * and screen-reader users stay "stuck" on the old page. This moves focus to
 * <main> after each route change (skipping the initial load) without scrolling.
 */
export default function RouteFocus() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const main = document.getElementById("main");
    if (main) main.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
