"use client";

import { useState, type FormEvent } from "react";

import {
  calculateCoulombsLaw,
  type CoulombsLawDetails,
  type CoulombsLawVariable,
} from "@/lib/calculators/coulombs-law";
import type { CalculationResult } from "@/types/calculator";

type CoulombsLawResult =
  CalculationResult<CoulombsLawDetails>;

type CoulombsLawField = {
  key: CoulombsLawVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly CoulombsLawField[] = [
  {
    key: "force",
    label: "Electrostatic force",
    symbol: "F",
    unit: "N",
    description:
      "The magnitude of the electric force between two point charges.",
  },
  {
    key: "chargeOne",
    label: "First charge",
    symbol: "q₁",
    unit: "C",
    description:
      "The magnitude of the first electric charge in coulombs.",
  },
  {
    key: "chargeTwo",
    label: "Second charge",
    symbol: "q₂",
    unit: "C",
    description:
      "The magnitude of the second electric charge in coulombs.",
  },
  {
    key: "distance",
    label: "Separation distance",
    symbol: "r",
    unit: "m",
    description:
      "The centre-to-centre distance between the two point charges.",
  },
];

const variableLabels: Record<
  CoulombsLawVariable,
  string
> = {
  force: "Electrostatic force",
  chargeOne: "First charge",
  chargeTwo: "Second charge",
  distance: "Separation distance",
};

const variableSymbols: Record<
  CoulombsLawVariable,
  string
> = {
  force: "F",
  chargeOne: "q₁",
  chargeTwo: "q₂",
  distance: "r",
};

const variableUnits: Record<
  CoulombsLawVariable,
  string
> = {
  force: "N",
  chargeOne: "C",
  chargeTwo: "C",
  distance: "m",
};

const emptyValues: Record<
  CoulombsLawVariable,
  string
> = {
  force: "",
  chargeOne: "",
  chargeTwo: "",
  distance: "",
};

const examples = [
  {
    label: "Find force",
    solveFor: "force" as const,
    values: {
      force: "",
      chargeOne: "0.000001",
      chargeTwo: "0.000002",
      distance: "0.05",
    },
  },
  {
    label: "Find first charge",
    solveFor: "chargeOne" as const,
    values: {
      force: "7.19004143384",
      chargeOne: "",
      chargeTwo: "0.000002",
      distance: "0.05",
    },
  },
  {
    label: "Find second charge",
    solveFor: "chargeTwo" as const,
    values: {
      force: "7.19004143384",
      chargeOne: "0.000001",
      chargeTwo: "",
      distance: "0.05",
    },
  },
  {
    label: "Find distance",
    solveFor: "distance" as const,
    values: {
      force: "7.19004143384",
      chargeOne: "0.000001",
      chargeTwo: "0.000002",
      distance: "",
    },
  },
] as const;

export function CoulombsLawCalculator() {
  const [solveFor, setSolveFor] =
    useState<CoulombsLawVariable>("force");

  const [values, setValues] = useState<
    Record<CoulombsLawVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<CoulombsLawResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: CoulombsLawVariable,
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
    variable: CoulombsLawVariable,
  ) {
    setSolveFor(variable);

    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    setResult(null);
    setError("");
  }

  function buildInput(
    selectedVariable: CoulombsLawVariable,
    inputValues: Record<
      CoulombsLawVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateCoulombsLaw
    >[0] = {
      solveFor: selectedVariable,
    };

    for (const field of fields) {
      if (field.key === selectedVariable) {
        continue;
      }

      const rawValue =
        inputValues[field.key].trim();

      const numericValue = Number(rawValue);

      if (
        rawValue === "" ||
        !Number.isFinite(numericValue) ||
        numericValue <= 0
      ) {
        throw new Error(
          `${field.label} must be a number greater than zero.`,
        );
      }

      input[field.key] = numericValue;
    }

    return input;
  }

  function calculate(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setResult(null);

    try {
      const input = buildInput(
        solveFor,
        values,
      );

      const calculationResult =
        calculateCoulombsLaw(input);

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
    try {
      const exampleValues: Record<
        CoulombsLawVariable,
        string
      > = {
        ...example.values,
      };

      const input = buildInput(
        example.solveFor,
        exampleValues,
      );

      const calculationResult =
        calculateCoulombsLaw(input);

      setSolveFor(example.solveFor);

      setValues({
        ...exampleValues,
        [example.solveFor]: String(
          calculationResult.value,
        ),
      });

      setResult(calculationResult);
      setError("");
    } catch (calculationError) {
      setError(
        calculationError instanceof Error
          ? calculationError.message
          : "The example could not be loaded.",
      );
    }
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
              Enter three known electrostatic values
            </p>

            <h2>Solve Coulomb&apos;s law</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="coulombs-law-solve-for">
              Calculate which value?
            </label>

            <select
              id="coulombs-law-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as CoulombsLawVariable,
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
                  htmlFor={`coulombs-law-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`coulombs-law-${field.key}`}
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
                    aria-describedby={`coulombs-law-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p
                  id={`coulombs-law-${field.key}-help`}
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
          Enter charge magnitudes in coulombs and
          separation distance in metres. Scientific
          notation such as 1e-6 is supported.
        </p>

        {error ? (
          <p
            className="calculator-error"
            role="alert"
          >
            {error}
          </p>
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
          <strong>Try an example:</strong>

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
        className="calculator-result"
        aria-live="polite"
        aria-label="Coulomb's law calculation result"
      >
        {result ? (
          <>
            <p className="calculator-result__label">
              Calculated{" "}
              {variableLabels[
                result.details.solvedVariable
              ].toLowerCase()}
            </p>

            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              {
                variableUnits[
                  result.details.solvedVariable
                ]
              }
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Electrostatic force</dt>
                <dd>{result.details.force} N</dd>
              </div>

              <div>
                <dt>First charge</dt>
                <dd>
                  {result.details.chargeOne} C
                </dd>
              </div>

              <div>
                <dt>Second charge</dt>
                <dd>
                  {result.details.chargeTwo} C
                </dd>
              </div>

              <div>
                <dt>Separation distance</dt>
                <dd>
                  {result.details.distance} m
                </dd>
              </div>

              <div>
                <dt>Coulomb constant</dt>
                <dd>
                  {result.details.coulombConstant}
                  {" N·m²/C²"}
                </dd>
              </div>
            </dl>

            <div className="calculator-result__working">
              <p>
                <strong>Formula:</strong>{" "}
                {result.details.formula}
              </p>

              <p>
                <strong>Substitution:</strong>{" "}
                {result.details.substitution}
              </p>

              <p>
                <strong>Result:</strong>{" "}
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
            <p className="calculator-result__label">
              Result
            </p>

            <h2>
              Your electrostatic result will appear
              here
            </h2>

            <p>
              Select the unknown quantity, enter the
              three known positive values, and press
              calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
