import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type ElasticPotentialEnergyVariable =
  | "elasticEnergy"
  | "springConstant"
  | "extension";

export type ElasticPotentialEnergyInput = {
  elasticEnergy?: number;
  springConstant?: number;
  extension?: number;
  solveFor: ElasticPotentialEnergyVariable;
};

export type ElasticPotentialEnergyDetails = {
  elasticEnergy: number;
  springConstant: number;
  extension: number;
  solvedVariable: ElasticPotentialEnergyVariable;
  formula: string;
};

const variableLabels: Record<
  ElasticPotentialEnergyVariable,
  string
> = {
  elasticEnergy: "Elastic potential energy",
  springConstant: "Spring constant",
  extension: "Extension",
};

function requireFiniteValue(
  value: number | undefined,
  variable: ElasticPotentialEnergyVariable,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `${variableLabels[variable]} must be a finite number.`,
    );
  }

  return value;
}

function requirePositiveValue(
  value: number | undefined,
  variable: "springConstant" | "extension",
): number {
  const finiteValue = requireFiniteValue(
    value,
    variable,
  );

  if (finiteValue <= 0) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return finiteValue;
}

function requirePositiveEnergy(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "elasticEnergy",
  );

  if (finiteValue <= 0) {
    throw new Error(
      "Elastic potential energy must be greater than zero when calculating another variable.",
    );
  }

  return finiteValue;
}

export function calculateElasticPotentialEnergy({
  elasticEnergy,
  springConstant,
  extension,
  solveFor,
}: ElasticPotentialEnergyInput): CalculationResult<ElasticPotentialEnergyDetails> {
  let calculatedElasticEnergy =
    elasticEnergy;
  let calculatedSpringConstant =
    springConstant;
  let calculatedExtension = extension;

  switch (solveFor) {
    case "elasticEnergy": {
      calculatedSpringConstant =
        requirePositiveValue(
          springConstant,
          "springConstant",
        );

      calculatedExtension =
        requirePositiveValue(
          extension,
          "extension",
        );

      calculatedElasticEnergy =
        0.5 *
        calculatedSpringConstant *
        calculatedExtension ** 2;
      break;
    }

    case "springConstant": {
      calculatedElasticEnergy =
        requirePositiveEnergy(
          elasticEnergy,
        );

      calculatedExtension =
        requirePositiveValue(
          extension,
          "extension",
        );

      calculatedSpringConstant =
        (2 * calculatedElasticEnergy) /
        calculatedExtension ** 2;
      break;
    }

    case "extension": {
      calculatedElasticEnergy =
        requirePositiveEnergy(
          elasticEnergy,
        );

      calculatedSpringConstant =
        requirePositiveValue(
          springConstant,
          "springConstant",
        );

      calculatedExtension = Math.sqrt(
        (2 * calculatedElasticEnergy) /
          calculatedSpringConstant,
      );
      break;
    }

    default: {
      const exhaustiveCheck: never =
        solveFor;

      throw new Error(
        `Unsupported elastic-energy variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    elasticEnergy:
      calculatedElasticEnergy,
    springConstant:
      calculatedSpringConstant,
    extension: calculatedExtension,
  }[solveFor];

  if (
    calculatedElasticEnergy === undefined ||
    calculatedSpringConstant === undefined ||
    calculatedExtension === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The elastic potential energy calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      elasticEnergy:
        calculatedElasticEnergy,
      springConstant:
        calculatedSpringConstant,
      extension: calculatedExtension,
      solvedVariable: solveFor,
      formula: "E = ½kx²",
    },
  };
}
