import { describe, expect, it } from "vitest";

import {
  calculateScientificNotation,
  normalizeScientificNotation,
  scientificToDecimal,
} from "../scientific-notation";

describe("scientific notation calculator", () => {
  it.each([
    [123456, 1.23456, 5],
    [0.00042, 4.2, -4],
    [-987, -9.87, 2],
    [0, 0, 0],
  ])("normalizes %s", (value, coefficient, exponent) => {
    expect(normalizeScientificNotation(value, 6)).toMatchObject({ coefficient, exponent });
  });

  it("converts scientific notation to decimal form", () => {
    expect(scientificToDecimal({ coefficient: 6.02, exponent: 23 })).toBeCloseTo(6.02e23);
    expect(scientificToDecimal({ coefficient: 3.5, exponent: -4 })).toBeCloseTo(0.00035);
  });

  it.each([
    ["add", 3.5e4],
    ["subtract", 2.5e4],
    ["multiply", 1.5e8],
    ["divide", 6],
  ] as const)("performs %s and normalizes the result", (operation, expected) => {
    const result = calculateScientificNotation(
      { coefficient: 3, exponent: 4 },
      operation,
      { coefficient: 5, exponent: 3 },
    );
    expect(result.value).toBeCloseTo(expected);
    expect(Math.abs(result.coefficient)).toBeLessThan(10);
  });

  it("rounds the coefficient to the requested significant figures", () => {
    expect(normalizeScientificNotation(12345, 3).notation).toBe("1.23 × 10^4");
  });

  it("rejects invalid exponents, precision, and division by zero", () => {
    expect(() => scientificToDecimal({ coefficient: 2, exponent: 1.5 })).toThrow("whole number");
    expect(() => normalizeScientificNotation(10, 0)).toThrow("1 to 12");
    expect(() => calculateScientificNotation(
      { coefficient: 1, exponent: 2 }, "divide", { coefficient: 0, exponent: 0 },
    )).toThrow("cannot be zero");
  });
});
