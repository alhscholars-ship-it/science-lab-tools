import { describe, expect, it } from "vitest";

import {
  calculateUncertaintyPropagation,
  getPropagationExpression,
} from "../uncertainty-propagation";

describe("calculateUncertaintyPropagation", () => {
  it("propagates uncertainty through addition", () => {
    const result =
      calculateUncertaintyPropagation({
        first: {
          value: 10,
          absoluteUncertainty: 0.2,
        },
        second: {
          value: 5,
          absoluteUncertainty: 0.1,
        },
        operation: "addition",
      });

    expect(result.resultValue).toBe(15);
    expect(
      result.absoluteUncertainty,
    ).toBeCloseTo(0.3, 12);
    expect(
      result.percentageUncertainty,
    ).toBeCloseTo(2, 12);
    expect(result.resultNotation).toBe(
      "15 ± 0.3",
    );
  });

  it("propagates uncertainty through subtraction", () => {
    const result =
      calculateUncertaintyPropagation({
        first: {
          value: 20,
          absoluteUncertainty: 0.5,
        },
        second: {
          value: 8,
          absoluteUncertainty: 0.2,
        },
        operation: "subtraction",
      });

    expect(result.resultValue).toBe(12);
    expect(
      result.absoluteUncertainty,
    ).toBeCloseTo(0.7, 12);
  });

  it("propagates uncertainty through multiplication", () => {
    const result =
      calculateUncertaintyPropagation({
        first: {
          value: 10,
          absoluteUncertainty: 0.2,
        },
        second: {
          value: 5,
          absoluteUncertainty: 0.1,
        },
        operation: "multiplication",
      });

    expect(result.resultValue).toBe(50);
    expect(
      result.relativeUncertainty,
    ).toBeCloseTo(0.04, 12);
    expect(
      result.absoluteUncertainty,
    ).toBeCloseTo(2, 12);
    expect(
      result.percentageUncertainty,
    ).toBeCloseTo(4, 12);
  });

  it("propagates uncertainty through division", () => {
    const result =
      calculateUncertaintyPropagation({
        first: {
          value: 20,
          absoluteUncertainty: 1,
        },
        second: {
          value: 4,
          absoluteUncertainty: 0.2,
        },
        operation: "division",
      });

    expect(result.resultValue).toBe(5);
    expect(
      result.relativeUncertainty,
    ).toBeCloseTo(0.1, 12);
    expect(
      result.absoluteUncertainty,
    ).toBeCloseTo(0.5, 12);
    expect(
      result.percentageUncertainty,
    ).toBeCloseTo(10, 12);
  });

  it("supports negative measured values", () => {
    const result =
      calculateUncertaintyPropagation({
        first: {
          value: -10,
          absoluteUncertainty: 0.5,
        },
        second: {
          value: 2,
          absoluteUncertainty: 0.1,
        },
        operation: "multiplication",
      });

    expect(result.resultValue).toBe(-20);
    expect(
      result.relativeUncertainty,
    ).toBeCloseTo(0.1, 12);
    expect(
      result.absoluteUncertainty,
    ).toBeCloseTo(2, 12);
  });

  it("keeps absolute uncertainty when the result is zero", () => {
    const result =
      calculateUncertaintyPropagation({
        first: {
          value: 5,
          absoluteUncertainty: 0.2,
        },
        second: {
          value: 5,
          absoluteUncertainty: 0.1,
        },
        operation: "subtraction",
      });

    expect(result.resultValue).toBe(0);
    expect(
      result.absoluteUncertainty,
    ).toBeCloseTo(0.3, 12);
    expect(result.relativeUncertainty).toBeNull();
    expect(
      result.percentageUncertainty,
    ).toBeNull();
    expect(
      result.formattedPercentageUncertainty,
    ).toBe("Undefined");
  });

  it("formats the operation expression", () => {
    const result =
      calculateUncertaintyPropagation({
        first: {
          value: 12,
          absoluteUncertainty: 0.2,
        },
        second: {
          value: 3,
          absoluteUncertainty: 0.1,
        },
        operation: "division",
      });

    expect(
      getPropagationExpression(result),
    ).toBe("12 ÷ 3");
  });

  it("rejects negative uncertainty", () => {
    expect(() =>
      calculateUncertaintyPropagation({
        first: {
          value: 10,
          absoluteUncertainty: -0.1,
        },
        second: {
          value: 5,
          absoluteUncertainty: 0.2,
        },
        operation: "addition",
      }),
    ).toThrow(
      "First uncertainty cannot be negative.",
    );
  });

  it("rejects non-finite measured values", () => {
    expect(() =>
      calculateUncertaintyPropagation({
        first: {
          value: Number.NaN,
          absoluteUncertainty: 0.1,
        },
        second: {
          value: 5,
          absoluteUncertainty: 0.2,
        },
        operation: "addition",
      }),
    ).toThrow(
      "First value must be a finite number.",
    );
  });

  it("rejects a zero multiplication operand", () => {
    expect(() =>
      calculateUncertaintyPropagation({
        first: {
          value: 0,
          absoluteUncertainty: 0.1,
        },
        second: {
          value: 5,
          absoluteUncertainty: 0.2,
        },
        operation: "multiplication",
      }),
    ).toThrow(
      "Multiplication requires non-zero measured values when propagating relative uncertainty.",
    );
  });

  it("rejects a zero denominator", () => {
    expect(() =>
      calculateUncertaintyPropagation({
        first: {
          value: 10,
          absoluteUncertainty: 0.1,
        },
        second: {
          value: 0,
          absoluteUncertainty: 0.2,
        },
        operation: "division",
      }),
    ).toThrow(
      "The denominator cannot be zero.",
    );
  });

  it("rejects a zero numerator for division", () => {
    expect(() =>
      calculateUncertaintyPropagation({
        first: {
          value: 0,
          absoluteUncertainty: 0.1,
        },
        second: {
          value: 5,
          absoluteUncertainty: 0.2,
        },
        operation: "division",
      }),
    ).toThrow(
      "The numerator must be non-zero when propagating relative uncertainty.",
    );
  });
});
