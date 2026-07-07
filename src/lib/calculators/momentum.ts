import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type MomentumVariable =
  | "momentum"
  | "mass"
  | "velocity";

export type MomentumInput = {
  momentum?: number;
  mass?: number;
  velocity?: number;
  solveFor: MomentumVariable;
};

export type MomentumDetails = {
  momentum: number;
  mass: number;
  velocity: number;
  solvedVariable: MomentumVariable;
  formula: string;
};

const variableLabels: Record<
  MomentumVariable,
  string
> = {
  momentum: "Momentum",
  mass: "Mass",
  velocity: "Velocity",
};

function requireFiniteValue(
  value: number | undefined,
  variable: MomentumVariable,
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

function requirePositiveMass(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "mass",
  );

  if (finiteValue <= 0) {
    throw new Error(
      "Mass must be greater than zero.",
    );
  }

  return finiteValue;
}

function requireNonZeroVelocity(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "velocity",
  );

  if (finiteValue === 0) {
    throw new Error(
      "Velocity cannot be zero when calculating mass.",
    );
  }

  return finiteValue;
}

export function calculateMomentum({
  momentum,
  mass,
  velocity,
  solveFor,
}: MomentumInput): CalculationResult<MomentumDetails> {
  let calculatedMomentum = momentum;
  let calculatedMass = mass;
  let calculatedVelocity = velocity;

  switch (solveFor) {
    case "momentum": {
      calculatedMass = requirePositiveMass(mass);
      calculatedVelocity = requireFiniteValue(
        velocity,
        "velocity",
      );

      calculatedMomentum =
        calculatedMass * calculatedVelocity;
      break;
    }

    case "mass": {
      calculatedMomentum = requireFiniteValue(
        momentum,
        "momentum",
      );

      calculatedVelocity =
        requireNonZeroVelocity(velocity);

      calculatedMass =
        calculatedMomentum / calculatedVelocity;

      if (calculatedMass <= 0) {
        throw new Error(
          "Momentum and velocity must have matching signs to produce a positive mass.",
        );
      }
      break;
    }

    case "velocity": {
      calculatedMomentum = requireFiniteValue(
        momentum,
        "momentum",
      );

      calculatedMass =
        requirePositiveMass(mass);

      calculatedVelocity =
        calculatedMomentum / calculatedMass;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported momentum variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    momentum: calculatedMomentum,
    mass: calculatedMass,
    velocity: calculatedVelocity,
  }[solveFor];

  if (
    calculatedMomentum === undefined ||
    calculatedMass === undefined ||
    calculatedVelocity === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The momentum calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      momentum: calculatedMomentum,
      mass: calculatedMass,
      velocity: calculatedVelocity,
      solvedVariable: solveFor,
      formula: "p = m × v",
    },
  };
}
