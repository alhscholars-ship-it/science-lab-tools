"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRotationalDynamics,
  type RotationalDynamicsDetails,
  type RotationalDynamicsVariable,
} from "@/lib/calculators/rotational-dynamics";
import type { CalculationResult } from "@/types/calculator";

type RotationalDynamicsResult =
  CalculationResult<RotationalDynamicsDetails>;

type RotationalDynamicsField = {
  key: RotationalDynamicsVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly RotationalDynamicsField[] = [
  {
    key: "torque",
    label: "Torque",
    symbol: "τ",
    description:
      "Turning effect acting on the rotating object.",
  },
  {
    key: "momentOfInertia",
    label: "Moment of Inertia",
    symbol: "I",
    description:
      "Resistance to angular acceleration.",
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
  RotationalDynamicsVariable,
  string
> = {
  torque: "Torque",
  momentOfInertia: "Moment of Inertia",
  angularAcceleration: "Angular Acceleration",
};

const variableUnits: Record<
  RotationalDynamicsVariable,
  string
> = {
  torque: "N·m",
  momentOfInertia: "kg·m²",
  angularAcceleration: "rad/s²",
};

const emptyValues: Record<
  RotationalDynamicsVariable,
  string
> = {
  torque: "",
  momentOfInertia: "",
  angularAcceleration: "",
};

const examples = [
  {
    label: "Find torque",
    solveFor: "torque" as const,
    values: {
      torque: "",
      momentOfInertia: "4",
      angularAcceleration: "3",
    },
  },
  {
    label: "Find moment of inertia",
    solveFor: "momentOfInertia" as const,
    values: {
      torque: "12",
      momentOfInertia: "",
      angularAcceleration: "3",
    },
  },
  {
    label: "Find angular acceleration",
    solveFor: "angularAcceleration" as const,
    values: {
      torque: "12",
      momentOfInertia: "4",
      angularAcceleration: "",
    },
  },
] as const;

export function RotationalDynamicsCalculator() {
  const [solveFor, setSolveFor] =
    useState<RotationalDynamicsVariable>(
      "torque",
    );

  const [values, setValues] = useState<
    Record<RotationalDynamicsVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<RotationalDynamicsResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: RotationalDynamicsVariable,
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
    variable: RotationalDynamicsVariable,
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
      typeof calculateRotationalDynamics
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
        calculateRotationalDynamics(input);

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
      RotationalDynamicsVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateRotationalDynamics
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
      calculateRotationalDynamics(input);

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
    setSolveFor("torque");
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
              Solve a rotational dynamics problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="rotational-dynamics-solve-for">
              Calculate which value?
            </label>

            <select
              id="rotational-dynamics-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as RotationalDynamicsVariable,
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
                      field.key !== "torque"
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
                    aria-describedby={`rotational-dynamics-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`rotational-dynamics-${field.key}-help`}
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
          Use newton meters for torque, kilogram square
          meters for moment of inertia, and radians per
          second squared for angular acceleration.
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
                <dt>Torque</dt>
                <dd>
                  {result.details.torque} N·m
                </dd>
              </div>

              <div>
                <dt>Moment of Inertia</dt>
                <dd>
                  {result.details.momentOfInertia} kg·m²
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
            <span aria-hidden="true">τ</span>

            <h2>
              Your rotational dynamics result will
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
