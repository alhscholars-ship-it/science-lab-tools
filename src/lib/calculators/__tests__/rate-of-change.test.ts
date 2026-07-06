import { describe, expect, it } from "vitest";

import { calculateRateOfChange } from "../rate-of-change";

describe("calculateRateOfChange", () => {
  it("calculates an increasing rate of change", () => {
    const result = calculateRateOfChange({
      initialValue: 10,
      finalValue: 25,
      initialIndependentValue: 2,
      finalIndependentValue: 5,
    });

    expect(result.absoluteChange).toBe(15);
    expect(result.intervalChange).toBe(3);
    expect(result.averageRateOfChange).toBe(5);
    expect(result.percentageChange).toBe(150);
    expect(result.direction).toBe("increase");
  });

  it("calculates a decreasing rate of change", () => {
    const result = calculateRateOfChange({
      initialValue: 20,
      finalValue: 8,
      initialIndependentValue: 0,
      finalIndependentValue: 4,
    });

    expect(result.absoluteChange).toBe(-12);
    expect(result.averageRateOfChange).toBe(-3);
    expect(result.percentageChange).toBe(-60);
    expect(result.direction).toBe("decrease");
  });

  it("identifies no change", () => {
    const result = calculateRateOfChange({
      initialValue: 12,
      finalValue: 12,
      initialIndependentValue: 1,
      finalIndependentValue: 5,
    });

    expect(result.absoluteChange).toBe(0);
    expect(result.averageRateOfChange).toBe(0);
    expect(result.percentageChange).toBe(0);
    expect(result.direction).toBe("no change");
  });

  it("supports a negative independent interval", () => {
    const result = calculateRateOfChange({
      initialValue: 4,
      finalValue: 10,
      initialIndependentValue: 5,
      finalIndependentValue: 2,
    });

    expect(result.absoluteChange).toBe(6);
    expect(result.intervalChange).toBe(-3);
    expect(result.averageRateOfChange).toBe(-2);
  });

  it("uses initial magnitude for percentage change", () => {
    const result = calculateRateOfChange({
      initialValue: -10,
      finalValue: -5,
      initialIndependentValue: 0,
      finalIndependentValue: 2,
    });

    expect(result.absoluteChange).toBe(5);
    expect(result.percentageChange).toBe(50);
    expect(result.direction).toBe("increase");
  });

  it("marks percentage change undefined from zero", () => {
    const result = calculateRateOfChange({
      initialValue: 0,
      finalValue: 5,
      initialIndependentValue: 1,
      finalIndependentValue: 3,
    });

    expect(result.absoluteChange).toBe(5);
    expect(result.averageRateOfChange).toBe(2.5);
    expect(result.percentageChange).toBeNull();
    expect(
      result.formattedPercentageChange,
    ).toBe("Undefined");
  });

  it("formats decimal results", () => {
    const result = calculateRateOfChange({
      initialValue: 2,
      finalValue: 3,
      initialIndependentValue: 0,
      finalIndependentValue: 3,
    });

    expect(
      result.formattedAverageRateOfChange,
    ).toBe("0.333333");
    expect(
      result.formattedPercentageChange,
    ).toBe("50%");
  });

  it("rejects a zero independent interval", () => {
    expect(() =>
      calculateRateOfChange({
        initialValue: 2,
        finalValue: 5,
        initialIndependentValue: 3,
        finalIndependentValue: 3,
      }),
    ).toThrow(
      "The independent-variable interval cannot be zero.",
    );
  });

  it("rejects a non-finite initial value", () => {
    expect(() =>
      calculateRateOfChange({
        initialValue: Number.NaN,
        finalValue: 5,
        initialIndependentValue: 0,
        finalIndependentValue: 2,
      }),
    ).toThrow(
      "Initial value must be a finite number.",
    );
  });

  it("rejects a non-finite final independent value", () => {
    expect(() =>
      calculateRateOfChange({
        initialValue: 2,
        finalValue: 5,
        initialIndependentValue: 0,
        finalIndependentValue:
          Number.POSITIVE_INFINITY,
      }),
    ).toThrow(
      "Final independent value must be a finite number.",
    );
  });
});
