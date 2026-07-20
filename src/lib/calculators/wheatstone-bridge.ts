import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type WheatstoneBridgeMode =
  | "unknownResistance"
  | "outputVoltage"
  | "balanceCheck";

export type WheatstoneBridgeInput = {
  mode: WheatstoneBridgeMode;
  supplyVoltage?: number;
  resistanceOne: number;
  resistanceTwo: number;
  resistanceThree: number;
  unknownResistance?: number;
};

export type WheatstoneBridgeDetails = {
  mode: WheatstoneBridgeMode;
  supplyVoltage?: number;
  resistanceOne: number;
  resistanceTwo: number;
  resistanceThree: number;
  unknownResistance: number;
  leftDividerVoltage?: number;
  rightDividerVoltage?: number;
  outputVoltage?: number;
  leftRatio: number;
  rightRatio: number;
  balanceDifference: number;
  isBalanced: boolean;
  formula: string;
  substitution: string;
};

const BALANCE_TOLERANCE = 1e-9;

function requirePositiveFiniteValue(
  value: number | undefined,
  label: string,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value) ||
    value <= 0
  ) {
    throw new Error(`${label} must be greater than zero.`);
  }

  return value;
}

function calculateUnknownResistance(
  resistanceOne: number,
  resistanceTwo: number,
  resistanceThree: number,
): number {
  return (
    resistanceTwo *
    resistanceThree /
    resistanceOne
  );
}

export function calculateWheatstoneBridge({
  mode,
  supplyVoltage,
  resistanceOne,
  resistanceTwo,
  resistanceThree,
  unknownResistance,
}: WheatstoneBridgeInput): CalculationResult<WheatstoneBridgeDetails> {
  const r1 = requirePositiveFiniteValue(
    resistanceOne,
    "Resistance R1",
  );

  const r2 = requirePositiveFiniteValue(
    resistanceTwo,
    "Resistance R2",
  );

  const r3 = requirePositiveFiniteValue(
    resistanceThree,
    "Resistance R3",
  );

  let rx: number;
  let calculatedSupplyVoltage: number | undefined;
  let leftDividerVoltage: number | undefined;
  let rightDividerVoltage: number | undefined;
  let outputVoltage: number | undefined;
  let formula = "";
  let substitution = "";
  let solvedValue: number;

  switch (mode) {
    case "unknownResistance": {
      rx = calculateUnknownResistance(r1, r2, r3);
      solvedValue = rx;

      formula = "Rx = (R2 × R3) ÷ R1";
      substitution =
        `Rx = (${r2} × ${r3}) ÷ ${r1}`;

      break;
    }

    case "outputVoltage": {
      calculatedSupplyVoltage =
        requirePositiveFiniteValue(
          supplyVoltage,
          "Supply voltage",
        );

      rx = requirePositiveFiniteValue(
        unknownResistance,
        "Unknown resistance Rx",
      );

      leftDividerVoltage =
        calculatedSupplyVoltage *
        (r2 / (r1 + r2));

      rightDividerVoltage =
        calculatedSupplyVoltage *
        (rx / (r3 + rx));

      outputVoltage =
        leftDividerVoltage -
        rightDividerVoltage;

      solvedValue = outputVoltage;

      formula =
        "Vout = Vs × [R2 ÷ (R1 + R2) − Rx ÷ (R3 + Rx)]";

      substitution =
        `Vout = ${calculatedSupplyVoltage} × ` +
        `[${r2} ÷ (${r1} + ${r2}) − ` +
        `${rx} ÷ (${r3} + ${rx})]`;

      break;
    }

    case "balanceCheck": {
      rx = requirePositiveFiniteValue(
        unknownResistance,
        "Unknown resistance Rx",
      );

      const leftRatio = r1 / r2;
      const rightRatio = r3 / rx;
      const balanceDifference =
        Math.abs(leftRatio - rightRatio);

      solvedValue =
        balanceDifference <= BALANCE_TOLERANCE
          ? 1
          : 0;

      formula = "R1 ÷ R2 = R3 ÷ Rx";
      substitution =
        `${r1} ÷ ${r2} compared with ` +
        `${r3} ÷ ${rx}`;

      break;
    }

    default: {
      const exhaustiveCheck: never = mode;

      throw new Error(
        `Unsupported Wheatstone bridge mode: ${exhaustiveCheck}`,
      );
    }
  }

  if (!Number.isFinite(rx) || rx <= 0) {
    throw new Error(
      "The Wheatstone bridge calculation could not be completed.",
    );
  }

  const leftRatio = r1 / r2;
  const rightRatio = r3 / rx;
  const balanceDifference =
    Math.abs(leftRatio - rightRatio);

  const isBalanced =
    balanceDifference <= BALANCE_TOLERANCE;

  return {
    value: solvedValue,
    formattedValue:
      mode === "balanceCheck"
        ? isBalanced
          ? "Balanced"
          : "Unbalanced"
        : formatCalculatedNumber(solvedValue),
    details: {
      mode,
      supplyVoltage: calculatedSupplyVoltage,
      resistanceOne: r1,
      resistanceTwo: r2,
      resistanceThree: r3,
      unknownResistance: rx,
      leftDividerVoltage,
      rightDividerVoltage,
      outputVoltage,
      leftRatio,
      rightRatio,
      balanceDifference,
      isBalanced,
      formula,
      substitution,
    },
  };
}
