import { renderOgImage } from "@/lib/og/render";

export const alt = "Contact - Dhruv Gupta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    path: "/contact",
    title: "Contact",
    subtitle: "Get in touch.",
  });
}
