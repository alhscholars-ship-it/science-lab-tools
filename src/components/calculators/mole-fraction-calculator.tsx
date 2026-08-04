"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  calculateMoleFraction,
  getMoleFractionVariableLabel,
  type MoleFractionDetails,
  type MoleFractionVariable,
} from "@/lib/calculators/mole-fraction";
import type { CalculationResult } from "@/types/calculator";

type MoleFractionResult =
  CalculationResult<MoleFractionDetails>;

type MoleFractionField = {
  key: MoleFractionVariable;
  label: string;
  symbol: string;
  description: string;
};

type Example = {
  label: string;
  solveFor: MoleFractionVariable;
  values: Record<MoleFractionVariable, string>;
};

const fields: readonly MoleFractionField[] = [
  {
    key: "componentMoles",
    label: "Component moles",
    symbol: "nᵢ",
    description:
      "Moles of the selected component in the mixture.",
  },
  {
    key: "totalMoles",
    label: "Total moles",
    symbol: "nₜₒₜₐₗ",
    description:
      "Sum of the moles of every component in the mixture.",
  },
  {
    key: "moleFraction",
    label: "Mole fraction",
    symbol: "xᵢ",
    description:
      "Dimensionless fraction between 0 and 1.",
  },
];

const variableSymbols: Record<
  MoleFractionVariable,
  string
> = {
  componentMoles: "nᵢ",
  totalMoles: "nₜₒₜₐₗ",
  moleFraction: "xᵢ",
};

const emptyValues: Record<
  MoleFractionVariable,
  string
> = {
  componentMoles: "",
  totalMoles: "",
  moleFraction: "",
};

const examples: readonly Example[] = [
  {
    label: "Find mole fraction",
    solveFor: "moleFraction",
    values: {
      componentMoles: "2",
      totalMoles: "5",
      moleFraction: "",
    },
  },
  {
    label: "Find component moles",
    solveFor: "componentMoles",
    values: {
      componentMoles: "",
      totalMoles: "8",
      moleFraction: "0.25",
    },
  },
  {
    label: "Find total moles",
    solveFor: "totalMoles",
    values: {
      componentMoles: "1.5",
      totalMoles: "",
      moleFraction: "0.3",
    },
  },
];

function parseKnownValue(
  field: MoleFractionVariable,
  rawValue: string,
): number {
  const value = Number(rawValue);
  const label =
    getMoleFractionVariableLabel(field);

  if (
    rawValue.trim() === "" ||
    !Number.isFinite(value)
  ) {
    throw new Error(
      `Enter a valid ${label.toLowerCase()}.`,
    );
  }

  if (
    field === "componentMoles" &&
    value < 0
  ) {
    throw new Error(
      "Component moles cannot be negative.",
    );
  }

  if (
    field === "totalMoles" &&
    value <= 0
  ) {
    throw new Error(
      "Total moles must be greater than zero.",
    );
  }

  if (
    field === "moleFraction" &&
    (value < 0 || value > 1)
  ) {
    throw new Error(
      "Mole fraction must be between 0 and 1.",
    );
  }

  return value;
}

function formatDetailValue(
  value: number,
): string {
  return value.toLocaleString("en-US", {
    maximumSignificantDigits: 10,
  });
}

export function MoleFractionCalculator() {
  const [solveFor, setSolveFor] =
    useState<MoleFractionVariable>(
      "moleFraction",
    );

  const [values, setValues] =
    useState<
      Record<MoleFractionVariable, string>
    >(emptyValues);

  const [result, setResult] =
    useState<MoleFractionResult | null>(
      null,
    );

  const [error, setError] = useState("");

  function clearFeedback() {
    setResult(null);
    setError("");
  }

  function updateValue(
    field: MoleFractionVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    clearFeedback();
  }

  function changeSolveFor(
    variable: MoleFractionVariable,
  ) {
    setSolveFor(variable);

    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    clearFeedback();
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    clearFeedback();

    try {
      const knownValues: Partial<
        Record<MoleFractionVariable, number>
      > = {};

      for (const field of fields) {
        if (field.key === solveFor) {
          continue;
        }

        knownValues[field.key] =
          parseKnownValue(
            field.key,
            values[field.key],
          );
      }

      const calculationResult =
        calculateMoleFraction({
          componentMoles:
            knownValues.componentMoles,
          totalMoles:
            knownValues.totalMoles,
          moleFraction:
            knownValues.moleFraction,
          solveFor,
        });

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
    example: Example,
  ) {
    const exampleValues = {
      ...example.values,
    };

    const calculationResult =
      calculateMoleFraction({
        componentMoles:
          exampleValues.componentMoles === ""
            ? undefined
            : Number(
                exampleValues.componentMoles,
              ),
        totalMoles:
          exampleValues.totalMoles === ""
            ? undefined
            : Number(
                exampleValues.totalMoles,
              ),
        moleFraction:
          exampleValues.moleFraction === ""
            ? undefined
            : Number(
                exampleValues.moleFraction,
              ),
        solveFor: example.solveFor,
      });

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
    setSolveFor("moleFraction");
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
              Mixture-composition inputs
            </p>

            <h2>
              Calculate mole fraction
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="form-field">
          <label htmlFor="mole-fraction-solve-for">
            Calculate which value?
          </label>

          <select
            id="mole-fraction-solve-for"
            name="solveFor"
            value={solveFor}
            onChange={(event) =>
              changeSolveFor(
                event.target
                  .value as MoleFractionVariable,
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

        <div className="calculator-fields">
          {fields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <div
                className="form-field"
                key={field.key}
              >
                <label htmlFor={field.key}>
                  {field.label} ({field.symbol})
                </label>

                <input
                  id={field.key}
                  name={field.key}
                  type="number"
                  inputMode="decimal"
                  step="any"
                  min="0"
                  max={
                    field.key ===
                    "moleFraction"
                      ? "1"
                      : undefined
                  }
                  placeholder={
                    isSolvedField
                      ? "Calculated automatically"
                      : field.key ===
                          "moleFraction"
                        ? "Example: 0.4"
                        : "Enter moles"
                  }
                  value={values[field.key]}
                  onChange={(event) =>
                    updateValue(
                      field.key,
                      event.target.value,
                    )
                  }
                  disabled={isSolvedField}
                  aria-describedby={
                    `${field.key}-help`
                  }
                />

                <p id={`${field.key}-help`}>
                  {isSolvedField
                    ? "This is the value being calculated."
                    : field.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="calculator-unit-note">
          Enter mole amounts in moles. Mole
          fraction is dimensionless and must be
          between 0 and 1.
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
            Calculate mole fraction
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
              {getMoleFractionVariableLabel(
                result.details.solvedVariable,
              )}
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Component moles</dt>
                <dd>
                  {formatDetailValue(
                    result.details
                      .componentMoles,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>Total moles</dt>
                <dd>
                  {formatDetailValue(
                    result.details.totalMoles,
                  )}{" "}
                  mol
                </dd>
              </div>

              <div>
                <dt>Mole fraction</dt>
                <dd>
                  {formatDetailValue(
                    result.details.moleFraction,
                  )}
                </dd>
              </div>

              <div>
                <dt>Mole percent</dt>
                <dd>
                  {formatDetailValue(
                    result.details.molePercent,
                  )}
                  %
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <h3>Calculation</h3>

              <p>
                {formatDetailValue(
                  result.details.componentMoles,
                )}{" "}
                mol ÷{" "}
                {formatDetailValue(
                  result.details.totalMoles,
                )}{" "}
                mol ={" "}
                {formatDetailValue(
                  result.details.moleFraction,
                )}
              </p>

              <p>
                Formula:{" "}
                {result.details.formula}
              </p>
            </div>
          </>
        ) : (
          <div className="calculator-result__empty">
            <span aria-hidden="true">
              {
                variableSymbols[
                  solveFor
                ]
              }
            </span>

            <h2>
              Your result will appear here
            </h2>

            <p>
              Select the unknown value, enter
              the other two values, and
              calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
