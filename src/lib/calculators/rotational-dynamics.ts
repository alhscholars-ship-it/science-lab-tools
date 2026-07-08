import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RotationalDynamicsVariable =
  | "torque"
  | "momentOfInertia"
  | "angularAcceleration";

export type RotationalDynamicsInput = {
  torque?: number;
  momentOfInertia?: number;
  angularAcceleration?: number;
  solveFor: RotationalDynamicsVariable;
};

export type RotationalDynamicsDetails = {
  torque: number;
  momentOfInertia: number;
  angularAcceleration: number;
  solvedVariable: RotationalDynamicsVariable;
  formula: string;
};

const variableLabels: Record<
  RotationalDynamicsVariable,
  string
> = {
  torque: "Torque",
  momentOfInertia: "Moment of inertia",
  angularAcceleration: "Angular acceleration",
};

function requirePositiveValue(
  value: number | undefined,
  variable: RotationalDynamicsVariable,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  if (value <= 0) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return value;
}

export function calculateRotationalDynamics({
  torque,
  momentOfInertia,
  angularAcceleration,
  solveFor,
}: RotationalDynamicsInput): CalculationResult<RotationalDynamicsDetails> {
  let calculatedTorque = torque;
  let calculatedMomentOfInertia =
    momentOfInertia;
  let calculatedAngularAcceleration =
    angularAcceleration;

  switch (solveFor) {
    case "torque": {
      calculatedMomentOfInertia =
        requirePositiveValue(
          momentOfInertia,
          "momentOfInertia",
        );

      calculatedAngularAcceleration =
        requirePositiveValue(
          angularAcceleration,
          "angularAcceleration",
        );

      calculatedTorque =
        calculatedMomentOfInertia *
        calculatedAngularAcceleration;
      break;
    }

    case "momentOfInertia": {
      calculatedTorque =
        requirePositiveValue(
          torque,
          "torque",
        );

      calculatedAngularAcceleration =
        requirePositiveValue(
          angularAcceleration,
          "angularAcceleration",
        );

      calculatedMomentOfInertia =
        calculatedTorque /
        calculatedAngularAcceleration;
      break;
    }

    case "angularAcceleration": {
      calculatedTorque =
        requirePositiveValue(
          torque,
          "torque",
        );

      calculatedMomentOfInertia =
        requirePositiveValue(
          momentOfInertia,
          "momentOfInertia",
        );

      calculatedAngularAcceleration =
        calculatedTorque /
        calculatedMomentOfInertia;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported rotational dynamics variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    torque: calculatedTorque,
    momentOfInertia:
      calculatedMomentOfInertia,
    angularAcceleration:
      calculatedAngularAcceleration,
  }[solveFor];

  if (
    calculatedTorque === undefined ||
    calculatedMomentOfInertia === undefined ||
    calculatedAngularAcceleration === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The rotational dynamics calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      torque: calculatedTorque,
      momentOfInertia:
        calculatedMomentOfInertia,
      angularAcceleration:
        calculatedAngularAcceleration,
      solvedVariable: solveFor,
      formula: "τ = Iα",
    },
  };
}
