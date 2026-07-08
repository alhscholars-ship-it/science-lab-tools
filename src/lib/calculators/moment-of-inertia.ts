import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type MomentOfInertiaShape =
  | "pointMass"
  | "solidDisk"
  | "thinHoop"
  | "solidSphere"
  | "thinSphericalShell"
  | "rodCenter"
  | "rodEnd";

export type MomentOfInertiaInput = {
  shape: MomentOfInertiaShape;
  mass: number;
  dimension: number;
};

export type MomentOfInertiaDetails = {
  shape: MomentOfInertiaShape;
  shapeLabel: string;
  mass: number;
  dimension: number;
  dimensionLabel: "Radius" | "Length";
  coefficient: number;
  formula: string;
};

type ShapeConfiguration = {
  label: string;
  dimensionLabel: "Radius" | "Length";
  coefficient: number;
  formula: string;
};

const shapeConfigurations: Record<
  MomentOfInertiaShape,
  ShapeConfiguration
> = {
  pointMass: {
    label: "Point mass",
    dimensionLabel: "Radius",
    coefficient: 1,
    formula: "I = mr²",
  },
  solidDisk: {
    label: "Solid disk or cylinder",
    dimensionLabel: "Radius",
    coefficient: 1 / 2,
    formula: "I = ½mr²",
  },
  thinHoop: {
    label: "Thin hoop or ring",
    dimensionLabel: "Radius",
    coefficient: 1,
    formula: "I = mr²",
  },
  solidSphere: {
    label: "Solid sphere",
    dimensionLabel: "Radius",
    coefficient: 2 / 5,
    formula: "I = ⅖mr²",
  },
  thinSphericalShell: {
    label: "Thin spherical shell",
    dimensionLabel: "Radius",
    coefficient: 2 / 3,
    formula: "I = ⅔mr²",
  },
  rodCenter: {
    label: "Thin rod through center",
    dimensionLabel: "Length",
    coefficient: 1 / 12,
    formula: "I = ¹⁄₁₂mL²",
  },
  rodEnd: {
    label: "Thin rod through end",
    dimensionLabel: "Length",
    coefficient: 1 / 3,
    formula: "I = ⅓mL²",
  },
};

function requirePositiveValue(
  value: number,
  label: string,
): number {
  if (!Number.isFinite(value)) {
    throw new Error(
      `${label} must be a finite number.`,
    );
  }

  if (value <= 0) {
    throw new Error(
      `${label} must be greater than zero.`,
    );
  }

  return value;
}

export function calculateMomentOfInertia({
  shape,
  mass,
  dimension,
}: MomentOfInertiaInput): CalculationResult<MomentOfInertiaDetails> {
  const configuration =
    shapeConfigurations[shape];

  if (!configuration) {
    throw new Error(
      `Unsupported moment of inertia shape: ${shape}`,
    );
  }

  const validMass = requirePositiveValue(
    mass,
    "Mass",
  );

  const validDimension = requirePositiveValue(
    dimension,
    configuration.dimensionLabel,
  );

  const momentOfInertia =
    configuration.coefficient *
    validMass *
    validDimension ** 2;

  if (!Number.isFinite(momentOfInertia)) {
    throw new Error(
      "The moment of inertia calculation could not be completed.",
    );
  }

  return {
    value: momentOfInertia,
    formattedValue:
      formatCalculatedNumber(momentOfInertia),
    details: {
      shape,
      shapeLabel: configuration.label,
      mass: validMass,
      dimension: validDimension,
      dimensionLabel:
        configuration.dimensionLabel,
      coefficient: configuration.coefficient,
      formula: configuration.formula,
    },
  };
}
