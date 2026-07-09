"use client";

import { useState, type FormEvent } from "react";

import {
  calculateAverageVelocity,
  type AverageVelocityDetails,
  type AverageVelocityVariable,
} from "@/lib/calculators/average-velocity";
import type { CalculationResult } from "@/types/calculator";

type AverageVelocityResult =
  CalculationResult<AverageVelocityDetails>;

type AverageVelocityField = {
  key: AverageVelocityVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly AverageVelocityField[] = [
  {
    key: "averageVelocity",
    label: "Average velocity",
    symbol: "v̄",
    description:
      "Net displacement divided by elapsed time.",
  },
  {
    key: "displacement",
    label: "Displacement",
    symbol: "Δx",
    description:
      "Change in position from start to finish.",
  },
  {
    key: "time",
    label: "Time",
    symbol: "Δt",
    description:
      "Elapsed time for the motion interval.",
  },
];

const variableLabels: Record<
  AverageVelocityVariable,
  string
> = {
  averageVelocity: "Average velocity",
  displacement: "Displacement",
  time: "Time",
};

const variableUnits: Record<
  AverageVelocityVariable,
  string
> = {
  averageVelocity: "m/s",
  displacement: "m",
  time: "s",
};

const emptyValues: Record<
  AverageVelocityVariable,
  string
> = {
  averageVelocity: "",
  displacement: "",
  time: "",
};

const examples = [
  {
    label: "Find average velocity",
    solveFor: "averageVelocity" as const,
    values: {
      averageVelocity: "",
      displacement: "120",
      time: "10",
    },
  },
  {
    label: "Find displacement",
    solveFor: "displacement" as const,
    values: {
      averageVelocity: "15",
      displacement: "",
      time: "4",
    },
  },
  {
    label: "Find time",
    solveFor: "time" as const,
    values: {
      averageVelocity: "10",
      displacement: "50",
      time: "",
    },
  },
] as const;

export function AverageVelocityCalculator() {
  const [solveFor, setSolveFor] =
    useState<AverageVelocityVariable>(
      "averageVelocity",
    );

  const [values, setValues] = useState<
    Record<AverageVelocityVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<AverageVelocityResult | null>(null);
  const [error, setError] = useState("");

  function updateValue(
    field: AverageVelocityVariable,
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
    variable: AverageVelocityVariable,
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
      typeof calculateAverageVelocity
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
        calculateAverageVelocity(input);

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
      AverageVelocityVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateAverageVelocity
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
      calculateAverageVelocity(input);

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
    setSolveFor("averageVelocity");
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
        <div className="calculator-form__header">
          <div>
            <p className="eyebrow">
              Motion calculator
            </p>

            <h2>Average velocity calculator</h2>

            <p>
              Select the unknown variable, enter the
              remaining values, and calculate the result.
            </p>
          </div>

          <button
            type="button"
            className="calculator-reset-button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <fieldset className="calculator-variable-selector">
          <legend>What do you want to calculate?</legend>

          <div className="calculator-variable-grid">
            {fields.map((field) => (
              <label key={field.key}>
                <input
                  type="radio"
                  name="solveFor"
                  value={field.key}
                  checked={solveFor === field.key}
                  onChange={() =>
                    changeSolveFor(field.key)
                  }
                />

                <span>
                  <strong>{field.label}</strong>
                  <small>{field.symbol}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="calculator-input-grid">
          {fields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <label
                key={field.key}
                className="calculator-field"
              >
                <span className="calculator-field__label">
                  {field.label}
                </span>

                <span className="calculator-field__control">
                  <input
                    type="number"
                    step="any"
                    value={values[field.key]}
                    readOnly={isSolvedField}
                    placeholder={
                      isSolvedField
                        ? "Calculated result"
                        : `Enter ${field.label.toLowerCase()}`
                    }
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                  />

                  <span>{variableUnits[field.key]}</span>
                </span>

                <small>{field.description}</small>
              </label>
            );
          })}
        </div>

        {error ? (
          <p
            className="calculator-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="calculator-submit-button"
        >
          Calculate {variableLabels[solveFor]}
        </button>
      </form>

      <aside className="calculator-result-panel">
        <div>
          <p className="eyebrow">Result</p>

          <h2>
            {result
              ? `${result.formattedValue} ${variableUnits[solveFor]}`
              : "Enter values to calculate"}
          </h2>

          <p>
            Formula: <strong>v̄ = Δx ÷ Δt</strong>
          </p>
        </div>

        {result ? (
          <dl className="calculator-result-list">
            <div>
              <dt>Average velocity</dt>
              <dd>
                {result.details.averageVelocity} m/s
              </dd>
            </div>

            <div>
              <dt>Displacement</dt>
              <dd>
                {result.details.displacement} m
              </dd>
            </div>

            <div>
              <dt>Time</dt>
              <dd>{result.details.time} s</dd>
            </div>
          </dl>
        ) : null}

        <div className="calculator-example-list">
          <p>Try an example</p>

          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              onClick={() => loadExample(example)}
            >
              {example.label}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
