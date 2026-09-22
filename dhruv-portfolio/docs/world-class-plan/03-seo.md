# 03 — SEO and sharing

v2, 22 Sep 2026. v1's headline diagnosis ("vercel.app is a live indexable duplicate") was **wrong**: the old alias is behind Vercel SSO. The real defect is worse and simpler.

## P0 — Production publishes `localhost`

LIVE (`curl https://dhruvgupta.co`, 22 Sep 2026):

| Output | Current value |
| --- | --- |
| `<link rel="canonical">` | `http://localhost:3000` |
| `og:url` | `http://localhost:3000` |
| `og:image` | `http://localhost:3000/opengraph-image?…` |
| robots.txt `Host` / `Sitemap` | `http://localhost:3000`, `…/sitemap.xml` |
| sitemap.xml | every `<loc>` on `localhost:3000` |

Cause: `NEXT_PUBLIC_SITE_URL` is absent or empty in the production build, so the fallback in CODE `lib/constants.ts:2` is used. (On 21 Sep the value was the old vercel.app address; it has since been lost.)

**Fix (in order):**
1. **Owner:** in Vercel → Project → Settings → Environment Variables, set `NEXT_PUBLIC_SITE_URL=https://dhruvgupta.co` (no trailing slash) for **Production**, then redeploy. `NEXT_PUBLIC_*` values are inlined at build time, so a redeploy is required.
2. **Code guard:** fail the production build, or at least refuse the localhost fallback, when the origin is missing or not `https://`, so this can't recur silently.
3. **Check every route's rendered output** after deploy (canonical, `og:url`, `og:image`, robots, sitemap), and fetch each OG image to confirm it returns a valid PNG.
4. **Search Console:** confirm the domain property, submit `https://dhruvgupta.co/sitemap.xml`, and use URL Inspection to see which canonical Google *selected*. Declared canonicals are signals, not proof (Google canonicalisation guidance). Record this status separately from "the source is correct".
5. **Social caches:** re-scrape with Facebook Sharing Debugger and LinkedIn Post Inspector. X's old card validator is gone; check X by composing a post.

## P1 — Keep and validate the existing structured data (don't add duplicates)

Already emitted (CODE): Person, WebSite, ProfilePage, BreadcrumbList, ContactPage, ItemList, SoftwareApplication and others. Tasks:

- Validate with Google's Rich Results Test and the Schema.org validator **after** the origin fix, since every `@id`/`url` currently inherits localhost.
- Align `jobTitle` and descriptions with the single positioning line (`06-content.md`).
- Label the MUJ metrics as estimates in any structured data that repeats them.
- ProfilePage is valid for a personal About page (PRIMARY, Google's own example). Keep it, but expect no guaranteed rich result. v1 wrongly said to skip it.
- Make no claims about guaranteed benefits in search or AI answers.

## P2 — Realistic search goals

- **Name searches:** a personal domain can rank *alongside* LinkedIn and GitHub. Its advantage is the controllable title, description and schema. HYPOTHESIS, not a promise.
- **Skill-keyword searches** ("Azure Databricks engineer portfolio"): a stretch goal only.
- **Core Web Vitals** matter to Google mainly as a page-experience signal. Fix them for visitors (`04-performance.md`), not as an SEO lever.
- **The real lever:** the two flagship case studies. Substantive, citable write-ups are what earn links. Mirror them as technical posts later (Stage 5).

## P2 — Not-found status

Next.js adds `noindex` to not-found responses. A **streamed** not-found returns HTTP 200 with the `noindex` meta (PRIMARY). If a true 404 status matters for crawlers or monitoring, call `notFound()` before any streaming boundary. Verify the current `/projects/[id]` behaviour for unknown ids.

## Sources

- Google canonicalisation: developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google ProfilePage: developers.google.com/search/docs/appearance/structured-data/profile-page
- `evidence/claims-verified.md` #9, #14
- Review `08-REVIEW-2026-09-22.md` §2 P0
