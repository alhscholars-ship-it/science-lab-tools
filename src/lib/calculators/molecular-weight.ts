import type { CalculationResult } from "@/types/calculator";

import {
  atomicMasses,
  type ElementSymbol,
} from "../chemistry/atomic-masses";
import { formatCalculatedNumber } from "./number-format";

export type MolecularWeightElement = {
  symbol: ElementSymbol;
  count: number;
  atomicMass: number;
  contribution: number;
};

export type MolecularWeightDetails = {
  formula: string;
  normalizedFormula: string;
  molarMass: number;
  elements: MolecularWeightElement[];
  unit: "g/mol";
};

type ElementCounts = Partial<Record<ElementSymbol, number>>;

function isElementSymbol(value: string): value is ElementSymbol {
  return Object.prototype.hasOwnProperty.call(atomicMasses, value);
}

function readNumber(
  formula: string,
  startIndex: number,
): { value: number; nextIndex: number } {
  let index = startIndex;
  let digits = "";

  while (index < formula.length && /\d/.test(formula[index])) {
    digits += formula[index];
    index += 1;
  }

  if (digits === "") {
    return { value: 1, nextIndex: startIndex };
  }

  const value = Number(digits);

  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new Error("Element and group subscripts must be positive integers.");
  }

  return { value, nextIndex: index };
}

function addCounts(
  target: ElementCounts,
  source: ElementCounts,
  multiplier = 1,
): void {
  for (const [symbol, count] of Object.entries(source)) {
    const element = symbol as ElementSymbol;
    target[element] = (target[element] ?? 0) + (count ?? 0) * multiplier;
  }
}

function parseGroup(
  formula: string,
  startIndex = 0,
  stopAtClosingParenthesis = false,
): { counts: ElementCounts; nextIndex: number } {
  const counts: ElementCounts = {};
  let index = startIndex;

  while (index < formula.length) {
    const character = formula[index];

    if (character === ")") {
      if (!stopAtClosingParenthesis) {
        throw new Error("Chemical formula contains an unmatched closing parenthesis.");
      }

      return {
        counts,
        nextIndex: index + 1,
      };
    }

    if (character === "(") {
      const nested = parseGroup(formula, index + 1, true);
      const subscript = readNumber(formula, nested.nextIndex);

      addCounts(counts, nested.counts, subscript.value);
      index = subscript.nextIndex;
      continue;
    }

    if (!/[A-Z]/.test(character)) {
      throw new Error(
        `Unexpected character "${character}" in chemical formula.`,
      );
    }

    let symbol = character;
    index += 1;

    if (index < formula.length && /[a-z]/.test(formula[index])) {
      symbol += formula[index];
      index += 1;
    }

    if (!isElementSymbol(symbol)) {
      throw new Error(`Unknown chemical element symbol: ${symbol}.`);
    }

    const subscript = readNumber(formula, index);
    counts[symbol] = (counts[symbol] ?? 0) + subscript.value;
    index = subscript.nextIndex;
  }

  if (stopAtClosingParenthesis) {
    throw new Error("Chemical formula contains an unmatched opening parenthesis.");
  }

  return {
    counts,
    nextIndex: index,
  };
}

function parseFormulaPart(part: string): ElementCounts {
  const coefficientMatch = part.match(/^(\d+)(.+)$/);
  let coefficient = 1;
  let formula = part;

  if (coefficientMatch) {
    coefficient = Number(coefficientMatch[1]);
    formula = coefficientMatch[2];

    if (!Number.isSafeInteger(coefficient) || coefficient <= 0) {
      throw new Error("Formula coefficients must be positive integers.");
    }
  }

  const parsed = parseGroup(formula);

  if (parsed.nextIndex !== formula.length) {
    throw new Error("Chemical formula could not be fully parsed.");
  }

  const counts: ElementCounts = {};
  addCounts(counts, parsed.counts, coefficient);

  return counts;
}

export function calculateMolecularWeight(
  rawFormula: string,
): CalculationResult<MolecularWeightDetails> {
  if (typeof rawFormula !== "string") {
    throw new Error("Chemical formula must be text.");
  }

  const normalizedFormula = rawFormula
    .trim()
    .replace(/\s+/g, "")
    .replace(/[•∙]/g, "·");

  if (normalizedFormula === "") {
    throw new Error("Chemical formula is required.");
  }

  const parts = normalizedFormula.split("·");

  if (parts.some((part) => part === "")) {
    throw new Error("Hydrate notation contains an empty formula section.");
  }

  const totalCounts: ElementCounts = {};

  for (const part of parts) {
    addCounts(totalCounts, parseFormulaPart(part));
  }

  const elements = Object.entries(totalCounts)
    .map(([symbol, count]) => {
      const elementSymbol = symbol as ElementSymbol;
      const elementCount = count ?? 0;
      const atomicMass = atomicMasses[elementSymbol];

      return {
        symbol: elementSymbol,
        count: elementCount,
        atomicMass,
        contribution: atomicMass * elementCount,
      };
    })
    .sort((a, b) => a.symbol.localeCompare(b.symbol));

  if (elements.length === 0) {
    throw new Error("Chemical formula must contain at least one element.");
  }

  const molarMass = elements.reduce(
    (total, element) => total + element.contribution,
    0,
  );

  if (!Number.isFinite(molarMass) || molarMass <= 0) {
    throw new Error("Molecular weight could not be calculated.");
  }

  return {
    value: molarMass,
    formattedValue: formatCalculatedNumber(molarMass, 6),
    details: {
      formula: rawFormula,
      normalizedFormula,
      molarMass,
      elements,
      unit: "g/mol",
    },
  };
}
