import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

const RESERVATION_URL = "/contact";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const GOLD_BORDER = "rgba(201,169,110,0.9)";
const HEADER_ICON = `${BASE_PATH}/images/header-icon.png`;
const tickerText =
  "仙台・泉中央・駅から徒歩5分・根本改善エステ・WINBACK BACK4導入店・ブログを読んでクーポンGET";

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
      {/* ── Header top: アイコン(独立) + 流れるテキスト ── */}
      <div
        className="shrink-0 px-3 pt-2"
        style={{ display: "flex", alignItems: "center", gap: "10px" }}
      >
        <Image
          src={HEADER_ICON}
          alt="Root1039 アイコン"
          width={42}
          height={42}
          style={{
            borderRadius: "50%",
            flexShrink: 0,
            border: "1.5px solid rgba(201,169,110,0.95)",
            background: "#FFFFFF",
            boxShadow: "0 1px 4px rgba(42,28,32,0.12)",
          }}
        />
        <div
          className="header-ticker"
          style={{
            flex: 1,
            height: "30px",
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

      {/* ── Hero Slider ── */}
      <section className="shrink-0 px-3 pt-1.5" style={{ height: "40%" }}>
        <HeroSlider />
      </section>

      {/* ── Card Grid ── */}
      <div
        className="flex-1 min-h-0 grid grid-cols-2 gap-1.5 px-3 pt-1.5 pb-2"
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
                padding: "10px 10px 8px",
                background:
                  "linear-gradient(to bottom, rgba(30,15,20,0.35) 0%, rgba(30,15,20,0.10) 65%, rgba(30,15,20,0) 100%)",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.80)",
                  fontSize: "8px",
                  letterSpacing: "0.18em",
                  fontFamily: "var(--font-noto), sans-serif",
                  marginBottom: "2px",
                }}
              >
                {card.en}
              </p>
              <h2
                style={{
                  color: "#FFFFFF",
                  fontSize: "13px",
                  lineHeight: 1.3,
                  fontFamily: "var(--font-shippori), serif",
                  letterSpacing: "0.03em",
                }}
              >
                {card.ja}
              </h2>
            </div>

            {/* 矢印 */}
            <ChevronRight
              size={13}
              style={{
                position: "absolute",
                top: "12px",
                right: "8px",
                color: "rgba(255,255,255,0.75)",
              }}
            />
          </Link>
        ))}
      </div>

      {/* ── 予約ボタン ── */}
      <div
        className="shrink-0 px-6 pb-2"
        style={{ background: "#F0EDED" }}
      >
        <Link
          href={RESERVATION_URL}
          className="flex items-center justify-center w-full text-sm font-semibold active:translate-y-[2px] transition-all"
          style={{
            background:
              "linear-gradient(180deg, #F099B3 0%, #E47C97 45%, #C4687A 100%)",
            color: "white",
            height: "46px",
            borderRadius: "10px",
            border: "1px solid rgba(158,74,90,0.55)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.55)",
              "inset 0 -2px 0 rgba(158,74,90,0.55)",
              "0 1px 0 rgba(255,255,255,0.5)",
              "0 4px 0 rgba(120,55,70,0.55)",
              "0 8px 18px rgba(158,74,90,0.45)",
              "0 1px 2px rgba(42,28,32,0.25)",
            ].join(", "),
            letterSpacing: "0.10em",
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
