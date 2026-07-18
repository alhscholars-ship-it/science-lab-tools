import type { CalculationResult } from "@/types/calculator";

export type ResistanceMode = "series" | "parallel";

export interface SeriesParallelResistanceInput {
  resistances: number[];
  mode: ResistanceMode;
}

export interface SeriesParallelResistanceDetails {
  mode: ResistanceMode;
  resistances: number[];
  equivalentResistance: number;
  formula: string;
}

export function calculateSeriesParallelResistance({
  resistances,
  mode,
}: SeriesParallelResistanceInput): CalculationResult<SeriesParallelResistanceDetails> {
  if (resistances.length < 2) {
    throw new Error("Enter at least two resistance values.");
  }

  if (resistances.some((r) => !Number.isFinite(r) || r <= 0)) {
    throw new Error("Resistance values must be greater than zero.");
  }

  const equivalentResistance =
    mode === "series"
      ? resistances.reduce((sum, value) => sum + value, 0)
      : 1 /
        resistances.reduce(
          (sum, value) => sum + 1 / value,
          0,
        );

  return {
    value: equivalentResistance,
    formattedValue: equivalentResistance.toFixed(6),
    details: {
      mode,
      resistances,
      equivalentResistance,
      formula:
        mode === "series"
          ? "Req = R1 + R2 + ..."
          : "1/Req = 1/R1 + 1/R2 + ...",
    },
  };
}
