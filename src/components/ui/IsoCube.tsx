"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useId, useRef } from "react";
import { cn } from "@/lib/utils";

/* === Isometric geometry helpers === */
const COS30 = Math.cos(Math.PI / 6); // ~0.866
const SIN30 = 0.5;

function cubeVerts(s: number) {
  const x = s * COS30;
  const y = s * SIN30;
  const TF = { x: 0, y: 0 };
  const TR = { x: x, y: -y };
  const TB = { x: 0, y: -2 * y };
  const TL = { x: -x, y: -y };
  const BF = { x: 0, y: s };
  const BR = { x: x, y: s - y };
  const BB = { x: 0, y: s - 2 * y };
  const BL = { x: -x, y: s - y };
  return { TF, TR, TB, TL, BF, BR, BB, BL };
}

const pathFromPoints = (pts: { x: number; y: number }[], close = true) =>
  pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(" ") +
  (close ? " Z" : "");

export type IsoGlyph = "none" | "helix" | "atom" | "node" | "wave" | "ring" | "cross";

interface IsoCubeProps {
  size: number;
  variant?: "solid" | "wireframe" | "ghost";
  color?: string;
  stroke?: string;
  label?: string;
  labelPos?: "tr" | "br" | "bl" | "tl";
  index?: string;
  className?: string;
  drawDelay?: number;
  drawDuration?: number;
  inViewMargin?: string;
  mouseTilt?: boolean;
  scrollProgress?: MotionValue<number>;
  drawAtStart?: number;
  drawAtEnd?: number;
  innerLogo?: string;
  innerGlyph?: IsoGlyph;
  innerCube?: boolean;
  topGrid?: boolean;
  scanLine?: boolean;
  lift?: number;
  rotateOnView?: boolean;
}

export function IsoCube({
  size,
  variant = "solid",
  color = "var(--color-accent)",
  stroke = "currentColor",
  label,
  labelPos = "br",
  index,
  className,
  drawDelay = 0,
  drawDuration = 1.6,
  inViewMargin = "-15% 0px",
  mouseTilt = false,
  scrollProgress,
  drawAtStart = 0,
  drawAtEnd = 0.5,
  innerLogo,
  innerGlyph = "none",
  innerCube = false,
  topGrid = false,
  scanLine = false,
  lift = 0,
  rotateOnView = false,
}: IsoCubeProps) {
  const v = cubeVerts(size);
  const pad = size * 1.2;
  const minX = -size * COS30 - pad / 2;
  const minY = -size * SIN30 * 2 - pad / 2;
  const w = size * COS30 * 2 + pad;
  const h = size * SIN30 * 2 + size + pad;

  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: inViewMargin as any });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const rotateX = useTransform(sy, (vv) => -vv * 6);
  const rotateY = useTransform(sx, (vv) => vv * 6);

  useEffect(() => {
    if (!mouseTilt) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      mx.set((e.clientX - cx) / r.width);
      my.set((e.clientY - cy) / r.height);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mouseTilt, mx, my]);

  // Face geometry
  const topFace = pathFromPoints([v.TL, v.TB, v.TR, v.TF]);
  const leftFace = pathFromPoints([v.TL, v.TF, v.BF, v.BL]);
  const rightFace = pathFromPoints([v.TF, v.TR, v.BR, v.BF]);

  // Inner offset cube (smaller iso cube inset for "internal structure" feel)
  const inset = 0.62;
  const iv = cubeVerts(size * inset);
  // Position inset cube to sit inside, slightly above bottom
  const innerOffsetY = -size * 0.18;
  const xform = (p: { x: number; y: number }) => ({ x: p.x, y: p.y + innerOffsetY });
  const ITF = xform(iv.TF), ITR = xform(iv.TR), ITB = xform(iv.TB), ITL = xform(iv.TL);
  const IBF = xform(iv.BF), IBR = xform(iv.BR), IBL = xform(iv.BL);
  const innerTop = pathFromPoints([ITL, ITB, ITR, ITF]);
  const innerLeft = pathFromPoints([ITL, ITF, IBF, IBL]);
  const innerRight = pathFromPoints([ITF, ITR, IBR, IBF]);

  const edges: [string, string][] = [
    [`tfl`, pathFromPoints([v.TL, v.TF], false)],
    [`tfr`, pathFromPoints([v.TF, v.TR], false)],
    [`tbl`, pathFromPoints([v.TL, v.TB], false)],
    [`tbr`, pathFromPoints([v.TB, v.TR], false)],
    [`vf`, pathFromPoints([v.TF, v.BF], false)],
    [`vl`, pathFromPoints([v.TL, v.BL], false)],
    [`vr`, pathFromPoints([v.TR, v.BR], false)],
    [`bfl`, pathFromPoints([v.BL, v.BF], false)],
    [`bfr`, pathFromPoints([v.BF, v.BR], false)],
  ];
  const hiddenEdges: [string, string][] = [
    [`vb`, pathFromPoints([v.TB, v.BB], false)],
    [`bbl`, pathFromPoints([v.BL, v.BB], false)],
    [`bbr`, pathFromPoints([v.BB, v.BR], false)],
  ];

  const isSolid = variant === "solid";
  const isWire = variant === "wireframe";
  const isGhost = variant === "ghost";
  const edgeCount = isSolid ? edges.length : edges.length + hiddenEdges.length;

  const labelXY = (() => {
    switch (labelPos) {
      case "tr": return v.TR;
      case "tl": return v.TL;
      case "br": return v.BR;
      case "bl": return v.BL;
    }
  })();

  return (
    <motion.div
      ref={ref}
      className={cn("relative inline-block", className)}
      style={mouseTilt ? { perspective: 800, transformStyle: "preserve-3d" } : undefined}
    >
      <motion.div
        style={mouseTilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        animate={
          rotateOnView
            ? inView
              ? { y: [-12, 0], opacity: [0, 1] }
              : { y: -12, opacity: 0 }
            : undefined
        }
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          viewBox={`${minX} ${minY - lift} ${w} ${h}`}
          width={w}
          height={h}
          style={{ overflow: "visible", display: "block" }}
        >
          <defs>
            {/* Construction-paper top: bright */}
            <linearGradient id={`gtop-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="1" />
              <stop offset="60%" stopColor={color} stopOpacity="0.95" />
              <stop offset="100%" stopColor={color} stopOpacity="0.85" />
            </linearGradient>
            {/* Left face (front-left): mid */}
            <linearGradient id={`gleft-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.78" />
              <stop offset="100%" stopColor={color} stopOpacity="0.62" />
            </linearGradient>
            {/* Right face (front-right): darkest */}
            <linearGradient id={`gright-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.55" />
              <stop offset="100%" stopColor={color} stopOpacity="0.42" />
            </linearGradient>
            {/* Highlight overlay on top */}
            <linearGradient id={`ghi-${uid}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            {/* Tiny dot grid pattern for top face */}
            <pattern
              id={`dot-${uid}`}
              width={Math.max(6, size * 0.12)}
              height={Math.max(6, size * 0.12)}
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1.2" cy="1.2" r="0.6" fill="#fff" fillOpacity="0.35" />
            </pattern>
            {/* Hatch */}
            <pattern
              id={`hatch-${uid}`}
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(60)"
            >
              <line x1="0" y1="0" x2="0" y2="6" stroke={stroke} strokeOpacity="0.18" strokeWidth="1" />
            </pattern>
            {/* Soft drop shadow */}
            <filter id={`sh-${uid}`} x="-30%" y="-10%" width="160%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dy="3" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.35" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {isSolid && (
            <g filter={`url(#sh-${uid})`}>
              {/* Faces */}
              <path d={leftFace} fill={`url(#gleft-${uid})`} />
              <path d={rightFace} fill={`url(#gright-${uid})`} />
              <path d={topFace} fill={`url(#gtop-${uid})`} />

              {/* Top dot grid (subtle) */}
              {topGrid && <path d={topFace} fill={`url(#dot-${uid})`} opacity="0.5" />}

              {/* Highlight top */}
              <path d={topFace} fill={`url(#ghi-${uid})`} />

              {/* Hatch on right face for depth */}
              <path d={rightFace} fill={`url(#hatch-${uid})`} opacity="0.6" />

              {/* Inner offset cube — gives "structural" feel */}
              {innerCube && (
                <g opacity="0.45">
                  <path d={innerLeft} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.6" />
                  <path d={innerRight} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" />
                  <path d={innerTop} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="0.6" />
                </g>
              )}

              {/* Cross "construction" line on each face — center-of-face mark */}
              <CrossMark p={midpoint(v.TL, v.TR, v.TF, v.TB)} size={size * 0.07} stroke="rgba(255,255,255,0.5)" />
              <CrossMark p={midpoint(v.TL, v.TF, v.BF, v.BL)} size={size * 0.06} stroke="rgba(255,255,255,0.35)" />
              <CrossMark p={midpoint(v.TF, v.TR, v.BR, v.BF)} size={size * 0.06} stroke="rgba(255,255,255,0.25)" />

              {/* Inner glyph on top face */}
              <Glyph
                kind={innerGlyph}
                cx={(v.TF.x + v.TB.x) / 2}
                cy={(v.TF.y + v.TB.y) / 2}
                size={size * 0.3}
                color="rgba(255,255,255,0.85)"
                inView={inView}
              />

              {/* Scan line that crosses on hover/in-view */}
              {scanLine && inView && (
                <motion.line
                  x1={v.TL.x}
                  x2={v.TR.x}
                  y1={v.TL.y}
                  y2={v.TR.y}
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.8, 0] }}
                  transition={{ duration: 1.6, delay: drawDelay + 0.4, repeat: Infinity, repeatDelay: 4 }}
                  style={{ transform: "translate(0px, 0px)" }}
                />
              )}
            </g>
          )}

          {isGhost && (
            <>
              <path d={leftFace} fill={stroke} fillOpacity="0.04" />
              <path d={rightFace} fill={stroke} fillOpacity="0.06" />
              <path d={topFace} fill={stroke} fillOpacity="0.02" />
              {/* Inner crosshair on top */}
              <CrossMark p={midpoint(v.TL, v.TR, v.TF, v.TB)} size={size * 0.08} stroke="currentColor" strokeOpacity={0.4} />
            </>
          )}

          {/* Hidden edges (dashed) for wireframe */}
          {(isWire || isGhost) &&
            hiddenEdges.map(([id, d], i) => (
              <EdgePath
                key={id}
                d={d}
                stroke={stroke}
                dashed
                index={i + edges.length}
                count={edgeCount}
                inView={inView}
                drawDelay={drawDelay}
                drawDuration={drawDuration}
                progress={scrollProgress}
                pStart={drawAtStart}
                pEnd={drawAtEnd}
              />
            ))}

          {/* Visible edges */}
          {edges.map(([id, d], i) => (
            <EdgePath
              key={id}
              d={d}
              stroke={isSolid ? "rgba(255,255,255,0.9)" : stroke}
              index={i}
              count={edgeCount}
              inView={inView}
              drawDelay={drawDelay}
              drawDuration={drawDuration}
              progress={scrollProgress}
              pStart={drawAtStart}
              pEnd={drawAtEnd}
              strokeWidth={isSolid ? 1.0 : 1.25}
              opacity={isSolid ? 0.95 : 1}
            />
          ))}

          {/* Vertex dots on visible corners (architectural feel) */}
          {(isWire || isGhost) && (
            <g>
              {[v.TF, v.TR, v.TL, v.TB, v.BF, v.BR, v.BL].map((p, i) => (
                <motion.circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="1.2"
                  fill={stroke}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 0.8 } : { opacity: 0 }}
                  transition={{ delay: drawDelay + drawDuration * 0.5 + i * 0.04 }}
                />
              ))}
            </g>
          )}

          {/* Inner logo text */}
          {innerLogo && isSolid && (
            <motion.text
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: drawDelay + 0.6, duration: 0.4 }}
              x={(v.TF.x + v.TB.x + v.TR.x + v.TL.x) / 4}
              y={(v.TF.y + v.TB.y + v.TR.y + v.TL.y) / 4 + size * 0.06}
              textAnchor="middle"
              className="font-mono"
              style={{
                fontSize: size * 0.2,
                fill: "rgba(255,255,255,0.95)",
                letterSpacing: 1,
                fontWeight: 500,
              }}
            >
              {innerLogo}
            </motion.text>
          )}
        </svg>

        {label && (
          <CornerLabel
            x={labelXY.x}
            y={labelXY.y}
            text={label}
            index={index}
            side={labelPos === "tl" || labelPos === "bl" ? "left" : "right"}
            inView={inView}
            delay={drawDelay + drawDuration * 0.6}
            origin={{ minX, minY: minY - lift, w, h }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

function midpoint(...pts: { x: number; y: number }[]) {
  const x = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const y = pts.reduce((s, p) => s + p.y, 0) / pts.length;
  return { x, y };
}

function CrossMark({
  p,
  size,
  stroke,
  strokeOpacity = 1,
}: {
  p: { x: number; y: number };
  size: number;
  stroke: string;
  strokeOpacity?: number;
}) {
  return (
    <g opacity="0.7">
      <line x1={p.x - size} y1={p.y} x2={p.x + size} y2={p.y} stroke={stroke} strokeOpacity={strokeOpacity} strokeWidth="0.6" />
      <line x1={p.x} y1={p.y - size} x2={p.x} y2={p.y + size} stroke={stroke} strokeOpacity={strokeOpacity} strokeWidth="0.6" />
    </g>
  );
}

/* === Inner glyphs — biotech-themed marks === */
function Glyph({
  kind,
  cx,
  cy,
  size,
  color,
  inView,
}: {
  kind: IsoGlyph;
  cx: number;
  cy: number;
  size: number;
  color: string;
  inView: boolean;
}) {
  if (kind === "none") return null;
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 0.85, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "fill-box" }}
    >
      {kind === "helix" && (
        <g transform={`translate(${cx}, ${cy}) scale(${size / 30})`}>
          <path
            d="M -10 -10 Q 0 0 10 -10 M -10 10 Q 0 0 10 10"
            stroke={color}
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <line x1="-7" y1="-6" x2="-7" y2="6" stroke={color} strokeWidth="0.7" />
          <line x1="0" y1="-9" x2="0" y2="9" stroke={color} strokeWidth="0.7" />
          <line x1="7" y1="-6" x2="7" y2="6" stroke={color} strokeWidth="0.7" />
        </g>
      )}
      {kind === "atom" && (
        <g transform={`translate(${cx}, ${cy}) scale(${size / 30})`}>
          <ellipse cx="0" cy="0" rx="11" ry="5" fill="none" stroke={color} strokeWidth="1" transform="rotate(30)" />
          <ellipse cx="0" cy="0" rx="11" ry="5" fill="none" stroke={color} strokeWidth="1" transform="rotate(-30)" />
          <ellipse cx="0" cy="0" rx="11" ry="5" fill="none" stroke={color} strokeWidth="1" transform="rotate(90)" />
          <circle cx="0" cy="0" r="2.4" fill={color} />
        </g>
      )}
      {kind === "node" && (
        <g transform={`translate(${cx}, ${cy}) scale(${size / 30})`}>
          <circle cx="0" cy="-7" r="2" fill={color} />
          <circle cx="-6" cy="3" r="2" fill={color} />
          <circle cx="6" cy="3" r="2" fill={color} />
          <line x1="0" y1="-7" x2="-6" y2="3" stroke={color} strokeWidth="1" />
          <line x1="0" y1="-7" x2="6" y2="3" stroke={color} strokeWidth="1" />
          <line x1="-6" y1="3" x2="6" y2="3" stroke={color} strokeWidth="1" />
        </g>
      )}
      {kind === "wave" && (
        <g transform={`translate(${cx}, ${cy}) scale(${size / 30})`}>
          <path d="M -12 0 Q -8 -8 -4 0 T 4 0 T 12 0" stroke={color} strokeWidth="1.2" fill="none" />
          <path d="M -12 4 Q -8 -2 -4 4 T 4 4 T 12 4" stroke={color} strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>
      )}
      {kind === "ring" && (
        <g transform={`translate(${cx}, ${cy}) scale(${size / 30})`}>
          <circle cx="0" cy="0" r="9" stroke={color} strokeWidth="1.2" fill="none" />
          <circle cx="0" cy="0" r="4.5" stroke={color} strokeWidth="0.8" fill="none" opacity="0.7" />
          <circle cx="0" cy="0" r="1.6" fill={color} />
        </g>
      )}
      {kind === "cross" && (
        <g transform={`translate(${cx}, ${cy}) scale(${size / 30})`}>
          <line x1="-10" y1="0" x2="10" y2="0" stroke={color} strokeWidth="1" />
          <line x1="0" y1="-10" x2="0" y2="10" stroke={color} strokeWidth="1" />
          <circle cx="0" cy="0" r="2" fill={color} />
          <circle cx="-7" cy="0" r="1" fill={color} />
          <circle cx="7" cy="0" r="1" fill={color} />
          <circle cx="0" cy="-7" r="1" fill={color} />
          <circle cx="0" cy="7" r="1" fill={color} />
        </g>
      )}
    </motion.g>
  );
}

type EdgePathBaseProps = {
  d: string;
  stroke: string;
  index: number;
  count: number;
  inView: boolean;
  drawDelay: number;
  drawDuration: number;
  progress?: MotionValue<number>;
  pStart: number;
  pEnd: number;
  dashed?: boolean;
  strokeWidth?: number;
  opacity?: number;
};

function EdgePath(props: EdgePathBaseProps) {
  if (props.progress) return <ScrollEdgePath {...props} progress={props.progress} />;
  return <InViewEdgePath {...props} />;
}

function ScrollEdgePath({
  d,
  stroke,
  index,
  count,
  pStart,
  pEnd,
  progress,
  dashed,
  strokeWidth = 1,
  opacity = 1,
}: EdgePathBaseProps & { progress: MotionValue<number> }) {
  const slot = (pEnd - pStart) / count;
  const start = pStart + slot * index;
  const end = start + slot * 1.6;
  const pathLength = useTransform(progress, [start, end], [0, 1]);
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dashed ? "3 4" : undefined}
      opacity={opacity}
      style={{ pathLength }}
    />
  );
}

function InViewEdgePath({
  d,
  stroke,
  index,
  count,
  inView,
  drawDelay,
  drawDuration,
  dashed,
  strokeWidth = 1,
  opacity = 1,
}: EdgePathBaseProps) {
  const stagger = drawDuration / count;
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dashed ? "3 4" : undefined}
      opacity={opacity}
      initial={{ pathLength: 0 }}
      animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
      transition={{
        duration: stagger * 1.6,
        delay: drawDelay + index * stagger * 0.65,
        ease: [0.65, 0, 0.35, 1],
      }}
    />
  );
}

function CornerLabel({
  x,
  y,
  text,
  index,
  side,
  inView,
  delay,
  origin,
}: {
  x: number;
  y: number;
  text: string;
  index?: string;
  side: "left" | "right";
  inView: boolean;
  delay: number;
  origin: { minX: number; minY: number; w: number; h: number };
}) {
  const left = ((x - origin.minX) / origin.w) * 100;
  const top = ((y - origin.minY) / origin.h) * 100;
  const isRight = side === "right";

  return (
    <motion.div
      initial={{ opacity: 0, x: isRight ? 12 : -12 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRight ? 12 : -12 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "pointer-events-none absolute flex items-center gap-2",
        isRight ? "" : "flex-row-reverse"
      )}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        transform: isRight
          ? "translate(8px, -50%)"
          : "translate(-100%, -50%) translateX(-8px)",
      }}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: delay - 0.1, duration: 0.4 }}
        className={cn(
          "block h-px w-5 bg-current",
          isRight ? "origin-left" : "origin-right"
        )}
      />
      <span className="inline-flex items-stretch border border-current/40 bg-[rgba(0,0,0,0.55)] backdrop-blur-md">
        {index && (
          <span className="font-mono text-[9.5px] tracking-widest px-1.5 py-0.5 border-r border-current/40 text-[var(--color-accent-2)]">
            {index}
          </span>
        )}
        <span className="font-mono text-[9.5px] tracking-widest px-1.5 py-0.5">
          {text}
        </span>
      </span>
    </motion.div>
  );
}

export function IsoCubeStack({
  layers,
  size,
  className,
  innerLogos,
  scrollProgress,
}: {
  layers: number;
  size: number;
  className?: string;
  innerLogos?: string[];
  scrollProgress?: MotionValue<number>;
}) {
  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: layers }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translateY(${(layers - 1 - i) * size * 1.0}px)`,
            zIndex: layers - i,
          }}
        >
          <IsoCube
            size={size}
            innerLogo={innerLogos?.[i]}
            drawDelay={0.15 * (layers - 1 - i)}
            drawDuration={1.4}
            scrollProgress={scrollProgress}
            drawAtStart={(i / layers) * 0.5}
            drawAtEnd={(i / layers) * 0.5 + 0.55}
          />
        </div>
      ))}
    </div>
  );
}
