import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const clientUrl = new URL("../dist/client/", import.meta.url);

async function output(path) {
  return readFile(new URL(path, clientUrl), "utf8");
}

test("pre-renders Chinese and English pages", async () => {
  const [home, english] = await Promise.all([
    output("index.html"),
    output("en/index.html"),
  ]);

  assert.match(home, /Web3 币圈聚合导航/);
  assert.match(home, /交易所入口/);
  assert.match(english, /Web3 Crypto Directory/);
  assert.match(english, /Exchange entries/);
});

test("keeps navigation functional without client JavaScript", async () => {
  const home = await output("index.html");
  const navigation = home.match(/<nav[^>]*>[\s\S]*?<\/nav>/)?.[0] ?? "";

  assert.match(navigation, /href="#exchanges"/);
  assert.match(navigation, /href="#wallets"/);
  assert.match(navigation, /href="#safety"/);
  assert.match(navigation, /href="#about"/);
  assert.doesNotMatch(navigation, /<button/);
  assert.match(home, /href="\/web3-entry-cn\/en\/"/);
});

test("lazy-loads below-the-fold images without image preloads", async () => {
  const home = await output("index.html");
  const lazyImages = home.match(/loading="lazy"/g) ?? [];

  assert.equal(lazyImages.length, 7);
  assert.match(home, /decoding="async"/);
  assert.match(home, /width="58" height="58"/);
  assert.doesNotMatch(home, /<link rel="preload" as="image"/);
});

test("uses visible link text as the accessible link name", async () => {
  const home = await output("index.html");

  assert.match(home, /前往注册(?:<!-- -->|\s)*火币<small>htx\.com\.hr<\/small>/);
  assert.match(home, /打开官方入口(?:<!-- -->|\s)*MetaMask<small>metamask\.io<\/small>/);
  assert.doesNotMatch(home, /aria-label="前往注册/);
  assert.doesNotMatch(home, /aria-label="打开官方入口/);
});

test("exports correct metadata and discovery files", async () => {
  const [home, english, robots, sitemap, manifest] = await Promise.all([
    output("index.html"),
    output("en/index.html"),
    output("robots.txt"),
    output("sitemap.xml"),
    output("manifest.webmanifest"),
  ]);

  assert.match(home, /rel="canonical" href="https:\/\/shizi2077\.github\.io\/web3-entry-cn\/"/);
  assert.match(home, /property="og:image:width" content="1672"/);
  assert.match(home, /rel="manifest" href="https:\/\/shizi2077\.github\.io\/web3-entry-cn\/manifest\.webmanifest"/);
  assert.match(english, /rel="canonical" href="https:\/\/shizi2077\.github\.io\/web3-entry-cn\/en\/"/);
  assert.match(robots, /Sitemap: https:\/\/shizi2077\.github\.io\/web3-entry-cn\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/shizi2077\.github\.io\/web3-entry-cn\/en\/<\/loc>/);
  assert.equal(JSON.parse(manifest).start_url, "/web3-entry-cn/");
});

test("uses the GitHub Pages base path for built assets", async () => {
  const home = await output("index.html");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.match(layout, /CloudflareAnalytics/);
  assert.match(home, /href="\/web3-entry-cn\/assets\/[^"]+\.css/);
  await access(new URL("favicon.svg", clientUrl));
});
