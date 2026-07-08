import { describe, expect, it } from "vitest";

import {
  calculateAngularAcceleration,
} from "../angular-acceleration";

describe("calculateAngularAcceleration", () => {
  it("calculates angular acceleration", () => {
    const result =
      calculateAngularAcceleration({
        angularVelocityChange: 12,
        time: 4,
        solveFor: "angularAcceleration",
      });

    expect(result.value).toBeCloseTo(3);
    expect(result.details.formula).toBe(
      "α = Δω ÷ t",
    );
  });

  it("calculates angular velocity change", () => {
    const result =
      calculateAngularAcceleration({
        angularAcceleration: 3,
        time: 4,
        solveFor: "angularVelocityChange",
      });

    expect(result.value).toBeCloseTo(12);
  });

  it("calculates time", () => {
    const result =
      calculateAngularAcceleration({
        angularAcceleration: 3,
        angularVelocityChange: 12,
        solveFor: "time",
      });

    expect(result.value).toBeCloseTo(4);
  });

  it("supports decimal values", () => {
    const result =
      calculateAngularAcceleration({
        angularVelocityChange: 7.5,
        time: 2.5,
        solveFor: "angularAcceleration",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("rejects zero angular velocity change", () => {
    expect(() =>
      calculateAngularAcceleration({
        angularVelocityChange: 0,
        time: 4,
        solveFor: "angularAcceleration",
      }),
    ).toThrow(
      "Angular velocity change must be greater than zero.",
    );
  });

  it("rejects negative angular velocity change", () => {
    expect(() =>
      calculateAngularAcceleration({
        angularVelocityChange: -12,
        time: 4,
        solveFor: "angularAcceleration",
      }),
    ).toThrow(
      "Angular velocity change must be greater than zero.",
    );
  });

  it("rejects zero time", () => {
    expect(() =>
      calculateAngularAcceleration({
        angularVelocityChange: 12,
        time: 0,
        solveFor: "angularAcceleration",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects negative time", () => {
    expect(() =>
      calculateAngularAcceleration({
        angularAcceleration: 3,
        time: -4,
        solveFor: "angularVelocityChange",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects zero angular acceleration", () => {
    expect(() =>
      calculateAngularAcceleration({
        angularAcceleration: 0,
        angularVelocityChange: 12,
        solveFor: "time",
      }),
    ).toThrow(
      "Angular acceleration must be greater than zero.",
    );
  });

  it("rejects negative angular acceleration", () => {
    expect(() =>
      calculateAngularAcceleration({
        angularAcceleration: -3,
        time: 4,
        solveFor: "angularVelocityChange",
      }),
    ).toThrow(
      "Angular acceleration must be greater than zero.",
    );
  });

  it("rejects non-finite angular velocity change", () => {
    expect(() =>
      calculateAngularAcceleration({
        angularVelocityChange:
          Number.POSITIVE_INFINITY,
        time: 4,
        solveFor: "angularAcceleration",
      }),
    ).toThrow(
      "Angular velocity change must be a finite number.",
    );
  });

  it("rejects non-finite time", () => {
    expect(() =>
      calculateAngularAcceleration({
        angularVelocityChange: 12,
        time: Number.NaN,
        solveFor: "angularAcceleration",
      }),
    ).toThrow(
      "Time must be a finite number.",
    );
  });
});
