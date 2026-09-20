---
name: verify
description: Verify the portfolio end to end — ESLint, TypeScript, production build, and a browser smoke test of every route (console errors, failed requests, both themes). Run before declaring UI or code work done.
disable-model-invocation: true
argument-hint: "[--quick]"
allowed-tools: Bash(npm run lint*) Bash(npm run build*) Bash(node node_modules/typescript/bin/tsc*) Bash(curl*) Bash(git status*) Bash(git diff*)
---

Verify the app in `dhruv-portfolio/` (the git root is one level up). There is no test suite, so this IS the test suite. Report facts only —
paste the actual output for anything that fails, and say explicitly what you did not run.

Arguments: `$ARGUMENTS` — with `--quick`, skip step 3 (build) and step 4 (browser).

1. **Lint**: `npm run lint` in `dhruv-portfolio/`. Baseline is 0 errors, 1 warning — anything new is a regression.
2. **Types**: `node node_modules/typescript/bin/tsc --noEmit` in `dhruv-portfolio/`. Baseline 0 errors (≈30 s cold).
3. **Build**: `npm run build`. Report failures verbatim, plus the route table (size / First Load JS). Flag any route that grew noticeably.
4. **Browser smoke** (Playwright MCP, else Chrome DevTools MCP): make sure a server is up (`curl -sI http://localhost:3000`; if not, start
   `npm run start` from the fresh build in the background and stop it afterwards). For `/`, `/projects`, `/skills`, `/career`, `/github`, `/contact`
   and a bogus URL (404 page): load it, then check the console for errors/warnings, failed network requests, and that the page renders content.
   Do it once in dark and once in light (`localStorage.theme`). At 375 px width confirm no horizontal scroll.
   (Playwright MCP screenshots must be saved under the project root or `<git root>/.playwright-mcp/`.)
5. **Summary table**: check → pass/fail → evidence. End with one line: "Safe to commit" or the exact blockers. Do not commit or push.
