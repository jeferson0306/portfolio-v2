"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { fieldOpacity, type Backdrop } from "@/lib/backdrops";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// three.js is ~150 kB gzipped: it must never block first paint, and it has no
// meaningful server render, so it is loaded on the client only.
const ParticleField = dynamic(() => import("./particle-field"), { ssr: false });

/**
 * The WebGL field, and the decision of when it should not be there.
 *
 * It used to run behind every section at full strength, which is why changing
 * what it drew never changed how the page felt. Now each section declares its
 * medium through `data-backdrop`, and this fades the canvas to match — to
 * nothing at all under the sections that replace it with type, a grid, or
 * silence.
 */
export function AmbientBackground() {
  const [enabled, setEnabled] = useState(false);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => setEnabled(true));

    return () => cancel(id as number);
  }, []);

  useGSAP(
    () => {
      if (!enabled) return;

      const sections = gsap.utils.toArray<HTMLElement>("[data-backdrop]");
      if (sections.length === 0) return;

      // The canvas arrives at whatever the first section asks for, rather than
      // fading in and then being corrected. A CSS fade here would fight these
      // tweens for the same property.
      const first = (sections[0].dataset.backdrop ?? "field") as Backdrop;
      gsap.fromTo(
        fieldRef.current,
        { opacity: 0 },
        { opacity: fieldOpacity[first], duration: 1.6, ease: "power2.out" },
      );

      const triggers = sections.map((section) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (!self.isActive) return;
            const kind = (section.dataset.backdrop ?? "field") as Backdrop;

            gsap.to(fieldRef.current, {
              opacity: fieldOpacity[kind],
              duration: 0.9,
              ease: "power2.out",
              overwrite: true,
            });
          },
        }),
      );

      return () => triggers.forEach((trigger) => trigger.kill());
    },
    { dependencies: [enabled], revertOnUpdate: true },
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* Static bed: what reduced-motion readers see, and what covers the
          frames before WebGL has initialised. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(70,80,110,0.20),transparent_60%),radial-gradient(ellipse_at_80%_100%,rgba(50,60,90,0.16),transparent_55%)]" />
      {enabled ? (
        <div ref={fieldRef} className="absolute inset-0 opacity-0">
          <ParticleField />
        </div>
      ) : null}
    </div>
  );
}
