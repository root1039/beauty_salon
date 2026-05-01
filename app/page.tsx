import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Megaphone } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import InstagramFab from "@/components/InstagramFab";

const RESERVATION_URL = "/contact";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const GOLD_BORDER = "rgba(201,169,110,0.65)";
const headerLine1 = "根本改善エステ「Root1039」";
const headerLine2 = "仙台市泉区 泉中央駅から徒歩5分";

/** ヘッダー画像の上に流れるお知らせ（無缝ループ） */
const tickerText =
  "高周波施術取り扱い・根本改善・あなたにあわせたケア・ブログで美容や健康についてまとめてます・いいねでクーポンGET";

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
      className="home-page-root relative"
      style={{
        height: "calc(100dvh - 74px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* やわらかな装飾（キラ・小花モチーフ） */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 home-page-decor" aria-hidden />

      {/* ── 上部：余白＋見出し＋Instagram ── */}
      <div
        className="relative z-[1] shrink-0 px-3 pt-4"
        style={{
          paddingTop: "max(14px, env(safe-area-inset-top, 0px))",
        }}
      >
        <div className="flex items-start justify-between gap-2 pl-1">
          <div className="w-10 shrink-0" aria-hidden />
          <div
            className="flex-1 min-w-0 text-center"
            style={{
              fontFamily: "var(--font-noto), sans-serif",
              color: "#2A1C20",
            }}
          >
            <p
              className="mb-0.5"
              style={{
                margin: 0,
                fontSize: "11px",
                letterSpacing: "0.14em",
                fontWeight: 700,
                opacity: 0.92,
              }}
            >
              {headerLine1}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "9.5px",
                letterSpacing: "0.12em",
                fontWeight: 500,
                color: "#7A6065",
              }}
            >
              {headerLine2}
            </p>
          </div>
          <InstagramFab className="mt-0.5" />
        </div>

        {/* ── アナウンス（メガホン＋流れるテキスト） ── */}
        <div
          className="flex items-center gap-2 mt-3 px-0.5"
          role="region"
          aria-label="お知らせ"
        >
          <div
            className="flex shrink-0 items-center justify-center rounded-full"
            style={{
              width: 30,
              height: 30,
              background:
                "linear-gradient(145deg, rgba(255,236,244,0.95) 0%, rgba(252,214,228,0.55) 100%)",
              border: "1px solid rgba(196,104,122,0.35)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
            aria-hidden
          >
            <Megaphone size={15} strokeWidth={2.2} style={{ color: "#C4687A" }} />
          </div>
          <div
            className="header-ticker flex-1 min-w-0"
            style={{
              height: "28px",
              borderRadius: "999px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(252,248,250,0.88) 100%)",
              border: "1px solid rgba(201,169,110,0.55)",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              padding: "0 10px",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.95), 0 1px 4px rgba(196,104,122,0.06)",
            }}
          >
            <div className="header-ticker__track">
              <span>{tickerText}</span>
              <span aria-hidden="true">{tickerText}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero：少し下げて余白を活かす ── */}
      <section
        className="hero-frame-outer relative z-[1] shrink-0 px-3 pt-3 pb-2"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ width: "100%", aspectRatio: "16 / 9" }}>
          <HeroSlider />
        </div>
      </section>

      {/* ── コンパクトバナー ── */}
      <div
        className="relative z-[1] flex-1 min-h-0 flex flex-col gap-1.5 px-3 pt-1 pb-2"
      >
        {banners.map((banner) => (
          <Link
            key={banner.en}
            href={banner.href}
            className="relative w-full active:translate-y-[1px] transition-transform home-banner-card"
            style={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 10px",
              borderRadius: "12px",
              background:
                "linear-gradient(165deg, rgba(255,255,255,0.96) 0%, rgba(252,248,252,0.92) 55%, rgba(248,242,246,0.88) 100%)",
              border: `1px solid ${GOLD_BORDER}`,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.92), 0 2px 8px rgba(196,104,122,0.07), 0 1px 2px rgba(42,28,32,0.04)",
            }}
          >
            <div
              style={{
                width: "104px",
                height: "54px",
                position: "relative",
                flexShrink: 0,
                borderRadius: "8px",
                overflow: "hidden",
                background: "#FFF9F5",
                border: "1px solid rgba(201,169,110,0.28)",
              }}
            >
              <Image
                src={banner.img}
                alt={banner.ja}
                fill
                sizes="104px"
                style={{ objectFit: "contain" }}
              />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  color: "#C4687A",
                  fontSize: "8px",
                  letterSpacing: "0.18em",
                  fontFamily: "var(--font-noto), sans-serif",
                  marginBottom: "1px",
                  fontWeight: 600,
                }}
              >
                {banner.en}
              </p>
              <h2
                style={{
                  color: "#2A1C20",
                  fontSize: "12px",
                  lineHeight: 1.25,
                  fontFamily: "var(--font-shippori), serif",
                  letterSpacing: "0.03em",
                  marginBottom: "1px",
                }}
              >
                {banner.ja}
              </h2>
              <p
                style={{
                  color: "#8a757a",
                  fontSize: "9px",
                  lineHeight: 1.25,
                  fontFamily: "var(--font-noto), sans-serif",
                }}
              >
                {banner.sub}
              </p>
            </div>

            <ChevronRight
              size={14}
              style={{ color: "rgba(201,169,110,0.85)", flexShrink: 0 }}
            />
          </Link>
        ))}
      </div>

      {/* ── 予約ボタン ── */}
      <div
        className="relative z-[1] shrink-0 pt-1 pb-3"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link
          href={RESERVATION_URL}
          className="flex items-center justify-center text-[12px] font-semibold active:translate-y-[2px] transition-all"
          style={{
            background:
              "linear-gradient(180deg, #F099B3 0%, #E47C97 45%, #C4687A 100%)",
            color: "white",
            width: "48%",
            maxWidth: "184px",
            height: "36px",
            borderRadius: "999px",
            border: "1px solid rgba(158,74,90,0.55)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.55)",
              "inset 0 -2px 0 rgba(158,74,90,0.45)",
              "0 4px 14px rgba(196,104,122,0.38)",
            ].join(", "),
            letterSpacing: "0.14em",
            fontFamily: "var(--font-noto), sans-serif",
            textShadow: "0 1px 1px rgba(120,55,70,0.45)",
          }}
        >
          予約する
        </Link>
      </div>
    </div>
  );
}
