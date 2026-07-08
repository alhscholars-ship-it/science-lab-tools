import { describe, expect, it } from "vitest";

import {
  calculateCentripetalForce,
} from "../centripetal-force";

describe("calculateCentripetalForce", () => {
  it("calculates centripetal force", () => {
    const result =
      calculateCentripetalForce({
        mass: 4,
        velocity: 6,
        radius: 3,
        solveFor: "centripetalForce",
      });

    expect(result.value).toBe(48);
    expect(
      result.details.centripetalForce,
    ).toBe(48);
    expect(result.details.formula).toBe(
      "Fc = mv² ÷ r",
    );
  });

  it("calculates mass", () => {
    const result =
      calculateCentripetalForce({
        centripetalForce: 48,
        velocity: 6,
        radius: 3,
        solveFor: "mass",
      });

    expect(result.value).toBe(4);
  });

  it("calculates velocity", () => {
    const result =
      calculateCentripetalForce({
        centripetalForce: 48,
        mass: 4,
        radius: 3,
        solveFor: "velocity",
      });

    expect(result.value).toBe(6);
  });

  it("calculates radius", () => {
    const result =
      calculateCentripetalForce({
        centripetalForce: 48,
        mass: 4,
        velocity: 6,
        solveFor: "radius",
      });

    expect(result.value).toBe(3);
  });

  it("supports decimal values", () => {
    const result =
      calculateCentripetalForce({
        mass: 2.5,
        velocity: 4.2,
        radius: 1.5,
        solveFor: "centripetalForce",
      });

    expect(result.value).toBeCloseTo(29.4);
  });

  it("rejects zero mass", () => {
    expect(() =>
      calculateCentripetalForce({
        mass: 0,
        velocity: 6,
        radius: 3,
        solveFor: "centripetalForce",
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects negative velocity", () => {
    expect(() =>
      calculateCentripetalForce({
        mass: 4,
        velocity: -6,
        radius: 3,
        solveFor: "centripetalForce",
      }),
    ).toThrow(
      "Velocity must be greater than zero.",
    );
  });

  it("rejects zero radius", () => {
    expect(() =>
      calculateCentripetalForce({
        mass: 4,
        velocity: 6,
        radius: 0,
        solveFor: "centripetalForce",
      }),
    ).toThrow(
      "Radius must be greater than zero.",
    );
  });

  it("rejects negative centripetal force", () => {
    expect(() =>
      calculateCentripetalForce({
        centripetalForce: -48,
        velocity: 6,
        radius: 3,
        solveFor: "mass",
      }),
    ).toThrow(
      "Centripetal force must be greater than zero.",
    );
  });

  it("rejects zero centripetal force", () => {
    expect(() =>
      calculateCentripetalForce({
        centripetalForce: 0,
        mass: 4,
        radius: 3,
        solveFor: "velocity",
      }),
    ).toThrow(
      "Centripetal force must be greater than zero.",
    );
  });

  it("rejects non-finite mass", () => {
    expect(() =>
      calculateCentripetalForce({
        mass: Number.POSITIVE_INFINITY,
        velocity: 6,
        radius: 3,
        solveFor: "centripetalForce",
      }),
    ).toThrow(
      "Mass must be a finite number.",
    );
  });

  it("rejects non-finite radius", () => {
    expect(() =>
      calculateCentripetalForce({
        mass: 4,
        velocity: 6,
        radius: Number.NaN,
        solveFor: "centripetalForce",
      }),
    ).toThrow(
      "Radius must be a finite number.",
    );
  });
});
