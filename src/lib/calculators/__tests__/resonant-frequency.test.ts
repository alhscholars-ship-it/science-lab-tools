import { describe, expect, it } from "vitest";

import {
  calculateResonantFrequency,
} from "../resonant-frequency";

describe("calculateResonantFrequency", () => {
  it("calculates resonant frequency", () => {
    const result =
      calculateResonantFrequency({
        inductance: 0.01,
        capacitance: 0.000001,
        solveFor: "frequency",
      });

    expect(result.value).toBeCloseTo(
      1591.5494309189535,
    );

    expect(result.details.formula).toBe(
      "f₀ = 1 ÷ (2π√LC)",
    );
  });

  it("calculates inductance", () => {
    const result =
      calculateResonantFrequency({
        frequency: 1591.5494309189535,
        capacitance: 0.000001,
        solveFor: "inductance",
      });

    expect(result.value).toBeCloseTo(0.01);
  });

  it("calculates capacitance", () => {
    const result =
      calculateResonantFrequency({
        frequency: 1591.5494309189535,
        inductance: 0.01,
        solveFor: "capacitance",
      });

    expect(result.value).toBeCloseTo(
      0.000001,
    );
  });

  it("returns angular frequency", () => {
    const result =
      calculateResonantFrequency({
        inductance: 0.01,
        capacitance: 0.000001,
        solveFor: "frequency",
      });

    expect(
      result.details.angularFrequency,
    ).toBeCloseTo(10000);
  });

  it("records the solved variable", () => {
    const result =
      calculateResonantFrequency({
        inductance: 0.02,
        capacitance: 0.000002,
        solveFor: "frequency",
      });

    expect(
      result.details.solvedVariable,
    ).toBe("frequency");
  });

  it("returns formatted output", () => {
    const result =
      calculateResonantFrequency({
        inductance: 0.01,
        capacitance: 0.000001,
        solveFor: "frequency",
      });

    expect(result.formattedValue.length).toBeGreaterThan(0);
  });

  it("supports small component values", () => {
    const result =
      calculateResonantFrequency({
        inductance: 0.000001,
        capacitance: 0.000000000001,
        solveFor: "frequency",
      });

    expect(result.value).toBeGreaterThan(0);
    expect(Number.isFinite(result.value)).toBe(true);
  });

  it("rejects zero inductance", () => {
    expect(() =>
      calculateResonantFrequency({
        inductance: 0,
        capacitance: 0.000001,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Inductance must be greater than zero.",
    );
  });

  it("rejects negative inductance", () => {
    expect(() =>
      calculateResonantFrequency({
        inductance: -0.01,
        capacitance: 0.000001,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Inductance must be greater than zero.",
    );
  });

  it("rejects zero capacitance", () => {
    expect(() =>
      calculateResonantFrequency({
        inductance: 0.01,
        capacitance: 0,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Capacitance must be greater than zero.",
    );
  });

  it("rejects negative capacitance", () => {
    expect(() =>
      calculateResonantFrequency({
        inductance: 0.01,
        capacitance: -0.000001,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Capacitance must be greater than zero.",
    );
  });

  it("rejects zero frequency", () => {
    expect(() =>
      calculateResonantFrequency({
        frequency: 0,
        capacitance: 0.000001,
        solveFor: "inductance",
      }),
    ).toThrow(
      "Resonant frequency must be greater than zero.",
    );
  });

  it("rejects non-finite frequency", () => {
    expect(() =>
      calculateResonantFrequency({
        frequency: Number.POSITIVE_INFINITY,
        inductance: 0.01,
        solveFor: "capacitance",
      }),
    ).toThrow(
      "Resonant frequency must be greater than zero.",
    );
  });

  it("rejects non-finite capacitance", () => {
    expect(() =>
      calculateResonantFrequency({
        inductance: 0.01,
        capacitance: Number.NaN,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Capacitance must be greater than zero.",
    );
  });
});
