import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import HomeHeader from "@/components/HomeHeader";
import { ReservationAvailabilityCalendar } from "@/components/ReservationChannels";

const RESERVATION_URL = "/contact";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const cards = [
  {
    href: "/about",
    title: "サロンについて",
    desc: "",
    img: `${BASE_PATH}/images/banner-about.png`,
  },
  {
    href: "/menu",
    title: "メニュー・商品",
    desc: "",
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
        className="home-card-inner rounded-lg bg-white px-0 pb-2.5 pt-2"
        style={{
          border: "1px solid var(--gray-light)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
        }}
      >
        {/* 1. Header */}
        <div className="home-el-header">
          <HomeHeader />
        </div>

        {/* 2. Hero image */}
        <div className="home-el-hero mb-2.5">
          <div style={{ aspectRatio: "1 / 1", width: "100%" }}>
            <HeroSlider />
          </div>
        </div>

        {/* 3. 3-card grid */}
        <div className="home-el-cards mb-1.5 grid grid-cols-3 gap-1.5 px-2.5">
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
                className="text-[11px] font-semibold"
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

        {/* 4. Availability calendar */}
        <ReservationAvailabilityCalendar
          className="home-el-calendar home-reservation-calendar"
          compact
        />

        {/* 5. CTA button */}
        <div className="home-el-cta relative mt-2.5 px-2.5">
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
