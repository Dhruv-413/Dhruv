import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The bordered frame every Skills figure sits in (same language as the project illustrations): a hairline box on the
 * card tone, crosshair marks on the top corners, a mono caption and a hint about what to try. Plain markup, no state.
 */
export function FigureFrame({
  children,
  caption,
  hint,
  className,
}: {
  children: ReactNode;
  caption: string;
  hint?: string;
  className?: string;
}) {
  return (
    <figure className={cn("relative w-full", className)}>
      <div className="relative overflow-hidden border border-border bg-card">{children}</div>
      <span className="mark-plus absolute -top-1 left-0 text-muted-foreground" aria-hidden="true" />
      <span className="mark-plus absolute -top-1 right-0 text-muted-foreground" aria-hidden="true" />
      <figcaption className="t-label mt-3 flex justify-between gap-4 text-muted-foreground">
        <span>{caption}</span>
        {hint ? <span className="text-right text-foreground">{hint}</span> : null}
      </figcaption>
    </figure>
  );
}
