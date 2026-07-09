import { describe, expect, it } from "vitest";

import { calculatePulley } from "../pulley";

describe("calculatePulley", () => {
  it("calculates load force", () => {
    const result = calculatePulley({
      loadMass: 10,
      supportingSegments: 2,
      gravity: 9.81,
      solveFor: "loadForce",
    });

    expect(result.value).toBeCloseTo(98.1);
    expect(result.details.formula).toBe("W = mg");
  });

  it("calculates ideal mechanical advantage", () => {
    const result = calculatePulley({
      loadMass: 10,
      supportingSegments: 4,
      solveFor: "mechanicalAdvantage",
    });

    expect(result.value).toBe(4);
    expect(result.details.formula).toBe("IMA = n");
  });

  it("calculates ideal effort force", () => {
    const result = calculatePulley({
      loadMass: 20,
      supportingSegments: 4,
      gravity: 9.81,
      solveFor: "effortForce",
    });

    expect(result.value).toBeCloseTo(49.05);
    expect(result.details.formula).toBe(
      "Fe = W ÷ IMA",
    );
  });

  it("calculates required input distance", () => {
    const result = calculatePulley({
      loadMass: 20,
      supportingSegments: 4,
      loadDistance: 0.5,
      solveFor: "inputDistance",
    });

    expect(result.value).toBeCloseTo(2);
    expect(result.details.formula).toBe(
      "de = IMA × dl",
    );
  });

  it("defaults to standard gravity", () => {
    const result = calculatePulley({
      loadMass: 2,
      supportingSegments: 2,
      solveFor: "loadForce",
    });

    expect(result.details.gravity).toBe(9.80665);
  });

  it("defaults load distance to one metre", () => {
    const result = calculatePulley({
      loadMass: 5,
      supportingSegments: 3,
      solveFor: "inputDistance",
    });

    expect(result.details.loadDistance).toBe(1);
    expect(result.value).toBe(3);
  });

  it("supports a single fixed pulley", () => {
    const result = calculatePulley({
      loadMass: 10,
      supportingSegments: 1,
      gravity: 9.81,
      solveFor: "effortForce",
    });

    expect(result.value).toBeCloseTo(98.1);
    expect(result.details.mechanicalAdvantage).toBe(1);
  });

  it("stores all calculated details", () => {
    const result = calculatePulley({
      loadMass: 12,
      supportingSegments: 3,
      loadDistance: 2,
      gravity: 9.81,
      solveFor: "effortForce",
    });

    expect(result.details.loadMass).toBe(12);
    expect(result.details.supportingSegments).toBe(3);
    expect(result.details.loadDistance).toBe(2);
    expect(result.details.loadForce).toBeCloseTo(117.72);
    expect(result.details.inputDistance).toBe(6);
  });

  it("formats the solved value", () => {
    const result = calculatePulley({
      loadMass: 5,
      supportingSegments: 2,
      gravity: 9.81,
      solveFor: "effortForce",
    });

    expect(result.formattedValue).toBe("24.525");
  });

  it("rejects zero load mass", () => {
    expect(() =>
      calculatePulley({
        loadMass: 0,
        supportingSegments: 2,
        solveFor: "loadForce",
      }),
    ).toThrow("Load mass must be greater than zero.");
  });

  it("rejects negative load mass", () => {
    expect(() =>
      calculatePulley({
        loadMass: -5,
        supportingSegments: 2,
        solveFor: "effortForce",
      }),
    ).toThrow("Load mass must be greater than zero.");
  });

  it("rejects zero supporting segments", () => {
    expect(() =>
      calculatePulley({
        loadMass: 10,
        supportingSegments: 0,
        solveFor: "mechanicalAdvantage",
      }),
    ).toThrow(
      "Supporting rope segments must be a positive whole number.",
    );
  });

  it("rejects fractional supporting segments", () => {
    expect(() =>
      calculatePulley({
        loadMass: 10,
        supportingSegments: 2.5,
        solveFor: "mechanicalAdvantage",
      }),
    ).toThrow(
      "Supporting rope segments must be a positive whole number.",
    );
  });

  it("rejects zero load distance", () => {
    expect(() =>
      calculatePulley({
        loadMass: 10,
        supportingSegments: 2,
        loadDistance: 0,
        solveFor: "inputDistance",
      }),
    ).toThrow(
      "Load distance must be greater than zero.",
    );
  });

  it("rejects non-finite gravity", () => {
    expect(() =>
      calculatePulley({
        loadMass: 10,
        supportingSegments: 2,
        gravity: Number.NaN,
        solveFor: "loadForce",
      }),
    ).toThrow("Gravity must be a finite number.");
  });

  it("rejects unsupported variables", () => {
    expect(() =>
      calculatePulley({
        loadMass: 10,
        supportingSegments: 2,
        solveFor: "tension" as never,
      }),
    ).toThrow("Unsupported pulley variable.");
  });
});
