import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type AverageVelocityVariable =
  | "averageVelocity"
  | "displacement"
  | "time";

export type AverageVelocityInput = {
  averageVelocity?: number;
  displacement?: number;
  time?: number;
  solveFor: AverageVelocityVariable;
};

export type AverageVelocityDetails = {
  averageVelocity: number;
  displacement: number;
  time: number;
  solvedVariable: AverageVelocityVariable;
  formula: string;
};

const variableLabels: Record<
  AverageVelocityVariable,
  string
> = {
  averageVelocity: "Average velocity",
  displacement: "Displacement",
  time: "Time",
};

function requireFiniteValue(
  value: number | undefined,
  variable: AverageVelocityVariable,
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

function requireNonZeroVelocity(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "averageVelocity",
  );

  if (finiteValue === 0) {
    throw new Error(
      "Average velocity cannot be zero when calculating time.",
    );
  }

  return finiteValue;
}

export function calculateAverageVelocity({
  averageVelocity,
  displacement,
  time,
  solveFor,
}: AverageVelocityInput): CalculationResult<AverageVelocityDetails> {
  let velocity = averageVelocity;
  let distance = displacement;
  let duration = time;

  switch (solveFor) {
    case "averageVelocity": {
      distance = requireFiniteValue(
        distance,
        "displacement",
      );
      duration = requirePositiveTime(duration);

      velocity = distance / duration;
      break;
    }

    case "displacement": {
      velocity = requireFiniteValue(
        velocity,
        "averageVelocity",
      );
      duration = requirePositiveTime(duration);

      distance = velocity * duration;
      break;
    }

    case "time": {
      velocity = requireNonZeroVelocity(velocity);
      distance = requireFiniteValue(
        distance,
        "displacement",
      );

      duration = distance / velocity;

      if (duration <= 0) {
        throw new Error(
          "Displacement and average velocity must produce a positive time.",
        );
      }
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported average velocity variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    averageVelocity: velocity,
    displacement: distance,
    time: duration,
  }[solveFor];

  if (
    velocity === undefined ||
    distance === undefined ||
    duration === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The average velocity calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      averageVelocity: velocity,
      displacement: distance,
      time: duration,
      solvedVariable: solveFor,
      formula: "v̄ = Δx ÷ Δt",
    },
  };
}
