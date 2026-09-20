export type CalculatorSuggestion = {
  name: string;
  href: string;
};


const calculators = [
  {
    keywords: [
      "force",
      "mass",
      "acceleration",
    ],
    name: "Force Calculator",
    href: "/calculators/force-calculator",
  },


  {
    keywords: [
      "velocity",
      "speed",
      "distance",
      "time",
    ],
    name: "Velocity Calculator",
    href: "/calculators/average-velocity-calculator",
  },


  {
    keywords: [
      "molarity",
      "solution",
      "concentration",
    ],
    name: "Molarity Calculator",
    href: "/calculators/molarity-calculator",
  },
];


export function detectCalculator(
  question: string,
): CalculatorSuggestion | null {

  const text =
    question.toLowerCase();


  return (
    calculators.find((calculator) =>
      calculator.keywords.some((keyword) =>
        text.includes(keyword),
      ),
    ) ?? null
  );

}
