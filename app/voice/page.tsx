import Image from "next/image";
import type { Metadata } from "next";
import { ExternalLink, MapPin, Star } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=root1039#lrd=0x5f898145365517bf:0xc4a1a6b2ef4c33e2,1,,,,";

export const metadata: Metadata = {
  title: "お客様の声 | Root1039",
  description:
    "Root1039に通ってくださるお客様の声をご紹介します。",
};

const voices = [
  {
    src: `${BASE_PATH}/images/voices/voice-1.png`,
    alt: "Root1039 お客様の声 1",
  },
  {
    src: `${BASE_PATH}/images/voices/voice-2.jpg`,
    alt: "Root1039 お客様の声 2",
  },
  {
    src: `${BASE_PATH}/images/voices/voice-3.jpg`,
    alt: "Root1039 お客様の声 3",
  },
  {
    src: `${BASE_PATH}/images/voices/voice-4.jpg`,
    alt: "Root1039 お客様の声 4",
  },
  {
    src: `${BASE_PATH}/images/voices/voice-5.png`,
    alt: "Root1039 お客様の声 5",
  },
  {
    src: `${BASE_PATH}/images/voices/voice-6.jpg`,
    alt: "Root1039 お客様の声 6",
  },
];

const googleReviewImages = [
  {
    src: `${BASE_PATH}/images/root1039_google_reviews_revised_1.png`,
    alt: "Googleマップに届いたRoot1039の口コミ 1",
  },
  {
    src: `${BASE_PATH}/images/root1039_google_reviews_revised_2.png`,
    alt: "Googleマップに届いたRoot1039の口コミ 2",
  },
];

export default function VoicePage() {
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
        en="VOICE"
        title="お客様の声"
        ballColor="196, 104, 122"
        compact
      />

      <div className="subpage-scroll-body" style={{ background: "var(--cream)" }}>
        <div className="mx-auto flex max-w-[760px] flex-col gap-3 px-3 pb-5 pt-1">
          {voices.map((voice, index) => {
            const googleReviewImage = googleReviewImages[index];

            return (
              <div key={voice.src} className="contents">
              <figure
                className="overflow-hidden rounded-lg bg-white"
                style={{
                  border: "1px solid var(--border)",
                  boxShadow: "0 8px 22px rgba(42,28,32,0.06)",
                }}
              >
                <Image
                  src={voice.src}
                  alt={voice.alt}
                  width={1254}
                  height={1254}
                  sizes="(max-width: 430px) 94vw, 760px"
                  className="h-auto w-full"
                  priority={index === 0}
                />
              </figure>

              {googleReviewImage ? (
                <figure
                  className="overflow-hidden rounded-lg bg-white"
                  style={{
                    border: "1px solid var(--border)",
                    boxShadow: "0 8px 22px rgba(42,28,32,0.06)",
                  }}
                >
                  <Image
                    src={googleReviewImage.src}
                    alt={googleReviewImage.alt}
                    width={1080}
                    height={2048}
                    sizes="(max-width: 430px) 94vw, 760px"
                    className="h-auto w-full"
                  />
                </figure>
              ) : null}

              {index === voices.length - 1 ? (
                <section
                  aria-labelledby="google-reviews-title"
                  className="rounded-lg bg-white p-4"
                  style={{
                    border: "1px solid var(--border)",
                    boxShadow: "0 8px 22px rgba(42,28,32,0.06)",
                  }}
                >
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{ background: "#F4F5F7", color: "#C4687A" }}
                      >
                        <MapPin size={18} />
                      </span>
                      <div>
                        <p
                          className="text-[9px] font-bold tracking-[0.16em]"
                          style={{ color: "var(--muted)" }}
                        >
                          GOOGLE MAPS
                        </p>
                        <h2
                          id="google-reviews-title"
                          className="text-sm font-semibold"
                          style={{
                            color: "var(--charcoal)",
                            fontFamily: "var(--font-shippori), serif",
                          }}
                        >
                          Googleマップで口コミを見る
                        </h2>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-0.5" aria-label="Googleマップの評価">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          size={13}
                          fill="#E5A93D"
                          strokeWidth={1.5}
                          style={{ color: "#E5A93D" }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <a
                      href={GOOGLE_REVIEWS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold"
                      style={{
                        textDecoration: "none",
                        background: "#FFFFFF",
                        border: "1px solid #C9CED6",
                        color: "var(--charcoal)",
                      }}
                    >
                      Googleマップで口コミをすべて見る
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </section>
              ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
