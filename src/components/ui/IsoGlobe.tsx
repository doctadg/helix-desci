"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  size?: number;
  className?: string;
  stroke?: string;
  variant?: "wire" | "ghost";
  satellites?: boolean;
  surfacePoints?: boolean;
}

/* Deterministic point distribution on the unit sphere (Fibonacci) */
function fibSphere(n: number): { x: number; y: number; z: number }[] {
  const out: { x: number; y: number; z: number }[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = phi * i;
    out.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }
  return out;
}

export function IsoGlobe({
  size = 130,
  className,
  stroke,
  variant = "wire",
  satellites = true,
  surfacePoints = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const t = useMotionValue(0);

  useEffect(() => {
    let raf = 0;
    let ts = 0;
    const tick = () => {
      ts += 0.0028;
      t.set(ts);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [t]);

  const rotation = useTransform(t, (v) => (v * 60) % 360);
  const r = size / 2;

  const parallels = [-0.7, -0.4, 0, 0.4, 0.7];
  const meridianCount = 8;
  const points = useMemo(() => fibSphere(72), []);

  return (
    <div ref={ref} className={cn("relative inline-block", className)} style={{ width: size, height: size }}>
      <svg viewBox={`-${r + 8} -${r + 8} ${2 * r + 16} ${2 * r + 16}`} className="w-full h-full">
        <defs>
          <radialGradient id="globe-glow">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
            <stop offset="65%" stopColor="currentColor" stopOpacity="0.04" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="globe-fade" cx="50%" cy="50%" r="55%">
            <stop offset="60%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        <circle cx="0" cy="0" r={r + 4} fill="url(#globe-glow)" />

        {/* Parallels */}
        {parallels.map((p, i) => {
          const ry = r * Math.sqrt(1 - p * p);
          const rx = ry * 0.32;
          const cy = p * r;
          const isEquator = p === 0;
          return (
            <g key={`par-${i}`}>
              <motion.ellipse
                cx={0}
                cy={cy}
                rx={ry}
                ry={rx}
                fill="none"
                stroke={stroke ?? "currentColor"}
                strokeOpacity={isEquator ? 0.7 : 0.35}
                strokeWidth={isEquator ? 1.1 : 0.8}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 1.5, delay: 0.1 + i * 0.07, ease: [0.65, 0, 0.35, 1] }}
              />
              {isEquator && (
                <>
                  <text
                    x={ry + 6}
                    y={cy + 2}
                    style={{
                      fontSize: 6.5,
                      fill: "currentColor",
                      fontFamily: "monospace",
                      letterSpacing: 0.5,
                      opacity: 0.6,
                    }}
                  >
                    EQ · 0°
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Pole markers */}
        <text
          x={0}
          y={-r - 4}
          textAnchor="middle"
          style={{
            fontSize: 6.5,
            fill: "currentColor",
            fontFamily: "monospace",
            letterSpacing: 0.6,
            opacity: 0.6,
          }}
        >
          + N
        </text>
        <text
          x={0}
          y={r + 10}
          textAnchor="middle"
          style={{
            fontSize: 6.5,
            fill: "currentColor",
            fontFamily: "monospace",
            letterSpacing: 0.6,
            opacity: 0.6,
          }}
        >
          – S
        </text>

        {/* Outer circle */}
        <motion.circle
          cx="0"
          cy="0"
          r={r}
          fill="none"
          stroke={stroke ?? "currentColor"}
          strokeOpacity={0.6}
          strokeWidth="1.1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        />

        {/* Edge fade ring */}
        <circle cx="0" cy="0" r={r} fill="url(#globe-fade)" />

        {/* Rotating meridians */}
        <motion.g style={{ rotate: rotation, transformOrigin: "center" }}>
          {Array.from({ length: meridianCount }).map((_, i) => {
            const angle = (i / meridianCount) * Math.PI;
            const a = Math.cos(angle);
            return (
              <motion.ellipse
                key={`mer-${i}`}
                cx={0}
                cy={0}
                rx={Math.abs(a) * r}
                ry={r}
                fill="none"
                stroke={stroke ?? "currentColor"}
                strokeOpacity={variant === "wire" ? 0.32 : 0.18}
                strokeWidth="0.9"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{
                  duration: 1.4,
                  delay: 0.4 + i * 0.05,
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
            );
          })}
        </motion.g>

        {/* Surface data points (rotating) */}
        {surfacePoints && <SurfaceDots points={points} r={r} t={t} />}

        {/* Crosshair center */}
        <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke={stroke ?? "currentColor"} strokeOpacity="0.45" strokeWidth="0.8" />
        <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke={stroke ?? "currentColor"} strokeOpacity="0.45" strokeWidth="0.8" />

        {/* Orbital satellite */}
        {satellites && <OrbitSatellite t={t} r={r * 1.18} stroke={stroke ?? "currentColor"} />}
      </svg>
    </div>
  );
}

function SurfaceDots({
  points,
  r,
  t,
}: {
  points: { x: number; y: number; z: number }[];
  r: number;
  t: import("framer-motion").MotionValue<number>;
}) {
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const ts = t.get();
      const cs = Math.cos(ts * 0.6);
      const sn = Math.sin(ts * 0.6);
      const g = groupRef.current;
      if (g) {
        const children = g.children;
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          // Rotate around Y axis
          const x = p.x * cs - p.z * sn;
          const z = p.x * sn + p.z * cs;
          const visible = z > -0.05;
          const dot = children[i] as SVGCircleElement;
          if (!dot) continue;
          dot.setAttribute("cx", String(x * r));
          dot.setAttribute("cy", String(p.y * r));
          // Depth-based opacity
          const op = visible ? 0.25 + 0.55 * Math.max(0, z) : 0;
          dot.setAttribute("opacity", String(op));
          dot.setAttribute("r", visible ? String(0.6 + Math.max(0, z) * 0.8) : "0");
        }
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [points, r, t]);

  return (
    <g ref={groupRef}>
      {points.map((p, i) => (
        <circle
          key={i}
          r={1}
          fill={i % 11 === 0 ? "var(--color-accent)" : "currentColor"}
          opacity={0.5}
        />
      ))}
    </g>
  );
}

function OrbitSatellite({
  t,
  r,
  stroke,
}: {
  t: import("framer-motion").MotionValue<number>;
  r: number;
  stroke: string;
}) {
  const cx = useTransform(t, (v) => Math.cos(v * 1.4) * r);
  const cy = useTransform(t, (v) => Math.sin(v * 1.4) * r * 0.32);

  return (
    <g>
      <motion.circle
        cx={cx}
        cy={cy}
        r="2.4"
        fill="var(--color-accent)"
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r="5"
        fill="none"
        stroke={stroke}
        strokeOpacity="0.5"
      />
    </g>
  );
}
