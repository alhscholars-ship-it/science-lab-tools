import { describe, expect, it } from "vitest";

import { calculatePercentError } from "../percent-error";

describe("calculatePercentError", () => {
  it("calculates percent error for a value above the accepted value", () => {
    const result = calculatePercentError({
      experimentalValue: 105,
      acceptedValue: 100,
    });

    expect(result.value).toBe(5);
    expect(result.formattedValue).toBe("5%");
    expect(result.details.absoluteDifference).toBe(5);
  });

  it("calculates percent error for a value below the accepted value", () => {
    const result = calculatePercentError({
      experimentalValue: 95,
      acceptedValue: 100,
    });

    expect(result.value).toBe(5);
  });

  it("returns zero when both values are equal", () => {
    const result = calculatePercentError({
      experimentalValue: 25,
      acceptedValue: 25,
    });

    expect(result.value).toBe(0);
    expect(result.formattedValue).toBe("0%");
  });

  it("supports negative accepted values by using the absolute denominator", () => {
    const result = calculatePercentError({
      experimentalValue: -90,
      acceptedValue: -100,
    });

    expect(result.value).toBe(10);
  });

  it("rejects an accepted value of zero", () => {
    expect(() =>
      calculatePercentError({
        experimentalValue: 5,
        acceptedValue: 0,
      }),
    ).toThrow("Accepted value cannot be zero.");
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculatePercentError({
        experimentalValue: Number.NaN,
        acceptedValue: 100,
      }),
    ).toThrow("Experimental value must be a finite number.");
  });
});
