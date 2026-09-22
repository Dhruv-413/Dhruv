# 04 — Performance

v2, 22 Sep 2026. v1 rested on local Lantern-simulated runs on a CPU-contended Windows machine with a webpack-fallback build, and then mislabelled those numbers as "observed". Several of its claims do not hold in production. This version is built on a **reproducible production baseline**: `evidence/perf-baseline-2026-09-22.md` (PSI / Lighthouse 13.5.0, Moto G Power emulation, simulated throttling, 3 runs per route, production = `main` @ `9312b17`, raw JSON kept in `.playwright-mcp/evidence/psi/`).

## What production actually shows

Median of 3 runs, mobile, **simulated** lab values (full ranges and FCP/SI in the evidence file):

| Route | Score | LCP | TBT | CLS | Bytes | LCP element |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 74 | 9.30 s | 56 ms (one run 4,530) | 0 | 1,733 KiB | `portrait.png` (3/3 runs) |
| `/projects` | 99 | 2.18 s | 27 ms | 0 | 440 KiB | text |
| `/projects/muj-placement-portal` | 99 | 2.18 s | 19 ms | 0 | 428 KiB | text |
| `/career` | 98 | 2.40 s | 14 ms | 0 | 417 KiB | text |
| `/github` | 97 | 2.63 s | 37 ms | 0 | 424 KiB | text |
| `/contact` | 98 | 2.48 s | 26 ms | 0 | 437 KiB | text |

No CrUX field data exists (not enough traffic). Every number here is lab data.

## Corrections to v1

| v1 claim | Production evidence |
| --- | --- |
| Portrait is "100% of CLS", CLS 0.13–0.17 | **CLS = 0 in all 18 runs**; no shifted elements listed |
| `/career` 6.3 s, `/github` 7.9 s LCP; 1.7 s / 2.3 s "single long tasks" | 2.40 s / 2.63 s simulated LCP; TBT 14 / 37 ms. The v1 figures came from the contended local machine |
| LCP "observed, not simulated" | Headline numbers are simulated. The unthrottled observed LCP on `/` is ~1.28 s |
| WebGL "never the problem" | True for LCP, but in 1/3 runs the shader chunk loaded inside the window and produced ~20 long tasks (TBT 4,530 ms). **Needs its own investigation** |
| "256×256 is the display size" | Renders ~380 CSS px (mobile emulation) and ~697 CSS px (1536 desktop, per review). Choose resolution by visual comparison (`01-design.md`) |

## P0 — Homepage portrait

MEASURED: 1,285,839 B transferred, **72.4% of `/`'s bytes**, served unoptimised (`unoptimized` + `priority` + `fetchPriority="high"`), markup says 64×64. Lighthouse estimates 1,232 KiB of savings. The simulated 9.3 s LCP matches the time to move 1.26 MB at the 1.64 Mbps throttle.

**Fix:** serve the same-looking image at a fraction of the size (a 768 px WebP q82 is 45,676 B in testing; see `01-design.md`). Keep the original as the master.

**Expectation (HYPOTHESIS until re-measured):** this should remove most of the *simulated* slow-network LCP on `/`. It will **not** by itself fix the ~1.0–1.15 s *render delay* seen in the unthrottled trace (the download takes only 60–140 ms). The suspected cause of that delay is the `transition-opacity` fade-in on the static frame. That is **unproven**; confirm with a DevTools performance trace, or an A/B test with the fade removed, before changing the design.

## P1 — WebGL chunk timing on `/`

In one of three runs the shader chunk (`3i3yjfgu04s5z.js`) executed inside the measurement window: ~20 long tasks, TBT 4.5 s. Arming is idle/touch/timeout-based (CODE `PortraitStage.tsx`), and the desktop idle callback has a timeout (review). **Investigate before changing anything:** record traces on a mid-range device and see when the chunk arms and how long compile/upload tasks take. Then decide whether to split shader compilation, defer arming further, or reduce first-frame work. Measure INP-relevant interaction latency separately. TBT is a lab proxy, not INP.

## P2 — Other routes: close to target, text-bound

Other routes score 97–99, with LCP 2.2–2.6 s (text). They are within Google's field "good" threshold of ≤ 2.5 s at p75 for most routes. The project's own aspirational target is ≤ 2.0 s (DESIGN.md). Next steps, only after P0/P1:

- Look at the render-blocking global stylesheet and font loading for the text LCP.
- Measure the `/contact` form chunk and its viewport prefetch from other routes. **Measure the trade-off** (a faster later navigation to `/contact` vs bytes on other pages) rather than assuming removal is better (review).

## P2 — Hygiene (not performance)

Seven packages have 0 imports (see `00-current-state.md`). They cost install weight, not shipped bytes, because tree-shaking removes them. Pruning them and correcting the stale app `CLAUDE.md` / `.claude/rules/design-system.md` descriptions (Inter, framer-motion, `animations.ts`) is a documentation and maintenance task, and needs owner sign-off since it touches `package.json`.

## Measurement protocol (use for every before/after)

- **Target:** the production (or preview) deployment. Local Turbopack builds crash on this machine (`0xc0000142`); treat that as an environment issue unless reproduced elsewhere.
- **Runs:** at least 3 per route per condition. Report median and range; keep the raw JSON/trace with URL, commit/deployment, tool version, device, throttling and timestamp.
- **Labels:** keep *simulated* (Lantern) and *observed* (unthrottled trace) values in separate columns.
- **Tools:** the PSI API with an API key (keyless calls hit the daily quota); Lighthouse CLI on an idle machine; a DevTools trace for causes.
- **Targets:** DESIGN.md aspirational (LCP ≤ 2.0 s, CLS ≤ 0.05, INP ≤ 150 ms, mobile score ≥ 95) and Google field "good" (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75). Don't report TBT as INP.

## Sources

- `evidence/perf-baseline-2026-09-22.md` (method, results, raw file index, limitations)
- `evidence/claims-verified.md` #10–12 (CWV thresholds; CLS victims vs causes; main-thread breakdown is aggregate)
- Review `08-REVIEW-2026-09-22.md` §2 P1 performance corrections
