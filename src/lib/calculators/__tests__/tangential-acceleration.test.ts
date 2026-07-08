import { describe, expect, it } from "vitest";

import {
  calculateTangentialAcceleration,
} from "../tangential-acceleration";

describe("calculateTangentialAcceleration", () => {
  it("calculates tangential acceleration", () => {
    const result =
      calculateTangentialAcceleration({
        radius: 4,
        angularAcceleration: 3,
        solveFor: "tangentialAcceleration",
      });

    expect(result.value).toBeCloseTo(12);
    expect(result.details.formula).toBe(
      "aₜ = rα",
    );
  });

  it("calculates radius", () => {
    const result =
      calculateTangentialAcceleration({
        tangentialAcceleration: 12,
        angularAcceleration: 3,
        solveFor: "radius",
      });

    expect(result.value).toBeCloseTo(4);
  });

  it("calculates angular acceleration", () => {
    const result =
      calculateTangentialAcceleration({
        tangentialAcceleration: 12,
        radius: 4,
        solveFor: "angularAcceleration",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("supports decimal values", () => {
    const result =
      calculateTangentialAcceleration({
        radius: 2.5,
        angularAcceleration: 1.2,
        solveFor: "tangentialAcceleration",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("rejects zero radius", () => {
    expect(() =>
      calculateTangentialAcceleration({
        radius: 0,
        angularAcceleration: 3,
        solveFor: "tangentialAcceleration",
      }),
    ).toThrow(
      "Radius must be greater than zero.",
    );
  });

  it("rejects negative radius", () => {
    expect(() =>
      calculateTangentialAcceleration({
        radius: -4,
        angularAcceleration: 3,
        solveFor: "tangentialAcceleration",
      }),
    ).toThrow(
      "Radius must be greater than zero.",
    );
  });

  it("rejects zero angular acceleration", () => {
    expect(() =>
      calculateTangentialAcceleration({
        radius: 4,
        angularAcceleration: 0,
        solveFor: "tangentialAcceleration",
      }),
    ).toThrow(
      "Angular acceleration must be greater than zero.",
    );
  });

  it("rejects negative angular acceleration", () => {
    expect(() =>
      calculateTangentialAcceleration({
        tangentialAcceleration: 12,
        angularAcceleration: -3,
        solveFor: "radius",
      }),
    ).toThrow(
      "Angular acceleration must be greater than zero.",
    );
  });

  it("rejects zero tangential acceleration", () => {
    expect(() =>
      calculateTangentialAcceleration({
        tangentialAcceleration: 0,
        radius: 4,
        solveFor: "angularAcceleration",
      }),
    ).toThrow(
      "Tangential acceleration must be greater than zero.",
    );
  });

  it("rejects negative tangential acceleration", () => {
    expect(() =>
      calculateTangentialAcceleration({
        tangentialAcceleration: -12,
        radius: 4,
        solveFor: "angularAcceleration",
      }),
    ).toThrow(
      "Tangential acceleration must be greater than zero.",
    );
  });

  it("rejects non-finite radius", () => {
    expect(() =>
      calculateTangentialAcceleration({
        radius:
          Number.POSITIVE_INFINITY,
        angularAcceleration: 3,
        solveFor: "tangentialAcceleration",
      }),
    ).toThrow(
      "Radius must be a finite number.",
    );
  });

  it("rejects non-finite angular acceleration", () => {
    expect(() =>
      calculateTangentialAcceleration({
        radius: 4,
        angularAcceleration: Number.NaN,
        solveFor: "tangentialAcceleration",
      }),
    ).toThrow(
      "Angular acceleration must be a finite number.",
    );
  });
});
