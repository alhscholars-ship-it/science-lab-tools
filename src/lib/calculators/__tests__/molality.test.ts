import { describe, expect, it } from "vitest";

import {
  calculateMolality,
  convertSolventMassToKilograms,
  getMolalityVariableLabel,
  type SolventMassUnit,
} from "../molality";

describe("calculateMolality", () => {
  it("calculates molality using kilograms of solvent", () => {
    const result = calculateMolality({
      soluteMoles: 0.5,
      solventMass: 2,
      solventMassUnit: "kg",
      solveFor: "molality",
    });

    expect(result.value).toBeCloseTo(0.25);
    expect(result.formattedValue).toBe(
      "0.25 mol/kg",
    );
  });

  it("converts grams to kilograms when calculating molality", () => {
    const result = calculateMolality({
      soluteMoles: 0.25,
      solventMass: 500,
      solventMassUnit: "g",
      solveFor: "molality",
    });

    expect(result.value).toBeCloseTo(0.5);
    expect(
      result.details.solventMassInKilograms,
    ).toBeCloseTo(0.5);
  });

  it("supports zero solute moles and zero molality", () => {
    const result = calculateMolality({
      soluteMoles: 0,
      solventMass: 1,
      solventMassUnit: "kg",
      solveFor: "molality",
    });

    expect(result.value).toBe(0);
  });

  it("calculates moles of solute using kilograms", () => {
    const result = calculateMolality({
      solventMass: 0.4,
      solventMassUnit: "kg",
      molality: 1.5,
      solveFor: "soluteMoles",
    });

    expect(result.value).toBeCloseTo(0.6);
    expect(result.formattedValue).toBe(
      "0.6 mol",
    );
  });

  it("calculates moles of solute using grams", () => {
    const result = calculateMolality({
      solventMass: 250,
      solventMassUnit: "g",
      molality: 2,
      solveFor: "soluteMoles",
    });

    expect(result.value).toBeCloseTo(0.5);
  });

  it("calculates solvent mass in kilograms", () => {
    const result = calculateMolality({
      soluteMoles: 0.75,
      solventMassUnit: "kg",
      molality: 1.5,
      solveFor: "solventMass",
    });

    expect(result.value).toBeCloseTo(0.5);
    expect(result.formattedValue).toBe(
      "0.5 kg",
    );
  });

  it("calculates solvent mass in grams", () => {
    const result = calculateMolality({
      soluteMoles: 0.75,
      solventMassUnit: "g",
      molality: 1.5,
      solveFor: "solventMass",
    });

    expect(result.value).toBeCloseTo(500);
    expect(result.formattedValue).toBe(
      "500 g",
    );
  });

  it("returns complete calculation details", () => {
    const result = calculateMolality({
      soluteMoles: 1,
      solventMass: 500,
      solventMassUnit: "g",
      solveFor: "molality",
    });

    expect(result.details).toEqual({
      soluteMoles: 1,
      solventMass: 500,
      solventMassUnit: "g",
      solventMassInKilograms: 0.5,
      molality: 2,
      solvedVariable: "molality",
      formula: "m = n ÷ kg solvent",
    });
  });

  it("converts solvent mass units directly", () => {
    expect(
      convertSolventMassToKilograms(750, "g"),
    ).toBeCloseTo(0.75);

    expect(
      convertSolventMassToKilograms(2, "kg"),
    ).toBe(2);
  });

  it("rejects non-finite solute moles", () => {
    expect(() =>
      calculateMolality({
        soluteMoles: Number.NaN,
        solventMass: 1,
        solventMassUnit: "kg",
        solveFor: "molality",
      }),
    ).toThrow(
      "Moles of solute must be a finite number.",
    );
  });

  it("rejects negative solute moles", () => {
    expect(() =>
      calculateMolality({
        soluteMoles: -1,
        solventMass: 1,
        solventMassUnit: "kg",
        solveFor: "molality",
      }),
    ).toThrow(
      "Moles of solute cannot be negative.",
    );
  });

  it("rejects non-finite solvent mass", () => {
    expect(() =>
      calculateMolality({
        soluteMoles: 1,
        solventMass: Number.POSITIVE_INFINITY,
        solventMassUnit: "kg",
        solveFor: "molality",
      }),
    ).toThrow(
      "Mass of solvent must be a finite number.",
    );
  });

  it("rejects zero solvent mass", () => {
    expect(() =>
      calculateMolality({
        soluteMoles: 1,
        solventMass: 0,
        solventMassUnit: "kg",
        solveFor: "molality",
      }),
    ).toThrow(
      "Mass of solvent must be greater than zero.",
    );
  });

  it("rejects negative solvent mass", () => {
    expect(() =>
      calculateMolality({
        soluteMoles: 1,
        solventMass: -250,
        solventMassUnit: "g",
        solveFor: "molality",
      }),
    ).toThrow(
      "Mass of solvent must be greater than zero.",
    );
  });

  it("rejects unsupported solvent mass units", () => {
    expect(() =>
      convertSolventMassToKilograms(
        1,
        "lb" as SolventMassUnit,
      ),
    ).toThrow(
      "Unsupported solvent mass unit.",
    );
  });

  it("rejects non-finite molality", () => {
    expect(() =>
      calculateMolality({
        solventMass: 1,
        solventMassUnit: "kg",
        molality: Number.NaN,
        solveFor: "soluteMoles",
      }),
    ).toThrow(
      "Molality must be a finite number.",
    );
  });

  it("rejects negative molality", () => {
    expect(() =>
      calculateMolality({
        solventMass: 1,
        solventMassUnit: "kg",
        molality: -1,
        solveFor: "soluteMoles",
      }),
    ).toThrow(
      "Molality cannot be negative.",
    );
  });

  it("rejects zero molality when calculating solvent mass", () => {
    expect(() =>
      calculateMolality({
        soluteMoles: 1,
        solventMassUnit: "kg",
        molality: 0,
        solveFor: "solventMass",
      }),
    ).toThrow(
      "Molality must be greater than zero when calculating solvent mass.",
    );
  });

  it("rejects zero solute moles when calculating solvent mass", () => {
    expect(() =>
      calculateMolality({
        soluteMoles: 0,
        solventMassUnit: "kg",
        molality: 1,
        solveFor: "solventMass",
      }),
    ).toThrow(
      "Moles of solute must be greater than zero when calculating solvent mass.",
    );
  });

  it("returns accessible variable labels", () => {
    expect(
      getMolalityVariableLabel("soluteMoles"),
    ).toBe("Moles of solute");

    expect(
      getMolalityVariableLabel("solventMass"),
    ).toBe("Mass of solvent");

    expect(
      getMolalityVariableLabel("molality"),
    ).toBe("Molality");
  });
});
