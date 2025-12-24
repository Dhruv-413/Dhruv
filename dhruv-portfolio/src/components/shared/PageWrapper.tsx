import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { Suspense, ReactNode } from "react";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

interface PageWrapperProps {
  children: ReactNode;
  variant?: "page" | "projects" | "skills" | "timeline" | "github" | "contact";
  includeTopPadding?: boolean;
}

/**
 * Shared page wrapper component that provides:
 * - Animated background
 * - Suspense boundary with appropriate loading skeleton
 * - Consistent layout structure
 */
export function PageWrapper({
  children,
  variant = "page",
  includeTopPadding = true,
}: PageWrapperProps) {
  return (
    <>
      <AnimatedBackground />
      <div
        className={`min-h-screen relative ${
          includeTopPadding ? "pt-16 sm:pt-20" : ""
        }`}
      >
        <Suspense fallback={<LoadingSkeleton variant={variant} />}>
          {children}
        </Suspense>
      </div>
    </>
  );
}
