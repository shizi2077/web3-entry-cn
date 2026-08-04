"use client";

import { useEffect, useState } from "react";

type Lang = "zh" | "en";

const exchanges = [
  {
    name: "HTX",
    mark: "H",
    href: "https://www.htx.com.hr/invite/zh-cn/1h?invite_code=337d7223",
    domain: "htx.com.hr",
    zh: "面向多地区用户的数字资产平台",
    en: "A digital asset platform serving users across regions",
  },
  {
    name: "OKX",
    mark: "OK",
    href: "https://www.topqwxrvknf.com/join/8160623",
    domain: "topqwxrvknf.com",
    zh: "覆盖交易与 Web3 场景的多端平台",
    en: "A multi-device platform spanning trading and Web3",
  },
  {
    name: "Binance",
    mark: "B",
    href: "https://www.bsmkweb.cc/register?ref=ZHUANQIAN168",
    domain: "bsmkweb.cc",
    zh: "提供广泛数字资产服务的全球化平台",
    en: "A global platform with broad digital asset services",
  },
];

const wallets = [
  {
    name: "MetaMask",
    mark: "M",
    href: "https://metamask.io/",
    domain: "metamask.io",
    zh: "浏览器与移动端自托管钱包",
    en: "A self-custody wallet for browser and mobile",
  },
  {
    name: "Pi Wallet",
    mark: "π",
    href: "https://wallet.pinet.com/",
    domain: "wallet.pinet.com",
    zh: "请通过官方 Pi Browser 打开",
    en: "Open through the official Pi Browser",
    warning: true,
  },
  {
    name: "TokenPocket",
    mark: "TP",
    href: "https://www.tokenpocket.pro/",
    domain: "tokenpocket.pro",
    zh: "支持多链生态的自托管钱包",
    en: "A self-custody wallet supporting multiple chains",
  },
];

const copy = {
  zh: {
    brand: "币圈聚合导航",
    navExchange: "交易所",
    navWallet: "钱包",
    navSafety: "安全提示",
    navAbout: "关于本站",
    eyebrow: "WEB3 ENTRY DIRECTORY · 2026",
    heroTitleA: "可信入口，",
    heroTitleB: "清晰抵达 Web3",
    heroText: "为中文用户整理交易所与钱包入口。信息克制、路径清楚，先核对域名，再安全前往。",
    explore: "浏览交易所",
    safetyFirst: "先看安全提示",
    heroTrust: "仅做入口导航",
    heroNoConnect: "不连接钱包",
    heroNoTrade: "不提供交易",
    exchangeKicker: "EXCHANGES",
    exchangeTitle: "交易所入口",
    exchangeText: "三个常用平台的专属注册入口。跳转前，请再次核对页面显示的目标域名。",
    special: "专属入口",
    register: "前往注册",
    rebate: "通过本站专属入口注册，可解锁专属返佣权益。",
    rebateTag: "专属注册权益",
    walletKicker: "WALLETS",
    walletTitle: "钱包官方入口",
    walletText: "只收录钱包官方地址。首次使用时，建议从官网核对下载来源与产品说明。",
    official: "官方入口",
    openOfficial: "打开官方入口",
    piWarningTitle: "Pi Wallet 助记词安全警示",
    piWarning: "助记词只能在官方 Pi Browser 内打开的 wallet.pinet.com 输入。任何聊天、表单、客服或其他网站索要助记词，都应立即停止。",
    piSafety: "查看 Pi 官方安全中心",
    safetyKicker: "SECURITY CHECK",
    safetyTitle: "出发前，做三次核对",
    safetyText: "Web3 入口无法替你撤销错误操作。多花十秒核对，往往比事后补救更重要。",
    step1: "核对域名",
    step1d: "确认浏览器地址栏与卡片展示的目标域名一致。",
    step2: "保护助记词",
    step2d: "不截图、不上传、不通过聊天工具发送助记词或私钥。",
    step3: "小额验证",
    step3d: "首次使用新地址时，先用小额测试确认网络与地址。",
    aboutKicker: "ABOUT",
    aboutTitle: "清晰的功能边界",
    aboutText: "本站仅提供公开信息整理与外部入口导航，不提供交易、钱包连接、资产管理、登录、KYC、证件上传或密码输入功能。所有外链会在新窗口打开。",
    business: "商务联系",
    footer: "可靠、清晰、专业的 Web3 入口导航。",
    toTop: "返回顶部",
    lang: "EN",
    langLabel: "Switch to English",
  },
  en: {
    brand: "Web3 Entry Directory",
    navExchange: "Exchanges",
    navWallet: "Wallets",
    navSafety: "Safety",
    navAbout: "About",
    eyebrow: "WEB3 ENTRY DIRECTORY · 2026",
    heroTitleA: "Trusted entries, ",
    heroTitleB: "a clearer path to Web3",
    heroText: "A focused directory of exchange and wallet entries for Chinese-speaking users. Check the domain, then continue with confidence.",
    explore: "Explore exchanges",
    safetyFirst: "Read safety tips",
    heroTrust: "Navigation only",
    heroNoConnect: "No wallet connection",
    heroNoTrade: "No trading",
    exchangeKicker: "EXCHANGES",
    exchangeTitle: "Exchange entries",
    exchangeText: "Dedicated registration entries for three commonly used platforms. Always verify the displayed destination domain before leaving.",
    special: "Dedicated entry",
    register: "Register",
    rebate: "Register through a dedicated entry on this site to unlock exclusive rebate benefits.",
    rebateTag: "Registration benefits",
    walletKicker: "WALLETS",
    walletTitle: "Official wallet entries",
    walletText: "Only official wallet addresses are listed. Verify downloads and product guidance on the official site before first use.",
    official: "Official entry",
    openOfficial: "Open official entry",
    piWarningTitle: "Pi Wallet recovery phrase warning",
    piWarning: "Only enter your recovery phrase at wallet.pinet.com opened inside the official Pi Browser. Stop immediately if any chat, form, support agent, or other site asks for it.",
    piSafety: "Pi Safety Center",
    safetyKicker: "SECURITY CHECK",
    safetyTitle: "Three checks before you go",
    safetyText: "Web3 entry points cannot reverse a mistaken action. Ten seconds of checking can matter more than recovery attempts later.",
    step1: "Check the domain",
    step1d: "Match the browser address bar with the destination domain shown on the card.",
    step2: "Protect your phrase",
    step2d: "Never screenshot, upload, or send a recovery phrase or private key in chat.",
    step3: "Test with a small amount",
    step3d: "When using a new address, test the network and address with a small amount first.",
    aboutKicker: "ABOUT",
    aboutTitle: "A clear product boundary",
    aboutText: "This site organizes public information and links to external destinations only. It does not offer trading, wallet connections, asset management, login, KYC, document upload, or password entry. All external links open in a new window.",
    business: "Business contact",
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
  }, []);

  const toggleLang = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
    window.localStorage.setItem("site-language", next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  };

  return (
    <main id="top">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label={t.brand}>
            <span className="brand-mark" aria-hidden="true"><i /></span>
            <span>{t.brand}</span>
          </a>
          <nav className="desktop-nav" aria-label={lang === "zh" ? "主导航" : "Primary navigation"}>
            <a href="#exchanges">{t.navExchange}</a>
            <a href="#wallets">{t.navWallet}</a>
            <a href="#safety">{t.navSafety}</a>
            <a href="#about">{t.navAbout}</a>
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
            <a className="button button-primary" href="#exchanges">{t.explore}<span aria-hidden="true">↘</span></a>
            <a className="button button-ghost" href="#safety">{t.safetyFirst}</a>
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
        <div className="card-grid">
          {exchanges.map((item, index) => (
            <article className="entry-card exchange-card" key={item.name}>
              <div className="card-index">0{index + 1}</div>
              <div className={`platform-mark mark-${item.name.toLowerCase()}`} aria-hidden="true">{item.mark}</div>
              <div className="card-title-row"><h3>{item.name}</h3><span className="badge badge-special">{t.special}</span></div>
              <p className="card-description">{item[lang]}</p>
              <a className="card-link" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.register} ${item.name} — ${item.domain}`}>
                <span>{t.register}<small>{item.domain}</small></span><b aria-hidden="true">↗</b>
              </a>
            </article>
          ))}
        </div>
        <div className="rebate-strip">
          <span className="rebate-icon" aria-hidden="true">%</span>
          <div><p>{t.rebateTag}</p><strong>{t.rebate}</strong></div>
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
                <div className={`platform-mark mark-${item.name.toLowerCase().replace(" ", "-")}`} aria-hidden="true">{item.mark}</div>
                <div className="card-title-row"><h3>{item.name}</h3><span className="badge badge-official"><i />{t.official}</span></div>
                <p className="card-description">{item[lang]}</p>
                <a className="card-link official-link" href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${t.openOfficial} ${item.name} — ${item.domain}`}>
                  <span>{t.openOfficial}<small>{item.domain}</small></span><b aria-hidden="true">↗</b>
                </a>
              </article>
            ))}
          </div>
          <aside className="pi-warning" aria-labelledby="pi-warning-title">
            <div className="warning-symbol" aria-hidden="true">!</div>
            <div><p className="warning-label">IMPORTANT · PI WALLET</p><h3 id="pi-warning-title">{t.piWarningTitle}</h3><p>{t.piWarning}</p></div>
            <a href="https://minepi.com/safety/" target="_blank" rel="noopener noreferrer">{t.piSafety}<small>minepi.com</small><span aria-hidden="true">↗</span></a>
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

      <section className="section about-section" id="about">
        <div className="shell about-inner">
          <div><p className="kicker">{t.aboutKicker}</p><h2>{t.aboutTitle}</h2></div>
          <p className="about-copy">{t.aboutText}</p>
          <div className="contact-block"><span>{t.business}</span><strong>thw-202</strong></div>
        </div>
      </section>

      <footer>
        <div className="shell footer-inner">
          <a className="brand" href="#top"><span className="brand-mark small" aria-hidden="true"><i /></span><span>{t.brand}</span></a>
          <p>{t.footer}</p>
          <a href="#top" className="to-top">{t.toTop} ↑</a>
        </div>
      </footer>
    </main>
  );
}
