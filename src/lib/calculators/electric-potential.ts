import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export const ELECTRIC_POTENTIAL_CONSTANT =
  8.9875517923e9;

export type ElectricPotentialVariable =
  | "electricPotential"
  | "sourceCharge"
  | "distance";

export type ElectricPotentialInput = {
  electricPotential?: number;
  sourceCharge?: number;
  distance?: number;
  solveFor: ElectricPotentialVariable;
};

export type ElectricPotentialDetails = {
  electricPotential: number;
  sourceCharge: number;
  distance: number;
  electricConstant: number;
  solvedVariable: ElectricPotentialVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  ElectricPotentialVariable,
  string
> = {
  electricPotential: "Electric potential",
  sourceCharge: "Source charge",
  distance: "Distance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: ElectricPotentialVariable,
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

export function calculateElectricPotential({
  electricPotential,
  sourceCharge,
  distance,
  solveFor,
}: ElectricPotentialInput): CalculationResult<ElectricPotentialDetails> {
  let calculatedElectricPotential =
    electricPotential;
  let calculatedSourceCharge = sourceCharge;
  let calculatedDistance = distance;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "electricPotential": {
      calculatedSourceCharge =
        requirePositiveFiniteValue(
          sourceCharge,
          "sourceCharge",
        );

      calculatedDistance =
        requirePositiveFiniteValue(
          distance,
          "distance",
        );

      calculatedElectricPotential =
        (
          ELECTRIC_POTENTIAL_CONSTANT *
          calculatedSourceCharge
        ) /
        calculatedDistance;

      formula = "V = kQ ÷ r";
      substitution =
        `V = ${ELECTRIC_POTENTIAL_CONSTANT} × ` +
        `${calculatedSourceCharge} ÷ ` +
        `${calculatedDistance}`;

      break;
    }

    case "sourceCharge": {
      calculatedElectricPotential =
        requirePositiveFiniteValue(
          electricPotential,
          "electricPotential",
        );

      calculatedDistance =
        requirePositiveFiniteValue(
          distance,
          "distance",
        );

      calculatedSourceCharge =
        (
          calculatedElectricPotential *
          calculatedDistance
        ) /
        ELECTRIC_POTENTIAL_CONSTANT;

      formula = "Q = Vr ÷ k";
      substitution =
        `Q = ${calculatedElectricPotential} × ` +
        `${calculatedDistance} ÷ ` +
        `${ELECTRIC_POTENTIAL_CONSTANT}`;

      break;
    }

    case "distance": {
      calculatedElectricPotential =
        requirePositiveFiniteValue(
          electricPotential,
          "electricPotential",
        );

      calculatedSourceCharge =
        requirePositiveFiniteValue(
          sourceCharge,
          "sourceCharge",
        );

      calculatedDistance =
        (
          ELECTRIC_POTENTIAL_CONSTANT *
          calculatedSourceCharge
        ) /
        calculatedElectricPotential;

      formula = "r = kQ ÷ V";
      substitution =
        `r = ${ELECTRIC_POTENTIAL_CONSTANT} × ` +
        `${calculatedSourceCharge} ÷ ` +
        `${calculatedElectricPotential}`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported electric potential variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedElectricPotential === undefined ||
    calculatedSourceCharge === undefined ||
    calculatedDistance === undefined ||
    !Number.isFinite(
      calculatedElectricPotential,
    ) ||
    !Number.isFinite(calculatedSourceCharge) ||
    !Number.isFinite(calculatedDistance) ||
    calculatedElectricPotential <= 0 ||
    calculatedSourceCharge <= 0 ||
    calculatedDistance <= 0
  ) {
    throw new Error(
      "The electric potential calculation could not be completed.",
    );
  }

  const solvedValue = {
    electricPotential:
      calculatedElectricPotential,
    sourceCharge: calculatedSourceCharge,
    distance: calculatedDistance,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      electricPotential:
        calculatedElectricPotential,
      sourceCharge: calculatedSourceCharge,
      distance: calculatedDistance,
      electricConstant:
        ELECTRIC_POTENTIAL_CONSTANT,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
