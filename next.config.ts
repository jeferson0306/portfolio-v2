import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * The site is a fully static export so it can be served by GitHub Pages,
 * Vercel or Cloudflare Pages without a Node runtime.
 *
 * `NEXT_PUBLIC_BASE_PATH` is set by the GitHub Pages workflow to "/portfolio-v2"
 * because project pages are served from a sub-path. It stays empty everywhere
 * else (local dev, Vercel, custom domain).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const config: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: { root: rootDir },
};

export default config;
