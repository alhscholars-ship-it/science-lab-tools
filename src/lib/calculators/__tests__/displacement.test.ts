import { describe, expect, it } from "vitest";

import { calculateDisplacement } from "../displacement";

describe("calculateDisplacement", () => {
  it("calculates positive displacement", () => {
    const result = calculateDisplacement({
      initialPosition: 10,
      finalPosition: 35,
      solveFor: "displacement",
    });

    expect(result.value).toBe(25);
    expect(result.formattedValue).toBe("25");
    expect(result.details.displacement).toBe(25);
  });

  it("calculates negative displacement", () => {
    const result = calculateDisplacement({
      initialPosition: 20,
      finalPosition: 5,
      solveFor: "displacement",
    });

    expect(result.value).toBe(-15);
  });

  it("calculates zero displacement", () => {
    const result = calculateDisplacement({
      initialPosition: 12,
      finalPosition: 12,
      solveFor: "displacement",
    });

    expect(result.value).toBe(0);
  });

  it("supports negative positions", () => {
    const result = calculateDisplacement({
      initialPosition: -10,
      finalPosition: 5,
      solveFor: "displacement",
    });

    expect(result.value).toBe(15);
  });

  it("calculates initial position", () => {
    const result = calculateDisplacement({
      displacement: 20,
      finalPosition: 50,
      solveFor: "initialPosition",
    });

    expect(result.value).toBe(30);
    expect(result.details.initialPosition).toBe(30);
  });

  it("calculates final position", () => {
    const result = calculateDisplacement({
      displacement: -15,
      initialPosition: 25,
      solveFor: "finalPosition",
    });

    expect(result.value).toBe(10);
    expect(result.details.finalPosition).toBe(10);
  });

  it("supports zero initial position", () => {
    const result = calculateDisplacement({
      displacement: 30,
      initialPosition: 0,
      solveFor: "finalPosition",
    });

    expect(result.value).toBe(30);
  });

  it("supports zero final position", () => {
    const result = calculateDisplacement({
      displacement: -20,
      finalPosition: 0,
      solveFor: "initialPosition",
    });

    expect(result.value).toBe(20);
  });

  it("rejects missing initial position", () => {
    expect(() =>
      calculateDisplacement({
        finalPosition: 10,
        solveFor: "displacement",
      }),
    ).toThrow(
      "Initial position must be a finite number.",
    );
  });

  it("rejects missing final position", () => {
    expect(() =>
      calculateDisplacement({
        initialPosition: 10,
        solveFor: "displacement",
      }),
    ).toThrow(
      "Final position must be a finite number.",
    );
  });

  it("rejects non-finite displacement", () => {
    expect(() =>
      calculateDisplacement({
        displacement: Number.NaN,
        initialPosition: 5,
        solveFor: "finalPosition",
      }),
    ).toThrow(
      "Displacement must be a finite number.",
    );
  });

  it("rejects infinite positions", () => {
    expect(() =>
      calculateDisplacement({
        initialPosition: Number.POSITIVE_INFINITY,
        finalPosition: 10,
        solveFor: "displacement",
      }),
    ).toThrow(
      "Initial position must be a finite number.",
    );
  });
});
