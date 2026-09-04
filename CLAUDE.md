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
- `lib/background-moods.ts` — the scroll-keyed stops of the ambient field. Each
  stop names a _scene_ (an index into the `scene()` branch in
  `cinematic-shader.ts`), not only a grade. Adding a section usually means
  adding or moving a stop.
- `lib/tech-icons.ts` — **generated**, do not edit. Run `pnpm icons` after
  changing the stack list; `simple-icons` is a devDependency precisely so its
  ~3000 icons never reach the client bundle.
- `scripts/generate-hero-video.mjs` — regenerates the hero clip with ffmpeg;
  see `docs/hero-media.md`. Nothing but real assets belongs in `public/`: every
  file there is published to the live site.

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
- GSAP Flip matches elements by `data-flip-id`. Only one element may carry a
  given id at a time, so the project card drops its id while its case study
  panel is open.
- `position: fixed` resolves against the transformed `#smooth-content`, not the
  viewport. Overlays must be portalled to `document.body`.

## The API console

`NEXT_PUBLIC_VALIDATOR_API` points the console at the deployed Go service. It is
**deliberately unset**: the service at api-data-validator.onrender.com sends no
`Access-Control-Allow-Origin`, so a browser on the published site is blocked and
every call would silently fall back — while the badge claimed the service had
answered. Set the variable only once the service sends CORS headers.

The live path treats 400 and 422 as answers, not failures: the service uses them
for "bad request" and "invalid value". Only a network error or a timeout falls
back to the local rules, and when it does the panel says so.

## Notes

`lib/notes.ts` data lives in `lib/content.ts`; the prose is in the dictionaries,
in all three languages. Every claim in a note is traceable to the repository it
links to — several come from the travel-platform ADRs. **Do not add a note whose
detail cannot be checked against committed work.**

The bodies stay in the DOM when collapsed (they are the most valuable text on
the site for search) and are made `inert` instead, so focus and screen readers
never enter a closed section.

## Data that must not be committed

Phone numbers, the WhatsApp handle and the Web3Forms key come from
`NEXT_PUBLIC_*` variables, never from source: the repository is public. They are
GitHub Actions _variables_ (not secrets — they all reach the client bundle) and
are listed in `.env.example`. Every consumer degrades gracefully when a value is
missing; keep it that way.

## Theming

- The palette lives entirely in CSS variables on `:root` and `[data-theme="light"]`.
  **Never write a literal colour in a component** — no `bg-white`, no `bg-black/60`.
  Use the semantic tokens (`--surface-raised`, `--scrim`, `--rule`, `--mote`).
  The one exception is the cursor, which sits under `mix-blend-difference`.
- The WebGL field reads `document.documentElement.dataset.theme` directly and
  inverts. Its `uInvert` uniform is **seeded** from the theme at mount, not
  eased up from zero, or a light page flashes a black field on the first frame.

## React gotchas already paid for

- An effect that locks `document.body.style.overflow` must not depend on a
  callback prop: the callback is a new function on every parent render, so the
  effect re-runs, captures its own `"hidden"` as the value to restore, and
  leaves the page unscrollable. Split the lock into its own `[]` effect.
- Anything a user must see has to be visible without JavaScript and under
  `prefers-reduced-motion`. Reveal _from_ JavaScript (`gsap.set(..., opacity: 0)`
  in a layout effect), never by shipping `opacity: 0` in the markup, and use
  `gsap.from` rather than `gsap.to` for entrances.
