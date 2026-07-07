"use client";

import { useState, type FormEvent } from "react";

import {
  calculateWork,
  type WorkDetails,
  type WorkVariable,
} from "@/lib/calculators/work";
import type { CalculationResult } from "@/types/calculator";

type WorkResult =
  CalculationResult<WorkDetails>;

type WorkField = {
  key: WorkVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly WorkField[] = [
  {
    key: "work",
    label: "Work",
    symbol: "KE",
    description:
      "Energy an object has because of its motion.",
  },
  {
    key: "force",
    label: "Force",
    symbol: "F",
    description:
      "Force acting parallel or opposite to the displacement.",
  },
  {
    key: "distance",
    label: "Distance",
    symbol: "d",
    description:
      "Positive displacement through which the force acts.",
  },
];

const variableLabels: Record<
  WorkVariable,
  string
> = {
  work: "Work",
  force: "Force",
  distance: "Distance",
};

const variableUnits: Record<
  WorkVariable,
  string
> = {
  work: "J",
  force: "N",
  distance: "m",
};

const emptyValues: Record<
  WorkVariable,
  string
> = {
  work: "",
  force: "",
  distance: "",
};

const examples = [
  {
    label: "Find energy",
    solveFor: "work" as const,
    values: {
      work: "",
      force: "20",
      distance: "5",
    },
  },
  {
    label: "Find force",
    solveFor: "force" as const,
    values: {
      work: "150",
      force: "",
      distance: "6",
    },
  },
  {
    label: "Find distance",
    solveFor: "distance" as const,
    values: {
      work: "120",
      force: "24",
      distance: "",
    },
  },
] as const;

export function WorkCalculator() {
  const [solveFor, setSolveFor] =
    useState<WorkVariable>(
      "work",
    );

  const [values, setValues] = useState<
    Record<WorkVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<WorkResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: WorkVariable,
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
    variable: WorkVariable,
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
      typeof calculateWork
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
        calculateWork(input);

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
      WorkVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateWork
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
      calculateWork(input);

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
              Solve a work problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="work-solve-for">
              Calculate which value?
            </label>

            <select
              id="work-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as WorkVariable,
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
                      field.key === "distance"
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
                    aria-describedby={`work-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`work-${field.key}-help`}
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
          Use newtons for force, meters for distance,
          and joules for work.
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
                <dt>Work</dt>
                <dd>
                  {
                    result.details
                      .work
                  }{" "}
                  J
                </dd>
              </div>

              <div>
                <dt>Mass</dt>
                <dd>
                  {result.details.force} N
                </dd>
              </div>

              <div>
                <dt>Speed</dt>
                <dd>
                  {result.details.distance} m
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
              Your work result will
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
