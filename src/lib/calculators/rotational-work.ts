import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RotationalWorkVariable =
  | "work"
  | "torque"
  | "angularDisplacement";

export type RotationalWorkInput = {
  work?: number;
  torque?: number;
  angularDisplacement?: number;
  solveFor: RotationalWorkVariable;
};

export type RotationalWorkDetails = {
  work: number;
  torque: number;
  angularDisplacement: number;
  solvedVariable: RotationalWorkVariable;
  formula: string;
};

const variableLabels: Record<
  RotationalWorkVariable,
  string
> = {
  work: "Work",
  torque: "Torque",
  angularDisplacement: "Angular displacement",
};

function requirePositiveValue(
  value: number | undefined,
  variable: RotationalWorkVariable,
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

export function calculateRotationalWork({
  work,
  torque,
  angularDisplacement,
  solveFor,
}: RotationalWorkInput): CalculationResult<RotationalWorkDetails> {
  let calculatedWork = work;
  let calculatedTorque = torque;
  let calculatedAngularDisplacement =
    angularDisplacement;

  switch (solveFor) {
    case "work": {
      calculatedTorque = requirePositiveValue(
        torque,
        "torque",
      );

      calculatedAngularDisplacement =
        requirePositiveValue(
          angularDisplacement,
          "angularDisplacement",
        );

      calculatedWork =
        calculatedTorque *
        calculatedAngularDisplacement;
      break;
    }

    case "torque": {
      calculatedWork = requirePositiveValue(
        work,
        "work",
      );

      calculatedAngularDisplacement =
        requirePositiveValue(
          angularDisplacement,
          "angularDisplacement",
        );

      calculatedTorque =
        calculatedWork /
        calculatedAngularDisplacement;
      break;
    }

    case "angularDisplacement": {
      calculatedWork = requirePositiveValue(
        work,
        "work",
      );

      calculatedTorque = requirePositiveValue(
        torque,
        "torque",
      );

      calculatedAngularDisplacement =
        calculatedWork / calculatedTorque;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported rotational work variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    work: calculatedWork,
    torque: calculatedTorque,
    angularDisplacement:
      calculatedAngularDisplacement,
  }[solveFor];

  if (
    calculatedWork === undefined ||
    calculatedTorque === undefined ||
    calculatedAngularDisplacement === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The rotational work calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      work: calculatedWork,
      torque: calculatedTorque,
      angularDisplacement:
        calculatedAngularDisplacement,
      solvedVariable: solveFor,
      formula: "W = τθ",
    },
  };
}
