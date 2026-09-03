# portfolio-v2

Personal portfolio of **Jeferson Siqueira** — Senior Full Stack Engineer &
Interactive UI Specialist.

A cinematic, dark, scroll-driven single page — statically exported, no server
required. Each section deliberately uses a different relationship with the
scroll rather than repeating one entrance animation:

| Section      | Archetype                                                               |
| ------------ | ----------------------------------------------------------------------- |
| Hero         | the scroll is the video's playhead (ScrollTrigger scrubs `currentTime`) |
| Manifesto    | pinned; the statement lights up word by word as you scroll              |
| Trajectory   | split layout with a pinned panel naming the entry being read            |
| Metrics      | counters that run once on entry                                         |
| Architecture | an SVG request path that draws itself along the scroll                  |
| Brands       | a marquee whose speed and direction follow scroll velocity              |
| Stack        | a grid that ripples outward from the hovered cell                       |
| Work         | pinned horizontal scroll; cards morph into case studies with GSAP Flip  |

## Stack

| Layer              | Choice                                                 |
| ------------------ | ------------------------------------------------------ |
| Framework          | Next.js 16 (App Router, `output: "export"`) + React 19 |
| Language           | TypeScript, strict                                     |
| Styling            | Tailwind CSS v4 + CSS custom properties                |
| Scroll & timelines | GSAP 3 — ScrollTrigger, ScrollSmoother, SplitText      |
| Component motion   | Framer Motion                                          |
| Micro-interactions | anime.js v4 (preloader, cursor, counters)              |
| 3D / ambient       | Three.js via React Three Fiber (custom GLSL)           |
| Type               | Inter (self-hosted through `next/font`)                |
| i18n               | PT / EN / ES, no hard-coded UI copy                    |
| Deploy             | GitHub Pages via GitHub Actions                        |

## Running locally

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

Other scripts:

```bash
pnpm build         # static export into out/
pnpm typecheck     # tsc --noEmit
pnpm format        # prettier --write .
pnpm format:check  # what CI runs
```

## Editing the content

All content lives in two places, and neither of them is a component:

- **`lib/content.ts`** — the language-independent facts: companies, dates, job
  titles, brand names, technology labels, project links, contact details.
- **`lib/i18n/{pt,en,es}.ts`** — every string a reader sees, keyed by the ids in
  `content.ts`. Adding a job means adding an entry to `experiences` and one line
  to `timeline.roles` in each of the three dictionaries; `lib/i18n/types.ts`
  makes TypeScript fail the build if a translation is missing.

The visitor's language is detected from the browser on first visit and can be
changed from the switcher in the header; the choice is remembered locally.

## The hero background

`public/media/hero.mp4` is **generated locally** — no stock footage, no
generation service, no licence to track:

```bash
node scripts/generate-hero-video.mjs --seconds 8 --fps 25
```

The script renders the same volumetric field as the live WebGL background
(`components/motion/cinematic-shader.ts`) and encodes it with ffmpeg, forcing a
keyframe every five frames so that scroll-scrubbing seeks instantly. The clip is
never played: GSAP ScrollTrigger drives `video.currentTime` from the scroll
position.

To use your own footage instead, drop any `hero.mp4` into `public/media/` — see
[`docs/hero-media.md`](docs/hero-media.md) for the encode settings. If the file is missing, the
hero falls back to the live WebGL field, so the page never breaks.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the static
export and publishes it to GitHub Pages. `NEXT_PUBLIC_BASE_PATH` is set to the
repository name at build time because project pages are served from a sub-path.

**One-time setup:** in _Settings → Pages_, set **Source** to _GitHub Actions_.

To deploy to Vercel or Cloudflare Pages instead, point the project at this repo
and leave `NEXT_PUBLIC_BASE_PATH` unset — the site is served from the domain
root there.

### Custom domain

Add a `CNAME` file to `public/` containing the domain, configure it under
_Settings → Pages_, and unset `NEXT_PUBLIC_BASE_PATH` in the workflow.

## Accessibility and performance notes

- Every animation is gated behind `prefers-reduced-motion`; headings are
  readable with JavaScript disabled.
- The WebGL layer mounts only when the browser is idle and is skipped entirely
  under reduced motion.
- The hero clip is `preload="metadata"` and backed by a poster frame, so it
  never blocks first paint.
