import type { CSSProperties } from "react";
import { hashSeed, mulberry32 } from "@/lib/pattern";
import { FigureFrame } from "./FigureFrame";

export type Mode = "lake" | "warehouse" | "lakehouse" | "spark";

const TILES = 24;
const W = 24;
const H = 14;
const rand = mulberry32(hashSeed("lakehouse-figure"));
const between = (from: number, to: number) => from + rand() * (to - from);

// Each record has four homes, one per mode. The first twelve are the ones the lakehouse shows as tables.
const tiles = Array.from({ length: TILES }, (_, i) => {
  const col = i % 6;
  const row = Math.floor(i / 6);
  const tidy = i < 12;
  return {
    i,
    col,
    lx: between(28, 348 - W),
    ly: between(56, 262 - H),
    lr: between(-38, 38),
    wx: 46 + col * 56,
    wy: 80 + row * 55,
    hx: tidy ? 46 + col * 56 : between(32, 344 - W),
    hy: tidy ? 68 + row * 32 : between(186, 262 - H),
    hr: tidy ? 0 : between(-34, 34),
    sx: 74 + col * 46,
    sy: 62 + row * 58,
  };
});

const LABEL = { letterSpacing: "0.08em" } as const;

const CAPTION: Record<Mode, string> = {
  lake: "Data lake: 24 records scattered as raw files of any shape.",
  warehouse: "Data warehouse: the same 24 records in tidy rows and fixed columns.",
  lakehouse: "Lakehouse: twelve records as tables on top, twelve as raw files below, in one system.",
  spark: "Apache Spark: the 24 records split across four workers, processed in parallel.",
};

/**
 * Databricks: the same 24 records held four ways. The mode (picked from the skill chips) moves them: scattered raw
 * files (lake), tidy rows (warehouse), tables on top of raw files (lakehouse), or four lanes that finish together
 * (Spark). The mode lives on the wrapper as `data-mode` and the records move with CSS transitions. Presentational:
 * the state and the one-time tidy-up on scroll live in SkillsBento. `ready` is false until the figure is near the
 * viewport: the frame and an empty SVG (same height) render, the 24 records and frames do not, which keeps ~150
 * elements out of hydration. An illustration of the ideas, not project data.
 */
export function LakehouseFigure({ mode, ready }: { mode: Mode; ready: boolean }) {
  return (
    <div data-mode={mode}>
      <p className="sr-only">{CAPTION[mode]}</p>
      <FigureFrame caption="Fig. 24 records, four ways" hint="Pick a chip">
        <svg viewBox="0 0 400 290" className="block w-full" aria-hidden="true" focusable="false">
          {ready ? (
            <>
          <g className="fill-muted-foreground font-mono text-[12px] uppercase" style={LABEL}>
            <text x={16} y={26} className="lk-fade m-lake">Cloud storage: anything goes in</text>
            <text x={16} y={26} className="lk-fade m-warehouse">Warehouse: fixed columns, tidy rows</text>
            <text x={16} y={26} className="lk-fade m-lakehouse">Lakehouse: tables on top of raw files</text>
            <text x={16} y={26} className="lk-fade m-spark">Spark: one job, four workers</text>
          </g>

          {/* lake: one loose container */}
          <rect x={16} y={40} width={368} height={240} className="lk-fade m-lake fill-none stroke-foreground/30" strokeDasharray="3 3" />

          {/* warehouse: a table with a header row and row lines */}
          <g className="lk-fade m-warehouse">
            <rect x={16} y={40} width={368} height={240} className="fill-none stroke-foreground/70" strokeWidth={1.5} />
            <rect x={16} y={40} width={368} height={20} className="fill-foreground" />
            <text x={26} y={54} className="fill-background font-mono text-[11px] uppercase" style={LABEL}>
              Records
            </text>
            {[0, 1, 2].map((r) => (
              <line key={r} x1={16} x2={384} y1={115 + r * 55} y2={115 + r * 55} className="stroke-border" />
            ))}
          </g>

          {/* lakehouse: tables above, raw files below, one arrow between */}
          <g className="lk-fade m-lakehouse">
            <rect x={16} y={40} width={368} height={98} className="fill-none stroke-foreground/70" strokeWidth={1.5} />
            <rect x={16} y={40} width={368} height={20} className="fill-foreground" />
            <text x={26} y={54} className="fill-background font-mono text-[11px] uppercase" style={LABEL}>
              Tables
            </text>
            <rect x={16} y={176} width={368} height={104} className="fill-none stroke-foreground/30" strokeDasharray="3 3" />
            <text x={26} y={170} className="fill-muted-foreground font-mono text-[11px] uppercase" style={LABEL}>
              Raw files
            </text>
            <path d="M 200 172 V 144 M 194 152 L 200 144 L 206 152" className="fill-none stroke-foreground" strokeWidth={1.5} />
            <text x={214} y={162} className="fill-foreground font-mono text-[11px] uppercase" style={LABEL}>
              One system
            </text>
          </g>

          {/* spark: four lanes */}
          <g className="lk-fade m-spark">
            {[0, 1, 2, 3].map((lane) => (
              <g key={lane}>
                <rect x={56} y={48 + lane * 58} width={328} height={42} className="fill-none stroke-foreground/30" />
                <text x={16} y={73 + lane * 58} className="fill-muted-foreground font-mono text-[11px] uppercase">
                  W{lane + 1}
                </text>
              </g>
            ))}
          </g>

          {tiles.map((tile) => (
            <g
              key={tile.i}
              className="lk"
              style={
                {
                  "--i": tile.i,
                  "--c": tile.col,
                  "--lx": `${tile.lx.toFixed(1)}px`,
                  "--ly": `${tile.ly.toFixed(1)}px`,
                  "--lr": `${tile.lr.toFixed(1)}deg`,
                  "--wx": `${tile.wx}px`,
                  "--wy": `${tile.wy}px`,
                  "--hx": `${tile.hx.toFixed(1)}px`,
                  "--hy": `${tile.hy.toFixed(1)}px`,
                  "--hr": `${tile.hr.toFixed(1)}deg`,
                  "--sx": `${tile.sx}px`,
                  "--sy": `${tile.sy}px`,
                } as CSSProperties
              }
            >
              <rect width={W} height={H} className="fill-card stroke-foreground/60" />
              <line x1={4} x2={15} y1={5} y2={5} className="stroke-foreground/35" />
              <line x1={4} x2={10} y1={9} y2={9} className="stroke-foreground/35" />
              <rect width={W} height={H} className="lk-done fill-primary" />
            </g>
          ))}
            </>
          ) : null}
        </svg>
      </FigureFrame>
    </div>
  );
}
