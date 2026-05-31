"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Mail,
  MessageCircle,
} from "lucide-react";

const LINE_ADD_URL = "https://lin.ee/zCQoCoz";
const RESERVATION_EMAIL = process.env.NEXT_PUBLIC_RESERVATION_EMAIL ?? "root1039.gp@gmail.com";
const RESERVATION_SHEET_CSV_URL = process.env.NEXT_PUBLIC_RESERVATION_SHEET_CSV_URL ?? "";

const menuOptions = [
  "相談して決めたい",
  "WINBACK BODY 60分 初回 ¥11,000",
  "WINBACK BODY 60分 通常 ¥16,500",
  "WINBACK FACE 60分 初回 ¥11,000",
  "WINBACK FACE 60分 通常 ¥15,400",
  "WINBACK CUSTOM 90分 ¥22,800",
  "WINBACK FULL 120分 ¥28,800",
  "脱毛 打ち放題 10分 ¥3,300",
  "脱毛 打ち放題 20分 ¥6,600",
  "脱毛 打ち放題 30分 ¥8,800",
  "脱毛 打ち放題 60分 ¥16,500",
  "プチ脱毛 ¥2,200",
  "顔脱毛 女性 ¥7,700",
  "顔脱毛 男性 ¥8,800",
  "顔脱毛 キッズ ¥5,500",
  "VIO 全部位 ¥8,800",
  "VIO 1部位 ¥3,300",
];

const timeOptions = ["何時でも", "午前", "午後", "夕方以降"];
const weekLabels = ["日", "月", "火", "水", "木", "金", "土"];

type ReservationMode = "line" | "mail";
type AvailabilityStatus = "both" | "am" | "pm" | "closed";
type AvailabilityMap = Record<string, AvailabilityStatus>;

const availabilityStyles: Record<AvailabilityStatus, { label: string; description: string; color: string; bg: string; border: string }> = {
  both: {
    label: "◎",
    description: "終日予約可",
    color: "#178A57",
    bg: "#EAF7F0",
    border: "#9ED9BA",
  },
  am: {
    label: "AM",
    description: "午前予約可",
    color: "#2878B8",
    bg: "#EAF3FC",
    border: "#9BC7EC",
  },
  pm: {
    label: "PM",
    description: "午後予約可",
    color: "#B96A1F",
    bg: "#FFF2E5",
    border: "#F2BE86",
  },
  closed: {
    label: "×",
    description: "予約満枠",
    color: "#8B4653",
    bg: "#F7ECEF",
    border: "#E0B8C0",
  },
};

type FormState = {
  name: string;
  kana: string;
  phone: string;
  email: string;
  visitType: string;
  menu: string;
  concern: string;
  date1: string;
  time1: string;
  date2: string;
  time2: string;
  date3: string;
  time3: string;
  note: string;
  scheduleConsent: boolean;
  cancelConsent: boolean;
};

const initialFormState: FormState = {
  name: "",
  kana: "",
  phone: "",
  email: "",
  visitType: "初回",
  menu: menuOptions[0],
  concern: "",
  date1: "",
  time1: "何時でも",
  date2: "",
  time2: "何時でも",
  date3: "",
  time3: "何時でも",
  note: "",
  scheduleConsent: false,
  cancelConsent: false,
};

const inputStyle: CSSProperties = {
  width: "100%",
  minHeight: "44px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "white",
  padding: "10px 12px",
  color: "var(--charcoal)",
  fontSize: "13px",
  lineHeight: 1.5,
  outline: "none",
  fontFamily: "var(--font-noto), sans-serif",
};

const labelStyle: CSSProperties = {
  display: "block",
  color: "var(--charcoal)",
  fontSize: "12px",
  fontWeight: 700,
  marginBottom: "6px",
  fontFamily: "var(--font-noto), sans-serif",
};

function formatDateKey(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getMonthStart(offset: number) {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + offset, 1);
}

function getMonthLabel(date: Date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

function getMonthDays(month: Date) {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDate = new Date(year, monthIndex + 1, 0).getDate();
  const cells: Array<Date | null> = [];

  for (let i = 0; i < firstDay.getDay(); i += 1) cells.push(null);
  for (let date = 1; date <= lastDate; date += 1) {
    cells.push(new Date(year, monthIndex, date));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function normalizeAvailability(value: string): AvailabilityStatus {
  const normalized = value.trim().toLowerCase();
  if (["both", "all", "open", "◎", "〇", "○", "丸", "二重丸", "終日"].includes(normalized)) {
    return "both";
  }
  if (["am", "午前", "午前中"].includes(normalized)) return "am";
  if (["pm", "午後"].includes(normalized)) return "pm";
  if (["closed", "close", "full", "x", "×", "満枠", "予約満枠", "不可"].includes(normalized)) {
    return "closed";
  }
  return "closed";
}

function parseCsvLine(line: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;

  for (const char of line) {
    if (char === "\"") {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      values.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current.trim());
  return values;
}

function parseAvailabilityCsv(csv: string): AvailabilityMap {
  const rows = csv
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const map: AvailabilityMap = {};

  for (const [index, row] of rows.entries()) {
    const [date, status] = parseCsvLine(row);
    if (index === 0 && date.toLowerCase() === "date") continue;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "")) continue;
    map[date] = normalizeAvailability(status || "");
  }

  return map;
}

function getAvailabilityStyle(status?: AvailabilityStatus) {
  return availabilityStyles[status ?? "closed"];
}

function formatDateCandidate(date: string, time: string) {
  return date ? `${date}（${time}）` : "未入力";
}

function buildReservationText(form: FormState, mode: ReservationMode) {
  const channel = mode === "line" ? "LINE" : "メール";
  return [
    `【Root1039 ${channel}予約希望】`,
    "",
    "以下の内容で予約を希望します。",
    "",
    "■ お客様情報",
    `お名前：${form.name}`,
    `フリガナ：${form.kana}`,
    `電話番号：${form.phone}`,
    `メールアドレス：${form.email}`,
    `ご利用：${form.visitType}`,
    "",
    "■ 希望メニュー",
    form.menu,
    "",
    "■ お悩み・相談内容",
    form.concern || "未入力",
    "",
    "■ 来店希望日",
    `第1希望：${formatDateCandidate(form.date1, form.time1)}`,
    `第2希望：${formatDateCandidate(form.date2, form.time2)}`,
    `第3希望：${formatDateCandidate(form.date3, form.time3)}`,
    "",
    "■ その他・事前に伝えたいこと",
    form.note || "未入力",
    "",
    "■ 確認事項",
    "日程はメールまたはLINEでの確認後に確定することを了承しました。",
    "キャンセル規定を確認しました。",
  ].join("\n");
}

export function ReservationAvailabilityCalendar({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const [activeMonthIdx, setActiveMonthIdx] = useState(0);
  const [availability, setAvailability] = useState<AvailabilityMap>({});
  const [loadState, setLoadState] = useState<"idle" | "loading" | "ready" | "error">(
    RESERVATION_SHEET_CSV_URL ? "loading" : "idle",
  );

  const months = useMemo(() => [getMonthStart(0), getMonthStart(1), getMonthStart(2)], []);
  const activeMonth = months[activeMonthIdx];
  const days = useMemo(() => getMonthDays(activeMonth), [activeMonth]);

  useEffect(() => {
    if (!RESERVATION_SHEET_CSV_URL) return;

    let canceled = false;
    fetch(RESERVATION_SHEET_CSV_URL, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch availability");
        return response.text();
      })
      .then((csv) => {
        if (canceled) return;
        setAvailability(parseAvailabilityCsv(csv));
        setLoadState("ready");
      })
      .catch(() => {
        if (canceled) return;
        setLoadState("error");
      });

    return () => {
      canceled = true;
    };
  }, []);

  return (
    <section className={`reservation-calendar-section px-4 pb-6 ${className}`}>
      <div
        className={`reservation-calendar-card rounded-2xl ${compact ? "p-3" : "p-5"}`}
        style={{
          background: "white",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 28px rgba(42, 28, 32, 0.06)",
        }}
      >
        <div className="reservation-calendar-heading mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.18em] mb-1" style={{ color: "var(--rose)" }}>
              AVAILABLE DAYS
            </p>
            <h2
              className="text-base"
              style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
            >
              予約可能日時
            </h2>
          </div>
          <CalendarDays size={22} style={{ color: "var(--rose)" }} />
        </div>

        <div className="reservation-calendar-tabs grid grid-cols-3 gap-2 mb-4">
          {months.map((month, index) => {
            const active = index === activeMonthIdx;
            return (
              <button
                key={month.toISOString()}
                type="button"
                onClick={() => setActiveMonthIdx(index)}
                className="reservation-calendar-tab btn-press rounded-lg px-2 py-2 text-[11px] font-bold"
                style={{
                  color: active ? "white" : "var(--rose-dark)",
                  background: active ? "var(--rose)" : "var(--rose-light)",
                  border: "1px solid var(--pink-mid)",
                }}
              >
                {index === 0 ? "今月" : index === 1 ? "来月" : "再来月"}
              </button>
            );
          })}
        </div>

        <div
          className="reservation-calendar-month rounded-xl p-3"
          style={{ background: "var(--rose-light)", border: "1px solid var(--pink-mid)" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveMonthIdx(Math.max(0, activeMonthIdx - 1))}
              disabled={activeMonthIdx === 0}
              className="rounded-lg p-1.5"
              style={{ color: activeMonthIdx === 0 ? "var(--pink-mid)" : "var(--rose-dark)" }}
              aria-label="前の月"
            >
              <ChevronLeft size={18} />
            </button>
            <p className="text-sm font-bold" style={{ color: "var(--charcoal)" }}>
              {getMonthLabel(activeMonth)}
            </p>
            <button
              type="button"
              onClick={() => setActiveMonthIdx(Math.min(2, activeMonthIdx + 1))}
              disabled={activeMonthIdx === 2}
              className="rounded-lg p-1.5"
              style={{ color: activeMonthIdx === 2 ? "var(--pink-mid)" : "var(--rose-dark)" }}
              aria-label="次の月"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {weekLabels.map((label) => (
              <div
                key={label}
                className="py-1 text-[10px] font-bold"
                style={{ color: label === "日" ? "var(--rose-dark)" : "var(--muted)" }}
              >
                {label}
              </div>
            ))}
            {days.map((day, index) => {
              const key = day ? formatDateKey(day) : `blank-${index}`;
              const availabilityStyle = day ? getAvailabilityStyle(availability[formatDateKey(day)]) : null;
              return (
                <div
                  key={key}
                  className="reservation-calendar-day flex min-h-[46px] flex-col items-center justify-center rounded-lg"
                  style={{
                    background: day ? "white" : "transparent",
                    border: day ? "1px solid rgba(194,199,207,0.65)" : "1px solid transparent",
                  }}
                >
                  {day && (
                    <>
                      <span className="text-[11px] font-bold" style={{ color: "var(--charcoal)" }}>
                        {day.getDate()}
                      </span>
                      <span
                        className="text-[11px] font-bold leading-4"
                        style={{ color: availabilityStyle?.color }}
                      >
                        {availabilityStyle?.label}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="reservation-calendar-legend mt-4 flex flex-wrap gap-2 text-[10px] font-bold">
          {(["both", "am", "pm", "closed"] as AvailabilityStatus[]).map((status) => {
            const item = availabilityStyles[status];
            return (
              <span
                key={status}
                className="rounded-full px-2.5 py-1"
                style={{
                  background: item.bg,
                  border: `1px solid ${item.border}`,
                  color: item.color,
                }}
              >
                {item.label}：{item.description}
              </span>
            );
          })}
        </div>

        {loadState === "loading" && (
          <p className="text-[10px] leading-5 mt-4" style={{ color: "var(--muted)" }}>
            予約可能日時を読み込み中です。
          </p>
        )}
        {loadState === "error" && (
          <p className="text-[10px] leading-5 mt-4" style={{ color: "var(--rose-dark)" }}>
            予約可能日時を読み込めませんでした。時間をおいて再度ご確認ください。
          </p>
        )}
      </div>
    </section>
  );
}

function ReservationForm({ mode }: { mode: ReservationMode }) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [preview, setPreview] = useState("");
  const [copied, setCopied] = useState(false);
  const title = mode === "line" ? "LINE予約フォーム" : "メール予約フォーム";
  const submitLabel = mode === "line" ? "LINE送信用の内容を作成する" : "メール送信用の内容を作成する";
  const sendLabel = mode === "line" ? "LINEで送信する" : "メールで送信する";
  const mailSubject = encodeURIComponent("Root1039 予約希望");
  const mailBody = encodeURIComponent(preview);
  const mailHref = `mailto:${RESERVATION_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setCopied(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPreview(buildReservationText(form, mode));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!preview) return;
    await navigator.clipboard.writeText(preview);
    setCopied(true);
  };

  return (
    <section id="reservation-form" className="px-4 pb-6">
      <div
        className="rounded-2xl p-5"
        style={{
          background: "white",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 28px rgba(42, 28, 32, 0.06)",
        }}
      >
        <p className="text-[11px] tracking-[0.18em] mb-1" style={{ color: "var(--rose)" }}>
          RESERVATION FORM
        </p>
        <h2
          className="text-base mb-2"
          style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
        >
          {title}
        </h2>
        <p className="text-xs leading-6 mb-5" style={{ color: "var(--muted)" }}>
          入力内容を作成してコピーし、下の送信ボタンから{mode === "line" ? "公式LINE" : "メール画面"}へ進んで貼り付けてください。
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label style={labelStyle} htmlFor={`${mode}-reservation-name`}>
              お名前 <span style={{ color: "var(--rose)" }}>*</span>
            </label>
            <input
              id={`${mode}-reservation-name`}
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              style={inputStyle}
              autoComplete="name"
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor={`${mode}-reservation-kana`}>
              フリガナ <span style={{ color: "var(--rose)" }}>*</span>
            </label>
            <input
              id={`${mode}-reservation-kana`}
              required
              value={form.kana}
              onChange={(event) => updateField("kana", event.target.value)}
              style={inputStyle}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label style={labelStyle} htmlFor={`${mode}-reservation-phone`}>
                電話番号 <span style={{ color: "var(--rose)" }}>*</span>
              </label>
              <input
                id={`${mode}-reservation-phone`}
                required
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                style={inputStyle}
                autoComplete="tel"
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor={`${mode}-reservation-email`}>
                メールアドレス <span style={{ color: "var(--rose)" }}>*</span>
              </label>
              <input
                id={`${mode}-reservation-email`}
                required
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                style={inputStyle}
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label style={labelStyle} htmlFor={`${mode}-reservation-visit-type`}>
              初回 / 再来
            </label>
            <select
              id={`${mode}-reservation-visit-type`}
              value={form.visitType}
              onChange={(event) => updateField("visitType", event.target.value)}
              style={inputStyle}
            >
              <option value="初回">初回</option>
              <option value="再来">再来</option>
            </select>
          </div>

          <div>
            <label style={labelStyle} htmlFor={`${mode}-reservation-menu`}>
              希望メニュー <span style={{ color: "var(--rose)" }}>*</span>
            </label>
            <select
              id={`${mode}-reservation-menu`}
              required
              value={form.menu}
              onChange={(event) => updateField("menu", event.target.value)}
              style={inputStyle}
            >
              {menuOptions.map((menu) => (
                <option key={menu} value={menu}>
                  {menu}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle} htmlFor={`${mode}-reservation-concern`}>
              お悩み・相談内容
            </label>
            <textarea
              id={`${mode}-reservation-concern`}
              value={form.concern}
              onChange={(event) => updateField("concern", event.target.value)}
              style={{ ...inputStyle, minHeight: "92px", resize: "vertical" }}
            />
          </div>

          <div>
            <p style={labelStyle}>
              来店希望日 <span style={{ color: "var(--rose)" }}>*</span>
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  required
                  type="date"
                  aria-label="第1希望日"
                  value={form.date1}
                  onChange={(event) => updateField("date1", event.target.value)}
                  style={inputStyle}
                />
                <select
                  aria-label="第1希望時間帯"
                  value={form.time1}
                  onChange={(event) => updateField("time1", event.target.value)}
                  style={inputStyle}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  aria-label="第2希望日"
                  value={form.date2}
                  onChange={(event) => updateField("date2", event.target.value)}
                  style={inputStyle}
                />
                <select
                  aria-label="第2希望時間帯"
                  value={form.time2}
                  onChange={(event) => updateField("time2", event.target.value)}
                  style={inputStyle}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  aria-label="第3希望日"
                  value={form.date3}
                  onChange={(event) => updateField("date3", event.target.value)}
                  style={inputStyle}
                />
                <select
                  aria-label="第3希望時間帯"
                  value={form.time3}
                  onChange={(event) => updateField("time3", event.target.value)}
                  style={inputStyle}
                >
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-[10px] leading-5 mt-2" style={{ color: "var(--muted)" }}>
              第1希望は必須、第2・第3希望は任意です。
            </p>
          </div>

          <div>
            <label style={labelStyle} htmlFor={`${mode}-reservation-note`}>
              その他・事前に伝えたいこと
            </label>
            <textarea
              id={`${mode}-reservation-note`}
              value={form.note}
              onChange={(event) => updateField("note", event.target.value)}
              style={{ ...inputStyle, minHeight: "78px", resize: "vertical" }}
            />
          </div>

          <label className="flex gap-3 text-xs leading-5" style={{ color: "var(--charcoal)" }}>
            <input
              required
              type="checkbox"
              checked={form.scheduleConsent}
              onChange={(event) => updateField("scheduleConsent", event.target.checked)}
              style={{ marginTop: "3px", accentColor: "var(--rose)" }}
            />
            日程はメールまたはLINEでの確認後に確定することを了承しました。
          </label>

          <label className="flex gap-3 text-xs leading-5" style={{ color: "var(--charcoal)" }}>
            <input
              required
              type="checkbox"
              checked={form.cancelConsent}
              onChange={(event) => updateField("cancelConsent", event.target.checked)}
              style={{ marginTop: "3px", accentColor: "var(--rose)" }}
            />
            キャンセル規定を確認しました。
          </label>

          <button
            type="submit"
            className="btn-press w-full rounded-xl"
            style={{
              minHeight: "48px",
              background:
                mode === "line"
                  ? "linear-gradient(180deg, #1ADA6E 0%, #06C755 55%, #05AA49 100%)"
                  : "linear-gradient(180deg, #F099B3 0%, #E47C97 45%, #C4687A 100%)",
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              boxShadow: "0 8px 20px rgba(196,104,122,0.28)",
            }}
          >
            {submitLabel}
          </button>
        </form>

        {preview && (
          <div
            className="mt-5 rounded-xl p-4"
            style={{ background: "var(--rose-light)", border: "1px solid var(--pink-mid)" }}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-xs font-bold" style={{ color: "var(--charcoal)" }}>
                送信用メッセージ
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-press inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold"
                style={{
                  background: "white",
                  color: "var(--rose-dark)",
                  border: "1px solid var(--pink-mid)",
                }}
              >
                {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                {copied ? "コピー済み" : "コピー"}
              </button>
            </div>
            {mode === "mail" && RESERVATION_EMAIL && (
              <p className="text-[10px] leading-5 mb-2" style={{ color: "var(--muted)" }}>
                送信先: {RESERVATION_EMAIL}
              </p>
            )}
            <pre
              className="whitespace-pre-wrap break-words text-[11px] leading-6"
              style={{
                color: "var(--charcoal)",
                fontFamily: "var(--font-noto), sans-serif",
                margin: 0,
              }}
            >
              {preview}
            </pre>
            <a
              href={mode === "line" ? LINE_ADD_URL : mailHref}
              target={mode === "line" ? "_blank" : undefined}
              rel={mode === "line" ? "noopener noreferrer" : undefined}
              className="btn-press mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold"
              style={{
                background:
                  mode === "line"
                    ? "linear-gradient(180deg, #1ADA6E 0%, #06C755 55%, #05AA49 100%)"
                    : "linear-gradient(180deg, #F099B3 0%, #E47C97 45%, #C4687A 100%)",
                color: "white",
                textDecoration: "none",
              }}
            >
              {sendLabel}
              <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ReservationChannels() {
  const [reservationMode, setReservationMode] = useState<ReservationMode | null>(null);

  const openReservationForm = (mode: ReservationMode) => {
    setReservationMode(mode);
    window.setTimeout(() => {
      document.getElementById("reservation-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <>
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

          <button
            type="button"
            onClick={() => openReservationForm("line")}
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
              textAlign: "left",
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
                フォーム作成後、公式LINEへ送信
              </p>
            </div>
            <ChevronRight size={20} style={{ color: "rgba(255,255,255,0.70)", flexShrink: 0 }} />
          </button>

          <div style={{ height: "10px" }} />

          <button
            type="button"
            onClick={() => openReservationForm("mail")}
            className="btn-press flex items-center gap-4 w-full px-5 rounded-2xl"
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
                フォーム作成後、メール画面へ送信
              </p>
            </div>
            <ChevronRight size={20} style={{ color: "rgba(255,255,255,0.75)", flexShrink: 0 }} />
          </button>

          <p className="text-[10px] leading-5 mt-4 text-center" style={{ color: "var(--muted)" }}>
            ご希望の方法を選ぶと、送信用フォームへ移動します。
          </p>
        </div>
      </section>

      <ReservationAvailabilityCalendar />

      {reservationMode && <ReservationForm key={reservationMode} mode={reservationMode} />}
    </>
  );
}
