import Image from "next/image";
import type { Metadata } from "next";
import { HeartHandshake, Repeat2, TrendingUp } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "サロンオーナー様へ | Root1039",
  description:
    "美容サロンの顧客満足、リピート、安定した売上づくりを支えるコンサルティングサービスを準備中です。",
};

const consultingThemes = [
  {
    Icon: HeartHandshake,
    title: "お客様満足度",
    text: "選ばれる理由と、心に残るサロン体験を整える。",
  },
  {
    Icon: Repeat2,
    title: "リピート",
    text: "一度きりではなく、長く通いたくなる関係を育てる。",
  },
  {
    Icon: TrendingUp,
    title: "安定した売上",
    text: "サロンの強みを生かし、無理なく続く仕組みをつくる。",
  },
];

export default function OwnersPage() {
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
        en="FOR SALON OWNERS"
        title="サロンオーナー様へ"
        ballColor="124, 90, 214"
        compact
      />

      <div className="subpage-scroll-body" style={{ background: "var(--cream)" }}>
        <section className="mx-auto max-w-[760px] px-4 pb-6 pt-2">
          <div
            className="overflow-hidden rounded-lg bg-white"
            style={{
              border: "1px solid var(--border)",
              boxShadow: "0 8px 22px rgba(42,28,32,0.06)",
            }}
          >
            <div className="relative aspect-square w-full">
              <Image
                src={`${BASE_PATH}/images/cards/card-owners.jpg`}
                alt="サロンオーナー様向けのご相談"
                fill
                sizes="(max-width: 430px) 92vw, 760px"
                className="object-cover"
                priority
              />
            </div>
            <div className="px-5 py-6">
              <p
                className="text-[10px] font-semibold tracking-[0.22em]"
                style={{ color: "var(--rose-dark)" }}
              >
                COMING SOON
              </p>
              <h2
                className="mt-2 text-xl leading-relaxed"
                style={{
                  color: "var(--text-dark)",
                  fontFamily: "var(--font-shippori), serif",
                }}
              >
                美容サロンの未来を、
                <br />
                ともに整える。
              </h2>
              <p
                className="mt-3 text-sm leading-7"
                style={{ color: "var(--text-mid)" }}
              >
                お客様にもっと喜ばれ、何度も訪れたくなるサロンへ。Root1039で培った経験をもとに、サロン運営を一緒に考えるコンサルティングサービスを準備しています。
              </p>

              <div className="mt-5 border-y" style={{ borderColor: "var(--border)" }}>
                {consultingThemes.map(({ Icon, title, text }, index) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 py-4"
                    style={{
                      borderTop: index === 0 ? "none" : "1px solid var(--border)",
                    }}
                  >
                    <div
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "var(--pink-pale)", color: "var(--rose-dark)" }}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color: "var(--text-dark)" }}>
                        {title}
                      </h3>
                      <p className="mt-1 text-xs leading-5" style={{ color: "var(--text-mid)" }}>
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p
                className="mt-5 text-center text-xs leading-6"
                style={{ color: "var(--text-mid)" }}
              >
                現在、サービス開始に向けて準備中です。
                <br />
                詳細のご案内まで、今しばらくお待ちください。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
