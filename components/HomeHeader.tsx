"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Home, User, Sparkles, BookOpen, MessageCircle } from "lucide-react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const menuItems = [
  { href: "/", label: "ホーム", Icon: Home },
  { href: "/about", label: "サロンについて", Icon: User },
  { href: "/menu", label: "メニュー", Icon: Sparkles },
  { href: "/blog", label: "ブログ", Icon: BookOpen },
  { href: "/contact", label: "ご予約・お問い合わせ", Icon: MessageCircle },
];

export default function HomeHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  return (
    <div className="flex items-start justify-between gap-2 px-2.5 mb-1.5">
      {/* Left: Logo + Text */}
      <Link href="/" className="flex items-center gap-1.5" style={{ textDecoration: "none" }}>
        <Image
          src={`${BASE_PATH}/images/header-icon.png`}
          alt="Root1039"
          width={58}
          height={58}
          className="object-contain"
          style={{ width: 58, height: 58 }}
        />
        <div>
          <p
            style={{
              margin: 0,
              fontSize: "15px",
              lineHeight: 1.3,
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
              fontSize: "14px",
              lineHeight: 1.3,
              fontWeight: 600,
              letterSpacing: "0.06em",
              fontFamily: "var(--font-shippori), serif",
              color: "#C4687A",
            }}
          >
            泉中央駅 北出口3から徒歩5分
          </p>
        </div>
      </Link>

      {/* Right: Instagram + Hamburger */}
      <div
        className="relative flex items-center gap-0.5"
        style={{ color: "#2A1C20" }}
        ref={menuRef}
      >
        {/* Instagram */}
        <a
          href="https://www.instagram.com/yuumin_root1039/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="rounded-md p-1.5 transition"
          style={{ color: "#C4687A" }}
        >
          <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-1.5 transition"
          style={{
            background: open ? "rgba(196,104,122,0.1)" : "transparent",
            color: open ? "#C4687A" : "#2A1C20",
          }}
          aria-label="メニュー"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-0 top-[42px] z-40 w-[170px] overflow-hidden rounded-lg bg-white"
            style={{
              border: "1px solid var(--gray-light)",
              boxShadow: "0 14px 30px rgba(42,28,32,0.18)",
            }}
          >
            {menuItems.map(({ href, label, Icon }, idx) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 transition"
                style={{
                  textDecoration: "none",
                  borderBottom:
                    idx < menuItems.length - 1
                      ? "1px solid var(--pink-pale)"
                      : "none",
                  color: "#7A6065",
                  fontFamily: "var(--font-shippori), serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
