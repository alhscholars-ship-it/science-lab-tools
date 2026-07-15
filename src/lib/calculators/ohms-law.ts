import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type OhmsLawVariable =
  | "voltage"
  | "current"
  | "resistance"
  | "power";

export type OhmsLawInput = {
  voltage?: number;
  current?: number;
  resistance?: number;
  power?: number;
  solveFor: OhmsLawVariable;
};

export type OhmsLawDetails = {
  voltage: number;
  current: number;
  resistance: number;
  power: number;
  solvedVariable: OhmsLawVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  OhmsLawVariable,
  string
> = {
  voltage: "Voltage",
  current: "Current",
  resistance: "Resistance",
  power: "Power",
};

function isPositiveFinite(
  value: number | undefined,
): value is number {
  return (
    value !== undefined &&
    Number.isFinite(value) &&
    value > 0
  );
}

function requirePositiveValue(
  value: number | undefined,
  variable: OhmsLawVariable,
): number {
  if (!isPositiveFinite(value)) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return value;
}

function missingValuesError(
  solveFor: OhmsLawVariable,
): never {
  throw new Error(
    `Enter a compatible pair of known values to calculate ${variableLabels[
      solveFor
    ].toLowerCase()}.`,
  );
}

export function calculateOhmsLaw({
  voltage,
  current,
  resistance,
  power,
  solveFor,
}: OhmsLawInput): CalculationResult<OhmsLawDetails> {
  let calculatedVoltage = voltage;
  let calculatedCurrent = current;
  let calculatedResistance = resistance;
  let calculatedPower = power;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "voltage": {
      if (
        isPositiveFinite(current) &&
        isPositiveFinite(resistance)
      ) {
        calculatedCurrent = requirePositiveValue(
          current,
          "current",
        );
        calculatedResistance = requirePositiveValue(
          resistance,
          "resistance",
        );
        calculatedVoltage =
          calculatedCurrent *
          calculatedResistance;
        calculatedPower =
          calculatedVoltage *
          calculatedCurrent;
        formula = "V = I × R";
        substitution =
          `V = ${calculatedCurrent} × ` +
          `${calculatedResistance}`;
      } else if (
        isPositiveFinite(power) &&
        isPositiveFinite(current)
      ) {
        calculatedPower = requirePositiveValue(
          power,
          "power",
        );
        calculatedCurrent = requirePositiveValue(
          current,
          "current",
        );
        calculatedVoltage =
          calculatedPower /
          calculatedCurrent;
        calculatedResistance =
          calculatedVoltage /
          calculatedCurrent;
        formula = "V = P ÷ I";
        substitution =
          `V = ${calculatedPower} ÷ ` +
          `${calculatedCurrent}`;
      } else if (
        isPositiveFinite(power) &&
        isPositiveFinite(resistance)
      ) {
        calculatedPower = requirePositiveValue(
          power,
          "power",
        );
        calculatedResistance = requirePositiveValue(
          resistance,
          "resistance",
        );
        calculatedVoltage = Math.sqrt(
          calculatedPower *
            calculatedResistance,
        );
        calculatedCurrent =
          calculatedVoltage /
          calculatedResistance;
        formula = "V = √(P × R)";
        substitution =
          `V = √(${calculatedPower} × ` +
          `${calculatedResistance})`;
      } else {
        missingValuesError(solveFor);
      }
      break;
    }

    case "current": {
      if (
        isPositiveFinite(voltage) &&
        isPositiveFinite(resistance)
      ) {
        calculatedVoltage = requirePositiveValue(
          voltage,
          "voltage",
        );
        calculatedResistance = requirePositiveValue(
          resistance,
          "resistance",
        );
        calculatedCurrent =
          calculatedVoltage /
          calculatedResistance;
        calculatedPower =
          calculatedVoltage *
          calculatedCurrent;
        formula = "I = V ÷ R";
        substitution =
          `I = ${calculatedVoltage} ÷ ` +
          `${calculatedResistance}`;
      } else if (
        isPositiveFinite(power) &&
        isPositiveFinite(voltage)
      ) {
        calculatedPower = requirePositiveValue(
          power,
          "power",
        );
        calculatedVoltage = requirePositiveValue(
          voltage,
          "voltage",
        );
        calculatedCurrent =
          calculatedPower /
          calculatedVoltage;
        calculatedResistance =
          calculatedVoltage /
          calculatedCurrent;
        formula = "I = P ÷ V";
        substitution =
          `I = ${calculatedPower} ÷ ` +
          `${calculatedVoltage}`;
      } else if (
        isPositiveFinite(power) &&
        isPositiveFinite(resistance)
      ) {
        calculatedPower = requirePositiveValue(
          power,
          "power",
        );
        calculatedResistance = requirePositiveValue(
          resistance,
          "resistance",
        );
        calculatedCurrent = Math.sqrt(
          calculatedPower /
            calculatedResistance,
        );
        calculatedVoltage =
          calculatedCurrent *
          calculatedResistance;
        formula = "I = √(P ÷ R)";
        substitution =
          `I = √(${calculatedPower} ÷ ` +
          `${calculatedResistance})`;
      } else {
        missingValuesError(solveFor);
      }
      break;
    }

    case "resistance": {
      if (
        isPositiveFinite(voltage) &&
        isPositiveFinite(current)
      ) {
        calculatedVoltage = requirePositiveValue(
          voltage,
          "voltage",
        );
        calculatedCurrent = requirePositiveValue(
          current,
          "current",
        );
        calculatedResistance =
          calculatedVoltage /
          calculatedCurrent;
        calculatedPower =
          calculatedVoltage *
          calculatedCurrent;
        formula = "R = V ÷ I";
        substitution =
          `R = ${calculatedVoltage} ÷ ` +
          `${calculatedCurrent}`;
      } else if (
        isPositiveFinite(voltage) &&
        isPositiveFinite(power)
      ) {
        calculatedVoltage = requirePositiveValue(
          voltage,
          "voltage",
        );
        calculatedPower = requirePositiveValue(
          power,
          "power",
        );
        calculatedResistance =
          calculatedVoltage ** 2 /
          calculatedPower;
        calculatedCurrent =
          calculatedPower /
          calculatedVoltage;
        formula = "R = V² ÷ P";
        substitution =
          `R = ${calculatedVoltage}² ÷ ` +
          `${calculatedPower}`;
      } else if (
        isPositiveFinite(power) &&
        isPositiveFinite(current)
      ) {
        calculatedPower = requirePositiveValue(
          power,
          "power",
        );
        calculatedCurrent = requirePositiveValue(
          current,
          "current",
        );
        calculatedResistance =
          calculatedPower /
          calculatedCurrent ** 2;
        calculatedVoltage =
          calculatedPower /
          calculatedCurrent;
        formula = "R = P ÷ I²";
        substitution =
          `R = ${calculatedPower} ÷ ` +
          `${calculatedCurrent}²`;
      } else {
        missingValuesError(solveFor);
      }
      break;
    }

    case "power": {
      if (
        isPositiveFinite(voltage) &&
        isPositiveFinite(current)
      ) {
        calculatedVoltage = requirePositiveValue(
          voltage,
          "voltage",
        );
        calculatedCurrent = requirePositiveValue(
          current,
          "current",
        );
        calculatedPower =
          calculatedVoltage *
          calculatedCurrent;
        calculatedResistance =
          calculatedVoltage /
          calculatedCurrent;
        formula = "P = V × I";
        substitution =
          `P = ${calculatedVoltage} × ` +
          `${calculatedCurrent}`;
      } else if (
        isPositiveFinite(current) &&
        isPositiveFinite(resistance)
      ) {
        calculatedCurrent = requirePositiveValue(
          current,
          "current",
        );
        calculatedResistance = requirePositiveValue(
          resistance,
          "resistance",
        );
        calculatedPower =
          calculatedCurrent ** 2 *
          calculatedResistance;
        calculatedVoltage =
          calculatedCurrent *
          calculatedResistance;
        formula = "P = I² × R";
        substitution =
          `P = ${calculatedCurrent}² × ` +
          `${calculatedResistance}`;
      } else if (
        isPositiveFinite(voltage) &&
        isPositiveFinite(resistance)
      ) {
        calculatedVoltage = requirePositiveValue(
          voltage,
          "voltage",
        );
        calculatedResistance = requirePositiveValue(
          resistance,
          "resistance",
        );
        calculatedPower =
          calculatedVoltage ** 2 /
          calculatedResistance;
        calculatedCurrent =
          calculatedVoltage /
          calculatedResistance;
        formula = "P = V² ÷ R";
        substitution =
          `P = ${calculatedVoltage}² ÷ ` +
          `${calculatedResistance}`;
      } else {
        missingValuesError(solveFor);
      }
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported Ohm's law variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    !isPositiveFinite(calculatedVoltage) ||
    !isPositiveFinite(calculatedCurrent) ||
    !isPositiveFinite(calculatedResistance) ||
    !isPositiveFinite(calculatedPower)
  ) {
    throw new Error(
      "The Ohm's law calculation could not be completed.",
    );
  }

  const solvedValue = {
    voltage: calculatedVoltage,
    current: calculatedCurrent,
    resistance: calculatedResistance,
    power: calculatedPower,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      voltage: calculatedVoltage,
      current: calculatedCurrent,
      resistance: calculatedResistance,
      power: calculatedPower,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
