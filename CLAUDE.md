# portfolio-v2 — notes for AI agents

Personal portfolio for Jeferson Siqueira. Static site, no backend, no database.

## Rules

- Follow `dev-standards/AGENTS.md` (Padrão Jeferson). This project was scaffolded
  from `starters/web-landing`.
- **Code in English**, UI copy never hard-coded — everything goes through
  `lib/i18n/` with PT, EN and ES kept in sync. `lib/i18n/types.ts` is the
  contract; a missing translation must fail `pnpm typecheck`.
- Prettier: double quotes, semicolons. Run `pnpm format` before committing.
- Conventional Commits. No `Co-Authored-By` lines.

## Architecture

- `app/` — App Router. One page; the layout owns the fixed chrome (preloader,
  cursor, ambient WebGL, progress bar, navbar) and wraps the page in
  `SmoothScroll`.
- `components/sections/` — one file per page section.
- `components/motion/` — shared animation primitives and the GLSL background.
- `lib/content.ts` — facts. `lib/i18n/` — words.
- `scripts/generate-hero-video.mjs` — regenerates the hero clip with ffmpeg.

## Animation gotchas

- `position: sticky` does **not** work inside ScrollSmoother's content. Use
  ScrollTrigger `pin` instead.
- `useGSAP` does not revert the previous context when dependencies change unless
  `revertOnUpdate: true` is set. Without it, every ScrollTrigger is duplicated
  when the locale changes — which silently breaks pinned sections.
- SplitText moves text nodes out of React's control, so a component whose text
  can change must be remounted (`key={text}`), not patched.
- `background-clip: text` does not survive being split into per-line elements;
  `.text-shine` uses a mask instead.
