import { describe, expect, it } from "vitest";

import { calculateMolecularWeight } from "../molecular-weight";

describe("calculateMolecularWeight", () => {
  it("calculates the molecular weight of water", () => {
    const result = calculateMolecularWeight("H2O");

    expect(result.value).toBeCloseTo(18.015, 6);
    expect(result.formattedValue).toBe("18.015");
    expect(result.details.unit).toBe("g/mol");
  });

  it("calculates the molecular weight of sodium chloride", () => {
    const result = calculateMolecularWeight("NaCl");

    expect(result.value).toBeCloseTo(58.43976928, 8);
  });

  it("supports multi-digit subscripts", () => {
    const result = calculateMolecularWeight("C12H22O11");

    expect(result.value).toBeCloseTo(342.297, 6);
  });

  it("supports grouped formulas with parentheses", () => {
    const result = calculateMolecularWeight("Ca(OH)2");

    expect(result.value).toBeCloseTo(74.092, 6);
    expect(
      result.details.elements.find(
        (element) => element.symbol === "O",
      )?.count,
    ).toBe(2);
  });

  it("supports nested parentheses", () => {
    const result = calculateMolecularWeight("K4(ON(SO3)2)2");

    expect(result.value).toBeCloseTo(536.6332, 4);
  });

  it("supports hydrate notation and leading coefficients", () => {
    const result = calculateMolecularWeight("CuSO4·5H2O");

    expect(result.value).toBeCloseTo(249.677, 6);
    expect(
      result.details.elements.find(
        (element) => element.symbol === "H",
      )?.count,
    ).toBe(10);
  });

  it("normalizes spaces and alternate hydrate dots", () => {
    const result = calculateMolecularWeight(" CuSO4 • 5H2O ");

    expect(result.details.normalizedFormula).toBe("CuSO4·5H2O");
    expect(result.value).toBeCloseTo(249.677, 6);
  });

  it("returns element contribution details", () => {
    const result = calculateMolecularWeight("CO2");
    const carbon = result.details.elements.find(
      (element) => element.symbol === "C",
    );

    expect(carbon).toEqual({
      symbol: "C",
      count: 1,
      atomicMass: 12.011,
      contribution: 12.011,
    });
  });

  it("rejects an empty formula", () => {
    expect(() => calculateMolecularWeight("   ")).toThrow(
      "Chemical formula is required.",
    );
  });

  it("rejects unknown element symbols", () => {
    expect(() => calculateMolecularWeight("Xx2")).toThrow(
      "Unknown chemical element symbol: Xx.",
    );
  });

  it("rejects zero subscripts", () => {
    expect(() => calculateMolecularWeight("H0")).toThrow(
      "Element and group subscripts must be positive integers.",
    );
  });

  it("rejects unmatched opening parentheses", () => {
    expect(() => calculateMolecularWeight("Ca(OH2")).toThrow(
      "Chemical formula contains an unmatched opening parenthesis.",
    );
  });

  it("rejects unmatched closing parentheses", () => {
    expect(() => calculateMolecularWeight("CaOH)2")).toThrow(
      "Chemical formula contains an unmatched closing parenthesis.",
    );
  });

  it("rejects malformed hydrate notation", () => {
    expect(() => calculateMolecularWeight("CuSO4··5H2O")).toThrow(
      "Hydrate notation contains an empty formula section.",
    );
  });
});
