"use client";

import { Printer } from "lucide-react";
import { brands, contact, experiences, phones, projects, skillGroups } from "@/lib/content";
import { mailtoLink } from "@/lib/contact-links";
import { formatPeriod } from "@/lib/format";
import { useI18n } from "@/lib/i18n/provider";

/**
 * The CV is built from the same `lib/content.ts` and dictionaries as the site,
 * so the two can never disagree — updating a role updates both.
 *
 * There is no PDF generator here on purpose: the browser's own print-to-PDF
 * produces a smaller, selectable, accessible file than anything worth shipping
 * a rendering pipeline for, and it works offline.
 */
export function CurriculumVitae() {
  const { t } = useI18n();

  return (
    <div className="cv-document mx-auto max-w-[820px] px-6 py-14 text-[var(--text-primary)] sm:px-10">
      <div className="print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="mb-12 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-[var(--text-primary)] hover:text-[var(--bg-body)]"
        >
          <Printer className="h-4 w-4" />
          {t.cv.print}
        </button>
      </div>

      <header>
        <h1 className="text-4xl font-semibold tracking-tight">Jeferson Siqueira</h1>
        <p className="mt-2 text-lg text-[var(--text-secondary)]">{t.hero.subtitle}</p>

        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-[var(--text-secondary)]">
          <li>
            <a href={mailtoLink(t)}>{contact.email}</a>
          </li>
          {phones.map((phone) => (
            <li key={phone.country}>
              <a href={phone.href}>{phone.label}</a>
            </li>
          ))}
          <li>
            <a href={contact.linkedin}>linkedin.com/in/developerjefersonsiqueira</a>
          </li>
          <li>
            <a href={contact.github}>github.com/jeferson0306</a>
          </li>
        </ul>
      </header>

      <Section title={t.cv.summary}>
        <p className="leading-relaxed text-[var(--text-secondary)]">{t.manifesto.text}</p>
      </Section>

      <Section title={t.cv.experience}>
        <ol className="space-y-7">
          {experiences.map((experience) => (
            <li key={experience.id} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-base font-semibold">{experience.company}</h3>
                <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  {formatPeriod(experience, t)}
                </p>
              </div>
              <p className="mt-0.5 text-sm font-medium text-[var(--text-secondary)]">
                {experience.role}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {t.timeline.roles[experience.id]}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title={t.cv.skills}>
        <dl className="grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.id}>
              <dt className="text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]">
                {t.skills.groups[group.id]}
              </dt>
              <dd className="mt-1.5 text-sm text-[var(--text-secondary)]">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={t.cv.projects}>
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-base font-semibold">{project.name}</h3>
                <a href={project.href} className="font-mono text-xs text-[var(--text-muted)]">
                  {project.href.replace("https://", "")}
                </a>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                {t.projects.descriptions[project.id]}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.cv.clients}>
        <p className="text-sm text-[var(--text-secondary)]">{brands.join(" · ")}</p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 break-inside-avoid">
      <h2 className="border-b border-[var(--border)] pb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
