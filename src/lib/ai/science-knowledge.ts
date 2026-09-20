export type ScienceKnowledge = {
  keywords: string[];
  title: string;
  explanation: string;
  formula?: string;
  example?: string;
};


export const scienceKnowledge: ScienceKnowledge[] = [
  {
    keywords: [
      "newton",
      "force",
      "acceleration",
    ],

    title:
      "Newton's Second Law",

    explanation:
      "Newton's Second Law explains that the net force acting on an object equals its mass multiplied by its acceleration. It describes how forces change motion.",

    formula:
      "F = m × a",

    example:
      "If a 5 kg object accelerates at 2 m/s², the force is 10 N.",
  },


  {
    keywords: [
      "molarity",
      "concentration",
    ],

    title:
      "Molarity",

    explanation:
      "Molarity measures the concentration of a solution by describing the number of moles of solute present in one liter of solution.",

    formula:
      "M = moles of solute / liters of solution",

    example:
      "A solution containing 1 mole of solute in 1 liter has a molarity of 1 M.",
  },
];
