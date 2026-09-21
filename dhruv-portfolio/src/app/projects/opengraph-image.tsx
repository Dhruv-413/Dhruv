import { renderOgImage } from "@/lib/og/render";

export const alt = "Projects - Dhruv Gupta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    path: "/projects",
    title: "Projects",
    subtitle: "Web, backend and AI/ML projects.",
  });
}
