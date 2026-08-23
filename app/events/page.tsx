import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "告知・お知らせ | Root1039",
  description:
    "Root1039の告知・お知らせ、イベントや体験会などの最新情報をご案内します。",
};

export default function EventsPage() {
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
        en="NEWS"
        title="告知・お知らせ"
        ballColor="201, 169, 110"
        compact
      />

      <div className="subpage-scroll-body" style={{ background: "var(--cream)" }}>
        <section className="mx-auto max-w-[760px] px-4 pb-4 pt-2">
          <div
            className="overflow-hidden rounded-lg bg-white"
            style={{
              border: "1px solid var(--border)",
              boxShadow: "0 8px 22px rgba(42,28,32,0.06)",
            }}
          >
            <Image
              src={`${BASE_PATH}/images/events/event-tokuten.jpg`}
              alt="初回ご来店のお客様限定 うれしい特典プレゼント"
              width={1080}
              height={1536}
              sizes="(max-width: 430px) 92vw, 760px"
              className="h-auto w-full"
              priority
            />
          </div>
        </section>
        <section className="mx-auto max-w-[760px] px-4 pb-4">
          <div
            className="overflow-hidden rounded-lg bg-white"
            style={{
              border: "1px solid var(--border)",
              boxShadow: "0 8px 22px rgba(42,28,32,0.06)",
            }}
          >
            <Image
              src={`${BASE_PATH}/images/events/event-winback-eyecare.jpg`}
              alt="8/25(火)〜 NEW MENU START WINBACK EYE CARE 8/25〜31 START記念スペシャルプライス"
              width={1092}
              height={1440}
              sizes="(max-width: 430px) 92vw, 760px"
              className="h-auto w-full"
            />
          </div>
        </section>
        <section className="mx-auto max-w-[760px] px-4 pb-6">
          <div
            className="overflow-hidden rounded-lg bg-white"
            style={{
              border: "1px solid var(--border)",
              boxShadow: "0 8px 22px rgba(42,28,32,0.06)",
            }}
          >
            <div className="w-full bg-white">
              <Image
                src={`${BASE_PATH}/images/events/event-after-kai.jpg`}
                alt="補整下着 After会 今お持ちの下着をチェックするためのAfter会 26日(水)・28日(金)・30日(日)・31日(月) 10:00〜"
                width={1086}
                height={1448}
                sizes="(max-width: 430px) 92vw, 760px"
                className="h-auto w-full"
              />
            </div>
            <div className="px-4 py-5">
              <p
                className="text-[15px] leading-8"
                style={{ color: "var(--text-dark)" }}
              >
                体験会や季節のご案内は、店頭・公式LINE・Instagramで随時お知らせしています。
              </p>
              <Link
                href="/contact"
                className="mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold"
                style={{
                  textDecoration: "none",
                  background: "var(--charcoal)",
                  color: "white",
                }}
              >
                <CalendarDays size={16} />
                最新情報を問い合わせる
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
