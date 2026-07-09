import { describe, expect, it } from "vitest";

import { calculateWeight } from "../weight";

describe("calculateWeight", () => {
  it("calculates weight on Earth", () => {
    const result = calculateWeight({
      mass: 10,
      gravity: 9.80665,
      solveFor: "weight",
    });

    expect(result.value).toBeCloseTo(98.0665);
    expect(result.details.weight).toBeCloseTo(
      98.0665,
    );
    expect(result.details.formula).toBe(
      "W = m × g",
    );
  });

  it("calculates weight with standard gravity", () => {
    const result = calculateWeight({
      mass: 75,
      gravity: 9.81,
      solveFor: "weight",
    });

    expect(result.value).toBeCloseTo(735.75);
  });

  it("calculates weight on the Moon", () => {
    const result = calculateWeight({
      mass: 60,
      gravity: 1.62,
      solveFor: "weight",
    });

    expect(result.value).toBeCloseTo(97.2);
  });

  it("calculates mass", () => {
    const result = calculateWeight({
      weight: 196.133,
      gravity: 9.80665,
      solveFor: "mass",
    });

    expect(result.value).toBeCloseTo(20);
    expect(result.details.mass).toBeCloseTo(20);
  });

  it("calculates gravitational acceleration", () => {
    const result = calculateWeight({
      weight: 98.0665,
      mass: 10,
      solveFor: "gravity",
    });

    expect(result.value).toBeCloseTo(9.80665);
    expect(result.details.gravity).toBeCloseTo(
      9.80665,
    );
  });

  it("formats a calculated result", () => {
    const result = calculateWeight({
      mass: 10,
      gravity: 9.80665,
      solveFor: "weight",
    });

    expect(result.formattedValue).toBe(
      "98.0665",
    );
  });

  it("rejects zero mass", () => {
    expect(() =>
      calculateWeight({
        mass: 0,
        gravity: 9.81,
        solveFor: "weight",
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects negative mass", () => {
    expect(() =>
      calculateWeight({
        mass: -5,
        gravity: 9.81,
        solveFor: "weight",
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects zero gravity", () => {
    expect(() =>
      calculateWeight({
        mass: 10,
        gravity: 0,
        solveFor: "weight",
      }),
    ).toThrow(
      "Gravitational acceleration must be greater than zero.",
    );
  });

  it("rejects negative gravity", () => {
    expect(() =>
      calculateWeight({
        mass: 10,
        gravity: -9.81,
        solveFor: "weight",
      }),
    ).toThrow(
      "Gravitational acceleration must be greater than zero.",
    );
  });

  it("rejects zero weight when calculating mass", () => {
    expect(() =>
      calculateWeight({
        weight: 0,
        gravity: 9.81,
        solveFor: "mass",
      }),
    ).toThrow(
      "Weight must be greater than zero.",
    );
  });

  it("rejects missing values", () => {
    expect(() =>
      calculateWeight({
        gravity: 9.81,
        solveFor: "weight",
      }),
    ).toThrow(
      "Mass must be a finite number.",
    );
  });

  it("rejects non-finite mass", () => {
    expect(() =>
      calculateWeight({
        mass: Number.NaN,
        gravity: 9.81,
        solveFor: "weight",
      }),
    ).toThrow(
      "Mass must be a finite number.",
    );
  });

  it("rejects infinite gravity", () => {
    expect(() =>
      calculateWeight({
        mass: 10,
        gravity: Number.POSITIVE_INFINITY,
        solveFor: "weight",
      }),
    ).toThrow(
      "Gravitational acceleration must be a finite number.",
    );
  });
});
