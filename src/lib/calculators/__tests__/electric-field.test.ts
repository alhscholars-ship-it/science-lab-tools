import { describe, expect, it } from "vitest";

import {
  calculateElectricField,
  ELECTRIC_CONSTANT,
  type ElectricFieldMode,
} from "../electric-field";

describe("calculateElectricField", () => {
  describe("force-charge mode", () => {
    it("calculates electric field from force and test charge", () => {
      const result = calculateElectricField({
        mode: "forceCharge",
        solveFor: "electricField",
        force: 0.02,
        testCharge: 4e-6,
      });

      expect(result.value).toBeCloseTo(5000, 10);
      expect(result.details.electricField).toBeCloseTo(
        5000,
        10,
      );
      expect(result.details.force).toBeCloseTo(
        0.02,
        12,
      );
      expect(result.details.testCharge).toBeCloseTo(
        4e-6,
        15,
      );
      expect(result.details.formula).toBe(
        "E = F ÷ q",
      );
    });

    it("calculates force from electric field and test charge", () => {
      const result = calculateElectricField({
        mode: "forceCharge",
        solveFor: "force",
        electricField: 5000,
        testCharge: 4e-6,
      });

      expect(result.value).toBeCloseTo(
        0.02,
        12,
      );
      expect(result.details.formula).toBe(
        "F = Eq",
      );
    });

    it("calculates test charge from force and electric field", () => {
      const result = calculateElectricField({
        mode: "forceCharge",
        solveFor: "testCharge",
        force: 0.02,
        electricField: 5000,
      });

      expect(result.value).toBeCloseTo(
        4e-6,
        15,
      );
      expect(result.details.formula).toBe(
        "q = F ÷ E",
      );
    });

    it("rejects a variable unsupported by force-charge mode", () => {
      expect(() =>
        calculateElectricField({
          mode: "forceCharge",
          solveFor: "distance",
          electricField: 5000,
          force: 0.02,
        }),
      ).toThrow(
        "The selected variable is not supported in force-charge mode.",
      );
    });

    it("rejects zero test charge", () => {
      expect(() =>
        calculateElectricField({
          mode: "forceCharge",
          solveFor: "electricField",
          force: 0.02,
          testCharge: 0,
        }),
      ).toThrow(
        "Test charge must be greater than zero.",
      );
    });

    it("rejects missing electric field", () => {
      expect(() =>
        calculateElectricField({
          mode: "forceCharge",
          solveFor: "force",
          testCharge: 4e-6,
        }),
      ).toThrow(
        "Electric field strength must be greater than zero.",
      );
    });
  });

  describe("point-charge mode", () => {
    const sourceCharge = 2e-6;
    const distance = 0.05;

    const electricField =
      (
        ELECTRIC_CONSTANT *
        sourceCharge
      ) /
      distance ** 2;

    it("calculates electric field from source charge and distance", () => {
      const result = calculateElectricField({
        mode: "pointCharge",
        solveFor: "electricField",
        sourceCharge,
        distance,
      });

      expect(result.value).toBeCloseTo(
        electricField,
        6,
      );
      expect(result.details.sourceCharge).toBeCloseTo(
        sourceCharge,
        15,
      );
      expect(result.details.distance).toBeCloseTo(
        distance,
        12,
      );
      expect(result.details.electricConstant).toBe(
        ELECTRIC_CONSTANT,
      );
      expect(result.details.formula).toBe(
        "E = kQ ÷ r²",
      );
    });

    it("calculates source charge from electric field and distance", () => {
      const result = calculateElectricField({
        mode: "pointCharge",
        solveFor: "sourceCharge",
        electricField,
        distance,
      });

      expect(result.value).toBeCloseTo(
        sourceCharge,
        15,
      );
      expect(result.details.formula).toBe(
        "Q = Er² ÷ k",
      );
    });

    it("calculates distance from electric field and source charge", () => {
      const result = calculateElectricField({
        mode: "pointCharge",
        solveFor: "distance",
        electricField,
        sourceCharge,
      });

      expect(result.value).toBeCloseTo(
        distance,
        12,
      );
      expect(result.details.formula).toBe(
        "r = √(kQ ÷ E)",
      );
    });

    it("supports nano-coulomb source charges", () => {
      const result = calculateElectricField({
        mode: "pointCharge",
        solveFor: "electricField",
        sourceCharge: 5e-9,
        distance: 0.1,
      });

      const expected =
        (
          ELECTRIC_CONSTANT *
          5e-9
        ) /
        0.1 ** 2;

      expect(result.value).toBeCloseTo(
        expected,
        10,
      );
    });

    it("rejects a variable unsupported by point-charge mode", () => {
      expect(() =>
        calculateElectricField({
          mode: "pointCharge",
          solveFor: "force",
          electricField,
          sourceCharge,
        }),
      ).toThrow(
        "The selected variable is not supported in point-charge mode.",
      );
    });

    it("rejects zero distance", () => {
      expect(() =>
        calculateElectricField({
          mode: "pointCharge",
          solveFor: "electricField",
          sourceCharge,
          distance: 0,
        }),
      ).toThrow(
        "Distance must be greater than zero.",
      );
    });

    it("rejects non-finite source charge", () => {
      expect(() =>
        calculateElectricField({
          mode: "pointCharge",
          solveFor: "electricField",
          sourceCharge:
            Number.POSITIVE_INFINITY,
          distance,
        }),
      ).toThrow(
        "Source charge must be greater than zero.",
      );
    });
  });

  it("rejects an unsupported calculation mode", () => {
    expect(() =>
      calculateElectricField({
        mode: "unknown" as ElectricFieldMode,
        solveFor: "electricField",
        force: 0.02,
        testCharge: 4e-6,
      }),
    ).toThrow(
      "Unsupported electric field mode",
    );
  });

  it("returns formatted values and calculation details", () => {
    const result = calculateElectricField({
      mode: "forceCharge",
      solveFor: "electricField",
      force: 0.02,
      testCharge: 4e-6,
    });

    expect(
      result.formattedValue.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.substitution.length,
    ).toBeGreaterThan(0);

    expect(result.details.solvedVariable).toBe(
      "electricField",
    );

    expect(result.details.mode).toBe(
      "forceCharge",
    );
  });
});
