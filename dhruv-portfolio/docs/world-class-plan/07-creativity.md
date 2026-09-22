# 07 — Creativity: the central experience

v2, 22 Sep 2026. Replaces v1, which deferred the concept to the end and proposed generic drafts. The review is right that **the concept must be designed early**. It shapes typography, content and interaction. This file comes last in reading order only; in delivery it is **Stage 1–2** (see `README.md`).

## Concept: "What arrives matters"

The site already says Dhruv's work is about moving something from where it is to where it is needed without losing what matters. That covers data migration, B2B sourcing, and shipping software. The concept gives that line one short, optional interaction built on a **real story**: the MUJ Placement Portal.

**Real basis (OWNER, 22 Sep 2026):** when the Training and Placement cell's manual records moved into the portal's central database, the team hit **messy/inconsistent fields, duplicate student records, and bulk upload/import errors**. The portal was rebuilt from scratch in Jan 2026 because the first version's UX was weak, its code was hard to maintain, and TnP needed new features. Dhruv built the **staff dashboards and tables, student-facing pages, and role-based views/auth UI**. He did not build the upload screens. It was handed to juniors through walkthroughs and shared work on features.

**Honesty rules for this piece:**

1. Every record is **synthetic** and says so ("Sample record, not real student data").
2. The problems shown are the *kinds* of problems the team really hit. No specific incident is dramatised.
3. The copy states Dhruv's contribution exactly: the dashboards where staff saw this data, not the importer.
4. No employer (Deloitte) data or incidents appear anywhere in it.

## Prototype scope (from explorable-explanation research, see Sources)

Four steps, about 45–60 seconds, under ~100 visible words.

| Step | What the visitor sees and does | Copy budget |
| --- | --- | --- |
| 1. Before | Five cards labelled "Sample application #1–5" in *Spreadsheet*. One button: **Send to the portal**. | ~20 words |
| 2. The snag | Four arrive. #3 is paused: it looks like #2 with a different spelling of the branch ("CSE" vs "Computer Sci."). Question: **What should happen?** Radio group: *Let it through* · *Hold it for review* · *Merge with #2*. | ~30 words |
| 3. What arrived | A ledger: arrived · held · duplicated, plus one honest sentence on the trade-off of the chosen option. None is marked "wrong". **Try another choice** returns to step 2. | ~30 words |
| 4. After | Disclosure "The technical version" (hidden by default): validation, idempotent imports, reconciliation, in about 80 words. Then a link to **How we rebuilt the portal and handed it over** (the flagship case study). | ~80 words, hidden |

**Design principles applied (PRIMARY, Nicky Case, Distill):** hands-on before explanation ("cognitive gates"); predict, then reveal; overview first, details on demand; the exception reads as a *decision* with consequences, never as a failure state.

**Cut from v1:** WebGL, sliders, speed controls, more than one exception, sandbox mode, sound, scroll-jacking, decorative shader cards, live "pipeline health" telemetry (moved to an optional colophon detail), Konami code, console messages, seasonal colours.

## Accessibility is the base layer, not a fallback

- **Static version first:** three labelled panels (*Before / The snag / What arrived*) plus a ledger table in plain HTML. The same markup serves no-JS, no-WebGL, reduced motion and print. Motion is layered on top of it.
- **Controls from APG patterns that exist** (APG has no stepper pattern, PRIMARY): Button for "Send"/"Next", Radio Group for the choice, Disclosure (`aria-expanded`) for the technical version.
- **Narration:** one `role="status"` `aria-live="polite"` `aria-atomic="true"` region, present in the initial markup; one summary per step. Focus moves to each step's heading.
- **Reduced motion:** cards change state by opacity and colour instead of travelling (WCAG 2.3.3 intent). Touch: every action is a tap on a real button. No drag, hover or long-press required.

## Where it lives in the homepage sequence

Following the review's sequence, applied to the current `Hero → Ticker → About` (CODE `app/page.tsx:71-73`):

1. **Identity and premise:** name, one specific line, Work/Resume/Contact visible at 1536×674 and 390×844 (see `01-design.md`).
2. **One transformation:** this interaction, optional, skippable, placed after the premise and never before it.
3. **Proof:** the MUJ Portal flagship case study doorway (see `06-content.md`).
4. **Depth:** other projects, skills, career, GitHub.
5. **Action:** resume and contact.

## Gate before building the full version (Stage 2)

Build the static three-panel version first. Test it with **five people who haven't seen the site**, including at least two non-engineers. Pass when **at least four** can say in their own words what went wrong, why their choice mattered, and what Dhruv built. This is an internal gate, not an Awwwards criterion. If it fails, try an alternative mechanic before adding polish:

- **Two ledgers that must match:** Source and Portal totals disagree; find the mismatched row.
- **Predict the count:** guess how many records arrive after a retry; duplicates appear unless a key is used.
- **Handover relay:** pass the portal from prototype to rebuild to juniors, and see what's lost without walkthroughs. Uses real events only.

## Craft that serves the concept (after the gate passes)

- Motion vocabulary taken from the existing cell motif (tiles and cells already used on 404/GitHub), so the interaction feels native to the site rather than bolted on.
- The existing pixel portrait stays as identity. It doesn't need to carry the concept.
- Any shader work must be estimated as a full feature: textures, compositing, context loss, mobile input, cleanup, fallback QA. It is not "30 lines of GLSL" (review correction).

## Evidence status

- The concept framing and the three real problem types are **OWNER**-stated.
- Prototype scope and principles come from the research below (VERIFIED sources). Step counts and timings are **HYPOTHESIS** until the five-viewer test.
- No evidence was found either way on how Awwwards jurors treat explanatory interactions on personal portfolios. That is a gap, not a proof.

## Sources

- ncase.me/polygons · blog.ncase.me/explorable-explanations · blog.ncase.me/explorable-explanations-4-more-design-patterns
- samwho.dev/load-balancing · thesecretlivesofdata.com/raft · worrydream.com/ExplorableExplanations
- distill.pub/2020/communicating-with-interactive-articles (overview first, details on demand; only a fraction of readers interact)
- w3.org/WAI/ARIA/apg/patterns (no stepper pattern; disclosure, radio group) · MDN ARIA live regions · WCAG 2.2 SC 2.3.3
- awwwards.com/sites/bruno-simon-portfolio: a central interaction that *demonstrates the creator's specialty* is the relationship to study, not the car
