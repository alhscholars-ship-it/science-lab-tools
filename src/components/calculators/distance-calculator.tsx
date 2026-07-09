"use client";

import { useState, type FormEvent } from "react";

import {
  calculateDistance,
  type DistanceDetails,
  type DistanceVariable,
} from "@/lib/calculators/distance";
import type { CalculationResult } from "@/types/calculator";

type DistanceResult =
  CalculationResult<DistanceDetails>;

type DistanceField = {
  key: DistanceVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly DistanceField[] = [
  {
    key: "distance",
    label: "Distance",
    symbol: "d",
    description:
      "Total path length travelled by an object.",
  },
  {
    key: "speed",
    label: "Speed",
    symbol: "v",
    description:
      "Rate at which distance is travelled.",
  },
  {
    key: "time",
    label: "Time",
    symbol: "t",
    description:
      "Elapsed duration of the motion.",
  },
];

const variableLabels: Record<
  DistanceVariable,
  string
> = {
  distance: "Distance",
  speed: "Speed",
  time: "Time",
};

const variableUnits: Record<
  DistanceVariable,
  string
> = {
  distance: "m",
  speed: "m/s",
  time: "s",
};

const emptyValues: Record<
  DistanceVariable,
  string
> = {
  distance: "",
  speed: "",
  time: "",
};

const examples = [
  {
    label: "Find distance",
    solveFor: "distance" as const,
    values: {
      distance: "",
      speed: "12",
      time: "5",
    },
  },
  {
    label: "Find speed",
    solveFor: "speed" as const,
    values: {
      distance: "150",
      speed: "",
      time: "10",
    },
  },
  {
    label: "Find time",
    solveFor: "time" as const,
    values: {
      distance: "100",
      speed: "20",
      time: "",
    },
  },
] as const;

export function DistanceCalculator() {
  const [solveFor, setSolveFor] =
    useState<DistanceVariable>("distance");

  const [values, setValues] = useState<
    Record<DistanceVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<DistanceResult | null>(null);
  const [error, setError] = useState("");

  function updateValue(
    field: DistanceVariable,
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
    variable: DistanceVariable,
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
      typeof calculateDistance
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
        calculateDistance(input);

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
      DistanceVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateDistance
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
      calculateDistance(input);

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
    setSolveFor("distance");
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

            <h2>Distance calculator</h2>

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
            Formula: <strong>d = v × t</strong>
          </p>
        </div>

        {result ? (
          <dl className="calculator-result-list">
            <div>
              <dt>Distance</dt>
              <dd>{result.details.distance} m</dd>
            </div>

            <div>
              <dt>Speed</dt>
              <dd>{result.details.speed} m/s</dd>
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
