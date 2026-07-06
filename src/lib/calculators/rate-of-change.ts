import { formatCalculatedNumber } from "./number-format";

export type ChangeDirection =
  | "increase"
  | "decrease"
  | "no change";

export type RateOfChangeInput = {
  initialValue: number;
  finalValue: number;
  initialIndependentValue: number;
  finalIndependentValue: number;
};

export type RateOfChangeResult = {
  initialValue: number;
  finalValue: number;
  initialIndependentValue: number;
  finalIndependentValue: number;
  absoluteChange: number;
  intervalChange: number;
  averageRateOfChange: number;
  percentageChange: number | null;
  direction: ChangeDirection;
  formattedAbsoluteChange: string;
  formattedIntervalChange: string;
  formattedAverageRateOfChange: string;
  formattedPercentageChange: string;
};

export function calculateRateOfChange({
  initialValue,
  finalValue,
  initialIndependentValue,
  finalIndependentValue,
}: RateOfChangeInput): RateOfChangeResult {
  const inputs = [
    ["Initial value", initialValue],
    ["Final value", finalValue],
    [
      "Initial independent value",
      initialIndependentValue,
    ],
    [
      "Final independent value",
      finalIndependentValue,
    ],
  ] as const;

  for (const [label, value] of inputs) {
    if (!Number.isFinite(value)) {
      throw new Error(
        `${label} must be a finite number.`,
      );
    }
  }

  const absoluteChange =
    finalValue - initialValue;

  const intervalChange =
    finalIndependentValue -
    initialIndependentValue;

  if (intervalChange === 0) {
    throw new Error(
      "The independent-variable interval cannot be zero.",
    );
  }

  const averageRateOfChange =
    absoluteChange / intervalChange;

  const percentageChange =
    initialValue === 0
      ? null
      : (absoluteChange /
          Math.abs(initialValue)) *
        100;

  const direction: ChangeDirection =
    absoluteChange > 0
      ? "increase"
      : absoluteChange < 0
        ? "decrease"
        : "no change";

  return {
    initialValue,
    finalValue,
    initialIndependentValue,
    finalIndependentValue,
    absoluteChange,
    intervalChange,
    averageRateOfChange,
    percentageChange,
    direction,
    formattedAbsoluteChange:
      formatCalculatedNumber(absoluteChange),
    formattedIntervalChange:
      formatCalculatedNumber(intervalChange),
    formattedAverageRateOfChange:
      formatCalculatedNumber(
        averageRateOfChange,
      ),
    formattedPercentageChange:
      percentageChange === null
        ? "Undefined"
        : `${formatCalculatedNumber(
            percentageChange,
          )}%`,
  };
}
