import { describe, expect, it } from "vitest";

import { calculateMassMoles } from "../mass-moles";

describe("calculateMassMoles", () => {
  it("calculates mass from moles and molar mass", () => {
    const result = calculateMassMoles({
      moles: 2,
      molarMass: 18.015,
      solveFor: "mass",
    });

    expect(result.value).toBeCloseTo(36.03, 10);
    expect(result.formattedValue).toBe("36.03");
    expect(result.details.mass).toBeCloseTo(36.03, 10);
  });

  it("calculates moles from mass and molar mass", () => {
    const result = calculateMassMoles({
      mass: 36.03,
      molarMass: 18.015,
      solveFor: "moles",
    });

    expect(result.value).toBeCloseTo(2, 10);
    expect(result.details.moles).toBeCloseTo(2, 10);
  });

  it("calculates molar mass from mass and moles", () => {
    const result = calculateMassMoles({
      mass: 58.44,
      moles: 1,
      solveFor: "molarMass",
    });

    expect(result.value).toBeCloseTo(58.44, 10);
    expect(result.details.molarMass).toBeCloseTo(58.44, 10);
  });

  it("supports decimal values", () => {
    const result = calculateMassMoles({
      mass: 9.0075,
      molarMass: 18.015,
      solveFor: "moles",
    });

    expect(result.value).toBeCloseTo(0.5, 10);
    expect(result.formattedValue).toBe("0.5");
  });

  it("rejects missing mass", () => {
    expect(() =>
      calculateMassMoles({
        molarMass: 18.015,
        solveFor: "moles",
      }),
    ).toThrow("Mass must be a finite number.");
  });

  it("rejects zero molar mass", () => {
    expect(() =>
      calculateMassMoles({
        mass: 10,
        molarMass: 0,
        solveFor: "moles",
      }),
    ).toThrow("Molar mass must be greater than zero.");
  });

  it("rejects negative moles", () => {
    expect(() =>
      calculateMassMoles({
        moles: -2,
        molarMass: 18.015,
        solveFor: "mass",
      }),
    ).toThrow("Moles must be greater than zero.");
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateMassMoles({
        mass: Number.NaN,
        molarMass: 18.015,
        solveFor: "moles",
      }),
    ).toThrow("Mass must be a finite number.");
  });
});
