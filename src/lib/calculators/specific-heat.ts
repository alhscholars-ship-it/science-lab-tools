import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type SpecificHeatVariable =
  | "heatEnergy"
  | "mass"
  | "specificHeatCapacity"
  | "temperatureChange";

export type SpecificHeatInput = {
  heatEnergy?: number;
  mass?: number;
  specificHeatCapacity?: number;
  temperatureChange?: number;
  solveFor: SpecificHeatVariable;
};

export type SpecificHeatDetails = {
  heatEnergy: number;
  mass: number;
  specificHeatCapacity: number;
  temperatureChange: number;
  solvedVariable: SpecificHeatVariable;
  formula: string;
};

const variableLabels: Record<SpecificHeatVariable, string> = {
  heatEnergy: "Heat energy",
  mass: "Mass",
  specificHeatCapacity: "Specific heat capacity",
  temperatureChange: "Temperature change",
};

function requireFiniteValue(
  value: number | undefined,
  variable: SpecificHeatVariable,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(`${variableLabels[variable]} must be a finite number.`);
  }

  return value;
}

function requirePositiveValue(
  value: number | undefined,
  variable: "mass" | "specificHeatCapacity",
): number {
  const finiteValue = requireFiniteValue(value, variable);

  if (finiteValue <= 0) {
    throw new Error(`${variableLabels[variable]} must be greater than zero.`);
  }

  return finiteValue;
}

function requireNonZeroValue(
  value: number | undefined,
  variable: "heatEnergy" | "temperatureChange",
): number {
  const finiteValue = requireFiniteValue(value, variable);

  if (finiteValue === 0) {
    throw new Error(`${variableLabels[variable]} cannot be zero.`);
  }

  return finiteValue;
}

export function calculateSpecificHeat({
  heatEnergy,
  mass,
  specificHeatCapacity,
  temperatureChange,
  solveFor,
}: SpecificHeatInput): CalculationResult<SpecificHeatDetails> {
  let q = heatEnergy;
  let m = mass;
  let c = specificHeatCapacity;
  let deltaT = temperatureChange;

  switch (solveFor) {
    case "heatEnergy": {
      m = requirePositiveValue(m, "mass");
      c = requirePositiveValue(c, "specificHeatCapacity");
      deltaT = requireFiniteValue(deltaT, "temperatureChange");
      q = m * c * deltaT;
      break;
    }

    case "mass": {
      q = requireNonZeroValue(q, "heatEnergy");
      c = requirePositiveValue(c, "specificHeatCapacity");
      deltaT = requireNonZeroValue(deltaT, "temperatureChange");
      m = q / (c * deltaT);

      if (m <= 0) {
        throw new Error(
          "Heat energy and temperature change must have matching signs.",
        );
      }
      break;
    }

    case "specificHeatCapacity": {
      q = requireNonZeroValue(q, "heatEnergy");
      m = requirePositiveValue(m, "mass");
      deltaT = requireNonZeroValue(deltaT, "temperatureChange");
      c = q / (m * deltaT);

      if (c <= 0) {
        throw new Error(
          "Heat energy and temperature change must have matching signs.",
        );
      }
      break;
    }

    case "temperatureChange": {
      q = requireFiniteValue(q, "heatEnergy");
      m = requirePositiveValue(m, "mass");
      c = requirePositiveValue(c, "specificHeatCapacity");
      deltaT = q / (m * c);
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;
      throw new Error(
        `Unsupported specific heat variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    heatEnergy: q,
    mass: m,
    specificHeatCapacity: c,
    temperatureChange: deltaT,
  }[solveFor];

  if (
    q === undefined ||
    m === undefined ||
    c === undefined ||
    deltaT === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The specific heat calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue: formatCalculatedNumber(solvedValue),
    details: {
      heatEnergy: q,
      mass: m,
      specificHeatCapacity: c,
      temperatureChange: deltaT,
      solvedVariable: solveFor,
      formula: "q = m × c × ΔT",
    },
  };
}
