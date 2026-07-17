import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type CapacitiveReactanceVariable =
  | "reactance"
  | "frequency"
  | "capacitance";

export type CapacitiveReactanceInput = {
  reactance?: number;
  frequency?: number;
  capacitance?: number;
  solveFor: CapacitiveReactanceVariable;
};

export type CapacitiveReactanceDetails = {
  reactance: number;
  frequency: number;
  capacitance: number;
  angularFrequency: number;
  solvedVariable: CapacitiveReactanceVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  CapacitiveReactanceVariable,
  string
> = {
  reactance: "Capacitive reactance",
  frequency: "Frequency",
  capacitance: "Capacitance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: CapacitiveReactanceVariable,
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

export function calculateCapacitiveReactance({
  reactance,
  frequency,
  capacitance,
  solveFor,
}: CapacitiveReactanceInput): CalculationResult<CapacitiveReactanceDetails> {
  let calculatedReactance = reactance;
  let calculatedFrequency = frequency;
  let calculatedCapacitance = capacitance;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "reactance": {
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

      calculatedReactance =
        1 /
        (
          2 *
          Math.PI *
          calculatedFrequency *
          calculatedCapacitance
        );

      formula = "Xc = 1 ÷ (2πfC)";
      substitution =
        `Xc = 1 ÷ (2 × π × ` +
        `${calculatedFrequency} × ` +
        `${calculatedCapacitance})`;

      break;
    }

    case "frequency": {
      calculatedReactance =
        requirePositiveFiniteValue(
          reactance,
          "reactance",
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
          calculatedCapacitance *
          calculatedReactance
        );

      formula = "f = 1 ÷ (2πCXc)";
      substitution =
        `f = 1 ÷ (2 × π × ` +
        `${calculatedCapacitance} × ` +
        `${calculatedReactance})`;

      break;
    }

    case "capacitance": {
      calculatedReactance =
        requirePositiveFiniteValue(
          reactance,
          "reactance",
        );

      calculatedFrequency =
        requirePositiveFiniteValue(
          frequency,
          "frequency",
        );

      calculatedCapacitance =
        1 /
        (
          2 *
          Math.PI *
          calculatedFrequency *
          calculatedReactance
        );

      formula = "C = 1 ÷ (2πfXc)";
      substitution =
        `C = 1 ÷ (2 × π × ` +
        `${calculatedFrequency} × ` +
        `${calculatedReactance})`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported capacitive reactance variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedReactance === undefined ||
    calculatedFrequency === undefined ||
    calculatedCapacitance === undefined ||
    !Number.isFinite(calculatedReactance) ||
    !Number.isFinite(calculatedFrequency) ||
    !Number.isFinite(calculatedCapacitance) ||
    calculatedReactance <= 0 ||
    calculatedFrequency <= 0 ||
    calculatedCapacitance <= 0
  ) {
    throw new Error(
      "The capacitive reactance calculation could not be completed.",
    );
  }

  const solvedValues: Record<
    CapacitiveReactanceVariable,
    number
  > = {
    reactance: calculatedReactance,
    frequency: calculatedFrequency,
    capacitance: calculatedCapacitance,
  };

  const solvedValue = solvedValues[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      reactance: calculatedReactance,
      frequency: calculatedFrequency,
      capacitance: calculatedCapacitance,
      angularFrequency:
        2 * Math.PI * calculatedFrequency,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
