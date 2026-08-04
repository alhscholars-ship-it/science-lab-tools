import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type SolventMassUnit = "kg" | "g";

export type MolalityVariable =
  | "soluteMoles"
  | "solventMass"
  | "molality";

export type MolalityInput = {
  soluteMoles?: number;
  solventMass?: number;
  solventMassUnit: SolventMassUnit;
  molality?: number;
  solveFor: MolalityVariable;
};

export type MolalityDetails = {
  soluteMoles: number;
  solventMass: number;
  solventMassUnit: SolventMassUnit;
  solventMassInKilograms: number;
  molality: number;
  solvedVariable: MolalityVariable;
  formula: string;
};

const variableLabels: Record<
  MolalityVariable,
  string
> = {
  soluteMoles: "Moles of solute",
  solventMass: "Mass of solvent",
  molality: "Molality",
};

export function convertSolventMassToKilograms(
  mass: number,
  unit: SolventMassUnit,
): number {
  if (!Number.isFinite(mass)) {
    throw new Error(
      "Mass of solvent must be a finite number.",
    );
  }

  if (mass <= 0) {
    throw new Error(
      "Mass of solvent must be greater than zero.",
    );
  }

  if (unit === "kg") {
    return mass;
  }

  if (unit === "g") {
    return mass / 1000;
  }

  throw new Error(
    "Unsupported solvent mass unit.",
  );
}

function convertKilogramsToSolventMass(
  kilograms: number,
  unit: SolventMassUnit,
): number {
  if (unit === "kg") {
    return kilograms;
  }

  if (unit === "g") {
    return kilograms * 1000;
  }

  throw new Error(
    "Unsupported solvent mass unit.",
  );
}

function requireSoluteMoles(
  value: number | undefined,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      "Moles of solute must be a finite number.",
    );
  }

  if (value < 0) {
    throw new Error(
      "Moles of solute cannot be negative.",
    );
  }

  return value;
}

function requireMolality(
  value: number | undefined,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      "Molality must be a finite number.",
    );
  }

  if (value < 0) {
    throw new Error(
      "Molality cannot be negative.",
    );
  }

  return value;
}

export function calculateMolality({
  soluteMoles,
  solventMass,
  solventMassUnit,
  molality,
  solveFor,
}: MolalityInput): CalculationResult<MolalityDetails> {
  let calculatedSoluteMoles = soluteMoles;
  let calculatedSolventMass = solventMass;
  let calculatedMolality = molality;
  let solventMassInKilograms: number;

  switch (solveFor) {
    case "soluteMoles": {
      calculatedMolality =
        requireMolality(molality);

      calculatedSolventMass =
        solventMass;

      solventMassInKilograms =
        convertSolventMassToKilograms(
          calculatedSolventMass as number,
          solventMassUnit,
        );

      calculatedSoluteMoles =
        calculatedMolality *
        solventMassInKilograms;

      break;
    }

    case "solventMass": {
      calculatedSoluteMoles =
        requireSoluteMoles(soluteMoles);

      calculatedMolality =
        requireMolality(molality);

      if (calculatedSoluteMoles <= 0) {
        throw new Error(
          "Moles of solute must be greater than zero when calculating solvent mass.",
        );
      }

      if (calculatedMolality <= 0) {
        throw new Error(
          "Molality must be greater than zero when calculating solvent mass.",
        );
      }

      solventMassInKilograms =
        calculatedSoluteMoles /
        calculatedMolality;

      calculatedSolventMass =
        convertKilogramsToSolventMass(
          solventMassInKilograms,
          solventMassUnit,
        );

      break;
    }

    case "molality": {
      calculatedSoluteMoles =
        requireSoluteMoles(soluteMoles);

      calculatedSolventMass =
        solventMass;

      solventMassInKilograms =
        convertSolventMassToKilograms(
          calculatedSolventMass as number,
          solventMassUnit,
        );

      calculatedMolality =
        calculatedSoluteMoles /
        solventMassInKilograms;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported molality variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedSoluteMoles === undefined ||
    calculatedSolventMass === undefined ||
    calculatedMolality === undefined ||
    !Number.isFinite(calculatedSoluteMoles) ||
    !Number.isFinite(calculatedSolventMass) ||
    !Number.isFinite(calculatedMolality) ||
    !Number.isFinite(solventMassInKilograms)
  ) {
    throw new Error(
      "The molality calculation could not be completed.",
    );
  }

  if (
    calculatedSolventMass <= 0 ||
    solventMassInKilograms <= 0
  ) {
    throw new Error(
      "Mass of solvent must be greater than zero.",
    );
  }

  const solvedValue = {
    soluteMoles: calculatedSoluteMoles,
    solventMass: calculatedSolventMass,
    molality: calculatedMolality,
  }[solveFor];

  const formattedValue = {
    soluteMoles:
      `${formatCalculatedNumber(solvedValue)} mol`,
    solventMass:
      `${formatCalculatedNumber(solvedValue)} ${solventMassUnit}`,
    molality:
      `${formatCalculatedNumber(solvedValue)} mol/kg`,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue,
    details: {
      soluteMoles: calculatedSoluteMoles,
      solventMass: calculatedSolventMass,
      solventMassUnit,
      solventMassInKilograms,
      molality: calculatedMolality,
      solvedVariable: solveFor,
      formula: "m = n ÷ kg solvent",
    },
  };
}

export function getMolalityVariableLabel(
  variable: MolalityVariable,
): string {
  return variableLabels[variable];
}
