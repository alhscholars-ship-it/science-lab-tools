"use client";

import { useState, type FormEvent } from "react";

import {
  calculateMomentum,
  type MomentumDetails,
  type MomentumVariable,
} from "@/lib/calculators/momentum";
import type { CalculationResult } from "@/types/calculator";

type MomentumResult =
  CalculationResult<MomentumDetails>;

type MomentumField = {
  key: MomentumVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly MomentumField[] = [
  {
    key: "momentum",
    label: "Momentum",
    symbol: "p",
    description:
      "Quantity of motion carried by the object.",
  },
  {
    key: "mass",
    label: "Mass",
    symbol: "m",
    description:
      "Amount of matter in the object.",
  },
  {
    key: "velocity",
    label: "Velocity",
    symbol: "v",
    description:
      "Speed and direction of the moving object.",
  },
];

const variableLabels: Record<
  MomentumVariable,
  string
> = {
  momentum: "Momentum",
  mass: "Mass",
  velocity: "Velocity",
};

const variableUnits: Record<
  MomentumVariable,
  string
> = {
  momentum: "kg·m/s",
  mass: "kg",
  velocity: "m/s",
};

const emptyValues: Record<
  MomentumVariable,
  string
> = {
  momentum: "",
  mass: "",
  velocity: "",
};

const examples = [
  {
    label: "Find momentum",
    solveFor: "momentum" as const,
    values: {
      momentum: "",
      mass: "12",
      velocity: "5",
    },
  },
  {
    label: "Find mass",
    solveFor: "mass" as const,
    values: {
      momentum: "72",
      mass: "",
      velocity: "8",
    },
  },
  {
    label: "Find velocity",
    solveFor: "velocity" as const,
    values: {
      momentum: "-45",
      mass: "9",
      velocity: "",
    },
  },
] as const;

export function MomentumCalculator() {
  const [solveFor, setSolveFor] =
    useState<MomentumVariable>("momentum");

  const [values, setValues] = useState<
    Record<MomentumVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<MomentumResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: MomentumVariable,
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
    variable: MomentumVariable,
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
      typeof calculateMomentum
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
        calculateMomentum(input);

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
      MomentumVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateMomentum
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
      calculateMomentum(input);

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
    setSolveFor("momentum");
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

            <h2>Solve a momentum problem</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="momentum-solve-for">
              Calculate which value?
            </label>

            <select
              id="momentum-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as MomentumVariable,
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
                  htmlFor={`momentum-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`momentum-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.key === "mass"
                        ? "0"
                        : undefined
                    }
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
                    aria-describedby={`momentum-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`momentum-${field.key}-help`}
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
          for velocity, and kilogram-meters per second
          for momentum.
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
                <dt>Momentum</dt>
                <dd>
                  {result.details.momentum} kg·m/s
                </dd>
              </div>

              <div>
                <dt>Mass</dt>
                <dd>
                  {result.details.mass} kg
                </dd>
              </div>

              <div>
                <dt>Velocity</dt>
                <dd>
                  {result.details.velocity} m/s
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
            <span aria-hidden="true">p</span>

            <h2>
              Your momentum result will appear here
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
