export type LabReportResource = {
  slug: string;
  title: string;
  shortDescription: string;
  category:
    | "Core Guide"
    | "Report Section"
    | "Writing Skill"
    | "Template";
  href: string;
  keywords: readonly string[];
};

export const labReportResources: readonly LabReportResource[] = [
  {
    slug: "how-to-write-a-lab-report",
    title: "How to Write a Lab Report",
    shortDescription:
      "Learn the complete laboratory report structure from title and hypothesis to results and conclusion.",
    category: "Core Guide",
    href: "/lab-reports/how-to-write-a-lab-report",
    keywords: [
      "how to write a lab report",
      "lab report format",
      "science lab report",
    ],
  },
  {
    slug: "lab-report-format",
    title: "Lab Report Format",
    shortDescription:
      "Review the standard order, purpose, and content of each section in a scientific laboratory report.",
    category: "Core Guide",
    href: "/lab-reports/lab-report-format",
    keywords: [
      "lab report format",
      "laboratory report structure",
      "science report format",
    ],
  },
  {
    slug: "lab-report-introduction",
    title: "How to Write a Lab Report Introduction",
    shortDescription:
      "Write focused background information, scientific context, objectives, and a testable hypothesis.",
    category: "Report Section",
    href: "/lab-reports/lab-report-introduction",
    keywords: [
      "lab report introduction",
      "science report introduction",
    ],
  },
  {
    slug: "materials-and-methods",
    title: "Materials and Methods in a Lab Report",
    shortDescription:
      "Document equipment, variables, and experimental procedures clearly enough for replication.",
    category: "Report Section",
    href: "/lab-reports/materials-and-methods",
    keywords: [
      "lab report methods",
      "materials and methods",
      "experimental procedure",
    ],
  },
  {
    slug: "lab-report-results",
    title: "How to Write a Lab Report Results Section",
    shortDescription:
      "Present measurements, observations, tables, graphs, and calculated values without unnecessary interpretation.",
    category: "Report Section",
    href: "/lab-reports/lab-report-results",
    keywords: [
      "lab report results",
      "science results section",
      "experimental results",
    ],
  },
  {
    slug: "lab-report-discussion",
    title: "How to Write a Lab Report Discussion",
    shortDescription:
      "Interpret results, evaluate evidence, explain limitations, and connect findings to scientific principles.",
    category: "Report Section",
    href: "/lab-reports/lab-report-discussion",
    keywords: [
      "lab report discussion",
      "discussion section science",
    ],
  },
  {
    slug: "lab-report-conclusion",
    title: "How to Write a Lab Report Conclusion",
    shortDescription:
      "Summarize the investigation, answer the research question, and evaluate whether evidence supports the hypothesis.",
    category: "Report Section",
    href: "/lab-reports/lab-report-conclusion",
    keywords: [
      "lab report conclusion",
      "science conclusion example",
    ],
  },
  {
    slug: "significant-figures-in-lab-reports",
    title: "Significant Figures in Lab Reports",
    shortDescription:
      "Apply significant-figure rules consistently when recording measurements and reporting calculated results.",
    category: "Writing Skill",
    href: "/lab-reports/significant-figures-in-lab-reports",
    keywords: [
      "significant figures lab report",
      "measurement precision",
    ],
  },
  {
    slug: "tables-and-graphs",
    title: "Tables and Graphs for Lab Reports",
    shortDescription:
      "Create clear scientific tables and graphs with correct variables, units, titles, and labels.",
    category: "Writing Skill",
    href: "/lab-reports/tables-and-graphs",
    keywords: [
      "lab report graphs",
      "scientific tables",
      "graphing experimental data",
    ],
  },
  {
    slug: "lab-report-template",
    title: "Lab Report Template",
    shortDescription:
      "Use a structured laboratory report outline covering every major section of a scientific investigation.",
    category: "Template",
    href: "/lab-reports/lab-report-template",
    keywords: [
      "lab report template",
      "science report template",
    ],
  },
];

export const labReportCategories = [
  "Core Guide",
  "Report Section",
  "Writing Skill",
  "Template",
] as const;
