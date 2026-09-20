"use client";

import { useRef, useState } from "react";
import { hashSeed, mulberry32 } from "@/lib/pattern";
import { cn } from "@/lib/utils";

const K = 5;
const CLUSTERS = [
  { name: "Spicy and warm", x: 96, y: 96, dishes: ["Biryani", "Curry", "Samosa", "Chaat", "Tikka", "Vadapav"] },
  { name: "Hearty", x: 300, y: 96, dishes: ["Pasta", "Pizza", "Burger", "Lasagna", "Fries", "Wings"] },
  { name: "Light and fresh", x: 96, y: 250, dishes: ["Salad", "Sushi", "Soup", "Wrap", "Smoothie", "Poke"] },
  { name: "Sweet", x: 300, y: 250, dishes: ["Brownie", "Gelato", "Jalebi", "Cake", "Waffle", "Donut"] },
  { name: "Noodles", x: 198, y: 172, dishes: ["Ramen", "Udon", "Padthai", "Momos", "Noodles", "Pho"] },
] as const;
// Six spots around a cluster centre, so the labels never sit on top of each other.
const SPOTS = [
  [-34, -16],
  [22, -24],
  [-38, 14],
  [26, 10],
  [-8, 32],
  [-4, -2],
] as const;

const rand = mulberry32(hashSeed("crave-connect-map"));
const points = CLUSTERS.flatMap((cluster) =>
  cluster.dishes.map((dish, i) => ({
    dish,
    x: cluster.x + SPOTS[i][0] + (rand() - 0.5) * 6,
    y: cluster.y + SPOTS[i][1] + (rand() - 0.5) * 6,
  })),
);

function nearestTo(x: number, y: number): number[] {
  return points
    .map((p, i) => ({ i, d: (p.x - x) ** 2 + (p.y - y) ** 2 }))
    .sort((a, b) => a.d - b.d)
    .slice(0, K)
    .map((entry) => entry.i);
}

const START = { x: 100, y: 118 };

/**
 * Crave Connect, the smart part: semantic search finds food by meaning. Dishes sit on a map where similar dishes are
 * close together; move the cursor (the "craving") and its five nearest dishes light up. Illustration of the idea,
 * not real embeddings. The craving marker and its five lines are moved straight in the DOM; React state only holds
 * which dishes are lit, and only changes when that set does.
 */
export function CraveMapArt({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const linesRef = useRef<(SVGLineElement | null)[]>([]);
  const [lit, setLit] = useState<number[]>(() => nearestTo(START.x, START.y));

  const move = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (!rect.width) return;
    const x = Math.max(8, Math.min(392, ((clientX - rect.left) / rect.width) * 400));
    const y = Math.max(8, Math.min(332, ((clientY - rect.top) / rect.height) * 340));
    const near = nearestTo(x, y);
    markerRef.current?.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    near.forEach((index, n) => {
      const line = linesRef.current[n];
      if (!line) return;
      line.setAttribute("x1", x.toFixed(1));
      line.setAttribute("y1", y.toFixed(1));
      line.setAttribute("x2", points[index].x.toFixed(1));
      line.setAttribute("y2", points[index].y.toFixed(1));
    });
    setLit((previous) => (previous.join() === near.join() ? previous : near));
  };

  const start = nearestTo(START.x, START.y);

  return (
    <div className={cn("flex size-full flex-col", className)} aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 400 340"
        className="block min-h-0 w-full flex-1 touch-pan-y"
        focusable="false"
        onPointerMove={(e) => move(e.clientX, e.clientY)}
        onPointerDown={(e) => move(e.clientX, e.clientY)}
      >
        {CLUSTERS.map((cluster) => (
          <text
            key={cluster.name}
            x={cluster.x}
            y={cluster.y - 46}
            textAnchor="middle"
            className="fill-muted-foreground/70 font-mono text-[8.5px] uppercase tracking-widest"
          >
            {cluster.name}
          </text>
        ))}

        {start.map((index, n) => (
          <line
            key={n}
            ref={(node) => {
              linesRef.current[n] = node;
            }}
            x1={START.x}
            y1={START.y}
            x2={points[index].x}
            y2={points[index].y}
            className="stroke-primary"
            strokeWidth={1}
            strokeDasharray="2 3"
          />
        ))}

        {points.map((p, i) => {
          const on = lit.includes(i);
          return (
            <g key={p.dish}>
              <rect
                x={p.x - (on ? 5 : 3.5)}
                y={p.y - (on ? 5 : 3.5)}
                width={on ? 10 : 7}
                height={on ? 10 : 7}
                className={cn("crave-dot", on ? "fill-primary" : "fill-foreground/30")}
              />
              <text
                x={p.x + 9}
                y={p.y + 3}
                className={cn("crave-dot font-mono text-[8.5px] uppercase", on ? "fill-foreground" : "fill-muted-foreground/60")}
              >
                {p.dish}
              </text>
            </g>
          );
        })}

        <g ref={markerRef} transform={`translate(${START.x} ${START.y})`}>
          <rect x={-8} y={-8} width={16} height={16} className="fill-none stroke-primary" strokeWidth={1.5} />
          <path d="M -14 0 H -8 M 8 0 H 14 M 0 -14 V -8 M 0 8 V 14" className="stroke-primary" strokeWidth={1.5} />
        </g>
      </svg>

      <p className="t-label shrink-0 truncate border-t border-border px-3 py-3 text-muted-foreground">
        Craving <span className="text-primary">→</span> <span className="text-foreground">{lit.map((i) => points[i].dish).join(", ")}</span>
      </p>
    </div>
  );
}
