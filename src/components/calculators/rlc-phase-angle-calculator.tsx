"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRlcPhaseAngle,
  type RlcPhaseAngleDetails,
  type RlcPhaseAngleVariable,
} from "@/lib/calculators/rlc-phase-angle";
import type { CalculationResult } from "@/types/calculator";

type RlcPhaseAngleResult =
  CalculationResult<RlcPhaseAngleDetails>;

type FieldDefinition = {
  key: RlcPhaseAngleVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly FieldDefinition[] = [
  {
    key: "phaseAngle",
    label: "Phase angle",
    symbol: "φ",
    unit: "°",
    description:
      "Angular difference between voltage and current in the series RLC circuit.",
  },
  {
    key: "resistance",
    label: "Resistance",
    symbol: "R",
    unit: "Ω",
    description:
      "Series resistance that opposes current and dissipates electrical energy.",
  },
  {
    key: "inductiveReactance",
    label: "Inductive reactance",
    symbol: "Xₗ",
    unit: "Ω",
    description:
      "Opposition to alternating current produced by the inductor.",
  },
  {
    key: "capacitiveReactance",
    label: "Capacitive reactance",
    symbol: "Xc",
    unit: "Ω",
    description:
      "Opposition to alternating current produced by the capacitor.",
  },
];

const variableLabels: Record<
  RlcPhaseAngleVariable,
  string
> = {
  phaseAngle: "Phase angle",
  resistance: "Resistance",
  inductiveReactance: "Inductive reactance",
  capacitiveReactance: "Capacitive reactance",
};

const variableSymbols: Record<
  RlcPhaseAngleVariable,
  string
> = {
  phaseAngle: "φ",
  resistance: "R",
  inductiveReactance: "Xₗ",
  capacitiveReactance: "Xc",
};

const variableUnits: Record<
  RlcPhaseAngleVariable,
  string
> = {
  phaseAngle: "°",
  resistance: "Ω",
  inductiveReactance: "Ω",
  capacitiveReactance: "Ω",
};

const emptyValues: Record<
  RlcPhaseAngleVariable,
  string
> = {
  phaseAngle: "",
  resistance: "",
  inductiveReactance: "",
  capacitiveReactance: "",
};

const examples = [
  {
    label: "Inductive circuit",
    solveFor: "phaseAngle" as const,
    values: {
      phaseAngle: "",
      resistance: "30",
      inductiveReactance: "50",
      capacitiveReactance: "10",
    },
  },
  {
    label: "Capacitive circuit",
    solveFor: "phaseAngle" as const,
    values: {
      phaseAngle: "",
      resistance: "12",
      inductiveReactance: "8",
      capacitiveReactance: "13",
    },
  },
  {
    label: "Circuit at resonance",
    solveFor: "phaseAngle" as const,
    values: {
      phaseAngle: "",
      resistance: "25",
      inductiveReactance: "40",
      capacitiveReactance: "40",
    },
  },
  {
    label: "Find resistance",
    solveFor: "resistance" as const,
    values: {
      phaseAngle: "45",
      resistance: "",
      inductiveReactance: "60",
      capacitiveReactance: "20",
    },
  },
] as const;

function formatDetail(value: number): string {
  return value.toLocaleString(undefined, {
    maximumSignificantDigits: 8,
  });
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() +
    value.slice(1);
}

export function RlcPhaseAngleCalculator() {
  const [solveFor, setSolveFor] =
    useState<RlcPhaseAngleVariable>(
      "phaseAngle",
    );

  const [values, setValues] = useState<
    Record<RlcPhaseAngleVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<RlcPhaseAngleResult | null>(
      null,
    );

  const [error, setError] = useState("");

  function changeSolveFor(
    variable: RlcPhaseAngleVariable,
  ) {
    setSolveFor(variable);

    setValues((currentValues) => ({
      ...currentValues,
      [variable]: "",
    }));

    setResult(null);
    setError("");
  }

  function updateValue(
    field: RlcPhaseAngleVariable,
    value: string,
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setResult(null);
    setError("");
  }

  function buildInput(
    selectedVariable:
      RlcPhaseAngleVariable,
    inputValues: Record<
      RlcPhaseAngleVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateRlcPhaseAngle
    >[0] = {
      solveFor: selectedVariable,
    };

    for (const field of fields) {
      if (field.key === selectedVariable) {
        continue;
      }

      const rawValue =
        inputValues[field.key].trim();

      if (rawValue === "") {
        continue;
      }

      const numericValue = Number(rawValue);

      if (!Number.isFinite(numericValue)) {
        throw new Error(
          `${field.label} must be a valid number.`,
        );
      }

      if (
        field.key === "phaseAngle"
      ) {
        if (
          numericValue <= -90 ||
          numericValue >= 90
        ) {
          throw new Error(
            "Phase angle must be greater than -90° and less than 90°.",
          );
        }
      } else if (numericValue <= 0) {
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
        calculateRlcPhaseAngle(
          buildInput(
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
          : "The RLC phase angle calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateRlcPhaseAngle(
          buildInput(
            example.solveFor,
            example.values,
          ),
        );

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
    setSolveFor("phaseAngle");
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
              Series RLC circuit analysis
            </p>

            <h2>
              Enter circuit values
            </h2>
          </div>

          <button
            className="button button--secondary"
            type="button"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <fieldset className="calculator-fieldset">
          <legend>
            Choose the variable to calculate
          </legend>

          <div className="calculator-options">
            {fields.map((field) => (
              <label
                key={field.key}
                className="calculator-option"
              >
                <input
                  type="radio"
                  name="solveFor"
                  value={field.key}
                  checked={
                    solveFor === field.key
                  }
                  onChange={() =>
                    changeSolveFor(field.key)
                  }
                />

                <span>
                  {field.label} ({field.symbol})
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="calculator-fields">
          {fields.map((field) => {
            const isSolvedField =
              field.key === solveFor;

            return (
              <label
                key={field.key}
                className="calculator-field"
              >
                <span className="calculator-field__label">
                  {field.label} ({field.symbol})
                </span>

                <span className="calculator-input-group">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    value={values[field.key]}
                    disabled={isSolvedField}
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
                        : field.key ===
                            "phaseAngle"
                          ? "Enter -90 to 90"
                          : "Enter a positive value"
                    }
                    aria-describedby={`${field.key}-description`}
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                  />

                  {field.unit !== "" ? (
                    <span>
                      {field.unit}
                    </span>
                  ) : null}
                </span>

                <small
                  id={`${field.key}-description`}
                >
                  {isSolvedField
                    ? `${field.label} will be calculated.`
                    : field.description}
                </small>
              </label>
            );
          })}
        </div>

        {error !== "" ? (
          <p
            className="calculator-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          className="button button--primary calculator-submit"
          type="submit"
        >
          Calculate{" "}
          {variableLabels[solveFor]}
        </button>

        <div className="calculator-examples">
          <p>Try an example:</p>

          <div className="calculator-examples__buttons">
            {examples.map((example) => (
              <button
                key={example.label}
                type="button"
                className="button button--secondary"
                onClick={() =>
                  loadExample(example)
                }
              >
                {example.label}
              </button>
            ))}
          </div>
        </div>
      </form>

      <section
        className="calculator-result"
        aria-live="polite"
      >
        <p className="calculator-result__label">
          Result
        </p>

        {result === null ? (
          <div className="calculator-result__empty">
            <h2>
              Your calculated result will
              appear here
            </h2>

            <p>
              Select a variable, enter the
              remaining known values, and run
              the calculation.
            </p>
          </div>
        ) : (
          <>
            <div className="calculator-result__primary">
              <span>
                {variableLabels[
                  result.details.solvedVariable
                ]}
              </span>

              <strong>
                {result.formattedValue}
                {variableUnits[
                  result.details.solvedVariable
                ] !== ""
                  ? ` ${
                      variableUnits[
                        result.details
                          .solvedVariable
                      ]
                    }`
                  : ""}
              </strong>

              <small>
                {
                  variableSymbols[
                    result.details.solvedVariable
                  ]
                }
              </small>
            </div>

            <div className="calculator-result__formula">
              <p>
                <strong>Formula</strong>
                <span>
                  {result.details.formula}
                </span>
              </p>

              <p>
                <strong>Substitution</strong>
                <span>
                  {result.details.substitution}
                </span>
              </p>
            </div>

            <dl className="calculator-result__details">
              <div>
                <dt>Phase angle</dt>
                <dd>
                  {formatDetail(
                    result.details.phaseAngle,
                  )}{" "}
                  °
                </dd>
              </div>

              <div>
                <dt>Net reactance</dt>
                <dd>
                  {formatDetail(
                    result.details.netReactance,
                  )}{" "}
                  Ω
                </dd>
              </div>

              <div>
                <dt>Impedance</dt>
                <dd>
                  {formatDetail(
                    result.details.impedance,
                  )}{" "}
                  Ω
                </dd>
              </div>

              <div>
                <dt>Power factor</dt>
                <dd>
                  {formatDetail(
                    result.details.powerFactor,
                  )}
                </dd>
              </div>

              <div>
                <dt>Circuit behavior</dt>
                <dd>
                  {capitalize(
                    result.details
                      .circuitBehavior,
                  )}
                </dd>
              </div>

              <div>
                <dt>Current relationship</dt>
                <dd>
                  {
                    result.details
                      .currentRelationship
                  }
                </dd>
              </div>
            </dl>
          </>
        )}
      </section>
    </div>
  );
}
