export const guideCategories = [
  "Physics",
  "Chemistry",
  "Laboratory",
] as const;

export type ScienceGuideCategory =
  (typeof guideCategories)[number];

export type ScienceGuide = {
  slug: string;
  title: string;
  shortDescription: string;
  category: ScienceGuideCategory;
  href: `/guides/${string}`;
  keywords: readonly string[];

  intro: string;

  sections: readonly {
    heading: string;
    content: string;
  }[];

  faq: readonly {
    question: string;
    answer: string;
  }[];

  relatedFormulas?: readonly string[];
  relatedCalculators?: readonly string[];
};

export const scienceGuides: readonly ScienceGuide[] = [
  {
    slug: "molarity-explained",
    title: "Molarity Explained",
    shortDescription:
      "Learn what molarity means, how to calculate concentration, understand the formula, units, examples, and common chemistry mistakes.",
    category: "Chemistry",
    href: "/guides/molarity-explained",
    keywords: [
      "what is molarity",
      "molarity explained",
      "molarity formula",
      "how to calculate molarity",
    ],

    intro:
      "Molarity is a measure of solution concentration that describes how many moles of solute are present in one liter of solution. It is one of the most commonly used concentration calculations in chemistry.",

    sections: [
      {
        heading: "What is molarity?",
        content:
          "Molarity represents the relationship between the amount of dissolved substance and the total volume of solution. It helps chemists compare solution concentrations and perform reaction calculations.",
      },
      {
        heading: "Molarity formula and calculation",
        content:
          "The molarity formula uses the amount of solute in moles divided by the solution volume in liters. Always convert volume units correctly before performing the calculation.",
      },
      {
        heading: "Common molarity mistakes",
        content:
          "Common mistakes include using milliliters without conversion, confusing solvent volume with solution volume, and mixing up molarity with molality.",
      },
    ],

    faq: [
      {
        question: "What is the molarity formula?",
        answer:
          "Molarity is calculated by dividing the number of moles of solute by the volume of solution in liters.",
      },
      {
        question: "Why is volume converted to liters for molarity?",
        answer:
          "The standard unit for molarity is moles per liter, so volume must be expressed in liters for accurate results.",
      },
    ],

    relatedFormulas: [
      "molarity-formula",
    ],
    relatedCalculators: [
      "/calculators/molarity-calculator",
    ],
  },
];
