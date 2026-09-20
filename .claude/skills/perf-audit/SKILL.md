---
name: perf-audit
description: Measure portfolio performance against budgets — production build weight per route, Lighthouse mobile scores, LCP/CLS/TBT, and the heaviest dependencies — using the perf-auditor subagent. Use before shipping or after adding animation, WebGL, fonts, or dependencies.
disable-model-invocation: true
context: fork
agent: perf-auditor
argument-hint: "[route | all, default all]"
---

Audit performance for `$ARGUMENTS` (empty or `all` = every route: `/`, `/projects`, `/skills`, `/career`, `/github`, `/contact`).
Follow your procedure: production build first, benchmark the production server (never `next dev`), Lighthouse mobile via the Chrome DevTools MCP,
a trace for `/` and `/github`, then a static diagnosis of what the numbers point at. Compare with the budgets in your instructions and
return the route × metric table, the top causes ranked by measured impact, the smallest fix for each, and what you could not measure.
Do not edit any file.
