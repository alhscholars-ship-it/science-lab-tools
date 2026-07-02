import { describe, expect, it } from "vitest";

import { calculateSpecificHeat } from "../specific-heat";

describe("calculateSpecificHeat", () => {
  it("calculates heat energy", () => {
    const result = calculateSpecificHeat({
      mass: 100,
      specificHeatCapacity: 4.18,
      temperatureChange: 10,
      solveFor: "heatEnergy",
    });

    expect(result.value).toBeCloseTo(4180, 10);
    expect(result.formattedValue).toBe("4,180");
    expect(result.details.heatEnergy).toBeCloseTo(4180, 10);
  });

  it("calculates mass", () => {
    const result = calculateSpecificHeat({
      heatEnergy: 4180,
      specificHeatCapacity: 4.18,
      temperatureChange: 10,
      solveFor: "mass",
    });

    expect(result.value).toBeCloseTo(100, 10);
    expect(result.details.mass).toBeCloseTo(100, 10);
  });

  it("calculates specific heat capacity", () => {
    const result = calculateSpecificHeat({
      heatEnergy: 4180,
      mass: 100,
      temperatureChange: 10,
      solveFor: "specificHeatCapacity",
    });

    expect(result.value).toBeCloseTo(4.18, 10);
    expect(result.formattedValue).toBe("4.18");
  });

  it("calculates temperature change", () => {
    const result = calculateSpecificHeat({
      heatEnergy: 4180,
      mass: 100,
      specificHeatCapacity: 4.18,
      solveFor: "temperatureChange",
    });

    expect(result.value).toBeCloseTo(10, 10);
  });

  it("supports cooling with negative heat and temperature change", () => {
    const result = calculateSpecificHeat({
      mass: 100,
      specificHeatCapacity: 4.18,
      temperatureChange: -10,
      solveFor: "heatEnergy",
    });

    expect(result.value).toBeCloseTo(-4180, 10);
  });

  it("calculates a negative temperature change from negative heat", () => {
    const result = calculateSpecificHeat({
      heatEnergy: -4180,
      mass: 100,
      specificHeatCapacity: 4.18,
      solveFor: "temperatureChange",
    });

    expect(result.value).toBeCloseTo(-10, 10);
  });

  it("rejects zero mass", () => {
    expect(() =>
      calculateSpecificHeat({
        mass: 0,
        specificHeatCapacity: 4.18,
        temperatureChange: 10,
        solveFor: "heatEnergy",
      }),
    ).toThrow("Mass must be greater than zero.");
  });

  it("rejects negative specific heat capacity", () => {
    expect(() =>
      calculateSpecificHeat({
        mass: 100,
        specificHeatCapacity: -4.18,
        temperatureChange: 10,
        solveFor: "heatEnergy",
      }),
    ).toThrow("Specific heat capacity must be greater than zero.");
  });

  it("rejects zero temperature change when solving for mass", () => {
    expect(() =>
      calculateSpecificHeat({
        heatEnergy: 4180,
        specificHeatCapacity: 4.18,
        temperatureChange: 0,
        solveFor: "mass",
      }),
    ).toThrow("Temperature change cannot be zero.");
  });

  it("rejects mismatched heat and temperature signs", () => {
    expect(() =>
      calculateSpecificHeat({
        heatEnergy: -4180,
        specificHeatCapacity: 4.18,
        temperatureChange: 10,
        solveFor: "mass",
      }),
    ).toThrow(
      "Heat energy and temperature change must have matching signs.",
    );
  });

  it("rejects a missing required value", () => {
    expect(() =>
      calculateSpecificHeat({
        mass: 100,
        temperatureChange: 10,
        solveFor: "heatEnergy",
      }),
    ).toThrow("Specific heat capacity must be a finite number.");
  });

  it("rejects non-finite heat energy", () => {
    expect(() =>
      calculateSpecificHeat({
        heatEnergy: Number.NaN,
        mass: 100,
        specificHeatCapacity: 4.18,
        solveFor: "temperatureChange",
      }),
    ).toThrow("Heat energy must be a finite number.");
  });
});
