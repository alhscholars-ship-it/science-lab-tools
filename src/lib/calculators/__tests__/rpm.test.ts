import { describe, expect, it } from "vitest";

import { calculateRpm } from "../rpm";

describe("calculateRpm", () => {
  it("calculates RPM from frequency", () => {
    const result = calculateRpm({
      frequency: 2,
      solveFor: "rpm",
    });

    expect(result.value).toBeCloseTo(120);
    expect(
      result.details.angularVelocity,
    ).toBeCloseTo(4 * Math.PI);
    expect(result.details.formula).toBe(
      "RPM = 60f",
    );
  });

  it("calculates RPM from angular velocity", () => {
    const result = calculateRpm({
      angularVelocity: 4 * Math.PI,
      solveFor: "rpm",
    });

    expect(result.value).toBeCloseTo(120);
    expect(result.details.frequency).toBeCloseTo(2);
  });

  it("calculates frequency from RPM", () => {
    const result = calculateRpm({
      rpm: 180,
      solveFor: "frequency",
    });

    expect(result.value).toBeCloseTo(3);
  });

  it("calculates angular velocity from RPM", () => {
    const result = calculateRpm({
      rpm: 60,
      solveFor: "angularVelocity",
    });

    expect(result.value).toBeCloseTo(
      2 * Math.PI,
    );
  });

  it("supports decimal values", () => {
    const result = calculateRpm({
      frequency: 2.5,
      solveFor: "rpm",
    });

    expect(result.value).toBeCloseTo(150);
  });

  it("rejects zero RPM", () => {
    expect(() =>
      calculateRpm({
        rpm: 0,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Rotational speed must be greater than zero.",
    );
  });

  it("rejects negative RPM", () => {
    expect(() =>
      calculateRpm({
        rpm: -120,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Rotational speed must be greater than zero.",
    );
  });

  it("rejects zero frequency", () => {
    expect(() =>
      calculateRpm({
        frequency: 0,
        solveFor: "rpm",
      }),
    ).toThrow(
      "Rotational frequency must be greater than zero.",
    );
  });

  it("rejects negative frequency", () => {
    expect(() =>
      calculateRpm({
        frequency: -2,
        solveFor: "rpm",
      }),
    ).toThrow(
      "Rotational frequency must be greater than zero.",
    );
  });

  it("rejects zero angular velocity", () => {
    expect(() =>
      calculateRpm({
        angularVelocity: 0,
        solveFor: "rpm",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects non-finite RPM", () => {
    expect(() =>
      calculateRpm({
        rpm: Number.POSITIVE_INFINITY,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Rotational speed must be a finite number.",
    );
  });

  it("rejects non-finite angular velocity", () => {
    expect(() =>
      calculateRpm({
        angularVelocity: Number.NaN,
        solveFor: "rpm",
      }),
    ).toThrow(
      "Angular velocity must be a finite number.",
    );
  });
});
