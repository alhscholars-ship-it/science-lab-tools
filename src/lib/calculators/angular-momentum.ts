import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type AngularMomentumVariable =
  | "angularMomentum"
  | "momentOfInertia"
  | "angularVelocity";

export type AngularMomentumInput = {
  angularMomentum?: number;
  momentOfInertia?: number;
  angularVelocity?: number;
  solveFor: AngularMomentumVariable;
};

export type AngularMomentumDetails = {
  angularMomentum: number;
  momentOfInertia: number;
  angularVelocity: number;
  solvedVariable: AngularMomentumVariable;
  formula: string;
};

const variableLabels: Record<
  AngularMomentumVariable,
  string
> = {
  angularMomentum: "Angular momentum",
  momentOfInertia: "Moment of inertia",
  angularVelocity: "Angular velocity",
};

function requireFiniteValue(
  value: number | undefined,
  variable: AngularMomentumVariable,
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
  variable: AngularMomentumVariable,
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

export function calculateAngularMomentum({
  angularMomentum,
  momentOfInertia,
  angularVelocity,
  solveFor,
}: AngularMomentumInput): CalculationResult<AngularMomentumDetails> {
  let calculatedAngularMomentum =
    angularMomentum;
  let calculatedMomentOfInertia =
    momentOfInertia;
  let calculatedAngularVelocity =
    angularVelocity;

  switch (solveFor) {
    case "angularMomentum": {
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

      calculatedAngularMomentum =
        calculatedMomentOfInertia *
        calculatedAngularVelocity;
      break;
    }

    case "momentOfInertia": {
      calculatedAngularMomentum =
        requirePositiveValue(
          angularMomentum,
          "angularMomentum",
        );

      calculatedAngularVelocity =
        requirePositiveValue(
          angularVelocity,
          "angularVelocity",
        );

      calculatedMomentOfInertia =
        calculatedAngularMomentum /
        calculatedAngularVelocity;
      break;
    }

    case "angularVelocity": {
      calculatedAngularMomentum =
        requirePositiveValue(
          angularMomentum,
          "angularMomentum",
        );

      calculatedMomentOfInertia =
        requirePositiveValue(
          momentOfInertia,
          "momentOfInertia",
        );

      calculatedAngularVelocity =
        calculatedAngularMomentum /
        calculatedMomentOfInertia;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported angular momentum variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    angularMomentum:
      calculatedAngularMomentum,
    momentOfInertia:
      calculatedMomentOfInertia,
    angularVelocity:
      calculatedAngularVelocity,
  }[solveFor];

  if (
    calculatedAngularMomentum === undefined ||
    calculatedMomentOfInertia === undefined ||
    calculatedAngularVelocity === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The angular momentum calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      angularMomentum:
        calculatedAngularMomentum,
      momentOfInertia:
        calculatedMomentOfInertia,
      angularVelocity:
        calculatedAngularVelocity,
      solvedVariable: solveFor,
      formula: "L = Iω",
    },
  };
}
