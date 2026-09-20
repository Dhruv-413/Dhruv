// PreToolUse (Bash, only for `git commit *`): quality gate.
// Baseline when this was written: `tsc --noEmit` = 0 errors, `eslint src` = 0 errors. Keep it that way.
// Skips silently when no app files are staged or dependencies are not installed.
import { spawnSync } from "node:child_process";
import { readInput, runNode, hasDeps, eslintJson, formatEslint, deny, ROOT } from "./lib.mjs";

const input = await readInput();
const cmd = String(input.tool_input?.command ?? "");

// `git commit --amend --no-edit` etc. are still commits; only skip pure help/dry-run invocations.
if (/\s(--help|-h|--dry-run)\b/.test(cmd)) process.exit(0);

const staged = spawnSync("git", ["diff", "--cached", "--name-only"], { cwd: ROOT, encoding: "utf8" });
const files = (staged.stdout ?? "").split("\n").filter(Boolean);
// `git commit -a` / `git commit <paths>` may commit unstaged changes too, so be conservative there.
const commitsUnstaged = /\s-[a-zA-Z]*a[a-zA-Z]*\b|\s--all\b/.test(cmd);
const touchesApp = commitsUnstaged || files.some((f) => f.startsWith("dhruv-portfolio/") && /\.(tsx?|css|mjs|json)$/.test(f));
if (!touchesApp || !hasDeps()) process.exit(0);

const problems = [];

const tsc = runNode("typescript/bin/tsc", ["--noEmit", "--pretty", "false"], 240_000);
if (tsc.timedOut) {
  problems.push("tsc --noEmit timed out (240s).");
} else if (tsc.status !== 0) {
  const out = (tsc.stdout || tsc.stderr).split("\n").filter(Boolean);
  problems.push(`TypeScript errors:\n${out.slice(0, 15).map((l) => `  ${l}`).join("\n")}${out.length > 15 ? `\n  ...and ${out.length - 15} more` : ""}`);
}

const { results, timedOut, raw } = eslintJson(["src"], 120_000);
if (results) {
  const lines = formatEslint(results, 15);
  if (lines.length) problems.push(`ESLint errors:\n${lines.map((l) => `  ${l}`).join("\n")}`);
} else if (timedOut) {
  problems.push("eslint timed out (120s).");
} else {
  // ESLint itself failed (crash / config error / non-JSON output). Fail closed and say why — never let a broken gate look like a pass.
  problems.push(`ESLint failed to run (fix the tooling, then retry):\n  ${String(raw ?? "no output").trim().split("\n").slice(0, 6).join("\n  ")}`);
}

if (problems.length) {
  deny(`Commit blocked by the quality gate (fix, then retry):\n\n${problems.join("\n\n")}`);
}
process.exit(0);
