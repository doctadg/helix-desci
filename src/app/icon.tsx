import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const helixBuffer = await readFile(
    path.join(process.cwd(), "public", "helix.png")
  );

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

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/png;base64,${helixBuffer.toString("base64")}`}
          width={40}
          height={40}
          alt=""
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    { ...size }
  );
}
