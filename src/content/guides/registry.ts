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

  {
    slug: "molality-explained",
    title: "Molality Explained",
    shortDescription:
      "Learn what molality means, how to calculate it using moles of solute and kilograms of solvent, with formulas, examples, and common mistakes.",
    category: "Chemistry",
    href: "/guides/molality-explained",
    keywords: [
      "what is molality",
      "molality explained",
      "molality formula",
      "how to calculate molality",
    ],

    intro:
      "Molality is a chemistry concentration measurement that describes the number of moles of solute present per kilogram of solvent. It is especially useful when temperature changes may affect solution volume.",

    sections: [
      {
        heading: "What is molality?",
        content:
          "Molality expresses solution concentration using the mass of the solvent rather than the total solution volume. This makes it useful for calculations where temperature-related volume changes are important.",
      },
      {
        heading: "Molality formula and calculation",
        content:
          "The molality formula divides the number of moles of solute by the kilograms of solvent. The solvent mass must be converted into kilograms before calculation.",
      },
      {
        heading: "Molality versus molarity",
        content:
          "Molality uses kilograms of solvent while molarity uses liters of solution. Molality is less affected by temperature changes because it depends on mass rather than volume.",
      },
      {
        heading: "Common molality mistakes",
        content:
          "Common mistakes include using solution mass instead of solvent mass, forgetting kilogram conversion, and confusing molality with molarity.",
      },
    ],

    faq: [
      {
        question: "What is the molality formula?",
        answer:
          "Molality is calculated by dividing moles of solute by kilograms of solvent.",
      },
      {
        question: "When should molality be used instead of molarity?",
        answer:
          "Molality is useful when temperature changes may affect solution volume because it is based on solvent mass.",
      },
    ],

    relatedFormulas: [
      "molality-formula",
    ],
    relatedCalculators: [
      "/calculators/molality-calculator",
    ],
  },

  {
    slug: "mole-fraction-explained",
    title: "Mole Fraction Explained",
    shortDescription:
      "Learn what mole fraction means, how to calculate it, understand the formula, examples, and common chemistry concentration mistakes.",
    category: "Chemistry",
    href: "/guides/mole-fraction-explained",
    keywords: [
      "what is mole fraction",
      "mole fraction explained",
      "mole fraction formula",
      "how to calculate mole fraction",
    ],

    intro:
      "Mole fraction is a concentration measurement that represents the ratio of moles of one component to the total moles of all components in a mixture.",

    sections: [
      {
        heading: "What is mole fraction?",
        content:
          "Mole fraction describes the relative amount of a substance in a mixture by comparing its number of moles with the total number of moles present.",
      },
      {
        heading: "Mole fraction formula and calculation",
        content:
          "The mole fraction formula divides the moles of a component by the total moles of all components in the mixture. The result has no unit because it is a ratio.",
      },
      {
        heading: "Applications of mole fraction",
        content:
          "Mole fraction is commonly used in solution chemistry, gas mixtures, vapor pressure calculations, and thermodynamics.",
      },
      {
        heading: "Common mole fraction mistakes",
        content:
          "Common mistakes include forgetting to include all components of the mixture, confusing mole fraction with concentration units, and using incorrect mole values.",
      },
    ],

    faq: [
      {
        question: "What is the mole fraction formula?",
        answer:
          "Mole fraction is calculated by dividing the moles of one component by the total moles of all components in the mixture.",
      },
      {
        question: "Does mole fraction have units?",
        answer:
          "No. Mole fraction is a ratio, so it is dimensionless and does not have a measurement unit.",
      },
    ],

    relatedFormulas: [
      "mole-fraction-formula",
    ],
    relatedCalculators: [
      "/calculators/mole-fraction-calculator",
    ],
  },

  {
    slug: "dilution-explained",
    title: "Dilution Explained",
    shortDescription:
      "Learn what dilution means, understand the dilution formula C1V1 = C2V2, calculate concentration changes, and avoid common chemistry mistakes.",
    category: "Chemistry",
    href: "/guides/dilution-explained",
    keywords: [
      "what is dilution",
      "dilution explained",
      "dilution formula",
      "C1V1 C2V2",
      "how to calculate dilution",
    ],

    intro:
      "Dilution is the process of reducing the concentration of a solution by adding more solvent. It is commonly used in laboratories to prepare solutions with specific concentrations.",

    sections: [
      {
        heading: "What is dilution?",
        content:
          "Dilution decreases solution concentration while keeping the amount of solute constant. The total solution volume increases when additional solvent is added.",
      },
      {
        heading: "Dilution formula and calculation",
        content:
          "The dilution formula C1V1 = C2V2 relates the initial concentration and volume to the final concentration and volume. It helps determine how much concentrated solution is required to prepare a diluted solution.",
      },
      {
        heading: "How dilution is used in laboratories",
        content:
          "Scientists use dilution calculations when preparing standard solutions, chemical samples, and experimental mixtures with precise concentrations.",
      },
      {
        heading: "Common dilution mistakes",
        content:
          "Common mistakes include mixing up initial and final concentrations, using incorrect volume units, and forgetting that the amount of solute remains unchanged during dilution.",
      },
    ],

    faq: [
      {
        question: "What is the dilution formula?",
        answer:
          "The dilution formula is C1V1 = C2V2, where initial concentration multiplied by initial volume equals final concentration multiplied by final volume.",
      },
      {
        question: "What happens to concentration during dilution?",
        answer:
          "Adding solvent increases the total volume and decreases the concentration of the solution.",
      },
    ],

    relatedFormulas: [
      "dilution-formula",
    ],
    relatedCalculators: [
      "/calculators/dilution-calculator",
    ],
  },

  {
    slug: "stoichiometry-explained",
    title: "Stoichiometry Explained",
    shortDescription:
      "Learn how stoichiometry works, understand mole ratios, balance chemical calculations, and solve reaction problems with formulas and examples.",
    category: "Chemistry",
    href: "/guides/stoichiometry-explained",
    keywords: [
      "what is stoichiometry",
      "stoichiometry explained",
      "stoichiometry formula",
      "how to solve stoichiometry problems",
    ],

    intro:
      "Stoichiometry is the branch of chemistry that uses balanced chemical equations to calculate relationships between reactants and products. It allows scientists to predict amounts involved in chemical reactions.",

    sections: [
      {
        heading: "What is stoichiometry?",
        content:
          "Stoichiometry describes the quantitative relationships between substances in a chemical reaction. These relationships come from the coefficients in a balanced chemical equation.",
      },
      {
        heading: "Stoichiometry formula and mole ratios",
        content:
          "Stoichiometry calculations use mole ratios from balanced equations to convert between amounts of reactants and products. The mole ratio connects substances involved in the reaction.",
      },
      {
        heading: "How to solve stoichiometry problems",
        content:
          "A common approach is to balance the chemical equation, convert known quantities into moles, apply the mole ratio, and convert the result into the required unit.",
      },
      {
        heading: "Limiting reactants and reaction calculations",
        content:
          "Limiting reactant calculations identify which reactant runs out first and determines the maximum amount of product that can form.",
      },
      {
        heading: "Common stoichiometry mistakes",
        content:
          "Common mistakes include using an unbalanced equation, incorrect mole ratios, skipping unit conversions, and confusing mass with moles.",
      },
    ],

    faq: [
      {
        question: "What is stoichiometry?",
        answer:
          "Stoichiometry is the calculation of quantitative relationships between reactants and products in a chemical reaction.",
      },
      {
        question: "How do you solve stoichiometry problems?",
        answer:
          "Balance the equation, convert values to moles, use the mole ratio, and convert the final answer into the required units.",
      },
    ],

    relatedFormulas: [
      "stoichiometry-formula",
    ],
    relatedCalculators: [
      "/calculators/stoichiometry-calculator",
    ],
  },

  {
    slug: "molecular-weight-explained",
    title: "Molecular Weight Explained",
    shortDescription:
      "Learn how molecular weight is calculated, understand atomic masses, formulas, examples, and common chemistry calculation mistakes.",
    category: "Chemistry",
    href: "/guides/molecular-weight-explained",
    keywords: [
      "what is molecular weight",
      "molecular weight explained",
      "molecular weight formula",
      "how to calculate molecular weight",
    ],

    intro:
      "Molecular weight describes the total mass of all atoms in a molecule. It is calculated by adding the atomic masses of each element present in a chemical formula.",

    sections: [
      {
        heading: "What is molecular weight?",
        content:
          "Molecular weight is the sum of the atomic weights of all atoms in a molecule. It helps chemists determine the mass relationship between molecules and chemical substances.",
      },
      {
        heading: "Molecular weight formula and calculation",
        content:
          "To calculate molecular weight, multiply the atomic mass of each element by the number of atoms of that element in the chemical formula, then add all values together.",
      },
      {
        heading: "Molecular weight versus molar mass",
        content:
          "Molecular weight is a relative value based on atomic masses, while molar mass represents the mass of one mole of a substance and is usually expressed in grams per mole.",
      },
      {
        heading: "Common molecular weight mistakes",
        content:
          "Common mistakes include incorrect atom counting, using wrong atomic masses, and forgetting subscripts in chemical formulas.",
      },
    ],

    faq: [
      {
        question: "How is molecular weight calculated?",
        answer:
          "Molecular weight is calculated by adding the atomic masses of all atoms in a chemical formula.",
      },
      {
        question: "Why is molecular weight important in chemistry?",
        answer:
          "Molecular weight helps convert between chemical formulas, molecular quantities, and mass-based calculations.",
      },
    ],

    relatedFormulas: [
      "molecular-weight-formula",
    ],
    relatedCalculators: [
      "/calculators/molecular-weight-calculator",
    ],
  },

  {
    slug: "newtons-second-law-explained",
    title: "Newton's Second Law Explained",
    shortDescription:
      "Learn Newton's Second Law, understand the F = ma formula, calculate force, and solve force, mass, and acceleration problems.",
    category: "Physics",
    href: "/guides/newtons-second-law-explained",
    keywords: [
      "newtons second law",
      "newtons second law explained",
      "force formula",
      "f = ma formula",
      "how to calculate force",
    ],

    intro:
      "Newton's Second Law explains the relationship between force, mass, and acceleration. It states that the net force acting on an object equals its mass multiplied by its acceleration.",

    sections: [
      {
        heading: "What is Newton's Second Law?",
        content:
          "Newton's Second Law describes how the motion of an object changes when a net force acts on it. Greater force produces greater acceleration, while greater mass requires more force for the same acceleration.",
      },
      {
        heading: "Force formula F = ma",
        content:
          "The force formula is F = m × a, where F represents force measured in newtons, m represents mass measured in kilograms, and a represents acceleration measured in meters per second squared.",
      },
      {
        heading: "How to calculate force",
        content:
          "To calculate force, multiply the object's mass by its acceleration. Make sure all values are converted into SI units before performing the calculation.",
      },
      {
        heading: "Common force calculation mistakes",
        content:
          "Common mistakes include using incorrect units, confusing mass with weight, and forgetting that Newton's Second Law uses net force rather than a single unbalanced force.",
      },
    ],

    faq: [
      {
        question: "What is the formula for force?",
        answer:
          "Force is calculated using Newton's Second Law: F = m × a, where force equals mass multiplied by acceleration.",
      },
      {
        question: "How do you calculate force from mass and acceleration?",
        answer:
          "Multiply the object's mass by its acceleration to find the net force in newtons.",
      },
    ],

    relatedFormulas: [
      "newtons-second-law",
    ],
    relatedCalculators: [
      "/calculators/force-calculator",
      "/calculators/acceleration-calculator",
    ],
  },

  {
    slug: "kinetic-energy-explained",
    title: "Kinetic Energy Explained",
    shortDescription:
      "Learn kinetic energy, understand the kinetic energy formula, calculate energy from mass and velocity, and solve physics problems.",
    category: "Physics",
    href: "/guides/kinetic-energy-explained",
    keywords: [
      "kinetic energy explained",
      "kinetic energy formula",
      "how to calculate kinetic energy",
      "kinetic energy equation",
    ],

    intro:
      "Kinetic energy is the energy an object has because of its motion. It depends on the object's mass and the square of its velocity.",

    sections: [
      {
        heading: "What is kinetic energy?",
        content:
          "Kinetic energy describes the energy stored in a moving object. Objects with greater mass or higher velocity have more kinetic energy.",
      },
      {
        heading: "Kinetic energy formula",
        content:
          "The kinetic energy formula is KE = ½mv², where KE represents kinetic energy, m represents mass, and v represents velocity.",
      },
      {
        heading: "How to calculate kinetic energy",
        content:
          "To calculate kinetic energy, convert mass into kilograms and velocity into meters per second, then substitute the values into the formula.",
      },
      {
        heading: "Common kinetic energy mistakes",
        content:
          "Common mistakes include forgetting to square velocity, using incorrect units, and confusing kinetic energy with force or momentum.",
      },
    ],

    faq: [
      {
        question: "What is the kinetic energy formula?",
        answer:
          "Kinetic energy is calculated using KE = ½mv², where mass is multiplied by the square of velocity.",
      },
      {
        question: "What factors affect kinetic energy?",
        answer:
          "Kinetic energy depends on an object's mass and velocity. Increasing velocity has a larger effect because velocity is squared.",
      },
    ],

    relatedFormulas: [
      "kinetic-energy-formula",
    ],
    relatedCalculators: [
      "/calculators/kinetic-energy-calculator",
      "/calculators/momentum-calculator",
      "/calculators/gravitational-potential-energy-calculator",
    ],
  },

];
