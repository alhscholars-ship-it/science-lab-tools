import { describe, expect, it } from "vitest";

import {
  calculateRlTimeConstant,
  type RlTimeConstantVariable,
} from "../rl-time-constant";

describe("calculateRlTimeConstant", () => {
  it("calculates RL time constant", () => {
    const result = calculateRlTimeConstant({
      mode: "timeConstant",
      inductance: 2,
      resistance: 10,
      solveFor: "timeConstant",
    });

    expect(result.value).toBeCloseTo(
      0.2,
      12,
    );

    expect(result.details.formula).toBe(
      "τ = L ÷ R",
    );
  });

  it("calculates inductance", () => {
    const result = calculateRlTimeConstant({
      mode: "timeConstant",
      timeConstant: 0.2,
      resistance: 10,
      solveFor: "inductance",
    });

    expect(result.value).toBeCloseTo(
      2,
      12,
    );
  });

  it("calculates resistance", () => {
    const result = calculateRlTimeConstant({
      mode: "timeConstant",
      inductance: 2,
      timeConstant: 0.2,
      solveFor: "resistance",
    });

    expect(result.value).toBeCloseTo(
      10,
      12,
    );
  });

  it("calculates rising current after one time constant", () => {
    const result = calculateRlTimeConstant({
      mode: "currentRise",
      timeConstant: 1,
      maximumCurrent: 10,
      time: 1,
      solveFor: "current",
    });

    expect(result.value).toBeCloseTo(
      10 * (1 - Math.exp(-1)),
      12,
    );
  });

  it("calculates current-rise time", () => {
    const current =
      10 * (1 - Math.exp(-1));

    const result = calculateRlTimeConstant({
      mode: "currentRise",
      timeConstant: 1,
      current,
      maximumCurrent: 10,
      solveFor: "time",
    });

    expect(result.value).toBeCloseTo(
      1,
      12,
    );
  });

  it("calculates maximum current", () => {
    const current =
      10 * (1 - Math.exp(-1));

    const result = calculateRlTimeConstant({
      mode: "currentRise",
      timeConstant: 1,
      current,
      time: 1,
      solveFor: "maximumCurrent",
    });

    expect(result.value).toBeCloseTo(
      10,
      12,
    );
  });

  it("calculates decaying current after one time constant", () => {
    const result = calculateRlTimeConstant({
      mode: "currentDecay",
      timeConstant: 1,
      initialCurrent: 10,
      time: 1,
      solveFor: "current",
    });

    expect(result.value).toBeCloseTo(
      10 * Math.exp(-1),
      12,
    );
  });

  it("calculates current-decay time", () => {
    const current =
      10 * Math.exp(-1);

    const result = calculateRlTimeConstant({
      mode: "currentDecay",
      timeConstant: 1,
      current,
      initialCurrent: 10,
      solveFor: "time",
    });

    expect(result.value).toBeCloseTo(
      1,
      12,
    );
  });

  it("calculates initial current", () => {
    const current =
      10 * Math.exp(-1);

    const result = calculateRlTimeConstant({
      mode: "currentDecay",
      timeConstant: 1,
      current,
      time: 1,
      solveFor: "initialCurrent",
    });

    expect(result.value).toBeCloseTo(
      10,
      12,
    );
  });

  it("rejects zero resistance", () => {
    expect(() =>
      calculateRlTimeConstant({
        mode: "timeConstant",
        inductance: 2,
        resistance: 0,
        solveFor: "timeConstant",
      }),
    ).toThrow(
      "Resistance must be greater than zero.",
    );
  });

  it("rejects rising current equal to maximum current", () => {
    expect(() =>
      calculateRlTimeConstant({
        mode: "currentRise",
        timeConstant: 1,
        current: 10,
        maximumCurrent: 10,
        solveFor: "time",
      }),
    ).toThrow(
      "Rising current must be less than maximum current.",
    );
  });

  it("rejects decaying current above initial current", () => {
    expect(() =>
      calculateRlTimeConstant({
        mode: "currentDecay",
        timeConstant: 1,
        current: 12,
        initialCurrent: 10,
        solveFor: "time",
      }),
    ).toThrow(
      "Decaying current must be less than initial current.",
    );
  });

  it("rejects unsupported time-constant variables", () => {
    expect(() =>
      calculateRlTimeConstant({
        mode: "timeConstant",
        inductance: 2,
        resistance: 10,
        solveFor:
          "current" as RlTimeConstantVariable,
      }),
    ).toThrow(
      "The selected variable is not supported in time-constant mode.",
    );
  });

  it("rejects unsupported current-rise variables", () => {
    expect(() =>
      calculateRlTimeConstant({
        mode: "currentRise",
        timeConstant: 1,
        maximumCurrent: 10,
        time: 1,
        solveFor:
          "inductance" as RlTimeConstantVariable,
      }),
    ).toThrow(
      "The selected variable is not supported in current-rise mode.",
    );
  });

  it("returns formatted output and details", () => {
    const result = calculateRlTimeConstant({
      mode: "timeConstant",
      inductance: 2,
      resistance: 10,
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
