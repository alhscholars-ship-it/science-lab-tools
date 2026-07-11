"use client";

import { useState, type FormEvent } from "react";

import {
  calculateMolecularWeight,
  type MolecularWeightDetails,
} from "@/lib/calculators/molecular-weight";
import type { CalculationResult } from "@/types/calculator";

type MolecularWeightResult =
  CalculationResult<MolecularWeightDetails>;

const examples = [
  {
    label: "Water",
    formula: "H2O",
  },
  {
    label: "Glucose",
    formula: "C6H12O6",
  },
  {
    label: "Calcium hydroxide",
    formula: "Ca(OH)2",
  },
  {
    label: "Copper sulfate hydrate",
    formula: "CuSO4·5H2O",
  },
] as const;

function formatDetailNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 6,
  }).format(value);
}

export function MolecularWeightCalculator() {
  const [formula, setFormula] = useState("");
  const [result, setResult] =
    useState<MolecularWeightResult | null>(null);
  const [error, setError] = useState("");

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (formula.trim() === "") {
      setError("Enter a chemical formula.");
      return;
    }

    try {
      setResult(calculateMolecularWeight(formula));
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The molecular weight could not be calculated.",
      );
    }
  }

  function loadExample(exampleFormula: string) {
    setFormula(exampleFormula);
    setError("");

    try {
      setResult(calculateMolecularWeight(exampleFormula));
    } catch {
      setResult(null);
    }
  }

  function resetCalculator() {
    setFormula("");
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-panel">
      <form
        className="calculator-form"
        onSubmit={calculate}
        noValidate
      >
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">
              Enter chemical formula
            </p>
            <h2>Calculate molecular weight</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-fields">
          <div className="form-field">
            <label htmlFor="chemical-formula">
              Chemical formula
            </label>

            <input
              id="chemical-formula"
              name="chemicalFormula"
              type="text"
              inputMode="text"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              placeholder="Example: Ca(OH)2"
              value={formula}
              onChange={(event) =>
                setFormula(event.target.value)
              }
              aria-describedby="chemical-formula-help"
            />

            <p id="chemical-formula-help">
              Supports element symbols, subscripts,
              parentheses, nested groups, and hydrates.
            </p>
          </div>
        </div>

        {error ? (
          <div className="calculator-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button
            className="button button--primary"
            type="submit"
          >
            Calculate molecular weight
          </button>

          <button
            className="button button--secondary"
            type="button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <div className="calculator-examples">
          <span>Try an example:</span>

          {examples.map((example) => (
            <button
              key={example.formula}
              type="button"
              onClick={() =>
                loadExample(example.formula)
              }
            >
              {example.label}
            </button>
          ))}
        </div>
      </form>

      <section
        className={`calculator-result ${
          result ? "calculator-result--complete" : ""
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              Molar mass
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              <span>{result.details.unit}</span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Entered formula</dt>
                <dd>{result.details.formula}</dd>
              </div>

              <div>
                <dt>Parsed formula</dt>
                <dd>{result.details.normalizedFormula}</dd>
              </div>

              <div>
                <dt>Unique elements</dt>
                <dd>{result.details.elements.length}</dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Element breakdown</h3>

              <dl className="calculator-result__details">
                {result.details.elements.map((element) => (
                  <div key={element.symbol}>
                    <dt>
                      {element.symbol} × {element.count}
                    </dt>
                    <dd>
                      {formatDetailNumber(
                        element.contribution,
                      )}{" "}
                      g/mol
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">M</span>

            <h2>Your result will appear here</h2>

            <p>
              Enter a valid chemical formula, then
              calculate its molecular weight.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
