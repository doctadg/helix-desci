"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { IsoCube } from "@/components/ui/IsoCube";
import { IsoGlobe } from "@/components/ui/IsoGlobe";
import { BlueprintCallout } from "@/components/ui/BlueprintCallout";
import { Marquee } from "@/components/ui/Marquee";
import { MockUI, type MockVariant } from "@/components/ui/MockUI";
import { openAccessModal } from "@/lib/access";

const TABS: { id: string; label: string; sub: string; mock: MockVariant }[] = [
  { id: "01", label: "Design", sub: "novel binders", mock: "design" },
  { id: "02", label: "Fold", sub: "structure prediction", mock: "fold" },
  { id: "03", label: "Dock", sub: "binding pose search", mock: "dock" },
  { id: "04", label: "Score", sub: "rank & filter", mock: "score" },
  { id: "05", label: "Iterate", sub: "agent loops", mock: "iterate" },
  { id: "06", label: "Publish", sub: "on-chain provenance", mock: "publish" },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const sceneRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 22 });
  const smy = useSpring(my, { stiffness: 60, damping: 22 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx);
      my.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);
  const gridX = useTransform(smx, (v) => v * 18);
  const gridY = useTransform(smy, (v) => v * 18);
  const sceneTiltX = useTransform(smy, (v) => v * 4);
  const sceneTiltY = useTransform(smx, (v) => v * -4);

  // Tab state
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % TABS.length), 4500);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      ref={ref}
      className="relative theme-dark overflow-hidden pt-24 md:pt-28"
    >
      {/* Background grid layers (sit behind all base content) */}
      <motion.div
        className="absolute inset-0 iso-grid radial-fade pointer-events-none z-0"
        style={{ x: gridX, y: gridY }}
      />
      <motion.div
        className="absolute inset-0 grid-bg-fine pointer-events-none z-0"
        style={{
          x: useTransform(smx, (v) => v * -10),
          y: useTransform(smy, (v) => v * -10),
          opacity: 0.7,
        }}
      />
      {/* Soft accent glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] opacity-50 z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(41,86,248,0.18) 0%, rgba(41,86,248,0) 60%)",
        }}
      />

      {/* Top status row */}
      <div className="relative wrap z-[var(--z-base)]">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-between text-mono-sm text-[var(--color-muted)] py-2"
        >
          <span className="flex items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
            Live · 14,328 simulations underway
          </span>
          <span className="hidden md:inline">
            mainnet · block #18,442,930 · gas 0.6 gwei
          </span>
          <span className="hidden md:inline">v1.04 · 2026.05</span>
        </motion.div>
      </div>

      {/* Hero body */}
      <div className="relative wrap pt-10 md:pt-14 grid grid-cols-12 gap-6 lg:gap-10 items-center min-h-[640px] z-[var(--z-base)]">
        {/* Left: text */}
        <motion.div
          className="relative col-span-12 lg:col-span-7"
          style={{ y: titleY }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <span className="text-eyebrow text-[var(--color-accent-2)]">
              [00]
            </span>
            <span className="text-eyebrow">
              Decentralized oncology research
            </span>
            <span className="block h-px w-16 bg-[var(--color-line-strong)]" />
            <span className="text-eyebrow">EST. 2024</span>
          </motion.div>

          <h1 className="text-display text-[12.5vw] md:text-[8.4vw] lg:text-[6.8rem] xl:text-[7.4rem] leading-[0.92]">
            <span className="block">
              <AnimatedText text="HELIX is the" by="word" delay={0.2} />
            </span>
            <span className="block">
              <AnimatedText text="research cloud" by="word" delay={0.4} />
            </span>
            <span className="block">
              <span className="serif-italic text-[var(--color-accent-2)]">
                <AnimatedText text="cancer" by="word" delay={0.65} />
              </span>{" "}
              <AnimatedText text="can&apos;t outrun." by="word" delay={0.85} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-10 max-w-xl text-[15px] text-[var(--color-fg)]/75 leading-relaxed"
          >
            An autonomous pipeline of agents that{" "}
            <span className="text-[var(--color-fg)]">design</span>,{" "}
            <span className="text-[var(--color-fg)]">refine</span> and{" "}
            <span className="text-[var(--color-fg)]">simulate</span> protein
            candidates against tumor antigens — funded transparently on-chain
            and validated by a global mesh of researchers.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.45, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-3 items-center"
          >
            <MagneticButton as="button" onClick={openAccessModal} strength={0.4}>
              <span className="group relative inline-flex items-center gap-3 h-12 px-6 rounded-full bg-[var(--color-fg)] text-[var(--color-ink)] text-[14px] font-medium overflow-hidden">
                <span className="relative z-10">Run a sim</span>
                <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-[var(--color-ink)] group-hover:bg-white transition-colors" />
                <span className="absolute inset-0 bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Run a sim
                </span>
              </span>
            </MagneticButton>
            <MagneticButton as="a" href="#pipeline" strength={0.3}>
              <span className="group inline-flex items-center gap-3 h-12 px-6 rounded-full border border-[var(--color-line-strong)] text-[14px] hover:border-[var(--color-accent-2)] transition-colors">
                <PlayIcon className="w-3.5 h-3.5 text-[var(--color-accent-2)]" />
                See it run
              </span>
            </MagneticButton>
            <span className="ml-2 text-mono-sm text-[var(--color-muted)] flex items-center gap-2">
              <span className="block w-6 h-px bg-[var(--color-line-strong)]" />
              backed by 1,400+ researchers
            </span>
          </motion.div>
        </motion.div>

        {/* Right: scene */}
        <motion.div
          ref={sceneRef}
          className="relative col-span-12 lg:col-span-5 h-[520px] md:h-[600px] flex items-center justify-center z-[var(--z-scene)]"
          style={{
            y: sceneY,
            rotateX: sceneTiltX,
            rotateY: sceneTiltY,
            rotate: sceneRotate,
            perspective: 1200,
          }}
        >
          <HeroScene />
        </motion.div>
      </div>

      {/* Tabs row */}
      <div
        className="relative wrap mt-16 md:mt-24 z-[var(--z-callout)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 border-t border-[var(--color-line)]"
        >
          {TABS.map((t, i) => (
            <button
              key={t.id}
              data-cursor="link"
              onClick={() => setActive(i)}
              className="group relative text-left px-5 md:px-6 py-5 border-r last:border-r-0 border-b lg:border-b-0 border-[var(--color-line)] cursor-pointer transition-colors hover:bg-[rgba(242,241,237,0.02)]"
            >
              <div className="flex items-center gap-2 text-mono-sm text-[var(--color-muted)] mb-2">
                <span>[{t.id}]</span>
                <span className="block w-3 h-px bg-current" />
                <span>{t.sub}</span>
              </div>
              <div
                className={`text-lg md:text-xl font-medium tracking-tight transition-colors ${
                  i === active ? "text-[var(--color-fg)]" : "text-[var(--color-fg)]/60"
                }`}
              >
                {t.label}
              </div>
              {i === active && (
                <motion.span
                  layoutId="hero-tab-underline"
                  className="absolute left-0 right-0 -top-px h-px bg-[var(--color-accent)]"
                  transition={{ type: "spring", stiffness: 400, damping: 36 }}
                />
              )}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: i === active && !paused ? 1 : 0 }}
                transition={{
                  duration: i === active && !paused ? 4.5 : 0,
                  ease: "linear",
                }}
                className="absolute left-0 right-0 bottom-0 h-px bg-[var(--color-accent-2)] origin-left"
              />
            </button>
          ))}
        </motion.div>
      </div>

      {/* UI preview that bleeds into next section */}
      <div className="relative wrap mt-8 md:mt-10 z-[var(--z-bleed)]">
        <div className="relative -mb-32 md:-mb-44">
          <div className="absolute -inset-4 rounded-[28px] border border-[var(--color-line)] pointer-events-none z-[var(--z-base)]" />
          <MockUI
            variant={TABS[active].mock}
            className="aspect-[16/9] md:aspect-[16/8]"
          />
          <div className="absolute -top-4 left-6 text-mono-sm text-[var(--color-muted)] bg-[var(--color-bg)] px-2 z-[var(--z-callout)]">
            console.helix.bio
          </div>
          <div className="absolute -top-4 right-6 text-mono-sm text-[var(--color-muted)] bg-[var(--color-bg)] px-2 flex items-center gap-2 z-[var(--z-callout)]">
            <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
            uptime 99.94%
          </div>
        </div>
      </div>

      {/* Tech stack marquee */}
      <div className="relative wrap mt-44 md:mt-56 pb-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-y border-[var(--color-line)] py-5 flex items-center gap-12 text-mono-sm text-[var(--color-muted)]"
        >
          <span className="flex items-center gap-2 shrink-0">
            <span className="text-[var(--color-accent-2)]">▷</span>
            powered by
          </span>
          <Marquee speed="slow" className="flex-1">
            {[
              "AlphaFold-3",
              "ESM-2",
              "RFdiffusion",
              "OpenFold",
              "Boltz-1",
              "GROMACS",
              "Rosetta",
              "Solana RPC",
              "Filecoin",
              "Arweave",
              "VitaDAO",
              "BIO Protocol",
            ].map((logo) => (
              <span
                key={logo}
                className="text-[15px] font-medium text-[var(--color-fg)]/80 hover:text-[var(--color-accent-2)] transition-colors"
              >
                {logo}
              </span>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}

/* === The composed isometric scene === */
function HeroScene() {
  return (
    <div className="relative w-full h-full max-w-[460px] mx-auto">
      {/* Vertical scale on the left (architectural ruler) */}
      <VerticalRuler />
      {/* Horizontal baseline on the bottom */}
      <HorizontalBaseline />

      {/* Outer slow-spinning dotted ellipse + inner orbit (z-0 background) */}
      <motion.svg
        viewBox="-110 -60 220 120"
        className="absolute inset-0 m-auto w-[120%] h-[120%] -top-2 left-[-10%] z-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 1.0 }}
      >
        <motion.ellipse
          cx="0"
          cy="0"
          rx="100"
          ry="50"
          fill="none"
          stroke="var(--color-line-strong)"
          strokeWidth="0.7"
          strokeDasharray="1.5 3"
          initial={{ pathLength: 0, rotate: 0 }}
          animate={{ pathLength: 1, rotate: 360 }}
          transition={{
            pathLength: { duration: 1.6, delay: 0.6 },
            rotate: { duration: 80, ease: "linear", repeat: Infinity },
          }}
        />
        <motion.ellipse
          cx="0"
          cy="0"
          rx="60"
          ry="30"
          fill="none"
          stroke="var(--color-accent-2)"
          strokeOpacity="0.35"
          strokeWidth="0.6"
          strokeDasharray="0.6 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
        />
      </motion.svg>

      {/* Wireframe globe (top) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute top-[2%] left-1/2 -translate-x-1/2 z-[var(--z-scene)] text-[var(--color-fg)]"
      >
        <IsoGlobe size={108} />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mx-auto w-px h-6 bg-gradient-to-b from-[var(--color-line-strong)] to-transparent origin-top"
        />
      </motion.div>

      {/* Globe annotation — anchored to globe's right side */}
      <div className="absolute top-[8%] right-[4%] text-[var(--color-fg)]/85 z-[var(--z-callout)] flex flex-col items-start gap-1">
        <BlueprintCallout
          index="A1"
          label="ANTIGEN"
          value="P01116"
          state="info"
          align="left"
          leader="horizontal"
          leaderLength={28}
          delay={1.5}
          pulse
        />
        <div className="ml-9">
          <BlueprintCallout
            label="MUT"
            value="G12D"
            state="warn"
            align="left"
            leader="none"
            delay={1.7}
            bare
          />
        </div>
      </div>

      {/* Cube stack — anchored from the top with breathing room under the globe */}
      <div className="absolute left-1/2 top-[28%] -translate-x-1/2 z-[var(--z-scene)]">
        <CubeStack />
      </div>

      {/* Compute node — bottom-right */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: 12 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1.4, duration: 0.7 }}
        className="absolute bottom-[10%] right-[2%] text-[var(--color-fg)]/85 z-[var(--z-scene)]"
      >
        <div className="relative">
          <div className="float-y">
            <IsoCube
              size={28}
              variant="wireframe"
              stroke="currentColor"
              drawDelay={1.6}
              drawDuration={1.2}
              innerGlyph="cross"
            />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -left-2 -translate-x-full">
            <BlueprintCallout
              index="N7"
              label="NODE"
              value="7A · 99.94"
              unit="%"
              state="ok"
              align="right"
              leaderLength={20}
              delay={1.9}
              pulse
            />
          </div>
        </div>
      </motion.div>

      {/* Tiny ghost cube top-left + callout */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="absolute top-[14%] left-[2%] text-[var(--color-fg)]/85 z-[var(--z-scene)]"
      >
        <div className="float-y" style={{ animationDelay: "1.5s" }}>
          <IsoCube size={22} variant="ghost" stroke="currentColor" drawDelay={1.8} drawDuration={1} />
        </div>
      </motion.div>

      {/* Bottom-left callout: runtime — anchored near the floor ring */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.5 }}
        className="absolute bottom-[8%] left-[6%] text-[var(--color-fg)]/85 z-[var(--z-callout)]"
      >
        <BlueprintCallout
          index="τ"
          label="RUNTIME"
          value="38:14"
          state="info"
          align="left"
          leaderLength={26}
          delay={2.0}
        />
      </motion.div>

      {/* Inline scale on right with tick marks (architectural detail) */}
      <RightTickStrip />
    </div>
  );
}

function VerticalRuler() {
  const ticks = Array.from({ length: 9 });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ delay: 1.6, duration: 0.5 }}
      className="absolute left-0 top-[8%] bottom-[8%] w-3 flex flex-col justify-between pointer-events-none text-[var(--color-muted)] z-0"
    >
      {ticks.map((_, i) => (
        <span
          key={i}
          className="flex items-center gap-1.5"
        >
          <span
            className="block bg-current"
            style={{ width: i % 2 === 0 ? 8 : 4, height: 1 }}
          />
          {i % 2 === 0 && (
            <span className="text-[8.5px] font-mono tracking-widest">
              {String((8 - i) * 50).padStart(3, "0")}
            </span>
          )}
        </span>
      ))}
    </motion.div>
  );
}

function HorizontalBaseline() {
  const ticks = Array.from({ length: 11 });
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.6 }}
      animate={{ opacity: 0.5, scaleX: 1 }}
      transition={{ delay: 1.6, duration: 0.7 }}
      className="absolute left-[6%] right-[6%] bottom-[2%] h-3 pointer-events-none text-[var(--color-muted)] origin-left z-0"
    >
      <div className="absolute left-0 right-0 top-1 h-px bg-current opacity-40" />
      {ticks.map((_, i) => (
        <span
          key={i}
          className="absolute top-1 block bg-current opacity-60"
          style={{
            left: `${(i / (ticks.length - 1)) * 100}%`,
            width: 1,
            height: i % 2 === 0 ? 5 : 3,
            transform: "translateX(-50%)",
          }}
        />
      ))}
      <span className="absolute -top-3.5 left-0 text-[8.5px] font-mono tracking-widest">
        0.00
      </span>
      <span className="absolute -top-3.5 right-0 text-[8.5px] font-mono tracking-widest">
        ∞
      </span>
    </motion.div>
  );
}

function RightTickStrip() {
  const ticks = Array.from({ length: 7 });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      transition={{ delay: 1.7, duration: 0.5 }}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-[40%] flex flex-col justify-between pointer-events-none text-[var(--color-muted)] z-0"
    >
      {ticks.map((_, i) => (
        <span
          key={i}
          className="block bg-current self-end"
          style={{ width: i % 3 === 0 ? 8 : 4, height: 1 }}
        />
      ))}
    </motion.div>
  );
}

function CubeStack() {
  const layers = [
    { label: "Simulator", index: "S3", glyph: "wave" as const },
    { label: "Critic", index: "S2", glyph: "ring" as const },
    { label: "Designer", index: "S1", glyph: "helix" as const },
  ];
  const s = 70;
  // Tight iso stack — body height of one cube is 2s; 50% overlap means stride = s
  const stride = s;
  const COS30 = Math.cos(Math.PI / 6);
  // Container bounds the body geometry only; SVG padding is allowed to overflow
  const bodyW = s * COS30 * 2; // ~121 for s=70
  const bodyH = stride * (layers.length - 1) + 2 * s; // top vertex of first → bottom vertex of last
  // Each IsoCube SVG includes pad/2 of negative-y space above the body's top vertex
  const padHalf = s * 0.6;

  return (
    <div
      className="relative"
      style={{ width: bodyW, height: bodyH, overflow: "visible" }}
    >
      {layers.map((l, i) => (
        <motion.div
          key={l.index}
          initial={{ opacity: 0, y: -14 - (layers.length - i) * 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.65 + i * 0.16,
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-1/2"
          style={{
            // Position so cube body's top vertex is at y = i*stride within container
            top: i * stride - padHalf,
            transform: "translateX(-50%)",
            zIndex: i + 1, // bottom cube draws in front (correct iso layering)
          }}
        >
          <IsoCube
            size={s}
            variant="solid"
            color="var(--color-accent)"
            innerGlyph={l.glyph}
            innerCube={i === 1}
            topGrid
            scanLine={i === 2}
            drawDelay={0.75 + i * 0.14}
            drawDuration={1.1}
          />
        </motion.div>
      ))}

      {/* External BlueprintCallouts — anchored to each cube's body center */}
      <div className="pointer-events-none absolute inset-0">
        {layers.map((l, i) => {
          const cubeBodyCenterY = i * stride + s; // body top is at i*stride, body height is 2s, center at +s
          return (
            <div
              key={`lbl-${l.index}`}
              className="absolute"
              style={{
                left: bodyW + 22,
                top: cubeBodyCenterY,
                transform: "translateY(-50%)",
                zIndex: 30,
              }}
            >
              <BlueprintCallout
                index={l.index}
                label={l.label.toUpperCase()}
                state={i === 2 ? "ok" : i === 1 ? "warn" : "info"}
                align="left"
                leaderLength={28}
                delay={1.05 + i * 0.1}
                pulse={i === 2}
              />
            </div>
          );
        })}
      </div>

      {/* Base ellipse shadow under the bottom cube */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={{ opacity: 0.55, scaleX: 1 }}
        transition={{ delay: 0.95, duration: 0.8 }}
        className="absolute left-1/2 -translate-x-1/2 w-[220px] h-3 rounded-full pointer-events-none"
        style={{
          top: bodyH + 6,
          background:
            "radial-gradient(ellipse at center, rgba(41,86,248,0.35), transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* Base iso ring */}
      <svg
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ top: bodyH + 14 }}
        viewBox="-150 -14 300 28"
        width="240"
        height="26"
      >
        <motion.ellipse
          cx="0"
          cy="0"
          rx="120"
          ry="9"
          fill="none"
          stroke="var(--color-accent-2)"
          strokeOpacity="0.45"
          strokeWidth="0.7"
          strokeDasharray="2 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.0, duration: 1.0 }}
        />
        <motion.ellipse
          cx="0"
          cy="0"
          rx="92"
          ry="7"
          fill="none"
          stroke="var(--color-line-strong)"
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 0.9 }}
        />
      </svg>
    </div>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor">
      <path d="M4 3l9 5-9 5V3z" />
    </svg>
  );
}
