"use client";

import { useState, type FormEvent } from "react";

import {
  calculatePressure,
  type PressureDetails,
  type PressureVariable,
} from "@/lib/calculators/pressure";
import type { CalculationResult } from "@/types/calculator";

type PressureResult =
  CalculationResult<PressureDetails>;

type PressureField = {
  key: PressureVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly PressureField[] = [
  {
    key: "pressure",
    label: "Pressure",
    symbol: "P",
    description:
      "Force applied per unit area.",
  },
  {
    key: "force",
    label: "Force",
    symbol: "F",
    description:
      "Positive force applied to the surface.",
  },
  {
    key: "area",
    label: "Area",
    symbol: "A",
    description:
      "Positive surface area over which force acts.",
  },
];

const variableLabels: Record<
  PressureVariable,
  string
> = {
  pressure: "Pressure",
  force: "Force",
  area: "Area",
};

const variableUnits: Record<
  PressureVariable,
  string
> = {
  pressure: "Pa",
  force: "N",
  area: "m²",
};

const emptyValues: Record<
  PressureVariable,
  string
> = {
  pressure: "",
  force: "",
  area: "",
};

const examples = [
  {
    label: "Find pressure",
    solveFor: "pressure" as const,
    values: {
      pressure: "",
      force: "500",
      area: "2",
    },
  },
  {
    label: "Find force",
    solveFor: "force" as const,
    values: {
      pressure: "300",
      force: "",
      area: "4",
    },
  },
  {
    label: "Find area",
    solveFor: "area" as const,
    values: {
      pressure: "300",
      force: "900",
      area: "",
    },
  },
] as const;

export function PressureCalculator() {
  const [solveFor, setSolveFor] =
    useState<PressureVariable>(
      "pressure",
    );

  const [values, setValues] = useState<
    Record<PressureVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<PressureResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: PressureVariable,
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
    variable: PressureVariable,
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
      typeof calculatePressure
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
        calculatePressure(input);

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
      PressureVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculatePressure
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
      calculatePressure(input);

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
    setSolveFor("pressure");
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
              Solve a pressure problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="pressure-solve-for">
              Calculate which value?
            </label>

            <select
              id="pressure-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as PressureVariable,
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
                      field.key !== "pressure"
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
                    aria-describedby={`pressure-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`pressure-${field.key}-help`}
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
          Use pascals for pressure, newtons for force,
          and square meters for area.
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
                <dt>Pressure</dt>
                <dd>
                  {result.details.pressure} Pa
                </dd>
              </div>

              <div>
                <dt>Force</dt>
                <dd>
                  {result.details.force} N
                </dd>
              </div>

              <div>
                <dt>Area</dt>
                <dd>
                  {result.details.area} m²
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
            <span aria-hidden="true">P</span>

            <h2>
              Your pressure result will
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
