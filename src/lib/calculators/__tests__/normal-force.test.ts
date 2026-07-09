import { describe, expect, it } from "vitest";

import { calculateNormalForce } from "../normal-force";

describe("calculateNormalForce", () => {
  it("calculates normal force on a horizontal surface", () => {
    const result = calculateNormalForce({
      mass: 10,
      gravity: 9.81,
      solveFor: "normalForce",
    });

    expect(result.value).toBeCloseTo(98.1);
    expect(result.details.formula).toBe(
      "N = mg + Fdown − Fup",
    );
  });

  it("calculates normal force on an incline", () => {
    const result = calculateNormalForce({
      mass: 10,
      gravity: 9.81,
      angleDegrees: 30,
      solveFor: "normalForce",
    });

    expect(result.value).toBeCloseTo(
      84.9571,
      3,
    );
    expect(result.details.formula).toBe(
      "N = mg cos(θ) + Fdown − Fup",
    );
  });

  it("adds a downward external force", () => {
    const result = calculateNormalForce({
      mass: 10,
      gravity: 9.81,
      downwardForce: 20,
      solveFor: "normalForce",
    });

    expect(result.value).toBeCloseTo(118.1);
  });

  it("subtracts an upward external force", () => {
    const result = calculateNormalForce({
      mass: 10,
      gravity: 9.81,
      upwardForce: 20,
      solveFor: "normalForce",
    });

    expect(result.value).toBeCloseTo(78.1);
  });

  it("combines incline and external forces", () => {
    const result = calculateNormalForce({
      mass: 10,
      gravity: 9.81,
      angleDegrees: 30,
      downwardForce: 15,
      upwardForce: 5,
      solveFor: "normalForce",
    });

    expect(result.value).toBeCloseTo(
      94.9571,
      3,
    );
  });

  it("calculates mass", () => {
    const result = calculateNormalForce({
      normalForce: 98.1,
      gravity: 9.81,
      solveFor: "mass",
    });

    expect(result.value).toBeCloseTo(10);
  });

  it("calculates mass on an incline", () => {
    const result = calculateNormalForce({
      normalForce: 84.9571,
      gravity: 9.81,
      angleDegrees: 30,
      solveFor: "mass",
    });

    expect(result.value).toBeCloseTo(10, 3);
  });

  it("calculates gravitational acceleration", () => {
    const result = calculateNormalForce({
      normalForce: 98.1,
      mass: 10,
      solveFor: "gravity",
    });

    expect(result.value).toBeCloseTo(9.81);
  });

  it("defaults optional forces and angle to zero", () => {
    const result = calculateNormalForce({
      mass: 5,
      gravity: 9.81,
      solveFor: "normalForce",
    });

    expect(result.details.angleDegrees).toBe(0);
    expect(result.details.downwardForce).toBe(0);
    expect(result.details.upwardForce).toBe(0);
  });

  it("rejects zero mass", () => {
    expect(() =>
      calculateNormalForce({
        mass: 0,
        gravity: 9.81,
        solveFor: "normalForce",
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects zero gravity", () => {
    expect(() =>
      calculateNormalForce({
        mass: 10,
        gravity: 0,
        solveFor: "normalForce",
      }),
    ).toThrow(
      "Gravitational acceleration must be greater than zero.",
    );
  });

  it("rejects a negative angle", () => {
    expect(() =>
      calculateNormalForce({
        mass: 10,
        gravity: 9.81,
        angleDegrees: -1,
        solveFor: "normalForce",
      }),
    ).toThrow(
      "Incline angle must be at least 0 degrees and less than 90 degrees.",
    );
  });

  it("rejects an angle of 90 degrees", () => {
    expect(() =>
      calculateNormalForce({
        mass: 10,
        gravity: 9.81,
        angleDegrees: 90,
        solveFor: "normalForce",
      }),
    ).toThrow(
      "Incline angle must be at least 0 degrees and less than 90 degrees.",
    );
  });

  it("rejects negative optional forces", () => {
    expect(() =>
      calculateNormalForce({
        mass: 10,
        gravity: 9.81,
        downwardForce: -1,
        solveFor: "normalForce",
      }),
    ).toThrow(
      "Downward force must be a finite number greater than or equal to zero.",
    );
  });

  it("rejects loss of surface contact", () => {
    expect(() =>
      calculateNormalForce({
        mass: 10,
        gravity: 9.81,
        upwardForce: 120,
        solveFor: "normalForce",
      }),
    ).toThrow(
      "The upward force is large enough to remove contact with the surface.",
    );
  });

  it("rejects missing values", () => {
    expect(() =>
      calculateNormalForce({
        gravity: 9.81,
        solveFor: "normalForce",
      }),
    ).toThrow(
      "Mass must be a finite number.",
    );
  });

  it("rejects non-finite inputs", () => {
    expect(() =>
      calculateNormalForce({
        mass: Number.NaN,
        gravity: 9.81,
        solveFor: "normalForce",
      }),
    ).toThrow(
      "Mass must be a finite number.",
    );
  });
});
