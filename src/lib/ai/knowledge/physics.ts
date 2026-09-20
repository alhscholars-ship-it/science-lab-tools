export type ScienceTopicKnowledge = {
  keywords: string[];
  title: string;
  explanation: string;
  formula?: string;
  example?: string;
  units?: string[];
  calculators?: string[];
};


export const physicsKnowledge: ScienceTopicKnowledge[] = [

  {
    keywords: [
      "newton",
      "force",
      "acceleration",
      "mass",
    ],

    title:
      "Newton's Second Law",

    explanation:
      "Newton's Second Law explains the relationship between force, mass, and acceleration. The net force acting on an object equals its mass multiplied by its acceleration.",

    formula:
      "F = m × a",

    example:
      "A 5 kg object accelerating at 2 m/s² experiences a force of 10 N.",

    units: [
      "Newton (N)",
      "kg",
      "m/s²",
    ],

    calculators: [
      "/calculators/force-calculator",
    ],
  },


  {
    keywords: [
      "velocity",
      "speed",
      "motion",
    ],

    title:
      "Velocity",

    explanation:
      "Velocity describes the rate of change of position with direction. It is a vector quantity.",

    formula:
      "v = displacement / time",

    example:
      "A car moving 100 meters east in 10 seconds has a velocity of 10 m/s east.",

    units: [
      "m/s",
    ],

    calculators: [
      "/calculators/average-velocity-calculator",
    ],
  },


  {
    keywords: [
      "gravity",
      "free fall",
      "acceleration due to gravity",
    ],

    title:
      "Gravity",

    explanation:
      "Gravity is the force that attracts objects toward Earth. Objects in free fall accelerate because of gravitational force.",

    formula:
      "g = 9.8 m/s²",

    example:
      "A dropped object accelerates downward because of Earth's gravity.",

    units: [
      "m/s²",
    ],

    calculators: [
      "/calculators/free-fall-calculator",
    ],
  },

];
