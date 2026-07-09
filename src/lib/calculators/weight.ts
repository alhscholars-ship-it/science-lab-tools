import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type WeightVariable =
  | "weight"
  | "mass"
  | "gravity";

export type WeightInput = {
  weight?: number;
  mass?: number;
  gravity?: number;
  solveFor: WeightVariable;
};

export type WeightDetails = {
  weight: number;
  mass: number;
  gravity: number;
  solvedVariable: WeightVariable;
  formula: string;
};

const variableLabels: Record<
  WeightVariable,
  string
> = {
  weight: "Weight",
  mass: "Mass",
  gravity: "Gravitational acceleration",
};

function requireFiniteValue(
  value: number | undefined,
  variable: WeightVariable,
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
  variable: WeightVariable,
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

export function calculateWeight({
  weight,
  mass,
  gravity,
  solveFor,
}: WeightInput): CalculationResult<WeightDetails> {
  let calculatedWeight = weight;
  let calculatedMass = mass;
  let calculatedGravity = gravity;

  switch (solveFor) {
    case "weight": {
      calculatedMass = requirePositiveValue(
        calculatedMass,
        "mass",
      );
      calculatedGravity = requirePositiveValue(
        calculatedGravity,
        "gravity",
      );

      calculatedWeight =
        calculatedMass * calculatedGravity;
      break;
    }

    case "mass": {
      calculatedWeight = requirePositiveValue(
        calculatedWeight,
        "weight",
      );
      calculatedGravity = requirePositiveValue(
        calculatedGravity,
        "gravity",
      );

      calculatedMass =
        calculatedWeight / calculatedGravity;
      break;
    }

    case "gravity": {
      calculatedWeight = requirePositiveValue(
        calculatedWeight,
        "weight",
      );
      calculatedMass = requirePositiveValue(
        calculatedMass,
        "mass",
      );

      calculatedGravity =
        calculatedWeight / calculatedMass;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported weight variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    weight: calculatedWeight,
    mass: calculatedMass,
    gravity: calculatedGravity,
  }[solveFor];

  if (
    calculatedWeight === undefined ||
    calculatedMass === undefined ||
    calculatedGravity === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The weight calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      weight: calculatedWeight,
      mass: calculatedMass,
      gravity: calculatedGravity,
      solvedVariable: solveFor,
      formula: "W = m × g",
    },
  };
}
