import { formatCalculatedNumber } from "./number-format";

export type MeasurementUncertaintyInput = {
  measuredValue: number;
  absoluteUncertainty: number;
};

export type MeasurementUncertaintyResult = {
  measuredValue: number;
  absoluteUncertainty: number;
  relativeUncertainty: number;
  percentageUncertainty: number;
  minimumValue: number;
  maximumValue: number;
  formattedMeasuredValue: string;
  formattedAbsoluteUncertainty: string;
  formattedRelativeUncertainty: string;
  formattedPercentageUncertainty: string;
  formattedMinimumValue: string;
  formattedMaximumValue: string;
  measurementNotation: string;
};

export function calculateMeasurementUncertainty({
  measuredValue,
  absoluteUncertainty,
}: MeasurementUncertaintyInput): MeasurementUncertaintyResult {
  if (!Number.isFinite(measuredValue)) {
    throw new Error(
      "Measured value must be a finite number.",
    );
  }

  if (!Number.isFinite(absoluteUncertainty)) {
    throw new Error(
      "Absolute uncertainty must be a finite number.",
    );
  }

  if (absoluteUncertainty < 0) {
    throw new Error(
      "Absolute uncertainty cannot be negative.",
    );
  }

  if (measuredValue === 0) {
    throw new Error(
      "Measured value cannot be zero when calculating relative uncertainty.",
    );
  }

  const relativeUncertainty =
    absoluteUncertainty / Math.abs(measuredValue);

  const percentageUncertainty =
    relativeUncertainty * 100;

  const minimumValue =
    measuredValue - absoluteUncertainty;

  const maximumValue =
    measuredValue + absoluteUncertainty;

  const formattedMeasuredValue =
    formatCalculatedNumber(measuredValue);

  const formattedAbsoluteUncertainty =
    formatCalculatedNumber(absoluteUncertainty);

  return {
    measuredValue,
    absoluteUncertainty,
    relativeUncertainty,
    percentageUncertainty,
    minimumValue,
    maximumValue,
    formattedMeasuredValue,
    formattedAbsoluteUncertainty,
    formattedRelativeUncertainty:
      formatCalculatedNumber(relativeUncertainty),
    formattedPercentageUncertainty:
      `${formatCalculatedNumber(
        percentageUncertainty,
      )}%`,
    formattedMinimumValue:
      formatCalculatedNumber(minimumValue),
    formattedMaximumValue:
      formatCalculatedNumber(maximumValue),
    measurementNotation:
      `${formattedMeasuredValue} ± ${formattedAbsoluteUncertainty}`,
  };
}
