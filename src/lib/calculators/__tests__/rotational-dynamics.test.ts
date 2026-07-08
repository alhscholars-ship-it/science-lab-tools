import { describe, expect, it } from "vitest";

import {
  calculateRotationalDynamics,
} from "../rotational-dynamics";

describe("calculateRotationalDynamics", () => {
  it("calculates torque", () => {
    const result =
      calculateRotationalDynamics({
        momentOfInertia: 4,
        angularAcceleration: 3,
        solveFor: "torque",
      });

    expect(result.value).toBeCloseTo(12);
    expect(result.details.formula).toBe(
      "τ = Iα",
    );
  });

  it("calculates moment of inertia", () => {
    const result =
      calculateRotationalDynamics({
        torque: 12,
        angularAcceleration: 3,
        solveFor: "momentOfInertia",
      });

    expect(result.value).toBeCloseTo(4);
  });

  it("calculates angular acceleration", () => {
    const result =
      calculateRotationalDynamics({
        torque: 12,
        momentOfInertia: 4,
        solveFor: "angularAcceleration",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("supports decimal values", () => {
    const result =
      calculateRotationalDynamics({
        momentOfInertia: 2.5,
        angularAcceleration: 1.2,
        solveFor: "torque",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("rejects zero moment of inertia", () => {
    expect(() =>
      calculateRotationalDynamics({
        momentOfInertia: 0,
        angularAcceleration: 3,
        solveFor: "torque",
      }),
    ).toThrow(
      "Moment of inertia must be greater than zero.",
    );
  });

  it("rejects negative moment of inertia", () => {
    expect(() =>
      calculateRotationalDynamics({
        momentOfInertia: -4,
        angularAcceleration: 3,
        solveFor: "torque",
      }),
    ).toThrow(
      "Moment of inertia must be greater than zero.",
    );
  });

  it("rejects zero angular acceleration", () => {
    expect(() =>
      calculateRotationalDynamics({
        momentOfInertia: 4,
        angularAcceleration: 0,
        solveFor: "torque",
      }),
    ).toThrow(
      "Angular acceleration must be greater than zero.",
    );
  });

  it("rejects negative angular acceleration", () => {
    expect(() =>
      calculateRotationalDynamics({
        torque: 12,
        angularAcceleration: -3,
        solveFor: "momentOfInertia",
      }),
    ).toThrow(
      "Angular acceleration must be greater than zero.",
    );
  });

  it("rejects zero torque", () => {
    expect(() =>
      calculateRotationalDynamics({
        torque: 0,
        momentOfInertia: 4,
        solveFor: "angularAcceleration",
      }),
    ).toThrow(
      "Torque must be greater than zero.",
    );
  });

  it("rejects negative torque", () => {
    expect(() =>
      calculateRotationalDynamics({
        torque: -12,
        momentOfInertia: 4,
        solveFor: "angularAcceleration",
      }),
    ).toThrow(
      "Torque must be greater than zero.",
    );
  });

  it("rejects non-finite moment of inertia", () => {
    expect(() =>
      calculateRotationalDynamics({
        momentOfInertia:
          Number.POSITIVE_INFINITY,
        angularAcceleration: 3,
        solveFor: "torque",
      }),
    ).toThrow(
      "Moment of inertia must be a finite number.",
    );
  });

  it("rejects non-finite angular acceleration", () => {
    expect(() =>
      calculateRotationalDynamics({
        momentOfInertia: 4,
        angularAcceleration: Number.NaN,
        solveFor: "torque",
      }),
    ).toThrow(
      "Angular acceleration must be a finite number.",
    );
  });
});
