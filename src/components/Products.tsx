"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { IsoCube } from "@/components/ui/IsoCube";
import { BlueprintCallout } from "@/components/ui/BlueprintCallout";

const PRODUCTS = [
  {
    id: "designer",
    short: "Designer",
    long: "Generative protein binders",
    title: "Manage candidate generation",
    body:
      "Designer is the adaptive design core that combines diffusion-based scaffolding with a no-code agent interface — let ESM-2, RFdiffusion, and ProteinMPNN compose against any tumor antigen.",
    cta: "Explore Designer",
  },
  {
    id: "critic",
    short: "Critic",
    long: "Adversarial validation",
    title: "Stress-test every candidate",
    body:
      "Critic is the foundational scoring layer — it pits a panel of red-team agents against each design, surfacing off-target hits, instability, and synthesis blockers before a single dollar is spent.",
    cta: "Explore Critic",
  },
  {
    id: "simulator",
    short: "Simulator",
    long: "MD + docking",
    title: "Run biology at scale",
    body:
      "Simulator runs 100ns molecular dynamics with full free-energy landscape recovery. Pose ranking, RMSD tracking, and pocket fidelity — all returned as a typed artifact ready for publication.",
    cta: "Explore Simulator",
  },
  {
    id: "scribe",
    short: "Scribe",
    long: "On-chain provenance",
    title: "Publish, with proof",
    body:
      "Scribe is your AI co-author — it writes, hashes, and pushes every artifact to Arweave the moment it&apos;s minted. Reputation tokens flow back to the agents and humans who shipped the work.",
    cta: "Explore Scribe",
  },
];

export function Products() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      PRODUCTS.length - 1,
      Math.max(0, Math.floor(v * PRODUCTS.length * 1.05))
    );
    if (idx !== active) setActive(idx);
  });

  return (
    <section
      ref={ref}
      id="products"
      className="relative theme-dark"
      style={{ minHeight: `${PRODUCTS.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 iso-grid radial-fade pointer-events-none z-0" />

        <div className="wrap relative h-full grid grid-cols-12 gap-8 items-center z-[var(--z-base)]">
          {/* Left: vertical tabs */}
          <div className="col-span-12 lg:col-span-3 pt-24">
            <div className="text-mono-sm text-[var(--color-muted)] mb-6">
              [04] · the products
            </div>
            <div className="text-3xl md:text-5xl tracking-tight font-medium mb-8 leading-[1.05] hidden lg:block">
              Aggregate, design,
              <br />
              and analyze in
              <br />
              <span className="serif-italic text-[var(--color-accent-2)]">
                one platform
              </span>
            </div>
            <div className="relative pl-2 border-l border-[var(--color-line)]">
              {PRODUCTS.map((p, i) => (
                <button
                  key={p.id}
                  data-cursor="link"
                  onClick={() => {
                    if (typeof window !== "undefined" && ref.current) {
                      const r = ref.current.getBoundingClientRect();
                      const targetY =
                        window.scrollY +
                        r.top +
                        (r.height - window.innerHeight) * (i / PRODUCTS.length);
                      window.scrollTo({ top: targetY, behavior: "smooth" });
                    }
                  }}
                  className={`relative w-full text-left flex items-center gap-3 py-4 pr-3 cursor-pointer transition-colors`}
                >
                  {i === active && (
                    <motion.span
                      layoutId="prod-active-bar"
                      className="absolute -left-2 top-2 bottom-2 w-px bg-[var(--color-accent-2)]"
                      transition={{ type: "spring", stiffness: 400, damping: 36 }}
                    />
                  )}
                  <span
                    className={`font-mono text-[10.5px] tracking-widest transition-colors ${
                      i === active
                        ? "text-[var(--color-accent-2)]"
                        : "text-[var(--color-muted)]"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`text-lg md:text-xl font-medium tracking-tight transition-colors ${
                      i === active
                        ? "text-[var(--color-fg)]"
                        : "text-[var(--color-fg)]/40"
                    }`}
                  >
                    {p.short}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: visual + content */}
          <div className="col-span-12 lg:col-span-9 relative h-full flex items-center pt-24 pb-16">
            <div className="grid grid-cols-12 gap-6 items-center w-full">
              <div className="col-span-12 md:col-span-5 lg:col-span-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="text-mono-sm text-[var(--color-muted)] mb-3">
                      0{active + 1} · {PRODUCTS[active].long}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-[var(--color-fg)]">
                      {PRODUCTS[active].title}
                    </h3>
                    <p
                      className="text-[14px] md:text-[15px] text-[var(--color-fg)]/70 leading-relaxed mb-6 max-w-md"
                      dangerouslySetInnerHTML={{ __html: PRODUCTS[active].body }}
                    />
                    <a
                      href={`#${PRODUCTS[active].id}`}
                      data-cursor="link"
                      className="inline-flex items-center gap-2 px-4 h-10 rounded-full border border-[var(--color-line-strong)] text-[13px] hover:border-[var(--color-accent-2)] transition-colors"
                    >
                      {PRODUCTS[active].cta}
                      <svg
                        viewBox="0 0 16 16"
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="col-span-12 md:col-span-7 lg:col-span-8 relative h-[420px] md:h-[520px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {active === 0 && <DesignerScene />}
                    {active === 1 && <CriticScene />}
                    {active === 2 && <SimulatorScene />}
                    {active === 3 && <ScribeScene />}
                  </motion.div>
                </AnimatePresence>

                {/* progress dots */}
                <div className="absolute -bottom-4 left-0 right-0 flex items-center justify-center gap-2">
                  {PRODUCTS.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1 rounded-full transition-all ${
                        i === active
                          ? "w-8 bg-[var(--color-accent-2)]"
                          : "w-2 bg-[var(--color-line-strong)]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section progress bar */}
        <div className="absolute top-0 left-0 right-0 h-px bg-[var(--color-line)] z-[var(--z-section-sticky)]">
          <motion.div
            className="h-full bg-[var(--color-accent-2)] origin-left"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </div>
    </section>
  );
}

/* === Designer: 6 mini iso-cube nodes orbiting a central scaffold === */
function DesignerScene() {
  const orbitItems = [
    { label: "ANTIGEN", index: "A1", angle: -90, glyph: "ring" as const, state: "info" as const },
    { label: "SCAFFOLD", index: "S1", angle: -30, glyph: "helix" as const, state: "ok" as const },
    { label: "MUTATIONS", index: "M1", angle: 30, glyph: "wave" as const, state: "warn" as const },
    { label: "CONSTRAINTS", index: "C1", angle: 90, glyph: "cross" as const, state: "neutral" as const },
    { label: "LIBRARY", index: "L1", angle: 150, glyph: "node" as const, state: "info" as const },
    { label: "SYNTH PATH", index: "P1", angle: 210, glyph: "atom" as const, state: "ok" as const },
  ];
  return (
    <div className="relative w-full h-full text-[var(--color-fg)]">
      {/* Concentric dotted orbital ellipses */}
      <svg
        viewBox="-100 -50 200 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <motion.ellipse
          cx="0"
          cy="0"
          rx="80"
          ry="34"
          fill="none"
          stroke="var(--color-line-strong)"
          strokeWidth="0.4"
          strokeDasharray="0.5 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        />
        <motion.ellipse
          cx="0"
          cy="0"
          rx="55"
          ry="22"
          fill="none"
          stroke="var(--color-accent-2)"
          strokeOpacity="0.4"
          strokeWidth="0.5"
          strokeDasharray="0.6 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
        />
        {/* Radial guide lines from center to each node */}
        {orbitItems.map((it, i) => {
          const a = (it.angle * Math.PI) / 180;
          const x = Math.cos(a) * 76;
          const y = Math.sin(a) * 32;
          return (
            <motion.line
              key={i}
              x1="0"
              y1="0"
              x2={x}
              y2={y}
              stroke="var(--color-line)"
              strokeWidth="0.3"
              strokeDasharray="0.5 1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.06 }}
            />
          );
        })}
      </svg>

      {/* Center scaffold cube */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[var(--z-scene)]"
      >
        <IsoCube
          size={82}
          variant="solid"
          color="var(--color-accent)"
          innerGlyph="atom"
          innerCube
          topGrid
          drawDelay={0.1}
          drawDuration={1}
        />
      </motion.div>

      {/* Orbiting iso-cube nodes with blueprint callouts */}
      {orbitItems.map((it, i) => {
        const a = (it.angle * Math.PI) / 180;
        const xPct = 50 + Math.cos(a) * 38;
        const yPct = 50 + Math.sin(a) * 36;
        const rightSide = it.angle > -90 && it.angle < 90;
        return (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-[var(--z-scene)]"
            style={{ left: `${xPct}%`, top: `${yPct}%` }}
          >
            <div className="relative">
              <IsoCube
                size={20}
                variant="wireframe"
                stroke="currentColor"
                innerGlyph={it.glyph}
                drawDelay={0.8 + i * 0.06}
                drawDuration={0.7}
              />
              <div
                className={`absolute top-1/2 -translate-y-1/2 ${
                  rightSide ? "left-full ml-1.5" : "right-full mr-1.5"
                }`}
              >
                <BlueprintCallout
                  index={it.index}
                  label={it.label}
                  state={it.state}
                  size="sm"
                  align={rightSide ? "left" : "right"}
                  leader="none"
                  delay={1 + i * 0.05}
                />
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Floor grid fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 grid-bg pointer-events-none top-fade opacity-40 z-0" />

      {/* Bottom counter line */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-mono-sm text-[var(--color-muted)] z-[var(--z-callout)]">
        <span className="flex items-center gap-1.5">
          <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-2)] pulse-dot" />
          DSGN · running
        </span>
        <span className="tabular-nums">10,240 scaffolds / hr</span>
      </div>
    </div>
  );
}

/* === Critic: cross-section schematic with metric annotations === */
function CriticScene() {
  return (
    <div className="relative w-full h-full text-[var(--color-fg)]">
      {/* Concentric scanning rings (z-0 background) */}
      <svg
        className="absolute inset-0 w-full h-full z-0"
        viewBox="-100 -50 200 100"
        preserveAspectRatio="none"
      >
        {[26, 38, 52, 68].map((rx, i) => (
          <motion.ellipse
            key={i}
            cx="0"
            cy="0"
            rx={rx}
            ry={rx * 0.42}
            fill="none"
            stroke={i === 0 ? "var(--color-warn)" : "var(--color-line-strong)"}
            strokeOpacity={0.4 - i * 0.07}
            strokeWidth={i === 0 ? 0.7 : 0.4}
            strokeDasharray={i === 0 ? "0" : "0.5 2"}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
          />
        ))}
        {/* Cross-section axis */}
        <motion.line
          x1="-72"
          y1="0"
          x2="72"
          y2="0"
          stroke="var(--color-warn)"
          strokeOpacity="0.6"
          strokeWidth="0.5"
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        {/* Cross-section depth markers */}
        {[-60, -30, 0, 30, 60].map((x, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 + i * 0.05 }}
          >
            <line x1={x} y1="-2.5" x2={x} y2="2.5" stroke="var(--color-warn)" strokeOpacity="0.5" strokeWidth="0.5" />
            <text
              x={x}
              y="6"
              textAnchor="middle"
              style={{ fontSize: 3, fontFamily: "monospace", fill: "var(--color-muted)", letterSpacing: 0.4 }}
            >
              {String(i * 25).padStart(3, "0")}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Sweeping scan beam (decorative, behind cube) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center pointer-events-none z-0"
        style={{ width: "60%", height: "60%" }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-y-1/2 origin-left h-[1.5px] w-1/2"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,107,87,0.7), rgba(255,107,87,0))",
          }}
        />
      </motion.div>

      {/* Center cube — under critique */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[var(--z-scene)]"
      >
        <IsoCube
          size={104}
          variant="solid"
          color="var(--color-warn)"
          innerGlyph="cross"
          innerCube
          topGrid
          scanLine
          drawDelay={0.1}
          drawDuration={1}
          mouseTilt
        />
      </motion.div>

      {/* Critique callouts — anchored & purposeful */}
      <div className="absolute top-[12%] left-[2%] z-[var(--z-callout)]">
        <BlueprintCallout
          index="C1"
          label="OFF-TARGET"
          value="0.31"
          state="warn"
          align="left"
          leaderLength={26}
          delay={0.6}
          pulse
        />
      </div>
      <div className="absolute top-[12%] right-[2%] z-[var(--z-callout)]">
        <BlueprintCallout
          index="C2"
          label="ΔΔG"
          value="-1.4"
          unit="kcal"
          state="ok"
          align="right"
          leaderLength={26}
          delay={0.7}
        />
      </div>
      <div className="absolute bottom-[18%] right-[2%] z-[var(--z-callout)]">
        <BlueprintCallout
          index="C3"
          label="SYNTH"
          value="OK"
          state="ok"
          align="right"
          leaderLength={26}
          delay={0.8}
        />
      </div>
      <div className="absolute bottom-[18%] left-[2%] z-[var(--z-callout)]">
        <BlueprintCallout
          index="C4"
          label="POCKET"
          value="weak"
          state="warn"
          align="left"
          leaderLength={26}
          delay={0.9}
        />
      </div>

      {/* Bottom telemetry */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-mono-sm text-[var(--color-muted)] z-[var(--z-callout)]">
        <span className="flex items-center gap-1.5">
          <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-warn)] pulse-dot" />
          CRTC · adversarial sweep
        </span>
        <span className="tabular-nums">9,821 decoys</span>
      </div>
    </div>
  );
}

/* === Simulator: cube with phase-space trace + readouts === */
function SimulatorScene() {
  return (
    <div className="relative w-full h-full text-[var(--color-fg)]">
      {/* Drifting trace particles */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {Array.from({ length: 36 }).map((_, i) => {
          const cx = 50 + ((i * 13) % 70) - 35;
          const cy = 20 + ((i * 23) % 60);
          return (
            <motion.circle
              key={i}
              cx={cx}
              cy={cy}
              r="0.4"
              fill={i % 7 === 0 ? "var(--color-accent)" : "#6A8AFF"}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0] }}
              transition={{
                duration: 2 + (i % 5) * 0.4,
                delay: (i % 9) * 0.2,
                repeat: Infinity,
              }}
            />
          );
        })}
      </svg>

      {/* Cube */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[var(--z-scene)]"
      >
        <IsoCube
          size={114}
          variant="solid"
          color="var(--color-accent)"
          innerGlyph="wave"
          innerCube
          topGrid
          drawDelay={0.1}
          drawDuration={1.1}
          mouseTilt
        />
      </motion.div>

      {/* Top-left: time readout */}
      <div className="absolute top-[8%] left-[2%] z-[var(--z-callout)]">
        <BlueprintCallout
          index="τ"
          label="TIME"
          value="100 ns"
          state="info"
          align="left"
          leaderLength={24}
          delay={0.5}
          pulse
        />
      </div>
      {/* Top-right: ΔG */}
      <div className="absolute top-[8%] right-[2%] z-[var(--z-callout)]">
        <BlueprintCallout
          index="ΔG"
          label="ENERGY"
          value="-9.21"
          unit="kcal"
          state="ok"
          align="right"
          leaderLength={24}
          delay={0.6}
        />
      </div>

      {/* Energy curve overlay */}
      <div className="absolute left-6 right-6 bottom-12 rounded-lg border border-[var(--color-line)] bg-[rgba(14,15,18,0.7)] backdrop-blur-md p-3 z-[var(--z-callout)]">
        <div className="flex items-center justify-between mb-2 text-mono-sm">
          <span className="text-[var(--color-muted)]">Δ ENERGY · phase 4/4</span>
          <span className="flex items-center gap-1.5 text-[var(--color-good)]">
            <span className="block w-1.5 h-1.5 rounded-full bg-current pulse-dot" />
            stable
          </span>
        </div>
        <svg viewBox="0 0 200 30" className="w-full h-8" preserveAspectRatio="none">
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              x2="200"
              y1={(i + 1) * 5}
              y2={(i + 1) * 5}
              stroke="var(--color-line)"
              strokeWidth="0.4"
            />
          ))}
          <motion.path
            d={Array.from({ length: 64 })
              .map((_, i) => {
                const x = (i / 63) * 200;
                const y =
                  18 +
                  Math.sin(i * 0.3) * 5 +
                  Math.cos(i * 0.6) * 4 +
                  (i / 63) * -8;
                return `${i === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ")}
            stroke="#6A8AFF"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
          />
          <motion.circle
            cx="200"
            cy="6"
            r="1.6"
            fill="var(--color-good)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          />
        </svg>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-mono-sm text-[var(--color-muted)] z-[var(--z-callout)]">
        <span>SIM · GROMACS / 4 GPUs</span>
        <span className="tabular-nums">RMSD 1.4 Å</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 grid-bg pointer-events-none top-fade opacity-30 z-0" />
    </div>
  );
}

/* === Scribe: cube on iso platform + on-chain publication ledger === */
function ScribeScene() {
  return (
    <div className="relative w-full h-full text-[var(--color-fg)]">
      {/* iso platform under cube */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.6 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute left-1/2 top-[60%] -translate-x-1/2 w-[70%] z-0"
      >
        <svg viewBox="-100 -22 200 44" className="w-full h-14">
          <path
            d="M -90 0 L 0 -18 L 90 0 L 0 18 Z"
            fill="rgba(106,138,255,0.05)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.5"
          />
          <path
            d="M -90 0 L -90 5 L 0 23 L 0 18 Z"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.5"
          />
          <path
            d="M 0 18 L 0 23 L 90 5 L 90 0 Z"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="0.5"
          />
          {/* Hatched pattern on right face */}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={i * 13}
              y1={18 + i * 0.6}
              x2={Math.min(90, i * 13 + 6)}
              y2={18 + i * 0.6 + 1.4}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.4"
            />
          ))}
        </svg>
      </motion.div>

      {/* upward beams */}
      {[16, 38, 62, 84].map((x, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[34%] w-px z-0"
          style={{
            left: `${x}%`,
            height: "30%",
            background:
              "linear-gradient(to top, rgba(106,138,255,0.6), transparent)",
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: 2.2,
            delay: 0.3 + i * 0.25,
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        />
      ))}

      {/* Cube */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[var(--z-scene)]"
      >
        <IsoCube
          size={100}
          variant="solid"
          color="var(--color-accent-2)"
          innerGlyph="ring"
          innerCube
          topGrid
          drawDelay={0.1}
          drawDuration={1.0}
          mouseTilt
        />
      </motion.div>

      {/* On-chain ledger panel (right) */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-[10%] right-[3%] w-[44%] rounded-lg border border-[var(--color-line)] bg-[rgba(14,15,18,0.7)] backdrop-blur-md p-3 z-[var(--z-callout)]"
      >
        <div className="flex items-center justify-between mb-2.5 text-mono-sm">
          <span className="text-[var(--color-muted)]">PROVENANCE · arweave</span>
          <span className="flex items-center gap-1.5 text-[var(--color-good)]">
            <span className="block w-1.5 h-1.5 rounded-full bg-current pulse-dot" />
            mint
          </span>
        </div>
        <div className="space-y-1.5">
          {[
            { h: "0xa1f2…d419", l: "candidate.b3", t: "now" },
            { h: "0x88c1…7a02", l: "sim.run.100ns", t: "12m" },
            { h: "0x4d92…6e1f", l: "critic.report", t: "26m" },
          ].map((r, i) => (
            <motion.div
              key={r.h}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-2 font-mono text-[10.5px]"
            >
              <span className="text-[var(--color-accent-2)]">{r.h}</span>
              <span className="text-[var(--color-fg)] truncate">{r.l}</span>
              <span className="text-[var(--color-muted)]">{r.t}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom-left telemetry */}
      <div className="absolute top-[10%] left-[3%] z-[var(--z-callout)]">
        <BlueprintCallout
          index="DOI"
          label="HX-9221.b3"
          state="info"
          align="left"
          leaderLength={22}
          delay={0.6}
        />
      </div>
      <div className="absolute bottom-[4%] left-[3%] z-[var(--z-callout)]">
        <BlueprintCallout
          index="REP"
          label="MINTED"
          value="+418"
          state="ok"
          align="left"
          leaderLength={22}
          delay={0.9}
          pulse
        />
      </div>
      <div className="absolute bottom-3 right-3 text-mono-sm text-[var(--color-muted)] z-[var(--z-callout)]">
        SCRB · auto-publish
      </div>
    </div>
  );
}
