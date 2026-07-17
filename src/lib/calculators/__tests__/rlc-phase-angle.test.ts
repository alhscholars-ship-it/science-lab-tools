import { describe, expect, it } from "vitest";

import {
  calculateRlcPhaseAngle,
  type RlcPhaseAngleVariable,
} from "../rlc-phase-angle";

describe("calculateRlcPhaseAngle", () => {
  it("calculates a positive phase angle for an inductive circuit", () => {
    const result = calculateRlcPhaseAngle({
      resistance: 30,
      inductiveReactance: 50,
      capacitiveReactance: 10,
      solveFor: "phaseAngle",
    });

    expect(result.value).toBeCloseTo(
      53.13010235415598,
      12,
    );
    expect(result.details.circuitBehavior).toBe(
      "inductive",
    );
    expect(
      result.details.currentRelationship,
    ).toBe("Current lags voltage.");
  });

  it("calculates a negative phase angle for a capacitive circuit", () => {
    const result = calculateRlcPhaseAngle({
      resistance: 12,
      inductiveReactance: 8,
      capacitiveReactance: 13,
      solveFor: "phaseAngle",
    });

    expect(result.value).toBeCloseTo(
      -22.61986494804043,
      12,
    );
    expect(result.details.circuitBehavior).toBe(
      "capacitive",
    );
    expect(
      result.details.currentRelationship,
    ).toBe("Current leads voltage.");
  });

  it("returns zero phase angle at resonance", () => {
    const result = calculateRlcPhaseAngle({
      resistance: 25,
      inductiveReactance: 40,
      capacitiveReactance: 40,
      solveFor: "phaseAngle",
    });

    expect(result.value).toBe(0);
    expect(result.details.netReactance).toBe(0);
    expect(result.details.impedance).toBeCloseTo(
      25,
      12,
    );
    expect(result.details.powerFactor).toBeCloseTo(
      1,
      12,
    );
    expect(result.details.circuitBehavior).toBe(
      "resonant",
    );
  });

  it("calculates resistance from phase angle and reactances", () => {
    const result = calculateRlcPhaseAngle({
      phaseAngle: 45,
      inductiveReactance: 60,
      capacitiveReactance: 20,
      solveFor: "resistance",
    });

    expect(result.value).toBeCloseTo(40, 12);
    expect(result.details.formula).toBe(
      "R = (Xₗ − Xc) ÷ tan(φ)",
    );
  });

  it("calculates resistance for a capacitive circuit", () => {
    const result = calculateRlcPhaseAngle({
      phaseAngle: -45,
      inductiveReactance: 20,
      capacitiveReactance: 60,
      solveFor: "resistance",
    });

    expect(result.value).toBeCloseTo(40, 12);
    expect(result.details.circuitBehavior).toBe(
      "capacitive",
    );
  });

  it("calculates inductive reactance", () => {
    const result = calculateRlcPhaseAngle({
      phaseAngle: 45,
      resistance: 40,
      capacitiveReactance: 20,
      solveFor: "inductiveReactance",
    });

    expect(result.value).toBeCloseTo(60, 12);
    expect(result.details.formula).toBe(
      "Xₗ = Xc + R tan(φ)",
    );
  });

  it("calculates capacitive reactance", () => {
    const result = calculateRlcPhaseAngle({
      phaseAngle: -45,
      resistance: 40,
      inductiveReactance: 20,
      solveFor: "capacitiveReactance",
    });

    expect(result.value).toBeCloseTo(60, 12);
    expect(result.details.formula).toBe(
      "Xc = Xₗ − R tan(φ)",
    );
  });

  it("calculates impedance and power factor", () => {
    const result = calculateRlcPhaseAngle({
      resistance: 30,
      inductiveReactance: 50,
      capacitiveReactance: 10,
      solveFor: "phaseAngle",
    });

    expect(result.details.netReactance).toBeCloseTo(
      40,
      12,
    );
    expect(result.details.impedance).toBeCloseTo(
      50,
      12,
    );
    expect(result.details.powerFactor).toBeCloseTo(
      0.6,
      12,
    );
  });

  it("returns phase angle in radians", () => {
    const result = calculateRlcPhaseAngle({
      resistance: 40,
      inductiveReactance: 60,
      capacitiveReactance: 20,
      solveFor: "phaseAngle",
    });

    expect(
      result.details.phaseAngleRadians,
    ).toBeCloseTo(Math.PI / 4, 12);
  });

  it("rejects missing resistance", () => {
    expect(() =>
      calculateRlcPhaseAngle({
        inductiveReactance: 50,
        capacitiveReactance: 10,
        solveFor: "phaseAngle",
      }),
    ).toThrow(
      "Resistance must be greater than zero.",
    );
  });

  it("rejects zero inductive reactance", () => {
    expect(() =>
      calculateRlcPhaseAngle({
        resistance: 30,
        inductiveReactance: 0,
        capacitiveReactance: 10,
        solveFor: "phaseAngle",
      }),
    ).toThrow(
      "Inductive reactance must be greater than zero.",
    );
  });

  it("rejects non-finite capacitive reactance", () => {
    expect(() =>
      calculateRlcPhaseAngle({
        resistance: 30,
        inductiveReactance: 50,
        capacitiveReactance:
          Number.POSITIVE_INFINITY,
        solveFor: "phaseAngle",
      }),
    ).toThrow(
      "Capacitive reactance must be greater than zero.",
    );
  });

  it("rejects phase angles outside the valid range", () => {
    expect(() =>
      calculateRlcPhaseAngle({
        phaseAngle: 90,
        inductiveReactance: 50,
        capacitiveReactance: 10,
        solveFor: "resistance",
      }),
    ).toThrow(
      "Phase angle must be greater than -90° and less than 90°.",
    );
  });

  it("rejects solving resistance at zero phase angle", () => {
    expect(() =>
      calculateRlcPhaseAngle({
        phaseAngle: 0,
        inductiveReactance: 40,
        capacitiveReactance: 40,
        solveFor: "resistance",
      }),
    ).toThrow(
      "Resistance cannot be determined when the phase angle is zero.",
    );
  });

  it("rejects a phase angle sign that conflicts with net reactance", () => {
    expect(() =>
      calculateRlcPhaseAngle({
        phaseAngle: -45,
        inductiveReactance: 60,
        capacitiveReactance: 20,
        solveFor: "resistance",
      }),
    ).toThrow(
      "The phase angle sign must match the circuit's net reactance.",
    );
  });

  it("rejects a non-positive calculated inductive reactance", () => {
    expect(() =>
      calculateRlcPhaseAngle({
        phaseAngle: -60,
        resistance: 20,
        capacitiveReactance: 10,
        solveFor: "inductiveReactance",
      }),
    ).toThrow(
      "The supplied values produce a non-positive inductive reactance.",
    );
  });

  it("rejects a non-positive calculated capacitive reactance", () => {
    expect(() =>
      calculateRlcPhaseAngle({
        phaseAngle: 60,
        resistance: 20,
        inductiveReactance: 10,
        solveFor: "capacitiveReactance",
      }),
    ).toThrow(
      "The supplied values produce a non-positive capacitive reactance.",
    );
  });

  it("rejects unsupported variables", () => {
    expect(() =>
      calculateRlcPhaseAngle({
        resistance: 30,
        inductiveReactance: 50,
        capacitiveReactance: 10,
        solveFor:
          "unknown" as RlcPhaseAngleVariable,
      }),
    ).toThrow(
      "Unsupported RLC phase angle variable",
    );
  });

  it("returns formatted output and complete details", () => {
    const result = calculateRlcPhaseAngle({
      resistance: 30,
      inductiveReactance: 50,
      capacitiveReactance: 10,
      solveFor: "phaseAngle",
    });

    expect(
      result.formattedValue.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.substitution.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.solvedVariable,
    ).toBe("phaseAngle");

    expect(result.details).toMatchObject({
      resistance: 30,
      inductiveReactance: 50,
      capacitiveReactance: 10,
      netReactance: 40,
      impedance: 50,
      powerFactor: 0.6,
      circuitBehavior: "inductive",
    });
  });
});
