import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type DisplacementVariable =
  | "displacement"
  | "initialPosition"
  | "finalPosition";

export type DisplacementInput = {
  displacement?: number;
  initialPosition?: number;
  finalPosition?: number;
  solveFor: DisplacementVariable;
};

export type DisplacementDetails = {
  displacement: number;
  initialPosition: number;
  finalPosition: number;
  solvedVariable: DisplacementVariable;
  formula: string;
};

const variableLabels: Record<
  DisplacementVariable,
  string
> = {
  displacement: "Displacement",
  initialPosition: "Initial position",
  finalPosition: "Final position",
};

function requireFiniteValue(
  value: number | undefined,
  variable: DisplacementVariable,
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

export function calculateDisplacement({
  displacement,
  initialPosition,
  finalPosition,
  solveFor,
}: DisplacementInput): CalculationResult<DisplacementDetails> {
  let changeInPosition = displacement;
  let startPosition = initialPosition;
  let endPosition = finalPosition;

  switch (solveFor) {
    case "displacement": {
      startPosition = requireFiniteValue(
        startPosition,
        "initialPosition",
      );
      endPosition = requireFiniteValue(
        endPosition,
        "finalPosition",
      );

      changeInPosition =
        endPosition - startPosition;
      break;
    }

    case "initialPosition": {
      changeInPosition = requireFiniteValue(
        changeInPosition,
        "displacement",
      );
      endPosition = requireFiniteValue(
        endPosition,
        "finalPosition",
      );

      startPosition =
        endPosition - changeInPosition;
      break;
    }

    case "finalPosition": {
      changeInPosition = requireFiniteValue(
        changeInPosition,
        "displacement",
      );
      startPosition = requireFiniteValue(
        startPosition,
        "initialPosition",
      );

      endPosition =
        startPosition + changeInPosition;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported displacement variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    displacement: changeInPosition,
    initialPosition: startPosition,
    finalPosition: endPosition,
  }[solveFor];

  if (
    changeInPosition === undefined ||
    startPosition === undefined ||
    endPosition === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The displacement calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      displacement: changeInPosition,
      initialPosition: startPosition,
      finalPosition: endPosition,
      solvedVariable: solveFor,
      formula: "Δx = x₂ − x₁",
    },
  };
}
