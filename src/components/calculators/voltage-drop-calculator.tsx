"use client";

import { useState, type FormEvent } from "react";

import {
  calculateVoltageDrop,
  type VoltageDropDetails,
  type VoltageDropVariable,
} from "@/lib/calculators/voltage-drop";
import type { CalculationResult } from "@/types/calculator";

type VoltageDropResult =
  CalculationResult<VoltageDropDetails>;

type VoltageDropField = {
  key: VoltageDropVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const fields: readonly VoltageDropField[] = [
  {
    key: "voltageDrop",
    label: "Voltage drop",
    symbol: "Vdrop",
    unit: "V",
    description:
      "Voltage lost across the complete conductor loop.",
  },
  {
    key: "current",
    label: "Current",
    symbol: "I",
    unit: "A",
    description:
      "Electrical current flowing through the conductor.",
  },
  {
    key: "oneWayLength",
    label: "One-way conductor length",
    symbol: "L",
    unit: "m",
    description:
      "Distance from the source to the electrical load.",
  },
  {
    key: "crossSectionalArea",
    label: "Cross-sectional area",
    symbol: "A",
    unit: "mm²",
    description:
      "Conductor cross-sectional area in square millimetres.",
  },
  {
    key: "resistivity",
    label: "Conductor resistivity",
    symbol: "ρ",
    unit: "Ω·m",
    description:
      "Electrical resistivity of the conductor material.",
  },
];

const variableLabels: Record<
  VoltageDropVariable,
  string
> = {
  voltageDrop: "Voltage drop",
  current: "Current",
  oneWayLength: "One-way conductor length",
  crossSectionalArea: "Cross-sectional area",
  resistivity: "Conductor resistivity",
};

const variableSymbols: Record<
  VoltageDropVariable,
  string
> = {
  voltageDrop: "Vdrop",
  current: "I",
  oneWayLength: "L",
  crossSectionalArea: "A",
  resistivity: "ρ",
};

const variableUnits: Record<
  VoltageDropVariable,
  string
> = {
  voltageDrop: "V",
  current: "A",
  oneWayLength: "m",
  crossSectionalArea: "mm²",
  resistivity: "Ω·m",
};

const emptyValues: Record<
  VoltageDropVariable,
  string
> = {
  voltageDrop: "",
  current: "",
  oneWayLength: "",
  crossSectionalArea: "",
  resistivity: "",
};

const examples = [
  {
    label: "Copper cable",
    solveFor: "voltageDrop" as const,
    values: {
      voltageDrop: "",
      current: "10",
      oneWayLength: "20",
      crossSectionalArea: "2.5",
      resistivity: "0.00000001724",
    },
  },
  {
    label: "Find current",
    solveFor: "current" as const,
    values: {
      voltageDrop: "2.7584",
      current: "",
      oneWayLength: "20",
      crossSectionalArea: "2.5",
      resistivity: "0.00000001724",
    },
  },
  {
    label: "Find cable length",
    solveFor: "oneWayLength" as const,
    values: {
      voltageDrop: "2.7584",
      current: "10",
      oneWayLength: "",
      crossSectionalArea: "2.5",
      resistivity: "0.00000001724",
    },
  },
  {
    label: "Find conductor area",
    solveFor: "crossSectionalArea" as const,
    values: {
      voltageDrop: "2.7584",
      current: "10",
      oneWayLength: "20",
      crossSectionalArea: "",
      resistivity: "0.00000001724",
    },
  },
] as const;

export function VoltageDropCalculator() {
  const [solveFor, setSolveFor] =
    useState<VoltageDropVariable>("voltageDrop");

  const [values, setValues] = useState<
    Record<VoltageDropVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<VoltageDropResult | null>(null);

  const [error, setError] = useState("");

  function updateValue(
    field: VoltageDropVariable,
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
    variable: VoltageDropVariable,
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
    selectedVariable: VoltageDropVariable,
    inputValues: Record<
      VoltageDropVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateVoltageDrop
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
        calculateVoltageDrop(input);

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
        VoltageDropVariable,
        string
      > = {
        ...example.values,
      };

      const input = buildInput(
        example.solveFor,
        exampleValues,
      );

      const calculationResult =
        calculateVoltageDrop(input);

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
    setSolveFor("voltageDrop");
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
              Enter four known conductor values
            </p>

            <h2>
              Solve a voltage drop problem
            </h2>
          </div>

          <span className="calculator-form__status">
            Free tool
          </span>
        </div>

        <div className="calculator-options-grid">
          <div className="form-field dilution-solve-field">
            <label htmlFor="voltage-drop-solve-for">
              Calculate which value?
            </label>

            <select
              id="voltage-drop-solve-for"
              value={solveFor}
              onChange={(event) =>
                changeSolveFor(
                  event.target
                    .value as VoltageDropVariable,
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
                  htmlFor={`voltage-drop-${field.key}`}
                >
                  {field.label} ({field.symbol})
                </label>

                <div className="input-with-suffix">
                  <input
                    id={`voltage-drop-${field.key}`}
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
                    aria-describedby={`voltage-drop-${field.key}-help`}
                  />

                  <span>{field.unit}</span>
                </div>

                <p
                  id={`voltage-drop-${field.key}-help`}
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
          Length is one-way distance. The calculation
          automatically includes the outgoing and return
          conductors. Area must be entered in mm².
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

      <aside
        className="calculator-result"
        aria-live="polite"
      >
        <p className="calculator-result__label">
          Result
        </p>

        {result ? (
          <>
            <p className="calculator-result__value">
              {result.formattedValue}{" "}
              {variableUnits[solveFor]}
            </p>

            <p className="calculator-result__summary">
              {variableLabels[solveFor]} (
              {variableSymbols[solveFor]}) calculated
              using the round-trip conductor resistance
              model.
            </p>

            <dl className="calculator-result__details">
              <div>
                <dt>Formula</dt>
                <dd>{result.details.formula}</dd>
              </div>

              <div>
                <dt>Substitution</dt>
                <dd>
                  {result.details.substitution}
                </dd>
              </div>

              <div>
                <dt>Loop resistance</dt>
                <dd>
                  {result.details.loopResistance.toLocaleString(
                    undefined,
                    {
                      maximumSignificantDigits: 8,
                    },
                  )}{" "}
                  Ω
                </dd>
              </div>

              <div>
                <dt>Power loss</dt>
                <dd>
                  {result.details.powerLoss.toLocaleString(
                    undefined,
                    {
                      maximumSignificantDigits: 8,
                    },
                  )}{" "}
                  W
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="calculator-result__empty">
            Enter four known values and select the
            quantity you want to calculate.
          </p>
        )}
      </aside>
    </div>
  );
}
