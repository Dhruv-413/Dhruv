"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

/** Monday first: the strip reads as a working week. Letters are decorative; the meaning is in the text beside it. */
const DAYS = ["M", "T", "W", "T", "F", "S", "S"] as const;
const ORDER = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const WEEKEND_FROM = 5;

// Dhruv's week runs on Indian time, so "today" is computed in IST rather than the visitor's zone.
const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: "Asia/Kolkata" });

// The snapshot is a small integer, so React only re-renders when the day actually changes.
const getSnapshot = () => ORDER.indexOf(weekday.format(new Date()) as (typeof ORDER)[number]);
const getServerSnapshot = () => -1;
const subscribe = (notify: () => void) => {
  const id = window.setInterval(notify, 60_000);
  return () => window.clearInterval(id);
};

/**
 * Seven blocks: five for Deloitte, two for Beaumonde. The only client-side part of the About section: it marks
 * today's block after hydration. On the server (and with JS off) no block is marked and the layout is identical.
 */
export function WeekStrip() {
  const today = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div aria-hidden="true">
      <div className="grid grid-cols-7 gap-1 md:gap-2">
        {DAYS.map((letter, i) => {
          const weekend = i >= WEEKEND_FROM;
          return (
            <div key={i} className="flex flex-col">
              <span className="t-label h-5 text-[0.6875rem] tracking-[0.04em] text-primary">{i === today ? "Today" : ""}</span>
              <div
                className={cn(
                  "week-cell flex h-32 items-end p-2 md:h-64 md:p-4",
                  weekend ? "bg-primary text-primary-foreground" : "bg-foreground text-background",
                  i === today && "outline-2 outline-offset-4 outline-primary",
                )}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span className="t-h2 leading-none">{letter}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="t-label mt-3 grid grid-cols-7 gap-1 text-muted-foreground md:gap-2">
        <span className="col-span-5 border-t border-foreground pt-2">Deloitte</span>
        <span className="col-span-2 border-t border-primary pt-2">Beaumonde</span>
      </div>
    </div>
  );
}
