import { memo } from "react";

interface LoadingSkeletonProps {
  variant?: "page" | "projects" | "github" | "skills" | "timeline" | "contact";
}

export const LoadingSkeleton = memo(function LoadingSkeleton({
  variant = "page",
}: LoadingSkeletonProps) {
  if (variant === "projects") {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="animate-pulse space-y-6 sm:space-y-8">
          {/* Header Skeleton */}
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="h-8 sm:h-10 md:h-12 bg-primary/10 rounded-lg w-40 sm:w-48 md:w-64 mx-auto" />
            <div className="h-3 sm:h-4 md:h-6 bg-primary/5 rounded w-11/12 sm:w-3/4 md:w-2/3 mx-auto" />
          </div>

          {/* Filters Skeleton */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mt-6 sm:mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-7 sm:h-8 md:h-10 bg-primary/5 rounded-full w-16 sm:w-20 md:w-24"
              />
            ))}
          </div>

          {/* Projects Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-56 sm:h-64 md:h-72 lg:h-80 bg-primary/5 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "github") {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="animate-pulse space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="h-8 sm:h-10 md:h-12 bg-primary/10 rounded-lg w-40 sm:w-48 md:w-64 mx-auto" />
            <div className="h-3 sm:h-4 md:h-6 bg-primary/5 rounded w-11/12 sm:w-3/4 md:w-2/3 mx-auto" />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-20 sm:h-24 md:h-32 bg-primary/5 rounded-xl"
              />
            ))}
          </div>

          {/* Contribution Graph */}
          <div className="h-40 sm:h-48 md:h-64 bg-primary/5 rounded-xl mt-6 sm:mt-8" />

          {/* Repos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-36 sm:h-40 md:h-48 bg-primary/5 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "skills") {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="animate-pulse space-y-6 sm:space-y-8">
          <div className="h-8 sm:h-10 md:h-12 bg-primary/10 rounded-lg w-40 sm:w-48 md:w-64 mx-auto" />
          <div className="h-3 sm:h-4 md:h-6 bg-primary/5 rounded w-11/12 sm:w-3/4 md:w-2/3 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 sm:h-56 md:h-64 lg:h-72 bg-primary/5 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "timeline") {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="animate-pulse space-y-6 sm:space-y-8">
          <div className="h-8 sm:h-10 md:h-12 bg-primary/10 rounded-lg w-40 sm:w-48 md:w-64 mx-auto" />
          <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-28 sm:h-32 md:h-40 bg-primary/5 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "contact") {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="animate-pulse space-y-6 sm:space-y-8">
          <div className="h-8 sm:h-10 md:h-12 bg-primary/10 rounded-lg w-40 sm:w-48 md:w-64 mx-auto" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mt-8 sm:mt-12">
            <div className="h-80 sm:h-96 md:h-[500px] bg-primary/5 rounded-xl" />
            <div className="h-80 sm:h-96 md:h-[500px] bg-primary/5 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Default page skeleton
  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="animate-pulse space-y-6 sm:space-y-8">
        <div className="h-8 sm:h-10 md:h-12 bg-primary/10 rounded-lg w-40 sm:w-48 md:w-64 mx-auto" />
        <div className="h-3 sm:h-4 md:h-6 bg-primary/5 rounded w-11/12 sm:w-3/4 md:w-2/3 mx-auto" />
        <div className="space-y-3 sm:space-y-4 mt-8 sm:mt-12">
          <div className="h-20 sm:h-24 md:h-32 bg-primary/5 rounded-xl" />
          <div className="h-20 sm:h-24 md:h-32 bg-primary/5 rounded-xl" />
          <div className="h-20 sm:h-24 md:h-32 bg-primary/5 rounded-xl" />
        </div>
      </div>
    </div>
  );
});
