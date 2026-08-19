import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type EquivalentWeightMassUnit =
  | "g"
  | "mg";

export type EquivalentWeightVariable =
  | "equivalentWeight"
  | "molarMass"
  | "nFactor"
  | "equivalents"
  | "mass";

export type EquivalentWeightInput = {
  molarMass?: number;
  nFactor?: number;
  equivalentWeight?: number;
  mass?: number;
  massUnit?: EquivalentWeightMassUnit;
  equivalents?: number;
  solveFor: EquivalentWeightVariable;
};

export type EquivalentWeightDetails = {
  molarMass?: number;
  nFactor?: number;
  equivalentWeight: number;
  mass?: number;
  massInGrams?: number;
  massUnit: EquivalentWeightMassUnit;
  equivalents?: number;
  solvedVariable: EquivalentWeightVariable;
  formula: string;
};

const variableLabels: Record<
  EquivalentWeightVariable,
  string
> = {
  equivalentWeight: "Equivalent weight",
  molarMass: "Molar mass",
  nFactor: "n-factor",
  equivalents: "Reactive equivalents",
  mass: "Sample mass",
};

const formulaByVariable: Record<
  EquivalentWeightVariable,
  string
> = {
  equivalentWeight:
    "EW = molar mass ÷ n-factor",
  molarMass:
    "molar mass = EW × n-factor",
  nFactor:
    "n-factor = molar mass ÷ EW",
  equivalents:
    "equivalents = mass ÷ EW",
  mass:
    "mass = equivalents × EW",
};

function requirePositiveValue(
  value: number | undefined,
  label: string,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `${label} must be a finite number.`,
    );
  }

  if (value <= 0) {
    throw new Error(
      `${label} must be greater than zero.`,
    );
  }

  return value;
}

function requireNonNegativeValue(
  value: number | undefined,
  label: string,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `${label} must be a finite number.`,
    );
  }

  if (value < 0) {
    throw new Error(
      `${label} cannot be negative.`,
    );
  }

  return value;
}

export function convertMassToGrams(
  mass: number,
  unit: EquivalentWeightMassUnit,
): number {
  const validatedMass =
    requireNonNegativeValue(
      mass,
      "Sample mass",
    );

  if (unit === "g") {
    return validatedMass;
  }

  if (unit === "mg") {
    return validatedMass / 1000;
  }

  throw new Error(
    "Unsupported sample mass unit.",
  );
}

export function convertGramsToMass(
  grams: number,
  unit: EquivalentWeightMassUnit,
): number {
  const validatedGrams =
    requireNonNegativeValue(
      grams,
      "Mass in grams",
    );

  if (unit === "g") {
    return validatedGrams;
  }

  if (unit === "mg") {
    return validatedGrams * 1000;
  }

  throw new Error(
    "Unsupported sample mass unit.",
  );
}

function requireMolarMass(
  value: number | undefined,
): number {
  return requirePositiveValue(
    value,
    "Molar mass",
  );
}

function requireNFactor(
  value: number | undefined,
): number {
  return requirePositiveValue(
    value,
    "n-factor",
  );
}

function requireEquivalentWeight(
  value: number | undefined,
): number {
  return requirePositiveValue(
    value,
    "Equivalent weight",
  );
}

function requireEquivalents(
  value: number | undefined,
): number {
  return requireNonNegativeValue(
    value,
    "Reactive equivalents",
  );
}

export function calculateEquivalentWeight({
  molarMass,
  nFactor,
  equivalentWeight,
  mass,
  massUnit = "g",
  equivalents,
  solveFor,
}: EquivalentWeightInput): CalculationResult<EquivalentWeightDetails> {
  let calculatedMolarMass = molarMass;
  let calculatedNFactor = nFactor;
  let calculatedEquivalentWeight =
    equivalentWeight;
  let calculatedMass = mass;
  let massInGrams: number | undefined;
  let calculatedEquivalents =
    equivalents;

  switch (solveFor) {
    case "equivalentWeight": {
      calculatedMolarMass =
        requireMolarMass(molarMass);

      calculatedNFactor =
        requireNFactor(nFactor);

      calculatedEquivalentWeight =
        calculatedMolarMass /
        calculatedNFactor;

      break;
    }

    case "molarMass": {
      calculatedEquivalentWeight =
        requireEquivalentWeight(
          equivalentWeight,
        );

      calculatedNFactor =
        requireNFactor(nFactor);

      calculatedMolarMass =
        calculatedEquivalentWeight *
        calculatedNFactor;

      break;
    }

    case "nFactor": {
      calculatedMolarMass =
        requireMolarMass(molarMass);

      calculatedEquivalentWeight =
        requireEquivalentWeight(
          equivalentWeight,
        );

      calculatedNFactor =
        calculatedMolarMass /
        calculatedEquivalentWeight;

      break;
    }

    case "equivalents": {
      calculatedEquivalentWeight =
        requireEquivalentWeight(
          equivalentWeight,
        );

      const validatedMass =
        requireNonNegativeValue(
          mass,
          "Sample mass",
        );

      calculatedMass = validatedMass;
      massInGrams = convertMassToGrams(
        validatedMass,
        massUnit,
      );

      calculatedEquivalents =
        massInGrams /
        calculatedEquivalentWeight;

      break;
    }

    case "mass": {
      calculatedEquivalentWeight =
        requireEquivalentWeight(
          equivalentWeight,
        );

      calculatedEquivalents =
        requireEquivalents(equivalents);

      massInGrams =
        calculatedEquivalents *
        calculatedEquivalentWeight;

      calculatedMass =
        convertGramsToMass(
          massInGrams,
          massUnit,
        );

      break;
    }

    default: {
      const exhaustiveCheck: never =
        solveFor;

      throw new Error(
        `Unsupported equivalent weight variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedEquivalentWeight ===
      undefined ||
    !Number.isFinite(
      calculatedEquivalentWeight,
    ) ||
    calculatedEquivalentWeight <= 0
  ) {
    throw new Error(
      "The equivalent weight calculation could not be completed.",
    );
  }

  const calculatedValues = [
    calculatedMolarMass,
    calculatedNFactor,
    calculatedMass,
    massInGrams,
    calculatedEquivalents,
  ];

  if (
    calculatedValues.some(
      (value) =>
        value !== undefined &&
        !Number.isFinite(value),
    )
  ) {
    throw new Error(
      "The equivalent weight calculation could not be completed.",
    );
  }

  const solvedValue = {
    equivalentWeight:
      calculatedEquivalentWeight,
    molarMass:
      calculatedMolarMass,
    nFactor:
      calculatedNFactor,
    equivalents:
      calculatedEquivalents,
    mass:
      calculatedMass,
  }[solveFor];

  if (
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The equivalent weight calculation could not be completed.",
    );
  }

  const formattedValue = {
    equivalentWeight:
      `${formatCalculatedNumber(solvedValue)} g/eq`,
    molarMass:
      `${formatCalculatedNumber(solvedValue)} g/mol`,
    nFactor:
      formatCalculatedNumber(solvedValue),
    equivalents:
      `${formatCalculatedNumber(solvedValue)} eq`,
    mass:
      `${formatCalculatedNumber(solvedValue)} ${massUnit}`,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue,
    details: {
      molarMass: calculatedMolarMass,
      nFactor: calculatedNFactor,
      equivalentWeight:
        calculatedEquivalentWeight,
      mass: calculatedMass,
      massInGrams,
      massUnit,
      equivalents:
        calculatedEquivalents,
      solvedVariable: solveFor,
      formula:
        formulaByVariable[solveFor],
    },
  };
}

export function getEquivalentWeightVariableLabel(
  variable: EquivalentWeightVariable,
): string {
  return variableLabels[variable];
}
