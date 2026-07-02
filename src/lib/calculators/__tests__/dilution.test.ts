import { describe, expect, it } from "vitest";

import { calculateDilution } from "../dilution";

describe("calculateDilution", () => {
  it("calculates final concentration", () => {
    const result = calculateDilution({
      initialConcentration: 2,
      initialVolume: 50,
      finalVolume: 200,
      solveFor: "finalConcentration",
    });

    expect(result.value).toBe(0.5);
    expect(result.formattedValue).toBe("0.5");
    expect(result.details.finalConcentration).toBe(0.5);
  });

  it("calculates final volume", () => {
    const result = calculateDilution({
      initialConcentration: 2,
      initialVolume: 50,
      finalConcentration: 0.5,
      solveFor: "finalVolume",
    });

    expect(result.value).toBe(200);
    expect(result.details.finalVolume).toBe(200);
  });

  it("calculates initial concentration", () => {
    const result = calculateDilution({
      initialVolume: 50,
      finalConcentration: 0.5,
      finalVolume: 200,
      solveFor: "initialConcentration",
    });

    expect(result.value).toBe(2);
    expect(result.details.initialConcentration).toBe(2);
  });

  it("calculates initial volume", () => {
    const result = calculateDilution({
      initialConcentration: 2,
      finalConcentration: 0.5,
      finalVolume: 200,
      solveFor: "initialVolume",
    });

    expect(result.value).toBe(50);
    expect(result.details.initialVolume).toBe(50);
  });

  it("supports decimal values", () => {
    const result = calculateDilution({
      initialConcentration: 1.25,
      initialVolume: 40,
      finalVolume: 250,
      solveFor: "finalConcentration",
    });

    expect(result.value).toBeCloseTo(0.2, 10);
  });

  it("rejects a missing required value", () => {
    expect(() =>
      calculateDilution({
        initialConcentration: 2,
        initialVolume: 50,
        solveFor: "finalConcentration",
      }),
    ).toThrow("Final volume must be a finite number.");
  });

  it("rejects zero values", () => {
    expect(() =>
      calculateDilution({
        initialConcentration: 2,
        initialVolume: 0,
        finalVolume: 200,
        solveFor: "finalConcentration",
      }),
    ).toThrow("Initial volume must be greater than zero.");
  });

  it("rejects negative values", () => {
    expect(() =>
      calculateDilution({
        initialConcentration: -2,
        initialVolume: 50,
        finalVolume: 200,
        solveFor: "finalConcentration",
      }),
    ).toThrow("Initial concentration must be greater than zero.");
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateDilution({
        initialConcentration: Number.NaN,
        initialVolume: 50,
        finalVolume: 200,
        solveFor: "finalConcentration",
      }),
    ).toThrow("Initial concentration must be a finite number.");
  });
});
