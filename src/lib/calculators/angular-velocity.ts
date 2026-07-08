import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type AngularVelocityVariable =
  | "angularVelocity"
  | "angularDisplacement"
  | "time";

export type AngularVelocityInput = {
  angularVelocity?: number;
  angularDisplacement?: number;
  time?: number;
  solveFor: AngularVelocityVariable;
};

export type AngularVelocityDetails = {
  angularVelocity: number;
  angularDisplacement: number;
  time: number;
  solvedVariable: AngularVelocityVariable;
  formula: string;
};

const variableLabels: Record<
  AngularVelocityVariable,
  string
> = {
  angularVelocity: "Angular velocity",
  angularDisplacement: "Angular displacement",
  time: "Time",
};

function requireFiniteValue(
  value: number | undefined,
  variable: AngularVelocityVariable,
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
  variable: AngularVelocityVariable,
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

export function calculateAngularVelocity({
  angularVelocity,
  angularDisplacement,
  time,
  solveFor,
}: AngularVelocityInput): CalculationResult<AngularVelocityDetails> {
  let calculatedAngularVelocity =
    angularVelocity;
  let calculatedAngularDisplacement =
    angularDisplacement;
  let calculatedTime = time;

  switch (solveFor) {
    case "angularVelocity": {
      calculatedAngularDisplacement =
        requirePositiveValue(
          angularDisplacement,
          "angularDisplacement",
        );

      calculatedTime = requirePositiveValue(
        time,
        "time",
      );

      calculatedAngularVelocity =
        calculatedAngularDisplacement /
        calculatedTime;
      break;
    }

    case "angularDisplacement": {
      calculatedAngularVelocity =
        requirePositiveValue(
          angularVelocity,
          "angularVelocity",
        );

      calculatedTime = requirePositiveValue(
        time,
        "time",
      );

      calculatedAngularDisplacement =
        calculatedAngularVelocity *
        calculatedTime;
      break;
    }

    case "time": {
      calculatedAngularVelocity =
        requirePositiveValue(
          angularVelocity,
          "angularVelocity",
        );

      calculatedAngularDisplacement =
        requirePositiveValue(
          angularDisplacement,
          "angularDisplacement",
        );

      calculatedTime =
        calculatedAngularDisplacement /
        calculatedAngularVelocity;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported angular velocity variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    angularVelocity:
      calculatedAngularVelocity,
    angularDisplacement:
      calculatedAngularDisplacement,
    time: calculatedTime,
  }[solveFor];

  if (
    calculatedAngularVelocity === undefined ||
    calculatedAngularDisplacement === undefined ||
    calculatedTime === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The angular velocity calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      angularVelocity:
        calculatedAngularVelocity,
      angularDisplacement:
        calculatedAngularDisplacement,
      time: calculatedTime,
      solvedVariable: solveFor,
      formula: "ω = θ ÷ t",
    },
  };
}
