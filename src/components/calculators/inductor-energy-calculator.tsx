"use client";

import { useState, type FormEvent } from "react";

import {
  calculateInductorEnergy,
  type InductorEnergyDetails,
  type InductorEnergyVariable,
} from "@/lib/calculators/inductor-energy";
import type { CalculationResult } from "@/types/calculator";

type InductorEnergyResult =
  CalculationResult<InductorEnergyDetails>;

type FieldDefinition = {
  key: InductorEnergyVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly FieldDefinition[] = [
  {
    key: "energy",
    label: "Stored energy",
    symbol: "E",
    unit: "J",
    description:
      "Magnetic energy stored by the inductor, measured in joules.",
  },
  {
    key: "inductance",
    label: "Inductance",
    symbol: "L",
    unit: "H",
    description:
      "Inductance of the coil, measured in henries.",
  },
  {
    key: "current",
    label: "Electric current",
    symbol: "I",
    unit: "A",
    description:
      "Current flowing through the inductor, measured in amperes.",
  },
];

const variableLabels: Record<
  InductorEnergyVariable,
  string
> = {
  energy: "Stored energy",
  inductance: "Inductance",
  current: "Electric current",
};

const variableSymbols: Record<
  InductorEnergyVariable,
  string
> = {
  energy: "E",
  inductance: "L",
  current: "I",
};

const variableUnits: Record<
  InductorEnergyVariable,
  string
> = {
  energy: "J",
  inductance: "H",
  current: "A",
};

const emptyValues: Record<
  InductorEnergyVariable,
  string
> = {
  energy: "",
  inductance: "",
  current: "",
};

const examples = [
  {
    label: "Find energy",
    solveFor: "energy" as const,
    values: {
      energy: "",
      inductance: "0.5",
      current: "4",
    },
  },
  {
    label: "Find inductance",
    solveFor: "inductance" as const,
    values: {
      energy: "4",
      inductance: "",
      current: "4",
    },
  },
  {
    label: "Find current",
    solveFor: "current" as const,
    values: {
      energy: "4",
      inductance: "0.5",
      current: "",
    },
  },
] as const;

export function InductorEnergyCalculator() {
  const [solveFor, setSolveFor] =
    useState<InductorEnergyVariable>("energy");

  const [values, setValues] = useState<
    Record<InductorEnergyVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<InductorEnergyResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: InductorEnergyVariable,
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
    variable: InductorEnergyVariable,
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
    selectedVariable: InductorEnergyVariable,
    inputValues: Record<
      InductorEnergyVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateInductorEnergy
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
        calculateInductorEnergy(
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
          : "The inductor energy calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateInductorEnergy(
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
              Magnetic energy storage
            </p>

            <h2>Inductor energy calculation</h2>
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
                  .value as InductorEnergyVariable,
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
              Select the unknown and enter the two
              known positive values.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
