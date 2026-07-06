import { describe, expect, it } from "vitest";

import {
  calculateLinearRegression,
  parsePairedDataset,
} from "../linear-regression";

describe("parsePairedDataset", () => {
  it("parses comma-separated pairs on separate lines", () => {
    expect(
      parsePairedDataset("1,2\n2,4\n3,6"),
    ).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 6 },
    ]);
  });

  it("parses space-separated pairs", () => {
    expect(
      parsePairedDataset("1 2\n2 5"),
    ).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 5 },
    ]);
  });

  it("parses semicolon-separated rows", () => {
    expect(
      parsePairedDataset("1,2; 2,4; 3,6"),
    ).toHaveLength(3);
  });

  it("supports negative and scientific notation", () => {
    expect(
      parsePairedDataset("-1,2e2\n3,-4.5"),
    ).toEqual([
      { x: -1, y: 200 },
      { x: 3, y: -4.5 },
    ]);
  });

  it("rejects rows without exactly two values", () => {
    expect(() =>
      parsePairedDataset("1,2,3\n4,5"),
    ).toThrow(
      "Row 1 must contain exactly one x value and one y value.",
    );
  });

  it("rejects invalid numbers", () => {
    expect(() =>
      parsePairedDataset("1,2\nthree,4"),
    ).toThrow(
      "Row 2 contains an invalid finite number.",
    );
  });

  it("requires at least two pairs", () => {
    expect(() =>
      parsePairedDataset("1,2"),
    ).toThrow(
      "Enter at least two x,y data pairs.",
    );
  });
});

describe("calculateLinearRegression", () => {
  it("calculates a perfect positive relationship", () => {
    const result = calculateLinearRegression([
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 6 },
    ]);

    expect(result.slope).toBe(2);
    expect(result.intercept).toBe(0);
    expect(
      result.correlationCoefficient,
    ).toBeCloseTo(1, 12);
    expect(
      result.coefficientOfDetermination,
    ).toBeCloseTo(1, 12);
    expect(result.equation).toBe("y = 2x + 0");
  });

  it("calculates a negative relationship", () => {
    const result = calculateLinearRegression([
      { x: 1, y: 5 },
      { x: 2, y: 3 },
      { x: 3, y: 1 },
    ]);

    expect(result.slope).toBe(-2);
    expect(result.intercept).toBe(7);
    expect(
      result.correlationCoefficient,
    ).toBeCloseTo(-1, 12);
  });

  it("calculates a non-perfect regression", () => {
    const result = calculateLinearRegression([
      { x: 1, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 4 },
    ]);

    expect(result.slope).toBeCloseTo(0.8, 12);
    expect(result.intercept).toBeCloseTo(1.5, 12);
    expect(
      result.correlationCoefficient,
    ).toBeCloseTo(0.8, 12);
    expect(
      result.coefficientOfDetermination,
    ).toBeCloseTo(0.64, 12);
  });

  it("formats a negative intercept correctly", () => {
    const result = calculateLinearRegression([
      { x: 1, y: 1 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
    ]);

    expect(result.equation).toBe("y = 2x − 1");
  });

  it("does not mutate the input points", () => {
    const points = [
      { x: 1, y: 2 },
      { x: 2, y: 4 },
    ];

    const result =
      calculateLinearRegression(points);

    expect(points).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 4 },
    ]);
    expect(result.points).not.toBe(points);
  });

  it("requires at least two points", () => {
    expect(() =>
      calculateLinearRegression([
        { x: 1, y: 2 },
      ]),
    ).toThrow(
      "Linear regression requires at least two data points.",
    );
  });

  it("rejects identical x values", () => {
    expect(() =>
      calculateLinearRegression([
        { x: 2, y: 1 },
        { x: 2, y: 3 },
      ]),
    ).toThrow(
      "Linear regression is undefined when all x values are identical.",
    );
  });

  it("rejects identical y values", () => {
    expect(() =>
      calculateLinearRegression([
        { x: 1, y: 4 },
        { x: 2, y: 4 },
      ]),
    ).toThrow(
      "Correlation is undefined when all y values are identical.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateLinearRegression([
        { x: 1, y: 2 },
        { x: Number.NaN, y: 3 },
      ]),
    ).toThrow(
      "Every data point must contain finite x and y values.",
    );
  });
});
