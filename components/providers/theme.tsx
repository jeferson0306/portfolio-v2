"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * `next-themes` is used for the parts that are easy to get wrong by hand:
 * reading the system preference, persisting the choice, and writing the
 * attribute before first paint so the page never flashes the wrong theme.
 *
 * The attribute is `data-theme` because the palette in globals.css is keyed on
 * it, and the WebGL background reads the same attribute to invert its field.
 */
export function Theme({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
