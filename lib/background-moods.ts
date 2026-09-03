/**
 * The ambient background is one continuous field whose grade, density and
 * motion change as the page is scrolled, so the sections do not all sit on an
 * identical backdrop.
 *
 * Each stop is a target at a scroll position; the shader reads a value
 * interpolated between the two surrounding stops, which is what keeps the
 * change gradual instead of switching at section boundaries.
 *
 * Saturation is deliberately low throughout — these are grades of the same
 * dark room, not different rooms.
 */
export type BackgroundMood = {
  /** Scroll progress, 0 at the top of the document, 1 at the bottom. */
  at: number;
  /** Colour the empty field settles to. */
  base: [number, number, number];
  /** Colour the haze adds on top of the base. */
  haze: [number, number, number];
  /** How much of the frame the haze fills. */
  density: number;
  /** Feature size of the noise: lower is broader and calmer. */
  scale: number;
  /** Strength of the blueprint grid overlay. */
  grid: number;
  /** Drift speed multiplier. */
  speed: number;
};

export const backgroundMoods: BackgroundMood[] = [
  // Hero — cool smoke, the densest the page gets before the stack section.
  {
    at: 0.0,
    base: [0.012, 0.014, 0.02],
    haze: [0.4, 0.45, 0.6],
    density: 0.55,
    scale: 1.0,
    grid: 0,
    speed: 1.0,
  },
  // Manifesto — thinned right out so the statement has the frame to itself.
  {
    at: 0.16,
    base: [0.01, 0.011, 0.016],
    haze: [0.3, 0.34, 0.46],
    density: 0.3,
    scale: 0.7,
    grid: 0,
    speed: 0.65,
  },
  // Trajectory — warmer graphite, the only place the field leaves blue.
  {
    at: 0.36,
    base: [0.017, 0.016, 0.014],
    haze: [0.54, 0.49, 0.42],
    density: 0.5,
    scale: 1.2,
    grid: 0,
    speed: 0.9,
  },
  // Architecture — the haze recedes and a faint blueprint grid surfaces.
  {
    at: 0.56,
    base: [0.008, 0.014, 0.021],
    haze: [0.24, 0.44, 0.58],
    density: 0.26,
    scale: 1.1,
    grid: 1.0,
    speed: 0.5,
  },
  // Stack — denser and faster, with a violet cast under the technology grid.
  {
    at: 0.78,
    base: [0.018, 0.013, 0.025],
    haze: [0.5, 0.4, 0.68],
    density: 0.6,
    scale: 1.45,
    grid: 0.2,
    speed: 1.25,
  },
  // Work and contact — settles back down to close the page.
  {
    at: 1.0,
    base: [0.01, 0.012, 0.02],
    haze: [0.34, 0.4, 0.58],
    density: 0.46,
    scale: 0.9,
    grid: 0,
    speed: 0.8,
  },
];

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export type MoodValues = {
  base: [number, number, number];
  haze: [number, number, number];
  density: number;
  scale: number;
  grid: number;
  speed: number;
};

/** Interpolates the two stops surrounding `progress`, eased so the handover
 *  between stops has no visible corner. */
export function moodAt(progress: number): MoodValues {
  const clamped = Math.min(1, Math.max(0, progress));

  let upper = backgroundMoods.findIndex((mood) => mood.at >= clamped);
  if (upper <= 0) upper = 1;
  const from = backgroundMoods[upper - 1];
  const to = backgroundMoods[upper];

  const span = to.at - from.at;
  const t = smoothstep(span === 0 ? 0 : (clamped - from.at) / span);

  return {
    base: [
      mix(from.base[0], to.base[0], t),
      mix(from.base[1], to.base[1], t),
      mix(from.base[2], to.base[2], t),
    ],
    haze: [
      mix(from.haze[0], to.haze[0], t),
      mix(from.haze[1], to.haze[1], t),
      mix(from.haze[2], to.haze[2], t),
    ],
    density: mix(from.density, to.density, t),
    scale: mix(from.scale, to.scale, t),
    grid: mix(from.grid, to.grid, t),
    speed: mix(from.speed, to.speed, t),
  };
}
