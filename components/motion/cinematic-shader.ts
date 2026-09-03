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

  void main() {
    // Aspect-corrected coordinates so the haze never stretches on wide screens.
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    float t = uTime * 0.045;
    vec2 drift = vec2(t, -t * 0.6) + uPointer * 0.12 + vec2(0.0, uScroll * 0.35);

    // Domain warping: noise displacing the lookup of more noise. This is what
    // turns flat fbm into something that curls like real smoke.
    vec2 q = vec2(fbm(p * 0.75 + drift), fbm(p * 0.75 + drift + 5.2));
    vec2 r = vec2(
      fbm(p * 0.9 + 1.1 * q + vec2(1.7, 9.2) + drift * 1.4),
      fbm(p * 0.9 + 1.1 * q + vec2(8.3, 2.8) + drift * 1.1)
    );
    float density = fbm(p * 1.05 + 1.4 * r + drift);
    density = smoothstep(-0.7, 1.1, density);

    // Anamorphic light blade sweeping slowly across the frame.
    float blade = exp(-pow(abs(p.x - sin(uTime * 0.08) * 0.55) * 3.2, 2.0));
    blade *= smoothstep(1.0, -0.2, uv.y) * 0.35;

    // Cool, near-monochrome grade: dark base lifted by a faint blue highlight.
    vec3 base = vec3(0.012, 0.014, 0.020);
    vec3 haze = vec3(0.40, 0.45, 0.60);
    vec3 color = base + haze * density * 0.55 + vec3(0.55, 0.62, 0.78) * blade;

    // Vignette keeps the eye centred on the headline.
    float vignette = smoothstep(1.1, 0.15, length(p));
    color *= vignette;

    // Film grain, animated so it never looks like a static texture.
    float grain = fract(sin(dot(uv * uResolution + uTime, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * 0.025;

    gl_FragColor = vec4(color, 1.0);
  }
`;
