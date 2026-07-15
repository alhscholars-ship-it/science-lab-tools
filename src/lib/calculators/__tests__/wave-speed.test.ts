import { describe, expect, it } from "vitest";

import {
  calculateWaveSpeed,
  type WaveSpeedVariable,
} from "../wave-speed";

function expectCompleteWave(
  result: ReturnType<typeof calculateWaveSpeed>,
) {
  expect(result.details.waveSpeed).toBeCloseTo(340);
  expect(result.details.frequency).toBeCloseTo(170);
  expect(result.details.wavelength).toBeCloseTo(2);
  expect(result.formattedValue.length).toBeGreaterThan(0);
  expect(result.details.formula.length).toBeGreaterThan(0);
  expect(
    result.details.substitution.length,
  ).toBeGreaterThan(0);
}

describe("calculateWaveSpeed", () => {
  it("calculates wave speed from frequency and wavelength", () => {
    const result = calculateWaveSpeed({
      frequency: 170,
      wavelength: 2,
      solveFor: "waveSpeed",
    });

    expect(result.value).toBeCloseTo(340);
    expect(result.details.formula).toBe(
      "v = f × λ",
    );
    expect(result.details.substitution).toBe(
      "v = 170 × 2",
    );
    expectCompleteWave(result);
  });

  it("calculates frequency from wave speed and wavelength", () => {
    const result = calculateWaveSpeed({
      waveSpeed: 340,
      wavelength: 2,
      solveFor: "frequency",
    });

    expect(result.value).toBeCloseTo(170);
    expect(result.details.formula).toBe(
      "f = v ÷ λ",
    );
    expect(result.details.substitution).toBe(
      "f = 340 ÷ 2",
    );
    expectCompleteWave(result);
  });

  it("calculates wavelength from wave speed and frequency", () => {
    const result = calculateWaveSpeed({
      waveSpeed: 340,
      frequency: 170,
      solveFor: "wavelength",
    });

    expect(result.value).toBeCloseTo(2);
    expect(result.details.formula).toBe(
      "λ = v ÷ f",
    );
    expect(result.details.substitution).toBe(
      "λ = 340 ÷ 170",
    );
    expectCompleteWave(result);
  });

  it("supports decimal values", () => {
    const result = calculateWaveSpeed({
      frequency: 2.5,
      wavelength: 0.4,
      solveFor: "waveSpeed",
    });

    expect(result.value).toBeCloseTo(1);
    expect(result.details.waveSpeed).toBeCloseTo(1);
  });

  it("supports very small wavelength values", () => {
    const result = calculateWaveSpeed({
      waveSpeed: 3e8,
      frequency: 6e14,
      solveFor: "wavelength",
    });

    expect(result.value).toBeCloseTo(5e-7);
  });

  it("rejects missing frequency", () => {
    expect(() =>
      calculateWaveSpeed({
        wavelength: 2,
        solveFor: "waveSpeed",
      }),
    ).toThrow(
      "Frequency must be greater than zero.",
    );
  });

  it("rejects missing wavelength", () => {
    expect(() =>
      calculateWaveSpeed({
        frequency: 170,
        solveFor: "waveSpeed",
      }),
    ).toThrow(
      "Wavelength must be greater than zero.",
    );
  });

  it("rejects zero wave speed", () => {
    expect(() =>
      calculateWaveSpeed({
        waveSpeed: 0,
        wavelength: 2,
        solveFor: "frequency",
      }),
    ).toThrow(
      "Wave speed must be greater than zero.",
    );
  });

  it("rejects zero frequency", () => {
    expect(() =>
      calculateWaveSpeed({
        waveSpeed: 340,
        frequency: 0,
        solveFor: "wavelength",
      }),
    ).toThrow(
      "Frequency must be greater than zero.",
    );
  });

  it("rejects negative wavelength", () => {
    expect(() =>
      calculateWaveSpeed({
        frequency: 170,
        wavelength: -2,
        solveFor: "waveSpeed",
      }),
    ).toThrow(
      "Wavelength must be greater than zero.",
    );
  });

  it("rejects non-finite inputs", () => {
    expect(() =>
      calculateWaveSpeed({
        frequency: Number.POSITIVE_INFINITY,
        wavelength: 2,
        solveFor: "waveSpeed",
      }),
    ).toThrow(
      "Frequency must be greater than zero.",
    );
  });

  it("rejects an unsupported solve variable", () => {
    expect(() =>
      calculateWaveSpeed({
        waveSpeed: 340,
        frequency: 170,
        solveFor:
          "unknown" as WaveSpeedVariable,
      }),
    ).toThrow(
      "Unsupported wave speed variable",
    );
  });
});
