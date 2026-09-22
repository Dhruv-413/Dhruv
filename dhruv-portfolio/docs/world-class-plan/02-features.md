# 02 — Features

v2, 22 Sep 2026. v1 asked to build eight things that already exist (see `00-current-state.md`). This version splits **build** from **verify**, and ranks features by whether they serve the central story. The review's point: implementing every listed feature adds polish without making the site memorable.

## Build (ranked)

| # | Feature | Why | Priority | Notes |
| --- | --- | --- | --- | --- |
| 1 | **Signature interaction "What arrives matters"** | The one memorable moment, tied to the real MUJ story | P0 (Stage 1–2) | Spec in `07-creativity.md`. Static three-panel version first |
| 2 | **Flagship case-study doorway** (home + `/projects`) | Real work currently isn't on the homepage at all (CODE `page.tsx:71-73`) | P0 | Content in `06-content.md` |
| 3 | **Two deep flagship studies** with labelled reconstructions | Proof of the work; the review's biggest content gap | P0 | MUJ + one of Crave Connect/EcoHive |
| 4 | **Production-origin guard** | Stops a production build from publishing `localhost` again | P0 | See `03-seo.md`. Small code change |
| 5 | **HTML `/resume` + print stylesheet** | Linkable, readable, printable, accessible alongside the PDF | P2 | Sensible completeness work; must not displace 1–3 |
| 6 | **Privacy notice** (short page) | Documents what the contact form and analytics actually collect and which processors receive it | P2 | Write from real configuration (EmailJS, Vercel). v1's "GDPR gap verified" claim was unestablished and is withdrawn |
| 7 | "How this works" layer on `/github` (shows the GraphQL shape and the `isPrivate` gate) | Engineer-facing depth | P3 | Useful for engineers; won't produce the cross-disciplinary moment (review). Below the main story |
| 8 | Named analytics events (resume, contact success, flagship opens, interaction completion) | Know whether the story works | P3 | **Needs Vercel Pro** (custom events are not on Hobby, PRIMARY). Otherwise use funnel proxies from page views or another privacy-first tool; decide after checking the account plan |

## Verify (already built; don't rebuild)

| Item | Verification task |
| --- | --- |
| Contact form states + `mailto` fallback | Send a real authorised test message; confirm delivery; force a provider failure; confirm message text is preserved and focus is handled |
| Vercel Analytics / Speed Insights | Confirm data arrives in the dashboard for production |
| Certification links (6 × Coursera) | Open each one; confirm it loads, belongs to Dhruv, and matches the displayed title |
| Live regions (GitHub, Career, Skills) | Screen-reader pass (NVDA/VoiceOver): announcement timing and no double announcements, including streaming and error states |
| Keyboard range timelines | Full keyboard, touch and assistive-tech pass, beyond the one ArrowRight step the review checked |
| WebGL capability controls | Real mid-range Android: confirm the weak-device thresholds and fallback quality |

## Deferred until Stages 0–4 pass (review §5)

Sound, Konami code, seasonal colours, console easter egg (it also conflicts with `removeConsole`, CODE `next.config.ts:44`), extra WebGL card effects, decorative live telemetry, command palette.

## Explicitly not doing

- Terminal/CLI-style navigation: common enough among junior portfolios that it reads as generic.
- Visitor counters, badge or achievement systems, location-based personalisation.
- Blog, uses page, newsletter, PWA (no maintenance capacity or use case at this stage).
- Rebuilding anything listed under "Verify".

## Sources

- `00-current-state.md` (code evidence for every "Verify" row)
- `evidence/claims-verified.md` #7 (Vercel custom events are Pro-only)
- Review `08-REVIEW-2026-09-22.md` §2 inventory table and §5 deferral list
