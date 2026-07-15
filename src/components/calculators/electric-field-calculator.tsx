"use client";

import { useState, type FormEvent } from "react";

import {
  calculateElectricField,
  type ElectricFieldDetails,
  type ElectricFieldMode,
  type ElectricFieldVariable,
} from "@/lib/calculators/electric-field";
import type { CalculationResult } from "@/types/calculator";

type ElectricFieldResult =
  CalculationResult<ElectricFieldDetails>;

type FieldDefinition = {
  key: ElectricFieldVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const forceChargeFields: readonly FieldDefinition[] = [
  {
    key: "electricField",
    label: "Electric field strength",
    symbol: "E",
    unit: "N/C",
    description:
      "Force experienced per unit positive test charge.",
  },
  {
    key: "force",
    label: "Electric force",
    symbol: "F",
    unit: "N",
    description:
      "Electric force acting on the test charge.",
  },
  {
    key: "testCharge",
    label: "Test charge",
    symbol: "q",
    unit: "C",
    description:
      "Magnitude of the test charge in coulombs.",
  },
];

const pointChargeFields: readonly FieldDefinition[] = [
  {
    key: "electricField",
    label: "Electric field strength",
    symbol: "E",
    unit: "N/C",
    description:
      "Electric field magnitude at the observation point.",
  },
  {
    key: "sourceCharge",
    label: "Source charge",
    symbol: "Q",
    unit: "C",
    description:
      "Magnitude of the point charge producing the field.",
  },
  {
    key: "distance",
    label: "Distance",
    symbol: "r",
    unit: "m",
    description:
      "Distance from the source charge to the observation point.",
  },
];

const variableLabels: Record<
  ElectricFieldVariable,
  string
> = {
  electricField: "Electric field strength",
  force: "Electric force",
  testCharge: "Test charge",
  sourceCharge: "Source charge",
  distance: "Distance",
};

const variableSymbols: Record<
  ElectricFieldVariable,
  string
> = {
  electricField: "E",
  force: "F",
  testCharge: "q",
  sourceCharge: "Q",
  distance: "r",
};

const variableUnits: Record<
  ElectricFieldVariable,
  string
> = {
  electricField: "N/C",
  force: "N",
  testCharge: "C",
  sourceCharge: "C",
  distance: "m",
};

const emptyValues: Record<
  ElectricFieldVariable,
  string
> = {
  electricField: "",
  force: "",
  testCharge: "",
  sourceCharge: "",
  distance: "",
};

const examples = [
  {
    label: "Field from force",
    mode: "forceCharge" as const,
    solveFor: "electricField" as const,
    values: {
      ...emptyValues,
      force: "0.02",
      testCharge: "0.000004",
    },
  },
  {
    label: "Find force",
    mode: "forceCharge" as const,
    solveFor: "force" as const,
    values: {
      ...emptyValues,
      electricField: "5000",
      testCharge: "0.000004",
    },
  },
  {
    label: "Field from point charge",
    mode: "pointCharge" as const,
    solveFor: "electricField" as const,
    values: {
      ...emptyValues,
      sourceCharge: "0.000002",
      distance: "0.05",
    },
  },
  {
    label: "Find distance",
    mode: "pointCharge" as const,
    solveFor: "distance" as const,
    values: {
      ...emptyValues,
      electricField: "7190041.43384",
      sourceCharge: "0.000002",
    },
  },
] as const;

function getModeFields(
  mode: ElectricFieldMode,
) {
  return mode === "forceCharge"
    ? forceChargeFields
    : pointChargeFields;
}

function getDefaultSolveFor(
  mode: ElectricFieldMode,
): ElectricFieldVariable {
  return mode === "forceCharge"
    ? "electricField"
    : "electricField";
}

export function ElectricFieldCalculator() {
  const [mode, setMode] =
    useState<ElectricFieldMode>("forceCharge");

  const [solveFor, setSolveFor] =
    useState<ElectricFieldVariable>(
      "electricField",
    );

  const [values, setValues] = useState<
    Record<ElectricFieldVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<ElectricFieldResult | null>(null);

  const [error, setError] = useState("");

  const activeFields = getModeFields(mode);

  function updateValue(
    field: ElectricFieldVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setResult(null);
    setError("");
  }

  function changeMode(
    selectedMode: ElectricFieldMode,
  ) {
    setMode(selectedMode);
    setSolveFor(
      getDefaultSolveFor(selectedMode),
    );
    setValues(emptyValues);
    setResult(null);
    setError("");
  }

  function changeSolveFor(
    variable: ElectricFieldVariable,
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
    selectedMode: ElectricFieldMode,
    selectedVariable: ElectricFieldVariable,
    inputValues: Record<
      ElectricFieldVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateElectricField
    >[0] = {
      mode: selectedMode,
      solveFor: selectedVariable,
    };

    for (const field of getModeFields(
      selectedMode,
    )) {
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
      const calculationResult =
        calculateElectricField(
          buildInput(
            mode,
            solveFor,
            values,
          ),
        );

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
      const calculationResult =
        calculateElectricField(
          buildInput(
            example.mode,
            example.solveFor,
            example.values,
          ),
        );

      setMode(example.mode);
      setSolveFor(example.solveFor);

      setValues({
        ...example.values,
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
    setMode("forceCharge");
    setSolveFor("electricField");
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
              Select an electric-field model
            </p>

            <h2>Calculate electric field values</h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field">
            <label htmlFor="electric-field-mode">
              Calculation mode
            </label>

            <select
              id="electric-field-mode"
              value={mode}
              onChange={(event) =>
                changeMode(
                  event.target
                    .value as ElectricFieldMode,
                )
              }
            >
              <option value="forceCharge">
                Force and test charge
              </option>

              <option value="pointCharge">
                Point source charge
              </option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="electric-field-solve-for">
              Calculate which value?
            </label>

            <select
              id="electric-field-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as ElectricFieldVariable,
                )
              }
            >
              {activeFields.map((field) => (
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
          {activeFields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <div
                className="form-field"
                key={field.key}
              >
                <label
                  htmlFor={`electric-field-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`electric-field-${field.key}`}
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
                    aria-describedby={`electric-field-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p
                  id={`electric-field-${field.key}-help`}
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
          Enter positive SI values. Scientific
          notation such as 2e-6 is supported.
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
        aria-label="Electric field calculation result"
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
                <dt>Calculation mode</dt>
                <dd>
                  {result.details.mode ===
                  "forceCharge"
                    ? "Force and test charge"
                    : "Point source charge"}
                </dd>
              </div>

              <div>
                <dt>Electric field</dt>
                <dd>
                  {result.details.electricField} N/C
                </dd>
              </div>

              {result.details.force !== undefined ? (
                <div>
                  <dt>Electric force</dt>
                  <dd>{result.details.force} N</dd>
                </div>
              ) : null}

              {result.details.testCharge !==
              undefined ? (
                <div>
                  <dt>Test charge</dt>
                  <dd>
                    {result.details.testCharge} C
                  </dd>
                </div>
              ) : null}

              {result.details.sourceCharge !==
              undefined ? (
                <div>
                  <dt>Source charge</dt>
                  <dd>
                    {result.details.sourceCharge} C
                  </dd>
                </div>
              ) : null}

              {result.details.distance !==
              undefined ? (
                <div>
                  <dt>Distance</dt>
                  <dd>
                    {result.details.distance} m
                  </dd>
                </div>
              ) : null}
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
              Your electric-field result will appear
              here
            </h2>

            <p>
              Choose a calculation mode, select the
              unknown quantity, and enter the required
              positive values.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
