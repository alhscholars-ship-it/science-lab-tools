import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type TangentialAccelerationVariable =
  | "tangentialAcceleration"
  | "radius"
  | "angularAcceleration";

export type TangentialAccelerationInput = {
  tangentialAcceleration?: number;
  radius?: number;
  angularAcceleration?: number;
  solveFor: TangentialAccelerationVariable;
};

export type TangentialAccelerationDetails = {
  tangentialAcceleration: number;
  radius: number;
  angularAcceleration: number;
  solvedVariable: TangentialAccelerationVariable;
  formula: string;
};

const variableLabels: Record<
  TangentialAccelerationVariable,
  string
> = {
  tangentialAcceleration: "Tangential acceleration",
  radius: "Radius",
  angularAcceleration: "Angular acceleration",
};

function requirePositiveValue(
  value: number | undefined,
  variable: TangentialAccelerationVariable,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  if (value <= 0) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return value;
}

export function calculateTangentialAcceleration({
  tangentialAcceleration,
  radius,
  angularAcceleration,
  solveFor,
}: TangentialAccelerationInput): CalculationResult<TangentialAccelerationDetails> {
  let calculatedTangentialAcceleration =
    tangentialAcceleration;
  let calculatedRadius = radius;
  let calculatedAngularAcceleration =
    angularAcceleration;

  switch (solveFor) {
    case "tangentialAcceleration": {
      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedAngularAcceleration =
        requirePositiveValue(
          angularAcceleration,
          "angularAcceleration",
        );

      calculatedTangentialAcceleration =
        calculatedRadius *
        calculatedAngularAcceleration;
      break;
    }

    case "radius": {
      calculatedTangentialAcceleration =
        requirePositiveValue(
          tangentialAcceleration,
          "tangentialAcceleration",
        );

      calculatedAngularAcceleration =
        requirePositiveValue(
          angularAcceleration,
          "angularAcceleration",
        );

      calculatedRadius =
        calculatedTangentialAcceleration /
        calculatedAngularAcceleration;
      break;
    }

    case "angularAcceleration": {
      calculatedTangentialAcceleration =
        requirePositiveValue(
          tangentialAcceleration,
          "tangentialAcceleration",
        );

      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedAngularAcceleration =
        calculatedTangentialAcceleration /
        calculatedRadius;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported tangential acceleration variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    tangentialAcceleration:
      calculatedTangentialAcceleration,
    radius: calculatedRadius,
    angularAcceleration:
      calculatedAngularAcceleration,
  }[solveFor];

  if (
    calculatedTangentialAcceleration === undefined ||
    calculatedRadius === undefined ||
    calculatedAngularAcceleration === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The tangential acceleration calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      tangentialAcceleration:
        calculatedTangentialAcceleration,
      radius: calculatedRadius,
      angularAcceleration:
        calculatedAngularAcceleration,
      solvedVariable: solveFor,
      formula: "aₜ = rα",
    },
  };
}
