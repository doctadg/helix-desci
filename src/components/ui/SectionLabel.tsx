"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  index?: string;
  label: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionLabel({
  index,
  label,
  align = "left",
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex items-center gap-3 text-eyebrow",
        align === "center" && "justify-center",
        className
      )}
    >
      {index && (
        <span className="text-[var(--color-accent)]">[{index}]</span>
      )}
      <span className="relative inline-flex items-center gap-2">
        <span className="block w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] pulse-dot" />
        {label}
      </span>
      <span className="block h-px flex-1 bg-[var(--color-line)] max-w-[120px]" />
    </motion.div>
  );
}
