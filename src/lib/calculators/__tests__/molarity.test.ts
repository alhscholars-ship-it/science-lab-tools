import { describe, expect, it } from "vitest";

import {
  calculateMolarity,
  convertVolumeToLiters,
} from "../molarity";

describe("convertVolumeToLiters", () => {
  it("keeps liters unchanged", () => {
    expect(convertVolumeToLiters(2, "L")).toBe(2);
  });

  it("converts milliliters to liters", () => {
    expect(convertVolumeToLiters(500, "mL")).toBe(0.5);
  });

  it("rejects zero volume", () => {
    expect(() => convertVolumeToLiters(0, "L")).toThrow(
      "Solution volume must be greater than zero.",
    );
  });

  it("rejects negative volume", () => {
    expect(() => convertVolumeToLiters(-250, "mL")).toThrow(
      "Solution volume must be greater than zero.",
    );
  });

  it("rejects non-finite volume", () => {
    expect(() =>
      convertVolumeToLiters(Number.NaN, "L"),
    ).toThrow("Solution volume must be a finite number.");
  });
});

describe("calculateMolarity", () => {
  it("calculates molarity using liters", () => {
    const result = calculateMolarity({
      molesOfSolute: 2,
      solutionVolume: 4,
      volumeUnit: "L",
    });

    expect(result.value).toBe(0.5);
    expect(result.formattedValue).toBe("0.5 mol/L");
    expect(result.details.volumeInLiters).toBe(4);
  });

  it("calculates molarity using milliliters", () => {
    const result = calculateMolarity({
      molesOfSolute: 0.25,
      solutionVolume: 500,
      volumeUnit: "mL",
    });

    expect(result.value).toBe(0.5);
    expect(result.formattedValue).toBe("0.5 mol/L");
    expect(result.details.volumeInLiters).toBe(0.5);
  });

  it("returns zero molarity for zero moles", () => {
    const result = calculateMolarity({
      molesOfSolute: 0,
      solutionVolume: 1,
      volumeUnit: "L",
    });

    expect(result.value).toBe(0);
    expect(result.formattedValue).toBe("0 mol/L");
  });

  it("rejects negative moles", () => {
    expect(() =>
      calculateMolarity({
        molesOfSolute: -1,
        solutionVolume: 1,
        volumeUnit: "L",
      }),
    ).toThrow("Moles of solute cannot be negative.");
  });

  it("rejects non-finite moles", () => {
    expect(() =>
      calculateMolarity({
        molesOfSolute: Number.POSITIVE_INFINITY,
        solutionVolume: 1,
        volumeUnit: "L",
      }),
    ).toThrow("Moles of solute must be a finite number.");
  });
});
