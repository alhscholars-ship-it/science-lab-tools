export type CalculatorStatus = "published" | "planned";

export type CalculatorDefinition = {
  slug: string;
  name: string;
  shortDescription: string;
  category: "Laboratory" | "Chemistry" | "Physics";
  status: CalculatorStatus;
  href: string;
  keywords: readonly string[];
};

export const calculators: readonly CalculatorDefinition[] = [
  {
    slug: "percent-error-calculator",
    name: "Percent Error Calculator",
    shortDescription:
      "Calculate percent error from experimental and accepted values with clear working steps.",
    category: "Laboratory",
    status: "published",
    href: "/calculators/percent-error-calculator",
    keywords: [
      "percent error calculator",
      "experimental error calculator",
      "chemistry percent error",
    ],
  },
  {
    slug: "percent-difference-calculator",
    name: "Percent Difference Calculator",
    shortDescription:
      "Compare two experimental measurements without using an accepted reference value.",
    category: "Laboratory",
    status: "published",
    href: "/calculators/percent-difference-calculator",
    keywords: ["percent difference calculator"],
  },
  {
    slug: "molarity-calculator",
    name: "Molarity Calculator",
    shortDescription:
      "Calculate solution molarity from moles of solute and solution volume.",
    category: "Chemistry",
    status: "published",
    href: "/calculators/molarity-calculator",
    keywords: ["molarity calculator", "moles and volume calculator"],
  },
  {
    slug: "dilution-calculator",
    name: "Dilution Calculator",
    shortDescription:
      "Solve dilution problems using initial and final concentration and volume.",
    category: "Chemistry",
    status: "published",
    href: "/calculators/dilution-calculator",
    keywords: ["dilution calculator chemistry"],
  },
  {
    slug: "density-calculator",
    name: "Density Calculator",
    shortDescription:
      "Calculate density, mass, or volume using laboratory measurements.",
    category: "Physics",
    status: "published",
    href: "/calculators/density-calculator",
    keywords: ["density calculator for students"],
  },
  {
    slug: "specific-heat-calculator",
    name: "Specific Heat Calculator",
    shortDescription:
      "Calculate heat energy, mass, temperature change, or specific heat capacity.",
    category: "Physics",
    status: "published",
    href: "/calculators/specific-heat-calculator",
    keywords: ["specific heat calculator"],
  },
];

export const publishedCalculators = calculators.filter(
  (calculator) => calculator.status === "published",
);

export const plannedCalculators = calculators.filter(
  (calculator) => calculator.status === "planned",
);
