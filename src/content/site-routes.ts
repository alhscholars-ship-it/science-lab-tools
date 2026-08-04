export type SitemapRoute = {
  path: `/${string}`;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

export const sitemapRoutes: readonly SitemapRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
  { path: "/editorial-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/disclaimer", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms-of-use", changeFrequency: "yearly", priority: 0.3 },
  { path: "/calculators", changeFrequency: "weekly", priority: 0.9 },
  { path: "/physics-calculators", changeFrequency: "weekly", priority: 0.9 },
  { path: "/chemistry-calculators", changeFrequency: "weekly", priority: 0.9 },
  { path: "/laboratory-calculators", changeFrequency: "weekly", priority: 0.9 },
  { path: "/lab-reports", changeFrequency: "weekly", priority: 0.9 },
  {
    path: "/lab-reports/how-to-write-a-lab-report",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  { path: "/lab-reports/lab-report-format", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/lab-reports/lab-report-introduction",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/lab-reports/materials-and-methods", changeFrequency: "monthly", priority: 0.8 },
  { path: "/lab-reports/lab-report-results", changeFrequency: "monthly", priority: 0.8 },
  { path: "/lab-reports/lab-report-discussion", changeFrequency: "monthly", priority: 0.8 },
  { path: "/lab-reports/lab-report-conclusion", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/lab-reports/significant-figures-in-lab-reports",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/lab-reports/tables-and-graphs", changeFrequency: "monthly", priority: 0.8 },
  { path: "/lab-reports/lab-report-template", changeFrequency: "monthly", priority: 0.8 },
  { path: "/scientific-method", changeFrequency: "weekly", priority: 0.9 },
  {
    path: "/scientific-method/steps-of-the-scientific-method",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/scientific-method/scientific-question", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/scientific-method/how-to-write-a-hypothesis",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/scientific-method/independent-dependent-controlled-variables",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/scientific-method/control-group-and-experimental-group",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/scientific-method/experimental-design", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/scientific-method/collect-and-record-data",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/scientific-method/analyze-experimental-results",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/templates", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/templates/printable-lab-report-template",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/templates/scientific-method-worksheet", changeFrequency: "monthly", priority: 0.8 },
  { path: "/templates/experiment-planning-template", changeFrequency: "monthly", priority: 0.8 },
  { path: "/templates/data-table-template", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/templates/graphing-scientific-data-worksheet",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/templates/variables-worksheet", changeFrequency: "monthly", priority: 0.8 },
];
