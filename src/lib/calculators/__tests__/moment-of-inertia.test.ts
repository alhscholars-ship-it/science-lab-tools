import { describe, expect, it } from "vitest";

import {
  calculateMomentOfInertia,
} from "../moment-of-inertia";

describe("calculateMomentOfInertia", () => {
  it("calculates a point mass", () => {
    const result = calculateMomentOfInertia({
      shape: "pointMass",
      mass: 4,
      dimension: 3,
    });

    expect(result.value).toBeCloseTo(36);
    expect(result.details.formula).toBe(
      "I = mr²",
    );
  });

  it("calculates a solid disk", () => {
    const result = calculateMomentOfInertia({
      shape: "solidDisk",
      mass: 4,
      dimension: 3,
    });

    expect(result.value).toBeCloseTo(18);
  });

  it("calculates a thin hoop", () => {
    const result = calculateMomentOfInertia({
      shape: "thinHoop",
      mass: 4,
      dimension: 3,
    });

    expect(result.value).toBeCloseTo(36);
  });

  it("calculates a solid sphere", () => {
    const result = calculateMomentOfInertia({
      shape: "solidSphere",
      mass: 5,
      dimension: 2,
    });

    expect(result.value).toBeCloseTo(8);
  });

  it("calculates a thin spherical shell", () => {
    const result = calculateMomentOfInertia({
      shape: "thinSphericalShell",
      mass: 6,
      dimension: 3,
    });

    expect(result.value).toBeCloseTo(36);
  });

  it("calculates a rod through its center", () => {
    const result = calculateMomentOfInertia({
      shape: "rodCenter",
      mass: 12,
      dimension: 4,
    });

    expect(result.value).toBeCloseTo(16);
    expect(result.details.dimensionLabel).toBe(
      "Length",
    );
  });

  it("calculates a rod through one end", () => {
    const result = calculateMomentOfInertia({
      shape: "rodEnd",
      mass: 3,
      dimension: 6,
    });

    expect(result.value).toBeCloseTo(36);
  });

  it("supports decimal values", () => {
    const result = calculateMomentOfInertia({
      shape: "solidDisk",
      mass: 2.5,
      dimension: 1.2,
    });

    expect(result.value).toBeCloseTo(1.8);
  });

  it("rejects zero mass", () => {
    expect(() =>
      calculateMomentOfInertia({
        shape: "solidDisk",
        mass: 0,
        dimension: 3,
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects negative mass", () => {
    expect(() =>
      calculateMomentOfInertia({
        shape: "solidSphere",
        mass: -5,
        dimension: 2,
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects zero radius", () => {
    expect(() =>
      calculateMomentOfInertia({
        shape: "thinHoop",
        mass: 4,
        dimension: 0,
      }),
    ).toThrow(
      "Radius must be greater than zero.",
    );
  });

  it("rejects negative rod length", () => {
    expect(() =>
      calculateMomentOfInertia({
        shape: "rodEnd",
        mass: 3,
        dimension: -6,
      }),
    ).toThrow(
      "Length must be greater than zero.",
    );
  });

  it("rejects non-finite mass", () => {
    expect(() =>
      calculateMomentOfInertia({
        shape: "pointMass",
        mass: Number.POSITIVE_INFINITY,
        dimension: 3,
      }),
    ).toThrow(
      "Mass must be a finite number.",
    );
  });

  it("rejects non-finite dimension", () => {
    expect(() =>
      calculateMomentOfInertia({
        shape: "solidDisk",
        mass: 4,
        dimension: Number.NaN,
      }),
    ).toThrow(
      "Radius must be a finite number.",
    );
  });
});
