import { describe, expect, it } from "vitest";

import {
  calculateAngularDisplacement,
} from "../angular-displacement";

describe("calculateAngularDisplacement", () => {
  it("calculates angular displacement", () => {
    const result =
      calculateAngularDisplacement({
        angularVelocity: 4,
        time: 3,
        solveFor: "angularDisplacement",
      });

    expect(result.value).toBeCloseTo(12);
    expect(result.details.formula).toBe(
      "θ = ωt",
    );
  });

  it("calculates angular velocity", () => {
    const result =
      calculateAngularDisplacement({
        angularDisplacement: 20,
        time: 5,
        solveFor: "angularVelocity",
      });

    expect(result.value).toBeCloseTo(4);
    expect(result.details.formula).toBe(
      "ω = θ / t",
    );
  });

  it("calculates time", () => {
    const result =
      calculateAngularDisplacement({
        angularDisplacement: 18,
        angularVelocity: 6,
        solveFor: "time",
      });

    expect(result.value).toBeCloseTo(3);
    expect(result.details.formula).toBe(
      "t = θ / ω",
    );
  });

  it("supports decimal values", () => {
    const result =
      calculateAngularDisplacement({
        angularVelocity: 2.5,
        time: 1.2,
        solveFor: "angularDisplacement",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("rejects zero angular displacement", () => {
    expect(() =>
      calculateAngularDisplacement({
        angularDisplacement: 0,
        time: 2,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Angular displacement must be greater than zero.",
    );
  });

  it("rejects negative angular velocity", () => {
    expect(() =>
      calculateAngularDisplacement({
        angularDisplacement: 10,
        angularVelocity: -2,
        solveFor: "time",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects zero time", () => {
    expect(() =>
      calculateAngularDisplacement({
        angularDisplacement: 10,
        time: 0,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects non-finite angular displacement", () => {
    expect(() =>
      calculateAngularDisplacement({
        angularDisplacement:
          Number.POSITIVE_INFINITY,
        time: 2,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Angular displacement must be a finite number.",
    );
  });

  it("rejects non-finite angular velocity", () => {
    expect(() =>
      calculateAngularDisplacement({
        angularVelocity: Number.NaN,
        time: 2,
        solveFor: "angularDisplacement",
      }),
    ).toThrow(
      "Angular velocity must be a finite number.",
    );
  });

  it("rejects non-finite time", () => {
    expect(() =>
      calculateAngularDisplacement({
        angularVelocity: 3,
        time: Number.NaN,
        solveFor: "angularDisplacement",
      }),
    ).toThrow(
      "Time must be a finite number.",
    );
  });
});
