import { describe, expect, it } from "vitest";

import {
  calculateCentripetalAcceleration,
} from "../centripetal-acceleration";

describe("calculateCentripetalAcceleration", () => {
  it("calculates centripetal acceleration", () => {
    const result =
      calculateCentripetalAcceleration({
        velocity: 10,
        radius: 5,
        solveFor: "acceleration",
      });

    expect(result.value).toBeCloseTo(20);
    expect(result.details.formula).toBe(
      "ac = v² ÷ r",
    );
  });

  it("calculates velocity", () => {
    const result =
      calculateCentripetalAcceleration({
        acceleration: 20,
        radius: 5,
        solveFor: "velocity",
      });

    expect(result.value).toBeCloseTo(10);
  });

  it("calculates radius", () => {
    const result =
      calculateCentripetalAcceleration({
        acceleration: 20,
        velocity: 10,
        solveFor: "radius",
      });

    expect(result.value).toBeCloseTo(5);
  });

  it("supports decimal values", () => {
    const result =
      calculateCentripetalAcceleration({
        velocity: 7.5,
        radius: 2.5,
        solveFor: "acceleration",
      });

    expect(result.value).toBeCloseTo(22.5);
  });

  it("rejects zero velocity", () => {
    expect(() =>
      calculateCentripetalAcceleration({
        velocity: 0,
        radius: 5,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Velocity must be greater than zero.",
    );
  });

  it("rejects negative velocity", () => {
    expect(() =>
      calculateCentripetalAcceleration({
        velocity: -10,
        radius: 5,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Velocity must be greater than zero.",
    );
  });

  it("rejects zero radius", () => {
    expect(() =>
      calculateCentripetalAcceleration({
        velocity: 10,
        radius: 0,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Radius must be greater than zero.",
    );
  });

  it("rejects negative radius", () => {
    expect(() =>
      calculateCentripetalAcceleration({
        acceleration: 20,
        radius: -5,
        solveFor: "velocity",
      }),
    ).toThrow(
      "Radius must be greater than zero.",
    );
  });

  it("rejects zero acceleration", () => {
    expect(() =>
      calculateCentripetalAcceleration({
        acceleration: 0,
        velocity: 10,
        solveFor: "radius",
      }),
    ).toThrow(
      "Centripetal acceleration must be greater than zero.",
    );
  });

  it("rejects negative acceleration", () => {
    expect(() =>
      calculateCentripetalAcceleration({
        acceleration: -20,
        radius: 5,
        solveFor: "velocity",
      }),
    ).toThrow(
      "Centripetal acceleration must be greater than zero.",
    );
  });

  it("rejects non-finite velocity", () => {
    expect(() =>
      calculateCentripetalAcceleration({
        velocity: Number.POSITIVE_INFINITY,
        radius: 5,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Velocity must be a finite number.",
    );
  });

  it("rejects non-finite radius", () => {
    expect(() =>
      calculateCentripetalAcceleration({
        velocity: 10,
        radius: Number.NaN,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Radius must be a finite number.",
    );
  });
});
