"use client";

import { useState, useEffect, useRef, startTransition, type CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const RESERVATION_URL = "/contact";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const SALON_ADDRESS_LINE = "宮城県仙台市泉区泉中央2丁目21-1";
const SALON_POSTAL = "〒981-3133";

/** 店舗所在地付近の地図 */
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${encodeURIComponent(
  "宮城県仙台市泉区泉中央2丁目21-1"
)}&hl=ja&z=16&output=embed`;

const salonConceptCards = [
  { num: "01", title: "根本を見る", body: "悩みの表面ではなく、その原因・習慣・土台を見つめます。体型、肌、不調のほとんどは日常の積み重ねから生まれています。" },
  { num: "02", title: "毎日の質を上げる", body: "着る・食べる・使う・飲む・休む。毎日の選択の質を少しずつ整えることで、身体は自然と変わっていきます。" },
  { num: "03", title: "施術で整え、習慣で育てる", body: "施術で身体の土台を整え、補整下着・水・食品で日常を変える。施術後も戻りにくい身体をつくります。" },
  { num: "04", title: "ごきげんに生きる", body: "健康も美容も、我慢や制限ではなく、機嫌よく自分を整える選択から。Root1039が目指すのは、ごきげんな毎日です。" },
];

const tabNames = ["代表挨拶", "会社・サロン概要", "アクセス"];

const reservationButtonStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  background: "linear-gradient(180deg, #F099B3 0%, #E47C97 45%, #C4687A 100%)",
  color: "white",
  width: "100%",
  maxWidth: "200px",
  height: "38px",
  borderRadius: "9px",
  border: "1px solid rgba(158,74,90,0.55)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.55)",
    "inset 0 -2px 0 rgba(158,74,90,0.55)",
    "0 1px 0 rgba(255,255,255,0.5)",
    "0 3px 0 rgba(120,55,70,0.5)",
    "0 6px 14px rgba(158,74,90,0.40)",
    "0 1px 2px rgba(42,28,32,0.22)",
  ].join(", "),
  letterSpacing: "0.12em",
  fontFamily: "var(--font-noto), sans-serif",
  fontSize: "13px",
  fontWeight: 600,
  textShadow: "0 1px 1px rgba(120,55,70,0.55)",
};

function GreetingVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.defaultMuted = true;
    el.muted = true;
    const tryPlay = () => {
      void el.play().catch(() => {});
    };
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
    };
  }, []);
  return (
    <video
      ref={ref}
      className="block w-full h-auto align-top"
      autoPlay
      playsInline
      muted
      loop
      preload="auto"
      poster={`${BASE_PATH}/images/profile.png`}
      aria-label="代表 高橋 佑卯美"
    >
      <source src={`${BASE_PATH}/images/profile.mp4`} type="video/mp4" />
    </video>
  );
}

export default function AboutTabs() {
  const searchParams = useSearchParams();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "overview" || tab === "concept") {
      startTransition(() => setActiveIdx(1));
    } else if (tab === "access") {
      startTransition(() => setActiveIdx(2));
    }
  }, [searchParams]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* Tab bar */}
      <div
        className="flex shrink-0 pt-1"
        style={{ borderBottom: "1px solid var(--border)", background: "white" }}
      >
        {tabNames.map((name, i) => (
          <button
            key={name}
            onClick={() => setActiveIdx(i)}
            className="flex-1 py-3 text-xs font-medium transition-all leading-tight"
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

        {/* ── 代表挨拶 ── */}
        {activeIdx === 0 && (
          <div className="p-4 space-y-4">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
              <GreetingVideo />
              <div className="p-5" style={{ background: "white" }}>
                <p className="text-[10px] tracking-widest mb-1" style={{ color: "var(--rose)" }}>GREETING</p>
                <h2 className="text-lg mb-0.5" style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}>
                  代表挨拶
                </h2>
                <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
                  高橋 佑卯美（ゆーみん）｜美容歴16年 / 2児の母
                </p>
                <div className="text-sm leading-7 space-y-4" style={{ color: "var(--charcoal)" }}>
                  <p>
                    はじめまして。Root1039の代表を務めております、高橋 佑卯美です。
                    美容の現場に携わって早いもので16年。母として子どもを育てながら、このサロンを通じて皆さまと向き合う日々を大切にしています。
                  </p>
                  <p>
                    私がこの仕事に込めているのは、「お客様おひとりおひとりの悩みを、根本から少しずつ良い方向へ変えていきたい」という思いです。
                    体型や肌、不調のこと——表面的なテクニックだけでは続きにくいものだからこそ、習慣や身体の土台まで一緒に見つめ直し、無理のない歩み方をご提案したいと考えています。
                  </p>
                  <p>
                    経営者として誠実であり続けるためにも、流行に流されず、あなたに本当に必要なケアと情報だけをお届けすることを約束します。
                    そして最終的には、鏡の前の悦びにとどまらず、日々が穏やかで満たされ、ご自身の人生を心から楽しめる——そんな「豊かな毎日」を送っていただきたい。それが私の願いです。
                  </p>
                  <p className="mb-0">
                    Root1039が、あなたの暮らしに寄り添う小さな支えになれたら幸いです。どうぞよろしくお願いいたします。
                  </p>
                </div>
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
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setActiveIdx(1)}
                className="inline-flex items-center gap-0.5 text-xs font-medium py-2 px-2 rounded-lg active:opacity-70 transition-opacity"
                style={{
                  color: "var(--rose)",
                  fontFamily: "var(--font-noto), sans-serif",
                  border: "1px solid var(--border)",
                  background: "white",
                }}
              >
                会社・サロン概要
                <ChevronRight size={16} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}

        {/* ── 会社・サロン概要 ── */}
        {activeIdx === 1 && (
          <div className="p-4 space-y-3">
            <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid var(--border)" }}>
              <p className="text-[10px] tracking-widest mb-3" style={{ color: "var(--rose)" }}>COMPANY & SALON</p>
              <h3 className="text-base mb-4" style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}>
                会社・サロン情報
              </h3>
              <dl className="space-y-4 text-xs" style={{ color: "var(--charcoal)" }}>
                <div>
                  <dt className="font-medium mb-1" style={{ color: "var(--rose-dark)" }}>サロン名</dt>
                  <dd style={{ color: "var(--muted)", lineHeight: 1.7 }}>Root1039</dd>
                </div>
                <div className="h-px" style={{ background: "var(--border)" }} />
                <div>
                  <dt className="font-medium mb-1" style={{ color: "var(--rose-dark)" }}>運営</dt>
                  <dd style={{ color: "var(--muted)", lineHeight: 1.7 }}>Rootiv株式会社</dd>
                </div>
                <div className="h-px" style={{ background: "var(--border)" }} />
                <div>
                  <dt className="font-medium mb-1" style={{ color: "var(--rose-dark)" }}>代表者</dt>
                  <dd style={{ color: "var(--muted)", lineHeight: 1.7 }}>高橋 佑卯美</dd>
                </div>
                <div className="h-px" style={{ background: "var(--border)" }} />
                <div>
                  <dt className="font-medium mb-1" style={{ color: "var(--rose-dark)" }}>所在地</dt>
                  <dd style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                    {SALON_POSTAL}
                    <br />
                    {SALON_ADDRESS_LINE}
                  </dd>
                </div>
                <div className="h-px" style={{ background: "var(--border)" }} />
                <div>
                  <dt className="font-medium mb-1" style={{ color: "var(--rose-dark)" }}>事業内容</dt>
                  <dd style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                    エステティックサービスの提供／美容・健康に関する商品のご案内・販売支援／美容に関する情報の発信
                  </dd>
                </div>
                <div className="h-px" style={{ background: "var(--border)" }} />
                <div>
                  <dt className="font-medium mb-1" style={{ color: "var(--rose-dark)" }}>営業時間・予約</dt>
                  <dd style={{ color: "var(--muted)", lineHeight: 1.7 }}>完全予約制</dd>
                </div>
              </dl>
            </div>
            <p
              className="text-xs leading-6 px-1"
              style={{ color: "var(--muted)" }}
            >
              美容の悩みも身体の不調も、原因は日常の中にあります。
              Root1039は、その根っこを一緒に見つけ、整えていきます。
            </p>
            <div
              className="rounded-2xl overflow-hidden bg-white"
              style={{ border: "1px solid var(--border)" }}
            >
              <img
                src={`${BASE_PATH}/images/header-1.png`}
                alt="Root1039 のコンセプト"
                className="block w-full h-auto align-top"
                loading="lazy"
                decoding="async"
              />
            </div>
            {salonConceptCards.map((v) => (
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
            <div className="flex items-center justify-between gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveIdx(0)}
                className="inline-flex items-center gap-0.5 text-xs font-medium py-2 px-2 rounded-lg active:opacity-70 transition-opacity"
                style={{
                  color: "var(--rose)",
                  fontFamily: "var(--font-noto), sans-serif",
                  border: "1px solid var(--border)",
                  background: "white",
                }}
              >
                <ChevronLeft size={16} strokeWidth={2.2} />
                代表挨拶
              </button>
              <button
                type="button"
                onClick={() => setActiveIdx(2)}
                className="inline-flex items-center gap-0.5 text-xs font-medium py-2 px-2 rounded-lg active:opacity-70 transition-opacity"
                style={{
                  color: "var(--rose)",
                  fontFamily: "var(--font-noto), sans-serif",
                  border: "1px solid var(--border)",
                  background: "white",
                }}
              >
                アクセス
                <ChevronRight size={16} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        )}

        {/* ── アクセス ── */}
        {activeIdx === 2 && (
          <div className="p-4 space-y-4">
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--border)", background: "white" }}>
              <iframe
                title="サロン所在地周辺の地図"
                src={MAP_EMBED_SRC}
                width="100%"
                height="240"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="rounded-2xl p-5" style={{ background: "white", border: "1px solid var(--border)" }}>
              <p className="text-[10px] tracking-widest mb-4" style={{ color: "var(--rose)" }}>SALON INFO</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "var(--rose)" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--charcoal)" }}>所在地</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)", lineHeight: 1.65 }}>
                      {SALON_POSTAL}
                      <br />
                      {SALON_ADDRESS_LINE}
                      <br />
                      泉中央駅から徒歩5分
                    </p>
                  </div>
                </li>
                <div className="h-px" style={{ background: "var(--border)" }} />
                <li className="flex items-start gap-3">
                  <Clock size={15} className="mt-0.5 shrink-0" style={{ color: "var(--rose)" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--charcoal)" }}>営業時間</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>完全予約制</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-stretch gap-3 pb-2">
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => setActiveIdx(1)}
                  className="inline-flex items-center gap-0.5 text-xs font-medium py-2 px-2 rounded-lg active:opacity-70 transition-opacity"
                  style={{
                    color: "var(--rose)",
                    fontFamily: "var(--font-noto), sans-serif",
                    border: "1px solid var(--border)",
                    background: "white",
                  }}
                >
                  <ChevronLeft size={16} strokeWidth={2.2} />
                  会社・サロン概要
                </button>
              </div>
              <div className="flex justify-center">
                <Link href={RESERVATION_URL} className="active:translate-y-[2px] transition-all" style={reservationButtonStyle}>
                  予約する
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
