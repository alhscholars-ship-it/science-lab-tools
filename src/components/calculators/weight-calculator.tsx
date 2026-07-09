"use client";

import { useState, type FormEvent } from "react";

import {
  calculateWeight,
  type WeightDetails,
  type WeightVariable,
} from "@/lib/calculators/weight";
import type { CalculationResult } from "@/types/calculator";

type WeightResult =
  CalculationResult<WeightDetails>;

type WeightField = {
  key: WeightVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly WeightField[] = [
  {
    key: "weight",
    label: "Weight",
    symbol: "W",
    description:
      "Gravitational force acting on the object.",
  },
  {
    key: "mass",
    label: "Mass",
    symbol: "m",
    description:
      "Amount of matter in the object.",
  },
  {
    key: "gravity",
    label: "Gravitational acceleration",
    symbol: "g",
    description:
      "Local gravitational acceleration.",
  },
];

const variableLabels: Record<
  WeightVariable,
  string
> = {
  weight: "Weight",
  mass: "Mass",
  gravity: "Gravitational acceleration",
};

const variableUnits: Record<
  WeightVariable,
  string
> = {
  weight: "N",
  mass: "kg",
  gravity: "m/s²",
};

const emptyValues: Record<
  WeightVariable,
  string
> = {
  weight: "",
  mass: "",
  gravity: "",
};

const examples = [
  {
    label: "Earth weight",
    solveFor: "weight" as const,
    values: {
      weight: "",
      mass: "10",
      gravity: "9.80665",
    },
  },
  {
    label: "Moon weight",
    solveFor: "weight" as const,
    values: {
      weight: "",
      mass: "60",
      gravity: "1.62",
    },
  },
  {
    label: "Find mass",
    solveFor: "mass" as const,
    values: {
      weight: "196.133",
      mass: "",
      gravity: "9.80665",
    },
  },
  {
    label: "Find gravity",
    solveFor: "gravity" as const,
    values: {
      weight: "98.0665",
      mass: "10",
      gravity: "",
    },
  },
] as const;

export function WeightCalculator() {
  const [solveFor, setSolveFor] =
    useState<WeightVariable>("weight");

  const [values, setValues] = useState<
    Record<WeightVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<WeightResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: WeightVariable,
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
    variable: WeightVariable,
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
      typeof calculateWeight
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
        calculateWeight(input);

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
      WeightVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateWeight
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
      calculateWeight(input);

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
    setSolveFor("weight");
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
              Enter two known values
            </p>

            <h2>Solve a weight problem</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="weight-solve-for">
              Calculate which value?
            </label>

            <select
              id="weight-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as WeightVariable,
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
                  htmlFor={`weight-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`weight-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
                        : field.key === "gravity"
                          ? "Example: 9.80665"
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
                    aria-describedby={`weight-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`weight-${field.key}-help`}
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
          Use kilograms for mass, meters per second
          squared for gravity, and newtons for weight.
          Standard Earth gravity is 9.80665 m/s².
        </p>

        {error ? (
          <div
            className="calculator-error"
            role="alert"
          >
            {error}
          </div>
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
          <span>Try an example:</span>

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
        className={`calculator-result ${
          result
            ? "calculator-result--complete"
            : ""
        }`}
        aria-live="polite"
        aria-atomic="true"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              {
                variableLabels[
                  result.details.solvedVariable
                ]
              }
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              <span>
                {
                  variableUnits[
                    result.details
                      .solvedVariable
                  ]
                }
              </span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Weight</dt>
                <dd>
                  {result.details.weight} N
                </dd>
              </div>

              <div>
                <dt>Mass</dt>
                <dd>
                  {result.details.mass} kg
                </dd>
              </div>

              <div>
                <dt>Gravitational acceleration</dt>
                <dd>
                  {result.details.gravity} m/s²
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Formula</h3>
              <p>{result.details.formula}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">W</span>

            <h2>
              Your weight result will appear here
            </h2>

            <p>
              Choose the missing variable and enter
              the other two known values.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
