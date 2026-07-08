import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type TangentialVelocityVariable =
  | "tangentialVelocity"
  | "radius"
  | "angularVelocity";

export type TangentialVelocityInput = {
  tangentialVelocity?: number;
  radius?: number;
  angularVelocity?: number;
  solveFor: TangentialVelocityVariable;
};

export type TangentialVelocityDetails = {
  tangentialVelocity: number;
  radius: number;
  angularVelocity: number;
  solvedVariable: TangentialVelocityVariable;
  formula: string;
};

const variableLabels: Record<
  TangentialVelocityVariable,
  string
> = {
  tangentialVelocity: "Tangential velocity",
  radius: "Radius",
  angularVelocity: "Angular velocity",
};

function requirePositiveValue(
  value: number | undefined,
  variable: TangentialVelocityVariable,
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

export function calculateTangentialVelocity({
  tangentialVelocity,
  radius,
  angularVelocity,
  solveFor,
}: TangentialVelocityInput): CalculationResult<TangentialVelocityDetails> {
  let calculatedTangentialVelocity =
    tangentialVelocity;
  let calculatedRadius = radius;
  let calculatedAngularVelocity =
    angularVelocity;

  switch (solveFor) {
    case "tangentialVelocity": {
      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedAngularVelocity =
        requirePositiveValue(
          angularVelocity,
          "angularVelocity",
        );

      calculatedTangentialVelocity =
        calculatedRadius *
        calculatedAngularVelocity;
      break;
    }

    case "radius": {
      calculatedTangentialVelocity =
        requirePositiveValue(
          tangentialVelocity,
          "tangentialVelocity",
        );

      calculatedAngularVelocity =
        requirePositiveValue(
          angularVelocity,
          "angularVelocity",
        );

      calculatedRadius =
        calculatedTangentialVelocity /
        calculatedAngularVelocity;
      break;
    }

    case "angularVelocity": {
      calculatedTangentialVelocity =
        requirePositiveValue(
          tangentialVelocity,
          "tangentialVelocity",
        );

      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedAngularVelocity =
        calculatedTangentialVelocity /
        calculatedRadius;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported tangential velocity variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    tangentialVelocity:
      calculatedTangentialVelocity,
    radius: calculatedRadius,
    angularVelocity:
      calculatedAngularVelocity,
  }[solveFor];

  if (
    calculatedTangentialVelocity === undefined ||
    calculatedRadius === undefined ||
    calculatedAngularVelocity === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The tangential velocity calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      tangentialVelocity:
        calculatedTangentialVelocity,
      radius: calculatedRadius,
      angularVelocity:
        calculatedAngularVelocity,
      solvedVariable: solveFor,
      formula: "v = rω",
    },
  };
}
