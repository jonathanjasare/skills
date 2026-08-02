#!/usr/bin/env node

import { mkdir, rm, writeFile } from "node:fs/promises";
import { delimiter, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import process from "node:process";

function usage() {
  console.log("Usage: node capture-site.mjs <url> [--out references] [--width 1440] [--height 1000] [--settle-ms 1500] [--max-elements 2500] [--headed]");
}

function parseArgs(argv) {
  if (!argv.length || argv.includes("--help") || argv.includes("-h")) return null;
  const options = { url: argv[0], out: "references", width: 1440, height: 1000, settleMs: 1500, maxElements: 2500, headed: false };
  for (let index = 1; index < argv.length; index += 1) {
    const key = argv[index];
    if (key === "--headed") options.headed = true;
    else if (["--out", "--width", "--height", "--settle-ms", "--max-elements"].includes(key)) {
      const value = argv[++index];
      if (value === undefined) throw new Error(`Missing value for ${key}`);
      const field = { "--out": "out", "--width": "width", "--height": "height", "--settle-ms": "settleMs", "--max-elements": "maxElements" }[key];
      options[field] = key === "--out" ? value : Number(value);
    } else throw new Error(`Unknown option: ${key}`);
  }
  const parsed = new URL(options.url);
  if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("URL must use http or https");
  for (const field of ["width", "height", "settleMs", "maxElements"]) {
    if (!Number.isFinite(options[field]) || options[field] < 0) throw new Error(`Invalid ${field}`);
  }
  options.width = Math.max(320, Math.round(options.width));
  options.height = Math.max(480, Math.round(options.height));
  options.maxElements = Math.max(100, Math.round(options.maxElements));
  return options;
}

async function loadPlaywright() {
  const requireFromProject = createRequire(join(process.cwd(), "package.json"));
  for (const packageName of ["playwright", "playwright-core"]) {
    try { return requireFromProject(packageName); }
    catch { /* Try the next supported package. */ }
  }
  for (const modulesDirectory of (process.env.NODE_PATH || "").split(delimiter).filter(Boolean)) {
    for (const packageName of ["playwright", "playwright-core"]) {
      try { return requireFromProject(join(modulesDirectory, packageName)); }
      catch { /* Try the next supported package or modules directory. */ }
    }
  }
  throw new Error("Playwright is not available from the current project or NODE_PATH. Install it in the target project or provide a bundled runtime.");
}

const json = (value) => JSON.stringify(value, null, 2) + "\n";
const delay = (ms) => new Promise((resolveDelay) => setTimeout(resolveDelay, ms));

function markdownBrief(meta, evidence) {
  const top = (items, key, count = 6) => items.slice(0, count).map((item) => `\`${item[key]}\``).join(", ") || "not reliably detected";
  const families = top(evidence.typography.fontFamilies, "value", 4);
  const colors = top(evidence.colors.colors, "value", 8);
  const gaps = top(evidence.layout.spacing.gap, "value", 6);
  return `# Design brief\n\n## Source and intent\n\nAnalyzed [${meta.title || meta.hostname}](${meta.finalUrl}) at ${meta.viewport.width}x${meta.viewport.height}. Use this page as research into visual principles, not as a template or asset source.\n\n## Observed system\n\n- Color signals: ${colors}.\n- Type families observed: ${families}.\n- Common gap values: ${gaps}.\n- Layout evidence: ${evidence.layout.summary.flexContainers} flex containers and ${evidence.layout.summary.gridContainers} grid containers across ${evidence.layout.summary.visibleElements} sampled visible elements.\n- Motion evidence: ${evidence.animations.active.length} active animation samples and ${evidence.animations.css.length} CSS transition or animation declarations.\n\n## Principles to evaluate\n\n1. Study how contrast establishes hierarchy and directs the first scroll.\n2. Translate the spacing rhythm into a new scale suited to the target brand and content density.\n3. Preserve useful pacing qualities while changing section architecture and component geometry.\n4. Reinterpret motion by purpose (orientation, feedback, reveal), not by reproducing signature choreography.\n5. Replace all source copy, identity, imagery, icons, and distinctive visual motifs.\n\n## Originality constraints\n\nThe implementation must use the user's brand, content, and project-native components. Do not reuse source code or assets. Change information architecture, copy, brand system, geometry, imagery, and motion sufficiently that the result cannot be mistaken for the source.\n`;
}

function prompts(meta) {
  return `# Working prompts\n\n## Synthesis\n\nAnalyze the measured JSON and screenshots from ${meta.finalUrl}. Distill relationships, hierarchy, rhythm, density, and motion intent. Separate observed facts from interpretation. Do not copy source wording, assets, trademarks, or exact visual combinations.\n\n## Implementation\n\nBuild an original website in the existing repository using the user's branding and content. Use the reference pack for design principles only. Preserve the project's architecture, change the source's information architecture and component geometry, validate responsive states and interactions, and report which principles influenced the result.\n\n## Critique\n\nCompare implementation screenshots with the design brief, not for pixel similarity but for equivalent quality: hierarchy, rhythm, contrast, legibility, responsiveness, and purposeful motion. Flag any element that looks too derivative and propose a more original alternative.\n`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (!options) { usage(); return; }

  const output = resolve(options.out);
  const screenshotsDir = join(output, "screenshots");
  const videoDir = join(output, ".video-tmp");
  const inspirationDir = join(output, "inspiration");
  await Promise.all([mkdir(screenshotsDir, { recursive: true }), mkdir(videoDir, { recursive: true }), mkdir(inspirationDir, { recursive: true })]);

  const warnings = [];
  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({ headless: !options.headed });
  const context = await browser.newContext({
    viewport: { width: options.width, height: options.height },
    recordVideo: { dir: videoDir, size: { width: options.width, height: options.height } },
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const video = page.video();
  const startedAt = new Date().toISOString();

  try {
    await page.goto(options.url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForLoadState("networkidle", { timeout: 12_000 }).catch(() => warnings.push("Network did not become idle before capture."));
    await page.waitForTimeout(options.settleMs);

    const observed = await page.evaluate((maxElements) => {
      const count = (values) => [...values.reduce((map, value) => value && value !== "none" ? map.set(value, (map.get(value) || 0) + 1) : map, new Map())]
        .map(([value, occurrences]) => ({ value, occurrences })).sort((a, b) => b.occurrences - a.occurrences);
      const visible = [...document.querySelectorAll("body *")].filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 1 && rect.height > 1 && style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) > 0;
      }).slice(0, maxElements);
      const styles = visible.map((element) => ({ element, style: getComputedStyle(element), rect: element.getBoundingClientRect() }));
      const colorValues = [];
      for (const { style } of styles) colorValues.push(style.color, style.backgroundColor, style.borderTopColor, style.fill, style.stroke);
      const textStyles = styles.filter(({ element }) => (element.textContent || "").trim() && element.children.length < 6);
      const role = ({ element, style }) => ({
        tag: element.tagName.toLowerCase(),
        text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100),
        fontFamily: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight,
        lineHeight: style.lineHeight, letterSpacing: style.letterSpacing, textTransform: style.textTransform,
      });
      const landmarks = [...document.querySelectorAll("header, nav, main, section, article, aside, footer")].slice(0, 100).map((element) => {
        const rect = element.getBoundingClientRect();
        return { tag: element.tagName.toLowerCase(), id: element.id || null, className: typeof element.className === "string" ? element.className.slice(0, 160) : null, x: Math.round(rect.x), y: Math.round(rect.y + scrollY), width: Math.round(rect.width), height: Math.round(rect.height) };
      });
      const cssMotion = styles.filter(({ style }) => style.animationName !== "none" || style.transitionDuration.split(",").some((item) => parseFloat(item) > 0)).slice(0, 250).map(({ element, style }) => ({
        tag: element.tagName.toLowerCase(), animationName: style.animationName, animationDuration: style.animationDuration,
        animationTimingFunction: style.animationTimingFunction, transitionProperty: style.transitionProperty,
        transitionDuration: style.transitionDuration, transitionTimingFunction: style.transitionTimingFunction,
      }));
      const active = document.getAnimations().slice(0, 250).map((animation) => {
        const timing = animation.effect?.getTiming?.() || {};
        return { playState: animation.playState, currentTime: animation.currentTime, duration: timing.duration, delay: timing.delay, iterations: timing.iterations, easing: timing.easing };
      });
      return {
        title: document.title,
        document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
        colors: { colors: count(colorValues) },
        typography: {
          fontFamilies: count(textStyles.map(({ style }) => style.fontFamily)), fontSizes: count(textStyles.map(({ style }) => style.fontSize)),
          fontWeights: count(textStyles.map(({ style }) => style.fontWeight)), lineHeights: count(textStyles.map(({ style }) => style.lineHeight)),
          letterSpacing: count(textStyles.map(({ style }) => style.letterSpacing),),
          roles: textStyles.filter(({ element }) => /^(H1|H2|H3|P|A|BUTTON)$/.test(element.tagName)).slice(0, 120).map(role),
        },
        layout: {
          landmarks,
          spacing: {
            gap: count(styles.map(({ style }) => style.gap)),
            padding: count(styles.flatMap(({ style }) => [style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft])),
            margin: count(styles.flatMap(({ style }) => [style.marginTop, style.marginRight, style.marginBottom, style.marginLeft])),
          },
          summary: {
            visibleElements: visible.length,
            flexContainers: styles.filter(({ style }) => style.display.includes("flex")).length,
            gridContainers: styles.filter(({ style }) => style.display.includes("grid")).length,
            fixedElements: styles.filter(({ style }) => style.position === "fixed").length,
            stickyElements: styles.filter(({ style }) => style.position === "sticky").length,
          },
        },
        animations: { css: cssMotion, active },
      };
    }, options.maxElements);

    const meta = {
      sourceUrl: options.url, finalUrl: page.url(), hostname: new URL(page.url()).hostname,
      title: observed.title, startedAt, capturedAt: new Date().toISOString(),
      viewport: { width: options.width, height: options.height }, document: observed.document,
      userAgent: await page.evaluate(() => navigator.userAgent),
    };
    const maxScroll = Math.max(0, observed.document.height - options.height);
    const positions = [0, 0.25, 0.5, 0.75, 1];
    for (const [index, fraction] of positions.entries()) {
      const y = Math.round(maxScroll * fraction);
      await page.evaluate((top) => window.scrollTo({ top, behavior: "instant" }), y);
      await page.waitForTimeout(350);
      await page.screenshot({ path: join(screenshotsDir, `${String(index + 1).padStart(2, "0")}-${Math.round(fraction * 100)}pct.png`) });
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({ path: join(screenshotsDir, "full-page.png"), fullPage: true }).catch((error) => warnings.push(`Full-page screenshot failed: ${error.message}`));
    for (let step = 0; step <= 80; step += 1) {
      await page.evaluate(({ top }) => window.scrollTo({ top, behavior: "instant" }), { top: Math.round(maxScroll * step / 80) });
      await delay(45);
    }
    await delay(500);

    await Promise.all([
      writeFile(join(output, "colors.json"), json({ source: meta.finalUrl, ...observed.colors })),
      writeFile(join(output, "typography.json"), json({ source: meta.finalUrl, ...observed.typography })),
      writeFile(join(output, "layout.json"), json({ source: meta.finalUrl, viewport: meta.viewport, document: meta.document, ...observed.layout })),
      writeFile(join(output, "animations.json"), json({ source: meta.finalUrl, ...observed.animations })),
      writeFile(join(output, "design.md"), markdownBrief(meta, observed)),
      writeFile(join(output, "prompts.md"), prompts(meta)),
      writeFile(join(inspirationDir, "manifest.json"), json({ sourceUrl: meta.sourceUrl, finalUrl: meta.finalUrl, capturedAt: meta.capturedAt, purpose: "design research", permittedUse: "abstract design principles and measured evidence", prohibitedReuse: ["source code", "logos and trademarks", "copy", "images and illustrations", "distinctive icons", "exact section composition"] })),
    ]);

    await context.close();
    const webm = join(output, "scroll-recording.webm");
    await video.saveAs(webm);
    const mp4 = join(output, "scroll-recording.mp4");
    const conversion = spawnSync("ffmpeg", ["-y", "-i", webm, "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4], { encoding: "utf8", windowsHide: true });
    if (conversion.status !== 0) warnings.push("FFmpeg was unavailable or video conversion failed; scroll-recording.webm is the playable source recording.");

    const report = { status: "complete", ...meta, artifacts: { screenshots: "screenshots/", colors: "colors.json", typography: "typography.json", layout: "layout.json", animations: "animations.json", designBrief: "design.md", prompts: "prompts.md", recording: conversion.status === 0 ? "scroll-recording.mp4" : "scroll-recording.webm", provenance: "inspiration/manifest.json" }, warnings };
    await writeFile(join(output, "capture-report.json"), json(report));
    console.log(`Captured ${meta.finalUrl} into ${output}`);
    if (warnings.length) console.warn(warnings.join("\n"));
  } catch (error) {
    await writeFile(join(output, "capture-report.json"), json({ status: "failed", sourceUrl: options.url, startedAt, failedAt: new Date().toISOString(), error: error.message, warnings })).catch(() => {});
    throw error;
  } finally {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
    await rm(videoDir, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
