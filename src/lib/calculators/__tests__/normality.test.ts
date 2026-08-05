import { describe, expect, it } from "vitest";

import {
  calculateNormality,
  convertSolutionVolumeToLiters,
  getNormalityVariableLabel,
  type NormalityVolumeUnit,
} from "../normality";

describe("calculateNormality", () => {
  it("calculates normality using liters", () => {
    const result = calculateNormality({
      equivalents: 1,
      solutionVolume: 2,
      volumeUnit: "L",
      solveFor: "normality",
    });

    expect(result.value).toBeCloseTo(0.5);
    expect(result.formattedValue).toBe(
      "0.5 N",
    );
  });

  it("calculates normality using milliliters", () => {
    const result = calculateNormality({
      equivalents: 0.25,
      solutionVolume: 500,
      volumeUnit: "mL",
      solveFor: "normality",
    });

    expect(result.value).toBeCloseTo(0.5);
    expect(
      result.details.volumeInLiters,
    ).toBeCloseTo(0.5);
  });

  it("supports zero equivalents and zero normality", () => {
    const result = calculateNormality({
      equivalents: 0,
      solutionVolume: 1,
      volumeUnit: "L",
      solveFor: "normality",
    });

    expect(result.value).toBe(0);
    expect(result.formattedValue).toBe(
      "0 N",
    );
  });

  it("calculates equivalents using liters", () => {
    const result = calculateNormality({
      solutionVolume: 0.4,
      volumeUnit: "L",
      normality: 1.5,
      solveFor: "equivalents",
    });

    expect(result.value).toBeCloseTo(0.6);
    expect(result.formattedValue).toBe(
      "0.6 eq",
    );
  });

  it("calculates equivalents using milliliters", () => {
    const result = calculateNormality({
      solutionVolume: 250,
      volumeUnit: "mL",
      normality: 2,
      solveFor: "equivalents",
    });

    expect(result.value).toBeCloseTo(0.5);
  });

  it("calculates solution volume in liters", () => {
    const result = calculateNormality({
      equivalents: 0.75,
      volumeUnit: "L",
      normality: 1.5,
      solveFor: "solutionVolume",
    });

    expect(result.value).toBeCloseTo(0.5);
    expect(result.formattedValue).toBe(
      "0.5 L",
    );
  });

  it("calculates solution volume in milliliters", () => {
    const result = calculateNormality({
      equivalents: 0.75,
      volumeUnit: "mL",
      normality: 1.5,
      solveFor: "solutionVolume",
    });

    expect(result.value).toBeCloseTo(500);
    expect(result.formattedValue).toBe(
      "500 mL",
    );
  });

  it("returns complete calculation details", () => {
    const result = calculateNormality({
      equivalents: 1,
      solutionVolume: 500,
      volumeUnit: "mL",
      solveFor: "normality",
    });

    expect(result.details).toEqual({
      equivalents: 1,
      solutionVolume: 500,
      volumeUnit: "mL",
      volumeInLiters: 0.5,
      normality: 2,
      solvedVariable: "normality",
      formula:
        "N = equivalents ÷ L solution",
    });
  });

  it("converts solution volume units directly", () => {
    expect(
      convertSolutionVolumeToLiters(
        750,
        "mL",
      ),
    ).toBeCloseTo(0.75);

    expect(
      convertSolutionVolumeToLiters(
        2,
        "L",
      ),
    ).toBe(2);
  });

  it("rejects non-finite equivalents", () => {
    expect(() =>
      calculateNormality({
        equivalents: Number.NaN,
        solutionVolume: 1,
        volumeUnit: "L",
        solveFor: "normality",
      }),
    ).toThrow(
      "Solute equivalents must be a finite number.",
    );
  });

  it("rejects negative equivalents", () => {
    expect(() =>
      calculateNormality({
        equivalents: -1,
        solutionVolume: 1,
        volumeUnit: "L",
        solveFor: "normality",
      }),
    ).toThrow(
      "Solute equivalents cannot be negative.",
    );
  });

  it("rejects non-finite solution volume", () => {
    expect(() =>
      calculateNormality({
        equivalents: 1,
        solutionVolume:
          Number.POSITIVE_INFINITY,
        volumeUnit: "L",
        solveFor: "normality",
      }),
    ).toThrow(
      "Solution volume must be a finite number.",
    );
  });

  it("rejects zero solution volume", () => {
    expect(() =>
      calculateNormality({
        equivalents: 1,
        solutionVolume: 0,
        volumeUnit: "L",
        solveFor: "normality",
      }),
    ).toThrow(
      "Solution volume must be greater than zero.",
    );
  });

  it("rejects negative solution volume", () => {
    expect(() =>
      calculateNormality({
        equivalents: 1,
        solutionVolume: -250,
        volumeUnit: "mL",
        solveFor: "normality",
      }),
    ).toThrow(
      "Solution volume must be greater than zero.",
    );
  });

  it("rejects unsupported solution volume units", () => {
    expect(() =>
      convertSolutionVolumeToLiters(
        1,
        "gal" as NormalityVolumeUnit,
      ),
    ).toThrow(
      "Unsupported solution volume unit.",
    );
  });

  it("rejects non-finite normality", () => {
    expect(() =>
      calculateNormality({
        solutionVolume: 1,
        volumeUnit: "L",
        normality: Number.NaN,
        solveFor: "equivalents",
      }),
    ).toThrow(
      "Normality must be a finite number.",
    );
  });

  it("rejects negative normality", () => {
    expect(() =>
      calculateNormality({
        solutionVolume: 1,
        volumeUnit: "L",
        normality: -1,
        solveFor: "equivalents",
      }),
    ).toThrow(
      "Normality cannot be negative.",
    );
  });

  it("rejects zero normality when calculating solution volume", () => {
    expect(() =>
      calculateNormality({
        equivalents: 1,
        volumeUnit: "L",
        normality: 0,
        solveFor: "solutionVolume",
      }),
    ).toThrow(
      "Normality must be greater than zero when calculating solution volume.",
    );
  });

  it("rejects zero equivalents when calculating solution volume", () => {
    expect(() =>
      calculateNormality({
        equivalents: 0,
        volumeUnit: "L",
        normality: 1,
        solveFor: "solutionVolume",
      }),
    ).toThrow(
      "Solute equivalents must be greater than zero when calculating solution volume.",
    );
  });

  it("returns accessible variable labels", () => {
    expect(
      getNormalityVariableLabel(
        "equivalents",
      ),
    ).toBe("Solute equivalents");

    expect(
      getNormalityVariableLabel(
        "solutionVolume",
      ),
    ).toBe("Solution volume");

    expect(
      getNormalityVariableLabel(
        "normality",
      ),
    ).toBe("Normality");
  });
});
