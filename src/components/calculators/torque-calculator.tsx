"use client";

import { useState, type FormEvent } from "react";

import {
  calculateTorque,
  type TorqueDetails,
  type TorqueVariable,
} from "@/lib/calculators/torque";
import type { CalculationResult } from "@/types/calculator";

type TorqueResult =
  CalculationResult<TorqueDetails>;

type TorqueField = {
  key: TorqueVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly TorqueField[] = [
  {
    key: "torque",
    label: "Torque",
    symbol: "τ",
    description:
      "Turning effect produced by a perpendicular force.",
  },
  {
    key: "force",
    label: "Force",
    symbol: "F",
    description:
      "Positive perpendicular force applied to the lever.",
  },
  {
    key: "leverArm",
    label: "Lever Arm",
    symbol: "r",
    description:
      "Perpendicular distance from the pivot to the force.",
  },
];

const variableLabels: Record<
  TorqueVariable,
  string
> = {
  torque: "Torque",
  force: "Force",
  leverArm: "Lever Arm",
};

const variableUnits: Record<
  TorqueVariable,
  string
> = {
  torque: "N·m",
  force: "N",
  leverArm: "m",
};

const emptyValues: Record<
  TorqueVariable,
  string
> = {
  torque: "",
  force: "",
  leverArm: "",
};

const examples = [
  {
    label: "Find torque",
    solveFor: "torque" as const,
    values: {
      torque: "",
      force: "80",
      leverArm: "0.5",
    },
  },
  {
    label: "Find force",
    solveFor: "force" as const,
    values: {
      torque: "60",
      force: "",
      leverArm: "0.75",
    },
  },
  {
    label: "Find lever arm",
    solveFor: "leverArm" as const,
    values: {
      torque: "90",
      force: "150",
      leverArm: "",
    },
  },
] as const;

export function TorqueCalculator() {
  const [solveFor, setSolveFor] =
    useState<TorqueVariable>(
      "torque",
    );

  const [values, setValues] = useState<
    Record<TorqueVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<TorqueResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: TorqueVariable,
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
    variable: TorqueVariable,
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
      typeof calculateTorque
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
        calculateTorque(input);

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
      TorqueVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateTorque
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
      calculateTorque(input);

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
    setSolveFor("torque");
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
              Solve a torque problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="torque-solve-for">
              Calculate which value?
            </label>

            <select
              id="torque-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as TorqueVariable,
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
                      field.key !== "torque"
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
                    aria-describedby={`torque-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`torque-${field.key}-help`}
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
          Use newton-meters for torque, newtons for
          force, and meters for the lever arm.
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
                <dt>Torque</dt>
                <dd>
                  {result.details.torque} N·m
                </dd>
              </div>

              <div>
                <dt>Force</dt>
                <dd>
                  {result.details.force} N
                </dd>
              </div>

              <div>
                <dt>Lever Arm</dt>
                <dd>
                  {result.details.leverArm} m
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
            <span aria-hidden="true">τ</span>

            <h2>
              Your torque result will
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
