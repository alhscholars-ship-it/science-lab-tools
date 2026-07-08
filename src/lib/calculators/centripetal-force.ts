import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type CentripetalForceVariable =
  | "centripetalForce"
  | "mass"
  | "velocity"
  | "radius";

export type CentripetalForceInput = {
  centripetalForce?: number;
  mass?: number;
  velocity?: number;
  radius?: number;
  solveFor: CentripetalForceVariable;
};

export type CentripetalForceDetails = {
  centripetalForce: number;
  mass: number;
  velocity: number;
  radius: number;
  solvedVariable: CentripetalForceVariable;
  formula: string;
};

const variableLabels: Record<
  CentripetalForceVariable,
  string
> = {
  centripetalForce: "Centripetal force",
  mass: "Mass",
  velocity: "Velocity",
  radius: "Radius",
};

function requireFiniteValue(
  value: number | undefined,
  variable: CentripetalForceVariable,
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
  variable: CentripetalForceVariable,
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

export function calculateCentripetalForce({
  centripetalForce,
  mass,
  velocity,
  radius,
  solveFor,
}: CentripetalForceInput): CalculationResult<CentripetalForceDetails> {
  let calculatedCentripetalForce =
    centripetalForce;
  let calculatedMass = mass;
  let calculatedVelocity = velocity;
  let calculatedRadius = radius;

  switch (solveFor) {
    case "centripetalForce": {
      calculatedMass = requirePositiveValue(
        mass,
        "mass",
      );

      calculatedVelocity =
        requirePositiveValue(
          velocity,
          "velocity",
        );

      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedCentripetalForce =
        (calculatedMass *
          calculatedVelocity ** 2) /
        calculatedRadius;
      break;
    }

    case "mass": {
      calculatedCentripetalForce =
        requirePositiveValue(
          centripetalForce,
          "centripetalForce",
        );

      calculatedVelocity =
        requirePositiveValue(
          velocity,
          "velocity",
        );

      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedMass =
        (calculatedCentripetalForce *
          calculatedRadius) /
        calculatedVelocity ** 2;
      break;
    }

    case "velocity": {
      calculatedCentripetalForce =
        requirePositiveValue(
          centripetalForce,
          "centripetalForce",
        );

      calculatedMass = requirePositiveValue(
        mass,
        "mass",
      );

      calculatedRadius = requirePositiveValue(
        radius,
        "radius",
      );

      calculatedVelocity = Math.sqrt(
        (calculatedCentripetalForce *
          calculatedRadius) /
          calculatedMass,
      );
      break;
    }

    case "radius": {
      calculatedCentripetalForce =
        requirePositiveValue(
          centripetalForce,
          "centripetalForce",
        );

      calculatedMass = requirePositiveValue(
        mass,
        "mass",
      );

      calculatedVelocity =
        requirePositiveValue(
          velocity,
          "velocity",
        );

      calculatedRadius =
        (calculatedMass *
          calculatedVelocity ** 2) /
        calculatedCentripetalForce;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported centripetal force variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    centripetalForce:
      calculatedCentripetalForce,
    mass: calculatedMass,
    velocity: calculatedVelocity,
    radius: calculatedRadius,
  }[solveFor];

  if (
    calculatedCentripetalForce === undefined ||
    calculatedMass === undefined ||
    calculatedVelocity === undefined ||
    calculatedRadius === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The centripetal force calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      centripetalForce:
        calculatedCentripetalForce,
      mass: calculatedMass,
      velocity: calculatedVelocity,
      radius: calculatedRadius,
      solvedVariable: solveFor,
      formula: "Fc = mv² ÷ r",
    },
  };
}
