import { describe, expect, it } from "vitest";

import { calculateTorque } from "../torque";

describe("calculateTorque", () => {
  it("calculates torque", () => {
    const result = calculateTorque({
      force: 80,
      leverArm: 0.5,
      solveFor: "torque",
    });

    expect(result.value).toBe(40);
    expect(result.details.torque).toBe(40);
    expect(result.details.formula).toBe(
      "τ = Fr",
    );
  });

  it("calculates force", () => {
    const result = calculateTorque({
      torque: 60,
      leverArm: 0.75,
      solveFor: "force",
    });

    expect(result.value).toBe(80);
  });

  it("calculates lever arm", () => {
    const result = calculateTorque({
      torque: 90,
      force: 150,
      solveFor: "leverArm",
    });

    expect(result.value).toBeCloseTo(0.6);
  });

  it("supports decimal values", () => {
    const result = calculateTorque({
      force: 45.5,
      leverArm: 0.24,
      solveFor: "torque",
    });

    expect(result.value).toBeCloseTo(10.92);
  });

  it("rejects zero force", () => {
    expect(() =>
      calculateTorque({
        force: 0,
        leverArm: 0.5,
        solveFor: "torque",
      }),
    ).toThrow(
      "Force must be greater than zero.",
    );
  });

  it("rejects negative force", () => {
    expect(() =>
      calculateTorque({
        force: -80,
        leverArm: 0.5,
        solveFor: "torque",
      }),
    ).toThrow(
      "Force must be greater than zero.",
    );
  });

  it("rejects zero lever arm", () => {
    expect(() =>
      calculateTorque({
        force: 80,
        leverArm: 0,
        solveFor: "torque",
      }),
    ).toThrow(
      "Lever arm must be greater than zero.",
    );
  });

  it("rejects negative lever arm", () => {
    expect(() =>
      calculateTorque({
        torque: 40,
        leverArm: -0.5,
        solveFor: "force",
      }),
    ).toThrow(
      "Lever arm must be greater than zero.",
    );
  });

  it("rejects zero torque", () => {
    expect(() =>
      calculateTorque({
        torque: 0,
        force: 80,
        solveFor: "leverArm",
      }),
    ).toThrow(
      "Torque must be greater than zero.",
    );
  });

  it("rejects negative torque", () => {
    expect(() =>
      calculateTorque({
        torque: -40,
        leverArm: 0.5,
        solveFor: "force",
      }),
    ).toThrow(
      "Torque must be greater than zero.",
    );
  });

  it("rejects non-finite force", () => {
    expect(() =>
      calculateTorque({
        force: Number.POSITIVE_INFINITY,
        leverArm: 0.5,
        solveFor: "torque",
      }),
    ).toThrow(
      "Force must be a finite number.",
    );
  });

  it("rejects non-finite lever arm", () => {
    expect(() =>
      calculateTorque({
        force: 80,
        leverArm: Number.NaN,
        solveFor: "torque",
      }),
    ).toThrow(
      "Lever arm must be a finite number.",
    );
  });
});
