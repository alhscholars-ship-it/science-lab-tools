"use client";

import { useState, type FormEvent } from "react";

import {
  calculateMassMoles,
  type MassMolesDetails,
  type MassMolesVariable,
} from "@/lib/calculators/mass-moles";
import type { CalculationResult } from "@/types/calculator";

type MassMolesResult = CalculationResult<MassMolesDetails>;

type MassMolesField = {
  key: MassMolesVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly MassMolesField[] = [
  {
    key: "mass",
    label: "Mass",
    symbol: "m",
    unit: "g",
    description: "Mass of the chemical sample in grams.",
  },
  {
    key: "moles",
    label: "Moles",
    symbol: "n",
    unit: "mol",
    description: "Amount of substance measured in moles.",
  },
  {
    key: "molarMass",
    label: "Molar mass",
    symbol: "M",
    unit: "g/mol",
    description: "Mass of one mole of the substance.",
  },
];

const variableLabels: Record<MassMolesVariable, string> = {
  mass: "Mass",
  moles: "Moles",
  molarMass: "Molar mass",
};

const variableSymbols: Record<MassMolesVariable, string> = {
  mass: "m",
  moles: "n",
  molarMass: "M",
};

const variableUnits: Record<MassMolesVariable, string> = {
  mass: "g",
  moles: "mol",
  molarMass: "g/mol",
};

const emptyValues: Record<MassMolesVariable, string> = {
  mass: "",
  moles: "",
  molarMass: "",
};

const examples = [
  {
    label: "Find moles",
    solveFor: "moles" as const,
    values: {
      mass: "36.03",
      moles: "",
      molarMass: "18.015",
    },
  },
  {
    label: "Find mass",
    solveFor: "mass" as const,
    values: {
      mass: "",
      moles: "2",
      molarMass: "18.015",
    },
  },
] as const;

export function MassMolesCalculator() {
  const [solveFor, setSolveFor] =
    useState<MassMolesVariable>("moles");

  const [values, setValues] =
    useState<Record<MassMolesVariable, string>>(emptyValues);

  const [result, setResult] =
    useState<MassMolesResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: MassMolesVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));
    setResult(null);
    setError("");
  }

  function changeSolveFor(variable: MassMolesVariable) {
    setSolveFor(variable);
    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));
    setResult(null);
    setError("");
  }

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    const input: Parameters<typeof calculateMassMoles>[0] = {
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
        calculateMassMoles(input);

      setResult(calculationResult);
      setValues((currentValues) => ({
        ...currentValues,
        [solveFor]: String(calculationResult.value),
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
      MassMolesVariable,
      string
    > = {
      ...example.values,
    };

    const input: Parameters<typeof calculateMassMoles>[0] = {
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
      calculateMassMoles(input);

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
    setSolveFor("moles");
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
            <h2>Solve a mass and moles problem</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="mass-moles-solve-for">
              Calculate which value?
            </label>

            <select
              id="mass-moles-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target.value as MassMolesVariable,
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
                  htmlFor={`mass-moles-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`mass-moles-${field.key}`}
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
                    aria-describedby={`mass-moles-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p
                  id={`mass-moles-${field.key}-help`}
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
          Enter mass in grams and molar mass in grams per
          mole. The calculator does not convert between
          other mass units.
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
              onClick={() => loadExample(example)}
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
              <span className="calculator-result__unit">
                {
                  variableUnits[
                    result.details.solvedVariable
                  ]
                }
              </span>
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Mass (m)</dt>
                <dd>
                  {result.details.mass} g
                </dd>
              </div>

              <div>
                <dt>Moles (n)</dt>
                <dd>
                  {result.details.moles} mol
                </dd>
              </div>

              <div>
                <dt>Molar mass (M)</dt>
                <dd>
                  {result.details.molarMass} g/mol
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Solved variable</h3>
              <p>
                {
                  variableSymbols[
                    result.details.solvedVariable
                  ]
                }{" "}
                = {result.formattedValue}{" "}
                {
                  variableUnits[
                    result.details.solvedVariable
                  ]
                }
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">n</span>
            <h2>Your result will appear here</h2>
            <p>
              Select the missing variable and enter the
              other two chemistry values.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
