import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type NormalForceVariable =
  | "normalForce"
  | "mass"
  | "gravity";

export type NormalForceInput = {
  normalForce?: number;
  mass?: number;
  gravity?: number;
  angleDegrees?: number;
  downwardForce?: number;
  upwardForce?: number;
  solveFor: NormalForceVariable;
};

export type NormalForceDetails = {
  normalForce: number;
  mass: number;
  gravity: number;
  angleDegrees: number;
  downwardForce: number;
  upwardForce: number;
  solvedVariable: NormalForceVariable;
  formula: string;
};

const variableLabels: Record<
  NormalForceVariable,
  string
> = {
  normalForce: "Normal force",
  mass: "Mass",
  gravity: "Gravitational acceleration",
};

function requireFiniteValue(
  value: number | undefined,
  variable: NormalForceVariable,
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
  variable: NormalForceVariable,
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

function normalizeOptionalForce(
  value: number | undefined,
  label: string,
): number {
  if (value === undefined) {
    return 0;
  }

  if (!Number.isFinite(value) || value < 0) {
    throw new Error(
      `${label} must be a finite number greater than or equal to zero.`,
    );
  }

  return value;
}

function normalizeAngle(
  value: number | undefined,
): number {
  const angle = value ?? 0;

  if (
    !Number.isFinite(angle) ||
    angle < 0 ||
    angle >= 90
  ) {
    throw new Error(
      "Incline angle must be at least 0 degrees and less than 90 degrees.",
    );
  }

  return angle;
}

function cosineFromDegrees(
  angleDegrees: number,
): number {
  return Math.cos(
    (angleDegrees * Math.PI) / 180,
  );
}

export function calculateNormalForce({
  normalForce,
  mass,
  gravity,
  angleDegrees,
  downwardForce,
  upwardForce,
  solveFor,
}: NormalForceInput): CalculationResult<NormalForceDetails> {
  const angle = normalizeAngle(angleDegrees);
  const down = normalizeOptionalForce(
    downwardForce,
    "Downward force",
  );
  const up = normalizeOptionalForce(
    upwardForce,
    "Upward force",
  );
  const cosine = cosineFromDegrees(angle);

  let calculatedNormalForce = normalForce;
  let calculatedMass = mass;
  let calculatedGravity = gravity;

  switch (solveFor) {
    case "normalForce": {
      calculatedMass = requirePositiveValue(
        mass,
        "mass",
      );
      calculatedGravity = requirePositiveValue(
        gravity,
        "gravity",
      );

      calculatedNormalForce =
        calculatedMass *
          calculatedGravity *
          cosine +
        down -
        up;

      if (calculatedNormalForce < 0) {
        throw new Error(
          "The upward force is large enough to remove contact with the surface.",
        );
      }

      break;
    }

    case "mass": {
      calculatedNormalForce =
        requireFiniteValue(
          normalForce,
          "normalForce",
        );
      calculatedGravity = requirePositiveValue(
        gravity,
        "gravity",
      );

      const supportedWeight =
        calculatedNormalForce - down + up;

      calculatedMass =
        supportedWeight /
        (calculatedGravity * cosine);

      if (calculatedMass <= 0) {
        throw new Error(
          "The entered forces must produce a positive mass.",
        );
      }

      break;
    }

    case "gravity": {
      calculatedNormalForce =
        requireFiniteValue(
          normalForce,
          "normalForce",
        );
      calculatedMass = requirePositiveValue(
        mass,
        "mass",
      );

      const supportedWeight =
        calculatedNormalForce - down + up;

      calculatedGravity =
        supportedWeight /
        (calculatedMass * cosine);

      if (calculatedGravity <= 0) {
        throw new Error(
          "The entered forces must produce positive gravitational acceleration.",
        );
      }

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported normal-force variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    normalForce: calculatedNormalForce,
    mass: calculatedMass,
    gravity: calculatedGravity,
  }[solveFor];

  if (
    calculatedNormalForce === undefined ||
    calculatedMass === undefined ||
    calculatedGravity === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The normal-force calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      normalForce: calculatedNormalForce,
      mass: calculatedMass,
      gravity: calculatedGravity,
      angleDegrees: angle,
      downwardForce: down,
      upwardForce: up,
      solvedVariable: solveFor,
      formula:
        angle === 0
          ? "N = mg + Fdown − Fup"
          : "N = mg cos(θ) + Fdown − Fup",
    },
  };
}
