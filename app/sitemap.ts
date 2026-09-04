import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// `output: export` refuses a metadata route that has not declared itself
// static — there is no server to regenerate it.
export const dynamic = "force-static";

/** Emitted as a static /sitemap.xml by the export. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
