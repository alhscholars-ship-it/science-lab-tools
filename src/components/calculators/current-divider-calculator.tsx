"use client";

import { useState, type FormEvent } from "react";

import {
  calculateCurrentDivider,
  type CurrentDividerDetails,
  type CurrentDividerVariable,
} from "@/lib/calculators/current-divider";
import type { CalculationResult } from "@/types/calculator";

type CurrentDividerResult =
  CalculationResult<CurrentDividerDetails>;

type CurrentDividerField = {
  key: CurrentDividerVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly CurrentDividerField[] = [
  {
    key: "branchOneCurrent",
    label: "Branch-one current",
    symbol: "I1",
    unit: "A",
    description:
      "Current flowing through the first parallel branch.",
  },
  {
    key: "totalCurrent",
    label: "Total current",
    symbol: "It",
    unit: "A",
    description:
      "Total current entering the parallel resistor network.",
  },
  {
    key: "branchOneResistance",
    label: "Branch-one resistance",
    symbol: "R1",
    unit: "Ω",
    description:
      "Resistance of the first parallel branch.",
  },
  {
    key: "branchTwoResistance",
    label: "Branch-two resistance",
    symbol: "R2",
    unit: "Ω",
    description:
      "Resistance of the second parallel branch.",
  },
];

const variableLabels: Record<
  CurrentDividerVariable,
  string
> = {
  branchOneCurrent: "Branch-one current",
  totalCurrent: "Total current",
  branchOneResistance: "Branch-one resistance",
  branchTwoResistance: "Branch-two resistance",
};

const variableSymbols: Record<
  CurrentDividerVariable,
  string
> = {
  branchOneCurrent: "I1",
  totalCurrent: "It",
  branchOneResistance: "R1",
  branchTwoResistance: "R2",
};

const variableUnits: Record<
  CurrentDividerVariable,
  string
> = {
  branchOneCurrent: "A",
  totalCurrent: "A",
  branchOneResistance: "Ω",
  branchTwoResistance: "Ω",
};

const emptyValues: Record<
  CurrentDividerVariable,
  string
> = {
  branchOneCurrent: "",
  totalCurrent: "",
  branchOneResistance: "",
  branchTwoResistance: "",
};

const examples = [
  {
    label: "Find branch current",
    solveFor: "branchOneCurrent" as const,
    values: {
      branchOneCurrent: "",
      totalCurrent: "3",
      branchOneResistance: "10",
      branchTwoResistance: "20",
    },
  },
  {
    label: "Find total current",
    solveFor: "totalCurrent" as const,
    values: {
      branchOneCurrent: "2",
      totalCurrent: "",
      branchOneResistance: "10",
      branchTwoResistance: "20",
    },
  },
  {
    label: "Find R1",
    solveFor: "branchOneResistance" as const,
    values: {
      branchOneCurrent: "2",
      totalCurrent: "3",
      branchOneResistance: "",
      branchTwoResistance: "20",
    },
  },
  {
    label: "Find R2",
    solveFor: "branchTwoResistance" as const,
    values: {
      branchOneCurrent: "2",
      totalCurrent: "3",
      branchOneResistance: "10",
      branchTwoResistance: "",
    },
  },
] as const;

export function CurrentDividerCalculator() {
  const [solveFor, setSolveFor] =
    useState<CurrentDividerVariable>(
      "branchOneCurrent",
    );

  const [values, setValues] = useState<
    Record<CurrentDividerVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<CurrentDividerResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: CurrentDividerVariable,
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
    variable: CurrentDividerVariable,
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
    selectedVariable: CurrentDividerVariable,
    inputValues: Record<
      CurrentDividerVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateCurrentDivider
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
        throw new Error(
          `Enter ${field.label.toLowerCase()}.`,
        );
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
      const input = buildInput(
        solveFor,
        values,
      );

      const calculationResult =
        calculateCurrentDivider(input);

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
        CurrentDividerVariable,
        string
      > = {
        ...example.values,
      };

      const input = buildInput(
        example.solveFor,
        exampleValues,
      );

      const calculationResult =
        calculateCurrentDivider(input);

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
    setSolveFor("branchOneCurrent");
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
              Enter three known circuit values
            </p>

            <h2>
              Solve a current divider problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="current-divider-solve-for">
              Calculate which value?
            </label>

            <select
              id="current-divider-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as CurrentDividerVariable,
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
                  htmlFor={`current-divider-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`current-divider-${field.key}`}
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
                    aria-describedby={`current-divider-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p
                  id={`current-divider-${field.key}-help`}
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
          Enter three positive values. Branch-one
          current must remain below total current.
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
        aria-label="Current divider calculation result"
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
                <dt>Total current</dt>
                <dd>
                  {result.details.totalCurrent} A
                </dd>
              </div>

              <div>
                <dt>Branch-one current</dt>
                <dd>
                  {result.details.branchOneCurrent} A
                </dd>
              </div>

              <div>
                <dt>Branch-two current</dt>
                <dd>
                  {result.details.branchTwoCurrent} A
                </dd>
              </div>

              <div>
                <dt>Branch-one resistance</dt>
                <dd>
                  {result.details.branchOneResistance} Ω
                </dd>
              </div>

              <div>
                <dt>Branch-two resistance</dt>
                <dd>
                  {result.details.branchTwoResistance} Ω
                </dd>
              </div>

              <div>
                <dt>Equivalent resistance</dt>
                <dd>
                  {result.details.equivalentResistance} Ω
                </dd>
              </div>

              <div>
                <dt>Circuit voltage</dt>
                <dd>
                  {result.details.circuitVoltage} V
                </dd>
              </div>

              <div>
                <dt>Branch-one current share</dt>
                <dd>
                  {(
                    result.details
                      .branchOneCurrentRatio *
                    100
                  ).toFixed(4)}
                  %
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
              Your current-divider result will
              appear here
            </h2>

            <p>
              Select the value to calculate, enter
              the other three known values, and
              press calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
