export type FreeFallInput = {
  height?: number;
  time?: number;
  velocity?: number;
  gravity?: number;
};

export type FreeFallResult = {
  height?: number;
  time?: number;
  velocity?: number;
  gravity: number;
};

export function calculateFreeFall(
  input: FreeFallInput,
): FreeFallResult {
  const gravity = input.gravity ?? 9.80665;

  if (!Number.isFinite(gravity) || gravity <= 0) {
    throw new Error("Gravity must be positive.");
  }

  const height = input.height;
  const time = input.time;
  const velocity = input.velocity;

  if (height !== undefined) {
    if (!Number.isFinite(height) || height <= 0) {
      throw new Error("Height must be positive.");
    }
  }

  if (time !== undefined) {
    if (!Number.isFinite(time) || time <= 0) {
      throw new Error("Time must be positive.");
    }
  }

  if (velocity !== undefined) {
    if (!Number.isFinite(velocity) || velocity < 0) {
      throw new Error("Velocity must be valid.");
    }
  }

  const result: FreeFallResult = {
    gravity,
  };

  if (time !== undefined) {
    result.velocity = gravity * time;
    result.height = 0.5 * gravity * time ** 2;
  }

  if (height !== undefined) {
    result.time = Math.sqrt((2 * height) / gravity);
    result.velocity = Math.sqrt(2 * gravity * height);
  }

  return result;
}
