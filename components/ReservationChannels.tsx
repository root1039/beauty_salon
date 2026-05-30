"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { Mail, MessageCircle, ChevronRight, Copy, CheckCircle2 } from "lucide-react";

const LINE_ADD_URL = "https://lin.ee/zCQoCoz";
const RESERVATION_EMAIL = "";

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

function formatDateCandidate(date: string, time: string) {
  return date ? `${date}（${time}）` : "未入力";
}

function buildReservationText(form: FormState) {
  return [
    "【Root1039 予約希望】",
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
    "日程はメールでの確認後に確定することを了承しました。",
    "キャンセル規定を確認しました。",
  ].join("\n");
}

function EmailReservationForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [preview, setPreview] = useState("");
  const [copied, setCopied] = useState(false);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setCopied(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPreview(buildReservationText(form));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!preview) return;
    await navigator.clipboard.writeText(preview);
    setCopied(true);
  };

  return (
    <section id="email-reservation-form" className="px-4 pb-6">
      <div
        className="rounded-2xl p-5"
        style={{
          background: "white",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 28px rgba(42, 28, 32, 0.06)",
        }}
      >
        <p className="text-[11px] tracking-[0.18em] mb-1" style={{ color: "var(--rose)" }}>
          MAIL FORM
        </p>
        <h2
          className="text-base mb-2"
          style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
        >
          メール予約フォーム
        </h2>
        <p className="text-xs leading-6 mb-5" style={{ color: "var(--muted)" }}>
          入力内容を確認用のメール本文にまとめます。内容をコピーして、メールでお送りください。
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label style={labelStyle} htmlFor="reservation-name">
              お名前 <span style={{ color: "var(--rose)" }}>*</span>
            </label>
            <input
              id="reservation-name"
              required
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              style={inputStyle}
              autoComplete="name"
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="reservation-kana">
              フリガナ <span style={{ color: "var(--rose)" }}>*</span>
            </label>
            <input
              id="reservation-kana"
              required
              value={form.kana}
              onChange={(event) => updateField("kana", event.target.value)}
              style={inputStyle}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label style={labelStyle} htmlFor="reservation-phone">
                電話番号 <span style={{ color: "var(--rose)" }}>*</span>
              </label>
              <input
                id="reservation-phone"
                required
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                style={inputStyle}
                autoComplete="tel"
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="reservation-email">
                メールアドレス <span style={{ color: "var(--rose)" }}>*</span>
              </label>
              <input
                id="reservation-email"
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
            <div>
              <label style={labelStyle} htmlFor="reservation-visit-type">
                初回 / 再来
              </label>
              <select
                id="reservation-visit-type"
                value={form.visitType}
                onChange={(event) => updateField("visitType", event.target.value)}
                style={inputStyle}
              >
                <option value="初回">初回</option>
                <option value="再来">再来</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle} htmlFor="reservation-menu">
              希望メニュー <span style={{ color: "var(--rose)" }}>*</span>
            </label>
            <select
              id="reservation-menu"
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
            <label style={labelStyle} htmlFor="reservation-concern">
              お悩み・相談内容
            </label>
            <textarea
              id="reservation-concern"
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
                  id="reservation-date1"
                  required
                  type="date"
                  aria-label="第1希望日"
                  value={form.date1}
                  onChange={(event) => updateField("date1", event.target.value)}
                  style={inputStyle}
                />
                <select
                  id="reservation-time1"
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
                  id="reservation-date2"
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
                  id="reservation-date3"
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
            <label style={labelStyle} htmlFor="reservation-note">
              その他・事前に伝えたいこと
            </label>
            <textarea
              id="reservation-note"
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
            日程はメールでの確認後に確定することを了承しました。
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
              background: "linear-gradient(180deg, #F099B3 0%, #E47C97 45%, #C4687A 100%)",
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              boxShadow: "0 8px 20px rgba(196,104,122,0.28)",
            }}
          >
            入力内容を確認する
          </button>
        </form>

        {preview && (
          <div
            className="mt-5 rounded-xl p-4"
            style={{ background: "var(--rose-light)", border: "1px solid var(--pink-mid)" }}
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-xs font-bold" style={{ color: "var(--charcoal)" }}>
                予約メール本文
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
            {RESERVATION_EMAIL && (
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
          </div>
        )}
      </div>
    </section>
  );
}

export default function ReservationChannels() {
  const [showEmailForm, setShowEmailForm] = useState(false);

  const openEmailForm = () => {
    setShowEmailForm(true);
    window.setTimeout(() => {
      document.getElementById("email-reservation-form")?.scrollIntoView({
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
            onClick={openEmailForm}
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
                フォームに入力して本文を作成
              </p>
            </div>
            <ChevronRight size={20} style={{ color: "rgba(255,255,255,0.75)", flexShrink: 0 }} />
          </button>

          <p className="text-[10px] leading-5 mt-4 text-center" style={{ color: "var(--muted)" }}>
            LINEは友だち追加後、トークからご予約・ご相談いただけます。
          </p>
        </div>
      </section>
      {showEmailForm && <EmailReservationForm />}
    </>
  );
}
