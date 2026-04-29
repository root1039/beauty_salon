"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Clock, Heart, MessageCircle } from "lucide-react";

const LINE_URL = "https://line.me/R/ti/p/@root1039";

const values = [
  { num: "01", title: "根本を見る", body: "悩みの表面ではなく、その原因・習慣・土台を見つめます。体型、肌、不調のほとんどは日常の積み重ねから生まれています。" },
  { num: "02", title: "毎日の質を上げる", body: "着る・食べる・使う・飲む・休む。毎日の選択の質を少しずつ整えることで、身体は自然と変わっていきます。" },
  { num: "03", title: "施術で整え、習慣で育てる", body: "Winbackの施術で身体の土台を整え、補整下着・水・食品で日常を変える。施術後も戻らない身体をつくります。" },
  { num: "04", title: "ごきげんに生きる", body: "健康も美容も、我慢や制限ではなく、機嫌よく自分を整える選択から。Root1039が目指すのは、ごきげんな毎日です。" },
];

const tabNames = ["プロフィール", "コンセプト", "アクセス"];

export default function AboutTabs() {
  const searchParams = useSearchParams();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (searchParams.get("tab") === "concept") setActiveIdx(1);
  }, [searchParams]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* Tab bar */}
      <div
        className="flex shrink-0"
        style={{ borderBottom: "1px solid var(--border)", background: "white" }}
      >
        {tabNames.map((name, i) => (
          <button
            key={name}
            onClick={() => setActiveIdx(i)}
            className="flex-1 py-3 text-xs font-medium transition-all"
            style={{
              color: i === activeIdx ? "var(--rose)" : "var(--muted)",
              borderBottom: i === activeIdx ? "2px solid var(--rose)" : "2px solid transparent",
              background: "none",
              outline: "none",
              fontFamily: "var(--font-noto), sans-serif",
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ background: "var(--cream)" }}>

        {/* ── プロフィール ── */}
        {activeIdx === 0 && (
          <div className="p-4 space-y-3">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <div
                className="w-full h-32 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--rose-light), var(--rose-muted))" }}
              >
                <div className="text-center">
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-1 flex items-center justify-center"
                    style={{ background: "var(--rose)" }}
                  >
                    <span className="text-white text-xl" style={{ fontFamily: "var(--font-shippori), serif" }}>ゆ</span>
                  </div>
                  <p className="text-[10px]" style={{ color: "var(--rose-dark)" }}>Photo</p>
                </div>
              </div>
              <div className="p-5" style={{ background: "white" }}>
                <p className="text-[10px] tracking-widest mb-1" style={{ color: "var(--rose)" }}>PROFILE</p>
                <h2 className="text-lg mb-0.5" style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}>
                  高橋 佑卯美（ゆーみん）
                </h2>
                <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>美容歴16年 / 2児の母</p>
                <p className="text-sm leading-6" style={{ color: "var(--charcoal)" }}>
                  「着る・食べる・使う｜習慣の質を整えてごきげんに生きる」をテーマに、
                  仙台・泉中央でRoot1039を運営。
                  難しいことを生活に近い言葉で伝えることが得意な"ピンクの人"です。
                </p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/yuumin_root1039/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl active:opacity-70 transition-opacity"
              style={{ background: "white", border: "1px solid var(--border)" }}
            >
              <span className="text-sm" style={{ color: "var(--charcoal)" }}>Instagramはこちら</span>
              <span className="text-xs font-medium" style={{ color: "var(--rose)" }}>@yuumin_root1039 →</span>
            </a>
          </div>
        )}

        {/* ── コンセプト ── */}
        {activeIdx === 1 && (
          <div className="p-4 space-y-3">
            <p
              className="text-sm leading-6 px-1 mb-1"
              style={{ color: "var(--muted)" }}
            >
              美容の悩みも身体の不調も、原因は日常の中にあります。
              Root1039は、その根っこを一緒に見つけ、整えていきます。
            </p>
            {values.map((v) => (
              <div
                key={v.num}
                className="rounded-2xl p-4"
                style={{ background: "white", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start gap-3">
                  <span
                    className="text-2xl leading-none shrink-0"
                    style={{ fontFamily: "var(--font-shippori), serif", color: "var(--rose-muted)" }}
                  >
                    {v.num}
                  </span>
                  <div>
                    <h3 className="text-sm mb-1" style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}>
                      {v.title}
                    </h3>
                    <p className="text-xs leading-5" style={{ color: "var(--muted)" }}>{v.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── アクセス ── */}
        {activeIdx === 2 && (
          <div className="p-4 space-y-3">
            <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid var(--border)" }}>
              <p className="text-[10px] tracking-widest mb-4" style={{ color: "var(--rose)" }}>SALON INFO</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "var(--rose)" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--charcoal)" }}>所在地</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                      宮城県仙台市泉区<br />（詳細はご予約後にお知らせします）
                    </p>
                  </div>
                </li>
                <div className="h-px" style={{ background: "var(--border)" }} />
                <li className="flex items-start gap-3">
                  <Clock size={15} className="mt-0.5 shrink-0" style={{ color: "var(--rose)" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--charcoal)" }}>営業時間</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>完全予約制（LINEにてご相談ください）</p>
                  </div>
                </li>
                <div className="h-px" style={{ background: "var(--border)" }} />
                <li className="flex items-start gap-3">
                  <Heart size={15} className="mt-0.5 shrink-0" style={{ color: "var(--rose)" }} />
                  <p className="text-sm" style={{ color: "var(--charcoal)" }}>女性専用サロン</p>
                </li>
              </ul>
            </div>
            <a
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-xl text-sm font-medium active:opacity-80 transition-opacity"
              style={{ background: "#06C755", color: "white" }}
            >
              <MessageCircle size={16} />
              LINEで予約する
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
