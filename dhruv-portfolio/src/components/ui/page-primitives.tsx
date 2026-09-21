import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared page primitives for the INK/BONE system (DESIGN.md §4). Server components; motion is CSS-only
 * (`fade-up`, `draw-x` from globals.css) so it runs before hydration and is disabled under reduced motion.
 */

interface PageHeaderProps {
  /** Two-digit section index shown as "[02]". */
  index: string;
  /** Mono label next to the index, e.g. "Work". */
  label: string;
  /** Page title (rendered uppercase, display weight). This is the page's single h1. */
  title: string;
  /** Optional lede under the title (plain text or a short node). Keep it to one or two sentences of real copy. */
  children?: ReactNode;
  /** Draw the hairline under the header. Turn off when the next element already starts with its own top border. */
  rule?: boolean;
  className?: string;
}

export function PageHeader({ index, label, title, children, rule = true, className }: PageHeaderProps) {
  return (
    <header className={cn("page-shell pt-28 md:pt-36", className)}>
      <p className="t-label flex items-center gap-2 text-muted-foreground">
        <span className="mark-plus text-primary" aria-hidden="true" />
        <span aria-hidden="true">[{index}]</span> {label}
      </p>
      <h1 className="t-h1 fade-up mt-4 text-[clamp(3.25rem,11vw,10rem)] leading-[0.86]">{title}</h1>
      {children ? (
        <div
          className="fade-up mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg"
          style={{ "--d": "180ms" } as CSSProperties}
        >
          {children}
        </div>
      ) : null}
      {rule ? <div className="draw-x mt-10 h-px bg-border md:mt-14" aria-hidden="true" /> : <div className="mt-10 md:mt-14" />}
    </header>
  );
}

/** Mono, bordered, square label for technologies / categories. Not interactive. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("t-label inline-flex items-center border border-border px-2 py-1 text-muted-foreground", className)}>
      {children}
    </span>
  );
}

/** Mono text link with an arrow. `external` opens a new tab and announces it. */
export function ArrowLink({
  href,
  children,
  external = false,
  arrow,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  /** Override the arrow glyph (defaults to "↗" external, "→" internal). */
  arrow?: string;
  className?: string;
}) {
  const classes = cn(
    "t-label inline-flex min-h-11 items-center gap-2 border-b border-transparent text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-primary hover:text-primary focus-visible:text-primary",
    className,
  );
  const glyph = arrow ?? (external ? "↗" : "→");
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children} <span aria-hidden="true">{glyph}</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children} <span aria-hidden="true">{glyph}</span>
    </Link>
  );
}

/** Sub-section heading used inside a page (an h2): mono index + label above a display title. */
export function SectionHead({
  index,
  label,
  title,
  aside,
  id,
}: {
  index: string;
  label: string;
  title: string;
  /** Small mono text aligned to the title's baseline on the right (hidden below sm). */
  aside?: ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-10 flex items-baseline-last justify-between gap-6 md:mb-14">
      <div>
        <p className="t-label mb-4 flex items-center gap-2 text-muted-foreground">
          <span className="mark-plus text-primary" aria-hidden="true" />
          <span aria-hidden="true">[{index}]</span> {label}
        </p>
        <h2 id={id} className="t-h2">
          {title}
        </h2>
      </div>
      {aside ? <p className="t-label hidden text-muted-foreground sm:block">{aside}</p> : null}
    </div>
  );
}
