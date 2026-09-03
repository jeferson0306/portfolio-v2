"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger helper — multiplied by 60ms. */
  index?: number;
  className?: string;
};

/**
 * Fade + rise on first entry into the viewport. Used for everything that is not
 * driven by a GSAP scroll timeline, so the two systems never fight over the
 * same element.
 *
 * `initial` is deliberately constant: branching it on `useReducedMotion()` makes
 * the server and client render different inline styles, which React reports as a
 * hydration mismatch. Reduced motion is handled once, globally, by the
 * `<MotionConfig reducedMotion="user">` in the root layout.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
