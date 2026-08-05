import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type NormalityVolumeUnit = "L" | "mL";

export type NormalityVariable =
  | "equivalents"
  | "solutionVolume"
  | "normality";

export type NormalityInput = {
  equivalents?: number;
  solutionVolume?: number;
  volumeUnit: NormalityVolumeUnit;
  normality?: number;
  solveFor: NormalityVariable;
};

export type NormalityDetails = {
  equivalents: number;
  solutionVolume: number;
  volumeUnit: NormalityVolumeUnit;
  volumeInLiters: number;
  normality: number;
  solvedVariable: NormalityVariable;
  formula: string;
};

const variableLabels: Record<
  NormalityVariable,
  string
> = {
  equivalents: "Solute equivalents",
  solutionVolume: "Solution volume",
  normality: "Normality",
};

export function convertSolutionVolumeToLiters(
  volume: number,
  unit: NormalityVolumeUnit,
): number {
  if (!Number.isFinite(volume)) {
    throw new Error(
      "Solution volume must be a finite number.",
    );
  }

  if (volume <= 0) {
    throw new Error(
      "Solution volume must be greater than zero.",
    );
  }

  if (unit === "L") {
    return volume;
  }

  if (unit === "mL") {
    return volume / 1000;
  }

  throw new Error(
    "Unsupported solution volume unit.",
  );
}

function convertLitersToSolutionVolume(
  liters: number,
  unit: NormalityVolumeUnit,
): number {
  if (unit === "L") {
    return liters;
  }

  if (unit === "mL") {
    return liters * 1000;
  }

  throw new Error(
    "Unsupported solution volume unit.",
  );
}

function requireEquivalents(
  value: number | undefined,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      "Solute equivalents must be a finite number.",
    );
  }

  if (value < 0) {
    throw new Error(
      "Solute equivalents cannot be negative.",
    );
  }

  return value;
}

function requireNormality(
  value: number | undefined,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      "Normality must be a finite number.",
    );
  }

  if (value < 0) {
    throw new Error(
      "Normality cannot be negative.",
    );
  }

  return value;
}

function requireSolutionVolume(
  value: number | undefined,
  unit: NormalityVolumeUnit,
): {
  originalVolume: number;
  volumeInLiters: number;
} {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      "Solution volume must be a finite number.",
    );
  }

  return {
    originalVolume: value,
    volumeInLiters:
      convertSolutionVolumeToLiters(
        value,
        unit,
      ),
  };
}

export function calculateNormality({
  equivalents,
  solutionVolume,
  volumeUnit,
  normality,
  solveFor,
}: NormalityInput): CalculationResult<NormalityDetails> {
  let calculatedEquivalents = equivalents;
  let calculatedSolutionVolume =
    solutionVolume;
  let calculatedNormality = normality;
  let volumeInLiters: number;

  switch (solveFor) {
    case "equivalents": {
      calculatedNormality =
        requireNormality(normality);

      const volume = requireSolutionVolume(
        solutionVolume,
        volumeUnit,
      );

      calculatedSolutionVolume =
        volume.originalVolume;
      volumeInLiters =
        volume.volumeInLiters;

      calculatedEquivalents =
        calculatedNormality *
        volumeInLiters;

      break;
    }

    case "solutionVolume": {
      calculatedEquivalents =
        requireEquivalents(equivalents);

      calculatedNormality =
        requireNormality(normality);

      if (calculatedEquivalents <= 0) {
        throw new Error(
          "Solute equivalents must be greater than zero when calculating solution volume.",
        );
      }

      if (calculatedNormality <= 0) {
        throw new Error(
          "Normality must be greater than zero when calculating solution volume.",
        );
      }

      volumeInLiters =
        calculatedEquivalents /
        calculatedNormality;

      calculatedSolutionVolume =
        convertLitersToSolutionVolume(
          volumeInLiters,
          volumeUnit,
        );

      break;
    }

    case "normality": {
      calculatedEquivalents =
        requireEquivalents(equivalents);

      const volume = requireSolutionVolume(
        solutionVolume,
        volumeUnit,
      );

      calculatedSolutionVolume =
        volume.originalVolume;
      volumeInLiters =
        volume.volumeInLiters;

      calculatedNormality =
        calculatedEquivalents /
        volumeInLiters;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported normality variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedEquivalents === undefined ||
    calculatedSolutionVolume === undefined ||
    calculatedNormality === undefined ||
    !Number.isFinite(calculatedEquivalents) ||
    !Number.isFinite(calculatedSolutionVolume) ||
    !Number.isFinite(calculatedNormality) ||
    !Number.isFinite(volumeInLiters)
  ) {
    throw new Error(
      "The normality calculation could not be completed.",
    );
  }

  if (
    calculatedSolutionVolume <= 0 ||
    volumeInLiters <= 0
  ) {
    throw new Error(
      "Solution volume must be greater than zero.",
    );
  }

  const solvedValue = {
    equivalents: calculatedEquivalents,
    solutionVolume:
      calculatedSolutionVolume,
    normality: calculatedNormality,
  }[solveFor];

  const formattedValue = {
    equivalents:
      `${formatCalculatedNumber(solvedValue)} eq`,
    solutionVolume:
      `${formatCalculatedNumber(solvedValue)} ${volumeUnit}`,
    normality:
      `${formatCalculatedNumber(solvedValue)} N`,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue,
    details: {
      equivalents: calculatedEquivalents,
      solutionVolume:
        calculatedSolutionVolume,
      volumeUnit,
      volumeInLiters,
      normality: calculatedNormality,
      solvedVariable: solveFor,
      formula:
        "N = equivalents ÷ L solution",
    },
  };
}

export function getNormalityVariableLabel(
  variable: NormalityVariable,
): string {
  return variableLabels[variable];
}
