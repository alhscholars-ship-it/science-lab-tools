export type TemplateResourceStatus =
  | "published"
  | "planned";

export type TemplateResourceCategory =
  | "Lab Report"
  | "Scientific Method"
  | "Data Recording"
  | "Classroom Worksheet";

export type TemplateResource = {
  slug: string;
  title: string;
  shortDescription: string;
  category: TemplateResourceCategory;
  status: TemplateResourceStatus;
  href: string;
  keywords: readonly string[];
};

export const templateResources: readonly TemplateResource[] = [
  {
    slug: "printable-lab-report-template",
    title: "Printable Lab Report Template",
    shortDescription:
      "Use a structured printable worksheet for recording the title, hypothesis, variables, methods, results, discussion, and conclusion.",
    category: "Lab Report",
    status: "published",
    href: "/templates/printable-lab-report-template",
    keywords: [
      "printable lab report template",
      "science lab report worksheet",
      "laboratory report printable",
    ],
  },
  {
    slug: "scientific-method-worksheet",
    title: "Scientific Method Worksheet",
    shortDescription:
      "Guide students through observations, questions, hypotheses, variables, experimental procedures, evidence, and conclusions.",
    category: "Scientific Method",
    status: "published",
    href: "/templates/scientific-method-worksheet",
    keywords: [
      "scientific method worksheet",
      "science experiment worksheet",
      "scientific investigation printable",
    ],
  },
  {
    slug: "experiment-planning-template",
    title: "Experiment Planning Template",
    shortDescription:
      "Plan a controlled experiment with sections for variables, controls, materials, procedures, measurements, safety, and repeated trials.",
    category: "Scientific Method",
    status: "published",
    href: "/templates/experiment-planning-template",
    keywords: [
      "experiment planning template",
      "experimental design worksheet",
      "science investigation planner",
    ],
  },
  {
    slug: "data-table-template",
    title: "Scientific Data Table Template",
    shortDescription:
      "Record quantitative measurements, qualitative observations, units, repeated trials, averages, and unusual results clearly.",
    category: "Data Recording",
    status: "published",
    href: "/templates/data-table-template",
    keywords: [
      "scientific data table template",
      "experiment data worksheet",
      "science observation table",
    ],
  },
  {
    slug: "graphing-scientific-data-worksheet",
    title: "Graphing Scientific Data Worksheet",
    shortDescription:
      "Practice selecting graph types, labeling axes, adding units, plotting measurements, and describing scientific trends.",
    category: "Data Recording",
    status: "published",
    href: "/templates/graphing-scientific-data-worksheet",
    keywords: [
      "scientific graphing worksheet",
      "science graph template",
      "graph experimental data",
    ],
  },
  {
    slug: "variables-worksheet",
    title: "Independent and Dependent Variables Worksheet",
    shortDescription:
      "Practice identifying independent, dependent, and controlled variables in clear scientific investigation scenarios.",
    category: "Classroom Worksheet",
    status: "published",
    href: "/templates/variables-worksheet",
    keywords: [
      "variables worksheet",
      "independent dependent variables worksheet",
      "controlled variables practice",
    ],
  },
] as const;

export const publishedTemplateResources =
  templateResources.filter(
    (resource) => resource.status === "published",
  );

export const plannedTemplateResources =
  templateResources.filter(
    (resource) => resource.status === "planned",
  );

export const templateCategories = [
  ...new Set(
    templateResources.map(
      (resource) => resource.category,
    ),
  ),
] as TemplateResourceCategory[];
