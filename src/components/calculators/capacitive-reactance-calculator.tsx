"use client";

import { useState, type FormEvent } from "react";

import {
  calculateCapacitiveReactance,
  type CapacitiveReactanceDetails,
  type CapacitiveReactanceVariable,
} from "@/lib/calculators/capacitive-reactance";
import type { CalculationResult } from "@/types/calculator";

type CapacitiveReactanceResult =
  CalculationResult<CapacitiveReactanceDetails>;

type FieldDefinition = {
  key: CapacitiveReactanceVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly FieldDefinition[] = [
  {
    key: "reactance",
    label: "Capacitive reactance",
    symbol: "Xc",
    unit: "Ω",
    description:
      "Opposition produced by a capacitor in an AC circuit.",
  },
  {
    key: "frequency",
    label: "Frequency",
    symbol: "f",
    unit: "Hz",
    description:
      "Alternating-current frequency measured in hertz.",
  },
  {
    key: "capacitance",
    label: "Capacitance",
    symbol: "C",
    unit: "F",
    description:
      "Capacitor value measured in farads.",
  },
];

const variableLabels: Record<
  CapacitiveReactanceVariable,
  string
> = {
  reactance: "Capacitive reactance",
  frequency: "Frequency",
  capacitance: "Capacitance",
};

const variableSymbols: Record<
  CapacitiveReactanceVariable,
  string
> = {
  reactance: "Xc",
  frequency: "f",
  capacitance: "C",
};

const variableUnits: Record<
  CapacitiveReactanceVariable,
  string
> = {
  reactance: "Ω",
  frequency: "Hz",
  capacitance: "F",
};

const emptyValues: Record<
  CapacitiveReactanceVariable,
  string
> = {
  reactance: "",
  frequency: "",
  capacitance: "",
};

const examples = [
  {
    label: "Find reactance",
    solveFor: "reactance" as const,
    values: {
      reactance: "",
      frequency: "50",
      capacitance: "0.0001",
    },
  },
  {
    label: "Find frequency",
    solveFor: "frequency" as const,
    values: {
      reactance: "31.8309886184",
      frequency: "",
      capacitance: "0.0001",
    },
  },
  {
    label: "Find capacitance",
    solveFor: "capacitance" as const,
    values: {
      reactance: "31.8309886184",
      frequency: "50",
      capacitance: "",
    },
  },
] as const;

export function CapacitiveReactanceCalculator() {
  const [solveFor, setSolveFor] =
    useState<CapacitiveReactanceVariable>(
      "reactance",
    );

  const [values, setValues] = useState<
    Record<CapacitiveReactanceVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<CapacitiveReactanceResult | null>(
      null,
    );

  const [error, setError] = useState("");

  function changeSolveFor(
    variable: CapacitiveReactanceVariable,
  ) {
    setSolveFor(variable);

    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    setResult(null);
    setError("");
  }

  function updateValue(
    field: CapacitiveReactanceVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setResult(null);
    setError("");
  }

  function buildInput(
    selectedVariable: CapacitiveReactanceVariable,
    inputValues: Record<
      CapacitiveReactanceVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateCapacitiveReactance
    >[0] = {
      solveFor: selectedVariable,
    };

    for (const field of fields) {
      if (field.key === selectedVariable) {
        continue;
      }

      const rawValue =
        inputValues[field.key].trim();

      if (rawValue === "") {
        continue;
      }

      const numericValue = Number(rawValue);

      if (
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
        calculateCapacitiveReactance(
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
          : "The capacitive reactance calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateCapacitiveReactance(
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
    setSolveFor("reactance");
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
              AC capacitor calculations
            </p>

            <h2>
              Capacitive reactance calculation
            </h2>
          </div>

          <button
            type="button"
            className="button button-secondary"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <div className="formula-card">
          <p>
            Capacitive reactance
            <span>Xc = 1 ÷ (2πfC)</span>
          </p>
        </div>

        <label className="calculator-field">
          <span className="calculator-field__label">
            Solve for
          </span>

          <select
            value={solveFor}
            onChange={(event) =>
              changeSolveFor(
                event.target
                  .value as CapacitiveReactanceVariable,
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
        </label>

        <div className="calculator-input-grid">
          {fields
            .filter(
              (field) =>
                field.key !== solveFor,
            )
            .map((field) => (
              <label
                key={field.key}
                className="calculator-field"
              >
                <span className="calculator-field__label">
                  {field.label}
                </span>

                <span className="calculator-field__input">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    value={values[field.key]}
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                    aria-describedby={`${field.key}-description`}
                  />

                  <span>{field.unit}</span>
                </span>

                <small
                  id={`${field.key}-description`}
                >
                  {field.description}
                </small>
              </label>
            ))}
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
          className="button button-primary"
        >
          Calculate{" "}
          {variableLabels[solveFor]}
        </button>
      </form>

      <div className="calculator-examples">
        <p>
          <strong>Try an example:</strong>
        </p>

        <div className="calculator-example-buttons">
          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              className="button button-secondary"
              onClick={() =>
                loadExample(example)
              }
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <section
        className="calculator-result"
        aria-live="polite"
      >
        <p className="eyebrow">
          Calculation result
        </p>

        {result ? (
          <>
            <h2>
              {
                variableLabels[
                  result.details.solvedVariable
                ]
              }
            </h2>

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
                <dt>Formula</dt>
                <dd>{result.details.formula}</dd>
              </div>

              <div>
                <dt>Substitution</dt>
                <dd>
                  {result.details.substitution}
                </dd>
              </div>

              <div>
                <dt>Angular frequency</dt>
                <dd>
                  {result.details.angularFrequency}{" "}
                  rad/s
                </dd>
              </div>

              <div>
                <dt>Solved variable</dt>
                <dd>
                  {
                    variableSymbols[
                      result.details
                        .solvedVariable
                    ]
                  }
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <h2>Ready to calculate</h2>

            <p>
              Select the unknown and enter the two
              known positive AC circuit values.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
