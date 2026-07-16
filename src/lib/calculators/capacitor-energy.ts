import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type CapacitorEnergyVariable =
  | "energy"
  | "capacitance"
  | "charge"
  | "voltage";

export type CapacitorEnergyInput = {
  energy?: number;
  capacitance?: number;
  charge?: number;
  voltage?: number;
  solveFor: CapacitorEnergyVariable;
};

export type CapacitorEnergyDetails = {
  energy: number;
  capacitance: number;
  charge: number;
  voltage: number;
  solvedVariable: CapacitorEnergyVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  CapacitorEnergyVariable,
  string
> = {
  energy: "Stored energy",
  capacitance: "Capacitance",
  charge: "Electric charge",
  voltage: "Voltage",
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
  variable: CapacitorEnergyVariable,
): number {
  if (!isPositiveFinite(value)) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return value;
}

function missingValuesError(
  solveFor: CapacitorEnergyVariable,
): never {
  throw new Error(
    `Enter a compatible pair of known values to calculate ${variableLabels[
      solveFor
    ].toLowerCase()}.`,
  );
}

export function calculateCapacitorEnergy({
  energy,
  capacitance,
  charge,
  voltage,
  solveFor,
}: CapacitorEnergyInput): CalculationResult<CapacitorEnergyDetails> {
  let calculatedEnergy = energy;
  let calculatedCapacitance = capacitance;
  let calculatedCharge = charge;
  let calculatedVoltage = voltage;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "energy": {
      if (
        isPositiveFinite(capacitance) &&
        isPositiveFinite(voltage)
      ) {
        calculatedCapacitance =
          requirePositiveValue(
            capacitance,
            "capacitance",
          );

        calculatedVoltage =
          requirePositiveValue(
            voltage,
            "voltage",
          );

        calculatedEnergy =
          0.5 *
          calculatedCapacitance *
          calculatedVoltage ** 2;

        calculatedCharge =
          calculatedCapacitance *
          calculatedVoltage;

        formula = "U = ½CV²";
        substitution =
          `U = ½ × ${calculatedCapacitance} × ` +
          `${calculatedVoltage}²`;
      } else if (
        isPositiveFinite(charge) &&
        isPositiveFinite(voltage)
      ) {
        calculatedCharge =
          requirePositiveValue(
            charge,
            "charge",
          );

        calculatedVoltage =
          requirePositiveValue(
            voltage,
            "voltage",
          );

        calculatedEnergy =
          0.5 *
          calculatedCharge *
          calculatedVoltage;

        calculatedCapacitance =
          calculatedCharge /
          calculatedVoltage;

        formula = "U = ½QV";
        substitution =
          `U = ½ × ${calculatedCharge} × ` +
          `${calculatedVoltage}`;
      } else if (
        isPositiveFinite(charge) &&
        isPositiveFinite(capacitance)
      ) {
        calculatedCharge =
          requirePositiveValue(
            charge,
            "charge",
          );

        calculatedCapacitance =
          requirePositiveValue(
            capacitance,
            "capacitance",
          );

        calculatedEnergy =
          calculatedCharge ** 2 /
          (2 * calculatedCapacitance);

        calculatedVoltage =
          calculatedCharge /
          calculatedCapacitance;

        formula = "U = Q² ÷ 2C";
        substitution =
          `U = ${calculatedCharge}² ÷ ` +
          `(2 × ${calculatedCapacitance})`;
      } else {
        missingValuesError(solveFor);
      }

      break;
    }

    case "capacitance": {
      if (
        isPositiveFinite(energy) &&
        isPositiveFinite(voltage)
      ) {
        calculatedEnergy =
          requirePositiveValue(
            energy,
            "energy",
          );

        calculatedVoltage =
          requirePositiveValue(
            voltage,
            "voltage",
          );

        calculatedCapacitance =
          (2 * calculatedEnergy) /
          calculatedVoltage ** 2;

        calculatedCharge =
          calculatedCapacitance *
          calculatedVoltage;

        formula = "C = 2U ÷ V²";
        substitution =
          `C = 2 × ${calculatedEnergy} ÷ ` +
          `${calculatedVoltage}²`;
      } else if (
        isPositiveFinite(charge) &&
        isPositiveFinite(voltage)
      ) {
        calculatedCharge =
          requirePositiveValue(
            charge,
            "charge",
          );

        calculatedVoltage =
          requirePositiveValue(
            voltage,
            "voltage",
          );

        calculatedCapacitance =
          calculatedCharge /
          calculatedVoltage;

        calculatedEnergy =
          0.5 *
          calculatedCharge *
          calculatedVoltage;

        formula = "C = Q ÷ V";
        substitution =
          `C = ${calculatedCharge} ÷ ` +
          `${calculatedVoltage}`;
      } else if (
        isPositiveFinite(charge) &&
        isPositiveFinite(energy)
      ) {
        calculatedCharge =
          requirePositiveValue(
            charge,
            "charge",
          );

        calculatedEnergy =
          requirePositiveValue(
            energy,
            "energy",
          );

        calculatedCapacitance =
          calculatedCharge ** 2 /
          (2 * calculatedEnergy);

        calculatedVoltage =
          calculatedCharge /
          calculatedCapacitance;

        formula = "C = Q² ÷ 2U";
        substitution =
          `C = ${calculatedCharge}² ÷ ` +
          `(2 × ${calculatedEnergy})`;
      } else {
        missingValuesError(solveFor);
      }

      break;
    }

    case "charge": {
      if (
        isPositiveFinite(capacitance) &&
        isPositiveFinite(voltage)
      ) {
        calculatedCapacitance =
          requirePositiveValue(
            capacitance,
            "capacitance",
          );

        calculatedVoltage =
          requirePositiveValue(
            voltage,
            "voltage",
          );

        calculatedCharge =
          calculatedCapacitance *
          calculatedVoltage;

        calculatedEnergy =
          0.5 *
          calculatedCapacitance *
          calculatedVoltage ** 2;

        formula = "Q = CV";
        substitution =
          `Q = ${calculatedCapacitance} × ` +
          `${calculatedVoltage}`;
      } else if (
        isPositiveFinite(energy) &&
        isPositiveFinite(voltage)
      ) {
        calculatedEnergy =
          requirePositiveValue(
            energy,
            "energy",
          );

        calculatedVoltage =
          requirePositiveValue(
            voltage,
            "voltage",
          );

        calculatedCharge =
          (2 * calculatedEnergy) /
          calculatedVoltage;

        calculatedCapacitance =
          calculatedCharge /
          calculatedVoltage;

        formula = "Q = 2U ÷ V";
        substitution =
          `Q = 2 × ${calculatedEnergy} ÷ ` +
          `${calculatedVoltage}`;
      } else if (
        isPositiveFinite(energy) &&
        isPositiveFinite(capacitance)
      ) {
        calculatedEnergy =
          requirePositiveValue(
            energy,
            "energy",
          );

        calculatedCapacitance =
          requirePositiveValue(
            capacitance,
            "capacitance",
          );

        calculatedCharge = Math.sqrt(
          2 *
            calculatedEnergy *
            calculatedCapacitance,
        );

        calculatedVoltage =
          calculatedCharge /
          calculatedCapacitance;

        formula = "Q = √(2UC)";
        substitution =
          `Q = √(2 × ${calculatedEnergy} × ` +
          `${calculatedCapacitance})`;
      } else {
        missingValuesError(solveFor);
      }

      break;
    }

    case "voltage": {
      if (
        isPositiveFinite(charge) &&
        isPositiveFinite(capacitance)
      ) {
        calculatedCharge =
          requirePositiveValue(
            charge,
            "charge",
          );

        calculatedCapacitance =
          requirePositiveValue(
            capacitance,
            "capacitance",
          );

        calculatedVoltage =
          calculatedCharge /
          calculatedCapacitance;

        calculatedEnergy =
          0.5 *
          calculatedCharge *
          calculatedVoltage;

        formula = "V = Q ÷ C";
        substitution =
          `V = ${calculatedCharge} ÷ ` +
          `${calculatedCapacitance}`;
      } else if (
        isPositiveFinite(energy) &&
        isPositiveFinite(charge)
      ) {
        calculatedEnergy =
          requirePositiveValue(
            energy,
            "energy",
          );

        calculatedCharge =
          requirePositiveValue(
            charge,
            "charge",
          );

        calculatedVoltage =
          (2 * calculatedEnergy) /
          calculatedCharge;

        calculatedCapacitance =
          calculatedCharge /
          calculatedVoltage;

        formula = "V = 2U ÷ Q";
        substitution =
          `V = 2 × ${calculatedEnergy} ÷ ` +
          `${calculatedCharge}`;
      } else if (
        isPositiveFinite(energy) &&
        isPositiveFinite(capacitance)
      ) {
        calculatedEnergy =
          requirePositiveValue(
            energy,
            "energy",
          );

        calculatedCapacitance =
          requirePositiveValue(
            capacitance,
            "capacitance",
          );

        calculatedVoltage = Math.sqrt(
          (2 * calculatedEnergy) /
            calculatedCapacitance,
        );

        calculatedCharge =
          calculatedCapacitance *
          calculatedVoltage;

        formula = "V = √(2U ÷ C)";
        substitution =
          `V = √(2 × ${calculatedEnergy} ÷ ` +
          `${calculatedCapacitance})`;
      } else {
        missingValuesError(solveFor);
      }

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported capacitor energy variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedEnergy === undefined ||
    calculatedCapacitance === undefined ||
    calculatedCharge === undefined ||
    calculatedVoltage === undefined ||
    !Number.isFinite(calculatedEnergy) ||
    !Number.isFinite(calculatedCapacitance) ||
    !Number.isFinite(calculatedCharge) ||
    !Number.isFinite(calculatedVoltage) ||
    calculatedEnergy <= 0 ||
    calculatedCapacitance <= 0 ||
    calculatedCharge <= 0 ||
    calculatedVoltage <= 0
  ) {
    throw new Error(
      "The capacitor energy calculation could not be completed.",
    );
  }

  const solvedValues: Record<
    CapacitorEnergyVariable,
    number
  > = {
    energy: calculatedEnergy,
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
      energy: calculatedEnergy,
      capacitance: calculatedCapacitance,
      charge: calculatedCharge,
      voltage: calculatedVoltage,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
