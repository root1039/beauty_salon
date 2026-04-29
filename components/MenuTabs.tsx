"use client";

import { useState } from "react";
import { Zap, Shirt, Droplets, Leaf, MessageCircle } from "lucide-react";

const LINE_URL = "https://line.me/R/ti/p/@root1039";

const tabs = [
  {
    id: "winback",
    label: "施術",
    en: "TREATMENT",
    Icon: Zap,
    title: "Winback 施術",
    subtitle: "整いやすい身体のきっかけをつくる",
    description: "最先端のテクノロジーを使ったWinbackで、身体の巡りを整え、ボディメイクしやすい土台をつくります。体重より見た目・ライン・姿勢・巡りにアプローチします。",
    points: ["ボディメイク・ラインづくり", "むくみ・巡りの改善", "姿勢・身体の使い方を整える", "施術後も戻らない身体へ"],
    headerBg: "linear-gradient(135deg, #1C1C1C 0%, #3D2530 100%)",
    headerColor: "#FAF8F5",
    accentColor: "var(--rose-muted)",
  },
  {
    id: "innerwear",
    label: "補整下着",
    en: "INNERWEAR",
    Icon: Shirt,
    title: "補整下着",
    subtitle: "毎日身につけるもので身体を変える",
    description: "間違った下着選びは、姿勢の崩れや体調不良の原因になります。Root1039では、身体の構造に合った補整下着を提案。毎日の着用で施術効果を日常にキープします。",
    points: ["姿勢・ボディラインをサポート", "施術後の状態を維持する", "体への圧迫・締め付けを見直す", "身体の根本改善をサポート"],
    headerBg: "linear-gradient(135deg, #F2D4DA 0%, #E8BEC7 100%)",
    headerColor: "var(--charcoal)",
    accentColor: "var(--rose-dark)",
  },
  {
    id: "water",
    label: "水素水",
    en: "WATER",
    Icon: Droplets,
    title: "電解水素水",
    subtitle: "身体に入るものの土台を変える",
    description: "人が毎日必ず摂るもの——それが水。まず水を変えることが、身体の内側から整える最初のステップ。食事改善よりも取り組みやすく、続けやすい習慣改善です。",
    points: ["身体の内側から整える", "水道水との違いを体感", "毎日の習慣として続けやすい", "家族みんなで使える"],
    headerBg: "linear-gradient(135deg, #E8F4F8 0%, #D4E8F0 100%)",
    headerColor: "var(--charcoal)",
    accentColor: "#4A8FA0",
  },
  {
    id: "food",
    label: "食品・日用品",
    en: "DAILY GOODS",
    Icon: Leaf,
    title: "食品・日用品",
    subtitle: "毎日の選択を、丁寧に変える",
    description: "食品・消耗品・寝具まで——毎日触れるもの、食べるもの、使うものの質を見直します。商品を売るのではなく、生活習慣の改善として丁寧に提案します。",
    points: ["食品・サプリメント", "スキンケア・消耗品", "寝具・睡眠環境", "日用品の質の見直し"],
    headerBg: "linear-gradient(135deg, #F5F0E8 0%, #EDE5D4 100%)",
    headerColor: "var(--charcoal)",
    accentColor: "#8B7050",
  },
];

export default function MenuTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const tab = tabs[activeIdx];
  const { Icon } = tab;

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* Tab bar */}
      <div
        className="flex overflow-x-auto shrink-0"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "white",
          scrollbarWidth: "none",
        }}
      >
        {tabs.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActiveIdx(i)}
            className="shrink-0 px-4 py-3 text-xs font-medium transition-all whitespace-nowrap"
            style={{
              color: i === activeIdx ? "var(--rose)" : "var(--muted)",
              borderBottom: i === activeIdx ? "2px solid var(--rose)" : "2px solid transparent",
              background: "none",
              outline: "none",
              fontFamily: "var(--font-noto), sans-serif",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Card header */}
        <div className="p-5" style={{ background: tab.headerBg }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              <Icon size={18} style={{ color: tab.accentColor }} />
            </div>
            <span className="text-[10px] tracking-[0.2em]" style={{ color: tab.accentColor }}>
              {tab.en}
            </span>
          </div>
          <h2
            className="text-xl mb-1"
            style={{ fontFamily: "var(--font-shippori), serif", color: tab.headerColor }}
          >
            {tab.title}
          </h2>
          <p className="text-xs" style={{ color: tab.headerColor, opacity: 0.7 }}>
            {tab.subtitle}
          </p>
        </div>

        {/* Body */}
        <div className="p-5" style={{ background: "var(--cream)" }}>
          <p className="text-sm leading-7 mb-4" style={{ color: "var(--charcoal)" }}>
            {tab.description}
          </p>
          <ul className="space-y-2.5 mb-6">
            {tab.points.map((pt) => (
              <li key={pt} className="flex items-center gap-2.5 text-sm" style={{ color: "var(--muted)" }}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--rose)" }} />
                {pt}
              </li>
            ))}
          </ul>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full h-12 rounded-xl text-sm font-medium active:opacity-80 transition-opacity"
            style={{ background: "#06C755", color: "white" }}
          >
            <MessageCircle size={16} />
            LINEで相談・予約する
          </a>
        </div>
      </div>
    </div>
  );
}
