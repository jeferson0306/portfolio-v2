"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js is ~150 kB gzipped: it must never block first paint, and it has no
// meaningful server render, so it is loaded on the client only.
const ParticleField = dynamic(() => import("./particle-field"), { ssr: false });

/**
 * Mounts the WebGL layer once the page is idle. Devices that ask for reduced
 * motion keep the static CSS gradient underneath instead.
 */
export function AmbientBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => setEnabled(true));

    return () => cancel(id as number);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Static bed: what reduced-motion users see, and what covers the frames
          before WebGL has initialised. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(70,80,110,0.20),transparent_60%),radial-gradient(ellipse_at_80%_100%,rgba(50,60,90,0.16),transparent_55%)]" />
      {enabled ? (
        <div className="absolute inset-0 opacity-0 animate-[fadeIn_1.6s_ease-out_forwards]">
          <ParticleField />
        </div>
      ) : null}
    </div>
  );
}
