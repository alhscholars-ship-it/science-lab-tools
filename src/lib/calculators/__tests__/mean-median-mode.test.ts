import { describe, expect, it } from "vitest";

import { calculateMeanMedianMode } from "../mean-median-mode";

describe("calculateMeanMedianMode", () => {
  it("calculates mean, median, and one mode", () => {
    const result = calculateMeanMedianMode([
      2, 4, 4, 6, 8,
    ]);

    expect(result.count).toBe(5);
    expect(result.sum).toBe(24);
    expect(result.mean).toBe(4.8);
    expect(result.median).toBe(4);
    expect(result.modes).toEqual([4]);
  });

  it("calculates the median for an even dataset", () => {
    const result = calculateMeanMedianMode([
      1, 3, 5, 7,
    ]);

    expect(result.median).toBe(4);
  });

  it("returns multiple modes", () => {
    const result = calculateMeanMedianMode([
      1, 1, 2, 2, 3,
    ]);

    expect(result.modes).toEqual([1, 2]);
  });

  it("returns no mode when every value is unique", () => {
    const result = calculateMeanMedianMode([
      1, 2, 3, 4,
    ]);

    expect(result.modes).toEqual([]);
  });

  it("sorts values without mutating the input", () => {
    const values = [5, 1, 3];

    const result = calculateMeanMedianMode(values);

    expect(values).toEqual([5, 1, 3]);
    expect(result.sortedValues).toEqual([1, 3, 5]);
  });

  it("calculates minimum, maximum, and range", () => {
    const result = calculateMeanMedianMode([
      -4, 3, 8, 10,
    ]);

    expect(result.minimum).toBe(-4);
    expect(result.maximum).toBe(10);
    expect(result.range).toBe(14);
  });

  it("supports decimal values", () => {
    const result = calculateMeanMedianMode([
      1.2, 1.4, 1.4, 1.8,
    ]);

    expect(result.mean).toBeCloseTo(1.45, 10);
    expect(result.median).toBeCloseTo(1.4, 10);
    expect(result.modes).toEqual([1.4]);
  });

  it("supports a single-value dataset", () => {
    const result = calculateMeanMedianMode([7]);

    expect(result.mean).toBe(7);
    expect(result.median).toBe(7);
    expect(result.modes).toEqual([]);
    expect(result.range).toBe(0);
  });

  it("formats calculated values", () => {
    const result = calculateMeanMedianMode([
      1, 2, 2,
    ]);

    expect(result.formattedMean).toBe("1.666667");
    expect(result.formattedMedian).toBe("2");
    expect(result.formattedModes).toEqual(["2"]);
  });

  it("rejects an empty dataset", () => {
    expect(() =>
      calculateMeanMedianMode([]),
    ).toThrow(
      "Dataset must contain at least one value.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateMeanMedianMode([
        1,
        Number.POSITIVE_INFINITY,
      ]),
    ).toThrow(
      "Every dataset value must be a finite number.",
    );
  });
});
