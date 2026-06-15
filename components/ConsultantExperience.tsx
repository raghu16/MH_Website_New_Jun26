"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Full-page AI consultant — avatar orb (left) + interactive requirement
 * gathering (right): intro → contact (name/email/phone) → OTP → adaptive
 * Q&A until a thorough brief is captured → summary + booking.
 *
 * Front-end simulation: the OTP and the "AI" replies are mocked. Wire the OTP
 * to a real SMS/email provider and the Q&A to a live voice/agent backend.
 */

type Step = "intro" | "contact" | "otp" | "gather" | "done";
type Mood = "idle" | "speaking" | "listening";
type Turn = { role: "bot" | "user"; text: string };

const questions: { key: string; q: string; type: "chips" | "text"; options?: string[]; placeholder?: string }[] = [
  { key: "Building", q: "Let's start — what are you building?", type: "chips", options: ["AI agent", "Voice agent", "Mobile app", "Web app", "Web3", "Geospatial", "XR / Game", "Something else"] },
  { key: "Purpose", q: "Got it. What's the main purpose — the problem it solves?", type: "text", placeholder: "e.g. automate support, book appointments…" },
  { key: "Users", q: "Who are the primary users?", type: "chips", options: ["Consumers", "Businesses", "Internal team", "Government", "Mixed"] },
  { key: "Features", q: "What are the must-have features or integrations?", type: "text", placeholder: "e.g. payments, CRM, maps, auth…" },
  { key: "Data & systems", q: "Will it use your existing data or systems? Tell me about them.", type: "text", placeholder: "e.g. our CRM, a database, third-party APIs…" },
  { key: "Platform", q: "Where should it run?", type: "chips", options: ["iOS", "Android", "Web", "Cross-platform", "Cloud / API", "Not sure"] },
  { key: "Timeline", q: "What's your ideal timeline?", type: "chips", options: ["ASAP", "1–3 months", "3–6 months", "Flexible"] },
  { key: "Budget", q: "And a budget range, so I can scope realistically?", type: "chips", options: ["< $25k", "$25–75k", "$75–150k", "$150k+", "Not sure yet"] },
];

export default function ConsultantExperience() {
  const [step, setStep] = useState<Step>("intro");
  const [caption, setCaption] = useState("Hi — I'm Monkhub's AI consultant. I'll gather your requirements and scope your project. Ready when you are.");
  const [mood, setMood] = useState<Mood>("speaking");

  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [code, setCode] = useState("");
  const [otpError, setOtpError] = useState(false);

  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [turns, setTurns] = useState<Turn[]>([]);
  const [text, setText] = useState("");

  const moodRef = useRef<Mood>("speaking");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  moodRef.current = mood;

  const speakBriefly = () => { setMood("speaking"); window.setTimeout(() => setMood("idle"), 1600); };

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [turns, step]);

  // ── flow ──
  const startContact = () => { setStep("contact"); setCaption("First, who am I speaking with? A few details so we can send your scope."); speakBriefly(); };
  const sendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.name.trim() || !contact.email.trim() || !contact.phone.trim()) return;
    setStep("otp"); setCode(""); setOtpError(false);
    setCaption(`I've sent a 6-digit code to ${contact.email}. Pop it in to verify.`); speakBriefly();
  };
  const verify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length < 4) { setOtpError(true); return; }
    setStep("gather"); setQi(0);
    setTurns([{ role: "bot", text: questions[0].q }]);
    setCaption(questions[0].q); speakBriefly();
  };
  const answer = (val: string) => {
    const v = val.trim();
    if (!v) return;
    const cur = questions[qi];
    const next = qi + 1;
    setAnswers((a) => ({ ...a, [cur.key]: v }));
    setText("");
    if (next < questions.length) {
      setTurns((t) => [...t, { role: "user", text: v }, { role: "bot", text: questions[next].q }]);
      setQi(next);
      setCaption(questions[next].q); speakBriefly();
    } else {
      setTurns((t) => [...t, { role: "user", text: v }]);
      setStep("done");
      setCaption("Perfect — I've got a thorough brief. Our team will prepare your scope and a same-day fixed price.");
      speakBriefly();
    }
  };

  // ── avatar orb ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cs = getComputedStyle(document.documentElement);
    const rv = (n: string, fb: string) => { const x = cs.getPropertyValue(n).trim(); return x ? x.replace(/\s+/g, ",") : fb; };
    const M = rv("--accent-rgb", "193,106,154"), C = rv("--cyan-rgb", "3,179,195");
    const dpr = Math.min(window.devicePixelRatio || 1, 2), size = 300;
    canvas.width = size * dpr; canvas.height = size * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = size / 2, cy = size / 2;
    let raf = 0, running = true;

    const draw = (t: number) => {
      const m = moodRef.current;
      const speaking = m === "speaking", listening = m === "listening";
      const col = listening ? C : M;
      const base = listening ? 0.4 : speaking ? 0.58 : 0.18;
      const level = base * (0.7 + 0.3 * Math.sin(t * (speaking ? 9 : 4))) + (speaking ? Math.abs(Math.sin(t * 16)) * 0.18 : 0);
      ctx.clearRect(0, 0, size, size);
      const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, 140);
      g.addColorStop(0, `rgba(${col},0.28)`); g.addColorStop(1, `rgba(${col},0)`);
      ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
      const baseR = 78;
      ctx.beginPath();
      for (let i = 0; i <= 140; i++) {
        const a = (i / 140) * Math.PI * 2;
        const d = baseR + (Math.sin(a * 3 + t * 2) + Math.sin(a * 5 - t * 1.5)) * (5 + level * 34);
        const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${col},0.10)`; ctx.fill();
      ctx.strokeStyle = `rgba(${col},0.85)`; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = `rgba(${col},0.9)`; ctx.beginPath(); ctx.arc(cx, cy, 8 + level * 10, 0, 6.2832); ctx.fill();
      for (let k = 0; k < 4; k++) {
        const a = t * 0.7 + k * 1.6, r = baseR + 26 + Math.sin(t * 2 + k) * 8;
        ctx.fillStyle = "rgba(245,245,244,0.7)"; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 2.2, 0, 6.2832); ctx.fill();
      }
    };
    const loop = () => { if (!running) return; draw(performance.now() * 0.001); raf = requestAnimationFrame(loop); };
    if (reduce) draw(0); else loop();
    return () => { running = false; cancelAnimationFrame(raf); };
  }, []);

  const progress = step === "gather" ? `Question ${qi + 1} of ${questions.length}` : step === "done" ? "Brief complete" : step === "otp" ? "Verify" : step === "contact" ? "Your details" : "Welcome";
  const cur = questions[qi];

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col overflow-hidden md:grid md:grid-cols-[1fr_1.1fr]">
      {/* LEFT — avatar (fixed) */}
      <div className="relative flex shrink-0 flex-col items-center justify-center gap-4 overflow-hidden border-b border-ink-700 bg-ink-950 p-6 md:h-full md:gap-6 md:border-b-0 md:border-r md:p-10">
        <div className="absolute inset-0 grid-texture opacity-60" />
        <div className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted">
          <span className="live-dot" /> AI Consultant · Voice
        </div>
        <canvas ref={canvasRef} aria-hidden="true" className="relative h-[200px] w-[200px] md:h-[300px] md:w-[300px]" />
        <div className="relative font-mono text-[11px] uppercase tracking-widest text-accent">
          {mood === "speaking" ? "Speaking" : mood === "listening" ? "Listening" : "Listening…"}
        </div>
        <p className="relative max-w-sm text-center font-serif text-lg leading-snug text-paper/90 md:text-2xl">{caption}</p>
      </div>

      {/* RIGHT — requirement gathering (scrolls; input pinned) */}
      <div className="flex min-h-0 flex-1 flex-col bg-ink-900/20 md:h-full">
        <div className="flex shrink-0 items-center justify-between border-b border-ink-700 px-6 py-5 md:px-10">
          <span className="font-mono text-xs uppercase tracking-widest text-paper">Requirement gathering</span>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">{progress}</span>
        </div>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-6 py-8 md:px-10">
          {step === "intro" && (
            <div className="mx-auto max-w-md text-center">
              <h1 className="font-serif text-4xl leading-tight md:text-5xl">Let&apos;s scope your project.</h1>
              <p className="mt-5 text-muted">
                I&apos;ll ask a few questions to understand exactly what you need, then our team prepares
                a scope and a same-day fixed price. Takes about 3 minutes.
              </p>
              <button onClick={startContact} className="btn-primary mt-8">Start →</button>
            </div>
          )}

          {step === "contact" && (
            <form onSubmit={sendCode} className="mx-auto max-w-md space-y-5">
              <h2 className="font-serif text-3xl">A few quick details</h2>
              {([["name", "Full name", "text", "Your name"], ["email", "Work email", "email", "you@company.com"], ["phone", "Phone", "tel", "+1 …"]] as const).map(([k, label, type, ph]) => (
                <div key={k}>
                  <label htmlFor={`c-${k}`} className="mono-label">{label}</label>
                  <input id={`c-${k}`} type={type} required value={contact[k]}
                    onFocus={() => setMood("listening")} onBlur={() => setMood("idle")}
                    onChange={(e) => setContact((c) => ({ ...c, [k]: e.target.value }))}
                    placeholder={ph}
                    className="mt-2 w-full rounded-xl border border-ink-700 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 focus:border-accent focus:outline-none" />
                </div>
              ))}
              <button type="submit" className="btn-primary w-full">Send verification code →</button>
              <p className="text-center text-xs text-muted">We verify by code so your scope reaches the right person.</p>
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={verify} className="mx-auto max-w-md space-y-5 text-center">
              <h2 className="font-serif text-3xl">Verify it&apos;s you</h2>
              <p className="text-muted">Enter the 6-digit code we sent to {contact.email}.</p>
              <input
                inputMode="numeric" maxLength={6} value={code}
                onFocus={() => setMood("listening")} onBlur={() => setMood("idle")}
                onChange={(e) => { setCode(e.target.value.replace(/\D/g, "")); setOtpError(false); }}
                placeholder="••••••"
                className="mx-auto w-48 rounded-xl border border-ink-700 bg-ink-950 px-4 py-3 text-center font-mono text-2xl tracking-[0.4em] text-paper placeholder:text-muted/40 focus:border-accent focus:outline-none"
              />
              {otpError && <p className="text-sm text-accent">Enter the 6-digit code to continue.</p>}
              <button type="submit" className="btn-primary w-full">Verify &amp; continue →</button>
              <p className="text-xs text-muted">Didn&apos;t get it? <button type="button" className="text-accent hover:underline">Resend code</button> · <span className="opacity-60">(demo — enter any 6 digits)</span></p>
            </form>
          )}

          {(step === "gather" || step === "done") && (
            <div className="mx-auto max-w-lg space-y-4">
              {turns.map((t, i) => (
                <div key={i} className={`flex ${t.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${t.role === "user" ? "bg-accent text-ink-950" : "border border-ink-700 bg-ink-950 text-paper/90"}`}>
                    {t.text}
                  </div>
                </div>
              ))}

              {step === "done" && (
                <div className="mt-8 rounded-2xl border border-accent/40 bg-ink-950 p-6 text-left">
                  <p className="mono-label text-accent">Your brief</p>
                  <dl className="mt-4 space-y-2.5">
                    {questions.map((q) => answers[q.key] && (
                      <div key={q.key} className="flex gap-3 text-sm">
                        <dt className="w-32 shrink-0 font-mono text-[11px] uppercase tracking-widest text-muted">{q.key}</dt>
                        <dd className="text-paper/90">{answers[q.key]}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/contact-us" className="btn-primary">Book a call to go deeper →</Link>
                    <Link href="/" className="btn-ghost">Back to site</Link>
                  </div>
                  <p className="mt-4 text-xs text-muted">We&apos;ll email {contact.email} your scope and a same-day fixed price.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* input dock — pinned at bottom */}
        {step === "gather" && cur && (
          <div className="shrink-0 border-t border-ink-700 px-6 py-5 md:px-10">
            {cur.type === "chips" ? (
              <div className="flex flex-wrap gap-2">
                {cur.options!.map((o) => (
                  <button key={o} onClick={() => answer(o)} className="rounded-full border border-ink-700 px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent">
                    {o}
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); answer(text); }} className="flex gap-2">
                <input value={text} onChange={(e) => setText(e.target.value)}
                  onFocus={() => setMood("listening")} onBlur={() => setMood("idle")}
                  placeholder={cur.placeholder || "Type your answer…"}
                  className="min-w-0 flex-1 rounded-xl border border-ink-700 bg-ink-950 px-4 py-3 text-paper placeholder:text-muted/60 focus:border-accent focus:outline-none" />
                <button type="submit" className="btn-primary shrink-0 px-5">Send</button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
