import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export const VACUUM_PERMEABILITY =
  4 * Math.PI * 1e-7;

export type MagneticFieldMode =
  | "movingCharge"
  | "straightConductor";

export type MagneticFieldVariable =
  | "magneticField"
  | "force"
  | "charge"
  | "velocity"
  | "angle"
  | "current"
  | "distance";

export type MagneticFieldInput = {
  mode: MagneticFieldMode;
  solveFor: MagneticFieldVariable;
  magneticField?: number;
  force?: number;
  charge?: number;
  velocity?: number;
  angle?: number;
  current?: number;
  distance?: number;
};

export type MagneticFieldDetails = {
  mode: MagneticFieldMode;
  magneticField: number;
  force?: number;
  charge?: number;
  velocity?: number;
  angle?: number;
  current?: number;
  distance?: number;
  vacuumPermeability: number;
  solvedVariable: MagneticFieldVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  MagneticFieldVariable,
  string
> = {
  magneticField: "Magnetic field strength",
  force: "Magnetic force",
  charge: "Electric charge",
  velocity: "Particle velocity",
  angle: "Angle",
  current: "Electric current",
  distance: "Distance from conductor",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: MagneticFieldVariable,
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

function requireValidAngle(
  value: number | undefined,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value) ||
    value <= 0 ||
    value >= 180
  ) {
    throw new Error(
      "Angle must be greater than 0 degrees and less than 180 degrees.",
    );
  }

  return value;
}

function degreesToRadians(
  degrees: number,
): number {
  return degrees * (Math.PI / 180);
}

export function calculateMagneticField({
  mode,
  solveFor,
  magneticField,
  force,
  charge,
  velocity,
  angle,
  current,
  distance,
}: MagneticFieldInput): CalculationResult<MagneticFieldDetails> {
  let calculatedMagneticField = magneticField;
  let calculatedForce = force;
  let calculatedCharge = charge;
  let calculatedVelocity = velocity;
  let calculatedAngle = angle;
  let calculatedCurrent = current;
  let calculatedDistance = distance;
  let formula = "";
  let substitution = "";

  if (mode === "movingCharge") {
    switch (solveFor) {
      case "magneticField": {
        calculatedForce =
          requirePositiveFiniteValue(
            force,
            "force",
          );

        calculatedCharge =
          requirePositiveFiniteValue(
            charge,
            "charge",
          );

        calculatedVelocity =
          requirePositiveFiniteValue(
            velocity,
            "velocity",
          );

        calculatedAngle =
          requireValidAngle(angle);

        const sineAngle = Math.sin(
          degreesToRadians(calculatedAngle),
        );

        calculatedMagneticField =
          calculatedForce /
          (
            calculatedCharge *
            calculatedVelocity *
            sineAngle
          );

        formula = "B = F ÷ (qv sinθ)";
        substitution =
          `B = ${calculatedForce} ÷ (` +
          `${calculatedCharge} × ` +
          `${calculatedVelocity} × ` +
          `sin ${calculatedAngle}°)`;

        break;
      }

      case "force": {
        calculatedMagneticField =
          requirePositiveFiniteValue(
            magneticField,
            "magneticField",
          );

        calculatedCharge =
          requirePositiveFiniteValue(
            charge,
            "charge",
          );

        calculatedVelocity =
          requirePositiveFiniteValue(
            velocity,
            "velocity",
          );

        calculatedAngle =
          requireValidAngle(angle);

        calculatedForce =
          calculatedMagneticField *
          calculatedCharge *
          calculatedVelocity *
          Math.sin(
            degreesToRadians(calculatedAngle),
          );

        formula = "F = qvB sinθ";
        substitution =
          `F = ${calculatedCharge} × ` +
          `${calculatedVelocity} × ` +
          `${calculatedMagneticField} × ` +
          `sin ${calculatedAngle}°`;

        break;
      }

      case "charge": {
        calculatedForce =
          requirePositiveFiniteValue(
            force,
            "force",
          );

        calculatedVelocity =
          requirePositiveFiniteValue(
            velocity,
            "velocity",
          );

        calculatedMagneticField =
          requirePositiveFiniteValue(
            magneticField,
            "magneticField",
          );

        calculatedAngle =
          requireValidAngle(angle);

        calculatedCharge =
          calculatedForce /
          (
            calculatedVelocity *
            calculatedMagneticField *
            Math.sin(
              degreesToRadians(calculatedAngle),
            )
          );

        formula = "q = F ÷ (vB sinθ)";
        substitution =
          `q = ${calculatedForce} ÷ (` +
          `${calculatedVelocity} × ` +
          `${calculatedMagneticField} × ` +
          `sin ${calculatedAngle}°)`;

        break;
      }

      case "velocity": {
        calculatedForce =
          requirePositiveFiniteValue(
            force,
            "force",
          );

        calculatedCharge =
          requirePositiveFiniteValue(
            charge,
            "charge",
          );

        calculatedMagneticField =
          requirePositiveFiniteValue(
            magneticField,
            "magneticField",
          );

        calculatedAngle =
          requireValidAngle(angle);

        calculatedVelocity =
          calculatedForce /
          (
            calculatedCharge *
            calculatedMagneticField *
            Math.sin(
              degreesToRadians(calculatedAngle),
            )
          );

        formula = "v = F ÷ (qB sinθ)";
        substitution =
          `v = ${calculatedForce} ÷ (` +
          `${calculatedCharge} × ` +
          `${calculatedMagneticField} × ` +
          `sin ${calculatedAngle}°)`;

        break;
      }

      case "angle": {
        calculatedForce =
          requirePositiveFiniteValue(
            force,
            "force",
          );

        calculatedCharge =
          requirePositiveFiniteValue(
            charge,
            "charge",
          );

        calculatedVelocity =
          requirePositiveFiniteValue(
            velocity,
            "velocity",
          );

        calculatedMagneticField =
          requirePositiveFiniteValue(
            magneticField,
            "magneticField",
          );

        const sineRatio =
          calculatedForce /
          (
            calculatedCharge *
            calculatedVelocity *
            calculatedMagneticField
          );

        if (
          !Number.isFinite(sineRatio) ||
          sineRatio <= 0 ||
          sineRatio > 1
        ) {
          throw new Error(
            "The supplied values do not produce a valid angle.",
          );
        }

        calculatedAngle =
          Math.asin(sineRatio) *
          (180 / Math.PI);

        formula = "θ = sin⁻¹(F ÷ qvB)";
        substitution =
          `θ = sin⁻¹(${calculatedForce} ÷ (` +
          `${calculatedCharge} × ` +
          `${calculatedVelocity} × ` +
          `${calculatedMagneticField}))`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in moving-charge mode.",
        );
    }

    if (
      calculatedMagneticField === undefined ||
      calculatedForce === undefined ||
      calculatedCharge === undefined ||
      calculatedVelocity === undefined ||
      calculatedAngle === undefined ||
      !Number.isFinite(calculatedMagneticField) ||
      !Number.isFinite(calculatedForce) ||
      !Number.isFinite(calculatedCharge) ||
      !Number.isFinite(calculatedVelocity) ||
      !Number.isFinite(calculatedAngle) ||
      calculatedMagneticField <= 0 ||
      calculatedForce <= 0 ||
      calculatedCharge <= 0 ||
      calculatedVelocity <= 0 ||
      calculatedAngle <= 0 ||
      calculatedAngle >= 180
    ) {
      throw new Error(
        "The moving-charge magnetic field calculation could not be completed.",
      );
    }
  } else if (
    mode === "straightConductor"
  ) {
    switch (solveFor) {
      case "magneticField": {
        calculatedCurrent =
          requirePositiveFiniteValue(
            current,
            "current",
          );

        calculatedDistance =
          requirePositiveFiniteValue(
            distance,
            "distance",
          );

        calculatedMagneticField =
          (
            VACUUM_PERMEABILITY *
            calculatedCurrent
          ) /
          (
            2 *
            Math.PI *
            calculatedDistance
          );

        formula = "B = μ₀I ÷ (2πr)";
        substitution =
          `B = ${VACUUM_PERMEABILITY} × ` +
          `${calculatedCurrent} ÷ (` +
          `2π × ${calculatedDistance})`;

        break;
      }

      case "current": {
        calculatedMagneticField =
          requirePositiveFiniteValue(
            magneticField,
            "magneticField",
          );

        calculatedDistance =
          requirePositiveFiniteValue(
            distance,
            "distance",
          );

        calculatedCurrent =
          (
            calculatedMagneticField *
            2 *
            Math.PI *
            calculatedDistance
          ) /
          VACUUM_PERMEABILITY;

        formula = "I = 2πrB ÷ μ₀";
        substitution =
          `I = 2π × ${calculatedDistance} × ` +
          `${calculatedMagneticField} ÷ ` +
          `${VACUUM_PERMEABILITY}`;

        break;
      }

      case "distance": {
        calculatedMagneticField =
          requirePositiveFiniteValue(
            magneticField,
            "magneticField",
          );

        calculatedCurrent =
          requirePositiveFiniteValue(
            current,
            "current",
          );

        calculatedDistance =
          (
            VACUUM_PERMEABILITY *
            calculatedCurrent
          ) /
          (
            2 *
            Math.PI *
            calculatedMagneticField
          );

        formula = "r = μ₀I ÷ (2πB)";
        substitution =
          `r = ${VACUUM_PERMEABILITY} × ` +
          `${calculatedCurrent} ÷ (` +
          `2π × ${calculatedMagneticField})`;

        break;
      }

      default:
        throw new Error(
          "The selected variable is not supported in straight-conductor mode.",
        );
    }

    if (
      calculatedMagneticField === undefined ||
      calculatedCurrent === undefined ||
      calculatedDistance === undefined ||
      !Number.isFinite(calculatedMagneticField) ||
      !Number.isFinite(calculatedCurrent) ||
      !Number.isFinite(calculatedDistance) ||
      calculatedMagneticField <= 0 ||
      calculatedCurrent <= 0 ||
      calculatedDistance <= 0
    ) {
      throw new Error(
        "The straight-conductor magnetic field calculation could not be completed.",
      );
    }
  } else {
    const exhaustiveCheck: never = mode;

    throw new Error(
      `Unsupported magnetic field mode: ${exhaustiveCheck}`,
    );
  }

  const solvedValues: Partial<
    Record<MagneticFieldVariable, number>
  > = {
    magneticField: calculatedMagneticField,
    force: calculatedForce,
    charge: calculatedCharge,
    velocity: calculatedVelocity,
    angle: calculatedAngle,
    current: calculatedCurrent,
    distance: calculatedDistance,
  };

  const solvedValue = solvedValues[solveFor];

  if (
    solvedValue === undefined ||
    !Number.isFinite(solvedValue) ||
    solvedValue <= 0
  ) {
    throw new Error(
      "The requested magnetic field value could not be calculated.",
    );
  }

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(solvedValue),
    details: {
      mode,
      magneticField:
        calculatedMagneticField,
      force: calculatedForce,
      charge: calculatedCharge,
      velocity: calculatedVelocity,
      angle: calculatedAngle,
      current: calculatedCurrent,
      distance: calculatedDistance,
      vacuumPermeability:
        VACUUM_PERMEABILITY,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
