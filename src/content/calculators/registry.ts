export type CalculatorDefinition = {
  slug: string;
  name: string;
  shortDescription: string;
  category: "Laboratory" | "Chemistry" | "Physics";
  href: string;
  keywords: readonly string[];
};

export const calculators: readonly CalculatorDefinition[] = [
  {
    slug: "percent-error-calculator",
    name: "Percent Error Calculator",
    shortDescription:
      "Calculate percent error from experimental and accepted values with clear working steps.",
    category: "Laboratory",
    href: "/calculators/percent-error-calculator",
    keywords: [
      "percent error calculator",
      "experimental error calculator",
      "chemistry percent error",
    ],
  },
  {
    slug: "percent-difference-calculator",
    name: "Percent Difference Calculator",
    shortDescription:
      "Compare two experimental measurements without using an accepted reference value.",
    category: "Laboratory",
    href: "/calculators/percent-difference-calculator",
    keywords: ["percent difference calculator"],
  },
  {
    slug: "significant-figures-calculator",
    name: "Significant Figures Calculator",
    shortDescription:
      "Count significant figures and round measured values to a selected precision.",
    category: "Laboratory",
    href: "/calculators/significant-figures-calculator",
    keywords: [
      "significant figures calculator",
      "sig figs calculator",
      "round to significant figures",
      "significant digits calculator",
    ],
  },
  {
    slug: "coefficient-variation-calculator",
    name: "Coefficient of Variation Calculator",
    shortDescription:
      "Calculate relative dataset variation using sample or population standard deviation.",
    category: "Laboratory",
    href: "/calculators/coefficient-variation-calculator",
    keywords: [
      "coefficient of variation calculator",
      "cv calculator statistics",
      "relative standard deviation calculator",
      "sample coefficient of variation",
    ],
  },
  {
    slug: "mean-median-mode-calculator",
    name: "Mean, Median and Mode Calculator",
    shortDescription:
      "Calculate mean, median, mode, sum, range, minimum, maximum, and sorted values.",
    category: "Laboratory",
    href: "/calculators/mean-median-mode-calculator",
    keywords: [
      "mean median mode calculator",
      "average calculator",
      "median calculator",
      "mode calculator",
    ],
  },
  {
    slug: "standard-deviation-calculator",
    name: "Standard Deviation Calculator",
    shortDescription:
      "Calculate sample and population standard deviation, mean, range, and dataset size.",
    category: "Laboratory",
    href: "/calculators/standard-deviation-calculator",
    keywords: [
      "standard deviation calculator",
      "sample standard deviation calculator",
      "population standard deviation calculator",
      "mean and standard deviation calculator",
    ],
  },
  {
    slug: "uncertainty-propagation-calculator",
    name: "Uncertainty Propagation Calculator",
    shortDescription:
      "Propagate uncertainty through addition, subtraction, multiplication, and division.",
    category: "Laboratory",
    href: "/calculators/uncertainty-propagation-calculator",
    keywords: [
      "uncertainty propagation calculator",
      "propagation of error calculator",
      "combined uncertainty calculator",
      "absolute and relative uncertainty calculator",
    ],
  },
  {
    slug: "measurement-uncertainty-calculator",
    name: "Measurement Uncertainty Calculator",
    shortDescription:
      "Calculate relative uncertainty, percentage uncertainty, range, and plus-or-minus notation.",
    category: "Laboratory",
    href: "/calculators/measurement-uncertainty-calculator",
    keywords: [
      "measurement uncertainty calculator",
      "percentage uncertainty calculator",
      "relative uncertainty calculator",
      "absolute uncertainty calculator",
    ],
  },
  {
    slug: "rate-of-change-calculator",
    name: "Rate of Change Calculator",
    shortDescription:
      "Calculate absolute change, percentage change, interval, and average rate of change.",
    category: "Laboratory",
    href: "/calculators/rate-of-change-calculator",
    keywords: [
      "rate of change calculator",
      "average rate of change calculator",
      "change over time calculator",
      "percentage change calculator",
    ],
  },
  {
    slug: "linear-regression-calculator",
    name: "Linear Regression Calculator",
    shortDescription:
      "Calculate slope, intercept, best-fit equation, correlation coefficient, and R squared.",
    category: "Laboratory",
    href: "/calculators/linear-regression-calculator",
    keywords: [
      "linear regression calculator",
      "line of best fit calculator",
      "correlation coefficient calculator",
      "r squared calculator",
    ],
  },
  {
    slug: "molarity-calculator",
    name: "Molarity Calculator",
    shortDescription:
      "Calculate solution molarity from moles of solute and solution volume.",
    category: "Chemistry",
    href: "/calculators/molarity-calculator",
    keywords: ["molarity calculator", "moles and volume calculator"],
  },
  {
    slug: "mass-moles-calculator",
    name: "Mass to Moles Calculator",
    shortDescription:
      "Calculate mass, moles, or molar mass from two known chemistry values.",
    category: "Chemistry",
    href: "/calculators/mass-moles-calculator",
    keywords: [
      "mass to moles calculator",
      "grams to moles calculator",
      "moles to grams calculator",
      "molar mass calculator",
    ],
  },
  {
    slug: "dilution-calculator",
    name: "Dilution Calculator",
    shortDescription:
      "Solve dilution problems using initial and final concentration and volume.",
    category: "Chemistry",
    href: "/calculators/dilution-calculator",
    keywords: ["dilution calculator chemistry"],
  },
  {
    slug: "molecular-weight-calculator",
    name: "Molecular Weight Calculator",
    shortDescription:
      "Calculate molecular weight and molar mass from chemical formulas with element-by-element mass breakdowns.",
    category: "Chemistry",
    href: "/calculators/molecular-weight-calculator",
    keywords: [
      "molecular weight calculator",
      "molar mass calculator",
      "chemical formula mass calculator",
      "molecular mass calculator",
      "formula weight calculator",
    ],
  },
  {
    slug: "ph-calculator",
    name: "pH Calculator",
    shortDescription:
      "Calculate pH, pOH, hydrogen-ion concentration, hydroxide-ion concentration, and acid-base classification.",
    category: "Chemistry",
    href: "/calculators/ph-calculator",
    keywords: [
      "ph calculator",
      "poh calculator",
      "hydrogen ion concentration calculator",
      "hydroxide ion concentration calculator",
      "acid base calculator",
    ],
  },
  {
    slug: "pulley-calculator",
    name: "Pulley Calculator",
    shortDescription:
      "Calculate load force, ideal mechanical advantage, effort force, and rope distance for an ideal pulley system.",
    category: "Physics",
    href: "/calculators/pulley-calculator",
    keywords: [
      "pulley calculator",
      "pulley mechanical advantage calculator",
      "pulley force calculator",
      "ideal pulley calculator",
      "rope distance calculator",
    ],
  },
  {
    slug: "inclined-plane-calculator",
    name: "Inclined Plane Calculator",
    shortDescription:
      "Calculate parallel force, normal force, friction force, net force, and acceleration on an inclined plane.",
    category: "Physics",
    href: "/calculators/inclined-plane-calculator",
    keywords: [
      "inclined plane calculator",
      "incline force calculator",
      "inclined plane acceleration calculator",
      "inclined plane friction calculator",
      "force on an incline calculator",
    ],
  },
  {
    slug: "friction-calculator",
    name: "Friction Calculator",
    shortDescription:
      "Calculate static or kinetic friction force, coefficient of friction, or normal force using F = μN.",
    category: "Physics",
    href: "/calculators/friction-calculator",
    keywords: [
      "friction calculator",
      "coefficient of friction calculator",
      "kinetic friction calculator",
      "static friction calculator",
      "friction force calculator",
    ],
  },
  {
    slug: "normal-force-calculator",
    name: "Normal Force Calculator",
    shortDescription:
      "Calculate normal force, mass, or gravity on horizontal and inclined surfaces with optional external forces.",
    category: "Physics",
    href: "/calculators/normal-force-calculator",
    keywords: [
      "normal force calculator",
      "inclined plane normal force calculator",
      "normal force formula calculator",
      "N equals mg calculator",
      "surface force calculator",
    ],
  },
  {
    slug: "weight-calculator",
    name: "Weight Calculator",
    shortDescription:
      "Calculate weight, mass, or gravitational acceleration using W = m × g.",
    category: "Physics",
    href: "/calculators/weight-calculator",
    keywords: [
      "weight calculator",
      "mass to weight calculator",
      "weight force calculator",
      "W equals mg calculator",
      "gravity weight calculator",
    ],
  },
  {
    slug: "force-calculator",
    name: "Force Calculator",
    shortDescription:
      "Calculate force, mass, or acceleration using Newton's second law.",
    category: "Physics",
    href: "/calculators/force-calculator",
    keywords: [
      "force calculator",
      "newtons second law calculator",
      "force mass acceleration calculator",
      "f equals ma calculator",
    ],
  },
  {
    slug: "power-calculator",
    name: "Power Calculator",
    shortDescription:
      "Calculate power, work, or time using the mechanical power formula.",
    category: "Physics",
    href: "/calculators/power-calculator",
    keywords: [
      "power calculator",
      "physics power calculator",
      "work time power calculator",
      "power formula calculator",
    ],
  },
  {
    slug: "ohms-law-calculator",
    name: "Ohm's Law Calculator",
    shortDescription:
      "Calculate voltage, current, resistance, or electrical power using Ohm's law.",
    category: "Physics",
    href: "/calculators/ohms-law-calculator",
    keywords: [
      "ohms law calculator",
      "ohm law calculator",
      "voltage current resistance calculator",
      "electrical power calculator",
      "v equals i r calculator",
    ],
  },
  {
    slug: "voltage-divider-calculator",
    name: "Voltage Divider Calculator",
    shortDescription:
      "Calculate output voltage, input voltage, or resistor values for an ideal two-resistor voltage divider.",
    category: "Physics",
    href: "/calculators/voltage-divider-calculator",
    keywords: [
      "voltage divider calculator",
      "potential divider calculator",
      "resistor divider calculator",
      "output voltage calculator",
      "voltage divider formula calculator",
    ],
  },
  {
    slug: "voltage-drop-calculator",
    name: "Voltage Drop Calculator",
    shortDescription:
      "Calculate conductor voltage drop, current, cable length, cross-sectional area, or electrical resistivity.",
    category: "Physics",
    href: "/calculators/voltage-drop-calculator",
    keywords: [
      "voltage drop calculator",
      "wire voltage drop calculator",
      "cable voltage drop calculator",
      "conductor voltage loss calculator",
      "electrical voltage drop formula",
      "copper wire voltage drop calculator",
    ],
  },
  {
    slug: "coulombs-law-calculator",
    name: "Coulomb's Law Calculator",
    shortDescription:
      "Calculate electrostatic force, charge, or separation distance using Coulomb's law.",
    category: "Physics",
    href: "/calculators/coulombs-law-calculator",
    keywords: [
      "coulombs law calculator",
      "coulomb law calculator",
      "electrostatic force calculator",
      "electric charge force calculator",
      "electric force calculator",
    ],
  },
  {
    slug: "electric-field-calculator",
    name: "Electric Field Calculator",
    shortDescription:
      "Calculate electric field strength, force, charge, or distance using electrostatic field formulas.",
    category: "Physics",
    href: "/calculators/electric-field-calculator",
    keywords: [
      "electric field calculator",
      "electric field strength calculator",
      "electric force calculator",
      "point charge electric field calculator",
      "newtons per coulomb calculator",
    ],
  },
  {
    slug: "electric-potential-calculator",
    name: "Electric Potential Calculator",
    shortDescription:
      "Calculate electric potential, source charge, or distance using the point-charge potential formula.",
    category: "Physics",
    href: "/calculators/electric-potential-calculator",
    keywords: [
      "electric potential calculator",
      "voltage due to point charge calculator",
      "electric potential formula calculator",
      "point charge potential calculator",
      "v equals kq over r calculator",
    ],
  },
  {
    slug: "magnetic-field-calculator",
    name: "Magnetic Field Calculator",
    shortDescription:
      "Calculate magnetic field strength, force, charge, velocity, angle, current, or distance.",
    category: "Physics",
    href: "/calculators/magnetic-field-calculator",
    keywords: [
      "magnetic field calculator",
      "magnetic field strength calculator",
      "magnetic force calculator",
      "magnetic field around wire calculator",
      "tesla calculator",
    ],
  },
  {
    slug: "capacitance-calculator",
    name: "Capacitance Calculator",
    shortDescription:
      "Calculate capacitance, stored charge, or voltage using the capacitor relationship C = Q/V.",
    category: "Physics",
    href: "/calculators/capacitance-calculator",
    keywords: [
      "capacitance calculator",
      "capacitor calculator",
      "capacitance formula calculator",
      "farad calculator",
      "charge voltage capacitance calculator",
    ],
  },
  {
    slug: "capacitor-energy-calculator",
    name: "Capacitor Energy Calculator",
    shortDescription:
      "Calculate stored capacitor energy, capacitance, charge, or voltage using equivalent energy formulas.",
    category: "Physics",
    href: "/calculators/capacitor-energy-calculator",
    keywords: [
      "capacitor energy calculator",
      "energy stored in capacitor calculator",
      "capacitive energy calculator",
      "capacitor joules calculator",
      "one half cv squared calculator",
    ],
  },
  {
    slug: "rc-time-constant-calculator",
    name: "RC Time Constant Calculator",
    shortDescription:
      "Calculate RC time constant, resistance, capacitance, charging voltage, discharging voltage, or elapsed time.",
    category: "Physics",
    href: "/calculators/rc-time-constant-calculator",
    keywords: [
      "rc time constant calculator",
      "time constant calculator",
      "capacitor charging time calculator",
      "capacitor discharging calculator",
      "tau equals rc calculator",
    ],
  },
  {
    slug: "inductance-calculator",
    name: "Inductance Calculator",
    shortDescription:
      "Calculate inductance, coil turns, magnetic flux, current, solenoid area, or coil length.",
    category: "Physics",
    href: "/calculators/inductance-calculator",
    keywords: [
      "inductance calculator",
      "coil inductance calculator",
      "solenoid inductance calculator",
      "henry calculator",
      "flux linkage calculator",
    ],
  },
  {
    slug: "inductor-energy-calculator",
    name: "Inductor Energy Calculator",
    shortDescription:
      "Calculate stored inductor energy, inductance, or electric current using E = 1/2 LI².",
    category: "Physics",
    href: "/calculators/inductor-energy-calculator",
    keywords: [
      "inductor energy calculator",
      "energy stored in inductor calculator",
      "inductive energy calculator",
      "magnetic energy calculator",
      "one half li squared calculator",
    ],
  },
  {
    slug: "rl-time-constant-calculator",
    name: "RL Time Constant Calculator",
    shortDescription:
      "Calculate RL time constant, inductance, resistance, current rise, current decay, or elapsed time.",
    category: "Physics",
    href: "/calculators/rl-time-constant-calculator",
    keywords: [
      "rl time constant calculator",
      "inductor time constant calculator",
      "resistor inductor circuit calculator",
      "inductor current rise calculator",
      "tau equals l over r calculator",
    ],
  },
  {
    slug: "inductive-reactance-calculator",
    name: "Inductive Reactance Calculator",
    shortDescription:
      "Calculate inductive reactance, AC frequency, or inductance using Xₗ = 2πfL.",
    category: "Physics",
    href: "/calculators/inductive-reactance-calculator",
    keywords: [
      "inductive reactance calculator",
      "inductor reactance calculator",
      "ac inductor calculator",
      "xl equals 2 pi f l calculator",
      "inductor impedance calculator",
    ],
  },
  {
    slug: "capacitive-reactance-calculator",
    name: "Capacitive Reactance Calculator",
    shortDescription:
      "Calculate capacitive reactance, AC frequency, or capacitance using Xc = 1/(2πfC).",
    category: "Physics",
    href: "/calculators/capacitive-reactance-calculator",
    keywords: [
      "capacitive reactance calculator",
      "capacitor reactance calculator",
      "ac capacitor calculator",
      "xc equals 1 over 2 pi f c calculator",
      "capacitor impedance calculator",
    ],
  },
  {
    slug: "resonant-frequency-calculator",
    name: "Resonant Frequency Calculator",
    shortDescription:
      "Calculate resonant frequency, inductance, or capacitance for ideal LC and RLC circuits.",
    category: "Physics",
    href: "/calculators/resonant-frequency-calculator",
    keywords: [
      "resonant frequency calculator",
      "lc resonance calculator",
      "rlc resonance calculator",
      "tank circuit calculator",
      "resonance frequency formula",
    ],
  },

  {
    slug: "rlc-bandwidth-calculator",
    name: "RLC Bandwidth Calculator",
    shortDescription:
      "Calculate RLC circuit bandwidth, resonant frequency, quality factor, and estimated half-power frequencies.",
    category: "Physics",
    href: "/calculators/rlc-bandwidth-calculator",
    keywords: [
      "rlc bandwidth calculator",
      "resonance bandwidth calculator",
      "quality factor bandwidth calculator",
      "half power frequency calculator",
      "bandpass circuit bandwidth calculator",
    ],
  },

  {
    slug: "rlc-quality-factor-calculator",
    name: "RLC Quality Factor Calculator",
    shortDescription:
      "Calculate quality factor, resistance, inductance, capacitance, damping ratio, or bandwidth for a series RLC circuit.",
    category: "Physics",
    href: "/calculators/rlc-quality-factor-calculator",
    keywords: [
      "rlc quality factor calculator",
      "q factor calculator",
      "series rlc circuit calculator",
      "resonance bandwidth calculator",
      "circuit damping calculator",
    ],
  },

  {
    slug: "ac-impedance-calculator",
    name: "AC Impedance Calculator",
    shortDescription:
      "Calculate impedance, resistance, inductive reactance, or capacitive reactance for a series RLC circuit.",
    category: "Physics",
    href: "/calculators/ac-impedance-calculator",
    keywords: [
      "ac impedance calculator",
      "series rlc impedance calculator",
      "electrical impedance calculator",
      "rlc circuit calculator",
      "z equals square root r squared calculator",
    ],
  },
  {
    slug: "rlc-phase-angle-calculator",
    name: "RLC Phase Angle Calculator",
    shortDescription:
      "Calculate phase angle, resistance, inductive reactance, or capacitive reactance for a series RLC circuit.",
    category: "Physics",
    href: "/calculators/rlc-phase-angle-calculator",
    keywords: [
      "rlc phase angle calculator",
      "series rlc phase calculator",
      "voltage current phase angle calculator",
      "current lead lag calculator",
      "rlc circuit power factor calculator",
    ],
  },
  {
    slug: "wave-speed-calculator",
    name: "Wave Speed Calculator",
    shortDescription:
      "Calculate wave speed, frequency, or wavelength using the wave equation.",
    category: "Physics",
    href: "/calculators/wave-speed-calculator",
    keywords: [
      "wave speed calculator",
      "wave equation calculator",
      "frequency wavelength calculator",
      "calculate wavelength",
      "v equals f lambda calculator",
    ],
  },
  {
    slug: "work-calculator",
    name: "Work Calculator",
    shortDescription:
      "Calculate work, force, or distance using the mechanical work formula.",
    category: "Physics",
    href: "/calculators/work-calculator",
    keywords: [
      "work calculator",
      "physics work calculator",
      "force distance work calculator",
      "work formula calculator",
    ],
  },
  {
    slug: "tangential-acceleration-calculator",
    name: "Tangential Acceleration Calculator",
    shortDescription:
      "Calculate tangential acceleration, radius, or angular acceleration using aₜ = rα.",
    category: "Physics",
    href: "/calculators/tangential-acceleration-calculator",
    keywords: [
      "tangential acceleration calculator",
      "radius angular acceleration calculator",
      "linear acceleration circular motion calculator",
      "a t equals r alpha calculator",
    ],
  },
  {
    slug: "tangential-velocity-calculator",
    name: "Tangential Velocity Calculator",
    shortDescription:
      "Calculate tangential velocity, radius, or angular velocity using v = rω.",
    category: "Physics",
    href: "/calculators/tangential-velocity-calculator",
    keywords: [
      "tangential velocity calculator",
      "radius angular velocity calculator",
      "linear velocity circular motion calculator",
      "v equals r omega calculator",
    ],
  },
  {
    slug: "rpm-calculator",
    name: "RPM Calculator",
    shortDescription:
      "Convert RPM, rotational frequency, and angular velocity using RPM = 60f.",
    category: "Physics",
    href: "/calculators/rpm-calculator",
    keywords: [
      "rpm calculator",
      "rpm to hertz calculator",
      "hertz to rpm calculator",
      "rpm to angular velocity calculator",
    ],
  },
  {
    slug: "revolutions-calculator",
    name: "Revolutions Calculator",
    shortDescription:
      "Calculate revolutions, rotational frequency, time, or angular displacement using N = ft and N = θ / 2π.",
    category: "Physics",
    href: "/calculators/revolutions-calculator",
    keywords: [
      "revolutions calculator",
      "number of revolutions",
      "revolutions from frequency and time",
      "angular displacement to revolutions",
    ],
  },
  {
    slug: "rotational-frequency-calculator",
    name: "Rotational Frequency Calculator",
    shortDescription:
      "Calculate rotational frequency, angular velocity, or rotation period using f = ω / 2π.",
    category: "Physics",
    href: "/calculators/rotational-frequency-calculator",
    keywords: [
      "rotational frequency calculator",
      "angular velocity to frequency calculator",
      "rotation period calculator",
      "revolutions per second calculator",
    ],
  },
  {
    slug: "rotational-work-calculator",
    name: "Rotational Work Calculator",
    shortDescription:
      "Calculate rotational work, torque, or angular displacement using W = τθ.",
    category: "Physics",
    href: "/calculators/rotational-work-calculator",
    keywords: [
      "rotational work calculator",
      "torque angular displacement calculator",
      "work equals torque times angle",
      "rotational energy calculator",
    ],
  },
  {
    slug: "rotational-dynamics-calculator",
    name: "Rotational Dynamics Calculator",
    shortDescription:
      "Calculate torque, moment of inertia, or angular acceleration using τ = Iα.",
    category: "Physics",
    href: "/calculators/rotational-dynamics-calculator",
    keywords: [
      "rotational dynamics calculator",
      "torque moment of inertia calculator",
      "torque angular acceleration calculator",
      "tau equals I alpha calculator",
    ],
  },
  {
    slug: "angular-impulse-calculator",
    name: "Angular Impulse Calculator",
    shortDescription:
      "Calculate angular impulse, torque, or time using J = τt = ΔL.",
    category: "Physics",
    href: "/calculators/angular-impulse-calculator",
    keywords: [
      "angular impulse calculator",
      "torque time calculator",
      "change in angular momentum calculator",
      "rotational impulse calculator",
    ],
  },
  {
    slug: "angular-momentum-calculator",
    name: "Angular Momentum Calculator",
    shortDescription:
      "Calculate angular momentum, moment of inertia, or angular velocity using L = Iω.",
    category: "Physics",
    href: "/calculators/angular-momentum-calculator",
    keywords: [
      "angular momentum calculator",
      "moment of inertia angular velocity calculator",
      "L equals I omega calculator",
      "rotational momentum calculator",
    ],
  },
  {
    slug: "rotational-power-calculator",
    name: "Rotational Power Calculator",
    shortDescription:
      "Calculate rotational power, torque, or angular velocity using P = τω.",
    category: "Physics",
    href: "/calculators/rotational-power-calculator",
    keywords: [
      "rotational power calculator",
      "torque angular velocity calculator",
      "power equals torque times angular velocity",
      "rotational mechanics calculator",
    ],
  },
  {
    slug: "moment-of-inertia-calculator",
    name: "Moment of Inertia Calculator",
    shortDescription:
      "Calculate moment of inertia for point masses, disks, hoops, spheres, shells, and rods.",
    category: "Physics",
    href: "/calculators/moment-of-inertia-calculator",
    keywords: [
      "moment of inertia calculator",
      "rotational inertia calculator",
      "disk sphere rod inertia calculator",
      "moment of inertia formulas",
    ],
  },
  {
    slug: "rotational-kinetic-energy-calculator",
    name: "Rotational Kinetic Energy Calculator",
    shortDescription:
      "Calculate rotational kinetic energy, moment of inertia, or angular velocity using KErot = ½Iω².",
    category: "Physics",
    href: "/calculators/rotational-kinetic-energy-calculator",
    keywords: [
      "rotational kinetic energy calculator",
      "moment of inertia calculator",
      "angular velocity energy calculator",
      "one half i omega squared",
    ],
  },
  {
    slug: "angular-acceleration-calculator",
    name: "Angular Acceleration Calculator",
    shortDescription:
      "Calculate angular acceleration, angular velocity change, or time using α = Δω ÷ t.",
    category: "Physics",
    href: "/calculators/angular-acceleration-calculator",
    keywords: [
      "angular acceleration calculator",
      "angular velocity change calculator",
      "rotational acceleration calculator",
      "alpha equals delta omega over time",
    ],
  },

  {
    slug: "angular-displacement-calculator",
    name: "Angular Displacement Calculator",
    shortDescription:
      "Calculate angular displacement, angular velocity, or time using θ = ω × t.",
    category: "Physics",
    href: "/calculators/angular-displacement-calculator",
    keywords: [
      "angular displacement calculator",
      "angular displacement formula",
      "theta omega time calculator",
      "rotational motion calculator",
    ],
  },
  {
    slug: "angular-velocity-calculator",
    name: "Angular Velocity Calculator",
    shortDescription:
      "Calculate angular velocity, angular displacement, or time using ω = θ ÷ t.",
    category: "Physics",
    href: "/calculators/angular-velocity-calculator",
    keywords: [
      "angular velocity calculator",
      "angular displacement calculator",
      "rotational motion calculator",
      "omega equals theta over time",
    ],
  },
  {
    slug: "centripetal-acceleration-calculator",
    name: "Centripetal Acceleration Calculator",
    shortDescription:
      "Calculate centripetal acceleration, velocity, or radius using ac = v² ÷ r.",
    category: "Physics",
    href: "/calculators/centripetal-acceleration-calculator",
    keywords: [
      "centripetal acceleration calculator",
      "circular acceleration calculator",
      "velocity radius acceleration calculator",
      "ac equals v squared over r",
    ],
  },
  {
    slug: "circular-velocity-calculator",
    name: "Circular Velocity Calculator",
    shortDescription:
      "Calculate circular velocity, radius, or period using v = 2πr ÷ T.",
    category: "Physics",
    href: "/calculators/circular-velocity-calculator",
    keywords: [
      "circular velocity calculator",
      "tangential velocity calculator",
      "radius period velocity calculator",
      "v equals 2 pi r over t",
    ],
  },
  {
    slug: "centripetal-force-calculator",
    name: "Centripetal Force Calculator",
    shortDescription:
      "Calculate centripetal force, mass, velocity, or radius using Fc = mv² ÷ r.",
    category: "Physics",
    href: "/calculators/centripetal-force-calculator",
    keywords: [
      "centripetal force calculator",
      "circular motion calculator",
      "mass velocity radius calculator",
      "fc equals mv squared over r",
    ],
  },
  {
    slug: "torque-calculator",
    name: "Torque Calculator",
    shortDescription:
      "Calculate torque, force, or lever-arm distance using τ = Fr.",
    category: "Physics",
    href: "/calculators/torque-calculator",
    keywords: [
      "torque calculator",
      "force lever arm calculator",
      "newton meter calculator",
      "rotational force calculator",
    ],
  },
  {
    slug: "impulse-calculator",
    name: "Impulse Calculator",
    shortDescription:
      "Calculate impulse, force, or time interval using J = FΔt.",
    category: "Physics",
    href: "/calculators/impulse-calculator",
    keywords: [
      "impulse calculator",
      "force time impulse calculator",
      "impulse momentum calculator",
      "newton second calculator",
    ],
  },


  {
    slug: "acceleration-due-to-gravity-calculator",
    name: "Acceleration Due to Gravity Calculator",
    shortDescription:
      "Calculate gravitational acceleration from the mass and radius of a planet or celestial body using g = GM / r².",
    category: "Physics",
    href: "/calculators/acceleration-due-to-gravity-calculator",
    keywords: [
      "acceleration due to gravity calculator",
      "gravitational acceleration calculator",
      "gravity calculator",
      "surface gravity calculator",
    ],
  },
  {
    slug: "free-fall-calculator",
    name: "Free Fall Calculator",
    shortDescription:
      "Calculate free fall distance, final velocity, or fall time using gravity equations.",
    category: "Physics",
    href: "/calculators/free-fall-calculator",
    keywords: [
      "free fall calculator",
      "fall time calculator",
      "free fall velocity calculator",
      "gravity calculator",
    ],
  },
  {
    slug: "projectile-motion-calculator",
    name: "Projectile Motion Calculator",
    shortDescription:
      "Calculate projectile range, maximum height, and flight time using velocity, angle, and gravity.",
    category: "Physics",
    href: "/calculators/projectile-motion-calculator",
    keywords: [
      "projectile motion calculator",
      "projectile range calculator",
      "maximum height calculator",
      "flight time calculator",
    ],
  },
  {
    slug: "pressure-calculator",
    name: "Pressure Calculator",
    shortDescription:
      "Calculate pressure, force, or area using P = F ÷ A.",
    category: "Physics",
    href: "/calculators/pressure-calculator",
    keywords: [
      "pressure calculator",
      "force area pressure calculator",
      "p equals f over a calculator",
      "pascal calculator",
    ],
  },
  {
    slug: "hookes-law-calculator",
    name: "Hooke’s Law Calculator",
    shortDescription:
      "Calculate force, spring constant, or extension using Hooke’s law F = kx.",
    category: "Physics",
    href: "/calculators/hookes-law-calculator",
    keywords: [
      "hookes law calculator",
      "hooke law calculator",
      "spring force calculator",
      "force spring constant extension calculator",
    ],
  },
  {
    slug: "elastic-potential-energy-calculator",
    name: "Elastic Potential Energy Calculator",
    shortDescription:
      "Calculate elastic potential energy, spring constant, or extension using E = ½kx².",
    category: "Physics",
    href: "/calculators/elastic-potential-energy-calculator",
    keywords: [
      "elastic potential energy calculator",
      "spring energy calculator",
      "spring constant calculator",
      "extension calculator",
    ],
  },
  {
    slug: "gravitational-potential-energy-calculator",
    name: "Gravitational Potential Energy Calculator",
    shortDescription:
      "Calculate gravitational potential energy, mass, gravity, or height using PE = mgh.",
    category: "Physics",
    href: "/calculators/gravitational-potential-energy-calculator",
    keywords: [
      "gravitational potential energy calculator",
      "potential energy calculator",
      "PE mgh calculator",
      "mass gravity height calculator",
    ],
  },
  {
    slug: "kinetic-energy-calculator",
    name: "Kinetic Energy Calculator",
    shortDescription:
      "Calculate kinetic energy, mass, or speed using the classical motion-energy formula.",
    category: "Physics",
    href: "/calculators/kinetic-energy-calculator",
    keywords: [
      "kinetic energy calculator",
      "ke calculator",
      "mass speed energy calculator",
      "kinetic energy formula calculator",
    ],
  },
  {
    slug: "momentum-calculator",
    name: "Momentum Calculator",
    shortDescription:
      "Calculate momentum, mass, or velocity using the linear momentum formula.",
    category: "Physics",
    href: "/calculators/momentum-calculator",
    keywords: [
      "momentum calculator",
      "linear momentum calculator",
      "mass velocity momentum calculator",
      "p equals mv calculator",
    ],
  },
  {
    slug: "distance-calculator",
    name: "Distance Calculator",
    shortDescription:
      "Calculate distance, speed, or time using the motion formula d = v × t.",
    category: "Physics",
    href: "/calculators/distance-calculator",
    keywords: [
      "distance calculator",
      "speed distance time calculator",
      "distance formula calculator",
      "calculate distance from speed and time",
    ],
  },
  {
    slug: "displacement-calculator",
    name: "Displacement Calculator",
    shortDescription:
      "Calculate displacement, initial position, or final position using Δx = x₂ − x₁.",
    category: "Physics",
    href: "/calculators/displacement-calculator",
    keywords: [
      "displacement calculator",
      "initial final position calculator",
      "change in position calculator",
      "displacement formula calculator",
    ],
  },
  {
    slug: "average-speed-calculator",
    name: "Average Speed Calculator",
    shortDescription:
      "Calculate average speed, total distance, or elapsed time using s̄ = d ÷ t.",
    category: "Physics",
    href: "/calculators/average-speed-calculator",
    keywords: [
      "average speed calculator",
      "distance time calculator",
      "speed distance time calculator",
      "average speed formula calculator",
    ],
  },
  {
    slug: "average-velocity-calculator",
    name: "Average Velocity Calculator",
    shortDescription:
      "Calculate average velocity, displacement, or elapsed time using v̄ = Δx ÷ Δt.",
    category: "Physics",
    href: "/calculators/average-velocity-calculator",
    keywords: [
      "average velocity calculator",
      "displacement time calculator",
      "velocity displacement time calculator",
      "average velocity formula calculator",
    ],
  },
  {
    slug: "kinematic-equations-calculator",
    name: "Kinematic Equations Calculator",
    shortDescription:
      "Solve initial velocity, final velocity, acceleration, time, or displacement using four SUVAT equations.",
    category: "Physics",
    href: "/calculators/kinematic-equations-calculator",
    keywords: [
      "kinematic equations calculator",
      "SUVAT calculator",
      "motion equations calculator",
      "constant acceleration calculator",
      "final velocity calculator",
      "kinematics calculator",
    ],
  },
  {
    slug: "acceleration-calculator",
    name: "Acceleration Calculator",
    shortDescription:
      "Calculate acceleration, initial velocity, final velocity, or time from three known values.",
    category: "Physics",
    href: "/calculators/acceleration-calculator",
    keywords: [
      "acceleration calculator",
      "initial velocity calculator",
      "final velocity calculator",
      "velocity and time calculator",
    ],
  },
  {
    slug: "density-calculator",
    name: "Density Calculator",
    shortDescription:
      "Calculate density, mass, or volume using laboratory measurements.",
    category: "Physics",
    href: "/calculators/density-calculator",
    keywords: ["density calculator for students"],
  },
  {
    slug: "specific-heat-calculator",
    name: "Specific Heat Calculator",
    shortDescription:
      "Calculate heat energy, mass, temperature change, or specific heat capacity.",
    category: "Physics",
    href: "/calculators/specific-heat-calculator",
    keywords: ["specific heat calculator"],
  },
];
