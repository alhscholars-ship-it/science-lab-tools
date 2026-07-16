import { describe, expect, it } from "vitest";

import {
  calculateRcTimeConstant,
  type RcTimeConstantVariable,
} from "../rc-time-constant";

describe("calculateRcTimeConstant", () => {
  it("calculates time constant", () => {
    const result = calculateRcTimeConstant({
      mode: "timeConstant",
      resistance: 10000,
      capacitance: 0.0001,
      solveFor: "timeConstant",
    });

    expect(result.value).toBeCloseTo(1);
    expect(result.details.formula).toBe(
      "τ = RC",
    );
  });

  it("calculates resistance", () => {
    const result = calculateRcTimeConstant({
      mode: "timeConstant",
      timeConstant: 1,
      capacitance: 0.0001,
      solveFor: "resistance",
    });

    expect(result.value).toBeCloseTo(
      10000,
    );
  });

  it("calculates capacitance", () => {
    const result = calculateRcTimeConstant({
      mode: "timeConstant",
      timeConstant: 1,
      resistance: 10000,
      solveFor: "capacitance",
    });

    expect(result.value).toBeCloseTo(
      0.0001,
      12,
    );
  });

  it("calculates charging voltage after one time constant", () => {
    const result = calculateRcTimeConstant({
      mode: "chargingVoltage",
      timeConstant: 1,
      sourceVoltage: 10,
      time: 1,
      solveFor: "voltage",
    });

    expect(result.value).toBeCloseTo(
      10 * (1 - Math.exp(-1)),
      12,
    );
  });

  it("calculates charging time", () => {
    const voltage =
      10 * (1 - Math.exp(-1));

    const result = calculateRcTimeConstant({
      mode: "chargingVoltage",
      timeConstant: 1,
      sourceVoltage: 10,
      voltage,
      solveFor: "time",
    });

    expect(result.value).toBeCloseTo(
      1,
      12,
    );
  });

  it("calculates source voltage while charging", () => {
    const voltage =
      10 * (1 - Math.exp(-1));

    const result = calculateRcTimeConstant({
      mode: "chargingVoltage",
      timeConstant: 1,
      voltage,
      time: 1,
      solveFor: "sourceVoltage",
    });

    expect(result.value).toBeCloseTo(
      10,
      12,
    );
  });

  it("calculates discharging voltage after one time constant", () => {
    const result = calculateRcTimeConstant({
      mode: "dischargingVoltage",
      timeConstant: 1,
      initialVoltage: 10,
      time: 1,
      solveFor: "voltage",
    });

    expect(result.value).toBeCloseTo(
      10 * Math.exp(-1),
      12,
    );
  });

  it("calculates discharging time", () => {
    const voltage =
      10 * Math.exp(-1);

    const result = calculateRcTimeConstant({
      mode: "dischargingVoltage",
      timeConstant: 1,
      initialVoltage: 10,
      voltage,
      solveFor: "time",
    });

    expect(result.value).toBeCloseTo(
      1,
      12,
    );
  });

  it("calculates initial discharging voltage", () => {
    const voltage =
      10 * Math.exp(-1);

    const result = calculateRcTimeConstant({
      mode: "dischargingVoltage",
      timeConstant: 1,
      voltage,
      time: 1,
      solveFor: "initialVoltage",
    });

    expect(result.value).toBeCloseTo(
      10,
      12,
    );
  });

  it("rejects zero resistance", () => {
    expect(() =>
      calculateRcTimeConstant({
        mode: "timeConstant",
        resistance: 0,
        capacitance: 0.0001,
        solveFor: "timeConstant",
      }),
    ).toThrow(
      "Resistance must be greater than zero.",
    );
  });

  it("rejects charging voltage equal to source voltage", () => {
    expect(() =>
      calculateRcTimeConstant({
        mode: "chargingVoltage",
        timeConstant: 1,
        voltage: 10,
        sourceVoltage: 10,
        solveFor: "time",
      }),
    ).toThrow(
      "Charging voltage must be less than source voltage.",
    );
  });

  it("rejects discharging voltage above initial voltage", () => {
    expect(() =>
      calculateRcTimeConstant({
        mode: "dischargingVoltage",
        timeConstant: 1,
        voltage: 12,
        initialVoltage: 10,
        solveFor: "time",
      }),
    ).toThrow(
      "Discharging voltage must be less than initial voltage.",
    );
  });

  it("rejects unsupported time-constant variables", () => {
    expect(() =>
      calculateRcTimeConstant({
        mode: "timeConstant",
        resistance: 1000,
        capacitance: 0.001,
        solveFor:
          "voltage" as RcTimeConstantVariable,
      }),
    ).toThrow(
      "The selected variable is not supported in time-constant mode.",
    );
  });

  it("returns formatted output and details", () => {
    const result = calculateRcTimeConstant({
      mode: "timeConstant",
      resistance: 10000,
      capacitance: 0.0001,
      solveFor: "timeConstant",
    });

    expect(
      result.formattedValue.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.substitution.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.solvedVariable,
    ).toBe("timeConstant");
  });
});
