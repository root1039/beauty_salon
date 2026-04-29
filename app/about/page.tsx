import { Suspense } from "react";
import type { Metadata } from "next";
import AboutTabs from "@/components/AboutTabs";

export const metadata: Metadata = {
  title: "サロンについて | Root1039",
  description: "Root1039 代表・高橋佑卯美（ゆーみん）のプロフィールとサロンのコンセプトをご紹介します。",
};

export default function AboutPage() {
  return (
    <div
      style={{
        height: "calc(100dvh - 68px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Page Header ── */}
      <header
        className="shrink-0 px-5 pt-12 pb-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1C1C1C 0%, #3D2530 60%, #9E4A5A 100%)",
        }}
      >
        <p
          className="text-[10px] tracking-[0.3em] mb-2"
          style={{ color: "rgba(232,190,199,0.8)", fontFamily: "var(--font-noto), sans-serif" }}
        >
          ABOUT
        </p>
        <h1
          className="text-2xl"
          style={{ fontFamily: "var(--font-shippori), serif", color: "#FAF8F5" }}
        >
          サロンについて
        </h1>
        <div
          className="absolute -right-8 -top-8 w-28 h-28 rounded-full"
          style={{ background: "rgba(196,104,122,0.15)" }}
        />
      </header>

      {/* ── Tabs ── */}
      <Suspense>
        <AboutTabs />
      </Suspense>
    </div>
  );
}
