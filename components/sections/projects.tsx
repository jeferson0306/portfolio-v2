"use client";

import { useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { CaseStudyPanel } from "@/components/sections/case-study";
import { caseStudyMetrics, projects } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

export function Projects() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [openId, setOpenId] = useState<string | null>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  // Flip matches elements by `data-flip-id`, so the id is moved from the card
  // to the panel: whichever one currently holds it is the animation's target.
  const open = (id: string, trigger: HTMLElement) => {
    lastTrigger.current = trigger;
    flipState.current = Flip.getState(`[data-flip-id="project-${id}"]`);
    setOpenId(id);
  };

  const close = () => {
    flipState.current = Flip.getState(`[data-flip-id="project-${openId}"]`);
    setOpenId(null);
    lastTrigger.current?.focus();
  };

  useGSAP(
    () => {
      const state = flipState.current;
      flipState.current = null;
      if (!state) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      Flip.from(state, {
        duration: 0.65,
        ease: "power3.inOut",
        absolute: true,
        scale: true,
      });

      if (openId) {
        gsap.from("[data-case-backdrop]", { opacity: 0, duration: 0.45, ease: "power2.out" });
      }
    },
    { dependencies: [openId], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      // Horizontal scroll is a desktop affordance only: on a phone the vertical
      // stack is both faster and easier to read.
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const root = rootRef.current;
        if (!track || !root) return;

        const distance = () => track.scrollWidth - window.innerWidth + 96;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => media.revert();
    },
    { scope: rootRef, dependencies: [t], revertOnUpdate: true },
  );

  return (
    <section id="work" ref={rootRef} className="relative z-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 pt-32 lg:px-12 lg:pt-40">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
            {t.projects.eyebrow}
          </p>
        </Reveal>
        <SplitHeading
          text={t.projects.title}
          className="text-display mt-5 max-w-3xl text-4xl font-semibold sm:text-5xl lg:text-6xl"
        />
      </div>

      <div
        ref={trackRef}
        className="mt-16 flex flex-col gap-6 px-6 pb-32 lg:mt-24 lg:flex-row lg:pb-40 lg:pl-12 lg:pr-24"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            index={index}
            project={project}
            hidden={openId === project.id}
            onOpen={open}
          />
        ))}
      </div>

      {openId ? <CaseStudyPanel projectId={openId} onClose={close} /> : null}
    </section>
  );
}

type ProjectCardProps = {
  index: number;
  project: (typeof projects)[number];
  hidden: boolean;
  onOpen: (id: string, trigger: HTMLElement) => void;
};

/** Card with a spotlight that follows the cursor via CSS custom properties. */
function ProjectCard({ index, project, hidden, onOpen }: ProjectCardProps) {
  const { t } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const metrics = caseStudyMetrics[project.id] ?? [];

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      // The id lives on the card only while the panel is closed; Flip animates
      // between whichever element holds it.
      data-flip-id={hidden ? undefined : `project-${project.id}`}
      onMouseMove={handleMouseMove}
      style={{ visibility: hidden ? "hidden" : undefined }}
      className="group relative flex h-full w-full shrink-0 flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface-raised)] p-8 transition-colors duration-500 hover:border-[var(--border-strong)] lg:w-[46vw] lg:p-12"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.08), transparent 70%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${project.name} — ${t.projects.view}`}
          data-cursor-label="GitHub"
          className="text-[var(--text-muted)] transition-colors duration-500 hover:text-[var(--text-primary)]"
        >
          <ArrowUpRight className="h-6 w-6" />
        </a>
      </div>

      <h3 className="text-display relative mt-10 text-3xl font-semibold lg:text-5xl">
        {project.name}
      </h3>

      <p className="relative mt-6 max-w-xl flex-1 leading-relaxed text-[var(--text-secondary)]">
        {t.projects.descriptions[project.id]}
      </p>

      {/* A taste of the numbers the case study expands on. */}
      <dl className="relative mt-10 flex flex-wrap gap-x-10 gap-y-4">
        {metrics.map((metric) => (
          <div key={metric.id}>
            <dd className="font-mono text-xl font-medium tabular-nums">{metric.value}</dd>
            <dt className="mt-1 text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
              {t.caseStudy.metrics[metric.id]}
            </dt>
          </div>
        ))}
      </dl>

      <button
        type="button"
        onClick={(event) => onOpen(project.id, event.currentTarget)}
        data-cursor-label={t.caseStudy.open}
        className="relative mt-10 self-start rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-[var(--text-primary)] hover:text-[var(--bg-body)]"
      >
        {t.caseStudy.open}
      </button>
    </div>
  );
}
