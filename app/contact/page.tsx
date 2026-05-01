import { Clock, MapPin, Camera, BookOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ReservationChannels from "@/components/ReservationChannels";

export const metadata = {
  title: "ご予約 | Root1039",
  description:
    "Root1039へのご予約・お問い合わせ。メール（準備中）またはLINE公式アカウントから。仙台・泉中央の根本改善型インナービューティーサロン。",
};
const INSTAGRAM_URL = "https://www.instagram.com/yuumin_root1039/";
const NOTE_URL = "https://note.com/yuumin_root1039";

const faqs = [
  {
    q: "初めてでも大丈夫ですか？",
    a: "はい、もちろんです。まずはLINEでお気軽にご相談ください。お悩みをお聞きした上で、最適なご提案をします。",
  },
  {
    q: "どこから始めればいいかわかりません",
    a: "「何から変えたらいいかわからない」という方こそ、Root1039の得意とするところです。一緒に土台から整えていきましょう。",
  },
  {
    q: "施術だけでも大丈夫ですか？",
    a: "はい。施術単体でのご利用も可能です。ただ、より根本的な変化を求める方には生活習慣の見直しもご提案しています。",
  },
];

export default function ContactPage() {
  return (
    <div className="page-content" style={{ background: "var(--cream)" }}>
      {/* ── Header ── */}
      <PageHeader
        en="RESERVATION"
        title="ご予約・お問い合わせ"
        ballColor="0, 168, 145"
        compact
      />

      <ReservationChannels />

      {/* ── Salon Info ── */}
      <section
        className="mx-4 mb-6 rounded-2xl p-6"
        style={{ background: "white", border: "1px solid var(--border)" }}
      >
        <p className="text-[11px] tracking-[0.2em] mb-4" style={{ color: "var(--rose)" }}>SALON INFO</p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "var(--rose)" }} />
            <div>
              <p className="text-sm font-medium mb-0.5" style={{ color: "var(--charcoal)" }}>所在地</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                宮城県仙台市泉区<br />
                <span className="text-xs">（詳細はご予約後にご案内します）</span>
              </p>
            </div>
          </li>
          <div className="h-px" style={{ background: "var(--border)" }} />
          <li className="flex items-start gap-3">
            <Clock size={16} className="mt-0.5 shrink-0" style={{ color: "var(--rose)" }} />
            <div>
              <p className="text-sm font-medium mb-0.5" style={{ color: "var(--charcoal)" }}>営業時間</p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                完全予約制<br />
                <span className="text-xs">LINEにてご相談ください</span>
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* ── FAQ ── */}
      <section className="px-4 mb-6">
        <p className="text-[11px] tracking-[0.2em] mb-4 px-1" style={{ color: "var(--rose)" }}>FAQ</p>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl p-5 anim-fade-up"
              style={{
                background: "white",
                border: "1px solid var(--border)",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <p
                className="text-sm font-medium mb-2"
                style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
              >
                Q. {faq.q}
              </p>
              <p className="text-xs leading-5" style={{ color: "var(--muted)" }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SNS Links ── */}
      <section className="px-4 mb-6">
        <p className="text-[11px] tracking-[0.2em] mb-4 px-1" style={{ color: "var(--rose)" }}>FOLLOW US</p>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl transition-opacity active:opacity-70"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            <Camera size={20} style={{ color: "#E1306C" }} />
            <div>
              <p className="text-xs font-medium" style={{ color: "var(--charcoal)" }}>Instagram</p>
              <p className="text-[10px]" style={{ color: "var(--muted)" }}>@yuumin_root1039</p>
            </div>
          </a>
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl transition-opacity active:opacity-70"
            style={{ background: "white", border: "1px solid var(--border)" }}
          >
            <BookOpen size={20} style={{ color: "var(--charcoal)" }} />
            <div>
              <p className="text-xs font-medium" style={{ color: "var(--charcoal)" }}>note</p>
              <p className="text-[10px]" style={{ color: "var(--muted)" }}>記事を読む</p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
