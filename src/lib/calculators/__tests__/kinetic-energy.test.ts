import { describe, expect, it } from "vitest";

import { calculateKineticEnergy } from "../kinetic-energy";

describe("calculateKineticEnergy", () => {
  it("calculates kinetic energy", () => {
    const result = calculateKineticEnergy({
      mass: 10,
      speed: 4,
      solveFor: "kineticEnergy",
    });

    expect(result.value).toBe(80);
    expect(result.details.kineticEnergy).toBe(80);
    expect(result.details.formula).toBe(
      "KE = ½mv²",
    );
  });

  it("supports zero kinetic energy", () => {
    const result = calculateKineticEnergy({
      mass: 5,
      speed: 0,
      solveFor: "kineticEnergy",
    });

    expect(result.value).toBe(0);
  });

  it("calculates mass", () => {
    const result = calculateKineticEnergy({
      kineticEnergy: 100,
      speed: 5,
      solveFor: "mass",
    });

    expect(result.value).toBe(8);
    expect(result.details.mass).toBe(8);
  });

  it("calculates speed", () => {
    const result = calculateKineticEnergy({
      kineticEnergy: 144,
      mass: 8,
      solveFor: "speed",
    });

    expect(result.value).toBe(6);
    expect(result.details.speed).toBe(6);
  });

  it("calculates zero speed from zero energy", () => {
    const result = calculateKineticEnergy({
      kineticEnergy: 0,
      mass: 12,
      solveFor: "speed",
    });

    expect(result.value).toBe(0);
  });

  it("rejects zero mass", () => {
    expect(() =>
      calculateKineticEnergy({
        mass: 0,
        speed: 3,
        solveFor: "kineticEnergy",
      }),
    ).toThrow("Mass must be greater than zero.");
  });

  it("rejects negative mass", () => {
    expect(() =>
      calculateKineticEnergy({
        mass: -2,
        speed: 3,
        solveFor: "kineticEnergy",
      }),
    ).toThrow("Mass must be greater than zero.");
  });

  it("rejects negative speed", () => {
    expect(() =>
      calculateKineticEnergy({
        mass: 4,
        speed: -3,
        solveFor: "kineticEnergy",
      }),
    ).toThrow("Speed cannot be negative.");
  });

  it("rejects negative kinetic energy", () => {
    expect(() =>
      calculateKineticEnergy({
        kineticEnergy: -20,
        mass: 4,
        solveFor: "speed",
      }),
    ).toThrow(
      "Kinetic energy cannot be negative.",
    );
  });

  it("rejects zero speed when calculating mass", () => {
    expect(() =>
      calculateKineticEnergy({
        kineticEnergy: 20,
        speed: 0,
        solveFor: "mass",
      }),
    ).toThrow(
      "Speed must be greater than zero when calculating mass.",
    );
  });

  it("rejects zero energy when calculating mass", () => {
    expect(() =>
      calculateKineticEnergy({
        kineticEnergy: 0,
        speed: 5,
        solveFor: "mass",
      }),
    ).toThrow(
      "Kinetic energy must be greater than zero when calculating mass.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateKineticEnergy({
        mass: Number.POSITIVE_INFINITY,
        speed: 5,
        solveFor: "kineticEnergy",
      }),
    ).toThrow(
      "Mass must be a finite number.",
    );
  });
});
