export type ProjectileVariable =
  | "range"
  | "maximumHeight"
  | "flightTime";

export interface ProjectileInput {
  initialVelocity: number;
  angle: number;
  gravity?: number;
}

export interface ProjectileResult {
  range: number;
  maximumHeight: number;
  flightTime: number;
}

function validateNumber(value: number, name: string) {
  if (!Number.isFinite(value)) {
    throw new Error(`${name} must be finite.`);
  }
}

export function calculateProjectileMotion(
  input: ProjectileInput,
): ProjectileResult {
  const {
    initialVelocity,
    angle,
    gravity = 9.81,
  } = input;

  validateNumber(initialVelocity, "Initial velocity");
  validateNumber(angle, "Angle");
  validateNumber(gravity, "Gravity");

  if (initialVelocity <= 0) {
    throw new Error("Initial velocity must be positive.");
  }

  if (gravity <= 0) {
    throw new Error("Gravity must be positive.");
  }

  const radians = (angle * Math.PI) / 180;

  const flightTime =
    (2 * initialVelocity * Math.sin(radians)) / gravity;

  const range =
    (initialVelocity ** 2 *
      Math.sin(2 * radians)) /
    gravity;

  const maximumHeight =
    (initialVelocity ** 2 *
      Math.sin(radians) ** 2) /
    (2 * gravity);

  return {
    range: Number(range.toFixed(6)),
    maximumHeight: Number(maximumHeight.toFixed(6)),
    flightTime: Number(flightTime.toFixed(6)),
  };
}
