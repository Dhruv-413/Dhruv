# Interaction script: "What arrives matters"

Stage 1 deliverable, 23 Sep 2026. This file holds every string, state and accessibility rule the Stage 2 prototype needs, so building it is layout work, not writing. It replaces the draft in `07-creativity.md` wherever the two differ.

## Facts it rests on (OWNER, 22–23 Sep)

- The TnP cell's manual records moved into one central database. The team hit **inconsistent fields, duplicate students and failed bulk uploads**.
- **The friend built the backend, the database and the bulk importer.** Dhruv built the **staff screens**: dashboards and tables, student profile pages, role-based views and sign-in.
- Staff and admins log in. **Students never do.** The staff screens show student records with eligibility, placement drives and stats.
- Hindsight: check data at import, write docs while building, add automated tests.

## Correction to the v2 draft

The draft had the visitor act as the importer and implied that this was Dhruv's work. It wasn't. In this script:

- The visitor makes the **import decision**, framed as the team's problem.
- The result lands in **the staff table, which Dhruv built**. That is where a wrong choice becomes visible to 80–100 staff.
- It says "applications" nowhere, because students don't log in. It uses **student records**.

## Honesty rules (unchanged, now testable)

1. Every record is synthetic, and the panel says so in visible text.
2. It shows one kind of problem the team really hit (a duplicate caused by an inconsistent field). It doesn't dramatise a specific incident.
3. The copy states who built what, in the same words as the case study's credits table.
4. No Deloitte or employer data appears.

## Data

Five records, with the same fields as the reconstruction figure on the case page, so the two feel like one system.

| # | Student | Branch | CGPA | Backlogs |
| --- | --- | --- | --- | --- |
| 1 | Sample student 01 | CSE | 8.4 | 0 |
| 2 | Sample student 02 | CSE | 7.1 | 0 |
| 3 | Sample student 02 | Computer Sci. | 7.1 | 0 |
| 4 | Sample student 03 | ECE | 6.2 | 2 |
| 5 | Sample student 04 | ME | 6.8 | 1 |

The code source is `src/lib/placement-sample.ts`, shared with the case-page sketch. There is no "Eligible" column: the owner never stated the eligibility rule.

#3 is #2 again, with the branch typed another way. It is the only exception, as the v2 scope requires.

## Steps and copy

Word counts are for visible text, excluding the hidden disclosure.

### Step 1: Before (≈ 22 words)

- **Heading:** Five records, one spreadsheet
- **Body:** The placement cell kept student records by hand. These are samples, not real students.
- **Visual:** five record cards in a loose stack, labelled *Spreadsheet*.
- **Button:** Send to the portal
- **Live region:** "Five sample records ready to send."

### Step 2: The snag (≈ 34 words)

- **Heading:** One record doesn't match
- **Body:** Four arrived. Record 3 looks like record 2, but its branch says "Computer Sci." instead of "CSE". What should happen to it?
- **Radio group** (legend: "What should happen to record 3?"):
  - Let it through
  - Hold it for review
  - Merge it with record 2
- **Button:** Show what arrived. It is disabled until a choice is made, with the visible hint "Pick one first".
- **Live region:** "Four records arrived. Record 3 needs a decision."

### Step 3: What arrived (≈ 30 words + ledger)

- **Heading:** What the staff see
- **Visual:** the staff table, the same design as the case-study reconstruction, with the rows the choice produced. Label: *The staff screen, the part I built*.
- **Ledger** (a real `<table>`, caption "Import result"):

| Choice | Sent | Arrived | Held | In the table twice |
| --- | --- | --- | --- | --- |
| Let it through | 5 | 5 | 0 | 1 |
| Hold it for review | 5 | 4 | 1 | 0 |
| Merge it with record 2 | 5 | 4 (one updated) | 0 | 0 |

- **Trade-off sentence** (one per choice; none is marked wrong):
  - *Let it through:* "Nothing was blocked, but staff now see the same student twice, and the CSE count is split in two."
  - *Hold it for review:* "The table stays clean, but a real record waits until someone checks it. Someone has to own that queue."
  - *Merge it with record 2:* "Clean and complete, if the match is right. Merge two different students and one of them disappears."
- **Button:** Try another choice. It returns to step 2 with the previous choice still selected.
- **Live region:** "[Choice]. [Arrived] arrived, [Held] held, [Twice] shown twice. [Trade-off sentence]"

### Step 4: After (hidden by default, ≈ 85 words)

- **Disclosure button:** The technical version
- **Panel:**

  > In the real portal, records came in through a bulk importer my friend built. I built the staff screens they landed in. This demo shows the check we should have run at import: normalise known variants (CSE, Computer Sci.), match records on a stable ID rather than a name, make retries safe so a failed upload run twice doesn't create duplicates, and compare counts between the sheet and the database. It's the first thing I'd change.

- **Link below it:** How we rebuilt the portal and handed it over →, which goes to `/projects/muj-placement-portal`.

## Static base layer (no JS, reduced motion, print)

The same markup renders all three panels at once, in order: *Five records, one spreadsheet* → *One record doesn't match* → *What the staff see*. In the static layer:

- the ledger shows all three rows;
- the radio group becomes a plain list of the three options, each followed by its trade-off sentence;
- the disclosure becomes a `<details>` element.

Nothing essential depends on motion, hover, WebGL or JavaScript.

## Accessibility contract

- **Patterns** (WAI-ARIA APG; there is no stepper pattern):
  - Button for Send / Show / Try another.
  - Radio Group for the choice: native `<fieldset>`, `<legend>` and `<input type="radio">`.
  - Disclosure (`aria-expanded` and `aria-controls`) for the technical version.
- **Narration:** one `role="status"` region with `aria-live="polite"` and `aria-atomic="true"`, present in the initial markup. It carries the strings above and nothing else.
- **Focus:** after each step, focus moves to that step's heading (`tabIndex={-1}`). Focus never lands on something that is about to disappear.
- **Reduced motion:** cards change state with opacity and colour instead of travelling. The duplicate row is marked with a visible "Twice" label, not colour alone.
- **Targets:** every control is at least 44×44 px, the project's own target (WCAG 2.5.8 AA requires 24×24). No drag, hover or long-press.
- **Placement:** after the hero premise and before the flagship doorway (`07-creativity.md` homepage sequence). It is always skippable, with a visible "Skip to the work" link above it.

## Five-viewer test (Stage 2 gate)

**Recruit:** 5 people who haven't seen the site, including ≥ 2 non-engineers, on their own device. Run the test on the static version first.

**Say only:** "This is a portfolio. Take a look however you'd normally look, and think aloud." Don't explain the piece.

**Afterwards, ask these three pass questions:**

1. "What went wrong with record 3?" Pass: it was a duplicate, or its branch was written differently.
2. "Why did your choice matter?" Pass: any trade-off, e.g. a duplicate in the table, a record waiting, or a risky merge.
3. "What did Dhruv build on this project?" Pass: the staff screens or dashboards, **not** the importer.

**Also note:**

- Time to first interaction.
- Whether they found Work, Resume and Contact without help.
- Every word they stumbled on.

**Gate:** ≥ 4 of 5 pass all three questions. If the gate fails, try the alternative mechanics in `07-creativity.md` before adding any polish.

## Open for the owner (non-blocking)

- Whether a bad import really showed up for all staff at once (if so, the disclosure can say so).
- Whether "stable ID" matches reality: was there a registration number or enrolment ID? If not, the disclosure should say "a unique field".
