# 05 — Usability and accessibility

v2, 22 Sep 2026. Most of v1's "build" items already exist (live regions, keyboard range inputs, WebGL capability controls; see `00-current-state.md`). This version turns them into **evidence-based verification**, targets the project's own contract (**WCAG 2.2 AA**, DESIGN.md §3), and adds the one genuinely new surface: the signature interaction.

## P0 — First screen tells the story at real viewport heights

The review observed at **1536×674**: the name and portrait dominate; the introduction and the Work/Resume/Contact actions fall **below the fold**. At 390 px mobile the actions are usable. The CTAs exist in code (CODE `HeroSection.tsx:104-120`), so the problem is composition, not absence. The design fix is in `01-design.md`. The usability requirement is: **at 1366×768, 1536×674, 1440×900 and 390×844, a stranger can name who this is, what he does, and reach Work or Contact without scrolling.**

## P1 — Signature interaction accessibility (new)

Spec in `07-creativity.md`. Built from existing APG patterns (Button, Radio Group, Disclosure; there is no APG stepper pattern), one polite atomic status region present at load, focus moved to each step heading, a static three-panel version as the base layer, and tap-only controls. Needs its own screen-reader and keyboard test before shipping.

## P1 — Verify what exists

| Area | Check | Notes |
| --- | --- | --- |
| Live regions | NVDA + VoiceOver: announcements fire once, at the right time, including streaming, empty and error states on `/github` | `GitHubLedger.tsx` notes the slider speaks its own `aria-valuetext` to avoid double announcements. Confirm that in practice |
| Range timelines | Arrow, Page, Home/End keys; touch drag; zoom to 200% and reflow at 320 px; visible focus | `CareerTrack.tsx:238`, `GitHubLedger.tsx:301`, `AzureFigure.tsx:124` |
| Contact form | Error summary and focus (review: works); **text preserved after a provider failure**; success receipt; focus restoration | Authorised real send required |
| Reduced motion | Every motion path, including the portrait canvas/WebGL, has a *designed* equivalent (opacity/colour change, not just removal) | The review's reduced-motion light sample was a spot check only |
| Menus and dialogs | Escape closes (review: works); focus returns to the trigger; no focus trap on the canvas | |
| Theme | Both themes; the preference persists; contrast in both | DESIGN.md contract |

## P1 — Touch is defined explicitly

Long-press is **not** a universal hover substitute (review). Rule: no information or action is available only on hover. Every hover reveal has a visible, tappable equivalent. Target size: **WCAG 2.2 AA 2.5.8 requires 24×24 CSS px** (with exceptions); **44×44** is the AAA 2.5.5 level and this project's design target (DESIGN.md and `.claude/rules/design-system.md`). Treat 44 as a goal, not the legal minimum (PRIMARY, see `evidence/claims-verified.md` #13).

## P2 — Loading, empty and failure states are part of the design

Each route has a `loading.tsx` skeleton (CODE). Review each for tone and layout stability. Design the GitHub-unavailable state and the contact-failure state as finished compositions (review §6 visual checklist). Humour, if any, belongs in expected-empty states only, never in genuine error states.

## P2 — Testing methodology

- **Automated:** axe-core run against every route in both themes as a repeatable script (an MCP install alone is not a regression suite; review). Keep reports.
- **Manual:** NVDA (Windows) and VoiceOver (iOS/macOS) passes on home, the interaction, one flagship study, `/github`, `/contact`.
- **Devices:** Chrome, Firefox, Safari/iOS, and one real mid-range Android. Test with WebGL disabled, a weak network, back navigation, zoom/reflow, and theme persistence.
- **People:** the five-viewer comprehension test (`07-creativity.md`) doubles as the usability test for the first screen.

## Sources

- W3C WCAG 2.2 SC 2.5.8 / 2.5.5 / 2.3.3; WAI-ARIA APG patterns index; MDN ARIA live regions
- Review `08-REVIEW-2026-09-22.md` §2 inventory, §3 Usability row, §6 Interaction criteria
