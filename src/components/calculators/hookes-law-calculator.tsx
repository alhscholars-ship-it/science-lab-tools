"use client";

import { useState, type FormEvent } from "react";

import {
  calculateHookesLaw,
  type HookesLawDetails,
  type HookesLawVariable,
} from "@/lib/calculators/hookes-law";
import type { CalculationResult } from "@/types/calculator";

type HookesLawResult =
  CalculationResult<HookesLawDetails>;

type HookesLawField = {
  key: HookesLawVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly HookesLawField[] = [
  {
    key: "force",
    label: "Force",
    symbol: "F",
    description:
      "Force applied to the spring.",
  },
  {
    key: "springConstant",
    label: "Spring Constant",
    symbol: "k",
    description:
      "Positive stiffness of the spring.",
  },
  {
    key: "extension",
    label: "Extension",
    symbol: "x",
    description:
      "Positive extension or compression from equilibrium.",
  },
];

const variableLabels: Record<
  HookesLawVariable,
  string
> = {
  force: "Force",
  springConstant: "Spring Constant",
  extension: "Extension",
};

const variableUnits: Record<
  HookesLawVariable,
  string
> = {
  force: "N",
  springConstant: "N/m",
  extension: "m",
};

const emptyValues: Record<
  HookesLawVariable,
  string
> = {
  force: "",
  springConstant: "",
  extension: "",
};

const examples = [
  {
    label: "Find force",
    solveFor: "force" as const,
    values: {
      force: "",
      springConstant: "200",
      extension: "0.3",
    },
  },
  {
    label: "Find spring constant",
    solveFor: "springConstant" as const,
    values: {
      force: "80",
      springConstant: "",
      extension: "0.4",
    },
  },
  {
    label: "Find extension",
    solveFor: "extension" as const,
    values: {
      force: "90",
      springConstant: "300",
      extension: "",
    },
  },
] as const;

export function HookesLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<HookesLawVariable>(
      "force",
    );

  const [values, setValues] = useState<
    Record<HookesLawVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<HookesLawResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: HookesLawVariable,
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
    variable: HookesLawVariable,
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
      typeof calculateHookesLaw
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
        calculateHookesLaw(input);

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
      HookesLawVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateHookesLaw
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
      calculateHookesLaw(input);

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
    setSolveFor("force");
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
              Solve a Hooke&apos;s law problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="hookes-law-solve-for">
              Calculate which value?
            </label>

            <select
              id="hookes-law-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as HookesLawVariable,
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
                      field.key !== "force"
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
                    aria-describedby={`hookes-law-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`hookes-law-${field.key}-help`}
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
          Use newtons for force, newtons per meter for
          spring constant, and meters for extension.
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
                <dt>Force</dt>
                <dd>
                  {result.details.force} N
                </dd>
              </div>

              <div>
                <dt>Spring Constant</dt>
                <dd>
                  {result.details.springConstant} N/m
                </dd>
              </div>

              <div>
                <dt>Extension</dt>
                <dd>
                  {result.details.extension} m
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
            <span aria-hidden="true">F</span>

            <h2>
              Your Hooke&apos;s law result will
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
