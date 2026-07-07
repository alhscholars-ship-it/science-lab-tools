import { describe, expect, it } from "vitest";

import { calculateMomentum } from "../momentum";

describe("calculateMomentum", () => {
  it("calculates positive momentum", () => {
    const result = calculateMomentum({
      mass: 5,
      velocity: 8,
      solveFor: "momentum",
    });

    expect(result.value).toBe(40);
    expect(result.details.momentum).toBe(40);
    expect(result.formattedValue).toBe("40");
  });

  it("calculates negative momentum", () => {
    const result = calculateMomentum({
      mass: 4,
      velocity: -6,
      solveFor: "momentum",
    });

    expect(result.value).toBe(-24);
    expect(result.details.momentum).toBe(-24);
  });

  it("supports zero momentum", () => {
    const result = calculateMomentum({
      mass: 10,
      velocity: 0,
      solveFor: "momentum",
    });

    expect(result.value).toBe(0);
  });

  it("calculates mass", () => {
    const result = calculateMomentum({
      momentum: 45,
      velocity: 9,
      solveFor: "mass",
    });

    expect(result.value).toBe(5);
    expect(result.details.mass).toBe(5);
  });

  it("calculates mass from negative values", () => {
    const result = calculateMomentum({
      momentum: -30,
      velocity: -6,
      solveFor: "mass",
    });

    expect(result.value).toBe(5);
  });

  it("calculates velocity", () => {
    const result = calculateMomentum({
      momentum: 50,
      mass: 10,
      solveFor: "velocity",
    });

    expect(result.value).toBe(5);
    expect(result.details.velocity).toBe(5);
  });

  it("calculates negative velocity", () => {
    const result = calculateMomentum({
      momentum: -35,
      mass: 7,
      solveFor: "velocity",
    });

    expect(result.value).toBe(-5);
  });

  it("rejects zero mass", () => {
    expect(() =>
      calculateMomentum({
        momentum: 20,
        mass: 0,
        solveFor: "velocity",
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects negative mass", () => {
    expect(() =>
      calculateMomentum({
        mass: -4,
        velocity: 3,
        solveFor: "momentum",
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects zero velocity when solving mass", () => {
    expect(() =>
      calculateMomentum({
        momentum: 10,
        velocity: 0,
        solveFor: "mass",
      }),
    ).toThrow(
      "Velocity cannot be zero when calculating mass.",
    );
  });

  it("rejects incompatible signs when solving mass", () => {
    expect(() =>
      calculateMomentum({
        momentum: 20,
        velocity: -4,
        solveFor: "mass",
      }),
    ).toThrow(
      "Momentum and velocity must have matching signs to produce a positive mass.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateMomentum({
        momentum: Number.NaN,
        mass: 5,
        solveFor: "velocity",
      }),
    ).toThrow(
      "Momentum must be a finite number.",
    );
  });
});
