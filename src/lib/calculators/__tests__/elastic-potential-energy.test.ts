import { describe, expect, it } from "vitest";

import {
  calculateElasticPotentialEnergy,
} from "../elastic-potential-energy";

describe(
  "calculateElasticPotentialEnergy",
  () => {
    it("calculates elastic potential energy", () => {
      const result =
        calculateElasticPotentialEnergy({
          springConstant: 200,
          extension: 0.5,
          solveFor: "elasticEnergy",
        });

      expect(result.value).toBe(25);
      expect(
        result.details.elasticEnergy,
      ).toBe(25);
      expect(result.details.formula).toBe(
        "E = ½kx²",
      );
    });

    it("calculates spring constant", () => {
      const result =
        calculateElasticPotentialEnergy({
          elasticEnergy: 36,
          extension: 0.6,
          solveFor: "springConstant",
        });

      expect(result.value).toBeCloseTo(200);
    });

    it("calculates extension", () => {
      const result =
        calculateElasticPotentialEnergy({
          elasticEnergy: 40,
          springConstant: 320,
          solveFor: "extension",
        });

      expect(result.value).toBeCloseTo(0.5);
    });

    it("supports decimal values", () => {
      const result =
        calculateElasticPotentialEnergy({
          springConstant: 75.5,
          extension: 0.24,
          solveFor: "elasticEnergy",
        });

      expect(result.value).toBeCloseTo(
        2.1744,
      );
    });

    it("rejects zero spring constant", () => {
      expect(() =>
        calculateElasticPotentialEnergy({
          springConstant: 0,
          extension: 0.5,
          solveFor: "elasticEnergy",
        }),
      ).toThrow(
        "Spring constant must be greater than zero.",
      );
    });

    it("rejects negative spring constant", () => {
      expect(() =>
        calculateElasticPotentialEnergy({
          springConstant: -10,
          extension: 0.5,
          solveFor: "elasticEnergy",
        }),
      ).toThrow(
        "Spring constant must be greater than zero.",
      );
    });

    it("rejects zero extension", () => {
      expect(() =>
        calculateElasticPotentialEnergy({
          springConstant: 200,
          extension: 0,
          solveFor: "elasticEnergy",
        }),
      ).toThrow(
        "Extension must be greater than zero.",
      );
    });

    it("rejects negative extension", () => {
      expect(() =>
        calculateElasticPotentialEnergy({
          springConstant: 200,
          extension: -0.5,
          solveFor: "elasticEnergy",
        }),
      ).toThrow(
        "Extension must be greater than zero.",
      );
    });

    it("rejects zero energy when calculating spring constant", () => {
      expect(() =>
        calculateElasticPotentialEnergy({
          elasticEnergy: 0,
          extension: 0.5,
          solveFor: "springConstant",
        }),
      ).toThrow(
        "Elastic potential energy must be greater than zero when calculating another variable.",
      );
    });

    it("rejects negative energy when calculating extension", () => {
      expect(() =>
        calculateElasticPotentialEnergy({
          elasticEnergy: -20,
          springConstant: 200,
          solveFor: "extension",
        }),
      ).toThrow(
        "Elastic potential energy must be greater than zero when calculating another variable.",
      );
    });

    it("rejects non-finite spring constant", () => {
      expect(() =>
        calculateElasticPotentialEnergy({
          springConstant:
            Number.POSITIVE_INFINITY,
          extension: 0.5,
          solveFor: "elasticEnergy",
        }),
      ).toThrow(
        "Spring constant must be a finite number.",
      );
    });

    it("rejects non-finite extension", () => {
      expect(() =>
        calculateElasticPotentialEnergy({
          springConstant: 200,
          extension: Number.NaN,
          solveFor: "elasticEnergy",
        }),
      ).toThrow(
        "Extension must be a finite number.",
      );
    });
  },
);
