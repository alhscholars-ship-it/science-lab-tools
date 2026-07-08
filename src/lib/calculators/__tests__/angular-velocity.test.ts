import { describe, expect, it } from "vitest";

import {
  calculateAngularVelocity,
} from "../angular-velocity";

describe("calculateAngularVelocity", () => {
  it("calculates angular velocity", () => {
    const result =
      calculateAngularVelocity({
        angularDisplacement: 12,
        time: 4,
        solveFor: "angularVelocity",
      });

    expect(result.value).toBeCloseTo(3);
    expect(result.details.formula).toBe(
      "ω = θ ÷ t",
    );
  });

  it("calculates angular displacement", () => {
    const result =
      calculateAngularVelocity({
        angularVelocity: 3,
        time: 4,
        solveFor: "angularDisplacement",
      });

    expect(result.value).toBeCloseTo(12);
  });

  it("calculates time", () => {
    const result =
      calculateAngularVelocity({
        angularVelocity: 3,
        angularDisplacement: 12,
        solveFor: "time",
      });

    expect(result.value).toBeCloseTo(4);
  });

  it("supports decimal values", () => {
    const result =
      calculateAngularVelocity({
        angularDisplacement: 7.5,
        time: 2.5,
        solveFor: "angularVelocity",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("rejects zero angular displacement", () => {
    expect(() =>
      calculateAngularVelocity({
        angularDisplacement: 0,
        time: 4,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Angular displacement must be greater than zero.",
    );
  });

  it("rejects negative angular displacement", () => {
    expect(() =>
      calculateAngularVelocity({
        angularDisplacement: -12,
        time: 4,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Angular displacement must be greater than zero.",
    );
  });

  it("rejects zero time", () => {
    expect(() =>
      calculateAngularVelocity({
        angularDisplacement: 12,
        time: 0,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects negative time", () => {
    expect(() =>
      calculateAngularVelocity({
        angularVelocity: 3,
        time: -4,
        solveFor: "angularDisplacement",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects zero angular velocity", () => {
    expect(() =>
      calculateAngularVelocity({
        angularVelocity: 0,
        angularDisplacement: 12,
        solveFor: "time",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects negative angular velocity", () => {
    expect(() =>
      calculateAngularVelocity({
        angularVelocity: -3,
        time: 4,
        solveFor: "angularDisplacement",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects non-finite angular displacement", () => {
    expect(() =>
      calculateAngularVelocity({
        angularDisplacement:
          Number.POSITIVE_INFINITY,
        time: 4,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Angular displacement must be a finite number.",
    );
  });

  it("rejects non-finite time", () => {
    expect(() =>
      calculateAngularVelocity({
        angularDisplacement: 12,
        time: Number.NaN,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Time must be a finite number.",
    );
  });
});
