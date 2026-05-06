"use client";

import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  speed?: "fast" | "slow";
  reverse?: boolean;
  className?: string;
}

export function Marquee({
  children,
  speed = "fast",
  reverse = false,
  className,
}: Props) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
      }}
    >
      <div
        className={cn(
          "flex w-max gap-12 whitespace-nowrap will-change-transform",
          speed === "slow" ? "marquee-track-slow" : "marquee-track"
        )}
        style={{
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
