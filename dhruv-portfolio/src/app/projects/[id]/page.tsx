import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";
import { getProjectSchema } from "@/lib/schema/projects";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import { ArrowLink, Tag } from "@/components/ui/page-primitives";
import { cn } from "@/lib/utils";
import { ProjectArt } from "@/components/features/projects/ProjectArt";
import { PlacementDashboardSketch } from "@/components/features/projects/PlacementDashboardSketch";
import { MenuExtractionSketch } from "@/components/features/projects/MenuExtractionSketch";

// Labelled reconstructions for projects whose real screens can't be shown (private code, real personal data).
const RECONSTRUCTIONS: Record<string, React.ReactNode> = {
  "muj-placement-portal": <PlacementDashboardSketch />,
  "crave-connect": <MenuExtractionSketch />,
};

// The JSON literal types differ per entry (e.g. `links`), so read it through the shared Project type.
// Oldest first, same order as the index, so "build 03 of 05" and previous / next follow the story.
const projects = [...(projectsData as unknown as Project[])].sort((a, b) => a.date.localeCompare(b.date));

// Only the ids in projects.json exist; anything else is a 404 (no runtime rendering of unknown ids).
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  const url = `${SITE_CONFIG.siteUrl}/projects/${project.id}`;
  return {
    title: project.title,
    description: project.longDescription || project.description,
    keywords: [project.title, project.category, ...project.technologies],
    openGraph: {
      title: `${project.title} | ${SITE_CONFIG.name}`,
      description: project.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${SITE_CONFIG.name}`,
      description: project.description,
    },
    alternates: { canonical: url },
  };
}

/** Short values keep the display size; longer words step down so they always fit a half-width cell ("Semantic", "Docker"). */
function metricSize(value: string): string {
  if (value.length <= 4) return "";
  if (value.length <= 6) return "text-[clamp(1.75rem,3vw,2.5rem)]";
  return "text-[clamp(1.4rem,2.4vw,2rem)]";
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) notFound();

  const project = projects[index];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const year = new Date(project.date).getFullYear();
  const links = [
    project.links?.live ? { label: "Live site", href: project.links.live } : null,
    project.links?.demo ? { label: "Demo", href: project.links.demo } : null,
    project.links?.github ? { label: "Source on GitHub", href: project.links.github } : null,
  ].filter((link): link is { label: string; href: string } => link !== null);

  const facts = [
    ["Kind", project.kind],
    ["When", project.period],
    ["With", project.team],
    ["My part", project.role],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]));

  const projectSchema = getProjectSchema({
    id: project.id,
    title: project.title,
    description: project.description,
    longDescription: project.longDescription,
    technologies: project.technologies,
    date: project.date,
    links: project.links,
    images: project.images,
  });
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_CONFIG.siteUrl },
    { name: "Projects", url: `${SITE_CONFIG.siteUrl}/projects` },
    { name: project.title, url: `${SITE_CONFIG.siteUrl}/projects/${project.id}` },
  ]);

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <header className="page-shell pt-28 md:pt-36">
        <ArrowLink href="/projects" arrow="←" className="-ml-px">
          All projects
        </ArrowLink>

        <p className="t-label mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="mark-plus text-primary" aria-hidden="true" />
            <span aria-hidden="true">[{String(index + 1).padStart(2, "0")}]</span> {project.category}
          </span>
          <time dateTime={project.date}>{year}</time>
          {/* where this one sits in the five, oldest first */}
          <span className="flex items-center gap-1" aria-hidden="true">
            {projects.map((item, i) => (
              <span key={item.id} className={cn("size-2.5", i === index ? "bg-primary" : "bg-foreground/20")} />
            ))}
          </span>
          <span className="sr-only">
            Project {index + 1} of {projects.length}
          </span>
        </p>

        <div className="mt-4 grid grid-cols-12 items-center gap-x-(--gutter) gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <h1 className="t-h1 fade-up text-[clamp(2.75rem,9vw,8rem)] leading-[0.88] lg:text-[clamp(3rem,6vw,6.25rem)]">
              {project.title}
            </h1>
            <p className="fade-up mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
              {project.description}
            </p>

            {facts.length ? (
              <dl className="fade-up mt-8 flex flex-wrap gap-x-10 gap-y-5" style={{ "--d": "220ms" } as React.CSSProperties}>
                {facts.map(([term, value]) => (
                  <div key={term}>
                    <dt className="t-label text-muted-foreground">{term}</dt>
                    <dd className="mt-1 text-lg font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <div className="col-span-12 lg:col-span-5">
            <ProjectArt id={project.id} />
          </div>
        </div>
      </header>

      <div className="page-shell grid grid-cols-12 gap-x-(--gutter) gap-y-12 pt-16 pb-(--section-pad) md:pt-24">
        {/* facts */}
        <aside className="col-span-12 space-y-10 md:col-span-4 md:sticky md:top-24 md:self-start">
          {project.private ? (
            <div className="border border-border p-4 md:p-5">
              <h2 className="t-label flex items-center gap-2 text-foreground">
                <span className="size-1.5 bg-primary" aria-hidden="true" />
                Private repository
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-foreground">
                This code is private, so I can&apos;t share it. Ask me about it and I will walk you through what I built.
              </p>
              <ArrowLink href="/contact" className="mt-2">
                Ask me about it
              </ArrowLink>
            </div>
          ) : null}

          {links.length ? (
            <div>
              <h2 className="t-label text-muted-foreground">Links</h2>
              <ul role="list" className="mt-2">
                {links.map((link) => (
                  <li key={link.href} className="border-t border-border first:border-t-0">
                    <ArrowLink href={link.href} external className="w-full justify-between">
                      {link.label}
                    </ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.metrics?.length ? (
            <div>
              <h2 className="t-label mb-3 text-muted-foreground">Numbers</h2>
              <dl className="hairline-grid grid-cols-2 [&>*:last-child:nth-child(odd)]:col-span-2">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="min-w-0 p-4">
                    <dt className="t-label text-muted-foreground">{metric.label}</dt>
                    <dd className={cn("t-h2 mt-2 text-primary [overflow-wrap:anywhere]", metricSize(metric.value))}>{metric.value}</dd>
                    {metric.estimate ? <dd className="t-label mt-2 text-muted-foreground">Estimate</dd> : null}
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <div>
            <h2 className="t-label mb-3 text-muted-foreground">Built with</h2>
            <ul role="list" className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Tag>{tech}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* narrative */}
        <div className="col-span-12 md:col-span-8">
          {project.credits?.length ? (
            <div className="mb-12">
              <table className="w-full border-collapse text-left">
                <caption className="t-label mb-3 text-left text-muted-foreground">Who built what</caption>
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Who</th>
                    <th scope="col">What they built</th>
                  </tr>
                </thead>
                <tbody>
                  {project.credits.map((credit) => (
                    <tr key={credit.who} className="border-t border-border last:border-b">
                      <th scope="row" className="w-[28%] py-4 pr-4 align-top text-lg font-medium">
                        {credit.who}
                      </th>
                      <td className="py-4 align-top text-[1.0625rem] leading-relaxed text-muted-foreground">{credit.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {project.chapters?.length ? (
            <ol role="list" className="border-t border-border">
              {project.chapters.map((chapter, i) => (
                <li
                  key={chapter.title}
                  data-reveal
                  className="grid grid-cols-12 gap-x-(--gutter) gap-y-3 border-b border-border py-8 md:py-12"
                >
                  <h2 className="t-label col-span-12 text-muted-foreground lg:col-span-3">
                    <span className="text-primary">{String(i + 1).padStart(2, "0")}</span> / {chapter.title}
                  </h2>
                  <p className="col-span-12 max-w-[34ch] text-[clamp(1.375rem,2.4vw,2.125rem)] font-medium leading-[1.18] tracking-tight lg:col-span-9">
                    {chapter.body}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <>
              <h2 className="t-label text-muted-foreground">Overview</h2>
              <p className="mt-4 max-w-[62ch] text-[clamp(1.25rem,2vw,1.75rem)] leading-snug tracking-tight">
                {project.longDescription || project.description}
              </p>
            </>
          )}

          {RECONSTRUCTIONS[project.id] ? <div className="mt-12">{RECONSTRUCTIONS[project.id]}</div> : null}


          {project.codeSnippet && !project.private ? (
            <div className="mt-12">
              <h2 className="t-label mb-3 text-muted-foreground">Code</h2>
              <pre
                tabIndex={0}
                aria-label={`Code excerpt from ${project.title}`}
                className="overflow-x-auto border border-border bg-card p-4 font-mono text-sm leading-relaxed md:p-6"
              >
                <code>{project.codeSnippet}</code>
              </pre>
              {project.codeSource ? (
                <ArrowLink href={project.codeSource.href} external className="mt-2">
                  {project.codeSource.label}
                </ArrowLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {/* prev / next */}
      <nav aria-label="More projects" className="border-t border-border">
        <div className="page-shell grid grid-cols-1 md:grid-cols-2">
          {[
            { label: "Previous", project: previous, align: "" },
            { label: "Next", project: next, align: "md:text-right" },
          ].map(({ label, project: target, align }) => (
            <Link
              key={label}
              href={`/projects/${target.id}`}
              className={`group border-b border-border px-2 py-8 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:bg-foreground hover:text-background focus-visible:bg-foreground focus-visible:text-background md:border-b-0 md:px-4 md:py-12 ${align}`}
            >
              <span className="t-label block text-muted-foreground transition-colors group-hover:text-background/70 group-focus-visible:text-background/70">
                {label}
              </span>
              <span className="t-h2 mt-2 block">{target.title}</span>
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
