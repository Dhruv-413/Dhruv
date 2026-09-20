import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { getBreadcrumbSchema } from "@/lib/schema";
import { getProjectSchema } from "@/lib/schema/projects";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import { ArrowLink, Tag } from "@/components/ui/page-primitives";
import { ProjectCover } from "@/components/features/projects/ProjectCover";

// The JSON literal types differ per entry (e.g. `links`), so read it through the shared Project type.
const projects = projectsData as unknown as Project[];

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

        <p className="t-label mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="mark-plus text-primary" aria-hidden="true" />
            <span aria-hidden="true">[{String(index + 1).padStart(2, "0")}]</span> {project.category}
          </span>
          <time dateTime={project.date}>{year}</time>
        </p>

        <h1 className="t-h1 fade-up mt-4 text-[clamp(2.75rem,9vw,8rem)] leading-[0.88]">{project.title}</h1>
        <p className="fade-up mt-6 max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted-foreground md:text-lg">
          {project.description}
        </p>
      </header>

      <div className="page-shell mt-10 md:mt-14">
        <ProjectCover id={project.id} className="aspect-[16/6] md:aspect-[16/4]" />
      </div>

      <div className="page-shell grid grid-cols-12 gap-x-(--gutter) gap-y-12 py-(--section-pad)">
        {/* facts */}
        <aside className="col-span-12 space-y-10 md:col-span-4 md:sticky md:top-24 md:self-start">
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
              <dl className="hairline-grid grid-cols-2">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="p-4">
                    <dt className="t-label text-muted-foreground">{metric.label}</dt>
                    <dd className="t-h2 mt-2 text-primary">{metric.value}</dd>
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
          <h2 className="t-label text-muted-foreground">Overview</h2>
          <p className="mt-4 max-w-[62ch] text-[clamp(1.25rem,2vw,1.75rem)] leading-snug tracking-tight">
            {project.longDescription || project.description}
          </p>

          {project.codeSnippet ? (
            <div className="mt-12">
              <h2 className="t-label mb-3 text-muted-foreground">Code</h2>
              <pre
                tabIndex={0}
                aria-label={`Code excerpt from ${project.title}`}
                className="overflow-x-auto border border-border bg-card p-4 font-mono text-sm leading-relaxed md:p-6"
              >
                <code>{project.codeSnippet}</code>
              </pre>
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
