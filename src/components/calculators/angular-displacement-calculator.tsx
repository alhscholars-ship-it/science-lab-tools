"use client";

import { useState, type FormEvent } from "react";

import {
  calculateAngularDisplacement,
  type AngularDisplacementDetails,
  type AngularDisplacementVariable,
} from "@/lib/calculators/angular-displacement";
import type { CalculationResult } from "@/types/calculator";

type AngularDisplacementResult =
  CalculationResult<AngularDisplacementDetails>;

const variables: readonly AngularDisplacementVariable[] = [
  "angularDisplacement",
  "angularVelocity",
  "time",
];

const variableLabels: Record<
  AngularDisplacementVariable,
  string
> = {
  angularDisplacement: "Angular Displacement",
  angularVelocity: "Angular Velocity",
  time: "Time",
};

const variableSymbols: Record<
  AngularDisplacementVariable,
  string
> = {
  angularDisplacement: "θ",
  angularVelocity: "ω",
  time: "t",
};

const variableUnits: Record<
  AngularDisplacementVariable,
  string
> = {
  angularDisplacement: "rad",
  angularVelocity: "rad/s",
  time: "s",
};

const emptyValues: Record<
  AngularDisplacementVariable,
  string
> = {
  angularDisplacement: "",
  angularVelocity: "",
  time: "",
};

export function AngularDisplacementCalculator() {
  const [solveFor, setSolveFor] =
    useState<AngularDisplacementVariable>(
      "angularDisplacement",
    );

  const [values, setValues] = useState<
    Record<AngularDisplacementVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<AngularDisplacementResult | null>(
      null,
    );

  const [error, setError] = useState("");

  const requiredVariables: AngularDisplacementVariable[] =
    solveFor === "angularDisplacement"
      ? ["angularVelocity", "time"]
      : solveFor === "angularVelocity"
        ? ["angularDisplacement", "time"]
        : [
            "angularDisplacement",
            "angularVelocity",
          ];

  function updateValue(
    variable: AngularDisplacementVariable,
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
    variable: AngularDisplacementVariable,
  ) {
    setSolveFor(variable);
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
      typeof calculateAngularDisplacement
    >[0] = {
      solveFor,
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
        calculateAngularDisplacement(input);

      setResult(calculationResult);

      setValues({
        angularDisplacement: String(
          calculationResult.details
            .angularDisplacement,
        ),
        angularVelocity: String(
          calculationResult.details.angularVelocity,
        ),
        time: String(
          calculationResult.details.time,
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
    const input: Parameters<
      typeof calculateAngularDisplacement
    >[0] =
      solveFor === "angularDisplacement"
        ? {
            angularVelocity: 4,
            time: 3,
            solveFor: "angularDisplacement",
          }
        : solveFor === "angularVelocity"
          ? {
              angularDisplacement: 20,
              time: 5,
              solveFor: "angularVelocity",
            }
          : {
              angularDisplacement: 18,
              angularVelocity: 6,
              solveFor: "time",
            };

    const calculationResult =
      calculateAngularDisplacement(input);

    setValues({
      angularDisplacement: String(
        calculationResult.details
          .angularDisplacement,
      ),
      angularVelocity: String(
        calculationResult.details.angularVelocity,
      ),
      time: String(
        calculationResult.details.time,
      ),
    });

    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("angularDisplacement");
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
              Enter the known angular motion values
            </p>

            <h2>
              Solve an angular displacement problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="angular-displacement-solve-for">
              Calculate which value?
            </label>

            <select
              id="angular-displacement-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as AngularDisplacementVariable,
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
        </div>

        <div className="density-fields">
          {requiredVariables.map((variable) => (
            <div
              className="form-field"
              key={variable}
            >
              <label
                htmlFor={`angular-displacement-${variable}`}
              >
                {variableLabels[variable]} (
                {variableSymbols[variable]})
              </label>

              <div className="input-with-suffix">
                <input
                  id={`angular-displacement-${variable}`}
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
                  aria-describedby={`angular-displacement-${variable}-help`}
                />

                <span>
                  {variableUnits[variable]}
                </span>
              </div>

              <p
                id={`angular-displacement-${variable}-help`}
              >
                Enter a positive finite value.
              </p>
            </div>
          ))}
        </div>

        <p className="calculator-unit-note">
          Use radians for angular displacement,
          radians per second for angular velocity,
          and seconds for time.
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
                <dt>Angular Displacement</dt>
                <dd>
                  {
                    result.details
                      .angularDisplacement
                  }{" "}
                  rad
                </dd>
              </div>

              <div>
                <dt>Angular Velocity</dt>
                <dd>
                  {
                    result.details
                      .angularVelocity
                  }{" "}
                  rad/s
                </dd>
              </div>

              <div>
                <dt>Time</dt>
                <dd>
                  {result.details.time} s
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
            <span aria-hidden="true">θ</span>

            <h2>
              Your angular displacement result will
              appear here
            </h2>

            <p>
              Choose the required value and enter the
              two known rotational measurements.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
