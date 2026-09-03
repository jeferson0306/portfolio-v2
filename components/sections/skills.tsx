"use client";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skillGroups } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

export function Skills() {
  const { t } = useI18n();

  return (
    <section
      id="stack"
      className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-48"
    >
      <SectionHeading eyebrow={t.skills.eyebrow} title={t.skills.title} />

      <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Reveal key={group.id} index={index}>
            <div className="group h-full rounded-2xl border border-[var(--border)] bg-white/[0.02] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--border-strong)] hover:bg-white/[0.04]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                0{index + 1}
              </p>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {t.skills.groups[group.id]}
              </h3>
              <ul className="mt-6 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-sm text-[var(--text-secondary)] transition-colors duration-500 group-hover:text-[var(--text-primary)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
