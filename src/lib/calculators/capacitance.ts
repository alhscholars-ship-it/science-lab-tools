import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type CapacitanceVariable =
  | "capacitance"
  | "charge"
  | "voltage";

export type CapacitanceInput = {
  capacitance?: number;
  charge?: number;
  voltage?: number;
  solveFor: CapacitanceVariable;
};

export type CapacitanceDetails = {
  capacitance: number;
  charge: number;
  voltage: number;
  solvedVariable: CapacitanceVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  CapacitanceVariable,
  string
> = {
  capacitance: "Capacitance",
  charge: "Electric charge",
  voltage: "Voltage",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: CapacitanceVariable,
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

export function calculateCapacitance({
  capacitance,
  charge,
  voltage,
  solveFor,
}: CapacitanceInput): CalculationResult<CapacitanceDetails> {
  let calculatedCapacitance = capacitance;
  let calculatedCharge = charge;
  let calculatedVoltage = voltage;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "capacitance": {
      calculatedCharge =
        requirePositiveFiniteValue(
          charge,
          "charge",
        );

      calculatedVoltage =
        requirePositiveFiniteValue(
          voltage,
          "voltage",
        );

      calculatedCapacitance =
        calculatedCharge /
        calculatedVoltage;

      formula = "C = Q ÷ V";
      substitution =
        `C = ${calculatedCharge} ÷ ` +
        `${calculatedVoltage}`;

      break;
    }

    case "charge": {
      calculatedCapacitance =
        requirePositiveFiniteValue(
          capacitance,
          "capacitance",
        );

      calculatedVoltage =
        requirePositiveFiniteValue(
          voltage,
          "voltage",
        );

      calculatedCharge =
        calculatedCapacitance *
        calculatedVoltage;

      formula = "Q = CV";
      substitution =
        `Q = ${calculatedCapacitance} × ` +
        `${calculatedVoltage}`;

      break;
    }

    case "voltage": {
      calculatedCharge =
        requirePositiveFiniteValue(
          charge,
          "charge",
        );

      calculatedCapacitance =
        requirePositiveFiniteValue(
          capacitance,
          "capacitance",
        );

      calculatedVoltage =
        calculatedCharge /
        calculatedCapacitance;

      formula = "V = Q ÷ C";
      substitution =
        `V = ${calculatedCharge} ÷ ` +
        `${calculatedCapacitance}`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported capacitance variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedCapacitance === undefined ||
    calculatedCharge === undefined ||
    calculatedVoltage === undefined ||
    !Number.isFinite(calculatedCapacitance) ||
    !Number.isFinite(calculatedCharge) ||
    !Number.isFinite(calculatedVoltage) ||
    calculatedCapacitance <= 0 ||
    calculatedCharge <= 0 ||
    calculatedVoltage <= 0
  ) {
    throw new Error(
      "The capacitance calculation could not be completed.",
    );
  }

  const solvedValues: Record<
    CapacitanceVariable,
    number
  > = {
    capacitance: calculatedCapacitance,
    charge: calculatedCharge,
    voltage: calculatedVoltage,
  };

  const solvedValue = solvedValues[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      capacitance: calculatedCapacitance,
      charge: calculatedCharge,
      voltage: calculatedVoltage,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
