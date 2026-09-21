"use client";

import { useState, type ReactNode } from "react";

export interface BrowserItem {
  id: string;
  /** Server-rendered row (a link). Passed as a prop so the list works, in full, without JS. */
  node: ReactNode;
  /** Server-rendered cover for the side panel. */
  cover: ReactNode;
  kind?: string;
  period?: string;
  team?: string;
  role?: string;
}

/**
 * Projects index: the rows on the left, a sticky preview on the right that follows the row you hover or focus.
 * The panel is only shown from `md` up (below that the rows stand alone). The one piece of client state is the
 * active id; the preview is keyed so each project's illustration starts fresh when you switch to it.
 */
export function ProjectsBrowser({ items }: { items: BrowserItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const activeIndex = Math.max(0, items.findIndex((item) => item.id === activeId));
  const active = items[activeIndex];

  const facts = [
    ["Kind", active?.kind],
    ["When", active?.period],
    ["With", active?.team],
    ["My part", active?.role],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  return (
    <div className="grid grid-cols-12 gap-x-(--gutter)">
      <ol role="list" className="col-span-12 border-b border-border md:col-span-7 lg:col-span-8">
        {items.map((item, i) => (
          <li
            key={item.id}
            data-reveal
            data-active={i === activeIndex}
            onMouseEnter={() => setActiveId(item.id)}
            onFocusCapture={() => setActiveId(item.id)}
            className="relative max-md:before:hidden before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-0.5 before:bg-primary before:opacity-0 before:transition-opacity before:duration-(--dur-ui) data-[active=true]:before:opacity-100"
          >
            {item.node}
          </li>
        ))}
      </ol>

      <aside className="hidden md:col-span-5 md:block lg:col-span-4">
        <div className="sticky top-24 pt-px">
          <div key={active.id}>{active.cover}</div>
          <dl aria-hidden="true" className="mt-6 divide-y divide-border border-y border-border">
            {facts.map(([term, value]) => (
              <div key={term} className="grid grid-cols-3 gap-4 py-3">
                <dt className="t-label text-muted-foreground">{term}</dt>
                <dd className="col-span-2 text-[1.0625rem]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </aside>
    </div>
  );
}
