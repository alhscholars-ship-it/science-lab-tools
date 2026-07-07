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
    slug: "coefficient-variation-calculator",
    name: "Coefficient of Variation Calculator",
    shortDescription:
      "Calculate relative dataset variation using sample or population standard deviation.",
    category: "Laboratory",
    href: "/calculators/coefficient-variation-calculator",
    keywords: [
      "coefficient of variation calculator",
      "cv calculator statistics",
      "relative standard deviation calculator",
      "sample coefficient of variation",
    ],
  },
  {
    slug: "mean-median-mode-calculator",
    name: "Mean, Median and Mode Calculator",
    shortDescription:
      "Calculate mean, median, mode, sum, range, minimum, maximum, and sorted values.",
    category: "Laboratory",
    href: "/calculators/mean-median-mode-calculator",
    keywords: [
      "mean median mode calculator",
      "average calculator",
      "median calculator",
      "mode calculator",
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
    slug: "uncertainty-propagation-calculator",
    name: "Uncertainty Propagation Calculator",
    shortDescription:
      "Propagate uncertainty through addition, subtraction, multiplication, and division.",
    category: "Laboratory",
    href: "/calculators/uncertainty-propagation-calculator",
    keywords: [
      "uncertainty propagation calculator",
      "propagation of error calculator",
      "combined uncertainty calculator",
      "absolute and relative uncertainty calculator",
    ],
  },
  {
    slug: "measurement-uncertainty-calculator",
    name: "Measurement Uncertainty Calculator",
    shortDescription:
      "Calculate relative uncertainty, percentage uncertainty, range, and plus-or-minus notation.",
    category: "Laboratory",
    href: "/calculators/measurement-uncertainty-calculator",
    keywords: [
      "measurement uncertainty calculator",
      "percentage uncertainty calculator",
      "relative uncertainty calculator",
      "absolute uncertainty calculator",
    ],
  },
  {
    slug: "rate-of-change-calculator",
    name: "Rate of Change Calculator",
    shortDescription:
      "Calculate absolute change, percentage change, interval, and average rate of change.",
    category: "Laboratory",
    href: "/calculators/rate-of-change-calculator",
    keywords: [
      "rate of change calculator",
      "average rate of change calculator",
      "change over time calculator",
      "percentage change calculator",
    ],
  },
  {
    slug: "linear-regression-calculator",
    name: "Linear Regression Calculator",
    shortDescription:
      "Calculate slope, intercept, best-fit equation, correlation coefficient, and R squared.",
    category: "Laboratory",
    href: "/calculators/linear-regression-calculator",
    keywords: [
      "linear regression calculator",
      "line of best fit calculator",
      "correlation coefficient calculator",
      "r squared calculator",
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
    slug: "force-calculator",
    name: "Force Calculator",
    shortDescription:
      "Calculate force, mass, or acceleration using Newton's second law.",
    category: "Physics",
    href: "/calculators/force-calculator",
    keywords: [
      "force calculator",
      "newtons second law calculator",
      "force mass acceleration calculator",
      "f equals ma calculator",
    ],
  },
  {
    slug: "power-calculator",
    name: "Power Calculator",
    shortDescription:
      "Calculate power, work, or time using the mechanical power formula.",
    category: "Physics",
    href: "/calculators/power-calculator",
    keywords: [
      "power calculator",
      "physics power calculator",
      "work time power calculator",
      "power formula calculator",
    ],
  },
  {
    slug: "work-calculator",
    name: "Work Calculator",
    shortDescription:
      "Calculate work, force, or distance using the mechanical work formula.",
    category: "Physics",
    href: "/calculators/work-calculator",
    keywords: [
      "work calculator",
      "physics work calculator",
      "force distance work calculator",
      "work formula calculator",
    ],
  },
  {
    slug: "hookes-law-calculator",
    name: "Hooke’s Law Calculator",
    shortDescription:
      "Calculate force, spring constant, or extension using Hooke’s law F = kx.",
    category: "Physics",
    href: "/calculators/hookes-law-calculator",
    keywords: [
      "hookes law calculator",
      "hooke law calculator",
      "spring force calculator",
      "force spring constant extension calculator",
    ],
  },
  {
    slug: "elastic-potential-energy-calculator",
    name: "Elastic Potential Energy Calculator",
    shortDescription:
      "Calculate elastic potential energy, spring constant, or extension using E = ½kx².",
    category: "Physics",
    href: "/calculators/elastic-potential-energy-calculator",
    keywords: [
      "elastic potential energy calculator",
      "spring energy calculator",
      "spring constant calculator",
      "extension calculator",
    ],
  },
  {
    slug: "gravitational-potential-energy-calculator",
    name: "Gravitational Potential Energy Calculator",
    shortDescription:
      "Calculate gravitational potential energy, mass, gravity, or height using PE = mgh.",
    category: "Physics",
    href: "/calculators/gravitational-potential-energy-calculator",
    keywords: [
      "gravitational potential energy calculator",
      "potential energy calculator",
      "PE mgh calculator",
      "mass gravity height calculator",
    ],
  },
  {
    slug: "kinetic-energy-calculator",
    name: "Kinetic Energy Calculator",
    shortDescription:
      "Calculate kinetic energy, mass, or speed using the classical motion-energy formula.",
    category: "Physics",
    href: "/calculators/kinetic-energy-calculator",
    keywords: [
      "kinetic energy calculator",
      "ke calculator",
      "mass speed energy calculator",
      "kinetic energy formula calculator",
    ],
  },
  {
    slug: "momentum-calculator",
    name: "Momentum Calculator",
    shortDescription:
      "Calculate momentum, mass, or velocity using the linear momentum formula.",
    category: "Physics",
    href: "/calculators/momentum-calculator",
    keywords: [
      "momentum calculator",
      "linear momentum calculator",
      "mass velocity momentum calculator",
      "p equals mv calculator",
    ],
  },
  {
    slug: "acceleration-calculator",
    name: "Acceleration Calculator",
    shortDescription:
      "Calculate acceleration, initial velocity, final velocity, or time from three known values.",
    category: "Physics",
    href: "/calculators/acceleration-calculator",
    keywords: [
      "acceleration calculator",
      "initial velocity calculator",
      "final velocity calculator",
      "velocity and time calculator",
    ],
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
