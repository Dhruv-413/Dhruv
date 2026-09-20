# DESIGN.md — design contract for dhruv-portfolio

> The `design-critic` agent and `/design-review` score against this file. Read it before changing any visual.
> **Status: DECIDED 2026-09-20** (direction chosen by Claude on the owner's instruction "make the decision yourself"; see §5).

## 1. The decision in one paragraph
**INK / BONE — "Signal".** A Swiss-print × terminal-telemetry system built from four materials the owner actually has: **type, a strict grid,
real GitHub data, and one personal image — the pixel-art avatar.** Dark theme = *telemetry* (warm ink, phosphor-bone text), light theme = *print*
(bone paper, carbon ink); same grid, same type, same single accent (hazard vermilion). Zero border-radius, zero shadows/gradients/glass; structure comes from
1 px hairlines, crosshair markers and extreme type-scale contrast. **Signature moment: the Pixel Portrait** — the avatar rebuilt as a live cell mosaic that
"decodes" on load and heats up under the cursor; the same square cell is the visual unit of the GitHub heatmap and of page transitions.
Direction skill used: `industrial-brutalist-ui` (one archetype per substrate; see §4.10 for where we deliberately deviate).

## 2. Why this direction (evidence, not taste)
- **No visual assets exist.** `public/` has no images; all 5 project images (`/images/projects/*.jpg`), `og-image.jpg` and `twitter-image.jpg` are referenced but missing.
  Every Codrops/Behance portfolio researched (R—K ’26, Rocca, Reymondin, Bisous) leans on photography/CGI. This site can't, so the visual must be **type + grid + data + code**.
- **The pixel-art avatar is the owner's only personal image**, and GitHub's contribution graph is literally a grid of pixels — one motif ties identity, data and code together.
- **Convergent signal from the case studies:** one strict grid (12 col / 4 col), 1–2 typefaces + a mono "technical" layer (Bisous, Reymondin), restrained palette with a single accent,
  terminal/decode text as the "geeky dev side" (Reymondin), motion as rhythm not noise (R—K: "built for presence, not volume"), reduced-motion fallbacks (Rocca).
- **Real data is modest** (1 star, 0-day streak, 548 contributions, 9 repos) → stats must never be headlines; data is *texture*, not claims.

### What we are fixing (slop tells seen on the live site, dhruvgupta-nu.vercel.app)
Everything centred with no grid tension · `via-purple-500` glow behind the avatar · macOS-window code snippet as hero furniture · "Hi, I'm" + filler copy ("Building the Future",
"production-ready solutions with modern web technologies") · four identical stat cards on every page ("100% Production", "1 Star") · glassmorphism/blur/gradient text · Inter default · empty image slots.

## 3. Non-negotiables
- Lighthouse mobile ≥ 95 every route; LCP ≤ 2.0 s (LCP element = the display name, never the canvas); CLS ≤ 0.05; INP ≤ 150 ms.
- WCAG 2.2 AA in **both** themes (values in §4.1 are computed, not guessed); visible `focus-visible`; full keyboard use; `prefers-reduced-motion` honoured everywhere.
- Canvas/WebGL is lazy, capped (DPR ≤ 2), paused off-screen and when the tab is hidden, and degrades to a static frame under reduced motion / no JS.
- Tokens only; no hex/rgb or named palette colours (`purple-500`…) in components. Real content only; no invented facts or metrics.
- Zero new dependencies for the first slice (CSS + canvas 2D + `next/font`).

## 4. Decisions (literal values — the critic scores against these)

### 4.1 Colour (oklch; contrast computed with WCAG 2.x, all pass)
| Token | Dark — "telemetry" | Light — "print" |
|---|---|---|
| `--background` | `oklch(0.145 0.006 60)` ≈ #0c0a08 | `oklch(0.955 0.009 90)` ≈ #f2f0e9 |
| `--foreground` | `oklch(0.945 0.008 85)` ≈ #efece7 (16.9:1) | `oklch(0.155 0.006 60)` ≈ #0e0c0a (17.2:1) |
| `--card` / `--popover` | `oklch(0.18 0.006 60)` | `oklch(0.975 0.007 90)` |
| `--muted` / `--secondary` / `--accent-surface` | `oklch(0.225 0.006 60)` | `oklch(0.925 0.01 90)` |
| `--muted-foreground` | `oklch(0.70 0.01 80)` (7.4:1) | `oklch(0.45 0.01 70)` (6.5:1) |
| `--primary` (the ONE accent, "signal") | `oklch(0.68 0.21 35)` ≈ #ff582d (6.3:1 on bg) | `oklch(0.55 0.225 30)` ≈ #d60400 (4.8:1 on bg) |
| `--primary-foreground` | `oklch(0.145 0.006 60)` (6.3:1 on accent) | `oklch(0.975 0.007 90)` (5.1:1 on accent) |
| `--border` (hairline) | `oklch(0.945 0.008 85 / 16%)` | `oklch(0.155 0.006 60 / 20%)` |
| `--input` (control edge, ≥3:1) | `oklch(0.945 0.008 85 / 42%)` (≈3.7:1; the original 34% measured ≈2.7:1 and failed) | `oklch(0.155 0.006 60 / 75%)` (measured ≈8.4:1) |
| `--ring` | = `--primary` | = `--primary` |

Rules: accent used for ≤ ~5% of any viewport (one word, one rule, one live cell set, one CTA). No second accent. `--chart-1..5` become an accent-derived ramp (single hue, lightness steps). Green is not used.

### 4.2 Type (all via `next/font/google`, variable)
- **Display + body: Bricolage Grotesque** (axes `opsz`, `wdth`, `wght`). Display: weight 800, `wdth` 84, uppercase, tracking −0.028em, leading 0.84 (the original `wdth` 80 / −0.045em made letters collide; built and measured). H1: `wdth` 92, tracking −0.005em. H2 and list titles: `wdth` 96, tracking +0.005em. Body: weight 400, `wdth` 100, opsz auto.
- **Mono (labels, nav, data, code): JetBrains Mono** (already in the project). Labels uppercase, tracking 0.08em.
- **Editorial accent: Instrument Serif Italic** — max one emphasised word per heading, never in body copy.
- Retire Inter and the misleading `--font-geist-*` variable names → `--font-display`, `--font-serif`, `--font-mono`.
| Role | Size | Leading | Notes |
|---|---|---|---|
| Display | `clamp(4rem, 18vw, 17rem)` (mobile 26vw) | 0.84 | uppercase, viewport-bleeding, name only |
| H1 | `clamp(2.75rem, 7vw, 6.5rem)` | 0.9 | uppercase |
| H2 | `clamp(2rem, 4vw, 3.75rem)` | 0.95 | |
| H3 | `1.5rem` | 1.15 | |
| Body | `1.0625rem` | 1.6 | measure ≤ 62ch |
| Mono label | `0.75rem` | 1.3 | uppercase, tracking 0.08em |

### 4.3 Grid & spacing
12-column grid; page margin `clamp(1rem, 3.5vw, 3rem)`; gutter `clamp(1rem, 2vw, 2rem)`; content max 1600 px, hero/marquees full-bleed. 4-px base; scale 4·8·12·16·24·32·48·64·96·128·192.
Section block padding `clamp(4rem, 9vw, 8rem)` (was `clamp(5rem, 12vw, 11rem)`; the design review read ~170 px bands as dead space). "Spec-sheet" panels use `display:grid; gap:1px` on a `--border` background so cells get razor-thin dividers.
Every section carries a mono index `[01]`, and grid intersections may carry a `+` crosshair (decorative, `aria-hidden`).

### 4.4 Shape, depth, texture
`--radius: 0` everywhere (dot indicators may be round). No box-shadow, no blur/backdrop-filter, no gradients (except the functional pixel-heat ramp). Depth = tone shift + hairline.
Emphasis border 2 px `--foreground`. Focus ring: 2 px `--primary`, 2 px offset. Optional texture: static grain overlay ≤ 5% opacity (single fixed layer, no animation).

### 4.5 Motion
Durations: 120 ms (micro) · 220 ms (UI) · 420 ms (reveal) · 700 ms (section) · ≤ 1400 ms (hero intro). Easing: out `cubic-bezier(0.16,1,0.3,1)`, in-out `cubic-bezier(0.83,0,0.17,1)`.
Stagger 35 ms. Animate `transform`, `opacity`, `clip-path` only. Scroll reveals use CSS `animation-timeline: view()` inside `@supports`, no-op otherwise.
Text effect vocabulary (mono labels only): **decode** (scramble → resolve, 400–600 ms, once) and **typed cursor** (block `▌`). Reduced motion: no movement, no scramble, final states rendered immediately.

### 4.6 Signature: Pixel Vortex (hero; the Pixel Portrait, made interactive)
The owner's 64×64 GitHub avatar (`/images/portrait.png`, self-hosted → no CORS/API dependency) is 4096 flat tiles drawn as instanced quads: colour = the pixel, no height map. **Raw WebGL2, one instanced draw call, no 3D library, no MSAA, no lighting** (lazy chunk ≈ 5 kB; framer-motion is no longer used at runtime). All motion is analytic in the vertex shader, so a frame costs one small uniform upload and 16k vertices, which an old integrated GPU handles; there is no per-tile CPU physics.
Load: every tile spirals in from a wider, rotated orbit and lands on its pixel, flashing `--primary` (≈ 1.7 s). Pointer: a whirlpool follows the cursor and leaves a short wake; nearby tiles twist, lift and tint, then unwind to the picture in ≈ 1 s (faster strokes swirl harder); the picture also tilts slightly with the pointer. Click / tap: a ring pulse shoves tiles outward as it crosses the face. Scroll: leaving the hero winds the picture slowly around its centre. Once, right after the intro, one scripted swirl crosses the face so the interaction is discoverable (cancelled by the first pointer input). The portrait always settles back to the clean, frontal picture, and the loop **rests** when nothing moves (WCAG 2.2.2, no idle battery cost).
Budget: canvas ≤ 720 px per side and DPR ≤ 1.5; devices with ≤ 4 cores or ≤ 4 GB start at 0.72 quality; if the averaged frame time exceeds 34 ms the quality steps down (0.72 → 0.5) and then animation stops (static frame); pauses off-screen and when the tab is hidden. Init is deferred until the page has painted and gone idle; on touch devices it arms on the first touch (6 s fallback).
Fallbacks, cheapest first: server-rendered pixelated `<img>` (accessible name "Pixel-art portrait of Dhruv Gupta", works with JS off) → 2D canvas mosaic when WebGL2 is unavailable / context lost → reduced motion = one static render, scroll-linked motion also off. Text is never rendered inside the canvas.
Same cell language reused for: GitHub heatmap, page-transition wipe, loading skeletons (later slices).

### 4.7 Copy voice
First person, terse, specific, present tense. Labels in uppercase mono. **Banned:** "Hi, I'm", passionate, innovative, cutting-edge, production-ready, "Building the Future", emoji, vanity stats (stars, "100%"). Numbers only if true and meaningful (e.g. "87% query accuracy").

### 4.8 Components
Buttons: rectangular, 2 px border, mono uppercase label + arrow (`→ ↓ ↗`); primary = accent fill. Nav: mono, numbered, bottom-aligned underline for active. Cards: no card look — bordered cells in a hairline grid.
Project "covers" (no screenshots exist): typographic — oversized index numeral, category tag, generative pixel pattern seeded from `id`, tech in mono. Replace any image slot that has no asset.

### 4.9 Information architecture (rollout order)
1. **Slice 1 (BUILT 2026-09-20, uncommitted; PERF GATE NOT MET on `/`: Lighthouse mobile 77-88 vs the ≥ 95 in §3, CLS 0 but LCP ≈ 3.8 s simulated; see `docs/DESIGN-APPROACH.md` §3.5):** tokens + fonts + Header + Hero (Voxel Portrait) + a server-rendered work index on `/` (interim for slice 2) + token-only footer. Built on the earlier prototype patch; verified with tsc, eslint, `next build`,
   browser checks at 375/768/1280/1440/1920 in both themes, reduced-motion, keyboard, and three independent reviews (design, a11y/motion, performance). Open items: mobile Lighthouse (see `docs/DESIGN-APPROACH.md` §3.5).
2. **Slice 2 (BUILT 2026-09-20):** Work index (hairline list, category filter island) → case-study pages `/projects/[id]` (static params, JSON-LD, seeded typographic cover, per-project OG image, prev/next); sitemap lists the real project URLs.
3. **Slice 3 (BUILT 2026-09-20):** Career as a chronological ledger; Skills as a hairline matrix + certifications list; Contact form restyled in place (behaviour unchanged). There is no separate About route in the IA; the home hero carries the facts.
4. **Slice 4 (BUILT 2026-09-20):** `/github` heatmap in the cell language (all widths, scrolls on phones) with loading/error/empty states; footer; route-enter transition (`template.tsx`, transform only); 404 and all `loading.tsx` states.

### 4.10 Deliberate deviations from `industrial-brutalist-ui`
Accent is hazard **vermilion/orange-red** (`≈#ff582d` dark, `≈#d60400` light) instead of a single `#E61919` — warmer to match the avatar's palette while keeping the skill's one-accent rule.
Two substrates (dark telemetry / light print) are both supported because the site has a theme toggle; each is internally consistent and they are never mixed on one screen.
Bricolage Grotesque replaces Inter/Archivo for the macro face (more character, variable width axis).

## 5. Decision log
| Date | Decision | Why |
|------|----------|-----|
| 2026-09-20 | Direction = INK / BONE "Signal" (Swiss-print × terminal), signature = Pixel Portrait | §2: no assets → type/grid/data; avatar is pixel art; GitHub grid is pixels; case-study convergence |
| 2026-09-20 | Palette, type, scale, motion values in §4 | Contrast computed (scratch script); fonts chosen for character + variable axes; zero-dependency first slice |
| 2026-09-20 | Retire Inter, purple glow, glass, gradients, stat-card rows, mac code window as hero | Slop tells listed in §2 |
| 2026-09-20 | Mobbin not usable (paid plan) — inspiration via Codrops/Behance case studies (Exa) | Tool limitation |
| 2026-09-20 | Hero signature extended from a 2D mosaic to a 3D voxel relief, raw WebGL2, no new dependency | Owner opened the brief to 3D on the build request; raw WebGL2 keeps the cost at ≈ 7.6 kB vs ≈ 150 kB for three.js; measured 154 fps idle / 109 fps at 4× CPU throttle |
| 2026-09-20 | Idle motion rests after ≈ 5 s; scroll-linked tilt also honours reduced motion | a11y review: WCAG 2.2.2 (auto-updating > 5 s) and a reduced-motion leak; matches §4.6 "idle: static" |
| 2026-09-20 | Display `wdth` 80→84, tracking −0.045→−0.028em; H1/H2 tracking loosened; display size 15vw→18vw | Built and screenshotted: letters collided; the larger size fills the columns and removes hero dead space |
| 2026-09-20 | Dark `--input` alpha 34%→42%; §4.1 contrast claim corrected | Computed contrast was ≈ 2.7:1, not the documented 6.4:1; UI edges need ≥ 3:1 |
| 2026-09-20 | `--section-pad` `clamp(5rem,12vw,11rem)` → `clamp(4rem,9vw,8rem)` | Design review: the ~170 px bands above/below sections read as dead space, not cinematic pacing |
| 2026-09-20 | Slices 2-4 built in one pass on the owner's request ("make the entire site look good"); every legacy client component removed (framer-motion `motion.*`, AnimatedBackground, StatCard, SectionHeader, project modal, etc.) plus the root `MotionConfig` | The legacy pages carried the slop tells and ~179 hard-coded palette classes; framer-motion now only remains inside the lazy 3D chunk (`useScroll`) |
| 2026-09-20 | Touch devices arm the 3D portrait on first touch/scroll (6 s fallback); desktop arms on idle | Mobile Lighthouse TBT on `/` fell from ~380 ms to ~130 ms; touch has no cursor for the heat effect |
| 2026-09-20 | No proficiency numbers or bars on Skills; project pages show `metrics` only, not `badges` | Self-assessed percentages are vanity data (§4.7); badges duplicated the metrics and included banned copy ("Production Ready") |
| 2026-09-20 | Footer restyled (hairline, mono, server component) ahead of slice 4; floating scroll-to-top removed | The old footer carried the purple gradient / rounded chip slop tells and a scroll listener |
| 2026-09-20 | Hero copy uses only facts already in SITE_CONFIG / timeline.json; no availability claim | Owner has not confirmed "available"; the Deloitte/ONGC internship conflict is unresolved |
| 2026-09-20 | Home below-the-fold: server-rendered work index replaces the legacy client sections | Removes `ssr:false`, the filler "Core Values" and the code-window furniture; the old components were deleted |
| 2026-09-20 | Home below-the-fold is now an editorial About (not a project list): sentence-case `.t-statement` whose words light up on scroll, a 7-block week strip (5 Deloitte / 2 Beaumonde, today marked in IST by a tiny client island), two plain-language lane blocks, a "before this" readout row, and doorways to Projects and Contact | Owner feedback: the site read as one texture (hairline lists everywhere) and the About page carried a project list. The About is the one section that is not a list. Statement is sentence case for readability; display stays uppercase |
| 2026-09-20 | Slow CSS ticker (`.marquee`) between hero and About; pauses on hover/focus, stops under reduced motion, hidden from AT | Adds motion and life without JS; every phrase is already stated on the site |
| 2026-09-20 | Current roles are stated by the owner and live in `SITE_CONFIG.person.currentRole` / `.venture`: Data Modernization and Migration Intern at Deloitte; weekend contributor to Beaumonde (family B2B sourcing). Deloitte start date reuses the previously recorded 2026-01-21; Beaumonde has no career entry until a start date is supplied | Supersedes the 2026-09-20 hero-copy row about the unresolved Deloitte/ONGC conflict (ONGC is the 2025 internship; Deloitte is current) |
| 2026-09-20 | Voxel portrait made legible: near-frontal rest pose (0.08 / 0.09 rad), relief 6.5 to 2.4, softer cursor parallax, brighter ambient light, heat tints instead of repainting | Owner feedback: "a little hard to get the correct image". Height-from-luminance at 6.5 turned the face into a mask and the 18 degree tilt sheared it; §4.6 already said relief stays low so the face reads |
| 2026-09-20 | Voxel relief replaced by the flat-tile Pixel Vortex: instanced quads (no cubes, depth map, MSAA or lighting), analytic whirlpool trail + click ring + spiral-in intro, one scripted demo swirl, quality steps for weak devices, framer-motion dropped from the hero | Owner: "make the pixel vortex not lag on low-end PC, interesting and fun to interact with". Fill-rate (2x DPR, MSAA, 5-face cubes) was the low-end risk; a flat 720 px canvas removes it, and the swirl reads as play rather than as a distortion of the face |
| 2026-09-21 | About statement gets a "Fig. 02" beside it on `lg`+: two 8x8 tile grids (old / new system) with the same seeded pattern, an E / T / L stage column between them, and a "Moved n / total" counter. As the statement is read, a copy of each tile travels from its old-grid position to its new-grid one (vermilion in transit, sized with container units), the stages light in turn and the counter ticks up (all CSS scroll-driven with an integer `@property`; finished state by default, static under reduced motion, aria-hidden, not rendered below `lg`) | Owner: empty space right of the statement, then "make it interesting". The sentence is about moving data between systems, so the figure shows the move (extract, transform, load) rather than a fade, in the cell language of §4.6 |
