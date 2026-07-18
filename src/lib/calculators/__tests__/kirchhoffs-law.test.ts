import { describe, expect, it } from "vitest";

import {
  calculateKirchhoffsLaw,
  type KirchhoffsLawMode,
} from "../kirchhoffs-law";

describe("calculateKirchhoffsLaw", () => {
  it("solves an unknown KCL branch current", () => {
    const result = calculateKirchhoffsLaw({
      mode: "kcl",
      values: [5, -2, 0],
      unknownIndex: 2,
    });

    expect(result.value).toBeCloseTo(-3);
    expect(result.formattedValue).toBe("-3");

    expect(result.details.mode).toBe("kcl");
    expect(result.details.unknownIndex).toBe(2);
    expect(result.details.unknownValue).toBeCloseTo(-3);
    expect(result.details.knownValues).toEqual([5, -2]);
    expect(result.details.completedValues).toEqual([
      5,
      -2,
      -3,
    ]);

    expect(result.details.knownSum).toBeCloseTo(3);
    expect(result.details.totalSum).toBeCloseTo(0);
    expect(result.details.formula).toBe("ΣI = 0");
    expect(result.details.substitution).toBe(
      "I3 = −(5 + -2)",
    );
    expect(result.details.verification).toContain("= 0");
  });

  it("solves an unknown KVL loop voltage", () => {
    const result = calculateKirchhoffsLaw({
      mode: "kvl",
      values: [12, -4, -3, 0],
      unknownIndex: 3,
    });

    expect(result.value).toBeCloseTo(-5);
    expect(result.details.completedValues).toEqual([
      12,
      -4,
      -3,
      -5,
    ]);

    expect(result.details.knownSum).toBeCloseTo(5);
    expect(result.details.totalSum).toBeCloseTo(0);
    expect(result.details.formula).toBe("ΣV = 0");
    expect(result.details.substitution).toBe(
      "V4 = −(12 + -4 + -3)",
    );
  });

  it("solves an unknown value at the first position", () => {
    const result = calculateKirchhoffsLaw({
      mode: "kcl",
      values: [0, -2, -3],
      unknownIndex: 0,
    });

    expect(result.value).toBeCloseTo(5);
    expect(result.details.completedValues).toEqual([
      5,
      -2,
      -3,
    ]);
  });

  it("solves an unknown value in the middle", () => {
    const result = calculateKirchhoffsLaw({
      mode: "kvl",
      values: [9, 0, -4],
      unknownIndex: 1,
    });

    expect(result.value).toBeCloseTo(-5);
    expect(result.details.completedValues).toEqual([
      9,
      -5,
      -4,
    ]);
  });

  it("supports decimal circuit values", () => {
    const result = calculateKirchhoffsLaw({
      mode: "kcl",
      values: [1.25, -0.4, 0],
      unknownIndex: 2,
    });

    expect(result.value).toBeCloseTo(-0.85);
    expect(result.details.totalSum).toBeCloseTo(0);
  });

  it("supports more than three circuit terms", () => {
    const result = calculateKirchhoffsLaw({
      mode: "kvl",
      values: [24, -5, -7, -4, 0],
      unknownIndex: 4,
    });

    expect(result.value).toBeCloseTo(-8);
    expect(result.details.completedValues).toHaveLength(5);
    expect(result.details.totalSum).toBeCloseTo(0);
  });

  it("returns zero when known signed values already balance", () => {
    const result = calculateKirchhoffsLaw({
      mode: "kcl",
      values: [4, -4, 12],
      unknownIndex: 2,
    });

    expect(result.value).toBe(0);
    expect(Object.is(result.value, -0)).toBe(false);
    expect(result.details.totalSum).toBe(0);
  });

  it("does not mutate the original values array", () => {
    const values = [10, -3, 0];

    const result = calculateKirchhoffsLaw({
      mode: "kvl",
      values,
      unknownIndex: 2,
    });

    expect(values).toEqual([10, -3, 0]);
    expect(result.details.completedValues).toEqual([
      10,
      -3,
      -7,
    ]);
  });

  it("rejects fewer than two circuit values", () => {
    expect(() =>
      calculateKirchhoffsLaw({
        mode: "kcl",
        values: [0],
        unknownIndex: 0,
      }),
    ).toThrow(
      "Enter at least two signed circuit values.",
    );
  });

  it("rejects a negative unknown index", () => {
    expect(() =>
      calculateKirchhoffsLaw({
        mode: "kcl",
        values: [5, -2, 0],
        unknownIndex: -1,
      }),
    ).toThrow(
      "Unknown value position must reference an existing circuit value.",
    );
  });

  it("rejects an unknown index outside the array", () => {
    expect(() =>
      calculateKirchhoffsLaw({
        mode: "kvl",
        values: [12, -7, 0],
        unknownIndex: 3,
      }),
    ).toThrow(
      "Unknown value position must reference an existing circuit value.",
    );
  });

  it("rejects a non-integer unknown index", () => {
    expect(() =>
      calculateKirchhoffsLaw({
        mode: "kcl",
        values: [5, -2, 0],
        unknownIndex: 1.5,
      }),
    ).toThrow(
      "Unknown value position must reference an existing circuit value.",
    );
  });

  it("rejects a non-finite circuit value", () => {
    expect(() =>
      calculateKirchhoffsLaw({
        mode: "kvl",
        values: [12, Number.NaN, 0],
        unknownIndex: 2,
      }),
    ).toThrow(
      "Circuit value 2 must be a finite number.",
    );
  });

  it("rejects positive infinity", () => {
    expect(() =>
      calculateKirchhoffsLaw({
        mode: "kcl",
        values: [Number.POSITIVE_INFINITY, -2, 0],
        unknownIndex: 2,
      }),
    ).toThrow(
      "Circuit value 1 must be a finite number.",
    );
  });

  it("rejects an unsupported calculation mode", () => {
    expect(() =>
      calculateKirchhoffsLaw({
        mode: "unknown" as KirchhoffsLawMode,
        values: [5, -2, 0],
        unknownIndex: 2,
      }),
    ).toThrow(
      "Unsupported Kirchhoff's law mode: unknown",
    );
  });
});
