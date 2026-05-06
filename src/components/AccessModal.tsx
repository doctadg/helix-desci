"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrambleText } from "@/components/ui/ScrambleText";
import {
  ACCESS_CODE,
  ACCESS_EVENT,
  checkCode,
  isUnlocked,
  unlock,
} from "@/lib/access";

export function AccessModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "ok" | "denied">(
    "idle"
  );
  const [shake, setShake] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onOpen = () => {
      // If already unlocked, skip the form and route straight to the console.
      if (isUnlocked()) {
        router.push("/dashboard");
        return;
      }
      setCode("");
      setState("idle");
      setOpen(true);
    };
    window.addEventListener(ACCESS_EVENT, onOpen);
    return () => window.removeEventListener(ACCESS_EVENT, onOpen);
  }, [router]);

  // Lock body scroll while open + autofocus + escape-to-close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open]);

  function formatCode(raw: string) {
    return raw
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, "")
      .replace(/-+/g, "-")
      .slice(0, 24);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "checking" || state === "ok") return;
    setState("checking");
    setTimeout(() => {
      if (checkCode(code)) {
        unlock();
        setState("ok");
        setTimeout(() => {
          setOpen(false);
          router.push("/dashboard");
        }, 700);
      } else {
        setState("denied");
        setShake((s) => s + 1);
        setTimeout(() => setState("idle"), 1500);
      }
    }, 550);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="access-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[var(--z-overlay)] flex items-center justify-center p-4 md:p-6"
        >
          {/* Backdrop */}
          <motion.button
            aria-label="Close"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[rgba(8,9,12,0.78)] backdrop-blur-md cursor-pointer"
          />

          {/* Subtle iso grid behind the card so it feels like the rest of the site */}
          <div className="absolute inset-0 iso-grid radial-fade pointer-events-none opacity-30" />

          {/* Card */}
          <motion.div
            key={shake}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={
              state === "denied"
                ? { opacity: 1, y: 0, scale: 1, x: [0, -8, 8, -6, 6, -3, 3, 0] }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[480px] rounded-2xl border border-[var(--color-line-strong)] bg-[#0B0C10] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          >
            {/* Chrome bar */}
            <div className="flex items-center gap-3 h-9 px-4 border-b border-[var(--color-line)] bg-[#08090C]">
              <span className="flex items-center gap-1.5">
                <span className="block w-2.5 h-2.5 rounded-full bg-[#3a3c43]" />
                <span className="block w-2.5 h-2.5 rounded-full bg-[#3a3c43]" />
                <span className="block w-2.5 h-2.5 rounded-full bg-[#3a3c43]" />
              </span>
              <span className="font-mono text-[10.5px] text-[var(--color-muted)] tracking-widest uppercase">
                helix · auth
              </span>
              <span className="ml-auto flex items-center gap-2 text-mono-sm text-[var(--color-muted)]">
                <span
                  className={`block w-1.5 h-1.5 rounded-full pulse-dot ${
                    state === "ok"
                      ? "bg-[var(--color-good)]"
                      : state === "denied"
                      ? "bg-[var(--color-warn)]"
                      : "bg-[var(--color-amber)]"
                  }`}
                />
                {state === "ok"
                  ? "granted"
                  : state === "denied"
                  ? "denied"
                  : state === "checking"
                  ? "verifying"
                  : "awaiting code"}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                data-cursor="link"
                className="ml-2 -mr-1 p-1 text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors"
              >
                <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <form onSubmit={onSubmit} className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-eyebrow text-[var(--color-accent-2)]">
                  [00]
                </span>
                <span className="text-eyebrow">Restricted · console.helix.bio</span>
              </div>

              <h2 className="text-[28px] md:text-[32px] leading-[1.02] tracking-tight font-medium">
                Authorized{" "}
                <span className="serif-italic text-[var(--color-accent-2)]">
                  researchers
                </span>{" "}
                only.
              </h2>
              <p className="mt-2 text-[13.5px] text-[var(--color-fg)]/70 leading-relaxed">
                Enter the code issued to your lab to view the live agent loop
                and on-chain ledger.
              </p>

              <div className="mt-5 flex items-center gap-2 text-mono-sm text-[var(--color-muted)]">
                <span className="text-[var(--color-accent-2)]">$</span>
                <ScrambleText
                  text="helix auth --challenge"
                  trigger="mount"
                  className="text-[var(--color-fg)]/85"
                />
              </div>

              <label className="block text-eyebrow text-[var(--color-muted)] mt-4 mb-2">
                Access code
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  value={code}
                  onChange={(e) => setCode(formatCode(e.target.value))}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="characters"
                  placeholder="HELIX-XXXX"
                  className="w-full bg-[#08090C] border border-[var(--color-line)] focus:border-[var(--color-accent)] focus:outline-none rounded-lg px-4 py-3.5 font-mono text-[16px] tracking-[0.18em] text-[var(--color-fg)] placeholder:text-[var(--color-muted)]/60 transition-colors"
                />
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-mono-sm text-[var(--color-muted)]">
                  {code.length.toString().padStart(2, "0")}/24
                </span>
              </div>

              <AnimatePresence mode="wait">
                {state === "denied" && (
                  <motion.div
                    key="err"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-mono-sm text-[var(--color-warn)] flex items-center gap-2"
                  >
                    <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-warn)]" />
                    code rejected · check your invitation email
                  </motion.div>
                )}
                {state === "ok" && (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-mono-sm text-[var(--color-good)] flex items-center gap-2"
                  >
                    <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
                    granted · routing to console
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 flex items-center gap-3 flex-wrap">
                <MagneticButton as="button" strength={0.35}>
                  <span className="group relative inline-flex items-center gap-3 h-11 px-5 rounded-full bg-[var(--color-fg)] text-[var(--color-ink)] text-[13.5px] font-medium overflow-hidden">
                    <span className="absolute inset-0 bg-[var(--color-accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                      {state === "checking" ? "verifying…" : "Enter console"}
                    </span>
                    <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-current" />
                  </span>
                </MagneticButton>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  data-cursor="link"
                  className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--color-line-strong)] text-[13.5px] hover:border-[var(--color-accent-2)] transition-colors"
                >
                  Cancel
                </button>
                <span className="ml-auto text-mono-sm text-[var(--color-muted)]">
                  esc to close
                </span>
              </div>

              {/* Demo hint — same surface used on /access */}
              <div className="mt-5 pt-4 border-t border-[var(--color-line)] text-mono-sm text-[var(--color-muted)] flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                demo · code is{" "}
                <code className="px-1.5 py-0.5 rounded bg-[rgba(41,86,248,0.12)] text-[var(--color-accent-2)] font-mono">
                  {ACCESS_CODE}
                </code>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
