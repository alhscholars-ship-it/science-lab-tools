import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type DistanceVariable =
  | "distance"
  | "speed"
  | "time";

export type DistanceInput = {
  distance?: number;
  speed?: number;
  time?: number;
  solveFor: DistanceVariable;
};

export type DistanceDetails = {
  distance: number;
  speed: number;
  time: number;
  solvedVariable: DistanceVariable;
  formula: string;
};

const variableLabels: Record<
  DistanceVariable,
  string
> = {
  distance: "Distance",
  speed: "Speed",
  time: "Time",
};

function requireFiniteValue(
  value: number | undefined,
  variable: DistanceVariable,
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

function requireNonNegativeValue(
  value: number | undefined,
  variable: DistanceVariable,
): number {
  const finiteValue = requireFiniteValue(
    value,
    variable,
  );

  if (finiteValue < 0) {
    throw new Error(
      `${variableLabels[variable]} cannot be negative.`,
    );
  }

  return finiteValue;
}

function requirePositiveSpeed(
  value: number | undefined,
): number {
  const finiteValue = requireNonNegativeValue(
    value,
    "speed",
  );

  if (finiteValue === 0) {
    throw new Error(
      "Speed must be greater than zero when calculating time.",
    );
  }

  return finiteValue;
}

function requirePositiveTime(
  value: number | undefined,
): number {
  const finiteValue = requireNonNegativeValue(
    value,
    "time",
  );

  if (finiteValue === 0) {
    throw new Error(
      "Time must be greater than zero when calculating speed.",
    );
  }

  return finiteValue;
}

export function calculateDistance({
  distance,
  speed,
  time,
  solveFor,
}: DistanceInput): CalculationResult<DistanceDetails> {
  let travelledDistance = distance;
  let motionSpeed = speed;
  let duration = time;

  switch (solveFor) {
    case "distance": {
      motionSpeed = requireNonNegativeValue(
        motionSpeed,
        "speed",
      );
      duration = requireNonNegativeValue(
        duration,
        "time",
      );

      travelledDistance = motionSpeed * duration;
      break;
    }

    case "speed": {
      travelledDistance = requireNonNegativeValue(
        travelledDistance,
        "distance",
      );
      duration = requirePositiveTime(duration);

      motionSpeed = travelledDistance / duration;
      break;
    }

    case "time": {
      travelledDistance = requireNonNegativeValue(
        travelledDistance,
        "distance",
      );
      motionSpeed = requirePositiveSpeed(
        motionSpeed,
      );

      duration = travelledDistance / motionSpeed;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported distance variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    distance: travelledDistance,
    speed: motionSpeed,
    time: duration,
  }[solveFor];

  if (
    travelledDistance === undefined ||
    motionSpeed === undefined ||
    duration === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The distance calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      distance: travelledDistance,
      speed: motionSpeed,
      time: duration,
      solvedVariable: solveFor,
      formula: "d = v × t",
    },
  };
}
