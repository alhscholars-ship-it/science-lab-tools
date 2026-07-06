import { describe, expect, it } from "vitest";

import { calculateCoefficientOfVariation } from "../coefficient-variation";

describe("calculateCoefficientOfVariation", () => {
  it("calculates population coefficient of variation", () => {
    const result = calculateCoefficientOfVariation(
      [2, 4, 4, 4, 5, 5, 7, 9],
      "population",
    );

    expect(result.mean).toBe(5);
    expect(result.standardDeviation).toBe(2);
    expect(result.coefficientOfVariation).toBe(40);
    expect(
      result.formattedCoefficientOfVariation,
    ).toBe("40%");
  });

  it("calculates sample coefficient of variation", () => {
    const result = calculateCoefficientOfVariation(
      [10, 12, 14],
      "sample",
    );

    expect(result.mean).toBe(12);
    expect(result.standardDeviation).toBe(2);
    expect(result.coefficientOfVariation).toBeCloseTo(
      16.6666666667,
      10,
    );
  });

  it("uses the absolute mean for negative datasets", () => {
    const result = calculateCoefficientOfVariation(
      [-10, -12, -14],
      "sample",
    );

    expect(result.mean).toBe(-12);
    expect(result.coefficientOfVariation).toBeCloseTo(
      16.6666666667,
      10,
    );
  });

  it("returns zero variation for identical values", () => {
    const result = calculateCoefficientOfVariation(
      [8, 8, 8],
      "sample",
    );

    expect(result.standardDeviation).toBe(0);
    expect(result.coefficientOfVariation).toBe(0);
  });

  it("supports one value for population variation", () => {
    const result = calculateCoefficientOfVariation(
      [5],
      "population",
    );

    expect(result.standardDeviation).toBe(0);
    expect(result.coefficientOfVariation).toBe(0);
  });

  it("rejects one value for sample variation", () => {
    expect(() =>
      calculateCoefficientOfVariation(
        [5],
        "sample",
      ),
    ).toThrow(
      "Sample coefficient of variation requires at least two values.",
    );
  });

  it("rejects a zero mean", () => {
    expect(() =>
      calculateCoefficientOfVariation(
        [-1, 0, 1],
        "population",
      ),
    ).toThrow(
      "Coefficient of variation is undefined when the mean is zero.",
    );
  });

  it("rejects an empty dataset", () => {
    expect(() =>
      calculateCoefficientOfVariation(
        [],
        "population",
      ),
    ).toThrow(
      "Dataset must contain at least one value.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateCoefficientOfVariation(
        [1, Number.NaN, 3],
        "population",
      ),
    ).toThrow(
      "Every dataset value must be a finite number.",
    );
  });

  it("rejects an invalid method", () => {
    expect(() =>
      calculateCoefficientOfVariation(
        [1, 2, 3],
        "invalid" as "sample",
      ),
    ).toThrow(
      "Variation method must be sample or population.",
    );
  });
});
