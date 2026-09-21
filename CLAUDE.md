# Dhruv — personal portfolio

Git root is this folder; the app lives in **`dhruv-portfolio/`** (Next.js 16, React 19, Tailwind v4, TypeScript strict).
Remote: `Dhruv-413/Dhruv`. Active branch: `redesign` (main = live site, deployed on Vercel). Detailed app guidance is in
`dhruv-portfolio/CLAUDE.md` and loads automatically when you touch files there.

## Commands (run from `dhruv-portfolio/`, or use `npm --prefix dhruv-portfolio ...`)
- `npm run dev` — dev server (http://localhost:3000)
- `npm run lint` — ESLint (baseline: 0 errors)
- `node node_modules/typescript/bin/tsc --noEmit` — type check (baseline: 0 errors, ~30s cold)
- `npm run build` — production build; run before declaring UI work done
- There is **no test suite**. Verification = lint + tsc + build + browser check (`/verify` skill).

## Project automation (`.claude/`)
- **Hooks**: `.env*` guard (Read/Write/Edit/Bash); after every edit a design-system check (instant) and an ESLint run in the background (`asyncRewake` — it can
  interrupt mid-task with "Stop hook blocking error"; if a related edit is still coming, finish it first); `git commit` runs tsc + eslint (blocking, fail-closed).
- **Project plugin overrides** (`.claude/settings.json`): postman, prisma, pyright-lsp, gopls-lsp, microsoft-docs are disabled here (irrelevant to this app, and they add hundreds of
  tool definitions). Delete those lines to re-enable them.
- **Skills** (user-invoked): `/verify`, `/design-review <route>`, `/perf-audit`, `/update-content`. `design-stack` guides which design skill to use.
- **Subagents**: `design-critic`, `a11y-motion-reviewer`, `perf-auditor`, `route-security-reviewer`.
- **MCP** (`.mcp.json`, need one-time approval via `/mcp`): `next-devtools`, `shadcn`, `vercel` (OAuth). Playwright + Chrome DevTools come from global plugins.

## Rules
- **Scope: don't change app source unless the user explicitly says to build/implement it.** "Decide", "research", "find inspiration", "set up Claude Code" = config and docs only
  (`.claude/`, `CLAUDE.md`, `DESIGN.md`, `docs/`). If a request could mean either, ask one short question first.
- Never read or edit real `.env*` files (only `.env.example`). Never print `GITHUB_TOKEN` or EmailJS keys.
- Ask before `git push`, adding dependencies, or running `shadcn add`. No `git push --force`, `reset --hard`.
- Design work: read `dhruv-portfolio/DESIGN.md` first — it is the design contract (direction **decided**: INK / BONE "Signal"; implementation not started). Use the `design-stack` skill to pick tools.
  Inspiration research: Mobbin is paywalled; use Exa on Behance / Codrops / Awwwards. Playwright screenshots must be saved under `.playwright-mcp/` (gitignored).
- Do not add a dependency for something CSS, the platform, or an existing dep already does. This is a portfolio: bundle size and Core Web Vitals are part of the design.
- Prefer the smallest change that solves the task; don't refactor unrelated files.

## Repo quirks (known, not yet fixed — surface them, don't silently fix)
- Root `.gitignore` is a multi-language (Go-flavoured) template: it still ignores `.github` (line 5), so a CI workflow can't be committed until that line is changed. (`package-lock.json` is now tracked — commit `9b6b85c`.)
- `src/lib/utils.ts` + `src/lib/utils/`, and `src/lib/schema.ts` + `src/lib/schema/`, exist side by side — check which file an import resolves to.
- The shell is Git Bash/PowerShell on Windows: use forward slashes and absolute paths; working directory can drift between calls.
