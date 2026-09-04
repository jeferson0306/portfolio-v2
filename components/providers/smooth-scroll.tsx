"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { useIsDocumentRoute } from "./chrome";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

/**
 * Inertial scrolling — the single biggest contributor to the "expensive" feel
 * of a modern showcase site. ScrollSmoother keeps the native scrollbar and real
 * `window.scrollY`, so ScrollTrigger, Framer Motion's `useScroll` and anchor
 * links all keep working unchanged.
 *
 * Note: `position: sticky` is not compatible with the transform ScrollSmoother
 * applies to the content, so pinned layouts use ScrollTrigger `pin` instead.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isDocument = useIsDocumentRoute();

  useGSAP(
    () => {
      if (isDocument) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // React runs child effects before parent ones, so every section has already
      // registered its ScrollTrigger against the plain window scroller by the time
      // this runs. Creating the smoother re-parents them, and the refresh below
      // re-measures every pin against the new scroller — without it, pinned
      // sections start out offset by a viewport height.
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.1,
        // Enables `data-speed` / `data-lag` parallax attributes on any child.
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });

      smoother.scrollTop(0);
      ScrollTrigger.refresh();

      if (process.env.NODE_ENV === "development") {
        (window as unknown as Record<string, unknown>).__ST = ScrollTrigger;
        (window as unknown as Record<string, unknown>).__SMOOTHER = smoother;
      }

      return () => smoother.kill();
    },
    { dependencies: [isDocument], revertOnUpdate: true },
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
