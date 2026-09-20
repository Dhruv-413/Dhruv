"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Layers the three renderings of the portrait, cheapest first:
 *   1. server-rendered pixel image (LCP-safe, works with JS off, is the accessible image)
 *   2. WebGL2 voxel relief (lazy chunk, fades the image out once its first frame is drawn)
 *   3. 2D canvas mosaic, used when WebGL2 is unavailable or the context is lost
 */
const VoxelPortrait = dynamic(() => import("./VoxelPortrait").then((m) => m.VoxelPortrait), { ssr: false });
const PixelPortrait = dynamic(() => import("./PixelPortrait").then((m) => m.PixelPortrait), { ssr: false });

const SRC = "/images/portrait.png";

export function PortraitStage({ label, className }: { label: string; className?: string }) {
  const [ready, setReady] = useState(false);
  const [mode, setMode] = useState<"webgl" | "canvas">("webgl");
  const [armed, setArmed] = useState(false);

  // Start the 3D chunk and GL init only after the page has painted and gone idle, so they never compete
  // with LCP, hydration or the font/JS downloads (measured: eager init delayed first paint by ~1 s on mobile).
  useEffect(() => {
    // Touch devices: no cursor for the heat effect and the weakest GPUs, so wait for the first touch
    // (or 6 s) before paying for WebGL. Until then the crisp pixel image is the portrait.
    if (window.matchMedia("(pointer: coarse)").matches) {
      const arm = () => setArmed(true);
      const options = { once: true, passive: true } as const;
      window.addEventListener("touchstart", arm, options);
      window.addEventListener("pointerdown", arm, options);
      const fallback = setTimeout(arm, 6000);
      return () => {
        window.removeEventListener("touchstart", arm);
        window.removeEventListener("pointerdown", arm);
        clearTimeout(fallback);
      };
    }
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(() => setArmed(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(() => setArmed(true), 400);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={cn("relative aspect-square w-full", className)}>
      <Image
        src={SRC}
        alt={label}
        width={64}
        height={64}
        priority
        fetchPriority="high"
        unoptimized
        className={cn(
          "absolute inset-0 size-full object-contain [image-rendering:pixelated]",
          "transition-opacity duration-(--dur-section) ease-(--ease-out)",
          (ready || mode === "canvas") && "opacity-0",
        )}
      />
      {mode === "webgl" ? (
        armed && (
          <VoxelPortrait
            src={SRC}
            className="absolute inset-0"
            onReady={() => setReady(true)}
            onUnsupported={() => setMode("canvas")}
          />
        )
      ) : (
        <PixelPortrait src={SRC} size={64} className="absolute inset-0" />
      )}
    </div>
  );
}
