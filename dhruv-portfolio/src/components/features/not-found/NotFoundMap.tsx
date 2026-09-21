"use client";

import Link from "next/link";
import { useSyncExternalStore, type CSSProperties } from "react";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ROUTES = [
  { label: "Home", href: "/", note: "The short version", aliases: ["about", "home", "index"] },
  { label: "Projects", href: "/projects", note: "Case studies", aliases: ["project", "work", "portfolio", "cases", "case-studies"] },
  { label: "Skills", href: "/skills", note: "Stack and certifications", aliases: ["skill", "stack", "tech", "certifications"] },
  { label: "Career", href: "/career", note: "Timeline", aliases: ["experience", "resume", "cv", "timeline", "jobs"] },
  { label: "GitHub", href: "/github", note: "Live activity", aliases: ["git", "code", "repos", "repositories", "oss"] },
  { label: "Contact", href: "/contact", note: "Write to me", aliases: ["hire", "email", "connect", "message", "reach"] },
] as const;
type Route = (typeof ROUTES)[number];

const MAX_SHOWN = 80;

/** What the visitor typed, readable: percent-escapes decoded, and control / bidi-override characters removed so a hostile path cannot reorder or hide text. */
function readable(path: string): string {
  let text = path;
  try {
    text = decodeURI(path);
  } catch {
    // keep the raw path
  }
  return text.replace(/[\p{Cc}\u200e\u200f\u202a-\u202e\u2066-\u2069]/gu, "");
}

function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diagonal = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const above = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
      diagonal = above;
    }
  }
  return row[b.length];
}

/** The real page a mistyped address most likely meant, or null when nothing is close. Pure and offline: no lookup needed. */
function closest(path: string): Route | null {
  let segment = path.split(/[?#]/)[0].split("/").filter(Boolean)[0] ?? "";
  try {
    segment = decodeURIComponent(segment);
  } catch {
    // keep the raw segment
  }
  segment = segment.toLowerCase().replace(/\.[a-z0-9]+$/, "");
  if (!segment || segment.length > 40) return null;

  let best: { route: Route; score: number } | null = null;
  for (const route of ROUTES) {
    const name = route.href.slice(1);
    let score = Infinity;
    if (name && segment === name) score = 0; // a deeper path under a real page: /projects/nope
    else if ((route.aliases as readonly string[]).includes(segment)) score = 1;
    else if (name && segment.length >= 3 && (name.startsWith(segment) || segment.startsWith(name))) score = 2;
    else if (name) {
      const d = distance(segment, name);
      if (d <= Math.max(2, Math.floor(name.length / 3))) score = 2 + d;
    }
    if (score < (best?.score ?? Infinity)) best = { route, score };
  }
  return best?.route ?? null;
}

// the address exists only in the browser (the 404 is prerendered), so read it like any external store: `null` on the
// server and during hydration, the real path afterwards. The readout rows have fixed heights, so nothing shifts.
const noSubscribe = () => () => {};
const readPath = () => window.location.pathname + window.location.search;
const serverPath = () => null;

export function NotFoundMap() {
  const path = useSyncExternalStore(noSubscribe, readPath, serverPath);
  const text = path === null ? null : readable(path);
  const shown = text === null ? null : text.length > MAX_SHOWN ? `${text.slice(0, MAX_SHOWN)}...` : text;
  const match = path === null ? null : closest(path);

  const report = `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent("Broken link on your portfolio")}&body=${encodeURIComponent(`This address returned 404: ${shown ?? ""}`)}`;

  return (
    <>
      <div className="grid grid-cols-12 gap-x-(--gutter) gap-y-(--gutter)">
        {/* the dead cell: the address that failed, in the accent */}
        <div className="fade-up col-span-12 flex min-h-64 flex-col justify-between gap-8 border-2 border-primary p-6 md:p-8 lg:col-span-5">
          <p className="t-label text-primary">Not found</p>
          <h1 className="t-display text-[clamp(6rem,52vw,20rem)] md:text-[clamp(10rem,38vw,24rem)] lg:text-[clamp(7rem,21vw,24rem)]">
            404<span className="sr-only"> Page not found</span>
          </h1>
          <p className="min-h-11 font-mono text-sm leading-snug break-all text-muted-foreground">
            <span className="text-foreground">GET</span> <span className="line-clamp-2">{shown ?? " "}</span>
          </p>
        </div>

        {/* the site as cells: every live page is a link, the closest one to the dead address is outlined */}
        <div className="col-span-12 lg:col-span-7">
          <ul role="list" className="hairline-grid h-full auto-rows-fr grid-cols-2 lg:grid-cols-3">
            {ROUTES.map((route, i) => {
              const isClosest = match?.href === route.href;
              return (
                <li
                  key={route.href}
                  data-closest={isClosest}
                  className="fade-up group relative data-[closest=true]:bg-foreground data-[closest=true]:text-background"
                  style={{ "--d": `${180 + i * 60}ms` } as CSSProperties}
                >
                  <Link
                    href={route.href}
                    className="flex h-full min-h-36 flex-col justify-between p-5 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-card focus-visible:bg-card group-data-[closest=true]:hover:bg-foreground group-data-[closest=true]:focus-visible:bg-foreground md:p-6"
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span aria-hidden="true" className="t-label text-muted-foreground group-data-[closest=true]:text-background/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span aria-hidden="true" className="t-label text-background opacity-0 group-data-[closest=true]:opacity-100">
                        Closest
                      </span>
                    </span>
                    <span>
                      <span className="block text-[clamp(1.25rem,2vw,1.75rem)] leading-none font-bold tracking-tight">
                        {route.label}
                        <span aria-hidden="true" className="font-mono text-primary opacity-0 group-data-[closest=true]:text-background transition-opacity duration-(--dur-ui) group-focus-within:opacity-100 group-hover:opacity-100">
                          {" "}
                          →
                        </span>
                        {isClosest ? <span className="sr-only"> (closest match to the address you tried)</span> : null}
                      </span>
                      <span className="t-label mt-2 block min-h-8 text-muted-foreground group-data-[closest=true]:text-background/70">{route.note}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
        <p className={cn("t-label flex min-h-11 items-center gap-2 text-muted-foreground")}>
          {match ? (
            <>
              Did you mean
              <Link href={match.href} className="inline-flex min-h-11 items-center text-foreground underline decoration-border underline-offset-4 transition-colors duration-(--dur-ui) hover:text-primary hover:decoration-primary focus-visible:text-primary">
                {match.href === "/" ? "Home" : match.href}
              </Link>
              <span aria-hidden="true">→</span>
            </>
          ) : (
            <span aria-hidden="true">&nbsp;</span>
          )}
        </p>
        <a
          href={report}
          className="t-label inline-flex min-h-11 items-center gap-2 border-b border-transparent text-foreground transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-primary hover:text-primary focus-visible:text-primary"
        >
          Report a broken link <span aria-hidden="true">→</span>
        </a>
      </div>
    </>
  );
}
