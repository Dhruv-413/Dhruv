import { notFound } from "next/navigation";
import projects from "@/data/projects.json";
import { renderOgImage } from "@/lib/og/render";

export const alt = "Project case study - Dhruv Gupta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return renderOgImage({
    path: `/projects/${project.id}`,
    title: project.title,
    subtitle: `${project.category}, ${new Date(project.date).getFullYear()}`,
  });
}
