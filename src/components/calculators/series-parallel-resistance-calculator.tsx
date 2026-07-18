"use client";

import { useState, type FormEvent } from "react";

import {
  calculateSeriesParallelResistance,
  type ResistanceMode,
  type SeriesParallelResistanceDetails,
} from "@/lib/calculators/series-parallel-resistance";
import type { CalculationResult } from "@/types/calculator";

type ResistanceResult =
  CalculationResult<SeriesParallelResistanceDetails>;

const initialValues = ["100", "220"];

const examples = [
  {
    label: "Series: 100 Ω, 220 Ω, 330 Ω",
    mode: "series" as const,
    values: ["100", "220", "330"],
  },
  {
    label: "Parallel: 100 Ω and 220 Ω",
    mode: "parallel" as const,
    values: ["100", "220"],
  },
  {
    label: "Parallel: three 1 kΩ resistors",
    mode: "parallel" as const,
    values: ["1000", "1000", "1000"],
  },
] as const;

function formatResistance(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString(undefined, {
      maximumFractionDigits: 6,
    })} MΩ`;
  }

  if (value >= 1_000) {
    return `${(value / 1_000).toLocaleString(undefined, {
      maximumFractionDigits: 6,
    })} kΩ`;
  }

  return `${value.toLocaleString(undefined, {
    maximumFractionDigits: 6,
  })} Ω`;
}

export function SeriesParallelResistanceCalculator() {
  const [mode, setMode] =
    useState<ResistanceMode>("series");

  const [values, setValues] =
    useState<string[]>(initialValues);

  const [result, setResult] =
    useState<ResistanceResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(index: number, value: string) {
    setValues((currentValues) =>
      currentValues.map((currentValue, currentIndex) =>
        currentIndex === index
          ? value
          : currentValue,
      ),
    );

    setResult(null);
    setError("");
  }

  function changeMode(nextMode: ResistanceMode) {
    setMode(nextMode);
    setResult(null);
    setError("");
  }

  function addResistor() {
    setValues((currentValues) => [
      ...currentValues,
      "",
    ]);

    setResult(null);
    setError("");
  }

  function removeResistor(index: number) {
    if (values.length <= 2) {
      setError(
        "At least two resistance values are required.",
      );
      return;
    }

    setValues((currentValues) =>
      currentValues.filter(
        (_, currentIndex) => currentIndex !== index,
      ),
    );

    setResult(null);
    setError("");
  }

  function parseResistances(
    inputValues: readonly string[],
  ): number[] {
    if (inputValues.length < 2) {
      throw new Error(
        "Enter at least two resistance values.",
      );
    }

    return inputValues.map((rawValue, index) => {
      const trimmedValue = rawValue.trim();

      if (trimmedValue === "") {
        throw new Error(
          `Enter resistance R${index + 1}.`,
        );
      }

      const numericValue = Number(trimmedValue);

      if (
        !Number.isFinite(numericValue) ||
        numericValue <= 0
      ) {
        throw new Error(
          `Resistance R${index + 1} must be a number greater than zero.`,
        );
      }

      return numericValue;
    });
  }

  function runCalculation(
    selectedMode: ResistanceMode,
    inputValues: readonly string[],
  ) {
    const resistances =
      parseResistances(inputValues);

    return calculateSeriesParallelResistance({
      mode: selectedMode,
      resistances,
    });
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      setResult(runCalculation(mode, values));
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
    try {
      const exampleValues = [...example.values];

      const calculationResult = runCalculation(
        example.mode,
        exampleValues,
      );

      setMode(example.mode);
      setValues(exampleValues);
      setResult(calculationResult);
      setError("");
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The example could not be loaded.",
      );
    }
  }

  function resetCalculator() {
    setMode("series");
    setValues(initialValues);
    setResult(null);
    setError("");
  }

  const substitution = result
    ? result.details.mode === "series"
      ? result.details.resistances.join(" + ")
      : result.details.resistances
          .map((resistance) => `1/${resistance}`)
          .join(" + ")
    : "";

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
              Enter resistor values
            </p>

            <h2>
              Calculate equivalent resistance
            </h2>

            <p>
              Enter all resistance values in ohms and
              choose whether the resistors are connected
              in series or parallel.
            </p>
          </div>
        </div>

        <fieldset className="calculator-fieldset">
          <legend>Connection type</legend>

          <div className="calculator-choice-grid">
            <label className="calculator-choice">
              <input
                type="radio"
                name="resistance-mode"
                value="series"
                checked={mode === "series"}
                onChange={() =>
                  changeMode("series")
                }
              />

              <span>
                <strong>Series</strong>
                <small>
                  Resistances add directly.
                </small>
              </span>
            </label>

            <label className="calculator-choice">
              <input
                type="radio"
                name="resistance-mode"
                value="parallel"
                checked={mode === "parallel"}
                onChange={() =>
                  changeMode("parallel")
                }
              />

              <span>
                <strong>Parallel</strong>
                <small>
                  Reciprocals of resistance add.
                </small>
              </span>
            </label>
          </div>
        </fieldset>

        <div className="calculator-fields">
          {values.map((value, index) => (
            <div
              className="calculator-field"
              key={`resistance-${index}`}
            >
              <label
                htmlFor={`resistance-${index}`}
              >
                Resistance R{index + 1}
              </label>

              <div className="calculator-input-group">
                <input
                  id={`resistance-${index}`}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  value={value}
                  onChange={(event) =>
                    updateValue(
                      index,
                      event.target.value,
                    )
                  }
                  placeholder="Enter resistance"
                />

                <span>Ω</span>
              </div>

              <button
                className="calculator-link-button"
                type="button"
                onClick={() =>
                  removeResistor(index)
                }
                disabled={values.length <= 2}
              >
                Remove R{index + 1}
              </button>
            </div>
          ))}
        </div>

        <button
          className="button button--secondary"
          type="button"
          onClick={addResistor}
        >
          Add another resistor
        </button>

        {error ? (
          <p
            className="calculator-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="calculator-actions">
          <button
            className="button button--primary"
            type="submit"
          >
            Calculate resistance
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
          <p>Try an example:</p>

          <div>
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
        </div>
      </form>

      <aside
        className="calculator-result"
        aria-live="polite"
      >
        <p className="calculator-result__label">
          Equivalent resistance
        </p>

        {result ? (
          <>
            <p className="calculator-result__value">
              {formatResistance(result.value)}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Connection</dt>
                <dd>
                  {result.details.mode === "series"
                    ? "Series"
                    : "Parallel"}
                </dd>
              </div>

              <div>
                <dt>Number of resistors</dt>
                <dd>
                  {result.details.resistances.length}
                </dd>
              </div>

              <div>
                <dt>Formula</dt>
                <dd>{result.details.formula}</dd>
              </div>

              <div>
                <dt>Substitution</dt>
                <dd>
                  {result.details.mode === "series"
                    ? `Req = ${substitution}`
                    : `1/Req = ${substitution}`}
                </dd>
              </div>
            </dl>

            <p className="calculator-result__note">
              All entered values are interpreted in
              ohms. The result is automatically displayed
              in Ω, kΩ, or MΩ when appropriate.
            </p>
          </>
        ) : (
          <p className="calculator-result__placeholder">
            Select a connection type, enter at least two
            resistance values, and calculate the
            equivalent resistance.
          </p>
        )}
      </aside>
    </div>
  );
}
