import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type ImpulseVariable =
  | "impulse"
  | "force"
  | "timeInterval";

export type ImpulseInput = {
  impulse?: number;
  force?: number;
  timeInterval?: number;
  solveFor: ImpulseVariable;
};

export type ImpulseDetails = {
  impulse: number;
  force: number;
  timeInterval: number;
  solvedVariable: ImpulseVariable;
  formula: string;
};

const variableLabels: Record<
  ImpulseVariable,
  string
> = {
  impulse: "Impulse",
  force: "Force",
  timeInterval: "Time interval",
};

function requireFiniteValue(
  value: number | undefined,
  variable: ImpulseVariable,
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
  variable: ImpulseVariable,
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

export function calculateImpulse({
  impulse,
  force,
  timeInterval,
  solveFor,
}: ImpulseInput): CalculationResult<ImpulseDetails> {
  let calculatedImpulse = impulse;
  let calculatedForce = force;
  let calculatedTimeInterval = timeInterval;

  switch (solveFor) {
    case "impulse": {
      calculatedForce = requirePositiveValue(
        force,
        "force",
      );

      calculatedTimeInterval =
        requirePositiveValue(
          timeInterval,
          "timeInterval",
        );

      calculatedImpulse =
        calculatedForce *
        calculatedTimeInterval;
      break;
    }

    case "force": {
      calculatedImpulse = requirePositiveValue(
        impulse,
        "impulse",
      );

      calculatedTimeInterval =
        requirePositiveValue(
          timeInterval,
          "timeInterval",
        );

      calculatedForce =
        calculatedImpulse /
        calculatedTimeInterval;
      break;
    }

    case "timeInterval": {
      calculatedImpulse = requirePositiveValue(
        impulse,
        "impulse",
      );

      calculatedForce = requirePositiveValue(
        force,
        "force",
      );

      calculatedTimeInterval =
        calculatedImpulse /
        calculatedForce;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported impulse variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    impulse: calculatedImpulse,
    force: calculatedForce,
    timeInterval:
      calculatedTimeInterval,
  }[solveFor];

  if (
    calculatedImpulse === undefined ||
    calculatedForce === undefined ||
    calculatedTimeInterval === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The impulse calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      impulse: calculatedImpulse,
      force: calculatedForce,
      timeInterval:
        calculatedTimeInterval,
      solvedVariable: solveFor,
      formula: "J = FΔt",
    },
  };
}
