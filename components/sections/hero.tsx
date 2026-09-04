"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { SplitHeading } from "@/components/motion/split-heading";
import { useScrollVideo } from "@/hooks/use-scroll-video";
import { useI18n } from "@/lib/i18n/provider";
import { assetPath } from "@/lib/asset";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Optional asset: drop a file at public/media/hero.mp4 to enable the footage
  // layer. Until then the WebGL field behind the page stands in for it.
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    // A cached clip can already have its metadata by the time React attaches
    // `onLoadedMetadata`, so the event alone is not enough to detect it.
    const video = videoRef.current;
    if (video && video.readyState >= 1) setHasVideo(true);
  }, []);

  useScrollVideo(videoRef, sectionRef, hasVideo);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // The hero holds still for one viewport height while its contents recede
      // — the scroll distance that the video scrub and the fade share.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
          },
        })
        .to("[data-hero-content]", { yPercent: -12, opacity: 0, ease: "power1.in" }, 0)
        .to("[data-hero-scrim]", { opacity: 1, ease: "none" }, 0)
        .to("[data-hero-media]", { scale: 1.12, ease: "none" }, 0)
        .to("[data-hero-indicator]", { opacity: 0, duration: 0.3, ease: "none" }, 0);
    },
    { scope: sectionRef, dependencies: [t], revertOnUpdate: true },
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      data-backdrop="field"
      className="grain relative flex h-screen items-center overflow-hidden"
      aria-label={t.hero.title}
    >
      <div data-hero-media className="absolute inset-0 will-change-transform">
        {/* Footage layer — stays hidden until the file is confirmed to exist. */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover transition-opacity duration-1000"
          // The clip is dark smoke, so the light theme dims it rather than
          // fighting it — the value lives with the rest of the palette.
          style={{ opacity: hasVideo ? "var(--hero-clip-opacity)" : 0 }}
          src={assetPath("/media/hero.mp4")}
          poster={assetPath("/media/hero-poster.jpg")}
          muted
          playsInline
          // The clip is scrubbed, never played: metadata is enough to start,
          // and the poster covers the frames before the first seek lands.
          preload="metadata"
          disablePictureInPicture
          aria-hidden
          onLoadedMetadata={() => setHasVideo(true)}
          onError={() => setHasVideo(false)}
        />
      </div>

      {/* Legibility overlay, plus a scrim that closes in as the hero scrolls away. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: "var(--hero-overlay)" }}
      />
      <div
        data-hero-scrim
        aria-hidden
        className="absolute inset-0 opacity-0"
        style={{ backgroundColor: "var(--hero-scrim)" }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div data-hero-content className="max-w-5xl">
          <SplitHeading
            as="p"
            text={t.hero.eyebrow}
            split="words"
            immediate
            delay={0.2}
            className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--text-muted)]"
          />

          <SplitHeading
            as="h1"
            text={t.hero.title}
            split="chars"
            immediate
            delay={0.4}
            className="text-shine text-display mt-8 text-[clamp(2.75rem,7.5vw,7.5rem)] font-semibold"
          />

          <SplitHeading
            as="p"
            text={t.hero.subtitle}
            split="lines"
            immediate
            delay={1.1}
            className="mt-8 max-w-xl text-base text-[var(--text-secondary)] sm:text-lg"
          />

          <div className="mt-12 animate-[fadeIn_0.9s_ease-out_1.5s_both]">
            <a
              href="#trajectory"
              data-cursor
              className="group inline-flex items-center gap-3 rounded-full border border-[var(--border-strong)] px-7 py-3.5 text-sm font-medium transition-colors duration-300 hover:bg-[var(--text-primary)] hover:text-[var(--bg-body)]"
            >
              {t.hero.cta}
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div
        data-hero-indicator
        className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 animate-[fadeIn_0.9s_ease-out_1.8s_both]"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">
          {t.hero.scroll}
        </span>
        <span aria-hidden className="relative h-10 w-px overflow-hidden bg-[var(--rule)]">
          <span className="absolute inset-x-0 top-0 h-4 animate-[scrollHint_2s_ease-in-out_infinite] bg-[var(--rule-strong)]" />
        </span>
      </div>
    </section>
  );
}
