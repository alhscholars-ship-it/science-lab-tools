import { describe, expect, it } from "vitest";

import {
  calculateOhmsLaw,
  type OhmsLawVariable,
} from "../ohms-law";

function expectCompleteCircuit(
  result: ReturnType<typeof calculateOhmsLaw>,
) {
  expect(result.details.voltage).toBeCloseTo(12);
  expect(result.details.current).toBeCloseTo(2);
  expect(result.details.resistance).toBeCloseTo(6);
  expect(result.details.power).toBeCloseTo(24);
  expect(result.formattedValue.length).toBeGreaterThan(0);
  expect(result.details.formula.length).toBeGreaterThan(0);
  expect(
    result.details.substitution.length,
  ).toBeGreaterThan(0);
}

describe("calculateOhmsLaw", () => {
  describe("voltage calculations", () => {
    it("calculates voltage from current and resistance", () => {
      const result = calculateOhmsLaw({
        current: 2,
        resistance: 6,
        solveFor: "voltage",
      });

      expect(result.value).toBeCloseTo(12);
      expect(result.details.formula).toBe(
        "V = I × R",
      );
      expectCompleteCircuit(result);
    });

    it("calculates voltage from power and current", () => {
      const result = calculateOhmsLaw({
        power: 24,
        current: 2,
        solveFor: "voltage",
      });

      expect(result.value).toBeCloseTo(12);
      expect(result.details.formula).toBe(
        "V = P ÷ I",
      );
      expectCompleteCircuit(result);
    });

    it("calculates voltage from power and resistance", () => {
      const result = calculateOhmsLaw({
        power: 24,
        resistance: 6,
        solveFor: "voltage",
      });

      expect(result.value).toBeCloseTo(12);
      expect(result.details.formula).toBe(
        "V = √(P × R)",
      );
      expectCompleteCircuit(result);
    });
  });

  describe("current calculations", () => {
    it("calculates current from voltage and resistance", () => {
      const result = calculateOhmsLaw({
        voltage: 12,
        resistance: 6,
        solveFor: "current",
      });

      expect(result.value).toBeCloseTo(2);
      expect(result.details.formula).toBe(
        "I = V ÷ R",
      );
      expectCompleteCircuit(result);
    });

    it("calculates current from power and voltage", () => {
      const result = calculateOhmsLaw({
        power: 24,
        voltage: 12,
        solveFor: "current",
      });

      expect(result.value).toBeCloseTo(2);
      expect(result.details.formula).toBe(
        "I = P ÷ V",
      );
      expectCompleteCircuit(result);
    });

    it("calculates current from power and resistance", () => {
      const result = calculateOhmsLaw({
        power: 24,
        resistance: 6,
        solveFor: "current",
      });

      expect(result.value).toBeCloseTo(2);
      expect(result.details.formula).toBe(
        "I = √(P ÷ R)",
      );
      expectCompleteCircuit(result);
    });
  });

  describe("resistance calculations", () => {
    it("calculates resistance from voltage and current", () => {
      const result = calculateOhmsLaw({
        voltage: 12,
        current: 2,
        solveFor: "resistance",
      });

      expect(result.value).toBeCloseTo(6);
      expect(result.details.formula).toBe(
        "R = V ÷ I",
      );
      expectCompleteCircuit(result);
    });

    it("calculates resistance from voltage and power", () => {
      const result = calculateOhmsLaw({
        voltage: 12,
        power: 24,
        solveFor: "resistance",
      });

      expect(result.value).toBeCloseTo(6);
      expect(result.details.formula).toBe(
        "R = V² ÷ P",
      );
      expectCompleteCircuit(result);
    });

    it("calculates resistance from power and current", () => {
      const result = calculateOhmsLaw({
        power: 24,
        current: 2,
        solveFor: "resistance",
      });

      expect(result.value).toBeCloseTo(6);
      expect(result.details.formula).toBe(
        "R = P ÷ I²",
      );
      expectCompleteCircuit(result);
    });
  });

  describe("power calculations", () => {
    it("calculates power from voltage and current", () => {
      const result = calculateOhmsLaw({
        voltage: 12,
        current: 2,
        solveFor: "power",
      });

      expect(result.value).toBeCloseTo(24);
      expect(result.details.formula).toBe(
        "P = V × I",
      );
      expectCompleteCircuit(result);
    });

    it("calculates power from current and resistance", () => {
      const result = calculateOhmsLaw({
        current: 2,
        resistance: 6,
        solveFor: "power",
      });

      expect(result.value).toBeCloseTo(24);
      expect(result.details.formula).toBe(
        "P = I² × R",
      );
      expectCompleteCircuit(result);
    });

    it("calculates power from voltage and resistance", () => {
      const result = calculateOhmsLaw({
        voltage: 12,
        resistance: 6,
        solveFor: "power",
      });

      expect(result.value).toBeCloseTo(24);
      expect(result.details.formula).toBe(
        "P = V² ÷ R",
      );
      expectCompleteCircuit(result);
    });
  });

  describe("validation", () => {
    it("rejects an incomplete known-value pair", () => {
      expect(() =>
        calculateOhmsLaw({
          voltage: 12,
          solveFor: "current",
        }),
      ).toThrow(
        "Enter a compatible pair of known values",
      );
    });

    it("rejects zero-valued electrical inputs", () => {
      expect(() =>
        calculateOhmsLaw({
          voltage: 0,
          resistance: 6,
          solveFor: "current",
        }),
      ).toThrow(
        "Enter a compatible pair of known values",
      );
    });

    it("rejects negative electrical inputs", () => {
      expect(() =>
        calculateOhmsLaw({
          current: -2,
          resistance: 6,
          solveFor: "voltage",
        }),
      ).toThrow(
        "Enter a compatible pair of known values",
      );
    });

    it("rejects an unsupported solve variable", () => {
      expect(() =>
        calculateOhmsLaw({
          voltage: 12,
          current: 2,
          solveFor:
            "unknown" as OhmsLawVariable,
        }),
      ).toThrow(
        "Unsupported Ohm's law variable",
      );
    });
  });
});
