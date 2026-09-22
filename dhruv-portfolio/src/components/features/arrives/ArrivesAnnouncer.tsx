"use client";

import { useEffect, useState } from "react";
import { OUTCOMES, type Choice } from "@/lib/placement-sample";

/**
 * The one JS piece of "What arrives matters": a polite, atomic status region (in the server HTML from the start) that
 * reads the outcome of a choice aloud. Everything visual is CSS (`.arrives` in globals.css), so this only listens for
 * the radio group's `change` event on the section and never moves focus (arrow keys change the choice). Arrow keys fire
 * `change` on every step, so it waits until the choice has settled; the counts are in the table, so it reads the result.
 */
export function ArrivesAnnouncer({ sectionId }: { sectionId: string }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    let timer = 0;
    const onChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.name !== "arrives-choice" || !(input.value in OUTCOMES)) return;
      const outcome = OUTCOMES[input.value as Choice];
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setMessage([`${outcome.label}.`, outcome.note ? `${outcome.note}.` : "", outcome.tradeOff].filter(Boolean).join(" "));
      }, 450);
    };
    section.addEventListener("change", onChange);
    return () => {
      section.removeEventListener("change", onChange);
      window.clearTimeout(timer);
    };
  }, [sectionId]);

  return (
    <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
      {message}
    </p>
  );
}
