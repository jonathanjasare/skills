#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import process from "node:process";

const json = (value) => JSON.stringify(value, null, 2) + "\n";
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const captureSite = join(scriptDirectory, "capture-site.mjs");
const valueFlags = new Set(["--out", "--width", "--height", "--settle-ms", "--max-elements"]);

function usage() {
  console.log("Usage: node capture-design-language.mjs <url> [url ...] [--out references] [--width 1440] [--height 1000] [--settle-ms 1500] [--max-elements 2500] [--headed]");
}

function parseArgs(argv) {
  if (!argv.length || argv.includes("--help") || argv.includes("-h")) return null;
  const urls = [];
  const captureArgs = [];
  let output = "references";
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--headed") { captureArgs.push(argument); continue; }
    if (valueFlags.has(argument)) {
      const value = argv[++index];
      if (value === undefined) throw new Error(`Missing value for ${argument}`);
      if (argument === "--out") output = value;
      else captureArgs.push(argument, value);
      continue;
    }
    if (argument.startsWith("--")) throw new Error(`Unknown option: ${argument}`);
    const parsed = new URL(argument);
    if (!["http:", "https:"].includes(parsed.protocol)) throw new Error(`URL must use http or https: ${argument}`);
    urls.push(argument);
  }
  if (!urls.length) throw new Error("Provide at least one URL.");
  return { urls, output: resolve(output), captureArgs };
}

function sourceId(url, index, used) {
  const parsed = new URL(url);
  const base = `${String(index + 1).padStart(2, "0")}-${parsed.hostname}${parsed.pathname}`
    .toLowerCase().replace(/^www\./, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 72) || `source-${index + 1}`;
  let candidate = base;
  let suffix = 2;
  while (used.has(candidate)) candidate = `${base}-${suffix++}`;
  used.add(candidate);
  return candidate;
}

function runCapture(url, output, captureArgs) {
  return new Promise((resolveCapture) => {
    const child = spawn(process.execPath, [captureSite, url, "--out", output, ...captureArgs], { stdio: "inherit", windowsHide: true });
    child.on("error", (error) => resolveCapture({ ok: false, error: error.message }));
    child.on("close", (code, signal) => resolveCapture({ ok: code === 0, exitCode: code, signal }));
  });
}

async function reportFor(directory) {
  try { return JSON.parse(await readFile(join(directory, "capture-report.json"), "utf8")); }
  catch { return null; }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options) { usage(); return; }
  const sourcesDirectory = join(options.output, "sources");
  await mkdir(sourcesDirectory, { recursive: true });
  const usedIds = new Set();
  const sources = [];
  const startedAt = new Date().toISOString();

  for (const [index, url] of options.urls.entries()) {
    const id = sourceId(url, index, usedIds);
    const directory = join(sourcesDirectory, id);
    console.log(`\n[${index + 1}/${options.urls.length}] Capturing ${url}`);
    const result = await runCapture(url, directory, options.captureArgs);
    const captureReport = await reportFor(directory);
    sources.push({ id, requestedUrl: url, directory: `sources/${id}/`, status: result.ok ? "complete" : "failed", captureReport, ...result });
  }

  const failed = sources.filter((source) => source.status !== "complete");
  const report = {
    status: failed.length ? (failed.length === sources.length ? "failed" : "partial") : "complete",
    startedAt,
    completedAt: new Date().toISOString(),
    sourceCount: sources.length,
    sources,
  };
  await Promise.all([
    writeFile(join(options.output, "sources.json"), json({ sources: sources.map(({ captureReport, ...source }) => source) })),
    writeFile(join(options.output, "capture-design-language-report.json"), json(report)),
  ]);
  console.log(`\nCaptured ${sources.length - failed.length}/${sources.length} source(s) into ${options.output}`);
  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
