# Five-viewer test sheet (Stage 2 gate)

Print this, or keep it open on your phone. The Stage 2 gate passes when **at least 4 of 5** viewers pass all three questions.

## Before the sessions

1. In Vercel, go to Settings → Deployment Protection and turn protection **off** for Preview deployments, so testers don't need a Vercel login.
2. Push `redesign`, then open its preview URL logged out (in a private window) to confirm it loads.
3. Send each tester the preview URL, or hand them your device with it already open on the home page.

## Recruit

- 5 people who have **never seen the site**.
- **At least 2 non-engineers**: parents, friends from other fields, a recruiter.
- A mix of phone and laptop, on their own device if possible.
- One at a time. No group sessions: people copy each other.

## Say only this

> "This is a portfolio. Look at it however you normally would, and think out loud. I won't help. Tell me when you're done."

**Then stay silent.** Don't point at the demo and don't explain anything. If they ask what to do, say "whatever you'd normally do."

## While they browse, note

| # | Device | Seconds until they first touched the demo (or "never") | Found Work? | Found Resume? | Found Contact? | Words they stumbled on |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |

## Afterwards, ask these three questions (word for word)

| # | Q1: "What went wrong with record 3?" | Q2: "Why did your choice matter?" | Q3: "What did Dhruv build on that project?" | Pass all 3? |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

**Scoring:**

- **Q1 passes** if they say it's a duplicate, or that the branch was written differently.
- **Q2 passes** if they name any consequence: the same student shows twice, a record waits, or a merge could lose someone.
- **Q3 passes** if they say **the staff screens or dashboards** (what the staff see). If they say "the database" or "the importer", it **fails**: that was his friend.
- If they never tried the demo, ask all three questions anyway and mark Q1 and Q2 "didn't try". That's a finding too.

## Then

- **4 or 5 pass:** Stage 2 is done. Send me the sheet, and Stage 3 builds the animated version on top.
- **3 or fewer pass:** send me the sheet as it is. We change the mechanic before adding any polish (alternatives are in `07-creativity.md`), and test again with new people.
