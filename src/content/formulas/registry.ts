export const formulaCategories = [
  "Physics",
  "Chemistry",
  "Laboratory",
] as const;

export type FormulaCategory =
  (typeof formulaCategories)[number];

export type ScienceFormula = {
  slug: string;
  name: string;
  equation: string;
  description: string;
  category: FormulaCategory;

  subCategory?: string;
  keywords?: readonly string[];

  variables: readonly string[];
  calculatorHref: `/calculators/${string}`;

  explanation?: string;
  example?: string;

  units?: readonly string[];
  whenToUse?: string;
  rearranged?: readonly string[];

  commonMistakes?: readonly string[];
  applications?: readonly string[];

  relatedFormulas?: readonly string[];
  relatedCalculators?: readonly string[];
  relatedGuides?: readonly string[];
};

export const scienceFormulas: readonly ScienceFormula[] = [
  {
    slug: "newtons-second-law",
    name: "Newton's Second Law",
    equation: "F = m × a",
    description: "Relates net force to mass and acceleration.",
    category: "Physics",
    variables: ["F = force", "m = mass", "a = acceleration"],
    explanation:
      "Newton's Second Law states that the net force acting on an object equals its mass multiplied by its acceleration. It explains how forces change the motion of objects.",
    example:
      "If a 5 kg object accelerates at 2 m/s², the required force is 5 × 2 = 10 N.",
    commonMistakes: [
      "Using total mass incorrectly when calculating net force.",
      "Forgetting that acceleration must use consistent units.",
      "Ignoring the direction of force and acceleration.",
    ],
    applications: [
      "Vehicle acceleration calculations.",
      "Engineering force analysis.",
      "Motion and mechanics experiments.",
    ],
    relatedFormulas: [
      "weight",
      "momentum",
      "kinetic-energy",
      "work",
    ],
    relatedCalculators: [
      "/calculators/force-calculator",
      "/calculators/acceleration-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    units: [
      "Force: Newton (N)",
      "Mass: kilogram (kg)",
      "Acceleration: meters per second squared (m/s²)",
    ],
    whenToUse:
      "Use this formula when calculating the net force acting on an object from its mass and acceleration, especially in mechanics and motion problems.",
    rearranged: [
      "m = F / a",
      "a = F / m",
    ],
    calculatorHref: "/calculators/force-calculator",
  },
  {
    slug: "weight",
    name: "Weight",
    equation: "W = m × g",
    description: "Calculates the gravitational force acting on a mass.",
    category: "Physics",
    variables: ["W = weight", "m = mass", "g = gravitational acceleration"],
    explanation:
      "The weight formula calculates the gravitational force acting on an object. Weight depends on an object's mass and the local gravitational acceleration.",
    example:
      "A 10 kg object on Earth with gravitational acceleration of 9.8 m/s² has a weight of 10 × 9.8 = 98 N.",
    commonMistakes: [
      "Confusing mass with weight because they use different units.",
      "Using the wrong gravitational acceleration value.",
      "Reporting weight in kilograms instead of newtons.",
    ],
    applications: [
      "Calculating forces acting on objects.",
      "Physics and engineering mechanics problems.",
      "Understanding gravity effects on different planets.",
    ],
    relatedFormulas: [
      "newtons-second-law",
      "momentum",
      "density",
    ],
    relatedCalculators: [
      "/calculators/weight-calculator",
      "/calculators/force-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/weight-calculator",
  },
  {
    slug: "momentum",
    name: "Linear Momentum",
    equation: "p = m × v",
    description: "Finds the momentum of an object in linear motion.",
    category: "Physics",
    variables: ["p = momentum", "m = mass", "v = velocity"],
    explanation:
      "Momentum describes the quantity of motion an object has. It depends on both the object's mass and its velocity.",
    example:
      "A 4 kg object moving at 3 m/s has momentum of 4 × 3 = 12 kg·m/s.",
    commonMistakes: [
      "Ignoring the direction of velocity when calculating momentum.",
      "Mixing units for mass and velocity.",
      "Confusing momentum with kinetic energy.",
    ],
    applications: [
      "Collision analysis in physics.",
      "Conservation of momentum problems.",
      "Vehicle safety and impact calculations.",
    ],
    relatedFormulas: [
      "newtons-second-law",
      "kinetic-energy",
      "work",
    ],
    relatedCalculators: [
      "/calculators/momentum-calculator",
      "/calculators/force-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    units: [
      "Momentum: kilogram meter per second (kg·m/s)",
      "Mass: kilogram (kg)",
      "Velocity: meters per second (m/s)",
    ],
    whenToUse:
      "Use this formula when calculating the quantity of motion of an object based on its mass and velocity, especially in collision and motion problems.",
    rearranged: [
      "m = p / v",
      "v = p / m",
    ],
    calculatorHref: "/calculators/momentum-calculator",
  },
  {
    slug: "kinetic-energy",
    name: "Kinetic Energy",
    equation: "Eₖ = ½mv²",
    description: "Calculates energy due to an object's motion.",
    category: "Physics",
    variables: ["Eₖ = kinetic energy", "m = mass", "v = velocity"],
    explanation:
      "Kinetic energy is the energy an object possesses because of its motion. It depends on the object's mass and the square of its velocity.",
    example:
      "A 2 kg object moving at 5 m/s has kinetic energy of ½ × 2 × 5² = 25 J.",
    commonMistakes: [
      "Forgetting that velocity must be squared.",
      "Using mass in incorrect units.",
      "Confusing kinetic energy with total mechanical energy.",
    ],
    applications: [
      "Vehicle motion and collision analysis.",
      "Mechanical engineering calculations.",
      "Studying energy changes in moving systems.",
    ],
    relatedFormulas: [
      "momentum",
      "work",
      "power",
      "newtons-second-law",
    ],
    relatedCalculators: [
      "/calculators/kinetic-energy-calculator",
      "/calculators/momentum-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    units: [
      "Kinetic Energy: Joules (J)",
      "Mass: kilogram (kg)",
      "Velocity: meters per second (m/s)",
    ],
    whenToUse:
      "Use this formula when calculating the energy an object has because of its motion. It is commonly used in mechanics, collisions, and energy analysis.",
    rearranged: [
      "m = 2Eₖ / v²",
      "v = √(2Eₖ / m)",
    ],
    calculatorHref: "/calculators/kinetic-energy-calculator",
  },
  {
    slug: "work",
    name: "Mechanical Work",
    equation: "W = Fd cos θ",
    description: "Calculates work when force acts through a displacement.",
    category: "Physics",
    variables: ["W = work", "F = force", "d = displacement", "θ = angle"],
    explanation:
      "Mechanical work measures energy transferred when a force causes an object to move through a displacement. The amount of work depends on force, distance, and the angle between them.",
    example:
      "A 10 N force moves an object 5 m in the same direction. Work done is 10 × 5 × cos(0°) = 50 J.",
    commonMistakes: [
      "Ignoring the angle between force and displacement.",
      "Confusing work with force alone.",
      "Using incorrect units instead of joules.",
    ],
    applications: [
      "Machine and mechanical system analysis.",
      "Energy transfer calculations.",
      "Physics experiments involving forces and motion.",
    ],
    relatedFormulas: [
      "kinetic-energy",
      "power",
      "newtons-second-law",
      "momentum",
    ],
    relatedCalculators: [
      "/calculators/work-calculator",
      "/calculators/force-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    units: [
      "Work: Joules (J)",
      "Force: Newton (N)",
      "Displacement: meters (m)",
      "Angle: degrees or radians",
    ],
    whenToUse:
      "Use this formula when calculating energy transferred by a force that causes an object to move through a displacement.",
    rearranged: [
      "F = W / (d cos θ)",
      "d = W / (F cos θ)",
    ],
    calculatorHref: "/calculators/work-calculator",
  },
  {
    slug: "power",
    name: "Power",
    equation: "P = W ÷ t",
    description: "Measures how quickly work is done or energy is transferred.",
    category: "Physics",
    variables: ["P = power", "W = work", "t = time"],
    explanation:
      "Power describes the rate at which work is completed or energy is transferred. A higher power value means the same amount of work is done in less time.",
    example:
      "If 200 joules of work are completed in 10 seconds, the power is 200 ÷ 10 = 20 watts.",
    commonMistakes: [
      "Confusing power with total work or energy.",
      "Using incorrect time units.",
      "Forgetting that power measures a rate.",
    ],
    applications: [
      "Electrical and mechanical system analysis.",
      "Comparing machine performance.",
      "Energy efficiency calculations.",
    ],
    relatedFormulas: [
      "work",
      "kinetic-energy",
      "newtons-second-law",
    ],
    relatedCalculators: [
      "/calculators/power-calculator",
      "/calculators/work-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    units: [
      "Power: Watt (W)",
      "Work/Energy: Joule (J)",
      "Time: seconds (s)",
    ],
    whenToUse:
      "Use this formula when calculating how quickly work is completed or how fast energy is transferred over time.",
    rearranged: [
      "W = P × t",
      "t = W / P",
    ],
    calculatorHref: "/calculators/power-calculator",
  },
  {
    slug: "density",
    name: "Density",
    equation: "ρ = m ÷ V",
    description: "Relates the mass of a substance to its volume.",
    category: "Physics",
    variables: ["ρ = density", "m = mass", "V = volume"],
    explanation:
      "Density describes how much mass is contained in a given volume. It helps compare how tightly matter is packed in different substances.",
    example:
      "A substance with a mass of 200 g and volume of 50 cm³ has a density of 200 ÷ 50 = 4 g/cm³.",
    commonMistakes: [
      "Mixing mass and volume units without conversion.",
      "Confusing density with weight.",
      "Using the wrong volume measurement.",
    ],
    applications: [
      "Identifying unknown materials.",
      "Chemistry and laboratory measurements.",
      "Calculating mass or volume from known density.",
    ],
    relatedFormulas: [
      "weight",
      "pressure",
      "ideal-gas-law",
    ],
    relatedCalculators: [
      "/calculators/density-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/density-calculator",
  },
  {
    slug: "pressure",
    name: "Pressure",
    equation: "P = F ÷ A",
    description: "Calculates force distributed over a surface area.",
    category: "Physics",
    variables: ["P = pressure", "F = normal force", "A = area"],
    explanation:
      "Pressure describes how much force is applied over a given area. The same force creates higher pressure when applied over a smaller area.",
    example:
      "A 100 N force applied over 5 m² creates pressure of 100 ÷ 5 = 20 Pa.",
    commonMistakes: [
      "Confusing pressure with force.",
      "Using incorrect area units.",
      "Forgetting that pressure decreases when area increases.",
    ],
    applications: [
      "Fluid and gas pressure calculations.",
      "Engineering and mechanical systems.",
      "Laboratory measurements involving force distribution.",
    ],
    relatedFormulas: [
      "density",
      "newtons-second-law",
      "ideal-gas-law",
    ],
    relatedCalculators: [
      "/calculators/pressure-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/pressure-calculator",
  },
  {
    slug: "ohms-law",
    name: "Ohm's Law",
    equation: "V = I × R",
    description: "Connects voltage, current, and electrical resistance.",
    category: "Physics",
    variables: ["V = voltage", "I = current", "R = resistance"],
    explanation:
      "Ohm's Law describes the relationship between voltage, current, and resistance in an electrical circuit. It shows how current changes when voltage or resistance changes.",
    example:
      "A circuit with 12 volts and 4 ohms of resistance has a current of 12 ÷ 4 = 3 amperes.",
    commonMistakes: [
      "Mixing voltage, current, and resistance values.",
      "Using incorrect electrical units.",
      "Assuming resistance stays constant in every component.",
    ],
    applications: [
      "Designing and analyzing electrical circuits.",
      "Calculating current flow in electronics.",
      "Electrical laboratory experiments.",
    ],
    relatedFormulas: [
      "power",
      "newtons-second-law",
      "pressure",
    ],
    relatedCalculators: [
      "/calculators/ohms-law-calculator",
      "/calculators/power-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/ohms-law-calculator",
  },
  {
    slug: "wave-speed",
    name: "Wave Speed",
    equation: "v = f × λ",
    description: "Relates a wave's speed, frequency, and wavelength.",
    category: "Physics",
    variables: ["v = wave speed", "f = frequency", "λ = wavelength"],
    explanation:
      "The wave speed formula describes how quickly a wave travels through a medium. Wave speed depends on the frequency of the wave and its wavelength.",
    example:
      "A wave with a frequency of 10 Hz and wavelength of 2 m travels at 10 × 2 = 20 m/s.",
    commonMistakes: [
      "Confusing frequency with wavelength.",
      "Using incorrect units for wavelength or speed.",
      "Assuming all waves travel at the same speed in every medium.",
    ],
    applications: [
      "Studying sound and light waves.",
      "Physics experiments involving wave motion.",
      "Analyzing communication and signal systems.",
    ],
    relatedFormulas: [
      "specific-heat",
      "kinetic-energy",
      "power",
    ],
    relatedCalculators: [
      "/calculators/wave-speed-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/wave-speed-calculator",
  },
  {
    slug: "specific-heat",
    name: "Specific Heat",
    equation: "Q = m × c × ΔT",
    description: "Calculates heat transferred during a temperature change.",
    category: "Physics",
    variables: ["Q = heat", "m = mass", "c = specific heat capacity", "ΔT = temperature change"],
    explanation:
      "The specific heat formula calculates the amount of heat energy required to change the temperature of a substance. It depends on the substance's mass, specific heat capacity, and temperature change.",
    example:
      "Heating 2 kg of a material with specific heat capacity 500 J/kg·°C by 10°C requires 2 × 500 × 10 = 10000 J of heat.",
    commonMistakes: [
      "Using incorrect specific heat values for materials.",
      "Mixing temperature units.",
      "Forgetting that mass affects the required heat energy.",
    ],
    applications: [
      "Thermal engineering calculations.",
      "Laboratory heat transfer experiments.",
      "Studying temperature changes in materials.",
    ],
    relatedFormulas: [
      "wave-speed",
      "power",
      "density",
    ],
    relatedCalculators: [
      "/calculators/specific-heat-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/specific-heat-calculator",
  },
  {
    slug: "molarity",
    name: "Molarity",
    equation: "M = n ÷ V",
    description: "Expresses solution concentration as moles per liter.",
    category: "Chemistry",
    variables: ["M = molarity", "n = moles of solute", "V = solution volume in liters"],
    explanation:
      "Molarity measures the concentration of a solution by showing how many moles of solute are present in one liter of solution.",
    example:
      "A solution containing 2 moles of solute in 4 liters of solution has a molarity of 2 ÷ 4 = 0.5 M.",
    commonMistakes: [
      "Using milliliters instead of liters without conversion.",
      "Confusing moles of solute with mass of solute.",
      "Using solvent volume instead of total solution volume.",
    ],
    applications: [
      "Preparing laboratory solutions.",
      "Chemical reaction calculations.",
      "Determining solution concentrations in experiments.",
    ],
    relatedFormulas: [
      "molality",
      "dilution",
      "mole-fraction",
      "ideal-gas-law",
    ],
    relatedCalculators: [
      "/calculators/molarity-calculator",
      "/calculators/dilution-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/molarity-calculator",
  },
  {
    slug: "molality",
    name: "Molality",
    equation: "m = n ÷ kg solvent",
    description: "Expresses concentration as moles per kilogram of solvent.",
    category: "Chemistry",
    variables: ["m = molality", "n = moles of solute", "kg solvent = solvent mass"],
    explanation:
      "Molality describes the concentration of a solution by comparing the number of moles of solute to the mass of the solvent. Unlike molarity, it depends on solvent mass rather than solution volume.",
    example:
      "A solution containing 2 moles of solute dissolved in 4 kg of solvent has a molality of 2 ÷ 4 = 0.5 m.",
    commonMistakes: [
      "Using solution volume instead of solvent mass.",
      "Forgetting to convert grams of solvent into kilograms.",
      "Confusing molality with molarity.",
    ],
    applications: [
      "Calculating concentration changes with temperature.",
      "Studying colligative properties of solutions.",
      "Advanced chemistry laboratory calculations.",
    ],
    relatedFormulas: [
      "molarity",
      "dilution",
      "mole-fraction",
      "percent-yield",
    ],
    relatedCalculators: [
      "/calculators/molality-calculator",
      "/calculators/molarity-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/molality-calculator",
  },
  {
    slug: "dilution",
    name: "Solution Dilution",
    equation: "C₁V₁ = C₂V₂",
    description: "Relates concentration and volume before and after dilution.",
    category: "Chemistry",
    variables: ["C = concentration", "V = volume", "1 = initial", "2 = final"],
    explanation:
      "The dilution formula describes how the concentration of a solution changes when more solvent is added. The amount of dissolved solute remains constant while the solution volume increases.",
    example:
      "If 100 mL of a 2 M solution is diluted to 500 mL, the final concentration is (2 × 100) ÷ 500 = 0.4 M.",
    commonMistakes: [
      "Mixing initial and final concentration values.",
      "Using inconsistent volume units.",
      "Assuming the amount of solute changes during dilution.",
    ],
    applications: [
      "Preparing laboratory solutions.",
      "Creating standard chemical concentrations.",
      "Analytical chemistry experiments.",
    ],
    relatedFormulas: [
      "molarity",
      "molality",
      "percent-yield",
      "mole-fraction",
    ],
    relatedCalculators: [
      "/calculators/dilution-calculator",
      "/calculators/molarity-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/dilution-calculator",
  },
  {
    slug: "ideal-gas-law",
    name: "Ideal Gas Law",
    equation: "PV = nRT",
    description: "Relates pressure, volume, amount, and temperature of an ideal gas.",
    category: "Chemistry",
    variables: ["P = pressure", "V = volume", "n = moles", "R = gas constant", "T = temperature"],
    explanation:
      "The Ideal Gas Law describes the relationship between pressure, volume, temperature, and amount of gas. It is used to predict how an ideal gas behaves under different conditions.",
    example:
      "A gas with 1 mole at constant temperature can be analyzed by using pressure, volume, and the gas constant in PV = nRT.",
    commonMistakes: [
      "Using temperature in Celsius instead of Kelvin.",
      "Using inconsistent pressure or volume units.",
      "Confusing moles with mass of gas.",
    ],
    applications: [
      "Gas behavior calculations in chemistry.",
      "Laboratory gas experiments.",
      "Predicting changes in pressure, volume, or temperature.",
    ],
    relatedFormulas: [
      "pressure",
      "density",
      "molarity",
      "mole-fraction",
    ],
    relatedCalculators: [
      "/calculators/ideal-gas-law-calculator",
      "/calculators/pressure-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/ideal-gas-law-calculator",
  },
  {
    slug: "ph",
    name: "pH",
    equation: "pH = −log₁₀[H⁺]",
    description: "Calculates acidity from the hydrogen ion concentration.",
    category: "Chemistry",
    variables: ["pH = acidity scale value", "[H⁺] = hydrogen ion concentration"],
    explanation:
      "The pH formula measures how acidic or basic a solution is by relating pH to the concentration of hydrogen ions. Lower pH values indicate higher acidity, while higher values indicate greater alkalinity.",
    example:
      "If the hydrogen ion concentration is 1 × 10⁻³ M, the pH is −log₁₀(10⁻³) = 3.",
    commonMistakes: [
      "Using the wrong hydrogen ion concentration value.",
      "Confusing pH with concentration directly.",
      "Forgetting that the pH scale is logarithmic.",
    ],
    applications: [
      "Acid-base chemistry experiments.",
      "Water quality testing.",
      "Laboratory solution preparation.",
    ],
    relatedFormulas: [
      "molarity",
      "molality",
      "dilution",
      "percent-yield",
    ],
    relatedCalculators: [
      "/calculators/ph-calculator",
      "/calculators/molarity-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/ph-calculator",
  },
  {
    slug: "percent-yield",
    name: "Percent Yield",
    equation: "% yield = actual ÷ theoretical × 100",
    description: "Compares the measured product yield with the theoretical yield.",
    category: "Chemistry",
    variables: ["actual = measured yield", "theoretical = predicted maximum yield"],
    explanation:
      "Percent yield measures the efficiency of a chemical reaction by comparing the actual amount of product obtained with the maximum theoretical amount predicted by calculations.",
    example:
      "If a reaction theoretically produces 10 g of product but the experiment produces 8 g, the percent yield is (8 ÷ 10) × 100 = 80%.",
    commonMistakes: [
      "Swapping actual yield and theoretical yield values.",
      "Using inconsistent measurement units.",
      "Expecting percent yield to always equal 100%.",
    ],
    applications: [
      "Evaluating efficiency of chemical reactions.",
      "Laboratory experiment analysis.",
      "Industrial chemical production calculations.",
    ],
    relatedFormulas: [
      "molarity",
      "molality",
      "dilution",
      "mass-to-moles",
    ],
    relatedCalculators: [
      "/calculators/percent-yield-calculator",
      "/calculators/molarity-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/percent-yield-calculator",
  },
  {
    slug: "mass-to-moles",
    name: "Mass to Moles",
    equation: "n = m ÷ M",
    description: "Converts sample mass to amount of substance in moles.",
    category: "Chemistry",
    variables: ["n = moles", "m = sample mass", "M = molar mass"],
    explanation:
      "The mass to moles formula converts the measured mass of a substance into the amount of substance in moles. It uses the molar mass as the conversion factor.",
    example:
      "For 18 g of water with a molar mass of 18 g/mol, the number of moles is 18 ÷ 18 = 1 mol.",
    commonMistakes: [
      "Using the wrong molar mass value.",
      "Confusing grams with moles.",
      "Using incorrect mass units.",
    ],
    applications: [
      "Chemical reaction calculations.",
      "Stoichiometry problems.",
      "Laboratory substance measurements.",
    ],
    relatedFormulas: [
      "percent-yield",
      "molarity",
      "molality",
      "mole-fraction",
    ],
    relatedCalculators: [
      "/calculators/mass-moles-calculator",
      "/calculators/molarity-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/mass-moles-calculator",
  },
  {
    slug: "mole-fraction",
    name: "Mole Fraction",
    equation: "Xᵢ = nᵢ ÷ nₜₒₜₐₗ",
    description: "Finds a component's fraction of the total amount in a mixture.",
    category: "Chemistry",
    variables: ["Xᵢ = mole fraction", "nᵢ = component moles", "nₜₒₜₐₗ = total moles"],
    explanation:
      "Mole fraction represents the ratio of the number of moles of one component to the total number of moles in a mixture. It describes the relative amount of each substance present.",
    example:
      "A mixture containing 2 moles of oxygen and 8 total moles has an oxygen mole fraction of 2 ÷ 8 = 0.25.",
    commonMistakes: [
      "Using mass instead of moles.",
      "Forgetting to include all components in total moles.",
      "Confusing mole fraction with molarity.",
    ],
    applications: [
      "Analyzing gas mixtures.",
      "Solution composition calculations.",
      "Chemical mixture analysis.",
    ],
    relatedFormulas: [
      "molarity",
      "molality",
      "mass-to-moles",
      "ideal-gas-law",
    ],
    relatedCalculators: [
      "/calculators/mole-fraction-calculator",
      "/calculators/molarity-calculator",
    ],
    relatedGuides: [
      "/scientific-method/experimental-design",
    ],
    calculatorHref: "/calculators/mole-fraction-calculator",
  },
  {
    slug: "percent-error",
    name: "Percent Error",
    equation: "% error = |experimental − accepted| ÷ |accepted| × 100",
    description: "Compares an experimental result with an accepted reference value.",
    category: "Laboratory",
    variables: ["experimental = measured value", "accepted = reference value"],
    explanation:
      "Percent error measures how far an experimental result differs from an accepted or theoretical value. It helps evaluate the accuracy of measurements and experiments.",
    example:
      "If the accepted value is 50 and the experimental value is 48, the percent error is |48 − 50| ÷ 50 × 100 = 4%.",
    commonMistakes: [
      "Using the experimental value as the denominator.",
      "Ignoring the absolute value difference.",
      "Mixing accepted and measured values.",
    ],
    applications: [
      "Evaluating laboratory measurement accuracy.",
      "Analyzing experimental results.",
      "Comparing observed values with standards.",
    ],
    relatedFormulas: [
      "percent-difference",
      "percent-yield",
      "arithmetic-mean",
      "sample-standard-deviation",
    ],
    relatedCalculators: [
      "/calculators/percent-error-calculator",
      "/calculators/percent-difference-calculator",
    ],
    relatedGuides: [
      "/scientific-method/analyze-experimental-results",
    ],
    calculatorHref: "/calculators/percent-error-calculator",
  },
  {
    slug: "percent-difference",
    name: "Percent Difference",
    equation: "% difference = |A − B| ÷ ((|A| + |B|) ÷ 2) × 100",
    description: "Compares two experimental values when neither is an accepted value.",
    category: "Laboratory",
    variables: ["A = first value", "B = second value"],
    explanation:
      "Percent difference compares two measured values when there is no known accepted or theoretical value. It shows the relative difference between the two measurements.",
    example:
      "If two measurements are 45 and 50, the percent difference is |45 − 50| ÷ ((45 + 50) ÷ 2) × 100 = 10.53%.",
    commonMistakes: [
      "Using an accepted value instead of the average of both values.",
      "Forgetting to calculate the absolute difference.",
      "Using inconsistent measurement units.",
    ],
    applications: [
      "Comparing repeated laboratory measurements.",
      "Evaluating agreement between experimental results.",
      "Analyzing measurement consistency.",
    ],
    relatedFormulas: [
      "percent-error",
      "arithmetic-mean",
      "sample-standard-deviation",
      "uncertainty-propagation",
    ],
    relatedCalculators: [
      "/calculators/percent-difference-calculator",
      "/calculators/percent-error-calculator",
    ],
    relatedGuides: [
      "/scientific-method/analyze-experimental-results",
    ],
    calculatorHref: "/calculators/percent-difference-calculator",
  },
  {
    slug: "arithmetic-mean",
    name: "Arithmetic Mean",
    equation: "x̄ = Σx ÷ n",
    description: "Calculates the average of a set of observations.",
    category: "Laboratory",
    variables: ["x̄ = mean", "Σx = sum of values", "n = number of values"],
    explanation:
      "The arithmetic mean calculates the average value of a set of measurements by dividing the total sum of values by the number of observations. It is commonly used to represent a typical result from repeated measurements.",
    example:
      "For values 10, 15, and 20, the arithmetic mean is (10 + 15 + 20) ÷ 3 = 15.",
    commonMistakes: [
      "Forgetting to include all data values.",
      "Dividing by the wrong number of observations.",
      "Adding values incorrectly before calculating the average.",
    ],
    applications: [
      "Analyzing repeated laboratory measurements.",
      "Summarizing experimental data.",
      "Calculating average scientific observations.",
    ],
    relatedFormulas: [
      "percent-error",
      "percent-difference",
      "sample-standard-deviation",
      "uncertainty-propagation",
    ],
    relatedCalculators: [
      "/calculators/mean-median-mode-calculator",
      "/calculators/standard-deviation-calculator",
    ],
    relatedGuides: [
      "/scientific-method/analyze-experimental-results",
    ],
    calculatorHref: "/calculators/mean-median-mode-calculator",
  },
  {
    slug: "sample-standard-deviation",
    name: "Sample Standard Deviation",
    equation: "s = √(Σ(xᵢ − x̄)² ÷ (n − 1))",
    description: "Measures the spread of sample observations around their mean.",
    category: "Laboratory",
    variables: ["s = sample standard deviation", "xᵢ = each value", "x̄ = sample mean", "n = sample size"],
    explanation:
      "Sample standard deviation measures how spread out a set of sample measurements are around their average value. It helps describe the variability and consistency of experimental data.",
    example:
      "For sample values 4, 6, and 8, the standard deviation shows how much the measurements vary from their mean value of 6.",
    commonMistakes: [
      "Using population standard deviation when working with a sample.",
      "Dividing by n instead of n − 1 for sample data.",
      "Calculating deviations from the wrong mean value.",
    ],
    applications: [
      "Analyzing experimental measurement variation.",
      "Evaluating precision of laboratory results.",
      "Studying reliability of collected data.",
    ],
    relatedFormulas: [
      "arithmetic-mean",
      "percent-error",
      "percent-difference",
      "coefficient-of-variation",
    ],
    relatedCalculators: [
      "/calculators/standard-deviation-calculator",
      "/calculators/coefficient-variation-calculator",
    ],
    relatedGuides: [
      "/scientific-method/analyze-experimental-results",
    ],
    calculatorHref: "/calculators/standard-deviation-calculator",
  },
  {
    slug: "coefficient-of-variation",
    name: "Coefficient of Variation",
    equation: "CV = s ÷ x̄ × 100",
    description: "Expresses variability relative to the mean as a percentage.",
    category: "Laboratory",
    variables: ["CV = coefficient of variation", "s = standard deviation", "x̄ = mean"],
    explanation:
      "The coefficient of variation compares the standard deviation to the mean value and expresses variability as a percentage. It is useful for comparing the relative spread of different datasets.",
    example:
      "If the standard deviation is 5 and the mean is 50, the coefficient of variation is (5 ÷ 50) × 100 = 10%.",
    commonMistakes: [
      "Using the wrong mean value.",
      "Forgetting to multiply by 100 to convert to percentage.",
      "Comparing datasets with inappropriate or zero means.",
    ],
    applications: [
      "Comparing precision between experiments.",
      "Analyzing variability in scientific measurements.",
      "Evaluating consistency of laboratory data.",
    ],
    relatedFormulas: [
      "sample-standard-deviation",
      "arithmetic-mean",
      "percent-error",
      "percent-difference",
    ],
    relatedCalculators: [
      "/calculators/coefficient-variation-calculator",
      "/calculators/standard-deviation-calculator",
    ],
    relatedGuides: [
      "/scientific-method/analyze-experimental-results",
    ],
    calculatorHref: "/calculators/coefficient-variation-calculator",
  },
  {
    slug: "relative-uncertainty",
    name: "Relative Uncertainty",
    equation: "relative uncertainty = absolute uncertainty ÷ |measured value|",
    description: "Shows measurement uncertainty relative to the measured magnitude.",
    category: "Laboratory",
    variables: ["absolute uncertainty = uncertainty in original units", "measured value = reported result"],
    explanation:
      "Relative uncertainty expresses the size of measurement uncertainty compared with the measured value. It helps evaluate the precision of measurements regardless of the original units.",
    example:
      "If a measurement is 50 cm with an uncertainty of 2 cm, the relative uncertainty is 2 ÷ 50 = 0.04.",
    commonMistakes: [
      "Using the wrong measured value as the denominator.",
      "Confusing absolute uncertainty with relative uncertainty.",
      "Forgetting to keep units consistent.",
    ],
    applications: [
      "Evaluating measurement precision.",
      "Reporting scientific experimental results.",
      "Comparing uncertainty between different measurements.",
    ],
    relatedFormulas: [
      "sample-standard-deviation",
      "coefficient-of-variation",
      "percent-error",
      "percent-difference",
    ],
    relatedCalculators: [
      "/calculators/measurement-uncertainty-calculator",
      "/calculators/standard-deviation-calculator",
    ],
    relatedGuides: [
      "/scientific-method/analyze-experimental-results",
    ],
    calculatorHref: "/calculators/measurement-uncertainty-calculator",
  },
  {
    slug: "rate-of-change",
    name: "Average Rate of Change",
    equation: "rate = (y₂ − y₁) ÷ (x₂ − x₁)",
    description: "Calculates the average change in one variable per unit change in another.",
    category: "Laboratory",
    variables: ["y = dependent variable", "x = independent variable"],
    explanation:
      "Average rate of change measures how much one variable changes compared with another variable over an interval. It describes the overall trend between two points.",
    example:
      "If a value changes from 10 to 30 while the input changes from 2 to 6, the average rate of change is (30 − 10) ÷ (6 − 2) = 5.",
    commonMistakes: [
      "Subtracting values in the wrong order.",
      "Using inconsistent units for variables.",
      "Confusing average rate of change with instantaneous rate.",
    ],
    applications: [
      "Analyzing experimental trends.",
      "Studying changes in scientific measurements.",
      "Comparing variable relationships.",
    ],
    relatedFormulas: [
      "linear-regression",
      "arithmetic-mean",
      "percent-difference",
      "percent-error",
    ],
    relatedCalculators: [
      "/calculators/rate-of-change-calculator",
      "/calculators/linear-regression-calculator",
    ],
    relatedGuides: [
      "/scientific-method/analyze-experimental-results",
    ],
    calculatorHref: "/calculators/rate-of-change-calculator",
  },
  {
    slug: "linear-regression",
    name: "Linear Regression",
    equation: "y = mx + b",
    description: "Models a straight-line relationship between two variables.",
    category: "Laboratory",
    variables: ["m = slope", "b = y-intercept", "x = input", "y = predicted output"],
    explanation:
      "Linear regression finds the best-fitting straight line that represents the relationship between two variables. It is commonly used to identify trends and make predictions from experimental data.",
    example:
      "For a line with slope 2 and y-intercept 3, the predicted value at x = 5 is y = (2 × 5) + 3 = 13.",
    commonMistakes: [
      "Confusing slope with the y-intercept.",
      "Using unrelated variables in the regression model.",
      "Assuming correlation always proves causation.",
    ],
    applications: [
      "Analyzing experimental data trends.",
      "Predicting values from measured observations.",
      "Creating scientific models from datasets.",
    ],
    relatedFormulas: [
      "rate-of-change",
      "arithmetic-mean",
      "sample-standard-deviation",
      "coefficient-of-variation",
    ],
    relatedCalculators: [
      "/calculators/linear-regression-calculator",
      "/calculators/rate-of-change-calculator",
    ],
    relatedGuides: [
      "/scientific-method/analyze-experimental-results",
    ],
    calculatorHref: "/calculators/linear-regression-calculator",
  },

  {
    slug: "velocity-formula",
    name: "Velocity Formula",
    equation: "v = d / t",
    description: "Calculates velocity using displacement divided by time.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "velocity equation",
      "physics velocity formula",
      "calculate velocity",
    ],
    variables: [
      "v = velocity",
      "d = displacement",
      "t = time",
    ],
    relatedCalculators: [
      "/calculators/average-velocity-calculator",
      "/calculators/kinematic-equations-calculator",
      "/calculators/average-speed-calculator",
    ],
    calculatorHref: "/calculators/average-velocity-calculator",
    applications: [
      "Motion analysis.",
      "Vehicle speed calculations.",
      "Physics experiments.",
    ],
  },

  {
    slug: "average-speed-formula",
    name: "Average Speed Formula",
    equation: "Average Speed = Total Distance / Total Time",
    description: "Calculates average speed from total distance and total time.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "average speed equation",
      "speed formula",
    ],
    variables: [
      "distance = total distance",
      "time = total time",
    ],
    calculatorHref: "/calculators/average-speed-calculator",
  },

  {
    slug: "acceleration-formula",
    name: "Acceleration Formula",
    equation: "a = Δv / t",
    description: "Calculates acceleration from change in velocity over time.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "acceleration equation",
      "physics acceleration formula",
    ],
    variables: [
      "a = acceleration",
      "Δv = change in velocity",
      "t = time",
    ],
    units: [
      "Acceleration: meters per second squared (m/s²)",
      "Velocity change: meters per second (m/s)",
      "Time: seconds (s)",
    ],
    whenToUse:
      "Use this formula when calculating how quickly an object's velocity changes over a period of time.",
    rearranged: [
      "Δv = a × t",
      "t = Δv / a",
    ],
    relatedCalculators: [
      "/calculators/acceleration-calculator",
      "/calculators/kinematic-equations-calculator",
    ],
    calculatorHref: "/calculators/acceleration-calculator",
  },

  {
    slug: "average-velocity-formula",
    name: "Average Velocity Formula",
    equation: "v_avg = Δx / Δt",
    description: "Calculates average velocity using displacement divided by elapsed time.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "average velocity equation",
      "average velocity formula",
      "physics motion formula",
    ],
    variables: [
      "v_avg = average velocity",
      "Δx = displacement",
      "Δt = change in time",
    ],
    units: [
      "Average Velocity: meters per second (m/s)",
      "Displacement: meters (m)",
      "Time: seconds (s)",
    ],
    whenToUse:
      "Use this formula when finding the overall velocity of an object by dividing total displacement by the total time interval.",
    rearranged: [
      "Δx = v_avg × Δt",
      "Δt = Δx / v_avg",
    ],
    calculatorHref: "/calculators/average-velocity-calculator",
  },

  {
    slug: "distance-formula",
    name: "Distance Formula",
    equation: "d = v × t",
    description: "Calculates distance traveled using velocity and time.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "distance equation",
      "distance formula physics",
    ],
    variables: [
      "d = distance",
      "v = velocity",
      "t = time",
    ],
    units: [
      "Distance: meters (m)",
      "Velocity: meters per second (m/s)",
      "Time: seconds (s)",
    ],
    whenToUse:
      "Use this formula when calculating the distance traveled by an object when velocity and time are known.",
    rearranged: [
      "v = d / t",
      "t = d / v",
    ],
    relatedCalculators: [
      "/calculators/distance-calculator",
      "/calculators/average-speed-calculator",
    ],
    calculatorHref: "/calculators/distance-calculator",
  },

  {
    slug: "displacement-formula",
    name: "Displacement Formula",
    equation: "Δx = x₂ - x₁",
    description: "Calculates the change in position between two points.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "displacement equation",
      "change in position formula",
    ],
    variables: [
      "Δx = displacement",
      "x₂ = final position",
      "x₁ = initial position",
    ],
    units: [
      "Displacement: meters (m)",
      "Final position: meters (m)",
      "Initial position: meters (m)",
    ],
    whenToUse:
      "Use this formula when calculating the change in position of an object between an initial and final location.",
    rearranged: [
      "x₂ = Δx + x₁",
      "x₁ = x₂ - Δx",
    ],
    relatedCalculators: [
      "/calculators/displacement-calculator",
      "/calculators/kinematic-equations-calculator",
    ],
    calculatorHref: "/calculators/displacement-calculator",
  },

  {
    slug: "final-velocity-formula",
    name: "Final Velocity Formula",
    equation: "v = u + at",
    description: "Calculates final velocity using initial velocity, acceleration, and time.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "final velocity equation",
      "first kinematic equation",
      "velocity after acceleration",
    ],
    variables: [
      "v = final velocity",
      "u = initial velocity",
      "a = acceleration",
      "t = time",
    ],
    units: [
      "Velocity: meters per second (m/s)",
      "Acceleration: meters per second squared (m/s²)",
      "Time: seconds (s)",
    ],
    whenToUse:
      "Use this formula to find final velocity when acceleration, initial velocity, and time are known.",
    rearranged: [
      "u = v - at",
      "a = (v - u) / t",
      "t = (v - u) / a",
    ],
    relatedCalculators: [
      "/calculators/kinematic-equations-calculator",
    ],
    calculatorHref: "/calculators/kinematic-equations-calculator",
  },

  {
    slug: "time-formula",
    name: "Time Formula",
    equation: "t = (v - u) / a",
    description: "Calculates time taken when velocity changes under constant acceleration.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "time equation physics",
      "motion time formula",
    ],
    variables: [
      "t = time",
      "v = final velocity",
      "u = initial velocity",
      "a = acceleration",
    ],
    units: [
      "Time: seconds (s)",
      "Velocity: meters per second (m/s)",
      "Acceleration: meters per second squared (m/s²)",
    ],
    whenToUse:
      "Use this formula when finding the time required for an object's velocity to change under constant acceleration.",
    rearranged: [
      "v = u + at",
      "u = v - at",
      "a = (v - u) / t",
    ],
    calculatorHref: "/calculators/kinematic-equations-calculator",
  },

  {
    slug: "kinematic-equations-formula",
    name: "Kinematic Equations Formula",
    equation: "v² = u² + 2as",
    description: "Relates velocity, acceleration, and displacement for motion with constant acceleration.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "kinematic equations",
      "equations of motion",
      "physics motion formulas",
    ],
    variables: [
      "v = final velocity",
      "u = initial velocity",
      "a = acceleration",
      "s = displacement",
    ],
    units: [
      "Velocity: meters per second (m/s)",
      "Acceleration: meters per second squared (m/s²)",
      "Displacement: meters (m)",
    ],
    whenToUse:
      "Use this formula when analyzing motion with constant acceleration and when time is not directly required in the calculation.",
    rearranged: [
      "u² = v² - 2as",
      "a = (v² - u²) / 2s",
      "s = (v² - u²) / 2a",
    ],
    calculatorHref: "/calculators/kinematic-equations-calculator",
  },

  {
    slug: "projectile-motion-formula",
    name: "Projectile Motion Formula",
    equation: "x = v₀t cos(θ), y = v₀t sin(θ) - ½gt²",
    description: "Describes the horizontal and vertical motion of an object launched at an angle.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "projectile motion equation",
      "projectile formula physics",
      "trajectory calculation",
    ],
    variables: [
      "v₀ = initial velocity",
      "t = time",
      "θ = launch angle",
      "g = gravitational acceleration",
    ],
    units: [
      "Initial Velocity: meters per second (m/s)",
      "Time: seconds (s)",
      "Launch Angle: degrees (°) or radians",
      "Gravitational Acceleration: meters per second squared (m/s²)",
    ],
    whenToUse:
      "Use this formula when analyzing the horizontal and vertical motion of an object launched at an angle under constant gravitational acceleration.",
    rearranged: [
      "x = v₀t cos(θ)",
      "y = v₀t sin(θ) - ½gt²",
    ],
    calculatorHref: "/calculators/projectile-motion-calculator",
  },

  {
    slug: "free-fall-formula",
    name: "Free Fall Formula",
    equation: "d = ½gt²",
    description: "Calculates distance traveled by an object falling under gravity.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "free fall equation",
      "gravity formula",
      "falling object calculation",
    ],
    variables: [
      "d = distance",
      "g = gravitational acceleration",
      "t = time",
    ],
    units: [
      "Distance: meters (m)",
      "Gravitational Acceleration: meters per second squared (m/s²)",
      "Time: seconds (s)",
    ],
    whenToUse:
      "Use this formula when calculating the distance an object falls under gravity with no initial velocity and negligible air resistance.",
    rearranged: [
      "g = 2d / t²",
      "t = √(2d / g)",
    ],
    relatedCalculators: [
      "/calculators/free-fall-calculator",
      "/calculators/acceleration-due-to-gravity-calculator",
    ],
    calculatorHref: "/calculators/free-fall-calculator",
  },

  {
    slug: "centripetal-acceleration-formula",
    name: "Centripetal Acceleration Formula",
    equation: "aᶜ = v² / r",
    description: "Calculates acceleration toward the center of circular motion.",
    category: "Physics",
    subCategory: "Kinematics",
    keywords: [
      "centripetal acceleration equation",
      "circular motion formula",
    ],
    variables: [
      "aᶜ = centripetal acceleration",
      "v = velocity",
      "r = radius",
    ],
    units: [
      "Centripetal Acceleration: meters per second squared (m/s²)",
      "Velocity: meters per second (m/s)",
      "Radius: meters (m)",
    ],
    whenToUse:
      "Use this formula when calculating the acceleration directed toward the center of an object moving in a circular path.",
    rearranged: [
      "v = √(aᶜr)",
      "r = v² / aᶜ",
    ],
    calculatorHref: "/calculators/centripetal-acceleration-calculator",
  },

  {
    slug: "centripetal-force-formula",
    name: "Centripetal Force Formula",
    equation: "Fᶜ = mv² / r",
    description: "Calculates the force required to keep an object moving in a circular path.",
    category: "Physics",
    subCategory: "Circular Motion",
    keywords: [
      "centripetal force equation",
      "circular motion force formula",
      "centripetal force physics",
    ],
    variables: [
      "Fᶜ = centripetal force",
      "m = mass",
      "v = velocity",
      "r = radius",
    ],
    units: [
      "Force: Newton (N)",
      "Mass: kilogram (kg)",
      "Velocity: meters per second (m/s)",
      "Radius: meters (m)",
    ],
    whenToUse:
      "Use this formula when calculating the inward force needed to keep an object moving along a circular path.",
    rearranged: [
      "m = Fᶜr / v²",
      "v = √(Fᶜr / m)",
      "r = mv² / Fᶜ",
    ],
    calculatorHref: "/calculators/centripetal-force-calculator",
  },

  {
    slug: "angular-velocity-formula",
    name: "Angular Velocity Formula",
    equation: "ω = θ / t",
    description: "Calculates angular velocity from angular displacement over time.",
    category: "Physics",
    subCategory: "Circular Motion",
    keywords: [
      "angular velocity equation",
      "angular speed formula",
      "circular motion angular velocity",
    ],
    variables: [
      "ω = angular velocity",
      "θ = angular displacement",
      "t = time",
    ],
    units: [
      "Angular Velocity: radians per second (rad/s)",
      "Angular Displacement: radians (rad)",
      "Time: seconds (s)",
    ],
    whenToUse:
      "Use this formula when calculating how quickly an object rotates around a fixed axis using angular displacement and time.",
    rearranged: [
      "θ = ω × t",
      "t = θ / ω",
    ],
    calculatorHref: "/calculators/angular-velocity-calculator",
  },

  {
    slug: "angular-frequency-formula",
    name: "Angular Frequency Formula",
    equation: "ω = 2πf",
    description: "Calculates angular frequency from rotational frequency in circular motion.",
    category: "Physics",
    subCategory: "Circular Motion",
    keywords: [
      "angular frequency equation",
      "angular velocity frequency formula",
      "circular motion frequency",
    ],
    variables: [
      "ω = angular frequency",
      "f = rotational frequency",
    ],
    units: [
      "Angular Frequency: radians per second (rad/s)",
      "Frequency: hertz (Hz)",
    ],
    whenToUse:
      "Use this formula when converting between rotational frequency and angular frequency in circular or periodic motion.",
    rearranged: [
      "f = ω / 2π",
    ],
    calculatorHref: "/calculators/rotational-frequency-calculator",
  },

  {
    slug: "rotational-frequency-formula",
    name: "Rotational Frequency Formula",
    equation: "f = ω / 2π",
    description: "Calculates rotational frequency from angular frequency in circular motion.",
    category: "Physics",
    subCategory: "Circular Motion",
    keywords: [
      "rotational frequency equation",
      "rotation frequency formula",
      "angular velocity to frequency",
    ],
    variables: [
      "f = rotational frequency",
      "ω = angular frequency",
    ],
    units: [
      "Frequency: hertz (Hz)",
      "Angular Frequency: radians per second (rad/s)",
    ],
    whenToUse:
      "Use this formula when converting angular velocity or angular frequency into the number of rotations completed per second.",
    rearranged: [
      "ω = 2πf",
    ],
    calculatorHref: "/calculators/rotational-frequency-calculator",
  },

  {
    slug: "rpm-formula",
    name: "RPM Formula",
    equation: "RPM = 60f",
    description: "Calculates revolutions per minute from rotational frequency.",
    category: "Physics",
    subCategory: "Circular Motion",
    keywords: [
      "rpm formula",
      "revolutions per minute equation",
      "rotation speed calculation",
    ],
    variables: [
      "RPM = revolutions per minute",
      "f = rotational frequency",
    ],
    units: [
      "RPM: revolutions per minute",
      "Frequency: hertz (Hz)",
    ],
    whenToUse:
      "Use this formula when converting rotational frequency into revolutions completed per minute.",
    rearranged: [
      "f = RPM / 60",
    ],
    calculatorHref: "/calculators/rpm-to-angular-velocity-calculator",
  },

  {
    slug: "kinetic-energy-formula",
    name: "Kinetic Energy Formula",
    equation: "KE = ½mv²",
    description: "Calculates the energy of an object due to its motion.",
    category: "Physics",
    subCategory: "Energy and Work",
    keywords: [
      "kinetic energy equation",
      "kinetic energy formula physics",
      "motion energy calculation",
    ],
    variables: [
      "KE = kinetic energy",
      "m = mass",
      "v = velocity",
    ],
    calculatorHref: "/calculators/kinetic-energy-calculator",
  },

  {
    slug: "gravitational-potential-energy-formula",
    name: "Gravitational Potential Energy Formula",
    equation: "PE = mgh",
    description: "Calculates stored energy due to an object's height in a gravitational field.",
    category: "Physics",
    subCategory: "Energy and Work",
    keywords: [
      "gravitational potential energy equation",
      "potential energy formula",
      "mgh formula",
    ],
    variables: [
      "PE = potential energy",
      "m = mass",
      "g = gravitational acceleration",
      "h = height",
    ],
    calculatorHref: "/calculators/gravitational-potential-energy-calculator",
  },

  {
    slug: "elastic-potential-energy-formula",
    name: "Elastic Potential Energy Formula",
    equation: "PE = ½kx²",
    description: "Calculates energy stored in a stretched or compressed elastic object.",
    category: "Physics",
    subCategory: "Energy and Work",
    keywords: [
      "elastic potential energy equation",
      "spring energy formula",
      "spring constant formula",
    ],
    variables: [
      "PE = elastic potential energy",
      "k = spring constant",
      "x = displacement",
    ],
    calculatorHref: "/calculators/elastic-potential-energy-calculator",
  },

  {
    slug: "work-formula",
    name: "Work Formula",
    equation: "W = Fd cos(θ)",
    description: "Calculates work done by a force acting over a displacement.",
    category: "Physics",
    subCategory: "Energy and Work",
    keywords: [
      "work equation physics",
      "work formula",
      "force displacement formula",
    ],
    variables: [
      "W = work",
      "F = force",
      "d = displacement",
      "θ = angle between force and motion",
    ],
    calculatorHref: "/calculators/work-calculator",
  },

  {
    slug: "power-formula",
    name: "Power Formula",
    equation: "P = W / t",
    description: "Calculates the rate at which work is completed.",
    category: "Physics",
    subCategory: "Energy and Work",
    keywords: [
      "power equation physics",
      "power formula",
      "work rate formula",
    ],
    variables: [
      "P = power",
      "W = work",
      "t = time",
    ],
    calculatorHref: "/calculators/power-calculator",
  },

  {
    slug: "mechanical-energy-formula",
    name: "Mechanical Energy Formula",
    equation: "ME = KE + PE",
    description: "Calculates total mechanical energy as the sum of kinetic and potential energy.",
    category: "Physics",
    subCategory: "Energy and Work",
    keywords: [
      "mechanical energy equation",
      "total energy formula",
      "physics energy conservation",
    ],
    variables: [
      "ME = mechanical energy",
      "KE = kinetic energy",
      "PE = potential energy",
    ],
    calculatorHref: "/calculators/kinetic-energy-calculator",
  },

  {
    slug: "conservation-of-energy-formula",
    name: "Conservation of Energy Formula",
    equation: "E_total = KE + PE",
    description: "States that total energy remains constant while energy changes between forms.",
    category: "Physics",
    subCategory: "Energy and Work",
    keywords: [
      "conservation of energy equation",
      "energy conservation formula",
      "total energy physics",
    ],
    variables: [
      "E_total = total energy",
      "KE = kinetic energy",
      "PE = potential energy",
    ],
    calculatorHref: "/calculators/kinetic-energy-calculator",
  },

  {
    slug: "hookes-law-formula",
    name: "Hooke's Law Formula",
    equation: "F = -kx",
    description: "Calculates the restoring force produced by an elastic spring.",
    category: "Physics",
    subCategory: "Energy and Work",
    keywords: [
      "hookes law equation",
      "spring force formula",
      "elastic force equation",
    ],
    variables: [
      "F = spring force",
      "k = spring constant",
      "x = displacement",
    ],
    calculatorHref: "/calculators/hookes-law-calculator",
  },

  {
    slug: "spring-force-formula",
    name: "Spring Force Formula",
    equation: "F = kx",
    description: "Calculates the force required to stretch or compress a spring.",
    category: "Physics",
    subCategory: "Energy and Work",
    keywords: [
      "spring force equation",
      "spring constant calculation",
    ],
    variables: [
      "F = force",
      "k = spring constant",
      "x = displacement",
    ],
    calculatorHref: "/calculators/hookes-law-calculator",
  },

  {
    slug: "ohms-law-formula",
    name: "Ohm's Law Formula",
    equation: "V = IR",
    description: "Relates voltage, current, and resistance in an electrical circuit.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "ohms law equation",
      "voltage current resistance formula",
      "electrical circuit formula",
    ],
    variables: [
      "V = voltage",
      "I = current",
      "R = resistance",
    ],
    units: [
      "Voltage: volts (V)",
      "Current: amperes (A)",
      "Resistance: ohms (Ω)",
    ],
    whenToUse:
      "Use this formula when analyzing electrical circuits to find voltage, current, or resistance when the other two values are known.",
    rearranged: [
      "I = V / R",
      "R = V / I",
    ],
    relatedCalculators: [
      "/calculators/ohms-law-calculator",
      "/calculators/power-calculator",
    ],
    calculatorHref: "/calculators/ohms-law-calculator",
  },

  {
    slug: "electric-power-formula",
    name: "Electric Power Formula",
    equation: "P = VI",
    description: "Calculates electrical power using voltage and current.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "electric power equation",
      "electrical power formula",
      "power calculation physics",
    ],
    variables: [
      "P = power",
      "V = voltage",
      "I = current",
    ],
    units: [
      "Power: watts (W)",
      "Voltage: volts (V)",
      "Current: amperes (A)",
    ],
    whenToUse:
      "Use this formula when calculating electrical power consumed or delivered in a circuit using voltage and current.",
    rearranged: [
      "V = P / I",
      "I = P / V",
    ],
    calculatorHref: "/calculators/power-calculator",
  },

  {
    slug: "coulombs-law-formula",
    name: "Coulomb's Law Formula",
    equation: "F = kq₁q₂ / r²",
    description: "Calculates the electrostatic force between two charged objects.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "coulombs law equation",
      "electric force formula",
      "charge force calculation",
    ],
    variables: [
      "F = electric force",
      "k = Coulomb constant",
      "q₁ = first charge",
      "q₂ = second charge",
      "r = distance between charges",
    ],
    units: [
      "Force: Newton (N)",
      "Charge: Coulombs (C)",
      "Distance: meters (m)",
      "Coulomb Constant: N·m²/C²",
    ],
    whenToUse:
      "Use this formula when calculating the electrostatic force between two charged objects based on their charges and separation distance.",
    rearranged: [
      "q₁ = Fr² / (kq₂)",
      "q₂ = Fr² / (kq₁)",
      "r = √(kq₁q₂ / F)",
    ],
    relatedCalculators: [
      "/calculators/coulombs-law-calculator",
      "/calculators/electric-field-calculator",
    ],
    calculatorHref: "/calculators/coulombs-law-calculator",
  },

  {
    slug: "electric-field-formula",
    name: "Electric Field Formula",
    equation: "E = F / q",
    description: "Calculates electric field strength from force and charge.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "electric field equation",
      "electric field strength formula",
    ],
    variables: [
      "E = electric field",
      "F = electric force",
      "q = charge",
    ],
    units: [
      "Electric Field: newtons per coulomb (N/C) or volts per meter (V/m)",
      "Force: Newton (N)",
      "Charge: Coulomb (C)",
    ],
    whenToUse:
      "Use this formula when calculating the strength of an electric field produced by a force acting on a charge.",
    rearranged: [
      "F = Eq",
      "q = F / E",
    ],
    relatedCalculators: [
      "/calculators/electric-field-calculator",
      "/calculators/coulombs-law-calculator",
    ],
    calculatorHref: "/calculators/electric-field-calculator",
  },

  {
    slug: "electric-potential-formula",
    name: "Electric Potential Formula",
    equation: "V = W / q",
    description: "Calculates electric potential from work done per unit charge.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "electric potential equation",
      "voltage potential formula",
      "electric potential energy",
    ],
    variables: [
      "V = electric potential",
      "W = work done",
      "q = charge",
    ],
    units: [
      "Electric Potential: volts (V)",
      "Work Done: joules (J)",
      "Charge: coulombs (C)",
    ],
    whenToUse:
      "Use this formula when calculating electric potential or voltage based on the amount of work required to move an electric charge.",
    rearranged: [
      "W = V × q",
      "q = W / V",
    ],
    relatedCalculators: [
      "/calculators/electric-potential-calculator",
      "/calculators/electric-field-calculator",
    ],
    calculatorHref: "/calculators/electric-potential-calculator",
  },

  {
    slug: "voltage-divider-formula",
    name: "Voltage Divider Formula",
    equation: "Vout = Vin × R₂ / (R₁ + R₂)",
    description: "Calculates output voltage across a resistor in a voltage divider circuit.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "voltage divider equation",
      "resistor voltage formula",
      "circuit divider calculation",
    ],
    variables: [
      "Vout = output voltage",
      "Vin = input voltage",
      "R₁ = first resistance",
      "R₂ = second resistance",
    ],
    units: [
      "Voltage: volts (V)",
      "Resistance: ohms (Ω)",
    ],
    whenToUse:
      "Use this formula when calculating the output voltage across a resistor in a series voltage divider circuit.",
    rearranged: [
      "R₂ = Vout × R₁ / (Vin - Vout)",
      "Vin = Vout × (R₁ + R₂) / R₂",
    ],
    relatedCalculators: [
      "/calculators/voltage-divider-calculator",
      "/calculators/ohms-law-calculator",
    ],
    calculatorHref: "/calculators/voltage-divider-calculator",
  },

  {
    slug: "current-divider-formula",
    name: "Current Divider Formula",
    equation: "I₁ = Itotal × R₂ / (R₁ + R₂)",
    description: "Calculates current distribution between parallel resistors.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "current divider equation",
      "parallel current formula",
      "circuit current calculation",
    ],
    variables: [
      "I₁ = branch current",
      "Itotal = total current",
      "R₁ = first resistance",
      "R₂ = second resistance",
    ],
    units: [
      "Current: amperes (A)",
      "Resistance: ohms (Ω)",
    ],
    whenToUse:
      "Use this formula when calculating how current divides between parallel resistor branches in an electrical circuit.",
    rearranged: [
      "Itotal = I₁ × (R₁ + R₂) / R₂",
      "R₂ = I₁R₁ / (Itotal - I₁)",
    ],
    relatedCalculators: [
      "/calculators/current-divider-calculator",
      "/calculators/ohms-law-calculator",
    ],
    calculatorHref: "/calculators/current-divider-calculator",
  },

  {
    slug: "capacitance-formula",
    name: "Capacitance Formula",
    equation: "C = Q / V",
    description: "Calculates capacitance from stored charge and voltage.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "capacitance equation",
      "capacitor formula",
      "charge voltage relationship",
    ],
    variables: [
      "C = capacitance",
      "Q = charge",
      "V = voltage",
    ],
    units: [
      "Capacitance: farads (F)",
      "Charge: coulombs (C)",
      "Voltage: volts (V)",
    ],
    whenToUse:
      "Use this formula when calculating a capacitor's ability to store electric charge based on stored charge and voltage.",
    rearranged: [
      "Q = C × V",
      "V = Q / C",
    ],
    calculatorHref: "/calculators/capacitance-calculator",
  },

  {
    slug: "capacitor-energy-formula",
    name: "Capacitor Energy Formula",
    equation: "E = ½CV²",
    description: "Calculates the energy stored in a capacitor from capacitance and voltage.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "capacitor energy equation",
      "capacitor stored energy formula",
      "electrical energy storage",
    ],
    variables: [
      "E = stored energy",
      "C = capacitance",
      "V = voltage",
    ],
    units: [
      "Energy: joules (J)",
      "Capacitance: farads (F)",
      "Voltage: volts (V)",
    ],
    whenToUse:
      "Use this formula when calculating the electrical energy stored in a capacitor based on its capacitance and voltage.",
    rearranged: [
      "C = 2E / V²",
      "V = √(2E / C)",
    ],
    calculatorHref: "/calculators/capacitor-energy-calculator",
  },

  {
    slug: "inductance-formula",
    name: "Inductance Formula",
    equation: "L = Φ / I",
    description: "Relates magnetic flux linkage to current in an inductor.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "inductance equation",
      "inductor formula",
      "magnetic flux formula",
    ],
    variables: [
      "L = inductance",
      "Φ = magnetic flux linkage",
      "I = current",
    ],
    units: [
      "Inductance: henries (H)",
      "Magnetic Flux Linkage: webers (Wb)",
      "Current: amperes (A)",
    ],
    whenToUse:
      "Use this formula when calculating the inductance of an inductor based on magnetic flux linkage and current flowing through it.",
    rearranged: [
      "Φ = L × I",
      "I = Φ / L",
    ],
    calculatorHref: "/calculators/inductance-calculator",
  },

  {
    slug: "capacitive-reactance-formula",
    name: "Capacitive Reactance Formula",
    equation: "Xc = 1 / (2πfC)",
    description: "Calculates opposition to alternating current caused by a capacitor.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "capacitive reactance equation",
      "capacitor AC formula",
      "reactance calculation",
    ],
    variables: [
      "Xc = capacitive reactance",
      "f = frequency",
      "C = capacitance",
    ],
    units: [
      "Reactance: ohms (Ω)",
      "Frequency: hertz (Hz)",
      "Capacitance: farads (F)",
    ],
    whenToUse:
      "Use this formula when calculating how much a capacitor opposes alternating current at a specific frequency.",
    rearranged: [
      "f = 1 / (2πCXc)",
      "C = 1 / (2πfXc)",
    ],
    calculatorHref: "/calculators/capacitive-reactance-calculator",
  },

  {
    slug: "inductive-reactance-formula",
    name: "Inductive Reactance Formula",
    equation: "Xl = 2πfL",
    description: "Calculates opposition to alternating current caused by an inductor.",
    category: "Physics",
    subCategory: "Electricity and Magnetism",
    keywords: [
      "inductive reactance equation",
      "inductor AC formula",
      "reactance physics formula",
    ],
    variables: [
      "Xl = inductive reactance",
      "f = frequency",
      "L = inductance",
    ],
    units: [
      "Reactance: ohms (Ω)",
      "Frequency: hertz (Hz)",
      "Inductance: henries (H)",
    ],
    whenToUse:
      "Use this formula when calculating how much an inductor opposes alternating current at a specific frequency.",
    rearranged: [
      "f = Xl / (2πL)",
      "L = Xl / (2πf)",
    ],
    calculatorHref: "/calculators/inductive-reactance-calculator",
  },

  {
    slug: "molarity-formula",
    name: "Molarity Formula",
    equation: "M = n / V",
    description: "Calculates solution concentration using moles of solute divided by solution volume.",
    category: "Chemistry",
    subCategory: "Solutions and Concentration",
    keywords: [
      "molarity equation",
      "molar concentration formula",
      "solution concentration formula",
    ],
    variables: [
      "M = molarity",
      "n = moles of solute",
      "V = volume of solution",
    ],
    units: [
      "Molarity: moles per liter (mol/L or M)",
      "Amount of Solute: moles (mol)",
      "Solution Volume: liters (L)",
    ],
    whenToUse:
      "Use this formula when calculating the concentration of a solution by finding the amount of solute dissolved in a given volume of solution.",
    rearranged: [
      "n = M × V",
      "V = n / M",
    ],
    relatedCalculators: [
      "/calculators/molarity-calculator",
      "/calculators/dilution-calculator",
    ],
    calculatorHref: "/calculators/molarity-calculator",
  },

  {
    slug: "molality-formula",
    name: "Molality Formula",
    equation: "m = n / kg",
    description: "Calculates solution concentration using moles of solute per kilogram of solvent.",
    category: "Chemistry",
    subCategory: "Solutions and Concentration",
    keywords: [
      "molality equation",
      "molal concentration formula",
      "chemistry concentration calculation",
    ],
    variables: [
      "m = molality",
      "n = moles of solute",
      "kg = kilograms of solvent",
    ],
    units: [
      "Molality: moles per kilogram (mol/kg or m)",
      "Amount of Solute: moles (mol)",
      "Solvent Mass: kilograms (kg)",
    ],
    whenToUse:
      "Use this formula when calculating solution concentration based on the amount of solute and the mass of solvent, especially when temperature changes may affect volume.",
    rearranged: [
      "n = m × kg",
      "kg = n / m",
    ],
    relatedCalculators: [
      "/calculators/molality-calculator",
      "/calculators/molarity-calculator",
    ],
    calculatorHref: "/calculators/molality-calculator",
  },

  {
    slug: "mole-fraction-formula",
    name: "Mole Fraction Formula",
    equation: "X = n₁ / n_total",
    description: "Calculates the ratio of component moles to total moles in a mixture.",
    category: "Chemistry",
    subCategory: "Solutions and Concentration",
    keywords: [
      "mole fraction equation",
      "mole ratio formula",
      "chemistry mixture formula",
    ],
    variables: [
      "X = mole fraction",
      "n₁ = moles of component",
      "n_total = total moles",
    ],
    units: [
      "Mole Fraction: dimensionless (no unit)",
      "Component Amount: moles (mol)",
      "Total Amount: moles (mol)",
    ],
    whenToUse:
      "Use this formula when calculating the proportion of one component in a mixture based on its number of moles compared with the total moles.",
    rearranged: [
      "n₁ = X × n_total",
      "n_total = n₁ / X",
    ],
    relatedCalculators: [
      "/calculators/mole-fraction-calculator",
      "/calculators/molarity-calculator",
    ],
    calculatorHref: "/calculators/mole-fraction-calculator",
  },

  {
    slug: "dilution-formula",
    name: "Dilution Formula",
    equation: "M₁V₁ = M₂V₂",
    description: "Calculates concentration changes when a solution is diluted.",
    category: "Chemistry",
    subCategory: "Solutions and Concentration",
    keywords: [
      "dilution equation",
      "molarity dilution formula",
      "solution dilution calculation",
    ],
    variables: [
      "M₁ = initial concentration",
      "V₁ = initial volume",
      "M₂ = final concentration",
      "V₂ = final volume",
    ],
    units: [
      "Concentration: moles per liter (mol/L or M)",
      "Volume: liters (L)",
    ],
    whenToUse:
      "Use this formula when calculating how the concentration of a solution changes after adding solvent while the amount of solute remains constant.",
    rearranged: [
      "M₂ = (M₁ × V₁) / V₂",
      "V₂ = (M₁ × V₁) / M₂",
      "M₁ = (M₂ × V₂) / V₁",
      "V₁ = (M₂ × V₂) / M₁",
    ],
    relatedCalculators: [
      "/calculators/dilution-calculator",
      "/calculators/molarity-calculator",
    ],
    calculatorHref: "/calculators/dilution-calculator",
  },

  {
    slug: "stoichiometry-formula",
    name: "Stoichiometry Formula",
    equation: "n = m / M",
    description: "Relates mass, moles, and molar mass for chemical calculations.",
    category: "Chemistry",
    subCategory: "Chemical Calculations",
    keywords: [
      "stoichiometry equation",
      "mole calculation formula",
      "chemical reaction calculation",
    ],
    variables: [
      "n = number of moles",
      "m = mass",
      "M = molar mass",
    ],
    units: [
      "Amount of Substance: moles (mol)",
      "Mass: grams (g) or kilograms (kg)",
      "Molar Mass: grams per mole (g/mol)",
    ],
    whenToUse:
      "Use this formula when converting between mass, number of moles, and molar mass in chemical reactions and stoichiometric calculations.",
    rearranged: [
      "m = n × M",
      "M = m / n",
    ],
    relatedCalculators: [
      "/calculators/stoichiometry-calculator",
      "/calculators/limiting-reactant-calculator",
      "/calculators/percent-yield-calculator",
    ],
    calculatorHref: "/calculators/stoichiometry-calculator",
  },

  {
    slug: "molecular-weight-formula",
    name: "Molecular Weight Formula",
    equation: "MW = Σ atomic masses",
    description: "Calculates molecular weight by adding the atomic masses of all atoms in a compound.",
    category: "Chemistry",
    subCategory: "Chemical Calculations",
    keywords: [
      "molecular weight equation",
      "molecular mass formula",
      "compound mass calculation",
    ],
    variables: [
      "MW = molecular weight",
      "atomic masses = masses of atoms",
    ],
    units: [
      "Molecular Weight: atomic mass units (u) or grams per mole (g/mol)",
      "Atomic Mass: atomic mass units (u)",
    ],
    whenToUse:
      "Use this formula when calculating the molecular weight of a compound by adding the atomic masses of all atoms present in its chemical formula.",
    rearranged: [
      "Total Atomic Mass = MW",
    ],
    relatedCalculators: [
      "/calculators/molecular-weight-calculator",
      "/calculators/mass-moles-calculator",
      "/calculators/stoichiometry-calculator",
    ],
    calculatorHref: "/calculators/molecular-weight-calculator",
  },

  {
    slug: "mass-moles-formula",
    name: "Mass to Moles Formula",
    equation: "n = m / M",
    description: "Converts between mass and amount of substance using molar mass.",
    category: "Chemistry",
    subCategory: "Chemical Calculations",
    keywords: [
      "mass to moles equation",
      "moles from grams formula",
      "chemistry mole conversion",
    ],
    variables: [
      "n = moles",
      "m = mass",
      "M = molar mass",
    ],
    relatedCalculators: [
      "/calculators/mass-moles-calculator",
      "/calculators/molecular-weight-calculator",
      "/calculators/stoichiometry-calculator",
    ],
    calculatorHref: "/calculators/mass-moles-calculator",
  },

  {
    slug: "percent-yield-formula",
    name: "Percent Yield Formula",
    equation: "% Yield = (Actual Yield / Theoretical Yield) × 100",
    description: "Calculates reaction efficiency by comparing actual and theoretical product amounts.",
    category: "Chemistry",
    subCategory: "Chemical Calculations",
    keywords: [
      "percent yield equation",
      "reaction efficiency formula",
      "chemistry yield calculation",
    ],
    variables: [
      "Actual Yield = measured product",
      "Theoretical Yield = expected product",
    ],
    relatedCalculators: [
      "/calculators/percent-yield-calculator",
      "/calculators/stoichiometry-calculator",
    ],
    calculatorHref: "/calculators/percent-yield-calculator",
  },

  {
    slug: "ph-formula",
    name: "pH Formula",
    equation: "pH = -log[H⁺]",
    description: "Calculates the acidity of a solution using hydrogen ion concentration.",
    category: "Chemistry",
    subCategory: "Acids and Bases",
    keywords: [
      "pH equation",
      "acidity formula",
      "hydrogen ion concentration formula",
    ],
    variables: [
      "pH = acidity measure",
      "[H⁺] = hydrogen ion concentration",
    ],
    relatedCalculators: [
      "/calculators/ph-calculator",
      "/calculators/normality-calculator",
    ],
    calculatorHref: "/calculators/ph-calculator",
  },

  {
    slug: "poh-formula",
    name: "pOH Formula",
    equation: "pOH = -log[OH⁻]",
    description: "Calculates the basicity of a solution using hydroxide ion concentration.",
    category: "Chemistry",
    subCategory: "Acids and Bases",
    keywords: [
      "pOH equation",
      "basicity formula",
      "hydroxide concentration formula",
    ],
    variables: [
      "pOH = basicity measure",
      "[OH⁻] = hydroxide ion concentration",
    ],
    relatedCalculators: [
      "/calculators/ph-calculator",
      "/calculators/normality-calculator",
    ],
    calculatorHref: "/calculators/ph-calculator",
  },

  {
    slug: "ideal-gas-law-formula",
    name: "Ideal Gas Law Formula",
    equation: "PV = nRT",
    description: "Relates pressure, volume, temperature, and amount of gas.",
    category: "Chemistry",
    subCategory: "Gas Laws",
    keywords: [
      "ideal gas equation",
      "PV=nRT formula",
      "gas law calculation",
    ],
    variables: [
      "P = pressure",
      "V = volume",
      "n = moles",
      "R = gas constant",
      "T = temperature",
    ],
    relatedCalculators: [
      "/calculators/ideal-gas-law-calculator",
      "/calculators/density-calculator",
    ],
    calculatorHref: "/calculators/ideal-gas-law-calculator",
  },

  {
    slug: "gas-density-formula",
    name: "Gas Density Formula",
    equation: "ρ = PM / RT",
    description: "Calculates gas density using pressure, molar mass, temperature, and the gas constant.",
    category: "Chemistry",
    subCategory: "Gas Laws",
    keywords: [
      "gas density equation",
      "density of gas formula",
      "ideal gas density",
    ],
    variables: [
      "ρ = gas density",
      "P = pressure",
      "M = molar mass",
      "R = gas constant",
      "T = temperature",
    ],
    calculatorHref: "/calculators/ideal-gas-law-calculator",
  },

  {
    slug: "mean-formula",
    name: "Mean Formula",
    equation: "x̄ = Σx / n",
    description: "Calculates the average value of a set of experimental measurements.",
    category: "Laboratory",
    subCategory: "Statistics and Data Analysis",
    keywords: [
      "mean equation",
      "average formula",
      "experimental data average",
    ],
    variables: [
      "x̄ = mean",
      "Σx = sum of values",
      "n = number of values",
    ],
    calculatorHref: "/calculators/mean-median-mode-calculator",
  },

  {
    slug: "median-formula",
    name: "Median Formula",
    equation: "Middle value of ordered data",
    description: "Finds the central value of a sorted dataset.",
    category: "Laboratory",
    subCategory: "Statistics and Data Analysis",
    keywords: [
      "median equation",
      "data analysis formula",
      "statistics median calculation",
    ],
    variables: [
      "ordered data = sorted values",
    ],
    calculatorHref: "/calculators/mean-median-mode-calculator",
  },

  {
    slug: "standard-deviation-formula",
    name: "Standard Deviation Formula",
    equation: "σ = √(Σ(x - μ)² / N)",
    description: "Measures the spread and variability of experimental data.",
    category: "Laboratory",
    subCategory: "Statistics and Data Analysis",
    keywords: [
      "standard deviation equation",
      "data variability formula",
      "experimental uncertainty statistics",
    ],
    variables: [
      "σ = standard deviation",
      "x = individual value",
      "μ = mean",
      "N = number of values",
    ],
    calculatorHref: "/calculators/standard-deviation-calculator",
  },

  {
    slug: "percent-error-formula",
    name: "Percent Error Formula",
    equation: "% Error = |Experimental - Accepted| / Accepted × 100",
    description: "Measures the difference between an experimental value and an accepted value.",
    category: "Laboratory",
    subCategory: "Experimental Analysis",
    keywords: [
      "percent error equation",
      "experimental error formula",
      "accuracy calculation",
    ],
    variables: [
      "Experimental = measured value",
      "Accepted = reference value",
    ],
    calculatorHref: "/calculators/percent-error-calculator",
  },

  {
    slug: "percent-difference-formula",
    name: "Percent Difference Formula",
    equation: "% Difference = |A - B| / ((A + B) / 2) × 100",
    description: "Compares two experimental values without a reference value.",
    category: "Laboratory",
    subCategory: "Experimental Analysis",
    keywords: [
      "percent difference equation",
      "comparison formula",
      "measurement comparison",
    ],
    variables: [
      "A = first value",
      "B = second value",
    ],
    calculatorHref: "/calculators/percent-difference-calculator",
  },

  {
    slug: "uncertainty-formula",
    name: "Measurement Uncertainty Formula",
    equation: "U = ± value",
    description: "Represents the range of possible variation in a scientific measurement.",
    category: "Laboratory",
    subCategory: "Experimental Analysis",
    keywords: [
      "measurement uncertainty formula",
      "experimental uncertainty equation",
      "error range calculation",
    ],
    variables: [
      "U = uncertainty",
      "measured value = experimental measurement",
    ],
    calculatorHref: "/calculators/uncertainty-propagation-calculator",
  },

  {
    slug: "coefficient-of-variation-formula",
    name: "Coefficient of Variation Formula",
    equation: "CV = (σ / μ) × 100",
    description: "Measures relative variability of data compared with its mean.",
    category: "Laboratory",
    subCategory: "Statistics and Data Analysis",
    keywords: [
      "coefficient of variation equation",
      "CV formula",
      "relative standard deviation formula",
    ],
    variables: [
      "CV = coefficient of variation",
      "σ = standard deviation",
      "μ = mean",
    ],
    calculatorHref: "/calculators/coefficient-variation-calculator",
  },

  {
    slug: "significant-figures-formula",
    name: "Significant Figures Rules",
    equation: "Precision depends on reported digits",
    description: "Determines the correct number of significant figures in scientific measurements and calculations.",
    category: "Laboratory",
    subCategory: "Measurement and Reporting",
    keywords: [
      "significant figures rules",
      "sig figs formula",
      "measurement precision rules",
    ],
    variables: [
      "significant digits = meaningful measurement digits",
    ],
    calculatorHref: "/calculators/significant-figures-calculator",
  },

];

