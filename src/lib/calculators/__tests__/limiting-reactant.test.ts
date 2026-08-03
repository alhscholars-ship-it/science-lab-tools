import {
  describe,
  expect,
  it,
} from "vitest";

import {
  calculateLimitingReactant,
} from "../limiting-reactant";

describe("calculateLimitingReactant", () => {
  it("identifies reactant A as limiting", () => {
    const result =
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 2,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 2,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      });

    expect(
      result.details.limitingReactant,
    ).toBe("Hydrogen");

    expect(
      result.details.excessReactant,
    ).toBe("Oxygen");

    expect(
      result.details.excessMoles,
    ).toBeCloseTo(1, 10);

    expect(result.value).toBeCloseTo(
      2,
      10,
    );
  });

  it("identifies reactant B as limiting", () => {
    const result =
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 6,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      });

    expect(
      result.details.limitingReactant,
    ).toBe("Oxygen");

    expect(
      result.details.excessReactant,
    ).toBe("Hydrogen");

    expect(
      result.details.excessMoles,
    ).toBeCloseTo(4, 10);
  });

  it("identifies co-limiting reactants", () => {
    const result =
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 4,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 2,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      });

    expect(
      result.details.isCoLimiting,
    ).toBe(true);

    expect(
      result.details.limitingReactant,
    ).toBe(
      "Hydrogen and Oxygen",
    );

    expect(
      result.details.excessReactant,
    ).toBeNull();

    expect(
      result.details.excessMoles,
    ).toBe(0);
  });

  it("converts reactant grams to moles", () => {
    const result =
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 4.032,
          unit: "g",
          coefficient: 2,
          molarMass: 2.016,
        },
        reactantB: {
          name: "Oxygen",
          amount: 32,
          unit: "g",
          coefficient: 1,
          molarMass: 32,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      });

    expect(
      result.details.reactantAMoles,
    ).toBeCloseTo(2, 10);

    expect(
      result.details.reactantBMoles,
    ).toBeCloseTo(1, 10);

    expect(
      result.details.isCoLimiting,
    ).toBe(true);
  });

  it("calculates theoretical product moles", () => {
    const result =
      calculateLimitingReactant({
        reactantA: {
          name: "Nitrogen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        reactantB: {
          name: "Hydrogen",
          amount: 6,
          unit: "mol",
          coefficient: 3,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      });

    expect(
      result.details.productMoles,
    ).toBeCloseTo(2, 10);

    expect(result.value).toBeCloseTo(
      2,
      10,
    );
  });

  it("converts theoretical product to grams", () => {
    const result =
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 2,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "g",
          molarMass: 18.015,
        },
      });

    expect(
      result.details.productMoles,
    ).toBeCloseTo(2, 10);

    expect(result.value).toBeCloseTo(
      36.03,
      8,
    );

    expect(
      result.formattedValue,
    ).toBe("36.03");
  });

  it("uses coefficient-normalized capacities", () => {
    const result =
      calculateLimitingReactant({
        reactantA: {
          name: "Nitrogen",
          amount: 2,
          unit: "mol",
          coefficient: 1,
        },
        reactantB: {
          name: "Hydrogen",
          amount: 3,
          unit: "mol",
          coefficient: 3,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      });

    expect(
      result.details.reactantAReactionCapacity,
    ).toBeCloseTo(2, 10);

    expect(
      result.details.reactantBReactionCapacity,
    ).toBeCloseTo(1, 10);

    expect(
      result.details.limitingReactant,
    ).toBe("Hydrogen");
  });

  it("requires reactant A molar mass for grams", () => {
    expect(() =>
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 4,
          unit: "g",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      }),
    ).toThrow(
      "Reactant A molar mass must be a finite number.",
    );
  });

  it("requires reactant B molar mass for grams", () => {
    expect(() =>
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 2,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 32,
          unit: "g",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      }),
    ).toThrow(
      "Reactant B molar mass must be a finite number.",
    );
  });

  it("requires product molar mass for grams", () => {
    expect(() =>
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 2,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "g",
        },
      }),
    ).toThrow(
      "Product molar mass must be a finite number.",
    );
  });

  it("rejects a zero reactant coefficient", () => {
    expect(() =>
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 2,
          unit: "mol",
          coefficient: 0,
        },
        reactantB: {
          name: "Oxygen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      }),
    ).toThrow(
      "Reactant A coefficient must be greater than zero.",
    );
  });

  it("rejects a zero product coefficient", () => {
    expect(() =>
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 2,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 0,
          unit: "mol",
        },
      }),
    ).toThrow(
      "Product coefficient must be greater than zero.",
    );
  });

  it("rejects negative reactant amounts", () => {
    expect(() =>
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: -2,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      }),
    ).toThrow(
      "Reactant A amount must be greater than zero.",
    );
  });

  it("rejects empty reactant names", () => {
    expect(() =>
      calculateLimitingReactant({
        reactantA: {
          name: " ",
          amount: 2,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      }),
    ).toThrow(
      "Reactant A name is required.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: Number.NaN,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      }),
    ).toThrow(
      "Reactant A amount must be a finite number.",
    );
  });

  it("records the limiting-reactant formula", () => {
    const result =
      calculateLimitingReactant({
        reactantA: {
          name: "Hydrogen",
          amount: 2,
          unit: "mol",
          coefficient: 2,
        },
        reactantB: {
          name: "Oxygen",
          amount: 1,
          unit: "mol",
          coefficient: 1,
        },
        product: {
          coefficient: 2,
          unit: "mol",
        },
      });

    expect(result.details.formula).toBe(
      "reaction capacity = available moles ÷ coefficient; the smaller capacity identifies the limiting reactant",
    );
  });
});
