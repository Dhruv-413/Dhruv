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
| Live regions | Polite status regions on GitHub ledger, Career track, Skills bento, page skeleton | CODE `GitHubLedger.tsx:119`, `CareerTrack.tsx:522`, `SkillsBento.tsx:202`, `PageSkeleton.tsx:7` |
| Keyboard timelines | Native `input[type=range]` with `aria-valuetext` | CODE `CareerTrack.tsx:238-244`, `GitHubLedger.tsx:301-306`, `AzureFigure.tsx:124-130`. LIVE: ArrowRight moved 35→36 |
| WebGL safeguards | Weak-device check (cores/memory ≤4), DPR cap `min(dpr,1.5)×quality`, context-loss handler, IntersectionObserver pause, hidden-tab pause; canvas fallback caps DPR at 2 | CODE `VoxelPortrait.tsx:247-248,352,531,597,616`; `PixelPortrait.tsx:72,192,205` |
| WebGL deferral | `next/dynamic({ssr:false})`, armed on idle/touch/timeout | CODE `PortraitStage.tsx:15-25` |
| Projects layout | Editorial list with adjacent project art, **not** a bento wall | LIVE (review) |
| Mobile menu | Closes on Escape | LIVE (review) |

## Genuinely missing

| Item | Evidence |
| --- | --- |
| Correct production origin: **live site emits `http://localhost:3000`** in canonical, `og:url`, `og:image`, robots `Host`/`Sitemap`, every sitemap `<loc>` | LIVE `curl https://dhruvgupta.co` (22 Sep). Fallback at CODE `lib/constants.ts:2` |
| Guard that stops a production build from publishing localhost | CODE (no check exists) |
| `SITE_CONFIG.title` still says "Full Stack Developer & AI/ML Engineer" | CODE `lib/constants.ts:6` |
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
