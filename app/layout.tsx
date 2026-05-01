import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import SplashScreen from "@/components/SplashScreen";

const shippori = Shippori_Mincho({
  variable: "--font-shippori",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const noto = Noto_Sans_JP({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Root1039 | 根本改善型インナービューティーサロン",
  description:
    "施術・補整下着・水・食品・日用品の見直しを通じて、美容と健康の土台を整える根本改善型サロン。仙台・泉中央。",
  keywords: ["美容サロン", "インナービューティ", "根本改善", "仙台", "泉中央", "高周波施術"],
  openGraph: {
    title: "Root1039 | 根本改善型インナービューティーサロン",
    description: "美容の前に、土台を整える。仙台・泉中央のインナービューティーサロン。",
    locale: "ja_JP",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1C1C1C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${shippori.variable} ${noto.variable}`}>
      <body
        style={{ fontFamily: "var(--font-noto), sans-serif" }}
        className="antialiased"
      >
        <SplashScreen />
        <div className="bg-rings" aria-hidden="true">
          <span className="ring" />
        </div>
        <div className="app-frame">
          <main>{children}</main>
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
