import type { CSSProperties } from "react";
import { FigureFrame } from "./FigureFrame";

export type Lane = "vm" | "fn" | "st";

const VMS = 8;
const FUNCTIONS = 8;
const BLOCKS = 16;

const SPACING = { letterSpacing: "0.08em" } as const;
const LABEL = "fill-muted-foreground font-mono text-[12.5px] uppercase";
const VALUE = "fill-foreground font-mono text-[12.5px] uppercase";

function mood(load: number): string {
  if (load < 20) return "Quiet";
  if (load < 60) return "Steady";
  if (load < 85) return "Busy";
  return "Spike";
}

/**
 * Azure, as one slider: drag the traffic and three services react. The VM scale set adds or removes machines (never
 * fewer than one), Functions run only while something is triggering them (zero at zero), storage fills as data comes
 * in. An illustration of how the services behave, not real numbers. `focus` dims the other two lanes (picked from the
 * skill chips). Presentational: the state and the one-time nudge on scroll live in SkillsBento; the squares only
 * change opacity and scale.
 */
export function AzureFigure({
  load,
  onChange,
  focus,
  ready,
}: {
  load: number;
  onChange: (value: number) => void;
  focus: Lane | null;
  /** False until the figure is near the viewport: the frame and an empty SVG (same height) render, the squares do not. */
  ready: boolean;
}) {
  const vms = Math.max(1, Math.ceil((load / 100) * VMS));
  const running = Math.round((load / 100) * FUNCTIONS);
  const written = Math.round((load / 100) * BLOCKS);

  return (
    <div data-focus={focus ?? undefined}>
      <FigureFrame caption="Fig. Traffic, three services" hint="Drag the slider">
        <svg viewBox="0 0 400 290" className="block w-full" aria-hidden="true" focusable="false">
          {ready ? (
            <>
              <g className="lane lane-vm">
                <text x={16} y={24} className={LABEL} style={SPACING}>
                  VM scale set
                </text>
                <text x={384} y={24} textAnchor="end" className={VALUE} style={SPACING}>
                  {vms} of {VMS} machines
                </text>
                {Array.from({ length: VMS }, (_, i) => (
                  <g key={i}>
                    <rect x={16 + i * 46} y={36} width={36} height={36} className="fill-none stroke-foreground/30" strokeDasharray="3 3" />
                    <rect
                      x={16 + i * 46}
                      y={36}
                      width={36}
                      height={36}
                      className="az fill-primary"
                      data-on={i < vms}
                      style={{ "--k": i } as CSSProperties}
                    />
                  </g>
                ))}
              </g>

              <line x1={16} x2={384} y1={98} y2={98} className="stroke-border" />

              <g className="lane lane-fn">
                <text x={16} y={122} className={LABEL} style={SPACING}>
                  Functions
                </text>
                <text x={384} y={122} textAnchor="end" className={VALUE} style={SPACING}>
                  {running} running
                </text>
                {Array.from({ length: FUNCTIONS }, (_, i) => (
                  <g key={i}>
                    <rect x={16 + i * 46} y={134} width={36} height={36} className="fill-none stroke-foreground/30" strokeDasharray="3 3" />
                    <g className="az" data-on={i < running} style={{ "--k": i } as CSSProperties}>
                      <rect x={16 + i * 46} y={134} width={36} height={36} className="fill-none stroke-foreground" strokeWidth={1.5} />
                      <rect x={16 + i * 46 + 12} y={146} width={12} height={12} className="fill-primary" />
                    </g>
                  </g>
                ))}
              </g>

              <line x1={16} x2={384} y1={196} y2={196} className="stroke-border" />

              <g className="lane lane-st">
                <text x={16} y={220} className={LABEL} style={SPACING}>
                  Storage
                </text>
                <text x={384} y={220} textAnchor="end" className={VALUE} style={SPACING}>
                  {written} of {BLOCKS} blocks
                </text>
                {Array.from({ length: BLOCKS }, (_, i) => (
                  <g key={i}>
                    <rect x={16 + i * 22} y={232} width={18} height={40} className="fill-none stroke-foreground/30" strokeDasharray="3 3" />
                    <rect
                      x={16 + i * 22}
                      y={232}
                      width={18}
                      height={40}
                      className="az fill-foreground/75"
                      data-on={i < written}
                      style={{ "--k": i } as CSSProperties}
                    />
                  </g>
                ))}
              </g>
            </>
          ) : null}
        </svg>

        <label className="t-label flex items-center gap-3 border-t border-border px-4 text-muted-foreground">
          <span className="shrink-0">Traffic</span>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={load}
            aria-label="Traffic on the app"
            aria-valuetext={`${mood(load)}: ${vms} of ${VMS} machines, ${running} functions running, ${written} of ${BLOCKS} storage blocks written`}
            onChange={(event) => onChange(Number(event.target.value))}
            className="h-11 min-w-0 flex-1 cursor-pointer accent-primary"
          />
          <span className="w-14 shrink-0 text-right text-foreground">{mood(load)}</span>
        </label>
      </FigureFrame>
    </div>
  );
}
