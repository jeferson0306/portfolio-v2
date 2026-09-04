"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * The fixed chrome — preloader, cursor, WebGL field, progress bar, navigation —
 * belongs to the site, not to every route. The CV is a document meant to be
 * printed, so none of it should follow the reader there.
 */
export function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/cv")) return null;
  return <>{children}</>;
}

/** True on routes that should scroll natively rather than through ScrollSmoother. */
export function useIsDocumentRoute() {
  const pathname = usePathname();
  return pathname?.startsWith("/cv") ?? false;
}
