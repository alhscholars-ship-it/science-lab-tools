import { describe, expect, it } from "vitest";

import { calculatePercentDifference } from "../percent-difference";

describe("calculatePercentDifference", () => {
  it("calculates the percent difference between two positive values", () => {
    const result = calculatePercentDifference({
      firstValue: 10,
      secondValue: 12,
    });

    expect(result.value).toBeCloseTo(18.1818181818, 8);
    expect(result.formattedValue).toBe("18.181818%");
    expect(result.details.absoluteDifference).toBe(2);
    expect(result.details.averageMagnitude).toBe(11);
  });

  it("returns zero when both values are equal", () => {
    const result = calculatePercentDifference({
      firstValue: 25,
      secondValue: 25,
    });

    expect(result.value).toBe(0);
    expect(result.formattedValue).toBe("0%");
  });

  it("produces the same result regardless of value order", () => {
    const firstResult = calculatePercentDifference({
      firstValue: 20,
      secondValue: 30,
    });

    const reversedResult = calculatePercentDifference({
      firstValue: 30,
      secondValue: 20,
    });

    expect(firstResult.value).toBe(reversedResult.value);
  });

  it("supports negative values using average magnitude", () => {
    const result = calculatePercentDifference({
      firstValue: -90,
      secondValue: -100,
    });

    expect(result.value).toBeCloseTo(10.5263157895, 8);
    expect(result.details.averageMagnitude).toBe(95);
  });

  it("supports one zero value when the other value is non-zero", () => {
    const result = calculatePercentDifference({
      firstValue: 0,
      secondValue: 10,
    });

    expect(result.value).toBe(200);
    expect(result.formattedValue).toBe("200%");
  });

  it("rejects two zero values", () => {
    expect(() =>
      calculatePercentDifference({
        firstValue: 0,
        secondValue: 0,
      }),
    ).toThrow(
      "Percent difference is undefined when both values are zero.",
    );
  });

  it("rejects a non-finite first value", () => {
    expect(() =>
      calculatePercentDifference({
        firstValue: Number.NaN,
        secondValue: 10,
      }),
    ).toThrow("First value must be a finite number.");
  });

  it("rejects a non-finite second value", () => {
    expect(() =>
      calculatePercentDifference({
        firstValue: 10,
        secondValue: Number.POSITIVE_INFINITY,
      }),
    ).toThrow("Second value must be a finite number.");
  });
});
