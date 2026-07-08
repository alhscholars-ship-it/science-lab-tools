import { describe, expect, it } from "vitest";
import { calculateFreeFall } from "../free-fall";

describe("calculateFreeFall", () => {
  it("calculates height and velocity from time", () => {
    const result = calculateFreeFall({
      time: 2,
    });

    expect(result.height).toBeCloseTo(19.6133);
    expect(result.velocity).toBeCloseTo(19.6133);
  });

  it("calculates time from height", () => {
    const result = calculateFreeFall({
      height: 20,
    });

    expect(result.time).toBeGreaterThan(0);
    expect(result.velocity).toBeGreaterThan(0);
  });

  it("supports custom gravity", () => {
    const result = calculateFreeFall({
      time: 2,
      gravity: 10,
    });

    expect(result.velocity).toBe(20);
  });

  it("rejects invalid gravity", () => {
    expect(() =>
      calculateFreeFall({
        time: 2,
        gravity: 0,
      }),
    ).toThrow();
  });
});
