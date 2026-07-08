"use client";

import { useState, type FormEvent } from "react";

import {
  calculateCircularVelocity,
  type CircularVelocityDetails,
  type CircularVelocityVariable,
} from "@/lib/calculators/circular-velocity";
import type { CalculationResult } from "@/types/calculator";

type CircularVelocityResult =
  CalculationResult<CircularVelocityDetails>;

type CircularVelocityField = {
  key: CircularVelocityVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly CircularVelocityField[] = [
  {
    key: "velocity",
    label: "Circular Velocity",
    symbol: "v",
    description:
      "Tangential speed of the object in circular motion.",
  },
  {
    key: "radius",
    label: "Radius",
    symbol: "r",
    description:
      "Positive radius of the circular path.",
  },
  {
    key: "period",
    label: "Period",
    symbol: "T",
    description:
      "Positive time required for one complete revolution.",
  },
];

const variableLabels: Record<
  CircularVelocityVariable,
  string
> = {
  velocity: "Circular Velocity",
  radius: "Radius",
  period: "Period",
};

const variableUnits: Record<
  CircularVelocityVariable,
  string
> = {
  velocity: "m/s",
  radius: "m",
  period: "s",
};

const emptyValues: Record<
  CircularVelocityVariable,
  string
> = {
  velocity: "",
  radius: "",
  period: "",
};

const examples = [
  {
    label: "Find velocity",
    solveFor: "velocity" as const,
    values: {
      velocity: "",
      radius: "5",
      period: "10",
    },
  },
  {
    label: "Find radius",
    solveFor: "radius" as const,
    values: {
      velocity: "3.1415926536",
      radius: "",
      period: "10",
    },
  },
  {
    label: "Find period",
    solveFor: "period" as const,
    values: {
      velocity: "3.1415926536",
      radius: "5",
      period: "",
    },
  },
] as const;

export function CircularVelocityCalculator() {
  const [solveFor, setSolveFor] =
    useState<CircularVelocityVariable>(
      "velocity",
    );

  const [values, setValues] = useState<
    Record<CircularVelocityVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<CircularVelocityResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: CircularVelocityVariable,
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
    variable: CircularVelocityVariable,
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
      typeof calculateCircularVelocity
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
        calculateCircularVelocity(input);

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
      CircularVelocityVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateCircularVelocity
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
      calculateCircularVelocity(input);

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
    setSolveFor("velocity");
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

            <h2>
              Solve a circular velocity problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="circular-velocity-solve-for">
              Calculate which value?
            </label>

            <select
              id="circular-velocity-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as CircularVelocityVariable,
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
                  htmlFor={`work-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`work-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.key !== "velocity"
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
                    aria-describedby={`circular-velocity-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`circular-velocity-${field.key}-help`}
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
          Use meters per second for velocity, meters
          for radius, and seconds for the period.
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
                <dt>Circular Velocity</dt>
                <dd>
                  {result.details.velocity} m/s
                </dd>
              </div>

              <div>
                <dt>Radius</dt>
                <dd>
                  {result.details.radius} m
                </dd>
              </div>

              <div>
                <dt>Period</dt>
                <dd>
                  {result.details.period} s
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
            <span aria-hidden="true">v</span>

            <h2>
              Your circular velocity result will
              appear here
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
