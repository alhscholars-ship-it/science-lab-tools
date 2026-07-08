import { describe, expect, it } from "vitest";

import {
  calculateAngularMomentum,
} from "../angular-momentum";

describe("calculateAngularMomentum", () => {
  it("calculates angular momentum", () => {
    const result =
      calculateAngularMomentum({
        momentOfInertia: 4,
        angularVelocity: 3,
        solveFor: "angularMomentum",
      });

    expect(result.value).toBeCloseTo(12);
    expect(result.details.formula).toBe(
      "L = Iω",
    );
  });

  it("calculates moment of inertia", () => {
    const result =
      calculateAngularMomentum({
        angularMomentum: 12,
        angularVelocity: 3,
        solveFor: "momentOfInertia",
      });

    expect(result.value).toBeCloseTo(4);
  });

  it("calculates angular velocity", () => {
    const result =
      calculateAngularMomentum({
        angularMomentum: 12,
        momentOfInertia: 4,
        solveFor: "angularVelocity",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("supports decimal values", () => {
    const result =
      calculateAngularMomentum({
        momentOfInertia: 2.5,
        angularVelocity: 1.2,
        solveFor: "angularMomentum",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("rejects zero moment of inertia", () => {
    expect(() =>
      calculateAngularMomentum({
        momentOfInertia: 0,
        angularVelocity: 3,
        solveFor: "angularMomentum",
      }),
    ).toThrow(
      "Moment of inertia must be greater than zero.",
    );
  });

  it("rejects negative moment of inertia", () => {
    expect(() =>
      calculateAngularMomentum({
        momentOfInertia: -4,
        angularVelocity: 3,
        solveFor: "angularMomentum",
      }),
    ).toThrow(
      "Moment of inertia must be greater than zero.",
    );
  });

  it("rejects zero angular velocity", () => {
    expect(() =>
      calculateAngularMomentum({
        momentOfInertia: 4,
        angularVelocity: 0,
        solveFor: "angularMomentum",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects negative angular velocity", () => {
    expect(() =>
      calculateAngularMomentum({
        angularMomentum: 12,
        angularVelocity: -3,
        solveFor: "momentOfInertia",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects zero angular momentum", () => {
    expect(() =>
      calculateAngularMomentum({
        angularMomentum: 0,
        momentOfInertia: 4,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Angular momentum must be greater than zero.",
    );
  });

  it("rejects negative angular momentum", () => {
    expect(() =>
      calculateAngularMomentum({
        angularMomentum: -12,
        momentOfInertia: 4,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Angular momentum must be greater than zero.",
    );
  });

  it("rejects non-finite moment of inertia", () => {
    expect(() =>
      calculateAngularMomentum({
        momentOfInertia:
          Number.POSITIVE_INFINITY,
        angularVelocity: 3,
        solveFor: "angularMomentum",
      }),
    ).toThrow(
      "Moment of inertia must be a finite number.",
    );
  });

  it("rejects non-finite angular velocity", () => {
    expect(() =>
      calculateAngularMomentum({
        momentOfInertia: 4,
        angularVelocity: Number.NaN,
        solveFor: "angularMomentum",
      }),
    ).toThrow(
      "Angular velocity must be a finite number.",
    );
  });
});
