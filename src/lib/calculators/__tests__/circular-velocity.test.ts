import { describe, expect, it } from "vitest";

import {
  calculateCircularVelocity,
} from "../circular-velocity";

describe("calculateCircularVelocity", () => {
  it("calculates velocity", () => {
    const result =
      calculateCircularVelocity({
        radius: 5,
        period: 10,
        solveFor: "velocity",
      });

    expect(result.value).toBeCloseTo(
      Math.PI,
    );
    expect(result.details.formula).toBe(
      "v = 2πr ÷ T",
    );
  });

  it("calculates radius", () => {
    const result =
      calculateCircularVelocity({
        velocity: Math.PI,
        period: 10,
        solveFor: "radius",
      });

    expect(result.value).toBeCloseTo(5);
  });

  it("calculates period", () => {
    const result =
      calculateCircularVelocity({
        velocity: Math.PI,
        radius: 5,
        solveFor: "period",
      });

    expect(result.value).toBeCloseTo(10);
  });

  it("supports decimal values", () => {
    const result =
      calculateCircularVelocity({
        radius: 2.5,
        period: 4.2,
        solveFor: "velocity",
      });

    expect(result.value).toBeCloseTo(
      (2 * Math.PI * 2.5) / 4.2,
    );
  });

  it("rejects zero radius", () => {
    expect(() =>
      calculateCircularVelocity({
        radius: 0,
        period: 10,
        solveFor: "velocity",
      }),
    ).toThrow(
      "Radius must be greater than zero.",
    );
  });

  it("rejects negative radius", () => {
    expect(() =>
      calculateCircularVelocity({
        radius: -5,
        period: 10,
        solveFor: "velocity",
      }),
    ).toThrow(
      "Radius must be greater than zero.",
    );
  });

  it("rejects zero period", () => {
    expect(() =>
      calculateCircularVelocity({
        radius: 5,
        period: 0,
        solveFor: "velocity",
      }),
    ).toThrow(
      "Period must be greater than zero.",
    );
  });

  it("rejects negative period", () => {
    expect(() =>
      calculateCircularVelocity({
        velocity: Math.PI,
        period: -10,
        solveFor: "radius",
      }),
    ).toThrow(
      "Period must be greater than zero.",
    );
  });

  it("rejects zero velocity", () => {
    expect(() =>
      calculateCircularVelocity({
        velocity: 0,
        radius: 5,
        solveFor: "period",
      }),
    ).toThrow(
      "Velocity must be greater than zero.",
    );
  });

  it("rejects negative velocity", () => {
    expect(() =>
      calculateCircularVelocity({
        velocity: -Math.PI,
        period: 10,
        solveFor: "radius",
      }),
    ).toThrow(
      "Velocity must be greater than zero.",
    );
  });

  it("rejects non-finite radius", () => {
    expect(() =>
      calculateCircularVelocity({
        radius: Number.POSITIVE_INFINITY,
        period: 10,
        solveFor: "velocity",
      }),
    ).toThrow(
      "Radius must be a finite number.",
    );
  });

  it("rejects non-finite period", () => {
    expect(() =>
      calculateCircularVelocity({
        radius: 5,
        period: Number.NaN,
        solveFor: "velocity",
      }),
    ).toThrow(
      "Period must be a finite number.",
    );
  });
});
