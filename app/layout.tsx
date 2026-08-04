import type { Metadata } from "next";
import "./globals.css";
import { CloudflareAnalytics } from "./CloudflareAnalytics";

const siteOrigin = "https://shizi2077.github.io/web3-entry-cn";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteOrigin}/`),
  title: "Web3 币圈聚合导航｜可信入口，清晰抵达 Web3",
  description: "面向中文用户的交易所、钱包与优质 Web3 资源入口。",
  openGraph: {
    title: "Web3 币圈聚合导航",
    description: "可信入口，清晰抵达 Web3",
    type: "website",
    images: [{ url: `${siteOrigin}/og.png`, width: 2200, height: 941, alt: "Web3 币圈聚合导航 — 可信入口，清晰抵达 Web3" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "币圈聚合导航",
    description: "可信入口，清晰抵达 Web3",
    images: [`${siteOrigin}/og.png`],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <CloudflareAnalytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
