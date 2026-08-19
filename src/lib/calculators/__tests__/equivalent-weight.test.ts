import { describe, expect, it } from "vitest";

import {
  calculateEquivalentWeight,
  convertGramsToMass,
  convertMassToGrams,
  getEquivalentWeightVariableLabel,
  type EquivalentWeightMassUnit,
} from "../equivalent-weight";

describe("calculateEquivalentWeight", () => {
  it("calculates equivalent weight from molar mass and n-factor", () => {
    const result =
      calculateEquivalentWeight({
        molarMass: 98.079,
        nFactor: 2,
        solveFor: "equivalentWeight",
      });

    expect(result.value).toBeCloseTo(
      49.0395,
      10,
    );

    expect(result.formattedValue).toBe(
      "49.0395 g/eq",
    );
  });

  it("supports fractional n-factor values", () => {
    const result =
      calculateEquivalentWeight({
        molarMass: 75,
        nFactor: 1.5,
        solveFor: "equivalentWeight",
      });

    expect(result.value).toBeCloseTo(50);
  });

  it("returns complete equivalent weight details", () => {
    const result =
      calculateEquivalentWeight({
        molarMass: 98.079,
        nFactor: 2,
        solveFor: "equivalentWeight",
      });

    expect(result.details).toEqual({
      molarMass: 98.079,
      nFactor: 2,
      equivalentWeight: 49.0395,
      mass: undefined,
      massInGrams: undefined,
      massUnit: "g",
      equivalents: undefined,
      solvedVariable:
        "equivalentWeight",
      formula:
        "EW = molar mass ÷ n-factor",
    });
  });

  it("calculates molar mass", () => {
    const result =
      calculateEquivalentWeight({
        equivalentWeight: 49.0395,
        nFactor: 2,
        solveFor: "molarMass",
      });

    expect(result.value).toBeCloseTo(
      98.079,
      10,
    );

    expect(result.formattedValue).toBe(
      "98.079 g/mol",
    );
  });

  it("calculates n-factor", () => {
    const result =
      calculateEquivalentWeight({
        molarMass: 40,
        equivalentWeight: 20,
        solveFor: "nFactor",
      });

    expect(result.value).toBeCloseTo(2);
    expect(result.formattedValue).toBe(
      "2",
    );
  });

  it("calculates a non-integer n-factor", () => {
    const result =
      calculateEquivalentWeight({
        molarMass: 125,
        equivalentWeight: 50,
        solveFor: "nFactor",
      });

    expect(result.value).toBeCloseTo(2.5);
  });

  it("calculates equivalents from grams", () => {
    const result =
      calculateEquivalentWeight({
        equivalentWeight: 49.04,
        mass: 4.904,
        massUnit: "g",
        solveFor: "equivalents",
      });

    expect(result.value).toBeCloseTo(0.1);
    expect(result.formattedValue).toBe(
      "0.1 eq",
    );
  });

  it("calculates equivalents from milligrams", () => {
    const result =
      calculateEquivalentWeight({
        equivalentWeight: 49.04,
        mass: 4904,
        massUnit: "mg",
        solveFor: "equivalents",
      });

    expect(result.value).toBeCloseTo(0.1);

    expect(
      result.details.massInGrams,
    ).toBeCloseTo(4.904);
  });

  it("supports zero mass and zero equivalents", () => {
    const result =
      calculateEquivalentWeight({
        equivalentWeight: 49.04,
        mass: 0,
        massUnit: "g",
        solveFor: "equivalents",
      });

    expect(result.value).toBe(0);
    expect(result.formattedValue).toBe(
      "0 eq",
    );
  });

  it("calculates mass in grams", () => {
    const result =
      calculateEquivalentWeight({
        equivalentWeight: 40,
        equivalents: 0.25,
        massUnit: "g",
        solveFor: "mass",
      });

    expect(result.value).toBeCloseTo(10);
    expect(result.formattedValue).toBe(
      "10 g",
    );
  });

  it("calculates mass in milligrams", () => {
    const result =
      calculateEquivalentWeight({
        equivalentWeight: 40,
        equivalents: 0.25,
        massUnit: "mg",
        solveFor: "mass",
      });

    expect(result.value).toBeCloseTo(
      10000,
    );

    expect(
      result.details.massInGrams,
    ).toBeCloseTo(10);

    expect(result.formattedValue).toBe(
      "10,000 mg",
    );
  });

  it("supports zero equivalents and zero mass", () => {
    const result =
      calculateEquivalentWeight({
        equivalentWeight: 40,
        equivalents: 0,
        massUnit: "g",
        solveFor: "mass",
      });

    expect(result.value).toBe(0);
    expect(result.formattedValue).toBe(
      "0 g",
    );
  });

  it("converts grams to milligrams", () => {
    expect(
      convertGramsToMass(2.5, "mg"),
    ).toBeCloseTo(2500);

    expect(
      convertGramsToMass(2.5, "g"),
    ).toBeCloseTo(2.5);
  });

  it("converts milligrams to grams", () => {
    expect(
      convertMassToGrams(2500, "mg"),
    ).toBeCloseTo(2.5);

    expect(
      convertMassToGrams(2.5, "g"),
    ).toBeCloseTo(2.5);
  });

  it("rejects non-finite molar mass", () => {
    expect(() =>
      calculateEquivalentWeight({
        molarMass: Number.NaN,
        nFactor: 2,
        solveFor: "equivalentWeight",
      }),
    ).toThrow(
      "Molar mass must be a finite number.",
    );

    expect(() =>
      calculateEquivalentWeight({
        molarMass:
          Number.POSITIVE_INFINITY,
        equivalentWeight: 20,
        solveFor: "nFactor",
      }),
    ).toThrow(
      "Molar mass must be a finite number.",
    );
  });

  it("rejects non-positive molar mass", () => {
    for (const molarMass of [0, -10]) {
      expect(() =>
        calculateEquivalentWeight({
          molarMass,
          nFactor: 2,
          solveFor: "equivalentWeight",
        }),
      ).toThrow(
        "Molar mass must be greater than zero.",
      );
    }
  });

  it("rejects zero or non-finite n-factor", () => {
    expect(() =>
      calculateEquivalentWeight({
        molarMass: 98,
        nFactor: 0,
        solveFor: "equivalentWeight",
      }),
    ).toThrow(
      "n-factor must be greater than zero.",
    );

    expect(() =>
      calculateEquivalentWeight({
        equivalentWeight: 49,
        nFactor: Number.NaN,
        solveFor: "molarMass",
      }),
    ).toThrow(
      "n-factor must be a finite number.",
    );
  });

  it("rejects negative n-factor", () => {
    expect(() =>
      calculateEquivalentWeight({
        molarMass: 98,
        nFactor: -2,
        solveFor: "equivalentWeight",
      }),
    ).toThrow(
      "n-factor must be greater than zero.",
    );
  });

  it("rejects zero or non-finite equivalent weight", () => {
    expect(() =>
      calculateEquivalentWeight({
        equivalentWeight: 0,
        nFactor: 2,
        solveFor: "molarMass",
      }),
    ).toThrow(
      "Equivalent weight must be greater than zero.",
    );

    expect(() =>
      calculateEquivalentWeight({
        equivalentWeight: Number.NaN,
        mass: 5,
        massUnit: "g",
        solveFor: "equivalents",
      }),
    ).toThrow(
      "Equivalent weight must be a finite number.",
    );
  });

  it("rejects negative equivalent weight", () => {
    expect(() =>
      calculateEquivalentWeight({
        equivalentWeight: -20,
        equivalents: 1,
        massUnit: "g",
        solveFor: "mass",
      }),
    ).toThrow(
      "Equivalent weight must be greater than zero.",
    );
  });

  it("rejects non-finite mass", () => {
    expect(() =>
      calculateEquivalentWeight({
        equivalentWeight: 40,
        mass: Number.NaN,
        massUnit: "g",
        solveFor: "equivalents",
      }),
    ).toThrow(
      "Sample mass must be a finite number.",
    );
  });

  it("rejects negative mass", () => {
    expect(() =>
      calculateEquivalentWeight({
        equivalentWeight: 40,
        mass: -1,
        massUnit: "g",
        solveFor: "equivalents",
      }),
    ).toThrow(
      "Sample mass cannot be negative.",
    );
  });

  it("rejects non-finite equivalents", () => {
    expect(() =>
      calculateEquivalentWeight({
        equivalentWeight: 40,
        equivalents: Number.NaN,
        massUnit: "g",
        solveFor: "mass",
      }),
    ).toThrow(
      "Reactive equivalents must be a finite number.",
    );
  });

  it("rejects negative equivalents", () => {
    expect(() =>
      calculateEquivalentWeight({
        equivalentWeight: 40,
        equivalents: -0.5,
        massUnit: "g",
        solveFor: "mass",
      }),
    ).toThrow(
      "Reactive equivalents cannot be negative.",
    );
  });

  it("rejects unsupported mass units", () => {
    expect(() =>
      convertMassToGrams(
        1,
        "kg" as EquivalentWeightMassUnit,
      ),
    ).toThrow(
      "Unsupported sample mass unit.",
    );

    expect(() =>
      convertGramsToMass(
        1,
        "kg" as EquivalentWeightMassUnit,
      ),
    ).toThrow(
      "Unsupported sample mass unit.",
    );
  });

  it("returns accessible labels for all solve modes", () => {
    expect(
      getEquivalentWeightVariableLabel(
        "equivalentWeight",
      ),
    ).toBe("Equivalent weight");

    expect(
      getEquivalentWeightVariableLabel(
        "molarMass",
      ),
    ).toBe("Molar mass");

    expect(
      getEquivalentWeightVariableLabel(
        "nFactor",
      ),
    ).toBe("n-factor");

    expect(
      getEquivalentWeightVariableLabel(
        "equivalents",
      ),
    ).toBe("Reactive equivalents");

    expect(
      getEquivalentWeightVariableLabel(
        "mass",
      ),
    ).toBe("Sample mass");
  });
});
