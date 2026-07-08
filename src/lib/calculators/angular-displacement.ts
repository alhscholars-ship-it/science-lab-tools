import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type AngularDisplacementVariable =
  | "angularDisplacement"
  | "angularVelocity"
  | "time";

export type AngularDisplacementInput = {
  angularDisplacement?: number;
  angularVelocity?: number;
  time?: number;
  solveFor: AngularDisplacementVariable;
};

export type AngularDisplacementDetails = {
  angularDisplacement: number;
  angularVelocity: number;
  time: number;
  solvedVariable: AngularDisplacementVariable;
  formula: string;
};

const variableLabels: Record<
  AngularDisplacementVariable,
  string
> = {
  angularDisplacement: "Angular displacement",
  angularVelocity: "Angular velocity",
  time: "Time",
};

function requirePositiveValue(
  value: number | undefined,
  variable: AngularDisplacementVariable,
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

export function calculateAngularDisplacement({
  angularDisplacement,
  angularVelocity,
  time,
  solveFor,
}: AngularDisplacementInput): CalculationResult<AngularDisplacementDetails> {
  let calculatedAngularDisplacement =
    angularDisplacement;
  let calculatedAngularVelocity =
    angularVelocity;
  let calculatedTime = time;
  let formula = "θ = ωt";

  switch (solveFor) {
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

      formula = "θ = ωt";
      break;
    }

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

      formula = "ω = θ / t";
      break;
    }

    case "time": {
      calculatedAngularDisplacement =
        requirePositiveValue(
          angularDisplacement,
          "angularDisplacement",
        );

      calculatedAngularVelocity =
        requirePositiveValue(
          angularVelocity,
          "angularVelocity",
        );

      calculatedTime =
        calculatedAngularDisplacement /
        calculatedAngularVelocity;

      formula = "t = θ / ω";
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported angular displacement variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    angularDisplacement:
      calculatedAngularDisplacement,
    angularVelocity:
      calculatedAngularVelocity,
    time: calculatedTime,
  }[solveFor];

  if (
    calculatedAngularDisplacement === undefined ||
    calculatedAngularVelocity === undefined ||
    calculatedTime === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The angular displacement calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      angularDisplacement:
        calculatedAngularDisplacement,
      angularVelocity:
        calculatedAngularVelocity,
      time: calculatedTime,
      solvedVariable: solveFor,
      formula,
    },
  };
}
