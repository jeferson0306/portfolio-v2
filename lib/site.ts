/** Canonical origin of the deployed site, including any base path. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeferson0306.github.io/portfolio-v2"
).replace(/\/$/, "");

/**
 * Where the site officially lives.
 *
 * The same build is published twice: at the domain root, and under
 * /portfolio-v2 so the older link keeps working. Two indexed copies of one site
 * compete with each other in search results and split whatever authority the
 * page earns, so exactly one of them is indexed — this one. The other serves
 * the same pages, names this as its canonical, and asks not to be listed.
 */
export const canonicalUrl = (
  process.env.NEXT_PUBLIC_CANONICAL_URL ?? "https://jeferson0306.github.io"
).replace(/\/$/, "");

/** True on the deployment that search engines should actually list. */
export const isCanonicalDeployment = siteUrl === canonicalUrl;

export const siteName = "Jeferson Siqueira";
export const siteTitle = "Jeferson Siqueira — Senior Full Stack Engineer";
export const siteDescription =
  "Senior Full Stack Engineer & Interactive UI Specialist. Cloud-native architectures, microservices and high-impact interfaces for BMW Group, Banco do Brasil, Lufthansa Group and more.";
