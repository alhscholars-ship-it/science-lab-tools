import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export const VACUUM_PERMEABILITY =
  4 * Math.PI * 1e-7;

export type InductanceMode =
  | "fluxLinkage"
  | "airCoreSolenoid";

export type InductanceVariable =
  | "inductance"
  | "turns"
  | "magneticFlux"
  | "current"
  | "area"
  | "length";

export type InductanceInput = {
  mode: InductanceMode;
  solveFor: InductanceVariable;
  inductance?: number;
  turns?: number;
  magneticFlux?: number;
  current?: number;
  area?: number;
  length?: number;
};

export type InductanceDetails = {
  mode: InductanceMode;
  inductance: number;
  turns?: number;
  magneticFlux?: number;
  current?: number;
  area?: number;
  length?: number;
  vacuumPermeability: number;
  solvedVariable: InductanceVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  InductanceVariable,
  string
> = {
  inductance: "Inductance",
  turns: "Number of turns",
  magneticFlux: "Magnetic flux",
  current: "Electric current",
  area: "Cross-sectional area",
  length: "Coil length",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: InductanceVariable,
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

export function calculateInductance({
  mode,
  solveFor,
  inductance,
  turns,
  magneticFlux,
  current,
  area,
  length,
}: InductanceInput): CalculationResult<InductanceDetails> {
  let calculatedInductance = inductance;
  let calculatedTurns = turns;
  let calculatedMagneticFlux =
    magneticFlux;
  let calculatedCurrent = current;
  let calculatedArea = area;
  let calculatedLength = length;
  let formula = "";
  let substitution = "";

  if (mode === "fluxLinkage") {
    switch (solveFor) {
      case "inductance": {
        calculatedTurns =
          requirePositiveFiniteValue(
            turns,
            "turns",
          );

        calculatedMagneticFlux =
          requirePositiveFiniteValue(
            magneticFlux,
            "magneticFlux",
          );

        calculatedCurrent =
          requirePositiveFiniteValue(
            current,
            "current",
          );

        calculatedInductance =
          (
            calculatedTurns *
            calculatedMagneticFlux
          ) /
          calculatedCurrent;

        formula = "L = NΦ ÷ I";
        substitution =
          `L = ${calculatedTurns} × ` +
          `${calculatedMagneticFlux} ÷ ` +
          `${calculatedCurrent}`;

        break;
      }

      case "turns": {
        calculatedInductance =
          requirePositiveFiniteValue(
            inductance,
            "inductance",
          );

        calculatedCurrent =
          requirePositiveFiniteValue(
            current,
            "current",
          );

        calculatedMagneticFlux =
          requirePositiveFiniteValue(
            magneticFlux,
            "magneticFlux",
          );

        calculatedTurns =
          (
            calculatedInductance *
            calculatedCurrent
          ) /
          calculatedMagneticFlux;

        formula = "N = LI ÷ Φ";
        substitution =
          `N = ${calculatedInductance} × ` +
          `${calculatedCurrent} ÷ ` +
          `${calculatedMagneticFlux}`;

        break;
      }

      case "magneticFlux": {
        calculatedInductance =
          requirePositiveFiniteValue(
            inductance,
            "inductance",
          );

        calculatedCurrent =
          requirePositiveFiniteValue(
            current,
            "current",
          );

        calculatedTurns =
          requirePositiveFiniteValue(
            turns,
            "turns",
          );

        calculatedMagneticFlux =
          (
            calculatedInductance *
            calculatedCurrent
          ) /
          calculatedTurns;

        formula = "Φ = LI ÷ N";
        substitution =
          `Φ = ${calculatedInductance} × ` +
          `${calculatedCurrent} ÷ ` +
          `${calculatedTurns}`;

        break;
      }

      case "current": {
        calculatedTurns =
          requirePositiveFiniteValue(
            turns,
            "turns",
          );

        calculatedMagneticFlux =
          requirePositiveFiniteValue(
            magneticFlux,
            "magneticFlux",
          );

        calculatedInductance =
          requirePositiveFiniteValue(
            inductance,
            "inductance",
          );

        calculatedCurrent =
          (
            calculatedTurns *
            calculatedMagneticFlux
          ) /
          calculatedInductance;

        formula = "I = NΦ ÷ L";
        substitution =
          `I = ${calculatedTurns} × ` +
          `${calculatedMagneticFlux} ÷ ` +
          `${calculatedInductance}`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in flux-linkage mode.",
        );
    }
  } else if (mode === "airCoreSolenoid") {
    switch (solveFor) {
      case "inductance": {
        calculatedTurns =
          requirePositiveFiniteValue(
            turns,
            "turns",
          );

        calculatedArea =
          requirePositiveFiniteValue(
            area,
            "area",
          );

        calculatedLength =
          requirePositiveFiniteValue(
            length,
            "length",
          );

        calculatedInductance =
          (
            VACUUM_PERMEABILITY *
            calculatedTurns ** 2 *
            calculatedArea
          ) /
          calculatedLength;

        formula = "L = μ₀N²A ÷ ℓ";
        substitution =
          `L = ${VACUUM_PERMEABILITY} × ` +
          `${calculatedTurns}² × ` +
          `${calculatedArea} ÷ ` +
          `${calculatedLength}`;

        break;
      }

      case "turns": {
        calculatedInductance =
          requirePositiveFiniteValue(
            inductance,
            "inductance",
          );

        calculatedArea =
          requirePositiveFiniteValue(
            area,
            "area",
          );

        calculatedLength =
          requirePositiveFiniteValue(
            length,
            "length",
          );

        calculatedTurns = Math.sqrt(
          (
            calculatedInductance *
            calculatedLength
          ) /
          (
            VACUUM_PERMEABILITY *
            calculatedArea
          ),
        );

        formula = "N = √(Lℓ ÷ μ₀A)";
        substitution =
          `N = √(${calculatedInductance} × ` +
          `${calculatedLength} ÷ ` +
          `(${VACUUM_PERMEABILITY} × ` +
          `${calculatedArea}))`;

        break;
      }

      case "area": {
        calculatedInductance =
          requirePositiveFiniteValue(
            inductance,
            "inductance",
          );

        calculatedLength =
          requirePositiveFiniteValue(
            length,
            "length",
          );

        calculatedTurns =
          requirePositiveFiniteValue(
            turns,
            "turns",
          );

        calculatedArea =
          (
            calculatedInductance *
            calculatedLength
          ) /
          (
            VACUUM_PERMEABILITY *
            calculatedTurns ** 2
          );

        formula = "A = Lℓ ÷ μ₀N²";
        substitution =
          `A = ${calculatedInductance} × ` +
          `${calculatedLength} ÷ ` +
          `(${VACUUM_PERMEABILITY} × ` +
          `${calculatedTurns}²)`;

        break;
      }

      case "length": {
        calculatedTurns =
          requirePositiveFiniteValue(
            turns,
            "turns",
          );

        calculatedArea =
          requirePositiveFiniteValue(
            area,
            "area",
          );

        calculatedInductance =
          requirePositiveFiniteValue(
            inductance,
            "inductance",
          );

        calculatedLength =
          (
            VACUUM_PERMEABILITY *
            calculatedTurns ** 2 *
            calculatedArea
          ) /
          calculatedInductance;

        formula = "ℓ = μ₀N²A ÷ L";
        substitution =
          `ℓ = ${VACUUM_PERMEABILITY} × ` +
          `${calculatedTurns}² × ` +
          `${calculatedArea} ÷ ` +
          `${calculatedInductance}`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in air-core solenoid mode.",
        );
    }
  } else {
    const exhaustiveCheck: never = mode;

    throw new Error(
      `Unsupported inductance mode: ${exhaustiveCheck}`,
    );
  }

  if (
    calculatedInductance === undefined ||
    !Number.isFinite(calculatedInductance) ||
    calculatedInductance <= 0
  ) {
    throw new Error(
      "The inductance calculation could not be completed.",
    );
  }

  const solvedValues: Partial<
    Record<InductanceVariable, number>
  > = {
    inductance: calculatedInductance,
    turns: calculatedTurns,
    magneticFlux:
      calculatedMagneticFlux,
    current: calculatedCurrent,
    area: calculatedArea,
    length: calculatedLength,
  };

  const solvedValue = solvedValues[solveFor];

  if (
    solvedValue === undefined ||
    !Number.isFinite(solvedValue) ||
    solvedValue <= 0
  ) {
    throw new Error(
      "The requested inductance value could not be calculated.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      mode,
      inductance: calculatedInductance,
      turns: calculatedTurns,
      magneticFlux:
        calculatedMagneticFlux,
      current: calculatedCurrent,
      area: calculatedArea,
      length: calculatedLength,
      vacuumPermeability:
        VACUUM_PERMEABILITY,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
