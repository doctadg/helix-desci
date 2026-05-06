"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface Props {
  text: string;
  el?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  stagger?: number;
  by?: "char" | "word";
  once?: boolean;
}

export function AnimatedText({
  text,
  el: Wrapper = "span",
  className,
  delay = 0,
  stagger = 0.018,
  by = "char",
  once = true,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const tokens = by === "char" ? Array.from(text) : text.split(" ");

  const container: Variants = {
    hidden: { transition: { staggerChildren: 0 } },
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const child: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const Tag = Wrapper as React.ElementType;
  return (
    <Tag className={cn(className)}>
      <motion.span
        ref={ref}
        aria-label={text}
        className="inline-block"
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={container}
      >
        {tokens.map((t, i) => (
          <span
            key={i}
            aria-hidden
            className="reveal-line inline-block"
            style={{ overflow: "hidden", verticalAlign: "top" }}
          >
            <motion.span variants={child} className="inline-block">
              {t === " " ? " " : t}
              {by === "word" && i < tokens.length - 1 ? " " : null}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
