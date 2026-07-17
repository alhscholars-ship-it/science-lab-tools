import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RlcQualityFactorVariable =
  | "qualityFactor"
  | "resistance"
  | "inductance"
  | "capacitance";

export type RlcQualityFactorInput = {
  qualityFactor?: number;
  resistance?: number;
  inductance?: number;
  capacitance?: number;
  resonantFrequency?: number;
  solveFor: RlcQualityFactorVariable;
};

export type RlcQualityFactorDetails = {
  qualityFactor: number;
  resistance: number;
  inductance: number;
  capacitance: number;
  resonantFrequency?: number;
  bandwidth?: number;
  dampingRatio: number;
  solvedVariable: RlcQualityFactorVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  RlcQualityFactorVariable,
  string
> = {
  qualityFactor: "Quality factor",
  resistance: "Resistance",
  inductance: "Inductance",
  capacitance: "Capacitance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: RlcQualityFactorVariable,
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

function validateOptionalFrequency(
  value: number | undefined,
): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(
      "Resonant frequency must be greater than zero.",
    );
  }

  return value;
}

export function calculateRlcQualityFactor({
  qualityFactor,
  resistance,
  inductance,
  capacitance,
  resonantFrequency,
  solveFor,
}: RlcQualityFactorInput): CalculationResult<RlcQualityFactorDetails> {
  let calculatedQualityFactor = qualityFactor;
  let calculatedResistance = resistance;
  let calculatedInductance = inductance;
  let calculatedCapacitance = capacitance;
  let formula = "";
  let substitution = "";

  const validatedFrequency =
    validateOptionalFrequency(resonantFrequency);

  switch (solveFor) {
    case "qualityFactor": {
      calculatedResistance =
        requirePositiveFiniteValue(
          resistance,
          "resistance",
        );

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

      calculatedQualityFactor =
        Math.sqrt(
          calculatedInductance /
            calculatedCapacitance,
        ) / calculatedResistance;

      formula = "Q = √(L ÷ C) ÷ R";
      substitution =
        `Q = √(${calculatedInductance} ÷ ` +
        `${calculatedCapacitance}) ÷ ` +
        `${calculatedResistance}`;

      break;
    }

    case "resistance": {
      calculatedQualityFactor =
        requirePositiveFiniteValue(
          qualityFactor,
          "qualityFactor",
        );

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

      calculatedResistance =
        Math.sqrt(
          calculatedInductance /
            calculatedCapacitance,
        ) / calculatedQualityFactor;

      formula = "R = √(L ÷ C) ÷ Q";
      substitution =
        `R = √(${calculatedInductance} ÷ ` +
        `${calculatedCapacitance}) ÷ ` +
        `${calculatedQualityFactor}`;

      break;
    }

    case "inductance": {
      calculatedQualityFactor =
        requirePositiveFiniteValue(
          qualityFactor,
          "qualityFactor",
        );

      calculatedResistance =
        requirePositiveFiniteValue(
          resistance,
          "resistance",
        );

      calculatedCapacitance =
        requirePositiveFiniteValue(
          capacitance,
          "capacitance",
        );

      calculatedInductance =
        (
          calculatedQualityFactor *
          calculatedResistance
        ) ** 2 *
        calculatedCapacitance;

      formula = "L = (QR)²C";
      substitution =
        `L = (${calculatedQualityFactor} × ` +
        `${calculatedResistance})² × ` +
        `${calculatedCapacitance}`;

      break;
    }

    case "capacitance": {
      calculatedQualityFactor =
        requirePositiveFiniteValue(
          qualityFactor,
          "qualityFactor",
        );

      calculatedResistance =
        requirePositiveFiniteValue(
          resistance,
          "resistance",
        );

      calculatedInductance =
        requirePositiveFiniteValue(
          inductance,
          "inductance",
        );

      calculatedCapacitance =
        calculatedInductance /
        (
          calculatedQualityFactor *
          calculatedResistance
        ) ** 2;

      formula = "C = L ÷ (QR)²";
      substitution =
        `C = ${calculatedInductance} ÷ (` +
        `${calculatedQualityFactor} × ` +
        `${calculatedResistance})²`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported RLC quality factor variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedQualityFactor === undefined ||
    calculatedResistance === undefined ||
    calculatedInductance === undefined ||
    calculatedCapacitance === undefined ||
    !Number.isFinite(calculatedQualityFactor) ||
    !Number.isFinite(calculatedResistance) ||
    !Number.isFinite(calculatedInductance) ||
    !Number.isFinite(calculatedCapacitance) ||
    calculatedQualityFactor <= 0 ||
    calculatedResistance <= 0 ||
    calculatedInductance <= 0 ||
    calculatedCapacitance <= 0
  ) {
    throw new Error(
      "The RLC quality factor calculation could not be completed.",
    );
  }

  const solvedValues: Record<
    RlcQualityFactorVariable,
    number
  > = {
    qualityFactor: calculatedQualityFactor,
    resistance: calculatedResistance,
    inductance: calculatedInductance,
    capacitance: calculatedCapacitance,
  };

  const solvedValue = solvedValues[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      qualityFactor: calculatedQualityFactor,
      resistance: calculatedResistance,
      inductance: calculatedInductance,
      capacitance: calculatedCapacitance,
      resonantFrequency: validatedFrequency,
      bandwidth:
        validatedFrequency === undefined
          ? undefined
          : validatedFrequency /
            calculatedQualityFactor,
      dampingRatio:
        1 / (2 * calculatedQualityFactor),
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
