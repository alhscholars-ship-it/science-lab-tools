import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type InclinedPlaneVariable =
  | "parallelForce"
  | "normalForce"
  | "frictionForce"
  | "netForce"
  | "acceleration";

export type InclinedPlaneInput = {
  mass: number;
  angleDegrees: number;
  gravity?: number;
  coefficient?: number;
  solveFor: InclinedPlaneVariable;
};

export type InclinedPlaneDetails = {
  mass: number;
  angleDegrees: number;
  angleRadians: number;
  gravity: number;
  coefficient: number;
  parallelForce: number;
  normalForce: number;
  frictionForce: number;
  netForce: number;
  acceleration: number;
  solvedVariable: InclinedPlaneVariable;
  formula: string;
};

const formulas: Record<
  InclinedPlaneVariable,
  string
> = {
  parallelForce: "F∥ = mg sin(θ)",
  normalForce: "N = mg cos(θ)",
  frictionForce: "Ff = μN",
  netForce: "Fnet = mg sin(θ) − μmg cos(θ)",
  acceleration: "a = g[sin(θ) − μ cos(θ)]",
};

function requireFiniteValue(
  value: number,
  label: string,
): number {
  if (!Number.isFinite(value)) {
    throw new Error(
      `${label} must be a finite number.`,
    );
  }

  return value;
}

function requirePositiveValue(
  value: number,
  label: string,
): number {
  const finiteValue = requireFiniteValue(
    value,
    label,
  );

  if (finiteValue <= 0) {
    throw new Error(
      `${label} must be greater than zero.`,
    );
  }

  return finiteValue;
}

function requireAngle(
  angleDegrees: number,
): number {
  const angle = requireFiniteValue(
    angleDegrees,
    "Incline angle",
  );

  if (angle < 0 || angle >= 90) {
    throw new Error(
      "Incline angle must be at least 0° and less than 90°.",
    );
  }

  return angle;
}

function requireCoefficient(
  coefficient: number,
): number {
  const value = requireFiniteValue(
    coefficient,
    "Coefficient of friction",
  );

  if (value < 0) {
    throw new Error(
      "Coefficient of friction cannot be negative.",
    );
  }

  return value;
}

function requireSolveFor(
  solveFor: InclinedPlaneVariable,
): InclinedPlaneVariable {
  if (!(solveFor in formulas)) {
    throw new Error(
      "Unsupported inclined-plane variable.",
    );
  }

  return solveFor;
}

export function calculateInclinedPlane({
  mass,
  angleDegrees,
  gravity = 9.80665,
  coefficient = 0,
  solveFor,
}: InclinedPlaneInput): CalculationResult<InclinedPlaneDetails> {
  const validMass = requirePositiveValue(
    mass,
    "Mass",
  );

  const validAngle =
    requireAngle(angleDegrees);

  const validGravity = requirePositiveValue(
    gravity,
    "Gravity",
  );

  const validCoefficient =
    requireCoefficient(coefficient);

  const validSolveFor =
    requireSolveFor(solveFor);

  const angleRadians =
    (validAngle * Math.PI) / 180;

  const parallelForce =
    validMass *
    validGravity *
    Math.sin(angleRadians);

  const normalForce =
    validMass *
    validGravity *
    Math.cos(angleRadians);

  const frictionForce =
    validCoefficient * normalForce;

  const netForce =
    parallelForce - frictionForce;

  const acceleration =
    netForce / validMass;

  const values: Record<
    InclinedPlaneVariable,
    number
  > = {
    parallelForce,
    normalForce,
    frictionForce,
    netForce,
    acceleration,
  };

  const solvedValue = values[validSolveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      mass: validMass,
      angleDegrees: validAngle,
      angleRadians,
      gravity: validGravity,
      coefficient: validCoefficient,
      parallelForce,
      normalForce,
      frictionForce,
      netForce,
      acceleration,
      solvedVariable: validSolveFor,
      formula: formulas[validSolveFor],
    },
  };
}
