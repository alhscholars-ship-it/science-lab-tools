import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type PulleyVariable =
  | "loadForce"
  | "mechanicalAdvantage"
  | "effortForce"
  | "inputDistance";

export type PulleyInput = {
  loadMass: number;
  supportingSegments: number;
  loadDistance?: number;
  gravity?: number;
  solveFor: PulleyVariable;
};

export type PulleyDetails = {
  loadMass: number;
  supportingSegments: number;
  loadDistance: number;
  gravity: number;
  loadForce: number;
  mechanicalAdvantage: number;
  effortForce: number;
  inputDistance: number;
  solvedVariable: PulleyVariable;
  formula: string;
};

const formulas: Record<PulleyVariable, string> = {
  loadForce: "W = mg",
  mechanicalAdvantage: "IMA = n",
  effortForce: "Fe = W ÷ IMA",
  inputDistance: "de = IMA × dl",
};

function requireFiniteValue(
  value: number,
  label: string,
): number {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`);
  }

  return value;
}

function requirePositiveValue(
  value: number,
  label: string,
): number {
  const finiteValue = requireFiniteValue(value, label);

  if (finiteValue <= 0) {
    throw new Error(`${label} must be greater than zero.`);
  }

  return finiteValue;
}

function requireSupportingSegments(
  supportingSegments: number,
): number {
  const value = requireFiniteValue(
    supportingSegments,
    "Supporting rope segments",
  );

  if (!Number.isInteger(value) || value < 1) {
    throw new Error(
      "Supporting rope segments must be a positive whole number.",
    );
  }

  return value;
}

function requireSolveFor(
  solveFor: PulleyVariable,
): PulleyVariable {
  if (!(solveFor in formulas)) {
    throw new Error("Unsupported pulley variable.");
  }

  return solveFor;
}

export function calculatePulley({
  loadMass,
  supportingSegments,
  loadDistance = 1,
  gravity = 9.80665,
  solveFor,
}: PulleyInput): CalculationResult<PulleyDetails> {
  const validLoadMass = requirePositiveValue(
    loadMass,
    "Load mass",
  );

  const validSegments =
    requireSupportingSegments(supportingSegments);

  const validLoadDistance = requirePositiveValue(
    loadDistance,
    "Load distance",
  );

  const validGravity = requirePositiveValue(
    gravity,
    "Gravity",
  );

  const validSolveFor = requireSolveFor(solveFor);

  const loadForce =
    validLoadMass * validGravity;

  const mechanicalAdvantage = validSegments;

  const effortForce =
    loadForce / mechanicalAdvantage;

  const inputDistance =
    mechanicalAdvantage * validLoadDistance;

  const values: Record<PulleyVariable, number> = {
    loadForce,
    mechanicalAdvantage,
    effortForce,
    inputDistance,
  };

  const solvedValue = values[validSolveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      loadMass: validLoadMass,
      supportingSegments: validSegments,
      loadDistance: validLoadDistance,
      gravity: validGravity,
      loadForce,
      mechanicalAdvantage,
      effortForce,
      inputDistance,
      solvedVariable: validSolveFor,
      formula: formulas[validSolveFor],
    },
  };
}
