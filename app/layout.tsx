import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "币圈聚合导航｜可信入口，清晰抵达 Web3",
    description: "面向中文用户的交易所与钱包聚合导航，提供清晰入口与关键安全提示。",
    openGraph: {
      title: "币圈聚合导航",
      description: "可信入口，清晰抵达 Web3",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 2200, height: 941, alt: "币圈聚合导航 — 可信入口，清晰抵达 Web3" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "币圈聚合导航",
      description: "可信入口，清晰抵达 Web3",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
