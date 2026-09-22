# Stage 4 validation report

Started 23 Sep 2026, against commit `ad94bf1` plus one fix, the hero GitHub link target. Protocols: `04-performance.md` (measurement) and `05-usability.md` (P1 verify, P2 methodology).

**Done when:** checks are complete, open issues are documented, and no score passes artificially. Every row below says how it was measured. **Nothing here stands in for the five-viewer test or a real screen reader.**

## A. Automated and scripted checks (local production build, `next build --webpack` + `next start`, Chromium via Playwright)

| Check | Scope | Result | Evidence |
| --- | --- | --- | --- |
| axe-core 4.10.2, tags wcag2a/aa, 21a/aa, 22aa | 10 routes (`/`, `/projects`, MUJ, Crave, EcoHive, `/career`, `/skills`, `/github` with live data, `/contact`, 404) × dark and light | **0 violations** | Script in this file's history; raw report `.playwright-mcp/evidence/` |
| axe "needs review" (not failures) | `/`, Crave, `/github`, `/contact` × 2 themes | Contrast undecidable: arrow glyphs (`nonBmp`), text beside images (`imgNode`), Crave cover labels over map cells (`bgOverlap`, 40 nodes) | Manual check needed: see C |
| Keyboard order | `/`, 45 Tab stops | Logical. Skip link first (→ `#main-content`). The radio group is one stop. Every stop shows a focus ring | — |
| Target size | `/` | **Found and fixed:** the hero "GitHub ↗" link was 16 px tall (under the 2.5.8 AA 24 px). It now has a 44 px hit area with no layout change | `HeroSection.tsx` |
| Reflow | 10 routes at 640 px (1280 at 200% zoom) and 320 px | No horizontal page scroll | — |
| JS off | all routes | Visible content on every route (Stage 3/1 removed the hidden `S:0` wrapper). The demo works (radio → outcome, `<details>`) | Stage 2 and 3 logs |
| WebGL unavailable | `/` (getContext('webgl*') → null) | 2D mosaic fallback renders; 0 page errors | `stage4-nowebgl-portrait.png` |
| Reduced motion | `/` demo | 0 demo animations. Portrait, reveals and name follow the global rule | Stage 3 log |
| Live region | `/` demo | Announces "choice. note. trade-off" once the choice settles (450 ms) | Stage 3 log |
| Theme | toggle → navigate → reload | Persists (`localStorage`) | — |
| Mobile menu | 390 px | Enter opens it; Escape closes it and focus returns to "Menu" | — |
| Contact validation | empty submit (no send) | Focus goes to "There is a problem"; 4 fields `aria-invalid` | — |
| First screen | 6 viewports | Name, line and 3 CTAs above the fold | Stage 2 log |

## B. Performance and Lighthouse (deployed preview, PSI mobile, Lighthouse 13.5.0)

**Method.** The PSI API quota was exhausted (429), so the runs used the pagespeed.web.dev UI, with the Lighthouse JSON captured from its `batchexecute` response (the same method as the baseline).

- **Caveat:** PSI reuses a cached report for the same URL for a short time. The "3 runs" of the first batch were mostly **one independent run per route**.
- Independent repeats used distinct query strings.
- PSI's host speed varied a lot today (benchmarkIndex 558–1029), so single runs swing by about ±8 points.

**Preview `ad94bf1` (before the Stage 4 fixes) vs the production baseline `9312b17` (22 Sep):**

| Route | Perf (baseline) | LCP simulated (baseline) | CLS | Weight (baseline) | A11y / BP / SEO |
| --- | --- | --- | --- | --- | --- |
| `/` | 95, 86 (74) | 2.93 / 4.12 s (9.30) | 0.009 | **565 KB** (1,733) | 97 / 100 / 100 |
| `/projects` | 97 (99) | 2.55 s (2.18) | 0 | 464 KB | 100 / 100 / 100 |
| MUJ case | 98 (99) | 2.41 s (2.18) | 0 | 441 KB | 100 / 100 / 100 |
| `/career` | 97 (98) | 2.55 s (2.40) | 0 | 427 KB | 100 / 100 / 100 |
| `/github` | 88, 89\*, 96 (97) | 2.78–3.82 s (2.63) | 0 | 433 KB | 100 / 100 / 100 |
| `/contact` | 98 (98) | 2.48 s (2.48) | 0 | 448 KB | 100 / 100 / 100 |

\* Measured on **live production** at the same time as the preview's 96: `/github` variation is run-to-run noise, not a regression.

**Found by these runs, fixed in `51a2834`, verified on the preview for that commit:**

1. **Hero layout shift.** PSI reported 0.009. A local trace (412×823, 4× CPU, slow network) showed **0.19**. Cause: font swap.
   - The name's letters are inline-blocks, so the wider fallback font broke "DHRUV" between letters.
   - The three CTAs wrapped to two rows until the mono font loaded.
   - Fix: `whitespace-nowrap` on the name words, and a fixed 3-column CTA grid below `sm`.
   - Result: **local 0.03 / 0.006; PSI 0–0.01**.
2. **Contrast in the About scroll-scrub.** Unread words sat at 16% opacity (1.46:1). Now 50%, with accent words at 80% (the accent at 50% was 2.3–2.5:1). Result: axe clean mid-animation in both themes.
3. **Label-in-name (2.5.3).** The header logo's `aria-label` hid its visible "DG", and the `/projects` flagship cells had the same problem. Fixed.

**Preview `51a2834` (fixes in): `/` Accessibility 100, BP 100, SEO 100, CLS 0–0.01. Crave case: Perf 98, all 100.**

**Open, the main performance issue: the homepage render delay.** The portrait (LCP element) downloads by about 0.1 s but paints at about 1.25 s. On PSI, FCP equals LCP (about 1.26 s observed), while other routes paint at about 0.2–0.3 s. Homepage Perf therefore ranges **82–95**, with simulated LCP **2.9–4.4 s**, against DESIGN.md's ≥ 95 and ≤ 2.0 s.

- **Local (4× CPU):** the image loads at 60–80 ms and decodes at 240–390 ms, but paints at 670–1,140 ms (a little earlier with reduced motion). `domInteractive` is 2.65 s vs 1.4 s on `/projects`. HTML is 165 KB (live: 107 KB; `/career` is 138 KB and paints fast).
- **Hypothesis:** main-thread work from hydrating the home page's client islands (portrait, `PlacementArt`, `WeekStrip`, `MigrationFigure`, `ArrivesAnnouncer`, Ticker) competes with the first frames.
- **Next step:** a Chrome DevTools performance trace (the DevTools MCP failed to connect this session). Then defer the below-the-fold islands, or make them server-only where possible.
- Not blocking Stage 5 on its own, but it is the gap to ≥ 95.

## C. Owner / human checks (can't be automated here)

| Check | Why it needs a person |
| --- | --- |
| **Five-viewer test** (`stage-2/viewer-test-sheet.md`) | The Stage 2 gate; not run yet. It now tests the animated version (Stage 3 is on top) |
| NVDA (Windows) and VoiceOver (iOS or macOS): home and the demo, one case study, `/github`, `/contact` | Real speech output, double announcements, live-region timing |
| Safari (iOS) and Firefox | Only Chromium is installed here. Check `:has()` behaviour, the hero fit and the WebGL portrait |
| One real mid-range Android, on a slow network | Touch, portrait arming (first touch or 6 s), jank |
| One real contact-form send | Receipt and failure states need an authorised EmailJS send |
| Contrast "needs review" items | Arrow glyphs inherit link colours (they should pass); check the Crave cover's dish labels by eye |
