import { describe, expect, it } from "vitest";

import { calculateSeriesParallelResistance } from "../series-parallel-resistance";

describe("calculateSeriesParallelResistance", () => {
  it("calculates series resistance", () => {
    const result = calculateSeriesParallelResistance({
      mode: "series",
      resistances: [10, 20, 30],
    });

    expect(result.value).toBeCloseTo(60);
  });

  it("calculates parallel resistance", () => {
    const result = calculateSeriesParallelResistance({
      mode: "parallel",
      resistances: [10, 20],
    });

    expect(result.value).toBeCloseTo(6.6666667);
  });

  it("rejects less than two resistors", () => {
    expect(() =>
      calculateSeriesParallelResistance({
        mode: "series",
        resistances: [10],
      }),
    ).toThrow("Enter at least two resistance values.");
  });

  it("rejects zero resistance", () => {
    expect(() =>
      calculateSeriesParallelResistance({
        mode: "parallel",
        resistances: [10, 0],
      }),
    ).toThrow("Resistance values must be greater than zero.");
  });

  it("rejects negative resistance", () => {
    expect(() =>
      calculateSeriesParallelResistance({
        mode: "series",
        resistances: [10, -5],
      }),
    ).toThrow("Resistance values must be greater than zero.");
  });
});
