import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type KinematicVariable =
  | "initialVelocity"
  | "finalVelocity"
  | "acceleration"
  | "time"
  | "displacement";

export type KinematicEquation =
  | "velocity-time"
  | "displacement-time"
  | "velocity-displacement"
  | "average-velocity";

export type KinematicInput = {
  equation: KinematicEquation;
  solveFor: KinematicVariable;
  initialVelocity?: number;
  finalVelocity?: number;
  acceleration?: number;
  time?: number;
  displacement?: number;
};

export type KinematicDetails = {
  initialVelocity?: number;
  finalVelocity?: number;
  acceleration?: number;
  time?: number;
  displacement?: number;
  solvedVariable: KinematicVariable;
  equation: KinematicEquation;
  formula: string;
};

const labels: Record<KinematicVariable, string> = {
  initialVelocity: "Initial velocity",
  finalVelocity: "Final velocity",
  acceleration: "Acceleration",
  time: "Time",
  displacement: "Displacement",
};

const formulas: Record<KinematicEquation, string> = {
  "velocity-time": "v = u + at",
  "displacement-time": "s = ut + ½at²",
  "velocity-displacement": "v² = u² + 2as",
  "average-velocity": "s = ½(u + v)t",
};

function requireFinite(
  value: number | undefined,
  variable: KinematicVariable,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `${labels[variable]} must be a finite number.`,
    );
  }

  return value;
}

function requirePositiveTime(
  value: number | undefined,
): number {
  const finiteValue = requireFinite(value, "time");

  if (finiteValue <= 0) {
    throw new Error("Time must be greater than zero.");
  }

  return finiteValue;
}

function requireNonZero(
  value: number,
  message: string,
): number {
  if (value === 0) {
    throw new Error(message);
  }

  return value;
}

function requireNonNegativeRadicand(
  value: number,
): number {
  if (value < 0) {
    throw new Error(
      "The supplied values produce no real velocity solution.",
    );
  }

  return value;
}

function solvePositiveQuadraticTime(
  initialVelocity: number,
  acceleration: number,
  displacement: number,
): number {
  if (acceleration === 0) {
    requireNonZero(
      initialVelocity,
      "Initial velocity cannot be zero when acceleration is zero.",
    );

    const linearTime =
      displacement / initialVelocity;

    if (linearTime <= 0) {
      throw new Error(
        "The supplied values must produce a positive time.",
      );
    }

    return linearTime;
  }

  const discriminant =
    initialVelocity ** 2 +
    2 * acceleration * displacement;

  requireNonNegativeRadicand(discriminant);

  const squareRoot = Math.sqrt(discriminant);
  const roots = [
    (-initialVelocity + squareRoot) /
      acceleration,
    (-initialVelocity - squareRoot) /
      acceleration,
  ].filter(
    (root) =>
      Number.isFinite(root) && root > 0,
  );

  if (roots.length === 0) {
    throw new Error(
      "The supplied values must produce a positive time.",
    );
  }

  return Math.min(...roots);
}

export function calculateKinematicEquation({
  equation,
  solveFor,
  initialVelocity,
  finalVelocity,
  acceleration,
  time,
  displacement,
}: KinematicInput): CalculationResult<KinematicDetails> {
  let u = initialVelocity;
  let v = finalVelocity;
  let a = acceleration;
  let t = time;
  let s = displacement;

  switch (equation) {
    case "velocity-time": {
      switch (solveFor) {
        case "finalVelocity":
          u = requireFinite(u, "initialVelocity");
          a = requireFinite(a, "acceleration");
          t = requirePositiveTime(t);
          v = u + a * t;
          break;

        case "initialVelocity":
          v = requireFinite(v, "finalVelocity");
          a = requireFinite(a, "acceleration");
          t = requirePositiveTime(t);
          u = v - a * t;
          break;

        case "acceleration":
          u = requireFinite(u, "initialVelocity");
          v = requireFinite(v, "finalVelocity");
          t = requirePositiveTime(t);
          a = (v - u) / t;
          break;

        case "time":
          u = requireFinite(u, "initialVelocity");
          v = requireFinite(v, "finalVelocity");
          a = requireFinite(a, "acceleration");
          requireNonZero(
            a,
            "Acceleration cannot be zero when calculating time.",
          );
          t = (v - u) / a;

          if (t <= 0) {
            throw new Error(
              "The supplied values must produce a positive time.",
            );
          }
          break;

        default:
          throw new Error(
            "The velocity-time equation cannot solve displacement.",
          );
      }
      break;
    }

    case "displacement-time": {
      switch (solveFor) {
        case "displacement":
          u = requireFinite(u, "initialVelocity");
          a = requireFinite(a, "acceleration");
          t = requirePositiveTime(t);
          s = u * t + 0.5 * a * t ** 2;
          break;

        case "initialVelocity":
          s = requireFinite(s, "displacement");
          a = requireFinite(a, "acceleration");
          t = requirePositiveTime(t);
          u = (s - 0.5 * a * t ** 2) / t;
          break;

        case "acceleration":
          s = requireFinite(s, "displacement");
          u = requireFinite(u, "initialVelocity");
          t = requirePositiveTime(t);
          a = (2 * (s - u * t)) / t ** 2;
          break;

        case "time":
          s = requireFinite(s, "displacement");
          u = requireFinite(u, "initialVelocity");
          a = requireFinite(a, "acceleration");
          t = solvePositiveQuadraticTime(u, a, s);
          break;

        default:
          throw new Error(
            "The displacement-time equation cannot solve final velocity.",
          );
      }
      break;
    }

    case "velocity-displacement": {
      switch (solveFor) {
        case "finalVelocity": {
          u = requireFinite(u, "initialVelocity");
          a = requireFinite(a, "acceleration");
          s = requireFinite(s, "displacement");

          const radicand =
            u ** 2 + 2 * a * s;

          v = Math.sqrt(
            requireNonNegativeRadicand(radicand),
          );
          break;
        }

        case "initialVelocity": {
          v = requireFinite(v, "finalVelocity");
          a = requireFinite(a, "acceleration");
          s = requireFinite(s, "displacement");

          const radicand =
            v ** 2 - 2 * a * s;

          u = Math.sqrt(
            requireNonNegativeRadicand(radicand),
          );
          break;
        }

        case "acceleration":
          u = requireFinite(u, "initialVelocity");
          v = requireFinite(v, "finalVelocity");
          s = requireFinite(s, "displacement");
          requireNonZero(
            s,
            "Displacement cannot be zero when calculating acceleration.",
          );
          a = (v ** 2 - u ** 2) / (2 * s);
          break;

        case "displacement":
          u = requireFinite(u, "initialVelocity");
          v = requireFinite(v, "finalVelocity");
          a = requireFinite(a, "acceleration");
          requireNonZero(
            a,
            "Acceleration cannot be zero when calculating displacement.",
          );
          s = (v ** 2 - u ** 2) / (2 * a);
          break;

        default:
          throw new Error(
            "The velocity-displacement equation cannot solve time.",
          );
      }
      break;
    }

    case "average-velocity": {
      switch (solveFor) {
        case "displacement":
          u = requireFinite(u, "initialVelocity");
          v = requireFinite(v, "finalVelocity");
          t = requirePositiveTime(t);
          s = 0.5 * (u + v) * t;
          break;

        case "initialVelocity":
          s = requireFinite(s, "displacement");
          v = requireFinite(v, "finalVelocity");
          t = requirePositiveTime(t);
          u = (2 * s) / t - v;
          break;

        case "finalVelocity":
          s = requireFinite(s, "displacement");
          u = requireFinite(u, "initialVelocity");
          t = requirePositiveTime(t);
          v = (2 * s) / t - u;
          break;

        case "time":
          s = requireFinite(s, "displacement");
          u = requireFinite(u, "initialVelocity");
          v = requireFinite(v, "finalVelocity");

          requireNonZero(
            u + v,
            "The sum of initial and final velocity cannot be zero when calculating time.",
          );

          t = (2 * s) / (u + v);

          if (t <= 0) {
            throw new Error(
              "The supplied values must produce a positive time.",
            );
          }
          break;

        default:
          throw new Error(
            "The average-velocity equation cannot solve acceleration.",
          );
      }
      break;
    }

    default: {
      const exhaustiveCheck: never = equation;

      throw new Error(
        `Unsupported kinematic equation: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    initialVelocity: u,
    finalVelocity: v,
    acceleration: a,
    time: t,
    displacement: s,
  }[solveFor];

  if (
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The kinematic calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      initialVelocity: u,
      finalVelocity: v,
      acceleration: a,
      time: t,
      displacement: s,
      solvedVariable: solveFor,
      equation,
      formula: formulas[equation],
    },
  };
}
