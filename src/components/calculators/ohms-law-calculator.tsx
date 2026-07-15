"use client";

import { useState, type FormEvent } from "react";

import {
  calculateOhmsLaw,
  type OhmsLawDetails,
  type OhmsLawVariable,
} from "@/lib/calculators/ohms-law";
import type { CalculationResult } from "@/types/calculator";

type OhmsLawResult =
  CalculationResult<OhmsLawDetails>;

type OhmsLawField = {
  key: OhmsLawVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly OhmsLawField[] = [
  {
    key: "voltage",
    label: "Voltage",
    symbol: "V",
    unit: "V",
    description:
      "Electrical potential difference measured in volts.",
  },
  {
    key: "current",
    label: "Current",
    symbol: "I",
    unit: "A",
    description:
      "Rate of electric charge flow measured in amperes.",
  },
  {
    key: "resistance",
    label: "Resistance",
    symbol: "R",
    unit: "Ω",
    description:
      "Opposition to current flow measured in ohms.",
  },
  {
    key: "power",
    label: "Power",
    symbol: "P",
    unit: "W",
    description:
      "Electrical energy transfer rate measured in watts.",
  },
];

const variableLabels: Record<
  OhmsLawVariable,
  string
> = {
  voltage: "Voltage",
  current: "Current",
  resistance: "Resistance",
  power: "Power",
};

const variableSymbols: Record<
  OhmsLawVariable,
  string
> = {
  voltage: "V",
  current: "I",
  resistance: "R",
  power: "P",
};

const variableUnits: Record<
  OhmsLawVariable,
  string
> = {
  voltage: "V",
  current: "A",
  resistance: "Ω",
  power: "W",
};

const emptyValues: Record<
  OhmsLawVariable,
  string
> = {
  voltage: "",
  current: "",
  resistance: "",
  power: "",
};

const examples = [
  {
    label: "Find voltage",
    solveFor: "voltage" as const,
    values: {
      voltage: "",
      current: "2",
      resistance: "6",
      power: "",
    },
  },
  {
    label: "Find current",
    solveFor: "current" as const,
    values: {
      voltage: "12",
      current: "",
      resistance: "6",
      power: "",
    },
  },
  {
    label: "Find resistance",
    solveFor: "resistance" as const,
    values: {
      voltage: "12",
      current: "2",
      resistance: "",
      power: "",
    },
  },
  {
    label: "Find power",
    solveFor: "power" as const,
    values: {
      voltage: "12",
      current: "2",
      resistance: "",
      power: "",
    },
  },
] as const;

export function OhmsLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<OhmsLawVariable>("voltage");

  const [values, setValues] = useState<
    Record<OhmsLawVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<OhmsLawResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: OhmsLawVariable,
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
    variable: OhmsLawVariable,
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
    selectedVariable: OhmsLawVariable,
    inputValues: Record<
      OhmsLawVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateOhmsLaw
    >[0] = {
      solveFor: selectedVariable,
    };

    let knownValueCount = 0;

    for (const field of fields) {
      if (field.key === selectedVariable) {
        continue;
      }

      const rawValue = inputValues[field.key].trim();

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
      knownValueCount += 1;
    }

    if (knownValueCount < 2) {
      throw new Error(
        "Enter at least two compatible known values.",
      );
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
      const input = buildInput(
        solveFor,
        values,
      );

      const calculationResult =
        calculateOhmsLaw(input);

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
      const exampleValues: Record<
        OhmsLawVariable,
        string
      > = {
        ...example.values,
      };

      const input = buildInput(
        example.solveFor,
        exampleValues,
      );

      const calculationResult =
        calculateOhmsLaw(input);

      setSolveFor(example.solveFor);

      setValues({
        ...exampleValues,
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
    setSolveFor("voltage");
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
              Enter two known electrical values
            </p>

            <h2>Solve an Ohm&apos;s law problem</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="ohms-law-solve-for">
              Calculate which value?
            </label>

            <select
              id="ohms-law-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as OhmsLawVariable,
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
                  htmlFor={`ohms-law-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`ohms-law-${field.key}`}
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
                    aria-describedby={`ohms-law-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p
                  id={`ohms-law-${field.key}-help`}
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
          Enter any compatible pair of positive values.
          Leave unused fields blank.
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
        aria-label="Ohm's law calculation result"
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
                <dt>Voltage</dt>
                <dd>
                  {result.details.voltage} V
                </dd>
              </div>

              <div>
                <dt>Current</dt>
                <dd>
                  {result.details.current} A
                </dd>
              </div>

              <div>
                <dt>Resistance</dt>
                <dd>
                  {result.details.resistance} Ω
                </dd>
              </div>

              <div>
                <dt>Power</dt>
                <dd>
                  {result.details.power} W
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

            <h2>Your electrical result will appear here</h2>

            <p>
              Select the value to calculate, enter two
              compatible known values, and press
              calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
