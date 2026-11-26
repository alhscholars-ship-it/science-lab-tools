import { describe, expect, it } from "vitest";

import { extractValues } from "../value-extractor";

describe("Science AI value extraction", () => {
  it("extracts values with spaces", () => {
    expect(extractValues("mass 5 kg acceleration 3 m/s²"))
      .toEqual([
        { value: 5, unit: "kg" },
        { value: 3, unit: "m/s²" },
      ]);
  });

  it("extracts values without spaces", () => {
    expect(extractValues("mass 5kg acceleration 3m/s2"))
      .toEqual([
        { value: 5, unit: "kg" },
        { value: 3, unit: "m/s2" },
      ]);
  });

  it("supports decimal values", () => {
    expect(extractValues("mass 2.5 kg acceleration 4.2 m/s²"))
      .toEqual([
        { value: 2.5, unit: "kg" },
        { value: 4.2, unit: "m/s²" },
      ]);
  });


  it("extracts velocity in meters per second", () => {
    expect(extractValues("mass 4 kg velocity 3 m/s"))
      .toEqual([
        { value: 4, unit: "kg" },
        { value: 3, unit: "m/s" },
      ]);
  });

  it("extracts velocity without spaces", () => {
    expect(extractValues("mass 4kg velocity 3m/s"))
      .toEqual([
        { value: 4, unit: "kg" },
        { value: 3, unit: "m/s" },
      ]);
  });

  it("keeps velocity and acceleration units distinct", () => {
    expect(extractValues("velocity 3 m/s acceleration 2 m/s²"))
      .toEqual([
        { value: 3, unit: "m/s" },
        { value: 2, unit: "m/s²" },
      ]);
  });

  it("supports decimal velocity", () => {
    expect(extractValues("velocity 2.5 m/s"))
      .toEqual([
        { value: 2.5, unit: "m/s" },
      ]);
  });

  it("returns empty results when no values exist", () => {
    expect(extractValues("What is Newton's second law?"))
      .toEqual([]);
  });
});
