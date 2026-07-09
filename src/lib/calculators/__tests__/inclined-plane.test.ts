import { describe, expect, it } from "vitest";

import { calculateInclinedPlane } from "../inclined-plane";

describe("calculateInclinedPlane", () => {
  it("calculates force parallel to the incline", () => {
    const result = calculateInclinedPlane({
      mass: 10,
      angleDegrees: 30,
      gravity: 9.81,
      solveFor: "parallelForce",
    });

    expect(result.value).toBeCloseTo(49.05);
    expect(result.details.formula).toBe(
      "F∥ = mg sin(θ)",
    );
  });

  it("calculates normal force", () => {
    const result = calculateInclinedPlane({
      mass: 10,
      angleDegrees: 30,
      gravity: 9.81,
      solveFor: "normalForce",
    });

    expect(result.value).toBeCloseTo(
      84.957,
      3,
    );
  });

  it("calculates friction force", () => {
    const result = calculateInclinedPlane({
      mass: 10,
      angleDegrees: 30,
      gravity: 9.81,
      coefficient: 0.2,
      solveFor: "frictionForce",
    });

    expect(result.value).toBeCloseTo(
      16.991,
      3,
    );
  });

  it("calculates net force down the incline", () => {
    const result = calculateInclinedPlane({
      mass: 10,
      angleDegrees: 30,
      gravity: 9.81,
      coefficient: 0.2,
      solveFor: "netForce",
    });

    expect(result.value).toBeCloseTo(
      32.059,
      3,
    );
  });

  it("calculates acceleration down the incline", () => {
    const result = calculateInclinedPlane({
      mass: 10,
      angleDegrees: 30,
      gravity: 9.81,
      coefficient: 0.2,
      solveFor: "acceleration",
    });

    expect(result.value).toBeCloseTo(
      3.206,
      3,
    );
  });

  it("defaults to standard gravity", () => {
    const result = calculateInclinedPlane({
      mass: 2,
      angleDegrees: 90 - 0.001,
      solveFor: "parallelForce",
    });

    expect(result.details.gravity).toBe(
      9.80665,
    );
  });

  it("defaults to zero friction", () => {
    const result = calculateInclinedPlane({
      mass: 5,
      angleDegrees: 20,
      solveFor: "frictionForce",
    });

    expect(result.value).toBe(0);
    expect(result.details.coefficient).toBe(
      0,
    );
  });

  it("allows a horizontal surface", () => {
    const result = calculateInclinedPlane({
      mass: 5,
      angleDegrees: 0,
      gravity: 9.81,
      solveFor: "parallelForce",
    });

    expect(result.value).toBeCloseTo(0);
    expect(result.details.normalForce).toBeCloseTo(
      49.05,
    );
  });

  it("can return negative net force when friction is larger", () => {
    const result = calculateInclinedPlane({
      mass: 10,
      angleDegrees: 10,
      gravity: 9.81,
      coefficient: 0.5,
      solveFor: "netForce",
    });

    expect(result.value).toBeLessThan(0);
  });

  it("stores all calculated details", () => {
    const result = calculateInclinedPlane({
      mass: 8,
      angleDegrees: 25,
      gravity: 9.81,
      coefficient: 0.15,
      solveFor: "acceleration",
    });

    expect(result.details.mass).toBe(8);
    expect(result.details.angleDegrees).toBe(
      25,
    );
    expect(result.details.coefficient).toBe(
      0.15,
    );
    expect(
      result.details.angleRadians,
    ).toBeCloseTo(
      (25 * Math.PI) / 180,
    );
  });

  it("formats the solved value", () => {
    const result = calculateInclinedPlane({
      mass: 3,
      angleDegrees: 30,
      gravity: 9.81,
      solveFor: "parallelForce",
    });

    expect(result.formattedValue).toBe(
      "14.715",
    );
  });

  it("rejects zero mass", () => {
    expect(() =>
      calculateInclinedPlane({
        mass: 0,
        angleDegrees: 30,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects negative mass", () => {
    expect(() =>
      calculateInclinedPlane({
        mass: -1,
        angleDegrees: 30,
        solveFor: "normalForce",
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects negative incline angles", () => {
    expect(() =>
      calculateInclinedPlane({
        mass: 10,
        angleDegrees: -5,
        solveFor: "parallelForce",
      }),
    ).toThrow(
      "Incline angle must be at least 0° and less than 90°.",
    );
  });

  it("rejects incline angles of 90 degrees", () => {
    expect(() =>
      calculateInclinedPlane({
        mass: 10,
        angleDegrees: 90,
        solveFor: "normalForce",
      }),
    ).toThrow(
      "Incline angle must be at least 0° and less than 90°.",
    );
  });

  it("rejects negative coefficients", () => {
    expect(() =>
      calculateInclinedPlane({
        mass: 10,
        angleDegrees: 30,
        coefficient: -0.2,
        solveFor: "frictionForce",
      }),
    ).toThrow(
      "Coefficient of friction cannot be negative.",
    );
  });

  it("rejects non-finite gravity", () => {
    expect(() =>
      calculateInclinedPlane({
        mass: 10,
        angleDegrees: 30,
        gravity: Number.NaN,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Gravity must be a finite number.",
    );
  });

  it("rejects unsupported variables", () => {
    expect(() =>
      calculateInclinedPlane({
        mass: 10,
        angleDegrees: 30,
        solveFor: "velocity" as never,
      }),
    ).toThrow(
      "Unsupported inclined-plane variable.",
    );
  });
});
