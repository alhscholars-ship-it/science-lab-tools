import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type AccelerationVariable =
  | "acceleration"
  | "initialVelocity"
  | "finalVelocity"
  | "time";

export type AccelerationInput = {
  acceleration?: number;
  initialVelocity?: number;
  finalVelocity?: number;
  time?: number;
  solveFor: AccelerationVariable;
};

export type AccelerationDetails = {
  acceleration: number;
  initialVelocity: number;
  finalVelocity: number;
  time: number;
  solvedVariable: AccelerationVariable;
  velocityChange: number;
  formula: string;
};

const variableLabels: Record<
  AccelerationVariable,
  string
> = {
  acceleration: "Acceleration",
  initialVelocity: "Initial velocity",
  finalVelocity: "Final velocity",
  time: "Time",
};

function requireFiniteValue(
  value: number | undefined,
  variable: AccelerationVariable,
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

function requireNonZeroAcceleration(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "acceleration",
  );

  if (finiteValue === 0) {
    throw new Error(
      "Acceleration cannot be zero when calculating time.",
    );
  }

  return finiteValue;
}

export function calculateAcceleration({
  acceleration,
  initialVelocity,
  finalVelocity,
  time,
  solveFor,
}: AccelerationInput): CalculationResult<AccelerationDetails> {
  let a = acceleration;
  let u = initialVelocity;
  let v = finalVelocity;
  let t = time;

  switch (solveFor) {
    case "acceleration": {
      u = requireFiniteValue(
        u,
        "initialVelocity",
      );
      v = requireFiniteValue(
        v,
        "finalVelocity",
      );
      t = requirePositiveTime(t);

      a = (v - u) / t;
      break;
    }

    case "initialVelocity": {
      a = requireFiniteValue(
        a,
        "acceleration",
      );
      v = requireFiniteValue(
        v,
        "finalVelocity",
      );
      t = requirePositiveTime(t);

      u = v - a * t;
      break;
    }

    case "finalVelocity": {
      a = requireFiniteValue(
        a,
        "acceleration",
      );
      u = requireFiniteValue(
        u,
        "initialVelocity",
      );
      t = requirePositiveTime(t);

      v = u + a * t;
      break;
    }

    case "time": {
      a = requireNonZeroAcceleration(a);
      u = requireFiniteValue(
        u,
        "initialVelocity",
      );
      v = requireFiniteValue(
        v,
        "finalVelocity",
      );

      t = (v - u) / a;

      if (t <= 0) {
        throw new Error(
          "The velocity change and acceleration must produce a positive time.",
        );
      }
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported acceleration variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    acceleration: a,
    initialVelocity: u,
    finalVelocity: v,
    time: t,
  }[solveFor];

  if (
    a === undefined ||
    u === undefined ||
    v === undefined ||
    t === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The acceleration calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      acceleration: a,
      initialVelocity: u,
      finalVelocity: v,
      time: t,
      solvedVariable: solveFor,
      velocityChange: v - u,
      formula: "a = (v − u) ÷ t",
    },
  };
}
