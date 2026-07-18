import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type VoltageDropVariable =
  | "voltageDrop"
  | "current"
  | "oneWayLength"
  | "crossSectionalArea"
  | "resistivity";

export type VoltageDropInput = {
  voltageDrop?: number;
  current?: number;
  oneWayLength?: number;
  crossSectionalArea?: number;
  resistivity?: number;
  solveFor: VoltageDropVariable;
};

export type VoltageDropDetails = {
  voltageDrop: number;
  current: number;
  oneWayLength: number;
  crossSectionalArea: number;
  resistivity: number;
  loopResistance: number;
  powerLoss: number;
  solvedVariable: VoltageDropVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  VoltageDropVariable,
  string
> = {
  voltageDrop: "Voltage drop",
  current: "Current",
  oneWayLength: "One-way conductor length",
  crossSectionalArea: "Cross-sectional area",
  resistivity: "Conductor resistivity",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: VoltageDropVariable,
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

export function calculateVoltageDrop({
  voltageDrop,
  current,
  oneWayLength,
  crossSectionalArea,
  resistivity,
  solveFor,
}: VoltageDropInput): CalculationResult<VoltageDropDetails> {
  let calculatedVoltageDrop = voltageDrop;
  let calculatedCurrent = current;
  let calculatedOneWayLength = oneWayLength;
  let calculatedCrossSectionalArea =
    crossSectionalArea;
  let calculatedResistivity = resistivity;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "voltageDrop": {
      calculatedCurrent =
        requirePositiveFiniteValue(
          current,
          "current",
        );

      calculatedOneWayLength =
        requirePositiveFiniteValue(
          oneWayLength,
          "oneWayLength",
        );

      calculatedCrossSectionalArea =
        requirePositiveFiniteValue(
          crossSectionalArea,
          "crossSectionalArea",
        );

      calculatedResistivity =
        requirePositiveFiniteValue(
          resistivity,
          "resistivity",
        );

      calculatedVoltageDrop =
        (2 *
          calculatedCurrent *
          calculatedResistivity *
          calculatedOneWayLength) /
        (calculatedCrossSectionalArea * 1e-6);

      formula = "Vdrop = 2 × I × ρ × L ÷ A";
      substitution =
        `Vdrop = 2 × ${calculatedCurrent} × ` +
        `${calculatedResistivity} × ` +
        `${calculatedOneWayLength} ÷ ` +
        `(${calculatedCrossSectionalArea} × 10⁻⁶)`;

      break;
    }

    case "current": {
      calculatedVoltageDrop =
        requirePositiveFiniteValue(
          voltageDrop,
          "voltageDrop",
        );

      calculatedOneWayLength =
        requirePositiveFiniteValue(
          oneWayLength,
          "oneWayLength",
        );

      calculatedCrossSectionalArea =
        requirePositiveFiniteValue(
          crossSectionalArea,
          "crossSectionalArea",
        );

      calculatedResistivity =
        requirePositiveFiniteValue(
          resistivity,
          "resistivity",
        );

      calculatedCurrent =
        (calculatedVoltageDrop *
          calculatedCrossSectionalArea *
          1e-6) /
        (2 *
          calculatedResistivity *
          calculatedOneWayLength);

      formula = "I = Vdrop × A ÷ (2 × ρ × L)";
      substitution =
        `I = ${calculatedVoltageDrop} × ` +
        `(${calculatedCrossSectionalArea} × 10⁻⁶) ÷ ` +
        `(2 × ${calculatedResistivity} × ` +
        `${calculatedOneWayLength})`;

      break;
    }

    case "oneWayLength": {
      calculatedVoltageDrop =
        requirePositiveFiniteValue(
          voltageDrop,
          "voltageDrop",
        );

      calculatedCurrent =
        requirePositiveFiniteValue(
          current,
          "current",
        );

      calculatedCrossSectionalArea =
        requirePositiveFiniteValue(
          crossSectionalArea,
          "crossSectionalArea",
        );

      calculatedResistivity =
        requirePositiveFiniteValue(
          resistivity,
          "resistivity",
        );

      calculatedOneWayLength =
        (calculatedVoltageDrop *
          calculatedCrossSectionalArea *
          1e-6) /
        (2 *
          calculatedCurrent *
          calculatedResistivity);

      formula = "L = Vdrop × A ÷ (2 × I × ρ)";
      substitution =
        `L = ${calculatedVoltageDrop} × ` +
        `(${calculatedCrossSectionalArea} × 10⁻⁶) ÷ ` +
        `(2 × ${calculatedCurrent} × ` +
        `${calculatedResistivity})`;

      break;
    }

    case "crossSectionalArea": {
      calculatedVoltageDrop =
        requirePositiveFiniteValue(
          voltageDrop,
          "voltageDrop",
        );

      calculatedCurrent =
        requirePositiveFiniteValue(
          current,
          "current",
        );

      calculatedOneWayLength =
        requirePositiveFiniteValue(
          oneWayLength,
          "oneWayLength",
        );

      calculatedResistivity =
        requirePositiveFiniteValue(
          resistivity,
          "resistivity",
        );

      calculatedCrossSectionalArea =
        ((2 *
          calculatedCurrent *
          calculatedResistivity *
          calculatedOneWayLength) /
          calculatedVoltageDrop) *
        1e6;

      formula = "A = 2 × I × ρ × L ÷ Vdrop";
      substitution =
        `A = 2 × ${calculatedCurrent} × ` +
        `${calculatedResistivity} × ` +
        `${calculatedOneWayLength} ÷ ` +
        `${calculatedVoltageDrop}`;

      break;
    }

    case "resistivity": {
      calculatedVoltageDrop =
        requirePositiveFiniteValue(
          voltageDrop,
          "voltageDrop",
        );

      calculatedCurrent =
        requirePositiveFiniteValue(
          current,
          "current",
        );

      calculatedOneWayLength =
        requirePositiveFiniteValue(
          oneWayLength,
          "oneWayLength",
        );

      calculatedCrossSectionalArea =
        requirePositiveFiniteValue(
          crossSectionalArea,
          "crossSectionalArea",
        );

      calculatedResistivity =
        (calculatedVoltageDrop *
          calculatedCrossSectionalArea *
          1e-6) /
        (2 *
          calculatedCurrent *
          calculatedOneWayLength);

      formula = "ρ = Vdrop × A ÷ (2 × I × L)";
      substitution =
        `ρ = ${calculatedVoltageDrop} × ` +
        `(${calculatedCrossSectionalArea} × 10⁻⁶) ÷ ` +
        `(2 × ${calculatedCurrent} × ` +
        `${calculatedOneWayLength})`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported voltage drop variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedVoltageDrop === undefined ||
    calculatedCurrent === undefined ||
    calculatedOneWayLength === undefined ||
    calculatedCrossSectionalArea === undefined ||
    calculatedResistivity === undefined ||
    !Number.isFinite(calculatedVoltageDrop) ||
    !Number.isFinite(calculatedCurrent) ||
    !Number.isFinite(calculatedOneWayLength) ||
    !Number.isFinite(calculatedCrossSectionalArea) ||
    !Number.isFinite(calculatedResistivity) ||
    calculatedVoltageDrop <= 0 ||
    calculatedCurrent <= 0 ||
    calculatedOneWayLength <= 0 ||
    calculatedCrossSectionalArea <= 0 ||
    calculatedResistivity <= 0
  ) {
    throw new Error(
      "The voltage drop calculation could not be completed.",
    );
  }

  const areaSquareMetres =
    calculatedCrossSectionalArea * 1e-6;

  const loopResistance =
    (2 *
      calculatedResistivity *
      calculatedOneWayLength) /
    areaSquareMetres;

  const powerLoss =
    calculatedCurrent ** 2 * loopResistance;

  const solvedValue = {
    voltageDrop: calculatedVoltageDrop,
    current: calculatedCurrent,
    oneWayLength: calculatedOneWayLength,
    crossSectionalArea:
      calculatedCrossSectionalArea,
    resistivity: calculatedResistivity,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      voltageDrop: calculatedVoltageDrop,
      current: calculatedCurrent,
      oneWayLength: calculatedOneWayLength,
      crossSectionalArea:
        calculatedCrossSectionalArea,
      resistivity: calculatedResistivity,
      loopResistance,
      powerLoss,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
