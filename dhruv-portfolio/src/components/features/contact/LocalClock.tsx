"use client";

import { useSyncExternalStore } from "react";
import { SITE_CONFIG } from "@/lib/constants";

const { timeZone } = SITE_CONFIG.contact.availability;
const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone });

// the clock is a per-viewer, per-minute value: the server renders a same-width placeholder and the digits fill in after
// hydration, so the HTML never disagrees with the client and nothing shifts. It is not a live region on purpose.
function subscribe(notify: () => void) {
  const id = window.setInterval(notify, 15_000);
  return () => window.clearInterval(id);
}
const read = () => format.format(new Date());
const placeholder = () => "--:--";

export function LocalClock() {
  const time = useSyncExternalStore(subscribe, read, placeholder);
  return <span className="tabular-nums">{time}</span>;
}
