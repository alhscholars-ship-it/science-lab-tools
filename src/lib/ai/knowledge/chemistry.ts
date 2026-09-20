import type { ScienceTopicKnowledge } from "./physics";


export const chemistryKnowledge: ScienceTopicKnowledge[] = [

  {
    keywords: [
      "molarity",
      "molar concentration",
      "solution concentration",
    ],

    title:
      "Molarity",

    explanation:
      "Molarity describes the concentration of a solution by measuring the number of moles of solute present in one liter of solution.",

    formula:
      "M = moles of solute / liters of solution",

    example:
      "A solution containing 2 moles of solute in 1 liter of solution has a molarity of 2 M.",

    units: [
      "mol/L",
      "M",
    ],

    calculators: [
      "/calculators/molarity-calculator",
    ],
  },


  {
    keywords: [
      "dilution",
      "dilute solution",
      "concentration change",
    ],

    title:
      "Dilution Formula",

    explanation:
      "Dilution reduces solution concentration by adding solvent while keeping the amount of solute constant.",

    formula:
      "C1V1 = C2V2",

    example:
      "A concentrated solution can be diluted by adding solvent until the required concentration is reached.",

    units: [
      "mol/L",
      "L",
    ],

    calculators: [
      "/calculators/dilution-calculator",
    ],
  },


  {
    keywords: [
      "ph",
      "acid",
      "base",
    ],

    title:
      "pH Scale",

    explanation:
      "The pH scale measures how acidic or basic a solution is. Lower values indicate acidity and higher values indicate basicity.",

    formula:
      "pH = -log[H+]",

    example:
      "A solution with pH 7 is neutral, while values below 7 are acidic.",

    units: [
      "pH",
    ],

    calculators: [
      "/calculators/ph-calculator",
    ],
  },


  {
    keywords: [
      "stoichiometry",
      "chemical equation",
      "mole ratio",
    ],

    title:
      "Stoichiometry",

    explanation:
      "Stoichiometry calculates the quantitative relationships between reactants and products in chemical reactions.",

    formula:
      "Mole ratio from balanced chemical equation",

    example:
      "Balanced equations allow scientists to calculate required reactants and produced products.",

    units: [
      "mol",
      "grams",
    ],

    calculators: [
      "/calculators/stoichiometry-calculator",
    ],
  },

];
