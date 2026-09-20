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
| `--input` (control edge, ≥3:1) | `oklch(0.945 0.008 85 / 34%)` (6.4:1) | `oklch(0.155 0.006 60 / 75%)` (3.4:1) |
| `--ring` | = `--primary` | = `--primary` |

Rules: accent used for ≤ ~5% of any viewport (one word, one rule, one live cell set, one CTA). No second accent. `--chart-1..5` become an accent-derived ramp (single hue, lightness steps). Green is not used.

### 4.2 Type (all via `next/font/google`, variable)
- **Display + body: Bricolage Grotesque** (axes `opsz`, `wdth`, `wght`). Display: weight 800, `wdth` 78–85, uppercase, tracking −0.045em, leading 0.84. Body: weight 400, `wdth` 100, opsz auto.
- **Mono (labels, nav, data, code): JetBrains Mono** (already in the project). Labels uppercase, tracking 0.08em.
- **Editorial accent: Instrument Serif Italic** — max one emphasised word per heading, never in body copy.
- Retire Inter and the misleading `--font-geist-*` variable names → `--font-display`, `--font-serif`, `--font-mono`.
| Role | Size | Leading | Notes |
|---|---|---|---|
| Display | `clamp(4rem, 15vw, 15rem)` | 0.84 | uppercase, viewport-bleeding, name only |
| H1 | `clamp(2.75rem, 7vw, 6.5rem)` | 0.9 | uppercase |
| H2 | `clamp(2rem, 4vw, 3.75rem)` | 0.95 | |
| H3 | `1.5rem` | 1.15 | |
| Body | `1.0625rem` | 1.6 | measure ≤ 62ch |
| Mono label | `0.75rem` | 1.3 | uppercase, tracking 0.08em |

### 4.3 Grid & spacing
12-column grid; page margin `clamp(1rem, 3.5vw, 3rem)`; gutter `clamp(1rem, 2vw, 2rem)`; content max 1600 px, hero/marquees full-bleed. 4-px base; scale 4·8·12·16·24·32·48·64·96·128·192.
Section block padding `clamp(5rem, 12vw, 11rem)`. "Spec-sheet" panels use `display:grid; gap:1px` on a `--border` background so cells get razor-thin dividers.
Every section carries a mono index `[01]`, and grid intersections may carry a `+` crosshair (decorative, `aria-hidden`).

### 4.4 Shape, depth, texture
`--radius: 0` everywhere (dot indicators may be round). No box-shadow, no blur/backdrop-filter, no gradients (except the functional pixel-heat ramp). Depth = tone shift + hairline.
Emphasis border 2 px `--foreground`. Focus ring: 2 px `--primary`, 2 px offset. Optional texture: static grain overlay ≤ 5% opacity (single fixed layer, no animation).

### 4.5 Motion
Durations: 120 ms (micro) · 220 ms (UI) · 420 ms (reveal) · 700 ms (section) · ≤ 1400 ms (hero intro). Easing: out `cubic-bezier(0.16,1,0.3,1)`, in-out `cubic-bezier(0.83,0,0.17,1)`.
Stagger 35 ms. Animate `transform`, `opacity`, `clip-path` only. Scroll reveals use CSS `animation-timeline: view()` inside `@supports`, no-op otherwise.
Text effect vocabulary (mono labels only): **decode** (scramble → resolve, 400–600 ms, once) and **typed cursor** (block `▌`). Reduced motion: no movement, no scramble, final states rendered immediately.

### 4.6 Signature — Pixel Portrait (hero)
Canvas mosaic (~56 cols) sampled from `/images/portrait.png` (the owner's GitHub avatar, self-hosted → no CORS/API dependency). Load: cells decode left→right in stepped rows (≤ 1.4 s).
Idle: static. Cursor: cells within radius flip to `--primary` "heat" and decay (~600 ms). 1 px cell gutter shows the background. Pauses off-screen/hidden; reduced motion → single static draw.
Text is never rendered inside the canvas. Accessible name: "Pixel-art portrait of Dhruv Gupta".
Same cell language reused for: GitHub heatmap, page-transition wipe, loading skeletons (later slices).

### 4.7 Copy voice
First person, terse, specific, present tense. Labels in uppercase mono. **Banned:** "Hi, I'm", passionate, innovative, cutting-edge, production-ready, "Building the Future", emoji, vanity stats (stars, "100%"). Numbers only if true and meaningful (e.g. "87% query accuracy").

### 4.8 Components
Buttons: rectangular, 2 px border, mono uppercase label + arrow (`→ ↓ ↗`); primary = accent fill. Nav: mono, numbered, bottom-aligned underline for active. Cards: no card look — bordered cells in a hairline grid.
Project "covers" (no screenshots exist): typographic — oversized index numeral, category tag, generative pixel pattern seeded from `id`, tech in mono. Replace any image slot that has no asset.

### 4.9 Information architecture (rollout order)
1. **Slice 1 (NOT STARTED — waiting for the owner's go-ahead):** tokens + fonts + Header + Hero (Pixel Portrait). A prototype was built and then removed on request; it is preserved as a patch in
   `PROJECT/_redesign-slice1-backup/` (outside the repo). It was never build-verified or design-reviewed.
2. Slice 2: Work index (hairline list with hover reveal) → case-study pages `/projects/[id]`; dynamic OG images.
3. Slice 3: About/Career as a spec sheet; Skills as a matrix; Contact as a terminal-style form.
4. Slice 4: `/github` heatmap + repos in the cell language; page transitions; footer.

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
