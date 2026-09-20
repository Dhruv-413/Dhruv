// PreToolUse (Write|Edit|MultiEdit|Bash): keep secrets out of the model's hands.
// .env.example / .env.sample / .env.template are allowed; every other .env* file is blocked.
// (permissions.deny in settings.json covers Read; this covers Write/Edit and shell reads.)
import path from "node:path";
import { readInput, deny } from "./lib.mjs";

const SAFE = /^\.env\.(example|sample|template)$/i;
const isSecretEnv = (file) => {
  const base = path.basename(String(file ?? ""));
  return /^\.env(\..+)?$/i.test(base) && !SAFE.test(base);
};

// Shell commands that read/copy/print a real env file. Deliberately narrow to avoid false positives.
const SHELL_READ =
  /\b(cat|type|less|more|head|tail|grep|rg|sed|awk|cp|mv|source|Get-Content|gc|Select-String|node\s+-e)\b[^|;&\n]*?(?:^|[\s/\\"'=])\.env(?:\.[\w.-]+)?(?=$|[\s"'|;&])/i;

// Redirects that write into a real env file: `echo X > .env`, `>> dhruv-portfolio/.env.local`, `tee .env`.
const SHELL_WRITE =
  /(?:>>?|\btee\b(?:\s+-a)?)\s*["']?[^\s"'|;&]*?(?:^|[\s/\\])?\.env(?:\.[\w.-]+)?(?=$|[\s"'|;&])/i;

const input = await readInput();
const tool = input.tool_name;
const ti = input.tool_input ?? {};

let blocked = false;
if (tool === "Bash") {
  const cmd = String(ti.command ?? "");
  // Strip allowed template names first so `cat .env.example` passes.
  const scrubbed = cmd.replace(/\.env\.(example|sample|template)\b/gi, "");
  blocked = SHELL_READ.test(scrubbed) || SHELL_WRITE.test(scrubbed);
} else {
  blocked = isSecretEnv(ti.file_path);
}

if (blocked) {
  deny(
    "Blocked: real .env files hold secrets (GITHUB_TOKEN, EmailJS keys) and are off-limits. " +
      "Edit .env.example for documentation, and ask the user to set real values themselves.",
  );
}
process.exit(0);
