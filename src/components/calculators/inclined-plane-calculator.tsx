"use client";

import { useState, type FormEvent } from "react";

import {
  calculateInclinedPlane,
  type InclinedPlaneDetails,
  type InclinedPlaneVariable,
} from "@/lib/calculators/inclined-plane";
import type { CalculationResult } from "@/types/calculator";

type InclinedPlaneResult =
  CalculationResult<InclinedPlaneDetails>;

type FormValues = {
  mass: string;
  angleDegrees: string;
  gravity: string;
  coefficient: string;
};

const outputOptions: Array<{
  value: InclinedPlaneVariable;
  label: string;
}> = [
  {
    value: "parallelForce",
    label: "Force parallel to incline",
  },
  {
    value: "normalForce",
    label: "Normal force",
  },
  {
    value: "frictionForce",
    label: "Friction force",
  },
  {
    value: "netForce",
    label: "Net force",
  },
  {
    value: "acceleration",
    label: "Acceleration",
  },
];

const outputLabels: Record<
  InclinedPlaneVariable,
  string
> = {
  parallelForce: "Parallel force",
  normalForce: "Normal force",
  frictionForce: "Friction force",
  netForce: "Net force",
  acceleration: "Acceleration",
};

const outputUnits: Record<
  InclinedPlaneVariable,
  string
> = {
  parallelForce: "N",
  normalForce: "N",
  frictionForce: "N",
  netForce: "N",
  acceleration: "m/s²",
};

const initialValues: FormValues = {
  mass: "",
  angleDegrees: "",
  gravity: "9.80665",
  coefficient: "0",
};

const examples = [
  {
    label: "Frictionless incline",
    solveFor: "acceleration" as const,
    values: {
      mass: "10",
      angleDegrees: "30",
      gravity: "9.81",
      coefficient: "0",
    },
  },
  {
    label: "Incline with friction",
    solveFor: "netForce" as const,
    values: {
      mass: "10",
      angleDegrees: "30",
      gravity: "9.81",
      coefficient: "0.2",
    },
  },
  {
    label: "Find normal force",
    solveFor: "normalForce" as const,
    values: {
      mass: "8",
      angleDegrees: "25",
      gravity: "9.81",
      coefficient: "0.15",
    },
  },
  {
    label: "Find friction force",
    solveFor: "frictionForce" as const,
    values: {
      mass: "12",
      angleDegrees: "20",
      gravity: "9.81",
      coefficient: "0.3",
    },
  },
] as const;

function parseRequiredNumber(
  rawValue: string,
  label: string,
): number {
  const value = Number(rawValue);

  if (
    rawValue.trim() === "" ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `Enter a valid ${label.toLowerCase()}.`,
    );
  }

  return value;
}

export function InclinedPlaneCalculator() {
  const [values, setValues] =
    useState<FormValues>(initialValues);

  const [solveFor, setSolveFor] =
    useState<InclinedPlaneVariable>(
      "acceleration",
    );

  const [result, setResult] =
    useState<InclinedPlaneResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: keyof FormValues,
    value: string,
  ) {
    setValues((current) => ({
      ...current,
      [field]: value,
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

    try {
      const calculationResult =
        calculateInclinedPlane({
          mass: parseRequiredNumber(
            values.mass,
            "mass",
          ),
          angleDegrees: parseRequiredNumber(
            values.angleDegrees,
            "incline angle",
          ),
          gravity: parseRequiredNumber(
            values.gravity,
            "gravity",
          ),
          coefficient: parseRequiredNumber(
            values.coefficient,
            "coefficient of friction",
          ),
          solveFor,
        });

      setResult(calculationResult);
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
    const calculationResult =
      calculateInclinedPlane({
        mass: Number(example.values.mass),
        angleDegrees: Number(
          example.values.angleDegrees,
        ),
        gravity: Number(
          example.values.gravity,
        ),
        coefficient: Number(
          example.values.coefficient,
        ),
        solveFor: example.solveFor,
      });

    setValues(example.values);
    setSolveFor(example.solveFor);
    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setValues(initialValues);
    setSolveFor("acceleration");
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
              Inclined-plane physics tool
            </p>

            <h2>
              Calculate forces and acceleration
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field">
            <label htmlFor="inclined-plane-output">
              Calculate which result?
            </label>

            <select
              id="inclined-plane-output"
              value={solveFor}
              onChange={(event) => {
                setSolveFor(
                  event.target
                    .value as InclinedPlaneVariable,
                );
                setResult(null);
                setError("");
              }}
            >
              {outputOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="inclined-plane-gravity">
              Gravity (g)
            </label>

            <div className="input-with-suffix">
              <input
                id="inclined-plane-gravity"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                value={values.gravity}
                onChange={(event) =>
                  updateValue(
                    "gravity",
                    event.target.value,
                  )
                }
              />

              <span>m/s²</span>
            </div>

            <p>
              Standard Earth gravity is 9.80665 m/s².
            </p>
          </div>
        </div>

        <div className="density-fields">
          <div className="form-field">
            <label htmlFor="inclined-plane-mass">
              Mass (m)
            </label>

            <div className="input-with-suffix">
              <input
                id="inclined-plane-mass"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                placeholder="Example: 10"
                value={values.mass}
                onChange={(event) =>
                  updateValue(
                    "mass",
                    event.target.value,
                  )
                }
              />

              <span>kg</span>
            </div>

            <p>
              Enter the object&apos;s mass in
              kilograms.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="inclined-plane-angle">
              Incline angle (θ)
            </label>

            <div className="input-with-suffix">
              <input
                id="inclined-plane-angle"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                max="89.999"
                placeholder="Example: 30"
                value={values.angleDegrees}
                onChange={(event) =>
                  updateValue(
                    "angleDegrees",
                    event.target.value,
                  )
                }
              />

              <span>°</span>
            </div>

            <p>
              Enter an angle from 0° to less than 90°.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="inclined-plane-coefficient">
              Coefficient of friction (μ)
            </label>

            <input
              id="inclined-plane-coefficient"
              type="number"
              inputMode="decimal"
              step="any"
              min="0"
              placeholder="Example: 0.2"
              value={values.coefficient}
              onChange={(event) =>
                updateValue(
                  "coefficient",
                  event.target.value,
                )
              }
            />

            <p>
              Enter 0 for a frictionless surface.
            </p>
          </div>
        </div>

        <p className="calculator-unit-note">
          The model assumes the object moves down the
          incline and friction acts up the slope.
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
            {outputLabels[
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
                outputLabels[
                  result.details.solvedVariable
                ]
              }
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              <span>
                {
                  outputUnits[
                    result.details.solvedVariable
                  ]
                }
              </span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Parallel force</dt>
                <dd>
                  {result.details.parallelForce.toFixed(
                    4,
                  )}{" "}
                  N
                </dd>
              </div>

              <div>
                <dt>Normal force</dt>
                <dd>
                  {result.details.normalForce.toFixed(
                    4,
                  )}{" "}
                  N
                </dd>
              </div>

              <div>
                <dt>Friction force</dt>
                <dd>
                  {result.details.frictionForce.toFixed(
                    4,
                  )}{" "}
                  N
                </dd>
              </div>

              <div>
                <dt>Net force</dt>
                <dd>
                  {result.details.netForce.toFixed(4)} N
                </dd>
              </div>

              <div>
                <dt>Acceleration</dt>
                <dd>
                  {result.details.acceleration.toFixed(
                    4,
                  )}{" "}
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
            <span aria-hidden="true">θ</span>

            <h2>
              Your incline result will appear here
            </h2>

            <p>
              Enter mass, angle, gravity, and friction
              coefficient, then select the result to
              calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
