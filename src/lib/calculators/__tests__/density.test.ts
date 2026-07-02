import { describe, expect, it } from "vitest";

import { calculateDensity } from "../density";

describe("calculateDensity", () => {
  it("calculates density from mass and volume", () => {
    const result = calculateDensity({
      mass: 100,
      volume: 20,
      solveFor: "density",
    });

    expect(result.value).toBe(5);
    expect(result.formattedValue).toBe("5");
    expect(result.details.density).toBe(5);
  });

  it("calculates mass from density and volume", () => {
    const result = calculateDensity({
      density: 2.5,
      volume: 40,
      solveFor: "mass",
    });

    expect(result.value).toBe(100);
    expect(result.details.mass).toBe(100);
  });

  it("calculates volume from mass and density", () => {
    const result = calculateDensity({
      mass: 100,
      density: 2.5,
      solveFor: "volume",
    });

    expect(result.value).toBe(40);
    expect(result.details.volume).toBe(40);
  });

  it("supports decimal measurements", () => {
    const result = calculateDensity({
      mass: 19.3,
      volume: 2,
      solveFor: "density",
    });

    expect(result.value).toBeCloseTo(9.65, 10);
    expect(result.formattedValue).toBe("9.65");
  });

  it("rejects a missing mass", () => {
    expect(() =>
      calculateDensity({
        volume: 20,
        solveFor: "density",
      }),
    ).toThrow("Mass must be a finite number.");
  });

  it("rejects zero volume", () => {
    expect(() =>
      calculateDensity({
        mass: 100,
        volume: 0,
        solveFor: "density",
      }),
    ).toThrow("Volume must be greater than zero.");
  });

  it("rejects negative density", () => {
    expect(() =>
      calculateDensity({
        density: -2.5,
        volume: 40,
        solveFor: "mass",
      }),
    ).toThrow("Density must be greater than zero.");
  });

  it("rejects non-finite mass", () => {
    expect(() =>
      calculateDensity({
        mass: Number.NaN,
        volume: 20,
        solveFor: "density",
      }),
    ).toThrow("Mass must be a finite number.");
  });
});
