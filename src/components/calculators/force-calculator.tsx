"use client";

import { useState, type FormEvent } from "react";

import {
  calculateForce,
  type ForceDetails,
  type ForceVariable,
} from "@/lib/calculators/force";
import type { CalculationResult } from "@/types/calculator";

type ForceResult =
  CalculationResult<ForceDetails>;

type ForceField = {
  key: ForceVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly ForceField[] = [
  {
    key: "force",
    label: "Force",
    symbol: "F",
    description:
      "Net force acting on the object.",
  },
  {
    key: "mass",
    label: "Mass",
    symbol: "m",
    description:
      "Amount of matter in the object.",
  },
  {
    key: "acceleration",
    label: "Acceleration",
    symbol: "a",
    description:
      "Change in velocity per unit time.",
  },
];

const variableLabels: Record<
  ForceVariable,
  string
> = {
  force: "Force",
  mass: "Mass",
  acceleration: "Acceleration",
};

const variableUnits: Record<
  ForceVariable,
  string
> = {
  force: "N",
  mass: "kg",
  acceleration: "m/s²",
};

const emptyValues: Record<
  ForceVariable,
  string
> = {
  force: "",
  mass: "",
  acceleration: "",
};

const examples = [
  {
    label: "Find force",
    solveFor: "force" as const,
    values: {
      force: "",
      mass: "10",
      acceleration: "3",
    },
  },
  {
    label: "Find mass",
    solveFor: "mass" as const,
    values: {
      force: "45",
      mass: "",
      acceleration: "9",
    },
  },
  {
    label: "Find acceleration",
    solveFor: "acceleration" as const,
    values: {
      force: "50",
      mass: "10",
      acceleration: "",
    },
  },
] as const;

export function ForceCalculator() {
  const [solveFor, setSolveFor] =
    useState<ForceVariable>("force");

  const [values, setValues] = useState<
    Record<ForceVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<ForceResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: ForceVariable,
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
    variable: ForceVariable,
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
      typeof calculateForce
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
        calculateForce(input);

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
      ForceVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateForce
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
      calculateForce(input);

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
    setSolveFor("force");
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

            <h2>Solve a force problem</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="force-solve-for">
              Calculate which value?
            </label>

            <select
              id="force-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as ForceVariable,
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
                  htmlFor={`force-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`force-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.key === "mass"
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
                    aria-describedby={`force-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`force-${field.key}-help`}
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
          Use kilograms for mass, meters per second
          squared for acceleration, and newtons for force.
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
                <dt>Force</dt>
                <dd>
                  {result.details.force} N
                </dd>
              </div>

              <div>
                <dt>Mass</dt>
                <dd>
                  {result.details.mass} kg
                </dd>
              </div>

              <div>
                <dt>Acceleration</dt>
                <dd>
                  {
                    result.details
                      .acceleration
                  }{" "}
                  m/s²
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
            <span aria-hidden="true">F</span>

            <h2>
              Your force result will appear here
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
