export type ScienceTopic =
  | "physics"
  | "chemistry"
  | "biology"
  | "mathematics"
  | "general";

export type ScienceRoute = {
  topic: ScienceTopic;
  keywords: string[];
  formulas: string[];
  calculators: string[];
  guides: string[];
};


const scienceRoutes: ScienceRoute[] = [
  {
    topic: "physics",
    keywords: [
      "force",
      "mass",
      "acceleration",
      "velocity",
      "speed",
      "energy",
      "momentum",
      "gravity",
      "motion",
    ],
    formulas: [
      "newtons-second-law",
      "kinetic-energy",
      "momentum",
    ],
    calculators: [
      "/calculators/force-calculator",
      "/calculators/kinetic-energy-calculator",
      "/calculators/momentum-calculator",
    ],
    guides: [
      "/guides/newtons-law-explained",
    ],
  },

  {
    topic: "chemistry",
    keywords: [
      "molarity",
      "molality",
      "mole",
      "solution",
      "concentration",
      "reaction",
      "atom",
      "molecule",
    ],
    formulas: [
      "molarity-formula",
      "molality-formula",
      "molecular-weight-formula",
    ],
    calculators: [
      "/calculators/molarity-calculator",
      "/calculators/molality-calculator",
      "/calculators/molecular-weight-calculator",
    ],
    guides: [
      "/guides/molarity-explained",
      "/guides/molality-explained",
    ],
  },

  {
    topic: "mathematics",
    keywords: [
      "equation",
      "calculate",
      "percentage",
      "average",
      "formula",
    ],
    formulas: [],
    calculators: [
      "/calculators/mean-median-mode-calculator",
      "/calculators/linear-regression-calculator",
    ],
    guides: [],
  },
];


export function detectScienceTopic(
  question: string,
): ScienceRoute {

  const text = question.toLowerCase();

  const match = scienceRoutes.find((route) =>
    route.keywords.some((keyword) =>
      text.includes(keyword),
    ),
  );

  return (
    match ?? {
      topic: "general",
      keywords: [],
      formulas: [],
      calculators: [],
      guides: [],
    }
  );
}
