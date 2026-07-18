"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRlcBandwidth,
  type RlcBandwidthDetails,
  type RlcBandwidthVariable,
} from "@/lib/calculators/rlc-bandwidth";
import type { CalculationResult } from "@/types/calculator";

type RlcBandwidthResult =
  CalculationResult<RlcBandwidthDetails>;

type FieldDefinition = {
  key: RlcBandwidthVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly FieldDefinition[] = [
  {
    key: "bandwidth",
    label: "Bandwidth",
    symbol: "BW",
    unit: "Hz",
    description:
      "Frequency range between the half-power cutoff points of the resonant circuit.",
  },
  {
    key: "resonantFrequency",
    label: "Resonant frequency",
    symbol: "f₀",
    unit: "Hz",
    description:
      "Center frequency at which inductive and capacitive reactance are equal.",
  },
  {
    key: "qualityFactor",
    label: "Quality factor",
    symbol: "Q",
    unit: "",
    description:
      "Dimensionless measure of resonance sharpness and circuit selectivity.",
  },
];

const variableLabels: Record<
  RlcBandwidthVariable,
  string
> = {
  bandwidth: "Bandwidth",
  resonantFrequency: "Resonant frequency",
  qualityFactor: "Quality factor",
};

const variableSymbols: Record<
  RlcBandwidthVariable,
  string
> = {
  bandwidth: "BW",
  resonantFrequency: "f₀",
  qualityFactor: "Q",
};

const variableUnits: Record<
  RlcBandwidthVariable,
  string
> = {
  bandwidth: "Hz",
  resonantFrequency: "Hz",
  qualityFactor: "",
};

const emptyValues: Record<
  RlcBandwidthVariable,
  string
> = {
  bandwidth: "",
  resonantFrequency: "",
  qualityFactor: "",
};

const examples = [
  {
    label: "Find bandwidth",
    solveFor: "bandwidth" as const,
    values: {
      bandwidth: "",
      resonantFrequency: "1000",
      qualityFactor: "20",
    },
  },
  {
    label: "Find resonant frequency",
    solveFor: "resonantFrequency" as const,
    values: {
      bandwidth: "50",
      resonantFrequency: "",
      qualityFactor: "20",
    },
  },
  {
    label: "Find quality factor",
    solveFor: "qualityFactor" as const,
    values: {
      bandwidth: "40",
      resonantFrequency: "800",
      qualityFactor: "",
    },
  },
] as const;

function formatDetail(value: number): string {
  return value.toLocaleString(undefined, {
    maximumSignificantDigits: 8,
  });
}

export function RlcBandwidthCalculator() {
  const [solveFor, setSolveFor] =
    useState<RlcBandwidthVariable>(
      "bandwidth",
    );

  const [values, setValues] = useState<
    Record<RlcBandwidthVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<RlcBandwidthResult | null>(
      null,
    );

  const [error, setError] = useState("");

  function changeSolveFor(
    variable: RlcBandwidthVariable,
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
    field: RlcBandwidthVariable,
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
    selectedVariable: RlcBandwidthVariable,
    inputValues: Record<
      RlcBandwidthVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateRlcBandwidth
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

      if (
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
        calculateRlcBandwidth(
          buildInput(solveFor, values),
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
          : "The RLC bandwidth calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateRlcBandwidth(
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
    setSolveFor("bandwidth");
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
              Series RLC resonance
            </p>

            <h2>
              Enter resonance values
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
                    min="0"
                    value={values[field.key]}
                    disabled={isSolvedField}
                    placeholder={
                      isSolvedField
                        ? "Calculated automatically"
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
              Select a variable, enter the two
              known values, and run the
              calculation.
            </p>
          </div>
        ) : (
          <>
            <div className="calculator-result__primary">
              <span>
                {
                  variableLabels[
                    result.details
                      .solvedVariable
                  ]
                }
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
                    result.details
                      .solvedVariable
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
                  {
                    result.details
                      .substitution
                  }
                </span>
              </p>
            </div>

            <dl className="calculator-result__details">
              <div>
                <dt>Bandwidth</dt>
                <dd>
                  {formatDetail(
                    result.details.bandwidth,
                  )}{" "}
                  Hz
                </dd>
              </div>

              <div>
                <dt>Resonant frequency</dt>
                <dd>
                  {formatDetail(
                    result.details
                      .resonantFrequency,
                  )}{" "}
                  Hz
                </dd>
              </div>

              <div>
                <dt>Quality factor</dt>
                <dd>
                  {formatDetail(
                    result.details
                      .qualityFactor,
                  )}
                </dd>
              </div>

              {result.details
                .lowerHalfPowerFrequency !==
              undefined ? (
                <div>
                  <dt>
                    Lower half-power frequency
                  </dt>
                  <dd>
                    {formatDetail(
                      result.details
                        .lowerHalfPowerFrequency,
                    )}{" "}
                    Hz
                  </dd>
                </div>
              ) : null}

              {result.details
                .upperHalfPowerFrequency !==
              undefined ? (
                <div>
                  <dt>
                    Upper half-power frequency
                  </dt>
                  <dd>
                    {formatDetail(
                      result.details
                        .upperHalfPowerFrequency,
                    )}{" "}
                    Hz
                  </dd>
                </div>
              ) : null}
            </dl>
          </>
        )}
      </section>
    </div>
  );
}
