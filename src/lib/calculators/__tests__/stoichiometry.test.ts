import {
  describe,
  expect,
  it,
} from "vitest";

import {
  calculateStoichiometry,
} from "../stoichiometry";

describe("calculateStoichiometry", () => {
  it("calculates mole-to-mole quantities", () => {
    const result =
      calculateStoichiometry({
        knownAmount: 1,
        knownUnit: "mol",
        knownCoefficient: 1,
        targetCoefficient: 2,
        targetUnit: "mol",
      });

    expect(result.value).toBeCloseTo(
      2,
      10,
    );

    expect(
      result.details.moleRatio,
    ).toBeCloseTo(2, 10);
  });

  it("calculates gram-to-gram quantities", () => {
    const result =
      calculateStoichiometry({
        knownAmount: 4.032,
        knownUnit: "g",
        knownCoefficient: 2,
        knownMolarMass: 2.016,
        targetCoefficient: 2,
        targetUnit: "g",
        targetMolarMass: 18.015,
      });

    expect(result.value).toBeCloseTo(
      36.03,
      8,
    );

    expect(
      result.formattedValue,
    ).toBe("36.03");

    expect(
      result.details.knownMoles,
    ).toBeCloseTo(2, 10);

    expect(
      result.details.targetMoles,
    ).toBeCloseTo(2, 10);
  });

  it("converts known grams to target moles", () => {
    const result =
      calculateStoichiometry({
        knownAmount: 10,
        knownUnit: "g",
        knownCoefficient: 1,
        knownMolarMass: 100.0869,
        targetCoefficient: 1,
        targetUnit: "mol",
      });

    expect(result.value).toBeCloseTo(
      0.099913,
      5,
    );
  });

  it("converts known moles to target grams", () => {
    const result =
      calculateStoichiometry({
        knownAmount: 0.5,
        knownUnit: "mol",
        knownCoefficient: 2,
        targetCoefficient: 1,
        targetUnit: "g",
        targetMolarMass: 44.0095,
      });

    expect(result.value).toBeCloseTo(
      11.002375,
      6,
    );
  });

  it("records the calculation formula", () => {
    const result =
      calculateStoichiometry({
        knownAmount: 1,
        knownUnit: "mol",
        knownCoefficient: 3,
        targetCoefficient: 2,
        targetUnit: "mol",
      });

    expect(result.details.formula).toBe(
      "target moles = known moles × (target coefficient ÷ known coefficient)",
    );
  });

  it("rejects a zero known coefficient", () => {
    expect(() =>
      calculateStoichiometry({
        knownAmount: 1,
        knownUnit: "mol",
        knownCoefficient: 0,
        targetCoefficient: 2,
        targetUnit: "mol",
      }),
    ).toThrow(
      "Known coefficient must be greater than zero.",
    );
  });

  it("rejects a zero target coefficient", () => {
    expect(() =>
      calculateStoichiometry({
        knownAmount: 1,
        knownUnit: "mol",
        knownCoefficient: 1,
        targetCoefficient: 0,
        targetUnit: "mol",
      }),
    ).toThrow(
      "Target coefficient must be greater than zero.",
    );
  });

  it("requires known molar mass for grams", () => {
    expect(() =>
      calculateStoichiometry({
        knownAmount: 10,
        knownUnit: "g",
        knownCoefficient: 1,
        targetCoefficient: 1,
        targetUnit: "mol",
      }),
    ).toThrow(
      "Known substance molar mass must be a finite number.",
    );
  });

  it("requires target molar mass for grams", () => {
    expect(() =>
      calculateStoichiometry({
        knownAmount: 1,
        knownUnit: "mol",
        knownCoefficient: 1,
        targetCoefficient: 1,
        targetUnit: "g",
      }),
    ).toThrow(
      "Target molar mass must be a finite number.",
    );
  });

  it("rejects negative known amounts", () => {
    expect(() =>
      calculateStoichiometry({
        knownAmount: -1,
        knownUnit: "mol",
        knownCoefficient: 1,
        targetCoefficient: 1,
        targetUnit: "mol",
      }),
    ).toThrow(
      "Known amount must be greater than zero.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateStoichiometry({
        knownAmount: Number.NaN,
        knownUnit: "mol",
        knownCoefficient: 1,
        targetCoefficient: 1,
        targetUnit: "mol",
      }),
    ).toThrow(
      "Known amount must be a finite number.",
    );
  });
});
