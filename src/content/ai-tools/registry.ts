export const aiToolCategories = [
  "Science AI",
  "Chemistry AI",
  "Physics AI",
  "Education AI",
] as const;

export type AIToolCategory =
  (typeof aiToolCategories)[number];

export type ScienceAITool = {
  slug: string;
  name: string;
  description: string;
  category: AIToolCategory;
  href: `/ai-tools/${string}`;

  features: readonly string[];

  keywords: readonly string[];

  relatedCalculators?: readonly string[];
  relatedGuides?: readonly string[];
};

export const scienceAITools: readonly ScienceAITool[] = [
  {
    slug: "ai-science-tutor",
    name: "AI Science Tutor",
    description:
      "Ask science questions and get clear explanations with examples, formulas, and related learning resources.",
    category: "Science AI",
    href: "/ai-tools/ai-science-tutor",

    features: [
      "Simple science explanations",
      "Formula explanations",
      "Real-world examples",
      "Learning assistance",
      "Related science resources",
    ],

    keywords: [
      "AI science tutor",
      "science AI assistant",
      "learn science with AI",
      "AI science helper",
    ],
  },

  {
    slug: "chemistry-ai-solver",
    name: "Chemistry AI Solver",
    description:
      "Solve chemistry problems, understand reactions, and learn chemistry concepts step by step.",
    category: "Chemistry AI",
    href: "/ai-tools/chemistry-ai-solver",

    features: [
      "Chemical equation explanations",
      "Chemistry problem solving",
      "Reaction understanding",
      "Step-by-step solutions",
    ],

    keywords: [
      "chemistry AI solver",
      "chemical equation AI",
      "chemistry homework AI",
    ],
  },

  {
    slug: "physics-ai-solver",
    name: "Physics AI Solver",
    description:
      "Solve physics problems with formulas, calculations, explanations, and related tools.",
    category: "Physics AI",
    href: "/ai-tools/physics-ai-solver",

    features: [
      "Physics problem solving",
      "Formula selection",
      "Calculation explanations",
      "Concept learning",
    ],

    keywords: [
      "physics AI solver",
      "AI physics calculator",
      "physics problem solver",
    ],
  },

  {
    slug: "lab-report-generator",
    name: "AI Lab Report Generator",
    description:
      "Create structured scientific lab reports with objectives, methods, results, and conclusions.",
    category: "Education AI",
    href: "/ai-tools/lab-report-generator",

    features: [
      "Generate lab report structure",
      "Create scientific sections",
      "Improve report writing",
      "Student assistance",
    ],

    keywords: [
      "AI lab report generator",
      "science report generator",
      "lab report AI",
    ],

    relatedGuides: [
      "/lab-reports/how-to-write-a-lab-report",
    ],
  },

  {
    slug: "science-quiz-generator",
    name: "Science Quiz Generator",
    description:
      "Generate science quizzes with questions, answers, and explanations for students.",
    category: "Education AI",
    href: "/ai-tools/science-quiz-generator",

    features: [
      "Generate science questions",
      "Create quizzes",
      "Provide explanations",
      "Student practice",
    ],

    keywords: [
      "science quiz generator AI",
      "AI science questions",
      "science practice quiz",
    ],
  },
];
