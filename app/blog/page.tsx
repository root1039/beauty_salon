import { ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "ブログ | Root1039",
  description: "Root1039のブログ。美容・健康・習慣に関する知識や日々の発信をnote.comにて公開中。",
};

const NOTE_URL = "https://note.com/rootiv_yuumin";

export default function BlogPage() {
  return (
    <div
      className="page-scroll-frame"
      style={{
        height: "calc(100dvh - 74px)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--gray-light)",
      }}
    >
      <PageHeader
        en="BLOG"
        title="ブログ"
        ballColor="124, 90, 214"
        compact
      />

      <div className="subpage-scroll-body" style={{ background: "var(--cream)" }}>
      {/* ── note.com Banner ── */}
      <div className="px-4 pt-4">
        <a
          href={NOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 rounded-xl transition-opacity active:opacity-70"
          style={{
            background: "white",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "#1A1A1A", fontFamily: "var(--font-shippori), serif" }}
            >
              n
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--charcoal)" }}>note.com で発信中</p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>@rootiv_yuumin</p>
            </div>
          </div>
          <ExternalLink size={15} style={{ color: "var(--muted)" }} />
        </a>
      </div>

      {/* ── Follow CTA ── */}
      <div className="px-4 py-6">
        <a
          href={NOTE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-sm font-medium transition-opacity active:opacity-80"
          style={{ background: "var(--charcoal)", color: "white" }}
        >
          noteで全記事を読む
          <ExternalLink size={15} />
        </a>
      </div>
      </div>
    </div>
  );
}
