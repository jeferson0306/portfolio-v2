/** Canonical origin of the deployed site, including any base path. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jeferson0306.github.io/portfolio-v2"
).replace(/\/$/, "");

export const siteName = "Jeferson Siqueira";
export const siteTitle = "Jeferson Siqueira — Senior Full Stack Engineer";
export const siteDescription =
  "Senior Full Stack Engineer & Interactive UI Specialist. Cloud-native architectures, microservices and high-impact interfaces for BMW Group, Banco do Brasil, Lufthansa Group and more.";
