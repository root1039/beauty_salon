"use client";

import { Mail, MessageCircle } from "lucide-react";

const LINE_ADD_URL = "https://lin.ee/zCQoCoz";

const chipBase =
  "flex flex-col items-center justify-center gap-2 rounded-xl px-3 py-4 text-center transition-all active:scale-[0.98] border";

export default function ReservationChannels() {
  return (
    <section className="px-4 pt-8 pb-6">
      <div
        className="rounded-2xl p-5"
        style={{
          background: "white",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 28px rgba(42, 28, 32, 0.06)",
        }}
      >
        <p
          className="text-[11px] tracking-[0.18em] mb-1"
          style={{ color: "var(--rose)" }}
        >
          RESERVATION
        </p>
        <h2
          className="text-base mb-4"
          style={{
            fontFamily: "var(--font-shippori), serif",
            color: "var(--charcoal)",
          }}
        >
          ご予約方法をお選びください
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            title="メールでの予約は現在準備中です"
            aria-label="メールで予約（準備中）"
            className={chipBase}
            style={{
              background: "var(--cream)",
              borderColor: "var(--border)",
              color: "var(--charcoal)",
              cursor: "default",
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(196, 104, 122, 0.12)" }}
            >
              <Mail size={18} strokeWidth={2} style={{ color: "var(--rose)" }} />
            </div>
            <span className="text-xs font-semibold leading-tight" style={{ fontFamily: "var(--font-noto), sans-serif" }}>
              メールで
              <br />
              予約
            </span>
            <span className="text-[10px] leading-tight" style={{ color: "var(--muted)" }}>
              準備中
            </span>
          </button>
          <a
            href={LINE_ADD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={chipBase}
            style={{
              background: "linear-gradient(180deg, #f4fdf7 0%, #e8faf0 100%)",
              borderColor: "rgba(6, 199, 85, 0.35)",
              color: "#04502a",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: "rgba(6, 199, 85, 0.15)" }}
            >
              <MessageCircle size={18} strokeWidth={2} color="#06C755" />
            </div>
            <span className="text-xs font-semibold leading-tight" style={{ fontFamily: "var(--font-noto), sans-serif" }}>
              LINEで
              <br />
              予約
            </span>
            <span className="text-[10px] leading-tight" style={{ color: "rgba(4, 80, 42, 0.75)" }}>
              公式を追加
            </span>
          </a>
        </div>
        <p className="text-[10px] leading-5 mt-4 text-center" style={{ color: "var(--muted)" }}>
          LINEは友だち追加後、トークからご予約・ご相談いただけます。
        </p>
      </div>
    </section>
  );
}
