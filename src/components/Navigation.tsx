"use client";

import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Logomark } from "@/components/ui/Logomark";
import { openAccessModal } from "@/lib/access";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string; desc?: string }[];
};

// Only items that resolve to a real on-page section. The auth-gated console
// is reached via the right-side "Sign in" / "Run a sim" buttons.
const NAV: NavItem[] = [
  { label: "Pipeline", href: "#pipeline" },
  { label: "Products", href: "#products" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        onMouseLeave={() => setOpen(null)}
        className={cn(
          "fixed top-0 inset-x-0 z-[var(--z-nav)] transition-all duration-500",
          scrolled
            ? "backdrop-blur-2xl bg-[rgba(14,15,18,0.7)] border-b border-[var(--color-line)]"
            : "bg-transparent"
        )}
      >
        <div className="wrap relative flex items-center justify-between h-16 md:h-[72px]">
          {/* Left */}
          <a href="#" data-cursor="link" className="flex items-center gap-1.5 shrink-0 -ml-1">
            <Logomark size={44} framed={false} />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-[15px] font-medium tracking-tight">HELIX</span>
              <span className="text-[9.5px] font-mono uppercase tracking-[0.22em] text-[var(--color-muted)]">
                Research /v1.0
              </span>
            </span>
          </a>

          {/* Center */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const hasChildren = !!item.children;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpen(item.label)}
                >
                  <a
                    href={item.href ?? "#"}
                    data-cursor="link"
                    className="group flex items-center gap-1.5 px-4 py-2 text-[14px] text-[var(--color-fg)]/85 hover:text-[var(--color-fg)] transition-colors"
                  >
                    <ScrambleText text={item.label} speed={20} />
                    {hasChildren && (
                      <svg
                        viewBox="0 0 12 12"
                        className={cn(
                          "w-2.5 h-2.5 transition-transform",
                          open === item.label && "rotate-180"
                        )}
                      >
                        <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    )}
                  </a>
                  <AnimatePresence>
                    {hasChildren && open === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 top-full pt-3 min-w-[280px] z-[var(--z-nav)]"
                      >
                        <div className="rounded-2xl border border-[var(--color-line-strong)] bg-[rgba(14,15,18,0.95)] backdrop-blur-xl p-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
                          {item.children!.map((c) => (
                            <a
                              key={c.label}
                              href={c.href}
                              data-cursor="link"
                              className="group flex items-start gap-3 rounded-xl p-3 hover:bg-[rgba(242,241,237,0.04)] transition-colors"
                            >
                              <span className="mt-1 block w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0 group-hover:scale-150 transition-transform" />
                              <span>
                                <span className="block text-[13px] font-medium">
                                  {c.label}
                                </span>
                                {c.desc && (
                                  <span className="block text-[11.5px] text-[var(--color-muted)] mt-0.5">
                                    {c.desc}
                                  </span>
                                )}
                              </span>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              type="button"
              onClick={openAccessModal}
              data-cursor="link"
              className="hidden md:inline-flex text-[13.5px] text-[var(--color-fg)]/85 hover:text-[var(--color-fg)] transition-colors link-underline"
            >
              Sign in
            </button>
            <MagneticButton as="button" onClick={openAccessModal} strength={0.35}>
              <span className="group relative inline-flex items-center gap-2 h-9 md:h-10 px-4 md:px-5 rounded-full bg-[var(--color-fg)] text-[var(--color-ink)] text-[13px] font-medium overflow-hidden">
                <span className="relative z-10">Run a sim</span>
                <span className="absolute inset-0 bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </span>
            </MagneticButton>
            <button
              onClick={() => setMobile(true)}
              className="md:hidden p-2 -m-2 text-[var(--color-fg)]"
              aria-label="Open menu"
            >
              <div className="flex flex-col gap-1.5 items-end">
                <span className="block w-5 h-px bg-current" />
                <span className="block w-3.5 h-px bg-current" />
              </div>
            </button>
          </div>
        </div>

        {/* thin bottom progress line */}
        <ProgressBar />
      </motion.header>

      <AnimatePresence>
        {mobile && (
          <motion.div
            className="fixed inset-0 z-[var(--z-overlay)] md:hidden bg-[var(--color-bg)] grain"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.85, 0, 0.15, 1] }}
          >
            <div className="flex items-center justify-between h-16 px-6 border-b border-[var(--color-line)]">
              <Logomark size={40} framed={false} />
              <button
                className="p-2"
                onClick={() => setMobile(false)}
                aria-label="Close menu"
              >
                <span className="block w-5 h-5 relative">
                  <span className="absolute inset-0 m-auto w-5 h-px bg-current rotate-45" />
                  <span className="absolute inset-0 m-auto w-5 h-px bg-current -rotate-45" />
                </span>
              </button>
            </div>
            <nav className="flex flex-col px-6 py-8">
              {NAV.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href ?? `#${item.label.toLowerCase()}`}
                  onClick={() => setMobile(false)}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-baseline gap-4 py-4 border-b border-[var(--color-line)] text-3xl"
                >
                  <span className="font-mono text-[10px] text-[var(--color-accent)]">
                    0{i + 1}
                  </span>
                  <span>{item.label}</span>
                </motion.a>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  setMobile(false);
                  openAccessModal();
                }}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + NAV.length * 0.05 }}
                className="flex items-baseline gap-4 py-4 border-b border-[var(--color-line)] text-3xl text-left text-[var(--color-accent-2)]"
              >
                <span className="font-mono text-[10px] text-[var(--color-accent)]">
                  0{NAV.length + 1}
                </span>
                <span>Sign in</span>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)]"
    />
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
      <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
