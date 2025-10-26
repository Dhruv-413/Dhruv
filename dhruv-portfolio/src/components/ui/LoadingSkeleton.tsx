import { memo } from "react";

interface LoadingSkeletonProps {
  variant?: "page" | "projects" | "github" | "skills" | "timeline" | "contact";
}

export const LoadingSkeleton = memo(function LoadingSkeleton({
  variant = "page",
}: LoadingSkeletonProps) {
  if (variant === "projects") {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="animate-pulse space-y-8">
          {/* Header Skeleton */}
          <div className="text-center space-y-4">
            <div className="h-10 sm:h-12 bg-primary/10 rounded-lg w-48 sm:w-64 mx-auto" />
            <div className="h-4 sm:h-6 bg-primary/5 rounded w-3/4 sm:w-2/3 mx-auto" />
          </div>

          {/* Filters Skeleton */}
          <div className="flex flex-wrap gap-2 justify-center mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-8 sm:h-10 bg-primary/5 rounded-full w-20 sm:w-24"
              />
            ))}
          </div>

          {/* Projects Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-64 sm:h-72 lg:h-80 bg-primary/5 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "github") {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="animate-pulse space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="h-10 sm:h-12 bg-primary/10 rounded-lg w-48 sm:w-64 mx-auto" />
            <div className="h-4 sm:h-6 bg-primary/5 rounded w-3/4 sm:w-2/3 mx-auto" />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 sm:h-32 bg-primary/5 rounded-xl" />
            ))}
          </div>

          {/* Contribution Graph */}
          <div className="h-48 sm:h-64 bg-primary/5 rounded-xl mt-8" />

          {/* Repos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 sm:h-48 bg-primary/5 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "skills") {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="animate-pulse space-y-8">
          <div className="h-10 sm:h-12 bg-primary/10 rounded-lg w-48 sm:w-64 mx-auto" />
          <div className="h-4 sm:h-6 bg-primary/5 rounded w-3/4 sm:w-2/3 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-56 sm:h-64 lg:h-72 bg-primary/5 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "timeline") {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="animate-pulse space-y-8">
          <div className="h-10 sm:h-12 bg-primary/10 rounded-lg w-48 sm:w-64 mx-auto" />
          <div className="space-y-6 mt-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 sm:h-40 bg-primary/5 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="animate-pulse space-y-8">
          <div className="h-10 sm:h-12 bg-primary/10 rounded-lg w-48 sm:w-64 mx-auto" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mt-12">
            <div className="h-96 sm:h-[500px] bg-primary/5 rounded-xl" />
            <div className="h-96 sm:h-[500px] bg-primary/5 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Default page skeleton
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <div className="animate-pulse space-y-8">
        <div className="h-10 sm:h-12 bg-primary/10 rounded-lg w-48 sm:w-64 mx-auto" />
        <div className="h-4 sm:h-6 bg-primary/5 rounded w-3/4 sm:w-2/3 mx-auto" />
        <div className="space-y-4 mt-12">
          <div className="h-24 sm:h-32 bg-primary/5 rounded-xl" />
          <div className="h-24 sm:h-32 bg-primary/5 rounded-xl" />
          <div className="h-24 sm:h-32 bg-primary/5 rounded-xl" />
        </div>
      </div>
    </div>
  );
});
