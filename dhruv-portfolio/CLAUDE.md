# dhruv-portfolio (Next.js app)

Stack: Next.js 16 App Router · React 19 + React Compiler (`reactCompiler: true`) · Tailwind v4 (`@theme inline` in
`src/app/globals.css`, no tailwind.config) · shadcn/ui (new-york, `components.json`) · framer-motion 12 · TanStack Query 5 ·
zustand · react-hook-form + zod · EmailJS · recharts · Vercel Analytics/Speed Insights. Path alias: `@/*` → `src/*`.

## Architecture
- `src/app/` — routes: `/` (Hero), `/projects`, `/skills`, `/career`, `/github`, `/contact`, plus `sitemap.ts`, `robots.ts`. (There is no API route: `/github` is server-rendered.) Every route has a `loading.tsx` skeleton and its own `metadata`.
- `src/components/features/<area>/` — page sections (hero, projects, skills, timeline, github, contact, stats).
  `components/ui/` — primitives (shadcn `button/card/input/label/select/textarea` + custom visual pieces such as
  `AnimatedBackground`, `typewriter-effect`, `ThemeToggle`). `components/shared/` — Header, Footer, Providers.
- `src/data/*.json` — **all portfolio content** (projects, skills, timeline, certifications). Edit data, not components, to change content.
- `src/hooks/` — barrel-exported hooks (`useEmail`, filters, UI state). `src/lib/` — `constants.ts` (`SITE_CONFIG`),
  `animations.ts` (shared framer-motion variants), `github/` (GraphQL queries, server loader, privacy-gating model, calendar maths), `schema/` (JSON-LD builders), `utils.ts` (`cn`).
- GitHub data flow: `app/github/page.tsx` (`revalidate = 3600`) → `lib/github/load.ts` (server-only `GITHUB_TOKEN`, two GraphQL requests, never throws:
  returns `null` on a missing token or an outage) → `lib/github/model.ts` (the privacy gate; raw → curated `GitHubData`) → server section
  components, plus one client island (`GitHubLedger`). Client code imports `lib/github/calendar` and `lib/github/types`, never `load`.

## Design system facts (details in `DESIGN.md`)
- Theme: `<html class="dark">` by default; `:root` holds the **dark** tokens and `.light` overrides them. An inline script in
  `layout.tsx` sets the class from `localStorage.theme` before hydration; `ThemeToggle` uses `useSyncExternalStore`.
- Tokens are `oklch()` CSS variables in `globals.css`, exposed to Tailwind through `@theme inline`. Use tokens, never raw hex.
- Fonts: `Inter` and `JetBrains Mono`, but exposed under the **misleading** variable names `--font-geist-sans/-mono`. Changing fonts
  means editing `layout.tsx` and the `--font-sans/--font-mono` mapping together.
- Motion: framer-motion variants live in `src/lib/animations.ts`. Every animation must respect `prefers-reduced-motion`.

## Conventions
- Server Components by default; add `"use client"` only for state/effects/browser APIs (theme, motion, queries, forms).
- Use `cn()` from `@/lib/utils` for class merging; `next/image` (not `<img>`) — remote hosts are whitelisted in `next.config.ts`.
- New shadcn primitives: `npx shadcn@latest add <name>` (asks for approval). Keep `components/ui` imports on the `@/components/ui/*` alias.
- Types: `src/types/` (`project.ts`, `experience.ts`); GitHub types live in `src/lib/github/types.ts`. Keep JSON shape and types in sync when editing `src/data`.
- With the React Compiler on, don't hand-roll `useMemo`/`useCallback` for perf unless there's a measured reason.

## Gotchas
- `next.config.ts` sets `dangerouslyAllowSVG: true` (for simple-icons); the image CSP sandbox mitigates it — don't loosen it.
- `NEXT_PUBLIC_EMAILJS_*` keys are public by design. `GITHUB_TOKEN` must never reach client code or logs.
- `removeConsole` strips `console.*` (except error/warn) in production builds.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
