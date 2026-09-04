"use client";

import { useState } from "react";
import { animate } from "animejs";
import { Check, Loader2, Play, X } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { validatorApi, validatorFields } from "@/lib/content";
import { runValidation, type ValidationResult } from "@/lib/validation/run";
import { useI18n } from "@/lib/i18n/provider";

type Payload = ValidationResult | Record<string, unknown>;
type State = {
  status: "idle" | "running" | "waking" | "done";
  /** Which side actually answered — never assumed, always observed. */
  source: "local" | "live" | null;
  valid: boolean;
  payload: Payload | null;
};

/** Render's free tier sleeps after 15 minutes; the first request pays the wake. */
const WAKE_HINT_AFTER_MS = 2500;
const GIVE_UP_AFTER_MS = 55_000;

/**
 * A working console for the Data Validator API.
 *
 * With `NEXT_PUBLIC_VALIDATOR_API` set it calls the deployed Go service; unset,
 * it runs the same rules in the browser and says so. It never pretends a local
 * result came from a server — the badge above the response states which is
 * which, because a portfolio that fakes a live demo is worse than one without.
 */
export function Playground() {
  const { t } = useI18n();
  const [field, setField] = useState(validatorFields[0]);
  const [value, setValue] = useState(validatorFields[0].sample);
  const [state, setState] = useState<State>({
    status: "idle",
    source: null,
    valid: false,
    payload: null,
  });

  const live = validatorApi !== "";
  const requestLine = `GET /v1/validate?${field.param}=${encodeURIComponent(value)}`;

  const run = async () => {
    setState({ status: "running", source: null, valid: false, payload: null });

    if (!live) {
      const result = runValidation(field.id, value);
      settle("local", result.valid, result);
      return;
    }

    // A cold service can take the best part of a minute to answer. Saying so is
    // better than looking broken.
    const hint = window.setTimeout(
      () => setState((prev) => (prev.status === "running" ? { ...prev, status: "waking" } : prev)),
      WAKE_HINT_AFTER_MS,
    );

    try {
      const url = `${validatorApi.replace(/\/$/, "")}/v1/validate?${field.param}=${encodeURIComponent(value)}`;
      const response = await fetch(url, { signal: AbortSignal.timeout(GIVE_UP_AFTER_MS) });
      // The service answers 422 for an invalid value and 400 for a bad request.
      // Those are answers, not failures — only a network error is a failure.
      const body = (await response.json()) as Record<string, unknown>;
      settle("live", body.is_valid === true, body);
    } catch {
      // Unreachable, asleep past the timeout, or blocked by CORS: fall back and
      // say so, rather than leaving a dead console.
      const result = runValidation(field.id, value);
      settle("local", result.valid, result);
    } finally {
      window.clearTimeout(hint);
    }
  };

  const settle = (source: "local" | "live", valid: boolean, payload: Payload) => {
    setState({ status: "done", source, valid, payload });
    animate("[data-playground-response]", {
      opacity: [0, 1],
      y: [8, 0],
      duration: 420,
      ease: "out(3)",
    });
  };

  const selectField = (next: (typeof validatorFields)[number]) => {
    setField(next);
    setValue(next.sample);
    setState({ status: "idle", source: null, valid: false, payload: null });
  };

  return (
    <section id="playground" className="relative z-10 border-t border-[var(--border)]">
      <div className="mx-auto max-w-[1400px] px-6 py-32 lg:px-12 lg:py-48">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
              {t.playground.eyebrow}
            </p>
          </Reveal>
          <SplitHeading
            text={t.playground.title}
            className="text-display mt-5 text-4xl font-semibold sm:text-5xl lg:text-6xl"
          />
          <SplitHeading
            as="p"
            text={t.playground.lead}
            delay={0.15}
            className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
          />
        </div>

        {/* Deliberately not wrapped in <Reveal>: this is the working part of
            the page, and it must never depend on an entrance animation having
            run in order to be visible. */}
        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-2">
          {/* Request */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-7 lg:p-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {t.playground.request}
            </p>

            <div className="mt-6 flex flex-wrap gap-2" role="group">
              {validatorFields.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectField(item)}
                  aria-pressed={item.id === field.id}
                  data-cursor
                  className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 ${
                    item.id === field.id
                      ? "bg-[var(--text-primary)] text-[var(--bg-body)]"
                      : "border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {t.playground.fields[item.id]}
                </button>
              ))}
            </div>

            <label className="mt-6 block">
              <span className="sr-only">{t.playground.fields[field.id]}</span>
              <input
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && run()}
                spellCheck={false}
                autoComplete="off"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] px-4 py-3 font-mono text-sm outline-none transition-colors duration-300 focus:border-[var(--border-strong)] focus:bg-[var(--surface-hover)]"
              />
            </label>

            <p className="mt-5 overflow-x-auto whitespace-nowrap font-mono text-xs text-[var(--text-muted)]">
              {requestLine}
            </p>

            <button
              type="button"
              onClick={run}
              disabled={state.status === "running"}
              data-cursor
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 py-3 text-sm font-medium transition-colors duration-300 hover:bg-[var(--text-primary)] hover:text-[var(--bg-body)] disabled:opacity-60"
            >
              {state.status === "running" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {t.playground.run}
            </button>
          </div>

          {/* Response */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-raised)] p-7 lg:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                {t.playground.response}
              </p>
              <span className="rounded-full border border-[var(--border)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                {live ? t.playground.modeLive : t.playground.modeLocal}
              </span>
            </div>

            {state.payload ? (
              <div data-playground-response className="mt-6">
                <p
                  className={`inline-flex items-center gap-2 text-sm font-medium ${
                    state.valid ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {state.valid ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  {state.valid ? t.playground.valid : t.playground.invalid}
                </p>

                {/* When the service answers, its own body is shown verbatim —
                    reshaping it would hide the contract the reader came to see. */}
                <pre className="mt-5 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--bg-body)]/40 p-5 font-mono text-xs leading-relaxed text-[var(--text-secondary)]">
                  {JSON.stringify(state.payload, null, 2)}
                </pre>

                {live && state.source === "local" ? (
                  <p className="mt-4 text-xs text-[var(--text-muted)]">{t.playground.fellBack}</p>
                ) : null}
              </div>
            ) : (
              <p className="mt-6 font-mono text-xs text-[var(--text-muted)]">—</p>
            )}

            <p className="mt-6 text-xs text-[var(--text-muted)]">{t.playground.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
