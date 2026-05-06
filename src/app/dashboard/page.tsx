"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isUnlocked, lock } from "@/lib/access";
import { ScrambleText } from "@/components/ui/ScrambleText";

const AGENTS = [
  { id: "Console", glyph: "▦", state: "active" },
  { id: "Designer", glyph: "◇", state: "running" },
  { id: "Critic", glyph: "✕", state: "idle" },
  { id: "Simulator", glyph: "≋", state: "running" },
  { id: "Dock", glyph: "◎", state: "idle" },
  { id: "Score", glyph: "▤", state: "running" },
  { id: "Iterate", glyph: "↻", state: "running" },
  { id: "Publish", glyph: "↗", state: "idle" },
  { id: "Sentinel", glyph: "◈", state: "watch" },
] as const;

const PROJECTS = [
  { id: "KRAS-G12D", count: 14, active: true },
  { id: "EGFR-T790M", count: 6 },
  { id: "MYC-MAX", count: 3 },
];

export default function DashboardPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState<string>("Console");
  const [now, setNow] = useState<string>("");

  useEffect(() => {
    if (!isUnlocked()) {
      router.replace("/access");
      return;
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const t = d.toISOString().split("T")[1].split(".")[0];
      setNow(`${d.toISOString().split("T")[0]} · ${t} UTC`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  function signOut() {
    lock();
    router.replace("/access");
  }

  if (!ready) {
    return (
      <main className="theme-dark min-h-screen flex items-center justify-center">
        <div className="text-mono-sm text-[var(--color-muted)] flex items-center gap-2">
          <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] pulse-dot" />
          verifying access…
        </div>
      </main>
    );
  }

  return (
    <main className="theme-dark min-h-screen flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-[var(--z-nav)] border-b border-[var(--color-line)] bg-[rgba(14,15,18,0.85)] backdrop-blur-xl">
        <div className="flex items-center h-14 px-4 md:px-6 gap-4">
          <Link href="/" data-cursor="link" className="flex items-center gap-2.5 shrink-0">
            <Logomark />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="text-[14px] font-medium tracking-tight">HELIX</span>
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[var(--color-muted)]">
                console /v1.0
              </span>
            </span>
          </Link>
          <span className="hidden md:block h-5 w-px bg-[var(--color-line-strong)]" />
          <div className="hidden md:flex items-center gap-2 text-mono-sm text-[var(--color-muted)]">
            <span className="text-[var(--color-accent-2)]">[P1]</span>
            <span>project</span>
            <span className="px-2 py-0.5 rounded bg-[rgba(41,86,248,0.12)] text-[var(--color-accent-2)] font-mono">
              KRAS-G12D
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3 md:gap-5 text-mono-sm text-[var(--color-muted)]">
            <span className="hidden md:flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
              14,328 sims · 99.94%
            </span>
            <span className="hidden lg:inline">{now || "—"}</span>
            <button
              onClick={signOut}
              data-cursor="link"
              className="inline-flex items-center gap-2 h-8 px-3 rounded-full border border-[var(--color-line-strong)] hover:border-[var(--color-warn)] hover:text-[var(--color-warn)] transition-colors"
            >
              <span className="block w-1 h-1 rounded-full bg-current" />
              sign out
            </button>
          </div>
        </div>
        <ProgressLine />
      </header>

      {/* Body */}
      <div className="flex-1 grid grid-cols-12">
        {/* Sidebar */}
        <aside className="hidden md:flex col-span-3 lg:col-span-2 border-r border-[var(--color-line)] bg-[#0A0B0F] flex-col p-3 gap-1 min-h-[calc(100vh-3.5rem)]">
          <div className="text-mono-sm text-[var(--color-muted)] px-2 pt-2 pb-1">
            PROJECTS
          </div>
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              data-cursor="link"
              className={`flex items-center justify-between px-2 py-1.5 rounded-md text-[12.5px] transition-colors ${
                p.active
                  ? "bg-[rgba(242,241,237,0.04)] text-[var(--color-fg)]"
                  : "text-[var(--color-fg)]/65 hover:bg-[rgba(242,241,237,0.03)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`block w-1.5 h-1.5 rounded-full ${
                    p.active ? "bg-[var(--color-accent)]" : "bg-[var(--color-line-strong)]"
                  }`}
                />
                <span className="font-medium">{p.id}</span>
              </span>
              <span className="font-mono text-[10.5px] text-[var(--color-muted)]">
                {p.count}
              </span>
            </button>
          ))}

          <div className="mt-4 text-mono-sm text-[var(--color-muted)] px-2 py-1">
            AGENTS
          </div>
          {AGENTS.map((a) => (
            <button
              key={a.id}
              onClick={() => setActive(a.id)}
              data-cursor="link"
              className={`group flex items-center gap-2 px-2 py-1.5 rounded-md text-[12.5px] transition-colors ${
                a.id === active
                  ? "bg-[rgba(41,86,248,0.15)] text-[var(--color-accent-2)]"
                  : "text-[var(--color-fg)]/70 hover:bg-[rgba(242,241,237,0.04)]"
              }`}
            >
              <span className="font-mono text-[11px] w-3 text-center text-[var(--color-muted)] group-hover:text-current">
                {a.glyph}
              </span>
              <span>{a.id}</span>
              <span
                className={`ml-auto block w-1.5 h-1.5 rounded-full ${
                  a.state === "running"
                    ? "bg-[var(--color-good)] pulse-dot"
                    : a.state === "watch"
                    ? "bg-[var(--color-amber)]"
                    : a.state === "active"
                    ? "bg-[var(--color-accent)]"
                    : "bg-[var(--color-line-strong)]"
                }`}
              />
            </button>
          ))}

          <div className="mt-auto px-2 pt-4 pb-2 border-t border-[var(--color-line)] text-mono-sm text-[var(--color-muted)]">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
              cluster healthy
            </div>
            <div className="font-mono text-[10.5px] leading-relaxed">
              <div>node 7A · 99.94%</div>
              <div>gpu pool · 312/320</div>
              <div>queue · 18 sims</div>
            </div>
          </div>
        </aside>

        {/* Main grid */}
        <section className="col-span-12 md:col-span-9 lg:col-span-10 p-4 md:p-6 grid grid-cols-12 gap-4 md:gap-5">
          {/* Welcome strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-12 flex flex-wrap items-end justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-3 text-eyebrow">
                <span className="text-[var(--color-accent-2)]">[01]</span>
                <span>Mission control · KRAS-G12D</span>
                <span className="block h-px w-12 bg-[var(--color-line-strong)]" />
                <span>now</span>
              </div>
              <h1 className="mt-3 text-[32px] md:text-[44px] leading-[0.95] tracking-tight font-medium">
                Designing binders that{" "}
                <span className="serif-italic text-[var(--color-accent-2)]">
                  outrun
                </span>{" "}
                G12D.
              </h1>
            </div>
            <div className="flex items-center gap-2 text-mono-sm">
              <button
                data-cursor="link"
                className="h-9 px-4 rounded-full border border-[var(--color-line-strong)] hover:border-[var(--color-accent-2)] transition-colors"
              >
                + new candidate
              </button>
              <button
                data-cursor="link"
                className="h-9 px-4 rounded-full bg-[var(--color-fg)] text-[var(--color-ink)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
              >
                run sweep
              </button>
            </div>
          </motion.div>

          {/* KPI row */}
          <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            <Kpi
              eyebrow="K1"
              label="Active candidates"
              value="142"
              delta="+18 / 24h"
              good
            />
            <Kpi
              eyebrow="K2"
              label="Best ΔG"
              value="-9.21"
              unit="kcal/mol"
              delta="HX-9221.b3"
            />
            <Kpi
              eyebrow="K3"
              label="Sims today"
              value="2,418"
              delta="+612 / hr"
              good
            />
            <Kpi
              eyebrow="K4"
              label="On-chain mints"
              value="48"
              unit="last 24h"
              delta="+12"
              good
            />
          </div>

          {/* Candidate viewer */}
          <Card eyebrow="C1" title="Candidate · HX-9221.b3" tag="refining" tagState="good" className="col-span-12 lg:col-span-7">
            <div className="relative h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(41,86,248,0.18),transparent_60%)] rounded-lg overflow-hidden">
              <ProteinPointCloud />
              <div className="absolute top-3 left-3 flex flex-col gap-2 text-mono-sm">
                <span className="px-2 py-1 rounded bg-[rgba(20,21,26,0.7)] backdrop-blur border border-[var(--color-line)] text-[var(--color-fg)]/85">
                  α-fold · 100ns
                </span>
                <span className="px-2 py-1 rounded bg-[rgba(20,21,26,0.7)] backdrop-blur border border-[var(--color-line)] text-[var(--color-good)]">
                  RMSD 1.4 Å
                </span>
              </div>
              <div className="absolute bottom-3 right-3 text-mono-sm text-[var(--color-muted)] flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
                live render
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-mono-sm">
              <span className="text-[var(--color-muted)]">FRAME</span>
              <span>0832 / 4096</span>
              <div className="ml-3 flex-1 h-1 rounded-full bg-[var(--color-line)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "20.3%" }}
                  transition={{ duration: 1.6, delay: 0.3 }}
                  className="h-full bg-[var(--color-accent)]"
                />
              </div>
              <span className="text-[var(--color-muted)] tabular-nums">
                204 ms / step
              </span>
            </div>
          </Card>

          {/* Right column small cards */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 md:gap-5">
            <Card eyebrow="C2" title="Target" tag="P01116" tagState="info">
              <div className="grid grid-cols-2 gap-3 mt-1">
                <Field k="UniProt" v="P01116" />
                <Field k="Mutation" v="G12D" tone="warn" />
                <Field k="Family" v="RAS" />
                <Field k="MW" v="21.7 kDa" />
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--color-line)]">
                <div className="text-mono-sm text-[var(--color-muted)] mb-2">
                  Constraints
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["druggable", "no off-target HK", "MW < 18 kDa", "soluble"].map(
                    (c) => (
                      <span
                        key={c}
                        className="px-2 py-1 rounded text-[11px] border border-[var(--color-good)]/40 bg-[rgba(54,214,162,0.06)] text-[var(--color-good)]"
                      >
                        ✓ {c}
                      </span>
                    )
                  )}
                </div>
              </div>
            </Card>

            <Card eyebrow="C3" title="Critic suggestions" tag="3 new" tagState="accent" highlight>
              <div className="font-mono text-[12px] space-y-1.5 mt-1 leading-relaxed">
                {[
                  "swap.residue(F47, Y)",
                  "rotate.helix(α2, +12°)",
                  "add.disulfide(C18, C32)",
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.18 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[var(--color-muted)]">→</span>
                    <span className="text-[var(--color-fg)]">{line}</span>
                    <span className="ml-auto text-[10.5px] text-[var(--color-muted)]">
                      +{[8, 5, 12][i]}%
                    </span>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Energy chart */}
          <Card eyebrow="C4" title="Free energy · 100ns trajectory" tag="ΔG -9.21" tagState="good" className="col-span-12 lg:col-span-7">
            <EnergyChart />
            <div className="mt-3 grid grid-cols-3 gap-3 text-mono-sm">
              {[
                { k: "min", v: "-9.84" },
                { k: "mean", v: "-7.62" },
                { k: "stdev", v: "0.41" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="flex items-center justify-between border border-[var(--color-line)] rounded-md px-3 py-2"
                >
                  <span className="text-[var(--color-muted)]">{s.k}</span>
                  <span className="font-mono">{s.v}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Docking pose */}
          <Card eyebrow="C5" title="Top binding pose" tag="rank #1" tagState="accent" className="col-span-12 lg:col-span-5">
            <DockingViz />
            <div className="mt-3 space-y-1.5">
              {[
                { i: 1, v: "-9.21", best: true },
                { i: 2, v: "-8.74" },
                { i: 3, v: "-8.43" },
              ].map((row) => (
                <div
                  key={row.i}
                  className={`flex items-center justify-between text-[12.5px] py-1 px-2 rounded ${
                    row.best
                      ? "bg-[rgba(41,86,248,0.08)] text-[var(--color-accent-2)]"
                      : ""
                  }`}
                >
                  <span className="font-mono">#{row.i}</span>
                  <span className="font-mono">{row.v} kcal/mol</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Score table */}
          <Card eyebrow="C6" title="Candidate ranker" tag="142 active" tagState="info" className="col-span-12 lg:col-span-7">
            <div className="-mx-1">
              <div className="grid grid-cols-12 px-3 h-8 items-center text-mono-sm text-[var(--color-muted)] border-b border-[var(--color-line)]">
                <div className="col-span-3">id</div>
                <div className="col-span-2">affinity</div>
                <div className="col-span-2">off-target</div>
                <div className="col-span-2">stability</div>
                <div className="col-span-2">MW</div>
                <div className="col-span-1 text-right">ok</div>
              </div>
              {[
                { id: "HX-9221.b3", aff: 92, off: 31, st: 88, mw: 14.2, ok: true },
                { id: "HX-9221.b2", aff: 86, off: 18, st: 71, mw: 16.8, ok: true },
                { id: "HX-9221.b1", aff: 64, off: 52, st: 64, mw: 19.1, ok: false },
                { id: "HX-9220.a4", aff: 73, off: 26, st: 79, mw: 17.4, ok: true },
                { id: "HX-9220.a3", aff: 41, off: 71, st: 38, mw: 22.8, ok: false },
              ].map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-12 px-3 h-11 items-center border-b border-[var(--color-line)] text-[12.5px] hover:bg-[rgba(242,241,237,0.02)]"
                >
                  <div className="col-span-3 font-mono flex items-center gap-2">
                    <span
                      className={`block w-1.5 h-1.5 rounded-full ${
                        r.ok
                          ? "bg-[var(--color-good)]"
                          : "bg-[var(--color-warn)]"
                      }`}
                    />
                    {r.id}
                  </div>
                  <Bar v={r.aff} className="col-span-2" />
                  <Bar v={r.off} invert className="col-span-2" />
                  <Bar v={r.st} className="col-span-2" />
                  <div className="col-span-2 font-mono">{r.mw.toFixed(1)}</div>
                  <div className="col-span-1 text-right font-mono">
                    {r.ok ? "✓" : "✕"}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Agent loop */}
          <Card eyebrow="C7" title="Agent loop" tag="live" tagState="good" className="col-span-12 lg:col-span-5">
            <LoopGraph />
          </Card>

          {/* On-chain provenance */}
          <Card eyebrow="C8" title="On-chain provenance · arweave" tag="48 mints / 24h" tagState="info" className="col-span-12">
            <div className="space-y-2">
              {[
                { h: "0xa1f2…d419", v: "candidate / HX-9221.b3", t: "3m ago", who: "Designer" },
                { h: "0x88c1…7a02", v: "sim:run · 100ns md", t: "12m ago", who: "Simulator" },
                { h: "0x4d92…6e1f", v: "critic:report v3", t: "26m ago", who: "Critic" },
                { h: "0xbb04…c0a7", v: "designer:scaffold seed", t: "44m ago", who: "Designer" },
                { h: "0xfa20…1b3c", v: "score:update", t: "1h ago", who: "Score" },
              ].map((r, i) => (
                <motion.div
                  key={r.h}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-3 p-3 border border-[var(--color-line)] rounded-lg hover:border-[var(--color-line-strong)] transition-colors"
                >
                  <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot shrink-0" />
                  <span className="font-mono text-[11px] text-[var(--color-muted)] shrink-0 w-[110px]">
                    {r.h}
                  </span>
                  <span className="text-[12.5px] flex-1 truncate">{r.v}</span>
                  <span className="text-mono-sm text-[var(--color-accent-2)] hidden md:inline">
                    {r.who}
                  </span>
                  <span className="text-mono-sm text-[var(--color-muted)] shrink-0">
                    {r.t}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Footer */}
          <div className="col-span-12 mt-2 pt-5 border-t border-[var(--color-line)] flex flex-wrap items-center justify-between gap-3 text-mono-sm text-[var(--color-muted)]">
            <span className="flex items-center gap-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
              <ScrambleText text="HELIX CONSOLE / v1.0.4" trigger="hover" />
            </span>
            <span>active agent · {active}</span>
            <span>mainnet · block #18,442,930 · gas 0.6 gwei</span>
          </div>
        </section>
      </div>
    </main>
  );
}

/* ============= UI primitives (kept local — match marketing style) ============= */

function Card({
  eyebrow,
  title,
  tag,
  tagState = "info",
  highlight,
  className,
  children,
}: {
  eyebrow: string;
  title: string;
  tag?: string;
  tagState?: "good" | "warn" | "info" | "accent";
  highlight?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const tagColor =
    tagState === "good"
      ? "text-[var(--color-good)]"
      : tagState === "warn"
      ? "text-[var(--color-warn)]"
      : tagState === "accent"
      ? "text-[var(--color-accent-2)]"
      : "text-[var(--color-muted)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl border ${
        highlight
          ? "border-[var(--color-accent)]/40 bg-[rgba(41,86,248,0.05)]"
          : "border-[var(--color-line)] bg-[#0B0C10]"
      } p-4 md:p-5 ${className ?? ""}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-mono-sm">
          <span className="text-[var(--color-accent-2)]">[{eyebrow}]</span>
          <span className="block w-3 h-px bg-[var(--color-line-strong)]" />
          <span className="text-[var(--color-fg)]/85 font-medium">{title}</span>
        </div>
        {tag && <span className={`text-mono-sm ${tagColor}`}>· {tag}</span>}
      </div>
      {children}
    </motion.div>
  );
}

function Kpi({
  eyebrow,
  label,
  value,
  unit,
  delta,
  good,
}: {
  eyebrow: string;
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  good?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-[var(--color-line)] bg-[#0B0C10] p-4"
    >
      <div className="flex items-center gap-2 text-mono-sm text-[var(--color-muted)]">
        <span className="text-[var(--color-accent-2)]">[{eyebrow}]</span>
        <span>{label}</span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-[28px] md:text-[34px] font-medium tabular-nums tracking-tight">
          {value}
        </span>
        {unit && (
          <span className="text-mono-sm text-[var(--color-muted)]">{unit}</span>
        )}
      </div>
      {delta && (
        <div
          className={`mt-1 text-mono-sm ${
            good ? "text-[var(--color-good)]" : "text-[var(--color-muted)]"
          }`}
        >
          {good ? "▲ " : ""}
          {delta}
        </div>
      )}
    </motion.div>
  );
}

function Field({
  k,
  v,
  tone,
}: {
  k: string;
  v: string;
  tone?: "warn" | "info";
}) {
  return (
    <div className="flex flex-col">
      <span className="text-mono-sm text-[var(--color-muted)]">{k}</span>
      <span
        className={`font-mono text-[13px] mt-0.5 ${
          tone === "warn" ? "text-[var(--color-rose)]" : ""
        }`}
      >
        {v}
      </span>
    </div>
  );
}

function Bar({
  v,
  invert,
  className,
}: {
  v: number;
  invert?: boolean;
  className?: string;
}) {
  const ok = invert ? v < 40 : v >= 70;
  return (
    <div className={`flex items-center gap-2 pr-3 ${className ?? ""}`}>
      <div className="relative flex-1 h-1 rounded-full bg-[var(--color-line)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${v}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
          style={{ background: ok ? "var(--color-accent)" : "var(--color-warn)" }}
        />
      </div>
      <span className="font-mono text-[10.5px] tabular-nums w-7 text-right">
        {v.toString().padStart(2, "0")}
      </span>
    </div>
  );
}

function ProgressLine() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 1, 1, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformOrigin: "left" }}
      className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)]"
    />
  );
}

function Logomark() {
  return (
    <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-md border border-[var(--color-line-strong)] overflow-hidden bg-[rgba(20,21,26,0.6)]">
      <svg viewBox="0 0 24 24" className="w-4 h-4">
        <defs>
          <linearGradient id="dash-lm-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6A8AFF" />
            <stop offset="100%" stopColor="#2956F8" />
          </linearGradient>
        </defs>
        <path
          d="M5 4 Q12 12 5 20 M19 4 Q12 12 19 20"
          stroke="url(#dash-lm-grad)"
          fill="none"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="6" r="1.4" fill="#6A8AFF" />
        <circle cx="12" cy="12" r="1.4" fill="#F2F1ED" />
        <circle cx="12" cy="18" r="1.4" fill="#2956F8" />
      </svg>
    </span>
  );
}

/* ============= Visualizations (port of MockUI internals) ============= */

function ProteinPointCloud() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let id = 0;
    const tick = () => {
      setT((v) => v + 0.012);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);
  const pts = Array.from({ length: 110 });
  return (
    <svg viewBox="-100 -80 200 160" className="w-full h-full">
      {pts.map((_, i) => {
        const phi = (i / pts.length) * Math.PI * 9 + t;
        const r = 30 + Math.sin(i * 0.3 + t) * 32;
        const x = Math.cos(phi) * r;
        const y = Math.sin(phi * 1.6) * r * 0.55;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 9 === 0 ? 2 : 1.2}
            fill={i % 9 === 0 ? "#6A8AFF" : "#F2F1ED"}
            opacity={0.4 + Math.sin(i + t) * 0.3}
          />
        );
      })}
      {pts.slice(0, -1).map((_, i) => {
        const phi = (i / pts.length) * Math.PI * 9 + t;
        const r = 30 + Math.sin(i * 0.3 + t) * 32;
        const x = Math.cos(phi) * r;
        const y = Math.sin(phi * 1.6) * r * 0.55;
        const phi2 = ((i + 1) / pts.length) * Math.PI * 9 + t;
        const r2 = 30 + Math.sin((i + 1) * 0.3 + t) * 32;
        const x2 = Math.cos(phi2) * r2;
        const y2 = Math.sin(phi2 * 1.6) * r2 * 0.55;
        return (
          <line
            key={`l-${i}`}
            x1={x}
            y1={y}
            x2={x2}
            y2={y2}
            stroke="#F2F1ED"
            strokeOpacity="0.16"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
}

function EnergyChart() {
  const points = Array.from({ length: 80 });
  const path = points
    .map((_, i) => {
      const x = (i / 79) * 600;
      const y =
        50 +
        Math.sin(i * 0.18) * 14 +
        Math.cos(i * 0.42) * 20 +
        (i / 79) * -25;
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 600 110" className="w-full h-32" preserveAspectRatio="none">
      <defs>
        <linearGradient id="dash-ec-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2956F8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2956F8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          x2="600"
          y1={(i + 1) * 16}
          y2={(i + 1) * 16}
          stroke="#F2F1ED"
          strokeOpacity="0.04"
        />
      ))}
      <motion.path
        d={path + " L 600 110 L 0 110 Z"}
        fill="url(#dash-ec-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      />
      <motion.path
        d={path}
        stroke="#6A8AFF"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
    </svg>
  );
}

function DockingViz() {
  return (
    <svg viewBox="-100 -60 200 120" className="w-full h-[200px]">
      <defs>
        <radialGradient id="dash-dock-glow">
          <stop offset="0%" stopColor="#2956F8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2956F8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="0" cy="0" r="80" fill="url(#dash-dock-glow)" />
      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2;
        const r = 50 + Math.sin(a * 4) * 8;
        return (
          <motion.circle
            key={i}
            cx={Math.cos(a) * r}
            cy={Math.sin(a) * r * 0.6}
            r="1.5"
            fill="#F2F1ED"
            opacity="0.7"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.01, duration: 0.4 }}
            style={{
              transformOrigin: `${Math.cos(a) * r}px ${
                Math.sin(a) * r * 0.6
              }px`,
              transformBox: "fill-box",
            }}
          />
        );
      })}
      <motion.g
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          return (
            <circle
              key={`l-${i}`}
              cx={Math.cos(a) * 14}
              cy={Math.sin(a) * 14 * 0.7}
              r="2.2"
              fill="#6A8AFF"
            />
          );
        })}
        {Array.from({ length: 14 }).map((_, i) => {
          const a = (i / 14) * Math.PI * 2;
          const a2 = ((i + 1) / 14) * Math.PI * 2;
          return (
            <line
              key={`la-${i}`}
              x1={Math.cos(a) * 14}
              y1={Math.sin(a) * 14 * 0.7}
              x2={Math.cos(a2) * 14}
              y2={Math.sin(a2) * 14 * 0.7}
              stroke="#6A8AFF"
              strokeWidth="0.8"
            />
          );
        })}
      </motion.g>
      {[35, 90, 150, 220, 300].map((deg, i) => {
        const a = (deg * Math.PI) / 180;
        return (
          <motion.line
            key={i}
            x1={Math.cos(a) * 14}
            y1={Math.sin(a) * 14 * 0.7}
            x2={Math.cos(a) * 50}
            y2={Math.sin(a) * 50 * 0.6}
            stroke="#6A8AFF"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.0 + i * 0.1, duration: 0.6 }}
          />
        );
      })}
    </svg>
  );
}

function LoopGraph() {
  const nodes = [
    { id: "Designer", x: 14, y: 25, color: "var(--color-accent)" },
    { id: "Critic", x: 50, y: 12, color: "var(--color-amber)" },
    { id: "Simulator", x: 86, y: 25, color: "var(--color-accent-2)" },
    { id: "Scribe", x: 86, y: 75, color: "var(--color-good)" },
    { id: "Sentinel", x: 50, y: 88, color: "var(--color-warn)" },
    { id: "Designer ↻", x: 14, y: 75, color: "var(--color-accent)" },
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-full h-[260px]">
      {nodes.map((n, i) => {
        if (i === nodes.length - 1) return null;
        const next = nodes[i + 1];
        return (
          <motion.path
            key={`p-${i}`}
            d={`M ${n.x} ${n.y} Q ${(n.x + next.x) / 2} ${
              (n.y + next.y) / 2 + (i % 2 ? -10 : 10)
            } ${next.x} ${next.y}`}
            fill="none"
            stroke="#6A8AFF"
            strokeWidth="0.4"
            strokeDasharray="1 1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.18, duration: 0.7 }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <motion.circle
            cx={n.x}
            cy={n.y}
            r="2.4"
            fill={n.color}
            initial={{ scale: 0 }}
            whileInView={{ scale: [0, 1.4, 1] }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.15, duration: 0.4 }}
            style={{
              transformOrigin: `${n.x}px ${n.y}px`,
              transformBox: "fill-box",
            }}
          />
          <text
            x={n.x}
            y={n.y - 4}
            textAnchor="middle"
            className="font-mono"
            style={{ fontSize: 2.4, fill: "#F2F1ED", letterSpacing: 0.2 }}
          >
            {n.id}
          </text>
        </g>
      ))}
    </svg>
  );
}
