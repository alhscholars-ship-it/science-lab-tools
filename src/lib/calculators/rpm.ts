import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RpmVariable =
  | "rpm"
  | "frequency"
  | "angularVelocity";

export type RpmInput = {
  rpm?: number;
  frequency?: number;
  angularVelocity?: number;
  solveFor: RpmVariable;
};

export type RpmDetails = {
  rpm: number;
  frequency: number;
  angularVelocity: number;
  solvedVariable: RpmVariable;
  formula: string;
};

const variableLabels: Record<RpmVariable, string> = {
  rpm: "Rotational speed",
  frequency: "Rotational frequency",
  angularVelocity: "Angular velocity",
};

function requirePositiveValue(
  value: number | undefined,
  variable: RpmVariable,
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

export function calculateRpm({
  rpm,
  frequency,
  angularVelocity,
  solveFor,
}: RpmInput): CalculationResult<RpmDetails> {
  let calculatedRpm = rpm;
  let calculatedFrequency = frequency;
  let calculatedAngularVelocity = angularVelocity;

  switch (solveFor) {
    case "rpm": {
      if (frequency !== undefined) {
        calculatedFrequency = requirePositiveValue(
          frequency,
          "frequency",
        );

        calculatedRpm =
          calculatedFrequency * 60;

        calculatedAngularVelocity =
          2 * Math.PI * calculatedFrequency;
      } else {
        calculatedAngularVelocity =
          requirePositiveValue(
            angularVelocity,
            "angularVelocity",
          );

        calculatedFrequency =
          calculatedAngularVelocity /
          (2 * Math.PI);

        calculatedRpm =
          calculatedFrequency * 60;
      }

      break;
    }

    case "frequency": {
      calculatedRpm = requirePositiveValue(
        rpm,
        "rpm",
      );

      calculatedFrequency =
        calculatedRpm / 60;

      calculatedAngularVelocity =
        2 * Math.PI * calculatedFrequency;
      break;
    }

    case "angularVelocity": {
      calculatedRpm = requirePositiveValue(
        rpm,
        "rpm",
      );

      calculatedFrequency =
        calculatedRpm / 60;

      calculatedAngularVelocity =
        2 * Math.PI * calculatedFrequency;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported RPM variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    rpm: calculatedRpm,
    frequency: calculatedFrequency,
    angularVelocity:
      calculatedAngularVelocity,
  }[solveFor];

  if (
    calculatedRpm === undefined ||
    calculatedFrequency === undefined ||
    calculatedAngularVelocity === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The RPM calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      rpm: calculatedRpm,
      frequency: calculatedFrequency,
      angularVelocity:
        calculatedAngularVelocity,
      solvedVariable: solveFor,
      formula: "RPM = 60f",
    },
  };
}
