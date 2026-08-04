"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { riskLabels, taskLabels, type Lang, type RiskLevel, type Tutorial } from "../../content/tutorials";
import { TutorialHeader } from "./TutorialHeader";
import { useTutorialLanguage } from "./useTutorialLanguage";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteHref = (href: string) => `${basePath}${href}`;

type FilterKey = "task" | "platform" | "device" | "coin" | "network" | "risk";
type Filters = Record<FilterKey, string>;
const empty: Filters = { task: "", platform: "", device: "", coin: "", network: "", risk: "" };

const labels: Record<FilterKey, { zh: string; en: string }> = {
  task: { zh: "任务", en: "Task" }, platform: { zh: "平台", en: "Platform" }, device: { zh: "设备", en: "Device" }, coin: { zh: "币种", en: "Asset" }, network: { zh: "网络", en: "Network" }, risk: { zh: "风险", en: "Risk" },
};

const quickTasks = [
  ["fiat-in", "¥", "我要入金", "Fiat on-ramp"],
  ["withdraw-wallet", "↗", "我要提到钱包", "Withdraw to wallet"],
  ["deposit-exchange", "↘", "我要充到交易所", "Deposit to exchange"],
  ["fiat-out", "≋", "我要出金", "Fiat off-ramp"],
  ["hardware-wallet", "◇", "我要设置硬件钱包", "Set up hardware wallet"],
  ["troubleshoot", "?", "钱没到账", "Funds missing"],
];

function unique(values: string[]) { return [...new Set(values)].sort((a, b) => a.localeCompare(b)); }

export function TutorialsClient({ tutorials }: { tutorials: Tutorial[] }) {
  const { lang, toggle } = useTutorialLanguage();
  const [filters, setFilters] = useState<Filters>(empty);

  useEffect(() => {
    const task = new URLSearchParams(window.location.search).get("task");
    if (task && taskLabels[task]) window.setTimeout(() => setFilters((current) => ({ ...current, task })), 0);
  }, []);

  const options = useMemo(() => ({
    task: Object.keys(taskLabels),
    platform: unique(tutorials.flatMap((item) => item.platforms)),
    device: unique(tutorials.flatMap((item) => item.devices)),
    coin: unique(tutorials.flatMap((item) => item.coins)),
    network: unique(tutorials.flatMap((item) => item.networks)),
    risk: unique(tutorials.map((item) => item.risk)),
  }), [tutorials]);

  const visible = tutorials.filter((item) =>
    (!filters.task || item.task === filters.task) &&
    (!filters.platform || item.platforms.includes(filters.platform)) &&
    (!filters.device || item.devices.includes(filters.device)) &&
    (!filters.coin || item.coins.includes(filters.coin)) &&
    (!filters.network || item.networks.includes(filters.network)) &&
    (!filters.risk || item.risk === filters.risk),
  );

  const optionLabel = (key: FilterKey, value: string, currentLang: Lang) => {
    if (key === "task") return taskLabels[value][currentLang];
    if (key === "risk") return riskLabels[value as RiskLevel][currentLang];
    return value;
  };

  return (
    <main className="tutorial-site">
      <TutorialHeader lang={lang} onToggle={toggle} />
      <section className="tutorial-hero shell">
        <p className="eyebrow"><span />{lang === "zh" ? "BEGINNER TUTORIALS · 14 GUIDES" : "BEGINNER TUTORIALS · 14 GUIDES"}</p>
        <h1>{lang === "zh" ? "先判断任务，再安全完成第一步" : "Choose the task, then take the first safe step"}</h1>
        <p>{lang === "zh" ? "从基础概念到充提币、硬件钱包与不到账排查。每篇均提供核对清单、官方来源和可保存的步骤进度。" : "From fundamentals to transfers, hardware wallets, and missing-funds checks. Every guide includes checklists, official sources, and saved progress."}</p>
        <div className="tutorial-stat-row"><span><strong>14</strong>{lang === "zh" ? "篇完整教程" : "complete guides"}</span><span><strong>12</strong>{lang === "zh" ? "个官方来源" : "official sources"}</span><span><strong>2</strong>{lang === "zh" ? "种语言" : "languages"}</span></div>
      </section>

      <section className="shell quick-task-section" aria-labelledby="quick-task-title">
        <div className="tutorial-section-title"><p className="kicker">START BY TASK</p><h2 id="quick-task-title">{lang === "zh" ? "你现在要做什么？" : "What do you need to do?"}</h2></div>
        <div className="quick-task-grid">
          {quickTasks.map(([task, icon, zh, en]) => <button key={task} type="button" className={filters.task === task ? "active" : ""} onClick={() => setFilters({ ...empty, task })}><b aria-hidden="true">{icon}</b><span>{lang === "zh" ? zh : en}</span><i aria-hidden="true">→</i></button>)}
        </div>
      </section>

      <section className="shell tutorial-library" aria-labelledby="library-title">
        <div className="tutorial-section-title split"><div><p className="kicker">TUTORIAL LIBRARY</p><h2 id="library-title">{lang === "zh" ? "全部新手教程" : "All beginner tutorials"}</h2></div><p>{lang === "zh" ? `显示 ${visible.length} / ${tutorials.length} 篇` : `Showing ${visible.length} of ${tutorials.length}`}</p></div>
        <div className="tutorial-filters">
          {(Object.keys(labels) as FilterKey[]).map((key) => (
            <label key={key}><span>{labels[key][lang]}</span><select value={filters[key]} onChange={(event) => setFilters((current) => ({ ...current, [key]: event.target.value }))}><option value="">{lang === "zh" ? "全部" : "All"}</option>{options[key].map((value) => <option key={value} value={value}>{optionLabel(key, value, lang)}</option>)}</select></label>
          ))}
          {Object.values(filters).some(Boolean) && <button className="clear-filters" type="button" onClick={() => setFilters(empty)}>{lang === "zh" ? "清除筛选" : "Clear filters"}</button>}
        </div>
        <div className="tutorial-card-grid">
          {visible.map((item) => (
            <article className="tutorial-card" key={item.id}>
              <div className="tutorial-card-meta"><span>{item.id}</span><span className={`risk-pill risk-${item.risk}`}>{riskLabels[item.risk][lang]}</span></div>
              <h3>{item.title[lang]}</h3><p>{item.summary[lang]}</p>
              <div className="tutorial-card-facts"><span>{item.duration[lang]}</span><span>{taskLabels[item.task][lang]}</span><span>{item.lastVerified}</span></div>
              <Link href={siteHref(`/tutorials/${item.slug}/`)}><span>{lang === "zh" ? "开始教程" : "Start guide"}</span><b aria-hidden="true">↗</b></Link>
            </article>
          ))}
        </div>
        {!visible.length && <div className="tutorial-empty"><strong>{lang === "zh" ? "没有符合全部条件的教程" : "No guide matches every filter"}</strong><button type="button" onClick={() => setFilters(empty)}>{lang === "zh" ? "清除筛选" : "Clear filters"}</button></div>}
      </section>
      <footer className="tutorial-footer"><div className="shell"><p>{lang === "zh" ? "教程只保存本机进度，不上传个人数据。" : "Tutorial progress stays in this browser; no personal data is uploaded."}</p><Link href={siteHref("/")}>{lang === "zh" ? "返回导航首页" : "Back to directory"} ↑</Link></div></footer>
    </main>
  );
}
