import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";

const RESERVATION_URL = "/contact";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const GOLD_BORDER = "rgba(201,169,110,0.9)";

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
      {/* ── Hero Slider ── */}
      <section className="shrink-0 px-3 pt-3" style={{ height: "50%" }}>
        <HeroSlider />
      </section>

      {/* ── Card Grid ── */}
      <div
        className="flex-1 min-h-0 grid grid-cols-2 gap-2 p-3"
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

            {/* 下からのグラデーションオーバーレイ */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(30,15,20,0.72) 0%, rgba(30,15,20,0.15) 55%, transparent 100%)",
              }}
            />

            {/* テキスト: 画像上に重ねる */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "8px 10px 9px",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.70)",
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
                bottom: "10px",
                right: "8px",
                color: "rgba(255,255,255,0.75)",
              }}
            />
          </Link>
        ))}
      </div>

      {/* ── 予約ボタン ── */}
      <div
        className="shrink-0 px-3 pb-3"
        style={{ background: "#F0EDED" }}
      >
        <Link
          href={RESERVATION_URL}
          className="flex items-center justify-center w-full text-sm font-medium active:opacity-80 active:translate-y-[1px] transition-all"
          style={{
            background: "linear-gradient(135deg, #E47C97 0%, #C4687A 100%)",
            color: "white",
            height: "48px",
            borderRadius: "8px",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.28), 0 5px 14px rgba(196,104,122,0.36), 0 1px 2px rgba(42,28,32,0.22)",
            letterSpacing: "0.06em",
            fontFamily: "var(--font-noto), sans-serif",
          }}
        >
          予約する
        </Link>
      </div>
    </div>
  );
}
