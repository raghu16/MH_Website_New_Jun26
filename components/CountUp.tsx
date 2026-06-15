"use client";

import { useEffect, useRef, useState } from "react";

/** Animates a leading number up when scrolled into view, preserving any
 *  prefix/suffix (e.g. "<500ms", "250+", "80%"). Non-numeric values render as-is.
 *  Reduced-motion → shows the final value immediately. */
export default function CountUp({ value, className }: { value: string; className?: string }) {
  const m = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  const target = m ? parseInt(m[2].replace(/,/g, ""), 10) : 0;
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!m) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const dur = 1100;
        const tick = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min(1, (ts - start) / dur);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!m) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {m[1]}
      {n.toLocaleString()}
      {m[3]}
    </span>
  );
}
