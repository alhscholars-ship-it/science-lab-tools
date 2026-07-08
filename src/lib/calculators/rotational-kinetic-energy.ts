import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RotationalKineticEnergyVariable =
  | "rotationalKineticEnergy"
  | "momentOfInertia"
  | "angularVelocity";

export type RotationalKineticEnergyInput = {
  rotationalKineticEnergy?: number;
  momentOfInertia?: number;
  angularVelocity?: number;
  solveFor: RotationalKineticEnergyVariable;
};

export type RotationalKineticEnergyDetails = {
  rotationalKineticEnergy: number;
  momentOfInertia: number;
  angularVelocity: number;
  solvedVariable: RotationalKineticEnergyVariable;
  formula: string;
};

const variableLabels: Record<
  RotationalKineticEnergyVariable,
  string
> = {
  rotationalKineticEnergy:
    "Rotational kinetic energy",
  momentOfInertia: "Moment of inertia",
  angularVelocity: "Angular velocity",
};

function requireFiniteValue(
  value: number | undefined,
  variable: RotationalKineticEnergyVariable,
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
  variable: RotationalKineticEnergyVariable,
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

export function calculateRotationalKineticEnergy({
  rotationalKineticEnergy,
  momentOfInertia,
  angularVelocity,
  solveFor,
}: RotationalKineticEnergyInput): CalculationResult<RotationalKineticEnergyDetails> {
  let calculatedRotationalKineticEnergy =
    rotationalKineticEnergy;
  let calculatedMomentOfInertia =
    momentOfInertia;
  let calculatedAngularVelocity =
    angularVelocity;

  switch (solveFor) {
    case "rotationalKineticEnergy": {
      calculatedMomentOfInertia =
        requirePositiveValue(
          momentOfInertia,
          "momentOfInertia",
        );

      calculatedAngularVelocity =
        requirePositiveValue(
          angularVelocity,
          "angularVelocity",
        );

      calculatedRotationalKineticEnergy =
        0.5 *
        calculatedMomentOfInertia *
        calculatedAngularVelocity ** 2;
      break;
    }

    case "momentOfInertia": {
      calculatedRotationalKineticEnergy =
        requirePositiveValue(
          rotationalKineticEnergy,
          "rotationalKineticEnergy",
        );

      calculatedAngularVelocity =
        requirePositiveValue(
          angularVelocity,
          "angularVelocity",
        );

      calculatedMomentOfInertia =
        (2 *
          calculatedRotationalKineticEnergy) /
        calculatedAngularVelocity ** 2;
      break;
    }

    case "angularVelocity": {
      calculatedRotationalKineticEnergy =
        requirePositiveValue(
          rotationalKineticEnergy,
          "rotationalKineticEnergy",
        );

      calculatedMomentOfInertia =
        requirePositiveValue(
          momentOfInertia,
          "momentOfInertia",
        );

      calculatedAngularVelocity = Math.sqrt(
        (2 *
          calculatedRotationalKineticEnergy) /
          calculatedMomentOfInertia,
      );
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported rotational kinetic energy variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    rotationalKineticEnergy:
      calculatedRotationalKineticEnergy,
    momentOfInertia:
      calculatedMomentOfInertia,
    angularVelocity:
      calculatedAngularVelocity,
  }[solveFor];

  if (
    calculatedRotationalKineticEnergy === undefined ||
    calculatedMomentOfInertia === undefined ||
    calculatedAngularVelocity === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The rotational kinetic energy calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      rotationalKineticEnergy:
        calculatedRotationalKineticEnergy,
      momentOfInertia:
        calculatedMomentOfInertia,
      angularVelocity:
        calculatedAngularVelocity,
      solvedVariable: solveFor,
      formula: "KErot = ½Iω²",
    },
  };
}
