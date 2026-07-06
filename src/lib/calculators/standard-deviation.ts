import { validateDataset } from "./dataset";
import { formatCalculatedNumber } from "./number-format";

export type StandardDeviationDetails = {
  count: number;
  sum: number;
  mean: number;
  minimum: number;
  maximum: number;
  range: number;
  populationVariance: number;
  populationStandardDeviation: number;
  sampleVariance: number | null;
  sampleStandardDeviation: number | null;
};

export type StandardDeviationResult = {
  values: readonly number[];
  formattedMean: string;
  formattedPopulationStandardDeviation: string;
  formattedSampleStandardDeviation: string | null;
  details: StandardDeviationDetails;
};

export function calculateStandardDeviation(
  values: readonly number[],
): StandardDeviationResult {
  validateDataset(values);

  const count = values.length;
  const sum = values.reduce(
    (total, value) => total + value,
    0,
  );
  const mean = sum / count;

  const squaredDifferenceSum = values.reduce(
    (total, value) =>
      total + (value - mean) ** 2,
    0,
  );

  const populationVariance =
    squaredDifferenceSum / count;

  const populationStandardDeviation = Math.sqrt(
    populationVariance,
  );

  const sampleVariance =
    count > 1
      ? squaredDifferenceSum / (count - 1)
      : null;

  const sampleStandardDeviation =
    sampleVariance === null
      ? null
      : Math.sqrt(sampleVariance);

  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const range = maximum - minimum;

  return {
    values: [...values],
    formattedMean: formatCalculatedNumber(mean),
    formattedPopulationStandardDeviation:
      formatCalculatedNumber(
        populationStandardDeviation,
      ),
    formattedSampleStandardDeviation:
      sampleStandardDeviation === null
        ? null
        : formatCalculatedNumber(
            sampleStandardDeviation,
          ),
    details: {
      count,
      sum,
      mean,
      minimum,
      maximum,
      range,
      populationVariance,
      populationStandardDeviation,
      sampleVariance,
      sampleStandardDeviation,
    },
  };
}
