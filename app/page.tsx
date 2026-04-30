import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

const RESERVATION_URL = "/contact";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const GOLD_BORDER = "rgba(201,169,110,0.9)";
const headerSubtitle = "根本改善エステ・仙台市泉区・泉中央駅から徒歩5分";
const tickerText =
  "WINBACK BACK4導入店・根本改善・あなたにあわせた施術・ブログで美容や健康についてまとめてます・いいねでクーポンGET";

const banners = [
  {
    href: "/about",
    en: "ABOUT",
    ja: "サロンについて",
    sub: "代表挨拶 / Root1039",
    img: `${BASE_PATH}/images/banner-about.png`,
  },
  {
    href: "/menu",
    en: "MENU",
    ja: "メニュー・商品",
    sub: "最新機器 / 生活改善",
    img: `${BASE_PATH}/images/banner-menu.png`,
  },
  {
    href: "/blog",
    en: "BLOG",
    ja: "ブログ",
    sub: "美容と健康のヒントを発信中",
    img: `${BASE_PATH}/images/banner-blog.png`,
  },
];

export default function HomePage() {
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
      {/* ── Header top: 上段テキスト + 流れるテロップ ── */}
      <div className="shrink-0 px-3 pt-2" style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <p
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: "11px",
            letterSpacing: "0.08em",
            fontWeight: 600,
            color: "#2A1C20",
            fontFamily: "var(--font-noto), sans-serif",
          }}
        >
          {headerSubtitle}
        </p>
        <div
          className="header-ticker"
          style={{
            width: "100%",
            height: "26px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(201,169,110,0.7)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            padding: "0 12px",
          }}
        >
          <div className="header-ticker__track">
            <span>{tickerText}</span>
            <span aria-hidden="true">{tickerText}</span>
          </div>
        </div>
      </div>

      {/* ── Hero Slider (告知画像 16:9) ── */}
      <section
        className="shrink-0 px-3 pt-2 pb-1"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ width: "100%", aspectRatio: "16 / 9" }}>
          <HeroSlider />
        </div>
      </section>

      {/* ── Banner List (3つの横長バナー) ── */}
      <div
        className="flex-1 min-h-0 flex flex-col gap-2 px-4 pt-2 pb-2"
        style={{ background: "#F0EDED" }}
      >
        {banners.map((banner) => (
          <Link
            key={banner.en}
            href={banner.href}
            className="relative w-full active:translate-y-[1px] transition-transform"
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 12px",
              borderRadius: "10px",
              background:
                "linear-gradient(180deg, #FFFFFF 0%, #FBF7F2 100%)",
              border: `1.5px solid ${GOLD_BORDER}`,
              boxShadow: [
                "inset 0 1px 0 rgba(255,255,255,0.95)",
                "inset 0 -2px 0 rgba(201,169,110,0.18)",
                "0 2px 6px rgba(42,28,32,0.08)",
                "0 1px 2px rgba(42,28,32,0.06)",
              ].join(", "),
            }}
          >
            {/* 画像枠: サイズ固定 (見切れない) */}
            <div
              style={{
                width: "120px",
                height: "60px",
                position: "relative",
                flexShrink: 0,
                borderRadius: "6px",
                overflow: "hidden",
                background: "#F5EFE7",
                border: "1px solid rgba(201,169,110,0.35)",
              }}
            >
              <Image
                src={banner.img}
                alt={banner.ja}
                fill
                sizes="120px"
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* テキスト */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  color: "#C4687A",
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  fontFamily: "var(--font-noto), sans-serif",
                  marginBottom: "2px",
                  fontWeight: 600,
                }}
              >
                {banner.en}
              </p>
              <h2
                style={{
                  color: "#2A1C20",
                  fontSize: "14px",
                  lineHeight: 1.25,
                  fontFamily: "var(--font-shippori), serif",
                  letterSpacing: "0.04em",
                  marginBottom: "2px",
                }}
              >
                {banner.ja}
              </h2>
              <p
                style={{
                  color: "#7A6065",
                  fontSize: "10px",
                  lineHeight: 1.3,
                  fontFamily: "var(--font-noto), sans-serif",
                }}
              >
                {banner.sub}
              </p>
            </div>

            {/* 矢印 */}
            <ChevronRight
              size={16}
              style={{ color: "rgba(201,169,110,0.95)", flexShrink: 0 }}
            />
          </Link>
        ))}
      </div>

      {/* ── 予約ボタン ── */}
      <div
        className="shrink-0 pt-1 pb-3"
        style={{
          background: "#F0EDED",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          href={RESERVATION_URL}
          className="flex items-center justify-center text-[13px] font-semibold active:translate-y-[2px] transition-all"
          style={{
            background:
              "linear-gradient(180deg, #F099B3 0%, #E47C97 45%, #C4687A 100%)",
            color: "white",
            width: "52%",
            maxWidth: "200px",
            height: "38px",
            borderRadius: "9px",
            border: "1px solid rgba(158,74,90,0.55)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.55)",
              "inset 0 -2px 0 rgba(158,74,90,0.55)",
              "0 1px 0 rgba(255,255,255,0.5)",
              "0 3px 0 rgba(120,55,70,0.5)",
              "0 6px 14px rgba(158,74,90,0.40)",
              "0 1px 2px rgba(42,28,32,0.22)",
            ].join(", "),
            letterSpacing: "0.12em",
            fontFamily: "var(--font-noto), sans-serif",
            textShadow: "0 1px 1px rgba(120,55,70,0.55)",
          }}
        >
          予約する
        </Link>
      </div>
    </div>
  );
}
