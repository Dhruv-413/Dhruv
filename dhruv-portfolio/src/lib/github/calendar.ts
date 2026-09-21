/**
 * Pure calendar maths shared by the server model and the client ledger. No server-only imports here:
 * the client island imports this file directly.
 */

const DAY_MS = 86_400_000;

export type Level = 0 | 1 | 2 | 3 | 4;
export type Cuts = [number, number, number];

/** YYYY-MM-DD plus n days (UTC arithmetic, so no daylight-saving surprises). */
export function addDays(iso: string, n: number): string {
  return new Date(Date.parse(`${iso}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10);
}

/** 0 = Sunday, the same first column as GitHub's own calendar. */
export function weekdayOf(iso: string): number {
  return new Date(`${iso}T00:00:00Z`).getUTCDay();
}

/** Quartile cuts over the non-zero days, so a quiet year still uses the whole colour ramp. */
export function cutsOf(days: number[]): Cuts {
  const nonZero = days.filter((n) => n > 0).sort((a, b) => a - b);
  if (!nonZero.length) return [1, 2, 3];
  const at = (q: number) => nonZero[Math.min(nonZero.length - 1, Math.floor(nonZero.length * q))];
  return [at(0.25), at(0.5), at(0.75)];
}

export function levelOf(count: number, cuts: Cuts): Level {
  if (count <= 0) return 0;
  if (count <= cuts[0]) return 1;
  if (count <= cuts[1]) return 2;
  if (count <= cuts[2]) return 3;
  return 4;
}

export interface DayStats {
  active: number;
  longest: number;
  /** Index of the day with the most contributions (the latest one on a tie). */
  bestIndex: number;
  bestCount: number;
  cuts: Cuts;
}

export function statsOf(days: number[]): DayStats {
  let active = 0;
  let longest = 0;
  let run = 0;
  let bestIndex = Math.max(0, days.length - 1);
  let bestCount = 0;
  days.forEach((count, i) => {
    if (count > 0) {
      active++;
      run++;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
    if (count >= bestCount && count > 0) {
      bestCount = count;
      bestIndex = i;
    }
  });
  return { active, longest, bestIndex, bestCount, cuts: cutsOf(days) };
}
