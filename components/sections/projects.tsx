"use client";

import { useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { SplitHeading } from "@/components/motion/split-heading";
import { projects } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

/** Card with a spotlight that follows the cursor via CSS custom properties. */
function ProjectCard({
  index,
  href,
  name,
  description,
  stack,
  view,
}: {
  index: number;
  href: string;
  name: string;
  description: string;
  stack: string[];
  view: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      data-project-card
      onMouseMove={handleMouseMove}
      className="group relative flex h-full w-full shrink-0 flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-white/[0.02] p-8 transition-colors duration-500 hover:border-[var(--border-strong)] lg:w-[46vw] lg:p-12"
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
        <ArrowUpRight className="h-6 w-6 shrink-0 text-[var(--text-muted)] transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--text-primary)]" />
      </div>

      <h3 className="text-display relative mt-10 text-3xl font-semibold lg:text-5xl">{name}</h3>

      <p className="relative mt-6 max-w-xl flex-1 leading-relaxed text-[var(--text-secondary)]">
        {description}
      </p>

      <ul className="relative mt-10 flex flex-wrap gap-2">
        {stack.map((item) => (
          <li
            key={item}
            className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]"
          >
            {item}
          </li>
        ))}
      </ul>

      <span className="relative mt-8 text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] transition-colors duration-500 group-hover:text-[var(--text-primary)]">
        {view}
      </span>
    </a>
  );
}

export function Projects() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Horizontal scroll is a desktop affordance only: on a phone the vertical
      // stack below is both faster and easier to read.
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        },
        () => {
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
        },
      );

      return () => media.revert();
    },
    { scope: rootRef, dependencies: [t], revertOnUpdate: true },
  );

  return (
    <section id="work" ref={rootRef} className="relative z-10 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 pt-32 lg:px-12 lg:pt-40">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
          {t.projects.eyebrow}
        </p>
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
            href={project.href}
            name={project.name}
            description={t.projects.descriptions[project.id]}
            stack={project.stack}
            view={t.projects.view}
          />
        ))}
      </div>
    </section>
  );
}
