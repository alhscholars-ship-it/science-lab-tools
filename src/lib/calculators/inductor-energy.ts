import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type InductorEnergyVariable =
  | "energy"
  | "inductance"
  | "current";

export type InductorEnergyInput = {
  energy?: number;
  inductance?: number;
  current?: number;
  solveFor: InductorEnergyVariable;
};

export type InductorEnergyDetails = {
  energy: number;
  inductance: number;
  current: number;
  solvedVariable: InductorEnergyVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  InductorEnergyVariable,
  string
> = {
  energy: "Stored energy",
  inductance: "Inductance",
  current: "Electric current",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: InductorEnergyVariable,
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

export function calculateInductorEnergy({
  energy,
  inductance,
  current,
  solveFor,
}: InductorEnergyInput): CalculationResult<InductorEnergyDetails> {
  let calculatedEnergy = energy;
  let calculatedInductance = inductance;
  let calculatedCurrent = current;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "energy": {
      calculatedInductance =
        requirePositiveFiniteValue(
          inductance,
          "inductance",
        );

      calculatedCurrent =
        requirePositiveFiniteValue(
          current,
          "current",
        );

      calculatedEnergy =
        0.5 *
        calculatedInductance *
        calculatedCurrent ** 2;

      formula = "E = ½LI²";
      substitution =
        `E = ½ × ${calculatedInductance} × ` +
        `${calculatedCurrent}²`;

      break;
    }

    case "inductance": {
      calculatedEnergy =
        requirePositiveFiniteValue(
          energy,
          "energy",
        );

      calculatedCurrent =
        requirePositiveFiniteValue(
          current,
          "current",
        );

      calculatedInductance =
        (2 * calculatedEnergy) /
        calculatedCurrent ** 2;

      formula = "L = 2E ÷ I²";
      substitution =
        `L = 2 × ${calculatedEnergy} ÷ ` +
        `${calculatedCurrent}²`;

      break;
    }

    case "current": {
      calculatedEnergy =
        requirePositiveFiniteValue(
          energy,
          "energy",
        );

      calculatedInductance =
        requirePositiveFiniteValue(
          inductance,
          "inductance",
        );

      calculatedCurrent = Math.sqrt(
        (2 * calculatedEnergy) /
          calculatedInductance,
      );

      formula = "I = √(2E ÷ L)";
      substitution =
        `I = √(2 × ${calculatedEnergy} ÷ ` +
        `${calculatedInductance})`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported inductor energy variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedEnergy === undefined ||
    calculatedInductance === undefined ||
    calculatedCurrent === undefined ||
    !Number.isFinite(calculatedEnergy) ||
    !Number.isFinite(calculatedInductance) ||
    !Number.isFinite(calculatedCurrent) ||
    calculatedEnergy <= 0 ||
    calculatedInductance <= 0 ||
    calculatedCurrent <= 0
  ) {
    throw new Error(
      "The inductor energy calculation could not be completed.",
    );
  }

  const solvedValues: Record<
    InductorEnergyVariable,
    number
  > = {
    energy: calculatedEnergy,
    inductance: calculatedInductance,
    current: calculatedCurrent,
  };

  const solvedValue = solvedValues[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      energy: calculatedEnergy,
      inductance: calculatedInductance,
      current: calculatedCurrent,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
