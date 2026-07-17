import { describe, expect, it } from "vitest";

import {
  calculateAcImpedance,
  type AcImpedanceVariable,
} from "../ac-impedance";

describe("calculateAcImpedance", () => {
  it("calculates impedance for a series RLC circuit", () => {
    const result = calculateAcImpedance({
      resistance: 30,
      inductiveReactance: 50,
      capacitiveReactance: 10,
      solveFor: "impedance",
    });

    expect(result.value).toBeCloseTo(50, 12);
    expect(result.details.formula).toBe(
      "Z = √(R² + (Xₗ − Xc)²)",
    );
  });

  it("calculates resistance", () => {
    const result = calculateAcImpedance({
      impedance: 50,
      inductiveReactance: 50,
      capacitiveReactance: 10,
      solveFor: "resistance",
    });

    expect(result.value).toBeCloseTo(30, 12);
  });

  it("calculates inductive reactance", () => {
    const result = calculateAcImpedance({
      impedance: 50,
      resistance: 30,
      capacitiveReactance: 10,
      solveFor: "inductiveReactance",
    });

    expect(result.value).toBeCloseTo(50, 12);
    expect(result.details.formula).toBe(
      "Xₗ = Xc + √(Z² − R²)",
    );
  });

  it("calculates capacitive reactance", () => {
    const result = calculateAcImpedance({
      impedance: 50,
      resistance: 30,
      inductiveReactance: 10,
      solveFor: "capacitiveReactance",
    });

    expect(result.value).toBeCloseTo(50, 12);
    expect(result.details.formula).toBe(
      "Xc = Xₗ + √(Z² − R²)",
    );
  });

  it("returns resistance as impedance at resonance", () => {
    const result = calculateAcImpedance({
      resistance: 25,
      inductiveReactance: 40,
      capacitiveReactance: 40,
      solveFor: "impedance",
    });

    expect(result.value).toBeCloseTo(25, 12);
    expect(
      result.details.reactanceDifference,
    ).toBeCloseTo(0, 12);
  });

  it("supports capacitive-dominant impedance", () => {
    const result = calculateAcImpedance({
      resistance: 12,
      inductiveReactance: 8,
      capacitiveReactance: 13,
      solveFor: "impedance",
    });

    expect(result.value).toBeCloseTo(13, 12);
    expect(
      result.details.reactanceDifference,
    ).toBeCloseTo(-5, 12);
  });

  it("allows zero resistance as a calculated result", () => {
    const result = calculateAcImpedance({
      impedance: 40,
      inductiveReactance: 50,
      capacitiveReactance: 10,
      solveFor: "resistance",
    });

    expect(result.value).toBeCloseTo(0, 12);
  });

  it("rejects missing resistance", () => {
    expect(() =>
      calculateAcImpedance({
        inductiveReactance: 50,
        capacitiveReactance: 10,
        solveFor: "impedance",
      }),
    ).toThrow(
      "Resistance must be greater than zero.",
    );
  });

  it("rejects zero inductive reactance", () => {
    expect(() =>
      calculateAcImpedance({
        resistance: 30,
        inductiveReactance: 0,
        capacitiveReactance: 10,
        solveFor: "impedance",
      }),
    ).toThrow(
      "Inductive reactance must be greater than zero.",
    );
  });

  it("rejects non-finite capacitive reactance", () => {
    expect(() =>
      calculateAcImpedance({
        resistance: 30,
        inductiveReactance: 50,
        capacitiveReactance:
          Number.POSITIVE_INFINITY,
        solveFor: "impedance",
      }),
    ).toThrow(
      "Capacitive reactance must be greater than zero.",
    );
  });

  it("rejects impedance smaller than resistance", () => {
    expect(() =>
      calculateAcImpedance({
        impedance: 20,
        resistance: 30,
        capacitiveReactance: 10,
        solveFor: "inductiveReactance",
      }),
    ).toThrow(
      "Impedance must be greater than or equal to resistance.",
    );
  });

  it("rejects impedance too small for reactance difference", () => {
    expect(() =>
      calculateAcImpedance({
        impedance: 20,
        inductiveReactance: 50,
        capacitiveReactance: 10,
        solveFor: "resistance",
      }),
    ).toThrow(
      "Impedance is too small for the supplied reactance difference.",
    );
  });

  it("rejects unsupported variables", () => {
    expect(() =>
      calculateAcImpedance({
        resistance: 30,
        inductiveReactance: 50,
        capacitiveReactance: 10,
        solveFor:
          "unknown" as AcImpedanceVariable,
      }),
    ).toThrow(
      "Unsupported AC impedance variable",
    );
  });

  it("returns formatted output and complete details", () => {
    const result = calculateAcImpedance({
      resistance: 30,
      inductiveReactance: 50,
      capacitiveReactance: 10,
      solveFor: "impedance",
    });

    expect(
      result.formattedValue.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.substitution.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.solvedVariable,
    ).toBe("impedance");

    expect(result.details).toMatchObject({
      impedance: 50,
      resistance: 30,
      inductiveReactance: 50,
      capacitiveReactance: 10,
      reactanceDifference: 40,
    });
  });
});
