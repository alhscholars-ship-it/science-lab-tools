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

export function parseDataset(input: string): number[] {
  const normalized = input.trim();

  if (normalized === "") {
    throw new Error("Enter at least one numeric value.");
  }

  const tokens = normalized
    .split(/[\s,;]+/)
    .filter(Boolean);

  const values = tokens.map((token) => {
    const value = Number(token);

    if (!Number.isFinite(value)) {
      throw new Error(`"${token}" is not a valid finite number.`);
    }

    return value;
  });

  if (values.length === 0) {
    throw new Error("Enter at least one numeric value.");
  }

  return values;
}

export function calculateStandardDeviation(
  values: readonly number[],
): StandardDeviationResult {
  if (values.length === 0) {
    throw new Error("Dataset must contain at least one value.");
  }

  for (const value of values) {
    if (!Number.isFinite(value)) {
      throw new Error(
        "Every dataset value must be a finite number.",
      );
    }
  }

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
