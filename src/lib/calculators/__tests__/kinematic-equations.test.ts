import { describe, expect, it } from "vitest";

import { calculateKinematicEquation } from "../kinematic-equations";

describe("calculateKinematicEquation", () => {
  it("solves final velocity with v = u + at", () => {
    const result = calculateKinematicEquation({
      equation: "velocity-time",
      solveFor: "finalVelocity",
      initialVelocity: 5,
      acceleration: 2,
      time: 4,
    });

    expect(result.value).toBe(13);
    expect(result.details.formula).toBe(
      "v = u + at",
    );
  });

  it("solves initial velocity with v = u + at", () => {
    const result = calculateKinematicEquation({
      equation: "velocity-time",
      solveFor: "initialVelocity",
      finalVelocity: 20,
      acceleration: 3,
      time: 4,
    });

    expect(result.value).toBe(8);
  });

  it("solves acceleration with v = u + at", () => {
    const result = calculateKinematicEquation({
      equation: "velocity-time",
      solveFor: "acceleration",
      initialVelocity: 2,
      finalVelocity: 18,
      time: 4,
    });

    expect(result.value).toBe(4);
  });

  it("solves time with v = u + at", () => {
    const result = calculateKinematicEquation({
      equation: "velocity-time",
      solveFor: "time",
      initialVelocity: 2,
      finalVelocity: 18,
      acceleration: 4,
    });

    expect(result.value).toBe(4);
  });

  it("solves displacement with s = ut + ½at²", () => {
    const result = calculateKinematicEquation({
      equation: "displacement-time",
      solveFor: "displacement",
      initialVelocity: 5,
      acceleration: 2,
      time: 4,
    });

    expect(result.value).toBe(36);
    expect(result.details.formula).toBe(
      "s = ut + ½at²",
    );
  });

  it("solves initial velocity with s = ut + ½at²", () => {
    const result = calculateKinematicEquation({
      equation: "displacement-time",
      solveFor: "initialVelocity",
      displacement: 36,
      acceleration: 2,
      time: 4,
    });

    expect(result.value).toBe(5);
  });

  it("solves acceleration with s = ut + ½at²", () => {
    const result = calculateKinematicEquation({
      equation: "displacement-time",
      solveFor: "acceleration",
      displacement: 36,
      initialVelocity: 5,
      time: 4,
    });

    expect(result.value).toBe(2);
  });

  it("solves positive time from the quadratic equation", () => {
    const result = calculateKinematicEquation({
      equation: "displacement-time",
      solveFor: "time",
      displacement: 36,
      initialVelocity: 5,
      acceleration: 2,
    });

    expect(result.value).toBe(4);
  });

  it("solves final velocity with v² = u² + 2as", () => {
    const result = calculateKinematicEquation({
      equation: "velocity-displacement",
      solveFor: "finalVelocity",
      initialVelocity: 5,
      acceleration: 2,
      displacement: 36,
    });

    expect(result.value).toBe(13);
    expect(result.details.formula).toBe(
      "v² = u² + 2as",
    );
  });

  it("solves initial velocity with v² = u² + 2as", () => {
    const result = calculateKinematicEquation({
      equation: "velocity-displacement",
      solveFor: "initialVelocity",
      finalVelocity: 13,
      acceleration: 2,
      displacement: 36,
    });

    expect(result.value).toBe(5);
  });

  it("solves acceleration with v² = u² + 2as", () => {
    const result = calculateKinematicEquation({
      equation: "velocity-displacement",
      solveFor: "acceleration",
      initialVelocity: 5,
      finalVelocity: 13,
      displacement: 36,
    });

    expect(result.value).toBe(2);
  });

  it("solves displacement with v² = u² + 2as", () => {
    const result = calculateKinematicEquation({
      equation: "velocity-displacement",
      solveFor: "displacement",
      initialVelocity: 5,
      finalVelocity: 13,
      acceleration: 2,
    });

    expect(result.value).toBe(36);
  });

  it("solves displacement with s = ½(u + v)t", () => {
    const result = calculateKinematicEquation({
      equation: "average-velocity",
      solveFor: "displacement",
      initialVelocity: 5,
      finalVelocity: 13,
      time: 4,
    });

    expect(result.value).toBe(36);
    expect(result.details.formula).toBe(
      "s = ½(u + v)t",
    );
  });

  it("solves final velocity with s = ½(u + v)t", () => {
    const result = calculateKinematicEquation({
      equation: "average-velocity",
      solveFor: "finalVelocity",
      displacement: 36,
      initialVelocity: 5,
      time: 4,
    });

    expect(result.value).toBe(13);
  });

  it("solves initial velocity with s = ½(u + v)t", () => {
    const result = calculateKinematicEquation({
      equation: "average-velocity",
      solveFor: "initialVelocity",
      displacement: 36,
      finalVelocity: 13,
      time: 4,
    });

    expect(result.value).toBe(5);
  });

  it("solves time with s = ½(u + v)t", () => {
    const result = calculateKinematicEquation({
      equation: "average-velocity",
      solveFor: "time",
      displacement: 36,
      initialVelocity: 5,
      finalVelocity: 13,
    });

    expect(result.value).toBe(4);
  });

  it("supports negative acceleration", () => {
    const result = calculateKinematicEquation({
      equation: "velocity-time",
      solveFor: "finalVelocity",
      initialVelocity: 20,
      acceleration: -5,
      time: 3,
    });

    expect(result.value).toBe(5);
  });

  it("rejects zero time", () => {
    expect(() =>
      calculateKinematicEquation({
        equation: "velocity-time",
        solveFor: "finalVelocity",
        initialVelocity: 5,
        acceleration: 2,
        time: 0,
      }),
    ).toThrow("Time must be greater than zero.");
  });

  it("rejects an unsupported variable for an equation", () => {
    expect(() =>
      calculateKinematicEquation({
        equation: "velocity-time",
        solveFor: "displacement",
        initialVelocity: 5,
        acceleration: 2,
        time: 3,
      }),
    ).toThrow(
      "The velocity-time equation cannot solve displacement.",
    );
  });

  it("rejects a negative square-root radicand", () => {
    expect(() =>
      calculateKinematicEquation({
        equation: "velocity-displacement",
        solveFor: "finalVelocity",
        initialVelocity: 2,
        acceleration: -5,
        displacement: 10,
      }),
    ).toThrow(
      "The supplied values produce no real velocity solution.",
    );
  });

  it("rejects zero acceleration when required as a divisor", () => {
    expect(() =>
      calculateKinematicEquation({
        equation: "velocity-displacement",
        solveFor: "displacement",
        initialVelocity: 5,
        finalVelocity: 10,
        acceleration: 0,
      }),
    ).toThrow(
      "Acceleration cannot be zero when calculating displacement.",
    );
  });

  it("rejects missing values", () => {
    expect(() =>
      calculateKinematicEquation({
        equation: "velocity-time",
        solveFor: "finalVelocity",
        acceleration: 2,
        time: 3,
      }),
    ).toThrow(
      "Initial velocity must be a finite number.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateKinematicEquation({
        equation: "velocity-time",
        solveFor: "finalVelocity",
        initialVelocity: Number.NaN,
        acceleration: 2,
        time: 3,
      }),
    ).toThrow(
      "Initial velocity must be a finite number.",
    );
  });
});
