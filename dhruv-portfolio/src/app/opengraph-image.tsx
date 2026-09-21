import { renderOgImage } from "@/lib/og/render";
import { SITE_CONFIG } from "@/lib/constants";

export const alt = `${SITE_CONFIG.name} - ${SITE_CONFIG.person.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    path: "/",
    title: SITE_CONFIG.name,
    subtitle: SITE_CONFIG.person.jobTitle,
  });
}
