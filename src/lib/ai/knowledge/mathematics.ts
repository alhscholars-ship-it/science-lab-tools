import type { ScienceTopicKnowledge } from "./physics";


export const mathematicsKnowledge: ScienceTopicKnowledge[] = [

  {
    keywords: [
      "algebra",
      "equation",
      "variable",
      "solve",
    ],

    title:
      "Algebra",

    explanation:
      "Algebra is a branch of mathematics that uses symbols and variables to represent unknown values and solve relationships between quantities.",

    formula:
      "x + a = b",

    example:
      "If x + 5 = 10, then x = 5.",

    units: [
      "variable",
    ],
  },


  {
    keywords: [
      "statistics",
      "mean",
      "average",
      "standard deviation",
    ],

    title:
      "Statistics",

    explanation:
      "Statistics is the study of collecting, analyzing, interpreting, and presenting data.",

    formula:
      "Mean = sum of values / number of values",

    example:
      "The average of 2, 4, and 6 is 4.",

    units: [
      "data values",
    ],
  },


  {
    keywords: [
      "scientific notation",
      "exponent",
      "powers of ten",
    ],

    title:
      "Scientific Notation",

    explanation:
      "Scientific notation expresses very large or very small numbers using powers of ten.",

    formula:
      "a × 10ⁿ",

    example:
      "300000 can be written as 3 × 10⁵.",

    units: [
      "number",
    ],
  },


  {
    keywords: [
      "probability",
      "chance",
    ],

    title:
      "Probability",

    explanation:
      "Probability measures the likelihood that an event will occur.",

    formula:
      "Probability = favorable outcomes / total outcomes",

    example:
      "The probability of getting heads from a fair coin is 1/2.",

    units: [
      "ratio",
    ],
  },

];
