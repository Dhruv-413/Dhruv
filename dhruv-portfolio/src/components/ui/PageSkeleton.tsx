/**
 * Route loading state: the same silhouette as a finished page (label, display title, hairline rows), built from
 * token surfaces only. Shared by every route's loading.tsx so navigation never flashes an unrelated spinner.
 */
export function PageSkeleton() {
  return (
    <div role="status" aria-live="polite" className="page-shell pt-28 md:pt-36">
      <span className="sr-only">Loading</span>
      <div aria-hidden="true">
        <div className="h-3 w-28 animate-pulse bg-muted" />
        <div className="mt-5 h-[clamp(3.25rem,11vw,9rem)] w-[min(100%,34rem)] animate-pulse bg-muted" />
        <div className="mt-6 h-4 w-[min(100%,26rem)] animate-pulse bg-muted" />
        <div className="mt-10 h-px bg-border md:mt-14" />

        <div className="mt-16 border-b border-border">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="grid grid-cols-12 items-center gap-x-(--gutter) border-t border-border py-8">
              <div className="col-span-2 h-3 w-8 animate-pulse bg-muted md:col-span-1" />
              <div className="col-span-10 h-8 animate-pulse bg-muted md:col-span-6" style={{ animationDelay: `${i * 90}ms` }} />
              <div className="col-span-10 col-start-3 mt-3 h-3 animate-pulse bg-muted md:col-span-3 md:col-start-8 md:mt-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
