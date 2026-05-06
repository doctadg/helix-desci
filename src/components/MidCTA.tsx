"use client";

import { motion } from "framer-motion";
import { IsoCube } from "@/components/ui/IsoCube";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { BlueprintCallout } from "@/components/ui/BlueprintCallout";
import { openAccessModal } from "@/lib/access";

export function MidCTA() {
  return (
    <section
      id="cta"
      className="relative theme-dark py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute inset-0 iso-grid opacity-50 radial-fade pointer-events-none z-0" />

      {/* flanking decoration cubes */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block absolute left-[6%] top-1/2 -translate-y-1/2 text-[var(--color-fg)]/85 z-[var(--z-bleed)]"
      >
        <DecoCubeStack flip />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block absolute right-[6%] top-1/2 -translate-y-1/2 text-[var(--color-fg)]/85 z-[var(--z-bleed)]"
      >
        <DecoCubeStack />
      </motion.div>

      {/* dotted trails between left/right cubes and center */}
      <svg
        className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[var(--z-bleed)]"
        viewBox="-700 -100 1400 200"
        width="1400"
        height="200"
      >
        <motion.path
          d="M -640 60 L -480 30 L -320 -10 L -200 -20"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="2 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4 }}
        />
        <motion.path
          d="M 200 -20 L 320 -10 L 480 30 L 640 60"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          strokeDasharray="2 4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.6 }}
        />
        {[-640, -480, -320, -200, 200, 320, 480, 640].map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={x === -640 || x === 640 ? 60 : x === -480 || x === 480 ? 30 : x === -320 || x === 320 ? -10 : -20}
            r="2"
            fill="#6A8AFF"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 + i * 0.06 }}
          />
        ))}
      </svg>

      <div className="wrap relative z-[var(--z-scene)]">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 text-mono-sm text-[var(--color-muted)] mb-8"
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent-2)] pulse-dot" />
            [05] · take the loop
          </motion.div>

          <h2 className="text-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95]">
            <AnimatedText text="Upgrade" by="word" />
            <br />
            <span className="serif-italic text-[var(--color-accent-2)]">
              <AnimatedText text="discovery." by="word" delay={0.15} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 text-[15px] md:text-base text-[var(--color-fg)]/70 max-w-md"
          >
            Fast to deploy. Easy to fork. Built to scale to a million
            simulations a day. Helix is open today — your candidate could be
            on-chain by tonight.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-3 justify-center"
          >
            <MagneticButton as="button" onClick={openAccessModal} strength={0.4}>
              <span className="group relative inline-flex items-center gap-3 h-12 px-7 rounded-full bg-[var(--color-fg)] text-[var(--color-ink)] text-[14px] font-medium overflow-hidden">
                <span className="relative z-10">Run a sim</span>
                <span className="absolute inset-0 bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  ↗
                </span>
              </span>
            </MagneticButton>
            <MagneticButton as="a" href="#wp" strength={0.3}>
              <span className="group inline-flex items-center gap-3 h-12 px-6 rounded-full border border-[var(--color-line-strong)] text-[14px] hover:border-[var(--color-accent-2)] transition-colors">
                Read whitepaper
              </span>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 flex items-center gap-2 text-mono-sm text-[var(--color-muted)]"
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
            14k researcher-nodes online · 99.94% SLA
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DecoCubeStack({ flip }: { flip?: boolean }) {
  return (
    <div className="relative">
      <div className="relative w-[180px] h-[220px]">
        {/* Vertical guide line */}
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="absolute left-1/2 top-2 bottom-2 w-px bg-current opacity-15 origin-top"
        />
        {/* Tiny top wireframe cube */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <IsoCube
            size={18}
            variant="wireframe"
            stroke="currentColor"
            drawDelay={0.6}
            drawDuration={0.9}
            innerGlyph="cross"
          />
        </div>
        {/* Mid offset wireframe */}
        <div className={`absolute top-12 ${flip ? "right-1" : "left-1"}`}>
          <IsoCube
            size={26}
            variant="wireframe"
            stroke="currentColor"
            drawDelay={0.55}
            drawDuration={0.9}
            innerGlyph="ring"
          />
        </div>
        {/* Main ghost cube */}
        <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <IsoCube
            size={72}
            variant="ghost"
            stroke="currentColor"
            drawDelay={0.2}
            drawDuration={1.4}
            innerGlyph="atom"
            innerCube
          />
        </div>
        {/* Bottom small */}
        <div className={`absolute bottom-2 ${flip ? "left-2" : "right-2"}`}>
          <IsoCube
            size={26}
            variant="wireframe"
            stroke="currentColor"
            drawDelay={0.85}
            drawDuration={0.9}
            innerGlyph="node"
          />
        </div>

        {/* Single purposeful blueprint callout */}
        <div className={`absolute top-[44%] -translate-y-1/2 ${flip ? "left-full ml-3" : "right-full mr-3"}`}>
          <BlueprintCallout
            index="N7"
            label={flip ? "MESH-EU" : "MESH-US"}
            value={flip ? "228" : "199"}
            unit="nodes"
            state="ok"
            align={flip ? "left" : "right"}
            leaderLength={28}
            delay={1.0}
            pulse
          />
        </div>
      </div>
    </div>
  );
}
