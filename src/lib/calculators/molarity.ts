import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type VolumeUnit = "L" | "mL";

export type MolarityInput = {
  molesOfSolute: number;
  solutionVolume: number;
  volumeUnit: VolumeUnit;
};

export type MolarityDetails = {
  molesOfSolute: number;
  originalVolume: number;
  volumeUnit: VolumeUnit;
  volumeInLiters: number;
  formula: string;
};

export function convertVolumeToLiters(
  volume: number,
  unit: VolumeUnit,
): number {
  if (!Number.isFinite(volume)) {
    throw new Error("Solution volume must be a finite number.");
  }

  if (volume <= 0) {
    throw new Error("Solution volume must be greater than zero.");
  }

  if (unit === "L") {
    return volume;
  }

  if (unit === "mL") {
    return volume / 1000;
  }

  throw new Error("Unsupported volume unit.");
}

export function calculateMolarity({
  molesOfSolute,
  solutionVolume,
  volumeUnit,
}: MolarityInput): CalculationResult<MolarityDetails> {
  if (!Number.isFinite(molesOfSolute)) {
    throw new Error("Moles of solute must be a finite number.");
  }

  if (molesOfSolute < 0) {
    throw new Error("Moles of solute cannot be negative.");
  }

  const volumeInLiters = convertVolumeToLiters(
    solutionVolume,
    volumeUnit,
  );

  const molarity = molesOfSolute / volumeInLiters;

  return {
    value: molarity,
    formattedValue: `${formatCalculatedNumber(molarity)} mol/L`,
    details: {
      molesOfSolute,
      originalVolume: solutionVolume,
      volumeUnit,
      volumeInLiters,
      formula: "M = n ÷ V",
    },
  };
}
