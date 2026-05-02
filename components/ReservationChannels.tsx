"use client";

import { Mail, MessageCircle, ChevronRight } from "lucide-react";

const LINE_ADD_URL = "https://lin.ee/zCQoCoz";

export default function ReservationChannels() {
  return (
    <section className="px-4 pt-4 pb-6">
      <div
        className="rounded-2xl p-5"
        style={{
          background: "white",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 28px rgba(42, 28, 32, 0.06)",
        }}
      >
        <p className="text-[11px] tracking-[0.18em] mb-1" style={{ color: "var(--rose)" }}>
          RESERVATION
        </p>
        <h2
          className="text-base mb-5"
          style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
        >
          ご予約方法をお選びください
        </h2>

        {/* ── LINE ボタン ── */}
        <a
          href={LINE_ADD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-press flex items-center gap-4 w-full px-5 rounded-2xl"
          style={{
            height: "72px",
            background: "linear-gradient(180deg, #1ADA6E 0%, #06C755 55%, #05AA49 100%)",
            border: "1px solid rgba(4, 140, 60, 0.55)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.30)",
              "inset 0 -3px 0 rgba(3, 90, 38, 0.50)",
              "0 1px 0 rgba(255,255,255,0.45)",
              "0 4px 0 rgba(3, 90, 38, 0.40)",
              "0 8px 22px rgba(6, 199, 85, 0.38)",
              "0 2px 6px rgba(42, 28, 32, 0.12)",
            ].join(", "),
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "11px",
              background: "rgba(255,255,255,0.20)",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <MessageCircle size={22} strokeWidth={2.2} style={{ color: "white" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "16px",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-noto), sans-serif",
                lineHeight: 1.2,
                textShadow: "0 1px 2px rgba(2, 70, 30, 0.45)",
              }}
            >
              LINEで予約する
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.80)",
                fontSize: "11px",
                marginTop: "3px",
                fontFamily: "var(--font-noto), sans-serif",
              }}
            >
              公式アカウントに友だち追加
            </p>
          </div>
          <ChevronRight size={20} style={{ color: "rgba(255,255,255,0.70)", flexShrink: 0 }} />
        </a>

        <div style={{ height: "10px" }} />

        {/* ── メール ボタン ── */}
        <button
          type="button"
          title="メールでの予約は現在準備中です"
          aria-label="メールで予約（準備中）"
          className="flex items-center gap-4 w-full px-5 rounded-2xl"
          style={{
            height: "72px",
            background: "linear-gradient(180deg, #FF7BA3 0%, #E84D7A 48%, #C42D5E 100%)",
            border: "1px solid rgba(165, 45, 85, 0.55)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.32)",
              "inset 0 -3px 0 rgba(110, 25, 55, 0.45)",
              "0 1px 0 rgba(255,255,255,0.4)",
              "0 4px 0 rgba(130, 35, 70, 0.42)",
              "0 8px 22px rgba(228, 77, 122, 0.42)",
              "0 2px 6px rgba(42, 28, 32, 0.12)",
            ].join(", "),
            cursor: "default",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "11px",
              background: "rgba(255,255,255,0.22)",
              border: "1px solid rgba(255,255,255,0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Mail size={22} strokeWidth={2.2} style={{ color: "white" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "16px",
                letterSpacing: "0.04em",
                fontFamily: "var(--font-noto), sans-serif",
                lineHeight: 1.2,
                textShadow: "0 1px 2px rgba(90, 20, 45, 0.45)",
              }}
            >
              メールで予約する
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.88)",
                fontSize: "11px",
                marginTop: "3px",
                fontFamily: "var(--font-noto), sans-serif",
              }}
            >
              準備中
            </p>
          </div>
        </button>

        <p className="text-[10px] leading-5 mt-4 text-center" style={{ color: "var(--muted)" }}>
          LINEは友だち追加後、トークからご予約・ご相談いただけます。
        </p>
      </div>
    </section>
  );
}
