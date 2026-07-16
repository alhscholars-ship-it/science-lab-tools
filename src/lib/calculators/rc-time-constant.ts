import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RcTimeConstantMode =
  | "timeConstant"
  | "chargingVoltage"
  | "dischargingVoltage";

export type RcTimeConstantVariable =
  | "timeConstant"
  | "resistance"
  | "capacitance"
  | "voltage"
  | "sourceVoltage"
  | "initialVoltage"
  | "time";

export type RcTimeConstantInput = {
  mode: RcTimeConstantMode;
  solveFor: RcTimeConstantVariable;
  timeConstant?: number;
  resistance?: number;
  capacitance?: number;
  voltage?: number;
  sourceVoltage?: number;
  initialVoltage?: number;
  time?: number;
};

export type RcTimeConstantDetails = {
  mode: RcTimeConstantMode;
  timeConstant: number;
  resistance?: number;
  capacitance?: number;
  voltage?: number;
  sourceVoltage?: number;
  initialVoltage?: number;
  time?: number;
  solvedVariable: RcTimeConstantVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  RcTimeConstantVariable,
  string
> = {
  timeConstant: "Time constant",
  resistance: "Resistance",
  capacitance: "Capacitance",
  voltage: "Capacitor voltage",
  sourceVoltage: "Source voltage",
  initialVoltage: "Initial voltage",
  time: "Elapsed time",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: RcTimeConstantVariable,
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

export function calculateRcTimeConstant({
  mode,
  solveFor,
  timeConstant,
  resistance,
  capacitance,
  voltage,
  sourceVoltage,
  initialVoltage,
  time,
}: RcTimeConstantInput): CalculationResult<RcTimeConstantDetails> {
  let calculatedTimeConstant = timeConstant;
  let calculatedResistance = resistance;
  let calculatedCapacitance = capacitance;
  let calculatedVoltage = voltage;
  let calculatedSourceVoltage = sourceVoltage;
  let calculatedInitialVoltage = initialVoltage;
  let calculatedTime = time;
  let formula = "";
  let substitution = "";

  if (mode === "timeConstant") {
    switch (solveFor) {
      case "timeConstant": {
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

        calculatedTimeConstant =
          calculatedResistance *
          calculatedCapacitance;

        formula = "τ = RC";
        substitution =
          `τ = ${calculatedResistance} × ` +
          `${calculatedCapacitance}`;

        break;
      }

      case "resistance": {
        calculatedTimeConstant =
          requirePositiveFiniteValue(
            timeConstant,
            "timeConstant",
          );

        calculatedCapacitance =
          requirePositiveFiniteValue(
            capacitance,
            "capacitance",
          );

        calculatedResistance =
          calculatedTimeConstant /
          calculatedCapacitance;

        formula = "R = τ ÷ C";
        substitution =
          `R = ${calculatedTimeConstant} ÷ ` +
          `${calculatedCapacitance}`;

        break;
      }

      case "capacitance": {
        calculatedTimeConstant =
          requirePositiveFiniteValue(
            timeConstant,
            "timeConstant",
          );

        calculatedResistance =
          requirePositiveFiniteValue(
            resistance,
            "resistance",
          );

        calculatedCapacitance =
          calculatedTimeConstant /
          calculatedResistance;

        formula = "C = τ ÷ R";
        substitution =
          `C = ${calculatedTimeConstant} ÷ ` +
          `${calculatedResistance}`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in time-constant mode.",
        );
    }
  } else if (mode === "chargingVoltage") {
    calculatedTimeConstant =
      requirePositiveFiniteValue(
        timeConstant,
        "timeConstant",
      );

    switch (solveFor) {
      case "voltage": {
        calculatedSourceVoltage =
          requirePositiveFiniteValue(
            sourceVoltage,
            "sourceVoltage",
          );

        calculatedTime =
          requirePositiveFiniteValue(
            time,
            "time",
          );

        calculatedVoltage =
          calculatedSourceVoltage *
          (
            1 -
            Math.exp(
              -calculatedTime /
              calculatedTimeConstant,
            )
          );

        formula = "V(t) = Vs(1 − e⁻ᵗ/τ)";
        substitution =
          `V(t) = ${calculatedSourceVoltage} × ` +
          `(1 − e^(-${calculatedTime} ÷ ` +
          `${calculatedTimeConstant}))`;

        break;
      }

      case "time": {
        calculatedVoltage =
          requirePositiveFiniteValue(
            voltage,
            "voltage",
          );

        calculatedSourceVoltage =
          requirePositiveFiniteValue(
            sourceVoltage,
            "sourceVoltage",
          );

        if (
          calculatedVoltage >=
          calculatedSourceVoltage
        ) {
          throw new Error(
            "Charging voltage must be less than source voltage.",
          );
        }

        calculatedTime =
          -calculatedTimeConstant *
          Math.log(
            1 -
            calculatedVoltage /
            calculatedSourceVoltage,
          );

        formula = "t = −τ ln(1 − V/Vs)";
        substitution =
          `t = −${calculatedTimeConstant} × ` +
          `ln(1 − ${calculatedVoltage} ÷ ` +
          `${calculatedSourceVoltage})`;

        break;
      }

      case "sourceVoltage": {
        calculatedVoltage =
          requirePositiveFiniteValue(
            voltage,
            "voltage",
          );

        calculatedTime =
          requirePositiveFiniteValue(
            time,
            "time",
          );

        const chargingFactor =
          1 -
          Math.exp(
            -calculatedTime /
            calculatedTimeConstant,
          );

        calculatedSourceVoltage =
          calculatedVoltage /
          chargingFactor;

        formula = "Vs = V ÷ (1 − e⁻ᵗ/τ)";
        substitution =
          `Vs = ${calculatedVoltage} ÷ ` +
          `(1 − e^(-${calculatedTime} ÷ ` +
          `${calculatedTimeConstant}))`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in charging mode.",
        );
    }
  } else if (mode === "dischargingVoltage") {
    calculatedTimeConstant =
      requirePositiveFiniteValue(
        timeConstant,
        "timeConstant",
      );

    switch (solveFor) {
      case "voltage": {
        calculatedInitialVoltage =
          requirePositiveFiniteValue(
            initialVoltage,
            "initialVoltage",
          );

        calculatedTime =
          requirePositiveFiniteValue(
            time,
            "time",
          );

        calculatedVoltage =
          calculatedInitialVoltage *
          Math.exp(
            -calculatedTime /
            calculatedTimeConstant,
          );

        formula = "V(t) = V₀e⁻ᵗ/τ";
        substitution =
          `V(t) = ${calculatedInitialVoltage} × ` +
          `e^(-${calculatedTime} ÷ ` +
          `${calculatedTimeConstant})`;

        break;
      }

      case "time": {
        calculatedVoltage =
          requirePositiveFiniteValue(
            voltage,
            "voltage",
          );

        calculatedInitialVoltage =
          requirePositiveFiniteValue(
            initialVoltage,
            "initialVoltage",
          );

        if (
          calculatedVoltage >=
          calculatedInitialVoltage
        ) {
          throw new Error(
            "Discharging voltage must be less than initial voltage.",
          );
        }

        calculatedTime =
          -calculatedTimeConstant *
          Math.log(
            calculatedVoltage /
            calculatedInitialVoltage,
          );

        formula = "t = −τ ln(V/V₀)";
        substitution =
          `t = −${calculatedTimeConstant} × ` +
          `ln(${calculatedVoltage} ÷ ` +
          `${calculatedInitialVoltage})`;

        break;
      }

      case "initialVoltage": {
        calculatedVoltage =
          requirePositiveFiniteValue(
            voltage,
            "voltage",
          );

        calculatedTime =
          requirePositiveFiniteValue(
            time,
            "time",
          );

        calculatedInitialVoltage =
          calculatedVoltage /
          Math.exp(
            -calculatedTime /
            calculatedTimeConstant,
          );

        formula = "V₀ = V ÷ e⁻ᵗ/τ";
        substitution =
          `V₀ = ${calculatedVoltage} ÷ ` +
          `e^(-${calculatedTime} ÷ ` +
          `${calculatedTimeConstant})`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in discharging mode.",
        );
    }
  } else {
    const exhaustiveCheck: never = mode;

    throw new Error(
      `Unsupported RC calculation mode: ${exhaustiveCheck}`,
    );
  }

  if (
    calculatedTimeConstant === undefined ||
    !Number.isFinite(calculatedTimeConstant) ||
    calculatedTimeConstant <= 0
  ) {
    throw new Error(
      "The RC time constant calculation could not be completed.",
    );
  }

  const solvedValues: Partial<
    Record<RcTimeConstantVariable, number>
  > = {
    timeConstant: calculatedTimeConstant,
    resistance: calculatedResistance,
    capacitance: calculatedCapacitance,
    voltage: calculatedVoltage,
    sourceVoltage: calculatedSourceVoltage,
    initialVoltage: calculatedInitialVoltage,
    time: calculatedTime,
  };

  const solvedValue = solvedValues[solveFor];

  if (
    solvedValue === undefined ||
    !Number.isFinite(solvedValue) ||
    solvedValue <= 0
  ) {
    throw new Error(
      "The requested RC circuit value could not be calculated.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      mode,
      timeConstant: calculatedTimeConstant,
      resistance: calculatedResistance,
      capacitance: calculatedCapacitance,
      voltage: calculatedVoltage,
      sourceVoltage: calculatedSourceVoltage,
      initialVoltage: calculatedInitialVoltage,
      time: calculatedTime,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
