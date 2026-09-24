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


  {
    slug: "momentum-explained",
    title: "Momentum Explained",
    shortDescription:
      "Learn what momentum means, understand the p = mv formula, calculate momentum, and solve physics motion problems.",
    category: "Physics",
    href: "/guides/momentum-explained",
    keywords: [
      "momentum explained",
      "momentum formula",
      "p = mv formula",
      "how to calculate momentum",
    ],

    intro:
      "Momentum describes the quantity of motion an object has. It depends on both the object's mass and its velocity.",

    sections: [
      {
        heading: "What is momentum?",
        content:
          "Momentum is a measure of motion that combines an object's mass and velocity. Objects with greater mass or higher velocity have greater momentum.",
      },
      {
        heading: "Momentum formula p = mv",
        content:
          "The momentum formula is p = m × v, where p represents momentum, m represents mass, and v represents velocity.",
      },
      {
        heading: "How to calculate momentum",
        content:
          "To calculate momentum, multiply the object's mass by its velocity. Use kilograms for mass and meters per second for velocity to get SI units.",
      },
      {
        heading: "Common momentum mistakes",
        content:
          "Common mistakes include confusing momentum with kinetic energy, ignoring velocity direction, and using incorrect units.",
      },
    ],

    faq: [
      {
        question: "What is the momentum formula?",
        answer:
          "Momentum is calculated using p = m × v, where mass is multiplied by velocity.",
      },
      {
        question: "What unit is momentum measured in?",
        answer:
          "Momentum is measured in kilogram meters per second (kg·m/s).",
      },
    ],

    relatedFormulas: [
      "momentum",
    ],
    relatedCalculators: [
      "/calculators/momentum-calculator",
      "/calculators/force-calculator",
    ],
  },


  {
    slug: "potential-energy-explained",
    title: "Potential Energy Explained",
    shortDescription:
      "Learn what potential energy means, understand gravitational and elastic potential energy formulas, and solve energy problems.",
    category: "Physics",
    href: "/guides/potential-energy-explained",
    keywords: [
      "potential energy explained",
      "potential energy formula",
      "gravitational potential energy formula",
      "elastic potential energy formula",
      "how to calculate potential energy",
    ],

    intro:
      "Potential energy is stored energy that an object has because of its position, shape, or configuration. It can be converted into kinetic energy when conditions change.",

    sections: [
      {
        heading: "What is potential energy?",
        content:
          "Potential energy is stored energy associated with an object's position or condition. Common examples include gravitational potential energy and elastic potential energy.",
      },
      {
        heading: "Gravitational potential energy formula",
        content:
          "Gravitational potential energy is calculated using PE = mgh, where mass, gravitational acceleration, and height determine stored energy.",
      },
      {
        heading: "Elastic potential energy formula",
        content:
          "Elastic potential energy is stored in stretched or compressed objects. The formula PE = ½kx² uses spring constant and displacement.",
      },
      {
        heading: "How to calculate potential energy",
        content:
          "Identify the correct formula, convert values into SI units, and substitute the values to calculate potential energy.",
      },
      {
        heading: "Potential energy vs kinetic energy",
        content:
          "Potential energy is stored energy due to position, while kinetic energy is energy of motion. Energy can transfer between these forms.",
      },
      {
        heading: "Common potential energy mistakes",
        content:
          "Common mistakes include incorrect units, confusing mass with weight, and using the wrong energy formula.",
      },
    ],

    faq: [
      {
        question: "What is the formula for potential energy?",
        answer:
          "Gravitational potential energy uses PE = mgh, while elastic potential energy uses PE = ½kx².",
      },
      {
        question: "How is gravitational potential energy calculated?",
        answer:
          "Multiply mass, gravitational acceleration, and height to calculate gravitational potential energy.",
      },
      {
        question: "What is elastic potential energy?",
        answer:
          "Elastic potential energy is stored energy in stretched or compressed objects such as springs.",
      },
    ],

    relatedFormulas: [
      "gravitational-potential-energy-formula",
      "elastic-potential-energy-formula",
    ],

    relatedCalculators: [
      "/calculators/gravitational-potential-energy-calculator",
      "/calculators/elastic-potential-energy-calculator",
      "/calculators/work-calculator",
    ],
  },

  {
    slug: "work-explained",
    title: "Work Explained",
    shortDescription:
      "Learn what work means in physics, understand the W = F × d formula, calculate mechanical work, and solve energy problems.",
    category: "Physics",
    href: "/guides/work-explained",
    keywords: [
      "work explained",
      "work formula",
      "w = f × d formula",
      "how to calculate work",
      "mechanical work",
    ],

    intro:
      "Work in physics describes energy transferred when a force causes an object to move through a displacement. It depends on force, distance, and direction.",

    sections: [
      {
        heading: "What is work in physics?",
        content:
          "Work is the transfer of energy that occurs when a force moves an object through a distance. If there is no displacement, no mechanical work is done.",
      },
      {
        heading: "Work formula W = F × d",
        content:
          "The basic work formula is W = F × d, where W represents work, F represents force, and d represents displacement in the direction of the force.",
      },
      {
        heading: "How to calculate work",
        content:
          "To calculate work, multiply the applied force by the distance moved. Use SI units with force measured in newtons and distance measured in meters.",
      },
      {
        heading: "Work and angle of force",
        content:
          "When a force acts at an angle, only the component of force in the direction of motion contributes to work.",
      },
      {
        heading: "Work vs energy",
        content:
          "Work and energy are closely related because work represents energy transferred by a force acting over a distance.",
      },
      {
        heading: "Common work calculation mistakes",
        content:
          "Common mistakes include confusing force with work, ignoring displacement, and using incorrect units.",
      },
    ],

    faq: [
      {
        question: "What is the formula for work?",
        answer:
          "Work is calculated using W = F × d, where force is multiplied by displacement.",
      },
      {
        question: "What unit is work measured in?",
        answer:
          "Work is measured in joules (J), which is equivalent to newton meters.",
      },
    ],

    relatedFormulas: [
      "work",
    ],
    relatedCalculators: [
      "/calculators/work-calculator",
      "/calculators/force-calculator",
      "/calculators/kinetic-energy-calculator",
    ],
  },

  {
    slug: "force-explained",
    title: "Force Explained: Definition, Formula, Units & Examples",
    shortDescription:
      "Learn what force means in physics, understand the F = ma formula, force units, examples, and how to calculate force.",

    category: "Physics",
    href: "/guides/force-explained",

    keywords: [
      "what is force",
      "force explained",
      "force formula",
      "f = ma formula",
      "how to calculate force",
      "newton force unit",
    ],

    intro:
      "Force is a push or pull that can change an object's motion. In physics, force is described using Newton's Second Law, which relates force, mass, and acceleration.",

    sections: [
      {
        heading: "What is force?",
        content:
          "Force is an interaction that can change the velocity of an object. A force can accelerate an object, slow it down, or change its direction.",
      },
      {
        heading: "Force formula F = ma",
        content:
          "Newton's Second Law gives the force formula F = m × a, where F represents force, m represents mass, and a represents acceleration.",
      },
      {
        heading: "How to calculate force",
        content:
          "To calculate force, multiply an object's mass by its acceleration. Use kilograms for mass and meters per second squared for acceleration.",
      },
      {
        heading: "Force unit Newton",
        content:
          "The SI unit of force is the newton (N). One newton is the force required to accelerate a one kilogram object by one meter per second squared.",
      },
      {
        heading: "Common force calculation mistakes",
        content:
          "Common mistakes include confusing mass with weight, ignoring direction, and using incorrect units.",
      },
    ],

    faq: [
      {
        question: "What is the formula for force?",
        answer:
          "Force is calculated using Newton's Second Law: F = m × a.",
      },
      {
        question: "What unit is force measured in?",
        answer:
          "Force is measured in newtons (N).",
      },
    ],

    relatedFormulas: [
      "newtons-second-law",
    ],

    relatedCalculators: [
      "/calculators/force-calculator",
      "/calculators/acceleration-calculator",
      "/calculators/work-calculator",
    ],
  },

  {
    slug: "acceleration-explained",
    title: "Acceleration Explained: Formula, Units & Examples",
    shortDescription:
      "Learn what acceleration means, understand the acceleration formula, calculate acceleration, units, examples, and common mistakes.",

    category: "Physics",
    href: "/guides/acceleration-explained",

    keywords: [
      "acceleration explained",
      "acceleration formula",
      "how to calculate acceleration",
      "acceleration equation",
      "acceleration calculator",
    ],

    intro:
      "Acceleration describes how quickly an object's velocity changes over time. It is a fundamental concept in physics used to analyze motion and forces.",

    sections: [
      {
        heading: "What is acceleration?",
        content:
          "Acceleration is the rate at which velocity changes with time. An object accelerates when it speeds up, slows down, or changes direction.",
      },
      {
        heading: "Acceleration formula",
        content:
          "The acceleration formula is a = Δv / t, where a represents acceleration, Δv represents the change in velocity, and t represents time.",
      },
      {
        heading: "How to calculate acceleration",
        content:
          "To calculate acceleration, subtract the initial velocity from the final velocity and divide the result by the time interval.",
      },
      {
        heading: "Acceleration units",
        content:
          "The SI unit of acceleration is meters per second squared (m/s²). It represents how much velocity changes every second.",
      },
      {
        heading: "Common acceleration mistakes",
        content:
          "Common mistakes include confusing speed with velocity, using incorrect time units, and forgetting the direction of acceleration.",
      },
    ],

    faq: [
      {
        question: "What is the acceleration formula?",
        answer:
          "Acceleration is calculated using a = Δv / t, which divides the change in velocity by the time taken.",
      },
      {
        question: "What unit is acceleration measured in?",
        answer:
          "Acceleration is measured in meters per second squared (m/s²).",
      },
    ],

    relatedFormulas: [
      "acceleration-formula",
    ],

    relatedCalculators: [
      "/calculators/acceleration-calculator",
      "/calculators/force-calculator",
      "/calculators/free-fall-calculator",
    ],
  },

  {
    slug: "newtons-laws-of-motion-explained",
    title: "Newton's Laws of Motion Explained",
    shortDescription:
      "Learn Newton's three laws of motion, understand force, inertia, acceleration, action and reaction, and solve physics motion problems.",
    category: "Physics",
    href: "/guides/newtons-laws-of-motion-explained",
    keywords: [
      "newtons laws of motion",
      "newtons laws explained",
      "first law of motion",
      "second law of motion",
      "third law of motion",
      "force and motion",
    ],

    intro:
      "Newton's Laws of Motion explain how objects move and how forces affect motion. These three fundamental laws form the foundation of classical mechanics.",

    sections: [
      {
        heading: "What are Newton's Laws of Motion?",
        content:
          "Newton's Laws of Motion describe the relationship between forces and the movement of objects. They explain why objects remain at rest, accelerate, or interact with other objects.",
      },
      {
        heading: "Newton's First Law: Law of Inertia",
        content:
          "Newton's First Law states that an object remains at rest or continues moving at constant velocity unless acted upon by an external force. This property is called inertia.",
      },
      {
        heading: "Newton's Second Law: Force and Acceleration",
        content:
          "Newton's Second Law explains that net force is related to mass and acceleration. It helps calculate how forces change an object's motion.",
      },
      {
        heading: "Newton's Third Law: Action and Reaction",
        content:
          "Newton's Third Law states that every action force has an equal and opposite reaction force. Forces always occur in pairs between interacting objects.",
      },
      {
        heading: "Examples of Newton's Laws",
        content:
          "Examples include a car accelerating due to engine force, passengers moving forward when a vehicle stops suddenly, and rockets moving upward through reaction forces.",
      },
      {
        heading: "Common Newton's Laws mistakes",
        content:
          "Common mistakes include confusing mass with weight, ignoring net force, and misunderstanding action-reaction force pairs.",
      },
    ],

    faq: [
      {
        question: "What are Newton's three laws of motion?",
        answer:
          "Newton's three laws explain inertia, the relationship between force and acceleration, and action-reaction force pairs.",
      },
      {
        question: "What formula is used in Newton's Second Law?",
        answer:
          "Newton's Second Law uses F = m × a, where force equals mass multiplied by acceleration.",
      },
    ],

    relatedFormulas: [
      "newtons-second-law",
    ],

    relatedCalculators: [
      "/calculators/force-calculator",
      "/calculators/acceleration-calculator",
      "/calculators/momentum-calculator",
    ],
  },

  {
    slug: "power-explained",
    title: "Power Explained",
    shortDescription:
      "Learn what power means in physics, understand the P = W / t formula, calculate mechanical power, and solve energy transfer problems.",
    category: "Physics",
    href: "/guides/power-explained",
    keywords: [
      "power explained",
      "power formula physics",
      "p = w / t formula",
      "how to calculate power",
      "mechanical power",
    ],

    intro:
      "Power describes how quickly work is done or energy is transferred. It measures the rate at which energy changes or is used over time.",

    sections: [
      {
        heading: "What is power in physics?",
        content:
          "Power is the rate of doing work. Two systems can perform the same amount of work, but the one that completes it in less time has greater power.",
      },
      {
        heading: "Power formula P = W / t",
        content:
          "The power formula is P = W / t, where P represents power, W represents work done, and t represents the time taken.",
      },
      {
        heading: "How to calculate power",
        content:
          "To calculate power, divide the amount of work completed by the time required. Use joules for work and seconds for time to get watts.",
      },
      {
        heading: "Unit of power: watts",
        content:
          "The SI unit of power is the watt (W). One watt equals one joule of work done per second.",
      },
      {
        heading: "Work vs power",
        content:
          "Work measures the amount of energy transferred, while power measures how quickly that energy transfer happens.",
      },
      {
        heading: "Common power calculation mistakes",
        content:
          "Common mistakes include confusing power with work, using incorrect time units, and forgetting to convert values into SI units.",
      },
    ],

    faq: [
      {
        question: "What is the formula for power?",
        answer:
          "Power is calculated using P = W / t, where work is divided by the time taken.",
      },
      {
        question: "What unit is power measured in?",
        answer:
          "Power is measured in watts (W), which equals joules per second.",
      },
    ],

    relatedFormulas: [
      "power",
    ],

    relatedCalculators: [
      "/calculators/power-calculator",
      "/calculators/work-calculator",
      "/calculators/kinetic-energy-calculator",
    ],
  },

  {
    slug: "kinetic-energy-explained",
    title: "Kinetic Energy Explained",
    shortDescription:
      "Learn what kinetic energy means, understand the KE = ½mv² formula, calculate kinetic energy, and solve physics motion problems.",
    category: "Physics",
    href: "/guides/kinetic-energy-explained",
    keywords: [
      "kinetic energy explained",
      "kinetic energy formula",
      "ke formula",
      "how to calculate kinetic energy",
      "kinetic energy calculator",
    ],

    intro:
      "Kinetic energy is the energy an object has because of its motion. It depends on the object's mass and velocity.",

    sections: [
      {
        heading: "What is kinetic energy?",
        content:
          "Kinetic energy is the energy associated with a moving object. Any object with mass and motion has kinetic energy.",
      },
      {
        heading: "Kinetic energy formula KE = ½mv²",
        content:
          "The kinetic energy formula is KE = ½mv², where KE represents kinetic energy, m represents mass, and v represents velocity.",
      },
      {
        heading: "How to calculate kinetic energy",
        content:
          "To calculate kinetic energy, multiply half the object's mass by the square of its velocity. Use kilograms for mass and meters per second for velocity.",
      },
      {
        heading: "Effect of mass and velocity on kinetic energy",
        content:
          "Increasing mass increases kinetic energy proportionally, while increasing velocity has a larger effect because velocity is squared.",
      },
      {
        heading: "Kinetic energy vs potential energy",
        content:
          "Kinetic energy is energy of motion, while potential energy is stored energy due to position or configuration.",
      },
      {
        heading: "Common kinetic energy mistakes",
        content:
          "Common mistakes include forgetting to square velocity, using incorrect units, and confusing kinetic energy with momentum.",
      },
    ],

    faq: [
      {
        question: "What is the kinetic energy formula?",
        answer:
          "Kinetic energy is calculated using KE = ½mv², where mass is multiplied by the square of velocity.",
      },
      {
        question: "What unit is kinetic energy measured in?",
        answer:
          "Kinetic energy is measured in joules (J).",
      },
      {
        question: "Does velocity affect kinetic energy more than mass?",
        answer:
          "Yes. Velocity has a greater effect because it is squared in the kinetic energy formula.",
      },
    ],

    relatedFormulas: [
      "kinetic-energy-formula",
    ],

    relatedCalculators: [
      "/calculators/kinetic-energy-calculator",
      "/calculators/work-calculator",
      "/calculators/momentum-calculator",
    ],
  },

];