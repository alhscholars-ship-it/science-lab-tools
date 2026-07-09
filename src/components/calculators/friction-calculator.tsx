"use client";

import { useState, type FormEvent } from "react";

import {
  calculateFriction,
  type FrictionDetails,
  type FrictionType,
  type FrictionVariable,
} from "@/lib/calculators/friction";
import type { CalculationResult } from "@/types/calculator";

type FrictionResult =
  CalculationResult<FrictionDetails>;

type FrictionField = {
  key: FrictionVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly FrictionField[] = [
  {
    key: "frictionForce",
    label: "Friction force",
    symbol: "Ff",
    unit: "N",
    description:
      "Force opposing motion or attempted motion.",
  },
  {
    key: "coefficient",
    label: "Coefficient of friction",
    symbol: "μ",
    unit: "",
    description:
      "Dimensionless ratio describing surface friction.",
  },
  {
    key: "normalForce",
    label: "Normal force",
    symbol: "N",
    unit: "N",
    description:
      "Support force perpendicular to the surface.",
  },
];

const variableLabels: Record<
  FrictionVariable,
  string
> = {
  frictionForce: "Friction force",
  coefficient: "Coefficient of friction",
  normalForce: "Normal force",
};

const variableUnits: Record<
  FrictionVariable,
  string
> = {
  frictionForce: "N",
  coefficient: "",
  normalForce: "N",
};

const emptyValues: Record<
  FrictionVariable,
  string
> = {
  frictionForce: "",
  coefficient: "",
  normalForce: "",
};

const examples = [
  {
    label: "Kinetic friction",
    solveFor: "frictionForce" as const,
    frictionType: "kinetic" as const,
    values: {
      frictionForce: "",
      coefficient: "0.3",
      normalForce: "100",
    },
  },
  {
    label: "Static friction",
    solveFor: "frictionForce" as const,
    frictionType: "static" as const,
    values: {
      frictionForce: "",
      coefficient: "0.5",
      normalForce: "80",
    },
  },
  {
    label: "Find coefficient",
    solveFor: "coefficient" as const,
    frictionType: "kinetic" as const,
    values: {
      frictionForce: "25",
      coefficient: "",
      normalForce: "100",
    },
  },
  {
    label: "Find normal force",
    solveFor: "normalForce" as const,
    frictionType: "kinetic" as const,
    values: {
      frictionForce: "30",
      coefficient: "0.3",
      normalForce: "",
    },
  },
] as const;

export function FrictionCalculator() {
  const [solveFor, setSolveFor] =
    useState<FrictionVariable>("frictionForce");

  const [frictionType, setFrictionType] =
    useState<FrictionType>("kinetic");

  const [values, setValues] = useState<
    Record<FrictionVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<FrictionResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: FrictionVariable,
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
    variable: FrictionVariable,
  ) {
    setSolveFor(variable);

    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    setResult(null);
    setError("");
  }

  function changeFrictionType(
    type: FrictionType,
  ) {
    setFrictionType(type);
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
      typeof calculateFriction
    >[0] = {
      solveFor,
      frictionType,
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
        calculateFriction(input);

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
    const input: Parameters<
      typeof calculateFriction
    >[0] = {
      solveFor: example.solveFor,
      frictionType: example.frictionType,
    };

    for (const field of fields) {
      if (field.key === example.solveFor) {
        continue;
      }

      input[field.key] = Number(
        example.values[field.key],
      );
    }

    const calculationResult =
      calculateFriction(input);

    setSolveFor(example.solveFor);
    setFrictionType(example.frictionType);

    setValues({
      ...example.values,
      [example.solveFor]: String(
        calculationResult.value,
      ),
    });

    setResult(calculationResult);
    setError("");
  }

  function resetCalculator() {
    setSolveFor("frictionForce");
    setFrictionType("kinetic");
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
              Surface friction tool
            </p>

            <h2>Solve a friction problem</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field">
            <label htmlFor="friction-type">
              Friction type
            </label>

            <select
              id="friction-type"
              value={frictionType}
              onChange={(event) =>
                changeFrictionType(
                  event.target.value as FrictionType,
                )
              }
            >
              <option value="kinetic">
                Kinetic friction
              </option>

              <option value="static">
                Static friction
              </option>
            </select>

            <p>
              Choose kinetic for sliding motion or static
              for the maximum friction before motion.
            </p>
          </div>

          <div className="form-field">
            <label htmlFor="friction-solve-for">
              Calculate which value?
            </label>

            <select
              id="friction-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as FrictionVariable,
                )
              }
            >
              {fields.map((field) => (
                <option
                  key={field.key}
                  value={field.key}
                >
                  {field.label} ({field.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="density-fields">
          {fields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <div
                className="form-field"
                key={field.key}
              >
                <label
                  htmlFor={`friction-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`friction-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
                        : field.key === "coefficient"
                          ? "Example: 0.3"
                          : "Enter value"
                    }
                    value={values[field.key]}
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                    disabled={isSolvedField}
                    aria-describedby={`friction-${field.key}-help`}
                  />

                  {field.unit ? (
                    <span>{field.unit}</span>
                  ) : null}
                </div>

                <p
                  id={`friction-${field.key}-help`}
                >
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Use newtons for friction and normal force.
          The coefficient of friction has no unit.
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
                variableLabels[
                  result.details.solvedVariable
                ]
              }
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              {variableUnits[
                result.details.solvedVariable
              ] ? (
                <span>
                  {
                    variableUnits[
                      result.details.solvedVariable
                    ]
                  }
                </span>
              ) : null}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Friction type</dt>
                <dd>
                  {result.details.frictionType ===
                  "static"
                    ? "Static"
                    : "Kinetic"}
                </dd>
              </div>

              <div>
                <dt>Friction force</dt>
                <dd>
                  {result.details.frictionForce} N
                </dd>
              </div>

              <div>
                <dt>Coefficient</dt>
                <dd>
                  {result.details.coefficient}
                </dd>
              </div>

              <div>
                <dt>Normal force</dt>
                <dd>
                  {result.details.normalForce} N
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
            <span aria-hidden="true">μ</span>

            <h2>
              Your friction result will appear here
            </h2>

            <p>
              Choose the friction type and missing
              variable, then enter the other two values.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
