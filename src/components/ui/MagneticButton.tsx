"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  as?: "div" | "a" | "button";
  href?: string;
}

export function MagneticButton({
  children,
  strength = 0.35,
  className,
  as = "div",
  href,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span
      style={{ x: sx, y: sy }}
      className="inline-flex items-center justify-center"
    >
      {children}
    </motion.span>
  );

  if (as === "a") {
    return (
      <a
        ref={(el) => {
          ref.current = el;
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        href={href}
        className={cn("inline-flex", className)}
        data-cursor="link"
        {...rest}
      >
        {inner}
      </a>
    );
  }
  if (as === "button") {
    return (
      <button
        ref={(el) => {
          ref.current = el;
        }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn("inline-flex", className)}
        data-cursor="link"
        type="button"
        {...rest}
      >
        {inner}
      </button>
    );
  }
  return (
    <div
      ref={(el) => {
        ref.current = el;
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("inline-flex", className)}
      data-cursor="link"
      {...rest}
    >
      {inner}
    </div>
  );
}
