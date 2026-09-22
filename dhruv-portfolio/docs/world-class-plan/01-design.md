# 01 — Design

v2, 22 Sep 2026. Start from the existing design contract (`DESIGN.md`, INK/BONE "Signal"). The review's verdict: **keep the visual foundation.** Typography and palette are coherent, the portrait is recognisable, the mobile opening has usable actions. v1 proposed rebuilding things that already exist (the variable-axis type system, a "bento" Projects page that is actually an editorial list) and stated art-direction preferences as universal rules. This version targets what the evidence actually shows is weak.

## Benchmark

The closest SOTD reference is **Edoardo Lunardi** (SOTD 22 Nov 2025, 7.18; a senior frontend developer, not a visual designer). His first screen is name, role, availability and email as **real page text** over a portrait layer, and it survives WebGL being off. Full comparison in `evidence/reference-audit.md`. Also worth studying: **Corentin Bernadou** (7.42 + Developer Award, only 3.6 MB). His rulers and live viewport readout signal "developer" instantly. Don't borrow the scenes of Léo Parpeix or Bruno Simon: both hide identity behind 8–25 s of loading and fail without WebGL or on mobile.

## P0 — First-screen composition at real heights

**Problem (review, LIVE, 1536×674):** the name and portrait dominate; the introduction and Work/Resume/Contact fall below the fold. Mobile (390 px) is fine.

**Goal:** at 1366×768, 1536×674, 1440×900 and 390×844, the first screen shows name, a specific one-line role/story, and Work + Contact without scrolling (identity before spectacle: Corentin, Edoardo).

**Options to prototype and compare (HYPOTHESIS; pick by screenshot, not by argument):**
1. A **height-aware display size**: clamp the name's size by viewport height as well as width (e.g. a `min()` of vw- and vh-based sizes) so short laptops don't push the intro down.
2. A **narrower portrait allocation** on wide/short screens, shifting space to the intro and CTAs.
3. A **revised vertical composition**: the intro line and CTAs sit beside the name rather than below the portrait.

Preserve scale and personality. The name and portrait are the brand; they should shrink only as much as needed.

## P0 — Portrait: same look, a fraction of the bytes

MEASURED (sharp, 22 Sep): current `portrait.png` is 1,285,175 B, 1024², continuous tone. Both effects sample it at 64×64. A **768 px WebP q82 is 45,676 B (−96%) with no visible difference at display size**. A 64-grid static frame destroys the face; 128-grid changes the look (comparison: `.playwright-mcp/evidence/portrait-compare-orig-64-128.png`).

**Task:** keep the original as the master; serve an optimised WebP/AVIF for the static frame (via `next/image` responsive `sizes`, or pre-encoded at ~768 and ~1400 px for 2× screens). Confirm the WebGL/canvas effects still read the new asset correctly (same-origin, decodable). Then compare pixel edges and colour at desktop and mobile DPRs in both themes. Performance impact is measured separately (`04-performance.md`). **Do not promise it fixes LCP or CLS until traces show it.**

## P1 — Every project gets a credits table

Pattern from Edoardo (reference audit): **Client / Built with / My part / Others' parts / Year / Stack.** Design it once as a typographic component in the site's mono register, and use it on all five projects. For MUJ it is where "staff dashboards, student pages, role-based views: mine; importer: ___" becomes checkable (see `06-content.md`). SOTD case pages are otherwise thin (reference audit, pattern 4). Credits plus real decisions is the open gap a data engineer can own.

## P1 — Case-study template: editorial, with room for reconstructions

The Projects list is already editorial (review), so improve **selection and pacing** rather than replace the layout:

- A featured doorway for the two flagships above the chronological list.
- Flagship template: plain-language outcome → credits table → the problem → the rejected alternative → a labelled reconstruction figure → constraint → result (estimates labelled as estimates) → limitation → next project.
- Reconstructions (OWNER: no shareable screenshots) are drawn in the site's existing illustration language and **visibly captioned "Reconstruction"**.

## P1 — Design the signature interaction in the site's own vocabulary

`07-creativity.md` specifies the interaction. The design work is to express its cards, ledger and "held" state with the existing cell/tile motif (already used on 404 and GitHub). It should feel native. Accent colour marks state (arrived/held) because that serves comprehension here. Treat this as a choice for this component, not a site-wide rule (review correction).

## P2 — Tune, don't rebuild, the type system

The variable-axis role classes already exist (CODE `globals.css:201-219`: `wdth` 84–96, `opsz` 72–96, `clamp()` sizes). Tasks:

- Document the existing roles as tokens in DESIGN.md.
- Optionally make the axes respond to size or height. This is a refinement, not a rebuild.
- **Don't** switch body copy to 1.2 line-height. DESIGN.md sets 1.6 body, and leading and tracking need optical checks at real size and measure (review correction to v1).
- JetBrains Mono does have variable builds (PRIMARY). The mono role isn't limited to fixed weights, but it doesn't need to change.

## P2 — Illustration language: related, not identical

Keep the per-project illustrations related through a shared vocabulary (stroke, cell, palette), but don't force every diagram into identical geometry (review correction). The reconstructions for the flagships should come from this vocabulary.

## Deferred

Dark/light transition as an art-directed sequence; decorative shader effects on cards; sound. Revisit only after Stages 0–4 pass (`README.md`).

## Sources

- `evidence/reference-audit.md` (five SOTD personal portfolios, observed)
- Review `08-REVIEW-2026-09-22.md` §3 Design row, §4 visual judgement
- `evidence/claims-verified.md` #8 (JetBrains Mono variable)
- DESIGN.md (contract: 1.6 body leading, tokens, INK/BONE)
- Note on v1's "commodity template" warning: the Bentofolio template exists and offers WebGL, editorial type, bento and theme toggles, but that doesn't make this site's execution identical or mean the aesthetic can't win (review).
