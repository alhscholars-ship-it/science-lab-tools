"use client";

import { useState, type FormEvent } from "react";

import {
  calculateAverageSpeed,
  type AverageSpeedDetails,
  type AverageSpeedVariable,
} from "@/lib/calculators/average-speed";
import type { CalculationResult } from "@/types/calculator";

type AverageSpeedResult =
  CalculationResult<AverageSpeedDetails>;

type AverageSpeedField = {
  key: AverageSpeedVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly AverageSpeedField[] = [
  {
    key: "averageSpeed",
    label: "Average speed",
    symbol: "s̄",
    description:
      "Total distance divided by total elapsed time.",
  },
  {
    key: "distance",
    label: "Distance",
    symbol: "d",
    description:
      "Total path length travelled.",
  },
  {
    key: "time",
    label: "Time",
    symbol: "t",
    description:
      "Total elapsed time for the journey.",
  },
];

const variableLabels: Record<
  AverageSpeedVariable,
  string
> = {
  averageSpeed: "Average speed",
  distance: "Distance",
  time: "Time",
};

const variableUnits: Record<
  AverageSpeedVariable,
  string
> = {
  averageSpeed: "m/s",
  distance: "m",
  time: "s",
};

const emptyValues: Record<
  AverageSpeedVariable,
  string
> = {
  averageSpeed: "",
  distance: "",
  time: "",
};

const examples = [
  {
    label: "Find average speed",
    solveFor: "averageSpeed" as const,
    values: {
      averageSpeed: "",
      distance: "150",
      time: "10",
    },
  },
  {
    label: "Find distance",
    solveFor: "distance" as const,
    values: {
      averageSpeed: "12",
      distance: "",
      time: "5",
    },
  },
  {
    label: "Find time",
    solveFor: "time" as const,
    values: {
      averageSpeed: "20",
      distance: "100",
      time: "",
    },
  },
] as const;

export function AverageSpeedCalculator() {
  const [solveFor, setSolveFor] =
    useState<AverageSpeedVariable>(
      "averageSpeed",
    );

  const [values, setValues] = useState<
    Record<AverageSpeedVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<AverageSpeedResult | null>(null);
  const [error, setError] = useState("");

  function updateValue(
    field: AverageSpeedVariable,
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
    variable: AverageSpeedVariable,
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
      typeof calculateAverageSpeed
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
        calculateAverageSpeed(input);

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
      AverageSpeedVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateAverageSpeed
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
      calculateAverageSpeed(input);

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
    setSolveFor("averageSpeed");
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

            <h2>Average speed calculator</h2>

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
                    min="0"
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
            Formula: <strong>s̄ = d ÷ t</strong>
          </p>
        </div>

        {result ? (
          <dl className="calculator-result-list">
            <div>
              <dt>Average speed</dt>
              <dd>
                {result.details.averageSpeed} m/s
              </dd>
            </div>

            <div>
              <dt>Distance</dt>
              <dd>{result.details.distance} m</dd>
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
