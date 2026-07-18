import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type KirchhoffsLawMode = "kcl" | "kvl";

export type KirchhoffsLawInput = {
  mode: KirchhoffsLawMode;
  values: readonly number[];
  unknownIndex: number;
};

export type KirchhoffsLawDetails = {
  mode: KirchhoffsLawMode;
  completedValues: number[];
  knownValues: number[];
  unknownIndex: number;
  unknownValue: number;
  knownSum: number;
  totalSum: number;
  formula: string;
  substitution: string;
  verification: string;
};

function validateMode(
  mode: KirchhoffsLawMode,
): KirchhoffsLawMode {
  if (mode !== "kcl" && mode !== "kvl") {
    throw new Error(
      `Unsupported Kirchhoff's law mode: ${String(mode)}`,
    );
  }

  return mode;
}

function validateValues(
  values: readonly number[],
): number[] {
  if (!Array.isArray(values) || values.length < 2) {
    throw new Error(
      "Enter at least two signed circuit values.",
    );
  }

  return values.map((value, index) => {
    if (!Number.isFinite(value)) {
      throw new Error(
        `Circuit value ${index + 1} must be a finite number.`,
      );
    }

    return value;
  });
}

function validateUnknownIndex(
  unknownIndex: number,
  valuesLength: number,
): number {
  if (
    !Number.isInteger(unknownIndex) ||
    unknownIndex < 0 ||
    unknownIndex >= valuesLength
  ) {
    throw new Error(
      "Unknown value position must reference an existing circuit value.",
    );
  }

  return unknownIndex;
}

function normalizeZero(value: number): number {
  return Object.is(value, -0) ? 0 : value;
}

export function calculateKirchhoffsLaw({
  mode,
  values,
  unknownIndex,
}: KirchhoffsLawInput): CalculationResult<KirchhoffsLawDetails> {
  const validatedMode = validateMode(mode);
  const completedValues = validateValues(values);
  const validatedUnknownIndex =
    validateUnknownIndex(
      unknownIndex,
      completedValues.length,
    );

  const knownValues = completedValues.filter(
    (_, index) => index !== validatedUnknownIndex,
  );

  const knownSum = knownValues.reduce(
    (sum, value) => sum + value,
    0,
  );

  const unknownValue = normalizeZero(-knownSum);

  completedValues[validatedUnknownIndex] =
    unknownValue;

  const totalSum = normalizeZero(
    completedValues.reduce(
      (sum, value) => sum + value,
      0,
    ),
  );

  const symbol =
    validatedMode === "kcl" ? "I" : "V";

  const lawName =
    validatedMode === "kcl"
      ? "Kirchhoff's Current Law"
      : "Kirchhoff's Voltage Law";

  const formula = `Σ${symbol} = 0`;

  const substitution =
    `${symbol}${validatedUnknownIndex + 1} = −(` +
    knownValues.join(" + ") +
    ")";

  const verification =
    `${completedValues.join(" + ")} = ` +
    `${formatCalculatedNumber(totalSum)}`;

  if (Math.abs(totalSum) > 1e-10) {
    throw new Error(
      `${lawName} verification failed because the signed sum is not zero.`,
    );
  }

  return {
    value: unknownValue,
    formattedValue:
      formatCalculatedNumber(unknownValue),
    details: {
      mode: validatedMode,
      completedValues,
      knownValues,
      unknownIndex: validatedUnknownIndex,
      unknownValue,
      knownSum,
      totalSum,
      formula,
      substitution,
      verification,
    },
  };
}
