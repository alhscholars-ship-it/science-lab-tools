"use client";

import { useState, type FormEvent } from "react";

import {
  calculateTangentialAcceleration,
  type TangentialAccelerationDetails,
  type TangentialAccelerationVariable,
} from "@/lib/calculators/tangential-acceleration";
import type { CalculationResult } from "@/types/calculator";

type TangentialAccelerationResult =
  CalculationResult<TangentialAccelerationDetails>;

type TangentialAccelerationField = {
  key: TangentialAccelerationVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly TangentialAccelerationField[] = [
  {
    key: "tangentialAcceleration",
    label: "Tangential Acceleration",
    symbol: "aₜ",
    description:
      "Linear acceleration along the circular path.",
  },
  {
    key: "radius",
    label: "Radius",
    symbol: "r",
    description:
      "Distance from the axis of rotation.",
  },
  {
    key: "angularAcceleration",
    label: "Angular Acceleration",
    symbol: "α",
    description:
      "Rate of change of angular velocity.",
  },
];

const variableLabels: Record<
  TangentialAccelerationVariable,
  string
> = {
  tangentialAcceleration: "Tangential Acceleration",
  radius: "Radius",
  angularAcceleration: "Angular Acceleration",
};

const variableUnits: Record<
  TangentialAccelerationVariable,
  string
> = {
  tangentialAcceleration: "m/s²",
  radius: "m",
  angularAcceleration: "rad/s²",
};

const emptyValues: Record<
  TangentialAccelerationVariable,
  string
> = {
  tangentialAcceleration: "",
  radius: "",
  angularAcceleration: "",
};

const examples = [
  {
    label: "Find tangential acceleration",
    solveFor: "tangentialAcceleration" as const,
    values: {
      tangentialAcceleration: "",
      radius: "4",
      angularAcceleration: "3",
    },
  },
  {
    label: "Find radius",
    solveFor: "radius" as const,
    values: {
      tangentialAcceleration: "12",
      radius: "",
      angularAcceleration: "3",
    },
  },
  {
    label: "Find angular acceleration",
    solveFor: "angularAcceleration" as const,
    values: {
      tangentialAcceleration: "12",
      radius: "4",
      angularAcceleration: "",
    },
  },
] as const;

export function TangentialAccelerationCalculator() {
  const [solveFor, setSolveFor] =
    useState<TangentialAccelerationVariable>(
      "tangentialAcceleration",
    );

  const [values, setValues] = useState<
    Record<TangentialAccelerationVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<TangentialAccelerationResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: TangentialAccelerationVariable,
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
    variable: TangentialAccelerationVariable,
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
      typeof calculateTangentialAcceleration
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
        calculateTangentialAcceleration(input);

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
      TangentialAccelerationVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateTangentialAcceleration
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
      calculateTangentialAcceleration(input);

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
    setSolveFor("tangentialAcceleration");
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
              Solve a tangential acceleration problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="tangential-acceleration-solve-for">
              Calculate which value?
            </label>

            <select
              id="tangential-acceleration-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as TangentialAccelerationVariable,
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
                      field.key !== "tangentialAcceleration"
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
                    aria-describedby={`tangential-acceleration-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`tangential-acceleration-${field.key}-help`}
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
          Use meters per second squared for tangential
          acceleration, meters for radius, and radians
          per second squared for angular acceleration.
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
                <dt>Tangential Acceleration</dt>
                <dd>
                  {result.details.tangentialAcceleration} m/s²
                </dd>
              </div>

              <div>
                <dt>Radius</dt>
                <dd>
                  {result.details.radius} m
                </dd>
              </div>

              <div>
                <dt>Angular Acceleration</dt>
                <dd>
                  {result.details.angularAcceleration} rad/s²
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
            <span aria-hidden="true">aₜ</span>

            <h2>
              Your tangential acceleration result will
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
