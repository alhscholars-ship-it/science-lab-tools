import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type FrictionVariable =
  | "frictionForce"
  | "coefficient"
  | "normalForce";

export type FrictionType =
  | "static"
  | "kinetic";

export type FrictionInput = {
  frictionForce?: number;
  coefficient?: number;
  normalForce?: number;
  frictionType?: FrictionType;
  solveFor: FrictionVariable;
};

export type FrictionDetails = {
  frictionForce: number;
  coefficient: number;
  normalForce: number;
  frictionType: FrictionType;
  solvedVariable: FrictionVariable;
  formula: string;
};

const variableLabels: Record<
  FrictionVariable,
  string
> = {
  frictionForce: "Friction force",
  coefficient: "Coefficient of friction",
  normalForce: "Normal force",
};

function requireFiniteValue(
  value: number | undefined,
  variable: FrictionVariable,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  return value;
}

function requirePositiveValue(
  value: number | undefined,
  variable: FrictionVariable,
): number {
  const finiteValue = requireFiniteValue(
    value,
    variable,
  );

  if (finiteValue <= 0) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return finiteValue;
}

function normalizeFrictionType(
  frictionType: FrictionType | undefined,
): FrictionType {
  const normalizedType =
    frictionType ?? "kinetic";

  if (
    normalizedType !== "static" &&
    normalizedType !== "kinetic"
  ) {
    throw new Error(
      "Friction type must be static or kinetic.",
    );
  }

  return normalizedType;
}

export function calculateFriction({
  frictionForce,
  coefficient,
  normalForce,
  frictionType,
  solveFor,
}: FrictionInput): CalculationResult<FrictionDetails> {
  const normalizedType =
    normalizeFrictionType(frictionType);

  let calculatedFrictionForce =
    frictionForce;
  let calculatedCoefficient =
    coefficient;
  let calculatedNormalForce =
    normalForce;

  switch (solveFor) {
    case "frictionForce": {
      calculatedCoefficient =
        requirePositiveValue(
          coefficient,
          "coefficient",
        );

      calculatedNormalForce =
        requirePositiveValue(
          normalForce,
          "normalForce",
        );

      calculatedFrictionForce =
        calculatedCoefficient *
        calculatedNormalForce;
      break;
    }

    case "coefficient": {
      calculatedFrictionForce =
        requirePositiveValue(
          frictionForce,
          "frictionForce",
        );

      calculatedNormalForce =
        requirePositiveValue(
          normalForce,
          "normalForce",
        );

      calculatedCoefficient =
        calculatedFrictionForce /
        calculatedNormalForce;
      break;
    }

    case "normalForce": {
      calculatedFrictionForce =
        requirePositiveValue(
          frictionForce,
          "frictionForce",
        );

      calculatedCoefficient =
        requirePositiveValue(
          coefficient,
          "coefficient",
        );

      calculatedNormalForce =
        calculatedFrictionForce /
        calculatedCoefficient;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported friction variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    frictionForce: calculatedFrictionForce,
    coefficient: calculatedCoefficient,
    normalForce: calculatedNormalForce,
  }[solveFor];

  if (
    calculatedFrictionForce === undefined ||
    calculatedCoefficient === undefined ||
    calculatedNormalForce === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The friction calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      frictionForce:
        calculatedFrictionForce,
      coefficient:
        calculatedCoefficient,
      normalForce:
        calculatedNormalForce,
      frictionType: normalizedType,
      solvedVariable: solveFor,
      formula:
        normalizedType === "static"
          ? "Fs = μsN"
          : "Fk = μkN",
    },
  };
}
