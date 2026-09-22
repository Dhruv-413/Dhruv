# Reference audit — five personal-portfolio SOTDs

22 Sep 2026. Each site was checked on Awwwards and visited in Playwright on a real GPU at 1536×674 and 390×844. Raw notes, screenshots and scripts: `.playwright-mcp/ref-audit/` (gitignored; `NOTES.txt` holds the raw findings). Page weights are rough byte totals at ~20 s, not benchmarks. Labels: **PUBLISHED** (Awwwards/owner page), **OBSERVED** (seen), **INFERRED**.

Sites 4–5 were found by reading pages 1–12 of Awwwards SOTD (372 winners, ~Sep 2025–Sep 2026) and keeping solo developer/engineer portfolios. Studios, and entries that credit a separate designer, were excluded.

| Site | Score (PUBLISHED) | First screen (OBSERVED) | Signature | Without WebGL (OBSERVED) | Case pages | Weight |
| --- | --- | --- | --- | --- | --- | --- |
| Léo Parpeix (art director; separate developer credited) | SOTD 14 Sep 2026, 7.69 | Loader shows name/role in 3 s; 3D hero at ~8–15 s; no contact on first screen; mobile has no role line | Sculpted 3D studio (craft as decoration) | Blank white. Reduced motion looks identical. Nav links have no `href`; Tab skips them | Metadata + external links, no case studies | 19.6 MB |
| Corentin Bernadou (freelance developer) | SOTD 25 Mar 2026, 7.42 (+ Developer Award) | Name, "Freelance Developer", "Available Oct. 2026", six project links (desktop) | Pixel rulers, live viewport readout, WebGL thumbnail cube: says "developer" instantly | Stuck on "0%" loader, though the text is in the DOM | Side rail (work, one line, focus, year) + 5 media frames; no decisions or results | 3.6 MB |
| Bruno Simon | Live Jan 2026 entry 8.11 (the 8.04 was the 2019 site) | ~25 s to "Click to start"; no text, name or role; mobile hint clipped | Drive a car | Still rendered (INFERRED: WebGPU) | Not reached in the time available | 7.5–15 MB |
| **Edoardo Lunardi** (senior frontend dev), **closest benchmark** | SOTD 22 Nov 2025, 7.18 | "About" window with name, "Creative Web Engineer", clients, availability, email, over a dithered portrait, on desktop **and** mobile | Desktop-OS windows + keyboard shortcuts (E/T/K) | **Only the portrait disappears; all content remains.** Only site with reduced-motion code | Credits table (client / design by others / development by him / year / stack) + screenshots + one paragraph; decisions in long technical blog posts | 11.9 MB (mostly media) |
| Kris Temmerman (graphics developer) | SOTD 20 Mar 2026, 7.32 | Canvas only; role appears ~14 s; portrait phone told "Turn your Device" | Papercraft game | Still rendered (INFERRED: WebGPU) | None readable | 8.4 MB |

## Patterns

1. **Identity before spectacle:** name and role appear during or before loading on the stronger informational sites (Léo, Corentin, Edoardo). The game sites delay identity by 14–25 s.
2. **Contact and availability on the first screen:** Corentin and Edoardo.
3. **Role credits separate the owner's work from the team's:** Edoardo's credits table; Léo's team, agency and roles.
4. **Case pages are thin everywhere:** metadata plus visuals. Engineering reasoning, when it exists at all, lives in long technical posts (Edoardo). **This is the open gap a data engineer can own.**
5. **Signature interactions that point at the job:** Corentin's rulers and readout, Edoardo's OS and shortcuts say "engineer" (INFERRED reading).
6. **Accessibility is the weakest scored area** (PUBLISHED developer sub-scores: 6.40–7.00 for all five; markup 6.00 for Kris). There is room to win points here.
7. **Weight varies ~5×** (3.6–19.6 MB). The lightest site still won.

## Anti-patterns seen

- Content already in the DOM, yet the page shows nothing without WebGL (Léo, Corentin).
- Canvas-only pages with nothing readable for screen readers or search; forced landscape on mobile (Kris; Bruno's clipped hint).
- Navigation that isn't real links, so Tab skips it (Léo).

## Transferable lessons

1. First screen = name, role, availability and contact as **real page text**; the portrait is a layer that can disappear without loss (Edoardo).
2. A **credits table** on every project, plus a genuine technical write-up behind the flagships.
3. The signature interaction should be **an instrument, not a world**: understandable in ~10 s, works without WebGL, respects reduced motion.
