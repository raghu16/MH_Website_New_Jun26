"use client";

import { useEffect, useRef } from "react";

/**
 * SectionCanvas — one lightweight 2D-canvas engine with a library of
 * context-relevant hero animations (satellite, voice, agents, neural, xr,
 * city, document, …). Themed magenta/cyan. Reduced-motion safe, pauses
 * off-screen, DPR-capped. Decorative (aria-hidden) — never the LCP element.
 */

const W = "245,245,244"; // off-white (constant)
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

type Draw = (ctx: CanvasRenderingContext2D, t: number) => void;

// M (pink) and C (secondary) are passed in from CSS variables so the canvas
// follows the site theme — see the effect below.
function create(variant: string, w: number, h: number, M: string, C: string): Draw {
  switch (variant) {
    /* ───────── AI agents: drifting node network ───────── */
    case "agents": {
      const n = Math.round(Math.min(18, (w * h) / 42000));
      const nodes = Array.from({ length: n }, () => ({
        x: rnd(0, w), y: rnd(0, h), vx: rnd(-0.25, 0.25), vy: rnd(-0.25, 0.25), p: rnd(0, 6.28),
      }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (const a of nodes) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < 0 || a.x > w) a.vx *= -1;
          if (a.y < 0 || a.y > h) a.vy *= -1;
        }
        for (let i = 0; i < nodes.length; i++)
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 170) {
              ctx.strokeStyle = `rgba(${C},${0.18 * (1 - d / 170)})`;
              ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        for (const a of nodes) {
          const g = 0.6 + 0.4 * Math.sin(t * 2 + a.p);
          ctx.fillStyle = `rgba(${M},${g})`;
          ctx.beginPath(); ctx.arc(a.x, a.y, 2.6, 0, 6.2832); ctx.fill();
          ctx.fillStyle = `rgba(${M},0.12)`;
          ctx.beginPath(); ctx.arc(a.x, a.y, 7 + g * 3, 0, 6.2832); ctx.fill();
        }
      };
    }

    /* ───────── Voice AI: waveform + emanating rings ───────── */
    case "voice": {
      const bars = Math.min(64, Math.floor(w / 14));
      const cy = h / 2, sx = w * 0.16;
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (let r = 0; r < 3; r++) {
          const rad = ((t * 60 + r * 80) % 280);
          ctx.strokeStyle = `rgba(${C},${0.25 * (1 - rad / 280)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(sx, cy, rad, 0, 6.2832); ctx.stroke();
        }
        const bw = (w - sx) / bars;
        for (let i = 0; i < bars; i++) {
          const x = sx + i * bw;
          const amp = (Math.sin(t * 3 + i * 0.5) * 0.5 + 0.5) * (Math.sin(i * 0.3 + t) * 0.4 + 0.6);
          const bh = amp * h * 0.34;
          const a = i / bars;
          ctx.fillStyle = `rgba(${a > 0.5 ? C : M},${0.5 + amp * 0.4})`;
          ctx.fillRect(x, cy - bh / 2, Math.max(1.5, bw - 3), bh);
        }
      };
    }

    /* ───────── Satellite intelligence: orbit over the curved Earth, one
       direction, with a scanning footprint capturing land data ───────── */
    case "satellite": {
      const cx = w / 2;
      const R = Math.max(w, h) * 1.3;              // Earth radius (large → gentle limb)
      const cy0 = h * 0.58 + R;                    // Earth centre, far below the canvas
      const alt = Math.min(h * 0.2, 120);          // orbit altitude
      const orbitR = R + alt;
      // spread chosen so the satellite enters just off the left edge and exits
      // just off the right edge — so when the cycle loops it re-enters cleanly
      // from the side (the reset happens off-screen → seamless).
      const spread = Math.asin(Math.min(0.96, (cx + w * 0.12) / orbitR));
      const aStart = Math.PI / 2 + spread, aEnd = Math.PI / 2 - spread; // L → R across the top
      const sat = Math.min(Math.min(w, h) * 0.06, 30); // satellite scale (bigger)
      const surf = (a: number): [number, number] => [cx + Math.cos(a) * R, cy0 - Math.sin(a) * R];
      const orb = (a: number): [number, number] => [cx + Math.cos(a) * orbitR, cy0 - Math.sin(a) * orbitR];
      const limbY = (x: number) => { const dx = x - cx; return cy0 - Math.sqrt(Math.max(0, R * R - dx * dx)); };
      const stars = Array.from({ length: 46 }, () => ({ x: rnd(0, w), y: rnd(0, h * 0.52), s: rnd(0.5, 1.6), p: rnd(0, 6.28) }));
      const lands = Array.from({ length: 6 }, () => ({ a: rnd(aEnd - 0.2, aStart + 0.2), r: rnd(0.5, 1.1) }));
      const captured: { a: number; life: number }[] = [];
      let lastSlot = -1;
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        // stars (space)
        for (const s of stars) { ctx.fillStyle = `rgba(${W},${0.25 + 0.3 * Math.sin(t * 2 + s.p)})`; ctx.fillRect(s.x, s.y, s.s, s.s); }
        // Earth body
        ctx.beginPath(); ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 10) ctx.lineTo(x, limbY(x));
        ctx.lineTo(w, h); ctx.closePath();
        const eg = ctx.createLinearGradient(0, h * 0.5, 0, h);
        eg.addColorStop(0, `rgba(${C},0.12)`); eg.addColorStop(0.3, `rgba(${C},0.03)`); eg.addColorStop(1, "rgba(5,5,7,0)");
        ctx.fillStyle = eg; ctx.fill();
        // graticule — latitude arcs
        ctx.strokeStyle = `rgba(${W},0.05)`; ctx.lineWidth = 1;
        for (let lat = 1; lat <= 3; lat++) {
          const rr = R - lat * h * 0.13;
          ctx.beginPath();
          for (let x = 0; x <= w; x += 12) { const dx = x - cx; const yy = cy0 - Math.sqrt(Math.max(0, rr * rr - dx * dx)); x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
          ctx.stroke();
        }
        // graticule — meridians (radial)
        for (let m = -5; m <= 5; m++) {
          const a = Math.PI / 2 + m * 0.13; const [sx, sy] = surf(a);
          ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(cx + Math.cos(a) * (R - h * 0.42), cy0 - Math.sin(a) * (R - h * 0.42)); ctx.stroke();
        }
        // land masses
        for (const l of lands) { const [lx, ly] = surf(l.a); ctx.fillStyle = `rgba(${M},0.16)`; ctx.beginPath(); ctx.ellipse(lx, ly + 7, 28 * l.r, 11 * l.r, 0, 0, 6.2832); ctx.fill(); }
        // atmosphere limb glow
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) { const yy = limbY(x); x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
        ctx.strokeStyle = `rgba(${C},0.55)`; ctx.lineWidth = 2; ctx.stroke();

        // satellite — one direction, looping (re-enters from the side each cycle)
        const p = (t * 0.085) % 1;
        const a = aStart + (aEnd - aStart) * p;
        const [ox, oy] = orb(a);
        const [fx, fy] = surf(a);

        // already-scanned swath behind it
        ctx.beginPath();
        for (let q = 0; q <= p; q += 0.02) { const [sx, sy] = surf(aStart + (aEnd - aStart) * q); q ? ctx.lineTo(sx, sy) : ctx.moveTo(sx, sy); }
        ctx.strokeStyle = `rgba(${C},0.3)`; ctx.lineWidth = 3; ctx.stroke();

        // captured land-data points
        const slot = Math.floor(p * 32);
        if (slot !== lastSlot) { lastSlot = slot; captured.push({ a, life: 1 }); }
        for (let i = captured.length - 1; i >= 0; i--) {
          const c = captured[i]; c.life -= 0.01;
          if (c.life <= 0) { captured.splice(i, 1); continue; }
          const [csx, csy] = surf(c.a);
          ctx.fillStyle = `rgba(${M},${c.life})`; ctx.fillRect(csx - 2.5, csy - 2.5, 5, 5);
        }

        // scanning footprint + beam
        const da = 0.055;
        const [flx, fly] = surf(a + da), [frx, fry] = surf(a - da);
        ctx.fillStyle = `rgba(${C},0.13)`;
        ctx.beginPath(); ctx.moveTo(ox - sat * 0.3, oy); ctx.lineTo(flx, fly); ctx.lineTo(frx, fry); ctx.lineTo(ox + sat * 0.3, oy); ctx.closePath(); ctx.fill();
        const pulse = 0.5 + 0.5 * Math.sin(t * 6);
        ctx.strokeStyle = `rgba(${C},${0.6 + pulse * 0.4})`; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.moveTo(flx, fly); ctx.lineTo(frx, fry); ctx.stroke();
        ctx.fillStyle = `rgba(${M},${0.45 + pulse * 0.45})`; ctx.beginPath(); ctx.arc(fx, fy, 4, 0, 6.2832); ctx.fill();

        // satellite body — bigger, oriented along the orbit
        ctx.save(); ctx.translate(ox, oy); ctx.rotate(Math.PI / 2 - a);
        ctx.fillStyle = `rgba(${C},0.14)`; ctx.beginPath(); ctx.arc(0, 0, sat * 1.7, 0, 6.2832); ctx.fill();
        ctx.fillStyle = `rgba(${M},0.95)`;
        roundRect(ctx, -sat * 2.5, -sat * 0.38, sat * 1.6, sat * 0.76, 2); ctx.fill();
        roundRect(ctx, sat * 0.9, -sat * 0.38, sat * 1.6, sat * 0.76, 2); ctx.fill();
        ctx.strokeStyle = `rgba(${W},0.5)`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(-sat * 0.9, 0); ctx.lineTo(sat * 0.9, 0); ctx.stroke();
        ctx.fillStyle = `rgb(${W})`; roundRect(ctx, -sat * 0.6, -sat * 0.62, sat * 1.2, sat * 1.24, 3); ctx.fill();
        ctx.fillStyle = `rgba(${C},0.95)`; ctx.beginPath(); ctx.arc(0, sat * 0.72, sat * 0.3, 0, 6.2832); ctx.fill();
        ctx.restore();
      };
    }

    /* ───────── Neural net: layered nodes + flowing pulses ───────── */
    case "neural": {
      const cols = [5, 8, 8, 5];
      const pad = w * 0.12;
      const layers = cols.map((cnt, li) => {
        const x = pad + (li / (cols.length - 1)) * (w - pad * 2);
        return Array.from({ length: cnt }, (_, i) => ({ x, y: (h / (cnt + 1)) * (i + 1) }));
      });
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (let l = 0; l < layers.length - 1; l++)
          for (const a of layers[l])
            for (const b of layers[l + 1]) {
              ctx.strokeStyle = `rgba(${W},0.05)`; ctx.lineWidth = 1;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
              const ph = (t * 0.6 + (a.y + b.x) * 0.003) % 1;
              const px = a.x + (b.x - a.x) * ph, py = a.y + (b.y - a.y) * ph;
              ctx.fillStyle = `rgba(${C},${0.7 * (1 - Math.abs(ph - 0.5) * 2)})`;
              ctx.beginPath(); ctx.arc(px, py, 1.8, 0, 6.2832); ctx.fill();
            }
        for (const layer of layers) for (const nd of layer) {
          ctx.fillStyle = `rgba(${M},0.9)`; ctx.beginPath(); ctx.arc(nd.x, nd.y, 4, 0, 6.2832); ctx.fill();
          ctx.fillStyle = `rgba(${M},0.12)`; ctx.beginPath(); ctx.arc(nd.x, nd.y, 10, 0, 6.2832); ctx.fill();
        }
      };
    }

    /* ───────── Mobile: device with streaming UI + signal ───────── */
    case "mobile": {
      const pw = Math.min(150, w * 0.3), ph = pw * 2, px = w / 2 - pw / 2, py = h / 2 - ph / 2;
      const rows = Array.from({ length: 7 }, (_, i) => i);
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (let s = 0; s < 3; s++) {
          const rr = 30 + ((t * 40 + s * 30) % 90);
          ctx.strokeStyle = `rgba(${C},${0.3 * (1 - (rr - 30) / 90)})`; ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(w / 2, py - 6, rr, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke();
        }
        ctx.strokeStyle = `rgba(${W},0.5)`; ctx.lineWidth = 2;
        roundRect(ctx, px, py, pw, ph, 18); ctx.stroke();
        ctx.save(); roundRect(ctx, px + 8, py + 16, pw - 16, ph - 32, 8); ctx.clip();
        for (const r of rows) {
          const y = py + 24 + ((r * 34 + t * 30) % (ph - 40));
          ctx.fillStyle = `rgba(${r % 2 ? M : C},0.7)`; roundRect(ctx, px + 16, y, 22, 22, 6); ctx.fill();
          ctx.fillStyle = `rgba(${W},0.18)`; ctx.fillRect(px + 46, y + 3, pw - 64, 6); ctx.fillRect(px + 46, y + 14, pw - 84, 5);
        }
        ctx.restore();
      };
    }

    /* ───────── Web: subtle code rain ───────── */
    case "web": {
      const fs = 14, colW = fs * 0.95, n = Math.floor(w / colW);
      const cols = Array.from({ length: n }, () => ({ y: rnd(-h, 0), s: rnd(40, 110) }));
      const glyphs = "01<>/{}=#$()[];".split("");
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        ctx.font = `${fs}px ui-monospace, monospace`;
        for (let i = 0; i < cols.length; i++) {
          const c = cols[i];
          c.y += c.s * 0.016;
          if (c.y > h + 40) c.y = rnd(-h * 0.5, 0);
          for (let k = 0; k < 7; k++) {
            const yy = c.y - k * fs;
            if (yy < -fs || yy > h) continue;
            const a = (1 - k / 7) * 0.8;
            ctx.fillStyle = k === 0 ? `rgba(${C},${a})` : `rgba(${M},${a * 0.5})`;
            ctx.fillText(glyphs[(i + k + Math.floor(t * 4)) % glyphs.length], i * colW, yy);
          }
        }
      };
    }

    /* ───────── XR: perspective depth tunnel ───────── */
    case "xr": {
      const cx = w / 2, cy = h / 2, rings = 14;
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < rings; i++) {
          const z = ((i / rings + (t * 0.12) % (1 / rings) * rings) % 1);
          const s = z; const rw = s * w * 0.9, rh = s * h * 0.9;
          const rot = t * 0.1 + z * 0.6;
          ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
          ctx.strokeStyle = `rgba(${i % 2 ? M : C},${0.5 * (1 - z)})`;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-rw / 2, -rh / 2, rw, rh);
          ctx.restore();
        }
      };
    }

    /* ───────── Game: orbiting playful particles ───────── */
    case "game": {
      const cx = w / 2, cy = h / 2;
      const orbs = Array.from({ length: 7 }, (_, i) => ({
        r: rnd(40, Math.min(w, h) * 0.4), sp: rnd(0.4, 1.2) * (i % 2 ? 1 : -1), ph: rnd(0, 6.28), col: i % 2 ? M : C, sz: rnd(3, 6),
      }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (const o of orbs) {
          ctx.strokeStyle = `rgba(${W},0.05)`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(cx, cy, o.r, 0, 6.2832); ctx.stroke();
          for (let k = 0; k < 6; k++) {
            const ang = t * o.sp + o.ph - k * 0.18;
            const x = cx + Math.cos(ang) * o.r, y = cy + Math.sin(ang) * o.r;
            ctx.fillStyle = `rgba(${o.col},${0.7 * (1 - k / 6)})`;
            ctx.beginPath(); ctx.arc(x, y, o.sz * (1 - k / 9), 0, 6.2832); ctx.fill();
          }
        }
      };
    }

    /* ───────── 3D art: rotating wireframe cube ───────── */
    case "wireframe3d": {
      const cx = w / 2, cy = h / 2, s = Math.min(w, h) * 0.22;
      const V = [[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
      const E = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        const ax = t * 0.5, ay = t * 0.35;
        const pts = V.map(([x, y, z]) => {
          let yy = y * Math.cos(ax) - z * Math.sin(ax); let zz = y * Math.sin(ax) + z * Math.cos(ax);
          let xx = x * Math.cos(ay) + zz * Math.sin(ay); zz = -x * Math.sin(ay) + zz * Math.cos(ay);
          const p = 3 / (3 + zz);
          return [cx + xx * s * p, cy + yy * s * p];
        });
        ctx.strokeStyle = `rgba(${M},0.7)`; ctx.lineWidth = 1.5;
        for (const [a, b] of E) { ctx.beginPath(); ctx.moveTo(pts[a][0], pts[a][1]); ctx.lineTo(pts[b][0], pts[b][1]); ctx.stroke(); }
        for (const p of pts) { ctx.fillStyle = `rgb(${C})`; ctx.beginPath(); ctx.arc(p[0], p[1], 2.5, 0, 6.2832); ctx.fill(); }
      };
    }

    /* ───────── City / real estate: skyline + scan + pins ───────── */
    case "city": {
      const base = h * 0.82;
      const blds = Array.from({ length: Math.floor(w / 46) }, (_, i) => ({
        x: i * 46 + 6, bw: rnd(26, 40), bh: rnd(h * 0.18, h * 0.5), col: i % 3 === 0 ? M : C,
      }));
      const pins = blds.filter((_, i) => i % 3 === 1).map((b) => ({ x: b.x + b.bw / 2, y: base - b.bh - 22, ph: rnd(0, 6.28) }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (const b of blds) {
          ctx.strokeStyle = `rgba(${b.col},0.55)`; ctx.lineWidth = 1.2;
          ctx.strokeRect(b.x, base - b.bh, b.bw, b.bh);
          for (let wy = base - b.bh + 8; wy < base - 6; wy += 12)
            for (let wx = b.x + 6; wx < b.x + b.bw - 5; wx += 9) {
              const lit = (Math.sin(wx * 12.9 + wy * 4.1 + Math.floor(t * 1.5)) * 0.5 + 0.5) > 0.6;
              ctx.fillStyle = `rgba(${b.col},${lit ? 0.7 : 0.12})`; ctx.fillRect(wx, wy, 3, 4);
            }
        }
        const sy = base - ((t * 60) % (h * 0.55));
        ctx.strokeStyle = `rgba(${W},0.18)`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, sy); ctx.lineTo(w, sy); ctx.stroke();
        for (const p of pins) {
          const bob = Math.sin(t * 2 + p.ph) * 4;
          ctx.fillStyle = `rgba(${M},0.9)`;
          ctx.beginPath(); ctx.arc(p.x, p.y + bob, 5, Math.PI, 0); ctx.lineTo(p.x, p.y + bob + 12); ctx.closePath(); ctx.fill();
          ctx.fillStyle = `rgb(${W})`; ctx.beginPath(); ctx.arc(p.x, p.y + bob - 1, 2, 0, 6.2832); ctx.fill();
        }
      };
    }

    /* ───────── Document intelligence: scan + extracted chips ───────── */
    case "document": {
      const dw = Math.min(180, w * 0.32), dh = dw * 1.3, dx = w * 0.22 - dw / 2, dy = h / 2 - dh / 2;
      const lines = Array.from({ length: 9 }, (_, i) => dy + 26 + i * (dh - 40) / 9);
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(${W},0.4)`; ctx.lineWidth = 2; roundRect(ctx, dx, dy, dw, dh, 8); ctx.stroke();
        const scanY = dy + ((t * 50) % dh);
        lines.forEach((ly, i) => {
          const near = Math.abs(ly - scanY) < 14;
          ctx.fillStyle = near ? `rgba(${C},0.9)` : `rgba(${W},0.2)`;
          ctx.fillRect(dx + 14, ly, dw - 28 - (i % 3) * 18, 5);
        });
        ctx.fillStyle = `rgba(${C},0.12)`; ctx.fillRect(dx, scanY - 8, dw, 16);
        ctx.strokeStyle = `rgba(${C},0.8)`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(dx, scanY); ctx.lineTo(dx + dw, scanY); ctx.stroke();
        for (let k = 0; k < 4; k++) {
          const prog = (t * 0.5 + k * 0.25) % 1;
          const sx = dx + dw, ex = w * 0.7;
          const x = sx + (ex - sx) * prog, y = dy + 30 + k * 40;
          ctx.globalAlpha = Math.sin(prog * Math.PI);
          ctx.fillStyle = `rgba(${M},0.85)`; roundRect(ctx, x, y, 60, 18, 5); ctx.fill();
          ctx.globalAlpha = 1;
        }
      };
    }

    /* ───────── Ready-to-use agents: grid dispatching tasks ───────── */
    case "agentgrid": {
      const cols = Math.max(3, Math.floor(w / 140));
      const rows = Math.max(2, Math.floor(h / 120));
      const gx = w / (cols + 1), gy = h / (rows + 1);
      const cells: { x: number; y: number }[] = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push({ x: gx * (c + 1), y: gy * (r + 1) });
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        const idx = Math.floor(t / 1.3), prog = (t / 1.3) % 1;
        const a = cells[idx % cells.length], b = cells[(idx * 5 + 2) % cells.length];
        for (const c of cells) { ctx.strokeStyle = `rgba(${W},0.12)`; ctx.lineWidth = 1; roundRect(ctx, c.x - 17, c.y - 12, 34, 24, 5); ctx.stroke(); }
        ctx.strokeStyle = `rgba(${M},0.9)`; ctx.lineWidth = 1.5; roundRect(ctx, a.x - 17, a.y - 12, 34, 24, 5); ctx.stroke();
        ctx.fillStyle = `rgba(${M},0.14)`; roundRect(ctx, a.x - 17, a.y - 12, 34, 24, 5); ctx.fill();
        ctx.strokeStyle = `rgba(${C},0.3)`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        ctx.fillStyle = `rgb(${C})`; ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * prog, a.y + (b.y - a.y) * prog, 3, 0, 6.2832); ctx.fill();
        if (prog > 0.85) { ctx.strokeStyle = `rgba(${C},0.9)`; ctx.lineWidth = 1.5; roundRect(ctx, b.x - 17, b.y - 12, 34, 24, 5); ctx.stroke(); }
      };
    }

    /* ───────── AI voice agents: call connecting rings ───────── */
    case "voicecall": {
      const cx = w / 2, cy = h / 2;
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (let r = 0; r < 4; r++) { const rad = (t * 70 + r * 60) % 240; ctx.strokeStyle = `rgba(${r % 2 ? C : M},${0.3 * (1 - rad / 240)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, 6.2832); ctx.stroke(); }
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(0.4);
        ctx.fillStyle = `rgb(${W})`; roundRect(ctx, -10, -17, 20, 34, 7); ctx.fill();
        ctx.fillStyle = `rgb(${M})`; roundRect(ctx, -6, -11, 12, 18, 2); ctx.fill();
        ctx.restore();
        for (let k = 0; k < 6; k++) { const ang = t * 1.2 + k * 1.047, rr = 64 + Math.sin(t * 2 + k) * 6; ctx.fillStyle = `rgba(${C},0.8)`; ctx.beginPath(); ctx.arc(cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, 3, 0, 6.2832); ctx.fill(); }
      };
    }

    /* ───────── Satellite intelligence (solution): radar sweep ───────── */
    case "radar": {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.42;
      const blips = Array.from({ length: 6 }, () => ({ a: rnd(0, 6.28), r: rnd(0.3, 0.95) * R }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(${C},0.18)`; ctx.lineWidth = 1;
        for (let i = 1; i <= 4; i++) { ctx.beginPath(); ctx.arc(cx, cy, (R * i) / 4, 0, 6.2832); ctx.stroke(); }
        for (let i = 0; i < 8; i++) { const a = i * 0.785; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke(); }
        const sweep = (t * 1.3) % 6.2832;
        for (let k = 0; k < 30; k++) { const a = sweep - k * 0.03; ctx.strokeStyle = `rgba(${C},${0.25 * (1 - k / 30)})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R); ctx.stroke(); }
        for (const b of blips) { const diff = ((sweep - b.a) % 6.2832 + 6.2832) % 6.2832; const lit = diff < 0.6 ? 1 - diff / 0.6 : 0; if (lit > 0.05) { ctx.fillStyle = `rgba(${M},${lit})`; ctx.beginPath(); ctx.arc(cx + Math.cos(b.a) * b.r, cy + Math.sin(b.a) * b.r, 3 + lit * 2, 0, 6.2832); ctx.fill(); } }
      };
    }

    /* ───────── VR training: headset + FOV scan ───────── */
    case "headset": {
      const cx = w / 2, cy = h / 2;
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(${M},0.8)`; ctx.lineWidth = 2; roundRect(ctx, cx - 72, cy - 34, 144, 68, 18); ctx.stroke();
        for (const sx of [-36, 36]) { ctx.strokeStyle = `rgba(${C},0.8)`; ctx.beginPath(); ctx.arc(cx + sx, cy, 20, 0, 6.2832); ctx.stroke(); }
        ctx.strokeStyle = `rgba(${W},0.3)`; ctx.beginPath(); ctx.moveTo(cx - 72, cy - 8); ctx.lineTo(cx - 112, cy - 30); ctx.moveTo(cx + 72, cy - 8); ctx.lineTo(cx + 112, cy - 30); ctx.stroke();
        const p = (t * 0.5) % 1, fw = p * w * 0.5;
        ctx.strokeStyle = `rgba(${C},${0.3 * (1 - p)})`; ctx.lineWidth = 1; ctx.strokeRect(cx - fw / 2, cy - fw * 0.3, fw, fw * 0.6);
        for (let k = 0; k < 4; k++) { const a = t + k * 1.57; ctx.fillStyle = `rgba(${M},0.7)`; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 95, cy + Math.sin(a) * 52, 2.5, 0, 6.2832); ctx.fill(); }
      };
    }

    /* ───────── VR real estate demo: floor plan walkthrough ───────── */
    case "floorplan": {
      const rooms = [[0.12, 0.18, 0.38, 0.36], [0.5, 0.18, 0.38, 0.22], [0.5, 0.42, 0.38, 0.4], [0.12, 0.56, 0.38, 0.26]];
      const path = [[0.31, 0.5], [0.5, 0.5], [0.69, 0.32], [0.69, 0.62], [0.31, 0.72]];
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(${C},0.6)`; ctx.lineWidth = 2;
        for (const r of rooms) ctx.strokeRect(r[0] * w, r[1] * h, r[2] * w, r[3] * h);
        ctx.strokeStyle = `rgba(${M},0.25)`; ctx.lineWidth = 1; ctx.beginPath();
        path.forEach((p, k) => (k ? ctx.lineTo(p[0] * w, p[1] * h) : ctx.moveTo(p[0] * w, p[1] * h)));
        ctx.stroke();
        const tt = (t * 0.22) % 1, fi = tt * path.length, i = Math.floor(fi) % path.length, f = fi - Math.floor(fi);
        const a = path[i], b = path[(i + 1) % path.length];
        const px = (a[0] + (b[0] - a[0]) * f) * w, py = (a[1] + (b[1] - a[1]) * f) * h;
        ctx.fillStyle = `rgba(${M},0.15)`; ctx.beginPath(); ctx.arc(px, py, 13, 0, 6.2832); ctx.fill();
        ctx.fillStyle = `rgb(${M})`; ctx.beginPath(); ctx.arc(px, py, 5, 0, 6.2832); ctx.fill();
      };
    }

    /* ───────── Broker platform: hub connecting property pins ───────── */
    case "listings": {
      const cx = w / 2, cy = h / 2;
      const pins = Array.from({ length: 7 }, (_, i) => ({ a: (i / 7) * 6.2832, r: Math.min(w, h) * 0.4, ph: rnd(0, 6.28) }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (const p of pins) {
          const x = cx + Math.cos(p.a) * p.r, y = cy + Math.sin(p.a) * p.r * 0.72;
          ctx.strokeStyle = `rgba(${C},0.2)`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
          const f = (t * 0.5 + p.ph) % 1; ctx.fillStyle = `rgba(${C},0.85)`; ctx.beginPath(); ctx.arc(cx + (x - cx) * f, cy + (y - cy) * f, 2.5, 0, 6.2832); ctx.fill();
          const bob = Math.sin(t * 2 + p.ph) * 3; ctx.fillStyle = `rgba(${M},0.9)`; ctx.beginPath(); ctx.arc(x, y + bob, 5, Math.PI, 0); ctx.lineTo(x, y + bob + 11); ctx.closePath(); ctx.fill();
          ctx.fillStyle = `rgb(${W})`; ctx.beginPath(); ctx.arc(x, y + bob - 1, 2, 0, 6.2832); ctx.fill();
        }
        ctx.fillStyle = `rgb(${W})`; roundRect(ctx, cx - 22, cy - 14, 44, 28, 7); ctx.fill();
        ctx.fillStyle = `rgb(${M})`; ctx.font = "bold 14px ui-monospace, monospace"; ctx.textAlign = "center"; ctx.fillText("◆", cx, cy + 5); ctx.textAlign = "left";
      };
    }

    /* ───────── Knowledge assistant: knowledge graph + query ───────── */
    case "knowledge": {
      const cx = w / 2, cy = h / 2;
      const nodes = Array.from({ length: 8 }, (_, i) => ({ a: (i / 8) * 6.2832, r: Math.min(w, h) * 0.33 }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        const pos = nodes.map((n) => ({ x: cx + Math.cos(n.a + t * 0.1) * n.r, y: cy + Math.sin(n.a + t * 0.1) * n.r }));
        pos.forEach((p) => { ctx.strokeStyle = `rgba(${W},0.08)`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(p.x, p.y); ctx.stroke(); ctx.fillStyle = `rgba(${C},0.85)`; ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, 6.2832); ctx.fill(); });
        const ph = (t * 0.6) % 2;
        if (ph < 1) { const p = pos[Math.floor(t * 0.6) % pos.length]; ctx.fillStyle = `rgb(${M})`; ctx.beginPath(); ctx.arc(p.x + (cx - p.x) * ph, p.y + (cy - p.y) * ph, 3, 0, 6.2832); ctx.fill(); }
        const g = 0.6 + 0.4 * Math.sin(t * 3);
        ctx.fillStyle = `rgba(${M},${g})`; ctx.beginPath(); ctx.arc(cx, cy, 7, 0, 6.2832); ctx.fill();
        ctx.fillStyle = `rgba(${M},0.15)`; ctx.beginPath(); ctx.arc(cx, cy, 16 + g * 4, 0, 6.2832); ctx.fill();
      };
    }

    /* ───────── Power sector: transmission grid with current ───────── */
    case "powergrid": {
      const baseY = h * 0.72, count = Math.max(3, Math.floor(w / 170)), step = w / count;
      const towers = Array.from({ length: count }, (_, i) => ({ x: (i + 0.5) * step }));
      const th = h * 0.34, topY = baseY - th * 0.8;
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(${W},0.4)`; ctx.lineWidth = 1.5;
        for (const tw of towers) { ctx.beginPath(); ctx.moveTo(tw.x - 15, baseY); ctx.lineTo(tw.x, baseY - th); ctx.lineTo(tw.x + 15, baseY); ctx.moveTo(tw.x - 13, baseY - th * 0.5); ctx.lineTo(tw.x + 13, baseY - th * 0.5); ctx.moveTo(tw.x - 9, baseY - th * 0.78); ctx.lineTo(tw.x + 9, baseY - th * 0.78); ctx.stroke(); }
        for (let i = 0; i < towers.length - 1; i++) {
          const a = towers[i], b = towers[i + 1];
          ctx.strokeStyle = `rgba(${C},0.3)`; ctx.lineWidth = 1; ctx.beginPath();
          for (let s = 0; s <= 20; s++) { const f = s / 20, x = a.x + (b.x - a.x) * f; ctx.lineTo(x, topY + Math.sin(f * Math.PI) * 16); }
          ctx.stroke();
          const f = (t * 0.4 + i * 0.2) % 1, x = a.x + (b.x - a.x) * f, y = topY + Math.sin(f * Math.PI) * 16;
          ctx.fillStyle = `rgb(${M})`; ctx.beginPath(); ctx.arc(x, y, 3, 0, 6.2832); ctx.fill();
          ctx.fillStyle = `rgba(${M},0.2)`; ctx.beginPath(); ctx.arc(x, y, 8, 0, 6.2832); ctx.fill();
        }
      };
    }

    /* ───────── Real estate (industry): self-drawing blueprint ───────── */
    case "blueprint": {
      const bx = w * 0.26, by = h * 0.26, bw = w * 0.48, bh = h * 0.48;
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        ctx.setLineDash([8, 6]); ctx.lineDashOffset = -t * 30;
        ctx.strokeStyle = `rgba(${C},0.7)`; ctx.lineWidth = 1.5; ctx.strokeRect(bx, by, bw, bh);
        ctx.strokeStyle = `rgba(${C},0.4)`; ctx.beginPath();
        ctx.moveTo(bx + bw * 0.6, by); ctx.lineTo(bx + bw * 0.6, by + bh);
        ctx.moveTo(bx, by + bh * 0.55); ctx.lineTo(bx + bw * 0.6, by + bh * 0.55); ctx.stroke();
        ctx.setLineDash([]);
        ctx.strokeStyle = `rgba(${M},0.6)`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(bx, by - 16); ctx.lineTo(bx + bw, by - 16); ctx.stroke();
        for (const x of [bx, bx + bw]) { ctx.beginPath(); ctx.moveTo(x, by - 20); ctx.lineTo(x, by - 12); ctx.stroke(); }
        const f = (t * 0.3) % 1, peri = 2 * (bw + bh); let d = f * peri, px = bx, py = by;
        if (d < bw) { px = bx + d; } else if (d < bw + bh) { px = bx + bw; py = by + (d - bw); } else if (d < 2 * bw + bh) { px = bx + bw - (d - bw - bh); py = by + bh; } else { py = by + bh - (d - 2 * bw - bh); }
        ctx.fillStyle = `rgb(${M})`; ctx.beginPath(); ctx.arc(px, py, 4, 0, 6.2832); ctx.fill();
      };
    }

    /* ───────── Education: growing knowledge tree ───────── */
    case "learn": {
      const rootX = w / 2, rootY = h * 0.86;
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        const grow = Math.sin(t * 0.5) * 0.5 + 0.5;
        const branch = (x: number, y: number, ang: number, len: number, depth: number) => {
          if (depth === 0 || len < 6) return;
          const ex = x + Math.cos(ang) * len * grow, ey = y + Math.sin(ang) * len * grow;
          ctx.strokeStyle = `rgba(${depth > 2 ? C : M},${0.3 + depth * 0.12})`; ctx.lineWidth = depth * 0.6;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ex, ey); ctx.stroke();
          ctx.fillStyle = `rgba(${M},0.7)`; ctx.beginPath(); ctx.arc(ex, ey, 1.6, 0, 6.2832); ctx.fill();
          branch(ex, ey, ang - 0.5, len * 0.74, depth - 1);
          branch(ex, ey, ang + 0.5, len * 0.74, depth - 1);
        };
        branch(rootX, rootY, -Math.PI / 2, h * 0.22, 5);
      };
    }

    /* ───────── E-commerce: products → cart conversion ───────── */
    case "commerce": {
      const laneY = h * 0.46, startX = w * 0.12, cartX = w * 0.8;
      const tiles = Array.from({ length: 6 }, (_, i) => ({ off: i / 6, col: i % 2 ? M : C }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(${W},0.1)`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(startX, laneY); ctx.lineTo(cartX, laneY); ctx.stroke();
        for (const tl of tiles) { const f = (t * 0.18 + tl.off) % 1, x = startX + (cartX - startX) * f, y = laneY + Math.sin(f * 6.28) * 4; ctx.globalAlpha = f > 0.9 ? (1 - f) * 10 : f < 0.1 ? f * 10 : 1; ctx.fillStyle = `rgba(${tl.col},0.85)`; roundRect(ctx, x - 12, y - 12, 24, 24, 5); ctx.fill(); ctx.globalAlpha = 1; }
        ctx.strokeStyle = `rgb(${W})`; ctx.lineWidth = 2; roundRect(ctx, cartX - 16, laneY - 14, 32, 26, 5); ctx.stroke();
        ctx.fillStyle = `rgb(${M})`; ctx.beginPath(); ctx.arc(cartX - 8, laneY + 18, 3, 0, 6.2832); ctx.arc(cartX + 8, laneY + 18, 3, 0, 6.2832); ctx.fill();
        const bh = (Math.sin(t) * 0.5 + 0.5) * h * 0.3; ctx.fillStyle = `rgba(${C},0.5)`; ctx.fillRect(startX, h * 0.78 - bh, 14, bh);
      };
    }

    /* ───────── Web3: linked blockchain ───────── */
    case "blockchain": {
      const cy = h / 2;
      const n = Math.max(3, Math.floor(w / 160));
      const gap = w / (n + 1);
      const blocks = Array.from({ length: n }, (_, i) => ({ x: gap * (i + 1), col: i % 2 ? M : C }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < blocks.length - 1; i++) {
          const a = blocks[i], b = blocks[i + 1];
          ctx.strokeStyle = `rgba(${W},0.2)`; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(a.x + 28, cy); ctx.lineTo(b.x - 28, cy); ctx.stroke();
          const f = (t * 0.5 + i * 0.2) % 1; ctx.fillStyle = `rgba(${C},0.9)`; ctx.beginPath(); ctx.arc(a.x + 28 + (b.x - 56 - a.x) * f, cy, 3, 0, 6.2832); ctx.fill();
        }
        blocks.forEach((bl, i) => {
          const lit = Math.sin(t * 1.2 - i * 0.5) * 0.5 + 0.5;
          ctx.strokeStyle = `rgba(${bl.col},${0.6 + lit * 0.4})`; ctx.lineWidth = 2; roundRect(ctx, bl.x - 28, cy - 28, 56, 56, 9); ctx.stroke();
          ctx.fillStyle = `rgba(${bl.col},${0.08 + lit * 0.1})`; roundRect(ctx, bl.x - 28, cy - 28, 56, 56, 9); ctx.fill();
          ctx.fillStyle = `rgba(${W},0.25)`;
          for (let k = 0; k < 3; k++) ctx.fillRect(bl.x - 17, cy - 13 + k * 10, 34 - k * 7, 3);
        });
      };
    }

    /* ───────── Solutions hub: modular blocks assembling ───────── */
    case "blocks": {
      const cx = w / 2, baseY = h * 0.66;
      const blocks = Array.from({ length: 9 }, (_, i) => ({ tx: cx + ((i % 3) - 1) * 56, ty: baseY - Math.floor(i / 3) * 42, col: i % 2 ? M : C, ph: i * 0.3 }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (const b of blocks) { const a = Math.sin(t * 0.8 + b.ph) * 0.5 + 0.5, y = b.ty - (1 - a) * 40; ctx.globalAlpha = a; ctx.strokeStyle = `rgba(${b.col},0.85)`; ctx.lineWidth = 1.5; roundRect(ctx, b.tx - 25, y - 18, 50, 36, 5); ctx.stroke(); ctx.fillStyle = `rgba(${b.col},0.12)`; roundRect(ctx, b.tx - 25, y - 18, 50, 36, 5); ctx.fill(); ctx.globalAlpha = 1; }
      };
    }

    /* ───────── Industries hub: rotating sector ring ───────── */
    case "sectors": {
      const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.4, seg = 6;
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < seg; i++) {
          const a0 = (i / seg) * 6.2832 + t * 0.2, a1 = ((i + 1) / seg) * 6.2832 + t * 0.2, lit = Math.sin(t * 1.5 - i) * 0.5 + 0.5;
          ctx.fillStyle = `rgba(${i % 2 ? C : M},${0.1 + lit * 0.4})`; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, R, a0, a1); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = `rgba(${W},0.1)`; ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.fillStyle = "rgb(5,5,7)"; ctx.beginPath(); ctx.arc(cx, cy, R * 0.3, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = `rgba(${M},0.6)`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, R * 0.3, 0, 6.2832); ctx.stroke();
      };
    }

    /* ───────── Careers: rising, connecting particles (growth) ───────── */
    case "careers": {
      const ps = Array.from({ length: 42 }, () => ({ x: rnd(w * 0.12, w * 0.88), y: rnd(0, h), v: rnd(0.3, 1), col: Math.random() > 0.5 ? M : C, sz: rnd(1.5, 3) }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (const p of ps) {
          p.y -= p.v;
          if (p.y < -10) { p.y = h + 10; p.x = rnd(w * 0.12, w * 0.88); }
          ctx.fillStyle = `rgba(${p.col},${0.2 + 0.6 * (1 - Math.abs(p.y / h - 0.5) * 2)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.sz, 0, 6.2832); ctx.fill();
        }
        for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) {
          const a = ps[i], b = ps[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 72) { ctx.strokeStyle = `rgba(${W},${0.06 * (1 - d / 72)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      };
    }

    /* ───────── Insights/blog: floating article cards ───────── */
    case "blog": {
      const cw = 96, ch = 64;
      const n = Math.max(4, Math.floor(w / 150));
      const cards = Array.from({ length: n }, (_, i) => ({ x: w * 0.12 + i * (w * 0.76 / n), y: rnd(0, h), sp: rnd(0.2, 0.5), col: i % 2 ? M : C }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (const c of cards) {
          c.y -= c.sp;
          if (c.y < -ch - 20) c.y = h + 30;
          ctx.strokeStyle = `rgba(${c.col},0.6)`; ctx.lineWidth = 1.5; roundRect(ctx, c.x, c.y, cw, ch, 7); ctx.stroke();
          ctx.fillStyle = `rgba(${c.col},0.08)`; roundRect(ctx, c.x, c.y, cw, ch, 7); ctx.fill();
          ctx.fillStyle = `rgba(${W},0.25)`; ctx.fillRect(c.x + 11, c.y + 13, cw - 22, 5); ctx.fillRect(c.x + 11, c.y + 25, cw - 38, 4); ctx.fillRect(c.x + 11, c.y + 35, cw - 28, 4);
          ctx.fillStyle = `rgba(${c.col},0.85)`; ctx.fillRect(c.x + 11, c.y + ch - 14, 26, 5);
        }
      };
    }

    /* ───────── Resources hub: library of tiles ───────── */
    case "library": {
      const cols = Math.max(4, Math.floor(w / 100));
      const rows = Math.max(3, Math.floor(h / 84));
      const gx = w / (cols + 1), gy = h / (rows + 1);
      const tiles: { x: number; y: number; col: string; ph: number }[] = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) tiles.push({ x: gx * (c + 1), y: gy * (r + 1), col: (r + c) % 2 ? M : C, ph: (r * cols + c) * 0.2 });
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (const ti of tiles) {
          const lit = Math.sin(t * 1.2 - ti.ph) * 0.5 + 0.5;
          ctx.strokeStyle = `rgba(${ti.col},${0.22 + lit * 0.55})`; ctx.lineWidth = 1.2; roundRect(ctx, ti.x - 19, ti.y - 13, 38, 26, 4); ctx.stroke();
          ctx.fillStyle = `rgba(${ti.col},${0.05 + lit * 0.12})`; roundRect(ctx, ti.x - 19, ti.y - 13, 38, 26, 4); ctx.fill();
        }
      };
    }

    /* ───────── White papers: research chart drawing itself ───────── */
    case "chart": {
      const n = 12, base = h * 0.74, left = w * 0.18, cw = (w * 0.64) / n;
      const bars = Array.from({ length: n }, (_, i) => ({ h: rnd(0.2, 0.9), ph: i * 0.3 }));
      const trend = (i: number, t: number) => base - (0.2 + (i / n) * 0.55 + Math.sin(t + i * 0.3) * 0.05) * h * 0.45;
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = `rgba(${W},0.15)`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(left, base); ctx.lineTo(left + w * 0.64, base); ctx.moveTo(left, base); ctx.lineTo(left, h * 0.22); ctx.stroke();
        bars.forEach((b, i) => { const hh = b.h * (0.7 + 0.3 * Math.sin(t + b.ph)) * h * 0.42; ctx.fillStyle = `rgba(${i % 2 ? C : M},0.45)`; ctx.fillRect(left + i * cw + 4, base - hh, cw - 8, hh); });
        ctx.strokeStyle = `rgb(${M})`; ctx.lineWidth = 2; ctx.beginPath();
        for (let i = 0; i < n; i++) { const x = left + i * cw + cw / 2, y = trend(i, t); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.stroke();
        for (let i = 0; i < n; i++) { ctx.fillStyle = `rgb(${C})`; ctx.beginPath(); ctx.arc(left + i * cw + cw / 2, trend(i, t), 2.5, 0, 6.2832); ctx.fill(); }
      };
    }

    /* ───────── default: soft particle drift ───────── */
    default: {
      const n = Math.round(Math.min(40, (w * h) / 16000));
      const ps = Array.from({ length: n }, () => ({ x: rnd(0, w), y: rnd(0, h), vx: rnd(-0.3, 0.3), vy: rnd(-0.3, 0.3), c: Math.random() > 0.5 ? M : C, p: rnd(0, 6.28) }));
      return (ctx, t) => {
        ctx.clearRect(0, 0, w, h);
        for (const p of ps) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0) p.x = w; if (p.x > w) p.x = 0; if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
          ctx.fillStyle = `rgba(${p.c},${0.4 + 0.4 * Math.sin(t * 2 + p.p)})`;
          ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 6.2832); ctx.fill();
        }
      };
    }
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export default function SectionCanvas({ variant, className, hover }: { variant: string; className?: string; hover?: boolean }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // pull brand colors from CSS variables (space-separated → comma for canvas)
    const cs = getComputedStyle(document.documentElement);
    const readVar = (name: string, fb: string) => {
      const v = cs.getPropertyValue(name).trim();
      return v ? v.replace(/\s+/g, ",") : fb;
    };
    const M = readVar("--accent-rgb", "216,86,191");
    const C = readVar("--cyan-rgb", "3,179,195");

    let w = 0, h = 0, draw: Draw = () => {};
    let raf = 0, running = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw = create(variant, w, h, M, C);
      draw(ctx, 1.2); // always render a static frame so nothing is blank/janky
    };

    const loop = () => {
      if (!running) return;
      draw(ctx, performance.now() * 0.001);
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);

    // ── HOVER mode (cards): static at rest, animate only while hovered → zero idle cost ──
    if (hover) {
      if (reduce) return () => window.removeEventListener("resize", resize);
      const target = (canvas.closest("a") as HTMLElement) || canvas.parentElement || canvas;
      const enter = () => { if (!running) { running = true; loop(); } };
      const leave = () => { running = false; cancelAnimationFrame(raf); draw(ctx, 1.2); };
      target.addEventListener("pointerenter", enter);
      target.addEventListener("pointerleave", leave);
      return () => {
        running = false; cancelAnimationFrame(raf);
        target.removeEventListener("pointerenter", enter);
        target.removeEventListener("pointerleave", leave);
        window.removeEventListener("resize", resize);
      };
    }

    // ── DEFAULT mode (heroes): animate whenever in view, pause off-screen ──
    const io = new IntersectionObserver(
      ([e]) => {
        if (reduce) return;
        if (e.isIntersecting && !running) { running = true; loop(); }
        else if (!e.isIntersecting) { running = false; cancelAnimationFrame(raf); }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [variant, hover]);

  return <canvas ref={ref} aria-hidden="true" className={className ?? "absolute inset-0 h-full w-full"} />;
}
