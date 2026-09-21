import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared share-image renderer (Open Graph + Twitter). Typographic, no photography: it uses the
 * INK / BONE "Signal" dark palette from DESIGN.md §4.1, the hairline frame, and the square "cell"
 * motif seeded from the route so every page gets a distinct but related card.
 *
 * ImageResponse cannot read CSS variables, so the resolved token values live here (design-ignore).
 * Fonts are text-subset TTFs of Bricolage Grotesque 800 + JetBrains Mono 500 (both OFL), kept in ./fonts.
 * Route files call this from `app/<route>/opengraph-image.tsx`; they are prerendered at build time.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

const INK = "#0c0a08"; // design-ignore: --background (dark), DESIGN.md 4.1
const BONE = "#efece7"; // design-ignore: --foreground (dark), DESIGN.md 4.1
const DIM = "#a29e98"; // design-ignore: --muted-foreground (dark), DESIGN.md 4.1
const SIGNAL = "#ff582d"; // design-ignore: --primary (dark), DESIGN.md 4.1

const PAD = 64;
const COLS = 20;
const ROWS = 3;
const CELL = 14;
const GAP = 4;

interface OgImageInput {
  /** Route path shown top-right, e.g. "/projects". */
  path: string;
  /** Display title, rendered uppercase. Keep it short (one word or a name). */
  title: string;
  /** One factual line under the title. */
  subtitle: string;
}

function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildCells(seed: string) {
  const rand = mulberry32(hashSeed(seed));
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => {
      const r = rand();
      if (r < 0.1) return { color: SIGNAL, opacity: 1 };
      if (r < 0.42) return { color: BONE, opacity: 0.55 };
      return { color: BONE, opacity: 0.12 };
    })
  );
}

async function loadFont(file: string) {
  return readFile(join(process.cwd(), "src/lib/og/fonts", file));
}

export async function renderOgImage({ path, title, subtitle }: OgImageInput) {
  const [display, mono] = await Promise.all([
    loadFont("bricolage-800.ttf"),
    loadFont("jetbrains-mono-500.ttf"),
  ]);

  const label = title.toUpperCase();
  // Keep the title on one line inside the frame; cap so short words do not become absurdly large.
  const fontSize = Math.min(220, Math.floor((OG_SIZE.width - PAD * 2 - 8) / (label.length * 0.64)));
  const cells = buildCells(path);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: BONE,
          padding: PAD,
          fontFamily: "JetBrains Mono",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: DIM,
          }}
        >
          <div style={{ display: "flex" }}>Dhruv Gupta</div>
          <div style={{ display: "flex", color: SIGNAL }}>{path}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Bricolage Grotesque",
            fontWeight: 800,
            fontSize,
            lineHeight: 0.9,
            letterSpacing: -fontSize * 0.045,
            color: BONE,
          }}
        >
          {label}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${DIM}`,
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: DIM, maxWidth: 640 }}>
            {subtitle}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: GAP }}>
            {cells.map((row, y) => (
              <div key={y} style={{ display: "flex", gap: GAP }}>
                {row.map((cell, x) => (
                  <div
                    key={x}
                    style={{
                      width: CELL,
                      height: CELL,
                      background: cell.color,
                      opacity: cell.opacity,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Bricolage Grotesque", data: display, style: "normal", weight: 800 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 500 },
      ],
    }
  );
}
