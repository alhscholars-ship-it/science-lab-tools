import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RotationalFrequencyVariable =
  | "frequency"
  | "angularVelocity"
  | "period";

export type RotationalFrequencyInput = {
  frequency?: number;
  angularVelocity?: number;
  period?: number;
  solveFor: RotationalFrequencyVariable;
};

export type RotationalFrequencyDetails = {
  frequency: number;
  angularVelocity: number;
  period: number;
  solvedVariable: RotationalFrequencyVariable;
  formula: string;
};

const variableLabels: Record<
  RotationalFrequencyVariable,
  string
> = {
  frequency: "Rotational frequency",
  angularVelocity: "Angular velocity",
  period: "Rotation period",
};

function requirePositiveValue(
  value: number | undefined,
  variable: RotationalFrequencyVariable,
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

export function calculateRotationalFrequency({
  frequency,
  angularVelocity,
  period,
  solveFor,
}: RotationalFrequencyInput): CalculationResult<RotationalFrequencyDetails> {
  let calculatedFrequency = frequency;
  let calculatedAngularVelocity = angularVelocity;
  let calculatedPeriod = period;

  switch (solveFor) {
    case "frequency": {
      if (angularVelocity !== undefined) {
        calculatedAngularVelocity =
          requirePositiveValue(
            angularVelocity,
            "angularVelocity",
          );

        calculatedFrequency =
          calculatedAngularVelocity /
          (2 * Math.PI);

        calculatedPeriod =
          1 / calculatedFrequency;
      } else {
        calculatedPeriod = requirePositiveValue(
          period,
          "period",
        );

        calculatedFrequency =
          1 / calculatedPeriod;

        calculatedAngularVelocity =
          2 * Math.PI * calculatedFrequency;
      }

      break;
    }

    case "angularVelocity": {
      calculatedFrequency =
        requirePositiveValue(
          frequency,
          "frequency",
        );

      calculatedAngularVelocity =
        2 * Math.PI * calculatedFrequency;

      calculatedPeriod =
        1 / calculatedFrequency;
      break;
    }

    case "period": {
      calculatedFrequency =
        requirePositiveValue(
          frequency,
          "frequency",
        );

      calculatedPeriod =
        1 / calculatedFrequency;

      calculatedAngularVelocity =
        2 * Math.PI * calculatedFrequency;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported rotational frequency variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    frequency: calculatedFrequency,
    angularVelocity:
      calculatedAngularVelocity,
    period: calculatedPeriod,
  }[solveFor];

  if (
    calculatedFrequency === undefined ||
    calculatedAngularVelocity === undefined ||
    calculatedPeriod === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The rotational frequency calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      frequency: calculatedFrequency,
      angularVelocity:
        calculatedAngularVelocity,
      period: calculatedPeriod,
      solvedVariable: solveFor,
      formula: "f = ω / 2π",
    },
  };
}
