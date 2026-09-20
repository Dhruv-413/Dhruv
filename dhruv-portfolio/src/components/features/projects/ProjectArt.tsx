import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CraveMapArt } from "./art/CraveMapArt";
import { EcoHiveArt } from "./art/EcoHiveArt";
import { EyeGazeArt } from "./art/EyeGazeArt";
import { PlacementArt } from "./art/PlacementArt";
import { StockAgentsArt } from "./art/StockAgentsArt";

interface ArtEntry {
  node: ReactNode;
  caption: string;
  /** What to try; shown only on devices with a hover-capable pointer. */
  hint?: string;
  /** Text alternative. Empty for purely decorative art. */
  label: string;
}

// One illustration per project, each about what that project does (ids match src/data/projects.json).
const ARTS: Record<string, ArtEntry> = {
  ecohive: {
    node: <EcoHiveArt />,
    caption: "Fig. Green credit hive",
    hint: "Hover the cells",
    label: "Illustration: a honeycomb of green credit cells, with a legend of trees, water, air and mangroves.",
  },
  "eye-gaze-tracking": {
    node: <EyeGazeArt />,
    caption: "Fig. It follows your cursor",
    hint: "Click to blink",
    label: "Illustration: an eye that follows the cursor, with gaze coordinates.",
  },
  "stock-analysis": {
    node: <StockAgentsArt />,
    caption: "Fig. Five agents, five data sources",
    hint: "Hover the diagram",
    label: "Illustration: one stock agent connected to five agents (ticker, price, news, change, analysis), with a candlestick chart.",
  },
  "muj-placement-portal": {
    node: <PlacementArt />,
    caption: "Fig. From manual sheets to one database",
    label: "",
  },
  "crave-connect": {
    node: <CraveMapArt />,
    caption: "Fig. Semantic search, illustrated",
    hint: "Move the cursor",
    label: "Illustration: dishes on a map where similar dishes sit close together, with the five nearest to your cursor highlighted.",
  },
};

/**
 * The illustration for one project (DESIGN.md §5). Server component: a bordered square frame, the art inside it,
 * a caption and, on hover-capable devices, a hint about what to try. Unknown ids render nothing.
 */
export function ProjectArt({ id, className }: { id: string; className?: string }) {
  const art = ARTS[id];
  if (!art) return null;
  return (
    <figure className={cn("relative w-full", className)}>
      <div
        role={art.label ? "img" : undefined}
        aria-label={art.label || undefined}
        className="relative aspect-square w-full overflow-hidden border border-border bg-card"
      >
        {art.node}
      </div>
      <span className="mark-plus absolute -top-1 left-0 text-muted-foreground" aria-hidden="true" />
      <span className="mark-plus absolute -top-1 right-0 text-muted-foreground" aria-hidden="true" />
      <figcaption className="t-label mt-3 flex justify-between gap-4 text-muted-foreground">
        <span>{art.caption}</span>
        {art.hint ? <span className="hidden [@media(hover:hover)]:inline">{art.hint}</span> : null}
      </figcaption>
    </figure>
  );
}
