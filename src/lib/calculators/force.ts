import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type ForceVariable =
  | "force"
  | "mass"
  | "acceleration";

export type ForceInput = {
  force?: number;
  mass?: number;
  acceleration?: number;
  solveFor: ForceVariable;
};

export type ForceDetails = {
  force: number;
  mass: number;
  acceleration: number;
  solvedVariable: ForceVariable;
  formula: string;
};

const variableLabels: Record<
  ForceVariable,
  string
> = {
  force: "Force",
  mass: "Mass",
  acceleration: "Acceleration",
};

function requireFiniteValue(
  value: number | undefined,
  variable: ForceVariable,
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

function requireNonZeroAcceleration(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "acceleration",
  );

  if (finiteValue === 0) {
    throw new Error(
      "Acceleration cannot be zero when calculating mass.",
    );
  }

  return finiteValue;
}

export function calculateForce({
  force,
  mass,
  acceleration,
  solveFor,
}: ForceInput): CalculationResult<ForceDetails> {
  let calculatedForce = force;
  let calculatedMass = mass;
  let calculatedAcceleration = acceleration;

  switch (solveFor) {
    case "force": {
      calculatedMass = requirePositiveMass(mass);
      calculatedAcceleration =
        requireFiniteValue(
          acceleration,
          "acceleration",
        );

      calculatedForce =
        calculatedMass *
        calculatedAcceleration;
      break;
    }

    case "mass": {
      calculatedForce = requireFiniteValue(
        force,
        "force",
      );

      calculatedAcceleration =
        requireNonZeroAcceleration(
          acceleration,
        );

      calculatedMass =
        calculatedForce /
        calculatedAcceleration;

      if (calculatedMass <= 0) {
        throw new Error(
          "Force and acceleration must have matching signs to produce a positive mass.",
        );
      }
      break;
    }

    case "acceleration": {
      calculatedForce = requireFiniteValue(
        force,
        "force",
      );

      calculatedMass =
        requirePositiveMass(mass);

      calculatedAcceleration =
        calculatedForce /
        calculatedMass;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported force variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    force: calculatedForce,
    mass: calculatedMass,
    acceleration: calculatedAcceleration,
  }[solveFor];

  if (
    calculatedForce === undefined ||
    calculatedMass === undefined ||
    calculatedAcceleration === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The force calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      force: calculatedForce,
      mass: calculatedMass,
      acceleration:
        calculatedAcceleration,
      solvedVariable: solveFor,
      formula: "F = m × a",
    },
  };
}
