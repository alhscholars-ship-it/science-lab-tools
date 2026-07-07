import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type HookesLawVariable =
  | "force"
  | "springConstant"
  | "extension";

export type HookesLawInput = {
  force?: number;
  springConstant?: number;
  extension?: number;
  solveFor: HookesLawVariable;
};

export type HookesLawDetails = {
  force: number;
  springConstant: number;
  extension: number;
  solvedVariable: HookesLawVariable;
  formula: string;
};

const variableLabels: Record<
  HookesLawVariable,
  string
> = {
  force: "Force",
  springConstant: "Spring constant",
  extension: "Extension",
};

function requireFiniteValue(
  value: number | undefined,
  variable: HookesLawVariable,
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

function requirePositiveForce(
  value: number | undefined,
): number {
  const finiteValue = requireFiniteValue(
    value,
    "force",
  );

  if (finiteValue <= 0) {
    throw new Error(
      "Force must be greater than zero when calculating another variable.",
    );
  }

  return finiteValue;
}

export function calculateHookesLaw({
  force,
  springConstant,
  extension,
  solveFor,
}: HookesLawInput): CalculationResult<HookesLawDetails> {
  let calculatedForce = force;
  let calculatedSpringConstant =
    springConstant;
  let calculatedExtension = extension;

  switch (solveFor) {
    case "force": {
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

      calculatedForce =
        calculatedSpringConstant *
        calculatedExtension;
      break;
    }

    case "springConstant": {
      calculatedForce =
        requirePositiveForce(force);

      calculatedExtension =
        requirePositiveValue(
          extension,
          "extension",
        );

      calculatedSpringConstant =
        calculatedForce /
        calculatedExtension;
      break;
    }

    case "extension": {
      calculatedForce =
        requirePositiveForce(force);

      calculatedSpringConstant =
        requirePositiveValue(
          springConstant,
          "springConstant",
        );

      calculatedExtension =
        calculatedForce /
        calculatedSpringConstant;
      break;
    }

    default: {
      const exhaustiveCheck: never =
        solveFor;

      throw new Error(
        `Unsupported Hooke's law variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    force: calculatedForce,
    springConstant:
      calculatedSpringConstant,
    extension: calculatedExtension,
  }[solveFor];

  if (
    calculatedForce === undefined ||
    calculatedSpringConstant === undefined ||
    calculatedExtension === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The Hooke's law calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      force: calculatedForce,
      springConstant:
        calculatedSpringConstant,
      extension: calculatedExtension,
      solvedVariable: solveFor,
      formula: "F = kx",
    },
  };
}
