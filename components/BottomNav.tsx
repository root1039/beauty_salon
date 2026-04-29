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
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="flex flex-col items-center justify-center gap-[3px] h-full w-full transition-all duration-200"
                style={{
                  color: active ? "var(--rose)" : "var(--muted)",
                  fontFamily: "var(--font-noto), sans-serif",
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={active ? 2 : 1.5}
                  style={{
                    transform: active ? "translateY(-1px)" : "translateY(0)",
                    transition: "transform 0.2s ease",
                  }}
                />
                <span
                  className="text-[10px] tracking-wide"
                  style={{ fontWeight: active ? 700 : 400 }}
                >
                  {label}
                </span>
                {active && (
                  <span
                    className="absolute bottom-1 w-1 h-1 rounded-full"
                    style={{ background: "var(--rose)" }}
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
