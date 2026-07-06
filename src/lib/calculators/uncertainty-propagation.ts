import { formatCalculatedNumber } from "./number-format";

export type PropagationOperation =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";

export type UncertainValue = {
  value: number;
  absoluteUncertainty: number;
};

export type UncertaintyPropagationInput = {
  first: UncertainValue;
  second: UncertainValue;
  operation: PropagationOperation;
};

export type UncertaintyPropagationResult = {
  operation: PropagationOperation;
  first: UncertainValue;
  second: UncertainValue;
  resultValue: number;
  absoluteUncertainty: number;
  relativeUncertainty: number | null;
  percentageUncertainty: number | null;
  formattedResultValue: string;
  formattedAbsoluteUncertainty: string;
  formattedRelativeUncertainty: string;
  formattedPercentageUncertainty: string;
  resultNotation: string;
  rule: string;
};

const operationSymbols: Record<
  PropagationOperation,
  string
> = {
  addition: "+",
  subtraction: "−",
  multiplication: "×",
  division: "÷",
};

function validateUncertainValue(
  input: UncertainValue,
  label: string,
): void {
  if (!Number.isFinite(input.value)) {
    throw new Error(
      `${label} value must be a finite number.`,
    );
  }

  if (
    !Number.isFinite(input.absoluteUncertainty)
  ) {
    throw new Error(
      `${label} uncertainty must be a finite number.`,
    );
  }

  if (input.absoluteUncertainty < 0) {
    throw new Error(
      `${label} uncertainty cannot be negative.`,
    );
  }
}

export function calculateUncertaintyPropagation({
  first,
  second,
  operation,
}: UncertaintyPropagationInput): UncertaintyPropagationResult {
  validateUncertainValue(first, "First");
  validateUncertainValue(second, "Second");

  let resultValue: number;
  let absoluteUncertainty: number;
  let rule: string;

  switch (operation) {
    case "addition": {
      resultValue = first.value + second.value;
      absoluteUncertainty =
        first.absoluteUncertainty +
        second.absoluteUncertainty;
      rule =
        "For addition, add the absolute uncertainties.";
      break;
    }

    case "subtraction": {
      resultValue = first.value - second.value;
      absoluteUncertainty =
        first.absoluteUncertainty +
        second.absoluteUncertainty;
      rule =
        "For subtraction, add the absolute uncertainties.";
      break;
    }

    case "multiplication": {
      if (first.value === 0 || second.value === 0) {
        throw new Error(
          "Multiplication requires non-zero measured values when propagating relative uncertainty.",
        );
      }

      resultValue = first.value * second.value;

      const combinedRelativeUncertainty =
        first.absoluteUncertainty /
          Math.abs(first.value) +
        second.absoluteUncertainty /
          Math.abs(second.value);

      absoluteUncertainty =
        Math.abs(resultValue) *
        combinedRelativeUncertainty;

      rule =
        "For multiplication, add the relative uncertainties.";
      break;
    }

    case "division": {
      if (first.value === 0) {
        throw new Error(
          "The numerator must be non-zero when propagating relative uncertainty.",
        );
      }

      if (second.value === 0) {
        throw new Error(
          "The denominator cannot be zero.",
        );
      }

      resultValue = first.value / second.value;

      const combinedRelativeUncertainty =
        first.absoluteUncertainty /
          Math.abs(first.value) +
        second.absoluteUncertainty /
          Math.abs(second.value);

      absoluteUncertainty =
        Math.abs(resultValue) *
        combinedRelativeUncertainty;

      rule =
        "For division, add the relative uncertainties.";
      break;
    }

    default: {
      const exhaustiveCheck: never = operation;
      throw new Error(
        `Unsupported propagation operation: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    !Number.isFinite(resultValue) ||
    !Number.isFinite(absoluteUncertainty)
  ) {
    throw new Error(
      "The uncertainty propagation calculation could not be completed.",
    );
  }

  const relativeUncertainty =
    resultValue === 0
      ? null
      : absoluteUncertainty /
        Math.abs(resultValue);

  const percentageUncertainty =
    relativeUncertainty === null
      ? null
      : relativeUncertainty * 100;

  const formattedResultValue =
    formatCalculatedNumber(resultValue);

  const formattedAbsoluteUncertainty =
    formatCalculatedNumber(
      absoluteUncertainty,
    );

  return {
    operation,
    first: { ...first },
    second: { ...second },
    resultValue,
    absoluteUncertainty,
    relativeUncertainty,
    percentageUncertainty,
    formattedResultValue,
    formattedAbsoluteUncertainty,
    formattedRelativeUncertainty:
      relativeUncertainty === null
        ? "Undefined"
        : formatCalculatedNumber(
            relativeUncertainty,
          ),
    formattedPercentageUncertainty:
      percentageUncertainty === null
        ? "Undefined"
        : `${formatCalculatedNumber(
            percentageUncertainty,
          )}%`,
    resultNotation:
      `${formattedResultValue} ± ` +
      formattedAbsoluteUncertainty,
    rule,
  };
}

export function getPropagationExpression(
  result: UncertaintyPropagationResult,
): string {
  return (
    `${formatCalculatedNumber(result.first.value)} ` +
    `${operationSymbols[result.operation]} ` +
    `${formatCalculatedNumber(result.second.value)}`
  );
}
