"use client";

import { useState, type FormEvent } from "react";
import { animate } from "animejs";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { contact, contactFormKey } from "@/lib/content";
import { useI18n } from "@/lib/i18n/provider";

type Status = "idle" | "sending" | "sent" | "failed";

/**
 * Posts to Web3Forms, which accepts a form submission from a static page and
 * emails it on — no backend, no build step, no server to keep alive.
 *
 * Without a key configured the form is not rendered at all and the mailto link
 * stands in, so a fork of this repository degrades cleanly instead of silently
 * dropping messages.
 */
export function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>("idle");

  if (!contactFormKey) {
    return (
      <a
        href={`mailto:${contact.email}`}
        data-cursor
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-[var(--text-primary)] hover:text-[var(--bg-body)]"
      >
        {t.contact.fallback}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    );
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error(String(response.status));

      setStatus("sent");
      form.reset();
      animate("[data-contact-sent]", {
        opacity: [0, 1],
        y: [10, 0],
        duration: 500,
        ease: "out(3)",
      });
    } catch {
      setStatus("failed");
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors duration-300 placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] focus:bg-[var(--surface-hover)]";

  return (
    <form onSubmit={submit} className="max-w-xl space-y-3">
      <input type="hidden" name="access_key" value={contactFormKey} />
      <input type="hidden" name="subject" value="Portfolio — new message" />
      {/* Web3Forms drops any submission that fills this in. */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} aria-hidden />

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">{t.contact.name}</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder={t.contact.name}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="sr-only">{t.contact.email}</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder={t.contact.email}
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="sr-only">{t.contact.message}</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={t.contact.message}
          className={`${fieldClass} resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "sending"}
          data-cursor
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-[var(--text-primary)] hover:text-[var(--bg-body)] disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t.contact.sending}
            </>
          ) : (
            t.contact.send
          )}
        </button>

        {status === "sent" ? (
          <span
            data-contact-sent
            role="status"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]"
          >
            <Check className="h-4 w-4" />
            {t.contact.sent}
          </span>
        ) : null}

        {status === "failed" ? (
          <span role="alert" className="text-sm text-[var(--text-secondary)]">
            {t.contact.failed}{" "}
            <a href={`mailto:${contact.email}`} className="underline underline-offset-4">
              {contact.email}
            </a>
          </span>
        ) : null}
      </div>
    </form>
  );
}
