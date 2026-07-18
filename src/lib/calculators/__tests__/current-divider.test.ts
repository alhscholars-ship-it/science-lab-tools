import { describe, expect, it } from "vitest";

import {
  calculateCurrentDivider,
  type CurrentDividerVariable,
} from "../current-divider";

function expectCompleteCurrentDivider(
  result: ReturnType<
    typeof calculateCurrentDivider
  >,
) {
  expect(
    result.details.totalCurrent,
  ).toBeCloseTo(3);

  expect(
    result.details.branchOneCurrent,
  ).toBeCloseTo(2);

  expect(
    result.details.branchTwoCurrent,
  ).toBeCloseTo(1);

  expect(
    result.details.branchOneResistance,
  ).toBeCloseTo(10);

  expect(
    result.details.branchTwoResistance,
  ).toBeCloseTo(20);

  expect(
    result.details.equivalentResistance,
  ).toBeCloseTo(20 / 3);

  expect(
    result.details.circuitVoltage,
  ).toBeCloseTo(20);

  expect(
    result.details.branchOneCurrentRatio,
  ).toBeCloseTo(2 / 3);

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

describe("calculateCurrentDivider", () => {
  it("calculates branch-one current", () => {
    const result = calculateCurrentDivider({
      totalCurrent: 3,
      branchOneResistance: 10,
      branchTwoResistance: 20,
      solveFor: "branchOneCurrent",
    });

    expect(result.value).toBeCloseTo(2);
    expect(result.details.formula).toBe(
      "I1 = It × R2 ÷ (R1 + R2)",
    );

    expectCompleteCurrentDivider(result);
  });

  it("calculates total current", () => {
    const result = calculateCurrentDivider({
      branchOneCurrent: 2,
      branchOneResistance: 10,
      branchTwoResistance: 20,
      solveFor: "totalCurrent",
    });

    expect(result.value).toBeCloseTo(3);
    expect(result.details.formula).toBe(
      "It = I1 × (R1 + R2) ÷ R2",
    );

    expectCompleteCurrentDivider(result);
  });

  it("calculates branch-one resistance", () => {
    const result = calculateCurrentDivider({
      branchOneCurrent: 2,
      totalCurrent: 3,
      branchTwoResistance: 20,
      solveFor: "branchOneResistance",
    });

    expect(result.value).toBeCloseTo(10);
    expect(result.details.formula).toBe(
      "R1 = R2 × (It − I1) ÷ I1",
    );

    expectCompleteCurrentDivider(result);
  });

  it("calculates branch-two resistance", () => {
    const result = calculateCurrentDivider({
      branchOneCurrent: 2,
      totalCurrent: 3,
      branchOneResistance: 10,
      solveFor: "branchTwoResistance",
    });

    expect(result.value).toBeCloseTo(20);
    expect(result.details.formula).toBe(
      "R2 = I1 × R1 ÷ (It − I1)",
    );

    expectCompleteCurrentDivider(result);
  });

  it("splits current equally for equal resistors", () => {
    const result = calculateCurrentDivider({
      totalCurrent: 4,
      branchOneResistance: 100,
      branchTwoResistance: 100,
      solveFor: "branchOneCurrent",
    });

    expect(result.value).toBeCloseTo(2);
    expect(
      result.details.branchTwoCurrent,
    ).toBeCloseTo(2);
    expect(
      result.details.branchOneCurrentRatio,
    ).toBeCloseTo(0.5);
  });

  it("sends more current through lower resistance", () => {
    const result = calculateCurrentDivider({
      totalCurrent: 6,
      branchOneResistance: 10,
      branchTwoResistance: 20,
      solveFor: "branchOneCurrent",
    });

    expect(
      result.details.branchOneCurrent,
    ).toBeGreaterThan(
      result.details.branchTwoCurrent,
    );
  });

  it("supports decimal circuit values", () => {
    const result = calculateCurrentDivider({
      totalCurrent: 1.5,
      branchOneResistance: 2.5,
      branchTwoResistance: 7.5,
      solveFor: "branchOneCurrent",
    });

    expect(result.value).toBeCloseTo(1.125);
  });

  it("rejects a missing required value", () => {
    expect(() =>
      calculateCurrentDivider({
        totalCurrent: 3,
        branchOneResistance: 10,
        solveFor: "branchOneCurrent",
      }),
    ).toThrow(
      "Branch-two resistance must be greater than zero.",
    );
  });

  it("rejects zero resistance", () => {
    expect(() =>
      calculateCurrentDivider({
        totalCurrent: 3,
        branchOneResistance: 0,
        branchTwoResistance: 20,
        solveFor: "branchOneCurrent",
      }),
    ).toThrow(
      "Branch-one resistance must be greater than zero.",
    );
  });

  it("rejects negative current", () => {
    expect(() =>
      calculateCurrentDivider({
        totalCurrent: -3,
        branchOneResistance: 10,
        branchTwoResistance: 20,
        solveFor: "branchOneCurrent",
      }),
    ).toThrow(
      "Total current must be greater than zero.",
    );
  });

  it("rejects branch current equal to total current", () => {
    expect(() =>
      calculateCurrentDivider({
        branchOneCurrent: 3,
        totalCurrent: 3,
        branchTwoResistance: 20,
        solveFor: "branchOneResistance",
      }),
    ).toThrow(
      "Branch-one current must be less than total current.",
    );
  });

  it("rejects branch current above total current", () => {
    expect(() =>
      calculateCurrentDivider({
        branchOneCurrent: 4,
        totalCurrent: 3,
        branchOneResistance: 10,
        solveFor: "branchTwoResistance",
      }),
    ).toThrow(
      "Branch-one current must be less than total current.",
    );
  });

  it("rejects an unsupported solve variable", () => {
    expect(() =>
      calculateCurrentDivider({
        totalCurrent: 3,
        branchOneResistance: 10,
        branchTwoResistance: 20,
        solveFor:
          "unknown" as CurrentDividerVariable,
      }),
    ).toThrow(
      "Unsupported current divider variable",
    );
  });
});
