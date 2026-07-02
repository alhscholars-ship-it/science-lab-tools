export type ScientificMethodResourceStatus =
  | "published"
  | "planned";

export type ScientificMethodResourceCategory =
  | "Core Guide"
  | "Experiment Design"
  | "Data Analysis"
  | "Writing Skill";

export type ScientificMethodResource = {
  slug: string;
  title: string;
  shortDescription: string;
  category: ScientificMethodResourceCategory;
  status: ScientificMethodResourceStatus;
  href: string;
  keywords: readonly string[];
};

export const scientificMethodResources: readonly ScientificMethodResource[] =
  [
    {
      slug: "steps-of-the-scientific-method",
      title: "Steps of the Scientific Method",
      shortDescription:
        "Follow the scientific method from observation and research question through experimentation, analysis, and conclusion.",
      category: "Core Guide",
      status: "published",
      href: "/scientific-method/steps-of-the-scientific-method",
      keywords: [
        "scientific method steps",
        "steps in scientific method",
        "science investigation process",
      ],
    },
    {
      slug: "scientific-question",
      title: "How to Write a Scientific Question",
      shortDescription:
        "Turn an observation into a focused, measurable, and testable scientific research question.",
      category: "Writing Skill",
      status: "published",
      href: "/scientific-method/scientific-question",
      keywords: [
        "scientific question",
        "testable question",
        "science research question",
      ],
    },
    {
      slug: "how-to-write-a-hypothesis",
      title: "How to Write a Hypothesis",
      shortDescription:
        "Develop a testable prediction that connects the independent and dependent variables using scientific reasoning.",
      category: "Writing Skill",
      status: "published",
      href: "/scientific-method/how-to-write-a-hypothesis",
      keywords: [
        "how to write a hypothesis",
        "scientific hypothesis",
        "hypothesis examples",
      ],
    },
    {
      slug: "independent-dependent-controlled-variables",
      title: "Independent, Dependent, and Controlled Variables",
      shortDescription:
        "Identify what is changed, measured, and kept constant in a controlled scientific investigation.",
      category: "Experiment Design",
      status: "published",
      href:
        "/scientific-method/independent-dependent-controlled-variables",
      keywords: [
        "independent variable",
        "dependent variable",
        "controlled variables",
      ],
    },
    {
      slug: "control-group-and-experimental-group",
      title: "Control Group and Experimental Group",
      shortDescription:
        "Understand how comparison groups strengthen experimental design and help isolate the effect of a treatment.",
      category: "Experiment Design",
      status: "published",
      href:
        "/scientific-method/control-group-and-experimental-group",
      keywords: [
        "control group",
        "experimental group",
        "controlled experiment",
      ],
    },
    {
      slug: "experimental-design",
      title: "How to Design a Scientific Experiment",
      shortDescription:
        "Plan a fair, repeatable investigation using variables, controls, trials, measurements, and safety precautions.",
      category: "Experiment Design",
      status: "published",
      href: "/scientific-method/experimental-design",
      keywords: [
        "experimental design",
        "design a science experiment",
        "fair test",
      ],
    },
    {
      slug: "collect-and-record-data",
      title: "How to Collect and Record Scientific Data",
      shortDescription:
        "Record accurate quantitative and qualitative evidence using organized tables, units, observations, and repeated trials.",
      category: "Data Analysis",
      status: "published",
      href: "/scientific-method/collect-and-record-data",
      keywords: [
        "collect scientific data",
        "record experimental data",
        "science data table",
      ],
    },
    {
      slug: "analyze-experimental-results",
      title: "How to Analyze Experimental Results",
      shortDescription:
        "Evaluate trends, averages, variation, anomalies, uncertainty, and evidence before drawing a conclusion.",
      category: "Data Analysis",
      status: "published",
      href: "/scientific-method/analyze-experimental-results",
      keywords: [
        "analyze experimental results",
        "scientific data analysis",
        "experiment conclusion",
      ],
    },
  ] as const;

export const publishedScientificMethodResources =
  scientificMethodResources.filter(
    (resource) => resource.status === "published",
  );

export const plannedScientificMethodResources =
  scientificMethodResources.filter(
    (resource) => resource.status === "planned",
  );

export const scientificMethodCategories = [
  ...new Set(
    scientificMethodResources.map(
      (resource) => resource.category,
    ),
  ),
] as ScientificMethodResourceCategory[];
