import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type StoichiometryUnit = "mol" | "g";

export type StoichiometryInput = {
  knownAmount: number;
  knownUnit: StoichiometryUnit;
  knownCoefficient: number;
  knownMolarMass?: number;
  targetCoefficient: number;
  targetUnit: StoichiometryUnit;
  targetMolarMass?: number;
};

export type StoichiometryDetails = {
  knownAmount: number;
  knownUnit: StoichiometryUnit;
  knownCoefficient: number;
  knownMolarMass: number | null;
  knownMoles: number;
  targetCoefficient: number;
  targetMolarMass: number | null;
  targetMoles: number;
  targetUnit: StoichiometryUnit;
  moleRatio: number;
  formula: string;
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

function convertKnownAmountToMoles(
  amount: number,
  unit: StoichiometryUnit,
  molarMass: number | undefined,
): {
  moles: number;
  molarMass: number | null;
} {
  if (unit === "mol") {
    return {
      moles: amount,
      molarMass: null,
    };
  }

  const safeMolarMass =
    requirePositiveValue(
      molarMass,
      "Known substance molar mass",
    );

  return {
    moles: amount / safeMolarMass,
    molarMass: safeMolarMass,
  };
}

function convertTargetMoles(
  moles: number,
  unit: StoichiometryUnit,
  molarMass: number | undefined,
): {
  amount: number;
  molarMass: number | null;
} {
  if (unit === "mol") {
    return {
      amount: moles,
      molarMass: null,
    };
  }

  const safeMolarMass =
    requirePositiveValue(
      molarMass,
      "Target molar mass",
    );

  return {
    amount: moles * safeMolarMass,
    molarMass: safeMolarMass,
  };
}

export function calculateStoichiometry({
  knownAmount,
  knownUnit,
  knownCoefficient,
  knownMolarMass,
  targetCoefficient,
  targetUnit,
  targetMolarMass,
}: StoichiometryInput): CalculationResult<StoichiometryDetails> {
  const safeKnownAmount =
    requirePositiveValue(
      knownAmount,
      "Known amount",
    );

  const safeKnownCoefficient =
    requirePositiveValue(
      knownCoefficient,
      "Known coefficient",
    );

  const safeTargetCoefficient =
    requirePositiveValue(
      targetCoefficient,
      "Target coefficient",
    );

  const knownConversion =
    convertKnownAmountToMoles(
      safeKnownAmount,
      knownUnit,
      knownMolarMass,
    );

  const moleRatio =
    safeTargetCoefficient /
    safeKnownCoefficient;

  const targetMoles =
    knownConversion.moles * moleRatio;

  const targetConversion =
    convertTargetMoles(
      targetMoles,
      targetUnit,
      targetMolarMass,
    );

  if (
    !Number.isFinite(targetMoles) ||
    !Number.isFinite(
      targetConversion.amount,
    )
  ) {
    throw new Error(
      "The stoichiometry calculation could not be completed.",
    );
  }

  return {
    value: targetConversion.amount,
    formattedValue:
      formatCalculatedNumber(
        targetConversion.amount,
      ),
    details: {
      knownAmount: safeKnownAmount,
      knownUnit,
      knownCoefficient:
        safeKnownCoefficient,
      knownMolarMass:
        knownConversion.molarMass,
      knownMoles:
        knownConversion.moles,
      targetCoefficient:
        safeTargetCoefficient,
      targetMolarMass:
        targetConversion.molarMass,
      targetMoles,
      targetUnit,
      moleRatio,
      formula:
        "target moles = known moles × (target coefficient ÷ known coefficient)",
    },
  };
}
