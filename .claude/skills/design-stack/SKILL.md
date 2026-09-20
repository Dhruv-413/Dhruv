---
name: design-stack
description: Routing guide for visual design work on this portfolio — which of the many installed design skills, MCPs and agents to use, in what order, and how to avoid stacking conflicting aesthetic skills. Use when starting any UI/visual task, redesign, new section, animation/WebGL idea, or "make it look better/more unique".
---

This project has many overlapping design skills installed globally. They contradict each other if stacked (`gpt-taste` mandates GSAP and
bento grids; `minimalist-ui` bans gradients and shadows; `industrial-brutalist-ui` demands terminal rawness). **Pick ONE direction skill per task.**

## Scope gate (read first)
Only change app source (`dhruv-portfolio/src`, `public`, `next.config.ts`) when the user has explicitly asked to **build/implement**. Requests to "decide", "research",
"find inspiration" or "set up" mean docs/config (`DESIGN.md`, `docs/`, `.claude/`) only. When unsure, ask one short question.

## Pipeline (do not skip step 1)
1. **Contract** — read `dhruv-portfolio/DESIGN.md`. The direction is **decided** (INK / BONE "Signal", 2026-09-20; values in §4). Follow it; change it only by logging a new
   decision in §5. If a section is still TBD, propose concrete values (not options) and record them there.
2. **Audit** (existing pages) — `redesign-existing-projects` (audit-first), plus `web-design-guidelines` for UX/a11y compliance.
3. **References** — Mobbin is **paywalled** (returns "requires a paid plan") — do not retry it. Use the Exa MCP (`web_search_exa` / `web_fetch_exa`) against Behance,
   Codrops case studies, Awwwards and CSS Design Awards; the Figma MCP only if the user supplies a Figma file. Study 5–8 references and extract the *principle*, don't copy layouts.
   Behance/Awwwards pages are JS-heavy: prefer the Exa summaries or the Codrops write-ups (they explain grid, type, motion decisions) over screenshots.
4. **Direction skill (choose one)**
   - `frontend-design` (Anthropic) — safe, well-rounded default for distinctive UI.
   - `design-taste-frontend` — anti-slop; built for portfolios/landing pages; audit-first on redesigns.
   - `high-end-visual-design` — "expensive agency" polish: type, spacing, shadow, card systems.
   - `minimalist-ui` — editorial, warm monochrome. `industrial-brutalist-ui` — Swiss print × terminal (fits a dev portfolio's hacker identity).
   - `gpt-taste` — heavy GSAP/ScrollTrigger motion. Only if the user opts into adding GSAP (a new dependency — ask first).
5. **Tokens** — `ui-theme-designer` / `ui-ux-pro-max` for palette, type pairing and scale; write results into `globals.css` tokens (dark + light) and `DESIGN.md`.
6. **Build** — shadcn MCP for primitives, `next-devtools` MCP for runtime errors, `vercel-react-best-practices` for perf-safe React,
   `vercel-react-view-transitions` for route/element transitions, `modern-web-guidance` for platform features that replace libraries.
7. **Critique loop** — `/design-review <route>` → fix the top items → repeat until no category scores below 4. Then `a11y-motion-reviewer`, `/perf-audit`, `/verify`.

## Project guardrails (override any skill that disagrees)
- Performance is part of the design: any WebGL/canvas/3D must be lazy-loaded (`next/dynamic`, `ssr: false`), budgeted (state its KB cost), pause off-screen,
  and fall back to a static image under `prefers-reduced-motion`, low-power/mobile, or when WebGL is unavailable.
- Keep both themes first-class. Tokens only — no hex/rgb in components. Fonts: if a skill bans Inter, that is a `DESIGN.md` decision to make once, then
  change `layout.tsx` and the `--font-geist-*` variable mapping together.
- New dependency = ask first, with bundle-size cost. Prefer CSS (`@property`, scroll-driven animations, view transitions) over libraries when adequate.
- `imagegen-frontend-*` / `image-to-code` skills are written for Codex image generation and may not work in Claude Code — check before relying on them.
- Never fabricate content (projects, metrics, testimonials). Placeholder copy must be visibly marked and reported.
