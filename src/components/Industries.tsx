"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";

const TABS = [
  {
    id: "solid",
    label: "Solid tumors",
    sub: "lung · breast · GI",
    palette: ["#2956F8", "#F2B93B", "#E84F6E"],
    targets: ["KRAS-G12D", "EGFR-T790M", "HER2", "PD-L1", "VEGFR2"],
    sims: 8214,
  },
  {
    id: "heme",
    label: "Hematological",
    sub: "AML · CLL · MM",
    palette: ["#36D6A2", "#6A8AFF", "#F2B93B"],
    targets: ["BCMA", "CD19", "FLT3-ITD", "BCL-2", "BTK"],
    sims: 3122,
  },
  {
    id: "peds",
    label: "Pediatric",
    sub: "neuroblastoma · DIPG",
    palette: ["#FF8E5C", "#6A8AFF", "#36D6A2"],
    targets: ["MYCN", "GD2", "H3K27M", "ALK"],
    sims: 928,
  },
  {
    id: "rare",
    label: "Rare oncology",
    sub: "sarcoma · GIST",
    palette: ["#E84F6E", "#F2B93B", "#36D6A2"],
    targets: ["EWSR1-FLI1", "KIT", "PDGFRA", "SS18-SSX"],
    sims: 412,
  },
  {
    id: "immuno",
    label: "Immuno-onc",
    sub: "TIL · TCR · CAR-T",
    palette: ["#6A8AFF", "#36D6A2", "#F2B93B"],
    targets: ["NY-ESO-1", "PRAME", "MAGE-A4", "TCR"],
    sims: 1607,
  },
];

export function Industries() {
  const [active, setActive] = useState(0);
  const t = TABS[active];

  return (
    <section className="relative theme-light py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 iso-grid-light opacity-50 pointer-events-none z-0" />

      <div className="wrap relative z-[var(--z-base)]">
        <div className="text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-mono-sm text-[var(--color-ink-muted)] mb-6"
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] pulse-dot" />
            [06] · indications
          </motion.div>
          <h2 className="text-display text-4xl md:text-6xl lg:text-7xl text-[var(--color-ink)]">
            <AnimatedText text="Therapy" by="word" />{" "}
            <AnimatedText text="targets across" by="word" delay={0.1} />
            <br />
            <span className="serif-italic">
              <AnimatedText text="every malignancy." by="word" delay={0.2} />
            </span>
          </h2>
          <p className="mt-6 text-[14px] md:text-[15px] text-[var(--color-ink-muted)] max-w-md mx-auto">
            Composable by design, Helix adapts to the unique antigen landscape
            of each cancer family. One platform, every modality, every patient
            cohort.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-1 border-b border-[var(--color-ink-line-strong)] relative z-[var(--z-callout)]">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              data-cursor="link"
              onClick={() => setActive(i)}
              className={`relative group px-5 md:px-7 py-4 text-[14px] cursor-pointer transition-colors ${
                i === active ? "text-[var(--color-ink)]" : "text-[var(--color-ink-muted)]"
              }`}
            >
              <span className="flex items-center gap-2">
                {i === active && (
                  <motion.span
                    layoutId="ind-dot"
                    className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
                    transition={{ type: "spring", stiffness: 400, damping: 36 }}
                  />
                )}
                <span className="font-medium">{tab.label}</span>
              </span>
              {i === active && (
                <motion.span
                  layoutId="ind-underline"
                  className="absolute left-0 right-0 -bottom-px h-px bg-[var(--color-ink)]"
                  transition={{ type: "spring", stiffness: 400, damping: 36 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Scene */}
        <div className="mt-12 md:mt-16 relative z-[var(--z-bleed)]">
          <div className="relative rounded-2xl border border-[var(--color-ink-line-strong)] overflow-hidden bg-[var(--color-cream-2)]">
            <div className="grid grid-cols-12 gap-0">
              <div className="col-span-12 md:col-span-8 relative aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <FactoryFloor palette={t.palette} sub={t.sub} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="col-span-12 md:col-span-4 border-t md:border-t-0 md:border-l border-[var(--color-ink-line-strong)] p-6 md:p-8 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-mono-sm text-[var(--color-ink-muted)] mb-2">
                      0{active + 1} · {t.sub}
                    </div>
                    <div className="text-3xl md:text-4xl font-medium tracking-tight text-[var(--color-ink)] mb-5">
                      {t.label}
                    </div>
                    <div className="text-[12.5px] text-[var(--color-ink-muted)] mb-2 font-mono uppercase tracking-widest">
                      Active targets
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {t.targets.map((tg, i) => (
                        <motion.span
                          key={tg}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-full border border-[var(--color-ink-line-strong)] text-[12px] font-mono"
                        >
                          <span
                            className="block w-1.5 h-1.5 rounded-full"
                            style={{ background: t.palette[i % t.palette.length] }}
                          />
                          {tg}
                        </motion.span>
                      ))}
                    </div>
                    <div className="mt-auto pt-6 border-t border-[var(--color-ink-line-strong)] flex items-end justify-between">
                      <div>
                        <div className="text-mono-sm text-[var(--color-ink-muted)]">
                          sims this month
                        </div>
                        <div className="text-3xl font-medium tabular-nums text-[var(--color-ink)]">
                          {t.sims.toLocaleString()}
                        </div>
                      </div>
                      <a
                        href={`#${t.id}`}
                        data-cursor="link"
                        className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-cream)] text-[13px] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                      >
                        Explore
                        <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor">
                          <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Factory floor: refined isometric scene with structured blueprint annotations === */
function FactoryFloor({ palette, sub }: { palette: string[]; sub: string }) {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <linearGradient id="ff-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DDD9CF" />
          <stop offset="100%" stopColor="#C9C4B7" />
        </linearGradient>
        <pattern id="ff-iso" x="0" y="0" width="60" height="34" patternUnits="userSpaceOnUse" patternTransform="skewY(-30)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(20,21,27,0.05)" strokeWidth="1" />
        </pattern>
        <pattern id="ff-iso2" x="0" y="0" width="60" height="34" patternUnits="userSpaceOnUse" patternTransform="skewY(30)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(20,21,27,0.05)" strokeWidth="1" />
        </pattern>
        <pattern id="ff-hatch" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(60)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(20,21,27,0.18)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="800" height="500" fill="url(#ff-bg)" />
      <rect width="800" height="500" fill="url(#ff-iso)" />
      <rect width="800" height="500" fill="url(#ff-iso2)" />

      {/* HELIX platform with hatched right side */}
      <motion.g
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <path
          d="M 110 360 L 400 244 L 690 360 L 400 476 Z"
          fill="rgba(20,21,27,0.05)"
          stroke="rgba(20,21,27,0.7)"
          strokeWidth="1.2"
        />
        <path
          d="M 110 360 L 110 380 L 400 496 L 400 476 Z"
          fill="rgba(20,21,27,0.08)"
          stroke="rgba(20,21,27,0.7)"
          strokeWidth="1.2"
        />
        <path
          d="M 400 476 L 400 496 L 690 380 L 690 360 Z"
          fill="rgba(20,21,27,0.14)"
          stroke="rgba(20,21,27,0.7)"
          strokeWidth="1.2"
        />
        <path
          d="M 400 476 L 400 496 L 690 380 L 690 360 Z"
          fill="url(#ff-hatch)"
          opacity="0.5"
        />
        {/* HELIX wordmark on top face */}
        <text
          x="400"
          y="370"
          textAnchor="middle"
          fill="rgba(20,21,27,0.65)"
          style={{
            fontSize: 22,
            fontFamily: "var(--font-geist), sans-serif",
            letterSpacing: 6,
            fontWeight: 500,
          }}
          transform="skewX(-30)"
        >
          HELIX
        </text>
        {/* corner ticks on top face */}
        {[
          [110, 360], [400, 244], [690, 360], [400, 476],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.4" fill="rgba(20,21,27,0.7)" />
        ))}
      </motion.g>

      {/* Three target cubes with labelled callouts above */}
      {palette.slice(0, 3).map((c, i) => {
        const tx = 240 + i * 160;
        const ty = 290 - i * 28;
        const labelText = ["DESIGN", "REFINE", "VERIFY"][i];
        const idx = ["A1", "A2", "A3"][i];
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: -36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.5 + i * 0.18,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* label above with leader line */}
            <line
              x1={tx}
              y1={ty - 36}
              x2={tx}
              y2={ty - 28}
              stroke="rgba(20,21,27,0.65)"
              strokeWidth="1"
            />
            <line
              x1={tx}
              y1={ty - 36}
              x2={tx + 18}
              y2={ty - 36}
              stroke="rgba(20,21,27,0.65)"
              strokeWidth="1"
            />
            <g transform={`translate(${tx + 22}, ${ty - 48})`}>
              <rect
                x="0"
                y="0"
                width="86"
                height="22"
                fill="rgba(20,21,27,0.92)"
                rx="2"
              />
              <line x1="20" y1="0" x2="20" y2="22" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
              <text
                x="10"
                y="14"
                textAnchor="middle"
                fill={c}
                style={{
                  fontSize: 9,
                  fontFamily: "monospace",
                  letterSpacing: 0.5,
                  fontWeight: 600,
                }}
              >
                {idx}
              </text>
              <text
                x="52"
                y="14"
                textAnchor="middle"
                fill="white"
                style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 0.8 }}
              >
                {labelText}
              </text>
            </g>

            {/* the cube — solid coloured */}
            <g>
              <path
                d={`M ${tx} ${ty - 28} L ${tx + 36} ${ty - 10} L ${tx} ${ty + 8} L ${tx - 36} ${ty - 10} Z`}
                fill={c}
              />
              <path
                d={`M ${tx - 36} ${ty - 10} L ${tx - 36} ${ty + 22} L ${tx} ${ty + 40} L ${tx} ${ty + 8} Z`}
                fill={c}
                opacity="0.72"
              />
              <path
                d={`M ${tx} ${ty + 8} L ${tx} ${ty + 40} L ${tx + 36} ${ty + 22} L ${tx + 36} ${ty - 10} Z`}
                fill={c}
                opacity="0.5"
              />
              {/* edge highlights */}
              <path
                d={`M ${tx} ${ty - 28} L ${tx + 36} ${ty - 10} M ${tx + 36} ${ty - 10} L ${tx} ${ty + 8} M ${tx} ${ty + 8} L ${tx - 36} ${ty - 10} M ${tx - 36} ${ty - 10} L ${tx} ${ty - 28}`}
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="0.7"
                fill="none"
              />
              <path
                d={`M ${tx + 36} ${ty + 22} L ${tx} ${ty + 40} L ${tx - 36} ${ty + 22}`}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="0.7"
                fill="none"
              />
              {/* center mark */}
              <circle cx={tx} cy={ty - 10} r="1.2" fill="rgba(255,255,255,0.85)" />
            </g>
          </motion.g>
        );
      })}

      {/* Conveyor in/out with directional arrows */}
      <motion.g
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.path
          d="M 25 388 L 110 388 L 110 360"
          fill="none"
          stroke="rgba(20,21,27,0.55)"
          strokeWidth="1.3"
          strokeDasharray="3 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        />
        <motion.path
          d="M 690 360 L 690 388 L 775 388"
          fill="none"
          stroke="rgba(20,21,27,0.55)"
          strokeWidth="1.3"
          strokeDasharray="3 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.9 }}
        />
        {/* arrowheads */}
        <polygon points="105,388 110,384 110,392" fill="rgba(20,21,27,0.65)" />
        <polygon points="775,388 770,384 770,392" fill="rgba(20,21,27,0.65)" />
      </motion.g>

      {/* In / Out labels in blueprint style */}
      <g style={{ fontFamily: "monospace", letterSpacing: 0.5, fill: "rgba(20,21,27,0.85)" }}>
        <g>
          <rect x="14" y="370" width="78" height="14" fill="rgba(20,21,27,0.92)" />
          <text x="22" y="380" style={{ fontSize: 8, fill: "var(--color-cream)", letterSpacing: 1.4 }}>
            [IN] ANTIGEN
          </text>
        </g>
        <g>
          <rect x="710" y="370" width="76" height="14" fill="rgba(20,21,27,0.92)" />
          <text x="718" y="380" style={{ fontSize: 8, fill: "var(--color-cream)", letterSpacing: 1.4 }}>
            [OUT] CAND
          </text>
        </g>
      </g>

      {/* Top-right indication card */}
      <motion.g
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <line x1="640" y1="100" x2="600" y2="80" stroke="rgba(20,21,27,0.4)" strokeWidth="0.8" />
        <line x1="640" y1="100" x2="640" y2="244" stroke="rgba(20,21,27,0.3)" strokeWidth="0.6" strokeDasharray="2 3" />
        <rect x="585" y="50" width="190" height="56" fill="rgba(255,255,255,0.85)" stroke="rgba(20,21,27,0.55)" strokeWidth="0.7" />
        <line x1="585" y1="68" x2="775" y2="68" stroke="rgba(20,21,27,0.25)" strokeWidth="0.5" />
        <text x="595" y="63" style={{ fontSize: 9, fill: "rgba(20,21,27,0.6)", fontFamily: "monospace", letterSpacing: 1.4 }}>
          INDICATION · MAP
        </text>
        <text x="595" y="84" style={{ fontSize: 12, fill: "rgba(20,21,27,0.95)", fontFamily: "monospace", letterSpacing: 0.5 }}>
          {sub}
        </text>
        <circle cx="765" cy="60" r="2.2" fill="rgba(54,214,162,0.95)" />
        <text x="595" y="98" style={{ fontSize: 8, fill: "rgba(20,21,27,0.6)", fontFamily: "monospace", letterSpacing: 1 }}>
          24 active runs · live
        </text>
      </motion.g>

      {/* Bottom-left scale ruler */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        {Array.from({ length: 11 }).map((_, i) => (
          <g key={i}>
            <line
              x1={20 + i * 14}
              y1="450"
              x2={20 + i * 14}
              y2={i % 5 === 0 ? 458 : 454}
              stroke="rgba(20,21,27,0.55)"
              strokeWidth="1"
            />
            {i % 5 === 0 && (
              <text
                x={20 + i * 14}
                y="468"
                textAnchor="middle"
                style={{ fontSize: 7, fill: "rgba(20,21,27,0.55)", fontFamily: "monospace" }}
              >
                {String(i * 10).padStart(3, "0")}
              </text>
            )}
          </g>
        ))}
        <line x1="20" y1="450" x2="160" y2="450" stroke="rgba(20,21,27,0.55)" strokeWidth="1" />
      </motion.g>
    </svg>
  );
}
