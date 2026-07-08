"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRevolutions,
  type RevolutionsDetails,
  type RevolutionsSource,
  type RevolutionsVariable,
} from "@/lib/calculators/revolutions";
import type { CalculationResult } from "@/types/calculator";

type RevolutionsResult =
  CalculationResult<RevolutionsDetails>;

const variables: readonly RevolutionsVariable[] = [
  "revolutions",
  "frequency",
  "time",
  "angularDisplacement",
];

const variableLabels: Record<
  RevolutionsVariable,
  string
> = {
  revolutions: "Number of Revolutions",
  frequency: "Rotational Frequency",
  time: "Time",
  angularDisplacement: "Angular Displacement",
};

const variableSymbols: Record<
  RevolutionsVariable,
  string
> = {
  revolutions: "N",
  frequency: "f",
  time: "t",
  angularDisplacement: "θ",
};

const variableUnits: Record<
  RevolutionsVariable,
  string
> = {
  revolutions: "rev",
  frequency: "Hz",
  time: "s",
  angularDisplacement: "rad",
};

const emptyValues: Record<
  RevolutionsVariable,
  string
> = {
  revolutions: "",
  frequency: "",
  time: "",
  angularDisplacement: "",
};

export function RevolutionsCalculator() {
  const [solveFor, setSolveFor] =
    useState<RevolutionsVariable>("revolutions");

  const [source, setSource] =
    useState<RevolutionsSource>(
      "frequencyAndTime",
    );

  const [values, setValues] = useState<
    Record<RevolutionsVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<RevolutionsResult | null>(null);

  const [error, setError] = useState("");

  const requiredVariables: RevolutionsVariable[] =
    solveFor === "revolutions"
      ? source === "angularDisplacement"
        ? ["angularDisplacement"]
        : ["frequency", "time"]
      : solveFor === "frequency"
        ? ["revolutions", "time"]
        : solveFor === "time"
          ? ["revolutions", "frequency"]
          : ["revolutions"];

  function updateValue(
    variable: RevolutionsVariable,
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
    variable: RevolutionsVariable,
  ) {
    setSolveFor(variable);
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  function changeSource(
    nextSource: RevolutionsSource,
  ) {
    setSource(nextSource);
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

    const input: Parameters<
      typeof calculateRevolutions
    >[0] = {
      solveFor,
      source,
    };

    for (const variable of requiredVariables) {
      const rawValue = values[variable];
      const numericValue = Number(rawValue);

      if (
        rawValue.trim() === "" ||
        !Number.isFinite(numericValue)
      ) {
        setError(
          `Enter a valid ${variableLabels[
            variable
          ].toLowerCase()}.`,
        );
        return;
      }

      input[variable] = numericValue;
    }

    try {
      const calculationResult =
        calculateRevolutions(input);

      setResult(calculationResult);

      setValues((currentValues) => ({
        ...currentValues,
        revolutions: String(
          calculationResult.details.revolutions,
        ),
        frequency:
          calculationResult.details.frequency ===
          undefined
            ? currentValues.frequency
            : String(
                calculationResult.details.frequency,
              ),
        time:
          calculationResult.details.time === undefined
            ? currentValues.time
            : String(
                calculationResult.details.time,
              ),
        angularDisplacement: String(
          calculationResult.details
            .angularDisplacement,
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

  function loadExample() {
    const input: Parameters<
      typeof calculateRevolutions
    >[0] =
      solveFor === "revolutions"
        ? source === "angularDisplacement"
          ? {
              solveFor: "revolutions",
              source: "angularDisplacement",
              angularDisplacement: 8 * Math.PI,
            }
          : {
              solveFor: "revolutions",
              source: "frequencyAndTime",
              frequency: 3,
              time: 4,
            }
        : solveFor === "frequency"
          ? {
              solveFor: "frequency",
              revolutions: 20,
              time: 5,
            }
          : solveFor === "time"
            ? {
                solveFor: "time",
                revolutions: 15,
                frequency: 3,
              }
            : {
                solveFor: "angularDisplacement",
                revolutions: 6,
              };

    const calculationResult =
      calculateRevolutions(input);

    setValues({
      revolutions: String(
        calculationResult.details.revolutions,
      ),
      frequency:
        calculationResult.details.frequency ===
        undefined
          ? ""
          : String(
              calculationResult.details.frequency,
            ),
      time:
        calculationResult.details.time === undefined
          ? ""
          : String(calculationResult.details.time),
      angularDisplacement: String(
        calculationResult.details
          .angularDisplacement,
      ),
    });

    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("revolutions");
    setSource("frequencyAndTime");
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
              Enter the known rotational values
            </p>

            <h2>
              Solve a revolutions problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="revolutions-solve-for">
              Calculate which value?
            </label>

            <select
              id="revolutions-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as RevolutionsVariable,
                )
              }
            >
              {variables.map((variable) => (
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

          {solveFor === "revolutions" ? (
            <div className="form-field dilution-solve-field">
              <label htmlFor="revolutions-source">
                Known values
              </label>

              <select
                id="revolutions-source"
                value={source}
                onChange={(event) =>
                  changeSource(
                    event.target
                      .value as RevolutionsSource,
                  )
                }
              >
                <option value="frequencyAndTime">
                  Frequency and Time
                </option>

                <option value="angularDisplacement">
                  Angular Displacement
                </option>
              </select>
            </div>
          ) : null}
        </div>

        <div className="density-fields">
          {requiredVariables.map((variable) => (
            <div
              className="form-field"
              key={variable}
            >
              <label
                htmlFor={`revolutions-${variable}`}
              >
                {variableLabels[variable]} (
                {variableSymbols[variable]})
              </label>

              <div className="input-with-suffix">
                <input
                  id={`revolutions-${variable}`}
                  name={variable}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  placeholder="Enter value"
                  value={values[variable]}
                  onChange={(event) =>
                    updateValue(
                      variable,
                      event.target.value,
                    )
                  }
                  aria-describedby={`revolutions-${variable}-help`}
                />

                <span>
                  {variableUnits[variable]}
                </span>
              </div>

              <p
                id={`revolutions-${variable}-help`}
              >
                Enter a positive finite value.
              </p>
            </div>
          ))}
        </div>

        <p className="calculator-unit-note">
          Use revolutions for N, hertz for
          rotational frequency, seconds for time,
          and radians for angular displacement.
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
                <dt>Number of Revolutions</dt>
                <dd>
                  {result.details.revolutions} rev
                </dd>
              </div>

              <div>
                <dt>Rotational Frequency</dt>
                <dd>
                  {result.details.frequency ===
                  undefined
                    ? "Not required"
                    : `${result.details.frequency} Hz`}
                </dd>
              </div>

              <div>
                <dt>Time</dt>
                <dd>
                  {result.details.time === undefined
                    ? "Not required"
                    : `${result.details.time} s`}
                </dd>
              </div>

              <div>
                <dt>Angular Displacement</dt>
                <dd>
                  {
                    result.details
                      .angularDisplacement
                  }{" "}
                  rad
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
            <span aria-hidden="true">N</span>

            <h2>
              Your revolutions result will appear here
            </h2>

            <p>
              Choose the required value and enter the
              known rotational measurements.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
