import { describe, expect, it } from "vitest";

import { calculateAverageVelocity } from "../average-velocity";

describe("calculateAverageVelocity", () => {
  it("calculates positive average velocity", () => {
    const result = calculateAverageVelocity({
      displacement: 120,
      time: 10,
      solveFor: "averageVelocity",
    });

    expect(result.value).toBe(12);
    expect(result.formattedValue).toBe("12");
    expect(result.details.averageVelocity).toBe(12);
  });

  it("calculates negative average velocity", () => {
    const result = calculateAverageVelocity({
      displacement: -60,
      time: 5,
      solveFor: "averageVelocity",
    });

    expect(result.value).toBe(-12);
  });

  it("supports zero displacement", () => {
    const result = calculateAverageVelocity({
      displacement: 0,
      time: 8,
      solveFor: "averageVelocity",
    });

    expect(result.value).toBe(0);
  });

  it("calculates displacement", () => {
    const result = calculateAverageVelocity({
      averageVelocity: 15,
      time: 4,
      solveFor: "displacement",
    });

    expect(result.value).toBe(60);
    expect(result.details.displacement).toBe(60);
  });

  it("calculates negative displacement", () => {
    const result = calculateAverageVelocity({
      averageVelocity: -8,
      time: 3,
      solveFor: "displacement",
    });

    expect(result.value).toBe(-24);
  });

  it("calculates time", () => {
    const result = calculateAverageVelocity({
      averageVelocity: 10,
      displacement: 50,
      solveFor: "time",
    });

    expect(result.value).toBe(5);
    expect(result.details.time).toBe(5);
  });

  it("calculates time from negative values", () => {
    const result = calculateAverageVelocity({
      averageVelocity: -10,
      displacement: -40,
      solveFor: "time",
    });

    expect(result.value).toBe(4);
  });

  it("rejects zero time", () => {
    expect(() =>
      calculateAverageVelocity({
        displacement: 20,
        time: 0,
        solveFor: "averageVelocity",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects negative time", () => {
    expect(() =>
      calculateAverageVelocity({
        averageVelocity: 5,
        time: -2,
        solveFor: "displacement",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects zero velocity when calculating time", () => {
    expect(() =>
      calculateAverageVelocity({
        averageVelocity: 0,
        displacement: 20,
        solveFor: "time",
      }),
    ).toThrow(
      "Average velocity cannot be zero when calculating time.",
    );
  });

  it("rejects non-positive calculated time", () => {
    expect(() =>
      calculateAverageVelocity({
        averageVelocity: 5,
        displacement: -20,
        solveFor: "time",
      }),
    ).toThrow(
      "Displacement and average velocity must produce a positive time.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateAverageVelocity({
        displacement: Number.NaN,
        time: 2,
        solveFor: "averageVelocity",
      }),
    ).toThrow(
      "Displacement must be a finite number.",
    );
  });
});
