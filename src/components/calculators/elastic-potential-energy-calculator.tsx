"use client";

import { useState, type FormEvent } from "react";

import {
  calculateElasticPotentialEnergy,
  type ElasticPotentialEnergyDetails,
  type ElasticPotentialEnergyVariable,
} from "@/lib/calculators/elastic-potential-energy";
import type { CalculationResult } from "@/types/calculator";

type ElasticPotentialEnergyResult =
  CalculationResult<ElasticPotentialEnergyDetails>;

type ElasticPotentialEnergyField = {
  key: ElasticPotentialEnergyVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly ElasticPotentialEnergyField[] = [
  {
    key: "elasticEnergy",
    label: "Elastic Potential Energy",
    symbol: "E",
    description:
      "Energy stored in a stretched or compressed spring.",
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
  ElasticPotentialEnergyVariable,
  string
> = {
  elasticEnergy: "Elastic Potential Energy",
  springConstant: "Spring Constant",
  extension: "Extension",
};

const variableUnits: Record<
  ElasticPotentialEnergyVariable,
  string
> = {
  elasticEnergy: "J",
  springConstant: "N/m",
  extension: "m",
};

const emptyValues: Record<
  ElasticPotentialEnergyVariable,
  string
> = {
  elasticEnergy: "",
  springConstant: "",
  extension: "",
};

const examples = [
  {
    label: "Find energy",
    solveFor: "elasticEnergy" as const,
    values: {
      elasticEnergy: "",
      springConstant: "200",
      extension: "0.5",
    },
  },
  {
    label: "Find spring constant",
    solveFor: "springConstant" as const,
    values: {
      elasticEnergy: "36",
      springConstant: "",
      extension: "0.6",
    },
  },
  {
    label: "Find extension",
    solveFor: "extension" as const,
    values: {
      elasticEnergy: "40",
      springConstant: "320",
      extension: "",
    },
  },
] as const;

export function ElasticPotentialEnergyCalculator() {
  const [solveFor, setSolveFor] =
    useState<ElasticPotentialEnergyVariable>(
      "elasticEnergy",
    );

  const [values, setValues] = useState<
    Record<ElasticPotentialEnergyVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<ElasticPotentialEnergyResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: ElasticPotentialEnergyVariable,
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
    variable: ElasticPotentialEnergyVariable,
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
      typeof calculateElasticPotentialEnergy
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
        calculateElasticPotentialEnergy(input);

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
      ElasticPotentialEnergyVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateElasticPotentialEnergy
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
      calculateElasticPotentialEnergy(input);

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
    setSolveFor("elasticEnergy");
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
              Solve an elastic energy problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="elastic-potential-energy-solve-for">
              Calculate which value?
            </label>

            <select
              id="elastic-potential-energy-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as ElasticPotentialEnergyVariable,
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
                      field.key !== "elasticEnergy"
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
                    aria-describedby={`elastic-potential-energy-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`elastic-potential-energy-${field.key}-help`}
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
          Use joules for energy, newtons per meter for
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
                <dt>Elastic Potential Energy</dt>
                <dd>
                  {result.details.elasticEnergy} J
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
            <span aria-hidden="true">E</span>

            <h2>
              Your elastic energy result will
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
