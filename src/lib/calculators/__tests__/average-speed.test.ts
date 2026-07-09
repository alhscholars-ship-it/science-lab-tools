import { describe, expect, it } from "vitest";

import { calculateAverageSpeed } from "../average-speed";

describe("calculateAverageSpeed", () => {
  it("calculates average speed", () => {
    const result = calculateAverageSpeed({
      distance: 150,
      time: 10,
      solveFor: "averageSpeed",
    });

    expect(result.value).toBe(15);
    expect(result.formattedValue).toBe("15");
    expect(result.details.averageSpeed).toBe(15);
  });

  it("supports zero distance and zero speed", () => {
    const result = calculateAverageSpeed({
      distance: 0,
      time: 5,
      solveFor: "averageSpeed",
    });

    expect(result.value).toBe(0);
  });

  it("calculates distance", () => {
    const result = calculateAverageSpeed({
      averageSpeed: 12,
      time: 5,
      solveFor: "distance",
    });

    expect(result.value).toBe(60);
    expect(result.details.distance).toBe(60);
  });

  it("calculates zero distance", () => {
    const result = calculateAverageSpeed({
      averageSpeed: 0,
      time: 8,
      solveFor: "distance",
    });

    expect(result.value).toBe(0);
  });

  it("calculates time", () => {
    const result = calculateAverageSpeed({
      averageSpeed: 20,
      distance: 100,
      solveFor: "time",
    });

    expect(result.value).toBe(5);
    expect(result.details.time).toBe(5);
  });

  it("rejects negative distance", () => {
    expect(() =>
      calculateAverageSpeed({
        distance: -10,
        time: 2,
        solveFor: "averageSpeed",
      }),
    ).toThrow(
      "Distance cannot be negative.",
    );
  });

  it("rejects negative average speed", () => {
    expect(() =>
      calculateAverageSpeed({
        averageSpeed: -5,
        time: 2,
        solveFor: "distance",
      }),
    ).toThrow(
      "Average speed cannot be negative.",
    );
  });

  it("rejects zero time", () => {
    expect(() =>
      calculateAverageSpeed({
        distance: 20,
        time: 0,
        solveFor: "averageSpeed",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects negative time", () => {
    expect(() =>
      calculateAverageSpeed({
        averageSpeed: 5,
        time: -2,
        solveFor: "distance",
      }),
    ).toThrow(
      "Time must be greater than zero.",
    );
  });

  it("rejects zero speed when calculating time", () => {
    expect(() =>
      calculateAverageSpeed({
        averageSpeed: 0,
        distance: 20,
        solveFor: "time",
      }),
    ).toThrow(
      "Average speed must be greater than zero when calculating time.",
    );
  });

  it("rejects zero calculated time", () => {
    expect(() =>
      calculateAverageSpeed({
        averageSpeed: 5,
        distance: 0,
        solveFor: "time",
      }),
    ).toThrow(
      "Distance and average speed must produce a positive time.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateAverageSpeed({
        distance: Number.NaN,
        time: 2,
        solveFor: "averageSpeed",
      }),
    ).toThrow(
      "Distance must be a finite number.",
    );
  });
});
