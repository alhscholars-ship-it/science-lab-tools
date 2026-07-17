import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type InductiveReactanceVariable =
  | "reactance"
  | "frequency"
  | "inductance";

export type InductiveReactanceInput = {
  reactance?: number;
  frequency?: number;
  inductance?: number;
  solveFor: InductiveReactanceVariable;
};

export type InductiveReactanceDetails = {
  reactance: number;
  frequency: number;
  inductance: number;
  angularFrequency: number;
  solvedVariable: InductiveReactanceVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  InductiveReactanceVariable,
  string
> = {
  reactance: "Inductive reactance",
  frequency: "Frequency",
  inductance: "Inductance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: InductiveReactanceVariable,
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

export function calculateInductiveReactance({
  reactance,
  frequency,
  inductance,
  solveFor,
}: InductiveReactanceInput): CalculationResult<InductiveReactanceDetails> {
  let calculatedReactance = reactance;
  let calculatedFrequency = frequency;
  let calculatedInductance = inductance;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "reactance": {
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

      calculatedReactance =
        2 *
        Math.PI *
        calculatedFrequency *
        calculatedInductance;

      formula = "Xₗ = 2πfL";
      substitution =
        `Xₗ = 2 × π × ${calculatedFrequency} × ` +
        `${calculatedInductance}`;

      break;
    }

    case "frequency": {
      calculatedReactance =
        requirePositiveFiniteValue(
          reactance,
          "reactance",
        );

      calculatedInductance =
        requirePositiveFiniteValue(
          inductance,
          "inductance",
        );

      calculatedFrequency =
        calculatedReactance /
        (
          2 *
          Math.PI *
          calculatedInductance
        );

      formula = "f = Xₗ ÷ (2πL)";
      substitution =
        `f = ${calculatedReactance} ÷ ` +
        `(2 × π × ${calculatedInductance})`;

      break;
    }

    case "inductance": {
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

      calculatedInductance =
        calculatedReactance /
        (
          2 *
          Math.PI *
          calculatedFrequency
        );

      formula = "L = Xₗ ÷ (2πf)";
      substitution =
        `L = ${calculatedReactance} ÷ ` +
        `(2 × π × ${calculatedFrequency})`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported inductive reactance variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedReactance === undefined ||
    calculatedFrequency === undefined ||
    calculatedInductance === undefined ||
    !Number.isFinite(calculatedReactance) ||
    !Number.isFinite(calculatedFrequency) ||
    !Number.isFinite(calculatedInductance) ||
    calculatedReactance <= 0 ||
    calculatedFrequency <= 0 ||
    calculatedInductance <= 0
  ) {
    throw new Error(
      "The inductive reactance calculation could not be completed.",
    );
  }

  const solvedValues: Record<
    InductiveReactanceVariable,
    number
  > = {
    reactance: calculatedReactance,
    frequency: calculatedFrequency,
    inductance: calculatedInductance,
  };

  const solvedValue = solvedValues[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      reactance: calculatedReactance,
      frequency: calculatedFrequency,
      inductance: calculatedInductance,
      angularFrequency:
        2 * Math.PI * calculatedFrequency,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
