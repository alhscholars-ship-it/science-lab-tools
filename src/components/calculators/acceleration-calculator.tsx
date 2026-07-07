"use client";

import { useState, type FormEvent } from "react";

import {
  calculateAcceleration,
  type AccelerationDetails,
  type AccelerationVariable,
} from "@/lib/calculators/acceleration";
import type { CalculationResult } from "@/types/calculator";

type AccelerationResult =
  CalculationResult<AccelerationDetails>;

type AccelerationField = {
  key: AccelerationVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly AccelerationField[] = [
  {
    key: "acceleration",
    label: "Acceleration",
    symbol: "a",
    description:
      "Change in velocity per unit time.",
  },
  {
    key: "initialVelocity",
    label: "Initial velocity",
    symbol: "u",
    description:
      "Velocity at the start of the interval.",
  },
  {
    key: "finalVelocity",
    label: "Final velocity",
    symbol: "v",
    description:
      "Velocity at the end of the interval.",
  },
  {
    key: "time",
    label: "Time",
    symbol: "t",
    description:
      "Duration over which velocity changes.",
  },
];

const variableLabels: Record<
  AccelerationVariable,
  string
> = {
  acceleration: "Acceleration",
  initialVelocity: "Initial velocity",
  finalVelocity: "Final velocity",
  time: "Time",
};

const variableUnits: Record<
  AccelerationVariable,
  string
> = {
  acceleration: "m/s²",
  initialVelocity: "m/s",
  finalVelocity: "m/s",
  time: "s",
};

const emptyValues: Record<
  AccelerationVariable,
  string
> = {
  acceleration: "",
  initialVelocity: "",
  finalVelocity: "",
  time: "",
};

const examples = [
  {
    label: "Find acceleration",
    solveFor: "acceleration" as const,
    values: {
      acceleration: "",
      initialVelocity: "5",
      finalVelocity: "25",
      time: "4",
    },
  },
  {
    label: "Find final velocity",
    solveFor: "finalVelocity" as const,
    values: {
      acceleration: "2.5",
      initialVelocity: "5",
      finalVelocity: "",
      time: "6",
    },
  },
  {
    label: "Find time",
    solveFor: "time" as const,
    values: {
      acceleration: "4",
      initialVelocity: "2",
      finalVelocity: "18",
      time: "",
    },
  },
] as const;

export function AccelerationCalculator() {
  const [solveFor, setSolveFor] =
    useState<AccelerationVariable>(
      "acceleration",
    );

  const [values, setValues] = useState<
    Record<AccelerationVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<AccelerationResult | null>(null);
  const [error, setError] = useState("");

  function updateValue(
    field: AccelerationVariable,
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
    variable: AccelerationVariable,
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
      typeof calculateAcceleration
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
        calculateAcceleration(input);

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
      AccelerationVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateAcceleration
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
      calculateAcceleration(input);

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
    setSolveFor("acceleration");
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
              Enter three known values
            </p>
            <h2>Solve an acceleration problem</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="acceleration-solve-for">
              Calculate which value?
            </label>

            <select
              id="acceleration-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as AccelerationVariable,
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
                  htmlFor={`acceleration-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`acceleration-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.key === "time"
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
                    aria-describedby={`acceleration-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`acceleration-${field.key}-help`}
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
          Use meters per second for velocity,
          seconds for time, and meters per second
          squared for acceleration.
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
                <dt>Initial velocity</dt>
                <dd>
                  {
                    result.details
                      .initialVelocity
                  }{" "}
                  m/s
                </dd>
              </div>

              <div>
                <dt>Final velocity</dt>
                <dd>
                  {
                    result.details.finalVelocity
                  }{" "}
                  m/s
                </dd>
              </div>

              <div>
                <dt>Velocity change</dt>
                <dd>
                  {
                    result.details
                      .velocityChange
                  }{" "}
                  m/s
                </dd>
              </div>

              <div>
                <dt>Time</dt>
                <dd>
                  {result.details.time} s
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
            <span aria-hidden="true">a</span>
            <h2>
              Your acceleration result will
              appear here
            </h2>
            <p>
              Choose the missing variable and
              enter the other three values.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
