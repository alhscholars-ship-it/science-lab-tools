import { describe, expect, it } from "vitest";

import {
  calculateRotationalPower,
} from "../rotational-power";

describe("calculateRotationalPower", () => {
  it("calculates rotational power", () => {
    const result =
      calculateRotationalPower({
        torque: 12,
        angularVelocity: 5,
        solveFor: "power",
      });

    expect(result.value).toBeCloseTo(60);
    expect(result.details.formula).toBe(
      "P = τω",
    );
  });

  it("calculates torque", () => {
    const result =
      calculateRotationalPower({
        power: 60,
        angularVelocity: 5,
        solveFor: "torque",
      });

    expect(result.value).toBeCloseTo(12);
  });

  it("calculates angular velocity", () => {
    const result =
      calculateRotationalPower({
        power: 60,
        torque: 12,
        solveFor: "angularVelocity",
      });

    expect(result.value).toBeCloseTo(5);
  });

  it("supports decimal values", () => {
    const result =
      calculateRotationalPower({
        torque: 7.5,
        angularVelocity: 2.4,
        solveFor: "power",
      });

    expect(result.value).toBeCloseTo(18);
  });

  it("rejects zero torque", () => {
    expect(() =>
      calculateRotationalPower({
        torque: 0,
        angularVelocity: 5,
        solveFor: "power",
      }),
    ).toThrow(
      "Torque must be greater than zero.",
    );
  });

  it("rejects negative torque", () => {
    expect(() =>
      calculateRotationalPower({
        torque: -12,
        angularVelocity: 5,
        solveFor: "power",
      }),
    ).toThrow(
      "Torque must be greater than zero.",
    );
  });

  it("rejects zero angular velocity", () => {
    expect(() =>
      calculateRotationalPower({
        torque: 12,
        angularVelocity: 0,
        solveFor: "power",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects negative angular velocity", () => {
    expect(() =>
      calculateRotationalPower({
        power: 60,
        angularVelocity: -5,
        solveFor: "torque",
      }),
    ).toThrow(
      "Angular velocity must be greater than zero.",
    );
  });

  it("rejects zero power", () => {
    expect(() =>
      calculateRotationalPower({
        power: 0,
        torque: 12,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Power must be greater than zero.",
    );
  });

  it("rejects negative power", () => {
    expect(() =>
      calculateRotationalPower({
        power: -60,
        torque: 12,
        solveFor: "angularVelocity",
      }),
    ).toThrow(
      "Power must be greater than zero.",
    );
  });

  it("rejects non-finite torque", () => {
    expect(() =>
      calculateRotationalPower({
        torque: Number.POSITIVE_INFINITY,
        angularVelocity: 5,
        solveFor: "power",
      }),
    ).toThrow(
      "Torque must be a finite number.",
    );
  });

  it("rejects non-finite angular velocity", () => {
    expect(() =>
      calculateRotationalPower({
        torque: 12,
        angularVelocity: Number.NaN,
        solveFor: "power",
      }),
    ).toThrow(
      "Angular velocity must be a finite number.",
    );
  });
});
