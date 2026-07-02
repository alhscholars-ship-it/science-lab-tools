import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type DilutionVariable =
  | "initialConcentration"
  | "initialVolume"
  | "finalConcentration"
  | "finalVolume";

export type DilutionInput = {
  initialConcentration?: number;
  initialVolume?: number;
  finalConcentration?: number;
  finalVolume?: number;
  solveFor: DilutionVariable;
};

export type DilutionDetails = {
  initialConcentration: number;
  initialVolume: number;
  finalConcentration: number;
  finalVolume: number;
  solvedVariable: DilutionVariable;
  formula: string;
};

const variableLabels: Record<DilutionVariable, string> = {
  initialConcentration: "Initial concentration",
  initialVolume: "Initial volume",
  finalConcentration: "Final concentration",
  finalVolume: "Final volume",
};

function requirePositiveValue(
  value: number | undefined,
  variable: DilutionVariable,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(`${variableLabels[variable]} must be a finite number.`);
  }

  if (value <= 0) {
    throw new Error(`${variableLabels[variable]} must be greater than zero.`);
  }

  return value;
}

export function calculateDilution({
  initialConcentration,
  initialVolume,
  finalConcentration,
  finalVolume,
  solveFor,
}: DilutionInput): CalculationResult<DilutionDetails> {
  let M1 = initialConcentration;
  let V1 = initialVolume;
  let M2 = finalConcentration;
  let V2 = finalVolume;

  switch (solveFor) {
    case "initialConcentration": {
      V1 = requirePositiveValue(V1, "initialVolume");
      M2 = requirePositiveValue(M2, "finalConcentration");
      V2 = requirePositiveValue(V2, "finalVolume");
      M1 = (M2 * V2) / V1;
      break;
    }

    case "initialVolume": {
      M1 = requirePositiveValue(M1, "initialConcentration");
      M2 = requirePositiveValue(M2, "finalConcentration");
      V2 = requirePositiveValue(V2, "finalVolume");
      V1 = (M2 * V2) / M1;
      break;
    }

    case "finalConcentration": {
      M1 = requirePositiveValue(M1, "initialConcentration");
      V1 = requirePositiveValue(V1, "initialVolume");
      V2 = requirePositiveValue(V2, "finalVolume");
      M2 = (M1 * V1) / V2;
      break;
    }

    case "finalVolume": {
      M1 = requirePositiveValue(M1, "initialConcentration");
      V1 = requirePositiveValue(V1, "initialVolume");
      M2 = requirePositiveValue(M2, "finalConcentration");
      V2 = (M1 * V1) / M2;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;
      throw new Error(`Unsupported dilution variable: ${exhaustiveCheck}`);
    }
  }

  const solvedValue = {
    initialConcentration: M1,
    initialVolume: V1,
    finalConcentration: M2,
    finalVolume: V2,
  }[solveFor];

  if (
    M1 === undefined ||
    V1 === undefined ||
    M2 === undefined ||
    V2 === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error("The dilution calculation could not be completed.");
  }

  return {
    value: solvedValue,
    formattedValue: formatCalculatedNumber(solvedValue),
    details: {
      initialConcentration: M1,
      initialVolume: V1,
      finalConcentration: M2,
      finalVolume: V2,
      solvedVariable: solveFor,
      formula: "M₁V₁ = M₂V₂",
    },
  };
}
