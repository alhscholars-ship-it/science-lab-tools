"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRotationalFrequency,
  type RotationalFrequencyDetails,
  type RotationalFrequencyVariable,
} from "@/lib/calculators/rotational-frequency";
import type { CalculationResult } from "@/types/calculator";

type RotationalFrequencyResult =
  CalculationResult<RotationalFrequencyDetails>;

type FrequencySource =
  | "angularVelocity"
  | "period";

const variableLabels: Record<
  RotationalFrequencyVariable,
  string
> = {
  frequency: "Rotational Frequency",
  angularVelocity: "Angular Velocity",
  period: "Rotation Period",
};

const variableSymbols: Record<
  RotationalFrequencyVariable,
  string
> = {
  frequency: "f",
  angularVelocity: "ω",
  period: "T",
};

const variableUnits: Record<
  RotationalFrequencyVariable,
  string
> = {
  frequency: "Hz",
  angularVelocity: "rad/s",
  period: "s",
};

const emptyValues: Record<
  RotationalFrequencyVariable,
  string
> = {
  frequency: "",
  angularVelocity: "",
  period: "",
};

export function RotationalFrequencyCalculator() {
  const [solveFor, setSolveFor] =
    useState<RotationalFrequencyVariable>(
      "frequency",
    );

  const [frequencySource, setFrequencySource] =
    useState<FrequencySource>(
      "angularVelocity",
    );

  const [values, setValues] = useState<
    Record<RotationalFrequencyVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<RotationalFrequencyResult | null>(null);

  const [error, setError] = useState("");

  const inputVariable: RotationalFrequencyVariable =
    solveFor === "frequency"
      ? frequencySource
      : "frequency";

  function updateValue(
    variable: RotationalFrequencyVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: value,
    }));
    setResult(null);
    setError("");
  }

  function changeSolveFor(
    variable: RotationalFrequencyVariable,
  ) {
    setSolveFor(variable);
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  function changeFrequencySource(
    source: FrequencySource,
  ) {
    setFrequencySource(source);
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setResult(null);
    setError("");

    const rawValue = values[inputVariable];
    const numericValue = Number(rawValue);

    if (
      rawValue.trim() === "" ||
      !Number.isFinite(numericValue)
    ) {
      setError(
        `Enter a valid ${variableLabels[
          inputVariable
        ].toLowerCase()}.`,
      );
      return;
    }

    const input: Parameters<
      typeof calculateRotationalFrequency
    >[0] = {
      solveFor,
      [inputVariable]: numericValue,
    };

    try {
      const calculationResult =
        calculateRotationalFrequency(input);

      setResult(calculationResult);

      setValues({
        frequency: String(
          calculationResult.details.frequency,
        ),
        angularVelocity: String(
          calculationResult.details.angularVelocity,
        ),
        period: String(
          calculationResult.details.period,
        ),
      });
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The calculation could not be completed.",
      );
    }
  }

  function loadExample() {
    const exampleInput: Parameters<
      typeof calculateRotationalFrequency
    >[0] =
      solveFor === "frequency"
        ? frequencySource === "angularVelocity"
          ? {
              solveFor: "frequency",
              angularVelocity: 2 * Math.PI,
            }
          : {
              solveFor: "frequency",
              period: 0.5,
            }
        : solveFor === "angularVelocity"
          ? {
              solveFor: "angularVelocity",
              frequency: 3,
            }
          : {
              solveFor: "period",
              frequency: 4,
            };

    const calculationResult =
      calculateRotationalFrequency(exampleInput);

    setValues({
      frequency: String(
        calculationResult.details.frequency,
      ),
      angularVelocity: String(
        calculationResult.details.angularVelocity,
      ),
      period: String(
        calculationResult.details.period,
      ),
    });

    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("frequency");
    setFrequencySource("angularVelocity");
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
              Enter one known value
            </p>

            <h2>
              Solve a rotational frequency problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="rotational-frequency-solve-for">
              Calculate which value?
            </label>

            <select
              id="rotational-frequency-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as RotationalFrequencyVariable,
                )
              }
            >
              {(
                [
                  "frequency",
                  "angularVelocity",
                  "period",
                ] as const
              ).map((variable) => (
                <option
                  key={variable}
                  value={variable}
                >
                  {variableLabels[variable]} (
                  {variableSymbols[variable]})
                </option>
              ))}
            </select>
          </div>

          {solveFor === "frequency" ? (
            <div className="form-field dilution-solve-field">
              <label htmlFor="frequency-source">
                Known value
              </label>

              <select
                id="frequency-source"
                value={frequencySource}
                onChange={(event) =>
                  changeFrequencySource(
                    event.target
                      .value as FrequencySource,
                  )
                }
              >
                <option value="angularVelocity">
                  Angular Velocity (ω)
                </option>

                <option value="period">
                  Rotation Period (T)
                </option>
              </select>
            </div>
          ) : null}
        </div>

        <div className="density-fields">
          <div className="form-field">
            <label htmlFor="rotational-frequency-input">
              {variableLabels[inputVariable]} (
              {variableSymbols[inputVariable]})
            </label>

            <div className="input-with-suffix">
              <input
                id="rotational-frequency-input"
                name={inputVariable}
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                placeholder="Enter value"
                value={values[inputVariable]}
                onChange={(event) =>
                  updateValue(
                    inputVariable,
                    event.target.value,
                  )
                }
                aria-describedby="rotational-frequency-input-help"
              />

              <span>
                {variableUnits[inputVariable]}
              </span>
            </div>

            <p id="rotational-frequency-input-help">
              Enter a positive finite value.
            </p>
          </div>
        </div>

        <p className="calculator-unit-note">
          Use hertz for rotational frequency,
          radians per second for angular velocity,
          and seconds for rotation period.
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

          <button
            type="button"
            onClick={loadExample}
          >
            Load example
          </button>
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
                    result.details.solvedVariable
                  ]
                }
              </span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Rotational Frequency</dt>
                <dd>
                  {result.details.frequency} Hz
                </dd>
              </div>

              <div>
                <dt>Angular Velocity</dt>
                <dd>
                  {result.details.angularVelocity} rad/s
                </dd>
              </div>

              <div>
                <dt>Rotation Period</dt>
                <dd>
                  {result.details.period} s
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
            <span aria-hidden="true">f</span>

            <h2>
              Your rotational frequency result will
              appear here
            </h2>

            <p>
              Choose the required value and enter one
              known measurement.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
