# 06 — Content

v2, 22 Sep 2026. Revised after the review: add **concrete artifacts and evidence**, not just more narrative; reconcile every surface that describes Dhruv; let a general reader understand the outcome before the technical details.

## P0 — One positioning, everywhere

The same person is currently described differently in different places:

| Surface | Current | Evidence |
| --- | --- | --- |
| `SITE_CONFIG.title` (feeds `<title>`, OG, schema) | "Full Stack Developer & AI/ML Engineer" | CODE `lib/constants.ts:6` |
| `person.currentRole`, About copy | Data Modernization & Migration Intern at Deloitte + Beaumonde | CODE `lib/constants.ts`, `AboutSection.tsx` |
| Resume PDF, Person JSON-LD `jobTitle`, OG image alt | Unverified; must match | — |

**Task:** write one positioning line and one ~25-word description, get Dhruv's sign-off, then use them in title, meta description, OG, Person schema, hero, resume and LinkedIn. The line must be specific and honest for an early-career engineer (a 2026 grad; see memory `career-facts-owner-stated`). Draft to react to (HYPOTHESIS): *"Dhruv Gupta, data engineering intern at Deloitte. I move data from where it is to where it's needed, without losing what matters."*

## P1 — Two flagship case studies, not five shallow ones

The review asks for two substantial studies, each with **one rejected alternative, one constraint, one artifact, one limitation**.

### Flagship 1: MUJ Placement Portal (anchor of the signature concept)

Current chapters (CODE `projects.json`): problem → request → my part → first version → rebuild → handover. They are honest but thin, and have no artifacts.

Add, from OWNER answers (22 Sep):

- **The data reality:** manual records arrived with inconsistent fields, duplicate students, and failed bulk imports. This is where the signature interaction links in.
- **Why rebuild instead of patch (the rejected alternative):** the first version's UX was weak, its code had become hard to maintain, and TnP needed new features. Say what continuing to patch would have cost.
- **My contribution, precisely:** staff dashboards and tables, student-facing pages, role-based views and auth UI. Name what the friend or others owned so the claim is checkable.
- **Handover:** walkthrough sessions; juniors built parts during the last months; the rest was repo plus access. The honest **limitation**: little formal documentation. State what Dhruv would do differently.
- **Artifacts (OWNER: nothing shareable).** Use **clearly labelled reconstructions**: a redrawn dashboard wireframe ("Reconstruction, not a screenshot"), a role/permission diagram, a before/after data-flow sketch. Keep them in the site's existing illustration language.
- **Metrics (OWNER: rough estimates).** Replace "100+ active users" and "80% less manual data entry" with honest estimate wording, e.g. *"used by roughly a hundred students and staff (our estimate)"* and *"most manual entry removed (estimate; not formally measured)"*. Keep an estimate label wherever these appear: metrics strip, JSON-LD, OG.

### Flagship 2: pick one (HYPOTHESIS: Crave Connect)

Candidates with real facts on file: **Crave Connect** (19 database tables, semantic search, Docker; "we dropped the project" is already honest) or **EcoHive** (Top 50 of 2000+ at SAP Hackfest). Crave Connect has the better "decision" material: pgvector versus plain SQL search. **Dhruv to confirm** which one, and what he personally built. Apply the same four beats. Its artifacts will also be reconstructions (schema diagram, search-flow sketch).

The other three projects stay as short entries. Don't pad them.

## P1 — General reader first, technical second

Each flagship opens with a two-sentence outcome in plain language ("Placement staff stopped tracking students in spreadsheets"). The stack, architecture and decisions follow under clear headings. The same layering is used by the signature interaction (plain story, then "The technical version" disclosure).

## P1 — A featured-work doorway before the chronological list

On `/projects`, shipped work appears only in chronological order (review). Add a featured doorway at the top linking the two flagships, and keep the chronology below if that order is intentional. On the homepage, the flagship doorway is step 3 ("Proof") of the sequence in `07-creativity.md`.

## P2 — Voice

Write every line for one specific reader: a recruiter mid-scroll at 11 pm, or "me before I knew what a migration intern does" (Julia Evans's technique, via simonwillison.net). The current About statement already works this way (short, declarative, present tense). Keep DESIGN.md §4.7's banned phrases.

## Keep as is

- `not-found.tsx` ("Signal lost", map of dead and live cells) and `Footer.tsx` are already distinctive. No generic 404 advice applies.
- No `/now` page, blog, uses page or newsletter at this stage. The GitHub page already shows live activity.

## Owner inputs (answered 23 Sep; see `00-current-state.md` Stage 1 log)

1. Sign-off on the positioning line.
2. Flagship 2 choice (Crave Connect or EcoHive) and your exact role in it.
3. For MUJ: what the friend owned (backend? importer?) so contributions are split accurately.

## Sources

- Review `08-REVIEW-2026-09-22.md` §3–4 (artifacts, reconciliation, two flagships, outcome-first)
- simonwillison.net/2026/Jun/15/julia-evans (write for one reader)
- nngroup.com/videos/ux-portfolios-hiring (hiring managers value process and honesty about personal contribution; UX context, transfer inferred)
- awwwards.com/about-evaluation (Content 10%: "quality and relevance of copy, imagery, video, and how well it's integrated")
