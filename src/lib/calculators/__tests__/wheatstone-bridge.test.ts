import { describe, expect, it } from "vitest";

import {
  calculateWheatstoneBridge,
  type WheatstoneBridgeMode,
} from "../wheatstone-bridge";

describe("calculateWheatstoneBridge", () => {
  it("calculates the unknown resistance for a balanced bridge", () => {
    const result = calculateWheatstoneBridge({
      mode: "unknownResistance",
      resistanceOne: 100,
      resistanceTwo: 200,
      resistanceThree: 300,
    });

    expect(result.value).toBeCloseTo(600);
    expect(
      result.details.unknownResistance,
    ).toBeCloseTo(600);

    expect(result.details.isBalanced).toBe(true);

    expect(result.details.formula).toBe(
      "Rx = (R2 × R3) ÷ R1",
    );
  });

  it("calculates zero output voltage for a balanced bridge", () => {
    const result = calculateWheatstoneBridge({
      mode: "outputVoltage",
      supplyVoltage: 10,
      resistanceOne: 100,
      resistanceTwo: 200,
      resistanceThree: 300,
      unknownResistance: 600,
    });

    expect(result.value).toBeCloseTo(0);
    expect(
      result.details.leftDividerVoltage,
    ).toBeCloseTo(10 * (200 / 300));

    expect(
      result.details.rightDividerVoltage,
    ).toBeCloseTo(10 * (600 / 900));

    expect(result.details.isBalanced).toBe(true);
  });

  it("calculates positive output voltage for an unbalanced bridge", () => {
    const result = calculateWheatstoneBridge({
      mode: "outputVoltage",
      supplyVoltage: 12,
      resistanceOne: 100,
      resistanceTwo: 300,
      resistanceThree: 200,
      unknownResistance: 300,
    });

    expect(result.value).toBeCloseTo(1.8);
    expect(result.details.outputVoltage).toBeCloseTo(1.8);
    expect(result.details.isBalanced).toBe(false);
  });

  it("calculates negative output voltage when the right divider voltage is higher", () => {
    const result = calculateWheatstoneBridge({
      mode: "outputVoltage",
      supplyVoltage: 10,
      resistanceOne: 300,
      resistanceTwo: 100,
      resistanceThree: 100,
      unknownResistance: 300,
    });

    expect(result.value).toBeCloseTo(-5);
    expect(result.details.isBalanced).toBe(false);
  });

  it("reports a balanced bridge", () => {
    const result = calculateWheatstoneBridge({
      mode: "balanceCheck",
      resistanceOne: 100,
      resistanceTwo: 200,
      resistanceThree: 300,
      unknownResistance: 600,
    });

    expect(result.value).toBe(1);
    expect(result.formattedValue).toBe("Balanced");
    expect(result.details.isBalanced).toBe(true);
    expect(result.details.balanceDifference).toBeCloseTo(0);
  });

  it("reports an unbalanced bridge", () => {
    const result = calculateWheatstoneBridge({
      mode: "balanceCheck",
      resistanceOne: 100,
      resistanceTwo: 200,
      resistanceThree: 300,
      unknownResistance: 500,
    });

    expect(result.value).toBe(0);
    expect(result.formattedValue).toBe("Unbalanced");
    expect(result.details.isBalanced).toBe(false);
  });

  it("supports decimal resistance values", () => {
    const result = calculateWheatstoneBridge({
      mode: "unknownResistance",
      resistanceOne: 2.2,
      resistanceTwo: 4.7,
      resistanceThree: 10,
    });

    expect(result.value).toBeCloseTo(
      (4.7 * 10) / 2.2,
    );
  });

  it("rejects zero resistance", () => {
    expect(() =>
      calculateWheatstoneBridge({
        mode: "unknownResistance",
        resistanceOne: 0,
        resistanceTwo: 200,
        resistanceThree: 300,
      }),
    ).toThrow(
      "Resistance R1 must be greater than zero.",
    );
  });

  it("rejects negative resistance", () => {
    expect(() =>
      calculateWheatstoneBridge({
        mode: "balanceCheck",
        resistanceOne: 100,
        resistanceTwo: -200,
        resistanceThree: 300,
        unknownResistance: 600,
      }),
    ).toThrow(
      "Resistance R2 must be greater than zero.",
    );
  });

  it("rejects missing supply voltage in output-voltage mode", () => {
    expect(() =>
      calculateWheatstoneBridge({
        mode: "outputVoltage",
        resistanceOne: 100,
        resistanceTwo: 200,
        resistanceThree: 300,
        unknownResistance: 600,
      }),
    ).toThrow(
      "Supply voltage must be greater than zero.",
    );
  });

  it("rejects missing unknown resistance where required", () => {
    expect(() =>
      calculateWheatstoneBridge({
        mode: "balanceCheck",
        resistanceOne: 100,
        resistanceTwo: 200,
        resistanceThree: 300,
      }),
    ).toThrow(
      "Unknown resistance Rx must be greater than zero.",
    );
  });

  it("rejects an unsupported calculation mode", () => {
    expect(() =>
      calculateWheatstoneBridge({
        mode: "unknown" as WheatstoneBridgeMode,
        resistanceOne: 100,
        resistanceTwo: 200,
        resistanceThree: 300,
      }),
    ).toThrow(
      "Unsupported Wheatstone bridge mode",
    );
  });
});
