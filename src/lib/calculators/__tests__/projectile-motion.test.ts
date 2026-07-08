import { describe, expect, it } from "vitest";
import { calculateProjectileMotion } from "../projectile-motion";

describe("calculateProjectileMotion", () => {
  it("calculates projectile values", () => {
    const result = calculateProjectileMotion({
      initialVelocity: 20,
      angle: 45,
    });

    expect(result.range).toBeCloseTo(40.774);
    expect(result.maximumHeight).toBeCloseTo(10.194);
    expect(result.flightTime).toBeCloseTo(2.883);
  });

  it("supports custom gravity", () => {
    const result = calculateProjectileMotion({
      initialVelocity: 10,
      angle: 45,
      gravity: 9.8,
    });

    expect(result.flightTime).toBeGreaterThan(0);
  });

  it("rejects invalid velocity", () => {
    expect(() =>
      calculateProjectileMotion({
        initialVelocity: 0,
        angle: 45,
      }),
    ).toThrow();
  });

  it("rejects invalid gravity", () => {
    expect(() =>
      calculateProjectileMotion({
        initialVelocity: 10,
        angle: 45,
        gravity: 0,
      }),
    ).toThrow();
  });
});
