import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata = {
  title: "ブログ | Root1039",
  description: "Root1039のブログ。美容・健康・習慣に関する知識や日々の発信をnote.comにて公開中。",
};

// ── Mock data (Replace with note.com RSS fetch) ──
const mockPosts = [
  {
    id: 1,
    title: "何をしても変わらない人が、最初に見直すべきこと",
    excerpt: "エステを続けても、ダイエットを頑張っても変わらない——その理由は、土台にあります。",
    tag: "根本改善",
    date: "2026.04.20",
    url: "https://note.com/yuumin_root1039",
  },
  {
    id: 2,
    title: "小さいパンツ、履いていませんか？下着選びが身体に与える影響",
    excerpt: "正しいサイズの下着を選ぶだけで、姿勢とボディラインが変わります。",
    tag: "補整下着",
    date: "2026.04.15",
    url: "https://note.com/yuumin_root1039",
  },
  {
    id: 3,
    title: "水を変えることが、美容改善の最初の一歩になる理由",
    excerpt: "毎日必ず飲む水。だからこそ、まずここから変えることが身体への一番の投資です。",
    tag: "水・習慣",
    date: "2026.04.10",
    url: "https://note.com/yuumin_root1039",
  },
  {
    id: 4,
    title: "体重より見た目が大切な理由——WINBACKで目指すボディメイク",
    excerpt: "数字に縛られずに、見た目・ライン・巡り・ごきげんさを整えるアプローチとは。",
    tag: "施術",
    date: "2026.04.05",
    url: "https://note.com/yuumin_root1039",
  },
  {
    id: 5,
    title: "自分の機嫌を自分で整える——ごきげん美容習慣のつくり方",
    excerpt: "健康も美容も、我慢や制限ではなく、機嫌よく自分を整える選択から始まります。",
    tag: "考え方",
    date: "2026.03.28",
    url: "https://note.com/yuumin_root1039",
  },
];

const tagColors: Record<string, string> = {
  "根本改善": "#C4687A",
  "補整下着": "#9E4A5A",
  "水・習慣": "#4A8FA0",
  "施術": "#6B6B9E",
  "考え方": "#8B7050",
};

export default function BlogPage() {
  return (
    <div className="page-content" style={{ background: "var(--cream)" }}>
      {/* ── Header ── */}
      <PageHeader
        en="BLOG"
        title="ブログ"
        ballColor="124, 90, 214"
        compact
      />

      {/* ── note.com Banner ── */}
      <div className="px-4 pt-6">
        <a
          href="https://note.com/yuumin_root1039"
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
              <p className="text-xs" style={{ color: "var(--muted)" }}>@yuumin_root1039</p>
            </div>
          </div>
          <ExternalLink size={15} style={{ color: "var(--muted)" }} />
        </a>
      </div>

      {/* ── Post List ── */}
      <section className="px-4 py-6 space-y-4">
        <p className="text-xs tracking-widest px-2" style={{ color: "var(--muted)" }}>LATEST POSTS</p>
        {mockPosts.map((post, i) => (
          <a
            key={post.id}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl p-5 transition-transform active:scale-[0.98] anim-fade-up"
            style={{
              background: "white",
              border: "1px solid var(--border)",
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: `${tagColors[post.tag]}18`,
                  color: tagColors[post.tag] ?? "var(--rose)",
                }}
              >
                {post.tag}
              </span>
              <span className="text-xs" style={{ color: "var(--muted)" }}>{post.date}</span>
            </div>
            <h3
              className="text-base leading-snug mb-2"
              style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
            >
              {post.title}
            </h3>
            <p className="text-xs leading-5" style={{ color: "var(--muted)" }}>
              {post.excerpt}
            </p>
          </a>
        ))}
      </section>

      {/* ── Follow CTA ── */}
      <div className="px-4 pb-4">
        <a
          href="https://note.com/yuumin_root1039"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl text-sm font-medium transition-opacity active:opacity-80"
          style={{ background: "var(--charcoal)", color: "white" }}
        >
          noteで全記事を読む
          <ExternalLink size={15} />
        </a>
      </div>

      {/* ── Paid content note ── */}
      <div
        className="mx-4 mb-6 rounded-2xl p-5"
        style={{ background: "var(--rose-light)", border: "1px solid var(--rose-muted)" }}
      >
        <p className="text-[10px] tracking-widest mb-2" style={{ color: "var(--rose-dark)" }}>PREMIUM</p>
        <h3
          className="text-base mb-2"
          style={{ fontFamily: "var(--font-shippori), serif", color: "var(--charcoal)" }}
        >
          セミナー内容・有料コンテンツ
        </h3>
        <p className="text-xs leading-5 mb-4" style={{ color: "var(--muted)" }}>
          より深い知識やセミナーの内容は、noteの有料記事として公開しています。
        </p>
        <a
          href="https://note.com/yuumin_root1039"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium"
          style={{ color: "var(--rose)" }}
        >
          有料記事を見る <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}
