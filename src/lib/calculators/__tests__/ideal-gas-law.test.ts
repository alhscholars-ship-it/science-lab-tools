import {
  describe,
  expect,
  it,
} from "vitest";

import {
  calculateIdealGasLaw,
  convertPressureFromKpa,
  convertPressureToKpa,
  convertTemperatureFromKelvin,
  convertTemperatureToKelvin,
  convertVolumeFromLiters,
  convertVolumeToLiters,
  IDEAL_GAS_CONSTANT,
} from "../ideal-gas-law";

describe("ideal gas law conversions", () => {
  it("converts common pressure units", () => {
    expect(
      convertPressureToKpa(1, "atm"),
    ).toBeCloseTo(101.325, 10);

    expect(
      convertPressureToKpa(760, "mmHg"),
    ).toBeCloseTo(101.325, 10);

    expect(
      convertPressureFromKpa(
        101.325,
        "atm",
      ),
    ).toBeCloseTo(1, 10);
  });

  it("converts common volume units", () => {
    expect(
      convertVolumeToLiters(500, "mL"),
    ).toBeCloseTo(0.5, 10);

    expect(
      convertVolumeToLiters(1, "m3"),
    ).toBe(1000);

    expect(
      convertVolumeFromLiters(
        2.5,
        "mL",
      ),
    ).toBe(2500);
  });

  it("converts temperature units", () => {
    expect(
      convertTemperatureToKelvin(
        0,
        "C",
      ),
    ).toBeCloseTo(273.15, 10);

    expect(
      convertTemperatureToKelvin(
        32,
        "F",
      ),
    ).toBeCloseTo(273.15, 10);

    expect(
      convertTemperatureFromKelvin(
        273.15,
        "C",
      ),
    ).toBeCloseTo(0, 10);
  });
});

describe("calculateIdealGasLaw", () => {
  it("calculates pressure", () => {
    const result = calculateIdealGasLaw({
      volume: 22.414,
      moles: 1,
      temperature: 273.15,
      solveFor: "pressure",
      pressureUnit: "kPa",
      volumeUnit: "L",
      temperatureUnit: "K",
    });

    expect(result.value).toBeCloseTo(
      101.325,
      3,
    );

    expect(result.details.formula).toBe(
      "P × V = n × R × T",
    );

    expect(result.details.gasConstant).toBe(
      IDEAL_GAS_CONSTANT,
    );
  });

  it("calculates volume in milliliters", () => {
    const result = calculateIdealGasLaw({
      pressure: 1,
      moles: 1,
      temperature: 273.15,
      solveFor: "volume",
      pressureUnit: "atm",
      volumeUnit: "mL",
      temperatureUnit: "K",
    });

    expect(result.value).toBeCloseTo(
      22413.97,
      1,
    );

    expect(result.details.solvedUnit).toBe(
      "mL",
    );
  });

  it("calculates moles using mmHg and Celsius", () => {
    const result = calculateIdealGasLaw({
      pressure: 760,
      volume: 22.414,
      temperature: 0,
      solveFor: "moles",
      pressureUnit: "mmHg",
      volumeUnit: "L",
      temperatureUnit: "C",
    });

    expect(result.value).toBeCloseTo(
      1,
      5,
    );

    expect(result.formattedValue).toContain(
      "mol",
    );
  });

  it("calculates temperature in Celsius", () => {
    const result = calculateIdealGasLaw({
      pressure: 101325,
      volume: 0.022414,
      moles: 1,
      solveFor: "temperature",
      pressureUnit: "Pa",
      volumeUnit: "m3",
      temperatureUnit: "C",
    });

    expect(result.value).toBeCloseTo(
      0,
      3,
    );

    expect(result.details.temperatureKelvin).toBeCloseTo(
      273.15,
      3,
    );
  });

  it("supports Fahrenheit input", () => {
    const result = calculateIdealGasLaw({
      pressure: 1,
      volume: 22.414,
      temperature: 32,
      solveFor: "moles",
      pressureUnit: "atm",
      volumeUnit: "L",
      temperatureUnit: "F",
    });

    expect(result.value).toBeCloseTo(
      1,
      5,
    );
  });

  it("rejects zero pressure", () => {
    expect(() =>
      calculateIdealGasLaw({
        pressure: 0,
        volume: 22.414,
        temperature: 273.15,
        solveFor: "moles",
        pressureUnit: "kPa",
        volumeUnit: "L",
        temperatureUnit: "K",
      }),
    ).toThrow(
      "Pressure must be greater than zero.",
    );
  });

  it("rejects zero volume", () => {
    expect(() =>
      calculateIdealGasLaw({
        volume: 0,
        moles: 1,
        temperature: 273.15,
        solveFor: "pressure",
        pressureUnit: "kPa",
        volumeUnit: "L",
        temperatureUnit: "K",
      }),
    ).toThrow(
      "Volume must be greater than zero.",
    );
  });

  it("rejects zero moles", () => {
    expect(() =>
      calculateIdealGasLaw({
        pressure: 101.325,
        volume: 22.414,
        moles: 0,
        solveFor: "temperature",
        pressureUnit: "kPa",
        volumeUnit: "L",
        temperatureUnit: "K",
      }),
    ).toThrow(
      "Amount of gas must be greater than zero.",
    );
  });

  it("rejects absolute zero", () => {
    expect(() =>
      calculateIdealGasLaw({
        pressure: 101.325,
        volume: 22.414,
        temperature: -273.15,
        solveFor: "moles",
        pressureUnit: "kPa",
        volumeUnit: "L",
        temperatureUnit: "C",
      }),
    ).toThrow(
      "Temperature must be greater than absolute zero.",
    );
  });

  it("rejects non-finite inputs", () => {
    expect(() =>
      calculateIdealGasLaw({
        pressure: Number.NaN,
        volume: 22.414,
        temperature: 273.15,
        solveFor: "moles",
        pressureUnit: "kPa",
        volumeUnit: "L",
        temperatureUnit: "K",
      }),
    ).toThrow(
      "Pressure must be a finite number.",
    );
  });
});
