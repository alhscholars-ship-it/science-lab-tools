import { validateDataset } from "./dataset";
import { formatCalculatedNumber } from "./number-format";

export type MeanMedianModeResult = {
  values: readonly number[];
  sortedValues: readonly number[];
  count: number;
  sum: number;
  mean: number;
  median: number;
  modes: readonly number[];
  minimum: number;
  maximum: number;
  range: number;
  formattedMean: string;
  formattedMedian: string;
  formattedModes: readonly string[];
};

export function calculateMeanMedianMode(
  values: readonly number[],
): MeanMedianModeResult {
  validateDataset(values);

  const sortedValues = [...values].sort(
    (first, second) => first - second,
  );

  const count = sortedValues.length;
  const sum = sortedValues.reduce(
    (total, value) => total + value,
    0,
  );
  const mean = sum / count;

  const middleIndex = Math.floor(count / 2);
  const median =
    count % 2 === 0
      ? (
          sortedValues[middleIndex - 1] +
          sortedValues[middleIndex]
        ) / 2
      : sortedValues[middleIndex];

  const frequencies = new Map<number, number>();

  for (const value of sortedValues) {
    frequencies.set(
      value,
      (frequencies.get(value) ?? 0) + 1,
    );
  }

  const highestFrequency = Math.max(
    ...frequencies.values(),
  );

  const modes =
    highestFrequency === 1
      ? []
      : [...frequencies.entries()]
          .filter(
            ([, frequency]) =>
              frequency === highestFrequency,
          )
          .map(([value]) => value)
          .sort((first, second) => first - second);

  const minimum = sortedValues[0];
  const maximum = sortedValues[count - 1];
  const range = maximum - minimum;

  return {
    values: [...values],
    sortedValues,
    count,
    sum,
    mean,
    median,
    modes,
    minimum,
    maximum,
    range,
    formattedMean: formatCalculatedNumber(mean),
    formattedMedian:
      formatCalculatedNumber(median),
    formattedModes: modes.map((mode) =>
      formatCalculatedNumber(mode),
    ),
  };
}
