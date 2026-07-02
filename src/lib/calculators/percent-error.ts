import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type PercentErrorInput = {
  experimentalValue: number;
  acceptedValue: number;
};

export type PercentErrorDetails = {
  absoluteDifference: number;
  experimentalValue: number;
  acceptedValue: number;
  formula: string;
};

export function calculatePercentError({
  experimentalValue,
  acceptedValue,
}: PercentErrorInput): CalculationResult<PercentErrorDetails> {
  if (!Number.isFinite(experimentalValue)) {
    throw new Error("Experimental value must be a finite number.");
  }

  if (!Number.isFinite(acceptedValue)) {
    throw new Error("Accepted value must be a finite number.");
  }

  if (acceptedValue === 0) {
    throw new Error("Accepted value cannot be zero.");
  }

  const absoluteDifference = Math.abs(experimentalValue - acceptedValue);
  const percentError = (absoluteDifference / Math.abs(acceptedValue)) * 100;

  return {
    value: percentError,
    formattedValue: `${formatCalculatedNumber(percentError)}%`,
    details: {
      absoluteDifference,
      experimentalValue,
      acceptedValue,
      formula:
        "|experimental value − accepted value| ÷ |accepted value| × 100",
    },
  };
}
