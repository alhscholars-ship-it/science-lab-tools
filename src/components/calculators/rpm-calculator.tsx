"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRpm,
  type RpmDetails,
  type RpmVariable,
} from "@/lib/calculators/rpm";
import type { CalculationResult } from "@/types/calculator";

type RpmResult = CalculationResult<RpmDetails>;

type RpmSource =
  | "frequency"
  | "angularVelocity";

const variables: readonly RpmVariable[] = [
  "rpm",
  "frequency",
  "angularVelocity",
];

const variableLabels: Record<RpmVariable, string> = {
  rpm: "Rotational Speed",
  frequency: "Rotational Frequency",
  angularVelocity: "Angular Velocity",
};

const variableSymbols: Record<RpmVariable, string> = {
  rpm: "RPM",
  frequency: "f",
  angularVelocity: "ω",
};

const variableUnits: Record<RpmVariable, string> = {
  rpm: "RPM",
  frequency: "Hz",
  angularVelocity: "rad/s",
};

const emptyValues: Record<RpmVariable, string> = {
  rpm: "",
  frequency: "",
  angularVelocity: "",
};

export function RpmCalculator() {
  const [solveFor, setSolveFor] =
    useState<RpmVariable>("rpm");

  const [rpmSource, setRpmSource] =
    useState<RpmSource>("frequency");

  const [values, setValues] = useState<
    Record<RpmVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<RpmResult | null>(null);

  const [error, setError] = useState("");

  const inputVariable: RpmVariable =
    solveFor === "rpm" ? rpmSource : "rpm";

  function updateValue(
    variable: RpmVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: value,
    }));

    setResult(null);
    setError("");
  }

  function changeSolveFor(variable: RpmVariable) {
    setSolveFor(variable);
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  function changeRpmSource(source: RpmSource) {
    setRpmSource(source);
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

    const input: Parameters<typeof calculateRpm>[0] = {
      solveFor,
      [inputVariable]: numericValue,
    };

    try {
      const calculationResult =
        calculateRpm(input);

      setResult(calculationResult);

      setValues({
        rpm: String(
          calculationResult.details.rpm,
        ),
        frequency: String(
          calculationResult.details.frequency,
        ),
        angularVelocity: String(
          calculationResult.details.angularVelocity,
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
    const input: Parameters<typeof calculateRpm>[0] =
      solveFor === "rpm"
        ? rpmSource === "frequency"
          ? {
              solveFor: "rpm",
              frequency: 2,
            }
          : {
              solveFor: "rpm",
              angularVelocity: 4 * Math.PI,
            }
        : solveFor === "frequency"
          ? {
              solveFor: "frequency",
              rpm: 180,
            }
          : {
              solveFor: "angularVelocity",
              rpm: 60,
            };

    const calculationResult = calculateRpm(input);

    setValues({
      rpm: String(
        calculationResult.details.rpm,
      ),
      frequency: String(
        calculationResult.details.frequency,
      ),
      angularVelocity: String(
        calculationResult.details.angularVelocity,
      ),
    });

    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("rpm");
    setRpmSource("frequency");
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

            <h2>Solve an RPM conversion</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="rpm-solve-for">
              Calculate which value?
            </label>

            <select
              id="rpm-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target.value as RpmVariable,
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

          {solveFor === "rpm" ? (
            <div className="form-field dilution-solve-field">
              <label htmlFor="rpm-source">
                Known value
              </label>

              <select
                id="rpm-source"
                value={rpmSource}
                onChange={(event) =>
                  changeRpmSource(
                    event.target.value as RpmSource,
                  )
                }
              >
                <option value="frequency">
                  Rotational Frequency (f)
                </option>

                <option value="angularVelocity">
                  Angular Velocity (ω)
                </option>
              </select>
            </div>
          ) : null}
        </div>

        <div className="density-fields">
          <div className="form-field">
            <label htmlFor="rpm-input">
              {variableLabels[inputVariable]} (
              {variableSymbols[inputVariable]})
            </label>

            <div className="input-with-suffix">
              <input
                id="rpm-input"
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
                aria-describedby="rpm-input-help"
              />

              <span>
                {variableUnits[inputVariable]}
              </span>
            </div>

            <p id="rpm-input-help">
              Enter a positive finite value.
            </p>
          </div>
        </div>

        <p className="calculator-unit-note">
          Use revolutions per minute for RPM,
          hertz for rotational frequency, and radians
          per second for angular velocity.
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
                <dt>Rotational Speed</dt>
                <dd>{result.details.rpm} RPM</dd>
              </div>

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
            </dl>

            <div className="calculator-result__working">
              <h3>Formula</h3>
              <p>{result.details.formula}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">RPM</span>

            <h2>
              Your RPM result will appear here
            </h2>

            <p>
              Choose the required conversion and enter
              one known rotational measurement.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
