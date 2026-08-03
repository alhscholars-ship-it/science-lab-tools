import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type PercentYieldInput = {
  actualYield: number;
  theoreticalYield: number;
};

export type PercentYieldDetails = {
  actualYield: number;
  theoreticalYield: number;
  yieldRatio: number;
  isOverTheoretical: boolean;
  formula: string;
};

export function calculatePercentYield({
  actualYield,
  theoreticalYield,
}: PercentYieldInput): CalculationResult<PercentYieldDetails> {
  if (!Number.isFinite(actualYield)) {
    throw new Error(
      "Actual yield must be a finite number.",
    );
  }

  if (!Number.isFinite(theoreticalYield)) {
    throw new Error(
      "Theoretical yield must be a finite number.",
    );
  }

  if (actualYield < 0) {
    throw new Error(
      "Actual yield cannot be negative.",
    );
  }

  if (theoreticalYield <= 0) {
    throw new Error(
      "Theoretical yield must be greater than zero.",
    );
  }

  const yieldRatio =
    actualYield / theoreticalYield;

  const percentYield = yieldRatio * 100;

  if (!Number.isFinite(percentYield)) {
    throw new Error(
      "The percent-yield calculation could not be completed.",
    );
  }

  return {
    value: percentYield,
    formattedValue:
      `${formatCalculatedNumber(percentYield)}%`,
    details: {
      actualYield,
      theoreticalYield,
      yieldRatio,
      isOverTheoretical:
        actualYield > theoreticalYield,
      formula:
        "actual yield ÷ theoretical yield × 100",
    },
  };
}
