import { describe, expect, it } from "vitest";

import {
  calculateStandardDeviation,
  parseDataset,
} from "../standard-deviation";

describe("parseDataset", () => {
  it("parses comma-separated values", () => {
    expect(parseDataset("2, 4, 6, 8")).toEqual([
      2, 4, 6, 8,
    ]);
  });

  it("parses values separated by spaces and new lines", () => {
    expect(
      parseDataset("1 2\n3\t4"),
    ).toEqual([1, 2, 3, 4]);
  });

  it("parses semicolon-separated values", () => {
    expect(parseDataset("1.5; 2.5; 3.5")).toEqual([
      1.5, 2.5, 3.5,
    ]);
  });

  it("supports negative and scientific-notation values", () => {
    expect(parseDataset("-2, 1e2, 0.5")).toEqual([
      -2, 100, 0.5,
    ]);
  });

  it("rejects an empty dataset", () => {
    expect(() => parseDataset("   ")).toThrow(
      "Enter at least one numeric value.",
    );
  });

  it("identifies an invalid token", () => {
    expect(() =>
      parseDataset("2, three, 4"),
    ).toThrow(
      '"three" is not a valid finite number.',
    );
  });
});

describe("calculateStandardDeviation", () => {
  it("calculates mean and both standard deviations", () => {
    const result = calculateStandardDeviation([
      2, 4, 4, 4, 5, 5, 7, 9,
    ]);

    expect(result.details.count).toBe(8);
    expect(result.details.sum).toBe(40);
    expect(result.details.mean).toBe(5);
    expect(
      result.details.populationStandardDeviation,
    ).toBe(2);
    expect(
      result.details.sampleStandardDeviation,
    ).toBeCloseTo(2.1380899353, 10);
    expect(
      result.formattedPopulationStandardDeviation,
    ).toBe("2");
  });

  it("calculates minimum, maximum, and range", () => {
    const result = calculateStandardDeviation([
      -4, 3, 8, 10,
    ]);

    expect(result.details.minimum).toBe(-4);
    expect(result.details.maximum).toBe(10);
    expect(result.details.range).toBe(14);
  });

  it("returns zero spread for identical values", () => {
    const result = calculateStandardDeviation([
      6, 6, 6,
    ]);

    expect(
      result.details.populationStandardDeviation,
    ).toBe(0);
    expect(
      result.details.sampleStandardDeviation,
    ).toBe(0);
  });

  it("does not calculate sample deviation for one value", () => {
    const result = calculateStandardDeviation([5]);

    expect(result.details.mean).toBe(5);
    expect(
      result.details.populationStandardDeviation,
    ).toBe(0);
    expect(
      result.details.sampleStandardDeviation,
    ).toBeNull();
    expect(
      result.formattedSampleStandardDeviation,
    ).toBeNull();
  });

  it("supports decimal measurements", () => {
    const result = calculateStandardDeviation([
      1.2, 1.4, 1.6,
    ]);

    expect(result.details.mean).toBeCloseTo(1.4, 10);
    expect(
      result.details.populationStandardDeviation,
    ).toBeCloseTo(0.1632993162, 10);
  });

  it("rejects an empty array", () => {
    expect(() =>
      calculateStandardDeviation([]),
    ).toThrow(
      "Dataset must contain at least one value.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateStandardDeviation([
        1,
        Number.NaN,
        3,
      ]),
    ).toThrow(
      "Every dataset value must be a finite number.",
    );
  });
});
