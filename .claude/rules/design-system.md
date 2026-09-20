---
paths:
  - "dhruv-portfolio/src/components/**"
  - "dhruv-portfolio/src/app/**/*.tsx"
  - "dhruv-portfolio/src/app/globals.css"
---

# UI work rules

- Read `dhruv-portfolio/DESIGN.md` before changing visuals. If its "Direction" section still says TO DECIDE, ask the user or
  run the `design-stack` workflow first — don't invent a style per component.
- Colour, radius, and shadow come from the tokens in `globals.css` (oklch variables via `@theme inline`). No hex/rgb literals in
  components (the post-edit hook flags them). Add a token if one is missing, for both `:root` (dark) and `.light`.
- Verify both themes: `<html class="dark">` is the default, `.light` overrides. A change that only looks right in dark is unfinished.
- Motion: reuse variants from `src/lib/animations.ts`; animate `transform`/`opacity` only; never `transition-all`; gate every
  animation with `useReducedMotion()` or `<MotionConfig reducedMotion="user">`. Decorative loops (particles, scan lines) must pause
  off-screen and under reduced motion.
- Interactive elements: visible `focus-visible` ring, ≥44px touch target on mobile, keyboard reachable, real `<button>`/`<a>`.
- Layout must hold at 375 / 768 / 1280 / 1920 px. Use `next/image` with explicit sizes; no layout shift (Core Web Vitals are part of the design).
- After UI changes run `/verify`; for anything visual run `/design-review <route>` (screenshots at 4 widths × 2 themes).
