import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type GravitationalPotentialEnergyVariable =
  | "potentialEnergy"
  | "mass"
  | "gravity"
  | "height";

export type GravitationalPotentialEnergyInput = {
  potentialEnergy?: number;
  mass?: number;
  gravity?: number;
  height?: number;
  solveFor: GravitationalPotentialEnergyVariable;
};

export type GravitationalPotentialEnergyDetails = {
  potentialEnergy: number;
  mass: number;
  gravity: number;
  height: number;
  solvedVariable: GravitationalPotentialEnergyVariable;
  formula: string;
};

const variableLabels: Record<
  GravitationalPotentialEnergyVariable,
  string
> = {
  potentialEnergy: "Potential energy",
  mass: "Mass",
  gravity: "Gravitational acceleration",
  height: "Height",
};

function requireFiniteValue(
  value: number | undefined,
  variable: GravitationalPotentialEnergyVariable,
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

function requirePositiveValue(
  value: number | undefined,
  variable:
    | "mass"
    | "gravity"
    | "height",
): number {
  const finiteValue = requireFiniteValue(
    value,
    variable,
  );

  if (finiteValue <= 0) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return finiteValue;
}

export function calculateGravitationalPotentialEnergy({
  potentialEnergy,
  mass,
  gravity,
  height,
  solveFor,
}: GravitationalPotentialEnergyInput): CalculationResult<GravitationalPotentialEnergyDetails> {
  let calculatedPotentialEnergy =
    potentialEnergy;
  let calculatedMass = mass;
  let calculatedGravity = gravity;
  let calculatedHeight = height;

  switch (solveFor) {
    case "potentialEnergy": {
      calculatedMass = requirePositiveValue(
        mass,
        "mass",
      );
      calculatedGravity =
        requirePositiveValue(
          gravity,
          "gravity",
        );
      calculatedHeight =
        requirePositiveValue(
          height,
          "height",
        );

      calculatedPotentialEnergy =
        calculatedMass *
        calculatedGravity *
        calculatedHeight;
      break;
    }

    case "mass": {
      calculatedPotentialEnergy =
        requireFiniteValue(
          potentialEnergy,
          "potentialEnergy",
        );
      calculatedGravity =
        requirePositiveValue(
          gravity,
          "gravity",
        );
      calculatedHeight =
        requirePositiveValue(
          height,
          "height",
        );

      calculatedMass =
        calculatedPotentialEnergy /
        (calculatedGravity *
          calculatedHeight);

      if (calculatedMass <= 0) {
        throw new Error(
          "Potential energy must be greater than zero when calculating mass.",
        );
      }
      break;
    }

    case "gravity": {
      calculatedPotentialEnergy =
        requireFiniteValue(
          potentialEnergy,
          "potentialEnergy",
        );
      calculatedMass =
        requirePositiveValue(
          mass,
          "mass",
        );
      calculatedHeight =
        requirePositiveValue(
          height,
          "height",
        );

      calculatedGravity =
        calculatedPotentialEnergy /
        (calculatedMass *
          calculatedHeight);

      if (calculatedGravity <= 0) {
        throw new Error(
          "Potential energy must be greater than zero when calculating gravitational acceleration.",
        );
      }
      break;
    }

    case "height": {
      calculatedPotentialEnergy =
        requireFiniteValue(
          potentialEnergy,
          "potentialEnergy",
        );
      calculatedMass =
        requirePositiveValue(
          mass,
          "mass",
        );
      calculatedGravity =
        requirePositiveValue(
          gravity,
          "gravity",
        );

      calculatedHeight =
        calculatedPotentialEnergy /
        (calculatedMass *
          calculatedGravity);

      if (calculatedHeight <= 0) {
        throw new Error(
          "Potential energy must be greater than zero when calculating height.",
        );
      }
      break;
    }

    default: {
      const exhaustiveCheck: never =
        solveFor;

      throw new Error(
        `Unsupported potential-energy variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    potentialEnergy:
      calculatedPotentialEnergy,
    mass: calculatedMass,
    gravity: calculatedGravity,
    height: calculatedHeight,
  }[solveFor];

  if (
    calculatedPotentialEnergy === undefined ||
    calculatedMass === undefined ||
    calculatedGravity === undefined ||
    calculatedHeight === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The gravitational potential energy calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      potentialEnergy:
        calculatedPotentialEnergy,
      mass: calculatedMass,
      gravity: calculatedGravity,
      height: calculatedHeight,
      solvedVariable: solveFor,
      formula: "PE = mgh",
    },
  };
}
