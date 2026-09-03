const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes a public-folder path with the deployment base path. */
export function assetPath(path: string): string {
  return `${basePath}${path}`;
}
