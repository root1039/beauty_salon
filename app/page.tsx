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

const cards = [
  {
    href: "/about",
    en: "ABOUT",
    ja: "サロンについて",
    img: `${BASE_PATH}/images/card-about.png`,
    accent: "#F7EDF0",
  },
  {
    href: "/menu",
    en: "MENU",
    ja: "メニュー・商品",
    img: `${BASE_PATH}/images/card-menu.png`,
    accent: "#F7EDF0",
  },
  {
    href: "/blog",
    en: "BLOG",
    ja: "ブログ",
    img: `${BASE_PATH}/images/card-blog.png`,
    accent: "#F0EDED",
  },
  {
    href: "/contact",
    en: "FIRST VISIT",
    ja: "初めての方へ",
    img: `${BASE_PATH}/images/card-first-visit.png`,
    accent: "#F7EDF0",
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

      {/* ── Card Grid ── */}
      <div
        className="flex-1 min-h-0 grid grid-cols-2 gap-x-3 gap-y-3 px-8 pt-3 pb-3"
        style={{ background: "#F0EDED" }}
      >
        {cards.map((card) => (
          <Link
            key={card.en}
            href={card.href}
            className="relative overflow-hidden active:scale-[0.97] transition-transform"
            style={{
              borderRadius: "8px",
              border: `1.5px solid ${GOLD_BORDER}`,
              minHeight: 0,
            }}
          >
            {/* 画像: カード全体を覆う */}
            <Image
              src={card.img}
              alt={card.ja}
              fill
              sizes="200px"
              style={{ objectFit: "cover" }}
            />

            {/* テキスト: 画像上部に重ねる */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                padding: "5px 7px 4px",
                background:
                  "linear-gradient(to bottom, rgba(30,15,20,0.30) 0%, rgba(30,15,20,0.08) 60%, rgba(30,15,20,0) 100%)",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.80)",
                  fontSize: "6.5px",
                  letterSpacing: "0.18em",
                  fontFamily: "var(--font-noto), sans-serif",
                  marginBottom: "1px",
                }}
              >
                {card.en}
              </p>
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: "10px",
                  lineHeight: 1.2,
                  fontFamily: "var(--font-shippori), serif",
                  letterSpacing: "0.03em",
                }}
              >
                {card.ja}
              </h2>
            </div>

            {/* 矢印 */}
            <ChevronRight
              size={10}
              style={{
                position: "absolute",
                top: "6px",
                right: "5px",
                color: "rgba(255,255,255,0.78)",
              }}
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
