"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The repository board. It shows two full rows at every screen size (at most 8 tiles, on 4 columns) and reveals the
 * rest with "See more". No column is ever left empty: whichever tile ends the visible list stretches across the
 * columns that would otherwise be blank. The column counts below MUST match the `grid-cols-*` classes on the list.
 *
 * All of this is decided from the tile count and plain class names, so the server-rendered HTML is already correct
 * at every width and nothing reflows after hydration.
 */

const COLS = [1, 2, 3, 4] as const; // base, md, lg, xl
const ROWS = 2;
const MAX_VISIBLE = 8;

// class names are written out in full so Tailwind can see them
const HIDE = ["max-md:hidden", "md:max-lg:hidden", "lg:max-xl:hidden", "xl:hidden"] as const;
const SPAN = [
  [],
  ["", "md:col-span-1", "md:col-span-2"],
  ["", "lg:col-span-1", "lg:col-span-2", "lg:col-span-3"],
  ["", "xl:col-span-1", "xl:col-span-2", "xl:col-span-3", "xl:col-span-4"],
] as const;

/** How many tiles show at each breakpoint while the board is collapsed. */
const visibleAt = (total: number) => COLS.map((cols) => Math.min(ROWS * cols, MAX_VISIBLE, total));

/** The classes that make the tile at `index` fit: the last tile of a list of `count` fills its row. */
function fillClasses(index: number, count: number[]): string[] {
  const out: string[] = [];
  for (let bp = 1; bp < COLS.length; bp++) {
    if (index !== count[bp] - 1) continue;
    const span = COLS[bp] - (index % COLS[bp]);
    if (span > 1) out.push(SPAN[bp][span]);
  }
  return out;
}

export function RepoBoard({ tiles }: { tiles: { key: string; body: ReactNode }[] }) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const total = tiles.length;
  const collapsed = visibleAt(total);
  const expanded = COLS.map(() => total);
  const shown = open ? expanded : collapsed;

  // the button only exists at the breakpoints where something is actually hidden
  const buttonHidden = collapsed.flatMap((count, bp) => (total <= count ? [HIDE[bp]] : []));
  const nothingHidden = buttonHidden.length === COLS.length;

  return (
    <div>
      <ul
        id={listId}
        role="list"
        className="grid grid-cols-1 border-t border-l border-border md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {tiles.map((tile, index) => (
          <li
            key={tile.key}
            className={cn(
              "group relative row-span-5 grid grid-rows-subgrid border-r border-b border-border p-6 transition-colors duration-(--dur-ui) ease-(--ease-out) focus-within:bg-card hover:bg-card md:p-7",
              // hidden at every breakpoint where this tile is beyond the visible count
              shown.flatMap((count, bp) => (index >= count ? [HIDE[bp]] : [])),
              fillClasses(index, shown),
            )}
          >
            {tile.body}
          </li>
        ))}
      </ul>

      {nothingHidden ? null : (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "t-label mt-6 inline-flex min-h-11 items-center gap-2 border border-input px-5 transition-colors duration-(--dur-ui) hover:border-foreground focus-visible:border-foreground",
            buttonHidden,
          )}
        >
          {open ? "See less" : "See more"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      )}
    </div>
  );
}
