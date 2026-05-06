"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type MockVariant = "design" | "fold" | "dock" | "score" | "iterate" | "publish";

interface Props {
  variant: MockVariant;
  className?: string;
}

export function MockUI({ variant, className }: Props) {
  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border border-[var(--color-line-strong)] bg-[#0E1015] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <ChromeBar variant={variant} />
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={variant}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {variant === "design" && <DesignUI />}
            {variant === "fold" && <FoldUI />}
            {variant === "dock" && <DockUI />}
            {variant === "score" && <ScoreUI />}
            {variant === "iterate" && <IterateUI />}
            {variant === "publish" && <PublishUI />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ChromeBar({ variant }: { variant: string }) {
  return (
    <div className="flex items-center gap-3 h-9 px-4 border-b border-[var(--color-line)] bg-[#0B0C10]">
      <span className="flex items-center gap-1.5">
        <span className="block w-2.5 h-2.5 rounded-full bg-[#3a3c43]" />
        <span className="block w-2.5 h-2.5 rounded-full bg-[#3a3c43]" />
        <span className="block w-2.5 h-2.5 rounded-full bg-[#3a3c43]" />
      </span>
      <span className="font-mono text-[10.5px] text-[var(--color-muted)] tracking-widest uppercase">
        helix · {variant}
      </span>
      <span className="ml-auto flex items-center gap-3 text-mono-sm text-[var(--color-muted)]">
        <span className="hidden sm:inline">⌘K</span>
        <span className="hidden sm:inline">●</span>
        <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
      </span>
    </div>
  );
}

/* ============= DESIGN ============= */
function DesignUI() {
  return (
    <div className="grid grid-cols-12 min-h-[440px]">
      <SidebarConsole />
      <div className="col-span-9 p-5 grid grid-cols-12 gap-4">
        <div className="col-span-7 rounded-xl border border-[var(--color-line)] bg-[#0B0C10] overflow-hidden">
          <div className="flex items-center justify-between px-3 h-8 border-b border-[var(--color-line)] text-mono-sm text-[var(--color-muted)]">
            <span>candidate · HX-9221.b3</span>
            <span className="text-[var(--color-good)]">refining</span>
          </div>
          <div className="relative h-[260px] bg-[radial-gradient(ellipse_at_center,rgba(41,86,248,0.18),transparent_60%)]">
            <ProteinPointCloud />
          </div>
          <div className="flex items-center gap-2 px-3 h-8 border-t border-[var(--color-line)] text-mono-sm">
            <span className="text-[var(--color-muted)]">FRAME</span>
            <span>0832 / 4096</span>
            <div className="ml-3 flex-1 h-1 rounded-full bg-[var(--color-line)] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "20%" }}
                transition={{ duration: 1.6, delay: 0.4 }}
                className="h-full bg-[var(--color-accent)]"
              />
            </div>
            <span className="text-[var(--color-muted)] tabular-nums">204 ms / step</span>
          </div>
        </div>
        <div className="col-span-5 flex flex-col gap-3">
          <SmallCard title="Target">
            <div className="font-mono text-[12px] mt-1">
              <span className="text-[var(--color-muted)]">UniProt</span>{" "}
              <span>P01116</span>
            </div>
            <div className="font-mono text-[12px] mt-0.5">
              <span className="text-[var(--color-muted)]">Mut</span>{" "}
              <span className="text-[var(--color-rose)]">G12D</span>
            </div>
          </SmallCard>
          <SmallCard title="Constraints">
            {["druggable", "no off-target HK", "MW < 18 kDa"].map((c) => (
              <div
                key={c}
                className="flex items-center gap-2 text-[12px] mt-1.5"
              >
                <span className="block w-3 h-3 rounded-full border border-[var(--color-good)] flex items-center justify-center">
                  <span className="block w-1 h-1 rounded-full bg-[var(--color-good)]" />
                </span>
                {c}
              </div>
            ))}
          </SmallCard>
          <SmallCard title="Suggestions" highlight>
            <div className="font-mono text-[11px] space-y-1 mt-1 leading-relaxed">
              {[
                "swap.residue(F47, Y)",
                "rotate.helix(α2, +12°)",
                "add.disulfide(C18,C32)",
              ].map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="text-[var(--color-fg)]"
                >
                  <span className="text-[var(--color-muted)]">→ </span>
                  {line}
                </motion.div>
              ))}
            </div>
          </SmallCard>
        </div>
      </div>
    </div>
  );
}

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
  const pts = Array.from({ length: 90 });
  return (
    <svg viewBox="-100 -80 200 160" className="w-full h-full">
      {pts.map((_, i) => {
        const phi = (i / pts.length) * Math.PI * 9 + t;
        const r = 30 + Math.sin(i * 0.3 + t) * 30;
        const x = Math.cos(phi) * r;
        const y = Math.sin(phi * 1.6) * r * 0.55;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 9 === 0 ? 2 : 1.2}
            fill={i % 9 === 0 ? "#6A8AFF" : "#F2F1ED"}
            opacity={0.45 + Math.sin(i + t) * 0.3}
          />
        );
      })}
      {pts.slice(0, -1).map((_, i) => {
        const phi = (i / pts.length) * Math.PI * 9 + t;
        const r = 30 + Math.sin(i * 0.3 + t) * 30;
        const x = Math.cos(phi) * r;
        const y = Math.sin(phi * 1.6) * r * 0.55;
        const phi2 = ((i + 1) / pts.length) * Math.PI * 9 + t;
        const r2 = 30 + Math.sin((i + 1) * 0.3 + t) * 30;
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
            strokeOpacity="0.18"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
}

/* ============= FOLD ============= */
function FoldUI() {
  const stages = [
    { t: "0 ns", v: 4 },
    { t: "20 ns", v: 18 },
    { t: "40 ns", v: 38 },
    { t: "60 ns", v: 62 },
    { t: "80 ns", v: 84 },
    { t: "100 ns", v: 96 },
  ];
  return (
    <div className="grid grid-cols-12 min-h-[440px]">
      <SidebarConsole active="Fold" />
      <div className="col-span-9 p-5 grid grid-cols-12 gap-4">
        <div className="col-span-12 grid grid-cols-6 gap-2">
          {stages.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-lg border border-[var(--color-line)] bg-[#0B0C10] p-3"
            >
              <div className="text-mono-sm text-[var(--color-muted)] mb-2">
                {s.t}
              </div>
              <svg viewBox="-30 -25 60 50" className="w-full h-12">
                {Array.from({ length: 16 }).map((_, j) => {
                  const a = (j / 16) * Math.PI * 4 + i * 0.4;
                  const r = 6 + j * 0.6;
                  return (
                    <circle
                      key={j}
                      cx={Math.cos(a) * r}
                      cy={Math.sin(a) * r * 0.6}
                      r={1.1}
                      fill={j === 0 || j === 15 ? "#6A8AFF" : "#F2F1ED"}
                    />
                  );
                })}
              </svg>
              <div className="mt-2 h-1 rounded-full bg-[var(--color-line)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.v}%` }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.7 }}
                  className="h-full bg-[var(--color-accent)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="col-span-12 rounded-xl border border-[var(--color-line)] bg-[#0B0C10] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-mono-sm text-[var(--color-muted)]">
              FREE ENERGY · kcal/mol
            </div>
            <div className="text-mono-sm text-[var(--color-good)]">
              ΔG = -9.21 ± 0.4
            </div>
          </div>
          <EnergyChart />
        </div>
      </div>
    </div>
  );
}

function EnergyChart() {
  const points = Array.from({ length: 64 });
  const path =
    points
      .map((_, i) => {
        const x = (i / 63) * 600;
        const y =
          50 +
          Math.sin(i * 0.18) * 14 +
          Math.cos(i * 0.42) * 20 +
          (i / 63) * -25;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  return (
    <svg viewBox="0 0 600 100" className="w-full h-24" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ec-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2956F8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2956F8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          x2="600"
          y1={(i + 1) * 14}
          y2={(i + 1) * 14}
          stroke="#F2F1ED"
          strokeOpacity="0.04"
        />
      ))}
      <motion.path
        d={path + " L 600 100 L 0 100 Z"}
        fill="url(#ec-fill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
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

/* ============= DOCK ============= */
function DockUI() {
  return (
    <div className="grid grid-cols-12 min-h-[440px]">
      <SidebarConsole active="Dock" />
      <div className="col-span-9 p-5 grid grid-cols-12 gap-4">
        <div className="col-span-8 rounded-xl border border-[var(--color-line)] bg-[#0B0C10] p-4 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="text-mono-sm text-[var(--color-muted)]">BINDING POSE · top 3</div>
            <div className="text-mono-sm">
              <span className="text-[var(--color-good)]">●</span>{" "}
              <span>RMSD 1.4 Å</span>
            </div>
          </div>
          <DockingViz />
        </div>
        <div className="col-span-4 flex flex-col gap-3">
          <SmallCard title="Pose ranking">
            {[
              { i: 1, v: "-9.21", best: true },
              { i: 2, v: "-8.74" },
              { i: 3, v: "-8.43" },
              { i: 4, v: "-7.82" },
              { i: 5, v: "-7.21" },
            ].map((row) => (
              <div
                key={row.i}
                className={`flex items-center justify-between text-[12px] py-1 border-b border-[var(--color-line)] ${
                  row.best ? "text-[var(--color-accent-2)]" : ""
                }`}
              >
                <span className="font-mono">#{row.i}</span>
                <span className="font-mono">{row.v} kcal</span>
              </div>
            ))}
          </SmallCard>
          <SmallCard title="Off-target hits" highlight>
            <div className="text-3xl font-medium tabular-nums mt-1">02</div>
            <div className="text-mono-sm text-[var(--color-muted)] mt-1">
              of 9,821 alternates
            </div>
          </SmallCard>
        </div>
      </div>
    </div>
  );
}

function DockingViz() {
  return (
    <svg viewBox="-100 -60 200 120" className="w-full h-[260px]">
      <defs>
        <radialGradient id="dock-glow">
          <stop offset="0%" stopColor="#2956F8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#2956F8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="0" cy="0" r="80" fill="url(#dock-glow)" />
      {/* protein pocket */}
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
            style={{ transformOrigin: `${Math.cos(a) * r}px ${Math.sin(a) * r * 0.6}px`, transformBox: "fill-box" }}
          />
        );
      })}
      {/* docked ligand */}
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
      {/* bond lines */}
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

/* ============= SCORE ============= */
function ScoreUI() {
  const rows = [
    { id: "HX-9221.b3", aff: 92, off: 31, st: 88, mw: 14.2, ok: true },
    { id: "HX-9221.b2", aff: 86, off: 18, st: 71, mw: 16.8, ok: true },
    { id: "HX-9221.b1", aff: 64, off: 52, st: 64, mw: 19.1, ok: false },
    { id: "HX-9220.a4", aff: 73, off: 26, st: 79, mw: 17.4, ok: true },
    { id: "HX-9220.a3", aff: 41, off: 71, st: 38, mw: 22.8, ok: false },
    { id: "HX-9220.a2", aff: 81, off: 22, st: 84, mw: 15.6, ok: true },
  ];
  return (
    <div className="grid grid-cols-12 min-h-[440px]">
      <SidebarConsole active="Score" />
      <div className="col-span-9 p-5">
        <div className="rounded-xl border border-[var(--color-line)] bg-[#0B0C10] overflow-hidden">
          <div className="grid grid-cols-12 px-4 h-9 items-center text-mono-sm text-[var(--color-muted)] border-b border-[var(--color-line)]">
            <div className="col-span-3">candidate</div>
            <div className="col-span-2">affinity</div>
            <div className="col-span-2">off-target</div>
            <div className="col-span-2">stability</div>
            <div className="col-span-2">MW (kDa)</div>
            <div className="col-span-1 text-right">go</div>
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="grid grid-cols-12 px-4 h-12 items-center border-b border-[var(--color-line)] text-[12.5px] hover:bg-[rgba(242,241,237,0.02)]"
            >
              <div className="col-span-3 font-mono flex items-center gap-2">
                <span className={`block w-1.5 h-1.5 rounded-full ${r.ok ? "bg-[var(--color-good)]" : "bg-[var(--color-warn)]"}`} />
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
      </div>
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
    <div className={cn("flex items-center gap-2 pr-3", className)}>
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

/* ============= ITERATE ============= */
function IterateUI() {
  return (
    <div className="grid grid-cols-12 min-h-[440px]">
      <SidebarConsole active="Iterate" />
      <div className="col-span-9 p-5">
        <div className="rounded-xl border border-[var(--color-line)] bg-[#0B0C10] p-5 relative overflow-hidden">
          <div className="text-mono-sm text-[var(--color-muted)] mb-3">
            AGENT LOOP · live
          </div>
          <LoopGraph />
        </div>
      </div>
    </div>
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
    <svg viewBox="0 0 100 100" className="w-full h-[340px]">
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

/* ============= PUBLISH ============= */
function PublishUI() {
  return (
    <div className="grid grid-cols-12 min-h-[440px]">
      <SidebarConsole active="Publish" />
      <div className="col-span-9 p-5 grid grid-cols-12 gap-4">
        <div className="col-span-8 rounded-xl border border-[var(--color-line)] bg-[#0B0C10] p-4">
          <div className="text-mono-sm text-[var(--color-muted)] mb-3">
            ON-CHAIN PROVENANCE · arweave
          </div>
          <div className="space-y-2">
            {[
              { h: "0xa1f2…d419", v: "candidate / HX-9221.b3", t: "3m ago" },
              { h: "0x88c1…7a02", v: "sim:run · 100ns md", t: "12m ago" },
              { h: "0x4d92…6e1f", v: "critic:report v3", t: "26m ago" },
              { h: "0xbb04…c0a7", v: "designer:scaffold seed", t: "44m ago" },
            ].map((r, i) => (
              <motion.div
                key={r.h}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-3 border border-[var(--color-line)] rounded-lg hover:border-[var(--color-line-strong)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
                  <span className="font-mono text-[11px] text-[var(--color-muted)]">
                    {r.h}
                  </span>
                  <span className="text-[12.5px]">{r.v}</span>
                </div>
                <span className="text-mono-sm text-[var(--color-muted)]">{r.t}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-3">
          <SmallCard title="Reputation" highlight>
            <div className="text-3xl font-medium tabular-nums mt-1">+2,418</div>
            <div className="text-mono-sm text-[var(--color-muted)] mt-1">
              minted to 14 contributors
            </div>
          </SmallCard>
          <SmallCard title="DOI">
            <div className="font-mono text-[11.5px] mt-1">
              10.x.helix/HX-9221.b3
            </div>
          </SmallCard>
        </div>
      </div>
    </div>
  );
}

/* ===== Shared bits ===== */
function SidebarConsole({ active = "Design" }: { active?: string }) {
  const items = [
    "Console",
    "Designer",
    "Critic",
    "Simulator",
    "Dock",
    "Score",
    "Iterate",
    "Publish",
    "Sentinel",
  ];
  return (
    <div className="col-span-3 border-r border-[var(--color-line)] bg-[#0A0B0F] p-3 flex flex-col gap-1 min-h-full">
      <div className="text-mono-sm text-[var(--color-muted)] px-2 py-2">PROJECT</div>
      <div className="px-2 py-1.5 rounded-md bg-[rgba(242,241,237,0.04)] flex items-center gap-2 mb-2">
        <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
        <span className="text-[12px] font-medium">KRAS-G12D</span>
      </div>
      <div className="text-mono-sm text-[var(--color-muted)] px-2 py-1">AGENTS</div>
      {items.map((i) => (
        <a
          key={i}
          className={`px-2 py-1.5 rounded-md text-[12.5px] cursor-pointer ${
            i === active
              ? "bg-[rgba(41,86,248,0.15)] text-[var(--color-accent-2)]"
              : "text-[var(--color-fg)]/70 hover:bg-[rgba(242,241,237,0.04)]"
          }`}
        >
          {i}
        </a>
      ))}
      <div className="mt-auto px-2 py-2 text-mono-sm text-[var(--color-muted)] flex items-center gap-2">
        <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-good)] pulse-dot" />
        14k sims · 99.94%
      </div>
    </div>
  );
}

function SmallCard({
  title,
  children,
  highlight,
}: {
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        highlight
          ? "border-[var(--color-accent)] bg-[rgba(41,86,248,0.06)]"
          : "border-[var(--color-line)] bg-[#0B0C10]"
      }`}
    >
      <div className="text-mono-sm text-[var(--color-muted)]">{title}</div>
      {children}
    </div>
  );
}
