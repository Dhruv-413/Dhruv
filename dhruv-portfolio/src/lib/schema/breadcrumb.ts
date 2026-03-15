/**
 * Breadcrumb Schema for SEO
 * Generates JSON-LD structured data for Breadcrumbs
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Breadcrumb Schema
 */
export function getBreadcrumbSchema(
  items: Array<BreadcrumbItem>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
