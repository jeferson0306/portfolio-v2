import type { MetadataRoute } from "next";
import { canonicalUrl, isCanonicalDeployment } from "@/lib/site";

// `output: export` refuses a metadata route that has not declared itself
// static — there is no server to regenerate it.
export const dynamic = "force-static";

/** Emitted as a static /robots.txt by the export. */
export default function robots(): MetadataRoute.Robots {
  // Both copies allow crawling — see the note on `robots` in app/layout.tsx —
  // but only the canonical one advertises a sitemap, so the mirror never
  // invites a crawler to enumerate a second set of the same pages.
  return isCanonicalDeployment
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${canonicalUrl}/sitemap.xml` }
    : { rules: { userAgent: "*", allow: "/" } };
}
