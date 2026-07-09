import { describe, expect, it } from "vitest";

import { calculateFriction } from "../friction";

describe("calculateFriction", () => {
  it("calculates kinetic friction force", () => {
    const result = calculateFriction({
      coefficient: 0.3,
      normalForce: 100,
      frictionType: "kinetic",
      solveFor: "frictionForce",
    });

    expect(result.value).toBeCloseTo(30);
    expect(result.details.formula).toBe(
      "Fk = μkN",
    );
  });

  it("calculates static friction force", () => {
    const result = calculateFriction({
      coefficient: 0.5,
      normalForce: 80,
      frictionType: "static",
      solveFor: "frictionForce",
    });

    expect(result.value).toBeCloseTo(40);
    expect(result.details.formula).toBe(
      "Fs = μsN",
    );
  });

  it("defaults to kinetic friction", () => {
    const result = calculateFriction({
      coefficient: 0.2,
      normalForce: 50,
      solveFor: "frictionForce",
    });

    expect(result.details.frictionType).toBe(
      "kinetic",
    );
    expect(result.details.formula).toBe(
      "Fk = μkN",
    );
  });

  it("calculates the coefficient of friction", () => {
    const result = calculateFriction({
      frictionForce: 25,
      normalForce: 100,
      solveFor: "coefficient",
    });

    expect(result.value).toBeCloseTo(0.25);
  });

  it("calculates normal force", () => {
    const result = calculateFriction({
      frictionForce: 30,
      coefficient: 0.3,
      solveFor: "normalForce",
    });

    expect(result.value).toBeCloseTo(100);
  });

  it("formats the calculated result", () => {
    const result = calculateFriction({
      coefficient: 0.25,
      normalForce: 98.1,
      solveFor: "frictionForce",
    });

    expect(result.formattedValue).toBe(
      "24.525",
    );
  });

  it("stores all calculated details", () => {
    const result = calculateFriction({
      coefficient: 0.4,
      normalForce: 50,
      solveFor: "frictionForce",
    });

    expect(result.details.frictionForce).toBe(
      20,
    );
    expect(result.details.coefficient).toBe(
      0.4,
    );
    expect(result.details.normalForce).toBe(
      50,
    );
  });

  it("rejects zero coefficient", () => {
    expect(() =>
      calculateFriction({
        coefficient: 0,
        normalForce: 100,
        solveFor: "frictionForce",
      }),
    ).toThrow(
      "Coefficient of friction must be greater than zero.",
    );
  });

  it("rejects negative coefficient", () => {
    expect(() =>
      calculateFriction({
        coefficient: -0.2,
        normalForce: 100,
        solveFor: "frictionForce",
      }),
    ).toThrow(
      "Coefficient of friction must be greater than zero.",
    );
  });

  it("rejects zero normal force", () => {
    expect(() =>
      calculateFriction({
        coefficient: 0.3,
        normalForce: 0,
        solveFor: "frictionForce",
      }),
    ).toThrow(
      "Normal force must be greater than zero.",
    );
  });

  it("rejects negative friction force", () => {
    expect(() =>
      calculateFriction({
        frictionForce: -10,
        normalForce: 100,
        solveFor: "coefficient",
      }),
    ).toThrow(
      "Friction force must be greater than zero.",
    );
  });

  it("rejects missing values", () => {
    expect(() =>
      calculateFriction({
        normalForce: 100,
        solveFor: "frictionForce",
      }),
    ).toThrow(
      "Coefficient of friction must be a finite number.",
    );
  });

  it("rejects non-finite coefficient", () => {
    expect(() =>
      calculateFriction({
        coefficient: Number.NaN,
        normalForce: 100,
        solveFor: "frictionForce",
      }),
    ).toThrow(
      "Coefficient of friction must be a finite number.",
    );
  });

  it("rejects infinite normal force", () => {
    expect(() =>
      calculateFriction({
        coefficient: 0.3,
        normalForce:
          Number.POSITIVE_INFINITY,
        solveFor: "frictionForce",
      }),
    ).toThrow(
      "Normal force must be a finite number.",
    );
  });

  it("rejects an invalid friction type", () => {
    expect(() =>
      calculateFriction({
        coefficient: 0.3,
        normalForce: 100,
        frictionType:
          "rolling" as never,
        solveFor: "frictionForce",
      }),
    ).toThrow(
      "Friction type must be static or kinetic.",
    );
  });
});
