import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type WaveSpeedVariable =
  | "waveSpeed"
  | "frequency"
  | "wavelength";

export type WaveSpeedInput = {
  waveSpeed?: number;
  frequency?: number;
  wavelength?: number;
  solveFor: WaveSpeedVariable;
};

export type WaveSpeedDetails = {
  waveSpeed: number;
  frequency: number;
  wavelength: number;
  solvedVariable: WaveSpeedVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  WaveSpeedVariable,
  string
> = {
  waveSpeed: "Wave speed",
  frequency: "Frequency",
  wavelength: "Wavelength",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: WaveSpeedVariable,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value) ||
    value <= 0
  ) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return value;
}

export function calculateWaveSpeed({
  waveSpeed,
  frequency,
  wavelength,
  solveFor,
}: WaveSpeedInput): CalculationResult<WaveSpeedDetails> {
  let calculatedWaveSpeed = waveSpeed;
  let calculatedFrequency = frequency;
  let calculatedWavelength = wavelength;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "waveSpeed": {
      calculatedFrequency =
        requirePositiveFiniteValue(
          frequency,
          "frequency",
        );

      calculatedWavelength =
        requirePositiveFiniteValue(
          wavelength,
          "wavelength",
        );

      calculatedWaveSpeed =
        calculatedFrequency *
        calculatedWavelength;

      formula = "v = f × λ";
      substitution =
        `v = ${calculatedFrequency} × ` +
        `${calculatedWavelength}`;

      break;
    }

    case "frequency": {
      calculatedWaveSpeed =
        requirePositiveFiniteValue(
          waveSpeed,
          "waveSpeed",
        );

      calculatedWavelength =
        requirePositiveFiniteValue(
          wavelength,
          "wavelength",
        );

      calculatedFrequency =
        calculatedWaveSpeed /
        calculatedWavelength;

      formula = "f = v ÷ λ";
      substitution =
        `f = ${calculatedWaveSpeed} ÷ ` +
        `${calculatedWavelength}`;

      break;
    }

    case "wavelength": {
      calculatedWaveSpeed =
        requirePositiveFiniteValue(
          waveSpeed,
          "waveSpeed",
        );

      calculatedFrequency =
        requirePositiveFiniteValue(
          frequency,
          "frequency",
        );

      calculatedWavelength =
        calculatedWaveSpeed /
        calculatedFrequency;

      formula = "λ = v ÷ f";
      substitution =
        `λ = ${calculatedWaveSpeed} ÷ ` +
        `${calculatedFrequency}`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported wave speed variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedWaveSpeed === undefined ||
    calculatedFrequency === undefined ||
    calculatedWavelength === undefined ||
    !Number.isFinite(calculatedWaveSpeed) ||
    !Number.isFinite(calculatedFrequency) ||
    !Number.isFinite(calculatedWavelength) ||
    calculatedWaveSpeed <= 0 ||
    calculatedFrequency <= 0 ||
    calculatedWavelength <= 0
  ) {
    throw new Error(
      "The wave speed calculation could not be completed.",
    );
  }

  const solvedValue = {
    waveSpeed: calculatedWaveSpeed,
    frequency: calculatedFrequency,
    wavelength: calculatedWavelength,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      waveSpeed: calculatedWaveSpeed,
      frequency: calculatedFrequency,
      wavelength: calculatedWavelength,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
