import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type AverageSpeedVariable =
  | "averageSpeed"
  | "distance"
  | "time";

export type AverageSpeedInput = {
  averageSpeed?: number;
  distance?: number;
  time?: number;
  solveFor: AverageSpeedVariable;
};

export type AverageSpeedDetails = {
  averageSpeed: number;
  distance: number;
  time: number;
  solvedVariable: AverageSpeedVariable;
  formula: string;
};

const variableLabels: Record<
  AverageSpeedVariable,
  string
> = {
  averageSpeed: "Average speed",
  distance: "Distance",
  time: "Time",
};

function requireFiniteValue(
  value: number | undefined,
  variable: AverageSpeedVariable,
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
  variable: "averageSpeed" | "distance",
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

function requirePositiveTime(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "time",
  );

  if (finiteValue <= 0) {
    throw new Error(
      "Time must be greater than zero.",
    );
  }

  return finiteValue;
}

function requirePositiveSpeed(
  value: number | undefined,
): number {
  const finiteValue = requireNonNegativeValue(
    value,
    "averageSpeed",
  );

  if (finiteValue === 0) {
    throw new Error(
      "Average speed must be greater than zero when calculating time.",
    );
  }

  return finiteValue;
}

export function calculateAverageSpeed({
  averageSpeed,
  distance,
  time,
  solveFor,
}: AverageSpeedInput): CalculationResult<AverageSpeedDetails> {
  let speed = averageSpeed;
  let travelledDistance = distance;
  let duration = time;

  switch (solveFor) {
    case "averageSpeed": {
      travelledDistance = requireNonNegativeValue(
        travelledDistance,
        "distance",
      );
      duration = requirePositiveTime(duration);

      speed = travelledDistance / duration;
      break;
    }

    case "distance": {
      speed = requireNonNegativeValue(
        speed,
        "averageSpeed",
      );
      duration = requirePositiveTime(duration);

      travelledDistance = speed * duration;
      break;
    }

    case "time": {
      speed = requirePositiveSpeed(speed);
      travelledDistance = requireNonNegativeValue(
        travelledDistance,
        "distance",
      );

      duration = travelledDistance / speed;

      if (duration <= 0) {
        throw new Error(
          "Distance and average speed must produce a positive time.",
        );
      }
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported average speed variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    averageSpeed: speed,
    distance: travelledDistance,
    time: duration,
  }[solveFor];

  if (
    speed === undefined ||
    travelledDistance === undefined ||
    duration === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The average speed calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      averageSpeed: speed,
      distance: travelledDistance,
      time: duration,
      solvedVariable: solveFor,
      formula: "s̄ = d ÷ t",
    },
  };
}
