# External claims — verification log

Fetched from primary sources on 22 Sep 2026. Only claims marked CONFIRMED (or cited with their stated nuance) are used elsewhere in this plan.

| # | Claim | Verdict | Primary quote | Source |
| --- | --- | --- | --- | --- |
| 1 | Honorable Mention needs jury ≥ 6.5 **and** user score ≥ 6.5 | CONFIRMED | "HMs are awarded to sites that are scored 6.5 or more from the jury." FAQ: "the score from the JURY needs to be 6.5 or higher, same as the score from the USES [sic] (Chief, Tribe, Pro, International accounts)." | awwwards.com/about-evaluation · awwwards.com/faqs |
| 2 | SOTD is competitive; eligible for up to 3 months after approval | CONFIRMED | "not everyone who deserves a SOTD will win one." "Each site has up to 3 months since approved to win SOTD." | same |
| 3 | Developer Award: SOTD winners sent to developer jury, needs > 7 | CONFIRMED | "if the site is scored higher than a 7 it will be given a Developer Award." | awwwards.com/about-evaluation |
| 4 | Awwwards pricing | CONFIRMED with correction | "$65 per website"; "Standard Submission + User Pro … $165 per year". The $165 option is **one submission + a Pro membership**, not a multi-submission bundle | awwwards.com/submit |
| 5 | CSS Design Awards $50 | CONFIRMED | "Submit A Site $50 (USD) … Includes entry into 8 awards plus Designer of the Year" | cssdesignawards.com/submit |
| 6a | Land-book free | CONFIRMED | "Landbook does not charge any money for submission." | land-book.com/submission-guidelines |
| 6b | One Page Love | PARTLY | No fee shown, but "Not accepted … Portfolios with links to separate project pages." **This multi-route site does not qualify.** | onepagelove.com/submit |
| 6c | Godly | NOT A CHANNEL | `godly.website/submit` redirects to recent.design; no form found | — |
| 6d | Muzli | PARTLY | "every Muzli user gets one free nomination … Muzli PRO users get 3 nominations within a rolling month"; needs a me.muz.li profile | medium.muz.li/how-to-get-featured-on-muzli |
| 6e | Siteinspire free | CONFIRMED | "we currently do not accept paid-for or sponsored website submissions. All featured sites are selected purely on merit." (account likely required; submit page returned 429) | siteinspire.com/sponsorship |
| 6f | Lapa Ninja | EMAIL ONLY | "email the team at `hi@lapa.ninja`"; no fee found | lapa.ninja/about |
| 7 | Vercel custom analytics events: Pro/Enterprise only | CONFIRMED | Pricing row "Custom Events: – (Hobby) · Included (Pro)" | vercel.com/docs/analytics/limits-and-pricing |
| 8 | JetBrains Mono has variable builds | CONFIRMED | `fonts/variable/JetBrainsMono[wght].ttf` (v2.304) | github.com/JetBrains/JetBrainsMono |
| 9 | ProfilePage covers a personal About page | CONFIRMED | "An 'About Me' page on a blog site" | developers.google.com/search/docs/appearance/structured-data/profile-page |
| 10 | CWV "good": LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75 | CONFIRMED | "a good threshold to measure is the 75th percentile of page loads" | web.dev/articles/vitals |
| 11 | Shifted elements may be victims, not causes | CONFIRMED | "often these are the ones impacted rather than the elements causing the CLS." | web.dev/articles/optimize-cls |
| 12 | `mainthread-work-breakdown` is aggregate time by category | CONFIRMED (the "not single long tasks" part is inferred from the definition) | "a breakdown of where CPU time was spent" | developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown |
| 13 | WCAG 2.2 AA target size is 24×24; 44×44 is AAA | CONFIRMED | 2.5.8 "at least 24 by 24 CSS pixels"; 2.5.5 "at least 44 by 44" | w3.org/WAI/WCAG22/Understanding/target-size-minimum |
| 14 | Next.js noindexes not-found | CONFIRMED with nuance | Injects noindex for 404s; **streamed** not-found returns HTTP 200 with the noindex meta. Call `notFound()` before streaming if a real 404 status matters | nextjs.org/docs/app/api-reference/file-conventions/not-found |

Also verified in-session (22 Sep): live site canonical/og/robots/sitemap = `http://localhost:3000` (`curl`); old vercel.app alias → 302 to Vercel SSO.
