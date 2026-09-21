import type { Level } from "@/lib/github/calendar";

/**
 * The heatmap ramp shared by the ledger and the rhythm grid. Level 0 (nothing that day) is a quiet ground; levels 1-3
 * measure 3.37 / 5.91 / 10.06 (dark) and 3.54 / 6.28 / 11.35 (light) against the page background, all >= 3:1 (OKLab
 * blend, WCAG luminance; the grids have no per-cell text); level 4 is the accent (6.28 dark, 4.77 light). `LEVEL_CLASS` is for HTML swatches, `FILL_CLASS` for the SVG maps.
 */
export const LEVEL_CLASS: Record<Level, string> = {
  0: "bg-foreground/8",
  1: "bg-foreground/45",
  2: "bg-foreground/62",
  3: "bg-foreground/80",
  4: "bg-primary",
};

export const FILL_CLASS: Record<Level, string> = {
  0: "fill-foreground/8",
  1: "fill-foreground/45",
  2: "fill-foreground/62",
  3: "fill-foreground/80",
  4: "fill-primary",
};
