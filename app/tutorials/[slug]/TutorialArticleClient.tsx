"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { highRiskReminders, riskLabels, taskLabels, type Tutorial } from "../../../content/tutorials";
import { TutorialHeader } from "../TutorialHeader";
import { useTutorialLanguage } from "../useTutorialLanguage";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (src: string) => `${basePath}${src}`;
const siteHref = (href: string) => `${basePath}${href}`;

export function TutorialArticleClient({ tutorial }: { tutorial: Tutorial }) {
  const { lang, toggle } = useTutorialLanguage();
  const [checked, setChecked] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState<Tutorial["steps"][number]["image"]>();
  const [feedback, setFeedback] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);
  const progressKey = `tutorial-progress:${tutorial.id}:${tutorial.version}`;

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(progressKey) ?? "[]");
      window.setTimeout(() => setChecked(saved), 0);
    } catch {
      window.setTimeout(() => setChecked([]), 0);
    }
  }, [progressKey]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setLightbox(undefined); setFeedback(false); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => { if (feedback || lightbox) closeButton.current?.focus(); }, [feedback, lightbox]);

  const toggleStep = (id: string) => {
    setChecked((current) => {
      const next = current.includes(id) ? current.filter((value) => value !== id) : [...current, id];
      window.localStorage.setItem(progressKey, JSON.stringify(next));
      return next;
    });
  };
  const progress = Math.round((checked.length / tutorial.steps.length) * 100);
  const sourceMap = useMemo(() => new Map(tutorial.sources.map((source) => [source.id, source])), [tutorial.sources]);
  const copyWeChat = async () => { await navigator.clipboard.writeText("thw-202"); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };

  return (
    <main className="tutorial-site article-site">
      <TutorialHeader lang={lang} onToggle={toggle} />
      <div className="article-shell shell">
        <aside className="article-sidebar">
          <Link className="back-link" href={siteHref("/tutorials/")}>← {lang === "zh" ? "返回教程中心" : "Back to tutorials"}</Link>
          <div className="progress-card"><span>{lang === "zh" ? "本机学习进度" : "Local progress"}</span><strong>{checked.length}/{tutorial.steps.length}</strong><div><i style={{ width: `${progress}%` }} /></div><small>{lang === "zh" ? "按教程版本保存，不上传" : "Saved by version, never uploaded"}</small></div>
          <nav aria-label={lang === "zh" ? "文章目录" : "Article contents"}><a href="#overview">01 {lang === "zh" ? "开始前" : "Before you start"}</a><a href="#steps">02 {lang === "zh" ? "操作步骤" : "Steps"}</a><a href="#checklist">03 {lang === "zh" ? "提交前核对" : "Checklist"}</a><a href="#troubleshoot">04 {lang === "zh" ? "成功与排查" : "Success & TXID"}</a><a href="#sources">05 {lang === "zh" ? "来源与记录" : "Sources"}</a></nav>
        </aside>

        <article className="tutorial-article">
          <header className="article-title-block">
            <div className="article-badges"><span>{tutorial.id}</span><span className={`risk-pill risk-${tutorial.risk}`}>{riskLabels[tutorial.risk][lang]}</span><span>{taskLabels[tutorial.task][lang]}</span></div>
            <h1>{tutorial.title[lang]}</h1><p>{tutorial.summary[lang]}</p>
            <dl><div><dt>{lang === "zh" ? "预计时间" : "Time"}</dt><dd>{tutorial.duration[lang]}</dd></div><div><dt>{lang === "zh" ? "费用类型" : "Fee type"}</dt><dd>{tutorial.feeType[lang]}</dd></div><div><dt>{lang === "zh" ? "内容版本" : "Version"}</dt><dd>v{tutorial.version}</dd></div><div><dt>{lang === "zh" ? "最后核验" : "Last verified"}</dt><dd>{tutorial.lastVerified}</dd></div></dl>
          </header>

          <section id="overview" className="article-section">
            <p className="kicker">BEFORE YOU START</p><h2>{lang === "zh" ? "开始前准备" : "Before you start"}</h2>
            <div className="goal-card"><span>{lang === "zh" ? "本篇目标" : "Goal"}</span><strong>{tutorial.goal[lang]}</strong><p>{tutorial.scope[lang]}</p></div>
            <div className="article-meta-grid"><div><h3>{lang === "zh" ? "平台与设备" : "Platform & device"}</h3><p>{[...tutorial.platforms, ...tutorial.devices].join(" · ")}</p></div><div><h3>{lang === "zh" ? "地区与网络" : "Region & network"}</h3><p>{[...tutorial.regions, ...tutorial.networks].join(" · ")}</p></div></div>
            <ul className="prepare-list">{tutorial.prerequisites.map((item, index) => <li key={index}><span>{String(index + 1).padStart(2, "0")}</span>{item[lang]}</li>)}</ul>
          </section>

          {tutorial.risk === "high" && <aside className="high-risk-panel" aria-labelledby="high-risk-title"><div><span aria-hidden="true">!</span><p className="kicker">HIGH-RISK CHECK</p><h2 id="high-risk-title">{lang === "zh" ? "六项固定安全提醒" : "Six mandatory safety checks"}</h2></div><ul>{highRiskReminders.map((item, index) => <li key={index}>{item[lang]}</li>)}</ul></aside>}

          <section id="steps" className="article-section">
            <p className="kicker">STEP BY STEP</p><h2>{lang === "zh" ? "编号步骤" : "Step by step"}</h2>
            <div className="tutorial-steps">
              {tutorial.steps.map((item) => (
                <section className={`tutorial-step ${checked.includes(item.id) ? "done" : ""}`} key={item.id}>
                  <div className="step-number">{item.id.padStart(2, "0")}</div><div className="step-content"><h3>{item.title[lang]}</h3><p>{item.body[lang]}</p>{item.caution && <aside>{item.caution[lang]}</aside>}
                    {item.image && <figure><button type="button" onClick={() => setLightbox(item.image)} aria-label={lang === "zh" ? `放大：${item.image.alt.zh}` : `Enlarge: ${item.image.alt.en}`}><img src={asset(item.image.src)} alt={item.image.alt[lang]} /></button><figcaption>{item.image.caption[lang]}</figcaption></figure>}
                    <div className="step-source-row">{item.sourceIds.map((id) => { const source = sourceMap.get(id); return source ? <a key={id} href={source.url} target="_blank" rel="noopener noreferrer"><span>S · {source.domain}</span>↗</a> : null; })}</div>
                  </div><label className="step-check"><input type="checkbox" checked={checked.includes(item.id)} onChange={() => toggleStep(item.id)} /><span>{lang === "zh" ? "完成" : "Done"}</span></label>
                </section>
              ))}
            </div>
          </section>

          <section id="checklist" className="article-section"><p className="kicker">FINAL CHECK</p><h2>{lang === "zh" ? "提交前核对清单" : "Final checklist"}</h2><div className="final-checklist">{tutorial.checklist.map((item, index) => <label key={index}><input type="checkbox" /><span>{item[lang]}</span></label>)}</div><div className="test-reminder"><b>{lang === "zh" ? "默认先小额测试" : "Test with a small amount first"}</b><p>{lang === "zh" ? "首次使用的新地址、新网络或较大金额，都应先完成一笔可承受的小额测试；确认到账后再继续。" : "For a new address, network, or larger amount, first complete a manageable test and continue only after receipt."}</p></div></section>

          <section id="troubleshoot" className="article-section"><p className="kicker">SUCCESS & TXID</p><h2>{lang === "zh" ? "成功标准与排查" : "Success and troubleshooting"}</h2><ul className="success-list">{tutorial.success.map((item, index) => <li key={index}><span>✓</span>{item[lang]}</li>)}</ul><div className="txid-card"><span>TXID</span><p>{tutorial.txid[lang]}</p></div><div className="faq-list">{tutorial.faq.map((item, index) => <details key={index}><summary>{item.q[lang]}</summary><p>{item.a[lang]}</p></details>)}</div></section>

          <section id="sources" className="article-section"><p className="kicker">SOURCES & CHANGELOG</p><h2>{lang === "zh" ? "官方来源与变更记录" : "Official sources and change log"}</h2><div className="source-list">{tutorial.sources.map((source) => <a href={source.url} target="_blank" rel="noopener noreferrer" key={source.id}><span className="source-grade">{source.tier}</span><div><strong>{source.title[lang]}</strong><small>{source.domain} · {lang === "zh" ? "访问" : "accessed"} {source.accessedAt} · {lang === "zh" ? "引用步骤" : "steps"} {source.citedSteps.join(", ")}</small></div><b aria-hidden="true">↗</b></a>)}</div><div className="change-log">{tutorial.changeLog.map((entry) => <p key={entry.date}><time>{entry.date}</time><span>{entry.note[lang]}</span></p>)}</div></section>

          <section className="feedback-cta"><div><p className="kicker">CONTENT FEEDBACK</p><h2>{lang === "zh" ? "发现内容已过期或链接可疑？" : "Outdated content or a suspicious link?"}</h2><p>{lang === "zh" ? "反馈不会上传任何钱包数据。请勿发送助记词、私钥或验证码。" : "Feedback uploads no wallet data. Never send a recovery phrase, private key, or code."}</p></div><button type="button" onClick={() => setFeedback(true)}>{lang === "zh" ? "反馈问题" : "Report an issue"}</button></section>
        </article>
      </div>

      {lightbox && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={lightbox.alt[lang]} onMouseDown={(event) => { if (event.target === event.currentTarget) setLightbox(undefined); }}><div className="image-modal"><button ref={closeButton} type="button" className="modal-close" onClick={() => setLightbox(undefined)} aria-label={lang === "zh" ? "关闭大图" : "Close image"}>×</button><img src={asset(lightbox.src)} alt={lightbox.alt[lang]} /><p>{lightbox.caption[lang]}</p></div></div>}
      {feedback && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="feedback-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setFeedback(false); }}><div className="feedback-modal"><button ref={closeButton} type="button" className="modal-close" onClick={() => setFeedback(false)} aria-label={lang === "zh" ? "关闭反馈" : "Close feedback"}>×</button><p className="kicker">WECHAT FEEDBACK</p><h2 id="feedback-title">{lang === "zh" ? "通过微信反馈" : "Report via WeChat"}</h2><p>{lang === "zh" ? "请选择问题类型，并在添加微信时附上教程编号。请勿发送任何账户凭证。" : "Choose an issue type and include the tutorial ID when adding us. Never send account credentials."}</p><div className="feedback-tags"><span>{lang === "zh" ? "内容已过期" : "Outdated content"}</span><span>{lang === "zh" ? "页面不一致" : "Page mismatch"}</span><span>{lang === "zh" ? "链接可疑" : "Suspicious link"}</span></div><dl><div><dt>{lang === "zh" ? "教程编号" : "Tutorial ID"}</dt><dd>{tutorial.id}</dd></div><div><dt>WeChat</dt><dd>thw-202</dd></div></dl><button className="copy-wechat" type="button" onClick={copyWeChat}>{copied ? (lang === "zh" ? "已复制" : "Copied") : (lang === "zh" ? "复制微信号" : "Copy WeChat ID")}</button></div></div>}
    </main>
  );
}
