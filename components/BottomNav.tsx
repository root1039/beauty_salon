"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Sparkles, BookOpen, MessageCircle } from "lucide-react";

const navItems = [
  { href: "/",        label: "ホーム",   Icon: Home },
  { href: "/about",   label: "サロン",   Icon: User },
  { href: "/menu",    label: "メニュー", Icon: Sparkles },
  { href: "/blog",    label: "ブログ",   Icon: BookOpen },
  { href: "/contact", label: "予約",     Icon: MessageCircle },
];

export default function BottomNav() {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalizedPathname =
    pathname
      .replace(new RegExp(`^${basePath}`), "") // GitHub Pages basePath対応
      .replace(/\/+$/, "") || "/";

  return (
    <nav
      className="glass fixed bottom-0 z-50"
      style={{
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        background:
          "linear-gradient(180deg, rgba(232,236,242,0.97) 0%, rgba(218,222,230,0.96) 100%)",
        borderTop: "1px solid rgba(201,169,110,0.55)",
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.95)",
          "inset 0 -2px 0 rgba(201,169,110,0.18)",
          "0 -8px 20px rgba(42,28,32,0.08)",
          "0 -2px 6px rgba(42,28,32,0.06)",
        ].join(", "),
      }}
    >
      <ul className="flex items-stretch justify-around h-[68px] max-w-lg mx-auto">
        {navItems.map(({ href, label, Icon }) => {
          const normalizedHref = href.replace(/\/+$/, "") || "/";
          const active = normalizedPathname === normalizedHref;
          return (
            <li key={href} className="flex-1 relative">
              <Link
                href={href}
                className="relative flex flex-col items-center justify-center gap-[3px] h-full w-full transition-all duration-200 active:translate-y-[1px]"
                style={{
                  color: active ? "#B95368" : "var(--muted)",
                  fontFamily: "var(--font-noto), sans-serif",
                  background: active
                    ? "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(247,224,232,0.85) 55%, rgba(232,180,196,0.55) 100%)"
                    : "transparent",
                  borderTop: active
                    ? "2px solid rgba(201,169,110,0.95)"
                    : "2px solid transparent",
                  boxShadow: active
                    ? [
                        "inset 0 1px 0 rgba(255,255,255,0.85)",
                        "inset 0 -2px 0 rgba(196,104,122,0.28)",
                        "inset 0 0 12px rgba(228,180,196,0.35)",
                        "0 2px 6px rgba(196,104,122,0.18)",
                      ].join(", ")
                    : "none",
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2.2 : 1.6}
                  style={{
                    transform: active ? "translateY(-1px)" : "translateY(0)",
                    filter: active
                      ? "drop-shadow(0 1px 1.5px rgba(158,74,90,0.55))"
                      : "drop-shadow(0 1px 1px rgba(42,28,32,0.10))",
                    transition: "transform 0.2s ease",
                  }}
                />
                <span
                  className="text-[10px] tracking-wide"
                  style={{
                    fontWeight: active ? 700 : 500,
                    textShadow: active
                      ? "0 1px 0 rgba(255,255,255,0.7)"
                      : "0 1px 0 rgba(255,255,255,0.6)",
                  }}
                >
                  {label}
                </span>
                {active && (
                  <span
                    className="absolute bottom-1 w-5 h-1 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(201,169,110,0.95) 0%, rgba(228,124,151,0.95) 100%)",
                      boxShadow: "0 0 6px rgba(201,169,110,0.55)",
                    }}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
