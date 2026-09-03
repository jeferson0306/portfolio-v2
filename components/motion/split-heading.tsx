"use client";

import { createElement, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Intentionally narrow: the reveal is measured per line, which only makes
 *  sense on elements that lay text out as a block. */
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

type SplitHeadingProps = {
  text: string;
  as?: HeadingTag;
  className?: string;
  /** `chars` is for short display lines; `lines` reads better for paragraphs. */
  split?: "chars" | "lines" | "words";
  delay?: number;
  /** Play immediately instead of waiting for the element to scroll into view. */
  immediate?: boolean;
};

/**
 * Masked per-line (or per-character) reveal. Each unit rises out of a clipped
 * container, which is what makes the motion read as typography rather than as a
 * block of text sliding around.
 */
export function SplitHeading({
  text,
  as: Tag = "h2",
  className,
  split = "lines",
  delay = 0,
  immediate = false,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Hidden from here rather than in the server-rendered markup: if the
      // JavaScript never runs, the heading stays readable instead of being an
      // invisible block. `useGSAP` runs in a layout effect, so this still lands
      // before the first paint.
      gsap.set(element, { opacity: 0 });

      // `onSplit` re-runs after font load and on resize, so the mask never ends
      // up measured against the fallback font.
      const instance = SplitText.create(element, {
        type: split === "chars" ? "chars,words,lines" : split,
        mask: split,
        linesClass: "overflow-hidden",
        autoSplit: true,
        onSplit: (self) => {
          const targets =
            split === "chars" ? self.chars : split === "words" ? self.words : self.lines;

          gsap.set(element, { opacity: 1 });

          return gsap.from(targets, {
            yPercent: 115,
            rotate: split === "chars" ? 2 : 0,
            duration: 1.1,
            delay,
            ease: "expo.out",
            stagger: split === "chars" ? 0.018 : 0.09,
            scrollTrigger: immediate
              ? undefined
              : { trigger: element, start: "top 85%", once: true },
          });
        },
      });

      return () => instance.revert();
    },
    { scope: ref, dependencies: [text, split, delay, immediate], revertOnUpdate: true },
  );

  // SplitText replaces the element's children with its own per-line nodes, which
  // React no longer owns — so a changed `text` (a language switch) cannot be
  // patched in place. Keying on the text remounts the element instead.
  return createElement(Tag, { key: text, ref, className }, text);
}
