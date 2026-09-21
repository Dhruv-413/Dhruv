// Shared helpers for project hooks.
// Paths are derived from THIS file's location, not cwd or CLAUDE_PROJECT_DIR,
// because the git root (Dhruv/) is one level above the Next.js app (dhruv-portfolio/)
// and Claude Code may be launched from either.
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { spawnSync } from "node:child_process";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
// CLAUDE_HOOK_APP_DIR lets tests point the hooks at a throwaway fixture app instead of the real one.
export const APP = process.env.CLAUDE_HOOK_APP_DIR ?? path.join(ROOT, "dhruv-portfolio");

export async function readInput() {
  let raw = "";
  for await (const chunk of process.stdin) raw += chunk;
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/** Normalise a tool-supplied path to an absolute, forward-slash path. */
export function norm(p) {
  return path.resolve(ROOT, p).replace(/\\/g, "/");
}

/** Path relative to the app dir (forward slashes), or null when outside the app. */
export function relToApp(p) {
  const rel = path.relative(APP, path.resolve(ROOT, p)).replace(/\\/g, "/");
  return rel.startsWith("..") || path.isAbsolute(rel) ? null : rel;
}

export function hasDeps() {
  return fs.existsSync(path.join(APP, "node_modules", "eslint", "bin", "eslint.js"));
}

/** Run a JS entry point from the app's node_modules with the app as cwd. */
export function runNode(entry, args, timeoutMs) {
  const res = spawnSync(process.execPath, [path.join(APP, "node_modules", entry), ...args], {
    cwd: APP,
    encoding: "utf8",
    timeout: timeoutMs,
    maxBuffer: 16 * 1024 * 1024,
  });
  return { status: res.status, stdout: res.stdout ?? "", stderr: res.stderr ?? "", timedOut: res.error?.code === "ETIMEDOUT" };
}

export function eslintJson(targets, timeoutMs = 60_000) {
  const cache = path.join(APP, "node_modules", ".cache", "claude-hook-eslint");
  const res = runNode("eslint/bin/eslint.js", ["--no-warn-ignored", "--cache", "--cache-location", cache, "-f", "json", ...targets], timeoutMs);
  try {
    return { results: JSON.parse(res.stdout), timedOut: res.timedOut };
  } catch {
    return { results: null, timedOut: res.timedOut, raw: res.stderr || res.stdout };
  }
}

export function formatEslint(results, limit = 20) {
  const lines = [];
  for (const f of results) {
    for (const m of f.messages) {
      if (m.severity < 2) continue; // errors only
      const file = path.relative(APP, f.filePath).replace(/\\/g, "/");
      lines.push(`${file}:${m.line}:${m.column} ${m.message} (${m.ruleId ?? "parse"})`);
    }
  }
  return lines.length > limit ? [...lines.slice(0, limit), `...and ${lines.length - limit} more`] : lines;
}

/** Non-blocking feedback that is added to Claude's context. */
export function additionalContext(event, text) {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: event, additionalContext: text } }));
}

export function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: reason },
    }),
  );
}
