import { describe, expect, it } from "vitest";

import {
  calculateCoulombsLaw,
  COULOMB_CONSTANT,
  type CoulombsLawVariable,
} from "../coulombs-law";

const referenceChargeOne = 1e-6;
const referenceChargeTwo = 2e-6;
const referenceDistance = 0.05;

const referenceForce =
  (
    COULOMB_CONSTANT *
    referenceChargeOne *
    referenceChargeTwo
  ) /
  referenceDistance ** 2;

function expectReferenceCalculation(
  result: ReturnType<
    typeof calculateCoulombsLaw
  >,
) {
  expect(result.details.force).toBeCloseTo(
    referenceForce,
    10,
  );

  expect(result.details.chargeOne).toBeCloseTo(
    referenceChargeOne,
    12,
  );

  expect(result.details.chargeTwo).toBeCloseTo(
    referenceChargeTwo,
    12,
  );

  expect(result.details.distance).toBeCloseTo(
    referenceDistance,
    12,
  );

  expect(result.details.coulombConstant).toBe(
    COULOMB_CONSTANT,
  );

  expect(
    result.formattedValue.length,
  ).toBeGreaterThan(0);

  expect(
    result.details.formula.length,
  ).toBeGreaterThan(0);

  expect(
    result.details.substitution.length,
  ).toBeGreaterThan(0);
}

describe("calculateCoulombsLaw", () => {
  it("calculates electrostatic force", () => {
    const result = calculateCoulombsLaw({
      chargeOne: referenceChargeOne,
      chargeTwo: referenceChargeTwo,
      distance: referenceDistance,
      solveFor: "force",
    });

    expect(result.value).toBeCloseTo(
      referenceForce,
      10,
    );

    expect(result.details.formula).toBe(
      "F = kq₁q₂ ÷ r²",
    );

    expectReferenceCalculation(result);
  });

  it("calculates the first charge", () => {
    const result = calculateCoulombsLaw({
      force: referenceForce,
      chargeTwo: referenceChargeTwo,
      distance: referenceDistance,
      solveFor: "chargeOne",
    });

    expect(result.value).toBeCloseTo(
      referenceChargeOne,
      12,
    );

    expect(result.details.formula).toBe(
      "q₁ = Fr² ÷ kq₂",
    );

    expectReferenceCalculation(result);
  });

  it("calculates the second charge", () => {
    const result = calculateCoulombsLaw({
      force: referenceForce,
      chargeOne: referenceChargeOne,
      distance: referenceDistance,
      solveFor: "chargeTwo",
    });

    expect(result.value).toBeCloseTo(
      referenceChargeTwo,
      12,
    );

    expect(result.details.formula).toBe(
      "q₂ = Fr² ÷ kq₁",
    );

    expectReferenceCalculation(result);
  });

  it("calculates separation distance", () => {
    const result = calculateCoulombsLaw({
      force: referenceForce,
      chargeOne: referenceChargeOne,
      chargeTwo: referenceChargeTwo,
      solveFor: "distance",
    });

    expect(result.value).toBeCloseTo(
      referenceDistance,
      12,
    );

    expect(result.details.formula).toBe(
      "r = √(kq₁q₂ ÷ F)",
    );

    expectReferenceCalculation(result);
  });

  it("supports nano-coulomb charges", () => {
    const chargeOne = 2e-9;
    const chargeTwo = 3e-9;
    const distance = 0.05;

    const result = calculateCoulombsLaw({
      chargeOne,
      chargeTwo,
      distance,
      solveFor: "force",
    });

    const expected =
      (
        COULOMB_CONSTANT *
        chargeOne *
        chargeTwo
      ) /
      distance ** 2;

    expect(result.value).toBeCloseTo(
      expected,
      15,
    );
  });

  it("supports asymmetric charge values", () => {
    const force = 0.9;
    const chargeOne = 2e-6;
    const distance = 0.2;

    const result = calculateCoulombsLaw({
      force,
      chargeOne,
      distance,
      solveFor: "chargeTwo",
    });

    const expected =
      (
        force *
        distance ** 2
      ) /
      (
        COULOMB_CONSTANT *
        chargeOne
      );

    expect(result.value).toBeCloseTo(
      expected,
      14,
    );
  });

  it("rejects missing first charge", () => {
    expect(() =>
      calculateCoulombsLaw({
        chargeTwo: 1e-6,
        distance: 0.001,
        solveFor: "force",
      }),
    ).toThrow(
      "First charge must be greater than zero.",
    );
  });

  it("rejects missing second charge", () => {
    expect(() =>
      calculateCoulombsLaw({
        chargeOne: 1e-6,
        distance: 0.001,
        solveFor: "force",
      }),
    ).toThrow(
      "Second charge must be greater than zero.",
    );
  });

  it("rejects zero separation distance", () => {
    expect(() =>
      calculateCoulombsLaw({
        chargeOne: 1e-6,
        chargeTwo: 1e-6,
        distance: 0,
        solveFor: "force",
      }),
    ).toThrow(
      "Separation distance must be greater than zero.",
    );
  });

  it("rejects negative force", () => {
    expect(() =>
      calculateCoulombsLaw({
        force: -1,
        chargeTwo: 1e-6,
        distance: 0.001,
        solveFor: "chargeOne",
      }),
    ).toThrow(
      "Electrostatic force must be greater than zero.",
    );
  });

  it("rejects non-finite charge values", () => {
    expect(() =>
      calculateCoulombsLaw({
        chargeOne: Number.POSITIVE_INFINITY,
        chargeTwo: 1e-6,
        distance: 0.001,
        solveFor: "force",
      }),
    ).toThrow(
      "First charge must be greater than zero.",
    );
  });

  it("rejects an unsupported solve variable", () => {
    expect(() =>
      calculateCoulombsLaw({
        force: 1,
        chargeOne: 1e-6,
        chargeTwo: 1e-6,
        solveFor:
          "unknown" as CoulombsLawVariable,
      }),
    ).toThrow(
      "Unsupported Coulomb's law variable",
    );
  });
});
