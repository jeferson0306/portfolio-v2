#!/usr/bin/env node
/**
 * Renders `public/media/hero.mp4` from the same volumetric field the WebGL
 * background uses, then encodes it with ffmpeg.
 *
 * Everything runs locally — no generation service, no credits, no licensing.
 * The field is rendered small and upscaled on purpose: it is pure atmospheric
 * haze, so the softness reads as depth of field rather than as low resolution.
 *
 * Usage: node scripts/generate-hero-video.mjs [--seconds 8] [--fps 25]
 */

import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT = resolve(ROOT, "public/media/hero.mp4");

// Render resolution. ffmpeg upscales to 1920x1080 on the way out.
const WIDTH = 384;
const HEIGHT = 216;

const args = new Map();
for (let i = 2; i < process.argv.length; i += 2) {
  args.set(process.argv[i].replace(/^--/, ""), process.argv[i + 1]);
}
const FPS = Number(args.get("fps") ?? 25);
const SECONDS = Number(args.get("seconds") ?? 8);
const FRAMES = Math.round(FPS * SECONDS);

// --- Noise ------------------------------------------------------------------
// 2D simplex-style gradient noise, ported from the GLSL in
// components/motion/cinematic-shader.ts so the video and the live shader share
// a visual identity.

/** GLSL `fract`: always positive, unlike JavaScript's `%` on negatives. */
const fract = (value) => value - Math.floor(value);

function hash(x, y, out) {
  const dx = x * 127.1 + y * 311.7;
  const dy = x * 269.5 + y * 183.3;
  out[0] = -1 + 2 * fract(Math.sin(dx) * 43758.5453123);
  out[1] = -1 + 2 * fract(Math.sin(dy) * 43758.5453123);
}

const K1 = 0.366025404;
const K2 = 0.211324865;
const gradient = new Float64Array(2);

function noise(px, py) {
  const skew = (px + py) * K1;
  const ix = Math.floor(px + skew);
  const iy = Math.floor(py + skew);

  const unskew = (ix + iy) * K2;
  const ax = px - ix + unskew;
  const ay = py - iy + unskew;

  const m = ay < ax ? 1 : 0;
  const ox = m;
  const oy = 1 - m;

  const bx = ax - ox + K2;
  const by = ay - oy + K2;
  const cx = ax - 1 + 2 * K2;
  const cy = ay - 1 + 2 * K2;

  let total = 0;

  const ha = Math.max(0.5 - (ax * ax + ay * ay), 0);
  hash(ix, iy, gradient);
  total += ha * ha * ha * ha * (ax * gradient[0] + ay * gradient[1]);

  const hb = Math.max(0.5 - (bx * bx + by * by), 0);
  hash(ix + ox, iy + oy, gradient);
  total += hb * hb * hb * hb * (bx * gradient[0] + by * gradient[1]);

  const hc = Math.max(0.5 - (cx * cx + cy * cy), 0);
  hash(ix + 1, iy + 1, gradient);
  total += hc * hc * hc * hc * (cx * gradient[0] + cy * gradient[1]);

  return total * 70;
}

function fbm(x, y) {
  let value = 0;
  let amplitude = 0.5;
  let fx = x;
  let fy = y;
  for (let octave = 0; octave < 4; octave++) {
    value += amplitude * noise(fx, fy);
    fx *= 2.02;
    fy *= 2.02;
    amplitude *= 0.5;
  }
  return value;
}

const smoothstep = (edge0, edge1, x) => {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
};

// --- Frame rendering --------------------------------------------------------

const ASPECT = WIDTH / HEIGHT;

function renderFrame(frameIndex, buffer) {
  // The camera pushes forward over the clip: the field is sampled at a slowly
  // shrinking scale, which reads as a dolly move rather than a pan.
  const time = frameIndex / FPS;
  const t = time * 0.045;
  const zoom = 1 - time * 0.012;

  const driftX = t;
  const driftY = -t * 0.6;
  const bladeCenter = Math.sin(time * 0.08) * 0.55;

  let offset = 0;

  for (let py = 0; py < HEIGHT; py++) {
    const v = py / HEIGHT;
    const y = (v - 0.5) * zoom;

    for (let px = 0; px < WIDTH; px++) {
      const u = px / WIDTH;
      const x = (u - 0.5) * ASPECT * zoom;

      // Domain warping: noise displacing the lookup of more noise. This is what
      // turns flat fbm into something that curls like real smoke.
      const qx = fbm(x * 0.75 + driftX, y * 0.75 + driftY);
      const qy = fbm(x * 0.75 + driftX + 5.2, y * 0.75 + driftY + 1.3);

      const rx = fbm(
        x * 0.9 + 1.1 * qx + 1.7 + driftX * 1.4,
        y * 0.9 + 1.1 * qy + 9.2 + driftY * 1.4,
      );
      const ry = fbm(
        x * 0.9 + 1.1 * qx + 8.3 + driftX * 1.1,
        y * 0.9 + 1.1 * qy + 2.8 + driftY * 1.1,
      );

      let density = fbm(x * 1.05 + 1.4 * rx + driftX, y * 1.05 + 1.4 * ry + driftY);
      density = smoothstep(-0.7, 1.1, density);

      // Anamorphic light blade sweeping slowly across the frame.
      let blade = Math.exp(-Math.pow(Math.abs(x - bladeCenter) * 3.2, 2));
      blade *= smoothstep(1.0, -0.2, v) * 0.35;

      // Cool, near-monochrome grade: dark base lifted by a faint blue highlight.
      let r = 0.012 + 0.4 * density * 0.55 + 0.55 * blade;
      let g = 0.014 + 0.45 * density * 0.55 + 0.62 * blade;
      let b = 0.02 + 0.6 * density * 0.55 + 0.78 * blade;

      const vignette = smoothstep(1.1, 0.15, Math.hypot(x, y));
      r *= vignette;
      g *= vignette;
      b *= vignette;

      buffer[offset++] = Math.min(255, Math.max(0, Math.round(r * 255)));
      buffer[offset++] = Math.min(255, Math.max(0, Math.round(g * 255)));
      buffer[offset++] = Math.min(255, Math.max(0, Math.round(b * 255)));
    }
  }
}

// --- Encode -----------------------------------------------------------------

mkdirSync(dirname(OUTPUT), { recursive: true });

const ffmpeg = spawn(
  "ffmpeg",
  [
    "-y",
    "-f",
    "rawvideo",
    "-pix_fmt",
    "rgb24",
    "-s",
    `${WIDTH}x${HEIGHT}`,
    "-r",
    String(FPS),
    "-i",
    "-",
    // Upscale and soften the interpolation artefacts. Grain is deliberately
    // NOT baked in here — encoding it costs several megabytes, and the hero
    // already overlays an animated grain layer in CSS.
    "-vf",
    "scale=1920:1080:flags=lanczos,gblur=sigma=1.1",
    "-c:v",
    "libx264",
    "-profile:v",
    "high",
    "-crf",
    "26",
    // A keyframe every 5 frames (0.2 s) keeps scroll-scrubbing instant without
    // the file size of an all-intra encode.
    "-g",
    "5",
    "-keyint_min",
    "5",
    "-sc_threshold",
    "0",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    OUTPUT,
  ],
  { stdio: ["pipe", "inherit", "inherit"] },
);

const buffer = Buffer.allocUnsafe(WIDTH * HEIGHT * 3);
const started = Date.now();

for (let frame = 0; frame < FRAMES; frame++) {
  renderFrame(frame, buffer);

  if (!ffmpeg.stdin.write(buffer)) {
    await new Promise((done) => ffmpeg.stdin.once("drain", done));
  }

  if (frame % 25 === 0) {
    process.stderr.write(`  rendered ${frame}/${FRAMES} frames\n`);
  }
}

ffmpeg.stdin.end();

await new Promise((done, fail) => {
  ffmpeg.on("close", (code) =>
    code === 0 ? done() : fail(new Error(`ffmpeg exited with code ${code}`)),
  );
});

// A poster frame lets the hero paint instantly while the clip buffers.
const POSTER = OUTPUT.replace(/\.mp4$/, "-poster.jpg");
await new Promise((done, fail) => {
  const poster = spawn("ffmpeg", ["-y", "-i", OUTPUT, "-frames:v", "1", "-q:v", "4", POSTER], {
    stdio: ["ignore", "ignore", "ignore"],
  });
  poster.on("close", (code) =>
    code === 0 ? done() : fail(new Error(`poster encode failed with code ${code}`)),
  );
});

process.stderr.write(`done in ${((Date.now() - started) / 1000).toFixed(1)}s -> ${OUTPUT}\n`);
