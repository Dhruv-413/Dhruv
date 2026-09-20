# Design approach: how to ship INK / BONE "Signal"

> Research output, 2026-09-20. **Nothing here is implemented.** No app source, `public/` or config was touched.
> Contract = `DESIGN.md` (values are decided and computed). Feature backlog = `docs/ROADMAP.md`.
> This file answers one question: *given the references and the current site, in what order and to what standard do we build the contract?*

## 0. Skill conflict, resolved once
Four design skills were invoked together (`gpt-taste`, `find-skills`, `design-taste-frontend`, `design-taste-frontend-v1`). They contradict each other and the contract.
Followed: **DESIGN.md + `industrial-brutalist-ui`** (the direction `design-stack` already picked). Not followed, and why:

| Skill mandate | Why it is dropped |
|---|---|
| `gpt-taste`: GSAP + ScrollTrigger everywhere, pinned sections, card stacking | New dependency + main-thread scroll work; DESIGN.md §4.5 uses CSS `animation-timeline: view()` and forbids new deps in slice 1 |
| `gpt-taste`: bento grids, `picsum.photos` stock images, "pill-shaped images inside headings" | DESIGN.md §4.3/4.4 (hairline grid, no card look, radius 0) and "real content only". Stock photos are exactly the slop the redesign removes |
| `gpt-taste`: 3-line Python RNG to pick layout/font | The direction is a decision, not a dice roll |
| `design-taste-frontend` v1: "no Inter, no serif" | Superseded: Inter retires anyway; the contract's single italic serif accent is a logged decision (§4.2) |
| `design-taste-frontend`: bans locale/time strips | Kept out of the *required* set; the hero LocalTime cell is optional, judge it in `/design-review` |

## 1. What the references actually prove
Principles, not layouts. Source quality is marked because half the "awards" content online is SEO marketing.

| Reference | Source quality | Principle we take | Where it lands |
|---|---|---|---|
| **Corentin Bernadou** (Codrops, 5 Mar 2026): Swiss style, orange / white / black, inspired by printed books | Primary write-up by the author | **Independent validation of our direction.** Same idea reached separately: strong graphic system, limited palette, grid rules and a *dev grid overlay* as real UI parts (his `GridHelper`, `GridRules`, `Dimensions`, `Availability`), page data kept in JSON | §4.3 grid + hairlines; grid overlay as a dev-only tool |
| **R-K '26** (Codrops, 7 Apr 2026): "built for presence, not volume" | Primary | **12 columns, and each 100vh section thought of as 6 rows.** A heavy WebGL page-peel transition was thrown away for a clip-path one: "too heavy, too awkward, too easy to overdo". Effects must *support* each other | Grid discipline (§3.2); clip-path transitions (§4.5 already allows `clip-path`) |
| **Arnaud Rocca** (Codrops, 31 Mar 2026) | Primary | **Fallbacks are part of the craft.** Reduced motion swaps the WebGL for a cross-fade; hover effects paired with focus/blur so keyboard users get the same UI; a no-JS static version; tested with a real screen reader, not only tools | Non-negotiables (§3.4) |
| **Mat Voyce** (Awwwards SOTD Jan 2025, case study 24 Feb 2025) | Awwwards + studio write-up | **Type is the interface**: the headline is hero, nav cue and personality. Different content types get different layouts instead of one template | Display name as LCP element; Work index vs case-study layouts |
| **Catalin Vintila**, others (Awwwards Honorable Mentions): pixel-mosaic page transitions, fullscreen pixel menu; RCK: ASCII webcam | Awwwards element pages | The cell / pixel vocabulary is **already established** on award shortlists. So the motif alone is not the differentiator; *tying it to the owner's portrait and real GitHub data* is | Pixel Portrait + heatmap share one cell (§4.6) |
| **Design-engineer sites** (rauno.me, paco.me, emilkowal.ski) | Their own pages | Proof of skill = tiny interactions, precise spacing, writing. Almost no imagery | Small, true interactions (decode text, cell heat) over spectacle |
| **Awwwards scoring** | Awwwards | SOTD weights Design 40 / Usability 30 / Creativity 20 / Content 10. The *Developer Award* separately scores Semantics/SEO, Animations, **Accessibility, WPO, Responsive, Markup**. Our non-negotiables map onto that list, so meeting them is aligned with how developer craft is judged | §3.4 gates |
| Aggregate of 32 developer portfolios (createtoday.io, an affiliate listicle: **base rate only**) | Weak | 53% near-black backgrounds, 53% monochrome, 6% vivid, image-overlay heroes rare (7%) | See risk R1 below |

**What the references do NOT justify for this site:** WebGL fluid/shader heroes (Rocca, R-K, ITom, Minh Pham) all sit on top of photography, portraits or 3D assets we do not have; smooth-scroll libraries; per-project accent colours (Rocca) because DESIGN.md allows exactly one accent; a headless CMS (those sites update weekly, this one edits JSON).

## 2. Where the site stands (evidence)
Live site as rendered (`dhruvgupta-nu.vercel.app`, fetched 2026-09-20):
- Hero copy: "Hi, I'm Dhruv Gupta" / "Full-Stack Developer" / "CS Student @ Manipal University Jaipur | Ex-ONGC Intern".
- Intro: "Building production-ready solutions with modern web technologies, AI/ML, and enterprise software..."
- Stat cards: "9+ Projects", "1 Star", "Available". A "Core Values" block: Goal-Oriented, Creative Problem Solver, Continuous Learner, Team Player. A decorative `developer.ts` code window.
- CTAs: "View My Work", "Download Resume", "Get in Touch".
- `public/` contains no images at all (only `favicon.ico`, two resume PDFs, `manifest.json`, `code-solid-full.svg` and Next/Vercel default SVGs). The five `/images/projects/*.jpg` paths in `projects.json` are **never rendered** (`ProjectCard` and `ProjectModal` do not use them), so they are a data gap, not a visible break. The visible break is `og-*.jpg` / `twitter-*.jpg`: every route points at them and they 404, so link previews are blank. `/github` declares no image at all.

Code audit (read-only, 2026-09-20; counts are from the audit run, re-verify before acting on a number):

| Area | Finding |
|---|---|
| **Structure** | `/` is one long client page: hero, then StatsDashboard, About/Highlights, CoreValues. The four below-the-fold blocks are `dynamic(..., {ssr:false})`, so **the About content is absent from server HTML** (SEO and the no-JS fallback both suffer). |
| **Repetition** | 7 live near-identical stat/card rows across 6 routes (hero pills, StatsDashboard, CoreValues, Projects, Career, Skills, GitHub QuickStats). `features/stats/StatsSection.tsx` is imported nowhere (dead). `ui/ScanLineEffect` is unused, yet the same scan-line is hand-copied into 8 files. |
| **Slop tells** | Gradient-clip h1; avatar with blurred pulsing `primary / purple-500 / accent` glow; macOS-window `CodeSnippetWindow` ("Production Ready" status bar); `backdrop-blur` in about 35 places, `blur-xl..3xl` about 17; 360-degree spinning icons; floating particles + noise + three blurred orbs (`AnimatedBackground`, on every route except `/github`). |
| **Colour** | Tokens are neutral, so the purple/blue look is hard-coded: about 179 Tailwind palette-class hits (worst: `ContributionHeatmap` 52, `ContactSection` 23, `TimelineSection` 14) and about 60 hex literals (`#3b82f6` x15, `#f59e0b` x11...). Light mode is patched with fragile attribute selectors in `globals.css` (`.light [class*="border"]`, `.light section`...). |
| **Type** | Inter + JetBrains Mono under the misnamed `--font-geist-*` variables; redundant `fonts.googleapis.com` preconnects despite `next/font`; about 48 uses of `text-[9px]` / `text-[10px]` (below any sane minimum). |
| **Motion** | framer-motion imported in 49 files. Reduced motion honoured in only 4 places, no `MotionConfig`. Infinite loops that ignore it: footer icon wobble, avatar glow, blinking `_` cursors, scan lines. |
| **GitHub page** | Heatmap and language chart are `hidden 2xl:grid`: **the page's own signature visual only shows at 1536px and wider**; below that a "use desktop" message. |
| **Dead weight** | `recharts` is in `package.json` but imported nowhere. |
| **Bugs** | Hero shows "+ Projects" until GitHub data loads; page titles double the name ("Dhruv Gupta \| ... \| Dhruv Gupta"); project categories `Backend` / `Frontend` miss the `categoryColors` keys and fall back to blue; `role="listitem"` on a div inside no list; the rotating role has `exit` but no `AnimatePresence`; the Contact "Response metrics" and "Availability" blocks are empty `<div>`s. |
| **Duplicate CTA intent** | Projects and Contact are reachable from Header, Hero ("View My Work", "Get in Touch") and Footer. Pick one label per intent. |

**Content that contradicts itself (needs the owner, not a designer):**
- Hero says "SAP Analyst Intern @Deloitte"; `timeline.json` says "Upcoming Virtual Intern". The live tagline says "Ex-ONGC Intern".
- Project count: "7+ Projects Completed" (`stats.ts`) vs "10+ Projects Built" (`SkillsSection`) vs 5 entries in `projects.json`. Certifications: "5+" vs 6 entries.

**Filler copy to delete, quoted:** "Passionate about creating scalable and innovative applications", "let's create something amazing", "I'm all ears.", "Each project showcases scalable architecture, clean code practices, and measurable real-world impact", "Focused on delivering measurable results and exceeding expectations", "Always Learning", "Building the Future", "Technical Arsenal", "Interactive Career Path", and the "Production Ready" / "100% Production" badges.

**Real material worth building on (from `projects.json`, already on the site):** Stock Analysis System, "Multi-agent NLP... 87% query accuracy"; MUJ Placement Portal, "JWT authentication serving 100+ active users"; EcoHive, "SAP India Hackfest Top 50 from 2000+ entries"; Crave Connect (pgvector semantic search); Eye Gaze Tracking, "80%+ accuracy". These are the case-study candidates, and the numbers are the only metrics that may appear.

## 3. The approach

### 3.1 One sentence
Build the contract in four vertical slices, each shippable and each gated; spend the visual budget on **type, grid, the pixel portrait and real data**, and treat content and assets as their own workstream (§4) rather than an afterthought.

### 3.2 Six disciplines (apply to every slice)
1. **One motion language.** The values already exist in DESIGN.md §4.5 (120 / 220 / 420 / 700 ms; two easings; 35 ms stagger). The work is *using only those*. Gate: no other `duration-*`, `ease-*` or ad-hoc `transition` values in components.
2. **Grid before ornament.** 12 columns, and compose full-height sections as 6 rows (from R-K). Every element snaps to a column; if it does not, it is wrong, not "asymmetric". A dev-only `?grid` overlay (zero dependencies) is the fastest way to verify.
3. **Type is the interface.** The name is the display element and the LCP element; nav, labels and data are set in mono. No image is needed to make the first screen memorable.
4. **Fallbacks are craft.** Static content readable with JS off; `prefers-reduced-motion` gives final states instantly; every hover effect has a `:focus-visible` twin; one real NVDA pass (Windows) per slice.
5. **Data is texture, not claims.** GitHub numbers appear as a heatmap and small mono readouts. Never as headline stat cards (1 star is not a headline).
6. **Differentiate by the portrait and the data, not the palette.** Dark + monochrome + one accent is the *norm* for developer sites (R1). What nobody else has is *this* pixel portrait wired to *this* GitHub grid.

### 3.3 Slices, "done" and gates
Order is DESIGN.md §4.9. Slice 0 is new: it unblocks the rest and is mostly missing-asset repair.

| Slice | Scope | Done means (measurable) |
|---|---|---|
| **0. Unblock** | Self-host `public/images/portrait.png`; per-route `opengraph-image.tsx` (typographic, no binary asset) and delete the dead `/og-image.jpg`, `/twitter-image.jpg` and unused `/images/projects/*` paths; `MotionConfig reducedMotion="user"` (ROADMAP §0); fix the title-doubling bug; delete dead code (`StatsSection.tsx`, unused `ScanLineEffect`) and the unused `recharts` dependency (removal, but confirm first) | Read the emitted `<head>` of each route from `next build` + `next start`: exactly one `og:image` and one `twitter:image` pointing at the generated route, name in `<title>` once. (Network-panel 404 checks prove nothing here: crawlers fetch these images, pages never do.) **Status: built and verified 2026-09-20**, see §3.4 |
| **1. Tokens + type + Header + Hero** | `globals.css` INK/BONE tokens both themes, **deleting the `.light [class*=...]` attribute-selector patches**; Bricolage Grotesque + JetBrains Mono (+ Instrument Serif italic accent) via `next/font`, retiring the `--font-geist-*` names and the redundant preconnects; Header; Hero with Pixel Portrait and status strip; **home content server-rendered (drop `ssr:false` for About/Highlights)**. A prototype exists as a patch in `PROJECT/_redesign-slice1-backup/` (never build-verified) | Lighthouse mobile >= 95, LCP <= 2.0 s with the name as LCP element, CLS <= 0.05, INP <= 150 ms; no hex / palette classes in touched components; nothing under 12px; 4 widths x 2 themes pass `design-critic`; canvas pauses off-screen and under reduced motion; home readable with JS disabled |
| **2. Work** | Work index (hairline list, hover/focus reveal), `/projects/[id]` case studies, dynamic OG per project | Two flagship case studies with owner-supplied real content (§4); index usable by keyboard only |
| **3. About / Skills / Contact** | Career as spec sheet, skills as matrix, contact as terminal-style form (EmailJS flow unchanged) | Form has visible labels, errors, focus order; contrast passes in both themes; no duplicate CTA labels |
| **4. GitHub + transitions + footer** | `/github` heatmap and repos in the cell language, **visible at every width** (it is `2xl`-only today); clip-path page transitions; footer | Empty/error states designed (API can 503 without a token); heatmap works at 375 px; transitions disabled under reduced motion |

### 3.4 Slice 0 result (2026-09-20)
Done: the six routes (`/`, `/projects`, `/skills`, `/career`, `/github`, `/contact`) each have a prerendered `opengraph-image` (shared renderer `src/lib/og/render.tsx`, dark INK palette, Bricolage 800 + JetBrains Mono 500 subset TTFs in `src/lib/og/fonts/`, route-seeded cell motif; text is only facts already on the site). The hard-coded `images` arrays were removed from every route's metadata (an explicit `images` key overrides the file convention, so leaving them would have hidden the new images); `/github`'s dead layout metadata was removed (page metadata already replaced it). Home title uses `absolute` and `/github` no longer includes the name, so the name appears once. `SITE_CONFIG.ogImage/twitterImage` removed; JSON-LD fallback now points at `/opengraph-image`; `projects.json` `images` set to `[]`. `MotionConfig reducedMotion="user"` added in `Providers.tsx`. Dead `StatsSection.tsx` and `ScanLineEffect.tsx` deleted. `public/images/portrait.png` added (64x64, from the slice-1 backup; unused until slice 1).
Verified: `tsc` 0 errors, `eslint` 0 errors (1 pre-existing warning), `next build` passes (6 `opengraph-image` routes static), and `next start` HTML for all six routes has one `og:image` + one auto-inherited `twitter:image` and one name in `<title>`.
Not done, on purpose: `recharts` removal (dependency change; needs a yes; it is also listed in `next.config.ts` `optimizePackageImports`). `MotionConfig` is the global default only; per-component infinite loops (footer icon, avatar glow, cursors, scan lines) still need the slice-1 audit. Build needs the three `NEXT_PUBLIC_EMAILJS_*` variables (the `/contact` prerender throws without them); a local `next build` without `.env.local` fails for that reason, not because of this slice.

**Gate for every slice, in this order:** `/design-review <route>` (repeat until no category < 4) -> `a11y-motion-reviewer` -> `/perf-audit` -> `npm run lint` + `tsc --noEmit` + `npm run build` -> `/verify` with a JS-disabled load, keyboard-only pass and one NVDA pass.

## 4. Content and asset workstream (first-class, parallel to the slices)
A visual system cannot fill empty slots or replace filler copy by itself. Slice 2 stalls without this.

**Image slots.** No photography exists, and the project cards never showed images, so this is about *adding* a visual identity to Work, not repairing a broken one. Use, in order: (1) typographic covers per DESIGN.md §4.8 (oversized index numeral, category tag, mono tech list, pixel pattern seeded from the project `id`); (2) a real screenshot only when the owner supplies one; (3) never stock imagery. OG images use the same cover language via `ImageResponse`, so they need no files.

**Copy.** DESIGN.md §4.7 voice (first person, terse, present tense). Rewrites, all from facts already on the site, nothing invented:

| Now | Direction |
|---|---|
| "Hi, I'm Dhruv Gupta" | Name alone as the display element |
| "Full-Stack Developer" + tagline | One factual line: role, university, prior internship |
| "Building production-ready solutions with modern web technologies..." | Cut. Replace with one specific sentence about what he actually builds, taken from a real project |
| "9+ Projects / 1 Star / Available" | Remove. A heatmap and one status line ("open to work" only if true) |
| "Goal-Oriented, Creative Problem Solver, Continuous Learner, Team Player" | Delete: interchangeable on any CV, zero information |
| `developer.ts` code window | Remove as furniture; the terminal idea lives in mono labels and the contact form |

**What the owner must supply (I cannot invent it):**
1. **Resolve the contradictions first** (they block the hero copy): Deloitte SAP intern vs "Upcoming Virtual Intern" vs "Ex-ONGC Intern"; real project count (5 in data, "7+" and "10+" in copy); real certification count (6 in data, "5+" in copy).
2. For 2 flagship projects: the problem, the key decision, the outcome and any *true* metric (candidates: Stock Analysis System, MUJ Placement Portal, EcoHive).
3. A real screenshot if one exists; whether "available" is accurate; preferred contact email.

## 5. Explicitly out of scope, and why
GSAP / ScrollTrigger / Lenis (dependency and scroll-jank risk; CSS scroll-driven animation covers reveals) · WebGL / Three.js (nothing to render; budget) · stock or generated photography · bento grids and card stacks (contract: hairline grid, radius 0) · custom cursor (accessibility) · CMS (JSON is enough) · sound · per-project accent colours. Feature ideas that stay in `ROADMAP.md`: command palette, live "now" strip, architecture diagrams, AI assistant (last, needs cost and abuse controls).

## 6. Risks and open questions
- **R1. Palette is not a differentiator.** Near-black + monochrome is the developer default (~53%). Mitigation: the light "print" theme as a genuinely first-class equal; the Pixel Portrait; the hairline grid. Check in `/design-review` that it does not read as "yet another dark terminal site".
- **R2. The pixel motif is not new.** Pixel-mosaic transitions are on Awwwards shortlists. It must earn its place by being *functional* (portrait, heatmap, skeletons share one cell), not decorative.
- **R3. The portrait source is small.** A GitHub avatar is low resolution; ~56 columns is close to 1:1, which is fine, but do not scale the canvas above its natural size.
- **R4. Vermilion on bone.** Light accent (`~#d60400`) is close to pure red on paper; verify it reads as "signal", not "error".
- **R5. Recognition is not the goal.** Award-site winners are mostly agency work with photography and 3D. The realistic target is the best-crafted developer portfolio: fast, accessible, distinctive, honest. Lighthouse >= 95 and a no-JS fallback are achievable and rare.

## 7. Proposed amendments to DESIGN.md (NOT applied; say the word and I log them in §5)
1. Add to §4.3: "Full-height sections are composed on 12 columns x 6 rows."
2. Add to §3: "Content readable and navigable with JavaScript disabled; every hover effect has a focus-visible equivalent."
3. Add to §4.9: "Slice 0 (unblock): portrait asset, OG images, typographic covers, `MotionConfig`."

## Sources
- [Corentin Bernadou's portfolio, Codrops (2026-03-05)](https://tympanus.net/codrops/2026/03/05/inside-corentin-bernadous-portfolio-swiss-inspired-layouts-webgl-geometry-and-thoughtful-motion/)
- [R-K '26, Codrops (2026-04-07)](https://tympanus.net/codrops/2026/04/07/r-k-26-the-thinking-and-code-behind-a-portfolio-led-by-presence/)
- [Arnaud Rocca's portfolio, Codrops (2026-03-31)](https://tympanus.net/codrops/2026/03/31/arnaud-roccas-portfolio-from-a-gsap-powered-motion-system-to-fluid-webgl/)
- [Case Study: Mat Voyce, Awwwards (2025-02-24)](https://www.awwwards.com/case-study-mat-voyce-designing-a-digital-home-for-a-kinetic-creative.html)
- [Catalin Vintila portfolio, Awwwards](https://www.awwwards.com/sites/catalin-vintila-portfolio) · [RCK Portfolio, Awwwards](https://www.awwwards.com/sites/rck-portfolio-r) · [TRIONN, Awwwards (Developer Award criteria)](https://www.awwwards.com/sites/trionn-2)
- [Devouring Details (Rauno Freiberg)](https://devouringdetails.com/) · [paco.me](https://paco.me/) · [emilkowal.ski](https://emilkowal.ski/)
- [32 developer portfolios, createtoday.io (aggregate base rates only)](https://createtoday.io/examples?category=web-developer-portfolio)
