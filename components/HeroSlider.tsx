"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const slides = [
  { src: `${BASE_PATH}/images/header-1.png`, fit: "cover"   },
  { src: `${BASE_PATH}/images/header-2.png`, fit: "contain" }, // 2枚目は全体が見えるよう contain
  { src: `${BASE_PATH}/images/header-3.png`, fit: "cover"   },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); // 3秒ごと
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        borderRadius: "10px",
        background: "#F5F0EE",
        border: "1.5px solid rgba(201,169,110,0.9)",
      }}
      onClick={() => setIsPlaying((p) => !p)}
    >
      {/* スライドトラック: 右→左にスライド */}
      <div
        style={{
          display: "flex",
          width: `${slides.length * 100}%`,
          height: "100%",
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        }}
      >
        {slides.map(({ src, fit }, i) => (
          <div
            key={src}
            style={{
              width: `${100 / slides.length}%`,
              height: "100%",
              position: "relative",
              flexShrink: 0,
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
      </div>

      {/* 一時停止インジケーター */}
      {!isPlaying && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "10px",
            zIndex: 10,
            display: "flex",
            gap: "3px",
            alignItems: "center",
          }}
        >
          <span style={{ width: "3px", height: "12px", background: "rgba(255,255,255,0.85)", borderRadius: "2px", display: "block" }} />
          <span style={{ width: "3px", height: "12px", background: "rgba(255,255,255,0.85)", borderRadius: "2px", display: "block" }} />
        </div>
      )}

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
