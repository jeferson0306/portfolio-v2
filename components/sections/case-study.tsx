"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";
import { caseStudyDemos, caseStudyMetrics, projects } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

type CaseStudyPanelProps = {
  projectId: string;
  onClose: () => void;
};

/**
 * Full-screen detail for one project. Rendered through a portal because
 * ScrollSmoother transforms `#smooth-content`, and a transformed ancestor
 * makes `position: fixed` resolve against it instead of the viewport.
 *
 * The element carrying `data-flip-id` is the one GSAP Flip animates the card
 * into — see `Projects`.
 */
export function CaseStudyPanel({ projectId, onClose }: CaseStudyPanelProps) {
  const { t } = useI18n();
  const closeRef = useRef<HTMLButtonElement>(null);
  const project = projects.find((candidate) => candidate.id === projectId);

  // Deliberately two effects. `onClose` is a new function on every parent
  // render, so an effect depending on it re-runs constantly — and a scroll lock
  // that re-runs captures its own "hidden" as the value to restore, leaving the
  // page unscrollable after the panel closes.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  if (!project) return null;

  const metrics = caseStudyMetrics[project.id] ?? [];
  const highlights = t.caseStudy.highlights[project.id] ?? [];
  const demo = caseStudyDemos[project.id];

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      className="fixed inset-0 z-[95] overflow-y-auto"
    >
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        onClick={onClose}
        data-case-backdrop
        // Opaque by default: the fade-in is an enhancement, so the scrim must
        // still be there when animation is switched off or JavaScript fails.
        className="fixed inset-0 h-full w-full cursor-default bg-black/80 backdrop-blur-xl"
      />

      <div className="relative mx-auto min-h-full w-full max-w-5xl px-6 py-16 lg:px-10 lg:py-24">
        <div
          data-flip-id={`project-${project.id}`}
          className="rounded-3xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] p-8 lg:p-14"
        >
          <div className="flex items-start justify-between gap-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {t.projects.eyebrow}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              data-cursor
              aria-label={t.caseStudy.close}
              className="rounded-full border border-[var(--border)] p-2.5 transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-white/[0.06]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <h2 className="text-display mt-8 text-4xl font-semibold lg:text-6xl">{project.name}</h2>

          <p className="mt-6 max-w-2xl leading-relaxed text-[var(--text-secondary)] lg:text-lg">
            {t.caseStudy.summaries[project.id]}
          </p>

          <dl className="mt-12 grid gap-8 border-t border-[var(--border)] pt-8 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.id}>
                <dd className="text-display font-mono text-3xl font-medium tabular-nums lg:text-4xl">
                  {metric.value}
                </dd>
                <dt className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {t.caseStudy.metrics[metric.id]}
                </dt>
              </div>
            ))}
          </dl>

          <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {t.caseStudy.highlightsLabel}
          </h3>
          <ul className="mt-6 space-y-4">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-4 leading-relaxed text-[var(--text-secondary)]"
              >
                <span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-white/45" />
                {highlight}
              </li>
            ))}
          </ul>

          <ul className="mt-12 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor-label="GitHub"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-white hover:text-black"
            >
              {t.projects.view}
              <ArrowUpRight className="h-4 w-4" />
            </a>
            {demo ? (
              <a
                href={demo}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor-label="Demo"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                {t.caseStudy.demo}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
