import { describe, expect, it } from "vitest";

import {
  calculateCapacitiveReactance,
  type CapacitiveReactanceVariable,
} from "../capacitive-reactance";

describe("calculateCapacitiveReactance", () => {
  it("calculates capacitive reactance", () => {
    const result =
      calculateCapacitiveReactance({
        frequency: 50,
        capacitance: 100e-6,
        solveFor: "reactance",
      });

    expect(result.value).toBeCloseTo(
      1 / (2 * Math.PI * 50 * 100e-6),
      12,
    );

    expect(result.details.formula).toBe(
      "Xc = 1 ÷ (2πfC)",
    );
  });

  it("calculates frequency", () => {
    const reactance =
      1 / (2 * Math.PI * 50 * 100e-6);

    const result =
      calculateCapacitiveReactance({
        reactance,
        capacitance: 100e-6,
        solveFor: "frequency",
      });

    expect(result.value).toBeCloseTo(
      50,
      12,
    );
  });

  it("calculates capacitance", () => {
    const reactance =
      1 / (2 * Math.PI * 50 * 100e-6);

    const result =
      calculateCapacitiveReactance({
        reactance,
        frequency: 50,
        solveFor: "capacitance",
      });

    expect(result.value).toBeCloseTo(
      100e-6,
      15,
    );
  });

  it("supports audio-frequency calculations", () => {
    const result =
      calculateCapacitiveReactance({
        frequency: 1000,
        capacitance: 10e-6,
        solveFor: "reactance",
      });

    expect(result.value).toBeCloseTo(
      1 / (2 * Math.PI * 1000 * 10e-6),
      12,
    );
  });

  it("supports nanofarad-scale capacitors", () => {
    const result =
      calculateCapacitiveReactance({
        frequency: 1e6,
        capacitance: 100e-9,
        solveFor: "reactance",
      });

    expect(result.value).toBeCloseTo(
      1 / (2 * Math.PI * 1e6 * 100e-9),
      10,
    );
  });

  it("rejects missing frequency", () => {
    expect(() =>
      calculateCapacitiveReactance({
        capacitance: 100e-6,
        solveFor: "reactance",
      }),
    ).toThrow(
      "Frequency must be greater than zero.",
    );
  });

  it("rejects zero capacitance", () => {
    expect(() =>
      calculateCapacitiveReactance({
        frequency: 50,
        capacitance: 0,
        solveFor: "reactance",
      }),
    ).toThrow(
      "Capacitance must be greater than zero.",
    );
  });

  it("rejects negative reactance", () => {
    expect(() =>
      calculateCapacitiveReactance({
        reactance: -10,
        capacitance: 100e-6,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Capacitive reactance must be greater than zero.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateCapacitiveReactance({
        frequency:
          Number.POSITIVE_INFINITY,
        capacitance: 100e-6,
        solveFor: "reactance",
      }),
    ).toThrow(
      "Frequency must be greater than zero.",
    );
  });

  it("rejects unsupported variables", () => {
    expect(() =>
      calculateCapacitiveReactance({
        frequency: 50,
        capacitance: 100e-6,
        solveFor:
          "unknown" as CapacitiveReactanceVariable,
      }),
    ).toThrow(
      "Unsupported capacitive reactance variable",
    );
  });

  it("returns angular frequency in details", () => {
    const result =
      calculateCapacitiveReactance({
        frequency: 50,
        capacitance: 100e-6,
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
      calculateCapacitiveReactance({
        frequency: 50,
        capacitance: 100e-6,
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
