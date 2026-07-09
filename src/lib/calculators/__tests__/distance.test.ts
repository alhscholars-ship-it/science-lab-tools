import { describe, expect, it } from "vitest";

import { calculateDistance } from "../distance";

describe("calculateDistance", () => {
  it("calculates distance", () => {
    const result = calculateDistance({
      speed: 12,
      time: 5,
      solveFor: "distance",
    });

    expect(result.value).toBe(60);
    expect(result.formattedValue).toBe("60");
    expect(result.details.distance).toBe(60);
    expect(result.details.formula).toBe("d = v × t");
  });

  it("calculates zero distance from zero speed", () => {
    const result = calculateDistance({
      speed: 0,
      time: 8,
      solveFor: "distance",
    });

    expect(result.value).toBe(0);
  });

  it("calculates zero distance from zero time", () => {
    const result = calculateDistance({
      speed: 15,
      time: 0,
      solveFor: "distance",
    });

    expect(result.value).toBe(0);
  });

  it("calculates speed", () => {
    const result = calculateDistance({
      distance: 150,
      time: 10,
      solveFor: "speed",
    });

    expect(result.value).toBe(15);
    expect(result.details.speed).toBe(15);
  });

  it("calculates zero speed", () => {
    const result = calculateDistance({
      distance: 0,
      time: 10,
      solveFor: "speed",
    });

    expect(result.value).toBe(0);
  });

  it("calculates time", () => {
    const result = calculateDistance({
      distance: 100,
      speed: 20,
      solveFor: "time",
    });

    expect(result.value).toBe(5);
    expect(result.details.time).toBe(5);
  });

  it("calculates zero time", () => {
    const result = calculateDistance({
      distance: 0,
      speed: 20,
      solveFor: "time",
    });

    expect(result.value).toBe(0);
  });

  it("rejects negative distance", () => {
    expect(() =>
      calculateDistance({
        distance: -10,
        time: 2,
        solveFor: "speed",
      }),
    ).toThrow("Distance cannot be negative.");
  });

  it("rejects negative speed", () => {
    expect(() =>
      calculateDistance({
        speed: -5,
        time: 2,
        solveFor: "distance",
      }),
    ).toThrow("Speed cannot be negative.");
  });

  it("rejects negative time", () => {
    expect(() =>
      calculateDistance({
        speed: 5,
        time: -2,
        solveFor: "distance",
      }),
    ).toThrow("Time cannot be negative.");
  });

  it("rejects zero time when calculating speed", () => {
    expect(() =>
      calculateDistance({
        distance: 20,
        time: 0,
        solveFor: "speed",
      }),
    ).toThrow(
      "Time must be greater than zero when calculating speed.",
    );
  });

  it("rejects zero speed when calculating time", () => {
    expect(() =>
      calculateDistance({
        distance: 20,
        speed: 0,
        solveFor: "time",
      }),
    ).toThrow(
      "Speed must be greater than zero when calculating time.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateDistance({
        speed: Number.NaN,
        time: 2,
        solveFor: "distance",
      }),
    ).toThrow(
      "Speed must be a finite number.",
    );
  });

  it("rejects infinite values", () => {
    expect(() =>
      calculateDistance({
        distance: Number.POSITIVE_INFINITY,
        time: 2,
        solveFor: "speed",
      }),
    ).toThrow(
      "Distance must be a finite number.",
    );
  });
});
