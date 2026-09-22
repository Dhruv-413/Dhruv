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

## B. Performance (deployed build, PSI protocol)

**Pending.** The preview is behind Vercel Authentication. It runs as soon as the owner switches off Preview protection. 3 PSI runs per route, mobile, medians plus ranges, with simulated and observed values kept separate, compared against `evidence/perf-baseline-2026-09-22.md`.

## C. Owner / human checks (can't be automated here)

| Check | Why it needs a person |
| --- | --- |
| **Five-viewer test** (`stage-2/viewer-test-sheet.md`) | The Stage 2 gate; not run yet. It now tests the animated version (Stage 3 is on top) |
| NVDA (Windows) and VoiceOver (iOS or macOS): home and the demo, one case study, `/github`, `/contact` | Real speech output, double announcements, live-region timing |
| Safari (iOS) and Firefox | Only Chromium is installed here. Check `:has()` behaviour, the hero fit and the WebGL portrait |
| One real mid-range Android, on a slow network | Touch, portrait arming (first touch or 6 s), jank |
| One real contact-form send | Receipt and failure states need an authorised EmailJS send |
| Contrast "needs review" items | Arrow glyphs inherit link colours (they should pass); check the Crave cover's dish labels by eye |
