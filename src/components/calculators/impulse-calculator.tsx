"use client";

import { useState, type FormEvent } from "react";

import {
  calculateImpulse,
  type ImpulseDetails,
  type ImpulseVariable,
} from "@/lib/calculators/impulse";
import type { CalculationResult } from "@/types/calculator";

type ImpulseResult =
  CalculationResult<ImpulseDetails>;

type ImpulseField = {
  key: ImpulseVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly ImpulseField[] = [
  {
    key: "impulse",
    label: "Impulse",
    symbol: "J",
    description:
      "Change in momentum produced by a force.",
  },
  {
    key: "force",
    label: "Force",
    symbol: "F",
    description:
      "Average force acting during the time interval.",
  },
  {
    key: "timeInterval",
    label: "Time Interval",
    symbol: "Δt",
    description:
      "Positive duration for which the force acts.",
  },
];

const variableLabels: Record<
  ImpulseVariable,
  string
> = {
  impulse: "Impulse",
  force: "Force",
  timeInterval: "Time Interval",
};

const variableUnits: Record<
  ImpulseVariable,
  string
> = {
  impulse: "N·s",
  force: "N",
  timeInterval: "s",
};

const emptyValues: Record<
  ImpulseVariable,
  string
> = {
  impulse: "",
  force: "",
  timeInterval: "",
};

const examples = [
  {
    label: "Find impulse",
    solveFor: "impulse" as const,
    values: {
      impulse: "",
      force: "120",
      timeInterval: "0.5",
    },
  },
  {
    label: "Find force",
    solveFor: "force" as const,
    values: {
      impulse: "90",
      force: "",
      timeInterval: "0.75",
    },
  },
  {
    label: "Find time interval",
    solveFor: "timeInterval" as const,
    values: {
      impulse: "80",
      force: "200",
      timeInterval: "",
    },
  },
] as const;

export function ImpulseCalculator() {
  const [solveFor, setSolveFor] =
    useState<ImpulseVariable>(
      "impulse",
    );

  const [values, setValues] = useState<
    Record<ImpulseVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<ImpulseResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: ImpulseVariable,
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
    variable: ImpulseVariable,
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
      typeof calculateImpulse
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
        calculateImpulse(input);

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
      ImpulseVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateImpulse
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
      calculateImpulse(input);

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
    setSolveFor("impulse");
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
              Solve an impulse problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="impulse-solve-for">
              Calculate which value?
            </label>

            <select
              id="impulse-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as ImpulseVariable,
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
                      field.key !== "impulse"
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
                    aria-describedby={`impulse-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`impulse-${field.key}-help`}
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
          Use newton-seconds for impulse, newtons for
          force, and seconds for the time interval.
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
                <dt>Impulse</dt>
                <dd>
                  {result.details.impulse} N·s
                </dd>
              </div>

              <div>
                <dt>Force</dt>
                <dd>
                  {result.details.force} N
                </dd>
              </div>

              <div>
                <dt>Time Interval</dt>
                <dd>
                  {result.details.timeInterval} s
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
              Your impulse result will
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
