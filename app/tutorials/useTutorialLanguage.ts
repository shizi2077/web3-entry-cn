"use client";

import { useEffect, useState } from "react";
import type { Lang } from "../../content/tutorials";

export function useTutorialLanguage() {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    const saved = window.localStorage.getItem("site-language");
    const next = saved === "zh" || saved === "en" ? saved : window.navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
    window.setTimeout(() => setLang(next), 0);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  }, []);

  const toggle = () => {
    const next = lang === "zh" ? "en" : "zh";
    setLang(next);
    window.localStorage.setItem("site-language", next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  };

  return { lang, toggle };
}
