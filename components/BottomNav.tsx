"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, User, Sparkles, BookOpen, MessageCircle } from "lucide-react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const navItems = [
  { href: "/", label: "ホーム", Icon: Home },
  { href: "/about", label: "サロン", Icon: User },
  { href: "/menu", label: "メニュー", Icon: Sparkles },
  { href: "/blog", label: "ブログ", Icon: BookOpen },
  { href: "/contact", label: "予約", Icon: MessageCircle, reserve: true },
];

export default function BottomNav() {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalizedPathname =
    pathname
      .replace(new RegExp(`^${basePath}`), "")
      .replace(/\/+$/, "") || "/";

  return (
    <nav
      className="site-nav fixed bottom-0 z-50"
      style={{
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(430px, calc(100% - 12px))",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="site-nav__inner flex items-center justify-between rounded-t-lg px-2 py-2.5"
        style={{
          background: "white",
          border: "1px solid var(--pink-mid)",
          borderBottom: "none",
          boxShadow: "0 -6px 20px rgba(0,0,0,0.06)",
        }}
      >
        {/* ロゴ（PCのみ・先頭に表示）— アイコン＋サロン名＋住所 */}
        <Link
          href="/"
          className="site-nav__logo mr-3 hidden items-center gap-2.5"
          style={{ textDecoration: "none" }}
          aria-label="根本改善エステ Root1039 ホーム"
        >
          <Image
            src={`${BASE_PATH}/images/header-icon.png`}
            alt="Root1039"
            width={46}
            height={46}
            className="object-contain"
            style={{ width: 46, height: 46 }}
          />
          <div className="leading-tight">
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                lineHeight: 1.25,
                fontWeight: 600,
                letterSpacing: "0.03em",
                fontFamily: "var(--font-shippori), serif",
                color: "#2A1C20",
              }}
            >
              根本改善エステ Root1039
            </p>
            <p
              style={{
                margin: 0,
                marginTop: 2,
                fontSize: "12px",
                lineHeight: 1.25,
                fontWeight: 600,
                letterSpacing: "0.05em",
                fontFamily: "var(--font-shippori), serif",
                color: "#C4687A",
              }}
            >
              泉中央駅 北出口3から徒歩5分
            </p>
          </div>
        </Link>

        {navItems.map(({ href, label, Icon, reserve }) => {
          const normalizedHref = href.replace(/\/+$/, "") || "/";
          const active = normalizedPathname === normalizedHref;

          return (
            <Link
              key={href}
              href={href}
              className={`site-nav__item flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md px-1.5 py-1.5 transition${
                reserve ? " site-nav__item--reserve" : ""
              }`}
              style={{
                textDecoration: "none",
                color: active ? "#C4687A" : "#7A6065",
                fontFamily: "var(--font-noto), sans-serif",
              }}
            >
              <Icon
                className="h-7 w-7"
                strokeWidth={active ? 2.2 : 1.5}
              />
              <span
                className="truncate text-[10px] font-medium"
                style={{
                  fontFamily: "var(--font-shippori), serif",
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
