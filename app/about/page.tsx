import { Suspense } from "react";
import type { Metadata } from "next";
import AboutTabs from "@/components/AboutTabs";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "サロンについて | Root1039",
  description: "Root1039 代表・高橋佑卯美（ゆーみん）のプロフィールとサロンのコンセプトをご紹介します。",
};

export default function AboutPage() {
  return (
    <div
      className="page-scroll-frame"
      style={{
        height: "calc(100dvh - 68px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--gray-light)",
      }}
    >
      {/* ── Page Header ── */}
      <PageHeader
        en="ABOUT"
        title="サロンについて"
        ballColor="196, 104, 122"
        compact
      />

      {/* ── Tabs ── */}
      <Suspense>
        <AboutTabs />
      </Suspense>
    </div>
  );
}
