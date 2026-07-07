import { describe, expect, it } from "vitest";

import { calculatePressure } from "../pressure";

describe("calculatePressure", () => {
  it("calculates pressure", () => {
    const result = calculatePressure({
      force: 500,
      area: 2,
      solveFor: "pressure",
    });

    expect(result.value).toBe(250);
    expect(result.details.pressure).toBe(250);
    expect(result.details.formula).toBe(
      "P = F ÷ A",
    );
  });

  it("calculates force", () => {
    const result = calculatePressure({
      pressure: 300,
      area: 4,
      solveFor: "force",
    });

    expect(result.value).toBe(1200);
  });

  it("calculates area", () => {
    const result = calculatePressure({
      force: 900,
      pressure: 300,
      solveFor: "area",
    });

    expect(result.value).toBe(3);
  });

  it("supports decimal values", () => {
    const result = calculatePressure({
      force: 125.5,
      area: 2.5,
      solveFor: "pressure",
    });

    expect(result.value).toBeCloseTo(50.2);
  });

  it("rejects zero area", () => {
    expect(() =>
      calculatePressure({
        force: 500,
        area: 0,
        solveFor: "pressure",
      }),
    ).toThrow(
      "Area must be greater than zero.",
    );
  });

  it("rejects negative area", () => {
    expect(() =>
      calculatePressure({
        force: 500,
        area: -2,
        solveFor: "pressure",
      }),
    ).toThrow(
      "Area must be greater than zero.",
    );
  });

  it("rejects zero force", () => {
    expect(() =>
      calculatePressure({
        force: 0,
        area: 2,
        solveFor: "pressure",
      }),
    ).toThrow(
      "Force must be greater than zero.",
    );
  });

  it("rejects negative force", () => {
    expect(() =>
      calculatePressure({
        force: -500,
        pressure: 250,
        solveFor: "area",
      }),
    ).toThrow(
      "Force must be greater than zero.",
    );
  });

  it("rejects zero pressure", () => {
    expect(() =>
      calculatePressure({
        force: 500,
        pressure: 0,
        solveFor: "area",
      }),
    ).toThrow(
      "Pressure must be greater than zero.",
    );
  });

  it("rejects negative pressure", () => {
    expect(() =>
      calculatePressure({
        pressure: -250,
        area: 2,
        solveFor: "force",
      }),
    ).toThrow(
      "Pressure must be greater than zero.",
    );
  });

  it("rejects non-finite force", () => {
    expect(() =>
      calculatePressure({
        force: Number.POSITIVE_INFINITY,
        area: 2,
        solveFor: "pressure",
      }),
    ).toThrow(
      "Force must be a finite number.",
    );
  });

  it("rejects non-finite area", () => {
    expect(() =>
      calculatePressure({
        force: 500,
        area: Number.NaN,
        solveFor: "pressure",
      }),
    ).toThrow(
      "Area must be a finite number.",
    );
  });
});
