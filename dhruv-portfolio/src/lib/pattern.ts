/** Small deterministic PRNG helpers so a given seed (e.g. a project id) always yields the same pattern. */

export function hashSeed(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Density field of 0..3 levels (3 = accent). Brighter cells cluster along a seeded diagonal band, which reads as a
 * "signal" running through the grid instead of uniform noise.
 */
export function cellLevels(seed: string, cols: number, rows: number): number[][] {
  const rand = mulberry32(hashSeed(seed));
  const slope = (rand() - 0.5) * 1.4;
  const offset = rand();
  return Array.from({ length: rows }, (_, y) =>
    Array.from({ length: cols }, (_, x) => {
      const band = 1 - Math.min(1, Math.abs((x / cols - offset) + slope * (y / rows - 0.5)) * 2.4);
      const r = rand();
      if (r < 0.012 + band * 0.05) return 3;
      if (r < 0.1 + band * 0.42) return 2;
      if (r < 0.34 + band * 0.3) return 1;
      return 0;
    }),
  );
}
