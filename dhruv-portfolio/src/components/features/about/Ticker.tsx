// Every item is already stated elsewhere on the site (About copy, skills data, timeline). Decorative, so hidden from AT.
const ITEMS = [
  "Data Modernization",
  "Data Migration",
  "Full Stack",
  "Machine Learning",
  "SAP ABAP",
  "Databricks",
  "Python",
  "Next.js",
  "B2B Sourcing",
] as const;

function Group() {
  return (
    <ul className="flex shrink-0 items-center" role="presentation">
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="text-[clamp(1.5rem,3vw,2.75rem)] leading-none">{item}</span>
          <span className="mx-[clamp(1rem,2.4vw,2.25rem)] text-primary" aria-hidden="true">
            /
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * A slow band between the hero and the About statement. Two identical groups; the track slides by exactly one
 * group (-50%) so the loop has no seam. Pauses on hover, stops under reduced motion (globals.css).
 */
export function Ticker() {
  return (
    <div aria-hidden="true" className="marquee t-h2 overflow-hidden border-b border-border py-5 md:py-7">
      <div className="marquee-track flex w-max">
        <Group />
        <Group />
      </div>
    </div>
  );
}
