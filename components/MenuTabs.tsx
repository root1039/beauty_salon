"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, Zap, Shirt, Droplets, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { tabAuxNavButton, tabPillActive, tabPillIdle } from "@/components/tabNavTheme";

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
        aspectRatio: "16 / 9",
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
          style={{ objectFit: "contain" }}
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

const winbackPriceMenus = [
  {
    title: "BODY 60分",
    description: "内臓ケアで代謝を上げ、全身を整え巡らせるボディケア",
    rows: [
      ["初回", "¥11,000", "¥11,000"],
      ["通常", "¥16,500", "¥16,500"],
      ["2回", "¥28,600", "¥14,300"],
      ["3回", "¥41,250", "¥13,750"],
    ],
  },
  {
    title: "FACE 60分",
    description: "巻き肩・首こり・眼精疲労・現代疲労に特化した上半身集中ケア",
    rows: [
      ["初回", "¥11,000", "¥11,000"],
      ["通常", "¥15,400", "¥15,400"],
      ["2回", "¥26,400", "¥13,200"],
      ["3回", "¥37,950", "¥12,650"],
    ],
  },
  {
    title: "CUSTOM 90分",
    description: "BODY + FACE half",
    rows: [
      ["通常", "¥22,800", "¥22,800"],
      ["2回", "¥41,250", "¥20,625"],
      ["3回", "¥59,400", "¥19,800"],
    ],
  },
  {
    title: "FULL 120分",
    description: "全身をじっくり整えるフルケア",
    rows: [
      ["通常", "¥28,800", "¥28,800"],
      ["2回", "¥53,200", "¥26,600"],
      ["3回", "¥77,400", "¥25,800"],
    ],
  },
];

const priceCardStyle: CSSProperties = {
  background: "white",
  border: "1px solid rgba(194,199,207,0.9)",
  borderRadius: "12px",
  padding: "16px",
  boxShadow: "0 8px 22px rgba(42, 28, 32, 0.05)",
};

function PriceTable({
  title,
  description,
  rows,
}: {
  title: string;
  description: string;
  rows: string[][];
}) {
  return (
    <article style={priceCardStyle}>
      <div className="mb-3">
        <h3
          className="text-lg leading-tight"
          style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
        >
          {title}
        </h3>
        <p className="text-[11px] leading-5 mt-1" style={{ color: "var(--muted)" }}>
          {description}
        </p>
      </div>
      <div className="grid grid-cols-[0.8fr_1fr_1fr] gap-x-2 gap-y-2 text-xs">
        <p className="font-bold" style={{ color: "var(--muted)" }}>
          回数
        </p>
        <p className="font-bold text-right" style={{ color: "var(--muted)" }}>
          価格
        </p>
        <p className="font-bold text-right" style={{ color: "var(--muted)" }}>
          1回あたり
        </p>
        {rows.map(([count, price, perVisit]) => (
          <div key={`${title}-${count}`} className="contents">
            <p style={{ color: "var(--charcoal)" }}>{count}</p>
            <p className="text-right font-medium" style={{ color: "var(--charcoal)" }}>
              {price}
            </p>
            <p className="text-right font-medium" style={{ color: "var(--charcoal)" }}>
              {perVisit}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function PriceListContent() {
  return (
    <div className="mb-7">
      <div className="mb-5">
        <p className="text-[11px] tracking-[0.28em] mb-2" style={{ color: "var(--rose)" }}>
          PRICE LIST
        </p>
        <h2
          className="text-2xl leading-snug mb-2"
          style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
        >
          料金表
        </h2>
        <p className="text-xs leading-6" style={{ color: "var(--muted)" }}>
          表示価格はすべて税込です。回数コースの期限は、1回目の来店日から1ヶ月以内とさせていただきます。
        </p>
      </div>

      <section className="mb-7">
        <h3
          className="text-base mb-3"
          style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
        >
          WINBACK
        </h3>
        <div className="space-y-4">
          {winbackPriceMenus.map((menu) => (
            <PriceTable
              key={menu.title}
              title={menu.title}
              description={menu.description}
              rows={menu.rows}
            />
          ))}
        </div>
      </section>

      <section className="mb-7">
        <h3
          className="text-base mb-3"
          style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
        >
          脱毛
        </h3>

        <div className="space-y-4">
          <article style={priceCardStyle}>
            <h4
              className="text-sm font-bold mb-1"
              style={{ color: "var(--charcoal)", fontFamily: "var(--font-noto), sans-serif" }}
            >
              打ち放題
            </h4>
            <p className="text-[11px] leading-5 mb-3" style={{ color: "var(--muted)" }}>
              シェービング時間込み / VIO除く
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                ["10分", "¥3,300"],
                ["20分", "¥6,600"],
                ["30分", "¥8,800"],
                ["60分", "¥16,500"],
              ].map(([time, price]) => (
                <div
                  key={time}
                  className="flex items-center justify-between rounded-lg px-3 py-2"
                  style={{ background: "var(--rose-light)" }}
                >
                  <span style={{ color: "var(--charcoal)" }}>{time}</span>
                  <span className="font-bold" style={{ color: "var(--rose-dark)" }}>
                    {price}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article style={priceCardStyle}>
            <h4
              className="text-sm font-bold mb-3"
              style={{ color: "var(--charcoal)", fontFamily: "var(--font-noto), sans-serif" }}
            >
              パーツ脱毛
            </h4>
            <div className="space-y-3 text-xs leading-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold" style={{ color: "var(--charcoal)" }}>
                    プチ脱毛
                  </p>
                  <p style={{ color: "var(--muted)" }}>脇・鼻下・顎・眉間・眉上など</p>
                </div>
                <p className="font-bold whitespace-nowrap" style={{ color: "var(--rose-dark)" }}>
                  ¥2,200
                </p>
              </div>
              <div className="h-px" style={{ background: "var(--border)" }} />
              <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2">
                <p className="font-bold" style={{ color: "var(--charcoal)" }}>
                  顔 女性
                </p>
                <p className="font-bold" style={{ color: "var(--rose-dark)" }}>
                  ¥7,700
                </p>
                <p className="font-bold" style={{ color: "var(--charcoal)" }}>
                  顔 男性
                </p>
                <p className="font-bold" style={{ color: "var(--rose-dark)" }}>
                  ¥8,800
                </p>
                <p className="font-bold" style={{ color: "var(--charcoal)" }}>
                  顔 キッズ
                </p>
                <p className="font-bold" style={{ color: "var(--rose-dark)" }}>
                  ¥5,500
                </p>
              </div>
              <div className="h-px" style={{ background: "var(--border)" }} />
              <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2">
                <p className="font-bold" style={{ color: "var(--charcoal)" }}>
                  VIO 全部位
                </p>
                <p className="font-bold" style={{ color: "var(--rose-dark)" }}>
                  ¥8,800
                </p>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>
                  女性のみ / 1部位
                </p>
                <p className="font-bold" style={{ color: "var(--rose-dark)" }}>
                  ¥3,300
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section style={priceCardStyle}>
        <h3
          className="text-base mb-3"
          style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
        >
          利用規約
        </h3>
        <div className="space-y-3 text-xs leading-6" style={{ color: "var(--charcoal)" }}>
          <p>
            当サロンは完全予約制となっております。ご予約のキャンセルは、前々日の営業時間内迄にご連絡をお願いいたします。
          </p>
          <p>
            前日または当日のキャンセルになりますと、規定のキャンセル料が発生いたします。
          </p>
          <div
            className="rounded-xl p-3 space-y-2"
            style={{ background: "var(--rose-light)", color: "var(--rose-dark)" }}
          >
            <p className="font-bold">前日キャンセル: 施術料金の30%</p>
            <p className="font-bold">当日キャンセル: 施術料金の100%</p>
            <p className="font-bold">当日の予約日変更: 施術料金の50%</p>
            <p className="font-bold">予約日変更なし: 完全キャンセル扱いで100%</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const tabs = [
  {
    id: "treatment",
    label: "施術",
    en: "TREATMENT",
    Icon: Zap,
    prTitle: "全ての周波数を、1台で。",
    prSubtitle: "高周波施術で身体の土台から整え、根本からボディラインをケア",
    headerBg:
      "radial-gradient(circle at 88% 18%, rgba(245,111,38,0.18) 0%, transparent 28%), radial-gradient(circle at 8% 92%, rgba(18,63,133,0.14) 0%, transparent 34%), #fbf3df",
    headerColor: "#2f241d",
    accentColor: "#123f85",
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
      "radial-gradient(circle at 88% 12%, rgba(93,139,193,0.16) 0%, transparent 30%), radial-gradient(circle at 10% 90%, rgba(226,91,126,0.18) 0%, transparent 36%), #fcf1df",
    headerColor: "#34231f",
    accentColor: "#c8466f",
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
      "radial-gradient(circle at 86% 18%, rgba(40,134,190,0.18) 0%, transparent 32%), radial-gradient(circle at 8% 88%, rgba(53,164,159,0.13) 0%, transparent 36%), #f7f1df",
    headerColor: "#1f3040",
    accentColor: "#176ca4",
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
    prTitle: "毎日の選択が、未来の自分",
    prSubtitle: "食べるもの・使うものの質を変えれば、健康の土台が変わる",
    headerBg:
      "radial-gradient(circle at 88% 16%, rgba(75,139,58,0.16) 0%, transparent 32%), radial-gradient(circle at 10% 90%, rgba(235,139,35,0.17) 0%, transparent 38%), #fbf2dd",
    headerColor: "#2c281d",
    accentColor: "#397a35",
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
  {
    id: "price",
    label: "料金表",
    en: "PRICE LIST",
    Icon: FileText,
    prTitle: "料金を見やすく、選びやすく。",
    prSubtitle: "WINBACKと脱毛メニューの価格を、テキストで確認できます",
    headerBg:
      "radial-gradient(circle at 88% 16%, rgba(196,104,122,0.14) 0%, transparent 30%), radial-gradient(circle at 8% 88%, rgba(201,169,110,0.15) 0%, transparent 36%), #faf2e3",
    headerColor: "#2A1C20",
    accentColor: "#9E4A5A",
    sections: [] as Section[],
  },
];

export default function MenuTabs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const tab = tabs[activeIdx];
  const { Icon } = tab;

  return (
    <div className="tabs-shell" style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
      {/* Tab bar */}
      <div
        className="tabs-bar flex overflow-x-auto shrink-0 gap-1.5 px-3 py-2"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(245,240,244,0.96) 100%)",
          borderBottom: "1px solid var(--border)",
          scrollbarWidth: "none",
        }}
      >
        {tabs.map((t, i) => {
          const active = i === activeIdx;
          return (
            <button
              key={t.id}
              onClick={() => setActiveIdx(i)}
              className="tabs-bar__btn btn-press shrink-0 px-3 py-2 text-xs whitespace-nowrap rounded-[10px]"
              style={{
                outline: "none",
                fontFamily: "var(--font-noto), sans-serif",
                ...(active ? tabPillActive : tabPillIdle),
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="tabs-content flex-1 overflow-y-auto">
        {/* Hero header */}
        {tab.id !== "price" && (
          <div
            className="menu-tab-hero-paper px-5 pt-5 pb-6"
            style={{ background: tab.headerBg }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(255,255,255,0.58)",
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
              className={`mb-1.5 leading-snug ${tab.id === "food" ? "whitespace-nowrap text-[clamp(17px,5.6vw,24px)]" : "text-2xl"}`}
              style={{
                fontFamily: "var(--font-shippori), serif",
                color: tab.headerColor,
                textShadow: "0 1px 0 rgba(255,255,255,0.45)",
              }}
            >
              {tab.prTitle}
            </h2>
            <p
              className="text-xs leading-relaxed"
              style={{
                color: tab.headerColor,
                opacity: 0.78,
              }}
            >
              {tab.prSubtitle}
            </p>
          </div>
        )}

        {/* Blog article body */}
        <div className="px-5 pt-6 pb-4" style={{ background: "var(--cream)" }}>
          {tab.id === "price" && <PriceListContent />}

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

          {/* 隣のメニュータブへ */}
          <div
            className={`flex items-center gap-2 mb-3 ${
              activeIdx === 0
                ? "justify-end"
                : activeIdx === tabs.length - 1
                  ? "justify-start"
                  : "justify-between"
            }`}
          >
            {activeIdx > 0 && (
              <button
                type="button"
                onClick={() => setActiveIdx(activeIdx - 1)}
                className="inline-flex items-center gap-0.5 text-xs font-medium py-2 px-2 rounded-lg active:opacity-70 transition-opacity"
                style={tabAuxNavButton}
              >
                <ChevronLeft size={16} strokeWidth={2.2} />
                {tabs[activeIdx - 1].label}
              </button>
            )}
            {activeIdx < tabs.length - 1 && (
              <button
                type="button"
                onClick={() => setActiveIdx(activeIdx + 1)}
                className="inline-flex items-center gap-0.5 text-xs font-medium py-2 px-2 rounded-lg active:opacity-70 transition-opacity"
                style={tabAuxNavButton}
              >
                {tabs[activeIdx + 1].label}
                <ChevronRight size={16} strokeWidth={2.2} />
              </button>
            )}
          </div>

          {/* 予約するボタン */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "4px",
              paddingBottom: "12px",
            }}
          >
            <div className="resv-ring-wrap" style={{ borderRadius: "9px" }}>
              <Link
                href={RESERVATION_URL}
                className="btn-press flex items-center justify-center gap-1.5 text-[13px] font-semibold"
                style={{
                  background:
                    "linear-gradient(180deg, #F099B3 0%, #E47C97 45%, #C4687A 100%)",
                  color: "white",
                  width: "52%",
                  minWidth: "160px",
                  maxWidth: "200px",
                  height: "40px",
                  borderRadius: "9px",
                  border: "1px solid rgba(158,74,90,0.55)",
                  boxShadow: [
                    "inset 0 1px 0 rgba(255,255,255,0.55)",
                    "inset 0 -2px 0 rgba(158,74,90,0.55)",
                    "0 1px 0 rgba(255,255,255,0.5)",
                    "0 4px 0 rgba(120,55,70,0.50)",
                    "0 8px 18px rgba(158,74,90,0.42)",
                    "0 1px 2px rgba(42,28,32,0.22)",
                  ].join(", "),
                  letterSpacing: "0.12em",
                  fontFamily: "var(--font-noto), sans-serif",
                  textShadow: "0 1px 1px rgba(120,55,70,0.55)",
                }}
              >
                予約する
                <ChevronRight size={14} strokeWidth={2.5} style={{ opacity: 0.85 }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
