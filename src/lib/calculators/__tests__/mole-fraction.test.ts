import {
  describe,
  expect,
  it,
} from "vitest";

import {
  calculateMoleFraction,
  getMoleFractionVariableLabel,
} from "../mole-fraction";

describe("calculateMoleFraction", () => {
  it("calculates mole fraction from component and total moles", () => {
    const result = calculateMoleFraction({
      componentMoles: 2,
      totalMoles: 5,
      solveFor: "moleFraction",
    });

    expect(result.value).toBeCloseTo(0.4);
    expect(result.formattedValue).toBe("0.4");
    expect(result.details.molePercent).toBeCloseTo(40);
  });

  it("supports a zero mole fraction", () => {
    const result = calculateMoleFraction({
      componentMoles: 0,
      totalMoles: 4,
      solveFor: "moleFraction",
    });

    expect(result.value).toBe(0);
    expect(result.details.molePercent).toBe(0);
  });

  it("supports a pure component mole fraction of one", () => {
    const result = calculateMoleFraction({
      componentMoles: 3,
      totalMoles: 3,
      solveFor: "moleFraction",
    });

    expect(result.value).toBe(1);
    expect(result.details.molePercent).toBe(100);
  });

  it("calculates component moles", () => {
    const result = calculateMoleFraction({
      totalMoles: 8,
      moleFraction: 0.25,
      solveFor: "componentMoles",
    });

    expect(result.value).toBeCloseTo(2);
    expect(result.formattedValue).toBe("2 mol");
    expect(result.details.componentMoles).toBeCloseTo(2);
  });

  it("calculates total moles", () => {
    const result = calculateMoleFraction({
      componentMoles: 1.5,
      moleFraction: 0.3,
      solveFor: "totalMoles",
    });

    expect(result.value).toBeCloseTo(5);
    expect(result.formattedValue).toBe("5 mol");
    expect(result.details.totalMoles).toBeCloseTo(5);
  });

  it("returns complete calculation details", () => {
    const result = calculateMoleFraction({
      componentMoles: 1,
      totalMoles: 4,
      solveFor: "moleFraction",
    });

    expect(result.details).toEqual({
      componentMoles: 1,
      totalMoles: 4,
      moleFraction: 0.25,
      molePercent: 25,
      solvedVariable: "moleFraction",
      formula: "xᵢ = nᵢ ÷ nₜₒₜₐₗ",
    });
  });

  it("rejects negative component moles", () => {
    expect(() =>
      calculateMoleFraction({
        componentMoles: -1,
        totalMoles: 4,
        solveFor: "moleFraction",
      }),
    ).toThrow(
      "Component moles cannot be negative.",
    );
  });

  it("rejects non-finite component moles", () => {
    expect(() =>
      calculateMoleFraction({
        componentMoles: Number.NaN,
        totalMoles: 4,
        solveFor: "moleFraction",
      }),
    ).toThrow(
      "Component moles must be a finite number.",
    );
  });

  it("rejects zero total moles", () => {
    expect(() =>
      calculateMoleFraction({
        componentMoles: 1,
        totalMoles: 0,
        solveFor: "moleFraction",
      }),
    ).toThrow(
      "Total moles must be greater than zero.",
    );
  });

  it("rejects non-finite total moles", () => {
    expect(() =>
      calculateMoleFraction({
        componentMoles: 1,
        totalMoles: Number.POSITIVE_INFINITY,
        solveFor: "moleFraction",
      }),
    ).toThrow(
      "Total moles must be a finite number.",
    );
  });

  it("rejects component moles greater than total moles", () => {
    expect(() =>
      calculateMoleFraction({
        componentMoles: 6,
        totalMoles: 5,
        solveFor: "moleFraction",
      }),
    ).toThrow(
      "Component moles cannot exceed total moles.",
    );
  });

  it("rejects mole fractions below zero", () => {
    expect(() =>
      calculateMoleFraction({
        totalMoles: 5,
        moleFraction: -0.1,
        solveFor: "componentMoles",
      }),
    ).toThrow(
      "Mole fraction must be between 0 and 1.",
    );
  });

  it("rejects mole fractions above one", () => {
    expect(() =>
      calculateMoleFraction({
        totalMoles: 5,
        moleFraction: 1.1,
        solveFor: "componentMoles",
      }),
    ).toThrow(
      "Mole fraction must be between 0 and 1.",
    );
  });

  it("rejects zero mole fraction when calculating total moles", () => {
    expect(() =>
      calculateMoleFraction({
        componentMoles: 1,
        moleFraction: 0,
        solveFor: "totalMoles",
      }),
    ).toThrow(
      "Mole fraction must be greater than zero when calculating total moles.",
    );
  });

  it("rejects zero component moles when calculating total moles", () => {
    expect(() =>
      calculateMoleFraction({
        componentMoles: 0,
        moleFraction: 0.25,
        solveFor: "totalMoles",
      }),
    ).toThrow(
      "Total moles must be greater than zero.",
    );
  });

  it("returns accessible variable labels", () => {
    expect(
      getMoleFractionVariableLabel(
        "componentMoles",
      ),
    ).toBe("Component moles");

    expect(
      getMoleFractionVariableLabel(
        "totalMoles",
      ),
    ).toBe("Total moles");

    expect(
      getMoleFractionVariableLabel(
        "moleFraction",
      ),
    ).toBe("Mole fraction");
  });
});
