"use client";

import { useSyncExternalStore } from "react";

/** Live local time for the "Ghaziabad, IN" status strip. Renders a placeholder on the server (no hydration mismatch). */
const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

let cached = "";
const subscribe = (notify: () => void) => {
  const id = window.setInterval(() => {
    const next = formatter.format(new Date());
    if (next !== cached) {
      cached = next;
      notify();
    }
  }, 5000);
  return () => window.clearInterval(id);
};
const getSnapshot = () => (cached = formatter.format(new Date()));
const getServerSnapshot = () => "--:--";

export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <time suppressHydrationWarning dateTime={time === "--:--" ? undefined : time}>
      {time} IST
    </time>
  );
}
