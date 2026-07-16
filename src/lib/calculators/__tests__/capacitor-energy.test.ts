import { describe, expect, it } from "vitest";

import {
  calculateCapacitorEnergy,
  type CapacitorEnergyVariable,
} from "../capacitor-energy";

const referenceCapacitance = 2e-6;
const referenceVoltage = 12;
const referenceCharge =
  referenceCapacitance *
  referenceVoltage;
const referenceEnergy =
  0.5 *
  referenceCapacitance *
  referenceVoltage ** 2;

function expectCompleteCalculation(
  result: ReturnType<
    typeof calculateCapacitorEnergy
  >,
) {
  expect(result.details.energy).toBeCloseTo(
    referenceEnergy,
    15,
  );

  expect(
    result.details.capacitance,
  ).toBeCloseTo(
    referenceCapacitance,
    15,
  );

  expect(result.details.charge).toBeCloseTo(
    referenceCharge,
    15,
  );

  expect(result.details.voltage).toBeCloseTo(
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

describe("calculateCapacitorEnergy", () => {
  it("calculates energy from capacitance and voltage", () => {
    const result =
      calculateCapacitorEnergy({
        capacitance: referenceCapacitance,
        voltage: referenceVoltage,
        solveFor: "energy",
      });

    expect(result.value).toBeCloseTo(
      referenceEnergy,
      15,
    );

    expect(result.details.formula).toBe(
      "U = ½CV²",
    );

    expectCompleteCalculation(result);
  });

  it("calculates energy from charge and voltage", () => {
    const result =
      calculateCapacitorEnergy({
        charge: referenceCharge,
        voltage: referenceVoltage,
        solveFor: "energy",
      });

    expect(result.value).toBeCloseTo(
      referenceEnergy,
      15,
    );

    expect(result.details.formula).toBe(
      "U = ½QV",
    );

    expectCompleteCalculation(result);
  });

  it("calculates energy from charge and capacitance", () => {
    const result =
      calculateCapacitorEnergy({
        charge: referenceCharge,
        capacitance: referenceCapacitance,
        solveFor: "energy",
      });

    expect(result.value).toBeCloseTo(
      referenceEnergy,
      15,
    );

    expect(result.details.formula).toBe(
      "U = Q² ÷ 2C",
    );

    expectCompleteCalculation(result);
  });

  it("calculates capacitance", () => {
    const result =
      calculateCapacitorEnergy({
        energy: referenceEnergy,
        voltage: referenceVoltage,
        solveFor: "capacitance",
      });

    expect(result.value).toBeCloseTo(
      referenceCapacitance,
      15,
    );

    expectCompleteCalculation(result);
  });

  it("calculates charge", () => {
    const result =
      calculateCapacitorEnergy({
        energy: referenceEnergy,
        capacitance: referenceCapacitance,
        solveFor: "charge",
      });

    expect(result.value).toBeCloseTo(
      referenceCharge,
      15,
    );

    expectCompleteCalculation(result);
  });

  it("calculates voltage", () => {
    const result =
      calculateCapacitorEnergy({
        energy: referenceEnergy,
        capacitance: referenceCapacitance,
        solveFor: "voltage",
      });

    expect(result.value).toBeCloseTo(
      referenceVoltage,
      12,
    );

    expectCompleteCalculation(result);
  });

  it("supports microfarad-scale capacitors", () => {
    const result =
      calculateCapacitorEnergy({
        capacitance: 470e-6,
        voltage: 9,
        solveFor: "energy",
      });

    expect(result.value).toBeCloseTo(
      0.5 * 470e-6 * 9 ** 2,
      15,
    );
  });

  it("rejects incomplete known values", () => {
    expect(() =>
      calculateCapacitorEnergy({
        voltage: 12,
        solveFor: "energy",
      }),
    ).toThrow(
      "Enter a compatible pair of known values",
    );
  });

  it("rejects zero capacitance", () => {
    expect(() =>
      calculateCapacitorEnergy({
        capacitance: 0,
        voltage: 12,
        solveFor: "energy",
      }),
    ).toThrow(
      "Enter a compatible pair of known values",
    );
  });

  it("rejects negative energy", () => {
    expect(() =>
      calculateCapacitorEnergy({
        energy: -1,
        voltage: 12,
        solveFor: "capacitance",
      }),
    ).toThrow(
      "Enter a compatible pair of known values",
    );
  });

  it("rejects unsupported variables", () => {
    expect(() =>
      calculateCapacitorEnergy({
        capacitance: 2e-6,
        voltage: 12,
        solveFor:
          "unknown" as CapacitorEnergyVariable,
      }),
    ).toThrow(
      "Unsupported capacitor energy variable",
    );
  });

  it("returns the solved variable in details", () => {
    const result =
      calculateCapacitorEnergy({
        capacitance: referenceCapacitance,
        voltage: referenceVoltage,
        solveFor: "energy",
      });

    expect(
      result.details.solvedVariable,
    ).toBe("energy");
  });
});
