import { describe, expect, it } from "vitest";

import { calculateMeasurementUncertainty } from "../measurement-uncertainty";

describe("calculateMeasurementUncertainty", () => {
  it("calculates absolute, relative, and percentage uncertainty", () => {
    const result =
      calculateMeasurementUncertainty({
        measuredValue: 50,
        absoluteUncertainty: 2,
      });

    expect(result.relativeUncertainty).toBe(0.04);
    expect(result.percentageUncertainty).toBe(4);
    expect(result.minimumValue).toBe(48);
    expect(result.maximumValue).toBe(52);
    expect(result.measurementNotation).toBe(
      "50 ± 2",
    );
  });

  it("supports decimal measurements", () => {
    const result =
      calculateMeasurementUncertainty({
        measuredValue: 12.5,
        absoluteUncertainty: 0.2,
      });

    expect(result.relativeUncertainty).toBeCloseTo(
      0.016,
      12,
    );
    expect(
      result.percentageUncertainty,
    ).toBeCloseTo(1.6, 12);
    expect(result.minimumValue).toBeCloseTo(
      12.3,
      12,
    );
    expect(result.maximumValue).toBeCloseTo(
      12.7,
      12,
    );
  });

  it("uses the absolute measured value for negative measurements", () => {
    const result =
      calculateMeasurementUncertainty({
        measuredValue: -20,
        absoluteUncertainty: 1,
      });

    expect(result.relativeUncertainty).toBe(0.05);
    expect(result.percentageUncertainty).toBe(5);
    expect(result.minimumValue).toBe(-21);
    expect(result.maximumValue).toBe(-19);
  });

  it("supports zero absolute uncertainty", () => {
    const result =
      calculateMeasurementUncertainty({
        measuredValue: 10,
        absoluteUncertainty: 0,
      });

    expect(result.relativeUncertainty).toBe(0);
    expect(result.percentageUncertainty).toBe(0);
    expect(result.minimumValue).toBe(10);
    expect(result.maximumValue).toBe(10);
  });

  it("formats percentage uncertainty", () => {
    const result =
      calculateMeasurementUncertainty({
        measuredValue: 80,
        absoluteUncertainty: 4,
      });

    expect(
      result.formattedPercentageUncertainty,
    ).toBe("5%");
  });

  it("rejects a zero measured value", () => {
    expect(() =>
      calculateMeasurementUncertainty({
        measuredValue: 0,
        absoluteUncertainty: 1,
      }),
    ).toThrow(
      "Measured value cannot be zero when calculating relative uncertainty.",
    );
  });

  it("rejects negative absolute uncertainty", () => {
    expect(() =>
      calculateMeasurementUncertainty({
        measuredValue: 10,
        absoluteUncertainty: -1,
      }),
    ).toThrow(
      "Absolute uncertainty cannot be negative.",
    );
  });

  it("rejects a non-finite measured value", () => {
    expect(() =>
      calculateMeasurementUncertainty({
        measuredValue: Number.NaN,
        absoluteUncertainty: 1,
      }),
    ).toThrow(
      "Measured value must be a finite number.",
    );
  });

  it("rejects a non-finite uncertainty", () => {
    expect(() =>
      calculateMeasurementUncertainty({
        measuredValue: 10,
        absoluteUncertainty: Number.POSITIVE_INFINITY,
      }),
    ).toThrow(
      "Absolute uncertainty must be a finite number.",
    );
  });
});
