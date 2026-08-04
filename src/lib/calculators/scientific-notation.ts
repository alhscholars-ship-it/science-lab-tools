export type ScientificNumber = {
  coefficient: number;
  exponent: number;
};

export type ScientificOperation =
  | "add"
  | "subtract"
  | "multiply"
  | "divide";

export type ScientificNotationResult = ScientificNumber & {
  value: number;
  formattedCoefficient: string;
  notation: string;
};

function validateSignificantFigures(value: number): number {
  if (!Number.isInteger(value) || value < 1 || value > 12) {
    throw new Error("Significant figures must be a whole number from 1 to 12.");
  }
  return value;
}

function validateScientificNumber(number: ScientificNumber, label: string) {
  if (!Number.isFinite(number.coefficient)) {
    throw new Error(`${label} coefficient must be a finite number.`);
  }
  if (!Number.isInteger(number.exponent)) {
    throw new Error(`${label} exponent must be a whole number.`);
  }
}

export function normalizeScientificNotation(
  value: number,
  significantFigures = 6,
): ScientificNotationResult {
  if (!Number.isFinite(value)) {
    throw new Error("The result must be a finite number.");
  }
  const precision = validateSignificantFigures(significantFigures);

  if (value === 0) {
    return {
      value: 0,
      coefficient: 0,
      exponent: 0,
      formattedCoefficient: "0",
      notation: "0 × 10^0",
    };
  }

  let exponent = Math.floor(Math.log10(Math.abs(value)));
  let coefficient = value / 10 ** exponent;
  coefficient = Number(coefficient.toPrecision(precision));

  if (Math.abs(coefficient) >= 10) {
    coefficient /= 10;
    exponent += 1;
  }

  const formattedCoefficient = coefficient.toLocaleString("en-US", {
    useGrouping: false,
    maximumSignificantDigits: precision,
  });

  return {
    value,
    coefficient,
    exponent,
    formattedCoefficient,
    notation: `${formattedCoefficient} × 10^${exponent}`,
  };
}

export function scientificToDecimal(number: ScientificNumber): number {
  validateScientificNumber(number, "Scientific number");
  const value = number.coefficient * 10 ** number.exponent;
  if (!Number.isFinite(value)) {
    throw new Error("The scientific number is outside the supported numeric range.");
  }
  return value;
}

export function calculateScientificNotation(
  first: ScientificNumber,
  operation: ScientificOperation,
  second: ScientificNumber,
  significantFigures = 6,
): ScientificNotationResult {
  validateScientificNumber(first, "First");
  validateScientificNumber(second, "Second");

  const firstValue = scientificToDecimal(first);
  const secondValue = scientificToDecimal(second);
  let value: number;

  switch (operation) {
    case "add": value = firstValue + secondValue; break;
    case "subtract": value = firstValue - secondValue; break;
    case "multiply": value = firstValue * secondValue; break;
    case "divide": {
      if (secondValue === 0) throw new Error("The second scientific number cannot be zero when dividing.");
      value = firstValue / secondValue;
      break;
    }
    default: {
      const exhaustiveCheck: never = operation;
      throw new Error(`Unsupported operation: ${exhaustiveCheck}`);
    }
  }

  return normalizeScientificNotation(value, significantFigures);
}

export function formatDecimal(value: number): string {
  if (!Number.isFinite(value)) return "";
  if (value !== 0 && (Math.abs(value) >= 1e15 || Math.abs(value) < 1e-6)) {
    return value.toExponential(10).replace(/\.?(0+)e/, "e");
  }
  return value.toLocaleString("en-US", { maximumFractionDigits: 12 });
}
