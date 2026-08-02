import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type IdealGasVariable =
  | "pressure"
  | "volume"
  | "moles"
  | "temperature";

export type IdealGasPressureUnit =
  | "Pa"
  | "kPa"
  | "bar"
  | "atm"
  | "mmHg";

export type IdealGasVolumeUnit =
  | "mL"
  | "L"
  | "m3";

export type IdealGasTemperatureUnit =
  | "K"
  | "C"
  | "F";

export type IdealGasLawInput = {
  pressure?: number;
  volume?: number;
  moles?: number;
  temperature?: number;
  solveFor: IdealGasVariable;
  pressureUnit: IdealGasPressureUnit;
  volumeUnit: IdealGasVolumeUnit;
  temperatureUnit: IdealGasTemperatureUnit;
};

export type IdealGasLawDetails = {
  pressureKpa: number;
  volumeLiters: number;
  moles: number;
  temperatureKelvin: number;
  solvedVariable: IdealGasVariable;
  solvedUnit: string;
  formula: string;
  gasConstant: number;
};

export const IDEAL_GAS_CONSTANT =
  8.31446261815324;

const variableLabels: Record<
  IdealGasVariable,
  string
> = {
  pressure: "Pressure",
  volume: "Volume",
  moles: "Amount of gas",
  temperature: "Temperature",
};

const pressureFactorsToKpa: Record<
  IdealGasPressureUnit,
  number
> = {
  Pa: 0.001,
  kPa: 1,
  bar: 100,
  atm: 101.325,
  mmHg: 101.325 / 760,
};

const volumeFactorsToLiters: Record<
  IdealGasVolumeUnit,
  number
> = {
  mL: 0.001,
  L: 1,
  m3: 1000,
};

function requirePositiveValue(
  value: number | undefined,
  variable: Exclude<
    IdealGasVariable,
    "temperature"
  >,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  if (value <= 0) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return value;
}

function requireFiniteTemperature(
  value: number | undefined,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      "Temperature must be a finite number.",
    );
  }

  return value;
}

export function convertPressureToKpa(
  pressure: number,
  unit: IdealGasPressureUnit,
): number {
  const factor = pressureFactorsToKpa[unit];

  if (factor === undefined) {
    throw new Error(
      "Unsupported pressure unit.",
    );
  }

  return pressure * factor;
}

export function convertPressureFromKpa(
  pressureKpa: number,
  unit: IdealGasPressureUnit,
): number {
  const factor = pressureFactorsToKpa[unit];

  if (factor === undefined) {
    throw new Error(
      "Unsupported pressure unit.",
    );
  }

  return pressureKpa / factor;
}

export function convertVolumeToLiters(
  volume: number,
  unit: IdealGasVolumeUnit,
): number {
  const factor = volumeFactorsToLiters[unit];

  if (factor === undefined) {
    throw new Error(
      "Unsupported volume unit.",
    );
  }

  return volume * factor;
}

export function convertVolumeFromLiters(
  volumeLiters: number,
  unit: IdealGasVolumeUnit,
): number {
  const factor = volumeFactorsToLiters[unit];

  if (factor === undefined) {
    throw new Error(
      "Unsupported volume unit.",
    );
  }

  return volumeLiters / factor;
}

export function convertTemperatureToKelvin(
  temperature: number,
  unit: IdealGasTemperatureUnit,
): number {
  let temperatureKelvin: number;

  switch (unit) {
    case "K":
      temperatureKelvin = temperature;
      break;

    case "C":
      temperatureKelvin =
        temperature + 273.15;
      break;

    case "F":
      temperatureKelvin =
        ((temperature - 32) * 5) / 9 +
        273.15;
      break;

    default: {
      const exhaustiveCheck: never = unit;

      throw new Error(
        `Unsupported temperature unit: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    !Number.isFinite(temperatureKelvin)
  ) {
    throw new Error(
      "Temperature conversion could not be completed.",
    );
  }

  if (temperatureKelvin <= 0) {
    throw new Error(
      "Temperature must be greater than absolute zero.",
    );
  }

  return temperatureKelvin;
}

export function convertTemperatureFromKelvin(
  temperatureKelvin: number,
  unit: IdealGasTemperatureUnit,
): number {
  switch (unit) {
    case "K":
      return temperatureKelvin;

    case "C":
      return temperatureKelvin - 273.15;

    case "F":
      return (
        ((temperatureKelvin - 273.15) *
          9) /
          5 +
        32
      );

    default: {
      const exhaustiveCheck: never = unit;

      throw new Error(
        `Unsupported temperature unit: ${exhaustiveCheck}`,
      );
    }
  }
}

function getSolvedUnit(
  solveFor: IdealGasVariable,
  pressureUnit: IdealGasPressureUnit,
  volumeUnit: IdealGasVolumeUnit,
  temperatureUnit: IdealGasTemperatureUnit,
): string {
  switch (solveFor) {
    case "pressure":
      return pressureUnit;

    case "volume":
      return volumeUnit === "m3"
        ? "m³"
        : volumeUnit;

    case "moles":
      return "mol";

    case "temperature":
      return temperatureUnit === "C"
        ? "°C"
        : temperatureUnit === "F"
          ? "°F"
          : "K";

    default: {
      const exhaustiveCheck: never =
        solveFor;

      throw new Error(
        `Unsupported ideal gas variable: ${exhaustiveCheck}`,
      );
    }
  }
}

export function calculateIdealGasLaw({
  pressure,
  volume,
  moles,
  temperature,
  solveFor,
  pressureUnit,
  volumeUnit,
  temperatureUnit,
}: IdealGasLawInput): CalculationResult<IdealGasLawDetails> {
  let pressureKpa =
    solveFor === "pressure"
      ? undefined
      : convertPressureToKpa(
          requirePositiveValue(
            pressure,
            "pressure",
          ),
          pressureUnit,
        );

  let volumeLiters =
    solveFor === "volume"
      ? undefined
      : convertVolumeToLiters(
          requirePositiveValue(
            volume,
            "volume",
          ),
          volumeUnit,
        );

  let calculatedMoles =
    solveFor === "moles"
      ? undefined
      : requirePositiveValue(
          moles,
          "moles",
        );

  let temperatureKelvin =
    solveFor === "temperature"
      ? undefined
      : convertTemperatureToKelvin(
          requireFiniteTemperature(
            temperature,
          ),
          temperatureUnit,
        );

  switch (solveFor) {
    case "pressure":
      pressureKpa =
        (calculatedMoles! *
          IDEAL_GAS_CONSTANT *
          temperatureKelvin!) /
        volumeLiters!;
      break;

    case "volume":
      volumeLiters =
        (calculatedMoles! *
          IDEAL_GAS_CONSTANT *
          temperatureKelvin!) /
        pressureKpa!;
      break;

    case "moles":
      calculatedMoles =
        (pressureKpa! * volumeLiters!) /
        (IDEAL_GAS_CONSTANT *
          temperatureKelvin!);
      break;

    case "temperature":
      temperatureKelvin =
        (pressureKpa! * volumeLiters!) /
        (calculatedMoles! *
          IDEAL_GAS_CONSTANT);
      break;

    default: {
      const exhaustiveCheck: never =
        solveFor;

      throw new Error(
        `Unsupported ideal gas variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    pressureKpa === undefined ||
    volumeLiters === undefined ||
    calculatedMoles === undefined ||
    temperatureKelvin === undefined ||
    !Number.isFinite(pressureKpa) ||
    !Number.isFinite(volumeLiters) ||
    !Number.isFinite(calculatedMoles) ||
    !Number.isFinite(temperatureKelvin) ||
    pressureKpa <= 0 ||
    volumeLiters <= 0 ||
    calculatedMoles <= 0 ||
    temperatureKelvin <= 0
  ) {
    throw new Error(
      "The ideal gas law calculation could not be completed.",
    );
  }

  const solvedValue = {
    pressure: convertPressureFromKpa(
      pressureKpa,
      pressureUnit,
    ),
    volume: convertVolumeFromLiters(
      volumeLiters,
      volumeUnit,
    ),
    moles: calculatedMoles,
    temperature:
      convertTemperatureFromKelvin(
        temperatureKelvin,
        temperatureUnit,
      ),
  }[solveFor];

  const solvedUnit = getSolvedUnit(
    solveFor,
    pressureUnit,
    volumeUnit,
    temperatureUnit,
  );

  return {
    value: solvedValue,
    formattedValue:
      `${formatCalculatedNumber(solvedValue)} ${solvedUnit}`,
    details: {
      pressureKpa,
      volumeLiters,
      moles: calculatedMoles,
      temperatureKelvin,
      solvedVariable: solveFor,
      solvedUnit,
      formula: "P × V = n × R × T",
      gasConstant: IDEAL_GAS_CONSTANT,
    },
  };
}
