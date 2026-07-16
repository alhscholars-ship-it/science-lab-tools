import { describe, expect, it } from "vitest";

import {
  calculateMagneticField,
  type MagneticFieldVariable,
  VACUUM_PERMEABILITY,
} from "../magnetic-field";

const referenceField = 0.5;
const referenceCharge = 2e-6;
const referenceVelocity = 3000;
const referenceAngle = 90;

const referenceForce =
  referenceCharge *
  referenceVelocity *
  referenceField *
  Math.sin(
    referenceAngle *
      (Math.PI / 180),
  );

describe("calculateMagneticField", () => {
  it("calculates magnetic field for a moving charge", () => {
    const result = calculateMagneticField({
      mode: "movingCharge",
      force: referenceForce,
      charge: referenceCharge,
      velocity: referenceVelocity,
      angle: referenceAngle,
      solveFor: "magneticField",
    });

    expect(result.value).toBeCloseTo(
      referenceField,
      12,
    );

    expect(result.details.formula).toBe(
      "B = F ÷ (qv sinθ)",
    );

    expect(result.details.force).toBeCloseTo(
      referenceForce,
      12,
    );
  });

  it("calculates magnetic force", () => {
    const result = calculateMagneticField({
      mode: "movingCharge",
      magneticField: referenceField,
      charge: referenceCharge,
      velocity: referenceVelocity,
      angle: referenceAngle,
      solveFor: "force",
    });

    expect(result.value).toBeCloseTo(
      referenceForce,
      12,
    );
  });

  it("calculates electric charge", () => {
    const result = calculateMagneticField({
      mode: "movingCharge",
      magneticField: referenceField,
      force: referenceForce,
      velocity: referenceVelocity,
      angle: referenceAngle,
      solveFor: "charge",
    });

    expect(result.value).toBeCloseTo(
      referenceCharge,
      15,
    );
  });

  it("calculates particle velocity", () => {
    const result = calculateMagneticField({
      mode: "movingCharge",
      magneticField: referenceField,
      force: referenceForce,
      charge: referenceCharge,
      angle: referenceAngle,
      solveFor: "velocity",
    });

    expect(result.value).toBeCloseTo(
      referenceVelocity,
      10,
    );
  });

  it("calculates the acute angle", () => {
    const angle = 30;

    const force =
      referenceCharge *
      referenceVelocity *
      referenceField *
      Math.sin(
        angle *
          (Math.PI / 180),
      );

    const result = calculateMagneticField({
      mode: "movingCharge",
      magneticField: referenceField,
      force,
      charge: referenceCharge,
      velocity: referenceVelocity,
      solveFor: "angle",
    });

    expect(result.value).toBeCloseTo(
      angle,
      10,
    );
  });

  it("calculates magnetic field around a straight conductor", () => {
    const current = 10;
    const distance = 0.05;

    const expected =
      (
        VACUUM_PERMEABILITY *
        current
      ) /
      (
        2 *
        Math.PI *
        distance
      );

    const result = calculateMagneticField({
      mode: "straightConductor",
      current,
      distance,
      solveFor: "magneticField",
    });

    expect(result.value).toBeCloseTo(
      expected,
      14,
    );

    expect(result.details.formula).toBe(
      "B = μ₀I ÷ (2πr)",
    );
  });

  it("calculates conductor current", () => {
    const magneticField = 4e-5;
    const distance = 0.05;

    const expected =
      (
        magneticField *
        2 *
        Math.PI *
        distance
      ) /
      VACUUM_PERMEABILITY;

    const result = calculateMagneticField({
      mode: "straightConductor",
      magneticField,
      distance,
      solveFor: "current",
    });

    expect(result.value).toBeCloseTo(
      expected,
      12,
    );
  });

  it("calculates distance from a straight conductor", () => {
    const magneticField = 4e-5;
    const current = 10;

    const expected =
      (
        VACUUM_PERMEABILITY *
        current
      ) /
      (
        2 *
        Math.PI *
        magneticField
      );

    const result = calculateMagneticField({
      mode: "straightConductor",
      magneticField,
      current,
      solveFor: "distance",
    });

    expect(result.value).toBeCloseTo(
      expected,
      12,
    );
  });

  it("rejects zero charge", () => {
    expect(() =>
      calculateMagneticField({
        mode: "movingCharge",
        force: 1,
        charge: 0,
        velocity: 1000,
        angle: 90,
        solveFor: "magneticField",
      }),
    ).toThrow(
      "Electric charge must be greater than zero.",
    );
  });

  it("rejects invalid angles", () => {
    expect(() =>
      calculateMagneticField({
        mode: "movingCharge",
        force: 1,
        charge: 1,
        velocity: 1,
        angle: 180,
        solveFor: "magneticField",
      }),
    ).toThrow(
      "Angle must be greater than 0 degrees and less than 180 degrees.",
    );
  });

  it("rejects an impossible inverse-sine ratio", () => {
    expect(() =>
      calculateMagneticField({
        mode: "movingCharge",
        magneticField: 1,
        force: 10,
        charge: 1,
        velocity: 1,
        solveFor: "angle",
      }),
    ).toThrow(
      "The supplied values do not produce a valid angle.",
    );
  });

  it("rejects zero conductor distance", () => {
    expect(() =>
      calculateMagneticField({
        mode: "straightConductor",
        current: 10,
        distance: 0,
        solveFor: "magneticField",
      }),
    ).toThrow(
      "Distance from conductor must be greater than zero.",
    );
  });

  it("rejects unsupported moving-charge variables", () => {
    expect(() =>
      calculateMagneticField({
        mode: "movingCharge",
        force: 1,
        charge: 1,
        velocity: 1,
        angle: 90,
        solveFor:
          "current" as MagneticFieldVariable,
      }),
    ).toThrow(
      "The selected variable is not supported in moving-charge mode.",
    );
  });

  it("rejects unsupported conductor variables", () => {
    expect(() =>
      calculateMagneticField({
        mode: "straightConductor",
        current: 10,
        distance: 1,
        solveFor:
          "force" as MagneticFieldVariable,
      }),
    ).toThrow(
      "The selected variable is not supported in straight-conductor mode.",
    );
  });

  it("returns formatted output and calculation details", () => {
    const result = calculateMagneticField({
      mode: "straightConductor",
      current: 10,
      distance: 0.05,
      solveFor: "magneticField",
    });

    expect(
      result.formattedValue.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.substitution.length,
    ).toBeGreaterThan(0);

    expect(
      result.details.vacuumPermeability,
    ).toBe(VACUUM_PERMEABILITY);

    expect(
      result.details.solvedVariable,
    ).toBe("magneticField");
  });
});
