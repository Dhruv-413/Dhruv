"use client";

import dynamic from "next/dynamic";

/**
 * react-hot-toast is only needed once a form is submitted, so it is split out of the initial bundle on every route.
 * Toasts fired before this mounts are queued in react-hot-toast's global store and shown when it appears.
 */
const Toaster = dynamic(() => import("react-hot-toast").then((m) => m.Toaster), { ssr: false });

export function LazyToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--color-card)",
          color: "var(--color-card-foreground)",
          border: "1px solid var(--color-border)",
        },
      }}
    />
  );
}
