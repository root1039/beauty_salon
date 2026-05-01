import type { ReactNode } from "react";

type Props = {
  en: string;
  title: string;
  subtitle?: ReactNode;
  /** RGB値の文字列 例: "196, 104, 122" */
  ballColor: string;
  /** true = about/menu 向けコンパクト版（薄め・ゴールド枠アニメ付き） */
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
    ? "shrink-0 mx-3 mt-1.5 px-4 pt-4 pb-3 rounded-xl relative overflow-hidden page-header-compact"
    : "mx-3 mt-3 px-5 pt-10 pb-8 rounded-2xl relative overflow-hidden";

  const titleClass = compact ? "text-xl tracking-wide" : "text-3xl leading-snug";

  const headerSurfaceStyle = compact
    ? undefined
    : {
        background: "#FAF8F5",
        border: "1.5px solid rgba(201,169,110,0.82)",
        boxShadow:
          "0 2px 12px rgba(201,169,110,0.10), 0 1px 3px rgba(42,28,32,0.06)",
      };

  const ballOpacity = compact ? 0.55 : 1;

  return (
    <header className={wrapClass} style={headerSurfaceStyle}>
      {/* ── ボール 1 ── */}
      <div
        className="ball-float-1"
        style={{
          position: "absolute",
          width: compact ? 62 : 88,
          height: compact ? 62 : 88,
          borderRadius: "50%",
          background: `rgba(${ballColor}, ${0.14 * ballOpacity})`,
          top: compact ? -18 : -22,
          right: compact ? -18 : -22,
          pointerEvents: "none",
        }}
      />

      {/* ── ボール 2 ── */}
      <div
        className="ball-float-2"
        style={{
          position: "absolute",
          width: compact ? 34 : 46,
          height: compact ? 34 : 46,
          borderRadius: "50%",
          background: `rgba(${ballColor}, ${0.22 * ballOpacity})`,
          top: compact ? 10 : 14,
          right: compact ? 48 : 58,
          pointerEvents: "none",
          animationDelay: "1.3s",
        }}
      />

      {/* ── ボール 3 ── */}
      <div
        className="ball-float-3"
        style={{
          position: "absolute",
          width: compact ? 18 : 22,
          height: compact ? 18 : 22,
          borderRadius: "50%",
          background: `rgba(${ballColor}, ${0.38 * ballOpacity})`,
          top: compact ? 38 : 46,
          right: compact ? 24 : 28,
          pointerEvents: "none",
          animationDelay: "0.7s",
        }}
      />

      {/* ── テキスト ── */}
      <p
        className={`${compact ? "text-[9px] tracking-[0.28em] mb-1.5" : "text-[10px] tracking-[0.3em] mb-2"} relative anim-fade-in`}
        style={{
          color: compact ? "rgba(42,28,32,0.38)" : "rgba(42,28,32,0.42)",
          fontFamily: "var(--font-noto), sans-serif",
          zIndex: 1,
        }}
      >
        {en}
      </p>
      <h1
        className={`${titleClass} relative anim-fade-up delay-1 ${compact ? "leading-snug" : ""}`}
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
          className={`${compact ? "text-xs mt-2" : "text-sm mt-3"} leading-relaxed relative anim-fade-up delay-2`}
          style={{ color: compact ? "rgba(42,28,32,0.52)" : "rgba(42,28,32,0.55)", zIndex: 1 }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
