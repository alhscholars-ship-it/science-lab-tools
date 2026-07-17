"use client";

import { useState, type FormEvent } from "react";

import {
  calculateResonantFrequency,
  type ResonantFrequencyDetails,
  type ResonantFrequencyVariable,
} from "@/lib/calculators/resonant-frequency";
import type { CalculationResult } from "@/types/calculator";

type ResonantFrequencyResult =
  CalculationResult<ResonantFrequencyDetails>;

type FieldDefinition = {
  key: ResonantFrequencyVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly FieldDefinition[] = [
  {
    key: "frequency",
    label: "Resonant frequency",
    symbol: "f₀",
    unit: "Hz",
    description:
      "Natural oscillation frequency of the ideal LC or RLC circuit.",
  },
  {
    key: "inductance",
    label: "Inductance",
    symbol: "L",
    unit: "H",
    description:
      "Circuit inductance measured in henries.",
  },
  {
    key: "capacitance",
    label: "Capacitance",
    symbol: "C",
    unit: "F",
    description:
      "Circuit capacitance measured in farads.",
  },
];

const variableLabels: Record<
  ResonantFrequencyVariable,
  string
> = {
  frequency: "Resonant frequency",
  inductance: "Inductance",
  capacitance: "Capacitance",
};

const variableSymbols: Record<
  ResonantFrequencyVariable,
  string
> = {
  frequency: "f₀",
  inductance: "L",
  capacitance: "C",
};

const variableUnits: Record<
  ResonantFrequencyVariable,
  string
> = {
  frequency: "Hz",
  inductance: "H",
  capacitance: "F",
};

const emptyValues: Record<
  ResonantFrequencyVariable,
  string
> = {
  frequency: "",
  inductance: "",
  capacitance: "",
};

const examples = [
  {
    label: "Find resonant frequency",
    solveFor: "frequency" as const,
    values: {
      frequency: "",
      inductance: "0.01",
      capacitance: "0.000001",
    },
  },
  {
    label: "Find inductance",
    solveFor: "inductance" as const,
    values: {
      frequency: "1591.5494309189535",
      inductance: "",
      capacitance: "0.000001",
    },
  },
  {
    label: "Find capacitance",
    solveFor: "capacitance" as const,
    values: {
      frequency: "1591.5494309189535",
      inductance: "0.01",
      capacitance: "",
    },
  },
] as const;

export function ResonantFrequencyCalculator() {
  const [solveFor, setSolveFor] =
    useState<ResonantFrequencyVariable>(
      "frequency",
    );

  const [values, setValues] = useState<
    Record<ResonantFrequencyVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<ResonantFrequencyResult | null>(
      null,
    );

  const [error, setError] = useState("");

  function changeSolveFor(
    variable: ResonantFrequencyVariable,
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
    field: ResonantFrequencyVariable,
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
    selectedVariable:
      ResonantFrequencyVariable,
    inputValues: Record<
      ResonantFrequencyVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateResonantFrequency
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
        calculateResonantFrequency(
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
          : "The resonant frequency calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateResonantFrequency(
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
    setSolveFor("frequency");
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
              LC and RLC circuit resonance
            </p>

            <h2>
              Resonant frequency calculation
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

        <fieldset className="calculator-fieldset">
          <legend>
            Select the variable to calculate
          </legend>

          <div className="calculator-options">
            {fields.map((field) => (
              <label
                key={field.key}
                className="calculator-option"
              >
                <input
                  type="radio"
                  name="solveFor"
                  value={field.key}
                  checked={
                    solveFor === field.key
                  }
                  onChange={() =>
                    changeSolveFor(field.key)
                  }
                />

                <span>
                  {field.label} ({field.symbol})
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="calculator-fields">
          {fields.map((field) => {
            const isSolvedField =
              solveFor === field.key;

            return (
              <div
                className="calculator-field"
                key={field.key}
              >
                <label htmlFor={field.key}>
                  {field.label} ({field.symbol})
                </label>

                <div className="calculator-input-group">
                  <input
                    id={field.key}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    value={values[field.key]}
                    disabled={isSolvedField}
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
                        : `Enter ${field.label.toLowerCase()}`
                    }
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                  />

                  <span aria-hidden="true">
                    {field.unit}
                  </span>
                </div>

                <p>{field.description}</p>
              </div>
            );
          })}
        </div>

        <div className="calculator-actions">
          <button
            type="submit"
            className="button button-primary"
          >
            Calculate{" "}
            {variableLabels[solveFor]}
          </button>
        </div>

        <div className="calculator-examples">
          <p>Try an example:</p>

          <div>
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

        {error ? (
          <div
            className="calculator-error"
            role="alert"
          >
            <strong>
              Calculation error
            </strong>

            <p>{error}</p>
          </div>
        ) : null}
      </form>

      <aside
        className="calculator-result"
        aria-live="polite"
      >
        <div>
          <p className="calculator-result__label">
            Result
          </p>

          <h2>
            {variableLabels[solveFor]}
          </h2>
        </div>

        {result ? (
          <>
            <div className="calculator-result__value">
              <span>
                {
                  variableSymbols[
                    result.details
                      .solvedVariable
                  ]
                }
              </span>

              <strong>
                {result.formattedValue}
              </strong>

              <span>
                {
                  variableUnits[
                    result.details
                      .solvedVariable
                  ]
                }
              </span>
            </div>

            <dl className="calculator-result__details">
              <div>
                <dt>Formula</dt>
                <dd>
                  {result.details.formula}
                </dd>
              </div>

              <div>
                <dt>Substitution</dt>
                <dd>
                  {
                    result.details
                      .substitution
                  }
                </dd>
              </div>

              <div>
                <dt>Angular frequency</dt>
                <dd>
                  {result.details
                    .angularFrequency
                    .toLocaleString(
                      undefined,
                      {
                        maximumSignificantDigits:
                          8,
                      },
                    )}{" "}
                  rad/s
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <div className="calculator-result__empty">
            <p>
              Enter two known values and select
              the variable you want to calculate.
            </p>

            <div className="formula-card">
              <p>
                Resonant frequency
                <span>
                  f₀ = 1 ÷ (2π√LC)
                </span>
              </p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
