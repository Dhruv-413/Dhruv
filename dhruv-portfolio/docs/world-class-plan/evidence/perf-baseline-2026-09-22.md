# Production performance baseline, 2026-09-22

Measurement only. No application source, config or dependencies were changed.

## Method

| Item | Value |
|---|---|
| Target | Production, https://dhruvgupta.co. Production = `main` @ merge of PR #14 (`9312b17`, 2026-09-21), built by Vercel with Turbopack. The SHA comes from git and was not read from a response header. The chunk paths (`/_next/static/immutable/chunks/…`, `TURBOPACK` global) confirm a Turbopack build. |
| Deployment evidence (supporting, not proof) | The `/` response was a Vercel cache HIT. Its `X-Vercel-Id` timestamp (≈17:24:57 UTC) minus `Age` 113,028 s puts the cached HTML at ≈2026-09-21 10:01 UTC. That is about 25 min after the merge commit (09:36 UTC), which is consistent with the PR #14 deploy and no production deploy since. |
| Categories | The PSI UI always runs all five categories (performance, accessibility, best-practices, SEO, agentic-browsing), not only `category=performance` as the brief asked. The performance category is computed independently of the others. |
| Tool | PageSpeed Insights, i.e. Lighthouse run on Google's servers. **Not** the PSI v5 API; see "How the data was obtained". |
| Strategy | Mobile, 3 runs per route, 18 runs in total, 2026-09-22 17:38–17:53 UTC. Runs were interleaved across routes, so each route's runs are about 4–6 min apart. |
| Lighthouse | 13.5.0 (all 18 runs). Host: HeadlessChrome 153.0.8010.36. |
| Device | Emulated Moto G Power (2022): 412×823 at DPR 1.75, UA Chrome/136 Android 11. |
| Throttling | `throttlingMethod: simulate` (Lantern), RTT 150 ms, 1,638.4 Kbps throughput, CPU slowdown 1.2×. |
| Host CPU | `benchmarkIndex` 396–913 across runs, which is a wide spread. |

**Labelling.** Every headline metric below is **lab data from Lantern simulation on Google's hardware**. That is the same simulation technique as the earlier local runs, on a less contended machine. None of it is "observed" or field data. The only unthrottled measurements are Lighthouse's `observed*` values (`audits.metrics.details.items[0]`). These are the real trace on PSI's fast datacenter link, and they appear in a separate column labelled as such.

### How the data was obtained

1. **The PSI v5 API without a key was blocked.** Every call returned HTTP 429 `RESOURCE_EXHAUSTED`, "Quota exceeded for quota metric 'Queries' and limit 'Queries per day'". That is the shared anonymous daily quota. A control call for `https://example.com/` also got 429, so the block had nothing to do with this site. There were 9 attempts between 17:24 and 17:34 UTC with backoff. The log and error bodies are saved (see Raw files).
2. **Fallback: the pagespeed.web.dev UI, driven headlessly with Playwright.** It runs the same Lighthouse on Google's servers under a separate quota. Each run's report JSON was captured from the UI's own `batchexecute` response (RPC `LsX2he`). The full Lighthouse result is stored unmodified as `.lighthouseResult`, next to the RPC envelope and the UI's text excerpt.
3. **What the fallback file does not contain:** the API's `loadingExperience` and `originLoadingExperience` objects. Field-data status was read from the UI's "Discover what your real users are experiencing" panel instead.
4. **Checks on every run:**
   - `runtimeError`: none.
   - `runWarnings`: none.
   - `finalDisplayedUrl` equals the requested URL, so no redirects.
   - All 18 `fetchTime`s are distinct, so there are no cached duplicates.
5. **Exploratory runs not kept.** Three UI runs were made while developing the capture step and their JSON was not saved:
   - `/` at ≈17:28 UTC: score 73, LCP 9.5 s, TBT 60 ms, CLS 0.
   - `/contact`.
   - `/projects` at 17:32:42 UTC: score 98.

   The ones whose numbers were seen match the kept data. They are disclosed here so that it is clear no runs were selectively dropped.

## Results: median [min–max] of 3 runs, mobile, simulated

| Route | Perf score | LCP (s) | CLS | TBT (ms) | FCP (s) | Speed Index (s) | Total bytes (KiB) | Observed LCP, unthrottled (ms) |
|---|---|---|---|---|---|---|---|---|
| `/` | **74** [63–74] | **9.30** [1.66–9.30] | 0 [0–0] | 56 [43–**4,530**] | 1.05 [0.33–1.20] | 3.32 [1.04–3.54] | 1,733 [1,733–1,797] | 1,276 [454–1,289] |
| `/projects` | 99 [97–100] | 2.18 [0.48–2.55] | 0 | 27 [16–31] | 0.94 [0.28–0.95] | 0.94 [0.32–0.95] | 440 [440–557] | 247 [201–248] |
| `/projects/muj-placement-portal` | 99 [98–100] | 2.18 [0.69–2.33] | 0 | 19 [4–26] | 0.90 [0.31–0.90] | 0.90 [0.53–0.90] | 428 [428–522] | 212 [165–485] |
| `/career` | 98 [98–99] | 2.40 [2.18–2.40] | 0 | 14 [14–32] | 0.96 [0.95–0.98] | 1.27 [1.12–1.61] | 417 [417–417] | 226 [223–278] |
| `/github` | 97 [94–100] | 2.63 [0.70–3.08] | 0 | 37 [21–37] | 1.20 [0.37–1.20] | 1.20 [0.55–2.39] | 424 [424–525] | 479 [293–1,306] |
| `/contact` | 98 [90–99] | 2.48 [2.10–3.30] | 0 | 26 [22–38] | 0.90 [0.90–0.90] | 0.93 [0.91–3.92] | 437 [437–438] | 213 [200–2,346] |

Each column's median was computed independently, so one row's medians can come from different runs. Per-run values are in `_extracted.json`.

**Why the ranges are wide.** In some runs the trace also captured post-load work: Next.js `<Link>` RSC prefetches (`?_rsc=` for /career, /github, /skills, /contact, /projects…) and extra chunks. Those runs have higher byte weight (for example 557 vs 440 KiB on /projects) and a *lower* simulated FCP/LCP. That is a known Lantern behaviour: a different dependency graph produces a different simulation. With n=3, report the median and treat single runs as noise.

## LCP element per route (from `lcp-breakdown-insight`)

Lighthouse 13 has no `largest-contentful-paint-element` audit. The node comes from the insight audits.

| Route | LCP element | Consistency |
|---|---|---|
| `/` | `img` "Pixel-art portrait of Dhruv Gupta" (`div.grid > figure > div > img.absolute`), 380×380 CSS px | 3/3 |
| `/projects` | First project description `span.mt-3` ("A green credit trading platform…") | 3/3 |
| `/projects/muj-placement-portal` | SVG `text.art-fade` in the header figure (2/3); figcaption span "FIG. FROM MANUAL SHEETS TO ONE DATABASE" (1/3) | 2/3 |
| `/career` | `p.t-label > span` "DRAG THE LINE THROUGH THE MONTHS" | 3/3 |
| `/github` | `dd.t-label` "any contribution, public or private" (2/3); `h2#gh-ledger` "LEDGER" (1/3) | 2/3 |
| `/contact` | `form > p.t-label` "EVERYTHING EXCEPT THE TOPIC IS REQUIRED." | 3/3 |

Every route except `/` has a text LCP node, and the whole LCP is element render delay (TTFB 1–18 ms, no resource phase).

## Heaviest requests

All 18 runs were checked. On **`/`** the top 5 are the same in all 3 runs:

| Request | Size (KiB) |
|---|---|
| `/images/portrait.png` | 1,255.7 |
| font `74effe3e….woff2` | 129.0 |
| `chunks/1qsjxrcqzdkl8.js` | 72.1 |
| `chunks/36yo_lhhaaytu.js` | 45.3 |
| font `70bc3e13….woff2` | 40.3 |

On **every other route** the top 4 are the same:

| Request | Size (KiB) |
|---|---|
| font `74effe3e….woff2` | 129.0 |
| `1qsjxrcqzdkl8.js` | 72.1 |
| `36yo_lhhaaytu.js` | 45.3 |
| font `70bc3e13….woff2` | 40.3 |

The #5 request varies:

- `3rv6g138t19dh.js` (29.4 KiB): all /contact runs, plus projects-run3, project-muj-run2 and github-run3. These are the runs whose trace captured more post-load work.
- Otherwise the HTML document (≈20–23 KiB) or `25di0wf5bdkmu.css` (19.9 KiB). The two fonts are 169 KiB combined, the largest shared cost after the portrait.

## Portrait findings (`/`)

- **The portrait is the LCP element: yes, in 3/3 runs.**
- **Transfer size:** 1,285,839–1,285,840 B, i.e. 1,255.7 KiB (resource size 1,285,175 B). That makes it **69.9% / 72.4% / 72.4%** of total byte weight (median **72.4%**).
- **How it is served:** as-is from `/images/portrait.png`, not through `/_next/image`, with `fetchpriority="high"`.
- **Dimensions:**
  - Natural size is **1024×1024** px, read from the PNG IHDR header of the live file.
  - The markup declares `width="64" height="64"`.
  - It renders in a 380×380 CSS px box, which is about 665×665 device px at DPR 1.75.
- **Lighthouse's image-delivery estimate:** savings of 1,232 KiB (1,261,108 B wasted of 1,285,175 B).
- **Discovery is fine:** the request is in the initial HTML, is not lazy-loaded, and has a priority hint.
- **LCP breakdown, unthrottled trace:**

  | Run | TTFB (ms) | Load delay (ms) | Load duration (ms) | Render delay (ms) |
  |---|---|---|---|---|
  | 1 | 2 | 105 | 139 | 1,043 |
  | 2 | 3 | 45 | 63 | 342 |
  | 3 | 5 | 59 | 64 | 1,147 |

- **Interpretation, and the limits of it:**
  - The 9.3 s simulated LCP (runs 1 and 3) is consistent with Lantern modelling the time to move 1.26 MB at 1.64 Mbps (≈6.2 s), plus render delay. On a real slow mobile link, the bytes would matter.
  - Run 2 had the same LCP element but a simulated LCP of only 1.66 s. That is **unexplained**; it may be a different Lantern graph from the longer trace. It is not folded into the attribution above.
  - On PSI's fast link the download takes about 60–140 ms, yet the observed LCP is still about 1.28 s. So element render delay (~1.0–1.15 s) dominates there.
  - The `img` carries a `transition-opacity` class. It is a **hypothesis, not a finding**, that an opacity fade-in or JS-gated reveal causes that render delay. Proving it needs a DevTools Performance trace of the LCP candidate timing against the class or opacity change, or an A/B test with the transition removed.
- **The WebGL hero shows up in 1 of 3 runs.** In run 2, TBT was 4,530 ms, driven by about 20 long tasks (213–326 ms each) from `chunks/3i3yjfgu04s5z.js`. That chunk is a WebGL2 shader and `requestAnimationFrame` module, loaded at about 817 ms. Runs 1 and 3 did not capture it inside the trace window.
  - So the claim that "the WebGL hero is not the problem" holds only for LCP.
  - When it runs on PSI's host, it can dominate TBT. Headless Chrome there probably uses software GL, which a real device would not.
  - This needs its own investigation before anyone acts on it.

## Layout shifts

- **CLS is 0 in all 18 runs.** In all 18 runs, the `layout-shifts` audit is `notApplicable` (no shifts recorded) and `cls-culprits-insight` has an empty item list.
- **PSI listed no shifted elements**, so it named no victims or culprits here.
- **Earlier CLS claims are not reproduced** by this production lab data.
- **Proving any future shift's cause would need one of:**
  - `PerformanceObserver('layout-shift')` entries with `sources[].node` and previous/current rects, time-correlated in a DevTools trace with font swaps, image decode or hydration.
  - An A/B test that removes the suspected cause and shows CLS drop.
- **Why a listed element may be a victim, not the cause:** a listed shifted element is often the thing that moved, not the thing that moved it.
- **Lab CLS covers load only.** Post-load shifts (scroll, interaction) need field data or a scripted trace.

## Field data (CrUX)

**No field data.** The PSI UI showed "No Data" for "Discover what your real users are experiencing" in 17 of 18 runs. In `project-muj-run2` the panel was still loading at capture, so that run is indeterminate. The UI does not show an origin fallback, which suggests there is no origin-level data either. This is consistent with low traffic. It could not be cross-checked against the API's `loadingExperience` / `originLoadingExperience` because the API was quota-blocked.

## Canonical (`http://localhost:3000`)

The live HTML emits `<link rel="canonical" href="http://localhost:3000"/>`. This **does not affect the performance category**, which is computed from the trace alone. Notably, Lighthouse's SEO `canonical` audit **passed** (score 1) in all 18 runs. The live localhost canonical was confirmed only on `/`, and PSI did not flag it there. The defect has to be tracked separately.

## Raw files (gitignored)

All raw files are in `C:/Users/dhruv/OneDrive/Desktop/PROJECT/Dhruv/.playwright-mcp/evidence/psi/`:

- `<route>-run<n>.json` for routes `home`, `projects`, `project-muj`, `career`, `github`, `contact` and n = 1–3. Each file has:
  - `.lighthouseResult`: the full Lighthouse report.
  - `.envelope`: the UI RPC envelope.
  - `.uiTextExcerpt`: the PSI UI text.
  - `.pageUrl`: the PSI report URL.
- `api-attempts.log`, `*-run1.ERROR-429*.json`: the failed API attempts and their error bodies.
- `_extracted.json`: per-run extraction.
- `_extract.js`: the extractor.
- `_cap-*.js`: the Playwright capture snippets.

## Limitations

- **Simulated lab data.** It is not field data and not the real-device experience. Lantern variance is large (see the ranges), and n=3 is small.
- **Not the API.** The UI capture carries the same Lighthouse result, but the API envelope, and with it CrUX, is missing. A reproducible rerun needs a PSI API key. The owner would create one and pass it via an environment variable, never logged. Otherwise, rerun keyless after the daily quota resets (around 07:00 UTC).
- **Test location and host CPU.** PSI runs from Google's region, not Vercel `bom1`, so TTFB is not representative of Indian visitors. Host `benchmarkIndex` varied from 396 to 913.
- **Cached HTML.** The HTML was a Vercel cache HIT with `Age` of about 31 h at the time of measurement, so the served page predates this run. The deployment is inferred as `main@9312b17`.
- **Trace windows differed.** Some runs captured RSC prefetches and the WebGL hero chunk and others did not. This drives the TBT, byte-weight and LCP spread.
