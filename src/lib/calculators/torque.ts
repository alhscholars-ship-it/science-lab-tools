import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type TorqueVariable =
  | "torque"
  | "force"
  | "leverArm";

export type TorqueInput = {
  torque?: number;
  force?: number;
  leverArm?: number;
  solveFor: TorqueVariable;
};

export type TorqueDetails = {
  torque: number;
  force: number;
  leverArm: number;
  solvedVariable: TorqueVariable;
  formula: string;
};

const variableLabels: Record<
  TorqueVariable,
  string
> = {
  torque: "Torque",
  force: "Force",
  leverArm: "Lever arm",
};

function requireFiniteValue(
  value: number | undefined,
  variable: TorqueVariable,
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
  variable: TorqueVariable,
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

export function calculateTorque({
  torque,
  force,
  leverArm,
  solveFor,
}: TorqueInput): CalculationResult<TorqueDetails> {
  let calculatedTorque = torque;
  let calculatedForce = force;
  let calculatedLeverArm = leverArm;

  switch (solveFor) {
    case "torque": {
      calculatedForce = requirePositiveValue(
        force,
        "force",
      );

      calculatedLeverArm = requirePositiveValue(
        leverArm,
        "leverArm",
      );

      calculatedTorque =
        calculatedForce * calculatedLeverArm;
      break;
    }

    case "force": {
      calculatedTorque = requirePositiveValue(
        torque,
        "torque",
      );

      calculatedLeverArm = requirePositiveValue(
        leverArm,
        "leverArm",
      );

      calculatedForce =
        calculatedTorque / calculatedLeverArm;
      break;
    }

    case "leverArm": {
      calculatedTorque = requirePositiveValue(
        torque,
        "torque",
      );

      calculatedForce = requirePositiveValue(
        force,
        "force",
      );

      calculatedLeverArm =
        calculatedTorque / calculatedForce;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported torque variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    torque: calculatedTorque,
    force: calculatedForce,
    leverArm: calculatedLeverArm,
  }[solveFor];

  if (
    calculatedTorque === undefined ||
    calculatedForce === undefined ||
    calculatedLeverArm === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The torque calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      torque: calculatedTorque,
      force: calculatedForce,
      leverArm: calculatedLeverArm,
      solvedVariable: solveFor,
      formula: "τ = Fr",
    },
  };
}
