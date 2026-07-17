"use client";

import { useState, type FormEvent } from "react";

import {
  calculateAcImpedance,
  type AcImpedanceDetails,
  type AcImpedanceVariable,
} from "@/lib/calculators/ac-impedance";
import type { CalculationResult } from "@/types/calculator";

type AcImpedanceResult =
  CalculationResult<AcImpedanceDetails>;

type FieldDefinition = {
  key: AcImpedanceVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly FieldDefinition[] = [
  {
    key: "impedance",
    label: "Impedance",
    symbol: "Z",
    unit: "Ω",
    description:
      "Total opposition to alternating current in the series RLC circuit.",
  },
  {
    key: "resistance",
    label: "Resistance",
    symbol: "R",
    unit: "Ω",
    description:
      "Resistive opposition to current measured in ohms.",
  },
  {
    key: "inductiveReactance",
    label: "Inductive reactance",
    symbol: "Xₗ",
    unit: "Ω",
    description:
      "Opposition produced by the circuit inductance.",
  },
  {
    key: "capacitiveReactance",
    label: "Capacitive reactance",
    symbol: "Xc",
    unit: "Ω",
    description:
      "Opposition produced by the circuit capacitance.",
  },
];

const variableLabels: Record<
  AcImpedanceVariable,
  string
> = {
  impedance: "Impedance",
  resistance: "Resistance",
  inductiveReactance: "Inductive reactance",
  capacitiveReactance: "Capacitive reactance",
};

const variableSymbols: Record<
  AcImpedanceVariable,
  string
> = {
  impedance: "Z",
  resistance: "R",
  inductiveReactance: "Xₗ",
  capacitiveReactance: "Xc",
};

const variableUnits: Record<
  AcImpedanceVariable,
  string
> = {
  impedance: "Ω",
  resistance: "Ω",
  inductiveReactance: "Ω",
  capacitiveReactance: "Ω",
};

const emptyValues: Record<
  AcImpedanceVariable,
  string
> = {
  impedance: "",
  resistance: "",
  inductiveReactance: "",
  capacitiveReactance: "",
};

const examples = [
  {
    label: "Find impedance",
    solveFor: "impedance" as const,
    values: {
      impedance: "",
      resistance: "30",
      inductiveReactance: "50",
      capacitiveReactance: "10",
    },
  },
  {
    label: "Find resistance",
    solveFor: "resistance" as const,
    values: {
      impedance: "50",
      resistance: "",
      inductiveReactance: "50",
      capacitiveReactance: "10",
    },
  },
  {
    label: "Find inductive reactance",
    solveFor: "inductiveReactance" as const,
    values: {
      impedance: "50",
      resistance: "30",
      inductiveReactance: "",
      capacitiveReactance: "10",
    },
  },
  {
    label: "Find capacitive reactance",
    solveFor: "capacitiveReactance" as const,
    values: {
      impedance: "50",
      resistance: "30",
      inductiveReactance: "10",
      capacitiveReactance: "",
    },
  },
] as const;

export function AcImpedanceCalculator() {
  const [solveFor, setSolveFor] =
    useState<AcImpedanceVariable>(
      "impedance",
    );

  const [values, setValues] = useState<
    Record<AcImpedanceVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<AcImpedanceResult | null>(
      null,
    );

  const [error, setError] = useState("");

  function changeSolveFor(
    variable: AcImpedanceVariable,
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
    field: AcImpedanceVariable,
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
    selectedVariable: AcImpedanceVariable,
    inputValues: Record<
      AcImpedanceVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateAcImpedance
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
        calculateAcImpedance(
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
          : "The AC impedance calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateAcImpedance(
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
    setSolveFor("impedance");
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
              Series RLC circuit calculations
            </p>

            <h2>
              AC impedance calculation
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
            Series AC impedance
            <span>
              Z = √(R² + (Xₗ − Xc)²)
            </span>
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
                  .value as AcImpedanceVariable,
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

        {(solveFor === "inductiveReactance" ||
          solveFor ===
            "capacitiveReactance") ? (
          <p className="calculator-form__note">
            The inverse reactance calculation uses
            the branch matching the selected unknown:
            inductive-dominant for Xₗ and
            capacitive-dominant for Xc.
          </p>
        ) : null}

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
                <dt>Net reactance</dt>
                <dd>
                  {
                    result.details
                      .reactanceDifference
                  }{" "}
                  Ω
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
              Select the unknown and enter the three
              known positive series RLC circuit
              values.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
