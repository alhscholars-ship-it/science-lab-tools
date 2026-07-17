"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRlcQualityFactor,
  type RlcQualityFactorDetails,
  type RlcQualityFactorVariable,
} from "@/lib/calculators/rlc-quality-factor";
import type { CalculationResult } from "@/types/calculator";

type RlcQualityFactorResult =
  CalculationResult<RlcQualityFactorDetails>;

type FieldDefinition = {
  key: RlcQualityFactorVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly FieldDefinition[] = [
  {
    key: "qualityFactor",
    label: "Quality factor",
    symbol: "Q",
    unit: "",
    description:
      "Dimensionless measure of resonance sharpness and circuit selectivity.",
  },
  {
    key: "resistance",
    label: "Resistance",
    symbol: "R",
    unit: "Ω",
    description:
      "Series resistance that dissipates energy and reduces the quality factor.",
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
  RlcQualityFactorVariable,
  string
> = {
  qualityFactor: "Quality factor",
  resistance: "Resistance",
  inductance: "Inductance",
  capacitance: "Capacitance",
};

const variableSymbols: Record<
  RlcQualityFactorVariable,
  string
> = {
  qualityFactor: "Q",
  resistance: "R",
  inductance: "L",
  capacitance: "C",
};

const variableUnits: Record<
  RlcQualityFactorVariable,
  string
> = {
  qualityFactor: "",
  resistance: "Ω",
  inductance: "H",
  capacitance: "F",
};

const emptyValues: Record<
  RlcQualityFactorVariable,
  string
> = {
  qualityFactor: "",
  resistance: "",
  inductance: "",
  capacitance: "",
};

const examples = [
  {
    label: "Find quality factor",
    solveFor: "qualityFactor" as const,
    values: {
      qualityFactor: "",
      resistance: "10",
      inductance: "0.1",
      capacitance: "0.000001",
    },
    resonantFrequency: "1000",
  },
  {
    label: "Find resistance",
    solveFor: "resistance" as const,
    values: {
      qualityFactor: "31.622776601683793",
      resistance: "",
      inductance: "0.1",
      capacitance: "0.000001",
    },
    resonantFrequency: "1000",
  },
  {
    label: "Find inductance",
    solveFor: "inductance" as const,
    values: {
      qualityFactor: "20",
      resistance: "5",
      inductance: "",
      capacitance: "0.000001",
    },
    resonantFrequency: "2000",
  },
  {
    label: "Find capacitance",
    solveFor: "capacitance" as const,
    values: {
      qualityFactor: "25",
      resistance: "8",
      inductance: "0.04",
      capacitance: "",
    },
    resonantFrequency: "1500",
  },
] as const;

function formatDetail(value: number): string {
  return value.toLocaleString(undefined, {
    maximumSignificantDigits: 8,
  });
}

export function RlcQualityFactorCalculator() {
  const [solveFor, setSolveFor] =
    useState<RlcQualityFactorVariable>(
      "qualityFactor",
    );

  const [values, setValues] = useState<
    Record<RlcQualityFactorVariable, string>
  >(emptyValues);

  const [
    resonantFrequency,
    setResonantFrequency,
  ] = useState("");

  const [result, setResult] =
    useState<RlcQualityFactorResult | null>(
      null,
    );

  const [error, setError] = useState("");

  function changeSolveFor(
    variable: RlcQualityFactorVariable,
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
    field: RlcQualityFactorVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setResult(null);
    setError("");
  }

  function updateFrequency(value: string) {
    setResonantFrequency(value);
    setResult(null);
    setError("");
  }

  function buildInput(
    selectedVariable:
      RlcQualityFactorVariable,
    inputValues: Record<
      RlcQualityFactorVariable,
      string
    >,
    frequencyValue: string,
  ) {
    const input: Parameters<
      typeof calculateRlcQualityFactor
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

    const trimmedFrequency =
      frequencyValue.trim();

    if (trimmedFrequency !== "") {
      const numericFrequency =
        Number(trimmedFrequency);

      if (
        !Number.isFinite(numericFrequency) ||
        numericFrequency <= 0
      ) {
        throw new Error(
          "Resonant frequency must be a number greater than zero.",
        );
      }

      input.resonantFrequency =
        numericFrequency;
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
        calculateRlcQualityFactor(
          buildInput(
            solveFor,
            values,
            resonantFrequency,
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
          : "The RLC quality factor calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateRlcQualityFactor(
          buildInput(
            example.solveFor,
            example.values,
            example.resonantFrequency,
          ),
        );

      setSolveFor(example.solveFor);

      setValues({
        ...example.values,
        [example.solveFor]: String(
          calculationResult.value,
        ),
      });

      setResonantFrequency(
        example.resonantFrequency,
      );

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
    setSolveFor("qualityFactor");
    setValues(emptyValues);
    setResonantFrequency("");
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
              Series RLC resonance
            </p>

            <h2>
              RLC quality factor calculation
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

                  {field.unit ? (
                    <span aria-hidden="true">
                      {field.unit}
                    </span>
                  ) : null}
                </div>

                <p>{field.description}</p>
              </div>
            );
          })}

          <div className="calculator-field">
            <label htmlFor="resonantFrequency">
              Resonant frequency (f₀)
            </label>

            <div className="calculator-input-group">
              <input
                id="resonantFrequency"
                name="resonantFrequency"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={resonantFrequency}
                placeholder="Optional for bandwidth"
                onChange={(event) =>
                  updateFrequency(
                    event.target.value,
                  )
                }
              />

              <span aria-hidden="true">
                Hz
              </span>
            </div>

            <p>
              Optional value used to calculate
              bandwidth from BW = f₀ ÷ Q.
            </p>
          </div>
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

              {variableUnits[
                result.details.solvedVariable
              ] ? (
                <span>
                  {
                    variableUnits[
                      result.details
                        .solvedVariable
                    ]
                  }
                </span>
              ) : null}
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
                <dt>Damping ratio</dt>
                <dd>
                  {formatDetail(
                    result.details
                      .dampingRatio,
                  )}
                </dd>
              </div>

              {result.details.bandwidth !==
              undefined ? (
                <div>
                  <dt>Bandwidth</dt>
                  <dd>
                    {formatDetail(
                      result.details
                        .bandwidth,
                    )}{" "}
                    Hz
                  </dd>
                </div>
              ) : null}

              {result.details
                .resonantFrequency !==
              undefined ? (
                <div>
                  <dt>Resonant frequency</dt>
                  <dd>
                    {formatDetail(
                      result.details
                        .resonantFrequency,
                    )}{" "}
                    Hz
                  </dd>
                </div>
              ) : null}
            </dl>
          </>
        ) : (
          <div className="calculator-result__empty">
            <p>
              Enter three known circuit values
              and select the variable you want
              to calculate.
            </p>

            <div className="formula-card">
              <p>
                Series RLC quality factor
                <span>
                  Q = √(L ÷ C) ÷ R
                </span>
              </p>

              <p>
                Bandwidth
                <span>
                  BW = f₀ ÷ Q
                </span>
              </p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
