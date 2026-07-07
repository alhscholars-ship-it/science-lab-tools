import { describe, expect, it } from "vitest";

import { calculateAcceleration } from "../acceleration";

describe("calculateAcceleration", () => {
  it("calculates positive acceleration", () => {
    const result = calculateAcceleration({
      initialVelocity: 5,
      finalVelocity: 25,
      time: 4,
      solveFor: "acceleration",
    });

    expect(result.value).toBe(5);
    expect(
      result.details.velocityChange,
    ).toBe(20);
    expect(result.formattedValue).toBe("5");
  });

  it("calculates negative acceleration", () => {
    const result = calculateAcceleration({
      initialVelocity: 30,
      finalVelocity: 10,
      time: 5,
      solveFor: "acceleration",
    });

    expect(result.value).toBe(-4);
    expect(
      result.details.velocityChange,
    ).toBe(-20);
  });

  it("calculates initial velocity", () => {
    const result = calculateAcceleration({
      acceleration: 3,
      finalVelocity: 20,
      time: 4,
      solveFor: "initialVelocity",
    });

    expect(result.value).toBe(8);
    expect(
      result.details.initialVelocity,
    ).toBe(8);
  });

  it("calculates final velocity", () => {
    const result = calculateAcceleration({
      acceleration: 2.5,
      initialVelocity: 5,
      time: 6,
      solveFor: "finalVelocity",
    });

    expect(result.value).toBe(20);
    expect(
      result.details.finalVelocity,
    ).toBe(20);
  });

  it("calculates time", () => {
    const result = calculateAcceleration({
      acceleration: 4,
      initialVelocity: 2,
      finalVelocity: 18,
      solveFor: "time",
    });

    expect(result.value).toBe(4);
    expect(result.details.time).toBe(4);
  });

  it("supports negative velocities", () => {
    const result = calculateAcceleration({
      initialVelocity: -10,
      finalVelocity: 5,
      time: 3,
      solveFor: "acceleration",
    });

    expect(result.value).toBe(5);
  });

  it("supports zero acceleration", () => {
    const result = calculateAcceleration({
      initialVelocity: 12,
      finalVelocity: 12,
      time: 6,
      solveFor: "acceleration",
    });

    expect(result.value).toBe(0);
  });

  it("rejects zero time", () => {
    expect(() =>
      calculateAcceleration({
        initialVelocity: 5,
        finalVelocity: 10,
        time: 0,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects negative time", () => {
    expect(() =>
      calculateAcceleration({
        acceleration: 2,
        initialVelocity: 5,
        time: -3,
        solveFor: "finalVelocity",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects zero acceleration when solving time", () => {
    expect(() =>
      calculateAcceleration({
        acceleration: 0,
        initialVelocity: 5,
        finalVelocity: 10,
        solveFor: "time",
      }),
    ).toThrow(
      "Acceleration cannot be zero when calculating time.",
    );
  });

  it("rejects a non-positive calculated time", () => {
    expect(() =>
      calculateAcceleration({
        acceleration: 2,
        initialVelocity: 20,
        finalVelocity: 10,
        solveFor: "time",
      }),
    ).toThrow(
      "The velocity change and acceleration must produce a positive time.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateAcceleration({
        initialVelocity: Number.NaN,
        finalVelocity: 10,
        time: 2,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Initial velocity must be a finite number.",
    );
  });
});
