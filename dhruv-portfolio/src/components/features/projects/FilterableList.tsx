"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface FilterItem {
  id: string;
  category: string;
  /** Server-rendered row markup, passed through as a prop so the list works (all rows visible) without JS. */
  node: ReactNode;
}

/** Category filter over server-rendered rows. Rows are hidden, not unmounted, so the DOM stays stable. */
export function FilterableList({ categories, items }: { categories: string[]; items: FilterItem[] }) {
  const [active, setActive] = useState("All");
  const shown = items.filter((item) => active === "All" || item.category === active).length;

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2 md:mb-12">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => setActive(category)}
            className={cn(
              "t-label min-h-11 border px-4 transition-colors duration-(--dur-ui) ease-(--ease-out)",
              active === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input text-foreground hover:border-foreground",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {shown} {shown === 1 ? "project" : "projects"} shown
      </p>

      <ol role="list" className="border-b border-border">
        {items.map((item) => (
          <li key={item.id} hidden={active !== "All" && item.category !== active} data-reveal>
            {item.node}
          </li>
        ))}
      </ol>
    </div>
  );
}
