import { describe, expect, it } from "vitest";

import {
  calculateAngularImpulse,
} from "../angular-impulse";

describe("calculateAngularImpulse", () => {
  it("calculates angular impulse", () => {
    const result =
      calculateAngularImpulse({
        torque: 8,
        time: 3,
        solveFor: "angularImpulse",
      });

    expect(result.value).toBeCloseTo(24);
    expect(result.details.formula).toBe(
      "J = τt = ΔL",
    );
  });

  it("calculates torque", () => {
    const result =
      calculateAngularImpulse({
        angularImpulse: 24,
        time: 3,
        solveFor: "torque",
      });

    expect(result.value).toBeCloseTo(8);
  });

  it("calculates time", () => {
    const result =
      calculateAngularImpulse({
        angularImpulse: 24,
        torque: 8,
        solveFor: "time",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("supports decimal values", () => {
    const result =
      calculateAngularImpulse({
        torque: 2.5,
        time: 1.2,
        solveFor: "angularImpulse",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("rejects zero torque", () => {
    expect(() =>
      calculateAngularImpulse({
        torque: 0,
        time: 3,
        solveFor: "angularImpulse",
      }),
    ).toThrow(
      "Torque must be greater than zero.",
    );
  });

  it("rejects negative torque", () => {
    expect(() =>
      calculateAngularImpulse({
        torque: -8,
        time: 3,
        solveFor: "angularImpulse",
      }),
    ).toThrow(
      "Torque must be greater than zero.",
    );
  });

  it("rejects zero time", () => {
    expect(() =>
      calculateAngularImpulse({
        torque: 8,
        time: 0,
        solveFor: "angularImpulse",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects negative time", () => {
    expect(() =>
      calculateAngularImpulse({
        angularImpulse: 24,
        time: -3,
        solveFor: "torque",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects zero angular impulse", () => {
    expect(() =>
      calculateAngularImpulse({
        angularImpulse: 0,
        torque: 8,
        solveFor: "time",
      }),
    ).toThrow(
      "Angular impulse must be greater than zero.",
    );
  });

  it("rejects negative angular impulse", () => {
    expect(() =>
      calculateAngularImpulse({
        angularImpulse: -24,
        torque: 8,
        solveFor: "time",
      }),
    ).toThrow(
      "Angular impulse must be greater than zero.",
    );
  });

  it("rejects non-finite torque", () => {
    expect(() =>
      calculateAngularImpulse({
        torque:
          Number.POSITIVE_INFINITY,
        time: 3,
        solveFor: "angularImpulse",
      }),
    ).toThrow(
      "Torque must be a finite number.",
    );
  });

  it("rejects non-finite time", () => {
    expect(() =>
      calculateAngularImpulse({
        torque: 8,
        time: Number.NaN,
        solveFor: "angularImpulse",
      }),
    ).toThrow(
      "Time must be a finite number.",
    );
  });
});
