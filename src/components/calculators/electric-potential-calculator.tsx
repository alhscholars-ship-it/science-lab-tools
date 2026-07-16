"use client";

import { useState, type FormEvent } from "react";

import {
  calculateElectricPotential,
  type ElectricPotentialDetails,
  type ElectricPotentialVariable,
} from "@/lib/calculators/electric-potential";
import type { CalculationResult } from "@/types/calculator";

type ElectricPotentialResult =
  CalculationResult<ElectricPotentialDetails>;

type ElectricPotentialField = {
  key: ElectricPotentialVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly ElectricPotentialField[] = [
  {
    key: "electricPotential",
    label: "Electric potential",
    symbol: "V",
    unit: "V",
    description:
      "Electric potential produced by the source charge at the selected distance.",
  },
  {
    key: "sourceCharge",
    label: "Source charge",
    symbol: "Q",
    unit: "C",
    description:
      "Magnitude of the point charge producing the electric potential.",
  },
  {
    key: "distance",
    label: "Distance",
    symbol: "r",
    unit: "m",
    description:
      "Distance from the centre of the source charge to the observation point.",
  },
];

const variableLabels: Record<
  ElectricPotentialVariable,
  string
> = {
  electricPotential: "Electric potential",
  sourceCharge: "Source charge",
  distance: "Distance",
};

const variableSymbols: Record<
  ElectricPotentialVariable,
  string
> = {
  electricPotential: "V",
  sourceCharge: "Q",
  distance: "r",
};

const variableUnits: Record<
  ElectricPotentialVariable,
  string
> = {
  electricPotential: "V",
  sourceCharge: "C",
  distance: "m",
};

const emptyValues: Record<
  ElectricPotentialVariable,
  string
> = {
  electricPotential: "",
  sourceCharge: "",
  distance: "",
};

const examples = [
  {
    label: "Find potential",
    solveFor: "electricPotential" as const,
    values: {
      electricPotential: "",
      sourceCharge: "0.000002",
      distance: "0.05",
    },
  },
  {
    label: "Find source charge",
    solveFor: "sourceCharge" as const,
    values: {
      electricPotential: "359502.071692",
      sourceCharge: "",
      distance: "0.05",
    },
  },
  {
    label: "Find distance",
    solveFor: "distance" as const,
    values: {
      electricPotential: "359502.071692",
      sourceCharge: "0.000002",
      distance: "",
    },
  },
] as const;

export function ElectricPotentialCalculator() {
  const [solveFor, setSolveFor] =
    useState<ElectricPotentialVariable>(
      "electricPotential",
    );

  const [values, setValues] = useState<
    Record<ElectricPotentialVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<ElectricPotentialResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: ElectricPotentialVariable,
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
    variable: ElectricPotentialVariable,
  ) {
    setSolveFor(variable);

    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    setResult(null);
    setError("");
  }

  function buildInput(
    selectedVariable: ElectricPotentialVariable,
    inputValues: Record<
      ElectricPotentialVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateElectricPotential
    >[0] = {
      solveFor: selectedVariable,
    };

    for (const field of fields) {
      if (field.key === selectedVariable) {
        continue;
      }

      const rawValue =
        inputValues[field.key].trim();

      const numericValue = Number(rawValue);

      if (
        rawValue === "" ||
        !Number.isFinite(numericValue) ||
        numericValue <= 0
      ) {
        throw new Error(
          `${field.label} must be a number greater than zero.`,
        );
      }

      input[field.key] = numericValue;
    }

    return input;
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setResult(null);

    try {
      const calculationResult =
        calculateElectricPotential(
          buildInput(
            solveFor,
            values,
          ),
        );

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
    try {
      const calculationResult =
        calculateElectricPotential(
          buildInput(
            example.solveFor,
            example.values,
          ),
        );

      setSolveFor(example.solveFor);

      setValues({
        ...example.values,
        [example.solveFor]: String(
          calculationResult.value,
        ),
      });

      setResult(calculationResult);
      setError("");
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The example could not be loaded.",
      );
    }
  }

  function resetCalculator() {
    setSolveFor("electricPotential");
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
        <div className="calculator-form__heading">
          <div>
            <p className="calculator-form__label">
              Enter two known electrostatic values
            </p>

            <h2>Calculate electric potential</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="electric-potential-solve-for">
              Calculate which value?
            </label>

            <select
              id="electric-potential-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as ElectricPotentialVariable,
                )
              }
            >
              {fields.map((field) => (
                <option
                  key={field.key}
                  value={field.key}
                >
                  {field.label} ({field.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="density-fields">
          {fields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <div
                className="form-field"
                key={field.key}
              >
                <label
                  htmlFor={`electric-potential-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`electric-potential-${field.key}`}
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
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                    disabled={isSolvedField}
                    aria-describedby={`electric-potential-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p
                  id={`electric-potential-${field.key}-help`}
                >
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Enter positive SI values. Scientific
          notation such as 2e-6 is supported.
        </p>

        {error ? (
          <p
            className="calculator-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="calculator-actions">
          <button
            className="button button--primary"
            type="submit"
          >
            Calculate{" "}
            {variableLabels[
              solveFor
            ].toLowerCase()}
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
          <strong>Try an example:</strong>

          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              onClick={() =>
                loadExample(example)
              }
            >
              {example.label}
            </button>
          ))}
        </div>
      </form>

      <section
        className="calculator-result"
        aria-live="polite"
        aria-label="Electric potential calculation result"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              Calculated{" "}
              {variableLabels[
                result.details.solvedVariable
              ].toLowerCase()}
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              {
                variableUnits[
                  result.details.solvedVariable
                ]
              }
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Electric potential</dt>
                <dd>
                  {result.details.electricPotential} V
                </dd>
              </div>

              <div>
                <dt>Source charge</dt>
                <dd>
                  {result.details.sourceCharge} C
                </dd>
              </div>

              <div>
                <dt>Distance</dt>
                <dd>
                  {result.details.distance} m
                </dd>
              </div>

              <div>
                <dt>Coulomb constant</dt>
                <dd>
                  {result.details.electricConstant}
                  {" N·m²/C²"}
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <p>
                <strong>Formula:</strong>{" "}
                {result.details.formula}
              </p>

              <p>
                <strong>Substitution:</strong>{" "}
                {result.details.substitution}
              </p>

              <p>
                <strong>Result:</strong>{" "}
                {
                  variableSymbols[
                    result.details.solvedVariable
                  ]
                }{" "}
                = {result.formattedValue}{" "}
                {
                  variableUnits[
                    result.details.solvedVariable
                  ]
                }
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <p className="calculator-result__label">
              Result
            </p>

            <h2>
              Your electric-potential result will
              appear here
            </h2>

            <p>
              Select the unknown quantity, enter the
              two known positive values, and press
              calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
