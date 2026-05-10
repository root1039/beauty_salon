"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Sparkles, BookOpen, MessageCircle } from "lucide-react";

const navItems = [
  { href: "/", label: "ホーム", Icon: Home },
  { href: "/about", label: "サロン", Icon: User },
  { href: "/menu", label: "メニュー", Icon: Sparkles },
  { href: "/blog", label: "ブログ", Icon: BookOpen },
  { href: "/contact", label: "予約", Icon: MessageCircle },
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
      className="fixed bottom-0 z-50"
      style={{
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(430px, calc(100% - 12px))",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="flex items-center justify-between rounded-t-lg px-2 py-2.5"
        style={{
          background: "white",
          border: "1px solid var(--pink-mid)",
          borderBottom: "none",
          boxShadow: "0 -6px 20px rgba(0,0,0,0.06)",
        }}
      >
        {navItems.map(({ href, label, Icon }) => {
          const normalizedHref = href.replace(/\/+$/, "") || "/";
          const active = normalizedPathname === normalizedHref;

          return (
            <Link
              key={href}
              href={href}
              className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-md px-1.5 py-1.5 transition"
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
