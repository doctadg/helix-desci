"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { IsoCube } from "@/components/ui/IsoCube";
import { AnimatedText } from "@/components/ui/AnimatedText";

const STAGES = [
  {
    id: "01",
    label: "Target ingest",
    title: "Physical proteomics",
    body: "Tumor antigens, mutational landscapes, and patient-specific surfacing — pulled from PDB, AlphaFoldDB, and clinical caches as a typed graph.",
  },
  {
    id: "02",
    label: "Business data",
    title: "Generative design",
    body: "RFdiffusion + ESM-2 produce 10⁴ candidate scaffolds per hour. Each carries druggability, half-life, and synthesis cost annotations from birth.",
  },
  {
    id: "03",
    label: "Finance & ops",
    title: "Simulation & dock",
    body: "100 ns molecular dynamics, full free-energy landscape, off-target screen, and on-chain provenance — all before a single drop hits a flask.",
  },
];

export function Streamline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.15"],
  });

  // Beam moves down the connecting line based on scroll
  const beamY = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);
  const lineLength = useTransform(scrollYProgress, [0, 0.95], [0, 1]);

  return (
    <section
      ref={ref}
      id="pipeline"
      className="relative theme-dark py-28 md:py-44 overflow-hidden"
    >
      <div className="absolute inset-0 iso-grid radial-fade pointer-events-none z-0" />

      <div className="wrap relative z-[var(--z-base)]">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-mono-sm text-[var(--color-muted)] mb-8"
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-2)] pulse-dot" />
            [03] · the pipeline
          </motion.div>
          <h2 className="text-display text-4xl md:text-6xl lg:text-7xl">
            <AnimatedText text="Streamline" by="word" />{" "}
            <span className="serif-italic text-[var(--color-accent-2)]">
              <AnimatedText text="discovery." by="word" delay={0.15} />
            </span>
          </h2>
          <p className="mt-6 text-[var(--color-fg)]/70 text-[15px] max-w-xl mx-auto">
            Three agents, one closed loop. From a target sequence to a vetted
            candidate in under 38 minutes — every step verifiable on-chain.
          </p>
        </div>

        {/* The scroll-drawn ladder */}
        <div className="relative mt-20 md:mt-32">
          {/* Center vertical line (sits behind cubes, above background) */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px overflow-hidden hidden md:block z-[var(--z-bleed)]"
            aria-hidden
          >
            <div className="absolute inset-0 bg-[var(--color-line)]" />
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top bg-[var(--color-accent-2)]"
              style={{ scaleY: lineLength, height: "100%" }}
            />
            <motion.div
              style={{ top: beamY }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-accent-2)]"
            >
              <span className="absolute inset-0 rounded-full bg-[var(--color-accent-2)] animate-ping opacity-50" />
            </motion.div>
          </div>

          {/* Stages */}
          <div className="space-y-32 md:space-y-44">
            {STAGES.map((s, i) => (
              <Stage
                key={s.id}
                stage={s}
                index={i}
                total={STAGES.length}
                progress={scrollYProgress}
              />
            ))}
          </div>

          {/* Big animated frame around the whole pipeline */}
          <BigFrame progress={scrollYProgress} />
        </div>

        {/* Bottom split text */}
        <div className="mt-32 md:mt-44 grid grid-cols-12 gap-8 border-t border-[var(--color-line)] pt-12">
          <div className="col-span-12 md:col-span-5">
            <h3 className="text-2xl md:text-4xl tracking-tight">
              Aggregate, design, and{" "}
              <span className="serif-italic text-[var(--color-accent-2)]">
                simulate
              </span>{" "}
              in one platform.
            </h3>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-7 text-[var(--color-fg)]/70 leading-relaxed text-[15px]">
            <div className="text-eyebrow text-[var(--color-fg)] mb-3">
              CUSTOMIZE EVERY LAYER
            </div>
            Legacy research stacks force-fit your hypothesis into rigid
            templates. Helix was built from the ground up for autonomous agents
            to compose, fork, and recombine — at the speed of a research
            question.
          </div>
        </div>
      </div>
    </section>
  );
}

function Stage({
  stage,
  index,
  total,
  progress,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.95 + 0.02;
  const end = start + 0.18;
  const opacity = useTransform(progress, [start - 0.05, start, end], [0, 0.4, 1]);
  const cubeStart = start;
  const cubeEnd = start + 0.22;

  // Connector line that draws in from the side to the cube
  const connectorLength = useTransform(progress, [start - 0.02, start + 0.06], [0, 1]);
  // Outer halo
  const haloScale = useTransform(progress, [start, end], [0.6, 1]);
  const haloOpacity = useTransform(progress, [start, end], [0, 0.4]);

  const isOdd = index % 2 === 1;

  return (
    <motion.div
      style={{ opacity }}
      className={`relative grid grid-cols-12 gap-6 items-center`}
    >
      {/* Spec column */}
      <div
        className={`col-span-12 md:col-span-5 ${
          isOdd ? "md:col-start-8 md:order-2 md:text-right" : ""
        }`}
      >
        <div
          className={`flex items-center gap-3 mb-3 text-mono-sm text-[var(--color-muted)] ${
            isOdd ? "md:justify-end" : ""
          }`}
        >
          <span className="text-[var(--color-accent-2)]">{stage.id}</span>
          <span>· {stage.label}</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 text-[var(--color-fg)]">
          {stage.title}
        </h3>
        <p
          className={`text-[14px] md:text-[15px] leading-relaxed text-[var(--color-fg)]/70 max-w-md ${
            isOdd ? "md:ml-auto" : ""
          }`}
        >
          {stage.body}
        </p>
        <div className={`mt-6 flex items-center gap-2 text-mono-sm ${isOdd ? "md:justify-end" : ""}`}>
          <span className="text-[var(--color-accent-2)]">→</span>
          <span className="text-[var(--color-fg)]/80">read the agent spec</span>
        </div>
      </div>

      {/* Center cube — sits on top of the vertical line */}
      <div className="col-span-12 md:col-span-2 flex justify-center relative z-[var(--z-scene)]">
        <div className="relative text-[var(--color-fg)]">
          {/* Outer halo ring (z-0 within local stack — behind cube) */}
          <motion.div
            style={{ scale: haloScale, opacity: haloOpacity }}
            className="absolute -inset-12 md:-inset-16 rounded-full border border-[var(--color-accent-2)] z-0"
          />
          {/* Connector dash from line to cube center (hidden on mobile) */}
          <motion.div
            style={{
              scaleX: connectorLength,
              transformOrigin: isOdd ? "right center" : "left center",
            }}
            className={`hidden md:block absolute top-1/2 ${
              isOdd ? "right-full mr-2" : "left-full ml-2"
            } h-px w-12 bg-[var(--color-accent-2)] -translate-y-1/2 z-0`}
          />
          {/* The wireframe cube — every edge draws on scroll */}
          <IsoCube
            size={86}
            variant="wireframe"
            stroke="currentColor"
            scrollProgress={progress}
            drawAtStart={cubeStart}
            drawAtEnd={cubeEnd}
            label={stage.label}
            labelPos={isOdd ? "bl" : "br"}
            index={stage.id}
            lift={0}
          />
        </div>
      </div>

      {/* Code/diagram column */}
      <div
        className={`col-span-12 md:col-span-5 ${
          isOdd ? "md:order-1 md:text-left" : ""
        }`}
      >
        <DiagramCard stage={stage} index={index} progress={progress} start={start} end={end} />
      </div>
    </motion.div>
  );
}

function DiagramCard({
  stage,
  index,
  progress,
  start,
  end,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  return (
    <motion.div
      className="rounded-2xl border border-[var(--color-line-strong)] bg-[#0E1015]/70 backdrop-blur-sm p-5 relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3 text-mono-sm">
        <span className="text-[var(--color-muted)]">{`stage_${stage.id}.exec`}</span>
        <span className="flex items-center gap-1.5 text-[var(--color-good)]">
          <span className="block w-1.5 h-1.5 rounded-full bg-current pulse-dot" />
          live
        </span>
      </div>
      {index === 0 && <DiagramIngest progress={progress} start={start} end={end} />}
      {index === 1 && <DiagramDesign progress={progress} start={start} end={end} />}
      {index === 2 && <DiagramSimulate progress={progress} start={start} end={end} />}
    </motion.div>
  );
}

/* === Diagrams (each driven by scroll) === */
function DiagramIngest({
  progress,
  start,
  end,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const lines = [
    "query.target('KRAS-G12D')",
    "load.context(N=128k)",
    "graph.attach(antigens=4,212)",
    "ready · 14ms",
  ];
  return (
    <div className="font-mono text-[12.5px] space-y-1.5 leading-relaxed">
      {lines.map((l, i) => (
        <Line key={i} text={l} index={i} count={lines.length} progress={progress} start={start} end={end} />
      ))}
      <div className="mt-3 grid grid-cols-4 gap-1.5">
        {Array.from({ length: 16 }).map((_, i) => (
          <Cell key={i} index={i} progress={progress} start={start} end={end} count={16} />
        ))}
      </div>
    </div>
  );
}

function DiagramDesign({
  progress,
  start,
  end,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "scaffolds", v: 10240 },
          { l: "unique", v: 4118 },
          { l: "passing", v: 218 },
        ].map((k, i) => (
          <KPI key={k.l} {...k} index={i} progress={progress} start={start} end={end} />
        ))}
      </div>
      <div className="rounded-lg border border-[var(--color-line)] bg-[#0B0D12] p-3">
        <div className="text-mono-sm text-[var(--color-muted)] mb-2">
          ATTENTION HEAT
        </div>
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 36 }).map((_, i) => (
            <Cell
              key={i}
              index={i}
              count={36}
              progress={progress}
              start={start}
              end={end}
              variant="heat"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DiagramSimulate({
  progress,
  start,
  end,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  // Energy curve drawn over scroll
  const points = Array.from({ length: 64 }).map((_, i) => {
    const x = (i / 63) * 600;
    const y =
      55 +
      Math.sin(i * 0.18) * 14 +
      Math.cos(i * 0.42) * 18 +
      (i / 63) * -25;
    return { x, y };
  });
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const drawProgress = useTransform(progress, [start, end], [0, 1]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-mono-sm">
        <span className="text-[var(--color-muted)]">FREE ENERGY · kcal/mol</span>
        <span className="text-[var(--color-good)]">ΔG = -9.2</span>
      </div>
      <svg viewBox="0 0 600 100" className="w-full h-24" preserveAspectRatio="none">
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            x2="600"
            y1={(i + 1) * 14}
            y2={(i + 1) * 14}
            stroke="rgba(242,241,237,0.05)"
          />
        ))}
        <motion.path
          d={path}
          fill="none"
          stroke="#6A8AFF"
          strokeWidth="1.6"
          style={{ pathLength: drawProgress }}
        />
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[
          { l: "RMSD", v: "1.4 Å" },
          { l: "POSE", v: "stable" },
          { l: "OFF·T", v: "02 / 9821" },
        ].map((k, i) => (
          <div
            key={k.l}
            className="rounded-md border border-[var(--color-line)] py-2 text-mono-sm"
          >
            <div className="text-[var(--color-muted)]">{k.l}</div>
            <div className="text-[var(--color-fg)]">{k.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Line({
  text,
  index,
  count,
  progress,
  start,
  end,
}: {
  text: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const slot = (end - start) / count;
  const s = start + slot * index;
  const e = s + slot * 2;
  const opacity = useTransform(progress, [s, e], [0, 1]);
  const x = useTransform(progress, [s, e], [-6, 0]);
  return (
    <motion.div style={{ opacity, x }} className="text-[var(--color-fg)]">
      <span className="text-[var(--color-muted)]">{`> `}</span>
      {text}
    </motion.div>
  );
}
function KPI({
  l,
  v,
  index,
  progress,
  start,
  end,
}: {
  l: string;
  v: number;
  index: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const slot = (end - start) / 4;
  const s = start + slot * index;
  const e = s + slot * 2;
  const opacity = useTransform(progress, [s, e], [0, 1]);
  const value = useTransform(progress, [s, e], [0, v]);
  return (
    <motion.div
      style={{ opacity }}
      className="rounded-lg border border-[var(--color-line)] p-3"
    >
      <div className="text-mono-sm text-[var(--color-muted)]">{l}</div>
      <motion.div className="text-2xl font-medium tabular-nums">
        <Counter value={value} />
      </motion.div>
    </motion.div>
  );
}

function Counter({ value }: { value: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  useTransform(value, (v) => {
    if (ref.current) ref.current.textContent = Math.round(v).toLocaleString();
    return v;
  }).get();
  return <span ref={ref}>0</span>;
}

function Cell({
  index,
  count,
  progress,
  start,
  end,
  variant = "block",
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
  start: number;
  end: number;
  variant?: "block" | "heat";
}) {
  const slot = (end - start) / count;
  const s = start + slot * index * 0.6;
  const e = s + slot * 1.5;
  const opacity = useTransform(progress, [s, e], [0, 1]);
  const intensity =
    variant === "heat" ? Math.random() * 0.7 + 0.1 : 0.5 + Math.random() * 0.5;
  return (
    <motion.div
      style={{ opacity }}
      className="aspect-square rounded-sm"
      data-i={index}
    >
      <div
        className="w-full h-full rounded-sm"
        style={{
          background:
            variant === "heat"
              ? `rgba(106,138,255,${intensity})`
              : "var(--color-line-strong)",
        }}
      />
    </motion.div>
  );
}

function BigFrame({ progress }: { progress: MotionValue<number> }) {
  const top = useTransform(progress, [0, 0.25], [0, 1]);
  const right = useTransform(progress, [0.25, 0.5], [0, 1]);
  const bottom = useTransform(progress, [0.5, 0.75], [0, 1]);
  const left = useTransform(progress, [0.75, 1], [0, 1]);
  return (
    <div className="hidden md:block pointer-events-none absolute -inset-x-6 lg:-inset-x-12 -inset-y-12 z-[var(--z-callout)]">
      <motion.div
        style={{ scaleX: top, transformOrigin: "left" }}
        className="absolute top-0 left-0 right-0 h-px bg-[var(--color-accent-2)]"
      />
      <motion.div
        style={{ scaleY: right, transformOrigin: "top" }}
        className="absolute top-0 right-0 bottom-0 w-px bg-[var(--color-accent-2)]"
      />
      <motion.div
        style={{ scaleX: bottom, transformOrigin: "right" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent-2)]"
      />
      <motion.div
        style={{ scaleY: left, transformOrigin: "bottom" }}
        className="absolute top-0 left-0 bottom-0 w-px bg-[var(--color-accent-2)]"
      />
      <span className="absolute -top-2 left-0 -translate-y-full text-mono-sm text-[var(--color-muted)] flex items-center gap-2">
        <span className="text-[var(--color-accent-2)]">┌</span> begin pipeline
      </span>
      <span className="absolute -bottom-2 right-0 translate-y-full text-mono-sm text-[var(--color-muted)] flex items-center gap-2">
        end pipeline <span className="text-[var(--color-accent-2)]">┘</span>
      </span>
    </div>
  );
}
