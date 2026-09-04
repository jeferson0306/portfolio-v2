import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// `output: export` refuses a metadata route that has not declared itself
// static — there is no server to regenerate it.
export const dynamic = "force-static";

/** Emitted as a static /robots.txt by the export. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
