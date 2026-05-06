import { cn } from "@/lib/utils";

type Tone = "light" | "dark" | "accent" | "gradient";

interface Props {
  /** Total height of the framed mark in px. */
  size?: number;
  /** Show the bordered tile around the helix. */
  framed?: boolean;
  /** Color treatment. Default: "light" (white) — works on dark backgrounds. */
  tone?: Tone;
  /** Optional override that wins over `tone`. Pass a CSS color or gradient. */
  color?: string;
  className?: string;
}

const TONE_BG: Record<Tone, string> = {
  light: "var(--color-fg)",
  dark: "var(--color-ink)",
  accent: "var(--color-accent)",
  gradient:
    "linear-gradient(180deg, var(--color-accent-2) 0%, var(--color-accent) 100%)",
};

/**
 * HELIX glyph. Uses /helix.png as a CSS mask so the silhouette can be
 * recolored to match its container — defaults to white/foreground for
 * dark backgrounds. Pass tone="dark" on light sections.
 */
export function Logomark({
  size = 36,
  framed = true,
  tone = "light",
  color,
  className,
}: Props) {
  // Helix asset is portrait (~1:2.39). Tile inner ≈ 78% of frame height.
  const innerH = framed ? size * 0.78 : size;
  const innerW = innerH / 2.39;
  const fill = color ?? TONE_BG[tone];

  const helix = (
    <span
      aria-hidden
      className="block"
      style={{
        width: innerW,
        height: innerH,
        background: fill,
        WebkitMaskImage: "url(/helix.png)",
        maskImage: "url(/helix.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );

  if (!framed) {
    return <span className={cn("inline-flex", className)}>{helix}</span>;
  }

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-md overflow-hidden",
        "border border-[var(--color-line-strong)] bg-[rgba(20,21,26,0.65)]",
        className
      )}
      style={{ width: size, height: size }}
      aria-label="HELIX"
    >
      {/* corner ticks for an architectural feel */}
      <span className="pointer-events-none absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[var(--color-line-strong)]" />
      <span className="pointer-events-none absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[var(--color-line-strong)]" />
      {helix}
    </span>
  );
}
