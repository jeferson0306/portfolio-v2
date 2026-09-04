"use client";

import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Availability } from "@/components/ui/availability";
import { services } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

/**
 * What can actually be bought, and in what shape. The rest of the page proves
 * capability; this section is the one that answers "so what would I be hiring,
 * and for how long".
 */
export function Services() {
  const { t } = useI18n();

  return (
    <section id="services" data-backdrop="paper" className="relative z-10">
      <div className="mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-48">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
              {t.services.eyebrow}
            </p>
          </Reveal>
          <SplitHeading
            text={t.services.title}
            className="text-display mt-5 text-4xl font-semibold sm:text-5xl lg:text-6xl"
          />
          <SplitHeading
            as="p"
            text={t.services.lead}
            delay={0.15}
            className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          />
        </div>

        <Reveal index={2}>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Availability />
            <Link
              href="/cv"
              data-cursor
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
            >
              <FileText className="h-3.5 w-3.5" />
              {t.cv.download}
            </Link>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} index={index} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--border-strong)] lg:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  0{index + 1}
                </p>

                <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                  {t.services.names[service.id]}
                </h3>

                <p className="mt-4 leading-relaxed text-[var(--text-secondary)]">
                  {t.services.summaries[service.id]}
                </p>

                <ul className="mt-8 flex-1 space-y-3">
                  {t.services.deliverables[service.id].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                      <span
                        aria-hidden
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--mote)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-[var(--border)] pt-6">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {t.services.shape}
                  </p>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {t.services.shapes[service.id]}
                  </p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {service.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
