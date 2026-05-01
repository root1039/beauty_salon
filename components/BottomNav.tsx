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
      className="fixed bottom-0 z-50 bottom-nav-shell"
      style={{
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        className="mx-2 mb-1 rounded-[22px] overflow-hidden bottom-nav-inner"
        style={{
          background:
            "linear-gradient(185deg, rgba(255,253,254,0.98) 0%, rgba(248,238,244,0.97) 42%, rgba(238,228,238,0.96) 100%)",
          border: "1px solid rgba(201,169,110,0.42)",
          boxShadow: [
            "inset 0 1px 0 rgba(255,255,255,0.98)",
            "inset 0 -1px 0 rgba(201,169,110,0.15)",
            "0 -6px 28px rgba(196,104,122,0.12)",
            "0 -2px 12px rgba(42,28,32,0.07)",
          ].join(", "),
        }}
      >
        <ul className="flex items-center justify-between px-1.5 h-[62px]">
          {navItems.map(({ href, label, Icon }) => {
            const normalizedHref = href.replace(/\/+$/, "") || "/";
            const active = normalizedPathname === normalizedHref;
            return (
              <li key={href} className="flex-1 flex justify-center">
                <Link
                  href={href}
                  className="flex flex-col items-center justify-center gap-0.5 w-full max-w-[58px] py-1.5 rounded-[14px] transition-all duration-200 active:scale-[0.97]"
                  style={{
                    color: active ? "#b84562" : "#8a787e",
                    fontFamily: "var(--font-noto), sans-serif",
                    background: active
                      ? "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(255,236,244,0.88) 55%, rgba(252,214,228,0.65) 100%)"
                      : "transparent",
                    boxShadow: active
                      ? [
                          "inset 0 1px 0 rgba(255,255,255,0.9)",
                          "0 2px 10px rgba(196,104,122,0.18)",
                          "0 0 0 1px rgba(201,169,110,0.35)",
                        ].join(", ")
                      : "none",
                  }}
                >
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 34,
                      height: 34,
                      background: active
                        ? "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(252,224,234,0.75) 100%)"
                        : "rgba(255,255,255,0.35)",
                      boxShadow: active
                        ? "inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 6px rgba(196,104,122,0.15)"
                        : "none",
                    }}
                  >
                    <Icon
                      size={19}
                      strokeWidth={active ? 2.15 : 1.65}
                      style={{
                        color: active ? "#c4687a" : "#9a8a90",
                        filter: active
                          ? "drop-shadow(0 1px 1px rgba(196,104,122,0.35))"
                          : "none",
                      }}
                    />
                  </span>
                  <span
                    className="text-[9px] tracking-tight leading-none mt-0.5"
                    style={{
                      fontWeight: active ? 700 : 500,
                      opacity: active ? 1 : 0.88,
                    }}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
