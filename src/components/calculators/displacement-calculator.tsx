"use client";

import { useState, type FormEvent } from "react";

import {
  calculateDisplacement,
  type DisplacementDetails,
  type DisplacementVariable,
} from "@/lib/calculators/displacement";
import type { CalculationResult } from "@/types/calculator";

type DisplacementResult =
  CalculationResult<DisplacementDetails>;

type DisplacementField = {
  key: DisplacementVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly DisplacementField[] = [
  {
    key: "displacement",
    label: "Displacement",
    symbol: "Δx",
    description:
      "Change in position from the initial point to the final point.",
  },
  {
    key: "initialPosition",
    label: "Initial position",
    symbol: "x₁",
    description:
      "Position at the beginning of the motion interval.",
  },
  {
    key: "finalPosition",
    label: "Final position",
    symbol: "x₂",
    description:
      "Position at the end of the motion interval.",
  },
];

const variableLabels: Record<
  DisplacementVariable,
  string
> = {
  displacement: "Displacement",
  initialPosition: "Initial position",
  finalPosition: "Final position",
};

const variableUnits: Record<
  DisplacementVariable,
  string
> = {
  displacement: "m",
  initialPosition: "m",
  finalPosition: "m",
};

const emptyValues: Record<
  DisplacementVariable,
  string
> = {
  displacement: "",
  initialPosition: "",
  finalPosition: "",
};

const examples = [
  {
    label: "Find displacement",
    solveFor: "displacement" as const,
    values: {
      displacement: "",
      initialPosition: "10",
      finalPosition: "35",
    },
  },
  {
    label: "Find initial position",
    solveFor: "initialPosition" as const,
    values: {
      displacement: "20",
      initialPosition: "",
      finalPosition: "50",
    },
  },
  {
    label: "Find final position",
    solveFor: "finalPosition" as const,
    values: {
      displacement: "-15",
      initialPosition: "25",
      finalPosition: "",
    },
  },
] as const;

export function DisplacementCalculator() {
  const [solveFor, setSolveFor] =
    useState<DisplacementVariable>(
      "displacement",
    );

  const [values, setValues] = useState<
    Record<DisplacementVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<DisplacementResult | null>(null);
  const [error, setError] = useState("");

  function updateValue(
    field: DisplacementVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setResult(null);
    setError("");
  }

  function changeSolveFor(
    variable: DisplacementVariable,
  ) {
    setSolveFor(variable);
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));
    setResult(null);
    setError("");
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    const input: Parameters<
      typeof calculateDisplacement
    >[0] = {
      solveFor,
    };

    for (const field of fields) {
      if (field.key === solveFor) {
        continue;
      }

      const rawValue = values[field.key];
      const numericValue = Number(rawValue);

      if (
        rawValue.trim() === "" ||
        !Number.isFinite(numericValue)
      ) {
        setError(
          `Enter a valid ${field.label.toLowerCase()}.`,
        );
        return;
      }

      input[field.key] = numericValue;
    }

    try {
      const calculationResult =
        calculateDisplacement(input);

      setResult(calculationResult);
      setValues((currentValues) => ({
        ...currentValues,
        [solveFor]: String(
          calculationResult.value,
        ),
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
    const exampleValues: Record<
      DisplacementVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateDisplacement
    >[0] = {
      solveFor: example.solveFor,
    };

    for (const field of fields) {
      if (field.key === example.solveFor) {
        continue;
      }

      input[field.key] = Number(
        exampleValues[field.key],
      );
    }

    const calculationResult =
      calculateDisplacement(input);

    setSolveFor(example.solveFor);
    setValues({
      ...exampleValues,
      [example.solveFor]: String(
        calculationResult.value,
      ),
    });
    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("displacement");
    setValues(emptyValues);
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
        <div className="calculator-form__header">
          <div>
            <p className="eyebrow">
              Motion calculator
            </p>

            <h2>Displacement calculator</h2>

            <p>
              Select the unknown variable, enter the
              remaining values, and calculate the result.
            </p>
          </div>

          <button
            type="button"
            className="calculator-reset-button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <fieldset className="calculator-variable-selector">
          <legend>What do you want to calculate?</legend>

          <div className="calculator-variable-grid">
            {fields.map((field) => (
              <label key={field.key}>
                <input
                  type="radio"
                  name="solveFor"
                  value={field.key}
                  checked={solveFor === field.key}
                  onChange={() =>
                    changeSolveFor(field.key)
                  }
                />

                <span>
                  <strong>{field.label}</strong>
                  <small>{field.symbol}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="calculator-input-grid">
          {fields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <label
                key={field.key}
                className="calculator-field"
              >
                <span className="calculator-field__label">
                  {field.label}
                </span>

                <span className="calculator-field__control">
                  <input
                    type="number"
                    step="any"
                    value={values[field.key]}
                    readOnly={isSolvedField}
                    placeholder={
                      isSolvedField
                        ? "Calculated result"
                        : `Enter ${field.label.toLowerCase()}`
                    }
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                  />

                  <span>{variableUnits[field.key]}</span>
                </span>

                <small>{field.description}</small>
              </label>
            );
          })}
        </div>

        {error ? (
          <p
            className="calculator-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="calculator-submit-button"
        >
          Calculate {variableLabels[solveFor]}
        </button>

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

      <aside
        className={`calculator-result ${
          result ? "calculator-result--complete" : ""
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              {variableLabels[solveFor]}
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              <span>{variableUnits[solveFor]}</span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Displacement</dt>
                <dd>
                  {result.details.displacement} m
                </dd>
              </div>

              <div>
                <dt>Initial position</dt>
                <dd>
                  {result.details.initialPosition} m
                </dd>
              </div>

              <div>
                <dt>Final position</dt>
                <dd>
                  {result.details.finalPosition} m
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>
              <p>{result.details.formula}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">Δx</span>

            <h2>Your result will appear here</h2>

            <p>
              Select the variable to calculate, enter the
              remaining values, then select calculate.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
