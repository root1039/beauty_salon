"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SPLASH_LOGO = `${BASE_PATH}/images/splash-logo.png`;

export default function SplashScreen() {
  const [stage, setStage] = useState<"showing" | "fadeOut" | "hidden">(
    "showing",
  );
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    const tLogoIn = setTimeout(() => setLogoVisible(true), 60);
    const tFadeOut = setTimeout(() => setStage("fadeOut"), 2600);
    const tHidden = setTimeout(() => setStage("hidden"), 3500);

    return () => {
      clearTimeout(tLogoIn);
      clearTimeout(tFadeOut);
      clearTimeout(tHidden);
    };
  }, []);

  if (stage === "hidden") return null;

  const overlayOpacity = stage === "fadeOut" ? 0 : 1;
  const logoOpacity = logoVisible && stage !== "fadeOut" ? 1 : 0;
  const logoScale = logoVisible ? 1 : 0.94;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--cream)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: overlayOpacity,
        transition: "opacity 800ms ease",
        pointerEvents: stage === "fadeOut" ? "none" : "auto",
      }}
      aria-hidden={stage === "fadeOut"}
    >
      <div
        style={{
          width: "62%",
          maxWidth: 320,
          aspectRatio: "1 / 1",
          position: "relative",
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          transition: "opacity 1200ms ease, transform 1400ms ease",
        }}
      >
        <Image
          src={SPLASH_LOGO}
          alt="Root1039"
          fill
          priority
          sizes="320px"
          style={{ objectFit: "contain" }}
        />
      </div>

      <div
        style={{
          marginTop: 28,
          width: 96,
          height: 2,
          borderRadius: 999,
          background: "rgba(201,169,110,0.18)",
          overflow: "hidden",
          opacity: logoOpacity,
          transition: "opacity 600ms ease",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "40%",
            borderRadius: 999,
            background:
              "linear-gradient(90deg, rgba(201,169,110,0.0) 0%, rgba(201,169,110,0.95) 50%, rgba(201,169,110,0.0) 100%)",
            animation: "splashLoaderMove 1.4s ease-in-out infinite",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes splashLoaderMove {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(360%); }
        }
      `}</style>
    </div>
  );
}
