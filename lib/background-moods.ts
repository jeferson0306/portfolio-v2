/**
 * The ambient background changes *kind* as the page is scrolled, not only
 * colour: smoke, then near-emptiness, then sediment seams, a blueprint rule, a
 * dot lattice and finally curtains of light.
 *
 * Each stop is a target at a scroll position; the shader reads a value
 * interpolated between the two surrounding stops, which is what keeps the
 * change gradual instead of switching at section boundaries.
 *
 * Saturation is deliberately low throughout — these are grades of the same
 * dark room, not different rooms.
 */
/** Scene index; must match the `scene()` branch in cinematic-shader.ts. */
export const Scene = {
  Smoke: 0,
  Void: 1,
  Strata: 2,
  Blueprint: 3,
  Lattice: 4,
  Aurora: 5,
} as const;

export type BackgroundMood = {
  /** Which field is drawn at this stop, not merely how it is graded. */
  scene: number;
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
  // Hero — cool smoke, the densest the page gets.
  {
    at: 0.0,
    scene: Scene.Smoke,
    base: [0.012, 0.014, 0.02],
    haze: [0.4, 0.45, 0.6],
    density: 0.58,
    scale: 1.0,
    grid: 0,
    speed: 1.0,
  },
  // Manifesto — almost empty, so the statement has the frame to itself.
  {
    at: 0.17,
    scene: Scene.Void,
    base: [0.01, 0.011, 0.016],
    haze: [0.32, 0.36, 0.48],
    density: 0.4,
    scale: 0.7,
    grid: 0,
    speed: 0.6,
  },
  // Trajectory — sediment seams: layers laid down one on top of another.
  {
    at: 0.37,
    scene: Scene.Strata,
    base: [0.017, 0.016, 0.014],
    haze: [0.56, 0.5, 0.42],
    density: 0.5,
    scale: 1.15,
    grid: 0,
    speed: 0.85,
  },
  // Architecture — a technical rule under a technical drawing.
  {
    at: 0.57,
    scene: Scene.Blueprint,
    base: [0.008, 0.014, 0.021],
    haze: [0.22, 0.42, 0.58],
    density: 0.34,
    scale: 1.0,
    grid: 0.35,
    speed: 0.45,
  },
  // Stack — a dot lattice pulsing behind the technology grid.
  {
    at: 0.78,
    scene: Scene.Lattice,
    base: [0.016, 0.012, 0.024],
    haze: [0.46, 0.38, 0.66],
    density: 0.42,
    scale: 1.3,
    grid: 0,
    speed: 1.1,
  },
  // Work and contact — curtains of light to close the page.
  {
    at: 1.0,
    scene: Scene.Aurora,
    base: [0.01, 0.012, 0.02],
    haze: [0.36, 0.42, 0.62],
    density: 0.55,
    scale: 0.95,
    grid: 0,
    speed: 0.75,
  },
];

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export type MoodValues = {
  /** The two scenes to evaluate, and how far between them we are. */
  sceneA: number;
  sceneB: number;
  sceneBlend: number;
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
    sceneA: from.scene,
    sceneB: to.scene,
    sceneBlend: t,
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
