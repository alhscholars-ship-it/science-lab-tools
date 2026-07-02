"use client";

import { useState, type FormEvent } from "react";

import {
  calculateDilution,
  type DilutionDetails,
  type DilutionVariable,
} from "@/lib/calculators/dilution";
import type { CalculationResult } from "@/types/calculator";

type DilutionResult = CalculationResult<DilutionDetails>;

type DilutionField = {
  key: DilutionVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly DilutionField[] = [
  {
    key: "initialConcentration",
    label: "Initial concentration",
    symbol: "M₁",
    description: "Concentration before dilution.",
  },
  {
    key: "initialVolume",
    label: "Initial volume",
    symbol: "V₁",
    description: "Volume of the concentrated solution used.",
  },
  {
    key: "finalConcentration",
    label: "Final concentration",
    symbol: "M₂",
    description: "Concentration after dilution.",
  },
  {
    key: "finalVolume",
    label: "Final volume",
    symbol: "V₂",
    description: "Total volume after dilution.",
  },
];

const variableLabels: Record<DilutionVariable, string> = {
  initialConcentration: "Initial concentration",
  initialVolume: "Initial volume",
  finalConcentration: "Final concentration",
  finalVolume: "Final volume",
};

const variableSymbols: Record<DilutionVariable, string> = {
  initialConcentration: "M₁",
  initialVolume: "V₁",
  finalConcentration: "M₂",
  finalVolume: "V₂",
};

const examples = [
  {
    label: "Find final concentration",
    solveFor: "finalConcentration" as const,
    values: {
      initialConcentration: "2",
      initialVolume: "50",
      finalConcentration: "",
      finalVolume: "200",
    },
  },
  {
    label: "Find final volume",
    solveFor: "finalVolume" as const,
    values: {
      initialConcentration: "1.5",
      initialVolume: "100",
      finalConcentration: "0.5",
      finalVolume: "",
    },
  },
] as const;

const emptyValues: Record<DilutionVariable, string> = {
  initialConcentration: "",
  initialVolume: "",
  finalConcentration: "",
  finalVolume: "",
};

export function DilutionCalculator() {
  const [solveFor, setSolveFor] =
    useState<DilutionVariable>("finalConcentration");
  const [values, setValues] =
    useState<Record<DilutionVariable, string>>(emptyValues);
  const [result, setResult] = useState<DilutionResult | null>(null);
  const [error, setError] = useState("");

  function updateValue(field: DilutionVariable, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setResult(null);
    setError("");
  }

  function changeSolveFor(variable: DilutionVariable) {
    setSolveFor(variable);
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));
    setResult(null);
    setError("");
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const input: Parameters<typeof calculateDilution>[0] = {
      solveFor,
    };

    for (const field of fields) {
      if (field.key === solveFor) {
        continue;
      }

      const rawValue = values[field.key];
      const numericValue = Number(rawValue);

      if (rawValue.trim() === "" || !Number.isFinite(numericValue)) {
        setError(`Enter a valid ${field.label.toLowerCase()}.`);
        return;
      }

      input[field.key] = numericValue;
    }

    try {
      const calculationResult = calculateDilution(input);

      setResult(calculationResult);
      setValues((currentValues) => ({
        ...currentValues,
        [solveFor]: String(calculationResult.value),
      }));
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    const exampleValues: Record<DilutionVariable, string> = {
      ...example.values,
    };

    setSolveFor(example.solveFor);
    setValues(exampleValues);
    setError("");

    const calculationResult = calculateDilution({
      initialConcentration:
        exampleValues.initialConcentration === ""
          ? undefined
          : Number(exampleValues.initialConcentration),
      initialVolume:
        exampleValues.initialVolume === ""
          ? undefined
          : Number(exampleValues.initialVolume),
      finalConcentration:
        exampleValues.finalConcentration === ""
          ? undefined
          : Number(exampleValues.finalConcentration),
      finalVolume:
        exampleValues.finalVolume === ""
          ? undefined
          : Number(exampleValues.finalVolume),
      solveFor: example.solveFor,
    });

    setResult(calculationResult);
    setValues((currentValues) => ({
      ...currentValues,
      [example.solveFor]: String(calculationResult.value),
    }));
  }

  function resetCalculator() {
    setSolveFor("finalConcentration");
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  return (
    <div className="calculator-panel">
      <form className="calculator-form" onSubmit={calculate} noValidate>
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">
              Enter three known values
            </p>
            <h2>Solve a dilution problem</h2>
          </div>

          <span className="calculator-form__status">Free tool</span>
        </div>

        <div className="form-field dilution-solve-field">
          <label htmlFor="solve-for">Calculate which value?</label>
          <select
            id="solve-for"
            value={solveFor}
            onChange={(event) =>
              changeSolveFor(
                event.target.value as DilutionVariable,
              )
            }
          >
            {fields.map((field) => (
              <option key={field.key} value={field.key}>
                {field.label} ({field.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="dilution-fields">
          {fields.map((field) => {
            const isSolvedField = field.key === solveFor;

            return (
              <div className="form-field" key={field.key}>
                <label htmlFor={field.key}>
                  {field.label} ({field.symbol})
                </label>

                <input
                  id={field.key}
                  name={field.key}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  placeholder={
                    isSolvedField
                      ? "Calculated automatically"
                      : "Enter value"
                  }
                  value={values[field.key]}
                  onChange={(event) =>
                    updateValue(field.key, event.target.value)
                  }
                  disabled={isSolvedField}
                  aria-describedby={`${field.key}-help`}
                />

                <p id={`${field.key}-help`}>
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Use the same concentration unit for M₁ and M₂, and the
          same volume unit for V₁ and V₂.
        </p>

        {error ? (
          <div className="calculator-error" role="alert">
            {error}
          </div>
        ) : null}

        <div className="calculator-actions">
          <button className="button button--primary" type="submit">
            Calculate dilution
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
              key={example.label}
              type="button"
              onClick={() => loadExample(example)}
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
              {variableLabels[result.details.solvedVariable]}
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Initial concentration (M₁)</dt>
                <dd>{result.details.initialConcentration}</dd>
              </div>
              <div>
                <dt>Initial volume (V₁)</dt>
                <dd>{result.details.initialVolume}</dd>
              </div>
              <div>
                <dt>Final concentration (M₂)</dt>
                <dd>{result.details.finalConcentration}</dd>
              </div>
              <div>
                <dt>Final volume (V₂)</dt>
                <dd>{result.details.finalVolume}</dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Solved variable</h3>
              <p>
                {variableSymbols[result.details.solvedVariable]} ={" "}
                {result.formattedValue}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">M</span>
            <h2>Your result will appear here</h2>
            <p>
              Select the missing variable and enter the other three
              values.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
