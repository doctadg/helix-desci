"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

interface Props {
  text: string;
  className?: string;
  trigger?: "hover" | "view" | "mount";
  speed?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function ScrambleText({
  text,
  className,
  trigger = "hover",
  speed = 28,
  as: Tag = "span",
}: Props) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const queue = useRef<
    { from: string; to: string; start: number; end: number; char?: string }[]
  >([]);
  const counter = useRef(0);

  useEffect(() => {
    setOut(text);
  }, [text]);

  function update() {
    let output = "";
    let complete = 0;
    for (let i = 0; i < queue.current.length; i++) {
      const { from, to, start, end } = queue.current[i];
      let { char } = queue.current[i];
      if (counter.current >= end) {
        complete++;
        output += to;
      } else if (counter.current >= start) {
        if (!char || Math.random() < 0.28) {
          char = CHARS[Math.floor(Math.random() * CHARS.length)];
          queue.current[i].char = char;
        }
        output += `<span style="opacity:.6">${char}</span>`;
      } else {
        output += from;
      }
    }
    if (ref.current) ref.current.innerHTML = output;
    if (complete === queue.current.length) {
      cancelAnimationFrame(frame.current);
      return;
    }
    counter.current++;
    frame.current = requestAnimationFrame(update);
  }

  function run(target: string) {
    cancelAnimationFrame(frame.current);
    const oldText = ref.current?.innerText || text;
    const length = Math.max(oldText.length, target.length);
    queue.current = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = target[i] || "";
      const start = Math.floor(Math.random() * 12);
      const end = start + Math.floor(Math.random() * speed);
      queue.current.push({ from, to, start, end });
    }
    counter.current = 0;
    frame.current = requestAnimationFrame(update);
  }

  useEffect(() => {
    if (trigger === "mount") run(text);
    if (trigger === "view") {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              run(text);
              obs.disconnect();
            }
          });
        },
        { threshold: 0.5 }
      );
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }
    return () => cancelAnimationFrame(frame.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, text]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      className={cn(className)}
      onMouseEnter={trigger === "hover" ? () => run(text) : undefined}
    >
      <span ref={ref}>{out}</span>
    </Comp>
  );
}
