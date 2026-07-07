import { describe, expect, it } from "vitest";

import {
  calculateGravitationalPotentialEnergy,
} from "../gravitational-potential-energy";

describe(
  "calculateGravitationalPotentialEnergy",
  () => {
    it("calculates potential energy", () => {
      const result =
        calculateGravitationalPotentialEnergy({
          mass: 10,
          gravity: 9.8,
          height: 5,
          solveFor: "potentialEnergy",
        });

      expect(result.value).toBe(490);
      expect(
        result.details.potentialEnergy,
      ).toBe(490);
      expect(result.details.formula).toBe(
        "PE = mgh",
      );
    });

    it("calculates mass", () => {
      const result =
        calculateGravitationalPotentialEnergy({
          potentialEnergy: 980,
          gravity: 9.8,
          height: 10,
          solveFor: "mass",
        });

      expect(result.value).toBe(10);
    });

    it("calculates gravitational acceleration", () => {
      const result =
        calculateGravitationalPotentialEnergy({
          potentialEnergy: 490,
          mass: 10,
          height: 5,
          solveFor: "gravity",
        });

      expect(result.value).toBe(9.8);
    });

    it("calculates height", () => {
      const result =
        calculateGravitationalPotentialEnergy({
          potentialEnergy: 980,
          mass: 20,
          gravity: 9.8,
          solveFor: "height",
        });

      expect(result.value).toBe(5);
    });

    it("supports a custom gravity value", () => {
      const result =
        calculateGravitationalPotentialEnergy({
          mass: 12,
          gravity: 1.62,
          height: 8,
          solveFor: "potentialEnergy",
        });

      expect(result.value).toBeCloseTo(
        155.52,
      );
    });

    it("rejects zero mass", () => {
      expect(() =>
        calculateGravitationalPotentialEnergy({
          mass: 0,
          gravity: 9.8,
          height: 5,
          solveFor: "potentialEnergy",
        }),
      ).toThrow(
        "Mass must be greater than zero.",
      );
    });

    it("rejects negative mass", () => {
      expect(() =>
        calculateGravitationalPotentialEnergy({
          mass: -2,
          gravity: 9.8,
          height: 5,
          solveFor: "potentialEnergy",
        }),
      ).toThrow(
        "Mass must be greater than zero.",
      );
    });

    it("rejects zero gravity", () => {
      expect(() =>
        calculateGravitationalPotentialEnergy({
          mass: 10,
          gravity: 0,
          height: 5,
          solveFor: "potentialEnergy",
        }),
      ).toThrow(
        "Gravitational acceleration must be greater than zero.",
      );
    });

    it("rejects zero height", () => {
      expect(() =>
        calculateGravitationalPotentialEnergy({
          mass: 10,
          gravity: 9.8,
          height: 0,
          solveFor: "potentialEnergy",
        }),
      ).toThrow(
        "Height must be greater than zero.",
      );
    });

    it("rejects non-positive energy when calculating mass", () => {
      expect(() =>
        calculateGravitationalPotentialEnergy({
          potentialEnergy: 0,
          gravity: 9.8,
          height: 5,
          solveFor: "mass",
        }),
      ).toThrow(
        "Potential energy must be greater than zero when calculating mass.",
      );
    });

    it("rejects non-positive energy when calculating height", () => {
      expect(() =>
        calculateGravitationalPotentialEnergy({
          potentialEnergy: -100,
          mass: 10,
          gravity: 9.8,
          solveFor: "height",
        }),
      ).toThrow(
        "Potential energy must be greater than zero when calculating height.",
      );
    });

    it("rejects non-finite values", () => {
      expect(() =>
        calculateGravitationalPotentialEnergy({
          mass: Number.POSITIVE_INFINITY,
          gravity: 9.8,
          height: 5,
          solveFor: "potentialEnergy",
        }),
      ).toThrow(
        "Mass must be a finite number.",
      );
    });
  },
);
