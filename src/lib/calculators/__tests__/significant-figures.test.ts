import { describe, expect, it } from "vitest";

import {
  countSignificantFigures,
  roundToSignificantFigures,
} from "../significant-figures";

describe("countSignificantFigures", () => {
  it("counts all nonzero digits", () => {
    expect(countSignificantFigures("347")).toBe(3);
  });

  it("counts zeros between nonzero digits", () => {
    expect(countSignificantFigures("2.07")).toBe(3);
  });

  it("ignores leading zeros", () => {
    expect(countSignificantFigures("0.0045")).toBe(2);
  });

  it("counts trailing decimal zeros", () => {
    expect(countSignificantFigures("6.200")).toBe(4);
  });

  it("treats trailing whole-number zeros as ambiguous", () => {
    expect(countSignificantFigures("1200")).toBe(2);
  });

  it("counts explicit trailing zeros after a decimal point", () => {
    expect(countSignificantFigures("1200.")).toBe(4);
  });

  it("uses the mantissa in scientific notation", () => {
    expect(countSignificantFigures("1.20e3")).toBe(3);
  });

  it("counts measured zero decimal places", () => {
    expect(countSignificantFigures("0.00")).toBe(2);
  });

  it("supports signed values", () => {
    expect(countSignificantFigures("-0.0450")).toBe(3);
  });

  it("rejects invalid input", () => {
    expect(() =>
      countSignificantFigures("12.3.4"),
    ).toThrow(
      "Value must be a valid decimal number or scientific notation.",
    );
  });
});

describe("roundToSignificantFigures", () => {
  it("rounds a decimal value to three significant figures", () => {
    const result = roundToSignificantFigures(
      "12.345",
      3,
    );

    expect(result.roundedValue).toBe(12.3);
    expect(result.formattedValue).toBe("12.3");
  });

  it("rounds a small decimal value", () => {
    const result = roundToSignificantFigures(
      "0.004567",
      2,
    );

    expect(result.roundedValue).toBe(0.0046);
    expect(result.formattedValue).toBe("0.0046");
  });

  it("uses scientific notation for large rounded values", () => {
    const result = roundToSignificantFigures(
      "12345",
      3,
    );

    expect(result.roundedValue).toBe(12300);
    expect(result.formattedValue).toBe("1.23e+4");
  });

  it("preserves requested precision for zero", () => {
    const result = roundToSignificantFigures("0", 3);

    expect(result.roundedValue).toBe(0);
    expect(result.formattedValue).toBe("0.00");
  });

  it("rejects an invalid significant-figure count", () => {
    expect(() =>
      roundToSignificantFigures("12.4", 0),
    ).toThrow(
      "Significant figures must be a whole number from 1 to 15.",
    );
  });
});
