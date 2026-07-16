"use client";

import { useState, type FormEvent } from "react";

import {
  calculateCapacitorEnergy,
  type CapacitorEnergyDetails,
  type CapacitorEnergyVariable,
} from "@/lib/calculators/capacitor-energy";
import type { CalculationResult } from "@/types/calculator";

type CapacitorEnergyResult =
  CalculationResult<CapacitorEnergyDetails>;

type FieldDefinition = {
  key: CapacitorEnergyVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly FieldDefinition[] = [
  {
    key: "energy",
    label: "Stored energy",
    symbol: "U",
    unit: "J",
    description:
      "Electrical energy stored in the capacitor, measured in joules.",
  },
  {
    key: "capacitance",
    label: "Capacitance",
    symbol: "C",
    unit: "F",
    description:
      "Capacitance of the capacitor, measured in farads.",
  },
  {
    key: "charge",
    label: "Electric charge",
    symbol: "Q",
    unit: "C",
    description:
      "Charge stored on the capacitor plates, measured in coulombs.",
  },
  {
    key: "voltage",
    label: "Voltage",
    symbol: "V",
    unit: "V",
    description:
      "Potential difference across the capacitor plates.",
  },
];

const variableLabels: Record<
  CapacitorEnergyVariable,
  string
> = {
  energy: "Stored energy",
  capacitance: "Capacitance",
  charge: "Electric charge",
  voltage: "Voltage",
};

const variableSymbols: Record<
  CapacitorEnergyVariable,
  string
> = {
  energy: "U",
  capacitance: "C",
  charge: "Q",
  voltage: "V",
};

const variableUnits: Record<
  CapacitorEnergyVariable,
  string
> = {
  energy: "J",
  capacitance: "F",
  charge: "C",
  voltage: "V",
};

const emptyValues: Record<
  CapacitorEnergyVariable,
  string
> = {
  energy: "",
  capacitance: "",
  charge: "",
  voltage: "",
};

const examples = [
  {
    label: "Energy from C and V",
    solveFor: "energy" as const,
    values: {
      energy: "",
      capacitance: "0.000002",
      charge: "",
      voltage: "12",
    },
  },
  {
    label: "Energy from Q and V",
    solveFor: "energy" as const,
    values: {
      energy: "",
      capacitance: "",
      charge: "0.000024",
      voltage: "12",
    },
  },
  {
    label: "Find capacitance",
    solveFor: "capacitance" as const,
    values: {
      energy: "0.000144",
      capacitance: "",
      charge: "",
      voltage: "12",
    },
  },
  {
    label: "Find voltage",
    solveFor: "voltage" as const,
    values: {
      energy: "0.000144",
      capacitance: "0.000002",
      charge: "",
      voltage: "",
    },
  },
] as const;

export function CapacitorEnergyCalculator() {
  const [solveFor, setSolveFor] =
    useState<CapacitorEnergyVariable>("energy");

  const [values, setValues] = useState<
    Record<CapacitorEnergyVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<CapacitorEnergyResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: CapacitorEnergyVariable,
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
    variable: CapacitorEnergyVariable,
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
    selectedVariable: CapacitorEnergyVariable,
    inputValues: Record<
      CapacitorEnergyVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateCapacitorEnergy
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
        calculateCapacitorEnergy(
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
          : "The capacitor energy calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateCapacitorEnergy(
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
    setSolveFor("energy");
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
              Enter a compatible pair of known values
            </p>

            <h2>Capacitor energy calculation</h2>
          </div>

          <button
            type="button"
            className="button button-secondary"
            onClick={resetCalculator}
          >
            Reset
          </button>
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
                  .value as CapacitorEnergyVariable,
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
              Choose the unknown and enter any
              compatible pair of positive capacitor
              values.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
