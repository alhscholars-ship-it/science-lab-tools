"use client";

import { useState, type FormEvent } from "react";

import {
  calculateAngularAcceleration,
  type AngularAccelerationDetails,
  type AngularAccelerationVariable,
} from "@/lib/calculators/angular-acceleration";
import type { CalculationResult } from "@/types/calculator";

type AngularAccelerationResult =
  CalculationResult<AngularAccelerationDetails>;

type AngularAccelerationField = {
  key: AngularAccelerationVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly AngularAccelerationField[] = [
  {
    key: "angularAcceleration",
    label: "Angular Acceleration",
    symbol: "α",
    description:
      "Rate of change of angular velocity.",
  },
  {
    key: "angularVelocityChange",
    label: "Angular Velocity Change",
    symbol: "Δω",
    description:
      "Positive change in angular velocity.",
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
  AngularAccelerationVariable,
  string
> = {
  angularAcceleration: "Angular Acceleration",
  angularVelocityChange: "Angular Velocity Change",
  time: "Time",
};

const variableUnits: Record<
  AngularAccelerationVariable,
  string
> = {
  angularAcceleration: "rad/s²",
  angularVelocityChange: "rad/s",
  time: "s",
};

const emptyValues: Record<
  AngularAccelerationVariable,
  string
> = {
  angularAcceleration: "",
  angularVelocityChange: "",
  time: "",
};

const examples = [
  {
    label: "Find angular acceleration",
    solveFor: "angularAcceleration" as const,
    values: {
      angularAcceleration: "",
      angularVelocityChange: "12",
      time: "4",
    },
  },
  {
    label: "Find velocity change",
    solveFor: "angularVelocityChange" as const,
    values: {
      angularAcceleration: "3",
      angularVelocityChange: "",
      time: "4",
    },
  },
  {
    label: "Find time",
    solveFor: "time" as const,
    values: {
      angularAcceleration: "3",
      angularVelocityChange: "12",
      time: "",
    },
  },
] as const;

export function AngularAccelerationCalculator() {
  const [solveFor, setSolveFor] =
    useState<AngularAccelerationVariable>(
      "angularAcceleration",
    );

  const [values, setValues] = useState<
    Record<AngularAccelerationVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<AngularAccelerationResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: AngularAccelerationVariable,
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
    variable: AngularAccelerationVariable,
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
      typeof calculateAngularAcceleration
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
        calculateAngularAcceleration(input);

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
      AngularAccelerationVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateAngularAcceleration
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
      calculateAngularAcceleration(input);

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
    setSolveFor("angularAcceleration");
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
              Solve an angular acceleration problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="angular-acceleration-solve-for">
              Calculate which value?
            </label>

            <select
              id="angular-acceleration-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as AngularAccelerationVariable,
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
                      field.key !== "angularAcceleration"
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
                    aria-describedby={`angular-acceleration-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`angular-acceleration-${field.key}-help`}
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
          Use radians per second squared for angular
          acceleration, radians per second for angular
          velocity change, and seconds for time.
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
                <dt>Angular Acceleration</dt>
                <dd>
                  {result.details.angularAcceleration} rad/s²
                </dd>
              </div>

              <div>
                <dt>Angular Velocity Change</dt>
                <dd>
                  {result.details.angularVelocityChange} rad/s
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
            <span aria-hidden="true">α</span>

            <h2>
              Your angular acceleration result will
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
