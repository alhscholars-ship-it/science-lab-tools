import { describe, expect, it } from "vitest";

import { calculatePower } from "../power";

describe("calculatePower", () => {
  it("calculates power", () => {
    const result = calculatePower({
      work: 600,
      time: 12,
      solveFor: "power",
    });

    expect(result.value).toBe(50);
    expect(result.details.power).toBe(50);
    expect(result.details.formula).toBe(
      "P = W ÷ t",
    );
  });

  it("calculates negative power", () => {
    const result = calculatePower({
      work: -240,
      time: 8,
      solveFor: "power",
    });

    expect(result.value).toBe(-30);
  });

  it("calculates zero power", () => {
    const result = calculatePower({
      work: 0,
      time: 5,
      solveFor: "power",
    });

    expect(result.value).toBe(0);
  });

  it("calculates work", () => {
    const result = calculatePower({
      power: 75,
      time: 4,
      solveFor: "work",
    });

    expect(result.value).toBe(300);
    expect(result.details.work).toBe(300);
  });

  it("calculates negative work", () => {
    const result = calculatePower({
      power: -25,
      time: 6,
      solveFor: "work",
    });

    expect(result.value).toBe(-150);
  });

  it("calculates time", () => {
    const result = calculatePower({
      work: 900,
      power: 150,
      solveFor: "time",
    });

    expect(result.value).toBe(6);
    expect(result.details.time).toBe(6);
  });

  it("calculates time from negative work and power", () => {
    const result = calculatePower({
      work: -360,
      power: -60,
      solveFor: "time",
    });

    expect(result.value).toBe(6);
  });

  it("rejects zero time", () => {
    expect(() =>
      calculatePower({
        work: 100,
        time: 0,
        solveFor: "power",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects negative time", () => {
    expect(() =>
      calculatePower({
        work: 100,
        time: -5,
        solveFor: "power",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects zero power when calculating time", () => {
    expect(() =>
      calculatePower({
        work: 100,
        power: 0,
        solveFor: "time",
      }),
    ).toThrow(
      "Power must not be zero when calculating time.",
    );
  });

  it("rejects mismatched signs when calculating time", () => {
    expect(() =>
      calculatePower({
        work: -100,
        power: 20,
        solveFor: "time",
      }),
    ).toThrow(
      "Work and power must have matching signs when calculating time.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculatePower({
        work: Number.POSITIVE_INFINITY,
        time: 5,
        solveFor: "power",
      }),
    ).toThrow(
      "Work must be a finite number.",
    );
  });
});
