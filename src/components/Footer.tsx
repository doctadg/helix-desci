"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/Marquee";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Logomark } from "@/components/ui/Logomark";

const COLUMNS = [
  {
    title: "Products",
    links: ["Designer", "Critic", "Simulator", "Scribe", "Sentinel"],
  },
  {
    title: "Modules",
    links: [
      "Antigen Discovery",
      "Generative Design",
      "Molecular Dynamics",
      "Off-Target Screen",
      "Synthesis Routes",
      "Reputation Mint",
    ],
  },
  {
    title: "Indications",
    links: [
      "Solid tumors",
      "Hematological",
      "Pediatric",
      "Rare oncology",
      "Immuno-onc",
    ],
  },
  {
    title: "Research",
    links: ["Whitepaper", "Open candidates", "Publications", "Benchmarks"],
  },
  {
    title: "Community",
    links: ["GitHub", "Discord", "X", "Mirror", "Status"],
  },
];

export function Footer() {
  return (
    <footer className="relative theme-dark pt-20 md:pt-28 pb-12 overflow-hidden border-t border-[var(--color-line)]">
      <div className="absolute inset-0 grid-bg-fine pointer-events-none opacity-50 z-0" />

      <div className="wrap relative z-[var(--z-base)]">
        {/* Big wordmark marquee — sits behind footer content */}
        <Marquee className="mb-16 md:mb-20 -mx-4 relative z-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="text-[14vw] md:text-[8.5rem] lg:text-[10rem] text-display leading-none text-[var(--color-fg)]/8"
              style={{ color: "rgba(242,241,237,0.06)" }}
            >
              HELIX <span className="serif-italic">·</span> AUTONOMOUS{" "}
              <span className="serif-italic">·</span> ONCOLOGY{" "}
              <span className="serif-italic">·</span>
            </span>
          ))}
        </Marquee>

        <div className="grid grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-[var(--color-line)]">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-2 mb-6 -ml-1">
              <Logomark size={56} framed={false} />
              <div className="flex flex-col leading-none">
                <span className="text-[18px] font-medium tracking-tight">
                  HELIX
                </span>
                <span className="text-[9.5px] font-mono uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  Research /v1.0
                </span>
              </div>
            </div>

            <p className="text-[14px] text-[var(--color-fg)]/70 max-w-sm leading-relaxed">
              The autonomous research cloud for cancer. Open weights, open
              compute, open outcomes.
            </p>

            {/* Newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex items-center gap-2 max-w-sm"
            >
              <div className="flex-1 flex items-center gap-2 px-4 h-11 rounded-full border border-[var(--color-line-strong)] bg-[rgba(14,15,18,0.5)]">
                <span className="text-[var(--color-muted)]">
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor">
                    <rect x="2" y="3" width="12" height="10" rx="1" strokeWidth="1.2" />
                    <path d="M2 5l6 4 6-4" strokeWidth="1.2" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="researcher@lab.org"
                  className="bg-transparent outline-none text-[13px] flex-1 placeholder:text-[var(--color-muted)]"
                />
              </div>
              <button
                data-cursor="link"
                className="group relative inline-flex items-center justify-center h-11 px-5 rounded-full bg-[var(--color-fg)] text-[var(--color-ink)] text-[13px] font-medium overflow-hidden cursor-pointer"
              >
                <span className="relative z-10">Subscribe</span>
              </button>
            </form>

            <div className="mt-8 flex items-center gap-3 text-mono-sm text-[var(--color-muted)]">
              <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
              all systems nominal · 99.94% SLA
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {COLUMNS.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <div className="text-mono-sm text-[var(--color-muted)] mb-4">
                  [0{i + 1}] {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                        data-cursor="link"
                        className="text-[13.5px] text-[var(--color-fg)]/80 hover:text-[var(--color-accent-2)] transition-colors inline-flex items-center group"
                      >
                        <ScrambleText text={link} speed={20} />
                        <span className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-mono-sm text-[var(--color-muted)]">
          <div className="flex items-center gap-6">
            <span>© 2026 Helix Protocol</span>
            <a href="#" data-cursor="link" className="hover:text-[var(--color-fg)] link-underline">
              Privacy
            </a>
            <a href="#" data-cursor="link" className="hover:text-[var(--color-fg)] link-underline">
              Terms
            </a>
            <a href="#" data-cursor="link" className="hover:text-[var(--color-fg)] link-underline">
              Biosafety
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>SF · Berlin · Singapore</span>
            <span className="text-[var(--color-fg)]/40">·</span>
            <span className="flex items-center gap-1.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
              v1.04 · 2026.05
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

