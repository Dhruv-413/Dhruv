// PostToolUse (Edit|Write|MultiEdit): feedback on the file that was just changed. Two modes, wired separately in settings.json:
//   node post-edit-check.mjs design   (sync, ~50 ms)  design-system heuristics -> additionalContext, exit 0
//   node post-edit-check.mjs lint     (asyncRewake)   ESLint errors only; runs in the background so edits never wait.
//                                                     Errors -> stderr + exit 2 (wakes Claude); clean -> exit 0, no output.
// Neither mode can block a tool call or loop.
import fs from "node:fs";
import path from "node:path";
import { readInput, relToApp, hasDeps, eslintJson, formatEslint, additionalContext, APP } from "./lib.mjs";

const mode = process.argv[2] === "lint" ? "lint" : "design";
const input = await readInput();
const file = input.tool_input?.file_path;
if (!file) process.exit(0);

const rel = relToApp(file);
if (!rel || !rel.startsWith("src/")) process.exit(0);

const ext = path.extname(rel).toLowerCase();
const isCode = [".ts", ".tsx"].includes(ext);
const isCss = ext === ".css";
if (!isCode && !isCss) process.exit(0);

// ---- lint mode ------------------------------------------------------------
if (mode === "lint") {
  if (!isCode || !hasDeps()) process.exit(0);
  const { results, timedOut, raw } = eslintJson([rel], 120_000);
  if (results) {
    const lines = formatEslint(results, 12);
    if (lines.length) {
      process.stderr.write(`ESLint errors in ${rel} (found after your edit — if a related edit is still coming, ignore until it lands):\n${lines.map((l) => `  - ${l}`).join("\n")}\n`);
      process.exit(2);
    }
  } else {
    // ESLint itself failed or timed out — say so instead of implying the file is clean.
    process.stderr.write(`ESLint could not check ${rel}: ${timedOut ? "timed out" : String(raw ?? "no output").trim().split("\n").slice(0, 4).join(" | ")}\n`);
    process.exit(2);
  }
  process.exit(0);
}

// ---- design mode ----------------------------------------------------------
let text = "";
try {
  text = fs.readFileSync(path.join(APP, rel), "utf8");
} catch {
  process.exit(0);
}
const isTokensFile = rel === "src/app/globals.css";
const design = [];
const lineOf = (idx) => text.slice(0, idx).split("\n").length;
// A line is exempt if it says `design-ignore`, or is a browser-chrome colour (theme-color / themeColor), which must be a literal.
const lines = text.split("\n");
const exempt = (idx) => /design-ignore|theme-?color/i.test(lines[lineOf(idx) - 1] ?? "");
const scan = (re, msg) => {
  const hits = [...text.matchAll(re)].filter((m) => !exempt(m.index ?? 0)).slice(0, 3).map((m) => `L${lineOf(m.index ?? 0)}`);
  if (hits.length) design.push(`${msg} (${hits.join(", ")})`);
};

if (!isTokensFile) {
  // Hard-coded colours bypass the oklch token system in globals.css (light/dark themes break).
  scan(/(?<!href=["'])(?:#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3,4}\b|rgba?\(\s*\d)/g, "hard-coded colour (incl. arbitrary `bg-[#…]` classes); use a CSS variable/token from globals.css");
}
if (isCode) {
  scan(/\btransition-all\b/g, "`transition-all` animates layout properties; transition specific properties (opacity/transform/colors)");
  scan(/<img\s/g, "raw <img>; use next/image (remotePatterns are configured in next.config.ts)");
  scan(/\bz-\[\d{3,}\]/g, "arbitrary huge z-index; use a defined layer scale");
  if (/\boutline-none\b/.test(text) && !/focus-visible:/.test(text)) {
    design.push("`outline-none` without any `focus-visible:` style: keyboard focus becomes invisible");
  }
  if (/from ["']framer-motion["']/.test(text) && !/useReducedMotion|MotionConfig|prefers-reduced-motion/.test(text) && /\banimate=|whileInView|whileHover|animate\(/.test(text)) {
    design.push("framer-motion animation with no reduced-motion handling (useReducedMotion / <MotionConfig reducedMotion=\"user\">)");
  }
}
if (design.length) additionalContext("PostToolUse", `Design-system flags in ${rel} (see DESIGN.md):\n${design.map((d) => `  - ${d}`).join("\n")}`);
process.exit(0);
