import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const contentUrl = new URL("../content/tutorials.ts", import.meta.url);
const clientUrl = new URL("../dist/client/", import.meta.url);

async function html(path) { return readFile(new URL(path, clientUrl), "utf8"); }

test("defines exactly 14 unique P0 tutorials and slugs", async () => {
  const source = await readFile(contentUrl, "utf8");
  const entries = [...source.matchAll(/id: "(P0-\d{2})", slug: "([a-z0-9-]+)"/g)];
  assert.equal(entries.length, 14);
  assert.equal(new Set(entries.map((entry) => entry[1])).size, 14);
  assert.equal(new Set(entries.map((entry) => entry[2])).size, 14);
  assert.deepEqual(entries.map((entry) => entry[1]), Array.from({ length: 14 }, (_, index) => `P0-${String(index + 1).padStart(2, "0")}`));
});

test("pre-renders the homepage, tutorial hub, and all 14 article pages", async () => {
  const [home, hub, source] = await Promise.all([html("index.html"), html("tutorials/index.html"), readFile(contentUrl, "utf8")]);
  assert.match(home, /新手教程/);
  assert.match(home, /我要提到钱包/);
  assert.match(hub, /全部新手教程/);
  assert.match(hub, /<strong>14<\/strong>篇完整教程/);

  const slugs = [...source.matchAll(/id: "P0-\d{2}", slug: "([a-z0-9-]+)"/g)].map((entry) => entry[1]);
  for (const slug of slugs) {
    const article = await html(`tutorials/${slug}/index.html`);
    assert.match(article, /开始前准备/);
    assert.match(article, /编号步骤/);
    assert.match(article, /提交前核对清单/);
    assert.match(article, /官方来源与变更记录/);
    assert.match(article, /target="_blank" rel="noopener noreferrer"/);
  }
  assert.match(source, /"Withdraw from an exchange to a wallet"/);
  assert.match(source, /"Global fiat off-ramp decision guide"/);
});

test("every referenced tutorial image exists and build copies all diagram assets", async () => {
  const source = await readFile(contentUrl, "utf8");
  const files = [...source.matchAll(/img\("([^"]+)"/g)].map((entry) => entry[1]);
  assert.ok(files.length >= 10);
  for (const file of new Set(files)) {
    await access(new URL(`../public/tutorial-images/${file}`, import.meta.url));
    await access(new URL(`tutorial-images/${file}`, clientUrl));
  }
});

test("contains versioned local progress, bilingual feedback, and accessible dialogs", async () => {
  const client = await readFile(new URL("../app/tutorials/[slug]/TutorialArticleClient.tsx", import.meta.url), "utf8");
  assert.match(client, /tutorial-progress:\$\{tutorial\.id\}:\$\{tutorial\.version\}/);
  assert.match(client, /role="dialog"/);
  assert.match(client, /aria-modal="true"/);
  assert.match(client, /event\.key === "Escape"/);
  assert.match(client, /内容已过期/);
  assert.match(client, /Page mismatch/);
  assert.match(client, /navigator\.clipboard\.writeText\("thw-202"\)/);
});

test("keeps scrolling available and avoids body scroll locks", async () => {
  const files = ["app/page.tsx", "app/globals.css", "app/tutorials/TutorialsClient.tsx", "app/tutorials/[slug]/TutorialArticleClient.tsx"];
  for (const file of files) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(source, /document\.body\.style\.overflow|overflow:\s*hidden\s*;[^}]*body|touchmove.*preventDefault|wheel.*preventDefault/);
  }
});

test("exports only the expected article directories", async () => {
  const entries = await readdir(new URL("tutorials/", clientUrl), { withFileTypes: true });
  const articleDirectories = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  assert.equal(articleDirectories.length, 14);
});
