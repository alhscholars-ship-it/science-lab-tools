"use client";

import { useState, type FormEvent } from "react";

import {
  calculatePulley,
  type PulleyDetails,
  type PulleyVariable,
} from "@/lib/calculators/pulley";
import type { CalculationResult } from "@/types/calculator";

type PulleyResult =
  CalculationResult<PulleyDetails>;

type FormValues = {
  loadMass: string;
  supportingSegments: string;
  loadDistance: string;
  gravity: string;
};

const outputOptions: Array<{
  value: PulleyVariable;
  label: string;
}> = [
  {
    value: "loadForce",
    label: "Load force",
  },
  {
    value: "mechanicalAdvantage",
    label: "Ideal mechanical advantage",
  },
  {
    value: "effortForce",
    label: "Required effort force",
  },
  {
    value: "inputDistance",
    label: "Input rope distance",
  },
];

const outputLabels: Record<
  PulleyVariable,
  string
> = {
  loadForce: "Load force",
  mechanicalAdvantage:
    "Ideal mechanical advantage",
  effortForce: "Required effort force",
  inputDistance: "Input rope distance",
};

const outputUnits: Record<
  PulleyVariable,
  string
> = {
  loadForce: "N",
  mechanicalAdvantage: "",
  effortForce: "N",
  inputDistance: "m",
};

const initialValues: FormValues = {
  loadMass: "",
  supportingSegments: "2",
  loadDistance: "1",
  gravity: "9.80665",
};

const examples = [
  {
    label: "Single fixed pulley",
    solveFor: "effortForce" as const,
    values: {
      loadMass: "10",
      supportingSegments: "1",
      loadDistance: "1",
      gravity: "9.81",
    },
  },
  {
    label: "Two supporting segments",
    solveFor: "effortForce" as const,
    values: {
      loadMass: "20",
      supportingSegments: "2",
      loadDistance: "1",
      gravity: "9.81",
    },
  },
  {
    label: "Four-part system",
    solveFor: "mechanicalAdvantage" as const,
    values: {
      loadMass: "40",
      supportingSegments: "4",
      loadDistance: "0.5",
      gravity: "9.81",
    },
  },
  {
    label: "Find rope distance",
    solveFor: "inputDistance" as const,
    values: {
      loadMass: "25",
      supportingSegments: "3",
      loadDistance: "2",
      gravity: "9.81",
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

export function PulleyCalculator() {
  const [values, setValues] =
    useState<FormValues>(initialValues);

  const [solveFor, setSolveFor] =
    useState<PulleyVariable>("effortForce");

  const [result, setResult] =
    useState<PulleyResult | null>(null);

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
        calculatePulley({
          loadMass: parseRequiredNumber(
            values.loadMass,
            "load mass",
          ),
          supportingSegments:
            parseRequiredNumber(
              values.supportingSegments,
              "supporting rope segments",
            ),
          loadDistance: parseRequiredNumber(
            values.loadDistance,
            "load distance",
          ),
          gravity: parseRequiredNumber(
            values.gravity,
            "gravity",
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
      calculatePulley({
        loadMass: Number(
          example.values.loadMass,
        ),
        supportingSegments: Number(
          example.values.supportingSegments,
        ),
        loadDistance: Number(
          example.values.loadDistance,
        ),
        gravity: Number(
          example.values.gravity,
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
    setSolveFor("effortForce");
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
              Ideal pulley-system tool
            </p>

            <h2>
              Calculate pulley force and advantage
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field">
            <label htmlFor="pulley-output">
              Calculate which result?
            </label>

            <select
              id="pulley-output"
              value={solveFor}
              onChange={(event) => {
                setSolveFor(
                  event.target.value as PulleyVariable,
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
            <label htmlFor="pulley-gravity">
              Gravity (g)
            </label>

            <div className="input-with-suffix">
              <input
                id="pulley-gravity"
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
            <label htmlFor="pulley-load-mass">
              Load mass (m)
            </label>

            <div className="input-with-suffix">
              <input
                id="pulley-load-mass"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                placeholder="Example: 20"
                value={values.loadMass}
                onChange={(event) =>
                  updateValue(
                    "loadMass",
                    event.target.value,
                  )
                }
              />

              <span>kg</span>
            </div>

            <p>
              Enter the mass being lifted.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="pulley-segments">
              Supporting rope segments (n)
            </label>

            <input
              id="pulley-segments"
              type="number"
              inputMode="numeric"
              step="1"
              min="1"
              placeholder="Example: 2"
              value={values.supportingSegments}
              onChange={(event) =>
                updateValue(
                  "supportingSegments",
                  event.target.value,
                )
              }
            />

            <p>
              Count the rope sections directly
              supporting the moving load.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="pulley-load-distance">
              Load lift distance (dl)
            </label>

            <div className="input-with-suffix">
              <input
                id="pulley-load-distance"
                type="number"
                inputMode="decimal"
                step="any"
                min="0"
                placeholder="Example: 1"
                value={values.loadDistance}
                onChange={(event) =>
                  updateValue(
                    "loadDistance",
                    event.target.value,
                  )
                }
              />

              <span>m</span>
            </div>

            <p>
              Distance the load must move upward.
            </p>
          </div>
        </div>

        <p className="calculator-unit-note">
          This calculator assumes an ideal,
          frictionless pulley system with a massless
          rope and pulleys.
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
              {outputUnits[
                result.details.solvedVariable
              ] ? (
                <span>
                  {
                    outputUnits[
                      result.details.solvedVariable
                    ]
                  }
                </span>
              ) : null}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Load force</dt>
                <dd>
                  {result.details.loadForce.toFixed(4)} N
                </dd>
              </div>

              <div>
                <dt>Mechanical advantage</dt>
                <dd>
                  {
                    result.details
                      .mechanicalAdvantage
                  }
                </dd>
              </div>

              <div>
                <dt>Effort force</dt>
                <dd>
                  {result.details.effortForce.toFixed(4)}{" "}
                  N
                </dd>
              </div>

              <div>
                <dt>Input rope distance</dt>
                <dd>
                  {result.details.inputDistance.toFixed(
                    4,
                  )}{" "}
                  m
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
            <span aria-hidden="true">IMA</span>

            <h2>
              Your pulley result will appear here
            </h2>

            <p>
              Enter load mass, supporting rope
              segments, lift distance, and gravity.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
