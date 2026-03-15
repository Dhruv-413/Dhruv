/**
 * Loading Skeleton Component for GitHub Section
 * Displayed while GitHub data is being fetched
 */

import { Terminal } from "lucide-react";

export function LoadingSkeleton() {
  return (
    <section
      id="github"
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="animate-pulse space-y-4">
            {/* Terminal prompt skeleton */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <Terminal className="h-4 w-4 text-muted" />
              <div className="h-4 bg-muted rounded w-24"></div>
            </div>
            {/* Title skeleton */}
            <div className="h-12 bg-muted rounded w-96 mx-auto"></div>
            {/* Description skeleton */}
            <div className="h-6 bg-muted rounded w-[500px] mx-auto"></div>
            {/* Stats grid skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
