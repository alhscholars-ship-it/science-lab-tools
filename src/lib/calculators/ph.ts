import type { CalculationResult } from "@/types/calculator";

import { formatCalculatedNumber } from "./number-format";

export type PhInputType =
  | "ph"
  | "poh"
  | "hydrogen-ion"
  | "hydroxide-ion";

export type PhInput = {
  inputType: PhInputType;
  value: number;
};

export type PhDetails = {
  inputType: PhInputType;
  inputValue: number;
  ph: number;
  poh: number;
  hydrogenIonConcentration: number;
  hydroxideIonConcentration: number;
  classification: "Acidic" | "Neutral" | "Basic";
  formula: string;
};

const WATER_ION_PRODUCT = 1e-14;
const NEUTRAL_PH = 7;
const PH_SUM = 14;

function requireFiniteValue(value: number): void {
  if (!Number.isFinite(value)) {
    throw new Error("The entered value must be a finite number.");
  }
}

function requirePositiveConcentration(value: number): void {
  if (value <= 0) {
    throw new Error("Ion concentration must be greater than zero.");
  }
}

function classifyPh(
  ph: number,
): "Acidic" | "Neutral" | "Basic" {
  const tolerance = 1e-10;

  if (Math.abs(ph - NEUTRAL_PH) <= tolerance) {
    return "Neutral";
  }

  return ph < NEUTRAL_PH ? "Acidic" : "Basic";
}

export function calculatePh({
  inputType,
  value,
}: PhInput): CalculationResult<PhDetails> {
  requireFiniteValue(value);

  let ph: number;
  let poh: number;
  let hydrogenIonConcentration: number;
  let hydroxideIonConcentration: number;
  let formula: string;

  switch (inputType) {
    case "ph":
      ph = value;
      poh = PH_SUM - ph;
      hydrogenIonConcentration = 10 ** -ph;
      hydroxideIonConcentration =
        WATER_ION_PRODUCT / hydrogenIonConcentration;
      formula = "[H⁺] = 10⁻ᵖᴴ";
      break;

    case "poh":
      poh = value;
      ph = PH_SUM - poh;
      hydroxideIonConcentration = 10 ** -poh;
      hydrogenIonConcentration =
        WATER_ION_PRODUCT / hydroxideIonConcentration;
      formula = "pH = 14 − pOH";
      break;

    case "hydrogen-ion":
      requirePositiveConcentration(value);
      hydrogenIonConcentration = value;
      ph = -Math.log10(hydrogenIonConcentration);
      poh = PH_SUM - ph;
      hydroxideIonConcentration =
        WATER_ION_PRODUCT / hydrogenIonConcentration;
      formula = "pH = −log₁₀[H⁺]";
      break;

    case "hydroxide-ion":
      requirePositiveConcentration(value);
      hydroxideIonConcentration = value;
      poh = -Math.log10(hydroxideIonConcentration);
      ph = PH_SUM - poh;
      hydrogenIonConcentration =
        WATER_ION_PRODUCT / hydroxideIonConcentration;
      formula = "pOH = −log₁₀[OH⁻]";
      break;

    default:
      throw new Error("Unsupported pH input type.");
  }

  return {
    value: ph,
    formattedValue: `pH ${formatCalculatedNumber(ph)}`,
    details: {
      inputType,
      inputValue: value,
      ph,
      poh,
      hydrogenIonConcentration,
      hydroxideIonConcentration,
      classification: classifyPh(ph),
      formula,
    },
  };
}
