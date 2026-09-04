"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { notes } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

gsap.registerPlugin(useGSAP);

/**
 * The notes expand in place rather than opening a panel: five paragraphs read
 * better in the page flow than in a modal.
 *
 * The body stays in the DOM when collapsed — it is the highest-value text on
 * the site and should be indexable — and is made `inert` instead, so a
 * keyboard or screen reader never lands inside a section that is not open.
 */
export function Notes() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<string | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      notes.forEach((note) => {
        const panel = rootRef.current?.querySelector<HTMLElement>(`[data-note-body="${note.id}"]`);
        if (!panel) return;

        const isOpen = open === note.id;
        if (reduceMotion) {
          gsap.set(panel, { height: isOpen ? "auto" : 0 });
          return;
        }

        gsap.to(panel, {
          height: isOpen ? "auto" : 0,
          duration: 0.55,
          ease: "power3.inOut",
        });
      });
    },
    { scope: rootRef, dependencies: [open, t], revertOnUpdate: false },
  );

  return (
    <section
      id="notes"
      ref={rootRef}
      data-backdrop="none"
      className="relative z-10 border-t border-[var(--border)]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-48">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
              {t.notes.eyebrow}
            </p>
          </Reveal>
          <SplitHeading
            text={t.notes.title}
            className="text-display mt-5 text-4xl font-semibold sm:text-5xl lg:text-6xl"
          />
          <SplitHeading
            as="p"
            text={t.notes.lead}
            delay={0.15}
            className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          />
        </div>

        <div className="mt-16 lg:mt-20">
          {notes.map((note, index) => {
            const entry = t.notes.entries[note.id];
            const isOpen = open === note.id;

            return (
              <article
                key={note.id}
                className="border-t border-[var(--border)] py-8 last:border-b lg:py-10"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : note.id)}
                  aria-expanded={isOpen}
                  aria-controls={`note-${note.id}`}
                  data-cursor
                  className="group flex w-full items-start gap-6 text-left"
                >
                  <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1">
                    <span className="block text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
                      {entry.title}
                    </span>
                    <span className="mt-3 block max-w-2xl leading-relaxed text-[var(--text-secondary)]">
                      {entry.dek}
                    </span>
                    <span className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <time
                        dateTime={note.date}
                        className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]"
                      >
                        {note.date}
                      </time>
                      {note.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--border)] px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="mt-1 shrink-0 rounded-full border border-[var(--border)] p-2.5 transition-colors duration-300 group-hover:border-[var(--border-strong)] group-hover:bg-[var(--surface-hover)]"
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <div
                  id={`note-${note.id}`}
                  data-note-body={note.id}
                  inert={!isOpen}
                  style={{ height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="max-w-2xl pt-8 lg:pl-[3.25rem]">
                    {entry.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="mb-5 leading-[1.75] text-[var(--text-secondary)]"
                      >
                        {paragraph}
                      </p>
                    ))}

                    <p className="mt-8 border-l-2 border-[var(--border-strong)] pl-5 leading-relaxed text-[var(--text-primary)]">
                      {entry.takeaway}
                    </p>

                    <a
                      href={note.source}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor-label="GitHub"
                      className="mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors duration-300 hover:text-[var(--text-primary)]"
                    >
                      {t.notes.source}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
