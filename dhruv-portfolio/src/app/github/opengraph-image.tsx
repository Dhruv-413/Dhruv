import { renderOgImage } from "@/lib/og/render";

export const alt = "GitHub activity - Dhruv Gupta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    path: "/github",
    title: "GitHub",
    subtitle: "Repositories and contribution activity.",
  });
}
