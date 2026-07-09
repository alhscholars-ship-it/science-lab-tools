import { describe, expect, it } from "vitest";
import { calculateAccelerationDueToGravity } from "../acceleration-due-to-gravity";

describe("calculateAccelerationDueToGravity", () => {
  it("calculates Earth gravity approximately", () => {
    const result = calculateAccelerationDueToGravity({
      mass: 5.972e24,
      radius: 6.371e6,
    });

    expect(result.gravity).toBeCloseTo(9.81, 1);
  });

  it("supports direct gravity input", () => {
    const result = calculateAccelerationDueToGravity({
      gravity: 9.8,
    });

    expect(result.gravity).toBe(9.8);
  });

  it("rejects invalid mass", () => {
    expect(() =>
      calculateAccelerationDueToGravity({
        mass: 0,
        radius: 10,
      }),
    ).toThrow();
  });

  it("rejects invalid radius", () => {
    expect(() =>
      calculateAccelerationDueToGravity({
        mass: 10,
        radius: 0,
      }),
    ).toThrow();
  });
});
