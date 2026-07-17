import { describe, expect, it } from "vitest";

import {
  calculateRlcQualityFactor,
} from "../rlc-quality-factor";

describe("calculateRlcQualityFactor", () => {
  it("calculates quality factor", () => {
    const result =
      calculateRlcQualityFactor({
        resistance: 10,
        inductance: 0.1,
        capacitance: 0.000001,
        solveFor: "qualityFactor",
      });

    expect(result.value).toBeCloseTo(
      31.622776601683793,
    );

    expect(result.details.formula).toBe(
      "Q = √(L ÷ C) ÷ R",
    );
  });

  it("calculates resistance", () => {
    const result =
      calculateRlcQualityFactor({
        qualityFactor:
          31.622776601683793,
        inductance: 0.1,
        capacitance: 0.000001,
        solveFor: "resistance",
      });

    expect(result.value).toBeCloseTo(10);
  });

  it("calculates inductance", () => {
    const result =
      calculateRlcQualityFactor({
        qualityFactor:
          31.622776601683793,
        resistance: 10,
        capacitance: 0.000001,
        solveFor: "inductance",
      });

    expect(result.value).toBeCloseTo(0.1);
  });

  it("calculates capacitance", () => {
    const result =
      calculateRlcQualityFactor({
        qualityFactor:
          31.622776601683793,
        resistance: 10,
        inductance: 0.1,
        solveFor: "capacitance",
      });

    expect(result.value).toBeCloseTo(
      0.000001,
    );
  });

  it("calculates bandwidth from frequency", () => {
    const result =
      calculateRlcQualityFactor({
        resistance: 10,
        inductance: 0.1,
        capacitance: 0.000001,
        resonantFrequency: 1000,
        solveFor: "qualityFactor",
      });

    expect(
      result.details.bandwidth,
    ).toBeCloseTo(31.622776601683793);
  });

  it("calculates damping ratio", () => {
    const result =
      calculateRlcQualityFactor({
        qualityFactor: 20,
        resistance: 5,
        capacitance: 0.000001,
        solveFor: "inductance",
      });

    expect(
      result.details.dampingRatio,
    ).toBeCloseTo(0.025);
  });

  it("records the solved variable", () => {
    const result =
      calculateRlcQualityFactor({
        resistance: 5,
        inductance: 0.02,
        capacitance: 0.000002,
        solveFor: "qualityFactor",
      });

    expect(
      result.details.solvedVariable,
    ).toBe("qualityFactor");
  });

  it("returns formatted output", () => {
    const result =
      calculateRlcQualityFactor({
        resistance: 10,
        inductance: 0.1,
        capacitance: 0.000001,
        solveFor: "qualityFactor",
      });

    expect(
      result.formattedValue.length,
    ).toBeGreaterThan(0);
  });

  it("rejects zero resistance", () => {
    expect(() =>
      calculateRlcQualityFactor({
        resistance: 0,
        inductance: 0.1,
        capacitance: 0.000001,
        solveFor: "qualityFactor",
      }),
    ).toThrow(
      "Resistance must be greater than zero.",
    );
  });

  it("rejects negative quality factor", () => {
    expect(() =>
      calculateRlcQualityFactor({
        qualityFactor: -2,
        resistance: 10,
        capacitance: 0.000001,
        solveFor: "inductance",
      }),
    ).toThrow(
      "Quality factor must be greater than zero.",
    );
  });

  it("rejects zero inductance", () => {
    expect(() =>
      calculateRlcQualityFactor({
        resistance: 10,
        inductance: 0,
        capacitance: 0.000001,
        solveFor: "qualityFactor",
      }),
    ).toThrow(
      "Inductance must be greater than zero.",
    );
  });

  it("rejects negative capacitance", () => {
    expect(() =>
      calculateRlcQualityFactor({
        resistance: 10,
        inductance: 0.1,
        capacitance: -0.000001,
        solveFor: "qualityFactor",
      }),
    ).toThrow(
      "Capacitance must be greater than zero.",
    );
  });

  it("rejects invalid resonant frequency", () => {
    expect(() =>
      calculateRlcQualityFactor({
        resistance: 10,
        inductance: 0.1,
        capacitance: 0.000001,
        resonantFrequency: 0,
        solveFor: "qualityFactor",
      }),
    ).toThrow(
      "Resonant frequency must be greater than zero.",
    );
  });

  it("rejects non-finite inputs", () => {
    expect(() =>
      calculateRlcQualityFactor({
        resistance: Number.POSITIVE_INFINITY,
        inductance: 0.1,
        capacitance: 0.000001,
        solveFor: "qualityFactor",
      }),
    ).toThrow(
      "Resistance must be greater than zero.",
    );
  });
});
