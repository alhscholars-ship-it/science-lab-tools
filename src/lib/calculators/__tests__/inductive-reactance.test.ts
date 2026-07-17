import { describe, expect, it } from "vitest";

import {
  calculateInductiveReactance,
  type InductiveReactanceVariable,
} from "../inductive-reactance";

describe("calculateInductiveReactance", () => {
  it("calculates inductive reactance", () => {
    const result =
      calculateInductiveReactance({
        frequency: 50,
        inductance: 0.2,
        solveFor: "reactance",
      });

    expect(result.value).toBeCloseTo(
      2 * Math.PI * 50 * 0.2,
      12,
    );

    expect(result.details.formula).toBe(
      "Xₗ = 2πfL",
    );
  });

  it("calculates frequency", () => {
    const reactance =
      2 * Math.PI * 50 * 0.2;

    const result =
      calculateInductiveReactance({
        reactance,
        inductance: 0.2,
        solveFor: "frequency",
      });

    expect(result.value).toBeCloseTo(
      50,
      12,
    );
  });

  it("calculates inductance", () => {
    const reactance =
      2 * Math.PI * 50 * 0.2;

    const result =
      calculateInductiveReactance({
        reactance,
        frequency: 50,
        solveFor: "inductance",
      });

    expect(result.value).toBeCloseTo(
      0.2,
      12,
    );
  });

  it("supports audio-frequency calculations", () => {
    const result =
      calculateInductiveReactance({
        frequency: 1000,
        inductance: 0.01,
        solveFor: "reactance",
      });

    expect(result.value).toBeCloseTo(
      20 * Math.PI,
      12,
    );
  });

  it("supports high-frequency calculations", () => {
    const result =
      calculateInductiveReactance({
        frequency: 1e6,
        inductance: 100e-6,
        solveFor: "reactance",
      });

    expect(result.value).toBeCloseTo(
      200 * Math.PI,
      10,
    );
  });

  it("rejects missing frequency", () => {
    expect(() =>
      calculateInductiveReactance({
        inductance: 0.2,
        solveFor: "reactance",
      }),
    ).toThrow(
      "Frequency must be greater than zero.",
    );
  });

  it("rejects zero inductance", () => {
    expect(() =>
      calculateInductiveReactance({
        frequency: 50,
        inductance: 0,
        solveFor: "reactance",
      }),
    ).toThrow(
      "Inductance must be greater than zero.",
    );
  });

  it("rejects negative reactance", () => {
    expect(() =>
      calculateInductiveReactance({
        reactance: -10,
        inductance: 0.2,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Inductive reactance must be greater than zero.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateInductiveReactance({
        frequency:
          Number.POSITIVE_INFINITY,
        inductance: 0.2,
        solveFor: "reactance",
      }),
    ).toThrow(
      "Frequency must be greater than zero.",
    );
  });

  it("rejects unsupported variables", () => {
    expect(() =>
      calculateInductiveReactance({
        frequency: 50,
        inductance: 0.2,
        solveFor:
          "unknown" as InductiveReactanceVariable,
      }),
    ).toThrow(
      "Unsupported inductive reactance variable",
    );
  });

  it("returns angular frequency in details", () => {
    const result =
      calculateInductiveReactance({
        frequency: 50,
        inductance: 0.2,
        solveFor: "reactance",
      });

    expect(
      result.details.angularFrequency,
    ).toBeCloseTo(
      2 * Math.PI * 50,
      12,
    );
  });

  it("returns formatted output and complete details", () => {
    const result =
      calculateInductiveReactance({
        frequency: 50,
        inductance: 0.2,
        solveFor: "reactance",
      });

    expect(
      result.formattedValue.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.substitution.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.solvedVariable,
    ).toBe("reactance");
  });
});
