# Design & feature roadmap (research output — nothing here is implemented yet)

Scope of this document: what to build after the Claude Code setup, ranked by impact ÷ cost, tied to what the repo already has.
Every item lists its dependency/bundle cost, because performance is part of the design (`DESIGN.md` §2).

## 0. Bugs / gaps to fix first (verified in code)
| # | Issue | Evidence | Fix |
|---|-------|----------|-----|
| 1 | **Done (slice 0, 2026-09-20)** Social share previews are broken | `lib/constants.ts` → `/og-image.jpg`, `/twitter-image.jpg`; neither exists in `public/` | Generate per-route OG images with `app/opengraph-image.tsx` (`ImageResponse`), delete the dead paths |
| 2 | **Partly done (slice 0: `MotionConfig` global default added; per-component loops still open)** Reduced motion is patchy | 49 files import framer-motion, 5 mention reduced motion | Wrap the app in `<MotionConfig reducedMotion="user">` (one line in `Providers.tsx`), then audit with `a11y-motion-reviewer` |
| 3 | `.github` is gitignored, so CI can't be committed (the lockfile ignore was already removed in `9b6b85c`) | root `.gitignore` line 5 | Remove that line; add a CI workflow (lint + tsc + build) at repo root with `working-directory: dhruv-portfolio` |
| 4 | Non-descriptive font variable names | `layout.tsx` maps Inter → `--font-geist-sans` | Rename when fonts are decided (touch `layout.tsx` + `@theme inline` together) |

## 1. Signature features (ranked)
Ranking key: **Wow** (memorability) · **Fit** (with identity: terminal + real GitHub data + AI/ML engineer) · **Cost** (bundle/effort) · **Risk**.

| Rank | Feature | Wow | Fit | Cost | Risk / notes |
|------|---------|-----|-----|------|--------------|
| 1 | **Data-driven hero**: contribution calendar (already fetched by `/api/github`) rendered as a generative field/terrain that reacts to the cursor; today's activity sets its intensity | ★★★★★ | ★★★★★ | ~0 deps (canvas 2D or SVG; WebGL only if budget allows) | Must lazy-load, pause off-screen, static SSR fallback; the GitHub payload is client-fetched today, so SSR the calendar or cache it |
| 2 | **Scroll-driven storytelling + View Transitions**: CSS `animation-timeline: view()` for reveals; `<ViewTransition>` for project card → detail morph and route changes | ★★★★ | ★★★★ | Removes JS (can shrink framer-motion use) | Progressive enhancement (Firefox polyfill/fallback). `vercel-react-view-transitions` skill is already installed. Research says native CSS now covers most of what GSAP/Framer are used for; physics/gesture effects still need a library |
| 3 | **Project case-study pages** `/projects/[id]`: problem → decision → result, real metrics, architecture diagram, per-project OG image | ★★★★ | ★★★★★ | Static params from `projects.json`; MDX optional | Needs real content from the user (no invented metrics). Recruiters read case studies, not card grids |
| 4 | **Command console (⌘K)** that matches the terminal identity: navigate, filter projects by tech, toggle theme, copy email, `git log` of the real latest commits | ★★★ | ★★★★ | shadcn `command` (cmdk, ~4 kB) | Common on portfolios now; avoid a full VS Code clone (trope). Make the commands *real* and specific to the data |
| 5 | **Interactive architecture diagrams** for flagship projects (e.g. Crave Connect pgvector semantic search) as animated SVG data-flow | ★★★★ | ★★★★★ | Inline SVG + CSS | Shows engineering depth better than screenshots |
| 6 | **Live "now" strip**: latest commit, repo being worked on, last deploy | ★★★ | ★★★★ | Reuses `/api/github` | Server-render + revalidate; must degrade gracefully when the API is rate-limited |
| 7 | **Ask-my-portfolio assistant** (retrieval over `projects/timeline/skills` JSON) | ★★★★★ | ★★★★ for an AI/ML engineer | Vercel AI SDK + Anthropic API key | **Cost & abuse risk**: needs a spending cap, strict rate limiting, prompt-injection-safe grounding, and a visible "AI" label. Do last, only if you want it |
| 8 | **Theme = "rice"**: accent-hue slider + a few named palettes, persisted; trivial because tokens are `oklch` | ★★★ | ★★★★ | ~0 | Every palette must pass contrast in dark + light |
| 9 | **Resume from data**: `/resume` route + print stylesheet generated from the JSON (single source of truth) | ★★ | ★★★ | 0 | Functional value; ATS-friendly text. `public/Dhruv_resume.pdf` is currently a separate manual artifact |
| 10 | **`/llms.txt` + richer JSON-LD** | ★ | ★★★ | 0 | Cheap discoverability win; JSON-LD builders already exist in `lib/schema/` |
| 11 | **Writing (MDX notes)** with RSS | ★★ | ★★★ | `@next/mdx` | Only if you'll actually maintain it |

**Suggested first slice after setup:** fix §0.1–0.3 → decide the direction in `DESIGN.md` → build #1 (hero) with #2 (transitions) → #3 for 2 flagship projects.

## 2. Tooling map (what to use for each kind of work)
| Need | Use | Already available? |
|------|-----|--------------------|
| Decide direction, avoid generic output | `design-stack` skill → one of `frontend-design`, `design-taste-frontend`, `high-end-visual-design`, `industrial-brutalist-ui`, `minimalist-ui` | Yes (global) |
| Audit the existing pages | `redesign-existing-projects`, `web-design-guidelines`, `/design-review` | Yes |
| Real-world references | Exa MCP → Behance / Codrops / Awwwards write-ups; Figma MCP if a Figma file is supplied. (Mobbin connector exists but **requires a paid plan** — unusable.) | Yes (claude.ai connectors) |
| Component primitives | shadcn MCP (`.mcp.json`) | Added — needs one-time approval |
| Runtime errors / routes / logs | `next-devtools` MCP (Next 16) | Added — needs one-time approval |
| Screenshots, Lighthouse, traces | Playwright MCP, Chrome DevTools MCP | Yes (global plugins) |
| Deploy status / build logs | Vercel MCP (OAuth) | Added — needs one-time approval + login |
| GSAP-grade scroll/timeline work | `greensock/gsap-skills` (official) | **Not installed** — only worth it if you adopt GSAP (new dependency) |
| Generated UI components from prompts | 21st.dev Magic MCP | **Not installed** — needs an API key and a paid tier beyond the free limit |

## Sources
- [Scroll-driven animations & View Transitions replacing JS animation libraries (2026)](https://mintec.co/blog/scroll-driven-view-transitions-css-2026/)
- [Josh Comeau — Scroll-Driven Animations](https://www.joshwcomeau.com/animation/scroll-driven-animations/)
- [Codrops — WebGL for Designers (Mar 2026)](https://tympanus.net/codrops/2026/03/04/webgl-for-designers-creating-interactive-shader-driven-graphics-directly-in-the-browser/)
- [Best Three.js portfolio examples (CreativeDevJobs)](https://www.creativedevjobs.com/blog/best-threejs-portfolio-examples-2025)
- [awesome-command-palette](https://github.com/stefanjudis/awesome-command-palette)
- [Anthropic frontend-design plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design)
- [greensock/gsap-skills](https://github.com/greensock/gsap-skills) · [21st.dev Magic MCP](https://github.com/21st-dev/magic-mcp)
- [vercel/next-devtools-mcp](https://github.com/vercel/next-devtools-mcp) · [shadcn MCP docs](https://ui.shadcn.com/docs/mcp) · [Vercel MCP docs](https://vercel.com/docs/agent-resources/vercel-mcp)
