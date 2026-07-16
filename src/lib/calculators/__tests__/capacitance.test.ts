import { describe, expect, it } from "vitest";

import {
  calculateCapacitance,
  type CapacitanceVariable,
} from "../capacitance";

const referenceCapacitance = 2e-6;
const referenceVoltage = 12;
const referenceCharge =
  referenceCapacitance *
  referenceVoltage;

function expectCompleteCalculation(
  result: ReturnType<
    typeof calculateCapacitance
  >,
) {
  expect(
    result.details.capacitance,
  ).toBeCloseTo(
    referenceCapacitance,
    15,
  );

  expect(
    result.details.charge,
  ).toBeCloseTo(
    referenceCharge,
    15,
  );

  expect(
    result.details.voltage,
  ).toBeCloseTo(
    referenceVoltage,
    12,
  );

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

describe("calculateCapacitance", () => {
  it("calculates capacitance", () => {
    const result = calculateCapacitance({
      charge: referenceCharge,
      voltage: referenceVoltage,
      solveFor: "capacitance",
    });

    expect(result.value).toBeCloseTo(
      referenceCapacitance,
      15,
    );

    expect(result.details.formula).toBe(
      "C = Q ÷ V",
    );

    expectCompleteCalculation(result);
  });

  it("calculates electric charge", () => {
    const result = calculateCapacitance({
      capacitance: referenceCapacitance,
      voltage: referenceVoltage,
      solveFor: "charge",
    });

    expect(result.value).toBeCloseTo(
      referenceCharge,
      15,
    );

    expect(result.details.formula).toBe(
      "Q = CV",
    );

    expectCompleteCalculation(result);
  });

  it("calculates voltage", () => {
    const result = calculateCapacitance({
      capacitance: referenceCapacitance,
      charge: referenceCharge,
      solveFor: "voltage",
    });

    expect(result.value).toBeCloseTo(
      referenceVoltage,
      12,
    );

    expect(result.details.formula).toBe(
      "V = Q ÷ C",
    );

    expectCompleteCalculation(result);
  });

  it("supports nanofarad-scale values", () => {
    const capacitance = 470e-9;
    const voltage = 5;

    const result = calculateCapacitance({
      capacitance,
      voltage,
      solveFor: "charge",
    });

    expect(result.value).toBeCloseTo(
      capacitance * voltage,
      16,
    );
  });

  it("supports picofarad-scale values", () => {
    const capacitance = 100e-12;
    const voltage = 3.3;

    const result = calculateCapacitance({
      capacitance,
      voltage,
      solveFor: "charge",
    });

    expect(result.value).toBeCloseTo(
      capacitance * voltage,
      18,
    );
  });

  it("rejects missing charge", () => {
    expect(() =>
      calculateCapacitance({
        voltage: 12,
        solveFor: "capacitance",
      }),
    ).toThrow(
      "Electric charge must be greater than zero.",
    );
  });

  it("rejects zero voltage", () => {
    expect(() =>
      calculateCapacitance({
        charge: 1e-6,
        voltage: 0,
        solveFor: "capacitance",
      }),
    ).toThrow(
      "Voltage must be greater than zero.",
    );
  });

  it("rejects negative capacitance", () => {
    expect(() =>
      calculateCapacitance({
        capacitance: -1e-6,
        voltage: 12,
        solveFor: "charge",
      }),
    ).toThrow(
      "Capacitance must be greater than zero.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateCapacitance({
        capacitance:
          Number.POSITIVE_INFINITY,
        voltage: 12,
        solveFor: "charge",
      }),
    ).toThrow(
      "Capacitance must be greater than zero.",
    );
  });

  it("rejects unsupported solve variables", () => {
    expect(() =>
      calculateCapacitance({
        capacitance: 1e-6,
        voltage: 12,
        solveFor:
          "unknown" as CapacitanceVariable,
      }),
    ).toThrow(
      "Unsupported capacitance variable",
    );
  });

  it("returns the solved variable in details", () => {
    const result = calculateCapacitance({
      charge: referenceCharge,
      voltage: referenceVoltage,
      solveFor: "capacitance",
    });

    expect(
      result.details.solvedVariable,
    ).toBe("capacitance");
  });
});
