import { describe, expect, it } from "vitest";

import {
  calculateRevolutions,
} from "../revolutions";

describe("calculateRevolutions", () => {
  it("calculates revolutions from frequency and time", () => {
    const result = calculateRevolutions({
      frequency: 3,
      time: 4,
      solveFor: "revolutions",
    });

    expect(result.value).toBeCloseTo(12);
    expect(
      result.details.angularDisplacement,
    ).toBeCloseTo(24 * Math.PI);
    expect(result.details.formula).toBe("N = ft");
  });

  it("calculates revolutions from angular displacement", () => {
    const result = calculateRevolutions({
      angularDisplacement: 8 * Math.PI,
      solveFor: "revolutions",
      source: "angularDisplacement",
    });

    expect(result.value).toBeCloseTo(4);
    expect(result.details.formula).toBe(
      "N = θ / 2π",
    );
  });

  it("calculates rotational frequency", () => {
    const result = calculateRevolutions({
      revolutions: 20,
      time: 5,
      solveFor: "frequency",
    });

    expect(result.value).toBeCloseTo(4);
  });

  it("calculates time", () => {
    const result = calculateRevolutions({
      revolutions: 15,
      frequency: 3,
      solveFor: "time",
    });

    expect(result.value).toBeCloseTo(5);
  });

  it("calculates angular displacement", () => {
    const result = calculateRevolutions({
      revolutions: 6,
      solveFor: "angularDisplacement",
    });

    expect(result.value).toBeCloseTo(
      12 * Math.PI,
    );
  });

  it("supports decimal values", () => {
    const result = calculateRevolutions({
      frequency: 2.5,
      time: 1.2,
      solveFor: "revolutions",
    });

    expect(result.value).toBeCloseTo(3);
  });

  it("rejects zero revolutions", () => {
    expect(() =>
      calculateRevolutions({
        revolutions: 0,
        time: 5,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Number of revolutions must be greater than zero.",
    );
  });

  it("rejects negative frequency", () => {
    expect(() =>
      calculateRevolutions({
        revolutions: 10,
        frequency: -2,
        solveFor: "time",
      }),
    ).toThrow(
      "Rotational frequency must be greater than zero.",
    );
  });

  it("rejects zero time", () => {
    expect(() =>
      calculateRevolutions({
        revolutions: 10,
        time: 0,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects negative angular displacement", () => {
    expect(() =>
      calculateRevolutions({
        angularDisplacement: -10,
        solveFor: "revolutions",
        source: "angularDisplacement",
      }),
    ).toThrow(
      "Angular displacement must be greater than zero.",
    );
  });

  it("rejects non-finite frequency", () => {
    expect(() =>
      calculateRevolutions({
        frequency:
          Number.POSITIVE_INFINITY,
        time: 2,
        solveFor: "revolutions",
      }),
    ).toThrow(
      "Rotational frequency must be a finite number.",
    );
  });

  it("rejects non-finite angular displacement", () => {
    expect(() =>
      calculateRevolutions({
        angularDisplacement: Number.NaN,
        solveFor: "revolutions",
        source: "angularDisplacement",
      }),
    ).toThrow(
      "Angular displacement must be a finite number.",
    );
  });
});
