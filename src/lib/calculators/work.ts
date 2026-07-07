import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type WorkVariable =
  | "work"
  | "force"
  | "distance";

export type WorkInput = {
  work?: number;
  force?: number;
  distance?: number;
  solveFor: WorkVariable;
};

export type WorkDetails = {
  work: number;
  force: number;
  distance: number;
  solvedVariable: WorkVariable;
  formula: string;
};

const variableLabels: Record<
  WorkVariable,
  string
> = {
  work: "Work",
  force: "Force",
  distance: "Distance",
};

function requireFiniteValue(
  value: number | undefined,
  variable: WorkVariable,
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

function requirePositiveDistance(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "distance",
  );

  if (finiteValue <= 0) {
    throw new Error(
      "Distance must be greater than zero.",
    );
  }

  return finiteValue;
}

function requireNonZeroForce(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "force",
  );

  if (finiteValue === 0) {
    throw new Error(
      "Force must not be zero when calculating distance.",
    );
  }

  return finiteValue;
}

export function calculateWork({
  work,
  force,
  distance,
  solveFor,
}: WorkInput): CalculationResult<WorkDetails> {
  let calculatedWork = work;
  let calculatedForce = force;
  let calculatedDistance = distance;

  switch (solveFor) {
    case "work": {
      calculatedForce = requireFiniteValue(
        force,
        "force",
      );
      calculatedDistance =
        requirePositiveDistance(distance);

      calculatedWork =
        calculatedForce * calculatedDistance;
      break;
    }

    case "force": {
      calculatedWork = requireFiniteValue(
        work,
        "work",
      );
      calculatedDistance =
        requirePositiveDistance(distance);

      calculatedForce =
        calculatedWork / calculatedDistance;
      break;
    }

    case "distance": {
      calculatedWork = requireFiniteValue(
        work,
        "work",
      );
      calculatedForce =
        requireNonZeroForce(force);

      calculatedDistance =
        calculatedWork / calculatedForce;

      if (calculatedDistance <= 0) {
        throw new Error(
          "Work and force must have matching signs when calculating distance.",
        );
      }
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported work variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    work: calculatedWork,
    force: calculatedForce,
    distance: calculatedDistance,
  }[solveFor];

  if (
    calculatedWork === undefined ||
    calculatedForce === undefined ||
    calculatedDistance === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The work calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      work: calculatedWork,
      force: calculatedForce,
      distance: calculatedDistance,
      solvedVariable: solveFor,
      formula: "W = F × d",
    },
  };
}
