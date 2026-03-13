"use client";

import { CodeSnippetWindow } from "@/components/ui/CodeSnippetWindow";
import { codeSnippet } from "./data/codeSnippets";

export function HeroCodeSnippet() {
  return (
    <div className="w-full max-w-full sm:max-w-md mx-auto lg:mx-0 hidden lg:block">
      <CodeSnippetWindow
        code={codeSnippet}
        filename="developer.ts"
        language="TypeScript"
        animationDelay={0.9}
        maxHeight="350px"
        className="order-0"
      />
    </div>
  );
}
