import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RlcBandwidthVariable =
  | "bandwidth"
  | "resonantFrequency"
  | "qualityFactor";

export type RlcBandwidthInput = {
  bandwidth?: number;
  resonantFrequency?: number;
  qualityFactor?: number;
  solveFor: RlcBandwidthVariable;
};

export type RlcBandwidthDetails = {
  bandwidth: number;
  resonantFrequency: number;
  qualityFactor: number;
  lowerHalfPowerFrequency?: number;
  upperHalfPowerFrequency?: number;
  solvedVariable: RlcBandwidthVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  RlcBandwidthVariable,
  string
> = {
  bandwidth: "Bandwidth",
  resonantFrequency: "Resonant frequency",
  qualityFactor: "Quality factor",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: RlcBandwidthVariable,
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

export function calculateRlcBandwidth({
  bandwidth,
  resonantFrequency,
  qualityFactor,
  solveFor,
}: RlcBandwidthInput): CalculationResult<RlcBandwidthDetails> {
  let calculatedBandwidth = bandwidth;
  let calculatedResonantFrequency =
    resonantFrequency;
  let calculatedQualityFactor = qualityFactor;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "bandwidth": {
      calculatedResonantFrequency =
        requirePositiveFiniteValue(
          resonantFrequency,
          "resonantFrequency",
        );

      calculatedQualityFactor =
        requirePositiveFiniteValue(
          qualityFactor,
          "qualityFactor",
        );

      calculatedBandwidth =
        calculatedResonantFrequency /
        calculatedQualityFactor;

      formula = "BW = f₀ ÷ Q";
      substitution =
        `BW = ${calculatedResonantFrequency} ÷ ` +
        `${calculatedQualityFactor}`;

      break;
    }

    case "resonantFrequency": {
      calculatedBandwidth =
        requirePositiveFiniteValue(
          bandwidth,
          "bandwidth",
        );

      calculatedQualityFactor =
        requirePositiveFiniteValue(
          qualityFactor,
          "qualityFactor",
        );

      calculatedResonantFrequency =
        calculatedBandwidth *
        calculatedQualityFactor;

      formula = "f₀ = BW × Q";
      substitution =
        `f₀ = ${calculatedBandwidth} × ` +
        `${calculatedQualityFactor}`;

      break;
    }

    case "qualityFactor": {
      calculatedBandwidth =
        requirePositiveFiniteValue(
          bandwidth,
          "bandwidth",
        );

      calculatedResonantFrequency =
        requirePositiveFiniteValue(
          resonantFrequency,
          "resonantFrequency",
        );

      calculatedQualityFactor =
        calculatedResonantFrequency /
        calculatedBandwidth;

      formula = "Q = f₀ ÷ BW";
      substitution =
        `Q = ${calculatedResonantFrequency} ÷ ` +
        `${calculatedBandwidth}`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported RLC bandwidth variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedBandwidth === undefined ||
    calculatedResonantFrequency === undefined ||
    calculatedQualityFactor === undefined ||
    !Number.isFinite(calculatedBandwidth) ||
    !Number.isFinite(calculatedResonantFrequency) ||
    !Number.isFinite(calculatedQualityFactor) ||
    calculatedBandwidth <= 0 ||
    calculatedResonantFrequency <= 0 ||
    calculatedQualityFactor <= 0
  ) {
    throw new Error(
      "The RLC bandwidth calculation could not be completed.",
    );
  }

  const halfBandwidth =
    calculatedBandwidth / 2;

  const lowerHalfPowerFrequency =
    calculatedResonantFrequency -
    halfBandwidth;

  const upperHalfPowerFrequency =
    calculatedResonantFrequency +
    halfBandwidth;

  const solvedValues: Record<
    RlcBandwidthVariable,
    number
  > = {
    bandwidth: calculatedBandwidth,
    resonantFrequency:
      calculatedResonantFrequency,
    qualityFactor: calculatedQualityFactor,
  };

  const solvedValue =
    solvedValues[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      bandwidth: calculatedBandwidth,
      resonantFrequency:
        calculatedResonantFrequency,
      qualityFactor:
        calculatedQualityFactor,
      lowerHalfPowerFrequency:
        lowerHalfPowerFrequency > 0
          ? lowerHalfPowerFrequency
          : undefined,
      upperHalfPowerFrequency,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
