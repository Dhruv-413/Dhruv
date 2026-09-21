"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type State = "idle" | "copied" | "failed";

/** The one client piece of the direct-details panel. The address itself is a real mailto link rendered by the server. */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    let next: State = "copied";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = "failed";
    }
    setState(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 1800);
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "t-label inline-flex min-h-11 min-w-[6.5rem] items-center justify-center gap-2 border px-3 transition-colors duration-(--dur-ui) ease-(--ease-out) hover:border-foreground focus-visible:border-foreground",
          state === "copied" ? "border-primary bg-primary text-primary-foreground hover:border-primary" : "border-input",
        )}
      >
        {state === "copied" ? "Copied" : state === "failed" ? "Select it" : "Copy"}
        {state === "idle" ? <span className="sr-only"> email address</span> : null}
      </button>
      <span role="status" aria-atomic="true" className="sr-only">
        {state === "copied" ? "Email address copied to the clipboard." : state === "failed" ? "Could not copy. Select the address and copy it by hand." : ""}
      </span>
    </>
  );
}
