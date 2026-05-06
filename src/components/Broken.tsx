"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "@/components/ui/AnimatedText";

const SENTENCE = [
  "Cancer",
  "research",
  "is",
  "broken.",
  "To",
  "fix",
  "it,",
  "we",
  "rebuilt",
  "the",
  "substrate",
  "from",
  "first",
  "principles.",
];

const ACCENT = new Set(["broken.", "rebuilt", "principles."]);

function Word({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1.4 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={
        ACCENT.has(word)
          ? "serif-italic text-[var(--color-ink)]"
          : "text-[var(--color-ink)]/85"
      }
    >
      {word}
    </motion.span>
  );
}

export function Broken() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <section
      ref={ref}
      className="relative theme-light pt-28 md:pt-40 pb-20 md:pb-28"
    >
      {/* faint isometric guide lines */}
      <div className="absolute inset-0 iso-grid-light opacity-50 pointer-events-none z-0" />

      <div className="wrap relative z-[var(--z-base)]">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-9">
            <h2 className="text-display text-[8.5vw] md:text-[5.5vw] lg:text-[4.6rem] xl:text-[5.4rem] leading-[1.02] flex flex-wrap gap-x-3 md:gap-x-4 gap-y-1">
              {SENTENCE.map((w, i) => (
                <Word
                  key={`${w}-${i}`}
                  word={w}
                  index={i}
                  total={SENTENCE.length}
                  progress={scrollYProgress}
                />
              ))}
            </h2>
          </div>

          <div className="col-span-12 md:col-span-3 md:pt-2">
            <div className="text-mono-sm text-[var(--color-ink-muted)] mb-2">
              [01]
            </div>
            <p className="text-[14px] text-[var(--color-ink-muted)] leading-relaxed">
              Twenty million new diagnoses a year. The science needed to help
              them already exists — locked behind paper walls and fragmented
              compute.
            </p>
          </div>
        </div>

        {/* Three feature columns with iconographic cells */}
        <div className="mt-20 md:mt-32 grid grid-cols-12 gap-x-8 gap-y-12 md:gap-y-16 border-t border-[var(--color-ink-line-strong)] pt-12">
          <FeatureColumn
            index="01"
            title="Composable, not closed"
            kicker="ONE STACK"
            body="Every agent is open weight, replaceable, and verifiable. Fork the Critic, retrain the Designer, ship a custom Sentinel — all on the same substrate."
            icon={<IconStack />}
            delay={0.1}
          />
          <FeatureColumn
            index="02"
            title="Decentralized, not gate-kept"
            kicker="OPEN COMPUTE"
            body="A global mesh of researcher-run nodes settles every simulation. Reputation tokens flow back to whoever moved the field — not the journal."
            icon={<IconNetwork />}
            delay={0.2}
          />
          <FeatureColumn
            index="03"
            title="Patient-first, not paper-first"
            kicker="REAL OUTCOMES"
            body="Clinical co-design from day zero. Every candidate ships with provenance, drug-likeness, and a path to wet-lab validation."
            icon={<IconBeaker />}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}

function FeatureColumn({
  index,
  title,
  kicker,
  body,
  icon,
  delay,
}: {
  index: string;
  title: string;
  kicker: string;
  body: string;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-12 md:col-span-4"
    >
      <div className="flex items-start gap-3 mb-6 text-mono-sm text-[var(--color-ink-muted)]">
        <span>[{index}]</span>
        <span>{kicker}</span>
      </div>
      <div className="mb-6 text-[var(--color-ink)]">{icon}</div>
      <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-3 text-[var(--color-ink)]">
        {title}
      </h3>
      <p className="text-[14px] md:text-[15px] text-[var(--color-ink-muted)] leading-relaxed max-w-sm">
        {body}
      </p>
      <a
        href="#"
        data-cursor="link"
        className="inline-flex items-center gap-2 mt-6 text-[13px] text-[var(--color-ink)] link-underline"
      >
        Read the spec
        <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor">
          <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </a>
    </motion.div>
  );
}

/* === Iconographic cells (isometric mini illustrations) === */
function IconStack() {
  return (
    <svg viewBox="-50 -50 100 100" className="w-20 h-20">
      {[18, 0, -18].map((dy, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
        >
          <path
            d={`M 0 ${dy - 18} L 26 ${dy - 9} L 0 ${dy} L -26 ${dy - 9} Z`}
            fill={i === 1 ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
            opacity={i === 1 ? 0.9 : 0.5}
          />
        </motion.g>
      ))}
    </svg>
  );
}
function IconNetwork() {
  const nodes = [
    [0, -20], [-22, 0], [22, 0], [-12, 22], [12, 22], [0, 0],
  ];
  return (
    <svg viewBox="-40 -40 80 80" className="w-20 h-20">
      {nodes.map(([x1, y1], i) =>
        nodes.slice(i + 1).map(([x2, y2], j) => (
          <motion.line
            key={`${i}-${j}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.45"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.05 + j * 0.04, duration: 0.5 }}
          />
        ))
      )}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={i === 5 ? 4 : 2.6}
          fill="currentColor"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 + i * 0.04, duration: 0.4 }}
          style={{ transformOrigin: `${x}px ${y}px`, transformBox: "fill-box" }}
        />
      ))}
    </svg>
  );
}
function IconBeaker() {
  return (
    <svg viewBox="-50 -50 100 100" className="w-20 h-20">
      <motion.path
        d="M -16 -28 L 16 -28 M -10 -28 L -10 -8 L -22 24 Q -22 30 -16 30 L 16 30 Q 22 30 22 24 L 10 -8 L 10 -28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />
      <motion.path
        d="M -20 14 L 20 14 L 18 24 Q 18 28 14 28 L -14 28 Q -18 28 -18 24 Z"
        fill="currentColor"
        opacity="0.85"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        style={{ transformOrigin: "0 28px", transformBox: "fill-box" }}
      />
      <motion.circle
        cx="-6"
        cy="20"
        r="1.6"
        fill="white"
        initial={{ y: 8 }}
        whileInView={{ y: -4 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      />
    </svg>
  );
}
