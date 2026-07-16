"use client";

import { useState, type FormEvent } from "react";

import {
  calculateRcTimeConstant,
  type RcTimeConstantDetails,
  type RcTimeConstantMode,
  type RcTimeConstantVariable,
} from "@/lib/calculators/rc-time-constant";
import type { CalculationResult } from "@/types/calculator";

type RcTimeConstantResult =
  CalculationResult<RcTimeConstantDetails>;

type FieldDefinition = {
  key: RcTimeConstantVariable;
  label: string;
  symbol: string;
  unit: string;
  description: string;
};

const timeConstantFields: readonly FieldDefinition[] = [
  {
    key: "timeConstant",
    label: "Time constant",
    symbol: "τ",
    unit: "s",
    description:
      "RC time constant measured in seconds.",
  },
  {
    key: "resistance",
    label: "Resistance",
    symbol: "R",
    unit: "Ω",
    description:
      "Circuit resistance measured in ohms.",
  },
  {
    key: "capacitance",
    label: "Capacitance",
    symbol: "C",
    unit: "F",
    description:
      "Circuit capacitance measured in farads.",
  },
];

const chargingFields: readonly FieldDefinition[] = [
  {
    key: "timeConstant",
    label: "Time constant",
    symbol: "τ",
    unit: "s",
    description:
      "RC time constant measured in seconds.",
  },
  {
    key: "voltage",
    label: "Capacitor voltage",
    symbol: "V(t)",
    unit: "V",
    description:
      "Capacitor voltage after the selected charging time.",
  },
  {
    key: "sourceVoltage",
    label: "Source voltage",
    symbol: "Vₛ",
    unit: "V",
    description:
      "Applied supply voltage for the charging circuit.",
  },
  {
    key: "time",
    label: "Elapsed time",
    symbol: "t",
    unit: "s",
    description:
      "Charging time measured in seconds.",
  },
];

const dischargingFields: readonly FieldDefinition[] = [
  {
    key: "timeConstant",
    label: "Time constant",
    symbol: "τ",
    unit: "s",
    description:
      "RC time constant measured in seconds.",
  },
  {
    key: "voltage",
    label: "Capacitor voltage",
    symbol: "V(t)",
    unit: "V",
    description:
      "Remaining capacitor voltage after discharge.",
  },
  {
    key: "initialVoltage",
    label: "Initial voltage",
    symbol: "V₀",
    unit: "V",
    description:
      "Capacitor voltage at the start of discharge.",
  },
  {
    key: "time",
    label: "Elapsed time",
    symbol: "t",
    unit: "s",
    description:
      "Discharging time measured in seconds.",
  },
];

const variableLabels: Record<
  RcTimeConstantVariable,
  string
> = {
  timeConstant: "Time constant",
  resistance: "Resistance",
  capacitance: "Capacitance",
  voltage: "Capacitor voltage",
  sourceVoltage: "Source voltage",
  initialVoltage: "Initial voltage",
  time: "Elapsed time",
};

const variableSymbols: Record<
  RcTimeConstantVariable,
  string
> = {
  timeConstant: "τ",
  resistance: "R",
  capacitance: "C",
  voltage: "V(t)",
  sourceVoltage: "Vₛ",
  initialVoltage: "V₀",
  time: "t",
};

const variableUnits: Record<
  RcTimeConstantVariable,
  string
> = {
  timeConstant: "s",
  resistance: "Ω",
  capacitance: "F",
  voltage: "V",
  sourceVoltage: "V",
  initialVoltage: "V",
  time: "s",
};

const emptyValues: Record<
  RcTimeConstantVariable,
  string
> = {
  timeConstant: "",
  resistance: "",
  capacitance: "",
  voltage: "",
  sourceVoltage: "",
  initialVoltage: "",
  time: "",
};

const examples = [
  {
    label: "Find time constant",
    mode: "timeConstant" as const,
    solveFor: "timeConstant" as const,
    values: {
      ...emptyValues,
      resistance: "10000",
      capacitance: "0.0001",
    },
  },
  {
    label: "Charging after 1τ",
    mode: "chargingVoltage" as const,
    solveFor: "voltage" as const,
    values: {
      ...emptyValues,
      timeConstant: "1",
      sourceVoltage: "10",
      time: "1",
    },
  },
  {
    label: "Find charging time",
    mode: "chargingVoltage" as const,
    solveFor: "time" as const,
    values: {
      ...emptyValues,
      timeConstant: "1",
      voltage: "6.321205588",
      sourceVoltage: "10",
    },
  },
  {
    label: "Discharging after 1τ",
    mode: "dischargingVoltage" as const,
    solveFor: "voltage" as const,
    values: {
      ...emptyValues,
      timeConstant: "1",
      initialVoltage: "10",
      time: "1",
    },
  },
] as const;

function getModeFields(
  mode: RcTimeConstantMode,
) {
  if (mode === "timeConstant") {
    return timeConstantFields;
  }

  if (mode === "chargingVoltage") {
    return chargingFields;
  }

  return dischargingFields;
}

function getDefaultSolveFor(
  mode: RcTimeConstantMode,
): RcTimeConstantVariable {
  return mode === "timeConstant"
    ? "timeConstant"
    : "voltage";
}

export function RcTimeConstantCalculator() {
  const [mode, setMode] =
    useState<RcTimeConstantMode>("timeConstant");

  const [solveFor, setSolveFor] =
    useState<RcTimeConstantVariable>(
      "timeConstant",
    );

  const [values, setValues] = useState<
    Record<RcTimeConstantVariable, string>
  >(emptyValues);

  const [result, setResult] =
    useState<RcTimeConstantResult | null>(null);

  const [error, setError] = useState("");

  const activeFields = getModeFields(mode);

  function changeMode(
    selectedMode: RcTimeConstantMode,
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
    variable: RcTimeConstantVariable,
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
    field: RcTimeConstantVariable,
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
    selectedMode: RcTimeConstantMode,
    selectedVariable: RcTimeConstantVariable,
    inputValues: Record<
      RcTimeConstantVariable,
      string
    >,
  ) {
    const input: Parameters<
      typeof calculateRcTimeConstant
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
        calculateRcTimeConstant(
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
          : "The RC circuit calculation could not be completed.",
      );
    }
  }

  function loadExample(
    example: (typeof examples)[number],
  ) {
    try {
      const calculationResult =
        calculateRcTimeConstant(
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
    setMode("timeConstant");
    setSolveFor("timeConstant");
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
              RC circuit calculations
            </p>

            <h2>
              Time constant, charging, and
              discharging
            </h2>
          </div>

          <button
            type="button"
            className="button button-secondary"
            onClick={resetCalculator}
          >
            Reset
          </button>
        </div>

        <div className="calculator-mode-grid">
          <button
            type="button"
            className={
              mode === "timeConstant"
                ? "calculator-mode-button calculator-mode-button--active"
                : "calculator-mode-button"
            }
            onClick={() =>
              changeMode("timeConstant")
            }
          >
            <strong>Time constant</strong>
            <span>τ = RC</span>
          </button>

          <button
            type="button"
            className={
              mode === "chargingVoltage"
                ? "calculator-mode-button calculator-mode-button--active"
                : "calculator-mode-button"
            }
            onClick={() =>
              changeMode("chargingVoltage")
            }
          >
            <strong>Charging</strong>
            <span>
              V(t) = Vₛ(1 − e⁻ᵗ/τ)
            </span>
          </button>

          <button
            type="button"
            className={
              mode === "dischargingVoltage"
                ? "calculator-mode-button calculator-mode-button--active"
                : "calculator-mode-button"
            }
            onClick={() =>
              changeMode("dischargingVoltage")
            }
          >
            <strong>Discharging</strong>
            <span>V(t) = V₀e⁻ᵗ/τ</span>
          </button>
        </div>

        <label className="calculator-field">
          <span className="calculator-field__label">
            Solve for
          </span>

          <select
            value={solveFor}
            onChange={(event) =>
              changeSolveFor(
                event.target
                  .value as RcTimeConstantVariable,
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
        </label>

        <div className="calculator-input-grid">
          {activeFields
            .filter(
              (field) =>
                field.key !== solveFor,
            )
            .map((field) => (
              <label
                key={field.key}
                className="calculator-field"
              >
                <span className="calculator-field__label">
                  {field.label}
                </span>

                <span className="calculator-field__input">
                  <input
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    value={values[field.key]}
                    onChange={(event) =>
                      updateValue(
                        field.key,
                        event.target.value,
                      )
                    }
                    aria-describedby={`${field.key}-description`}
                  />

                  <span>{field.unit}</span>
                </span>

                <small
                  id={`${field.key}-description`}
                >
                  {field.description}
                </small>
              </label>
            ))}
        </div>

        {error ? (
          <p
            className="calculator-error"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="button button-primary"
        >
          Calculate{" "}
          {variableLabels[solveFor]}
        </button>
      </form>

      <div className="calculator-examples">
        <p>
          <strong>Try an example:</strong>
        </p>

        <div className="calculator-example-buttons">
          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              className="button button-secondary"
              onClick={() =>
                loadExample(example)
              }
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>

      <section
        className="calculator-result"
        aria-live="polite"
      >
        <p className="eyebrow">
          Calculation result
        </p>

        {result ? (
          <>
            <h2>
              {
                variableLabels[
                  result.details.solvedVariable
                ]
              }
            </h2>

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
                <dt>Solved variable</dt>
                <dd>
                  {
                    variableSymbols[
                      result.details
                        .solvedVariable
                    ]
                  }
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <h2>Ready to calculate</h2>

            <p>
              Choose an RC circuit mode, select the
              unknown, and enter the known positive
              values.
            </p>
          </>
        )}
      </section>
    </div>
  );
}
