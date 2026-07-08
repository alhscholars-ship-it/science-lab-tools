"use client";

import { useState, type FormEvent } from "react";

import {
  calculateTangentialVelocity,
  type TangentialVelocityDetails,
  type TangentialVelocityVariable,
} from "@/lib/calculators/tangential-velocity";
import type { CalculationResult } from "@/types/calculator";

type TangentialVelocityResult =
  CalculationResult<TangentialVelocityDetails>;

type TangentialVelocityField = {
  key: TangentialVelocityVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly TangentialVelocityField[] = [
  {
    key: "tangentialVelocity",
    label: "Tangential Velocity",
    symbol: "v",
    description:
      "Linear speed along the circular path.",
  },
  {
    key: "radius",
    label: "Radius",
    symbol: "r",
    description:
      "Distance from the axis of rotation.",
  },
  {
    key: "angularVelocity",
    label: "Angular Velocity",
    symbol: "ω",
    description:
      "Rate of rotation in radians per second.",
  },
];

const variableLabels: Record<
  TangentialVelocityVariable,
  string
> = {
  tangentialVelocity: "Tangential Velocity",
  radius: "Radius",
  angularVelocity: "Angular Velocity",
};

const variableUnits: Record<
  TangentialVelocityVariable,
  string
> = {
  tangentialVelocity: "m/s",
  radius: "m",
  angularVelocity: "rad/s",
};

const emptyValues: Record<
  TangentialVelocityVariable,
  string
> = {
  tangentialVelocity: "",
  radius: "",
  angularVelocity: "",
};

const examples = [
  {
    label: "Find tangential velocity",
    solveFor: "tangentialVelocity" as const,
    values: {
      tangentialVelocity: "",
      radius: "4",
      angularVelocity: "3",
    },
  },
  {
    label: "Find radius",
    solveFor: "radius" as const,
    values: {
      tangentialVelocity: "12",
      radius: "",
      angularVelocity: "3",
    },
  },
  {
    label: "Find angular velocity",
    solveFor: "angularVelocity" as const,
    values: {
      tangentialVelocity: "12",
      radius: "4",
      angularVelocity: "",
    },
  },
] as const;

export function TangentialVelocityCalculator() {
  const [solveFor, setSolveFor] =
    useState<TangentialVelocityVariable>(
      "tangentialVelocity",
    );

  const [values, setValues] = useState<
    Record<TangentialVelocityVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<TangentialVelocityResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: TangentialVelocityVariable,
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
    variable: TangentialVelocityVariable,
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
      typeof calculateTangentialVelocity
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
        calculateTangentialVelocity(input);

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
      TangentialVelocityVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateTangentialVelocity
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
      calculateTangentialVelocity(input);

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
    setSolveFor("tangentialVelocity");
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
              Solve a tangential velocity problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="tangential-velocity-solve-for">
              Calculate which value?
            </label>

            <select
              id="tangential-velocity-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as TangentialVelocityVariable,
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
                      field.key !== "tangentialVelocity"
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
                    aria-describedby={`tangential-velocity-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`tangential-velocity-${field.key}-help`}
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
          Use meters per second for tangential velocity,
          meters for radius, and radians per second for
          angular velocity.
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
                <dt>Tangential Velocity</dt>
                <dd>
                  {result.details.tangentialVelocity} m/s
                </dd>
              </div>

              <div>
                <dt>Radius</dt>
                <dd>
                  {result.details.radius} m
                </dd>
              </div>

              <div>
                <dt>Angular Velocity</dt>
                <dd>
                  {result.details.angularVelocity} rad/s
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
              Your tangential velocity result will
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
