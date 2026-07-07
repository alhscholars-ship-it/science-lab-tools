import { describe, expect, it } from "vitest";

import { calculateImpulse } from "../impulse";

describe("calculateImpulse", () => {
  it("calculates impulse", () => {
    const result = calculateImpulse({
      force: 120,
      timeInterval: 0.5,
      solveFor: "impulse",
    });

    expect(result.value).toBe(60);
    expect(result.details.impulse).toBe(60);
    expect(result.details.formula).toBe(
      "J = FΔt",
    );
  });

  it("calculates force", () => {
    const result = calculateImpulse({
      impulse: 90,
      timeInterval: 0.75,
      solveFor: "force",
    });

    expect(result.value).toBe(120);
  });

  it("calculates time interval", () => {
    const result = calculateImpulse({
      impulse: 80,
      force: 200,
      solveFor: "timeInterval",
    });

    expect(result.value).toBeCloseTo(0.4);
  });

  it("supports decimal values", () => {
    const result = calculateImpulse({
      force: 45.5,
      timeInterval: 0.24,
      solveFor: "impulse",
    });

    expect(result.value).toBeCloseTo(10.92);
  });

  it("rejects zero force", () => {
    expect(() =>
      calculateImpulse({
        force: 0,
        timeInterval: 0.5,
        solveFor: "impulse",
      }),
    ).toThrow(
      "Force must be greater than zero.",
    );
  });

  it("rejects negative force", () => {
    expect(() =>
      calculateImpulse({
        force: -120,
        timeInterval: 0.5,
        solveFor: "impulse",
      }),
    ).toThrow(
      "Force must be greater than zero.",
    );
  });

  it("rejects zero time interval", () => {
    expect(() =>
      calculateImpulse({
        force: 120,
        timeInterval: 0,
        solveFor: "impulse",
      }),
    ).toThrow(
      "Time interval must be greater than zero.",
    );
  });

  it("rejects negative time interval", () => {
    expect(() =>
      calculateImpulse({
        impulse: 60,
        timeInterval: -0.5,
        solveFor: "force",
      }),
    ).toThrow(
      "Time interval must be greater than zero.",
    );
  });

  it("rejects zero impulse", () => {
    expect(() =>
      calculateImpulse({
        impulse: 0,
        force: 120,
        solveFor: "timeInterval",
      }),
    ).toThrow(
      "Impulse must be greater than zero.",
    );
  });

  it("rejects negative impulse", () => {
    expect(() =>
      calculateImpulse({
        impulse: -60,
        timeInterval: 0.5,
        solveFor: "force",
      }),
    ).toThrow(
      "Impulse must be greater than zero.",
    );
  });

  it("rejects non-finite force", () => {
    expect(() =>
      calculateImpulse({
        force: Number.POSITIVE_INFINITY,
        timeInterval: 0.5,
        solveFor: "impulse",
      }),
    ).toThrow(
      "Force must be a finite number.",
    );
  });

  it("rejects non-finite time interval", () => {
    expect(() =>
      calculateImpulse({
        force: 120,
        timeInterval: Number.NaN,
        solveFor: "impulse",
      }),
    ).toThrow(
      "Time interval must be a finite number.",
    );
  });
});
