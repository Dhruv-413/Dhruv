import { renderOgImage } from "@/lib/og/render";

export const alt = "Skills - Dhruv Gupta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    path: "/skills",
    title: "Skills",
    subtitle: "Full stack, AI/ML and enterprise software.",
  });
}
