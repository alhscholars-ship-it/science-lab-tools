import { validateDataset } from "./dataset";
import { formatCalculatedNumber } from "./number-format";

export type VariationMethod = "sample" | "population";

export type CoefficientVariationResult = {
  values: readonly number[];
  method: VariationMethod;
  count: number;
  mean: number;
  standardDeviation: number;
  coefficientOfVariation: number;
  formattedMean: string;
  formattedStandardDeviation: string;
  formattedCoefficientOfVariation: string;
};

export function calculateCoefficientOfVariation(
  values: readonly number[],
  method: VariationMethod,
): CoefficientVariationResult {
  validateDataset(values);

  if (method !== "sample" && method !== "population") {
    throw new Error(
      "Variation method must be sample or population.",
    );
  }

  if (method === "sample" && values.length < 2) {
    throw new Error(
      "Sample coefficient of variation requires at least two values.",
    );
  }

  const count = values.length;
  const mean =
    values.reduce(
      (total, value) => total + value,
      0,
    ) / count;

  if (mean === 0) {
    throw new Error(
      "Coefficient of variation is undefined when the mean is zero.",
    );
  }

  const squaredDifferenceSum = values.reduce(
    (total, value) =>
      total + (value - mean) ** 2,
    0,
  );

  const divisor =
    method === "sample" ? count - 1 : count;

  const standardDeviation = Math.sqrt(
    squaredDifferenceSum / divisor,
  );

  const coefficientOfVariation =
    (standardDeviation / Math.abs(mean)) * 100;

  return {
    values: [...values],
    method,
    count,
    mean,
    standardDeviation,
    coefficientOfVariation,
    formattedMean: formatCalculatedNumber(mean),
    formattedStandardDeviation:
      formatCalculatedNumber(standardDeviation),
    formattedCoefficientOfVariation:
      `${formatCalculatedNumber(
        coefficientOfVariation,
      )}%`,
  };
}
