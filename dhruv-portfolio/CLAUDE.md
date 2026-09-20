# dhruv-portfolio (Next.js app)

Stack: Next.js 16 App Router · React 19 + React Compiler (`reactCompiler: true`) · Tailwind v4 (`@theme inline` in
`src/app/globals.css`, no tailwind.config) · shadcn/ui (new-york, `components.json`) · framer-motion 12 · TanStack Query 5 ·
zustand · react-hook-form + zod · EmailJS · recharts · Vercel Analytics/Speed Insights. Path alias: `@/*` → `src/*`.

## Architecture
- `src/app/` — routes: `/` (Hero), `/projects`, `/skills`, `/career`, `/github`, `/contact`, plus `api/github/route.ts`,
  `sitemap.ts`, `robots.ts`. Every route has a `loading.tsx` skeleton and its own `metadata`.
- `src/components/features/<area>/` — page sections (hero, projects, skills, timeline, github, contact, stats).
  `components/ui/` — primitives (shadcn `button/card/input/label/select/textarea` + custom visual pieces such as
  `AnimatedBackground`, `typewriter-effect`, `ThemeToggle`). `components/shared/` — Header, Footer, Providers.
- `src/data/*.json` — **all portfolio content** (projects, skills, timeline, certifications). Edit data, not components, to change content.
- `src/hooks/` — barrel-exported hooks (`useGitHub`, `useEmail`, filters, UI state). `src/lib/` — `constants.ts` (`SITE_CONFIG`),
  `animations.ts` (shared framer-motion variants), `github/` (fetcher + transformers), `schema/` (JSON-LD builders), `utils.ts` (`cn`).
- GitHub data flow: `useGitHubGraphQL` (TanStack Query, 1h stale) → `lib/github/fetcher.ts` → `GET /api/github` (server-only
  `GITHUB_TOKEN`, GraphQL query, per-IP in-memory rate limit) → `lib/github/transformers.ts` → section components.

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
- Types: `src/types/` (`project.ts`, `experience.ts`, `github/*`). Keep JSON shape and types in sync when editing `src/data`.
- With the React Compiler on, don't hand-roll `useMemo`/`useCallback` for perf unless there's a measured reason.

## Gotchas
- `next.config.ts` sets `dangerouslyAllowSVG: true` (for simple-icons); the image CSP sandbox mitigates it — don't loosen it.
- `NEXT_PUBLIC_EMAILJS_*` keys are public by design. `GITHUB_TOKEN` must never reach client code or logs.
- Rate limiter in `api/github` is per-instance in-memory (resets on cold start) — fine for a portfolio, not a security boundary.
- `removeConsole` strips `console.*` (except error/warn) in production builds.
