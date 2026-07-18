"use client";

import { useState, type FormEvent } from "react";

import {
  calculateVoltageDivider,
  type VoltageDividerDetails,
  type VoltageDividerVariable,
} from "@/lib/calculators/voltage-divider";
import type { CalculationResult } from "@/types/calculator";

type VoltageDividerResult =
  CalculationResult<VoltageDividerDetails>;

type VoltageDividerField = {
  key: VoltageDividerVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly VoltageDividerField[] = [
  {
    key: "outputVoltage",
    label: "Output voltage",
    symbol: "Vout",
    unit: "V",
    description:
      "Voltage measured across the lower resistor.",
  },
  {
    key: "inputVoltage",
    label: "Input voltage",
    symbol: "Vin",
    unit: "V",
    description:
      "Total voltage applied across the resistor pair.",
  },
  {
    key: "upperResistance",
    label: "Upper resistance",
    symbol: "R1",
    unit: "Ω",
    description:
      "Resistance connected between the input and output nodes.",
  },
  {
    key: "lowerResistance",
    label: "Lower resistance",
    symbol: "R2",
    unit: "Ω",
    description:
      "Resistance connected between the output node and ground.",
  },
];

const variableLabels: Record<
  VoltageDividerVariable,
  string
> = {
  outputVoltage: "Output voltage",
  inputVoltage: "Input voltage",
  upperResistance: "Upper resistance",
  lowerResistance: "Lower resistance",
};

const variableSymbols: Record<
  VoltageDividerVariable,
  string
> = {
  outputVoltage: "Vout",
  inputVoltage: "Vin",
  upperResistance: "R1",
  lowerResistance: "R2",
};

const variableUnits: Record<
  VoltageDividerVariable,
  string
> = {
  outputVoltage: "V",
  inputVoltage: "V",
  upperResistance: "Ω",
  lowerResistance: "Ω",
};

const emptyValues: Record<
  VoltageDividerVariable,
  string
> = {
  outputVoltage: "",
  inputVoltage: "",
  upperResistance: "",
  lowerResistance: "",
};

const examples = [
  {
    label: "Find output voltage",
    solveFor: "outputVoltage" as const,
    values: {
      outputVoltage: "",
      inputVoltage: "12",
      upperResistance: "2000",
      lowerResistance: "1000",
    },
  },
  {
    label: "Find input voltage",
    solveFor: "inputVoltage" as const,
    values: {
      outputVoltage: "4",
      inputVoltage: "",
      upperResistance: "2000",
      lowerResistance: "1000",
    },
  },
  {
    label: "Find R1",
    solveFor: "upperResistance" as const,
    values: {
      outputVoltage: "4",
      inputVoltage: "12",
      upperResistance: "",
      lowerResistance: "1000",
    },
  },
  {
    label: "Find R2",
    solveFor: "lowerResistance" as const,
    values: {
      outputVoltage: "4",
      inputVoltage: "12",
      upperResistance: "2000",
      lowerResistance: "",
    },
  },
] as const;

export function VoltageDividerCalculator() {
  const [solveFor, setSolveFor] =
    useState<VoltageDividerVariable>(
      "outputVoltage",
    );

  const [values, setValues] = useState<
    Record<VoltageDividerVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<VoltageDividerResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: VoltageDividerVariable,
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
    variable: VoltageDividerVariable,
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
    selectedVariable: VoltageDividerVariable,
    inputValues: Record<
      VoltageDividerVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateVoltageDivider
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
        throw new Error(
          `Enter ${field.label.toLowerCase()}.`,
        );
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
      const input = buildInput(
        solveFor,
        values,
      );

      const calculationResult =
        calculateVoltageDivider(input);

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
        VoltageDividerVariable,
        string
      > = {
        ...example.values,
      };

      const input = buildInput(
        example.solveFor,
        exampleValues,
      );

      const calculationResult =
        calculateVoltageDivider(input);

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
    setSolveFor("outputVoltage");
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
              Enter three known circuit values
            </p>

            <h2>
              Solve a voltage divider problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="voltage-divider-solve-for">
              Calculate which value?
            </label>

            <select
              id="voltage-divider-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as VoltageDividerVariable,
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
                  htmlFor={`voltage-divider-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`voltage-divider-${field.key}`}
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
                    aria-describedby={`voltage-divider-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p
                  id={`voltage-divider-${field.key}-help`}
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
          Enter three positive values. For a passive
          divider, output voltage must remain below
          input voltage.
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
        aria-label="Voltage divider calculation result"
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
                <dt>Input voltage</dt>
                <dd>
                  {result.details.inputVoltage} V
                </dd>
              </div>

              <div>
                <dt>Output voltage</dt>
                <dd>
                  {result.details.outputVoltage} V
                </dd>
              </div>

              <div>
                <dt>Upper resistance</dt>
                <dd>
                  {result.details.upperResistance} Ω
                </dd>
              </div>

              <div>
                <dt>Lower resistance</dt>
                <dd>
                  {result.details.lowerResistance} Ω
                </dd>
              </div>

              <div>
                <dt>Divider ratio</dt>
                <dd>
                  {(
                    result.details.dividerRatio *
                    100
                  ).toFixed(4)}
                  %
                </dd>
              </div>

              <div>
                <dt>Ideal circuit current</dt>
                <dd>
                  {result.details.circuitCurrent} A
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
              Your voltage-divider result will
              appear here
            </h2>

            <p>
              Select the value to calculate, enter
              the other three known values, and
              press calculate.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
