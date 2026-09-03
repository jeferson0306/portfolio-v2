"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, stagger, utils } from "animejs";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Entry curtain: a counter runs to 100 while the fonts and the WebGL layer
 * settle, then the panels wipe away. anime.js drives it because its timeline and
 * stagger API express this kind of one-shot choreography compactly.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      document.body.dataset.loaded = "true";
      return;
    }

    const progress = { value: 0 };
    const counter = counterRef.current;

    const timeline = createTimeline({
      defaults: { ease: "inOutQuart" },
      onComplete: () => {
        setDone(true);
        document.body.dataset.loaded = "true";
        // Layout was frozen behind the curtain; re-measure now that it is not.
        ScrollTrigger.refresh();
      },
    });

    timeline
      .add(progress, {
        value: 100,
        duration: 1500,
        ease: "inOutExpo",
        modifier: utils.round(0),
        onUpdate: () => {
          if (counter) counter.textContent = String(Math.round(progress.value)).padStart(3, "0");
        },
      })
      .add("[data-preloader-label]", { opacity: 0, y: -20, duration: 500 }, "-=200")
      .add(
        "[data-preloader-panel]",
        {
          scaleY: 0,
          duration: 900,
          ease: "inOutExpo",
          delay: stagger(70),
        },
        "-=200",
      );

    return () => {
      timeline.pause();
    };
  }, []);

  useEffect(() => {
    // The curtain owns the scroll position until it lifts.
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  useEffect(() => {
    // Keep the label crisp on high-refresh displays without a layout thrash.
    if (!done && rootRef.current) animate(rootRef.current, { opacity: [0, 1], duration: 200 });
  }, [done]);

  if (done) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] flex items-end justify-between">
      <div aria-hidden className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} data-preloader-panel className="h-full flex-1 origin-top bg-black" />
        ))}
      </div>

      <div
        data-preloader-label
        className="relative flex w-full items-end justify-between px-6 pb-10 lg:px-12"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
          Jeferson Siqueira
        </span>
        <span
          ref={counterRef}
          className="font-mono text-5xl font-medium tabular-nums sm:text-7xl"
          aria-hidden
        >
          000
        </span>
      </div>
    </div>
  );
}
