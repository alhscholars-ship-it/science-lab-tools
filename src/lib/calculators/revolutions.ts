import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RevolutionsVariable =
  | "revolutions"
  | "frequency"
  | "time"
  | "angularDisplacement";

export type RevolutionsSource =
  | "frequencyAndTime"
  | "angularDisplacement";

export type RevolutionsInput = {
  revolutions?: number;
  frequency?: number;
  time?: number;
  angularDisplacement?: number;
  solveFor: RevolutionsVariable;
  source?: RevolutionsSource;
};

export type RevolutionsDetails = {
  revolutions: number;
  frequency?: number;
  time?: number;
  angularDisplacement: number;
  solvedVariable: RevolutionsVariable;
  formula: string;
};

const variableLabels: Record<
  RevolutionsVariable,
  string
> = {
  revolutions: "Number of revolutions",
  frequency: "Rotational frequency",
  time: "Time",
  angularDisplacement: "Angular displacement",
};

function requirePositiveValue(
  value: number | undefined,
  variable: RevolutionsVariable,
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

export function calculateRevolutions({
  revolutions,
  frequency,
  time,
  angularDisplacement,
  solveFor,
  source = "frequencyAndTime",
}: RevolutionsInput): CalculationResult<RevolutionsDetails> {
  let calculatedRevolutions = revolutions;
  let calculatedFrequency = frequency;
  let calculatedTime = time;
  let calculatedAngularDisplacement =
    angularDisplacement;
  let formula = "N = ft";

  switch (solveFor) {
    case "revolutions": {
      if (source === "angularDisplacement") {
        calculatedAngularDisplacement =
          requirePositiveValue(
            angularDisplacement,
            "angularDisplacement",
          );

        calculatedRevolutions =
          calculatedAngularDisplacement /
          (2 * Math.PI);

        formula = "N = θ / 2π";
      } else {
        calculatedFrequency =
          requirePositiveValue(
            frequency,
            "frequency",
          );

        calculatedTime = requirePositiveValue(
          time,
          "time",
        );

        calculatedRevolutions =
          calculatedFrequency * calculatedTime;

        calculatedAngularDisplacement =
          2 * Math.PI * calculatedRevolutions;
      }

      break;
    }

    case "frequency": {
      calculatedRevolutions =
        requirePositiveValue(
          revolutions,
          "revolutions",
        );

      calculatedTime = requirePositiveValue(
        time,
        "time",
      );

      calculatedFrequency =
        calculatedRevolutions / calculatedTime;

      calculatedAngularDisplacement =
        2 * Math.PI * calculatedRevolutions;

      formula = "f = N / t";
      break;
    }

    case "time": {
      calculatedRevolutions =
        requirePositiveValue(
          revolutions,
          "revolutions",
        );

      calculatedFrequency =
        requirePositiveValue(
          frequency,
          "frequency",
        );

      calculatedTime =
        calculatedRevolutions /
        calculatedFrequency;

      calculatedAngularDisplacement =
        2 * Math.PI * calculatedRevolutions;

      formula = "t = N / f";
      break;
    }

    case "angularDisplacement": {
      calculatedRevolutions =
        requirePositiveValue(
          revolutions,
          "revolutions",
        );

      calculatedAngularDisplacement =
        2 * Math.PI * calculatedRevolutions;

      formula = "θ = 2πN";
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported revolutions variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    revolutions: calculatedRevolutions,
    frequency: calculatedFrequency,
    time: calculatedTime,
    angularDisplacement:
      calculatedAngularDisplacement,
  }[solveFor];

  if (
    calculatedRevolutions === undefined ||
    calculatedAngularDisplacement === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The revolutions calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      revolutions: calculatedRevolutions,
      frequency: calculatedFrequency,
      time: calculatedTime,
      angularDisplacement:
        calculatedAngularDisplacement,
      solvedVariable: solveFor,
      formula,
    },
  };
}
