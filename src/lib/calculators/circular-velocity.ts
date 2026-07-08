import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type CircularVelocityVariable =
  | "velocity"
  | "radius"
  | "period";

export type CircularVelocityInput = {
  velocity?: number;
  radius?: number;
  period?: number;
  solveFor: CircularVelocityVariable;
};

export type CircularVelocityDetails = {
  velocity: number;
  radius: number;
  period: number;
  solvedVariable: CircularVelocityVariable;
  formula: string;
};

const variableLabels: Record<
  CircularVelocityVariable,
  string
> = {
  velocity: "Velocity",
  radius: "Radius",
  period: "Period",
};

function requireFiniteValue(
  value: number | undefined,
  variable: CircularVelocityVariable,
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
  variable: CircularVelocityVariable,
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

export function calculateCircularVelocity({
  velocity,
  radius,
  period,
  solveFor,
}: CircularVelocityInput): CalculationResult<CircularVelocityDetails> {
  let calculatedVelocity = velocity;
  let calculatedRadius = radius;
  let calculatedPeriod = period;

  switch (solveFor) {
    case "velocity": {
      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedPeriod = requirePositiveValue(
        period,
        "period",
      );

      calculatedVelocity =
        (2 * Math.PI * calculatedRadius) /
        calculatedPeriod;
      break;
    }

    case "radius": {
      calculatedVelocity =
        requirePositiveValue(
          velocity,
          "velocity",
        );

      calculatedPeriod = requirePositiveValue(
        period,
        "period",
      );

      calculatedRadius =
        (calculatedVelocity *
          calculatedPeriod) /
        (2 * Math.PI);
      break;
    }

    case "period": {
      calculatedVelocity =
        requirePositiveValue(
          velocity,
          "velocity",
        );

      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedPeriod =
        (2 * Math.PI * calculatedRadius) /
        calculatedVelocity;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported circular velocity variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    velocity: calculatedVelocity,
    radius: calculatedRadius,
    period: calculatedPeriod,
  }[solveFor];

  if (
    calculatedVelocity === undefined ||
    calculatedRadius === undefined ||
    calculatedPeriod === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The circular velocity calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      velocity: calculatedVelocity,
      radius: calculatedRadius,
      period: calculatedPeriod,
      solvedVariable: solveFor,
      formula: "v = 2πr ÷ T",
    },
  };
}
