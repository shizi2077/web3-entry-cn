import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const clientUrl = new URL("../dist/client/", import.meta.url);

async function html(path) {
  return readFile(new URL(path, clientUrl), "utf8");
}

test("renders the public homepage with the main navigation", async () => {
  const home = await html("index.html");
  assert.match(home, /Web3 币圈聚合导航/);
  assert.match(home, /交易所入口/);
  assert.doesNotMatch(home, /tutorial|教程|BEGINNER|新手/i);
});

test("does not export tutorial routes or assets", async () => {
  const home = await html("index.html");
  assert.doesNotMatch(home, /\/tutorials\//i);
  await assert.rejects(access(new URL("tutorials/index.html", clientUrl)));
  await assert.rejects(access(new URL("tutorial-images/", clientUrl)));
});

test("keeps analytics integration and stylesheet output", async () => {
  const home = await html("index.html");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(layout, /CloudflareAnalytics/);
  assert.match(home, /href="\/assets\/[^\"]+\.css/);
});
