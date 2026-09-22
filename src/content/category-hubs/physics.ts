export const physicsHub = {
  slug: "physics-calculators",

  title:
    "Physics Calculators - Solve Physics Problems with Formulas & Steps",

  description:
    "Use physics calculators for force, motion, energy, electricity, and mechanics. Get formulas, examples, and step-by-step explanations for physics problems.",

  category: "Physics",

  intro:
  "Use our physics calculators to solve common physics problems accurately. Calculate force with the Force Calculator using Newton's Second Law (F = ma), solve motion and energy problems, and explore formulas with step-by-step explanations for students and teachers.",

  topics: [
    {
      name: "Mechanics",
      calculators: [
        "force-calculator",
        "momentum-calculator",
        "work-calculator",
        "kinetic-energy-calculator",
      ],
    },
    {
      name: "Motion",
      calculators: [
        "acceleration-calculator",
        "free-fall-calculator",
        "projectile-motion-calculator",
        "kinematic-equations-calculator",
      ],
    },
    {
      name: "Force and Energy",
      calculators: [
        "force-calculator",
        "work-calculator",
        "power-calculator",
        "gravitational-potential-energy-calculator",
      ],
    },
    {
      name: "Electricity",
      calculators: [
        "ohms-law-calculator",
        "voltage-divider-calculator",
        "current-divider-calculator",
      ],
    },
    {
      name: "Waves",
      calculators: [
        "wave-speed-calculator",
        "resonant-frequency-calculator",
      ],
    },
    {
      name: "Rotational Physics",
      calculators: [
        "torque-calculator",
        "moment-of-inertia-calculator",
        "angular-momentum-calculator",
      ],
    },
  ],

  faqs: [
    {
      question:
        "What can I calculate with physics calculators?",

      answer:
        "Physics calculators can solve problems involving motion, force, energy, electricity, waves, and other common physics concepts.",
    },
    {
      question:
        "Are these physics calculators useful for students?",

      answer:
        "Yes. They are designed to help students understand formulas and verify physics calculations with step-by-step explanations.",
    },
    {
      question:
        "Do the calculators show physics formulas?",

      answer:
        "Yes. Each calculator explains the formula used and provides guidance on how the calculation works.",
    },
  ],
} as const;
