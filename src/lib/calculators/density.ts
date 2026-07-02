import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type DensityVariable = "density" | "mass" | "volume";

export type DensityInput = {
  density?: number;
  mass?: number;
  volume?: number;
  solveFor: DensityVariable;
};

export type DensityDetails = {
  density: number;
  mass: number;
  volume: number;
  solvedVariable: DensityVariable;
  formula: string;
};

const variableLabels: Record<DensityVariable, string> = {
  density: "Density",
  mass: "Mass",
  volume: "Volume",
};

function requirePositiveValue(
  value: number | undefined,
  variable: DensityVariable,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(`${variableLabels[variable]} must be a finite number.`);
  }

  if (value <= 0) {
    throw new Error(`${variableLabels[variable]} must be greater than zero.`);
  }

  return value;
}

export function calculateDensity({
  density,
  mass,
  volume,
  solveFor,
}: DensityInput): CalculationResult<DensityDetails> {
  let calculatedDensity = density;
  let calculatedMass = mass;
  let calculatedVolume = volume;

  switch (solveFor) {
    case "density": {
      calculatedMass = requirePositiveValue(mass, "mass");
      calculatedVolume = requirePositiveValue(volume, "volume");
      calculatedDensity = calculatedMass / calculatedVolume;
      break;
    }

    case "mass": {
      calculatedDensity = requirePositiveValue(density, "density");
      calculatedVolume = requirePositiveValue(volume, "volume");
      calculatedMass = calculatedDensity * calculatedVolume;
      break;
    }

    case "volume": {
      calculatedMass = requirePositiveValue(mass, "mass");
      calculatedDensity = requirePositiveValue(density, "density");
      calculatedVolume = calculatedMass / calculatedDensity;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;
      throw new Error(`Unsupported density variable: ${exhaustiveCheck}`);
    }
  }

  const solvedValue = {
    density: calculatedDensity,
    mass: calculatedMass,
    volume: calculatedVolume,
  }[solveFor];

  if (
    calculatedDensity === undefined ||
    calculatedMass === undefined ||
    calculatedVolume === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error("The density calculation could not be completed.");
  }

  return {
    value: solvedValue,
    formattedValue: formatCalculatedNumber(solvedValue),
    details: {
      density: calculatedDensity,
      mass: calculatedMass,
      volume: calculatedVolume,
      solvedVariable: solveFor,
      formula: "ρ = m ÷ V",
    },
  };
}
