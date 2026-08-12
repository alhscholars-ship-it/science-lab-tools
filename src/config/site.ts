const productionUrl = "https://sciencecalchub.com";

function normalizeUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

// SEO-critical URLs must always resolve to the public canonical domain.
// An incorrect/missing environment variable must never produce localhost or a staging hostname.
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl =
  configuredUrl && normalizeUrl(configuredUrl) === productionUrl
    ? productionUrl
    : productionUrl;

export const siteConfig = {
  name: "ALH Science Hub",
  shortName: "ALH Science",
  description:
    "A focused learning platform for interactive science calculators, formula practice, experiment planning, and laboratory reporting.",
  url: siteUrl,
  locale: "en_US",
  language: "en",
  creator: "ALH Scholars",
  categories: [
    {
      name: "Calculate",
      description:
        "Solve common chemistry, physics, and laboratory calculations with guided steps.",
      href: "/calculators",
    },
    {
      name: "Study Formulas",
      description:
        "Review essential equations, variables, units, and worked applications.",
      href: "/formulas",
    },
    {
      name: "Write Reports",
      description:
        "Structure observations, methods, results, analysis, and conclusions clearly.",
      href: "/lab-reports",
    },
    {
      name: "Plan Experiments",
      description:
        "Build stronger hypotheses, variables, controls, and repeatable procedures.",
      href: "/scientific-method",
    },
    {
      name: "Download Resources",
      description:
        "Use classroom-ready worksheets, data tables, and practical templates.",
      href: "/templates",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
