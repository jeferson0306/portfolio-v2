"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/lib/i18n/provider";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => { ready: Promise<void> };
};

/**
 * Theme switch with a circular wipe that opens from the button itself, using
 * the View Transitions API: the browser snapshots both themes and we animate
 * the clip-path of the incoming one.
 *
 * Everything degrades: without the API, or under reduced motion, the theme
 * simply changes.
 */
export function ThemeToggle() {
  const { t } = useI18n();
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  // The resolved theme is unknown on the server, so the icon is only decided
  // after mount — otherwise the markup would not match and React would warn.
  useEffect(() => setMounted(true), []);

  const isLight = resolvedTheme === "light";

  const toggle = async () => {
    const next = isLight ? "dark" : "light";
    const doc = document as ViewTransitionDocument;
    const button = buttonRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || !button || reduceMotion) {
      setTheme(next);
      return;
    }

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    // Reach the furthest corner, so the wipe always covers the viewport.
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // flushSync forces React to commit inside the snapshot window; without it
    // the transition captures the old tree twice and nothing appears to change.
    const transition = doc.startViewTransition(() => flushSync(() => setTheme(next)));
    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
      },
      {
        duration: 700,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={toggle}
      data-cursor
      aria-label={t.theme}
      title={t.theme}
      className="rounded-full border border-[var(--border)] p-2 transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
    >
      {mounted && isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
