import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type RlcPhaseAngleVariable =
  | "phaseAngle"
  | "resistance"
  | "inductiveReactance"
  | "capacitiveReactance";

export type RlcPhaseAngleInput = {
  phaseAngle?: number;
  resistance?: number;
  inductiveReactance?: number;
  capacitiveReactance?: number;
  solveFor: RlcPhaseAngleVariable;
};

export type RlcCircuitBehavior =
  | "inductive"
  | "capacitive"
  | "resonant";

export type RlcPhaseAngleDetails = {
  phaseAngle: number;
  phaseAngleRadians: number;
  resistance: number;
  inductiveReactance: number;
  capacitiveReactance: number;
  netReactance: number;
  impedance: number;
  powerFactor: number;
  circuitBehavior: RlcCircuitBehavior;
  currentRelationship: string;
  solvedVariable: RlcPhaseAngleVariable;
  formula: string;
  substitution: string;
};

const variableLabels: Record<
  RlcPhaseAngleVariable,
  string
> = {
  phaseAngle: "Phase angle",
  resistance: "Resistance",
  inductiveReactance: "Inductive reactance",
  capacitiveReactance: "Capacitive reactance",
};

function requirePositiveFiniteValue(
  value: number | undefined,
  variable: Exclude<
    RlcPhaseAngleVariable,
    "phaseAngle"
  >,
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

function requireValidPhaseAngle(
  value: number | undefined,
): number {
  if (
    value === undefined ||
    !Number.isFinite(value) ||
    value <= -90 ||
    value >= 90
  ) {
    throw new Error(
      "Phase angle must be greater than -90° and less than 90°.",
    );
  }

  return value;
}

function degreesToRadians(
  degrees: number,
): number {
  return degrees * (Math.PI / 180);
}

function radiansToDegrees(
  radians: number,
): number {
  return radians * (180 / Math.PI);
}

function normalizeNearZero(
  value: number,
): number {
  return Math.abs(value) < 1e-12
    ? 0
    : value;
}

export function calculateRlcPhaseAngle({
  phaseAngle,
  resistance,
  inductiveReactance,
  capacitiveReactance,
  solveFor,
}: RlcPhaseAngleInput): CalculationResult<RlcPhaseAngleDetails> {
  let calculatedPhaseAngle = phaseAngle;
  let calculatedResistance = resistance;
  let calculatedInductiveReactance =
    inductiveReactance;
  let calculatedCapacitiveReactance =
    capacitiveReactance;
  let formula = "";
  let substitution = "";

  switch (solveFor) {
    case "phaseAngle": {
      calculatedResistance =
        requirePositiveFiniteValue(
          resistance,
          "resistance",
        );

      calculatedInductiveReactance =
        requirePositiveFiniteValue(
          inductiveReactance,
          "inductiveReactance",
        );

      calculatedCapacitiveReactance =
        requirePositiveFiniteValue(
          capacitiveReactance,
          "capacitiveReactance",
        );

      const netReactance =
        calculatedInductiveReactance -
        calculatedCapacitiveReactance;

      calculatedPhaseAngle =
        radiansToDegrees(
          Math.atan(
            netReactance /
              calculatedResistance,
          ),
        );

      formula =
        "φ = tan⁻¹((Xₗ − Xc) ÷ R)";

      substitution =
        `φ = tan⁻¹((${calculatedInductiveReactance} − ` +
        `${calculatedCapacitiveReactance}) ÷ ` +
        `${calculatedResistance})`;

      break;
    }

    case "resistance": {
      calculatedPhaseAngle =
        requireValidPhaseAngle(phaseAngle);

      calculatedInductiveReactance =
        requirePositiveFiniteValue(
          inductiveReactance,
          "inductiveReactance",
        );

      calculatedCapacitiveReactance =
        requirePositiveFiniteValue(
          capacitiveReactance,
          "capacitiveReactance",
        );

      const netReactance =
        calculatedInductiveReactance -
        calculatedCapacitiveReactance;

      const tangent = Math.tan(
        degreesToRadians(
          calculatedPhaseAngle,
        ),
      );

      if (
        Math.abs(tangent) < 1e-12
      ) {
        throw new Error(
          "Resistance cannot be determined when the phase angle is zero.",
        );
      }

      calculatedResistance =
        netReactance / tangent;

      if (calculatedResistance <= 0) {
        throw new Error(
          "The phase angle sign must match the circuit's net reactance.",
        );
      }

      formula =
        "R = (Xₗ − Xc) ÷ tan(φ)";

      substitution =
        `R = (${calculatedInductiveReactance} − ` +
        `${calculatedCapacitiveReactance}) ÷ ` +
        `tan(${calculatedPhaseAngle}°)`;

      break;
    }

    case "inductiveReactance": {
      calculatedPhaseAngle =
        requireValidPhaseAngle(phaseAngle);

      calculatedResistance =
        requirePositiveFiniteValue(
          resistance,
          "resistance",
        );

      calculatedCapacitiveReactance =
        requirePositiveFiniteValue(
          capacitiveReactance,
          "capacitiveReactance",
        );

      calculatedInductiveReactance =
        calculatedCapacitiveReactance +
        calculatedResistance *
          Math.tan(
            degreesToRadians(
              calculatedPhaseAngle,
            ),
          );

      if (
        calculatedInductiveReactance <= 0
      ) {
        throw new Error(
          "The supplied values produce a non-positive inductive reactance.",
        );
      }

      formula =
        "Xₗ = Xc + R tan(φ)";

      substitution =
        `Xₗ = ${calculatedCapacitiveReactance} + ` +
        `${calculatedResistance} × ` +
        `tan(${calculatedPhaseAngle}°)`;

      break;
    }

    case "capacitiveReactance": {
      calculatedPhaseAngle =
        requireValidPhaseAngle(phaseAngle);

      calculatedResistance =
        requirePositiveFiniteValue(
          resistance,
          "resistance",
        );

      calculatedInductiveReactance =
        requirePositiveFiniteValue(
          inductiveReactance,
          "inductiveReactance",
        );

      calculatedCapacitiveReactance =
        calculatedInductiveReactance -
        calculatedResistance *
          Math.tan(
            degreesToRadians(
              calculatedPhaseAngle,
            ),
          );

      if (
        calculatedCapacitiveReactance <= 0
      ) {
        throw new Error(
          "The supplied values produce a non-positive capacitive reactance.",
        );
      }

      formula =
        "Xc = Xₗ − R tan(φ)";

      substitution =
        `Xc = ${calculatedInductiveReactance} − ` +
        `${calculatedResistance} × ` +
        `tan(${calculatedPhaseAngle}°)`;

      break;
    }

    default: {
      const exhaustiveCheck: never =
        solveFor;

      throw new Error(
        `Unsupported RLC phase angle variable: ${exhaustiveCheck}`,
      );
    }
  }

  if (
    calculatedPhaseAngle === undefined ||
    calculatedResistance === undefined ||
    calculatedInductiveReactance === undefined ||
    calculatedCapacitiveReactance === undefined ||
    !Number.isFinite(calculatedPhaseAngle) ||
    !Number.isFinite(calculatedResistance) ||
    !Number.isFinite(
      calculatedInductiveReactance,
    ) ||
    !Number.isFinite(
      calculatedCapacitiveReactance,
    ) ||
    calculatedPhaseAngle <= -90 ||
    calculatedPhaseAngle >= 90 ||
    calculatedResistance <= 0 ||
    calculatedInductiveReactance <= 0 ||
    calculatedCapacitiveReactance <= 0
  ) {
    throw new Error(
      "The RLC phase angle calculation could not be completed.",
    );
  }

  calculatedPhaseAngle =
    normalizeNearZero(
      calculatedPhaseAngle,
    );

  const phaseAngleRadians =
    degreesToRadians(
      calculatedPhaseAngle,
    );

  const netReactance =
    normalizeNearZero(
      calculatedInductiveReactance -
        calculatedCapacitiveReactance,
    );

  const impedance = Math.sqrt(
    calculatedResistance ** 2 +
      netReactance ** 2,
  );

  const powerFactor =
    calculatedResistance / impedance;

  const circuitBehavior:
    RlcCircuitBehavior =
      netReactance > 0
        ? "inductive"
        : netReactance < 0
          ? "capacitive"
          : "resonant";

  const currentRelationship =
    circuitBehavior === "inductive"
      ? "Current lags voltage."
      : circuitBehavior === "capacitive"
        ? "Current leads voltage."
        : "Current and voltage are in phase.";

  const solvedValues: Record<
    RlcPhaseAngleVariable,
    number
  > = {
    phaseAngle: calculatedPhaseAngle,
    resistance: calculatedResistance,
    inductiveReactance:
      calculatedInductiveReactance,
    capacitiveReactance:
      calculatedCapacitiveReactance,
  };

  const solvedValue =
    solvedValues[solveFor];

  return {
    value: solvedValue,
    formattedValue:
      formatCalculatedNumber(
        solvedValue,
      ),
    details: {
      phaseAngle: calculatedPhaseAngle,
      phaseAngleRadians,
      resistance: calculatedResistance,
      inductiveReactance:
        calculatedInductiveReactance,
      capacitiveReactance:
        calculatedCapacitiveReactance,
      netReactance,
      impedance,
      powerFactor,
      circuitBehavior,
      currentRelationship,
      solvedVariable: solveFor,
      formula,
      substitution,
    },
  };
}
