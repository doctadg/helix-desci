"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type State = "ok" | "warn" | "info" | "neutral";

interface BlueprintCalloutProps {
  index?: string;
  label: string;
  value?: string;
  unit?: string;
  state?: State;
  className?: string;
  size?: "sm" | "md";
  align?: "left" | "right";
  leader?: "none" | "horizontal" | "diagonal-up" | "diagonal-down";
  leaderLength?: number;
  delay?: number;
  pulse?: boolean;
  bare?: boolean;
}

const STATE_COLORS: Record<State, string> = {
  ok: "var(--color-good)",
  warn: "var(--color-warn)",
  info: "var(--color-accent-2)",
  neutral: "currentColor",
};

/**
 * A blueprint-style annotation: small numbered tag, leader line, label/value.
 * Replaces random floating pills with intentional, structured callouts.
 */
export function BlueprintCallout({
  index,
  label,
  value,
  unit,
  state = "neutral",
  className,
  size = "md",
  align = "left",
  leader = "horizontal",
  leaderLength = 28,
  delay = 0,
  pulse = false,
  bare = false,
}: BlueprintCalloutProps) {
  const stateColor = STATE_COLORS[state];
  const leaderTransform = (() => {
    switch (leader) {
      case "diagonal-up": return "rotate(-22deg)";
      case "diagonal-down": return "rotate(22deg)";
      default: return "";
    }
  })();

  const reverseOrder = align === "right";

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "inline-flex items-center pointer-events-none",
        reverseOrder ? "flex-row-reverse" : "flex-row",
        className
      )}
    >
      {/* Leader line */}
      {leader !== "none" && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: delay + 0.1, duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
          className={cn(
            "h-px shrink-0 origin-left",
            reverseOrder && "origin-right",
            leader !== "horizontal" && "rounded-full"
          )}
          style={{
            width: leaderLength,
            background: stateColor,
            opacity: 0.65,
            transform: leaderTransform,
          }}
        />
      )}

      {/* Origin dot at leader start */}
      {leader !== "none" && (
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ delay: delay + 0.05, duration: 0.3 }}
          className={cn(
            "block w-1.5 h-1.5 rounded-full -mx-[3px] z-10 shrink-0",
            pulse && "pulse-dot"
          )}
          style={{ background: stateColor }}
        />
      )}

      {/* Tag block */}
      {bare ? (
        <span className="inline-flex items-baseline gap-2 font-mono">
          {index && (
            <span
              className={cn("text-[9.5px] tracking-widest", state !== "neutral" && "")}
              style={{ color: stateColor }}
            >
              [{index}]
            </span>
          )}
          <span className="text-[10.5px] tracking-wider uppercase opacity-80">
            {label}
          </span>
          {value && (
            <span className="text-[10.5px] tabular-nums">
              {value}
              {unit && <span className="opacity-60 ml-0.5">{unit}</span>}
            </span>
          )}
        </span>
      ) : (
        <div
          className={cn(
            "inline-flex items-stretch font-mono backdrop-blur-md",
            size === "sm" ? "h-5" : "h-6",
            "border border-current/35 bg-[rgba(0,0,0,0.45)]"
          )}
        >
          {index && (
            <span
              className={cn(
                "inline-flex items-center px-1.5 border-r border-current/35",
                size === "sm" ? "text-[8.5px]" : "text-[9.5px]"
              )}
              style={{ color: stateColor, letterSpacing: "0.16em" }}
            >
              {index}
            </span>
          )}
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2",
              size === "sm" ? "text-[9.5px]" : "text-[10.5px]"
            )}
            style={{ letterSpacing: "0.06em" }}
          >
            <span className="opacity-85">{label}</span>
            {value && (
              <>
                <span className="block w-px h-2 bg-current/30" />
                <span className="tabular-nums">
                  {value}
                  {unit && <span className="opacity-55 ml-0.5">{unit}</span>}
                </span>
              </>
            )}
          </span>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Anchor a blueprint callout to a position in a parent (use absolute positioning).
 */
interface CalloutAnchorProps extends BlueprintCalloutProps {
  x: string;  // percentage like "20%"
  y: string;
  origin?: "tl" | "tr" | "bl" | "br";
}

export function CalloutAnchor({
  x,
  y,
  origin = "tl",
  align,
  ...rest
}: CalloutAnchorProps) {
  // Default the alignment by origin if not provided
  const computedAlign = align ?? (origin === "tr" || origin === "br" ? "right" : "left");
  const transforms: Record<string, string> = {
    tl: "translate(0, -50%)",
    tr: "translate(-100%, -50%)",
    bl: "translate(0, -50%)",
    br: "translate(-100%, -50%)",
  };

  return (
    <div
      className="absolute"
      style={{
        left: x,
        top: y,
        transform: transforms[origin],
      }}
    >
      <BlueprintCallout {...rest} align={computedAlign} />
    </div>
  );
}
