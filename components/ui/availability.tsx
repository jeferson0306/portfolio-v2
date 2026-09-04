"use client";

import { useEffect, useState } from "react";
import { availability } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

/** Reads the hour in Lisbon regardless of where the visitor is. */
function lisbonNow() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: availability.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = parts.find((part) => part.type === "minute")?.value ?? "00";
  return { hour, label: `${String(hour).padStart(2, "0")}:${minute}` };
}

/**
 * Availability strip: a live clock in the timezone the work actually happens
 * in, and whether a message is likely to be seen now. It answers "is this
 * person around?" without anyone having to ask.
 *
 * Rendered only after mount — the server has no idea what time it is for the
 * reader, and a mismatched first render would be a hydration error.
 */
export function Availability() {
  const { t } = useI18n();
  const [now, setNow] = useState<ReturnType<typeof lisbonNow> | null>(null);

  useEffect(() => {
    setNow(lisbonNow());
    const timer = window.setInterval(() => setNow(lisbonNow()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  const working =
    now !== null &&
    now.hour >= availability.workingHours.from &&
    now.hour < availability.workingHours.to;

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
      <span className="inline-flex items-center gap-2.5 text-[var(--text-secondary)]">
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        {t.availability.open}
      </span>

      <span className="font-mono tabular-nums">
        {t.availability.localTime} {now?.label ?? "--:--"}
      </span>

      <span>{working ? t.availability.replyWithin : t.availability.outsideHours}</span>
    </div>
  );
}
