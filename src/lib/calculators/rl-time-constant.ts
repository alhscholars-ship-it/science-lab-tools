import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RlTimeConstantMode =
  | "timeConstant"
  | "currentRise"
  | "currentDecay";

export type RlTimeConstantVariable =
  | "timeConstant"
  | "inductance"
  | "resistance"
  | "current"
  | "maximumCurrent"
  | "initialCurrent"
  | "time";

export type RlTimeConstantInput = {
  mode: RlTimeConstantMode;
  solveFor: RlTimeConstantVariable;
  timeConstant?: number;
  inductance?: number;
  resistance?: number;
  current?: number;
  maximumCurrent?: number;
  initialCurrent?: number;
  time?: number;
};

export type RlTimeConstantDetails = {
  mode: RlTimeConstantMode;
  timeConstant: number;
  inductance?: number;
  resistance?: number;
  current?: number;
  maximumCurrent?: number;
  initialCurrent?: number;
  time?: number;
  solvedVariable: RlTimeConstantVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  RlTimeConstantVariable,
  string
> = {
  timeConstant: "Time constant",
  inductance: "Inductance",
  resistance: "Resistance",
  current: "Inductor current",
  maximumCurrent: "Maximum current",
  initialCurrent: "Initial current",
  time: "Elapsed time",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: RlTimeConstantVariable,
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

export function calculateRlTimeConstant({
  mode,
  solveFor,
  timeConstant,
  inductance,
  resistance,
  current,
  maximumCurrent,
  initialCurrent,
  time,
}: RlTimeConstantInput): CalculationResult<RlTimeConstantDetails> {
  let calculatedTimeConstant = timeConstant;
  let calculatedInductance = inductance;
  let calculatedResistance = resistance;
  let calculatedCurrent = current;
  let calculatedMaximumCurrent =
    maximumCurrent;
  let calculatedInitialCurrent =
    initialCurrent;
  let calculatedTime = time;
  let formula = "";
  let substitution = "";

  if (mode === "timeConstant") {
    switch (solveFor) {
      case "timeConstant": {
        calculatedInductance =
          requirePositiveFiniteValue(
            inductance,
            "inductance",
          );

        calculatedResistance =
          requirePositiveFiniteValue(
            resistance,
            "resistance",
          );

        calculatedTimeConstant =
          calculatedInductance /
          calculatedResistance;

        formula = "τ = L ÷ R";
        substitution =
          `τ = ${calculatedInductance} ÷ ` +
          `${calculatedResistance}`;

        break;
      }

      case "inductance": {
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

        calculatedInductance =
          calculatedTimeConstant *
          calculatedResistance;

        formula = "L = τR";
        substitution =
          `L = ${calculatedTimeConstant} × ` +
          `${calculatedResistance}`;

        break;
      }

      case "resistance": {
        calculatedInductance =
          requirePositiveFiniteValue(
            inductance,
            "inductance",
          );

        calculatedTimeConstant =
          requirePositiveFiniteValue(
            timeConstant,
            "timeConstant",
          );

        calculatedResistance =
          calculatedInductance /
          calculatedTimeConstant;

        formula = "R = L ÷ τ";
        substitution =
          `R = ${calculatedInductance} ÷ ` +
          `${calculatedTimeConstant}`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in time-constant mode.",
        );
    }
  } else if (mode === "currentRise") {
    calculatedTimeConstant =
      requirePositiveFiniteValue(
        timeConstant,
        "timeConstant",
      );

    switch (solveFor) {
      case "current": {
        calculatedMaximumCurrent =
          requirePositiveFiniteValue(
            maximumCurrent,
            "maximumCurrent",
          );

        calculatedTime =
          requirePositiveFiniteValue(
            time,
            "time",
          );

        calculatedCurrent =
          calculatedMaximumCurrent *
          (
            1 -
            Math.exp(
              -calculatedTime /
              calculatedTimeConstant,
            )
          );

        formula = "I(t) = Imax(1 − e⁻ᵗ/τ)";
        substitution =
          `I(t) = ${calculatedMaximumCurrent} × ` +
          `(1 − e^(-${calculatedTime} ÷ ` +
          `${calculatedTimeConstant}))`;

        break;
      }

      case "time": {
        calculatedCurrent =
          requirePositiveFiniteValue(
            current,
            "current",
          );

        calculatedMaximumCurrent =
          requirePositiveFiniteValue(
            maximumCurrent,
            "maximumCurrent",
          );

        if (
          calculatedCurrent >=
          calculatedMaximumCurrent
        ) {
          throw new Error(
            "Rising current must be less than maximum current.",
          );
        }

        calculatedTime =
          -calculatedTimeConstant *
          Math.log(
            1 -
            calculatedCurrent /
            calculatedMaximumCurrent,
          );

        formula = "t = −τ ln(1 − I/Imax)";
        substitution =
          `t = −${calculatedTimeConstant} × ` +
          `ln(1 − ${calculatedCurrent} ÷ ` +
          `${calculatedMaximumCurrent})`;

        break;
      }

      case "maximumCurrent": {
        calculatedCurrent =
          requirePositiveFiniteValue(
            current,
            "current",
          );

        calculatedTime =
          requirePositiveFiniteValue(
            time,
            "time",
          );

        const riseFactor =
          1 -
          Math.exp(
            -calculatedTime /
            calculatedTimeConstant,
          );

        calculatedMaximumCurrent =
          calculatedCurrent /
          riseFactor;

        formula =
          "Imax = I ÷ (1 − e⁻ᵗ/τ)";

        substitution =
          `Imax = ${calculatedCurrent} ÷ ` +
          `(1 − e^(-${calculatedTime} ÷ ` +
          `${calculatedTimeConstant}))`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in current-rise mode.",
        );
    }
  } else if (mode === "currentDecay") {
    calculatedTimeConstant =
      requirePositiveFiniteValue(
        timeConstant,
        "timeConstant",
      );

    switch (solveFor) {
      case "current": {
        calculatedInitialCurrent =
          requirePositiveFiniteValue(
            initialCurrent,
            "initialCurrent",
          );

        calculatedTime =
          requirePositiveFiniteValue(
            time,
            "time",
          );

        calculatedCurrent =
          calculatedInitialCurrent *
          Math.exp(
            -calculatedTime /
            calculatedTimeConstant,
          );

        formula = "I(t) = I₀e⁻ᵗ/τ";
        substitution =
          `I(t) = ${calculatedInitialCurrent} × ` +
          `e^(-${calculatedTime} ÷ ` +
          `${calculatedTimeConstant})`;

        break;
      }

      case "time": {
        calculatedCurrent =
          requirePositiveFiniteValue(
            current,
            "current",
          );

        calculatedInitialCurrent =
          requirePositiveFiniteValue(
            initialCurrent,
            "initialCurrent",
          );

        if (
          calculatedCurrent >=
          calculatedInitialCurrent
        ) {
          throw new Error(
            "Decaying current must be less than initial current.",
          );
        }

        calculatedTime =
          -calculatedTimeConstant *
          Math.log(
            calculatedCurrent /
            calculatedInitialCurrent,
          );

        formula = "t = −τ ln(I/I₀)";
        substitution =
          `t = −${calculatedTimeConstant} × ` +
          `ln(${calculatedCurrent} ÷ ` +
          `${calculatedInitialCurrent})`;

        break;
      }

      case "initialCurrent": {
        calculatedCurrent =
          requirePositiveFiniteValue(
            current,
            "current",
          );

        calculatedTime =
          requirePositiveFiniteValue(
            time,
            "time",
          );

        calculatedInitialCurrent =
          calculatedCurrent /
          Math.exp(
            -calculatedTime /
            calculatedTimeConstant,
          );

        formula = "I₀ = I ÷ e⁻ᵗ/τ";
        substitution =
          `I₀ = ${calculatedCurrent} ÷ ` +
          `e^(-${calculatedTime} ÷ ` +
          `${calculatedTimeConstant})`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in current-decay mode.",
        );
    }
  } else {
    const exhaustiveCheck: never = mode;

    throw new Error(
      `Unsupported RL calculation mode: ${exhaustiveCheck}`,
    );
  }

  if (
    calculatedTimeConstant === undefined ||
    !Number.isFinite(calculatedTimeConstant) ||
    calculatedTimeConstant <= 0
  ) {
    throw new Error(
      "The RL time constant calculation could not be completed.",
    );
  }

  const solvedValues: Partial<
    Record<RlTimeConstantVariable, number>
  > = {
    timeConstant: calculatedTimeConstant,
    inductance: calculatedInductance,
    resistance: calculatedResistance,
    current: calculatedCurrent,
    maximumCurrent:
      calculatedMaximumCurrent,
    initialCurrent:
      calculatedInitialCurrent,
    time: calculatedTime,
  };

  const solvedValue = solvedValues[solveFor];

  if (
    solvedValue === undefined ||
    !Number.isFinite(solvedValue) ||
    solvedValue <= 0
  ) {
    throw new Error(
      "The requested RL circuit value could not be calculated.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      mode,
      timeConstant: calculatedTimeConstant,
      inductance: calculatedInductance,
      resistance: calculatedResistance,
      current: calculatedCurrent,
      maximumCurrent:
        calculatedMaximumCurrent,
      initialCurrent:
        calculatedInitialCurrent,
      time: calculatedTime,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
