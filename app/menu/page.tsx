import type { Metadata } from "next";
import MenuTabs from "@/components/MenuTabs";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "メニュー・商品 | Root1039",
  description: "施術・補整下着・電解水素水・食品・日用品。Root1039のメニューと商品をご紹介します。",
};

export default function MenuPage() {
  return (
    <div
      className="page-scroll-frame"
      style={{
        height: "calc(100dvh - 74px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--gray-light)",
      }}
    >
      {/* ── Page Header ── */}
      <PageHeader
        en="MENU & PRODUCTS"
        title="メニュー・商品"
        ballColor="201, 169, 110"
        compact
      />

      {/* ── Tabs ── */}
      <MenuTabs />
    </div>
  );
}
