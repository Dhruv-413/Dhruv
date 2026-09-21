import { renderOgImage } from "@/lib/og/render";

export const alt = "Career - Dhruv Gupta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    path: "/career",
    title: "Career",
    subtitle: "Deloitte, ONGC and a B.Tech, on one time line.",
  });
}
