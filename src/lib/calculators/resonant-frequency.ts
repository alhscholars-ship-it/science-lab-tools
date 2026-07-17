import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type ResonantFrequencyVariable =
  | "frequency"
  | "inductance"
  | "capacitance";

export type ResonantFrequencyInput = {
  frequency?: number;
  inductance?: number;
  capacitance?: number;
  solveFor: ResonantFrequencyVariable;
};

export type ResonantFrequencyDetails = {
  frequency: number;
  inductance: number;
  capacitance: number;
  angularFrequency: number;
  solvedVariable: ResonantFrequencyVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  ResonantFrequencyVariable,
  string
> = {
  frequency: "Resonant frequency",
  inductance: "Inductance",
  capacitance: "Capacitance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: ResonantFrequencyVariable,
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

export function calculateResonantFrequency({
  frequency,
  inductance,
  capacitance,
  solveFor,
}: ResonantFrequencyInput): CalculationResult<ResonantFrequencyDetails> {
  let calculatedFrequency = frequency;
  let calculatedInductance = inductance;
  let calculatedCapacitance = capacitance;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "frequency": {
      calculatedInductance =
        requirePositiveFiniteValue(
          inductance,
          "inductance",
        );

      calculatedCapacitance =
        requirePositiveFiniteValue(
          capacitance,
          "capacitance",
        );

      calculatedFrequency =
        1 /
        (
          2 *
          Math.PI *
          Math.sqrt(
            calculatedInductance *
            calculatedCapacitance,
          )
        );

      formula = "f₀ = 1 ÷ (2π√LC)";
      substitution =
        `f₀ = 1 ÷ (2 × π × √(` +
        `${calculatedInductance} × ` +
        `${calculatedCapacitance}))`;

      break;
    }

    case "inductance": {
      calculatedFrequency =
        requirePositiveFiniteValue(
          frequency,
          "frequency",
        );

      calculatedCapacitance =
        requirePositiveFiniteValue(
          capacitance,
          "capacitance",
        );

      calculatedInductance =
        1 /
        (
          4 *
          Math.PI ** 2 *
          calculatedFrequency ** 2 *
          calculatedCapacitance
        );

      formula = "L = 1 ÷ (4π²f₀²C)";
      substitution =
        `L = 1 ÷ (4 × π² × ` +
        `${calculatedFrequency}² × ` +
        `${calculatedCapacitance})`;

      break;
    }

    case "capacitance": {
      calculatedFrequency =
        requirePositiveFiniteValue(
          frequency,
          "frequency",
        );

      calculatedInductance =
        requirePositiveFiniteValue(
          inductance,
          "inductance",
        );

      calculatedCapacitance =
        1 /
        (
          4 *
          Math.PI ** 2 *
          calculatedFrequency ** 2 *
          calculatedInductance
        );

      formula = "C = 1 ÷ (4π²f₀²L)";
      substitution =
        `C = 1 ÷ (4 × π² × ` +
        `${calculatedFrequency}² × ` +
        `${calculatedInductance})`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported resonant frequency variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedFrequency === undefined ||
    calculatedInductance === undefined ||
    calculatedCapacitance === undefined ||
    !Number.isFinite(calculatedFrequency) ||
    !Number.isFinite(calculatedInductance) ||
    !Number.isFinite(calculatedCapacitance) ||
    calculatedFrequency <= 0 ||
    calculatedInductance <= 0 ||
    calculatedCapacitance <= 0
  ) {
    throw new Error(
      "The resonant frequency calculation could not be completed.",
    );
  }

  const solvedValues: Record<
    ResonantFrequencyVariable,
    number
  > = {
    frequency: calculatedFrequency,
    inductance: calculatedInductance,
    capacitance: calculatedCapacitance,
  };

  const solvedValue = solvedValues[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      frequency: calculatedFrequency,
      inductance: calculatedInductance,
      capacitance: calculatedCapacitance,
      angularFrequency:
        2 * Math.PI * calculatedFrequency,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
