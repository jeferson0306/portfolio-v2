/**
 * Fullscreen fragment shader for the ambient background.
 *
 * It layers fractal Brownian motion over a domain-warped field to get slowly
 * drifting volumetric haze, then adds anamorphic light blades and film grain.
 * The result reads like graded footage rather than a gradient, and costs a
 * fraction of what streaming a video file would.
 */
export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform vec2 uResolution;

  // Grade and behaviour, interpolated on the CPU from lib/background-moods.ts.
  uniform vec3 uBase;
  uniform vec3 uHaze;
  uniform float uDensity;
  uniform float uScale;
  uniform float uGrid;

  // Two scenes are evaluated and mixed, so a change of scene crossfades over a
  // stretch of scroll instead of cutting at a section boundary. The branch is on
  // a uniform, so every fragment takes the same path and it stays cheap.
  uniform int uSceneA;
  uniform int uSceneB;
  uniform float uSceneBlend;

  // 0 in dark theme, 1 in light. Animated, so the whole field inverts smoothly.
  uniform float uInvert;

  // --- Value noise -------------------------------------------------------
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;

    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;

    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(
      dot(a, hash(i)),
      dot(b, hash(i + o)),
      dot(c, hash(i + 1.0))
    );

    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p *= 2.02;
      amplitude *= 0.5;
    }
    return value;
  }

  /** Drifting smoke: noise displacing the lookup of more noise. */
  float sceneSmoke(vec2 p, vec2 drift) {
    vec2 q = vec2(fbm(p * 0.75 + drift), fbm(p * 0.75 + drift + 5.2));
    vec2 r = vec2(
      fbm(p * 0.9 + 1.1 * q + vec2(1.7, 9.2) + drift * 1.4),
      fbm(p * 0.9 + 1.1 * q + vec2(8.3, 2.8) + drift * 1.1)
    );
    return smoothstep(-0.7, 1.1, fbm(p * 1.05 + 1.4 * r + drift));
  }

  /** Almost nothing: a breath of cloud, so the text has the frame to itself. */
  float sceneVoid(vec2 p, vec2 drift) {
    return smoothstep(-0.9, 1.5, fbm(p * 0.45 + drift * 0.6)) * 0.55;
  }

  /** Sediment: thin horizontal seams, warped so they never look ruled. */
  float sceneStrata(vec2 p, vec2 drift) {
    float warp = fbm(vec2(p.x * 0.55, p.y * 0.28) + drift * 1.2);
    float seam = sin(p.y * 7.5 + warp * 4.2 + drift.x * 2.0);
    return pow(smoothstep(0.55, 1.0, abs(seam)), 2.0) * 0.9;
  }

  /** Technical rule: a grid of lines, brightest where the page is looking. */
  float sceneBlueprint(vec2 p, vec2 drift) {
    vec2 cell = abs(fract(p * 2.6 + vec2(drift.x * 0.3, 0.0)) - 0.5);
    float line = 1.0 - smoothstep(0.0, 0.03, min(cell.x, cell.y));
    float node = 1.0 - smoothstep(0.0, 0.08, length(cell));
    return line * 0.5 + node * 0.9;
  }

  /** Dot matrix with a slow pulse travelling out from the centre. */
  float sceneLattice(vec2 p, vec2 drift) {
    vec2 cell = fract(p * 3.4 + vec2(0.0, drift.y * 0.4)) - 0.5;
    float dots = 1.0 - smoothstep(0.05, 0.13, length(cell));
    float pulse = 0.55 + 0.45 * sin(length(p) * 3.2 - drift.x * 6.0);
    return dots * pulse;
  }

  /** Curtains of light, hanging and swaying vertically. */
  float sceneAurora(vec2 p, vec2 drift) {
    float sway = fbm(vec2(p.x * 0.7, drift.y * 0.8)) * 1.8;
    float curtain = exp(-pow(abs(sin(p.x * 2.4 + sway)) * 2.6, 2.0));
    return curtain * smoothstep(-0.9, 0.7, p.y + fbm(p * 0.8 + drift) * 0.6);
  }

  float scene(int mode, vec2 p, vec2 drift) {
    if (mode == 1) return sceneVoid(p, drift);
    if (mode == 2) return sceneStrata(p, drift);
    if (mode == 3) return sceneBlueprint(p, drift);
    if (mode == 4) return sceneLattice(p, drift);
    if (mode == 5) return sceneAurora(p, drift);
    return sceneSmoke(p, drift);
  }

  /** Faint blueprint rule, strongest at the centre and fading to the edges. */
  float blueprint(vec2 p) {
    vec2 cell = abs(fract(p * 3.2) - 0.5);
    float line = min(cell.x, cell.y);
    return 1.0 - smoothstep(0.0, 0.022, line);
  }

  void main() {
    // Aspect-corrected coordinates so the haze never stretches on wide screens.
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
    p *= uScale;

    float t = uTime * 0.045;
    vec2 drift = vec2(t, -t * 0.6) + uPointer * 0.12 + vec2(0.0, uScroll * 0.35);

    // The two neighbouring scenes, crossfaded by scroll position.
    float density = mix(
      scene(uSceneA, p, drift),
      scene(uSceneB, p, drift),
      uSceneBlend
    );

    // Anamorphic light blade sweeping slowly across the frame.
    float blade = exp(-pow(abs(p.x - sin(uTime * 0.08) * 0.55) * 3.2, 2.0));
    blade *= smoothstep(1.0, -0.2, uv.y) * 0.35;

    // The 0.58 keeps the field recessive: the scenes still read against each
    // other, but none of them ever competes with the text sitting on top.
    vec3 color = uBase + uHaze * density * uDensity * 0.58 + vec3(0.55, 0.62, 0.78) * blade * 0.7;

    // Blueprint overlay: only present where the current mood asks for it, and
    // pulled back at the edges so it reads as a surface, not a texture.
    float rule = blueprint(p + vec2(uTime * 0.004, 0.0));
    color += vec3(0.20, 0.42, 0.56) * rule * uGrid * 0.16 * smoothstep(1.4, 0.2, length(p));

    // Vignette keeps the eye centred on the headline.
    float vignette = smoothstep(1.05, 0.05, length(p));
    color *= vignette;

    // Film grain, animated so it never looks like a static texture.
    float grain = fract(sin(dot(uv * uResolution + uTime, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.025;

    // Light theme: the same field, photographed on white instead of black.
    // Inverting keeps every scene's structure and only swaps the ground.
    color = mix(color, vec3(0.97) - color * 1.05, uInvert);

    gl_FragColor = vec4(color, 1.0);
  }
`;
