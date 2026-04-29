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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000); // 3秒ごと
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ borderRadius: "10px", background: "#F5F0EE" }}
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
