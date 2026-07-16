import { describe, expect, it } from "vitest";

import {
  calculateInductorEnergy,
  type InductorEnergyVariable,
} from "../inductor-energy";

describe("calculateInductorEnergy", () => {
  it("calculates energy stored in an inductor", () => {
    const result = calculateInductorEnergy({
      inductance: 0.5,
      current: 4,
      solveFor: "energy",
    });

    expect(result.value).toBeCloseTo(4, 12);
    expect(result.details.formula).toBe(
      "E = ½LI²",
    );
  });

  it("calculates inductance", () => {
    const result = calculateInductorEnergy({
      energy: 4,
      current: 4,
      solveFor: "inductance",
    });

    expect(result.value).toBeCloseTo(
      0.5,
      12,
    );
  });

  it("calculates electric current", () => {
    const result = calculateInductorEnergy({
      energy: 4,
      inductance: 0.5,
      solveFor: "current",
    });

    expect(result.value).toBeCloseTo(
      4,
      12,
    );
  });

  it("supports millihenry-scale inductors", () => {
    const result = calculateInductorEnergy({
      inductance: 0.01,
      current: 3,
      solveFor: "energy",
    });

    expect(result.value).toBeCloseTo(
      0.045,
      12,
    );
  });

  it("supports microhenry-scale inductors", () => {
    const result = calculateInductorEnergy({
      inductance: 100e-6,
      current: 2,
      solveFor: "energy",
    });

    expect(result.value).toBeCloseTo(
      0.0002,
      15,
    );
  });

  it("rejects missing inductance", () => {
    expect(() =>
      calculateInductorEnergy({
        current: 4,
        solveFor: "energy",
      }),
    ).toThrow(
      "Inductance must be greater than zero.",
    );
  });

  it("rejects zero current", () => {
    expect(() =>
      calculateInductorEnergy({
        inductance: 0.5,
        current: 0,
        solveFor: "energy",
      }),
    ).toThrow(
      "Electric current must be greater than zero.",
    );
  });

  it("rejects negative energy", () => {
    expect(() =>
      calculateInductorEnergy({
        energy: -4,
        current: 4,
        solveFor: "inductance",
      }),
    ).toThrow(
      "Stored energy must be greater than zero.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateInductorEnergy({
        inductance: Number.POSITIVE_INFINITY,
        current: 4,
        solveFor: "energy",
      }),
    ).toThrow(
      "Inductance must be greater than zero.",
    );
  });

  it("rejects unsupported variables", () => {
    expect(() =>
      calculateInductorEnergy({
        inductance: 0.5,
        current: 4,
        solveFor:
          "unknown" as InductorEnergyVariable,
      }),
    ).toThrow(
      "Unsupported inductor energy variable",
    );
  });

  it("returns complete calculation details", () => {
    const result = calculateInductorEnergy({
      inductance: 0.5,
      current: 4,
      solveFor: "energy",
    });

    expect(result.details.energy).toBeCloseTo(
      4,
      12,
    );

    expect(
      result.details.inductance,
    ).toBeCloseTo(0.5, 12);

    expect(result.details.current).toBeCloseTo(
      4,
      12,
    );

    expect(
      result.details.substitution.length,
    ).toBeGreaterThan(0);
  });

  it("returns formatted output and solved variable", () => {
    const result = calculateInductorEnergy({
      inductance: 0.5,
      current: 4,
      solveFor: "energy",
    });

    expect(
      result.formattedValue.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.solvedVariable,
    ).toBe("energy");
  });
});
