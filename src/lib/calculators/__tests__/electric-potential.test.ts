import { describe, expect, it } from "vitest";

import {
  calculateElectricPotential,
  ELECTRIC_POTENTIAL_CONSTANT,
  type ElectricPotentialVariable,
} from "../electric-potential";

const referenceSourceCharge = 2e-6;
const referenceDistance = 0.05;

const referencePotential =
  (
    ELECTRIC_POTENTIAL_CONSTANT *
    referenceSourceCharge
  ) /
  referenceDistance;

function expectReferenceCalculation(
  result: ReturnType<
    typeof calculateElectricPotential
  >,
) {
  expect(
    result.details.electricPotential,
  ).toBeCloseTo(referencePotential, 8);

  expect(
    result.details.sourceCharge,
  ).toBeCloseTo(referenceSourceCharge, 15);

  expect(
    result.details.distance,
  ).toBeCloseTo(referenceDistance, 12);

  expect(result.details.electricConstant).toBe(
    ELECTRIC_POTENTIAL_CONSTANT,
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

describe("calculateElectricPotential", () => {
  it("calculates electric potential from source charge and distance", () => {
    const result =
      calculateElectricPotential({
        sourceCharge: referenceSourceCharge,
        distance: referenceDistance,
        solveFor: "electricPotential",
      });

    expect(result.value).toBeCloseTo(
      referencePotential,
      8,
    );

    expect(result.details.formula).toBe(
      "V = kQ ÷ r",
    );

    expectReferenceCalculation(result);
  });

  it("calculates source charge from potential and distance", () => {
    const result =
      calculateElectricPotential({
        electricPotential:
          referencePotential,
        distance: referenceDistance,
        solveFor: "sourceCharge",
      });

    expect(result.value).toBeCloseTo(
      referenceSourceCharge,
      15,
    );

    expect(result.details.formula).toBe(
      "Q = Vr ÷ k",
    );

    expectReferenceCalculation(result);
  });

  it("calculates distance from potential and source charge", () => {
    const result =
      calculateElectricPotential({
        electricPotential:
          referencePotential,
        sourceCharge:
          referenceSourceCharge,
        solveFor: "distance",
      });

    expect(result.value).toBeCloseTo(
      referenceDistance,
      12,
    );

    expect(result.details.formula).toBe(
      "r = kQ ÷ V",
    );

    expectReferenceCalculation(result);
  });

  it("supports nano-coulomb source charges", () => {
    const sourceCharge = 5e-9;
    const distance = 0.2;

    const result =
      calculateElectricPotential({
        sourceCharge,
        distance,
        solveFor: "electricPotential",
      });

    const expected =
      (
        ELECTRIC_POTENTIAL_CONSTANT *
        sourceCharge
      ) /
      distance;

    expect(result.value).toBeCloseTo(
      expected,
      10,
    );
  });

  it("supports very small distances", () => {
    const sourceCharge = 1e-9;
    const distance = 1e-4;

    const result =
      calculateElectricPotential({
        sourceCharge,
        distance,
        solveFor: "electricPotential",
      });

    const expected =
      (
        ELECTRIC_POTENTIAL_CONSTANT *
        sourceCharge
      ) /
      distance;

    expect(result.value).toBeCloseTo(
      expected,
      8,
    );
  });

  it("rejects missing source charge", () => {
    expect(() =>
      calculateElectricPotential({
        distance: referenceDistance,
        solveFor: "electricPotential",
      }),
    ).toThrow(
      "Source charge must be greater than zero.",
    );
  });

  it("rejects missing distance", () => {
    expect(() =>
      calculateElectricPotential({
        sourceCharge:
          referenceSourceCharge,
        solveFor: "electricPotential",
      }),
    ).toThrow(
      "Distance must be greater than zero.",
    );
  });

  it("rejects zero electric potential", () => {
    expect(() =>
      calculateElectricPotential({
        electricPotential: 0,
        distance: referenceDistance,
        solveFor: "sourceCharge",
      }),
    ).toThrow(
      "Electric potential must be greater than zero.",
    );
  });

  it("rejects negative source charge magnitude", () => {
    expect(() =>
      calculateElectricPotential({
        sourceCharge: -2e-6,
        distance: referenceDistance,
        solveFor: "electricPotential",
      }),
    ).toThrow(
      "Source charge must be greater than zero.",
    );
  });

  it("rejects zero distance", () => {
    expect(() =>
      calculateElectricPotential({
        sourceCharge:
          referenceSourceCharge,
        distance: 0,
        solveFor: "electricPotential",
      }),
    ).toThrow(
      "Distance must be greater than zero.",
    );
  });

  it("rejects non-finite potential values", () => {
    expect(() =>
      calculateElectricPotential({
        electricPotential:
          Number.POSITIVE_INFINITY,
        sourceCharge:
          referenceSourceCharge,
        solveFor: "distance",
      }),
    ).toThrow(
      "Electric potential must be greater than zero.",
    );
  });

  it("rejects an unsupported solve variable", () => {
    expect(() =>
      calculateElectricPotential({
        electricPotential:
          referencePotential,
        sourceCharge:
          referenceSourceCharge,
        solveFor:
          "unknown" as ElectricPotentialVariable,
      }),
    ).toThrow(
      "Unsupported electric potential variable",
    );
  });
});
