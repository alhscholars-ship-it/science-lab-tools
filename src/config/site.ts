import { resolveSiteUrl } from "./site-url";

export const siteConfig = {
  name: "ALH Science Hub",
  shortName: "ALH Science",
  description:
    "A focused learning platform for interactive science calculators, formula practice, experiment planning, and laboratory reporting.",
  url: resolveSiteUrl({
    configuredUrl: process.env.NEXT_PUBLIC_SITE_URL,
  }),
  locale: "en_US",
  language: "en",
  creator: "ALH Scholars",
  feedback: {
    repositoryUrl:
      "https://github.com/alhscholars-ship-it/science-lab-tools",
    newIssueUrl:
      "https://github.com/alhscholars-ship-it/science-lab-tools/issues/new/choose",
    correctionIssueUrl:
      "https://github.com/alhscholars-ship-it/science-lab-tools/issues/new?template=scientific-correction.yml",
    bugReportIssueUrl:
      "https://github.com/alhscholars-ship-it/science-lab-tools/issues/new?template=bug_report.yml",
  },
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
