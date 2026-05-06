"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";

const MODULES = [
  {
    id: "01",
    title: "Antigen Discovery",
    body: "Mine tumor proteomes against patient-specific HLA — surface targets that are druggable and unique.",
    icon: <IconAntigen />,
  },
  {
    id: "02",
    title: "Generative Design",
    body: "RFdiffusion + ESM-2 produce 10⁴ scaffolds an hour, ranked by druggability and synthesis cost.",
    icon: <IconDesign />,
  },
  {
    id: "03",
    title: "Molecular Dynamics",
    body: "100ns GROMACS runs on every shortlist. Pose stability, RMSD, energy landscape — all returned.",
    icon: <IconMD />,
  },
  {
    id: "04",
    title: "Off-Target Screen",
    body: "Adversarial decoy panel of 9k+ alternates. Catch the cross-reactivity before it costs a patient.",
    icon: <IconOffTarget />,
  },
  {
    id: "05",
    title: "Synthesis Routes",
    body: "Retrosynthesis with cost and feasibility scoring across 90M+ commercial reagents.",
    icon: <IconSynth />,
  },
  {
    id: "06",
    title: "Reputation Mint",
    body: "Every contributor — agent or human — gets credited on-chain when their work moves the field.",
    icon: <IconRep />,
  },
  {
    id: "07",
    title: "Provenance Ledger",
    body: "Full audit trail to Arweave. Reproduce any candidate, any time, on any node.",
    icon: <IconLedger />,
  },
  {
    id: "08",
    title: "Biosafety Sentinel",
    body: "Dual-use screening before publication. Helix won't release what shouldn't exist.",
    icon: <IconShield />,
  },
  {
    id: "09",
    title: "Wet-Lab Bridge",
    body: "Order synthesis from partnered CROs without leaving the platform — provenance attached.",
    icon: <IconBridge />,
  },
];

export function Modules() {
  return (
    <section className="relative theme-light py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg-light opacity-50 pointer-events-none z-0" />
      <div className="wrap relative z-[var(--z-base)]">
        <div className="grid grid-cols-12 gap-8 items-end mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-7">
            <div className="text-mono-sm text-[var(--color-ink-muted)] mb-4">
              [07] · modules
            </div>
            <h2 className="text-display text-4xl md:text-6xl text-[var(--color-ink)] leading-[1]">
              Modules for every
              <br />
              <span className="serif-italic">research vector.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 text-[14px] text-[var(--color-ink-muted)] leading-relaxed">
            Helix is composable down to the function call. Use what you need —
            stand alone or stitch together a custom pipeline in minutes.
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 md:gap-4">
          {MODULES.map((m, i) => (
            <motion.a
              key={m.id}
              href={`#${m.id}`}
              data-cursor="link"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.6,
                delay: (i % 3) * 0.06 + Math.floor(i / 3) * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group col-span-12 sm:col-span-6 md:col-span-4 relative rounded-2xl border border-[var(--color-ink-line-strong)] bg-[var(--color-cream-2)] p-5 md:p-6 hover:bg-[var(--color-cream-3)] transition-colors min-h-[210px] flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="text-[var(--color-ink)] group-hover:scale-105 transition-transform origin-left">
                  {m.icon}
                </div>
                <span className="font-mono text-[10.5px] text-[var(--color-ink-muted)] tracking-widest">
                  {m.id}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-medium tracking-tight text-[var(--color-ink)] mb-2">
                {m.title}
              </h3>
              <p className="text-[13px] text-[var(--color-ink-muted)] leading-relaxed">
                {m.body}
              </p>
              <span className="absolute bottom-5 right-5 text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink)] transition-colors">
                <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* === Mini iso icons === */
function IconAntigen() {
  return (
    <svg viewBox="-30 -30 60 60" className="w-12 h-12">
      <circle r="18" fill="none" stroke="currentColor" strokeOpacity="0.4" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <circle
            key={i}
            cx={Math.cos(a) * 18}
            cy={Math.sin(a) * 18}
            r="2.2"
            fill={i === 0 ? "var(--color-accent)" : "currentColor"}
          />
        );
      })}
      <circle r="3" fill="var(--color-accent)" />
    </svg>
  );
}
function IconDesign() {
  return (
    <svg viewBox="-30 -30 60 60" className="w-12 h-12">
      <path d="M 0 -22 L 22 -10 L 0 2 L -22 -10 Z" fill="currentColor" opacity="0.85" />
      <path d="M -22 -10 L -22 12 L 0 24 L 0 2 Z" fill="currentColor" opacity="0.6" />
      <path d="M 0 2 L 0 24 L 22 12 L 22 -10 Z" fill="currentColor" opacity="0.4" />
      <circle cx="0" cy="-22" r="3" fill="var(--color-accent)" />
    </svg>
  );
}
function IconMD() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <path
        d="M 4 36 Q 14 22 22 30 T 38 24 T 56 18"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {[10, 22, 38, 50].map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 === 0 ? 32 : 26} r="2" fill="currentColor" />
      ))}
    </svg>
  );
}
function IconOffTarget() {
  return (
    <svg viewBox="-30 -30 60 60" className="w-12 h-12">
      <circle r="22" stroke="currentColor" strokeOpacity="0.4" fill="none" />
      <circle r="14" stroke="currentColor" strokeOpacity="0.5" fill="none" />
      <circle r="6" stroke="currentColor" fill="none" />
      <line x1="-26" y1="0" x2="26" y2="0" stroke="currentColor" strokeOpacity="0.3" />
      <line x1="0" y1="-26" x2="0" y2="26" stroke="currentColor" strokeOpacity="0.3" />
      <circle cx="10" cy="-6" r="3" fill="var(--color-warn)" />
    </svg>
  );
}
function IconSynth() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 8 + i * 11;
        return (
          <g key={i}>
            <circle cx={x} cy="30" r="3.4" fill={i % 2 ? "currentColor" : "var(--color-accent)"} />
            {i < 4 && <line x1={x + 3} y1="30" x2={x + 8} y2="30" stroke="currentColor" />}
          </g>
        );
      })}
    </svg>
  );
}
function IconRep() {
  return (
    <svg viewBox="-30 -30 60 60" className="w-12 h-12">
      <polygon
        points="0,-22 19,-7 14,18 -14,18 -19,-7"
        fill="currentColor"
        opacity="0.85"
      />
      <text
        x="0"
        y="6"
        textAnchor="middle"
        style={{ fontSize: 14, fill: "var(--color-cream)", fontFamily: "monospace", fontWeight: 600 }}
      >
        ✦
      </text>
    </svg>
  );
}
function IconLedger() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x="10"
          y={10 + i * 11}
          width="40"
          height="6"
          fill={i === 1 ? "var(--color-accent)" : "currentColor"}
          opacity={i === 1 ? 1 : 0.6}
        />
      ))}
      <line x1="10" y1="6" x2="50" y2="6" stroke="currentColor" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="-30 -30 60 60" className="w-12 h-12">
      <path
        d="M 0 -22 L 18 -16 L 18 6 Q 18 22 0 24 Q -18 22 -18 6 L -18 -16 Z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M -7 0 L -2 6 L 8 -6"
        fill="none"
        stroke="var(--color-cream)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconBridge() {
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <path d="M 6 38 L 26 28 L 46 38" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="38" r="3" fill="currentColor" />
      <circle cx="46" cy="38" r="3" fill="currentColor" />
      <circle cx="26" cy="28" r="3" fill="var(--color-accent)" />
      <line x1="26" y1="28" x2="26" y2="14" stroke="currentColor" strokeOpacity="0.5" strokeDasharray="2 2" />
    </svg>
  );
}
