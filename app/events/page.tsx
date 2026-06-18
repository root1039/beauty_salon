import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "イベント情報 | Root1039",
  description:
    "Root1039のイベントや体験会などの最新情報をご案内します。",
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
        en="EVENTS"
        title="イベント情報"
        ballColor="201, 169, 110"
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
            <div className="w-full bg-white">
              <Image
                src={`${BASE_PATH}/images/events/event-chirashi.jpg`}
                alt="Root1039 Cooking Show イベントチラシ"
                width={1024}
                height={1536}
                sizes="(max-width: 430px) 92vw, 760px"
                className="h-auto w-full"
                priority
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
