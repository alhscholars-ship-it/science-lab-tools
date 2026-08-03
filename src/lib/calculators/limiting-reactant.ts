import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type LimitingReactantUnit = "mol" | "g";

export type LimitingReactantSubstance = {
  name: string;
  amount: number;
  unit: LimitingReactantUnit;
  coefficient: number;
  molarMass?: number;
};

export type LimitingReactantProduct = {
  coefficient: number;
  unit: LimitingReactantUnit;
  molarMass?: number;
};

export type LimitingReactantInput = {
  reactantA: LimitingReactantSubstance;
  reactantB: LimitingReactantSubstance;
  product: LimitingReactantProduct;
};

export type LimitingReactantDetails = {
  reactantAName: string;
  reactantAAmount: number;
  reactantAUnit: LimitingReactantUnit;
  reactantACoefficient: number;
  reactantAMolarMass: number | null;
  reactantAMoles: number;
  reactantAReactionCapacity: number;
  reactantBName: string;
  reactantBAmount: number;
  reactantBUnit: LimitingReactantUnit;
  reactantBCoefficient: number;
  reactantBMolarMass: number | null;
  reactantBMoles: number;
  reactantBReactionCapacity: number;
  limitingReactant: string;
  excessReactant: string | null;
  excessMoles: number;
  isCoLimiting: boolean;
  reactionExtent: number;
  productCoefficient: number;
  productMolarMass: number | null;
  productMoles: number;
  productUnit: LimitingReactantUnit;
  formula: string;
};

type MoleConversion = {
  moles: number;
  molarMass: number | null;
};

function requirePositiveNumber(
  value: number | undefined,
  label: string,
): number {
  if (
    value === undefined ||
    Number.isFinite(value) === false
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

function requireSubstanceName(
  value: string,
  label: string,
): string {
  const name = value.trim();

  if (name.length === 0) {
    throw new Error(
      `${label} name is required.`,
    );
  }

  return name;
}

function convertToMoles(
  substance: LimitingReactantSubstance,
  label: string,
): MoleConversion {
  const amount = requirePositiveNumber(
    substance.amount,
    `${label} amount`,
  );

  if (substance.unit === "mol") {
    return {
      moles: amount,
      molarMass: null,
    };
  }

  const molarMass = requirePositiveNumber(
    substance.molarMass,
    `${label} molar mass`,
  );

  return {
    moles: amount / molarMass,
    molarMass,
  };
}

function convertProductMoles(
  productMoles: number,
  product: LimitingReactantProduct,
): {
  amount: number;
  molarMass: number | null;
} {
  if (product.unit === "mol") {
    return {
      amount: productMoles,
      molarMass: null,
    };
  }

  const molarMass = requirePositiveNumber(
    product.molarMass,
    "Product molar mass",
  );

  return {
    amount: productMoles * molarMass,
    molarMass,
  };
}

function capacitiesAreEqual(
  capacityA: number,
  capacityB: number,
): boolean {
  const scale = Math.max(
    Math.abs(capacityA),
    Math.abs(capacityB),
    1,
  );

  return (
    Math.abs(capacityA - capacityB) <=
    scale * 1e-12
  );
}

export function calculateLimitingReactant({
  reactantA,
  reactantB,
  product,
}: LimitingReactantInput): CalculationResult<LimitingReactantDetails> {
  const reactantAName =
    requireSubstanceName(
      reactantA.name,
      "Reactant A",
    );

  const reactantBName =
    requireSubstanceName(
      reactantB.name,
      "Reactant B",
    );

  const reactantACoefficient =
    requirePositiveNumber(
      reactantA.coefficient,
      "Reactant A coefficient",
    );

  const reactantBCoefficient =
    requirePositiveNumber(
      reactantB.coefficient,
      "Reactant B coefficient",
    );

  const productCoefficient =
    requirePositiveNumber(
      product.coefficient,
      "Product coefficient",
    );

  const reactantAConversion =
    convertToMoles(
      reactantA,
      "Reactant A",
    );

  const reactantBConversion =
    convertToMoles(
      reactantB,
      "Reactant B",
    );

  const reactantAReactionCapacity =
    reactantAConversion.moles /
    reactantACoefficient;

  const reactantBReactionCapacity =
    reactantBConversion.moles /
    reactantBCoefficient;

  const isCoLimiting =
    capacitiesAreEqual(
      reactantAReactionCapacity,
      reactantBReactionCapacity,
    );

  const reactionExtent = Math.min(
    reactantAReactionCapacity,
    reactantBReactionCapacity,
  );

  let limitingReactant: string;
  let excessReactant: string | null;
  let excessMoles: number;

  if (isCoLimiting) {
    limitingReactant =
      `${reactantAName} and ${reactantBName}`;

    excessReactant = null;
    excessMoles = 0;
  } else if (
    reactantAReactionCapacity <
    reactantBReactionCapacity
  ) {
    limitingReactant = reactantAName;
    excessReactant = reactantBName;

    excessMoles =
      reactantBConversion.moles -
      reactionExtent *
        reactantBCoefficient;
  } else {
    limitingReactant = reactantBName;
    excessReactant = reactantAName;

    excessMoles =
      reactantAConversion.moles -
      reactionExtent *
        reactantACoefficient;
  }

  const safeExcessMoles =
    Math.abs(excessMoles) < 1e-12
      ? 0
      : excessMoles;

  const productMoles =
    reactionExtent *
    productCoefficient;

  const productConversion =
    convertProductMoles(
      productMoles,
      product,
    );

  if (
    Number.isFinite(reactionExtent) === false ||
    Number.isFinite(productMoles) === false ||
    Number.isFinite(
      productConversion.amount,
    ) === false ||
    Number.isFinite(
      safeExcessMoles,
    ) === false
  ) {
    throw new Error(
      "The limiting-reactant calculation could not be completed.",
    );
  }

  return {
    value: productConversion.amount,
    formattedValue:
      formatCalculatedNumber(
        productConversion.amount,
      ),
    details: {
      reactantAName,
      reactantAAmount:
        reactantA.amount,
      reactantAUnit:
        reactantA.unit,
      reactantACoefficient,
      reactantAMolarMass:
        reactantAConversion.molarMass,
      reactantAMoles:
        reactantAConversion.moles,
      reactantAReactionCapacity,
      reactantBName,
      reactantBAmount:
        reactantB.amount,
      reactantBUnit:
        reactantB.unit,
      reactantBCoefficient,
      reactantBMolarMass:
        reactantBConversion.molarMass,
      reactantBMoles:
        reactantBConversion.moles,
      reactantBReactionCapacity,
      limitingReactant,
      excessReactant,
      excessMoles:
        safeExcessMoles,
      isCoLimiting,
      reactionExtent,
      productCoefficient,
      productMolarMass:
        productConversion.molarMass,
      productMoles,
      productUnit:
        product.unit,
      formula:
        "reaction capacity = available moles ÷ coefficient; the smaller capacity identifies the limiting reactant",
    },
  };
}
