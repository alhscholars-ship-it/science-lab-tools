export type SignificantFiguresResult = {
  originalValue: string;
  significantFigures: number;
  roundedValue: number;
  formattedValue: string;
  scientificNotation: string;
};

const numericPattern =
  /^[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d+))(?:[eE][+-]?\d+)?$/;

function normalizeInput(value: string): string {
  const normalized = value.trim();

  if (normalized === "") {
    throw new Error("Enter a numeric value.");
  }

  if (!numericPattern.test(normalized)) {
    throw new Error(
      "Value must be a valid decimal number or scientific notation.",
    );
  }

  return normalized;
}

export function countSignificantFigures(value: string): number {
  const normalized = normalizeInput(value);
  const unsigned = normalized.replace(/^[+-]/, "");
  const mantissa = unsigned.split(/[eE]/)[0];

  if (mantissa.includes(".")) {
    const [wholePart, decimalPart = ""] = mantissa.split(".");
    const digits = `${wholePart}${decimalPart}`;
    const firstNonZero = digits.search(/[1-9]/);

    if (firstNonZero === -1) {
      if (decimalPart.length === 0) {
        return 1;
      }

      return decimalPart.length;
    }

    return digits.length - firstNonZero;
  }

  const digits = mantissa
    .replace(/^0+/, "")
    .replace(/0+$/, "");

  return digits.length || 1;
}

export function roundToSignificantFigures(
  value: string,
  significantFigures: number,
): SignificantFiguresResult {
  const normalized = normalizeInput(value);

  if (
    !Number.isInteger(significantFigures) ||
    significantFigures < 1 ||
    significantFigures > 15
  ) {
    throw new Error(
      "Significant figures must be a whole number from 1 to 15.",
    );
  }

  const numericValue = Number(normalized);

  if (!Number.isFinite(numericValue)) {
    throw new Error("Value must be a finite number.");
  }

  const formattedValue =
    numericValue === 0
      ? significantFigures === 1
        ? "0"
        : `0.${"0".repeat(significantFigures - 1)}`
      : numericValue.toPrecision(significantFigures);

  const roundedValue = Number(formattedValue);

  return {
    originalValue: normalized,
    significantFigures: countSignificantFigures(normalized),
    roundedValue,
    formattedValue,
    scientificNotation:
      numericValue === 0
        ? `0.${"0".repeat(
            Math.max(0, significantFigures - 1),
          )} × 10⁰`
        : numericValue
            .toExponential(significantFigures - 1)
            .replace("e+", " × 10^")
            .replace("e-", " × 10^-"),
  };
}
