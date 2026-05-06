"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/AnimatedText";

const ORGS = [
  { name: "BATA", sub: "Bay Area Tumor Atlas" },
  { name: "VITA·DAO", sub: "Longevity collective" },
  { name: "ICR", sub: "Institute of Cancer Research" },
  { name: "PARK·LAB", sub: "Parkinson Bio" },
  { name: "MARIGOLD", sub: "Pediatric oncology" },
  { name: "DESCI·EU", sub: "European DeSci alliance" },
  { name: "HELIX·NET", sub: "research mesh" },
  { name: "ANVIL", sub: "Open compute fund" },
];

export function TrustedBy() {
  return (
    <section className="relative theme-light pt-12 pb-28 md:pb-36 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-[var(--color-ink-line-strong)] z-0" />
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
            [02] · who is on Helix
          </motion.div>
          <h2 className="text-display text-4xl md:text-6xl text-[var(--color-ink)]">
            <AnimatedText text="Trusted by labs &amp;" by="word" />
            <br />
            <span className="serif-italic">
              <AnimatedText text="DeSci collectives." by="word" delay={0.2} />
            </span>
          </h2>
          <p className="mt-6 text-[14px] md:text-[15px] text-[var(--color-ink-muted)] max-w-md mx-auto">
            Researchers across 26 institutions and 9 DAOs run candidates through
            Helix every day — not because they have to, but because the
            alternative is a notebook and a wait list.
          </p>
        </div>

        {/* Logo grid with hover micro-interaction */}
        <div className="mt-16 md:mt-20 border-y border-[var(--color-ink-line-strong)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {ORGS.map((org, i) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                data-cursor="link"
                className={`group relative h-28 md:h-32 px-6 flex flex-col items-center justify-center text-center border-[var(--color-ink-line-strong)] transition-colors ${
                  i % 4 !== 3 ? "md:border-r" : ""
                } ${i < ORGS.length - 4 ? "md:border-b" : ""} ${i % 2 !== 1 ? "border-r" : ""} ${i < ORGS.length - 2 ? "border-b" : "md:border-b-0"} hover:bg-[rgba(20,21,27,0.03)]`}
              >
                <div className="font-mono text-base md:text-lg font-medium tracking-widest text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                  {org.name}
                </div>
                <div className="text-mono-sm text-[var(--color-ink-muted)] mt-1.5">
                  {org.sub}
                </div>
                {/* corner ticks */}
                <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--color-ink-line-strong)]" />
                <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[var(--color-ink-line-strong)]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sub-stats */}
        <div className="mt-10 md:mt-14 flex flex-wrap items-center justify-between gap-6 text-mono-sm text-[var(--color-ink-muted)]">
          <span>26 institutions · 9 DAOs · 14k researcher-nodes online</span>
          <a
            href="#"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-[var(--color-ink)] link-underline"
          >
            See network map ↗
          </a>
        </div>
      </div>
    </section>
  );
}
