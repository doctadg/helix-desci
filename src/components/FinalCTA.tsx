"use client";

import { motion } from "framer-motion";
import { IsoCube } from "@/components/ui/IsoCube";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { BlueprintCallout } from "@/components/ui/BlueprintCallout";
import { openAccessModal } from "@/lib/access";

export function FinalCTA() {
  return (
    <section className="relative theme-light py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 iso-grid-light opacity-50 pointer-events-none z-0" />

      {/* flanking decorative cubes */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block absolute left-[5%] top-1/2 -translate-y-1/2 text-[var(--color-ink)]/85 z-[var(--z-bleed)]"
      >
        <DecoTower flip />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="hidden md:block absolute right-[5%] top-1/2 -translate-y-1/2 text-[var(--color-ink)]/85 z-[var(--z-bleed)]"
      >
        <DecoTower />
      </motion.div>

      <div className="wrap relative z-[var(--z-scene)]">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <h2 className="text-display text-5xl md:text-7xl lg:text-[5.6rem] leading-[0.95] text-[var(--color-ink)]">
            <AnimatedText text="Run your first" by="word" />
            <br />
            <span className="serif-italic">
              <AnimatedText text="simulation today." by="word" delay={0.15} />
            </span>
          </h2>

          {/* Vertical thin line decoration */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="my-8 mx-auto w-px h-12 bg-[var(--color-ink-line-strong)] origin-top"
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] -translate-x-[3px] translate-y-12" />
          </motion.div>

          <p className="text-[14px] md:text-[15px] text-[var(--color-ink-muted)] max-w-md">
            Fast to deploy. Easy to fork. Built to scale.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-3 justify-center"
          >
            <MagneticButton as="button" onClick={openAccessModal} strength={0.4}>
              <span className="group relative inline-flex items-center gap-3 h-12 px-7 rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] text-[14px] font-medium overflow-hidden">
                <span className="relative z-10">Run a sim</span>
                <span className="absolute inset-0 bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DecoTower({ flip }: { flip?: boolean }) {
  return (
    <div className="relative">
      <div className="relative w-[200px] h-[300px]">
        {/* central spine */}
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="absolute left-1/2 top-2 bottom-2 w-px bg-current opacity-15 origin-top"
        />

        {/* Top tiny node */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2">
          <IsoCube size={18} variant="wireframe" stroke="currentColor" drawDelay={0.4} drawDuration={0.9} innerGlyph="cross" />
        </div>

        {/* Mid satellite */}
        <div className={`absolute top-14 ${flip ? "right-1" : "left-1"}`}>
          <IsoCube size={28} variant="wireframe" stroke="currentColor" drawDelay={0.55} drawDuration={1} innerGlyph="ring" />
        </div>

        {/* Big ghost in middle */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <IsoCube
            size={78}
            variant="ghost"
            stroke="currentColor"
            drawDelay={0.2}
            drawDuration={1.4}
            innerGlyph="atom"
            innerCube
          />
        </div>

        {/* lower-side */}
        <div className={`absolute bottom-16 ${flip ? "left-1" : "right-1"}`}>
          <IsoCube size={26} variant="wireframe" stroke="currentColor" drawDelay={0.75} drawDuration={1} innerGlyph="node" />
        </div>

        {/* Bottom small */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <IsoCube size={22} variant="wireframe" stroke="currentColor" drawDelay={0.95} drawDuration={0.9} innerGlyph="wave" />
        </div>

        {/* Two purposeful callouts */}
        <div className={`absolute top-[24%] ${flip ? "left-full ml-2" : "right-full mr-2"} -translate-y-1/2`}>
          <BlueprintCallout
            index="01"
            label={flip ? "AGENT" : "TARGET"}
            value={flip ? "ready" : "live"}
            state="ok"
            align={flip ? "left" : "right"}
            leaderLength={20}
            delay={1.0}
            pulse
          />
        </div>
        <div className={`absolute bottom-[20%] ${flip ? "right-full mr-2" : "left-full ml-2"} -translate-y-1/2`}>
          <BlueprintCallout
            index="τ"
            label="STARTUP"
            value="6.4"
            unit="s"
            state="info"
            align={flip ? "right" : "left"}
            leaderLength={20}
            delay={1.15}
          />
        </div>
      </div>
    </div>
  );
}
