import type { Metadata } from "next";
import MenuTabs from "@/components/MenuTabs";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "メニュー・商品 | Root1039",
  description: "Winback施術・補整下着・電解水素水・食品日用品。Root1039のメニューと商品をご紹介します。",
};

export default function MenuPage() {
  return (
    <div
      style={{
        height: "calc(100dvh - 68px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "#F0EDED",
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
