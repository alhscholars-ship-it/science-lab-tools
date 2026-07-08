"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRotationalWork,
  type RotationalWorkDetails,
  type RotationalWorkVariable,
} from "@/lib/calculators/rotational-work";
import type { CalculationResult } from "@/types/calculator";

type RotationalWorkResult =
  CalculationResult<RotationalWorkDetails>;

type RotationalWorkField = {
  key: RotationalWorkVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly RotationalWorkField[] = [
  {
    key: "work",
    label: "Rotational Work",
    symbol: "W",
    description:
      "Energy transferred through rotational motion.",
  },
  {
    key: "torque",
    label: "Torque",
    symbol: "τ",
    description:
      "Turning effect acting on the rotating object.",
  },
  {
    key: "angularDisplacement",
    label: "Angular Displacement",
    symbol: "θ",
    description:
      "Angle rotated in radians.",
  },
];

const variableLabels: Record<
  RotationalWorkVariable,
  string
> = {
  work: "Rotational Work",
  torque: "Torque",
  angularDisplacement: "Angular Displacement",
};

const variableUnits: Record<
  RotationalWorkVariable,
  string
> = {
  work: "J",
  torque: "N·m",
  angularDisplacement: "rad",
};

const emptyValues: Record<
  RotationalWorkVariable,
  string
> = {
  work: "",
  torque: "",
  angularDisplacement: "",
};

const examples = [
  {
    label: "Find rotational work",
    solveFor: "work" as const,
    values: {
      work: "",
      torque: "8",
      angularDisplacement: "3",
    },
  },
  {
    label: "Find torque",
    solveFor: "torque" as const,
    values: {
      work: "24",
      torque: "",
      angularDisplacement: "3",
    },
  },
  {
    label: "Find angular displacement",
    solveFor: "angularDisplacement" as const,
    values: {
      work: "24",
      torque: "8",
      angularDisplacement: "",
    },
  },
] as const;

export function RotationalWorkCalculator() {
  const [solveFor, setSolveFor] =
    useState<RotationalWorkVariable>(
      "work",
    );

  const [values, setValues] = useState<
    Record<RotationalWorkVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<RotationalWorkResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: RotationalWorkVariable,
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
    variable: RotationalWorkVariable,
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
      typeof calculateRotationalWork
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
        calculateRotationalWork(input);

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
      RotationalWorkVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateRotationalWork
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
      calculateRotationalWork(input);

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
    setSolveFor("work");
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
              Solve a rotational work problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="rotational-work-solve-for">
              Calculate which value?
            </label>

            <select
              id="rotational-work-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as RotationalWorkVariable,
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
                      field.key !== "work"
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
                    aria-describedby={`rotational-work-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`rotational-work-${field.key}-help`}
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
          Use joules for rotational work, newton meters
          for torque, and radians for angular
          displacement.
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
                <dt>Rotational Work</dt>
                <dd>
                  {result.details.work} J
                </dd>
              </div>

              <div>
                <dt>Torque</dt>
                <dd>
                  {result.details.torque} N·m
                </dd>
              </div>

              <div>
                <dt>Angular Displacement</dt>
                <dd>
                  {result.details.angularDisplacement} rad
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
              Your rotational work result will
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
