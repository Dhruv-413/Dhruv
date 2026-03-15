/**
 * Error Fallback Component for GitHub Section
 * Displayed when GitHub API fails
 */

import { AlertCircle, RefreshCw, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorFallbackProps {
  error: Error | null;
  onRetry: () => void;
}

export function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  return (
    <section
      id="github"
      className="min-h-screen relative overflow-hidden flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-destructive/10">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Unable to Load GitHub Data</h1>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t load your GitHub profile data. This might be due to:
          </p>
          <ul className="text-left text-muted-foreground mb-8 space-y-2 max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>GitHub API rate limit exceeded</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>Network connectivity issues</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">•</span>
              <span>GitHub token not configured</span>
            </li>
          </ul>
          {error && (
            <p className="text-sm text-muted-foreground mb-6 p-3 bg-muted rounded-lg font-mono">
              {error.message}
            </p>
          )}
          <div className="flex gap-4 justify-center">
            <Button onClick={onRetry} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/Dhruv-413"
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
