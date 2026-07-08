import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type CentripetalAccelerationVariable =
  | "acceleration"
  | "velocity"
  | "radius";

export type CentripetalAccelerationInput = {
  acceleration?: number;
  velocity?: number;
  radius?: number;
  solveFor: CentripetalAccelerationVariable;
};

export type CentripetalAccelerationDetails = {
  acceleration: number;
  velocity: number;
  radius: number;
  solvedVariable: CentripetalAccelerationVariable;
  formula: string;
};

const variableLabels: Record<
  CentripetalAccelerationVariable,
  string
> = {
  acceleration: "Centripetal acceleration",
  velocity: "Velocity",
  radius: "Radius",
};

function requireFiniteValue(
  value: number | undefined,
  variable: CentripetalAccelerationVariable,
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
  variable: CentripetalAccelerationVariable,
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

export function calculateCentripetalAcceleration({
  acceleration,
  velocity,
  radius,
  solveFor,
}: CentripetalAccelerationInput): CalculationResult<CentripetalAccelerationDetails> {
  let calculatedAcceleration = acceleration;
  let calculatedVelocity = velocity;
  let calculatedRadius = radius;

  switch (solveFor) {
    case "acceleration": {
      calculatedVelocity = requirePositiveValue(
        velocity,
        "velocity",
      );

      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedAcceleration =
        calculatedVelocity ** 2 /
        calculatedRadius;
      break;
    }

    case "velocity": {
      calculatedAcceleration =
        requirePositiveValue(
          acceleration,
          "acceleration",
        );

      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedVelocity = Math.sqrt(
        calculatedAcceleration *
          calculatedRadius,
      );
      break;
    }

    case "radius": {
      calculatedAcceleration =
        requirePositiveValue(
          acceleration,
          "acceleration",
        );

      calculatedVelocity = requirePositiveValue(
        velocity,
        "velocity",
      );

      calculatedRadius =
        calculatedVelocity ** 2 /
        calculatedAcceleration;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported centripetal acceleration variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    acceleration: calculatedAcceleration,
    velocity: calculatedVelocity,
    radius: calculatedRadius,
  }[solveFor];

  if (
    calculatedAcceleration === undefined ||
    calculatedVelocity === undefined ||
    calculatedRadius === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The centripetal acceleration calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      acceleration:
        calculatedAcceleration,
      velocity: calculatedVelocity,
      radius: calculatedRadius,
      solvedVariable: solveFor,
      formula: "ac = v² ÷ r",
    },
  };
}
