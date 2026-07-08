"use client";

import { useState, type FormEvent } from "react";

import {
  calculateAngularImpulse,
  type AngularImpulseDetails,
  type AngularImpulseVariable,
} from "@/lib/calculators/angular-impulse";
import type { CalculationResult } from "@/types/calculator";

type AngularImpulseResult =
  CalculationResult<AngularImpulseDetails>;

type AngularImpulseField = {
  key: AngularImpulseVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly AngularImpulseField[] = [
  {
    key: "angularImpulse",
    label: "Angular Impulse",
    symbol: "J",
    description:
      "Change in momentum produced by a torque.",
  },
  {
    key: "torque",
    label: "Torque",
    symbol: "τ",
    description:
      "Average torque acting during the time interval.",
  },
  {
    key: "time",
    label: "Time",
    symbol: "Δt",
    description:
      "Positive duration for which the torque acts.",
  },
];

const variableLabels: Record<
  AngularImpulseVariable,
  string
> = {
  angularImpulse: "Angular Impulse",
  torque: "Torque",
  time: "Time",
};

const variableUnits: Record<
  AngularImpulseVariable,
  string
> = {
  angularImpulse: "N·m·s",
  torque: "N·m",
  time: "s",
};

const emptyValues: Record<
  AngularImpulseVariable,
  string
> = {
  angularImpulse: "",
  torque: "",
  time: "",
};

const examples = [
  {
    label: "Find angular impulse",
    solveFor: "angularImpulse" as const,
    values: {
      angularImpulse: "",
      torque: "120",
      time: "0.5",
    },
  },
  {
    label: "Find torque",
    solveFor: "torque" as const,
    values: {
      angularImpulse: "90",
      torque: "",
      time: "0.75",
    },
  },
  {
    label: "Find time interval",
    solveFor: "time" as const,
    values: {
      angularImpulse: "80",
      torque: "200",
      time: "",
    },
  },
] as const;

export function AngularImpulseCalculator() {
  const [solveFor, setSolveFor] =
    useState<AngularImpulseVariable>(
      "angularImpulse",
    );

  const [values, setValues] = useState<
    Record<AngularImpulseVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<AngularImpulseResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: AngularImpulseVariable,
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
    variable: AngularImpulseVariable,
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
      typeof calculateAngularImpulse
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
        calculateAngularImpulse(input);

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
      AngularImpulseVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateAngularImpulse
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
      calculateAngularImpulse(input);

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
    setSolveFor("angularImpulse");
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
              Solve an angular impulse problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="angular impulse-solve-for">
              Calculate which value?
            </label>

            <select
              id="angular impulse-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as AngularImpulseVariable,
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
                      field.key !== "angularImpulse"
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
                    aria-describedby={`angular impulse-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`angular impulse-${field.key}-help`}
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
          Use newton-seconds for angular impulse, newtons for
          torque, and seconds for the time interval.
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
                <dt>Angular Impulse</dt>
                <dd>
                  {result.details.angularImpulse} N·s
                </dd>
              </div>

              <div>
                <dt>Torque</dt>
                <dd>
                  {result.details.torque} N
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
            <span aria-hidden="true">J</span>

            <h2>
              Your angular impulse result will
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
