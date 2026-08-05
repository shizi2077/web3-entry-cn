import type { Metadata } from "next";
import { DirectoryPage } from "../page";

const siteOrigin = "https://shizi2077.github.io/web3-entry-cn";

export const metadata: Metadata = {
  title: "Web3 Crypto Directory | Trusted paths into Web3",
  description: "Exchange, wallet, and quality Web3 resource entries for Chinese-speaking users.",
  alternates: {
    canonical: `${siteOrigin}/en/`,
    languages: {
      "zh-CN": `${siteOrigin}/`,
      en: `${siteOrigin}/en/`,
    },
  },
  openGraph: {
    title: "Web3 Crypto Directory",
    description: "Trusted entries and a clearer path to Web3",
    type: "website",
    url: `${siteOrigin}/en/`,
    locale: "en_US",
    images: [
      {
        url: `${siteOrigin}/og.png`,
        width: 1672,
        height: 941,
        alt: "Web3 Crypto Directory — trusted entries and a clearer path to Web3",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web3 Crypto Directory",
    description: "Trusted entries and a clearer path to Web3",
    images: [`${siteOrigin}/og.png`],
  },
};

export default function EnglishPage() {
  return <DirectoryPage lang="en" />;
}
