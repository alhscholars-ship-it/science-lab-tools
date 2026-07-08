import { describe, expect, it } from "vitest";

import {
  calculateRotationalFrequency,
} from "../rotational-frequency";

describe("calculateRotationalFrequency", () => {
  it("calculates frequency from angular velocity", () => {
    const result =
      calculateRotationalFrequency({
        angularVelocity: 2 * Math.PI,
        solveFor: "frequency",
      });

    expect(result.value).toBeCloseTo(1);
    expect(result.details.period).toBeCloseTo(1);
    expect(result.details.formula).toBe(
      "f = ω / 2π",
    );
  });

  it("calculates frequency from period", () => {
    const result =
      calculateRotationalFrequency({
        period: 0.5,
        solveFor: "frequency",
      });

    expect(result.value).toBeCloseTo(2);
    expect(
      result.details.angularVelocity,
    ).toBeCloseTo(4 * Math.PI);
  });

  it("calculates angular velocity", () => {
    const result =
      calculateRotationalFrequency({
        frequency: 3,
        solveFor: "angularVelocity",
      });

    expect(result.value).toBeCloseTo(
      6 * Math.PI,
    );
  });

  it("calculates rotation period", () => {
    const result =
      calculateRotationalFrequency({
        frequency: 4,
        solveFor: "period",
      });

    expect(result.value).toBeCloseTo(0.25);
  });

  it("supports decimal values", () => {
    const result =
      calculateRotationalFrequency({
        frequency: 2.5,
        solveFor: "angularVelocity",
      });

    expect(result.value).toBeCloseTo(
      5 * Math.PI,
    );
  });

  it("rejects zero frequency", () => {
    expect(() =>
      calculateRotationalFrequency({
        frequency: 0,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Rotational frequency must be greater than zero.",
    );
  });

  it("rejects negative frequency", () => {
    expect(() =>
      calculateRotationalFrequency({
        frequency: -3,
        solveFor: "period",
      }),
    ).toThrow(
      "Rotational frequency must be greater than zero.",
    );
  });

  it("rejects zero angular velocity", () => {
    expect(() =>
      calculateRotationalFrequency({
        angularVelocity: 0,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects negative angular velocity", () => {
    expect(() =>
      calculateRotationalFrequency({
        angularVelocity: -6,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects zero period", () => {
    expect(() =>
      calculateRotationalFrequency({
        period: 0,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Rotation period must be greater than zero.",
    );
  });

  it("rejects non-finite frequency", () => {
    expect(() =>
      calculateRotationalFrequency({
        frequency:
          Number.POSITIVE_INFINITY,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Rotational frequency must be a finite number.",
    );
  });

  it("rejects non-finite period", () => {
    expect(() =>
      calculateRotationalFrequency({
        period: Number.NaN,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Rotation period must be a finite number.",
    );
  });
});
