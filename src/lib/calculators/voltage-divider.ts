import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type VoltageDividerVariable =
  | "outputVoltage"
  | "inputVoltage"
  | "upperResistance"
  | "lowerResistance";

export type VoltageDividerInput = {
  outputVoltage?: number;
  inputVoltage?: number;
  upperResistance?: number;
  lowerResistance?: number;
  solveFor: VoltageDividerVariable;
};

export type VoltageDividerDetails = {
  outputVoltage: number;
  inputVoltage: number;
  upperResistance: number;
  lowerResistance: number;
  dividerRatio: number;
  circuitCurrent: number;
  solvedVariable: VoltageDividerVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  VoltageDividerVariable,
  string
> = {
  outputVoltage: "Output voltage",
  inputVoltage: "Input voltage",
  upperResistance: "Upper resistance",
  lowerResistance: "Lower resistance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: VoltageDividerVariable,
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

function requireOutputBelowInput(
  outputVoltage: number,
  inputVoltage: number,
): void {
  if (outputVoltage >= inputVoltage) {
    throw new Error(
      "Output voltage must be less than input voltage for a passive voltage divider.",
    );
  }
}

export function calculateVoltageDivider({
  outputVoltage,
  inputVoltage,
  upperResistance,
  lowerResistance,
  solveFor,
}: VoltageDividerInput): CalculationResult<VoltageDividerDetails> {
  let calculatedOutputVoltage = outputVoltage;
  let calculatedInputVoltage = inputVoltage;
  let calculatedUpperResistance = upperResistance;
  let calculatedLowerResistance = lowerResistance;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "outputVoltage": {
      calculatedInputVoltage =
        requirePositiveFiniteValue(
          inputVoltage,
          "inputVoltage",
        );

      calculatedUpperResistance =
        requirePositiveFiniteValue(
          upperResistance,
          "upperResistance",
        );

      calculatedLowerResistance =
        requirePositiveFiniteValue(
          lowerResistance,
          "lowerResistance",
        );

      calculatedOutputVoltage =
        calculatedInputVoltage *
        (calculatedLowerResistance /
          (calculatedUpperResistance +
            calculatedLowerResistance));

      formula = "Vout = Vin × R2 ÷ (R1 + R2)";
      substitution =
        `Vout = ${calculatedInputVoltage} × ` +
        `${calculatedLowerResistance} ÷ ` +
        `(${calculatedUpperResistance} + ` +
        `${calculatedLowerResistance})`;

      break;
    }

    case "inputVoltage": {
      calculatedOutputVoltage =
        requirePositiveFiniteValue(
          outputVoltage,
          "outputVoltage",
        );

      calculatedUpperResistance =
        requirePositiveFiniteValue(
          upperResistance,
          "upperResistance",
        );

      calculatedLowerResistance =
        requirePositiveFiniteValue(
          lowerResistance,
          "lowerResistance",
        );

      calculatedInputVoltage =
        calculatedOutputVoltage *
        ((calculatedUpperResistance +
          calculatedLowerResistance) /
          calculatedLowerResistance);

      formula = "Vin = Vout × (R1 + R2) ÷ R2";
      substitution =
        `Vin = ${calculatedOutputVoltage} × ` +
        `(${calculatedUpperResistance} + ` +
        `${calculatedLowerResistance}) ÷ ` +
        `${calculatedLowerResistance}`;

      break;
    }

    case "upperResistance": {
      calculatedOutputVoltage =
        requirePositiveFiniteValue(
          outputVoltage,
          "outputVoltage",
        );

      calculatedInputVoltage =
        requirePositiveFiniteValue(
          inputVoltage,
          "inputVoltage",
        );

      calculatedLowerResistance =
        requirePositiveFiniteValue(
          lowerResistance,
          "lowerResistance",
        );

      requireOutputBelowInput(
        calculatedOutputVoltage,
        calculatedInputVoltage,
      );

      calculatedUpperResistance =
        calculatedLowerResistance *
        ((calculatedInputVoltage -
          calculatedOutputVoltage) /
          calculatedOutputVoltage);

      formula = "R1 = R2 × (Vin − Vout) ÷ Vout";
      substitution =
        `R1 = ${calculatedLowerResistance} × ` +
        `(${calculatedInputVoltage} − ` +
        `${calculatedOutputVoltage}) ÷ ` +
        `${calculatedOutputVoltage}`;

      break;
    }

    case "lowerResistance": {
      calculatedOutputVoltage =
        requirePositiveFiniteValue(
          outputVoltage,
          "outputVoltage",
        );

      calculatedInputVoltage =
        requirePositiveFiniteValue(
          inputVoltage,
          "inputVoltage",
        );

      calculatedUpperResistance =
        requirePositiveFiniteValue(
          upperResistance,
          "upperResistance",
        );

      requireOutputBelowInput(
        calculatedOutputVoltage,
        calculatedInputVoltage,
      );

      calculatedLowerResistance =
        (calculatedOutputVoltage *
          calculatedUpperResistance) /
        (calculatedInputVoltage -
          calculatedOutputVoltage);

      formula = "R2 = Vout × R1 ÷ (Vin − Vout)";
      substitution =
        `R2 = ${calculatedOutputVoltage} × ` +
        `${calculatedUpperResistance} ÷ ` +
        `(${calculatedInputVoltage} − ` +
        `${calculatedOutputVoltage})`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported voltage divider variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedOutputVoltage === undefined ||
    calculatedInputVoltage === undefined ||
    calculatedUpperResistance === undefined ||
    calculatedLowerResistance === undefined ||
    !Number.isFinite(calculatedOutputVoltage) ||
    !Number.isFinite(calculatedInputVoltage) ||
    !Number.isFinite(calculatedUpperResistance) ||
    !Number.isFinite(calculatedLowerResistance) ||
    calculatedOutputVoltage <= 0 ||
    calculatedInputVoltage <= 0 ||
    calculatedUpperResistance <= 0 ||
    calculatedLowerResistance <= 0
  ) {
    throw new Error(
      "The voltage divider calculation could not be completed.",
    );
  }

  requireOutputBelowInput(
    calculatedOutputVoltage,
    calculatedInputVoltage,
  );

  const dividerRatio =
    calculatedOutputVoltage /
    calculatedInputVoltage;

  const circuitCurrent =
    calculatedInputVoltage /
    (calculatedUpperResistance +
      calculatedLowerResistance);

  const solvedValue = {
    outputVoltage: calculatedOutputVoltage,
    inputVoltage: calculatedInputVoltage,
    upperResistance: calculatedUpperResistance,
    lowerResistance: calculatedLowerResistance,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      outputVoltage: calculatedOutputVoltage,
      inputVoltage: calculatedInputVoltage,
      upperResistance: calculatedUpperResistance,
      lowerResistance: calculatedLowerResistance,
      dividerRatio,
      circuitCurrent,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
