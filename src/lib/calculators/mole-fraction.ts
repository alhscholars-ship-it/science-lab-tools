import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type MoleFractionVariable =
  | "componentMoles"
  | "totalMoles"
  | "moleFraction";

export type MoleFractionInput = {
  componentMoles?: number;
  totalMoles?: number;
  moleFraction?: number;
  solveFor: MoleFractionVariable;
};

export type MoleFractionDetails = {
  componentMoles: number;
  totalMoles: number;
  moleFraction: number;
  molePercent: number;
  solvedVariable: MoleFractionVariable;
  formula: string;
};

const variableLabels: Record<
  MoleFractionVariable,
  string
> = {
  componentMoles: "Component moles",
  totalMoles: "Total moles",
  moleFraction: "Mole fraction",
};

function requireComponentMoles(
  value: number | undefined,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      "Component moles must be a finite number.",
    );
  }

  if (value < 0) {
    throw new Error(
      "Component moles cannot be negative.",
    );
  }

  return value;
}

function requireTotalMoles(
  value: number | undefined,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      "Total moles must be a finite number.",
    );
  }

  if (value <= 0) {
    throw new Error(
      "Total moles must be greater than zero.",
    );
  }

  return value;
}

function requireMoleFraction(
  value: number | undefined,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      "Mole fraction must be a finite number.",
    );
  }

  if (value < 0 || value > 1) {
    throw new Error(
      "Mole fraction must be between 0 and 1.",
    );
  }

  return value;
}

export function calculateMoleFraction({
  componentMoles,
  totalMoles,
  moleFraction,
  solveFor,
}: MoleFractionInput): CalculationResult<MoleFractionDetails> {
  let calculatedComponentMoles = componentMoles;
  let calculatedTotalMoles = totalMoles;
  let calculatedMoleFraction = moleFraction;

  switch (solveFor) {
    case "componentMoles": {
      calculatedTotalMoles =
        requireTotalMoles(totalMoles);

      calculatedMoleFraction =
        requireMoleFraction(moleFraction);

      calculatedComponentMoles =
        calculatedMoleFraction *
        calculatedTotalMoles;

      break;
    }

    case "totalMoles": {
      calculatedComponentMoles =
        requireComponentMoles(componentMoles);

      calculatedMoleFraction =
        requireMoleFraction(moleFraction);

      if (calculatedMoleFraction <= 0) {
        throw new Error(
          "Mole fraction must be greater than zero when calculating total moles.",
        );
      }

      calculatedTotalMoles =
        calculatedComponentMoles /
        calculatedMoleFraction;

      break;
    }

    case "moleFraction": {
      calculatedComponentMoles =
        requireComponentMoles(componentMoles);

      calculatedTotalMoles =
        requireTotalMoles(totalMoles);

      if (
        calculatedComponentMoles >
        calculatedTotalMoles
      ) {
        throw new Error(
          "Component moles cannot exceed total moles.",
        );
      }

      calculatedMoleFraction =
        calculatedComponentMoles /
        calculatedTotalMoles;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported mole-fraction variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedComponentMoles === undefined ||
    calculatedTotalMoles === undefined ||
    calculatedMoleFraction === undefined ||
    !Number.isFinite(calculatedComponentMoles) ||
    !Number.isFinite(calculatedTotalMoles) ||
    !Number.isFinite(calculatedMoleFraction)
  ) {
    throw new Error(
      "The mole-fraction calculation could not be completed.",
    );
  }

  if (calculatedTotalMoles <= 0) {
    throw new Error(
      "Total moles must be greater than zero.",
    );
  }

  if (
    calculatedComponentMoles >
    calculatedTotalMoles
  ) {
    throw new Error(
      "Component moles cannot exceed total moles.",
    );
  }

  const solvedValue = {
    componentMoles: calculatedComponentMoles,
    totalMoles: calculatedTotalMoles,
    moleFraction: calculatedMoleFraction,
  }[solveFor];

  const formattedValue =
    solveFor === "moleFraction"
      ? formatCalculatedNumber(solvedValue)
      : `${formatCalculatedNumber(solvedValue)} mol`;

  return {
    value: solvedValue,
    formattedValue,
    details: {
      componentMoles: calculatedComponentMoles,
      totalMoles: calculatedTotalMoles,
      moleFraction: calculatedMoleFraction,
      molePercent:
        calculatedMoleFraction * 100,
      solvedVariable: solveFor,
      formula: "xᵢ = nᵢ ÷ nₜₒₜₐₗ",
    },
  };
}

export function getMoleFractionVariableLabel(
  variable: MoleFractionVariable,
): string {
  return variableLabels[variable];
}
