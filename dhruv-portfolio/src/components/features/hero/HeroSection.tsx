import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { PortraitStage } from "./PortraitStage";
import { LocalTime } from "./LocalTime";
import { Magnetic } from "./Magnetic";

// Facts come from SITE_CONFIG / timeline.json only. Do not embellish; do not add availability claims.
const { currentRole, venture } = SITE_CONFIG.person;
const META = [
  ["Weekdays", `${currentRole.title} at ${currentRole.organization}`],
  ["Weekends", `${venture.name}, my family's B2B sourcing business`],
  ["Studied", "B.Tech in CSE, MUJ, 2026. CGPA 8.24"],
] as const;

const button =
  "t-label inline-flex h-12 items-center gap-2 border px-4 transition-colors lg:gap-3 lg:px-5 duration-(--dur-ui) ease-(--ease-out)";

/** One word of the display name; each letter rises out of a clip (CSS only, so it runs before hydration). */
function NameWord({ text, offset }: { text: string; offset: number }) {
  return (
    <span
      className="block overflow-hidden pt-[0.02em] pb-[0.06em]"
      aria-hidden="true"
    >
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="name-letter inline-block"
          style={{ "--i": offset + i } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

/**
 * Home hero (DESIGN.md §1, §4.6). Server component: the display name and the pixel image render without JS;
 * the 3D voxel portrait is a lazy client island layered on top.
 */
export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative border-b border-border"
    >
      <div className="page-shell flex flex-col pt-14 md:pt-16 lg:min-h-svh">
        {/* status strip */}
        <div className="t-label flex items-center justify-between gap-4 py-3 text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="mark-plus text-primary" aria-hidden="true" />
            <span aria-hidden="true">[01]</span> Index
          </span>
          <span className="hidden sm:block">
            Ghaziabad, IN / <LocalTime />
          </span>
          <a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-foreground transition-colors duration-(--dur-ui) hover:text-primary focus-visible:text-primary"
          >
            GitHub <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="draw-x h-px bg-border" aria-hidden="true" />

        <div className="grid flex-1 grid-cols-12 content-start gap-x-(--gutter) gap-y-10 py-8 md:items-stretch md:py-8">
          {/* identity: name, statement, actions (one column so there is no dead gap between them) */}
          <div className="col-span-12 flex flex-col gap-6 md:col-span-6 md:col-start-1 md:row-start-1 md:gap-8">
            <h1
              id="hero-title"
              aria-label="Dhruv Gupta"
              className="t-display parallax-slow pointer-events-none relative z-10 ml-[-0.05em] max-md:text-[26vw]"
            >
              <NameWord text="Dhruv" offset={0} />
              <NameWord text="Gupta" offset={5} />
            </h1>

            <p
              className="fade-up max-w-[22ch] text-[clamp(1.6rem,2.8vw,2.75rem)] font-medium leading-[1.05] tracking-tight"
              style={{ "--d": "700ms" } as CSSProperties}
            >
              I build scalable web applications and{" "}
              <span className="t-serif text-primary">intelligent</span> systems.
            </p>

            <div
              className="fade-up flex flex-wrap gap-2 lg:gap-3 md:mt-auto"
              style={{ "--d": "850ms" } as CSSProperties}
            >
              <Magnetic>
                <Link
                  href="/projects"
                  className={cn(
                    button,
                    "border-primary bg-primary text-primary-foreground hover:border-foreground hover:bg-foreground hover:text-background",
                  )}
                >
                  Work <span aria-hidden="true">→</span>
                </Link>
              </Magnetic>
              <a
                href="/Dhruv_resume.pdf"
                download
                className={cn(button, "border-input hover:border-foreground")}
              >
                Resume <span aria-hidden="true">↓</span>
              </a>
              <Link
                href="/contact"
                className={cn(button, "border-input hover:border-foreground")}
              >
                Contact <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          {/* signature: 3D voxel portrait */}
          <figure className="relative col-span-12 md:col-span-6 md:col-start-7 md:row-start-1 md:self-center">
            <PortraitStage label="Pixel-art portrait of Dhruv Gupta" />
            <span
              className="mark-plus absolute -top-1 left-0 text-muted-foreground"
              aria-hidden="true"
            />
            <span
              className="mark-plus absolute -top-1 right-0 text-muted-foreground"
              aria-hidden="true"
            />
            <figcaption className="t-label mt-3 flex justify-between text-muted-foreground">
              <span>Fig. 01 / Dhruv Gupta</span>
              <span className="hidden [@media(hover:hover)]:inline">
                Move or click
              </span>
              <span className="hidden [@media(hover:none)]:inline">
                Touch the portrait
              </span>
            </figcaption>
          </figure>
        </div>

        {/* spec strip */}
        <dl
          className="hairline-grid fade-up mb-6 grid-cols-1 sm:grid-cols-3"
          style={{ "--d": "1000ms" } as CSSProperties}
        >
          {META.map(([term, detail]) => (
            <div key={term} className="p-4">
              <dt className="t-label text-muted-foreground">{term}</dt>
              <dd className="mt-1 text-sm">{detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
