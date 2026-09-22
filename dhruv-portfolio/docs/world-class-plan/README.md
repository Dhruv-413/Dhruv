# World-class portfolio plan — v2

Revised 22 Sep 2026 after the independent review (`08-REVIEW-2026-09-22.md`). v1 (still staged in git) listed ~10 tasks that already exist, misdiagnosed the SEO defect, and overstated performance evidence. **v2 keeps the visual foundation, fixes the evidence, designs the central experience early, and spends the recovered effort on one memorable interaction plus demonstrable project work.**

## Objective (owner decision, 22 Sep)

Make the site credible beside strong personal-portfolio SOTD winners and **pursue Awwwards Site of the Day**. **Honorable Mention** is the intermediate milestone: it needs jury ≥ 6.5 *and* user score ≥ 6.5. SOTD is a competitive selection, open for up to 3 months after approval. A Developer Award needs > 7 from the developer jury (all PRIMARY, `evidence/claims-verified.md`). There's no official "top 100 portfolio" pass mark, and no private checklist or Lighthouse score predicts an award.

## Files

Sections are in the reading order Dhruv asked for. The *delivery* order is the stage table below, because the review is right that the concept has to shape design and content from the start.

| File | Contents |
| --- | --- |
| `00-current-state.md` | **Start here.** Verified inventory: what exists (verify), what's missing (build), owner decisions |
| `01-design.md` | First screen at real heights, portrait encoding, credits table, case-study template |
| `02-features.md` | Build vs verify vs deferred |
| `03-seo.md` | Production publishes `localhost`: fix, guard, Search Console |
| `04-performance.md` | Production baseline and corrected causes |
| `05-usability.md` | Verification plan, touch rules, interaction accessibility |
| `06-content.md` | One positioning line, two flagship studies, honest metrics |
| `07-creativity.md` | "What arrives matters": the MUJ-anchored signature interaction |
| `08-REVIEW-2026-09-22.md` | The independent review (unchanged) |
| `evidence/` | `claims-verified.md`, `perf-baseline-2026-09-22.md`, `reference-audit.md`. Raw data in the gitignored `.playwright-mcp/evidence/` and `.playwright-mcp/ref-audit/` |

## Delivery sequence (from review §5; stages, not time estimates)

| Stage | Deliverable | Done when |
| --- | --- | --- |
| **0: Correct the baseline** | Production origin fixed + build guard; portrait re-encoded; inventory (done: `00`); repeatable perf evidence (done: baseline) | All public outputs use `https://dhruvgupta.co`; portrait looks identical; before/after traces show what remains |
| **1: Author the story** | Positioning line; the MUJ flagship study with credits table and labelled reconstructions; interaction script (the 4 steps and copy) | A general reader can explain what Dhruv does, what he personally built, and why it mattered |
| **2: Prove the concept** | Static three-panel interaction + new first screen + flagship doorway, desktop and mobile | 5 new viewers (≥ 2 non-engineers): ≥ 4 can explain the story and reach work/contact unaided |
| **3: Implement the system** | Animated interaction layered on the static base; case-study template; second flagship; refined opening | Inner pages get the same care as the hero; nothing essential depends on motion, hover or WebGL |
| **4: Validate the release** | Browser/device/a11y/perf evidence on production (`05`, `04` protocols) | Checks complete; open issues documented; no artificially passing scores |
| **5: Submit and distribute** | Submission imagery, description, credits, public URL; technical write-up of the flagship | Public entry works logged out; fees paid only now |

**Deferred until Stage 4 passes:** sound, Konami code, seasonal colours, console easter egg, extra WebGL card effects, decorative telemetry, command palette, dark/light transition sequence.

## Submission channels (verified 22 Sep)

| Channel | Cost | Note |
| --- | --- | --- |
| Awwwards | $65 per site, or $165/yr = one submission + Pro membership | Submit only at Stage 5 |
| CSS Design Awards | $50 | Entry into 8 awards |
| Land-book | Free | |
| Siteinspire | Free (merit only) | Account likely needed |
| Muzli | 1 free nomination (Pro: 3/month) | Needs a me.muz.li profile |
| Lapa Ninja | Email `hi@lapa.ninja`; no fee found | |
| One Page Love | — | **Not eligible**: rejects multi-page portfolios |
| Godly | — | **Not a channel**: submit URL redirects to recent.design |

## Owner actions (only Dhruv can do these)

1. **Now:** Vercel → Settings → Environment Variables → Production: `NEXT_PUBLIC_SITE_URL=https://dhruvgupta.co` (no trailing slash), then redeploy. The live site is publishing `localhost:3000` today.
2. Sign off the positioning line (`06-content.md`).
3. Pick flagship 2 (Crave Connect or EcoHive) and state your exact role in it.
4. For MUJ: who built what (the importer, the backend) so the credits table is accurate.
5. Check the Vercel plan (custom analytics events need Pro).
6. Optional: a PSI API key in `.env` for repeatable measurement.

## What changed from v1

- Eight "build" items became "verify" (contact states, analytics, cert links, JSON-LD, OG fields, live regions, keyboard timelines, WebGL safeguards). "Replace the bento Projects page" was dropped because it is already editorial.
- SEO P0 changed from "vercel.app duplicate" (wrong; the alias is behind SSO) to "`localhost` in production" (verified live).
- Performance now rests on a production baseline: CLS is 0; other routes score 97–99; the portrait is the LCP element on `/` with the render delay still unexplained; WebGL TBT spikes need investigation.
- Creativity moved from last to Stages 1–2 and is anchored on the real MUJ story, with honesty rules and a five-viewer gate.
- Content now centres on two flagship studies with credits tables and labelled reconstructions; MUJ metrics are relabelled as estimates.
- Every claim carries an evidence label (CODE / LIVE / MEASURED / PRIMARY / OWNER / HYPOTHESIS).

## Status

Stage 0 code is done on `redesign` (uncommitted; log in `00-current-state.md`): origin fix + build guard, portrait re-encode, JSON-LD image fix. It closes once deployed and re-measured. Owner action 1 is now a safety check rather than a blocker: the code falls back to the right domain, and the guard fails the deploy if Vercel holds a wrong value. Stage 1 is also done in code (log in `00-current-state.md`; interaction copy in `stage-1/interaction-script.md`). It closes once 1–2 real readers pass the comprehension check. Owner actions 2–4 are answered. Stage 2 is built (log in `00-current-state.md`); its gate is the five-viewer test in `stage-2/viewer-test-sheet.md`. Later stages still need Dhruv's go-ahead.
