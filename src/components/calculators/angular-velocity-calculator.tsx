"use client";

import { useState, type FormEvent } from "react";

import {
  calculateAngularVelocity,
  type AngularVelocityDetails,
  type AngularVelocityVariable,
} from "@/lib/calculators/angular-velocity";
import type { CalculationResult } from "@/types/calculator";

type AngularVelocityResult =
  CalculationResult<AngularVelocityDetails>;

type AngularVelocityField = {
  key: AngularVelocityVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly AngularVelocityField[] = [
  {
    key: "angularVelocity",
    label: "Angular Velocity",
    symbol: "ω",
    description:
      "Rate of change of angular displacement.",
  },
  {
    key: "angularDisplacement",
    label: "Angular Displacement",
    symbol: "θ",
    description:
      "Positive angular distance measured in radians.",
  },
  {
    key: "time",
    label: "Time",
    symbol: "t",
    description:
      "Positive elapsed time measured in seconds.",
  },
];

const variableLabels: Record<
  AngularVelocityVariable,
  string
> = {
  angularVelocity: "Angular Velocity",
  angularDisplacement: "Angular Displacement",
  time: "Time",
};

const variableUnits: Record<
  AngularVelocityVariable,
  string
> = {
  angularVelocity: "rad/s",
  angularDisplacement: "rad",
  time: "s",
};

const emptyValues: Record<
  AngularVelocityVariable,
  string
> = {
  angularVelocity: "",
  angularDisplacement: "",
  time: "",
};

const examples = [
  {
    label: "Find angular velocity",
    solveFor: "angularVelocity" as const,
    values: {
      angularVelocity: "",
      angularDisplacement: "12",
      time: "4",
    },
  },
  {
    label: "Find displacement",
    solveFor: "angularDisplacement" as const,
    values: {
      angularVelocity: "3",
      angularDisplacement: "",
      time: "4",
    },
  },
  {
    label: "Find time",
    solveFor: "time" as const,
    values: {
      angularVelocity: "3",
      angularDisplacement: "12",
      time: "",
    },
  },
] as const;

export function AngularVelocityCalculator() {
  const [solveFor, setSolveFor] =
    useState<AngularVelocityVariable>(
      "angularVelocity",
    );

  const [values, setValues] = useState<
    Record<AngularVelocityVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<AngularVelocityResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: AngularVelocityVariable,
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
    variable: AngularVelocityVariable,
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
      typeof calculateAngularVelocity
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
        calculateAngularVelocity(input);

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
      AngularVelocityVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateAngularVelocity
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
      calculateAngularVelocity(input);

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
    setSolveFor("angularVelocity");
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
              Solve an angular velocity problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="angular-velocity-solve-for">
              Calculate which value?
            </label>

            <select
              id="angular-velocity-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as AngularVelocityVariable,
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
                      field.key !== "angularVelocity"
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
                    aria-describedby={`angular-velocity-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`angular-velocity-${field.key}-help`}
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
          Use radians per second for angular velocity,
          radians for angular displacement, and seconds
          for time.
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
                <dt>Angular Velocity</dt>
                <dd>
                  {result.details.angularVelocity} rad/s
                </dd>
              </div>

              <div>
                <dt>Angular Displacement</dt>
                <dd>
                  {result.details.angularDisplacement} rad
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
            <span aria-hidden="true">ω</span>

            <h2>
              Your angular velocity result will
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
