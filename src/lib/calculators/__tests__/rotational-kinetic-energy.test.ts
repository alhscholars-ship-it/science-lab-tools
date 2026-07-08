import { describe, expect, it } from "vitest";

import {
  calculateRotationalKineticEnergy,
} from "../rotational-kinetic-energy";

describe("calculateRotationalKineticEnergy", () => {
  it("calculates rotational kinetic energy", () => {
    const result =
      calculateRotationalKineticEnergy({
        momentOfInertia: 4,
        angularVelocity: 3,
        solveFor:
          "rotationalKineticEnergy",
      });

    expect(result.value).toBeCloseTo(18);
    expect(result.details.formula).toBe(
      "KErot = ½Iω²",
    );
  });

  it("calculates moment of inertia", () => {
    const result =
      calculateRotationalKineticEnergy({
        rotationalKineticEnergy: 18,
        angularVelocity: 3,
        solveFor: "momentOfInertia",
      });

    expect(result.value).toBeCloseTo(4);
  });

  it("calculates angular velocity", () => {
    const result =
      calculateRotationalKineticEnergy({
        rotationalKineticEnergy: 18,
        momentOfInertia: 4,
        solveFor: "angularVelocity",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("supports decimal values", () => {
    const result =
      calculateRotationalKineticEnergy({
        momentOfInertia: 2.5,
        angularVelocity: 4.2,
        solveFor:
          "rotationalKineticEnergy",
      });

    expect(result.value).toBeCloseTo(
      0.5 * 2.5 * 4.2 ** 2,
    );
  });

  it("rejects zero moment of inertia", () => {
    expect(() =>
      calculateRotationalKineticEnergy({
        momentOfInertia: 0,
        angularVelocity: 3,
        solveFor:
          "rotationalKineticEnergy",
      }),
    ).toThrow(
      "Moment of inertia must be greater than zero.",
    );
  });

  it("rejects negative moment of inertia", () => {
    expect(() =>
      calculateRotationalKineticEnergy({
        momentOfInertia: -4,
        angularVelocity: 3,
        solveFor:
          "rotationalKineticEnergy",
      }),
    ).toThrow(
      "Moment of inertia must be greater than zero.",
    );
  });

  it("rejects zero angular velocity", () => {
    expect(() =>
      calculateRotationalKineticEnergy({
        momentOfInertia: 4,
        angularVelocity: 0,
        solveFor:
          "rotationalKineticEnergy",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects negative angular velocity", () => {
    expect(() =>
      calculateRotationalKineticEnergy({
        rotationalKineticEnergy: 18,
        angularVelocity: -3,
        solveFor: "momentOfInertia",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects zero rotational kinetic energy", () => {
    expect(() =>
      calculateRotationalKineticEnergy({
        rotationalKineticEnergy: 0,
        momentOfInertia: 4,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Rotational kinetic energy must be greater than zero.",
    );
  });

  it("rejects negative rotational kinetic energy", () => {
    expect(() =>
      calculateRotationalKineticEnergy({
        rotationalKineticEnergy: -18,
        angularVelocity: 3,
        solveFor: "momentOfInertia",
      }),
    ).toThrow(
      "Rotational kinetic energy must be greater than zero.",
    );
  });

  it("rejects non-finite moment of inertia", () => {
    expect(() =>
      calculateRotationalKineticEnergy({
        momentOfInertia:
          Number.POSITIVE_INFINITY,
        angularVelocity: 3,
        solveFor:
          "rotationalKineticEnergy",
      }),
    ).toThrow(
      "Moment of inertia must be a finite number.",
    );
  });

  it("rejects non-finite angular velocity", () => {
    expect(() =>
      calculateRotationalKineticEnergy({
        momentOfInertia: 4,
        angularVelocity: Number.NaN,
        solveFor:
          "rotationalKineticEnergy",
      }),
    ).toThrow(
      "Angular velocity must be a finite number.",
    );
  });
});
