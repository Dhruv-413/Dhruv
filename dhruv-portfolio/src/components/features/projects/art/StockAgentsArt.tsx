import type { CSSProperties } from "react";
import { hashSeed, mulberry32 } from "@/lib/pattern";
import { cn } from "@/lib/utils";

const HUB = { x: 200, y: 150 };
const AGENTS = ["Ticker", "Price", "News", "Change", "Analysis"] as const;
const SOURCES = ["Finnhub", "Alpha Vantage", "Twelve Data", "Marketaux", "Yahoo Finance"] as const;

const nodes = AGENTS.map((label, k) => {
  const angle = -Math.PI / 2 + (k * 2 * Math.PI) / AGENTS.length;
  return { label, k, x: HUB.x + 138 * Math.cos(angle), y: HUB.y + 96 * Math.sin(angle) };
});

// A seeded random walk for the little candlestick strip: decoration, not data.
const walk = mulberry32(hashSeed("stock-analysis-candles"));
let price = 300;
const candles = Array.from({ length: 24 }, (_, i) => {
  const open = price;
  const close = open + (walk() - 0.5) * 22;
  price = close;
  const high = Math.max(open, close) + walk() * 8;
  const low = Math.min(open, close) - walk() * 8;
  return { x: 22 + i * 15.6, open, close, high, low };
});
const minP = Math.min(...candles.map((c) => c.low));
const maxP = Math.max(...candles.map((c) => c.high));
const scaleY = (v: number) => 322 - ((v - minP) / (maxP - minP)) * 58;

/**
 * Stock analysis: one agent in the middle, five agents around it (ticker, price, news, change, analysis), a strip of
 * candles underneath and a ticker tape of the data sources on top. The wires draw in on scroll; hover the art and
 * a packet travels down each wire and the tape runs. Decorative.
 */
export function StockAgentsArt({ className }: { className?: string }) {
  return (
    <div className={cn("stock-art flex size-full flex-col", className)} aria-hidden="true">
      <div className="t-label shrink-0 overflow-hidden whitespace-nowrap border-b border-border py-2 text-muted-foreground">
        <div className="tape-track flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0">
              {SOURCES.map((source) => (
                <span key={`${half}-${source}`} className="mr-8 flex items-center gap-3">
                  {source}
                  <span className="text-primary">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 400 340" className="block min-h-0 w-full flex-1" focusable="false">
        {nodes.map((node) => (
          <path
            key={node.label}
            d={`M ${node.x.toFixed(1)} ${node.y.toFixed(1)} L ${HUB.x} ${HUB.y}`}
            pathLength={1}
            className="wire fill-none stroke-foreground/40"
            strokeWidth={1.5}
          />
        ))}

        {nodes.map((node) => (
          <g key={node.label} transform={`translate(${HUB.x} ${HUB.y})`}>
            <rect
              className="packet fill-primary"
              x={-4}
              y={-4}
              width={8}
              height={8}
              style={
                {
                  "--dx": `${(node.x - HUB.x).toFixed(1)}px`,
                  "--dy": `${(node.y - HUB.y).toFixed(1)}px`,
                  "--k": node.k,
                } as CSSProperties
              }
            />
          </g>
        ))}

        <rect x={HUB.x - 40} y={HUB.y - 26} width={80} height={52} className="fill-card stroke-primary" strokeWidth={2} />
        <text x={HUB.x} y={HUB.y - 3} textAnchor="middle" className="fill-foreground font-mono text-[10px] font-bold uppercase">
          Stock
        </text>
        <text x={HUB.x} y={HUB.y + 12} textAnchor="middle" className="fill-foreground font-mono text-[10px] font-bold uppercase">
          Agent
        </text>

        {nodes.map((node) => (
          <g key={node.label}>
            <rect x={node.x - 36} y={node.y - 13} width={72} height={26} className="fill-card stroke-foreground/50" />
            <text x={node.x} y={node.y + 3.5} textAnchor="middle" className="fill-foreground font-mono text-[9px] uppercase">
              {node.label}
            </text>
          </g>
        ))}

        <line x1={14} x2={386} y1={326} y2={326} className="stroke-border" />
        {candles.map((c, i) => (
          <g key={i}>
            <line x1={c.x} x2={c.x} y1={scaleY(c.high)} y2={scaleY(c.low)} className={c.close >= c.open ? "stroke-foreground/50" : "stroke-primary"} />
            <rect
              x={c.x - 4}
              y={scaleY(Math.max(c.open, c.close))}
              width={8}
              height={Math.max(2, Math.abs(scaleY(c.open) - scaleY(c.close)))}
              className={c.close >= c.open ? "fill-foreground/55" : "fill-primary"}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
