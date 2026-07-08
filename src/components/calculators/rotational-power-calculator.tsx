"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRotationalPower,
  type RotationalPowerDetails,
  type RotationalPowerVariable,
} from "@/lib/calculators/rotational-power";
import type { CalculationResult } from "@/types/calculator";

type RotationalPowerResult =
  CalculationResult<RotationalPowerDetails>;

type RotationalPowerField = {
  key: RotationalPowerVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly RotationalPowerField[] = [
  {
    key: "power",
    label: "Rotational Power",
    symbol: "P",
    description:
      "Rate at which rotational work is performed.",
  },
  {
    key: "torque",
    label: "Torque",
    symbol: "τ",
    description:
      "Turning effect acting around the rotation axis.",
  },
  {
    key: "angularVelocity",
    label: "Angular Velocity",
    symbol: "ω",
    description:
      "Rate of rotation measured in radians per second.",
  },
];

const variableLabels: Record<
  RotationalPowerVariable,
  string
> = {
  power: "Rotational Power",
  torque: "Torque",
  angularVelocity: "Angular Velocity",
};

const variableUnits: Record<
  RotationalPowerVariable,
  string
> = {
  power: "W",
  torque: "N·m",
  angularVelocity: "rad/s",
};

const emptyValues: Record<
  RotationalPowerVariable,
  string
> = {
  power: "",
  torque: "",
  angularVelocity: "",
};

const examples = [
  {
    label: "Find power",
    solveFor: "power" as const,
    values: {
      power: "",
      torque: "12",
      angularVelocity: "5",
    },
  },
  {
    label: "Find torque",
    solveFor: "torque" as const,
    values: {
      power: "60",
      torque: "",
      angularVelocity: "5",
    },
  },
  {
    label: "Find angular velocity",
    solveFor: "angularVelocity" as const,
    values: {
      power: "60",
      torque: "12",
      angularVelocity: "",
    },
  },
] as const;

export function RotationalPowerCalculator() {
  const [solveFor, setSolveFor] =
    useState<RotationalPowerVariable>(
      "power",
    );

  const [values, setValues] = useState<
    Record<RotationalPowerVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<RotationalPowerResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: RotationalPowerVariable,
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
    variable: RotationalPowerVariable,
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
      typeof calculateRotationalPower
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
        calculateRotationalPower(input);

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
      RotationalPowerVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateRotationalPower
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
      calculateRotationalPower(input);

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
    setSolveFor("power");
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
              Solve a rotational power problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="rotational-power-solve-for">
              Calculate which value?
            </label>

            <select
              id="rotational-power-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as RotationalPowerVariable,
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
                      field.key !== "power"
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
                    aria-describedby={`rotational-power-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`rotational-power-${field.key}-help`}
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
          Use watts for rotational power,
          newton-meters for torque, and radians per
          second for angular velocity.
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
                <dt>Rotational Power</dt>
                <dd>
                  {result.details.power} W
                </dd>
              </div>

              <div>
                <dt>Torque</dt>
                <dd>
                  {result.details.torque} N·m
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
            <span aria-hidden="true">P</span>

            <h2>
              Your rotational power result will
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
