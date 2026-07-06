export type CalculatorDefinition = {
  slug: string;
  name: string;
  shortDescription: string;
  category: "Laboratory" | "Chemistry" | "Physics";
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
    href: "/calculators/percent-difference-calculator",
    keywords: ["percent difference calculator"],
  },
  {
    slug: "significant-figures-calculator",
    name: "Significant Figures Calculator",
    shortDescription:
      "Count significant figures and round measured values to a selected precision.",
    category: "Laboratory",
    href: "/calculators/significant-figures-calculator",
    keywords: [
      "significant figures calculator",
      "sig figs calculator",
      "round to significant figures",
      "significant digits calculator",
    ],
  },
  {
    slug: "standard-deviation-calculator",
    name: "Standard Deviation Calculator",
    shortDescription:
      "Calculate sample and population standard deviation, mean, range, and dataset size.",
    category: "Laboratory",
    href: "/calculators/standard-deviation-calculator",
    keywords: [
      "standard deviation calculator",
      "sample standard deviation calculator",
      "population standard deviation calculator",
      "mean and standard deviation calculator",
    ],
  },
  {
    slug: "molarity-calculator",
    name: "Molarity Calculator",
    shortDescription:
      "Calculate solution molarity from moles of solute and solution volume.",
    category: "Chemistry",
    href: "/calculators/molarity-calculator",
    keywords: ["molarity calculator", "moles and volume calculator"],
  },
  {
    slug: "mass-moles-calculator",
    name: "Mass to Moles Calculator",
    shortDescription:
      "Calculate mass, moles, or molar mass from two known chemistry values.",
    category: "Chemistry",
    href: "/calculators/mass-moles-calculator",
    keywords: [
      "mass to moles calculator",
      "grams to moles calculator",
      "moles to grams calculator",
      "molar mass calculator",
    ],
  },
  {
    slug: "dilution-calculator",
    name: "Dilution Calculator",
    shortDescription:
      "Solve dilution problems using initial and final concentration and volume.",
    category: "Chemistry",
    href: "/calculators/dilution-calculator",
    keywords: ["dilution calculator chemistry"],
  },
  {
    slug: "density-calculator",
    name: "Density Calculator",
    shortDescription:
      "Calculate density, mass, or volume using laboratory measurements.",
    category: "Physics",
    href: "/calculators/density-calculator",
    keywords: ["density calculator for students"],
  },
  {
    slug: "specific-heat-calculator",
    name: "Specific Heat Calculator",
    shortDescription:
      "Calculate heat energy, mass, temperature change, or specific heat capacity.",
    category: "Physics",
    href: "/calculators/specific-heat-calculator",
    keywords: ["specific heat calculator"],
  },
];
