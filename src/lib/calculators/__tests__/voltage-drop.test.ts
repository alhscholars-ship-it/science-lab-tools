import { describe, expect, it } from "vitest";

import {
  calculateVoltageDrop,
  type VoltageDropVariable,
} from "../voltage-drop";

const copperResistivity = 1.724e-8;

function expectCompleteCircuit(
  result: ReturnType<typeof calculateVoltageDrop>,
) {
  expect(result.details.current).toBeCloseTo(10);
  expect(
    result.details.oneWayLength,
  ).toBeCloseTo(20);
  expect(
    result.details.crossSectionalArea,
  ).toBeCloseTo(2.5);
  expect(
    result.details.resistivity,
  ).toBeCloseTo(copperResistivity);
  expect(
    result.details.voltageDrop,
  ).toBeCloseTo(2.7584);
  expect(
    result.details.loopResistance,
  ).toBeCloseTo(0.27584);
  expect(
    result.details.powerLoss,
  ).toBeCloseTo(27.584);
  expect(
    result.formattedValue.length,
  ).toBeGreaterThan(0);
  expect(
    result.details.formula.length,
  ).toBeGreaterThan(0);
  expect(
    result.details.substitution.length,
  ).toBeGreaterThan(0);
}

describe("calculateVoltageDrop", () => {
  it("calculates voltage drop", () => {
    const result = calculateVoltageDrop({
      current: 10,
      oneWayLength: 20,
      crossSectionalArea: 2.5,
      resistivity: copperResistivity,
      solveFor: "voltageDrop",
    });

    expect(result.value).toBeCloseTo(2.7584);
    expect(result.details.formula).toBe(
      "Vdrop = 2 × I × ρ × L ÷ A",
    );

    expectCompleteCircuit(result);
  });

  it("calculates current", () => {
    const result = calculateVoltageDrop({
      voltageDrop: 2.7584,
      oneWayLength: 20,
      crossSectionalArea: 2.5,
      resistivity: copperResistivity,
      solveFor: "current",
    });

    expect(result.value).toBeCloseTo(10);
    expect(result.details.formula).toBe(
      "I = Vdrop × A ÷ (2 × ρ × L)",
    );

    expectCompleteCircuit(result);
  });

  it("calculates one-way conductor length", () => {
    const result = calculateVoltageDrop({
      voltageDrop: 2.7584,
      current: 10,
      crossSectionalArea: 2.5,
      resistivity: copperResistivity,
      solveFor: "oneWayLength",
    });

    expect(result.value).toBeCloseTo(20);
    expect(result.details.formula).toBe(
      "L = Vdrop × A ÷ (2 × I × ρ)",
    );

    expectCompleteCircuit(result);
  });

  it("calculates cross-sectional area", () => {
    const result = calculateVoltageDrop({
      voltageDrop: 2.7584,
      current: 10,
      oneWayLength: 20,
      resistivity: copperResistivity,
      solveFor: "crossSectionalArea",
    });

    expect(result.value).toBeCloseTo(2.5);
    expect(result.details.formula).toBe(
      "A = 2 × I × ρ × L ÷ Vdrop",
    );

    expectCompleteCircuit(result);
  });

  it("calculates conductor resistivity", () => {
    const result = calculateVoltageDrop({
      voltageDrop: 2.7584,
      current: 10,
      oneWayLength: 20,
      crossSectionalArea: 2.5,
      solveFor: "resistivity",
    });

    expect(result.value).toBeCloseTo(
      copperResistivity,
    );

    expect(result.details.formula).toBe(
      "ρ = Vdrop × A ÷ (2 × I × L)",
    );

    expectCompleteCircuit(result);
  });

  it("calculates a short low-current circuit", () => {
    const result = calculateVoltageDrop({
      current: 2,
      oneWayLength: 5,
      crossSectionalArea: 1.5,
      resistivity: copperResistivity,
      solveFor: "voltageDrop",
    });

    expect(result.value).toBeCloseTo(
      0.2298666667,
    );
  });

  it("supports aluminium conductor resistivity", () => {
    const result = calculateVoltageDrop({
      current: 10,
      oneWayLength: 20,
      crossSectionalArea: 2.5,
      resistivity: 2.82e-8,
      solveFor: "voltageDrop",
    });

    expect(result.value).toBeCloseTo(4.512);
  });

  it("rejects a missing required value", () => {
    expect(() =>
      calculateVoltageDrop({
        current: 10,
        oneWayLength: 20,
        resistivity: copperResistivity,
        solveFor: "voltageDrop",
      }),
    ).toThrow(
      "Cross-sectional area must be greater than zero.",
    );
  });

  it("rejects zero current", () => {
    expect(() =>
      calculateVoltageDrop({
        current: 0,
        oneWayLength: 20,
        crossSectionalArea: 2.5,
        resistivity: copperResistivity,
        solveFor: "voltageDrop",
      }),
    ).toThrow(
      "Current must be greater than zero.",
    );
  });

  it("rejects negative length", () => {
    expect(() =>
      calculateVoltageDrop({
        current: 10,
        oneWayLength: -20,
        crossSectionalArea: 2.5,
        resistivity: copperResistivity,
        solveFor: "voltageDrop",
      }),
    ).toThrow(
      "One-way conductor length must be greater than zero.",
    );
  });

  it("rejects zero cross-sectional area", () => {
    expect(() =>
      calculateVoltageDrop({
        current: 10,
        oneWayLength: 20,
        crossSectionalArea: 0,
        resistivity: copperResistivity,
        solveFor: "voltageDrop",
      }),
    ).toThrow(
      "Cross-sectional area must be greater than zero.",
    );
  });

  it("rejects non-finite resistivity", () => {
    expect(() =>
      calculateVoltageDrop({
        current: 10,
        oneWayLength: 20,
        crossSectionalArea: 2.5,
        resistivity: Number.POSITIVE_INFINITY,
        solveFor: "voltageDrop",
      }),
    ).toThrow(
      "Conductor resistivity must be greater than zero.",
    );
  });

  it("rejects an unsupported solve variable", () => {
    expect(() =>
      calculateVoltageDrop({
        current: 10,
        oneWayLength: 20,
        crossSectionalArea: 2.5,
        resistivity: copperResistivity,
        solveFor:
          "unknown" as VoltageDropVariable,
      }),
    ).toThrow(
      "Unsupported voltage drop variable",
    );
  });
});
