import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type MassMolesVariable =
  | "mass"
  | "moles"
  | "molarMass";

export type MassMolesInput = {
  mass?: number;
  moles?: number;
  molarMass?: number;
  solveFor: MassMolesVariable;
};

export type MassMolesDetails = {
  mass: number;
  moles: number;
  molarMass: number;
  solvedVariable: MassMolesVariable;
  formula: string;
};

const variableLabels: Record<MassMolesVariable, string> = {
  mass: "Mass",
  moles: "Moles",
  molarMass: "Molar mass",
};

function requirePositiveValue(
  value: number | undefined,
  variable: MassMolesVariable,
): number {
  if (value === undefined || !Number.isFinite(value)) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  if (value <= 0) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return value;
}

export function calculateMassMoles({
  mass,
  moles,
  molarMass,
  solveFor,
}: MassMolesInput): CalculationResult<MassMolesDetails> {
  let calculatedMass = mass;
  let calculatedMoles = moles;
  let calculatedMolarMass = molarMass;

  switch (solveFor) {
    case "mass": {
      calculatedMoles = requirePositiveValue(moles, "moles");
      calculatedMolarMass = requirePositiveValue(
        molarMass,
        "molarMass",
      );
      calculatedMass = calculatedMoles * calculatedMolarMass;
      break;
    }

    case "moles": {
      calculatedMass = requirePositiveValue(mass, "mass");
      calculatedMolarMass = requirePositiveValue(
        molarMass,
        "molarMass",
      );
      calculatedMoles = calculatedMass / calculatedMolarMass;
      break;
    }

    case "molarMass": {
      calculatedMass = requirePositiveValue(mass, "mass");
      calculatedMoles = requirePositiveValue(moles, "moles");
      calculatedMolarMass = calculatedMass / calculatedMoles;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;
      throw new Error(
        `Unsupported mass-moles variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    mass: calculatedMass,
    moles: calculatedMoles,
    molarMass: calculatedMolarMass,
  }[solveFor];

  if (
    calculatedMass === undefined ||
    calculatedMoles === undefined ||
    calculatedMolarMass === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The mass-moles calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue: formatCalculatedNumber(solvedValue),
    details: {
      mass: calculatedMass,
      moles: calculatedMoles,
      molarMass: calculatedMolarMass,
      solvedVariable: solveFor,
      formula: "m = n × M",
    },
  };
}
