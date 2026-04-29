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
      className="glass fixed bottom-0 z-50 border-t"
      style={{
        borderColor: "var(--gold-border)",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        borderTop: "1px solid rgba(201,169,110,0.25)",
      }}
    >
      <ul className="flex items-stretch justify-around h-[68px] max-w-lg mx-auto">
        {navItems.map(({ href, label, Icon }) => {
          const normalizedHref = href.replace(/\/+$/, "") || "/";
          const active = normalizedPathname === normalizedHref;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="flex flex-col items-center justify-center gap-[3px] h-full w-full transition-all duration-200"
                style={{
                  color: active ? "#B95368" : "var(--muted)",
                  fontFamily: "var(--font-noto), sans-serif",
                  background: active ? "linear-gradient(180deg, rgba(228,124,151,0.16) 0%, rgba(228,124,151,0.05) 100%)" : "transparent",
                  borderTop: active ? "2px solid rgba(201,169,110,0.85)" : "2px solid transparent",
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2 : 1.5}
                  style={{
                    transform: active ? "translateY(-1px)" : "translateY(0)",
                    filter: active ? "drop-shadow(0 1px 1px rgba(185,83,104,0.35))" : "none",
                    transition: "transform 0.2s ease",
                  }}
                />
                <span
                  className="text-[10px] tracking-wide"
                  style={{
                    fontWeight: active ? 700 : 400,
                    textShadow: active ? "0 0 0.2px rgba(185,83,104,0.45)" : "none",
                  }}
                >
                  {label}
                </span>
                {active && (
                  <span
                    className="absolute bottom-1 w-5 h-1 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, rgba(201,169,110,0.95) 0%, rgba(228,124,151,0.95) 100%)",
                      boxShadow: "0 0 5px rgba(201,169,110,0.45)",
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
