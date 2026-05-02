"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Shirt, Droplets, Leaf } from "lucide-react";

const RESERVATION_URL = "/contact";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** メニュー記事用写真（public/images/menu/）。ASCIIファイル名のみ（GitHub Pages等で日本語URLが失敗するため） */
const MENU_IMG = {
  winback1: `${BASE_PATH}/images/menu/winback-1.png`,
  winback2: `${BASE_PATH}/images/menu/winback-2.png`,
  innerwear1: `${BASE_PATH}/images/menu/innerwear-1.png`,
  innerwear2: `${BASE_PATH}/images/menu/innerwear-2.png`,
  water1: `${BASE_PATH}/images/menu/water-1.png`,
  water2: `${BASE_PATH}/images/menu/water-2.png`,
  food1: `${BASE_PATH}/images/menu/food-1.png`,
  daily1: `${BASE_PATH}/images/menu/daily-1.png`,
} as const;

function MenuArticleImage({
  src,
  label,
  bg,
}: {
  src?: string;
  label: string;
  bg: string;
}) {
  const [broken, setBroken] = useState(false);
  const showPhoto = Boolean(src) && !broken;
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4 / 3",
        background: bg,
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "6px",
      }}
    >
      {showPhoto ? (
        <Image
          src={src!}
          alt={label}
          fill
          sizes="(max-width: 430px) 100vw, 400px"
          unoptimized
          style={{ objectFit: "cover" }}
          onError={() => setBroken(true)}
        />
      ) : (
        <span
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "10px",
            textAlign: "center",
            padding: "0 20px",
            lineHeight: 1.6,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

type Section =
  | { type: "lead"; text: string }
  | { type: "image"; label: string; bg: string; caption: string; src?: string }
  | { type: "text"; text: string }
  | { type: "heading"; text: string }
  | { type: "hashtags"; tags: string[] };

const tabs = [
  {
    id: "treatment",
    label: "施術",
    en: "TREATMENT",
    Icon: Zap,
    prTitle: "全ての周波数を、1台で。",
    prSubtitle: "高周波施術で身体の土台から整え、根本からボディラインをケア",
    headerBg:
      "linear-gradient(148deg, #121215 0%, #303038 22%, #1e1e24 48%, #484852 72%, #16161a 100%)",
    headerColor: "#f3f0ea",
    accentColor: "#d4bc90",
    sections: [
      {
        type: "lead" as const,
        text: "「ボディメイクしているのに、なかなか変わらない」——そんな悩みの根本には、身体の「巡り」が滞っていることが多いのです。Root1039では、高周波・中周波・低周波を1台にまとめた施術機器により、複数の周波数を組み合わせて深部へアプローチ。見た目・ライン・姿勢・巡りにフォーカスした、根本からのケアを体験していただけます。",
      },
      {
        type: "image" as const,
        label: "WINBACK BACK4",
        bg: "linear-gradient(135deg, #2A1C20 0%, #5A3040 100%)",
        caption: "複数周波数を組み合わせた、根本からのボディケア",
        src: MENU_IMG.winback1,
      },
      {
        type: "text" as const,
        text: "当サロンの施術の特徴は「複数の周波数を1台に搭載」していること。それぞれのエネルギーを組み合わせることで、従来は届きにくかった深部へのアプローチが可能です。体重よりも「見た目・ライン・姿勢・巡り」にフォーカスし、施術後も戻りにくい身体づくりをサポートします。",
      },
      {
        type: "image" as const,
        label: "WINBACK 周波数アプローチ",
        bg: "linear-gradient(135deg, #3D2530 0%, #6B3A46 100%)",
        caption: "運動現場でも選ばれる技術を、日常の身体ケアに",
        src: MENU_IMG.winback2,
      },
      {
        type: "text" as const,
        text: "国内外のスポーツやボディケアの現場でも高周波施術が活用されています。Root1039では、お一人おひとりの身体の状態を丁寧に確認しながら、オーダーメイドの施術プランをご提案します。",
      },
      {
        type: "hashtags" as const,
        tags: ["#高周波施術", "#根本改善", "#ボディメイク", "#仙台エステ", "#泉中央", "#Root1039", "#インナービューティ", "#姿勢改善"],
      },
    ] as Section[],
  },
  {
    id: "innerwear",
    label: "補整下着",
    en: "INNERWEAR",
    Icon: Shirt,
    prTitle: "着るだけで、身体が整う。",
    prSubtitle: "機能素材が身体に寄り添う、補整下着でならではの体感",
    headerBg:
      "linear-gradient(132deg, #9d766a 0%, #e9d2c8 26%, #c49a8c 52%, #f5ebe5 74%, #b0887c 100%)",
    headerColor: "#1f1417",
    accentColor: "#6d3d45",
    sections: [
      {
        type: "lead" as const,
        text: "「いくつになってもキレイでいたい」——その願いに、補整下着は近い存在です。単なる「締め付けるだけ」ではなく、特殊繊維と筐体への加工を組み合わせた素材が、着るだけで身体の内側にそっと働きかけます。毎日のコーディネートを、もう少し楽しく、軽やかに。",
      },
      {
        type: "image" as const,
        label: "補整下着イメージ",
        bg: "linear-gradient(135deg, #F0C8D5 0%, #D4A0B5 100%)",
        caption: "素材と設計にこだわった、次世代の補整下着",
        src: MENU_IMG.innerwear1,
      },
      {
        type: "text" as const,
        text: "姿勢をサポートし、ボディラインを自然に整える設計の補整下着。年齢や体型を問わず、からだに合った一枚を選ぶことが大切です。Root1039では試着しながら、お客さまの身体に合ったサイズと種類を丁寧にご提案します。",
      },
      {
        type: "image" as const,
        label: "女性のライフスタイル・ボディラインイメージ",
        bg: "linear-gradient(135deg, #EAC0CC 0%, #D4A0B0 100%)",
        caption: "毎日着用することで、施術効果を日常にキープ",
        src: MENU_IMG.innerwear2,
      },
      {
        type: "text" as const,
        text: "補整下着は「毎日身につけるもの」だからこそ、選び方が身体に直結します。間違った下着は、姿勢の崩れや体調不良の一因にもなります。Root1039では、あなたの身体の構造に合った下着を丁寧に提案。施術で整えた身体の状態を、日常の中でキープするパートナーとして毎日の着用をサポートします。",
      },
      {
        type: "hashtags" as const,
        tags: ["#補整下着", "#ボディライン", "#姿勢改善", "#インナーウェア", "#仙台", "#Root1039", "#根本改善"],
      },
    ] as Section[],
  },
  {
    id: "water",
    label: "水素水",
    en: "WATER",
    Icon: Droplets,
    prTitle: "まず、水を変えることから。",
    prSubtitle: "医療現場も認めた電解水素水で、内側から体質を変える",
    headerBg:
      "linear-gradient(128deg, #5f8394 0%, #dcecf2 30%, #8eb4c4 55%, #eef6fa 78%, #6a94a8 100%)",
    headerColor: "#0c1820",
    accentColor: "#1e5366",
    sections: [
      {
        type: "lead" as const,
        text: "「食事を変えたい、でもなかなか続かない」——そんな方にまず試してほしいのが、「水を変えること」です。電解水素水の整水器は、研究・実績のあるテクノロジーを家庭でも使える形にした、身体改善の入り口。人が毎日必ず摂る「水」の質を変えることが、内側から整える最初のステップです。",
      },
      {
        type: "image" as const,
        label: "電解水素水整水器・清潔な水のイメージ",
        bg: "linear-gradient(135deg, #C8E8F0 0%, #A0C8DC 100%)",
        caption: "電解水素水整水器 — 長年の研究に裏打ちされた技術",
        src: MENU_IMG.water1,
      },
      {
        type: "text" as const,
        text: "電解水素水は、水道水を電気分解することで生成される水です。開発元によって歴史や実績はさまざまですが、学会発表や共同研究、医療・健康の現場での採用例もあり、水の質を変える選択として注目されています。",
      },
      {
        type: "image" as const,
        label: "家族で使う水素水・日常シーン",
        bg: "linear-gradient(135deg, #B8D8E8 0%, #88B8D0 100%)",
        caption: "食事改善よりも取り組みやすく、家族みんなで続けやすい",
        src: MENU_IMG.water2,
      },
      {
        type: "text" as const,
        text: "食事の質を変えることは大切ですが、続けることが難しいもの。一方、水を変えることは毎日の自然な流れの中で行える、最もシンプルな習慣改善です。飲む・料理に使う・家族全員で——特別なことをしなくても生活に馴染む、それが電解水素水の最大の魅力です。Root1039では、水の習慣改善として丁寧にご案内しています。",
      },
      {
        type: "hashtags" as const,
        tags: ["#電解水素水", "#水素水", "#健康習慣", "#インナービューティ", "#デトックス", "#水から変える", "#仙台", "#Root1039", "#根本改善"],
      },
    ] as Section[],
  },
  {
    id: "food",
    label: "食品・日用品",
    en: "DAILY GOODS",
    Icon: Leaf,
    prTitle: "毎日の選択が、未来の自分をつくる。",
    prSubtitle: "食べるもの・使うものの質を変えれば、健康の土台が変わる",
    headerBg:
      "linear-gradient(135deg, #8a7a58 0%, #ebe4d2 28%, #bdb196 56%, #f7f2e8 82%, #9a8b68 100%)",
    headerColor: "#1c1810",
    accentColor: "#4a3f28",
    sections: [
      {
        type: "lead" as const,
        text: "毎日食べるもの、毎日使うもの——その積み重ねが、10年後の身体をつくります。Root1039では、無農薬・オーガニックにこだわった食品の定期便や、養生の考え方と最新の素材・処方を組み合わせた日用品を、生活習慣の改善として丁寧にご提案しています。",
      },
      {
        type: "heading" as const,
        text: "食品：安心できる食材の定期便",
      },
      {
        type: "image" as const,
        label: "新鮮な有機野菜・食品イメージ",
        bg: "linear-gradient(135deg, #EAE0D0 0%, #D5C8B0 100%)",
        caption: "生産の背景が見える、安心・安全の食卓へ",
        src: MENU_IMG.food1,
      },
      {
        type: "text" as const,
        text: "安全・安心にこだわった無農薬野菜や有機食品の定期便。平飼い卵、国産乳製品、無添加の調味料など、食卓に届く一つひとつに生産の背景が見えるサービスをご紹介しています。まずは食べるものの質から、丁寧に見直してみませんか？",
      },
      {
        type: "heading" as const,
        text: "日用品：自然派×テクノロジー",
      },
      {
        type: "image" as const,
        label: "ナチュラル日用品・エコグッズイメージ",
        bg: "linear-gradient(135deg, #D5E8D0 0%, #B8D5B5 100%)",
        caption: "養生の考え方と最新テクノロジーで、ひとにも地球にもやさしく",
        src: MENU_IMG.daily1,
      },
      {
        type: "text" as const,
        text: "東洋の「養生文化」と最新テクノロジーを組み合わせた、ひとにも環境にもやさしい日用品。有機栽培・無農薬原料を積極的に用いた製品や、動物実験に配慮したものづくりを行うラインも。「清浄・調整・補強」の3ステップで、心身のバランスを整えます。サプリメント、スキンケア、ホームリビングまで——毎日触れるものの質を、一緒に変えていきましょう。",
      },
      {
        type: "hashtags" as const,
        tags: ["#無農薬", "#オーガニック", "#自然派", "#養生", "#サステナブル", "#食品改善", "#仙台", "#Root1039"],
      },
    ] as Section[],
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
        className="flex overflow-x-auto shrink-0 pt-1"
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
        {/* Hero header */}
        <div
          className="menu-tab-hero-metallic px-5 pt-5 pb-6"
          style={{ background: tab.headerBg }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background:
                  tab.id === "treatment"
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(15, 15, 18, 0.12)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              <Icon size={18} style={{ color: tab.accentColor }} />
            </div>
            <span className="text-[10px] tracking-[0.2em]" style={{ color: tab.accentColor }}>
              {tab.en}
            </span>
          </div>
          <h2
            className="text-2xl mb-1.5 leading-snug"
            style={{
              fontFamily: "var(--font-shippori), serif",
              color: tab.headerColor,
              textShadow:
                tab.id === "treatment"
                  ? "0 1px 2px rgba(0,0,0,0.35)"
                  : "0 1px 0 rgba(255,255,255,0.35)",
            }}
          >
            {tab.prTitle}
          </h2>
          <p
            className="text-xs leading-relaxed"
            style={{
              color: tab.headerColor,
              opacity: tab.id === "treatment" ? 0.72 : 0.78,
            }}
          >
            {tab.prSubtitle}
          </p>
        </div>

        {/* Blog article body */}
        <div className="px-5 pt-6 pb-4" style={{ background: "var(--cream)" }}>
          {tab.sections.map((section, i) => {
            if (section.type === "lead") {
              return (
                <p
                  key={i}
                  className="text-sm leading-8 mb-6"
                  style={{ color: "var(--charcoal)", fontWeight: 500 }}
                >
                  {section.text}
                </p>
              );
            }
            if (section.type === "image") {
              return (
                <div key={i} className="mb-5">
                  <MenuArticleImage src={section.src} label={section.label} bg={section.bg} />
                  <p
                    style={{
                      fontSize: "10px",
                      color: "var(--muted)",
                      textAlign: "center",
                      lineHeight: 1.5,
                    }}
                  >
                    {section.caption}
                  </p>
                </div>
              );
            }
            if (section.type === "text") {
              return (
                <p
                  key={i}
                  className="text-sm leading-8 mb-6"
                  style={{ color: "var(--charcoal)" }}
                >
                  {section.text}
                </p>
              );
            }
            if (section.type === "heading") {
              return (
                <h3
                  key={i}
                  className="text-sm font-semibold mb-3 mt-2"
                  style={{
                    color: "var(--charcoal)",
                    fontFamily: "var(--font-noto), sans-serif",
                    borderLeft: "3px solid var(--rose)",
                    paddingLeft: "10px",
                  }}
                >
                  {section.text}
                </h3>
              );
            }
            if (section.type === "hashtags") {
              return (
                <div key={i} className="flex flex-wrap gap-2 mb-6 mt-1">
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px]"
                      style={{ color: "var(--rose)", fontFamily: "var(--font-noto), sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              );
            }
            return null;
          })}

          {/* 予約するボタン */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "4px",
              paddingBottom: "12px",
            }}
          >
            <Link
              href={RESERVATION_URL}
              className="flex items-center justify-center text-[13px] font-semibold active:translate-y-[2px] transition-all"
              style={{
                background:
                  "linear-gradient(180deg, #F099B3 0%, #E47C97 45%, #C4687A 100%)",
                color: "white",
                width: "52%",
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
                textShadow: "0 1px 1px rgba(120,55,70,0.55)",
              }}
            >
              予約する
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
