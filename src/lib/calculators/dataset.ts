export function parseDataset(input: string): number[] {
  const normalized = input.trim();

  if (normalized === "") {
    throw new Error("Enter at least one numeric value.");
  }

  const tokens = normalized
    .split(/[\s,;]+/)
    .filter(Boolean);

  const values = tokens.map((token) => {
    const value = Number(token);

    if (!Number.isFinite(value)) {
      throw new Error(
        `"${token}" is not a valid finite number.`,
      );
    }

    return value;
  });

  if (values.length === 0) {
    throw new Error("Enter at least one numeric value.");
  }

  return values;
}

export function validateDataset(
  values: readonly number[],
): void {
  if (values.length === 0) {
    throw new Error(
      "Dataset must contain at least one value.",
    );
  }

  for (const value of values) {
    if (!Number.isFinite(value)) {
      throw new Error(
        "Every dataset value must be a finite number.",
      );
    }
  }
}
