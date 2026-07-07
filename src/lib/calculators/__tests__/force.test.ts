import { describe, expect, it } from "vitest";

import { calculateForce } from "../force";

describe("calculateForce", () => {
  it("calculates positive force", () => {
    const result = calculateForce({
      mass: 10,
      acceleration: 3,
      solveFor: "force",
    });

    expect(result.value).toBe(30);
    expect(result.details.force).toBe(30);
    expect(result.formattedValue).toBe("30");
  });

  it("calculates negative force", () => {
    const result = calculateForce({
      mass: 5,
      acceleration: -4,
      solveFor: "force",
    });

    expect(result.value).toBe(-20);
    expect(result.details.force).toBe(-20);
  });

  it("supports zero force", () => {
    const result = calculateForce({
      mass: 8,
      acceleration: 0,
      solveFor: "force",
    });

    expect(result.value).toBe(0);
  });

  it("calculates mass", () => {
    const result = calculateForce({
      force: 45,
      acceleration: 9,
      solveFor: "mass",
    });

    expect(result.value).toBe(5);
    expect(result.details.mass).toBe(5);
  });

  it("calculates mass from negative values", () => {
    const result = calculateForce({
      force: -24,
      acceleration: -6,
      solveFor: "mass",
    });

    expect(result.value).toBe(4);
  });

  it("calculates acceleration", () => {
    const result = calculateForce({
      force: 50,
      mass: 10,
      solveFor: "acceleration",
    });

    expect(result.value).toBe(5);
    expect(
      result.details.acceleration,
    ).toBe(5);
  });

  it("calculates negative acceleration", () => {
    const result = calculateForce({
      force: -30,
      mass: 6,
      solveFor: "acceleration",
    });

    expect(result.value).toBe(-5);
  });

  it("rejects zero mass", () => {
    expect(() =>
      calculateForce({
        force: 20,
        mass: 0,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects negative mass", () => {
    expect(() =>
      calculateForce({
        mass: -4,
        acceleration: 3,
        solveFor: "force",
      }),
    ).toThrow(
      "Mass must be greater than zero.",
    );
  });

  it("rejects zero acceleration when solving mass", () => {
    expect(() =>
      calculateForce({
        force: 10,
        acceleration: 0,
        solveFor: "mass",
      }),
    ).toThrow(
      "Acceleration cannot be zero when calculating mass.",
    );
  });

  it("rejects incompatible signs when solving mass", () => {
    expect(() =>
      calculateForce({
        force: 20,
        acceleration: -4,
        solveFor: "mass",
      }),
    ).toThrow(
      "Force and acceleration must have matching signs to produce a positive mass.",
    );
  });

  it("rejects non-finite values", () => {
    expect(() =>
      calculateForce({
        force: Number.NaN,
        mass: 5,
        solveFor: "acceleration",
      }),
    ).toThrow(
      "Force must be a finite number.",
    );
  });
});
