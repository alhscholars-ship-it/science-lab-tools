import { describe, expect, it } from "vitest";

import {
  calculateTangentialVelocity,
} from "../tangential-velocity";

describe("calculateTangentialVelocity", () => {
  it("calculates tangential velocity", () => {
    const result =
      calculateTangentialVelocity({
        radius: 4,
        angularVelocity: 3,
        solveFor: "tangentialVelocity",
      });

    expect(result.value).toBeCloseTo(12);
    expect(result.details.formula).toBe(
      "v = rω",
    );
  });

  it("calculates radius", () => {
    const result =
      calculateTangentialVelocity({
        tangentialVelocity: 12,
        angularVelocity: 3,
        solveFor: "radius",
      });

    expect(result.value).toBeCloseTo(4);
  });

  it("calculates angular velocity", () => {
    const result =
      calculateTangentialVelocity({
        tangentialVelocity: 12,
        radius: 4,
        solveFor: "angularVelocity",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("supports decimal values", () => {
    const result =
      calculateTangentialVelocity({
        radius: 2.5,
        angularVelocity: 1.2,
        solveFor: "tangentialVelocity",
      });

    expect(result.value).toBeCloseTo(3);
  });

  it("rejects zero radius", () => {
    expect(() =>
      calculateTangentialVelocity({
        radius: 0,
        angularVelocity: 3,
        solveFor: "tangentialVelocity",
      }),
    ).toThrow(
      "Radius must be greater than zero.",
    );
  });

  it("rejects negative radius", () => {
    expect(() =>
      calculateTangentialVelocity({
        radius: -4,
        angularVelocity: 3,
        solveFor: "tangentialVelocity",
      }),
    ).toThrow(
      "Radius must be greater than zero.",
    );
  });

  it("rejects zero angular velocity", () => {
    expect(() =>
      calculateTangentialVelocity({
        radius: 4,
        angularVelocity: 0,
        solveFor: "tangentialVelocity",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects negative angular velocity", () => {
    expect(() =>
      calculateTangentialVelocity({
        tangentialVelocity: 12,
        angularVelocity: -3,
        solveFor: "radius",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects zero tangential velocity", () => {
    expect(() =>
      calculateTangentialVelocity({
        tangentialVelocity: 0,
        radius: 4,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Tangential velocity must be greater than zero.",
    );
  });

  it("rejects negative tangential velocity", () => {
    expect(() =>
      calculateTangentialVelocity({
        tangentialVelocity: -12,
        radius: 4,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Tangential velocity must be greater than zero.",
    );
  });

  it("rejects non-finite radius", () => {
    expect(() =>
      calculateTangentialVelocity({
        radius:
          Number.POSITIVE_INFINITY,
        angularVelocity: 3,
        solveFor: "tangentialVelocity",
      }),
    ).toThrow(
      "Radius must be a finite number.",
    );
  });

  it("rejects non-finite angular velocity", () => {
    expect(() =>
      calculateTangentialVelocity({
        radius: 4,
        angularVelocity: Number.NaN,
        solveFor: "tangentialVelocity",
      }),
    ).toThrow(
      "Angular velocity must be a finite number.",
    );
  });
});
