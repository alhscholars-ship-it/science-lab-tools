import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type PressureVariable =
  | "pressure"
  | "force"
  | "area";

export type PressureInput = {
  pressure?: number;
  force?: number;
  area?: number;
  solveFor: PressureVariable;
};

export type PressureDetails = {
  pressure: number;
  force: number;
  area: number;
  solvedVariable: PressureVariable;
  formula: string;
};

const variableLabels: Record<
  PressureVariable,
  string
> = {
  pressure: "Pressure",
  force: "Force",
  area: "Area",
};

function requireFiniteValue(
  value: number | undefined,
  variable: PressureVariable,
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
  variable: PressureVariable,
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

export function calculatePressure({
  pressure,
  force,
  area,
  solveFor,
}: PressureInput): CalculationResult<PressureDetails> {
  let calculatedPressure = pressure;
  let calculatedForce = force;
  let calculatedArea = area;

  switch (solveFor) {
    case "pressure": {
      calculatedForce = requirePositiveValue(
        force,
        "force",
      );

      calculatedArea = requirePositiveValue(
        area,
        "area",
      );

      calculatedPressure =
        calculatedForce / calculatedArea;
      break;
    }

    case "force": {
      calculatedPressure = requirePositiveValue(
        pressure,
        "pressure",
      );

      calculatedArea = requirePositiveValue(
        area,
        "area",
      );

      calculatedForce =
        calculatedPressure * calculatedArea;
      break;
    }

    case "area": {
      calculatedForce = requirePositiveValue(
        force,
        "force",
      );

      calculatedPressure = requirePositiveValue(
        pressure,
        "pressure",
      );

      calculatedArea =
        calculatedForce / calculatedPressure;
      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported pressure variable: ${exhaustiveCheck}`,
      );
    }
  }

  const solvedValue = {
    pressure: calculatedPressure,
    force: calculatedForce,
    area: calculatedArea,
  }[solveFor];

  if (
    calculatedPressure === undefined ||
    calculatedForce === undefined ||
    calculatedArea === undefined ||
    solvedValue === undefined ||
    !Number.isFinite(solvedValue)
  ) {
    throw new Error(
      "The pressure calculation could not be completed.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      pressure: calculatedPressure,
      force: calculatedForce,
      area: calculatedArea,
      solvedVariable: solveFor,
      formula: "P = F ÷ A",
    },
  };
}
