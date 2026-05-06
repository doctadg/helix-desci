"use client";

import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<"default" | "link" | "label">("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);

      const t = e.target as HTMLElement | null;
      const link = t?.closest<HTMLElement>("[data-cursor]");
      if (link) {
        const kind = link.dataset.cursor;
        if (kind === "label" && link.dataset.cursorLabel) {
          setLabel(link.dataset.cursorLabel);
          setHover("label");
        } else {
          setHover("link");
        }
      } else {
        setHover("default");
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current)
        ringRef.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      if (dotRef.current)
        dotRef.current.style.transform = `translate3d(${mx - 2}px, ${my - 2}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center will-change-transform"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 200ms ease, width 220ms ease, height 220ms ease",
          width: hover === "label" ? 88 : hover === "link" ? 44 : 32,
          height: hover === "label" ? 88 : hover === "link" ? 44 : 32,
          marginLeft: hover === "label" ? -28 : hover === "link" ? -6 : 0,
          marginTop: hover === "label" ? -28 : hover === "link" ? -6 : 0,
          mixBlendMode: "difference",
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.6)",
            background:
              hover === "label" ? "rgba(198,249,92,0.95)" : "transparent",
            transition: "background 220ms ease",
          }}
        >
          {hover === "label" && (
            <span className="flex items-center justify-center w-full h-full text-[10px] font-mono uppercase tracking-widest text-black">
              {label}
            </span>
          )}
        </div>
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block w-1 h-1 rounded-full bg-white will-change-transform"
        style={{
          opacity: visible && hover !== "label" ? 1 : 0,
          transition: "opacity 200ms ease",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
