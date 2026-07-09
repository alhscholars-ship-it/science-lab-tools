export type AccelerationDueToGravityInput = {
  mass?: number;
  radius?: number;
  gravity?: number;
};

export function calculateAccelerationDueToGravity(
  input: AccelerationDueToGravityInput,
) {
  const G = 6.67430e-11;

  const { mass, radius, gravity } = input;

  if (gravity !== undefined) {
    if (!Number.isFinite(gravity) || gravity <= 0) {
      throw new Error("Invalid gravity");
    }

    return { gravity };
  }

  if (
    mass === undefined ||
    radius === undefined ||
    !Number.isFinite(mass) ||
    !Number.isFinite(radius) ||
    mass <= 0 ||
    radius <= 0
  ) {
    throw new Error("Invalid mass or radius");
  }

  const calculatedGravity = (G * mass) / (radius ** 2);

  return {
    gravity: calculatedGravity,
  };
}
