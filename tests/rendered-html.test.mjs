import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the workflow library", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AI 工作流模板库<\/title>/i);
  assert.match(html, /把看过的方法，变成能直接运行的工作流/);
  assert.match(html, /26 个真实工作流/);
  assert.match(html, /30页资料，怎么用 AI 10 分钟整理成汇报/);
  assert.doesNotMatch(html, /SkeletonPreview|react-loading-skeleton|Your site is taking shape/);
});

test("ships all generated template downloads", async () => {
  const catalog = JSON.parse(await readFile(new URL("../app/catalog.generated.json", import.meta.url), "utf8"));
  assert.equal(catalog.length, 26);

  await Promise.all(
    catalog.flatMap((item) => [
      access(new URL(`../public${item.promptUrl}`, import.meta.url)),
      access(new URL(`../public${item.skillUrl}`, import.meta.url)),
      access(new URL(`../public${item.bundleUrl}`, import.meta.url)),
    ]),
  );

  await access(new URL("../public/ai-workflow-library-all.zip", import.meta.url));
});

test("does not publish original source notes", async () => {
  const catalog = JSON.parse(await readFile(new URL("../app/catalog.generated.json", import.meta.url), "utf8"));
  assert.ok(catalog.every((item) => !("sourceUrl" in item)));
  const html = await (await render()).text();
  assert.doesNotMatch(html, /原始笔记|查看原始笔记/);
});
