"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic pull for a primary action: the child drifts a fraction of the way toward the pointer while it is near.
 * Direct style writes (no React state); fine pointers only; off under reduced motion. The padded outer box is the field.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const fieldRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const inner = innerRef.current;
    if (!field || !inner) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const onMove = (e: PointerEvent) => {
      const r = field.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      inner.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };
    const onLeave = () => {
      inner.style.transform = "";
    };
    field.addEventListener("pointermove", onMove);
    field.addEventListener("pointerleave", onLeave);
    return () => {
      field.removeEventListener("pointermove", onMove);
      field.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={fieldRef} className={cn("-m-4 inline-flex p-4", className)}>
      <span ref={innerRef} className="inline-flex transition-transform duration-(--dur-ui) ease-(--ease-out)">
        {children}
      </span>
    </span>
  );
}
