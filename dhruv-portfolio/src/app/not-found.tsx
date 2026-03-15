"use client";

import Link from "next/link";
import { Terminal, Home, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-2xl w-full">
        {/* Terminal Window */}
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="bg-muted/50 border-b border-border px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-muted-foreground font-mono">
                404 — Page Not Found
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm">
            {/* Error Message */}
            <div className="mb-6">
              <h1 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                404
              </h1>
              <p className="text-xl text-foreground mb-1">Page Not Found</p>
              <p className="text-muted-foreground text-sm">
                The page you&apos;re looking for doesn&apos;t exist or has been
                moved.
              </p>
            </div>

            {/* Command Hint */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-primary text-xs">suggestion</span>
              </div>
              <code className="text-xs text-muted-foreground block">
                <span className="text-pink-400">$</span> cd{" "}
                <span className="text-yellow-400">/</span>
              </code>
            </div>

            {/* Valid Routes Hint */}
            <div className="mb-6">
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                <Code className="w-3 h-3" />
                Valid routes:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "/",
                  "/#projects",
                  "/#skills",
                  "/#career",
                  "/#github",
                  "/#contact",
                ].map((route) => (
                  <span
                    key={route}
                    className="px-2 py-1 bg-muted/50 rounded text-xs text-primary/80 font-mono"
                  >
                    {route}
                  </span>
                ))}
              </div>
            </div>

            {/* Action */}
            <Link href="/">
              <Button className="gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
