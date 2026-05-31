"use client";

import Image from "next/image";
import Link from "next/link";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const heroImage = `${BASE_PATH}/images/header-1.jpg`;

export default function HeroSlider() {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: "#FAF6F3" }}
    >
      <Link
        href="/about/"
        className="absolute inset-0 block"
        aria-label="サロンについてへ"
      >
        <Image
          src={heroImage}
          alt="施術だけで終わらない、根本美容。"
          fill
          priority
          sizes="(min-width: 768px) 560px, 430px"
          style={{ objectFit: "cover" }}
        />
      </Link>
    </div>
  );
}
