"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const slides = [
  { src: `${BASE_PATH}/images/header-1.png`, fit: "cover" as const, href: "/about/" },
  { src: `${BASE_PATH}/images/header-2.png`, fit: "cover" as const, href: "/blog/" },
  { src: `${BASE_PATH}/images/header-4.png`, fit: "cover" as const, href: "/blog/" },
  { src: `${BASE_PATH}/images/header-3.png`, fit: "cover" as const, href: "/blog/" },
  { src: `${BASE_PATH}/images/header-5.png`, fit: "cover" as const, href: "/about/?tab=access" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#0E0712" }}
    >
      {slides.map(({ src, fit, href }, i) => (
        <div
          key={src}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 800ms ease-in-out",
            zIndex: i === current ? 2 : 1,
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          <Link
            href={href}
            className="absolute inset-0 block"
            aria-label={
              i === 0
                ? "サロンについてへ"
                : i === slides.length - 1
                  ? "アクセスへ"
                  : "ブログへ"
            }
            style={{ zIndex: 1 }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              sizes="430px"
              style={{ objectFit: fit }}
            />
          </Link>
        </div>
      ))}

      {/* Dot indicators */}
      <div
        className="absolute bottom-2.5 left-1/2 flex gap-1.5"
        style={{ transform: "translateX(-50%)", zIndex: 10 }}
      >
        {slides.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === current ? "18px" : "6px",
              height: "6px",
              borderRadius: "3px",
              background:
                i === current
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.50)",
              transition: "all 0.3s ease",
              display: "block",
            }}
          />
        ))}
      </div>
    </div>
  );
}
