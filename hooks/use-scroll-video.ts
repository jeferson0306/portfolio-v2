"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives `video.currentTime` from the scroll position instead of playback.
 *
 * The value is written through a GSAP-tweened proxy rather than assigned on
 * every scroll event, which keeps seeking smooth on codecs that only decode
 * cheaply at keyframes.
 */
export function useScrollVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  triggerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const video = videoRef.current;
    const trigger = triggerRef.current;
    if (!enabled || !video || !trigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const attach = () => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration === 0) return;

        // The video is scrubbed, never played — pausing avoids fighting the tween.
        video.pause();
        const progress = { time: 0 };

        gsap.to(progress, {
          time: duration,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top top",
            // Matches the hero's pinned distance so the clip finishes exactly
            // as the pin releases.
            end: "+=100%",
            scrub: 0.6,
          },
          onUpdate: () => {
            if (video.readyState >= 1) video.currentTime = progress.time;
          },
        });
      };

      if (video.readyState >= 1) attach();
      else video.addEventListener("loadedmetadata", attach, { once: true });
    }, trigger);

    return () => context.revert();
  }, [videoRef, triggerRef, enabled]);
}
