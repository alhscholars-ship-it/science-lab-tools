import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type PowerVariable =
  | "power"
  | "work"
  | "time";

export type PowerInput = {
  power?: number;
  work?: number;
  time?: number;
  solveFor: PowerVariable;
};

export type PowerDetails = {
  power: number;
  work: number;
  time: number;
  solvedVariable: PowerVariable;
  formula: string;
};

const variableLabels: Record<
  PowerVariable,
  string
> = {
  power: "Power",
  work: "Work",
  time: "Time",
};

function requireFiniteValue(
  value: number | undefined,
  variable: PowerVariable,
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

function requirePositiveTime(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "time",
  );

  if (finiteValue <= 0) {
    throw new Error(
      "Time must be greater than zero.",
    );
  }

  return finiteValue;
}

function requireNonZeroPower(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "power",
  );

  if (finiteValue === 0) {
    throw new Error(
      "Power must not be zero when calculating time.",
    );
  }

  return finiteValue;
}

export function calculatePower({
  power,
  work,
  time,
  solveFor,
}: PowerInput): CalculationResult<PowerDetails> {
  let calculatedPower = power;
  let calculatedWork = work;
  let calculatedTime = time;

  switch (solveFor) {
    case "power": {
      calculatedWork = requireFiniteValue(
        work,
        "work",
      );
      calculatedTime = requirePositiveTime(time);

      calculatedPower =
        calculatedWork / calculatedTime;
      break;
    }

    case "work": {
      calculatedPower = requireFiniteValue(
        power,
        "power",
      );
      calculatedTime = requirePositiveTime(time);

      calculatedWork =
        calculatedPower * calculatedTime;
      break;
    }

    case "time": {
      calculatedWork = requireFiniteValue(
        work,
        "work",
      );
      calculatedPower =
        requireNonZeroPower(power);

      calculatedTime =
        calculatedWork / calculatedPower;

      if (calculatedTime <= 0) {
        throw new Error(
          "Work and power must have matching signs when calculating time.",
        );
      }
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported power variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    power: calculatedPower,
    work: calculatedWork,
    time: calculatedTime,
  }[solveFor];

  if (
    calculatedPower === undefined ||
    calculatedWork === undefined ||
    calculatedTime === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The power calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      power: calculatedPower,
      work: calculatedWork,
      time: calculatedTime,
      solvedVariable: solveFor,
      formula: "P = W ÷ t",
    },
  };
}
