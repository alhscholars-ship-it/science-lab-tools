export const chemistryHub = {
  slug: "chemistry-calculators",

  title:
    "Chemistry Calculators & Formula Tools",

  description:
    "Use chemistry calculators for stoichiometry, molarity, dilution, molecular weight, pH, gas laws, and common laboratory calculations with formulas and examples.",

  category: "Chemistry",

  intro:
    "Explore chemistry calculators for stoichiometry, solutions, acids and bases, gas laws, and laboratory work. Calculate chemical quantities with formulas, explanations, and practical examples.",

  topics: [
    {
      name: "Stoichiometry",
      calculators: [
        "stoichiometry-calculator",
        "limiting-reactant-calculator",
        "percent-yield-calculator",
      ],
    },
    {
      name: "Solutions",
      calculators: [
        "molarity-calculator",
        "molality-calculator",
        "normality-calculator",
        "dilution-calculator",
      ],
    },
    {
      name: "Molar Calculations",
      calculators: [
        "mass-moles-calculator",
        "molecular-weight-calculator",
        "mole-fraction-calculator",
      ],
    },
    {
      name: "Acids and Bases",
      calculators: [
        "ph-calculator",
        "normality-calculator",
      ],
    },
    {
      name: "Chemical Properties",
      calculators: [
        "molecular-weight-calculator",
        "density-calculator",
        "ideal-gas-law-calculator",
      ],
    },
  ],

  faqs: [
    {
      question:
        "What can chemistry calculators help calculate?",

      answer:
        "Chemistry calculators can solve problems involving stoichiometry, mole ratios, molarity, dilution, molecular weight, pH, gas laws, and other laboratory calculations.",
    },
    {
      question:
        "Are these chemistry calculators useful for students?",

      answer:
        "Yes. They help students understand chemistry formulas and verify calculations while learning scientific concepts.",
    },
    {
      question:
        "Do chemistry calculators show formulas?",

      answer:
        "Yes. Each calculator explains the formula used and provides guidance about the calculation process.",
    },
  ],
} as const;
