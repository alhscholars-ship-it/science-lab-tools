import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type CurrentDividerVariable =
  | "branchOneCurrent"
  | "totalCurrent"
  | "branchOneResistance"
  | "branchTwoResistance";

export type CurrentDividerInput = {
  branchOneCurrent?: number;
  totalCurrent?: number;
  branchOneResistance?: number;
  branchTwoResistance?: number;
  solveFor: CurrentDividerVariable;
};

export type CurrentDividerDetails = {
  branchOneCurrent: number;
  branchTwoCurrent: number;
  totalCurrent: number;
  branchOneResistance: number;
  branchTwoResistance: number;
  equivalentResistance: number;
  circuitVoltage: number;
  branchOneCurrentRatio: number;
  solvedVariable: CurrentDividerVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  CurrentDividerVariable,
  string
> = {
  branchOneCurrent: "Branch-one current",
  totalCurrent: "Total current",
  branchOneResistance: "Branch-one resistance",
  branchTwoResistance: "Branch-two resistance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: CurrentDividerVariable,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value) ||
    value <= 0
  ) {
    throw new Error(
      `${variableLabels[variable]} must be greater than zero.`,
    );
  }

  return value;
}

function requireBranchCurrentBelowTotal(
  branchOneCurrent: number,
  totalCurrent: number,
): void {
  if (branchOneCurrent >= totalCurrent) {
    throw new Error(
      "Branch-one current must be less than total current.",
    );
  }
}

export function calculateCurrentDivider({
  branchOneCurrent,
  totalCurrent,
  branchOneResistance,
  branchTwoResistance,
  solveFor,
}: CurrentDividerInput): CalculationResult<CurrentDividerDetails> {
  let calculatedBranchOneCurrent =
    branchOneCurrent;
  let calculatedTotalCurrent = totalCurrent;
  let calculatedBranchOneResistance =
    branchOneResistance;
  let calculatedBranchTwoResistance =
    branchTwoResistance;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "branchOneCurrent": {
      calculatedTotalCurrent =
        requirePositiveFiniteValue(
          totalCurrent,
          "totalCurrent",
        );

      calculatedBranchOneResistance =
        requirePositiveFiniteValue(
          branchOneResistance,
          "branchOneResistance",
        );

      calculatedBranchTwoResistance =
        requirePositiveFiniteValue(
          branchTwoResistance,
          "branchTwoResistance",
        );

      calculatedBranchOneCurrent =
        calculatedTotalCurrent *
        (calculatedBranchTwoResistance /
          (calculatedBranchOneResistance +
            calculatedBranchTwoResistance));

      formula = "I1 = It × R2 ÷ (R1 + R2)";
      substitution =
        `I1 = ${calculatedTotalCurrent} × ` +
        `${calculatedBranchTwoResistance} ÷ ` +
        `(${calculatedBranchOneResistance} + ` +
        `${calculatedBranchTwoResistance})`;

      break;
    }

    case "totalCurrent": {
      calculatedBranchOneCurrent =
        requirePositiveFiniteValue(
          branchOneCurrent,
          "branchOneCurrent",
        );

      calculatedBranchOneResistance =
        requirePositiveFiniteValue(
          branchOneResistance,
          "branchOneResistance",
        );

      calculatedBranchTwoResistance =
        requirePositiveFiniteValue(
          branchTwoResistance,
          "branchTwoResistance",
        );

      calculatedTotalCurrent =
        calculatedBranchOneCurrent *
        ((calculatedBranchOneResistance +
          calculatedBranchTwoResistance) /
          calculatedBranchTwoResistance);

      formula = "It = I1 × (R1 + R2) ÷ R2";
      substitution =
        `It = ${calculatedBranchOneCurrent} × ` +
        `(${calculatedBranchOneResistance} + ` +
        `${calculatedBranchTwoResistance}) ÷ ` +
        `${calculatedBranchTwoResistance}`;

      break;
    }

    case "branchOneResistance": {
      calculatedBranchOneCurrent =
        requirePositiveFiniteValue(
          branchOneCurrent,
          "branchOneCurrent",
        );

      calculatedTotalCurrent =
        requirePositiveFiniteValue(
          totalCurrent,
          "totalCurrent",
        );

      calculatedBranchTwoResistance =
        requirePositiveFiniteValue(
          branchTwoResistance,
          "branchTwoResistance",
        );

      requireBranchCurrentBelowTotal(
        calculatedBranchOneCurrent,
        calculatedTotalCurrent,
      );

      calculatedBranchOneResistance =
        calculatedBranchTwoResistance *
        ((calculatedTotalCurrent -
          calculatedBranchOneCurrent) /
          calculatedBranchOneCurrent);

      formula = "R1 = R2 × (It − I1) ÷ I1";
      substitution =
        `R1 = ${calculatedBranchTwoResistance} × ` +
        `(${calculatedTotalCurrent} − ` +
        `${calculatedBranchOneCurrent}) ÷ ` +
        `${calculatedBranchOneCurrent}`;

      break;
    }

    case "branchTwoResistance": {
      calculatedBranchOneCurrent =
        requirePositiveFiniteValue(
          branchOneCurrent,
          "branchOneCurrent",
        );

      calculatedTotalCurrent =
        requirePositiveFiniteValue(
          totalCurrent,
          "totalCurrent",
        );

      calculatedBranchOneResistance =
        requirePositiveFiniteValue(
          branchOneResistance,
          "branchOneResistance",
        );

      requireBranchCurrentBelowTotal(
        calculatedBranchOneCurrent,
        calculatedTotalCurrent,
      );

      calculatedBranchTwoResistance =
        (calculatedBranchOneCurrent *
          calculatedBranchOneResistance) /
        (calculatedTotalCurrent -
          calculatedBranchOneCurrent);

      formula = "R2 = I1 × R1 ÷ (It − I1)";
      substitution =
        `R2 = ${calculatedBranchOneCurrent} × ` +
        `${calculatedBranchOneResistance} ÷ ` +
        `(${calculatedTotalCurrent} − ` +
        `${calculatedBranchOneCurrent})`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported current divider variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedBranchOneCurrent === undefined ||
    calculatedTotalCurrent === undefined ||
    calculatedBranchOneResistance === undefined ||
    calculatedBranchTwoResistance === undefined ||
    !Number.isFinite(calculatedBranchOneCurrent) ||
    !Number.isFinite(calculatedTotalCurrent) ||
    !Number.isFinite(
      calculatedBranchOneResistance,
    ) ||
    !Number.isFinite(
      calculatedBranchTwoResistance,
    ) ||
    calculatedBranchOneCurrent <= 0 ||
    calculatedTotalCurrent <= 0 ||
    calculatedBranchOneResistance <= 0 ||
    calculatedBranchTwoResistance <= 0
  ) {
    throw new Error(
      "The current-divider calculation could not be completed.",
    );
  }

  requireBranchCurrentBelowTotal(
    calculatedBranchOneCurrent,
    calculatedTotalCurrent,
  );

  const branchTwoCurrent =
    calculatedTotalCurrent -
    calculatedBranchOneCurrent;

  const equivalentResistance =
    (calculatedBranchOneResistance *
      calculatedBranchTwoResistance) /
    (calculatedBranchOneResistance +
      calculatedBranchTwoResistance);

  const circuitVoltage =
    calculatedTotalCurrent *
    equivalentResistance;

  const branchOneCurrentRatio =
    calculatedBranchOneCurrent /
    calculatedTotalCurrent;

  const solvedValue = {
    branchOneCurrent: calculatedBranchOneCurrent,
    totalCurrent: calculatedTotalCurrent,
    branchOneResistance:
      calculatedBranchOneResistance,
    branchTwoResistance:
      calculatedBranchTwoResistance,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      branchOneCurrent:
        calculatedBranchOneCurrent,
      branchTwoCurrent,
      totalCurrent: calculatedTotalCurrent,
      branchOneResistance:
        calculatedBranchOneResistance,
      branchTwoResistance:
        calculatedBranchTwoResistance,
      equivalentResistance,
      circuitVoltage,
      branchOneCurrentRatio,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
