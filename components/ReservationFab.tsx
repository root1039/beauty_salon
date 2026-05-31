"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays } from "lucide-react";

/** 全ページ右下に浮かぶ予約 FAB（/contact では非表示） */
export default function ReservationFab() {
  const pathname = usePathname();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const normalized =
    pathname.replace(new RegExp(`^${basePath}`), "").replace(/\/+$/, "") || "/";

  if (normalized === "/contact") return null;

  return (
    /* app-frame と同幅で中央揃え → right: 16px で右端内側に収まる */
    <div
      aria-hidden={false}
      className="fab-resv-wrap"
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        bottom: 0,
        pointerEvents: "none",
        zIndex: 48,
      }}
    >
      <Link
        href="/contact"
        aria-label="ご予約はこちら"
        className="btn-press fab-resv flex flex-col items-center justify-center gap-0.5"
        style={{
          position: "absolute",
          right: "16px",
          bottom: "calc(82px + env(safe-area-inset-bottom, 0px))",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background:
            "linear-gradient(145deg, #F099B3 0%, #E47C97 45%, #C4687A 100%)",
          border: "1px solid rgba(158,74,90,0.55)",
          color: "white",
          textDecoration: "none",
          textShadow: "0 1px 1px rgba(120,55,70,0.45)",
          pointerEvents: "auto",
        }}
      >
        <CalendarDays size={21} strokeWidth={2} style={{ color: "white" }} />
        <span
          style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            lineHeight: 1,
            fontFamily: "var(--font-noto), sans-serif",
          }}
        >
          予約
        </span>
      </Link>
    </div>
  );
}
