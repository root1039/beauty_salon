import type { CSSProperties } from "react";

/**
 * 代表挨拶・施術・補整下着など「タブ」専用の黄色系ボタン。
 * 予約系（予約する・BottomNav の予約・ReservationFab 等）はピンクのまま。
 */
export const tabPillActive: CSSProperties = {
  color: "#2a2210",
  fontWeight: 700,
  background: "linear-gradient(180deg, #FFF9E8 0%, #F0D078 40%, #C9A032 100%)",
  border: "1px solid rgba(120, 92, 35, 0.48)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.78)",
    "inset 0 -2px 0 rgba(100, 75, 25, 0.22)",
    "0 1px 0 rgba(255,255,255,0.5)",
    "0 3px 0 rgba(130, 95, 35, 0.32)",
    "0 5px 12px rgba(170, 130, 45, 0.22)",
  ].join(", "),
  textShadow: "0 1px 0 rgba(255,255,255,0.5)",
};

export const tabPillIdle: CSSProperties = {
  color: "rgba(82, 65, 28, 0.82)",
  fontWeight: 600,
  background: "linear-gradient(180deg, rgba(255,252,246,0.98) 0%, rgba(248, 238, 215, 0.94) 100%)",
  border: "1px solid rgba(195, 170, 120, 0.52)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.92)",
};

/** タブ間を移動する矢印付きサブボタン */
export const tabAuxNavButton: CSSProperties = {
  color: "#5c4818",
  fontFamily: "var(--font-noto), sans-serif",
  background: "linear-gradient(180deg, rgba(255,250,238,0.98) 0%, rgba(242, 225, 175, 0.92) 100%)",
  border: "1px solid rgba(175, 145, 75, 0.52)",
  boxShadow: [
    "inset 0 1px 0 rgba(255,255,255,0.88)",
    "0 2px 6px rgba(120, 95, 40, 0.12)",
  ].join(", "),
};
