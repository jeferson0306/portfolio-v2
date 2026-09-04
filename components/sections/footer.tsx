"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { ContactForm } from "@/components/ui/contact-form";
import { PhoneReveal } from "@/components/ui/phone-reveal";
import { contact } from "@/lib/content";
import { mailtoLink } from "@/lib/contact-links";
import { useI18n } from "@/lib/i18n/provider";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      data-backdrop="field"
      className="relative z-10 border-t border-[var(--border)] bg-[var(--bg-surface)]/40"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-40">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
            {t.footer.eyebrow}
          </p>
        </Reveal>
        <SplitHeading
          text={t.footer.title}
          className="text-display mt-6 max-w-3xl text-4xl font-semibold sm:text-5xl lg:text-6xl"
        />
        <SplitHeading
          as="p"
          text={t.footer.lead}
          delay={0.15}
          className="mt-6 max-w-xl leading-relaxed text-[var(--text-secondary)]"
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* The form first: it is the path that needs no app switch. */}
          <Reveal index={3}>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {t.contact.formTitle}
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal index={4}>
            <div className="space-y-10">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {t.footer.email}
                </p>
                <a
                  href={mailtoLink(t)}
                  data-cursor
                  className="mt-3 inline-flex items-center gap-3 text-lg tracking-tight transition-opacity hover:opacity-70 sm:text-xl"
                >
                  <Mail className="h-4 w-4 text-[var(--text-muted)]" />
                  {contact.email}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {t.footer.phone}
                </p>
                <PhoneReveal />
              </div>
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
              data-cursor
              className="rounded-full border border-[var(--border)] p-3 transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              data-cursor
              className="rounded-full border border-[var(--border)] p-3 transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
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
