import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

export function SectionHeading({ eyebrow, title, lead, children }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[var(--text-muted)]">
          {eyebrow}
        </p>
      </Reveal>

      <SplitHeading
        text={title}
        className="text-display mt-5 text-4xl font-semibold sm:text-5xl lg:text-6xl"
      />

      {lead ? (
        <SplitHeading
          as="p"
          text={lead}
          delay={0.15}
          className="mt-6 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
        />
      ) : null}

      {children}
    </div>
  );
}
