import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RotationalPowerVariable =
  | "power"
  | "torque"
  | "angularVelocity";

export type RotationalPowerInput = {
  power?: number;
  torque?: number;
  angularVelocity?: number;
  solveFor: RotationalPowerVariable;
};

export type RotationalPowerDetails = {
  power: number;
  torque: number;
  angularVelocity: number;
  solvedVariable: RotationalPowerVariable;
  formula: string;
};

const variableLabels: Record<
  RotationalPowerVariable,
  string
> = {
  power: "Power",
  torque: "Torque",
  angularVelocity: "Angular velocity",
};

function requireFiniteValue(
  value: number | undefined,
  variable: RotationalPowerVariable,
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
  variable: RotationalPowerVariable,
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

export function calculateRotationalPower({
  power,
  torque,
  angularVelocity,
  solveFor,
}: RotationalPowerInput): CalculationResult<RotationalPowerDetails> {
  let calculatedPower = power;
  let calculatedTorque = torque;
  let calculatedAngularVelocity =
    angularVelocity;

  switch (solveFor) {
    case "power": {
      calculatedTorque = requirePositiveValue(
        torque,
        "torque",
      );

      calculatedAngularVelocity =
        requirePositiveValue(
          angularVelocity,
          "angularVelocity",
        );

      calculatedPower =
        calculatedTorque *
        calculatedAngularVelocity;
      break;
    }

    case "torque": {
      calculatedPower = requirePositiveValue(
        power,
        "power",
      );

      calculatedAngularVelocity =
        requirePositiveValue(
          angularVelocity,
          "angularVelocity",
        );

      calculatedTorque =
        calculatedPower /
        calculatedAngularVelocity;
      break;
    }

    case "angularVelocity": {
      calculatedPower = requirePositiveValue(
        power,
        "power",
      );

      calculatedTorque = requirePositiveValue(
        torque,
        "torque",
      );

      calculatedAngularVelocity =
        calculatedPower /
        calculatedTorque;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported rotational power variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    power: calculatedPower,
    torque: calculatedTorque,
    angularVelocity:
      calculatedAngularVelocity,
  }[solveFor];

  if (
    calculatedPower === undefined ||
    calculatedTorque === undefined ||
    calculatedAngularVelocity === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The rotational power calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      power: calculatedPower,
      torque: calculatedTorque,
      angularVelocity:
        calculatedAngularVelocity,
      solvedVariable: solveFor,
      formula: "P = τω",
    },
  };
}
