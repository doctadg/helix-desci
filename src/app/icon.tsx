import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E0F12",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderRadius: 12,
        }}
      >
        {/* Architectural corner ticks — match the framed Logomark */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: 6,
            width: 8,
            height: 8,
            borderTop: "1.5px solid rgba(242,241,237,0.35)",
            borderLeft: "1.5px solid rgba(242,241,237,0.35)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 6,
            right: 6,
            width: 8,
            height: 8,
            borderBottom: "1.5px solid rgba(242,241,237,0.35)",
            borderRight: "1.5px solid rgba(242,241,237,0.35)",
          }}
        />

        <svg viewBox="0 0 24 24" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6A8AFF" />
              <stop offset="100%" stopColor="#2956F8" />
            </linearGradient>
          </defs>
          <path
            d="M5 4 Q12 12 5 20 M19 4 Q12 12 19 20"
            stroke="url(#g)"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="6" r="1.6" fill="#6A8AFF" />
          <circle cx="12" cy="12" r="1.6" fill="#F2F1ED" />
          <circle cx="12" cy="18" r="1.6" fill="#2956F8" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
