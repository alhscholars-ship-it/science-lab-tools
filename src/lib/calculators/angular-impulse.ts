import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type AngularImpulseVariable =
  | "angularImpulse"
  | "torque"
  | "time";

export type AngularImpulseInput = {
  angularImpulse?: number;
  torque?: number;
  time?: number;
  solveFor: AngularImpulseVariable;
};

export type AngularImpulseDetails = {
  angularImpulse: number;
  torque: number;
  time: number;
  solvedVariable: AngularImpulseVariable;
  formula: string;
};

const variableLabels: Record<
  AngularImpulseVariable,
  string
> = {
  angularImpulse: "Angular impulse",
  torque: "Torque",
  time: "Time",
};

function requirePositiveValue(
  value: number | undefined,
  variable: AngularImpulseVariable,
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

export function calculateAngularImpulse({
  angularImpulse,
  torque,
  time,
  solveFor,
}: AngularImpulseInput): CalculationResult<AngularImpulseDetails> {
  let calculatedAngularImpulse =
    angularImpulse;
  let calculatedTorque = torque;
  let calculatedTime = time;

  switch (solveFor) {
    case "angularImpulse": {
      calculatedTorque = requirePositiveValue(
        torque,
        "torque",
      );
      calculatedTime = requirePositiveValue(
        time,
        "time",
      );
      calculatedAngularImpulse =
        calculatedTorque * calculatedTime;
      break;
    }

    case "torque": {
      calculatedAngularImpulse =
        requirePositiveValue(
          angularImpulse,
          "angularImpulse",
        );
      calculatedTime = requirePositiveValue(
        time,
        "time",
      );
      calculatedTorque =
        calculatedAngularImpulse /
        calculatedTime;
      break;
    }

    case "time": {
      calculatedAngularImpulse =
        requirePositiveValue(
          angularImpulse,
          "angularImpulse",
        );
      calculatedTorque =
        requirePositiveValue(
          torque,
          "torque",
        );
      calculatedTime =
        calculatedAngularImpulse /
        calculatedTorque;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported angular impulse variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    angularImpulse:
      calculatedAngularImpulse,
    torque: calculatedTorque,
    time: calculatedTime,
  }[solveFor];

  if (
    calculatedAngularImpulse === undefined ||
    calculatedTorque === undefined ||
    calculatedTime === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The angular impulse calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      angularImpulse:
        calculatedAngularImpulse,
      torque: calculatedTorque,
      time: calculatedTime,
      solvedVariable: solveFor,
      formula: "J = τt = ΔL",
    },
  };
}
