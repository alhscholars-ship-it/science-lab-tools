import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export const COULOMB_CONSTANT =
  8.9875517923e9;

export type CoulombsLawVariable =
  | "force"
  | "chargeOne"
  | "chargeTwo"
  | "distance";

export type CoulombsLawInput = {
  force?: number;
  chargeOne?: number;
  chargeTwo?: number;
  distance?: number;
  solveFor: CoulombsLawVariable;
};

export type CoulombsLawDetails = {
  force: number;
  chargeOne: number;
  chargeTwo: number;
  distance: number;
  coulombConstant: number;
  solvedVariable: CoulombsLawVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  CoulombsLawVariable,
  string
> = {
  force: "Electrostatic force",
  chargeOne: "First charge",
  chargeTwo: "Second charge",
  distance: "Separation distance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: CoulombsLawVariable,
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

export function calculateCoulombsLaw({
  force,
  chargeOne,
  chargeTwo,
  distance,
  solveFor,
}: CoulombsLawInput): CalculationResult<CoulombsLawDetails> {
  let calculatedForce = force;
  let calculatedChargeOne = chargeOne;
  let calculatedChargeTwo = chargeTwo;
  let calculatedDistance = distance;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "force": {
      calculatedChargeOne =
        requirePositiveFiniteValue(
          chargeOne,
          "chargeOne",
        );

      calculatedChargeTwo =
        requirePositiveFiniteValue(
          chargeTwo,
          "chargeTwo",
        );

      calculatedDistance =
        requirePositiveFiniteValue(
          distance,
          "distance",
        );

      calculatedForce =
        (
          COULOMB_CONSTANT *
          calculatedChargeOne *
          calculatedChargeTwo
        ) /
        calculatedDistance ** 2;

      formula = "F = kq₁q₂ ÷ r²";
      substitution =
        `F = ${COULOMB_CONSTANT} × ` +
        `${calculatedChargeOne} × ` +
        `${calculatedChargeTwo} ÷ ` +
        `${calculatedDistance}²`;

      break;
    }

    case "chargeOne": {
      calculatedForce =
        requirePositiveFiniteValue(
          force,
          "force",
        );

      calculatedChargeTwo =
        requirePositiveFiniteValue(
          chargeTwo,
          "chargeTwo",
        );

      calculatedDistance =
        requirePositiveFiniteValue(
          distance,
          "distance",
        );

      calculatedChargeOne =
        (
          calculatedForce *
          calculatedDistance ** 2
        ) /
        (
          COULOMB_CONSTANT *
          calculatedChargeTwo
        );

      formula = "q₁ = Fr² ÷ kq₂";
      substitution =
        `q₁ = ${calculatedForce} × ` +
        `${calculatedDistance}² ÷ ` +
        `(${COULOMB_CONSTANT} × ` +
        `${calculatedChargeTwo})`;

      break;
    }

    case "chargeTwo": {
      calculatedForce =
        requirePositiveFiniteValue(
          force,
          "force",
        );

      calculatedChargeOne =
        requirePositiveFiniteValue(
          chargeOne,
          "chargeOne",
        );

      calculatedDistance =
        requirePositiveFiniteValue(
          distance,
          "distance",
        );

      calculatedChargeTwo =
        (
          calculatedForce *
          calculatedDistance ** 2
        ) /
        (
          COULOMB_CONSTANT *
          calculatedChargeOne
        );

      formula = "q₂ = Fr² ÷ kq₁";
      substitution =
        `q₂ = ${calculatedForce} × ` +
        `${calculatedDistance}² ÷ ` +
        `(${COULOMB_CONSTANT} × ` +
        `${calculatedChargeOne})`;

      break;
    }

    case "distance": {
      calculatedForce =
        requirePositiveFiniteValue(
          force,
          "force",
        );

      calculatedChargeOne =
        requirePositiveFiniteValue(
          chargeOne,
          "chargeOne",
        );

      calculatedChargeTwo =
        requirePositiveFiniteValue(
          chargeTwo,
          "chargeTwo",
        );

      calculatedDistance = Math.sqrt(
        (
          COULOMB_CONSTANT *
          calculatedChargeOne *
          calculatedChargeTwo
        ) /
          calculatedForce,
      );

      formula = "r = √(kq₁q₂ ÷ F)";
      substitution =
        `r = √(${COULOMB_CONSTANT} × ` +
        `${calculatedChargeOne} × ` +
        `${calculatedChargeTwo} ÷ ` +
        `${calculatedForce})`;

      break;
    }

    default: {
      const exhaustiveCheck: never = solveFor;

      throw new Error(
        `Unsupported Coulomb's law variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedForce === undefined ||
    calculatedChargeOne === undefined ||
    calculatedChargeTwo === undefined ||
    calculatedDistance === undefined ||
    !Number.isFinite(calculatedForce) ||
    !Number.isFinite(calculatedChargeOne) ||
    !Number.isFinite(calculatedChargeTwo) ||
    !Number.isFinite(calculatedDistance) ||
    calculatedForce <= 0 ||
    calculatedChargeOne <= 0 ||
    calculatedChargeTwo <= 0 ||
    calculatedDistance <= 0
  ) {
    throw new Error(
      "The Coulomb's law calculation could not be completed.",
    );
  }

  const solvedValue = {
    force: calculatedForce,
    chargeOne: calculatedChargeOne,
    chargeTwo: calculatedChargeTwo,
    distance: calculatedDistance,
  }[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      force: calculatedForce,
      chargeOne: calculatedChargeOne,
      chargeTwo: calculatedChargeTwo,
      distance: calculatedDistance,
      coulombConstant: COULOMB_CONSTANT,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
