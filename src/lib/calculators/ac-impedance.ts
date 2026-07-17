import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type AcImpedanceVariable =
  | "impedance"
  | "resistance"
  | "inductiveReactance"
  | "capacitiveReactance";

export type AcImpedanceInput = {
  impedance?: number;
  resistance?: number;
  inductiveReactance?: number;
  capacitiveReactance?: number;
  solveFor: AcImpedanceVariable;
};

export type AcImpedanceDetails = {
  impedance: number;
  resistance: number;
  inductiveReactance: number;
  capacitiveReactance: number;
  reactanceDifference: number;
  solvedVariable: AcImpedanceVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  AcImpedanceVariable,
  string
> = {
  impedance: "Impedance",
  resistance: "Resistance",
  inductiveReactance: "Inductive reactance",
  capacitiveReactance: "Capacitive reactance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: AcImpedanceVariable,
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

function calculateReactanceMagnitude(
  impedance: number,
  resistance: number,
): number {
  const radicand =
    impedance ** 2 -
    resistance ** 2;

  if (radicand < 0) {
    throw new Error(
      "Impedance must be greater than or equal to resistance.",
    );
  }

  return Math.sqrt(radicand);
}

export function calculateAcImpedance({
  impedance,
  resistance,
  inductiveReactance,
  capacitiveReactance,
  solveFor,
}: AcImpedanceInput): CalculationResult<AcImpedanceDetails> {
  let calculatedImpedance = impedance;
  let calculatedResistance = resistance;
  let calculatedInductiveReactance =
    inductiveReactance;
  let calculatedCapacitiveReactance =
    capacitiveReactance;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "impedance": {
      calculatedResistance =
        requirePositiveFiniteValue(
          resistance,
          "resistance",
        );
      calculatedInductiveReactance =
        requirePositiveFiniteValue(
          inductiveReactance,
          "inductiveReactance",
        );
      calculatedCapacitiveReactance =
        requirePositiveFiniteValue(
          capacitiveReactance,
          "capacitiveReactance",
        );

      calculatedImpedance = Math.sqrt(
        calculatedResistance ** 2 +
          (
            calculatedInductiveReactance -
            calculatedCapacitiveReactance
          ) ** 2,
      );

      formula = "Z = √(R² + (Xₗ − Xc)²)";
      substitution =
        `Z = √(${calculatedResistance}² + (` +
        `${calculatedInductiveReactance} − ` +
        `${calculatedCapacitiveReactance})²)`;

      break;
    }

    case "resistance": {
      calculatedImpedance =
        requirePositiveFiniteValue(
          impedance,
          "impedance",
        );
      calculatedInductiveReactance =
        requirePositiveFiniteValue(
          inductiveReactance,
          "inductiveReactance",
        );
      calculatedCapacitiveReactance =
        requirePositiveFiniteValue(
          capacitiveReactance,
          "capacitiveReactance",
        );

      const reactanceDifference =
        calculatedInductiveReactance -
        calculatedCapacitiveReactance;
      const radicand =
        calculatedImpedance ** 2 -
        reactanceDifference ** 2;

      if (radicand < 0) {
        throw new Error(
          "Impedance is too small for the supplied reactance difference.",
        );
      }

      calculatedResistance =
        Math.sqrt(radicand);

      formula = "R = √(Z² − (Xₗ − Xc)²)";
      substitution =
        `R = √(${calculatedImpedance}² − (` +
        `${calculatedInductiveReactance} − ` +
        `${calculatedCapacitiveReactance})²)`;

      break;
    }

    case "inductiveReactance": {
      calculatedImpedance =
        requirePositiveFiniteValue(
          impedance,
          "impedance",
        );
      calculatedResistance =
        requirePositiveFiniteValue(
          resistance,
          "resistance",
        );
      calculatedCapacitiveReactance =
        requirePositiveFiniteValue(
          capacitiveReactance,
          "capacitiveReactance",
        );

      const reactanceMagnitude =
        calculateReactanceMagnitude(
          calculatedImpedance,
          calculatedResistance,
        );

      calculatedInductiveReactance =
        calculatedCapacitiveReactance +
        reactanceMagnitude;

      formula = "Xₗ = Xc + √(Z² − R²)";
      substitution =
        `Xₗ = ${calculatedCapacitiveReactance} + ` +
        `√(${calculatedImpedance}² − ` +
        `${calculatedResistance}²)`;

      break;
    }

    case "capacitiveReactance": {
      calculatedImpedance =
        requirePositiveFiniteValue(
          impedance,
          "impedance",
        );
      calculatedResistance =
        requirePositiveFiniteValue(
          resistance,
          "resistance",
        );
      calculatedInductiveReactance =
        requirePositiveFiniteValue(
          inductiveReactance,
          "inductiveReactance",
        );

      const reactanceMagnitude =
        calculateReactanceMagnitude(
          calculatedImpedance,
          calculatedResistance,
        );

      calculatedCapacitiveReactance =
        calculatedInductiveReactance +
        reactanceMagnitude;

      formula = "Xc = Xₗ + √(Z² − R²)";
      substitution =
        `Xc = ${calculatedInductiveReactance} + ` +
        `√(${calculatedImpedance}² − ` +
        `${calculatedResistance}²)`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported AC impedance variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedImpedance === undefined ||
    calculatedResistance === undefined ||
    calculatedInductiveReactance === undefined ||
    calculatedCapacitiveReactance === undefined ||
    !Number.isFinite(calculatedImpedance) ||
    !Number.isFinite(calculatedResistance) ||
    !Number.isFinite(calculatedInductiveReactance) ||
    !Number.isFinite(calculatedCapacitiveReactance) ||
    calculatedImpedance <= 0 ||
    calculatedResistance < 0 ||
    calculatedInductiveReactance <= 0 ||
    calculatedCapacitiveReactance <= 0
  ) {
    throw new Error(
      "The AC impedance calculation could not be completed.",
    );
  }

  const solvedValues: Record<
    AcImpedanceVariable,
    number
  > = {
    impedance: calculatedImpedance,
    resistance: calculatedResistance,
    inductiveReactance:
      calculatedInductiveReactance,
    capacitiveReactance:
      calculatedCapacitiveReactance,
  };

  const solvedValue =
    solvedValues[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      impedance: calculatedImpedance,
      resistance: calculatedResistance,
      inductiveReactance:
        calculatedInductiveReactance,
      capacitiveReactance:
        calculatedCapacitiveReactance,
      reactanceDifference:
        calculatedInductiveReactance -
        calculatedCapacitiveReactance,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
