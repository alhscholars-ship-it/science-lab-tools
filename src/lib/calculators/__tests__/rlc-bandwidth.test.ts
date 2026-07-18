import { describe, expect, it } from "vitest";

import {
  calculateRlcBandwidth,
} from "../rlc-bandwidth";

describe("calculateRlcBandwidth", () => {
  it("calculates bandwidth", () => {
    const result =
      calculateRlcBandwidth({
        resonantFrequency: 1000,
        qualityFactor: 20,
        solveFor: "bandwidth",
      });

    expect(result.value).toBeCloseTo(50);
    expect(result.details.formula).toBe(
      "BW = f₀ ÷ Q",
    );
  });

  it("calculates resonant frequency", () => {
    const result =
      calculateRlcBandwidth({
        bandwidth: 50,
        qualityFactor: 20,
        solveFor: "resonantFrequency",
      });

    expect(result.value).toBeCloseTo(1000);
  });

  it("calculates quality factor", () => {
    const result =
      calculateRlcBandwidth({
        bandwidth: 50,
        resonantFrequency: 1000,
        solveFor: "qualityFactor",
      });

    expect(result.value).toBeCloseTo(20);
  });

  it("calculates half-power frequencies", () => {
    const result =
      calculateRlcBandwidth({
        resonantFrequency: 1000,
        qualityFactor: 20,
        solveFor: "bandwidth",
      });

    expect(
      result.details.lowerHalfPowerFrequency,
    ).toBeCloseTo(975);

    expect(
      result.details.upperHalfPowerFrequency,
    ).toBeCloseTo(1025);
  });

  it("omits a non-positive lower frequency", () => {
    const result =
      calculateRlcBandwidth({
        resonantFrequency: 100,
        qualityFactor: 0.25,
        solveFor: "bandwidth",
      });

    expect(
      result.details.lowerHalfPowerFrequency,
    ).toBeUndefined();

    expect(
      result.details.upperHalfPowerFrequency,
    ).toBeCloseTo(300);
  });

  it("records the solved variable", () => {
    const result =
      calculateRlcBandwidth({
        bandwidth: 25,
        qualityFactor: 40,
        solveFor: "resonantFrequency",
      });

    expect(
      result.details.solvedVariable,
    ).toBe("resonantFrequency");
  });

  it("returns formatted output", () => {
    const result =
      calculateRlcBandwidth({
        resonantFrequency: 1500,
        qualityFactor: 30,
        solveFor: "bandwidth",
      });

    expect(
      result.formattedValue.length,
    ).toBeGreaterThan(0);
  });

  it("rejects zero bandwidth", () => {
    expect(() =>
      calculateRlcBandwidth({
        bandwidth: 0,
        resonantFrequency: 1000,
        solveFor: "qualityFactor",
      }),
    ).toThrow(
      "Bandwidth must be greater than zero.",
    );
  });

  it("rejects negative resonant frequency", () => {
    expect(() =>
      calculateRlcBandwidth({
        bandwidth: 50,
        resonantFrequency: -1000,
        solveFor: "qualityFactor",
      }),
    ).toThrow(
      "Resonant frequency must be greater than zero.",
    );
  });

  it("rejects zero quality factor", () => {
    expect(() =>
      calculateRlcBandwidth({
        resonantFrequency: 1000,
        qualityFactor: 0,
        solveFor: "bandwidth",
      }),
    ).toThrow(
      "Quality factor must be greater than zero.",
    );
  });

  it("rejects non-finite input", () => {
    expect(() =>
      calculateRlcBandwidth({
        bandwidth:
          Number.POSITIVE_INFINITY,
        qualityFactor: 20,
        solveFor: "resonantFrequency",
      }),
    ).toThrow(
      "Bandwidth must be greater than zero.",
    );
  });

  it("stores the correct substitution", () => {
    const result =
      calculateRlcBandwidth({
        bandwidth: 40,
        resonantFrequency: 800,
        solveFor: "qualityFactor",
      });

    expect(
      result.details.substitution,
    ).toBe("Q = 800 ÷ 40");
  });
});
