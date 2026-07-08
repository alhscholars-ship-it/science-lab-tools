"use client";

import { useState, type FormEvent } from "react";

import {
  calculateCentripetalForce,
  type CentripetalForceDetails,
  type CentripetalForceVariable,
} from "@/lib/calculators/centripetal-force";
import type { CalculationResult } from "@/types/calculator";

type CentripetalForceResult =
  CalculationResult<CentripetalForceDetails>;

type CentripetalForceField = {
  key: CentripetalForceVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly CentripetalForceField[] = [
  {
    key: "centripetalForce",
    label: "Centripetal Force",
    symbol: "Fc",
    description:
      "Inward force required for circular motion.",
  },
  {
    key: "mass",
    label: "Mass",
    symbol: "m",
    description:
      "Positive mass of the moving object.",
  },
  {
    key: "velocity",
    label: "Velocity",
    symbol: "v",
    description:
      "Positive tangential speed of the object.",
  },
  {
    key: "radius",
    label: "Radius",
    symbol: "r",
    description:
      "Positive radius of the circular path.",
  },
];

const variableLabels: Record<
  CentripetalForceVariable,
  string
> = {
  centripetalForce: "Centripetal Force",
  mass: "Mass",
  velocity: "Velocity",
  radius: "Radius",
};

const variableUnits: Record<
  CentripetalForceVariable,
  string
> = {
  centripetalForce: "N",
  mass: "kg",
  velocity: "m/s",
  radius: "m",
};

const emptyValues: Record<
  CentripetalForceVariable,
  string
> = {
  centripetalForce: "",
  mass: "",
  velocity: "",
  radius: "",
};

const examples = [
  {
    label: "Find force",
    solveFor: "centripetalForce" as const,
    values: {
      centripetalForce: "",
      mass: "4",
      velocity: "6",
      radius: "3",
    },
  },
  {
    label: "Find mass",
    solveFor: "mass" as const,
    values: {
      centripetalForce: "48",
      mass: "",
      velocity: "6",
      radius: "3",
    },
  },
  {
    label: "Find velocity",
    solveFor: "velocity" as const,
    values: {
      centripetalForce: "48",
      mass: "4",
      velocity: "",
      radius: "3",
    },
  },
  {
    label: "Find radius",
    solveFor: "radius" as const,
    values: {
      centripetalForce: "48",
      mass: "4",
      velocity: "6",
      radius: "",
    },
  },
] as const;

export function CentripetalForceCalculator() {
  const [solveFor, setSolveFor] =
    useState<CentripetalForceVariable>(
      "centripetalForce",
    );

  const [values, setValues] = useState<
    Record<CentripetalForceVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<CentripetalForceResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: CentripetalForceVariable,
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
    variable: CentripetalForceVariable,
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
      typeof calculateCentripetalForce
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
        calculateCentripetalForce(input);

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
      CentripetalForceVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateCentripetalForce
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
      calculateCentripetalForce(input);

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
    setSolveFor("centripetalForce");
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
              Enter two known values
            </p>

            <h2>
              Solve a centripetal force problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="centripetal-force-solve-for">
              Calculate which value?
            </label>

            <select
              id="centripetal-force-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as CentripetalForceVariable,
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
                  htmlFor={`work-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`work-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={
                      field.key !== "centripetalForce"
                        ? "0"
                        : undefined
                    }
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
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
                    aria-describedby={`centripetal-force-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`centripetal-force-${field.key}-help`}
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
          Use newtons for centripetal force,
          kilograms for mass, meters per second for
          velocity, and meters for radius.
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
              <span>
                {
                  variableUnits[
                    result.details
                      .solvedVariable
                  ]
                }
              </span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Centripetal Force</dt>
                <dd>
                  {result.details.centripetalForce} N
                </dd>
              </div>

              <div>
                <dt>Mass</dt>
                <dd>
                  {result.details.mass} kg
                </dd>
              </div>

              <div>
                <dt>Velocity</dt>
                <dd>
                  {result.details.velocity} m/s
                </dd>
              </div>

              <div>
                <dt>Radius</dt>
                <dd>
                  {result.details.radius} m
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
            <span aria-hidden="true">Fc</span>

            <h2>
              Your centripetal force result will
              appear here
            </h2>

            <p>
              Choose the missing variable and enter
              the other two known values.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
