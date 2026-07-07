"use client";

import { useState, type FormEvent } from "react";

import {
  calculatePower,
  type PowerDetails,
  type PowerVariable,
} from "@/lib/calculators/power";
import type { CalculationResult } from "@/types/calculator";

type PowerResult =
  CalculationResult<PowerDetails>;

type PowerField = {
  key: PowerVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly PowerField[] = [
  {
    key: "power",
    label: "Power",
    symbol: "P",
    description:
      "Rate at which work is completed or energy is transferred.",
  },
  {
    key: "work",
    label: "Work",
    symbol: "W",
    description:
      "Work completed or energy transferred.",
  },
  {
    key: "time",
    label: "Time",
    symbol: "t",
    description:
      "Positive duration over which the work is completed.",
  },
];

const variableLabels: Record<
  PowerVariable,
  string
> = {
  power: "Power",
  work: "Work",
  time: "Time",
};

const variableUnits: Record<
  PowerVariable,
  string
> = {
  power: "W",
  work: "J",
  time: "s",
};

const emptyValues: Record<
  PowerVariable,
  string
> = {
  power: "",
  work: "",
  time: "",
};

const examples = [
  {
    label: "Find power",
    solveFor: "power" as const,
    values: {
      power: "",
      work: "600",
      time: "12",
    },
  },
  {
    label: "Find work",
    solveFor: "work" as const,
    values: {
      power: "75",
      work: "",
      time: "4",
    },
  },
  {
    label: "Find time",
    solveFor: "time" as const,
    values: {
      power: "150",
      work: "900",
      time: "",
    },
  },
] as const;

export function PowerCalculator() {
  const [solveFor, setSolveFor] =
    useState<PowerVariable>(
      "power",
    );

  const [values, setValues] = useState<
    Record<PowerVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<PowerResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: PowerVariable,
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
    variable: PowerVariable,
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
      typeof calculatePower
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
        calculatePower(input);

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
      PowerVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculatePower
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
      calculatePower(input);

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
    setSolveFor("work");
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
              Solve a work problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="power-solve-for">
              Calculate which value?
            </label>

            <select
              id="power-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as PowerVariable,
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
                      field.key === "time"
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
                    aria-describedby={`power-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`power-${field.key}-help`}
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
          Use watts for power, joules for work,
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
                <dt>Power</dt>
                <dd>
                  {
                    result.details
                      .power
                  }{" "}
                  W
                </dd>
              </div>

              <div>
                <dt>Work</dt>
                <dd>
                  {result.details.work} J
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
            <span aria-hidden="true">P</span>

            <h2>
              Your power result will
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
