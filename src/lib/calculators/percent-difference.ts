import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type PercentDifferenceInput = {
  firstValue: number;
  secondValue: number;
};

export type PercentDifferenceDetails = {
  absoluteDifference: number;
  averageMagnitude: number;
  firstValue: number;
  secondValue: number;
  formula: string;
};

export function calculatePercentDifference({
  firstValue,
  secondValue,
}: PercentDifferenceInput): CalculationResult<PercentDifferenceDetails> {
  if (!Number.isFinite(firstValue)) {
    throw new Error("First value must be a finite number.");
  }

  if (!Number.isFinite(secondValue)) {
    throw new Error("Second value must be a finite number.");
  }

  const absoluteDifference = Math.abs(firstValue - secondValue);
  const averageMagnitude =
    (Math.abs(firstValue) + Math.abs(secondValue)) / 2;

  if (averageMagnitude === 0) {
    throw new Error(
      "Percent difference is undefined when both values are zero.",
    );
  }

  const percentDifference =
    (absoluteDifference / averageMagnitude) * 100;

  return {
    value: percentDifference,
    formattedValue: `${formatCalculatedNumber(percentDifference)}%`,
    details: {
      absoluteDifference,
      averageMagnitude,
      firstValue,
      secondValue,
      formula:
        "|value 1 − value 2| ÷ ((|value 1| + |value 2|) ÷ 2) × 100",
    },
  };
}
