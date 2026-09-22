# 00 — Current state (verified inventory)

Written 22 Sep 2026 after the independent review (`08-REVIEW-2026-09-22.md`) found that v1 of this plan asked to build things that already exist. Every row below was checked against the code at HEAD `afc9d16` (live site = `main` after merging PR #14) or against the live site with `curl`. **Rule for every later section: an item that already exists becomes a *verify* task, not a *build* task.**

Evidence labels used throughout this plan:

- **CODE**: seen in the source, with a file:line reference
- **LIVE**: seen in production output
- **MEASURED**: a number from a tool run whose raw output is kept
- **PRIMARY**: quoted from the official source
- **OWNER**: stated by Dhruv
- **HYPOTHESIS**: judgement that still needs testing

## Already built (verify, don't rebuild)

| Area | What exists | Evidence |
| --- | --- | --- |
| Contact form | `idle/sending/sent/failed` states, receipt, error notice, `mailto` fallback, direct email on page | CODE `features/contact/ContactForm.tsx:198,226,231` |
| Contact validation | Invalid submit shows an error summary and moves focus to it | LIVE (review spot check) |
| Analytics | `<Analytics/>` + `<SpeedInsights/>` rendered | CODE `app/layout.tsx:161-162` |
| Named analytics events | **None**: no `track()` calls anywhere | CODE (grep, 0 hits) |
| Certification proof | All 6 certifications link to Coursera accomplishment/verify pages | CODE `data/certifications.json` |
| JSON-LD | Person, WebSite, ProfilePage, BreadcrumbList, ContactPage, ItemList, SoftwareApplication, Occupation and others | CODE `lib/schema*`, `app/page.tsx:58-69` |
| OG images | 7 routes export `alt`, `1200×630`, `image/png` | CODE `app/**/opengraph-image.tsx` |
| Sitemap / robots | Built-in `sitemap.ts` / `robots.ts` exist | CODE |
| Variable typography | Role classes with `clamp()` and `wdth`/`opsz` axes | CODE `app/globals.css:201,210,219,919`, `layout.tsx` (Bricolage, JetBrains Mono, Instrument Serif) |
| Live regions | Polite status regions on GitHub ledger, Career track, Skills bento (the page-skeleton one went with the `loading.tsx` files in Stage 3) | CODE `GitHubLedger.tsx:119`, `CareerTrack.tsx:522`, `SkillsBento.tsx:202` |
| Keyboard timelines | Native `input[type=range]` with `aria-valuetext` | CODE `CareerTrack.tsx:238-244`, `GitHubLedger.tsx:301-306`, `AzureFigure.tsx:124-130`. LIVE: ArrowRight moved 35→36 |
| WebGL safeguards | Weak-device check (cores/memory ≤4), DPR cap `min(dpr,1.5)×quality`, context-loss handler, IntersectionObserver pause, hidden-tab pause; canvas fallback caps DPR at 2 | CODE `VoxelPortrait.tsx:247-248,352,531,597,616`; `PixelPortrait.tsx:72,192,205` |
| WebGL deferral | `next/dynamic({ssr:false})`, armed on idle/touch/timeout | CODE `PortraitStage.tsx:15-25` |
| Projects layout | Editorial list with adjacent project art, **not** a bento wall | LIVE (review) |
| Mobile menu | Closes on Escape | LIVE (review) |

## Genuinely missing

| Item | Evidence |
| --- | --- |
| Correct production origin: **live site emits `http://localhost:3000`** in canonical, `og:url`, `og:image`, robots `Host`/`Sitemap`, every sitemap `<loc>` | LIVE `curl https://dhruvgupta.co` (22 Sep). **Fixed on `redesign`, not yet deployed**: see *Stage 0 log* below |
| Guard that stops a production build from publishing localhost | **Added on `redesign`** (`next.config.ts`), not yet deployed |
| `SITE_CONFIG.title` still says "Full Stack Developer & AI/ML Engineer" | **Fixed in Stage 1** (see *Stage 1 log*) |
| Work/proof on the homepage: home is only `Hero → Ticker → About` | CODE `app/page.tsx:71-73` |
| HTML `/resume` route, privacy notice page | CODE (`src/app` has neither) |
| Named analytics events | CODE; **also needs Vercel Pro**, since custom events are not on Hobby (PRIMARY, see `evidence/claims-verified.md`) |
| Real artifacts in case studies | OWNER: none shareable. Use clearly labelled reconstructions |

## Facts that change earlier assumptions

- **Old alias `dhruvgupta-nu.vercel.app` is behind Vercel SSO** (302 to vercel.com/sso-api). It is not a public duplicate. v1's claim was wrong. (LIVE)
- **Portrait asset:** `public/images/portrait.png` is 1,285,175 B, 1024×1024 RGB, continuous tone (~79k colours; not pixel art). Both effects downsample it to **64×64** before use (CODE `VoxelPortrait.tsx:24,547`, `PixelPortrait.tsx:168`). The static frame renders at ~697 CSS px wide on a 1536 px viewport (review). Test encodes (MEASURED, sharp): 768 px WebP q82 = **45,676 B** with no visible change at display size. A 64-grid version visibly destroys the face; 128-grid is passable but changes the look. Comparison image: `.playwright-mcp/` (gitignored, see `evidence/`).
- **`removeConsole`** strips `console.log` in production (CODE `next.config.ts:44`), so a console easter egg would need a compiler change. Deferred.
- **Stale docs:** the app `CLAUDE.md` and `.claude/rules/design-system.md` still describe Inter fonts, framer-motion variants in `src/lib/animations.ts` (file does not exist), TanStack Query, zustand, recharts. Seven packages have **0 imports** but remain in `package.json`: framer-motion, recharts, react-icons, @icons-pack/react-simple-icons, date-fns, @tanstack/react-query, zustand (CODE grep). They cost install weight and misdirect future work, not shipped bytes.

## Owner decisions recorded (22 Sep 2026)

| Decision | Answer |
| --- | --- |
| Award objective | Pursue **SOTD**; Honorable Mention is a milestone |
| Signature story anchor | **MUJ Placement Portal** |
| MUJ metrics ("100+ active users", "80% less manual data entry") | **Rough estimates**. Soften wording and label them as estimates |
| Shareable artifacts | **None**. Use labelled reconstructions |
| Real data problems in the portal | Messy/inconsistent fields, duplicate student records, bulk upload/import errors |
| Why the Jan 2026 rebuild | Weak design/UX, code hard to maintain, TnP needed new features |
| Dhruv's own frontend work | Staff dashboards & tables, student-facing pages, role-based views / auth UI (**not** the upload screens) |
| Handover | Walkthrough sessions; juniors built parts with them; otherwise repo + access |

## Stage 0 log (22 Sep 2026, on `redesign`, uncommitted)

| Change | Where | Verified (MEASURED, local `next build --webpack` + `next start`) |
| --- | --- | --- |
| Origin resolves from `NEXT_PUBLIC_SITE_URL`, normalised with `new URL().origin`; production falls back to `https://dhruvgupta.co`, never localhost | `lib/constants.ts` | With a trailing-slash value: 0 `localhost:3000` hits on `/`, `/projects`, a project page, `/career`, `/github`, `/contact`, `/skills`, `robots.txt`, `sitemap.xml`; canonical, `og:url`, `og:image`, robots `Host`/`Sitemap`, sitemap `<loc>` all `https://dhruvgupta.co` |
| Build guard: a Vercel production build (`VERCEL_ENV=production`) fails unless the origin is exactly `https://dhruvgupta.co` | `next.config.ts` | `NEXT_PUBLIC_SITE_URL=http://localhost:3000` → build exits 1 with a message naming the fix. Variable unset (Vercel's likely state) → build passes and every output uses the real domain |
| Static portrait: 1024 px WebP q85 (69,734 B) replaces the 1,285,175 B PNG; same intrinsic size, so the same `pixelated` downscale | `public/images/portrait.webp`, `PortraitStage.tsx` | Rendered at 698 px (1536 viewport, device scale): mean abs diff 1.53/255, PSNR 40.8 dB, 0.005% of channels differ by > 24. Side-by-side in `.playwright-mcp/evidence/stage0-portrait-side-by-side.png` |
| Effects (WebGL + canvas) read a 64 px truecolor PNG (11,496 B) instead of the master | `public/images/portrait-64.png` | Chrome's `drawImage(1024→64)` with smoothing off reads pixel 16i+7 (measured); the file is sampled there → **0 differing channels** vs the old input in Chrome (Firefox/Safari may sample a neighbouring pixel; the input is now the same in every browser) |
| JSON-LD `Person.image` pointed at a nonexistent `/profile-photo.jpg` | `lib/schema/person.ts` | Now `/images/portrait.webp` (200) |
| `.env.example` origin | `.env.example` | `https://dhruvgupta.co` |

Homepage portrait requests: 1,285,839 B → **~82 KB** (WebP + 64 px PNG). The master `portrait.png` stays in `public/` as the source but is no longer requested. Unchanged on purpose: the fade (`transition-opacity`, cause of the render delay still unproven) and `SITE_CONFIG.title` (waits for the positioning sign-off, Stage 1).

**Still open to close Stage 0:** deploy to `main`, then re-curl production and re-run the PSI protocol (`04-performance.md`) for the before/after, and resubmit the sitemap in Search Console. If Vercel holds a wrong `NEXT_PUBLIC_SITE_URL`, the next production deploy will fail loudly by design: fix or delete the variable.

## Stage 1 log (23 Sep 2026, on `redesign`, uncommitted)

**Owner decisions** (all OWNER; also in memory `career-facts-owner-stated`):

- **Positioning:** "I move data from old systems to new ones, without losing what matters."
  - First approved as "…from where it is to where it's needed…".
  - Changed after both simulated readers found it too abstract on the first screen.
- **Role label:** Software & Data Engineer.
- **MUJ credits:**
  - Friend: backend, API, database and bulk importer.
  - Dhruv: staff dashboards and tables, student profile pages, role-based views and sign-in.
  - Juniors: parts of the rebuild; they run it now.
- **Who logs in:** only staff and admins (the placement team, HODs and senior staff). Students never log in.
- **Users:** roughly 80–100 (estimate). Sanity-checked against MUJ's directorate page (~12 staff) and 40+ departments.
- **Uptime:** never measured, so removed.
- **Manual entry:** now "Mostly gone" (estimate).
- **Hindsight:** check data at import, write docs while building, add tests.
- **Flagship 2:** Crave Connect.

| Change | Where |
| --- | --- |
| One positioning source: `role`, `statement`, `title`, `description`, `jobTitle`, keywords | `lib/constants.ts`; `app/page.tsx` now reads it instead of duplicating strings; contact title |
| Hero line, with the accent on "what matters" | `HeroSection.tsx` |
| MUJ case study rewritten: outcome-first intro, 8 chapters covering the four beats (constraint: intranet and three months; rejected alternative: patch vs rebuild; limitation: "Next time"; artifact: below) | `data/projects.json` |
| Estimate labels on metrics (`estimate?: boolean`, visible text "Estimate") | `types/project.ts`, `projects/[id]/page.tsx` |
| "Who built what" credits table (`credits?`, real `<table>` with caption and `th scope`) | same |
| Reconstruction: redrawn staff screen with sample rows, visible "Reconstruction, not a screenshot. Sample data" caption, one `role="img"` with an equivalent name, and a key for CGPA, backlogs and eligible | `components/features/projects/PlacementDashboardSketch.tsx` |
| Removed: "99.9% uptime", "100+ active", "80% less", "real-time updates", and the JWT code snippet (it was the friend's backend) | `data/projects.json` |
| Interaction script: every string, state and ARIA rule, plus the five-viewer test script | `stage-1/interaction-script.md` |

**Verified:** tsc, lint and a webpack production build (with `VERCEL_ENV=production` and the site URL unset) all pass. The rendered `<title>`, meta description, `jobTitle` and OG image are correct. Screenshots are in `.playwright-mcp/evidence/stage1-*`:

- The hero at 390×844 shows the name, line and all three CTAs above the fold.
- At 1536×674 the line and CTAs sit below the fold, **unchanged from before**. This is the Stage 2 first-screen task.
- The MUJ page was checked in both themes.

**Reader check: SIMULATED, not evidence.** Two persona agents read the text: a non-technical recruiter, and a non-tech reader from outside India. Both:

- could say what Dhruv built and what he didn't;
- trusted the credits split;
- found the original hero line abstract;
- stumbled on jargon.

Fixes applied:

- the concrete hero line;
- "placement office" defined; the "TnP" acronym dropped;
- "role-based views" spelled out;
- the first version restored, so the dates read clearly;
- a key under the figure.

Still flagged by them: the tech list (React.js, JWT…) is opaque to non-engineers, and two "Estimate" labels feel soft. Both are accepted as honest.

**Stage 1 "done when" is not met until 1–2 real people** (at least one non-engineer) read the MUJ page and can say what Dhruv does, what he built and why it mattered.

**Flagged for Stage 2 (concept, not copy):** the simulated recruiter asked "which is he?". The hero says *I move data* (the Deloitte job), but the flagship shows him building the *screens*, while the friend built the import. Stage 2's first screen and the interaction framing must bridge this: the staff screens are where moved data becomes usable. Don't reopen the positioning line for it.

**Owner follow-ups:**

- Update the resume PDF and LinkedIn headline to the new positioning.
- Confirm whether records had a unique ID (for the interaction's "technical version").
- The About line ("Weekdays, I move data from old systems to new ones…") now echoes the hero line one scroll later: keep it, or reword?
- Eye Gaze claims ("80%+ accuracy", "5.3°") haven't been re-confirmed yet.

## Stage 2 log (23 Sep 2026, on `redesign`, uncommitted)

| Change | Where | Verified (production `next build --webpack` + `next start`) |
| --- | --- | --- |
| First screen: display name capped by height (`min(18vw, 21svh)`); portrait capped at `100svh - 13rem` | `globals.css` `.t-display`, `HeroSection.tsx` | Name, line and Work/Resume/Contact end above the fold at 1536×674 (648 px; was 888), 1366×768, 1440×900, 1920×1080, 768×1024 and 390×844 |
| **[03] Try it**: static three-panel demo (records → choice → staff table, trade-off and ledger) plus the "technical version" disclosure. Native radios; CSS `:has()` shows the chosen outcome; zero JS | `features/arrives/WhatArrives.tsx`, `.arrives` rules in `globals.css`, `lib/placement-sample.ts` | Works with JS **off** (radio → outcome, `<details>` opens). Without `:has()` all outcomes show, each labelled. 64 px targets; no overflow at 390 |
| **[04] Selected work**: flagship doorway (title, facts and credits from `projects.json`; bridge line: "the records moved… I built the screens where its staff use them") | `features/projects/FlagshipDoorway.tsx` | Links come after the figure on phones |
| Projects/Contact nav moved to the end (identity → premise → try → proof → action) | `features/about/ContinueNav.tsx` | — |
| One sample dataset for the demo and the case-page sketch; invented "Eligible" column dropped | `lib/placement-sample.ts`, `PlacementDashboardSketch.tsx` | — |
| `app/loading.tsx` removed | — | Its Suspense boundary shipped `/` inside `<div hidden id="S:0">`, so the page was **blank with JS off**. The live site does the same on every route |

**Reviews:**

- **a11y-motion-reviewer.** Fixed:
  - primary-on-tint marks failed contrast; they're now solid accent chips;
  - the sketch's `aria-label` was shortened and its doubled period fixed;
  - `summary` gets the site focus ring.

  Confirmed fine: heading order, table semantics, the `:has()` and fallback logic, radio semantics, targets.
- **design-critic.** Fixed:
  - panel titles are H3 size, not t-h2;
  - accent limited to the mismatch, the outcome marks and the chosen row;
  - radios stacked at `lg`;
  - the constant "Sent" column dropped;
  - the doorway's CTA order on phones;
  - the serif accent dropped from the demo title.

  Not applied:
  - the MUJ figure's accent: it is the existing `PlacementArt`, the same as on the case page;
  - the one-line name at short heights: it would collide with the portrait column. Stage 3.

**Measured:**

- Home JS ≈ 734 KB uncompressed. The only new client chunk is `PlacementArt` (13 KB); the demo and doorway are server components.
- LCP element at 1440×900 is the portrait `<img>`, as in the production baseline; DESIGN.md wants the name. Stage 3/4.

**Found, not fixed** (surface to owner):

1. Every other route's `loading.tsx` also hides its prerendered HTML without JS (same `S:0` wrapper; the live site does this too).
2. `next.config.ts` sets `Cache-Control: immutable` on `/_next/static/*` in **dev** too. Next warns this breaks dev: stale chunks, and new Tailwind classes not appearing. Scope it to production.

**Gate:** not yet run. The test sheet is `stage-2/viewer-test-sheet.md`. The owner is turning off Vercel preview protection so testers can open a preview URL.
