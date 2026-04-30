"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const slides = [
  { src: `${BASE_PATH}/images/header-1.png`, fit: "contain" },
  { src: `${BASE_PATH}/images/header-2.png`, fit: "contain" },
  { src: `${BASE_PATH}/images/header-3.png`, fit: "contain" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3200); // 3.2秒ごとにフェード切替
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        borderRadius: "10px",
        background: "#F5F0EE",
        border: "1.5px solid rgba(201,169,110,0.9)",
      }}
    >
      {/* 定点フェード切替 */}
      {slides.map(({ src, fit }, i) => (
        <div
          key={src}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 800ms ease-in-out",
            zIndex: i === current ? 2 : 1,
          }}
        >
          <Image
            src={src}
            alt={`ヘッダー画像 ${i + 1}`}
            fill
            priority={i === 0}
            sizes="430px"
            style={{ objectFit: fit as "cover" | "contain" }}
          />
        </div>
      ))}

      {/* ドットインジケーター */}
      <div
        className="absolute bottom-2.5 left-1/2 flex gap-1.5"
        style={{ transform: "translateX(-50%)", zIndex: 10 }}
      >
        {slides.map((_, i) => (
          <span
            key={i}
            style={{
              width:      i === current ? "18px" : "6px",
              height:     "6px",
              borderRadius: "3px",
              background: i === current ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.50)",
              transition: "all 0.3s ease",
              display:    "block",
            }}
          />
        ))}
      </div>
    </div>
  );
}
