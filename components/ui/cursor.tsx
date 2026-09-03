"use client";

import { useEffect, useRef } from "react";
import { animate, createAnimatable, utils } from "animejs";

/**
 * Two-part cursor: a hard dot that tracks the pointer exactly and a soft ring
 * that lags behind it. The ring inflates over anything marked `data-cursor`,
 * which is the interaction cue the rest of the page relies on.
 *
 * Pointer-coarse devices (touch) never mount it.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduceMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // `createAnimatable` gives per-property spring-like damping without running
    // a tween per mousemove event.
    const dotMotion = createAnimatable(dot, { x: 200, y: 200, ease: "out(3)" });
    const ringMotion = createAnimatable(ring, { x: 600, y: 600, ease: "out(3)" });

    let visible = false;

    const onMove = (event: PointerEvent) => {
      if (!visible) {
        visible = true;
        animate([dot, ring], { opacity: 1, duration: 300 });
      }
      dotMotion.x(event.clientX);
      dotMotion.y(event.clientY);
      ringMotion.x(event.clientX);
      ringMotion.y(event.clientY);
    };

    const onLeave = () => {
      visible = false;
      animate([dot, ring], { opacity: 0, duration: 200 });
    };

    const interactiveSelector = "a, button, [data-cursor]";

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(interactiveSelector);
      animate(ring, {
        scale: target ? 2.4 : 1,
        opacity: target ? 0.45 : 1,
        duration: 400,
        ease: "out(3)",
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      utils.remove([dot, ring]);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 mix-blend-difference max-[1024px]:hidden"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 opacity-0 mix-blend-difference max-[1024px]:hidden"
      />
    </>
  );
}
