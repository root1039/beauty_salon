import type { ReactNode } from "react";

type Props = {
  en: string;
  title: string;
  subtitle?: ReactNode;
  /** RGB値の文字列 例: "196, 104, 122" */
  ballColor: string;
  /** true = about/menu 向けコンパクト版（shrink-0、小さめ padding） */
  compact?: boolean;
};

export default function PageHeader({
  en,
  title,
  subtitle,
  ballColor,
  compact = false,
}: Props) {
  const wrapClass = compact
    ? "shrink-0 mx-3 mt-2 px-4 pt-8 pb-5 rounded-xl relative overflow-hidden"
    : "mx-3 mt-3 px-5 pt-10 pb-8 rounded-2xl relative overflow-hidden";

  const titleClass = compact ? "text-2xl" : "text-3xl leading-snug";

  return (
    <header
      className={wrapClass}
      style={{
        background: "#FAF8F5",
        border: "1.5px solid rgba(201,169,110,0.82)",
        boxShadow:
          "0 2px 12px rgba(201,169,110,0.10), 0 1px 3px rgba(42,28,32,0.06)",
      }}
    >
      {/* ── ボール 1: 大きめ、右上 ── */}
      <div
        className="ball-float-1"
        style={{
          position: "absolute",
          width: 88,
          height: 88,
          borderRadius: "50%",
          background: `rgba(${ballColor}, 0.18)`,
          top: -22,
          right: -22,
          pointerEvents: "none",
        }}
      />

      {/* ── ボール 2: 中、右上寄り ── */}
      <div
        className="ball-float-2"
        style={{
          position: "absolute",
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: `rgba(${ballColor}, 0.30)`,
          top: 14,
          right: 58,
          pointerEvents: "none",
          animationDelay: "1.3s",
        }}
      />

      {/* ── ボール 3: 小、右中 ── */}
      <div
        className="ball-float-3"
        style={{
          position: "absolute",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: `rgba(${ballColor}, 0.50)`,
          top: 46,
          right: 28,
          pointerEvents: "none",
          animationDelay: "0.7s",
        }}
      />

      {/* ── テキスト ── */}
      <p
        className="text-[10px] tracking-[0.3em] mb-2 relative anim-fade-in"
        style={{
          color: "rgba(42,28,32,0.42)",
          fontFamily: "var(--font-noto), sans-serif",
          zIndex: 1,
        }}
      >
        {en}
      </p>
      <h1
        className={`${titleClass} relative anim-fade-up delay-1`}
        style={{
          fontFamily: "var(--font-shippori), serif",
          color: "#2A1C20",
          zIndex: 1,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="text-sm leading-relaxed mt-3 relative anim-fade-up delay-2"
          style={{ color: "rgba(42,28,32,0.55)", zIndex: 1 }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
