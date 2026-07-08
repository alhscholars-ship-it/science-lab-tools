import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type AngularAccelerationVariable =
  | "angularAcceleration"
  | "angularVelocityChange"
  | "time";

export type AngularAccelerationInput = {
  angularAcceleration?: number;
  angularVelocityChange?: number;
  time?: number;
  solveFor: AngularAccelerationVariable;
};

export type AngularAccelerationDetails = {
  angularAcceleration: number;
  angularVelocityChange: number;
  time: number;
  solvedVariable: AngularAccelerationVariable;
  formula: string;
};

const variableLabels: Record<
  AngularAccelerationVariable,
  string
> = {
  angularAcceleration: "Angular acceleration",
  angularVelocityChange: "Angular velocity change",
  time: "Time",
};

function requireFiniteValue(
  value: number | undefined,
  variable: AngularAccelerationVariable,
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
  variable: AngularAccelerationVariable,
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

export function calculateAngularAcceleration({
  angularAcceleration,
  angularVelocityChange,
  time,
  solveFor,
}: AngularAccelerationInput): CalculationResult<AngularAccelerationDetails> {
  let calculatedAngularAcceleration =
    angularAcceleration;
  let calculatedAngularVelocityChange =
    angularVelocityChange;
  let calculatedTime = time;

  switch (solveFor) {
    case "angularAcceleration": {
      calculatedAngularVelocityChange =
        requirePositiveValue(
          angularVelocityChange,
          "angularVelocityChange",
        );

      calculatedTime = requirePositiveValue(
        time,
        "time",
      );

      calculatedAngularAcceleration =
        calculatedAngularVelocityChange /
        calculatedTime;
      break;
    }

    case "angularVelocityChange": {
      calculatedAngularAcceleration =
        requirePositiveValue(
          angularAcceleration,
          "angularAcceleration",
        );

      calculatedTime = requirePositiveValue(
        time,
        "time",
      );

      calculatedAngularVelocityChange =
        calculatedAngularAcceleration *
        calculatedTime;
      break;
    }

    case "time": {
      calculatedAngularAcceleration =
        requirePositiveValue(
          angularAcceleration,
          "angularAcceleration",
        );

      calculatedAngularVelocityChange =
        requirePositiveValue(
          angularVelocityChange,
          "angularVelocityChange",
        );

      calculatedTime =
        calculatedAngularVelocityChange /
        calculatedAngularAcceleration;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported angular acceleration variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    angularAcceleration:
      calculatedAngularAcceleration,
    angularVelocityChange:
      calculatedAngularVelocityChange,
    time: calculatedTime,
  }[solveFor];

  if (
    calculatedAngularAcceleration === undefined ||
    calculatedAngularVelocityChange === undefined ||
    calculatedTime === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The angular acceleration calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      angularAcceleration:
        calculatedAngularAcceleration,
      angularVelocityChange:
        calculatedAngularVelocityChange,
      time: calculatedTime,
      solvedVariable: solveFor,
      formula: "α = Δω ÷ t",
    },
  };
}
