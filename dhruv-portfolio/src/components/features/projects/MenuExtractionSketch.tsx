import { cn } from "@/lib/utils";

// A made-up menu. It shows the kinds of problem the owner named (bad OCR, sizes on one line, add-ons and section
// headers), not real output from the pipeline.
const OCR_LINES = [
  { text: "PIZZAS", note: "heading" },
  { text: "Farmhouse    Reg 249 / Med 399 / Lrg 549", note: "sizes on one line" },
  { text: "  + Extra cheese  60", note: "add-on" },
  { text: "Paneer Tikka Piz2a    299", note: "OCR slip" },
  { text: "BEVERAGES", note: "heading" },
  { text: "Cold Coffee", note: "no price" },
] as const;

const ROWS: { category: string; item: string; prices: string; flag?: string }[] = [
  { category: "Pizzas", item: "Farmhouse", prices: "regular 249 · medium 399 · large 549" },
  { category: "Pizzas", item: "Add-on: Extra cheese", prices: "60" },
  { category: "Pizzas", item: "Paneer Tikka Pizza", prices: "regular 299" },
  { category: "Beverages", item: "Cold Coffee", prices: "180", flag: "Guessed" },
];

/**
 * Crave Connect: what the owner's menu pipeline had to do, redrawn. Left, the text OCR reads off a menu photo; right,
 * the structured items it should become. The guessed price is marked, because the prompt let the model invent one
 * (the page says so). A picture of a process, so one image to assistive tech, captioned as a reconstruction.
 */
export function MenuExtractionSketch({ className }: { className?: string }) {
  return (
    <figure className={cn("w-full", className)}>
      <div
        role="img"
        aria-label="Reconstruction with a made-up menu: text read off a menu photo, with a heading, sizes on one line, an add-on, an OCR slip ('Piz2a') and an item with no price, becomes four structured menu items with categories and prices. The Cold Coffee price is marked as guessed."
        className="grid grid-cols-1 border border-border bg-card md:grid-cols-[1fr_auto_1.3fr]"
      >
        <div aria-hidden="true" className="min-w-0 p-4">
          <p className="t-label text-muted-foreground">Menu photo, as OCR reads it</p>
          <ul role="list" className="mt-3 space-y-2 overflow-x-auto font-mono text-[0.8125rem]">
            {OCR_LINES.map((line) => (
              <li key={line.text} className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className={cn("whitespace-pre", line.note === "heading" && "text-muted-foreground")}>{line.text}</span>
                <span className="t-label text-muted-foreground">{line.note}</span>
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden="true" className="t-label flex items-center justify-center border-y border-border px-4 py-2 text-muted-foreground md:border-x md:border-y-0">
          LLM <span className="ml-2">→</span>
        </div>

        <div aria-hidden="true" className="min-w-0 p-4">
          <p className="t-label text-muted-foreground">Menu items, structured</p>
          <div className="mt-3 overflow-x-auto">
            <div className="font-mono text-[0.8125rem]">
              <div className="t-label grid grid-cols-[1.3fr_1fr] gap-3 border-b border-border pb-2 text-muted-foreground md:grid-cols-[0.8fr_1.4fr_1.4fr]">
                <span className="hidden md:block">Category</span>
                <span>Item</span>
                <span>Prices</span>
              </div>
              {ROWS.map((row) => (
                <div key={row.item} className="grid grid-cols-[1.3fr_1fr] gap-3 border-b border-border py-2 last:border-b-0 md:grid-cols-[0.8fr_1.4fr_1.4fr]">
                  <span className="hidden text-muted-foreground md:block">{row.category}</span>
                  <span>
                    <span className="t-label block text-muted-foreground md:hidden">{row.category}</span>
                    {row.item}
                  </span>
                  <span className="flex flex-wrap items-center gap-x-2">
                    {row.prices}
                    {row.flag ? <span className="t-label bg-primary px-1.5 text-primary-foreground">{row.flag}</span> : null}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <figcaption className="t-label mt-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-muted-foreground">
        <span>Fig. The menu pipeline, redrawn</span>
        <span>Reconstruction, not real output. Made-up menu</span>
      </figcaption>
    </figure>
  );
}
