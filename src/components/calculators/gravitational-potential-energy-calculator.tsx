"use client";

import { useState, type FormEvent } from "react";

import {
  calculateGravitationalPotentialEnergy,
  type GravitationalPotentialEnergyDetails,
  type GravitationalPotentialEnergyVariable,
} from "@/lib/calculators/gravitational-potential-energy";
import type { CalculationResult } from "@/types/calculator";

type GravitationalPotentialEnergyResult =
  CalculationResult<GravitationalPotentialEnergyDetails>;

type GravitationalPotentialEnergyField = {
  key: GravitationalPotentialEnergyVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly GravitationalPotentialEnergyField[] = [
  {
    key: "potentialEnergy",
    label: "Potential Energy",
    symbol: "PE",
    description:
      "Energy stored because of vertical position.",
  },
  {
    key: "mass",
    label: "Mass",
    symbol: "m",
    description:
      "Positive mass of the object.",
  },
  {
    key: "gravity",
    label: "Gravitational Acceleration",
    symbol: "g",
    description:
      "Positive gravitational acceleration.",
  },
  {
    key: "height",
    label: "Height",
    symbol: "h",
    description:
      "Positive vertical height.",
  },
];

const variableLabels: Record<
  GravitationalPotentialEnergyVariable,
  string
> = {
  potentialEnergy: "Potential Energy",
  mass: "Mass",
  gravity: "Gravitational Acceleration",
  height: "Height",
};

const variableUnits: Record<
  GravitationalPotentialEnergyVariable,
  string
> = {
  potentialEnergy: "J",
  mass: "kg",
  gravity: "m/s²",
  height: "m",
};

const emptyValues: Record<
  GravitationalPotentialEnergyVariable,
  string
> = {
  potentialEnergy: "",
  mass: "",
  gravity: "",
  height: "",
};

const examples = [
  {
    label: "Find energy",
    solveFor: "potentialEnergy" as const,
    values: {
      potentialEnergy: "",
      mass: "10",
      gravity: "9.8",
      height: "5",
    },
  },
  {
    label: "Find mass",
    solveFor: "mass" as const,
    values: {
      potentialEnergy: "980",
      mass: "",
      gravity: "9.8",
      height: "10",
    },
  },
  {
    label: "Find gravity",
    solveFor: "gravity" as const,
    values: {
      potentialEnergy: "490",
      mass: "10",
      gravity: "",
      height: "5",
    },
  },
  {
    label: "Find height",
    solveFor: "height" as const,
    values: {
      potentialEnergy: "980",
      mass: "20",
      gravity: "9.8",
      height: "",
    },
  },
] as const;

export function GravitationalPotentialEnergyCalculator() {
  const [solveFor, setSolveFor] =
    useState<GravitationalPotentialEnergyVariable>(
      "potentialEnergy",
    );

  const [values, setValues] = useState<
    Record<GravitationalPotentialEnergyVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<GravitationalPotentialEnergyResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: GravitationalPotentialEnergyVariable,
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
    variable: GravitationalPotentialEnergyVariable,
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
      typeof calculateGravitationalPotentialEnergy
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
        calculateGravitationalPotentialEnergy(input);

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
      GravitationalPotentialEnergyVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateGravitationalPotentialEnergy
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
      calculateGravitationalPotentialEnergy(input);

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
    setSolveFor("potentialEnergy");
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
            <label htmlFor="gravitational-potential-energy-solve-for">
              Calculate which value?
            </label>

            <select
              id="gravitational-potential-energy-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as GravitationalPotentialEnergyVariable,
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
                      field.key !== "potentialEnergy"
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
                    aria-describedby={`gravitational-potential-energy-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`gravitational-potential-energy-${field.key}-help`}
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
          Use joules for energy, kilograms for mass,
          m/s² for gravity, and meters for height.
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
                <dt>Potential Energy</dt>
                <dd>{result.details.potentialEnergy} J</dd>
              </div>

              <div>
                <dt>Mass</dt>
                <dd>{result.details.mass} kg</dd>
              </div>

              <div>
                <dt>Gravitational Acceleration</dt>
                <dd>{result.details.gravity} m/s²</dd>
              </div>

              <div>
                <dt>Height</dt>
                <dd>{result.details.height} m</dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Formula</h3>
              <p>{result.details.formula}</p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">PE</span>

            <h2>
              Your potential energy result will
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
