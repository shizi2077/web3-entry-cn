"use client";

import Link from "next/link";
import type { Lang } from "../../content/tutorials";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteHref = (href: string) => `${basePath}${href}`;

export function TutorialHeader({ lang, onToggle }: { lang: Lang; onToggle: () => void }) {
  return (
    <header className="site-header tutorial-header">
      <div className="shell header-inner">
        <Link className="brand" href={siteHref("/")} aria-label={lang === "zh" ? "返回 Web3 币圈聚合导航首页" : "Return to Web3 Crypto Directory"}>
          <span className="brand-mark" aria-hidden="true"><i /></span>
          <span>{lang === "zh" ? "Web3 币圈聚合导航" : "Web3 Crypto Directory"}</span>
        </Link>
        <nav className="tutorial-nav" aria-label={lang === "zh" ? "教程导航" : "Tutorial navigation"}>
          <Link href={siteHref("/tutorials/")}>{lang === "zh" ? "新手教程" : "Tutorials"}</Link>
          <Link href={siteHref("/#exchanges")}>{lang === "zh" ? "交易所" : "Exchanges"}</Link>
          <Link href={siteHref("/#wallets")}>{lang === "zh" ? "钱包" : "Wallets"}</Link>
        </nav>
        <button className="lang-switch" type="button" onClick={onToggle} aria-label={lang === "zh" ? "Switch to English" : "切换为简体中文"}>
          <span aria-hidden="true">◎</span>{lang === "zh" ? "EN" : "中"}
        </button>
      </div>
    </header>
  );
}
