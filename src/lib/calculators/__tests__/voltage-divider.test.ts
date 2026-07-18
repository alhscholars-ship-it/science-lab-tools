import { describe, expect, it } from "vitest";

import {
  calculateVoltageDivider,
  type VoltageDividerVariable,
} from "../voltage-divider";

function expectCompleteDivider(
  result: ReturnType<
    typeof calculateVoltageDivider
  >,
) {
  expect(
    result.details.inputVoltage,
  ).toBeCloseTo(12);

  expect(
    result.details.outputVoltage,
  ).toBeCloseTo(4);

  expect(
    result.details.upperResistance,
  ).toBeCloseTo(2000);

  expect(
    result.details.lowerResistance,
  ).toBeCloseTo(1000);

  expect(
    result.details.dividerRatio,
  ).toBeCloseTo(1 / 3);

  expect(
    result.details.circuitCurrent,
  ).toBeCloseTo(0.004);

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

describe("calculateVoltageDivider", () => {
  it("calculates output voltage", () => {
    const result = calculateVoltageDivider({
      inputVoltage: 12,
      upperResistance: 2000,
      lowerResistance: 1000,
      solveFor: "outputVoltage",
    });

    expect(result.value).toBeCloseTo(4);
    expect(result.details.formula).toBe(
      "Vout = Vin × R2 ÷ (R1 + R2)",
    );

    expectCompleteDivider(result);
  });

  it("calculates input voltage", () => {
    const result = calculateVoltageDivider({
      outputVoltage: 4,
      upperResistance: 2000,
      lowerResistance: 1000,
      solveFor: "inputVoltage",
    });

    expect(result.value).toBeCloseTo(12);
    expect(result.details.formula).toBe(
      "Vin = Vout × (R1 + R2) ÷ R2",
    );

    expectCompleteDivider(result);
  });

  it("calculates upper resistance", () => {
    const result = calculateVoltageDivider({
      outputVoltage: 4,
      inputVoltage: 12,
      lowerResistance: 1000,
      solveFor: "upperResistance",
    });

    expect(result.value).toBeCloseTo(2000);
    expect(result.details.formula).toBe(
      "R1 = R2 × (Vin − Vout) ÷ Vout",
    );

    expectCompleteDivider(result);
  });

  it("calculates lower resistance", () => {
    const result = calculateVoltageDivider({
      outputVoltage: 4,
      inputVoltage: 12,
      upperResistance: 2000,
      solveFor: "lowerResistance",
    });

    expect(result.value).toBeCloseTo(1000);
    expect(result.details.formula).toBe(
      "R2 = Vout × R1 ÷ (Vin − Vout)",
    );

    expectCompleteDivider(result);
  });

  it("calculates an equal-resistor divider", () => {
    const result = calculateVoltageDivider({
      inputVoltage: 10,
      upperResistance: 1000,
      lowerResistance: 1000,
      solveFor: "outputVoltage",
    });

    expect(result.value).toBeCloseTo(5);
    expect(
      result.details.dividerRatio,
    ).toBeCloseTo(0.5);
  });

  it("supports decimal electrical values", () => {
    const result = calculateVoltageDivider({
      inputVoltage: 5.5,
      upperResistance: 2200,
      lowerResistance: 3300,
      solveFor: "outputVoltage",
    });

    expect(result.value).toBeCloseTo(3.3);
  });

  it("rejects a missing required value", () => {
    expect(() =>
      calculateVoltageDivider({
        inputVoltage: 12,
        upperResistance: 2000,
        solveFor: "outputVoltage",
      }),
    ).toThrow(
      "Lower resistance must be greater than zero.",
    );
  });

  it("rejects zero resistance", () => {
    expect(() =>
      calculateVoltageDivider({
        inputVoltage: 12,
        upperResistance: 0,
        lowerResistance: 1000,
        solveFor: "outputVoltage",
      }),
    ).toThrow(
      "Upper resistance must be greater than zero.",
    );
  });

  it("rejects negative voltage", () => {
    expect(() =>
      calculateVoltageDivider({
        inputVoltage: -12,
        upperResistance: 2000,
        lowerResistance: 1000,
        solveFor: "outputVoltage",
      }),
    ).toThrow(
      "Input voltage must be greater than zero.",
    );
  });

  it("rejects output voltage equal to input voltage", () => {
    expect(() =>
      calculateVoltageDivider({
        outputVoltage: 12,
        inputVoltage: 12,
        lowerResistance: 1000,
        solveFor: "upperResistance",
      }),
    ).toThrow(
      "Output voltage must be less than input voltage",
    );
  });

  it("rejects output voltage above input voltage", () => {
    expect(() =>
      calculateVoltageDivider({
        outputVoltage: 15,
        inputVoltage: 12,
        upperResistance: 1000,
        solveFor: "lowerResistance",
      }),
    ).toThrow(
      "Output voltage must be less than input voltage",
    );
  });

  it("rejects an unsupported solve variable", () => {
    expect(() =>
      calculateVoltageDivider({
        inputVoltage: 12,
        upperResistance: 2000,
        lowerResistance: 1000,
        solveFor:
          "unknown" as VoltageDividerVariable,
      }),
    ).toThrow(
      "Unsupported voltage divider variable",
    );
  });
});
