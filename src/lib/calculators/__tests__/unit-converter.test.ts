import { describe, expect, it } from "vitest";

import { convertUnit, quantities } from "../unit-converter";

describe("unit converter", () => {
  it.each([
    [1, "length", "meter", "centimeter", 100],
    [1, "mass", "kilogram", "gram", 1000],
    [1, "volume", "liter", "milliliter", 1000],
    [1, "pressure", "atmosphere", "pascal", 101325],
    [1, "energy", "kilowatt-hour", "joule", 3_600_000],
  ])("converts %s %s from %s to %s", (value, quantity, from, to, expected) => {
    expect(convertUnit(value as number, quantity as string, from as string, to as string).value)
      .toBeCloseTo(expected as number, 8);
  });

  it("handles temperature offsets in both directions", () => {
    expect(convertUnit(0, "temperature", "celsius", "fahrenheit").value).toBeCloseTo(32);
    expect(convertUnit(32, "temperature", "fahrenheit", "celsius").value).toBeCloseTo(0);
    expect(convertUnit(0, "temperature", "celsius", "kelvin").value).toBeCloseTo(273.15);
  });

  it("round-trips every unit through its category base unit", () => {
    for (const quantity of quantities) {
      for (const unit of quantity.units) {
        const converted = convertUnit(12.345, quantity.id, unit.id, quantity.units[0].id);
        const roundTrip = convertUnit(converted.value, quantity.id, quantity.units[0].id, unit.id);
        expect(roundTrip.value).toBeCloseTo(12.345, 8);
      }
    }
  });

  it("rejects invalid values and incompatible units", () => {
    expect(() => convertUnit(Number.NaN, "length", "meter", "foot")).toThrow("finite");
    expect(() => convertUnit(1, "length", "meter", "gram")).toThrow("same measurement type");
  });
});
