/**
 * What sits behind a section — the medium, not the texture.
 *
 * Two earlier attempts at making this page feel less uniform changed the shader
 * and left everything else alone: the same full-bleed canvas, at the same
 * distance from the content, in the same soft dark haze, from the first section
 * to the last. Six different noise functions inside one unchanging frame still
 * read as one unchanging frame.
 *
 * So the frame changes instead. Half the page has no canvas at all, and the
 * sections that replace it do so with a different *kind* of thing: type, a
 * diagram, a grid of real elements, or nothing.
 *
 * Declared per section rather than in a central map, because a section that
 * moves should take its backdrop with it, and because sections outside the
 * navigation rail need one too.
 */
export type Backdrop =
  /** The WebGL field: atmospheric, soft, full-bleed. */
  | "field"
  /** Deliberately empty. After noise, silence is the strongest contrast there is. */
  | "none"
  /** Enormous type set behind the content and driven by it. */
  | "type"
  /** The section's own diagram, scaled past the frame and dimmed. */
  | "diagram"
  /** A grid of real elements lighting in a wave — crisp, not hazy. */
  | "grid"
  /** A hard monospace rule. Reads as a tool rather than as a mood. */
  | "terminal"
  /** Inverted: dark on light, with hard edges top and bottom. */
  | "paper";

/**
 * Spread onto a section's root element.
 *
 *     <section {...backdrop("none")}>
 */
export function backdrop(kind: Backdrop) {
  return { "data-backdrop": kind };
}

/** How visible the WebGL field is under each medium. */
export const fieldOpacity: Record<Backdrop, number> = {
  field: 1,
  // Not zero: a trace keeps the page from looking like two different sites
  // stitched together, while being far too faint to read as the same backdrop.
  none: 0,
  type: 0.12,
  diagram: 0.1,
  grid: 0.08,
  terminal: 0,
  paper: 0,
};
