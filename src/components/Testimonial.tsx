"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const QUOTES = [
  {
    body: "We replaced six months of wet-lab triage with a 38-minute Helix run. The candidates that came out the other side were already de-risked.",
    name: "Dr. Anya Voloshina",
    role: "PI · Bay Area Tumor Atlas",
    org: "BATA",
  },
  {
    body: "On-chain provenance changed how my lab gets credit. Every fork of our Critic agent pays back to the people who built it.",
    name: "Mehmet Aydın",
    role: "Computational immunologist",
    org: "ICR — London",
  },
  {
    body: "Helix is the only platform where my postdoc can publish a candidate, a sim, and a follow-up paper before lunch.",
    name: "Dr. Reni Okafor",
    role: "Director, Pediatric Oncology",
    org: "St. Marigold's",
  },
];

const STATS = [
  {
    v: "20+",
    sub: "hours of triage replaced",
    note: "per candidate, vs. legacy pipeline",
  },
  {
    v: "62% → 4%",
    sub: "false-positive rate",
    note: "after Critic stage in production",
  },
  {
    v: "Open",
    sub: "weights · data · provenance",
    note: "every artifact, every run, every node",
  },
];

export function Testimonial() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % QUOTES.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const q = QUOTES[i];

  return (
    <section
      className="relative theme-light pt-12 md:pt-20 pb-24 md:pb-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 grid-bg-light opacity-50 pointer-events-none z-0" />
      <div className="wrap relative z-[var(--z-base)]">
        <div className="grid grid-cols-12 gap-6 md:gap-8 items-center">
          {/* Image card */}
          <div className="col-span-12 md:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[var(--color-ink-line-strong)]"
            >
              <ResearcherIllustration />
              {/* Bottom badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-[rgba(20,21,27,0.85)] backdrop-blur-md rounded-xl px-4 py-3 text-[var(--color-fg)] z-[var(--z-callout)]">
                <div>
                  <div className="text-[13px] font-medium">{q.org}</div>
                  <div className="text-mono-sm text-[var(--color-muted)]">
                    case study · 2026
                  </div>
                </div>
                <a
                  href="#"
                  data-cursor="link"
                  className="inline-flex items-center gap-1.5 text-mono-sm hover:text-[var(--color-accent-2)] transition-colors"
                >
                  view ↗
                </a>
              </div>
            </motion.div>
          </div>

          {/* Quote */}
          <div className="col-span-12 md:col-span-7 md:pl-8 lg:pl-16 relative">
            <svg
              viewBox="0 0 80 80"
              className="absolute -top-2 -left-2 w-10 h-10 text-[var(--color-ink)]/20"
              fill="currentColor"
            >
              <path d="M22 22 Q14 22 14 30 L14 50 L34 50 L34 30 L26 30 Q26 26 32 26 L32 22 Z M50 22 Q42 22 42 30 L42 50 L62 50 L62 30 L54 30 Q54 26 60 26 L60 22 Z" />
            </svg>

            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="pt-6"
              >
                <p className="text-[var(--color-ink)] text-2xl md:text-3xl lg:text-[2.4rem] font-medium leading-[1.18] tracking-tight">
                  &ldquo;{q.body}&rdquo;
                </p>
                <div className="mt-8 flex items-baseline gap-3">
                  <span className="block w-6 h-px bg-[var(--color-ink)]" />
                  <span className="text-[14px] text-[var(--color-ink)]">
                    {q.name}
                  </span>
                  <span className="text-[14px] text-[var(--color-ink-muted)]">
                    · {q.role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center gap-3">
              <button
                aria-label="Previous quote"
                onClick={() => setI((v) => (v - 1 + QUOTES.length) % QUOTES.length)}
                data-cursor="link"
                className="w-10 h-10 rounded-full border border-[var(--color-ink-line-strong)] flex items-center justify-center hover:border-[var(--color-ink)] transition-colors"
              >
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor">
                  <path d="M10 4l-4 4 4 4" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
              <button
                aria-label="Next quote"
                onClick={() => setI((v) => (v + 1) % QUOTES.length)}
                data-cursor="link"
                className="w-10 h-10 rounded-full border border-[var(--color-ink-line-strong)] flex items-center justify-center hover:border-[var(--color-ink)] transition-colors"
              >
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor">
                  <path d="M6 4l4 4-4 4" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
              <div className="ml-4 flex items-center gap-2">
                {QUOTES.map((_, n) => (
                  <button
                    key={n}
                    onClick={() => setI(n)}
                    aria-label={`Go to quote ${n + 1}`}
                    className="relative h-1 w-8 bg-[var(--color-ink-line-strong)] rounded-full overflow-hidden"
                  >
                    {n === i && (
                      <motion.span
                        key={`p-${i}-${paused}`}
                        initial={{ width: 0 }}
                        animate={{ width: paused ? "100%" : "100%" }}
                        transition={{ duration: paused ? 0 : 7, ease: "linear" }}
                        className="absolute left-0 top-0 bottom-0 bg-[var(--color-ink)]"
                      />
                    )}
                    {n < i && <span className="absolute inset-0 bg-[var(--color-ink)]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 md:mt-28 grid grid-cols-12 border-t border-[var(--color-ink-line-strong)]">
          {STATS.map((s, idx) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className={`col-span-12 md:col-span-4 py-8 md:py-10 px-0 md:px-8 ${
                idx > 0 ? "md:border-l border-[var(--color-ink-line-strong)]" : ""
              } border-t md:border-t-0 first:border-t-0 border-[var(--color-ink-line-strong)]`}
            >
              <div className="text-mono-sm text-[var(--color-ink-muted)] mb-3">
                [0{idx + 1}]
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-ink)]">
                {s.v}
              </div>
              <div className="mt-3 text-[14px] text-[var(--color-ink)]">
                {s.sub}
              </div>
              <div className="mt-1 text-mono-sm text-[var(--color-ink-muted)]">
                {s.note}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearcherIllustration() {
  return (
    <div className="absolute inset-0 bg-[var(--color-cream-2)]">
      {/* abstract lab scene */}
      <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lab-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DDD9CF" />
            <stop offset="100%" stopColor="#C9C4B7" />
          </linearGradient>
          <linearGradient id="lab-glow" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#2956F8" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#2956F8" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#lab-bg)" />

        {/* faint isometric grid */}
        {Array.from({ length: 14 }).map((_, i) => (
          <g key={i}>
            <line
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40 - 200}
              stroke="rgba(20,21,27,0.06)"
            />
            <line
              x1="400"
              y1={i * 40}
              x2="0"
              y2={i * 40 - 200}
              stroke="rgba(20,21,27,0.06)"
            />
          </g>
        ))}

        {/* Centerpiece: large isometric lab apparatus */}
        <motion.g
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Bench */}
          <path
            d="M 60 320 L 200 250 L 340 320 L 200 390 Z"
            fill="rgba(20,21,27,0.04)"
            stroke="rgba(20,21,27,0.5)"
            strokeWidth="1.2"
          />
          <path
            d="M 60 320 L 60 360 L 200 430 L 200 390 Z"
            fill="rgba(20,21,27,0.06)"
            stroke="rgba(20,21,27,0.5)"
            strokeWidth="1.2"
          />
          <path
            d="M 200 390 L 200 430 L 340 360 L 340 320 Z"
            fill="rgba(20,21,27,0.10)"
            stroke="rgba(20,21,27,0.5)"
            strokeWidth="1.2"
          />

          {/* Beaker on bench */}
          <motion.path
            d="M 175 235 L 195 235 L 195 250 L 210 282 Q 210 290 200 290 L 170 290 Q 160 290 160 282 L 175 250 Z"
            fill="#2956F8"
            opacity="0.9"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ transformOrigin: "185px 290px", transformBox: "fill-box" }}
          />
          <line x1="170" y1="235" x2="200" y2="235" stroke="rgba(20,21,27,0.7)" strokeWidth="1.4" />

          {/* Cube on bench */}
          <motion.g
            initial={{ y: -40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <path d="M 250 230 L 290 250 L 250 270 L 210 250 Z" fill="#2956F8" />
            <path d="M 210 250 L 210 280 L 250 300 L 250 270 Z" fill="#2956F8" opacity="0.8" />
            <path d="M 250 270 L 250 300 L 290 280 L 290 250 Z" fill="#2956F8" opacity="0.6" />
            <text x="250" y="262" textAnchor="middle" fill="white" style={{ fontSize: 9, fontFamily: "monospace" }}>
              IDP
            </text>
          </motion.g>

          {/* Floor caption */}
          <text x="200" y="455" textAnchor="middle" style={{ fontSize: 9, fill: "rgba(20,21,27,0.6)", fontFamily: "monospace", letterSpacing: 1 }}>
            BATA · LAB 03 · 2026
          </text>
        </motion.g>

        <rect x="0" y="0" width="400" height="500" fill="url(#lab-glow)" />
      </svg>

      {/* Top right tag */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-mono-sm text-[var(--color-ink)]/70">
        <span className="flex items-center gap-2">
          <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
          live
        </span>
        <span>SF · 2026</span>
      </div>
    </div>
  );
}
