import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export const ELECTRIC_CONSTANT =
  8.9875517923e9;

export type ElectricFieldMode =
  | "forceCharge"
  | "pointCharge";

export type ElectricFieldVariable =
  | "electricField"
  | "force"
  | "testCharge"
  | "sourceCharge"
  | "distance";

export type ElectricFieldInput = {
  mode: ElectricFieldMode;
  solveFor: ElectricFieldVariable;
  electricField?: number;
  force?: number;
  testCharge?: number;
  sourceCharge?: number;
  distance?: number;
};

export type ElectricFieldDetails = {
  mode: ElectricFieldMode;
  electricField: number;
  force?: number;
  testCharge?: number;
  sourceCharge?: number;
  distance?: number;
  electricConstant: number;
  solvedVariable: ElectricFieldVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  ElectricFieldVariable,
  string
> = {
  electricField: "Electric field strength",
  force: "Electric force",
  testCharge: "Test charge",
  sourceCharge: "Source charge",
  distance: "Distance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: ElectricFieldVariable,
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

export function calculateElectricField({
  mode,
  solveFor,
  electricField,
  force,
  testCharge,
  sourceCharge,
  distance,
}: ElectricFieldInput): CalculationResult<ElectricFieldDetails> {
  let calculatedElectricField = electricField;
  let calculatedForce = force;
  let calculatedTestCharge = testCharge;
  let calculatedSourceCharge = sourceCharge;
  let calculatedDistance = distance;
  let formula = "";
  let substitution = "";

  if (mode === "forceCharge") {
    switch (solveFor) {
      case "electricField": {
        calculatedForce =
          requirePositiveFiniteValue(
            force,
            "force",
          );

        calculatedTestCharge =
          requirePositiveFiniteValue(
            testCharge,
            "testCharge",
          );

        calculatedElectricField =
          calculatedForce /
          calculatedTestCharge;

        formula = "E = F ÷ q";
        substitution =
          `E = ${calculatedForce} ÷ ` +
          `${calculatedTestCharge}`;

        break;
      }

      case "force": {
        calculatedElectricField =
          requirePositiveFiniteValue(
            electricField,
            "electricField",
          );

        calculatedTestCharge =
          requirePositiveFiniteValue(
            testCharge,
            "testCharge",
          );

        calculatedForce =
          calculatedElectricField *
          calculatedTestCharge;

        formula = "F = Eq";
        substitution =
          `F = ${calculatedElectricField} × ` +
          `${calculatedTestCharge}`;

        break;
      }

      case "testCharge": {
        calculatedForce =
          requirePositiveFiniteValue(
            force,
            "force",
          );

        calculatedElectricField =
          requirePositiveFiniteValue(
            electricField,
            "electricField",
          );

        calculatedTestCharge =
          calculatedForce /
          calculatedElectricField;

        formula = "q = F ÷ E";
        substitution =
          `q = ${calculatedForce} ÷ ` +
          `${calculatedElectricField}`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in force-charge mode.",
        );
    }

    if (
      calculatedElectricField === undefined ||
      calculatedForce === undefined ||
      calculatedTestCharge === undefined ||
      !Number.isFinite(calculatedElectricField) ||
      !Number.isFinite(calculatedForce) ||
      !Number.isFinite(calculatedTestCharge) ||
      calculatedElectricField <= 0 ||
      calculatedForce <= 0 ||
      calculatedTestCharge <= 0
    ) {
      throw new Error(
        "The electric field calculation could not be completed.",
      );
    }
  } else if (mode === "pointCharge") {
    switch (solveFor) {
      case "electricField": {
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

        calculatedElectricField =
          (
            ELECTRIC_CONSTANT *
            calculatedSourceCharge
          ) /
          calculatedDistance ** 2;

        formula = "E = kQ ÷ r²";
        substitution =
          `E = ${ELECTRIC_CONSTANT} × ` +
          `${calculatedSourceCharge} ÷ ` +
          `${calculatedDistance}²`;

        break;
      }

      case "sourceCharge": {
        calculatedElectricField =
          requirePositiveFiniteValue(
            electricField,
            "electricField",
          );

        calculatedDistance =
          requirePositiveFiniteValue(
            distance,
            "distance",
          );

        calculatedSourceCharge =
          (
            calculatedElectricField *
            calculatedDistance ** 2
          ) /
          ELECTRIC_CONSTANT;

        formula = "Q = Er² ÷ k";
        substitution =
          `Q = ${calculatedElectricField} × ` +
          `${calculatedDistance}² ÷ ` +
          `${ELECTRIC_CONSTANT}`;

        break;
      }

      case "distance": {
        calculatedElectricField =
          requirePositiveFiniteValue(
            electricField,
            "electricField",
          );

        calculatedSourceCharge =
          requirePositiveFiniteValue(
            sourceCharge,
            "sourceCharge",
          );

        calculatedDistance = Math.sqrt(
          (
            ELECTRIC_CONSTANT *
            calculatedSourceCharge
          ) /
            calculatedElectricField,
        );

        formula = "r = √(kQ ÷ E)";
        substitution =
          `r = √(${ELECTRIC_CONSTANT} × ` +
          `${calculatedSourceCharge} ÷ ` +
          `${calculatedElectricField})`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in point-charge mode.",
        );
    }

    if (
      calculatedElectricField === undefined ||
      calculatedSourceCharge === undefined ||
      calculatedDistance === undefined ||
      !Number.isFinite(calculatedElectricField) ||
      !Number.isFinite(calculatedSourceCharge) ||
      !Number.isFinite(calculatedDistance) ||
      calculatedElectricField <= 0 ||
      calculatedSourceCharge <= 0 ||
      calculatedDistance <= 0
    ) {
      throw new Error(
        "The electric field calculation could not be completed.",
      );
    }
  } else {
    const exhaustiveCheck: never = mode;

    throw new Error(
      `Unsupported electric field mode: ${exhaustiveCheck}`,
    );
  }

  const solvedValues: Partial<
    Record<ElectricFieldVariable, number>
  > = {
    electricField: calculatedElectricField,
    force: calculatedForce,
    testCharge: calculatedTestCharge,
    sourceCharge: calculatedSourceCharge,
    distance: calculatedDistance,
  };

  const solvedValue = solvedValues[solveFor];

  if (
    solvedValue === undefined ||
    !Number.isFinite(solvedValue) ||
    solvedValue <= 0
  ) {
    throw new Error(
      "The requested electric field value could not be calculated.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      mode,
      electricField: calculatedElectricField,
      force: calculatedForce,
      testCharge: calculatedTestCharge,
      sourceCharge: calculatedSourceCharge,
      distance: calculatedDistance,
      electricConstant: ELECTRIC_CONSTANT,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
