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
            const isHome = href === "/";
            const isContact = href === "/contact";
            const pinkActive = active && isContact;
            const goldActive = active && !isContact;

            return (
              <li key={href} className="flex-1 flex justify-center">
                <Link
                  href={href}
                  className="btn-press flex flex-col items-center justify-center gap-0 w-full max-w-[58px] py-1 rounded-[16px]"
                  style={{
                    color: pinkActive
                      ? "#b84562"
                      : goldActive
                        ? "#7a6220"
                        : "rgba(140, 125, 132, 0.55)",
                    fontFamily: "var(--font-noto), sans-serif",
                    background: pinkActive
                      ? "linear-gradient(165deg, rgba(255,255,255,0.98) 0%, rgba(255,230,242,0.92) 55%, rgba(252,208,226,0.72) 100%)"
                      : goldActive
                        ? "linear-gradient(165deg, rgba(255,255,255,0.98) 0%, rgba(255,248,228,0.94) 55%, rgba(245,220,165,0.78) 100%)"
                        : "transparent",
                    boxShadow: pinkActive
                      ? [
                          "inset 0 1px 0 rgba(255,255,255,0.95)",
                          "inset 0 -1px 0 rgba(196,104,122,0.12)",
                          "0 3px 12px rgba(196,104,122,0.22)",
                          "0 0 0 1px rgba(201,169,110,0.32)",
                        ].join(", ")
                      : goldActive
                        ? [
                            "inset 0 1px 0 rgba(255,255,255,0.95)",
                            "inset 0 -1px 0 rgba(200,165,80,0.14)",
                            "0 3px 12px rgba(200,165,80,0.20)",
                            "0 0 0 1px rgba(195,170,120,0.38)",
                          ].join(", ")
                        : "none",
                    transform: active ? "translateY(-2px)" : "none",
                  }}
                >
                  {/* アイコン丸背景 */}
                  <span
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: isHome ? 36 : 34,
                      height: isHome ? 36 : 34,
                      background: pinkActive
                        ? "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(252,218,234,0.82) 100%)"
                        : goldActive
                          ? "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(255,236,200,0.88) 100%)"
                          : "rgba(255,255,255,0.18)",
                      boxShadow: pinkActive
                        ? [
                            "inset 0 1px 0 rgba(255,255,255,0.98)",
                            "inset 0 -1px 0 rgba(196,104,122,0.18)",
                            "0 3px 8px rgba(196,104,122,0.22)",
                          ].join(", ")
                        : goldActive
                          ? [
                              "inset 0 1px 0 rgba(255,255,255,0.98)",
                              "inset 0 -1px 0 rgba(190,155,70,0.20)",
                              "0 3px 8px rgba(200,165,80,0.20)",
                            ].join(", ")
                          : "none",
                    }}
                  >
                    <Icon
                      size={isHome ? 20 : 18}
                      strokeWidth={active ? 2.2 : 1.55}
                      style={{
                        color: pinkActive
                          ? "#c4687a"
                          : goldActive
                            ? "#a67c20"
                            : "rgba(130, 115, 122, 0.50)",
                        filter: pinkActive
                          ? "drop-shadow(0 1px 2px rgba(196,104,122,0.40))"
                          : goldActive
                            ? "drop-shadow(0 1px 2px rgba(180,140,50,0.35))"
                            : "none",
                      }}
                    />
                  </span>

                  {/* ラベル */}
                  <span
                    className="text-[9px] tracking-tight leading-none mt-0.5"
                    style={{
                      fontWeight: active ? 700 : 500,
                      opacity: active ? 1 : 0.55,
                    }}
                  >
                    {label}
                  </span>

                  {/* ホームのみ：ピンクインジケータードット */}
                  {isHome && (
                    <span
                      style={{
                        display: "block",
                        width: active ? "18px" : "5px",
                        height: "2.5px",
                        borderRadius: "999px",
                        marginTop: "2px",
                        background: active
                          ? "linear-gradient(90deg, #E8C458, #B8860B)"
                          : "rgba(180, 150, 80, 0.22)",
                        transition: "width 0.3s ease",
                        boxShadow: active
                          ? "0 1px 4px rgba(180,140,50,0.40)"
                          : "none",
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
