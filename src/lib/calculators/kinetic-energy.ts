import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type KineticEnergyVariable =
  | "kineticEnergy"
  | "mass"
  | "speed";

export type KineticEnergyInput = {
  kineticEnergy?: number;
  mass?: number;
  speed?: number;
  solveFor: KineticEnergyVariable;
};

export type KineticEnergyDetails = {
  kineticEnergy: number;
  mass: number;
  speed: number;
  solvedVariable: KineticEnergyVariable;
  formula: string;
};

const variableLabels: Record<
  KineticEnergyVariable,
  string
> = {
  kineticEnergy: "Kinetic energy",
  mass: "Mass",
  speed: "Speed",
};

function requireFiniteValue(
  value: number | undefined,
  variable: KineticEnergyVariable,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  return value;
}

function requirePositiveMass(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "mass",
  );

  if (finiteValue <= 0) {
    throw new Error(
      "Mass must be greater than zero.",
    );
  }

  return finiteValue;
}

function requireNonNegativeEnergy(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "kineticEnergy",
  );

  if (finiteValue < 0) {
    throw new Error(
      "Kinetic energy cannot be negative.",
    );
  }

  return finiteValue;
}

function requireNonNegativeSpeed(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "speed",
  );

  if (finiteValue < 0) {
    throw new Error(
      "Speed cannot be negative.",
    );
  }

  return finiteValue;
}

export function calculateKineticEnergy({
  kineticEnergy,
  mass,
  speed,
  solveFor,
}: KineticEnergyInput): CalculationResult<KineticEnergyDetails> {
  let calculatedEnergy = kineticEnergy;
  let calculatedMass = mass;
  let calculatedSpeed = speed;

  switch (solveFor) {
    case "kineticEnergy": {
      calculatedMass = requirePositiveMass(mass);
      calculatedSpeed =
        requireNonNegativeSpeed(speed);

      calculatedEnergy =
        0.5 *
        calculatedMass *
        calculatedSpeed ** 2;
      break;
    }

    case "mass": {
      calculatedEnergy =
        requireNonNegativeEnergy(kineticEnergy);
      calculatedSpeed =
        requireNonNegativeSpeed(speed);

      if (calculatedSpeed === 0) {
        throw new Error(
          "Speed must be greater than zero when calculating mass.",
        );
      }

      calculatedMass =
        (2 * calculatedEnergy) /
        calculatedSpeed ** 2;

      if (calculatedMass <= 0) {
        throw new Error(
          "Kinetic energy must be greater than zero when calculating mass.",
        );
      }
      break;
    }

    case "speed": {
      calculatedEnergy =
        requireNonNegativeEnergy(kineticEnergy);
      calculatedMass =
        requirePositiveMass(mass);

      calculatedSpeed = Math.sqrt(
        (2 * calculatedEnergy) /
          calculatedMass,
      );
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported kinetic energy variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    kineticEnergy: calculatedEnergy,
    mass: calculatedMass,
    speed: calculatedSpeed,
  }[solveFor];

  if (
    calculatedEnergy === undefined ||
    calculatedMass === undefined ||
    calculatedSpeed === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The kinetic energy calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      kineticEnergy: calculatedEnergy,
      mass: calculatedMass,
      speed: calculatedSpeed,
      solvedVariable: solveFor,
      formula: "KE = ½mv²",
    },
  };
}
