"use client";

import { useEffect, useState } from "react";

type Lang = "zh" | "en";

const exchanges = [
  {
    zhName: "火币",
    enName: "HTX",
    icon: "/brands/htx-app.webp",
    href: "https://www.htx.com.hr/invite/zh-cn/1h?invite_code=337d7223",
    domain: "htx.com.hr",
    zh: "面向多地区用户的数字资产平台",
    en: "A digital asset platform serving users across regions",
  },
  {
    zhName: "欧易",
    enName: "OKX",
    icon: "/brands/okx-app.jpg",
    href: "https://www.topqwxrvknf.com/join/8160623",
    domain: "topqwxrvknf.com",
    zh: "覆盖交易与 Web3 场景的多端平台",
    en: "A multi-device platform spanning trading and Web3",
  },
  {
    zhName: "币安",
    enName: "Binance",
    icon: "/brands/binance-app.jpg",
    href: "https://www.bsmkweb.cc/register?ref=ZHUANQIAN168",
    domain: "bsmkweb.cc",
    zh: "提供广泛数字资产服务的全球化平台",
    en: "A global platform with broad digital asset services",
  },
];

const wallets = [
  {
    name: "MetaMask",
    icon: "/brands/metamask-app.svg",
    href: "https://metamask.io/",
    domain: "metamask.io",
    zh: "浏览器与移动端自托管钱包",
    en: "A self-custody wallet for browser and mobile",
  },
  {
    name: "Pi Wallet",
    icon: "/brands/pi-wallet-app.jpg",
    href: "https://wallet.pinet.com/",
    domain: "wallet.pinet.com",
    zh: "请通过官方 Pi Browser 打开",
    en: "Open through the official Pi Browser",
    warning: true,
  },
  {
    name: "TokenPocket",
    icon: "/brands/tokenpocket-app.jpg",
    href: "https://www.tokenpocket.pro/",
    domain: "tokenpocket.pro",
    zh: "支持多链生态的自托管钱包",
    en: "A self-custody wallet supporting multiple chains",
  },
];

const copy = {
  zh: {
    brand: "Web3 币圈聚合导航",
    navExchange: "交易所",
    navWallet: "钱包",
    navSafety: "安全提示",
    navAbout: "商务联系",
    eyebrow: "WEB3 ENTRY DIRECTORY · 2026",
    heroTitleA: "可信入口，",
    heroTitleB: "清晰抵达 Web3",
    heroText: "为中文用户整理交易所与钱包入口、以及优质 Web3 资源。",
    explore: "浏览交易所",
    safetyFirst: "先看安全提示",
    heroTrust: "仅做入口导航",
    heroNoConnect: "不连接钱包",
    heroNoTrade: "不提供交易",
    exchangeKicker: "EXCHANGES",
    exchangeTitle: "交易所入口",
    exchangeText: "火币、欧易、币安的注册入口。",
    special: "专属入口",
    register: "前往注册",
    rebate: "通过本站专属入口注册，可解锁专属返佣权益。",
    rebateTag: "专属注册权益",
    walletKicker: "WALLETS",
    walletTitle: "钱包官方入口",
    walletText: "只收录钱包官方地址。首次使用时，建议从官网核对下载来源与产品说明。",
    official: "官方入口",
    openOfficial: "打开官方入口",
    walletWarningTitle: "钱包助记词安全提示",
    walletWarning: "助记词和私钥只能在对应钱包的官方应用或官方入口内输入。任何聊天、表单、客服或其他网站索要，都应立即停止。",
    safetyKicker: "SECURITY CHECK",
    safetyTitle: "出发前，做三次核对",
    safetyText: "Web3 入口无法替你撤销错误操作。多花十秒核对，往往比事后补救更重要。",
    step1: "核对域名",
    step1d: "确认浏览器地址栏与卡片展示的目标域名一致。",
    step2: "保护助记词",
    step2d: "不截图、不上传、不通过聊天工具发送助记词或私钥。",
    step3: "小额验证",
    step3d: "首次使用新地址时，先用小额测试确认网络与地址。",
    aboutKicker: "合作与投放",
    aboutTitle: "让优质 Web3 项目被看见",
    aboutText: "提供广告投放、站点自荐与 Web3 站点制作服务。欢迎通过微信沟通合作方向与需求。",
    business: "商务联系",
    wechatLabel: "微信 / WeChat",
    wechatHint: "添加时请备注合作事项",
    footer: "可靠、清晰、专业的 Web3 入口导航。",
    toTop: "返回顶部",
    lang: "EN",
    langLabel: "Switch to English",
  },
  en: {
    brand: "Web3 Crypto Directory",
    navExchange: "Exchanges",
    navWallet: "Wallets",
    navSafety: "Safety",
    navAbout: "Contact",
    eyebrow: "WEB3 ENTRY DIRECTORY · 2026",
    heroTitleA: "Trusted entries, ",
    heroTitleB: "a clearer path to Web3",
    heroText: "A focused directory of exchange, wallet, and quality Web3 resources for Chinese-speaking users.",
    explore: "Explore exchanges",
    safetyFirst: "Read safety tips",
    heroTrust: "Navigation only",
    heroNoConnect: "No wallet connection",
    heroNoTrade: "No trading",
    exchangeKicker: "EXCHANGES",
    exchangeTitle: "Exchange entries",
    exchangeText: "Registration entries for Huobi, OKX, and Binance.",
    special: "Dedicated entry",
    register: "Register",
    rebate: "Register through a dedicated entry on this site to unlock exclusive rebate benefits.",
    rebateTag: "Registration benefits",
    walletKicker: "WALLETS",
    walletTitle: "Official wallet entries",
    walletText: "Only official wallet addresses are listed. Verify downloads and product guidance on the official site before first use.",
    official: "Official entry",
    openOfficial: "Open official entry",
    walletWarningTitle: "Wallet recovery phrase safety note",
    walletWarning: "Only enter a recovery phrase or private key in the corresponding wallet's official app or entry. Stop immediately if any chat, form, support agent, or other site asks for it.",
    safetyKicker: "SECURITY CHECK",
    safetyTitle: "Three checks before you go",
    safetyText: "Web3 entry points cannot reverse a mistaken action. Ten seconds of checking can matter more than recovery attempts later.",
    step1: "Check the domain",
    step1d: "Match the browser address bar with the destination domain shown on the card.",
    step2: "Protect your phrase",
    step2d: "Never screenshot, upload, or send a recovery phrase or private key in chat.",
    step3: "Test with a small amount",
    step3d: "When using a new address, test the network and address with a small amount first.",
    aboutKicker: "PARTNERSHIPS & ADVERTISING",
    aboutTitle: "Help quality Web3 projects get discovered",
    aboutText: "Advertising placements, site submissions, and Web3 site production. Reach out on WeChat to discuss your needs.",
    business: "Business contact",
    wechatLabel: "WeChat",
    wechatHint: "Please include your partnership topic",
    footer: "A reliable, clear, and professional Web3 entry directory.",
    toTop: "Back to top",
    lang: "中",
    langLabel: "切换为简体中文",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("zh");
  const t = copy[lang];

  useEffect(() => {
    const saved = window.localStorage.getItem("site-language");
    if (saved === "zh" || saved === "en") {
      setLang(saved);
    } else if (!window.navigator.language.toLowerCase().startsWith("zh")) {
      setLang("en");
    }

    const clearLegacyHash = () => {
      const initialTarget = window.location.hash.slice(1);
      if (!initialTarget) return;

      window.requestAnimationFrame(() => {
        document.getElementById(initialTarget)?.scrollIntoView({ block: "start", behavior: "auto" });
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      });
    };

    const legacyHashTimer = window.setTimeout(clearLegacyHash, 100);
    window.addEventListener("hashchange", clearLegacyHash);

    return () => {
      window.clearTimeout(legacyHashTimer);
      window.removeEventListener("hashchange", clearLegacyHash);
    };
  }, []);

  const toggleLang = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
    window.localStorage.setItem("site-language", next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  };

  const scrollToSection = (targetId: string) => {
    document.getElementById(targetId)?.scrollIntoView({ block: "start", behavior: "auto" });
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <main id="top">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="site-header">
        <div className="shell header-inner">
          <button className="brand" type="button" onClick={() => scrollToSection("top")} aria-label={t.brand}>
            <span className="brand-mark" aria-hidden="true"><i /></span>
            <span>{t.brand}</span>
          </button>
          <nav className="desktop-nav" aria-label={lang === "zh" ? "主导航" : "Primary navigation"}>
            <button type="button" onClick={() => scrollToSection("exchanges")}>{t.navExchange}</button>
            <button type="button" onClick={() => scrollToSection("wallets")}>{t.navWallet}</button>
            <button type="button" onClick={() => scrollToSection("safety")}>{t.navSafety}</button>
            <button type="button" onClick={() => scrollToSection("about")}>{t.navAbout}</button>
          </nav>
          <button className="lang-switch" type="button" onClick={toggleLang} aria-label={t.langLabel}>
            <span aria-hidden="true">◎</span>{t.lang}
          </button>
        </div>
      </header>

      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="particles" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <div className="hero-copy">
          <p className="eyebrow"><span />{t.eyebrow}</p>
          <h1 id="hero-title">{t.heroTitleA}<em>{t.heroTitleB}</em></h1>
          <p className="hero-intro">{t.heroText}</p>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={() => scrollToSection("exchanges")}>{t.explore}<span aria-hidden="true">↘</span></button>
            <button className="button button-ghost" type="button" onClick={() => scrollToSection("safety")}>{t.safetyFirst}</button>
          </div>
          <div className="trust-line" aria-label={lang === "zh" ? "本站功能边界" : "Site boundaries"}>
            <span>✓ {t.heroTrust}</span><span>✓ {t.heroNoConnect}</span><span>✓ {t.heroNoTrade}</span>
          </div>
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="orbit-core"><span className="brand-mark large"><i /></span></div>
          <span className="orbit-dot dot-one" />
          <span className="orbit-dot dot-two" />
          <span className="orbit-dot dot-three" />
          <span className="orbit-label label-a">EXCHANGE</span>
          <span className="orbit-label label-b">WALLET</span>
          <span className="orbit-label label-c">VERIFY</span>
        </div>
      </section>

      <section className="section shell" id="exchanges">
        <div className="section-head">
          <div><p className="kicker">{t.exchangeKicker}</p><h2>{t.exchangeTitle}</h2></div>
          <p>{t.exchangeText}</p>
        </div>
        <div className="rebate-strip">
          <span className="rebate-icon" aria-hidden="true">%</span>
          <div><p>{t.rebateTag}</p><strong>{t.rebate}</strong></div>
        </div>
        <div className="card-grid">
          {exchanges.map((item, index) => (
            <article className="entry-card exchange-card" key={item.enName}>
              <div className="card-index">0{index + 1}</div>
              <div className="platform-mark platform-logo">
                <img src={item.icon} alt={`${lang === "zh" ? item.zhName : item.enName} App ${lang === "zh" ? "图标" : "icon"}`} />
              </div>
              <div className="card-title-row"><h3>{lang === "zh" ? item.zhName : item.enName}</h3><span className="badge badge-special">{t.special}</span></div>
              <p className="card-description">{item[lang]}</p>
              <a className="card-link" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.register} ${lang === "zh" ? item.zhName : item.enName} — ${item.domain}`}>
                <span>{t.register}<small>{item.domain}</small></span><b aria-hidden="true">↗</b>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section wallet-section" id="wallets">
        <div className="shell">
          <div className="section-head">
            <div><p className="kicker">{t.walletKicker}</p><h2>{t.walletTitle}</h2></div>
            <p>{t.walletText}</p>
          </div>
          <div className="card-grid">
            {wallets.map((item, index) => (
              <article className="entry-card wallet-card" key={item.name}>
                <div className="card-index">0{index + 1}</div>
                <div className="platform-mark platform-logo">
                  <img src={item.icon} alt={`${item.name} ${lang === "zh" ? "官方 App 图标" : "official app icon"}`} />
                </div>
                <div className="card-title-row"><h3>{item.name}</h3><span className="badge badge-official"><i />{t.official}</span></div>
                <p className="card-description">{item[lang]}</p>
                <a className="card-link official-link" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.openOfficial} ${item.name} — ${item.domain}`}>
                  <span>{t.openOfficial}<small>{item.domain}</small></span><b aria-hidden="true">↗</b>
                </a>
              </article>
            ))}
          </div>
          <aside className="wallet-warning" aria-labelledby="wallet-warning-title">
            <div className="warning-symbol" aria-hidden="true">!</div>
            <div><p className="warning-label">IMPORTANT · WALLET</p><h3 id="wallet-warning-title">{t.walletWarningTitle}</h3><p>{t.walletWarning}</p></div>
          </aside>
        </div>
      </section>

      <section className="section shell safety-section" id="safety">
        <div className="section-head">
          <div><p className="kicker">{t.safetyKicker}</p><h2>{t.safetyTitle}</h2></div>
          <p>{t.safetyText}</p>
        </div>
        <div className="safety-grid">
          {[
            ["01", t.step1, t.step1d, "⌁"],
            ["02", t.step2, t.step2d, "◇"],
            ["03", t.step3, t.step3d, "↔"],
          ].map(([num, title, text, icon]) => (
            <article className="safety-card" key={num}>
              <span className="safety-num">{num}</span><span className="safety-icon" aria-hidden="true">{icon}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="about">
        <div className="shell contact-inner">
          <div className="contact-heading"><p className="kicker">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p></div>
          <div className="wechat-card">
            <img src="/brands/wechat-app.jpg" alt={lang === "zh" ? "微信官方 App 图标" : "Official WeChat app icon"} />
            <div className="wechat-details">
              <span>{t.wechatLabel}</span>
              <strong>thw-202</strong>
              <small>{t.wechatHint}</small>
            </div>
            <div className="wechat-status"><i />{t.business}</div>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <button className="brand" type="button" onClick={() => scrollToSection("top")}><span className="brand-mark small" aria-hidden="true"><i /></span><span>{t.brand}</span></button>
          <p>{t.footer}</p>
          <button type="button" onClick={() => scrollToSection("top")} className="to-top">{t.toTop} ↑</button>
        </div>
      </footer>
    </main>
  );
}
