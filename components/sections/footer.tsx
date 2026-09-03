"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Flag } from "@/components/ui/flag";
import { contact, phones } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative z-10 border-t border-[var(--border)] bg-[var(--bg-surface)]/40"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-40">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
            {t.footer.eyebrow}
          </p>
        </Reveal>
        <Reveal index={1}>
          <h2 className="text-display mt-6 max-w-3xl text-4xl font-semibold sm:text-5xl lg:text-6xl">
            {t.footer.title}
          </h2>
        </Reveal>
        <Reveal index={2}>
          <p className="mt-6 max-w-xl leading-relaxed text-[var(--text-secondary)]">
            {t.footer.lead}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 sm:grid-cols-2">
          <Reveal index={3}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {t.footer.email}
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="group mt-3 inline-flex items-center gap-3 text-lg tracking-tight transition-opacity hover:opacity-70 sm:text-xl"
              >
                <Mail className="h-4 w-4 text-[var(--text-muted)]" />
                {contact.email}
              </a>
            </div>
          </Reveal>

          <Reveal index={4}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {t.footer.phone}
              </p>
              <ul className="mt-3 space-y-2">
                {phones.map((phone) => (
                  <li key={phone.country}>
                    <a
                      href={phone.href}
                      data-cursor
                      className="inline-flex items-center gap-3 text-lg tracking-tight transition-opacity hover:opacity-70 sm:text-xl"
                    >
                      <Flag country={phone.country} />
                      {phone.label}
                      <span className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        {t.footer.countries[phone.country]}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="rule-fade mt-20" />

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="rounded-full border border-[var(--border)] p-3 transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-white/[0.04]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="rounded-full border border-[var(--border)] p-3 transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-white/[0.04]"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>

          <div className="text-xs text-[var(--text-muted)] sm:text-right">
            <p>
              © {year} Jeferson Siqueira. {t.footer.rights}
            </p>
            <p className="mt-1">{t.footer.builtWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
