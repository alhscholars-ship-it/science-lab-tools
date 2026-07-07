"use client";

import { useState, type FormEvent } from "react";

import {
  calculateKineticEnergy,
  type KineticEnergyDetails,
  type KineticEnergyVariable,
} from "@/lib/calculators/kinetic-energy";
import type { CalculationResult } from "@/types/calculator";

type KineticEnergyResult =
  CalculationResult<KineticEnergyDetails>;

type KineticEnergyField = {
  key: KineticEnergyVariable;
  label: string;
  symbol: string;
  description: string;
};

const fields: readonly KineticEnergyField[] = [
  {
    key: "kineticEnergy",
    label: "Kinetic Energy",
    symbol: "KE",
    description:
      "Energy an object has because of its motion.",
  },
  {
    key: "mass",
    label: "Mass",
    symbol: "m",
    description:
      "Amount of matter in the moving object.",
  },
  {
    key: "speed",
    label: "Speed",
    symbol: "v",
    description:
      "Magnitude of the object's velocity.",
  },
];

const variableLabels: Record<
  KineticEnergyVariable,
  string
> = {
  kineticEnergy: "Kinetic Energy",
  mass: "Mass",
  speed: "Speed",
};

const variableUnits: Record<
  KineticEnergyVariable,
  string
> = {
  kineticEnergy: "J",
  mass: "kg",
  speed: "m/s",
};

const emptyValues: Record<
  KineticEnergyVariable,
  string
> = {
  kineticEnergy: "",
  mass: "",
  speed: "",
};

const examples = [
  {
    label: "Find energy",
    solveFor: "kineticEnergy" as const,
    values: {
      kineticEnergy: "",
      mass: "10",
      speed: "4",
    },
  },
  {
    label: "Find mass",
    solveFor: "mass" as const,
    values: {
      kineticEnergy: "100",
      mass: "",
      speed: "5",
    },
  },
  {
    label: "Find speed",
    solveFor: "speed" as const,
    values: {
      kineticEnergy: "144",
      mass: "8",
      speed: "",
    },
  },
] as const;

export function KineticEnergyCalculator() {
  const [solveFor, setSolveFor] =
    useState<KineticEnergyVariable>(
      "kineticEnergy",
    );

  const [values, setValues] = useState<
    Record<KineticEnergyVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<KineticEnergyResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: KineticEnergyVariable,
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
    variable: KineticEnergyVariable,
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
      typeof calculateKineticEnergy
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
        calculateKineticEnergy(input);

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
      KineticEnergyVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<
      typeof calculateKineticEnergy
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
      calculateKineticEnergy(input);

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
    setSolveFor("kineticEnergy");
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
              Solve a kinetic energy problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="kinetic-energy-solve-for">
              Calculate which value?
            </label>

            <select
              id="kinetic-energy-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as KineticEnergyVariable,
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
                  htmlFor={`kinetic-energy-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`kinetic-energy-${field.key}`}
                    name={field.key}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
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
                    aria-describedby={`kinetic-energy-${field.key}-help`}
                  />

                  <span>
                    {variableUnits[field.key]}
                  </span>
                </div>

                <p
                  id={`kinetic-energy-${field.key}-help`}
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
          Use kilograms for mass, meters per second
          for speed, and joules for kinetic energy.
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
                <dt>Kinetic Energy</dt>
                <dd>
                  {
                    result.details
                      .kineticEnergy
                  }{" "}
                  J
                </dd>
              </div>

              <div>
                <dt>Mass</dt>
                <dd>
                  {result.details.mass} kg
                </dd>
              </div>

              <div>
                <dt>Speed</dt>
                <dd>
                  {result.details.speed} m/s
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
            <span aria-hidden="true">KE</span>

            <h2>
              Your kinetic energy result will
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
