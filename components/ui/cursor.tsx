"use client";

import { useEffect, useRef } from "react";
import { animate, createAnimatable, utils } from "animejs";

/**
 * Three-part cursor: a hard dot that tracks the pointer exactly, a soft ring
 * that lags behind it, and a label that names the action available under the
 * pointer.
 *
 * Any element can drive it:
 *   `data-cursor`                 → ring inflates
 *   `data-cursor-label="VIEW"`    → ring inflates further and shows the word
 *
 * Pointer-coarse devices (touch) never mount it.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduceMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // `createAnimatable` gives per-property damping without starting a fresh
    // tween on every pointermove event.
    const dotMotion = createAnimatable(dot, { x: 200, y: 200, ease: "out(3)" });
    const ringMotion = createAnimatable(ring, { x: 550, y: 550, ease: "out(3)" });

    let visible = false;
    let currentLabel: string | null = null;

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

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor], [data-cursor-label]",
      );
      const nextLabel = target?.dataset.cursorLabel ?? null;
      if (nextLabel === currentLabel) return;
      currentLabel = nextLabel;

      if (nextLabel) {
        // The label replaces the dot rather than crowding it.
        label.textContent = nextLabel;
        animate(ring, { scale: 3.4, opacity: 1, duration: 450, ease: "out(3)" });
        animate(dot, { scale: 0, duration: 250, ease: "out(3)" });
        animate(label, { opacity: 1, scale: [0.85, 1], duration: 350, ease: "out(3)" });
        return;
      }

      animate(ring, { scale: target ? 2.2 : 1, opacity: target ? 0.5 : 1, duration: 400 });
      animate(dot, { scale: 1, duration: 300 });
      animate(label, { opacity: 0, duration: 180 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      utils.remove([dot, ring, label]);
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
        className="pointer-events-none fixed left-0 top-0 z-[90] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 opacity-0 mix-blend-difference max-[1024px]:hidden"
      >
        <span
          ref={labelRef}
          className="text-[3.5px] font-medium uppercase tracking-[0.15em] text-white opacity-0"
        />
      </div>
    </>
  );
}
