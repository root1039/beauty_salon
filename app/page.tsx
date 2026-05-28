import Link from "next/link";
import Image from "next/image";
import { Bell, ChevronRight, CalendarDays } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import HomeHeader from "@/components/HomeHeader";

const RESERVATION_URL = "/contact";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const noticeText =
  "高周波施術取り扱い・根本改善・あなたにあわせたケア";

const cards = [
  {
    href: "/about",
    title: "サロンについて",
    desc: "代表挨拶 / Root1039",
    img: `${BASE_PATH}/images/banner-about.png`,
  },
  {
    href: "/menu",
    title: "メニュー・商品",
    desc: "最新機器 / 生活改善",
    img: `${BASE_PATH}/images/banner-menu.png`,
  },
  {
    href: "/blog",
    title: "ブログ",
    desc: "",
    img: `${BASE_PATH}/images/banner-blog.png`,
  },
];

export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-screen w-full flex-col bg-transparent px-2 pt-2 pb-[5.25rem]">
      <div
        className="rounded-lg bg-white px-0 pb-2.5 pt-2"
        style={{
          border: "1px solid var(--gray-light)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        }}
      >
        {/* 1. Header */}
        <HomeHeader />

        {/* 2. Notice bar */}
        <div className="mx-2.5 mb-1.5">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 rounded-md px-1.5 py-1.5"
            style={{
              textDecoration: "none",
              border: "1px solid rgba(196,104,122,0.2)",
              background: "rgba(247,237,240,0.6)",
            }}
          >
            <span
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[9px] font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg, #5a1432 0%, #9E4A5A 30%, #C4687A 60%, #9E4A5A 100%)",
                flexShrink: 0,
              }}
            >
              <Bell className="h-3 w-3" />
              お知らせ
            </span>
            <span
              className="truncate text-[10px] font-medium"
              style={{
                fontFamily: "var(--font-shippori), serif",
                letterSpacing: "0.02em",
                color: "#9E4A5A",
              }}
            >
              {noticeText}
            </span>
            <ChevronRight
              className="h-3 w-3 shrink-0"
              style={{ color: "#C4687A" }}
            />
          </Link>
        </div>

        {/* 3. Hero image */}
        <div className="mb-2.5">
          <div style={{ aspectRatio: "1 / 1", width: "100%" }}>
            <HeroSlider />
          </div>
        </div>

        {/* 4. 3-card grid */}
        <div className="mb-1.5 grid grid-cols-3 gap-1.5 px-2.5">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="home-neon-card rounded-md bg-white p-0.5 text-center transition hover:-translate-y-0.5 hover:shadow-md"
              style={{
                textDecoration: "none",
                border: "1px solid var(--gray-light)",
              }}
            >
              <div
                className="relative mb-0.5 w-full overflow-hidden rounded-md"
                style={{
                  aspectRatio: "1 / 1",
                  border: "1px solid var(--gray-mid)",
                }}
              >
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  sizes="(max-width: 430px) 33vw, 130px"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <p
                className="text-[10px] font-semibold"
                style={{
                  fontFamily: "var(--font-shippori), serif",
                  letterSpacing: "0.03em",
                  color: "#2A1C20",
                }}
              >
                {card.title}
              </p>
              {card.desc ? (
                <p
                  className="text-[8.5px] leading-tight"
                  style={{ color: "#7A6065" }}
                >
                  {card.desc}
                </p>
              ) : null}
            </Link>
          ))}
        </div>

        {/* 5. CTA button */}
        <div className="relative mt-2.5 px-2.5">
          <Link
            href={RESERVATION_URL}
            className="cta-glint flex items-center justify-center gap-2 rounded-[10px] px-3 py-2.5 transition-transform hover:-translate-y-0.5"
            style={{
              textDecoration: "none",
              background:
                "linear-gradient(145deg, #F099B3 0%, #E47C97 45%, #9E4A5A 100%)",
              fontFamily: "var(--font-shippori), serif",
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: "white",
              boxShadow:
                "0 14px 24px rgba(196,104,122,0.4), inset 0 1px 0 rgba(255,255,255,0.42), inset 0 -6px 12px rgba(0,0,0,0.22)",
              outline: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <CalendarDays className="h-5 w-5" />
            予約する
          </Link>
        </div>
      </div>
    </section>
  );
}
