---
name: design-review
description: Run a screenshot-based design critique of one route (4 widths × dark/light) with the design-critic subagent and get ranked, concrete fixes. Use after visual changes or before calling a page done.
disable-model-invocation: true
context: fork
agent: design-critic
argument-hint: "[route, default /]"
---

Review the portfolio route `$ARGUMENTS` (if empty, review `/`). Follow your procedure exactly: read `dhruv-portfolio/DESIGN.md`, screenshot at
375 / 768 / 1280 / 1920 px in both themes, judge what you see against the rubric, and return the verdict, score table, top-5 ranked fixes with
`file:line`, up to three signature-moment opportunities, and what is already strong.

If `DESIGN.md` still says the direction is undecided, say so first and judge against general craft and distinctiveness only.
Do not edit any file.
