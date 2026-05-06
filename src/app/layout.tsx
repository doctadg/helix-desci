import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { Cursor } from "@/components/Cursor";
import { AccessModal } from "@/components/AccessModal";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HELIX — Autonomous protein research, on-chain.",
  description:
    "An agentic pipeline that designs, optimizes, and simulates protein candidates for cancer therapies. Open science, decentralized funding, real outcomes.",
  metadataBase: new URL("https://helix.bio"),
  openGraph: {
    title: "HELIX — Autonomous protein research, on-chain.",
    description:
      "An agentic pipeline that designs, optimizes, and simulates protein candidates for cancer therapies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="grain min-h-screen flex flex-col">
        <Cursor />
        <LenisProvider>{children}</LenisProvider>
        <AccessModal />
      </body>
    </html>
  );
}
