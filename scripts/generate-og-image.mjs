#!/usr/bin/env node
/**
 * Renders `public/og.png`, the Open Graph card.
 *
 * Next's `opengraph-image` file convention would do this too, but it emits the
 * file with no extension and takes precedence over explicit metadata. Static
 * hosts type files by extension, so that URL is served as
 * `application/octet-stream` and every social scraper rejects it. Generating
 * the PNG here puts a normal `.png` in `public/` instead.
 *
 * Usage: node scripts/generate-og-image.mjs
 */

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const row = (style, children) => h("div", { style: { display: "flex", ...style } }, children);

const card = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: 80,
      background: "#000000",
      backgroundImage:
        "radial-gradient(circle at 28% 0%, rgba(96,106,148,0.38), transparent 55%), radial-gradient(circle at 88% 100%, rgba(58,68,108,0.32), transparent 50%)",
      color: "#fafafa",
      fontFamily: "sans-serif",
    },
  },
  [
    row(
      { fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#71717a" },
      "Jeferson Siqueira",
    ),
    row(
      {
        marginTop: 28,
        fontSize: 84,
        lineHeight: 1.05,
        letterSpacing: -3,
        fontWeight: 600,
        maxWidth: 900,
      },
      "Senior Full Stack Engineer",
    ),
    row(
      { marginTop: 28, fontSize: 30, color: "#a1a1aa", maxWidth: 880 },
      "Cloud-native architectures, microservices and interactive interfaces.",
    ),
    row(
      { marginTop: 44, gap: 20, fontSize: 22, color: "#52525b" },
      // Each label is its own element: `gap` does not apply between bare text
      // nodes, so a flat array of strings renders with no separation at all.
      ["Java", "Kotlin", "Quarkus", "AWS", "Kubernetes", "React"].flatMap((label, index) =>
        index === 0
          ? [h("span", { key: label }, label)]
          : [h("span", { key: `${label}-sep` }, "·"), h("span", { key: label }, label)],
      ),
    ),
  ],
);

const response = new ImageResponse(card, { width: 1200, height: 630 });
const buffer = Buffer.from(await response.arrayBuffer());

writeFileSync(resolve(ROOT, "public/og.png"), buffer);
process.stderr.write(`wrote public/og.png (${(buffer.length / 1024).toFixed(0)} kB)\n`);
