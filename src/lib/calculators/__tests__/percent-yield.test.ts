import {
  describe,
  expect,
  it,
} from "vitest";

import {
  calculatePercentYield,
} from "../percent-yield";

describe("calculatePercentYield", () => {
  it("calculates a standard percent yield", () => {
    const result = calculatePercentYield({
      actualYield: 80,
      theoreticalYield: 100,
    });

    expect(result.value).toBe(80);
    expect(result.formattedValue).toBe("80%");
    expect(result.details.yieldRatio).toBe(0.8);
  });

  it("returns one hundred percent when both yields are equal", () => {
    const result = calculatePercentYield({
      actualYield: 25,
      theoreticalYield: 25,
    });

    expect(result.value).toBe(100);
    expect(result.formattedValue).toBe("100%");
    expect(
      result.details.isOverTheoretical,
    ).toBe(false);
  });

  it("returns zero when the actual yield is zero", () => {
    const result = calculatePercentYield({
      actualYield: 0,
      theoreticalYield: 50,
    });

    expect(result.value).toBe(0);
    expect(result.formattedValue).toBe("0%");
    expect(result.details.yieldRatio).toBe(0);
  });

  it("supports percent yields above one hundred percent", () => {
    const result = calculatePercentYield({
      actualYield: 120,
      theoreticalYield: 100,
    });

    expect(result.value).toBe(120);
    expect(
      result.details.isOverTheoretical,
    ).toBe(true);
  });

  it("calculates decimal laboratory yields", () => {
    const result = calculatePercentYield({
      actualYield: 36.03,
      theoreticalYield: 40,
    });

    expect(result.value).toBeCloseTo(
      90.075,
      10,
    );

    expect(
      result.formattedValue,
    ).toBe("90.075%");
  });

  it("records the input values and formula", () => {
    const result = calculatePercentYield({
      actualYield: 9,
      theoreticalYield: 10,
    });

    expect(
      result.details.actualYield,
    ).toBe(9);

    expect(
      result.details.theoreticalYield,
    ).toBe(10);

    expect(result.details.formula).toBe(
      "actual yield ÷ theoretical yield × 100",
    );
  });

  it("rejects a negative actual yield", () => {
    expect(() =>
      calculatePercentYield({
        actualYield: -1,
        theoreticalYield: 10,
      }),
    ).toThrow(
      "Actual yield cannot be negative.",
    );
  });

  it("rejects a zero theoretical yield", () => {
    expect(() =>
      calculatePercentYield({
        actualYield: 5,
        theoreticalYield: 0,
      }),
    ).toThrow(
      "Theoretical yield must be greater than zero.",
    );
  });

  it("rejects a negative theoretical yield", () => {
    expect(() =>
      calculatePercentYield({
        actualYield: 5,
        theoreticalYield: -10,
      }),
    ).toThrow(
      "Theoretical yield must be greater than zero.",
    );
  });

  it("rejects a non-finite actual yield", () => {
    expect(() =>
      calculatePercentYield({
        actualYield: Number.NaN,
        theoreticalYield: 10,
      }),
    ).toThrow(
      "Actual yield must be a finite number.",
    );
  });

  it("rejects a non-finite theoretical yield", () => {
    expect(() =>
      calculatePercentYield({
        actualYield: 5,
        theoreticalYield:
          Number.POSITIVE_INFINITY,
      }),
    ).toThrow(
      "Theoretical yield must be a finite number.",
    );
  });
});
